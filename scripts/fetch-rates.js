#!/usr/bin/env node
/**
 * fetch-rates.js
 * Fetches official Gold & Silver rates from FENEGOSIDA.
 *
 * Source Hierarchy:
 *   1. Primary: FENEGOSIDA official API (/api/website/v1/Dashboard/today) [PUBLIC, no auth]
 *   2. Final fallback: Retain last verified official rate + set status='retained_fallback'
 *
 * Schema written per record:
 *   { gold, silver, source, source_url, rate_date, published_at, fetched_at, status }
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_PATH   = path.join(__dirname, '../public/data/market-rates.json');
const LIVE_RATES_PATH = path.join(__dirname, '../public/data/live-rates.json');

const FENEGOSIDA_API = 'https://api.fenegosida.org/api/website/v1/Dashboard/today';
const FENEGOSIDA_URL = 'https://www.fenegosida.org';

/**
 * IMPORTANT — Misleading API field name:
 * The FENEGOSIDA API field `todayBaseRatePerGram` is INCORRECTLY named.
 * The actual value is per the unit stated in the `rateType` string, NOT per gram.
 *
 * Verified 2026-08-16:
 *   rateType "छापावाल सुन (१ तोला)"  → todayBaseRatePerGram = 305,200  (= per tola, not per gram)
 *   rateType "असली चाँदी दर (१ तोला)" → todayBaseRatePerGram = 4,710    (= per tola, not per gram)
 *   rateType "छापावाल सुन (१० ग्राम)" → todayBaseRatePerGram = 261,660  (= per 10g)
 *
 * A true per-gram rate for gold would be ~26,166 NPR — so 305,200 is unambiguously per tola.
 * We only consume the (१ तोला) entries, so values are treated as per-tola throughout.
 * `yestardayDate` and `todayDate` are distinct ISO timestamps — no confusion possible.
 */

// Nepali rateType identifiers
const TYPES = {
  GOLD_TOLA:    'छापावाल सुन (१ तोला)',
  SILVER_TOLA:  'असली चाँदी दर (१ तोला)',
  GOLD_TEJABI:  'तेजाबी सुन (१ तोला)',
};

function fetchJson(url, timeoutMs = 12000) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NepaCalc-RateFetcher)',
        'Accept': 'application/json',
        'Origin': 'https://www.fenegosida.org',
        'Referer': 'https://www.fenegosida.org/',
      }
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
    req.setTimeout(timeoutMs, () => { req.destroy(); reject(new Error('Request timed out')); });
  });
}

function readExisting() {
  try { return JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8')); }
  catch { return null; }
}

function writeRates(output) {
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));
  fs.writeFileSync(LIVE_RATES_PATH, JSON.stringify(output, null, 2));
}

async function main() {
  console.log('\n📊 Fetching official Gold & Silver rates from FENEGOSIDA...\n');
  const existing = readExisting();
  const fetchedAt = new Date().toISOString();

  try {
    const data = await fetchJson(FENEGOSIDA_API);

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Empty or unexpected response from FENEGOSIDA API');
    }

    // Parse each rate type
    const goldEntry    = data.find(d => d.rateType === TYPES.GOLD_TOLA);
    const silverEntry  = data.find(d => d.rateType === TYPES.SILVER_TOLA);
    const tejabiEntry  = data.find(d => d.rateType === TYPES.GOLD_TEJABI);

    if (!goldEntry || !silverEntry) {
      throw new Error(`Missing required rate types. Got: ${data.map(d => d.rateType).join(', ')}`);
    }

    const goldTola    = goldEntry.todayBaseRatePerGram;
    const silverTola  = silverEntry.todayBaseRatePerGram;
    const tejabiTola  = tejabiEntry ? tejabiEntry.todayBaseRatePerGram : Math.round(goldTola - 700);
    const publishedAt = goldEntry.todayDate; // ISO timestamp from FENEGOSIDA
    const rateDate    = publishedAt.split('T')[0];

    const output = {
      gold: {
        tolaNPR:       { current: goldTola,   previous: goldEntry.yestardayBaseRatePerGram },
        tejabiTolaNPR: tejabiTola,
      },
      silver: {
        tolaNPR: { current: silverTola, previous: silverEntry.yestardayBaseRatePerGram },
      },
      source:      'FENEGOSIDA',
      source_url:  FENEGOSIDA_API,
      source_name: 'Federation of Nepal Gold & Silver Dealers\u2019 Association',
      rate_date:   rateDate,
      published_at: publishedAt,
      fetched_at:  fetchedAt,
      status:      'verified',
    };

    writeRates(output);

    // --- NEW: AUTOMATED DAILY HISTORY SYSTEM ---
    const historyPath = path.join(__dirname, '../public/data/daily-history.json');
    let history = [];
    try {
      if (fs.existsSync(historyPath)) {
        history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
      }
    } catch (e) {
      console.warn("Could not read daily-history.json", e);
    }
    
    // Check if today's date is already in history
    const existingIndex = history.findIndex(h => h.date === rateDate);
    const newEntry = {
      date: rateDate,
      gold: goldTola,
      silver: silverTola
    };
    
    if (existingIndex >= 0) {
      history[existingIndex] = newEntry; // Update if FENEGOSIDA changed it later in the day
    } else {
      history.unshift(newEntry); // Add to beginning
    }
    
    // Keep last 365 days to prevent file bloat
    if (history.length > 365) history = history.slice(0, 365);
    
    fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
    // -------------------------------------------

    console.log(`✅ FENEGOSIDA rates fetched successfully`);
    console.log(`   24K Gold (1 Tola): Rs. ${goldTola.toLocaleString()}`);
    console.log(`   Silver   (1 Tola): Rs. ${silverTola.toLocaleString()}`);
    console.log(`   Rate date:         ${rateDate}`);
    console.log(`   Published at:      ${publishedAt}`);
    console.log(`   Status:            verified`);

  } catch (error) {
    console.log(`\n⚠️  FENEGOSIDA fetch failed: ${error.message}`);

    // ── Final Fallback: retain last verified official rate ──────────────────
    if (existing && (existing.status === 'verified' || existing.status === 'retained_fallback')) {
      console.log(`🔄 Retaining last verified rate from ${existing.rate_date ?? existing.published_at}.`);

      const retained = {
        ...existing,
        fetched_at:  fetchedAt,
        updated_at:  fetchedAt,
        status:      'retained_fallback',
      };

      writeRates(retained);
      console.log(`   Status: retained_fallback (showing ${retained.rate_date} official rate)`);
    } else {
      console.error(`❌ No previous verified rate found to retain. Manual intervention required.`);
      process.exit(1);
    }
  }
}

main().catch(err => {
  console.error('fetch-rates.js fatal error:', err);
  process.exit(0);
});

