const fetch = require('node-fetch');
(async () => {
  const id = '176057592';
  const urls = [
    `https://gateway.chotot.com/v1/public/ad-listing/${id}`,
    `https://gateway.chotot.com/v1/public/ad-listing?adId=${id}`,
    `https://gateway.chotot.com/v1/public/ad-listing/${id}?`,
    `https://gateway.chotot.com/v1/public/ad-listing/${id}?limit=1`
  ];

  for (const url of urls) {
    try {
      const r = await fetch(url, { headers: { 'Accept': 'application/json' } });
      console.log('URL', url, 'status', r.status);
      const text = await r.text();
      console.log(text.slice(0, 200));
    } catch (e) {
      console.error('err', url, e.message);
    }
  }
})();
