const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../public/data/historical-rates.json');
const csvPath = path.join(__dirname, '../public/data/historical-rates.csv');

let rawData = [];
let metadata = {};

try {
  const fileContent = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  rawData = fileContent.data || [];
  metadata = fileContent.meta || {};
} catch (e) {
  console.error('Error reading JSON:', e);
  process.exit(1);
}

const tolaToGrams = 11.664;

let verifiedGold = 0;
let verifiedSilver = 0;
let verifiedDates = new Set();
let earliestVerified = null;
let latestVerified = null;

const cleanedData = rawData.map(row => {
  let perTola = row.source_rate_tola ?? row.per_tola;
  if (perTola === 0) perTola = null;
  
  let per10g = row.source_rate_10g ?? row.per_10g;
  if (per10g === 0) per10g = null;
  
  let perGram = null;
  let perKg = null;
  if (perTola) {
    perGram = Number((perTola / tolaToGrams).toFixed(2));
    perKg = Number((perGram * 1000).toFixed(2));
  }
  
  const metal = (row.metal || '').toLowerCase();
  const metalDisplay = metal.charAt(0).toUpperCase() + metal.slice(1);
  
  let status = row.verification_status || row.status || 'Secondary-only';
  if (status.toLowerCase() === 'verified') status = 'Verified';
  if (status.toLowerCase() === 'secondary-only') status = 'Secondary-only';
  if (status.toLowerCase() === 'corroborated') status = 'Corroborated';
  if (status.toLowerCase() === 'conflict') status = 'Conflict';

  const date_ad = row.date_ad || row.date;

  if (status === 'Verified') {
    if (metal === 'gold') verifiedGold++;
    if (metal === 'silver') verifiedSilver++;
    verifiedDates.add(date_ad);
    if (!earliestVerified || date_ad < earliestVerified) earliestVerified = date_ad;
    if (!latestVerified || date_ad > latestVerified) latestVerified = date_ad;
  }
  
  return {
    date_ad: date_ad,
    date_bs: row.date_bs || null,
    metal: metalDisplay,
    rate_type: row.rate_type || (metal === 'gold' ? 'Fine Gold (9999)' : 'Silver'),
    source_per_tola: perTola,
    source_per_10g: per10g,
    calculated_per_gram: perGram,
    calculated_per_kg: perKg,
    source: row.source_name || row.source || 'Unknown',
    source_url: row.source_url || '',
    status: status
  };
});

// Sort by date_ad descending
cleanedData.sort((a, b) => new Date(b.date_ad) - new Date(a.date_ad));

const today = new Date().toISOString().split('T')[0];

const newMeta = {
  version: today.replace(/-/g, '.'),
  last_updated_ad: today,
  earliest_verified_date: earliestVerified,
  latest_verified_date: latestVerified,
  total_verified_records: verifiedGold + verifiedSilver,
  verified_gold_records: verifiedGold,
  verified_silver_records: verifiedSilver,
  verified_dates: verifiedDates.size,
  gaps_exist: true,
  last_updated: today,
  total_records: cleanedData.length,
  audit_summary: {
    total_records: cleanedData.length,
    verified_records: verifiedGold + verifiedSilver,
    secondary_only_records: cleanedData.length - (verifiedGold + verifiedSilver)
  }
};

fs.writeFileSync(jsonPath, JSON.stringify({ meta: newMeta, data: cleanedData }, null, 2));

const csvHeader = 'date_ad,date_bs,metal,rate_type,source_per_tola,source_per_10g,calculated_per_gram,calculated_per_kg,source,source_url,status\n';
const csvRows = cleanedData.map(r => {
  return [
    r.date_ad,
    r.date_bs || '',
    r.metal,
    '\"' + r.rate_type + '\"',
    r.source_per_tola || '',
    r.source_per_10g || '',
    r.calculated_per_gram || '',
    r.calculated_per_kg || '',
    '\"' + r.source + '\"',
    r.source_url || '',
    r.status
  ].join(',');
});
fs.writeFileSync(csvPath, csvHeader + csvRows.join('\n'));

console.log('Audit complete.');
console.log(newMeta);
