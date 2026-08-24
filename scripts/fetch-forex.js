const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_PATH = path.join(__dirname, '../public/data/forex-rates.json');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'User-Agent': 'NepaCalc-Build-Bot' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try { resolve(JSON.parse(data)); }
          catch { reject(new Error('JSON parse failed')); }
        } else {
          reject(new Error("HTTP " + res.statusCode));
        }
      });
    }).on('error', reject).setTimeout(8000, () => reject(new Error('Timeout')));
  });
}

async function main() {
  console.log('Fetching live forex rates...');
  try {
    const data = await fetchJson('https://api.exchangerate-api.com/v4/latest/USD');
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));
    console.log('✅ Forex rates fetched successfully. 1 USD = NPR ' + data.rates.NPR);
  } catch (error) {
    console.error('⚠️ Forex fetch failed:', error.message);
    if (!fs.existsSync(OUTPUT_PATH)) {
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify({
        date: new Date().toISOString().split('T')[0],
        rates: { NPR: 133.50, INR: 83.40, GBP: 0.79, EUR: 0.92, AUD: 1.53, CAD: 1.36, JPY: 151.00 }
      }, null, 2));
    }
  }
}

main();
