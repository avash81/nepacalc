#!/usr/bin/env node
/**
 * fetch-rates.js
 * Pre-build script: fetches official FENEGOSIDA gold & silver rates
 * and writes to public/data/market-rates.json
 *
 * Run automatically via: npm run prebuild
 * Flow: FENEGOSIDA → Proxy A → Proxy B → keep existing (no HamroPatro)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const OUTPUT_PATH      = path.join(__dirname, '../public/data/market-rates.json');
const LIVE_RATES_PATH  = path.join(__dirname, '../public/data/live-rates.json');

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fetchUrl(url, timeoutMs = 12000) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NepaCalcBot/2.0; +https://nepacalc.com)',
        'Accept': 'text/html,application/xhtml+xml,*/*',
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location, timeoutMs).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ ok: res.statusCode < 400, status: res.statusCode, text: data }));
    });
    req.setTimeout(timeoutMs, () => { req.destroy(); reject(new Error('Timeout')); });
    req.on('error', reject);
  });
}

function parseGoldSilver(html) {
  // FENEGOSIDA Google Charts data format: ['YYYYMMDD', finePrice, tejabiPrice]
  const goldMatches = html.match(/\['\d{8}',([2-3]\d{5}),(\d+)\]/g);
  if (!goldMatches || goldMatches.length === 0) return null;

  const lastGold = goldMatches[goldMatches.length - 1];
  const parts = lastGold.replace(/['\[\]]/g, '').split(',');
  const fine = parseInt(parts[1], 10);
  const tejabi = parseInt(parts[2], 10) || 0;

  if (fine < 200000 || fine > 500000) return null;

  // Silver: FENEGOSIDA range 3000–8000/tola
  let silver = null;
  const silverMatches = html.match(/'\d{8}',([3-7]\d{3}),\d+/g);
  if (silverMatches && silverMatches.length > 0) {
    const lastS = silverMatches[silverMatches.length - 1];
    const sParsed = parseInt(lastS.split(',')[1], 10);
    if (sParsed > 3000 && sParsed < 8000) silver = sParsed;
  }

  return { fine, tejabi, silver };
}

function todayNPT() {
  // Nepal is UTC+5:45
  const now = new Date();
  const nptOffset = 5 * 60 + 45; // minutes
  const npt = new Date(now.getTime() + nptOffset * 60000);
  return npt.toISOString().split('T')[0];
}

function readExisting() {
  try {
    return JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8'));
  } catch {
    return null;
  }
}

function writeOutput(gold, tejabi, silver, source, verified) {
  const today = todayNPT();
  const nowNPT = new Date(Date.now() + (5 * 60 + 45) * 60000);
  const timeNPT = nowNPT.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) + ' NPT';

  const output = {
    gold: { tolaNPR: gold, tejabiTolaNPR: tejabi },
    silver: { tolaNPR: silver },
    date: today,
    source,
    updatedAt: new Date().toISOString(),
    verified,
    note: 'Auto-updated by scripts/fetch-rates.js before every build.'
  };

  // Write market-rates.json (static fallback for Googlebot)
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2));

  // Also write live-rates.json (primary source for the browser + rates.php)
  const liveOutput = {
    ...output,
    fetchedAt: new Date().toISOString(),
    timeNPT,
    fetchSource: 'prebuild script',
    fetchFailed: false,
    _status: 'fresh',
  };
  delete liveOutput.note;
  fs.mkdirSync(path.dirname(LIVE_RATES_PATH), { recursive: true });
  fs.writeFileSync(LIVE_RATES_PATH, JSON.stringify(liveOutput, null, 2));

  return output;
}

