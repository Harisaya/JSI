# Chợ Tốt Proxy Server

This is a small Express server that proxies requests to Chợ Tốt public API and caches results for 1 hour to avoid CORS issues when calling from browser.

Quick setup:

1. Install dependencies

```bash
cd Server
npm install
```

2. Run server

```bash
npm start
```

3. Open the client in browser

- The server serves the `Client/` folder. Open `http://localhost:3000/index.html` to view the app.

Notes:
- The proxy endpoint is `/api/chotot?limit=200` and will return JSON `{ cached: bool, count: number, ads: [...] }`.
- Cache TTL is 1 hour; server will fetch fresh data after TTL expires.
- If the proxy cannot fetch data, the client will display a minimal mock (one item per category) and show an error notification.
