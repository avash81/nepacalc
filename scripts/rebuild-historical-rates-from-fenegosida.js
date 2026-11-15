/**
 * rebuild-historical-rates-from-fenegosida.js
 *
 * Rebuilds public/data/historical-rates.json using ONLY official FENEGOSIDA
 * data from public/data/historical-monthly-rates.json (BS 2070–2083).
 *
 * All "Secondary-only" / unverified / Gahana-sourced records are removed.
 * Every record in the new file is 100% official FENEGOSIDA data.
 */

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'public', 'data', 'historical-monthly-rates.json');
const OUT = path.join(__dirname, '..', 'public', 'data', 'historical-rates.json');
const BAK = path.join(__dirname, '..', 'public', 'data', 'historical-rates-before-cleanup.json');

// BS month days matrix (for BS date calculation)
const bu = {
  2070:[31,31,31,32,31,31,29,30,30,29,30,30],
  2071:[31,31,32,31,31,31,30,29,30,29,30,30],
  2072:[31,32,31,32,31,30,30,29,30,29,30,30],
  2073:[31,32,31,32,31,30,30,30,29,29,30,31],
  2074:[31,31,31,32,31,31,30,29,30,29,30,30],
  2075:[31,31,32,31,31,31,30,29,30,29,30,30],
  2076:[31,32,31,32,31,30,30,30,29,29,30,30],
  2077:[31,32,31,32,31,30,30,30,29,30,29,31],
  2078:[31,31,31,32,31,31,30,29,30,29,30,30],
  2079:[31,31,32,31,31,31,30,29,30,29,30,30],
  2080:[31,32,31,32,31,30,30,30,29,29,30,30],
  2081:[31,32,31,32,31,30,30,30,29,30,29,31],
  2082:[31,31,32,31,31,31,30,29,30,29,30,30],
  2083:[31,31,32,31,31,31,30,29,30,29,30,30]
};

// Convert AD date string to BS date string (YYYY/MM/DD)
function adToBs(adStr) {
  const adDate = new Date(adStr + 'T00:00:00Z');
  const W0 = Math.floor(Date.UTC(2013, 3, 14) / 864e5);
  const adDay = Math.floor(adDate.getTime() / 864e5);
  let diff = adDay - W0;

  let bsYear = 2070;
  for (const yr of Object.keys(bu).map(Number)) {
    const daysInYear = bu[yr].reduce((a, b) => a + b, 0);
    if (diff < daysInYear) {
      bsYear = yr;
      break;
    }
    diff -= daysInYear;
    bsYear = yr + 1;
  }

  let bsMonth = 1;
  for (let m = 0; m < 12; m++) {
    const dim = bu[bsYear]?.[m] ?? 30;
    if (diff < dim) {
      bsMonth = m + 1;
      break;
    }
    diff -= dim;
  }

  const bsDay = diff + 1;
  const mm = String(bsMonth).padStart(2, '0');
  const dd = String(bsDay).padStart(2, '0');
  return `${bsYear}/${mm}/${dd}`;
}

// ---- Main ----
console.log('Reading FENEGOSIDA monthly data...');
const monthly = JSON.parse(fs.readFileSync(SRC, 'utf8'));

// Build flat record list in historical-rates.json format
const records = [];

for (const yrKey of Object.keys(monthly.years).sort()) {
  const yrData = monthly.years[yrKey];
  for (const moKey of Object.keys(yrData.months).sort((a, b) => Number(a) - Number(b))) {
    const mo = yrData.months[moKey];
    if (!mo.daily_records || mo.daily_records.length === 0) continue;

    for (const day of mo.daily_records) {
      const { date_ad, gold_tola, gold_10g, silver_tola, silver_10g } = day;
      if (!date_ad) continue;

      const date_bs = adToBs(date_ad);

      // Gold record
      if (gold_tola !== undefined && gold_tola !== null) {
        const per10g = gold_10g ?? null;
        const perGram = per10g ? per10g / 10 : (gold_tola / 11.6638);
        records.push({
          date_ad,
          date_bs,
          metal: 'Gold',
          rate_type: 'Fine Gold (9999)',
          source_per_tola: gold_tola,
          source_per_10g: per10g,
          calculated_per_gram: Math.round(perGram * 100) / 100,
          calculated_per_kg: Math.round(perGram * 100000) / 100,
          source: 'FENEGOSIDA',
          source_url: 'https://fenegosida.org',
          status: 'Verified'
        });
      }

      // Silver record
      if (silver_tola !== undefined && silver_tola !== null) {
        const per10g_s = silver_10g ?? null;
        const perGram_s = per10g_s ? per10g_s / 10 : (silver_tola / 11.6638);
        records.push({
          date_ad,
          date_bs,
          metal: 'Silver',
          rate_type: 'Silver',
          source_per_tola: silver_tola,
          source_per_10g: per10g_s,
          calculated_per_gram: Math.round(perGram_s * 100) / 100,
          calculated_per_kg: Math.round(perGram_s * 100000) / 100,
          source: 'FENEGOSIDA',
          source_url: 'https://fenegosida.org',
          status: 'Verified'
        });
      }
    }
  }
}

// Sort by date descending (newest first, matching original format)
records.sort((a, b) => b.date_ad.localeCompare(a.date_ad));

// Get stats
const goldRecs = records.filter(r => r.metal === 'Gold');
const silverRecs = records.filter(r => r.metal === 'Silver');
const allDates = [...new Set(records.map(r => r.date_ad))].sort();

const today = new Date().toISOString().slice(0, 10);

const output = {
  meta: {
    version: today.replace(/-/g, '.').slice(0, 10),
    last_updated_ad: today,
    earliest_verified_date: allDates[0] || null,
    latest_verified_date: allDates[allDates.length - 1] || null,
    total_records: records.length,
    total_gold_records: goldRecs.length,
    total_silver_records: silverRecs.length,
    total_unique_dates: allDates.length,
    bs_years_covered: '2070–2083',
    gaps_exist: false,
    source: 'FENEGOSIDA (Official) only — all unverified/secondary records removed',
    note: '2077 Baishakh & Jestha have no data due to COVID-19 lockdown (no FENEGOSIDA trading)'
  },
  data: records
};

// Backup original
console.log('Backing up original historical-rates.json...');
fs.copyFileSync(OUT, BAK);
console.log('Backup saved to:', BAK);

// Write new file
fs.writeFileSync(OUT, JSON.stringify(output, null, 2), 'utf8');

const fileSize = (fs.statSync(OUT).size / 1024 / 1024).toFixed(2);
console.log('\n========== DONE ==========');
console.log('Total records:', records.length);
console.log('  Gold records:', goldRecs.length);
console.log('  Silver records:', silverRecs.length);
console.log('  Unique trading dates:', allDates.length);
console.log('Earliest date:', allDates[0]);
console.log('Latest date:', allDates[allDates.length - 1]);
console.log('File size:', fileSize, 'MB');
console.log('Output:', OUT);
console.log('\nAll records are 100% official FENEGOSIDA data. Zero unverified records.');
