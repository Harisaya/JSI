require("dotenv").config();

const express = require("express");
const cors = require("cors");
const upload = require("./Server/middleware/multer");
const cloudinary = require("./Server/utils/cloudinary");

const fetch = globalThis.fetch || (() => {
    try {
        return require('node-fetch');
    } catch (error) {
        return null;
    }
})();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory cache using Map
const chototCacheStore = new Map();

app.get('/api/chotot', async (req, res) => {
    if (!fetch) {
        return res.status(500).json({ error: 'Fetch is not available on this Node.js version. Use Node 18+ or install node-fetch.' });
    }

    try {
        // Detail request by adId – unchanged
        if (req.query.adId) {
            const apiUrl = `https://gateway.chotot.com/v1/public/ad-listing?adId=${encodeURIComponent(req.query.adId)}`;
            const r = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });
            if (!r.ok) {
                const text = await r.text();
                return res.status(r.status).send(text);
            }
            const json = await r.json();
            return res.json(json);
        }

        // ---- Listing endpoint with improved cache & pagination ----
        const now = Date.now();

        const page        = parseInt(req.query.page || '1', 10);
        const pages       = parseInt(req.query.pages || '1', 10);
        const offset      = parseInt(req.query.offset || req.query.o || '0', 10);
        const cg          = req.query.cg;
        const beforeTime  = req.query.before_time || '';
        const cacheDuration = parseInt(req.query.cacheDuration || '3600000', 10); // ms
        const limit       = parseInt(req.query.limit || '200', 10);

        const cacheKey = `chotot_${page}_${pages}_${offset}_${beforeTime}_${cg || 'all'}`;

        // Serve from cache if fresh
        const cached = chototCacheStore.get(cacheKey);
        if (cached && (now - cached.timestamp) < cacheDuration) {
            console.log('[CACHE HIT]', cacheKey);
            return res.json({
                cached: true,
                count: cached.data.length,
                ads: cached.data.slice(0, limit)
            });
        }

        const perPage = Math.min(50, limit);
        const startPage = page;
        const endPage   = page + pages - 1;
        const collected = new Map();

        for (let currentPage = startPage; currentPage <= endPage; currentPage++) {
            let apiUrl = `https://gateway.chotot.com/v1/public/ad-listing?page=${currentPage}&limit=${perPage}`;
            if (cg) apiUrl += `&cg=${encodeURIComponent(cg)}`;
            if (offset > 0) apiUrl += `&o=${offset}`;
            if (beforeTime) apiUrl += `&before_time=${encodeURIComponent(beforeTime)}`;

            console.log('Fetching Chotot API URL:', apiUrl);

            const r = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });
            if (!r.ok) {
                console.warn(`Chotot API bad response for page ${currentPage}:`, r.status);
                continue;
            }

            const json = await r.json();
            const ads = Array.isArray(json.ads) ? json.ads : (Array.isArray(json) ? json : []);

            // Log the raw ads for this page
            console.log(`===== PAGE ${currentPage} =====`);
            console.log(JSON.stringify(ads, null, 2));

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

        // Log final result
        console.log('===== FINAL ADS =====');
        console.log(JSON.stringify(adsArr, null, 2));

        // Store in cache
        chototCacheStore.set(cacheKey, { timestamp: now, data: adsArr });

        return res.json({ cached: false, count: adsArr.length, ads: adsArr });

    } catch (err) {
        return res.status(500).json({ error: 'Internal proxy error', message: err.message });
    }
});

app.get("/", (req, res) => {
    res.send("Dang chay server");
});

app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const file = req.file;
        const result = await cloudinary.uploader.upload_stream(
            { folder: "demo:" },
            (error, result) => {
                if (error) return res.status(500).json(error);
                res.json({ url: result.secure_url });
            }
        );
        result.end(file.buffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});