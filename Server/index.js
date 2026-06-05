const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());

// Serve client static files from ../Client
const clientDir = path.join(__dirname, '..', 'Client');
app.use(express.static(clientDir));

// Simple in-memory cache
let cache = {
  timestamp: 0,
  data: null
};
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

app.get('/api/chotot', async (req, res) => {
  try {
    if (req.query.adId) {
      const apiUrl = `https://gateway.chotot.com/v1/public/ad-listing?adId=${encodeURIComponent(req.query.adId)}`;
      console.log('Fetching Chotot ad detail URL:', apiUrl);
      const r = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });
      if (!r.ok) {
        const text = await r.text();
        console.warn('Chotot ad detail error:', r.status, text);
        return res.status(r.status).send(text);
      }
      const json = await r.json();
      return res.json(json);
    }

    const limit = parseInt(req.query.limit || '200', 10);
    const cg = req.query.cg; // optional category group
    const now = Date.now();

    if (!cg && cache.data && (now - cache.timestamp) < CACHE_TTL) {
      // Serve cached only for non-category global requests
      return res.json({ cached: true, count: cache.data.length, ads: cache.data.slice(0, limit) });
    }

    // Fetch from Chợ Tốt. We'll attempt to aggregate multiple pages until we collect up to `limit` unique ads.
    const perPage = Math.min(50, limit); // fetch in chunks of up to 50
    const maxPages = 6; // cap pages to avoid long loops (50*6 = 300)

    const collected = new Map(); // ad_id -> ad
    for (let page = 1; page <= maxPages && collected.size < limit; page++) {
      const apiBase = `https://gateway.chotot.com/v1/public/ad-listing?page=${page}&limit=${perPage}`;
      const apiUrl = cg ? `${apiBase}&cg=${encodeURIComponent(cg)}` : apiBase;
      console.log('Fetching Chotot API URL:', apiUrl);

      const r = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });
      if (!r.ok) {
        const text = await r.text();
        console.warn(`Chotot API bad response for page ${page}:`, r.status);
        // continue to next page instead of failing outright
        continue;
      }

      const json = await r.json();
      const ads = Array.isArray(json.ads) ? json.ads : (Array.isArray(json) ? json : []);
      if (!ads || ads.length === 0) {
        // no more results from API
        break;
      }

      for (const a of ads) {
        const id = a.ad_id || a.id;
        if (!id) continue;
        if (!collected.has(id)) collected.set(id, a);
        if (collected.size >= limit) break;
      }
    }

    const adsArr = Array.from(collected.values()).slice(0, limit);

    // Cache results
    cache = { timestamp: now, data: adsArr };

    return res.json({ cached: false, count: adsArr.length, ads: adsArr });
  } catch (err) {
    console.error('Proxy error', err);
    return res.status(500).json({ error: 'Internal proxy error', message: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Chotot proxy server running on http://localhost:${port}`);
});