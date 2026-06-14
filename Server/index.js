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

// In-memory cache using Map
const cacheStore = new Map();

app.get('/api/chotot', async (req, res) => {
  try {
    // Detail request by adId – unchanged
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

    // ---- Listing endpoint with improved cache & pagination ----

    const now = Date.now();

    // Query parameters
    const page      = parseInt(req.query.page || '1', 10);
    const pages     = parseInt(req.query.pages || '1', 10);
    const offset    = parseInt(req.query.offset || req.query.o || '0', 10);
    const cg        = req.query.cg;                         // optional category
    const beforeTime = req.query.before_time || '';
    const cacheDuration = parseInt(req.query.cacheDuration || '3600000', 10); // ms
    const limit     = parseInt(req.query.limit || '200', 10); // total ads wanted

    // Build a cache key from all relevant parameters
    const cacheKey = `chotot_${page}_${pages}_${offset}_${beforeTime}_${cg || 'all'}`;

    // Serve from cache if available and still fresh
    const cached = cacheStore.get(cacheKey);
    if (cached && (now - cached.timestamp) < cacheDuration) {
      console.log('[CACHE HIT]', cacheKey);
      return res.json({
        cached: true,
        count: cached.data.length,
        ads: cached.data.slice(0, limit)
      });
    }

    // Number of ads to request per page (API max is usually 50)
    const perPage = Math.min(50, limit);

    // Which pages to fetch
    const startPage = page;
    const endPage   = page + pages - 1;

    const collected = new Map(); // ad_id -> ad object (deduplication)

    for (let currentPage = startPage; currentPage <= endPage; currentPage++) {
      let apiUrl = `https://gateway.chotot.com/v1/public/ad-listing?page=${currentPage}&limit=${perPage}`;
      if (cg) apiUrl += `&cg=${encodeURIComponent(cg)}`;
      if (offset > 0) apiUrl += `&o=${offset}`;
      if (beforeTime) apiUrl += `&before_time=${encodeURIComponent(beforeTime)}`;

      console.log('Fetching Chotot API URL:', apiUrl);

      const r = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });
      if (!r.ok) {
        const text = await r.text();
        console.warn(`Chotot API bad response for page ${currentPage}:`, r.status);
        continue; // skip this page and try the next
      }

      const json = await r.json();
      const ads = Array.isArray(json.ads) ? json.ads : (Array.isArray(json) ? json : []);

      // Log the raw ads for this page
      console.log(`===== PAGE ${currentPage} =====`);
      console.log(JSON.stringify(ads, null, 2));

      if (!ads || ads.length === 0) {
        // No more results from API; stop early
        break;
      }

      for (const a of ads) {
        const id = a.ad_id || a.id;
        if (!id) continue;
        if (!collected.has(id)) collected.set(id, a);
        if (collected.size >= limit) break; // optional early exit if total reached
      }

      if (collected.size >= limit) break;
    }

    const adsArr = Array.from(collected.values()).slice(0, limit);

    // Log final aggregated result
    console.log('===== FINAL ADS =====');
    console.log(JSON.stringify(adsArr, null, 2));

    // Store in cache
    cacheStore.set(cacheKey, { timestamp: now, data: adsArr });

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