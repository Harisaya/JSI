// Vercel Serverless Function – Proxy Chợ Tốt API
// Route: /api/chotot

const fetch = globalThis.fetch || require('node-fetch');

// In-memory cache (per cold start)
const cacheStore = new Map();

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const query = req.query || {};

    // Detail request by adId
    if (query.adId) {
      const apiUrl = `https://gateway.chotot.com/v1/public/ad-listing?adId=${encodeURIComponent(query.adId)}`;
      const r = await fetch(apiUrl, { headers: { Accept: 'application/json' } });
      if (!r.ok) {
        const text = await r.text();
        return res.status(r.status).send(text);
      }
      const json = await r.json();
      return res.json(json);
    }

    // Listing endpoint with cache & pagination
    const now = Date.now();
    const page = parseInt(query.page || '1', 10);
    const pages = parseInt(query.pages || '1', 10);
    const offset = parseInt(query.offset || query.o || '0', 10);
    const cg = query.cg;
    const beforeTime = query.before_time || '';
    const cacheDuration = parseInt(query.cacheDuration || '3600000', 10);
    const limit = parseInt(query.limit || '200', 10);

    const cacheKey = `chotot_${page}_${pages}_${offset}_${beforeTime}_${cg || 'all'}`;

    const cached = cacheStore.get(cacheKey);
    if (cached && (now - cached.timestamp) < cacheDuration) {
      return res.json({
        cached: true,
        count: cached.data.length,
        ads: cached.data.slice(0, limit),
      });
    }

    const perPage = Math.min(50, limit);
    const startPage = page;
    const endPage = page + pages - 1;
    const collected = new Map();

    for (let currentPage = startPage; currentPage <= endPage; currentPage++) {
      let apiUrl = `https://gateway.chotot.com/v1/public/ad-listing?page=${currentPage}&limit=${perPage}`;
      if (cg) apiUrl += `&cg=${encodeURIComponent(cg)}`;
      if (offset > 0) apiUrl += `&o=${offset}`;
      if (beforeTime) apiUrl += `&before_time=${encodeURIComponent(beforeTime)}`;

      const r = await fetch(apiUrl, { headers: { Accept: 'application/json' } });
      if (!r.ok) {
        console.warn(`Chotot API bad response for page ${currentPage}:`, r.status);
        continue;
      }

      const json = await r.json();
      const ads = Array.isArray(json.ads) ? json.ads : Array.isArray(json) ? json : [];

      if (!ads || ads.length === 0) break;

      for (const a of ads) {
        const id = a.ad_id || a.id;
        if (!id) continue;
        if (!collected.has(id)) collected.set(id, a);
        if (collected.size >= limit) break;
      }

      if (collected.size >= limit) break;
    }

    const adsArr = Array.from(collected.values()).slice(0, limit);

    cacheStore.set(cacheKey, { timestamp: now, data: adsArr });

    return res.json({ cached: false, count: adsArr.length, ads: adsArr });
  } catch (err) {
    console.error('Proxy error:', err);
    return res.status(500).json({ error: 'Internal proxy error', message: err.message });
  }
};
