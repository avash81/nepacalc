const https = require('https');

function fetchHTML(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'GET', timeout: 12000, headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' } }, (res) => {
      let body = '';
      res.on('data', d => { body += d; if (body.length > 10000) req.destroy(); });
      res.on('end', () => resolve({ url, status: res.statusCode, body: body.substring(0, 10000), xrobots: res.headers['x-robots-tag'] || 'NONE', cf: res.headers['cf-cache-status'] || 'none', server: res.headers['server'] || '' }));
    });
    req.on('error', e => resolve({ url, status: 'ERR:' + e.message, body: '' }));
    req.on('timeout', () => { req.destroy(); resolve({ url, status: 'TIMEOUT', body: '' }); });
    req.end();
  });
}

function extract(html) {
  const get = (rx) => { const m = html.match(rx); return m ? m[0].substring(0, 200) : 'NOT FOUND'; };
  return {
    metaRobots: get(/<meta[^>]*name=.robots.[^>]*>/i),
    canonical: get(/<link[^>]*rel=.canonical.[^>]*>/i),
    title: (html.match(/<title>([\s\S]*?)<\/title>/i) || ['', 'N/A'])[1].substring(0, 80),
  };
}

async function run() {
  const urls = [
    'https://nepacalc.com/blog/nepal-income-tax-guide-2082-83/',
    'https://nepacalc.com/blog/nea-electricity-bill-guide-2082/',
    'https://nepacalc.com/blog/nepal-gold-price-analysis-2083/',
    'https://nepacalc.com/calculator/nepal-vehicle-tax/',
    'https://nepacalc.com/calculator/gold-converter/',
    'https://nepacalc.com/market-rates/live-gold-price/',
    'https://nepacalc.com/electricity/nepal-unit-price/',
    'https://nepacalc.com/calculator/nea-bill/',
    'https://nepacalc.com/nepal/nepal-budget/',
    'https://nepacalc.com/',
  ];
  for (const u of urls) {
    const r = await fetchHTML(u);
    const seo = r.body ? extract(r.body) : {};
    console.log('URL: ' + u);
    console.log('  HTTP Status : ' + r.status);
    console.log('  X-Robots-Tag: ' + r.xrobots);
    console.log('  CF-Cache    : ' + r.cf);
    console.log('  meta robots : ' + (seo.metaRobots || 'NOT FOUND'));
    console.log('  canonical   : ' + (seo.canonical || 'NOT FOUND'));
    console.log('  title       : ' + (seo.title || 'N/A'));
    console.log('');
  }
}
run();