function validateChange(newVal, oldVal, name, maxAllowedDiff = 15000) {
  if (!oldVal) return true; // no baseline
  const diff = Math.abs(newVal - oldVal);
  if (diff > maxAllowedDiff) {
    console.warn(`  ⚠️  ${name} changed by Rs.${diff} — exceeds sanity threshold of Rs.${maxAllowedDiff}. Keeping old value.`);
    return false;
  }
  return true;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n📊 Fetching official FENEGOSIDA gold & silver rates...\n');

  const existing = readExisting();
  if (existing) {
    console.log(`  Current stored: Gold=${existing.gold?.tolaNPR}, Silver=${existing.silver?.tolaNPR}, Date=${existing.date}`);
  }

  const fenegosidaUrl = 'https://www.fenegosida.org/';
  const proxies = [
    // Proxy A — corsproxy.io (reliable, CDN-backed)
    `https://corsproxy.io/?url=${encodeURIComponent(fenegosidaUrl)}`,
    // Proxy B — allorigins (fallback)
    `https://api.allorigins.win/raw?url=${encodeURIComponent(fenegosidaUrl)}`,
    // Proxy C — thingproxy (last resort)
    `https://thingproxy.freeboard.io/fetch/${fenegosidaUrl}`,
  ];

  let parsed = null;
  let successProxy = null;

  for (const proxy of proxies) {
    const shortName = proxy.includes('corsproxy') ? 'corsproxy.io'
      : proxy.includes('allorigins') ? 'allorigins.win'
      : 'thingproxy';
    process.stdout.write(`  Trying ${shortName}... `);
    try {
      const res = await fetchUrl(proxy);
      if (res.ok) {
        parsed = parseGoldSilver(res.text);
        if (parsed) {
          console.log(`✅ Got data`);
          successProxy = shortName;
          break;
        } else {
          console.log(`⚠️  Connected but could not parse rates`);
        }
      } else {
        console.log(`❌ HTTP ${res.status}`);
      }
    } catch (e) {
      console.log(`❌ ${e.message}`);
    }
  }

  // ── Validation ──────────────────────────────────────────────────────────────
  if (parsed) {
    const goldOk = validateChange(parsed.fine, existing?.gold?.tolaNPR, 'Gold');
    const silverOk = !parsed.silver || validateChange(parsed.silver, existing?.silver?.tolaNPR, 'Silver', 2000);

    const finalGold = goldOk ? parsed.fine : (existing?.gold?.tolaNPR ?? 283200);
    const finalTejabi = goldOk ? parsed.tejabi : (existing?.gold?.tejabiTolaNPR ?? 282500);
    const finalSilver = (parsed.silver && silverOk) ? parsed.silver : (existing?.silver?.tolaNPR ?? 4320);

    const out = writeOutput(finalGold, finalTejabi, finalSilver, `FENEGOSIDA via ${successProxy}`, true);
    console.log(`\n✅ Written to market-rates.json:`);
    console.log(`   Gold 24K  : Rs. ${out.gold.tolaNPR.toLocaleString('en-IN')}`);
    console.log(`   Tejabi 22K: Rs. ${out.gold.tejabiTolaNPR.toLocaleString('en-IN') || 'Not Published'}`);
    console.log(`   Silver    : Rs. ${out.silver.tolaNPR.toLocaleString('en-IN')}`);
    console.log(`   Date (NPT): ${out.date}`);
    console.log(`   Source    : ${out.source}\n`);
  } else {
    // All proxies failed — keep existing verified data
    if (existing && existing.verified) {
      console.log(`\n⚠️  All proxies failed. Keeping last verified data from ${existing.date}.`);
      // Update the updatedAt so the build knows it tried
      existing.updatedAt = new Date().toISOString();
      existing.note = `All proxies failed at build time. Showing last verified FENEGOSIDA data from ${existing.date}.`;
      existing.fetchFailed = true;
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(existing, null, 2));
    } else {
      // No existing verified data — write safe defaults with warning
      console.log(`\n❌ All proxies failed and no verified baseline. Writing known defaults.`);
      writeOutput(283200, 282500, 4320, 'FENEGOSIDA Default (unverified)', false);
    }
  }
}

main().catch(err => {
  console.error('fetch-rates.js error:', err);
  // Never fail the build — just warn
  process.exit(0);
});
