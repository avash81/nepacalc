#!/usr/bin/env node
/**
 * fetch-forex.js
 * Fetches live forex rates from exchangerate-api.com (free tier, no key needed).
 * Falls back to NRB API if primary fails, then retains last known data.
 *
 * Output: public/data/forex-rates.json
 * Format: { date, base, rates: { NPR, INR, USD, GBP, EUR, AUD, CAD, JPY, ... }, source, fetched_at }
 */

const fs   = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_PATH = path.join(__dirname, '../public/data/forex-rates.json');
const TIMEOUT_MS  = 12000;

// Primary: exchangerate-api.com free tier (USD base, 160+ currencies)
const PRIMARY_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

// Secondary: Open Exchange Rates alternative
const SECONDARY_URL = 'https://open.er-api.com/v6/latest/USD';

function fetchJson(url, timeoutMs = TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: { 'User-Agent': 'NepaCalc-RateFetcher/2.0' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(data)); }
          catch { reject(new Error(`JSON parse failed (status ${res.statusCode})`)); }
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
}

function readExisting() {
  try { return JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8')); }
  catch { return null; }
}

function writeForex(data, source) {
  const today = new Date().toISOString().split('T')[0];
  const output = {
    date:       today,
    base:       'USD',
    source,
    fetched_at: new Date().toISOString(),
    rates:      data.rates ?? data,
  };
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  return output;
}

async function main() {
  console.log('\n💱 Fetching live forex rates...');
  
  // Try primary source
  try {
    const data = await fetchJson(PRIMARY_URL);
    const rates = data.rates;
    if (!rates || !rates.NPR) throw new Error('NPR rate missing from response');
    const output = writeForex(data, 'exchangerate-api.com');
    console.log(`✅ Forex rates fetched from exchangerate-api.com`);
    console.log(`   1 USD = NPR ${rates.NPR}`);
    console.log(`   1 USD = INR ${rates.INR}`);
    console.log(`   1 USD = EUR ${rates.EUR}`);
    console.log(`   1 USD = GBP ${rates.GBP}`);
    return;
  } catch (err) {
    console.warn(`⚠️  Primary forex source failed: ${err.message}`);
  }

  // Try secondary source
  try {
    const data = await fetchJson(SECONDARY_URL);
    const rates = data.rates;
    if (!rates || !rates.NPR) throw new Error('NPR rate missing from response');
    const output = writeForex(data, 'open.er-api.com');
    console.log(`✅ Forex rates fetched from open.er-api.com (fallback)`);
    console.log(`   1 USD = NPR ${rates.NPR}`);
    return;
  } catch (err) {
    console.warn(`⚠️  Secondary forex source failed: ${err.message}`);
  }

  // Retain last known data
  const existing = readExisting();
  if (existing && existing.rates && existing.rates.NPR) {
    console.log(`🔄 Retaining last known forex rates from ${existing.date}`);
    const retained = { ...existing, fetched_at: new Date().toISOString(), status: 'retained_fallback' };
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(retained, null, 2));
    console.log(`   1 USD = NPR ${existing.rates.NPR} (retained)`);
    return;
  }

  // Hard fallback — write static rates so the site doesn't break
  console.warn('⚠️  All forex sources failed. Writing static fallback rates.');
  writeForex({
    rates: { NPR: 133.50, INR: 83.40, GBP: 0.79, EUR: 0.92, AUD: 1.53, CAD: 1.36, JPY: 151.00, CNY: 7.24, SGD: 1.34 }
  }, 'static_fallback');
}

main().catch(err => {
  console.error('fetch-forex.js fatal error:', err);
  process.exit(0); // Don't fail the CI pipeline for forex
});
