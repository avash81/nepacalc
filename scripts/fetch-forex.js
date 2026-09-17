#!/usr/bin/env node
/**
 * fetch-forex.js  —  NepaCalc Official Forex Fetcher v3.0
 *
 * Strategy (in order):
 *   1. Fetch official NRB buy/sell rates (nrb.org.np) with 7-day lookback
 *      resolver to handle holidays and weekends gracefully.
 *   2. Fetch 150+ cross-rates from exchangerate-api.com (USD base).
 *   3. Merge into a single forex-rates.json that stores BOTH nrb_rates[]
 *      (with real buy/sell) AND cross_rates{} (indicative mid-market).
 *   4. NEVER overwrite yesterday's valid data with zeros or nulls —
 *      if all APIs fail, retain the last valid file untouched.
 *
 * Output: public/data/forex-rates.json
 */

const fs    = require('fs');
const path  = require('path');
const https = require('https');

const OUTPUT_PATH = path.join(__dirname, '../public/data/forex-rates.json');
const TIMEOUT_MS  = 15000;

// ─── helpers ─────────────────────────────────────────────────────────────────

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: { 'User-Agent': 'NepaCalc-RateFetcher/3.0' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(data)); }
          catch { reject(new Error(`JSON parse failed (HTTP ${res.statusCode})`)); }
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(TIMEOUT_MS, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function readExisting() {
  try { return JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8')); }
  catch { return null; }
}

function isoDate(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

// ─── Phase 1: NRB official buy/sell rates with lookback resolver ─────────────

async function fetchNRBRates() {
  // Try today, yesterday, … up to 7 days back (covers weekends + public holidays)
  for (let i = 0; i >= -7; i--) {
    const date = isoDate(i);
    const url  = `https://www.nrb.org.np/api/forex/v1/rates?page=1&per_page=100&from=${date}&to=${date}`;
    try {
      const json    = await fetchJson(url);
      const payload = json?.data?.payload;
      if (!Array.isArray(payload) || payload.length === 0) continue;

      const dayRates = payload[0]?.rates;
      if (!Array.isArray(dayRates) || dayRates.length === 0) continue;

      // Validate we have at least USD with real buy/sell
      const usd = dayRates.find(r => r.currency?.iso3 === 'USD');
      if (!usd || !usd.buy || parseFloat(usd.buy) <= 0) continue;

      console.log(`✅ NRB rates fetched for date: ${payload[0].date} (lookback: ${Math.abs(i)} day(s))`);
      return { date: payload[0].date, rates: dayRates };
    } catch (err) {
      console.warn(`   NRB attempt for ${date} failed: ${err.message}`);
    }
  }
  return null;
}

// ─── Phase 2: Cross-rates for 150+ currencies ────────────────────────────────

async function fetchCrossRates() {
  const urls = [
    'https://api.exchangerate-api.com/v4/latest/USD',
    'https://open.er-api.com/v6/latest/USD',
  ];
  for (const url of urls) {
    try {
      const json = await fetchJson(url);
      const r    = json.rates ?? json;
      if (!r || !r.NPR || r.NPR <= 0) continue;
      console.log(`✅ Cross-rates fetched from: ${url.split('/')[2]}`);
      return r;
    } catch (err) {
      console.warn(`   Cross-rate source ${url.split('/')[2]} failed: ${err.message}`);
    }
  }
  return null;
}

// ─── Phase 3: Build and write the unified output ─────────────────────────────

async function main() {
  console.log('\n💱 NepaCalc Forex Fetcher v3.0 — Starting...');

  const [nrb, cross] = await Promise.allSettled([fetchNRBRates(), fetchCrossRates()]);

  const nrbResult   = nrb.status   === 'fulfilled' ? nrb.value   : null;
  const crossResult = cross.status === 'fulfilled' ? cross.value : null;

  // If BOTH sources fail, retain last valid file unchanged
  if (!nrbResult && !crossResult) {
    const existing = readExisting();
    if (existing && existing.nrb_date) {
      console.warn('⚠️  All sources failed — retaining last valid forex-rates.json unchanged.');
      // Just update fetched_at so we know the cron ran
      existing.fetched_at    = new Date().toISOString();
      existing.source_status = 'retained_all_failed';
      fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(existing, null, 2));
      return;
    }
    console.error('❌ All sources failed and no valid cache exists. Aborting write.');
    return;
  }

  // ── Build nrb_rates[] from official NRB payload ──────────────────────────
  const nrb_rates = nrbResult
    ? nrbResult.rates
        .filter(r => r.currency?.iso3 && (r.buy || r.sell))
        .map(r => ({
          iso3  : r.currency.iso3,
          name  : r.currency.name,
          unit  : r.currency.unit,
          buy   : r.buy   ? parseFloat(r.buy)   : null,
          sell  : r.sell  ? parseFloat(r.sell)  : null,
          mid   : (r.buy && r.sell)
                    ? parseFloat(((parseFloat(r.buy) + parseFloat(r.sell)) / 2).toFixed(4))
                    : (r.buy ? parseFloat(r.buy) : parseFloat(r.sell)),
        }))
    : (readExisting()?.nrb_rates ?? []);

  // ── Build nrb lookup map for the converter (code → mid per 1 unit in NPR) ─
  const nrbMap = {};
  nrb_rates.forEach(r => {
    if (r.mid) nrbMap[r.iso3] = parseFloat((r.mid / r.unit).toFixed(6));
  });

  // ── Build cross_rates{} — all 150+ currencies in NPR per 1 unit ────────────
  let cross_rates = {};
  if (crossResult && crossResult.NPR) {
    const nprPerUsd = crossResult.NPR;
    Object.entries(crossResult).forEach(([code, usdRate]) => {
      if (code === 'NPR' || code === 'USD' || typeof usdRate !== 'number' || usdRate <= 0) return;
      // NPR per 1 unit of foreign currency = NPR/USD ÷ foreignCurrency/USD
      cross_rates[code] = parseFloat((nprPerUsd / usdRate).toFixed(6));
    });
    // Override with NRB official mid-rates where available (NRB is authoritative)
    Object.assign(cross_rates, nrbMap);
    // USD itself
    cross_rates['USD'] = parseFloat((nprPerUsd).toFixed(4));
  } else {
    // If cross-rate fetch failed but we have NRB, use NRB data alone
    cross_rates = nrbMap;
  }

  // ── Ensure INR is always exact NRB value (never float from cross-rate) ─────
  const inrNrb = nrb_rates.find(r => r.iso3 === 'INR');
  if (inrNrb && inrNrb.mid) {
    // NRB publishes INR per 100, so per-unit = mid / 100
    cross_rates['INR'] = parseFloat((inrNrb.mid / 100).toFixed(6));
  }

  const output = {
    nrb_date    : nrbResult?.date ?? null,
    fetched_at  : new Date().toISOString(),
    source_status: nrbResult ? 'nrb_official' : 'cross_rate_only',
    nrb_rates,          // 22 official currencies with real buy/sell/mid
    cross_rates,        // 150+ currencies in NPR-per-1-unit (NRB overrides where available)
  };

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

  // Print summary
  const usdEntry = nrb_rates.find(r => r.iso3 === 'USD');
  const aedEntry = nrb_rates.find(r => r.iso3 === 'AED');
  const inrEntry = nrb_rates.find(r => r.iso3 === 'INR');
  console.log('\n📊 Output Summary:');
  console.log(`   NRB date   : ${output.nrb_date}`);
  console.log(`   NRB rates  : ${nrb_rates.length} currencies`);
  console.log(`   Cross rates: ${Object.keys(cross_rates).length} currencies`);
  if (usdEntry) console.log(`   USD — Buy: ${usdEntry.buy}  Sell: ${usdEntry.sell}`);
  if (aedEntry) console.log(`   AED — Buy: ${aedEntry.buy}  Sell: ${aedEntry.sell}`);
  if (inrEntry) console.log(`   INR — Buy: ${inrEntry.buy}  Sell: ${inrEntry.sell} (per 100 INR)`);
  console.log('\n✅ forex-rates.json written successfully.\n');
}

main().catch(err => {
  console.error('fetch-forex.js fatal error:', err);
  process.exit(0); // Never fail CI pipeline for forex
});
