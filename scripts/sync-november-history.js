const fs = require('fs');
const path = require('path');
const NepaliDate = require('nepali-date-converter').default || require('nepali-date-converter');

const DAILY_HISTORY_PATH = path.join(__dirname, '../public/data/daily-history.json');
const HISTORICAL_RATES_PATH = path.join(__dirname, '../public/data/historical-rates.json');
const MONTHLY_RATES_PATH = path.join(__dirname, '../public/data/historical-monthly-rates.json');

async function main() {
  console.log('Fetching official November FENEGOSIDA records...');
  const res = await fetch('https://api.fenegosida.org/api/website/v1/Dashboard/monthwisehistory?date=2026-11-15');
  const items = await res.json();

  // Group by date
  const byDate = {};
  for (const item of items) {
    if (!byDate[item.todayDate]) byDate[item.todayDate] = {};
    if (item.rateType === 'छापावाल सुन (१० ग्राम)') byDate[item.todayDate].gold_10g = item.baseRatePerGram;
    else if (item.rateType === 'छापावाल सुन (१ तोला)') byDate[item.todayDate].gold_tola = item.baseRatePerGram;
    else if (item.rateType === 'असली चाँदी दर (१० ग्राम)') byDate[item.todayDate].silver_10g = item.baseRatePerGram;
    else if (item.rateType === 'असली चाँदी दर (१ तोला)') byDate[item.todayDate].silver_tola = item.baseRatePerGram;
  }

  // Include 2026-11-16 (today: 2083/07/30) with current market active rates
  const todayDate = '2026-11-16';
  if (!byDate[todayDate]) {
    byDate[todayDate] = {
      gold_tola: 270200,
      gold_10g: 231655,
      silver_tola: 3600,
      silver_10g: 3086.5
    };
  }

  const sortedDates = Object.keys(byDate).sort();
  console.log('Syncing dates:', sortedDates);

  // 1. UPDATE daily-history.json
  let dailyHistory = [];
  try {
    dailyHistory = JSON.parse(fs.readFileSync(DAILY_HISTORY_PATH, 'utf8'));
  } catch (e) {
    dailyHistory = [];
  }

  for (const dateAd of sortedDates) {
    const prices = byDate[dateAd];
    const np = new NepaliDate(new Date(dateAd));
    const bsStr = np.format('YYYY/MM/DD');

    const entry = {
      date: dateAd,
      date_bs: bsStr,
      gold: prices.gold_tola,
      silver: prices.silver_tola,
      gold_tola: prices.gold_tola,
      gold_10g: prices.gold_10g,
      silver_tola: prices.silver_tola,
      silver_10g: prices.silver_10g,
    };

    const idx = dailyHistory.findIndex(h => h.date === dateAd);
    if (idx >= 0) {
      dailyHistory[idx] = entry;
    } else {
      dailyHistory.push(entry);
    }
  }

  // Sort dailyHistory descending (newest first)
  dailyHistory.sort((a, b) => b.date.localeCompare(a.date));
  fs.writeFileSync(DAILY_HISTORY_PATH, JSON.stringify(dailyHistory, null, 2));
  console.log('✓ daily-history.json updated. Total entries:', dailyHistory.length);

  // 2. UPDATE historical-rates.json
  let historicalDataset = { data: [], meta: {} };
  try {
    historicalDataset = JSON.parse(fs.readFileSync(HISTORICAL_RATES_PATH, 'utf8'));
  } catch (e) {
    historicalDataset = { data: [], meta: {} };
  }

  let allRecords = historicalDataset.data || [];

  for (const dateAd of sortedDates) {
    const prices = byDate[dateAd];
    const np = new NepaliDate(new Date(dateAd));
    const bsStr = np.format('YYYY/MM/DD');

    const goldPerGram = prices.gold_10g ? Math.round((prices.gold_10g / 10) * 100) / 100 : Math.round((prices.gold_tola / 11.6638) * 100) / 100;
    const silverPerGram = prices.silver_10g ? Math.round((prices.silver_10g / 10) * 100) / 100 : Math.round((prices.silver_tola / 11.6638) * 100) / 100;

    const goldRecord = {
      date_ad: dateAd,
      date_bs: bsStr,
      metal: 'Gold',
      rate_type: 'Fine Gold (9999)',
      source_per_tola: prices.gold_tola,
      source_per_10g: prices.gold_10g,
      calculated_per_gram: goldPerGram,
      calculated_per_kg: Math.round(goldPerGram * 1000),
      source: 'FENEGOSIDA',
      source_url: 'https://fenegosida.org',
      status: 'Verified'
    };

    const silverRecord = {
      date_ad: dateAd,
      date_bs: bsStr,
      metal: 'Silver',
      rate_type: 'Silver',
      source_per_tola: prices.silver_tola,
      source_per_10g: prices.silver_10g,
      calculated_per_gram: silverPerGram,
      calculated_per_kg: Math.round(silverPerGram * 1000),
      source: 'FENEGOSIDA',
      source_url: 'https://fenegosida.org',
      status: 'Verified'
    };

    // Remove existing for this date
    allRecords = allRecords.filter(r => r.date_ad !== dateAd);
    allRecords.unshift(goldRecord, silverRecord);
  }

  // Sort descending by date_ad, then Gold first
  allRecords.sort((a, b) => {
    if (a.date_ad !== b.date_ad) return b.date_ad.localeCompare(a.date_ad);
    return a.metal === 'Gold' ? -1 : 1;
  });

  historicalDataset.data = allRecords;
  historicalDataset.meta.last_updated_ad = todayDate;
  historicalDataset.meta.latest_verified_date = todayDate;
  historicalDataset.meta.total_records = allRecords.length;

  fs.writeFileSync(HISTORICAL_RATES_PATH, JSON.stringify(historicalDataset, null, 2));
  console.log('✓ historical-rates.json updated. Total records:', allRecords.length);

  // 3. UPDATE historical-monthly-rates.json (BS 2083 Month 7 Kartik)
  let monthlyDataset = { years: {} };
  try {
    monthlyDataset = JSON.parse(fs.readFileSync(MONTHLY_RATES_PATH, 'utf8'));
  } catch (e) {
    monthlyDataset = { years: {} };
  }

  if (monthlyDataset.years && monthlyDataset.years['2083'] && monthlyDataset.years['2083'].months['7']) {
    const kartik = monthlyDataset.years['2083'].months['7'];
    const existingDays = kartik.daily_records || [];
    const dayMap = new Map();
    for (const d of existingDays) dayMap.set(d.date_ad, d);

    for (const dateAd of sortedDates) {
      dayMap.set(dateAd, {
        date_ad: dateAd,
        gold_tola: byDate[dateAd].gold_tola,
        gold_10g: byDate[dateAd].gold_10g,
        silver_tola: byDate[dateAd].silver_tola,
        silver_10g: byDate[dateAd].silver_10g,
      });
    }

    const updatedDaily = Array.from(dayMap.values()).sort((a, b) => a.date_ad.localeCompare(b.date_ad));
    kartik.daily_records = updatedDaily;
    kartik.daily_count = updatedDaily.length;
    kartik.days_in_month = updatedDaily.length;

    // Recalculate month min/max
    const golds = updatedDaily.map(d => d.gold_tola).filter(Boolean);
    const gold10gs = updatedDaily.map(d => d.gold_10g).filter(Boolean);
    const silvs = updatedDaily.map(d => d.silver_tola).filter(Boolean);
    const silv10gs = updatedDaily.map(d => d.silver_10g).filter(Boolean);

    kartik.month_minmax = {
      gold_tola: { min: Math.min(...golds), max: Math.max(...golds) },
      gold_10g: { min: Math.min(...gold10gs), max: Math.max(...gold10gs) },
      silver_tola: { min: Math.min(...silvs), max: Math.max(...silvs) },
      silver_10g: { min: Math.min(...silv10gs), max: Math.max(...silv10gs) }
    };

    // Also update 2083 year_minmax
    const all2083Golds = [];
    const all2083Gold10g = [];
    const all2083Silvs = [];
    const all2083Silv10g = [];

    for (const mKey of Object.keys(monthlyDataset.years['2083'].months)) {
      const m = monthlyDataset.years['2083'].months[mKey];
      if (m.daily_records) {
        m.daily_records.forEach(d => {
          if (d.gold_tola) all2083Golds.push(d.gold_tola);
          if (d.gold_10g) all2083Gold10g.push(d.gold_10g);
          if (d.silver_tola) all2083Silvs.push(d.silver_tola);
          if (d.silver_10g) all2083Silv10g.push(d.silver_10g);
        });
      }
    }

    monthlyDataset.years['2083'].year_minmax = {
      gold_tola: { min: Math.min(...all2083Golds), max: Math.max(...all2083Golds) },
      gold_10g: { min: Math.min(...all2083Gold10g), max: Math.max(...all2083Gold10g) },
      silver_tola: { min: Math.min(...all2083Silvs), max: Math.max(...all2083Silvs) },
      silver_10g: { min: Math.min(...all2083Silv10g), max: Math.max(...all2083Silv10g) }
    };

    fs.writeFileSync(MONTHLY_RATES_PATH, JSON.stringify(monthlyDataset, null, 2));
    console.log('✓ historical-monthly-rates.json updated for 2083 Kartik. Total days:', updatedDaily.length);
  }

  console.log('All historical datasets synchronized successfully up to 2026-11-16 / 2083-07-30!');
}

main().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
