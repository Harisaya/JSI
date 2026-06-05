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

// Proxy route for Chợ Tốt API details / listings
let chototCache = { timestamp: 0, data: null };
const CACHE_TTL = 1000 * 60 * 60;

app.get('/api/chotot', async (req, res) => {
    if (!fetch) {
        return res.status(500).json({ error: 'Fetch is not available on this Node.js version. Use Node 18+ or install node-fetch.' });
    }

    try {
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

        const limit = parseInt(req.query.limit || '200', 10);
        const cg = req.query.cg;
        const now = Date.now();

        if (!cg && chototCache.data && (now - chototCache.timestamp) < CACHE_TTL) {
            return res.json({ cached: true, count: chototCache.data.length, ads: chototCache.data.slice(0, limit) });
        }

        const perPage = Math.min(50, limit);
        const maxPages = 6;
        const collected = new Map();

        for (let page = 1; page <= maxPages && collected.size < limit; page++) {
            const apiBase = `https://gateway.chotot.com/v1/public/ad-listing?page=${page}&limit=${perPage}`;
            const apiUrl = cg ? `${apiBase}&cg=${encodeURIComponent(cg)}` : apiBase;
            const r = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });
            if (!r.ok) {
                continue;
            }
            const json = await r.json();
            const ads = Array.isArray(json.ads) ? json.ads : (Array.isArray(json) ? json : []);
            if (!ads || ads.length === 0) break;

            for (const a of ads) {
                const id = a.ad_id || a.id;
                if (!id) continue;
                if (!collected.has(id)) collected.set(id, a);
                if (collected.size >= limit) break;
            }
        }

        const adsArr = Array.from(collected.values()).slice(0, limit);
        chototCache = { timestamp: now, data: adsArr };
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
            {folder: "demo:"},
            (error, result) => {
                if (error) return res.status(500).json(error);
                res.json({url: result.secure_url,
                    
                });
            }
        );
        result.end(file.buffer);
    }catch (error) {
        res.status(500).json({error: error.message});
    }
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});