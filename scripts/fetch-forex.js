#!/usr/bin/env node
/**
 * fetch-forex.js
 * Fetches official currency exchange rates from Nepal Rastra Bank (NRB) API.
 * Adheres to strict source hierarchy and audit schema.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_PATH = path.join(__dirname, '../public/data/forex-rates.json');
const NRB_API_URL = 'https://www.nrb.org.np/api/forex/v1/rates';

function todayNPT() {
  const now = new Date();
  const nptOffset = 5 * 60 + 45;
  const npt = new Date(now.getTime() + nptOffset * 60000);
  return npt.toISOString().split('T')[0];
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 10000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Invalid JSON response'));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    }).on('error', reject).on('timeout', reject);
  });
}

function readExisting() {
  try {
    return JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8'));
  } catch {
    return null;
  }
}

async function main() {
  console.log('\n📊 Fetching official Currency rates from NRB API...\n');
  const today = todayNPT();
  const existing = readExisting();

  try {
    const url = `${NRB_API_URL}?page=1&per_page=1&from=${today}&to=${today}`;
    const response = await fetchUrl(url);

    if (response?.data?.payload?.length > 0) {
      const payload = response.data.payload[0];
      const rates = payload.rates;
      const publishedAt = payload.date;

      const output = {
        rates: rates,
        source: 'Nepal Rastra Bank (NRB)',
        source_url: url,
        published_at: publishedAt,
        updated_at: new Date().toISOString(),
        fetched_at: new Date().toISOString(),
        status: 'verified'
      };

      fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
      
      console.log(`✅ Successfully fetched official NRB rates for ${publishedAt}`);
      console.log(`   Source: ${output.source}`);
      return;
    } else {
      throw new Error('No payload data found for today');
    }
  } catch (error) {
    console.log(`⚠️ NRB API Fetch Failed: ${error.message}`);
    
    // Fallback: Retain previous verified rate + alert
    if (existing && (existing.status === 'verified' || existing.status === 'retained_fallback')) {
      console.log(`🔄 Retaining last verified official rate from ${existing.published_at}.`);
      existing.updated_at = new Date().toISOString();
      existing.status = 'retained_fallback';
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(existing, null, 2));
    } else {
      console.log(`❌ No previous verified rate found to retain.`);
    }
  }
}

main().catch(err => {
  console.error('fetch-forex.js fatal error:', err);
  process.exit(0);
});
