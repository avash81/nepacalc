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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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
  // Extract all Rs.XXXXX/tola values from the HTML
  // ShareSansar format: <p>Rs.284,000/tola</p>
  const matches = [...html.matchAll(/Rs\.([0-9,]+)\/tola/gi)];
  if (matches.length < 3) return null;

  // matches[0] is Fine Gold, matches[1] is Tejabi Gold, matches[2] is Silver
  const fine = parseInt(matches[0][1].replace(/,/g, ''), 10);
  const tejabi = parseInt(matches[1][1].replace(/,/g, ''), 10) || 0;
  const silver = parseInt(matches[2][1].replace(/,/g, ''), 10);

  if (fine < 200000 || fine > 500000) return null;
  if (silver < 3000 || silver > 8000) return null;

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
  console.log('\n📊 Fetching official FENEGOSIDA gold & silver rates from ShareSansar...\n');

  const existing = readExisting();
  if (existing) {
    console.log(`  Current stored: Gold=${existing.gold?.tolaNPR}, Silver=${existing.silver?.tolaNPR}, Date=${existing.date}`);
  }

  const sourceUrl = 'https://www.sharesansar.com/bullion';
  let parsed = null;

  process.stdout.write(`  Trying sharesansar.com... `);
  try {
    const res = await fetchUrl(sourceUrl);
    if (res.ok) {
      parsed = parseGoldSilver(res.text);
      if (parsed) {
        console.log(`✅ Got data`);
      } else {
        console.log(`⚠️  Connected but could not parse rates`);
      }
    } else {
      console.log(`❌ HTTP ${res.status}`);
    }
  } catch (e) {
    console.log(`❌ ${e.message}`);
  }

  // ── Validation ──────────────────────────────────────────────────────────────
  if (parsed) {
    const goldOk = validateChange(parsed.fine, existing?.gold?.tolaNPR, 'Gold');
    const silverOk = !parsed.silver || validateChange(parsed.silver, existing?.silver?.tolaNPR, 'Silver', 2000);

    const finalGold = goldOk ? parsed.fine : (existing?.gold?.tolaNPR ?? 283200);
    const finalTejabi = goldOk ? parsed.tejabi : (existing?.gold?.tejabiTolaNPR ?? 282500);
    const finalSilver = (parsed.silver && silverOk) ? parsed.silver : (existing?.silver?.tolaNPR ?? 4320);

    const out = writeOutput(finalGold, finalTejabi, finalSilver, `ShareSansar`, true);
    console.log(`\n✅ Written to market-rates.json:`);
    console.log(`   Gold 24K  : Rs. ${out.gold.tolaNPR.toLocaleString('en-IN')}`);
    console.log(`   Tejabi 22K: Rs. ${out.gold.tejabiTolaNPR.toLocaleString('en-IN') || 'Not Published'}`);
    console.log(`   Silver    : Rs. ${out.silver.tolaNPR.toLocaleString('en-IN')}`);
    console.log(`   Date (NPT): ${out.date}`);
    console.log(`   Source    : ${out.source}\n`);
  } else {
    // Failed — keep existing verified data
    if (existing && existing.verified) {
      console.log(`\n⚠️  Failed to fetch. Keeping last verified data from ${existing.date}.`);
      // Update the updatedAt so the build knows it tried
      existing.updatedAt = new Date().toISOString();
      existing.note = `Fetch failed at build time. Showing last verified data from ${existing.date}.`;
      existing.fetchFailed = true;
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(existing, null, 2));
    } else {
      // No existing verified data — write safe defaults with warning
      console.log(`\n❌ Failed and no verified baseline. Writing known defaults.`);
      writeOutput(283200, 282500, 4320, 'Default (unverified)', false);
    }
  }
}

main().catch(err => {
  console.error('fetch-rates.js error:', err);
  // Never fail the build — just warn
  process.exit(0);
});
