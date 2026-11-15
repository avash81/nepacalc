/**
 * fetch-fenegosida-monthly-history.js
 *
 * Fetches official historical gold & silver prices from FENEGOSIDA API
 * for every month of BS years 2070–2083.
 *
 * Data saved to: public/data/historical-monthly-rates.json
 *
 * API endpoints:
 *   Daily: GET https://api.fenegosida.org/api/website/v1/Dashboard/monthwisehistory?date={AD_DATE}
 *   Month Min/Max: GET https://api.fenegosida.org/api/website/v1/Dashboard/ratehistory?weekMonthYear=month:{AD_DATE}
 *   Year Min/Max: GET https://api.fenegosida.org/api/website/v1/Dashboard/ratehistory?weekMonthYear=year:{AD_DATE}
 */

const fs = require('fs');
const path = require('path');

// Bikram Sambat calendar matrix (days per month)
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

const BS_MONTH_NAMES = [
  'Baishakh', 'Jestha', 'Ashadh', 'Shrawan',
  'Bhadra', 'Ashwin', 'Kartik', 'Mangsir',
  'Poush', 'Magh', 'Falgun', 'Chaitra'
];

// Convert BS date to AD date string (YYYY-MM-DD)
function bsToAd(year, month, day = 1) {
  const W0 = Math.floor(Date.UTC(2013, 3, 14) / 864e5);
  let days = 0;
  for (let y = 2070; y < year; y++) days += bu[y].reduce((a, b) => a + b, 0);
  for (let m = 0; m < month - 1; m++) days += bu[year][m];
  days += day - 1;
  return new Date((W0 + days) * 864e5).toISOString().slice(0, 10);
}

// Sleep utility
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch with retry
async function fetchWithRetry(url, retries = 3, delayMs = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${url}`);
      return await res.json();
    } catch (err) {
      console.error(`  Attempt ${attempt}/${retries} failed: ${err.message}`);
      if (attempt < retries) await sleep(delayMs * attempt);
      else throw err;
    }
  }
}

// Parse daily records for a month into structured form
function parseDailyRecords(records) {
  // Group by date
  const byDate = {};
  for (const rec of records) {
    if (!byDate[rec.todayDate]) byDate[rec.todayDate] = {};
    if (rec.rateType === 'छापावाल सुन (१० ग्राम)') byDate[rec.todayDate].gold_10g = rec.baseRatePerGram;
    else if (rec.rateType === 'छापावाल सुन (१ तोला)') byDate[rec.todayDate].gold_tola = rec.baseRatePerGram;
    else if (rec.rateType === 'असली चाँदी दर (१० ग्राम)') byDate[rec.todayDate].silver_10g = rec.baseRatePerGram;
    else if (rec.rateType === 'असली चाँदी दर (१ तोला)') byDate[rec.todayDate].silver_tola = rec.baseRatePerGram;
  }
  return Object.entries(byDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, prices]) => ({ date_ad: date, ...prices }));
}

// Parse min/max records
function parseMinMax(records) {
  const result = {};
  for (const rec of records) {
    if (rec.rateType === 'छापावाल सुन (१० ग्राम)') result.gold_10g = { min: rec.minBaseRatePerGram, max: rec.maxBaseRatePerGram };
    else if (rec.rateType === 'छापावाल सुन (१ तोला)') result.gold_tola = { min: rec.minBaseRatePerGram, max: rec.maxBaseRatePerGram };
    else if (rec.rateType === 'असली चाँदी दर (१० ग्राम)') result.silver_10g = { min: rec.minBaseRatePerGram, max: rec.maxBaseRatePerGram };
    else if (rec.rateType === 'असली चाँदी दर (१ तोला)') result.silver_tola = { min: rec.minBaseRatePerGram, max: rec.maxBaseRatePerGram };
  }
  return result;
}

async function main() {
  const outputPath = path.join(__dirname, '..', 'public', 'data', 'historical-monthly-rates.json');
  
  // Check if we have a partial run to resume from
  let existingData = { meta: null, years: {} };
  if (fs.existsSync(outputPath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
      console.log('Resuming from existing data...');
    } catch (e) {
      console.log('Starting fresh...');
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const todayYear = new Date().getFullYear();
  const todayMonth = new Date().getMonth() + 1;

  const START_YEAR = 2070;
  const END_YEAR = 2083;
  
  const result = { years: existingData.years || {} };
  
  // Year-level year min/max (fetched once per year)
  const yearMinMaxCache = {};

  let totalMonthsFetched = 0;
  let totalErrors = 0;

  for (let bsYear = START_YEAR; bsYear <= END_YEAR; bsYear++) {
    if (!result.years[bsYear]) result.years[bsYear] = { year_bs: bsYear, months: {}, year_minmax: null };
    
    // Fetch year min/max (use first month's AD date)
    if (!result.years[bsYear].year_minmax) {
      const adFirst = bsToAd(bsYear, 1, 1);
      try {
        console.log(`Fetching year ${bsYear} min/max (AD: ${adFirst})...`);
        const yrData = await fetchWithRetry(
          `https://api.fenegosida.org/api/website/v1/Dashboard/ratehistory?weekMonthYear=year:${adFirst}`
        );
        result.years[bsYear].year_minmax = parseMinMax(yrData);
        yearMinMaxCache[bsYear] = result.years[bsYear].year_minmax;
        await sleep(200);
      } catch (err) {
        console.error(`  ERROR fetching year ${bsYear} min/max:`, err.message);
        totalErrors++;
      }
    } else {
      console.log(`Year ${bsYear} min/max already cached, skipping.`);
    }

    for (let bsMonth = 1; bsMonth <= 12; bsMonth++) {
      const monthKey = `${bsMonth}`;
      
      // Skip if already fetched
      if (result.years[bsYear].months[monthKey] && result.years[bsYear].months[monthKey].daily_records) {
        console.log(`  ${bsYear}/${bsMonth} already fetched, skipping.`);
        continue;
      }

      const adDate = bsToAd(bsYear, bsMonth, 1);

      // Skip future months (the API won't have data)
      if (adDate > today) {
        console.log(`  ${bsYear}/${bsMonth} (${adDate}) is in the future, skipping.`);
        continue;
      }

      console.log(`  Fetching ${bsYear}/${BS_MONTH_NAMES[bsMonth-1]} (AD: ${adDate})...`);
      
      let dailyRecords = [];
      let monthMinMax = {};
      let fetchedDaily = false;
      let fetchedMinMax = false;

      // Fetch daily records
      try {
        const dayData = await fetchWithRetry(
          `https://api.fenegosida.org/api/website/v1/Dashboard/monthwisehistory?date=${adDate}`
        );
        dailyRecords = parseDailyRecords(dayData);
        fetchedDaily = true;
        await sleep(200);
      } catch (err) {
        console.error(`    ERROR daily records:`, err.message);
        totalErrors++;
      }

      // Fetch month min/max
      try {
        const minMaxData = await fetchWithRetry(
          `https://api.fenegosida.org/api/website/v1/Dashboard/ratehistory?weekMonthYear=month:${adDate}`
        );
        monthMinMax = parseMinMax(minMaxData);
        fetchedMinMax = true;
        await sleep(200);
      } catch (err) {
        console.error(`    ERROR month min/max:`, err.message);
        totalErrors++;
      }

      result.years[bsYear].months[monthKey] = {
        year_bs: bsYear,
        month_bs: bsMonth,
        month_name: BS_MONTH_NAMES[bsMonth - 1],
        ad_start_date: adDate,
        days_in_month: bu[bsYear][bsMonth - 1],
        fetch_ok: fetchedDaily && fetchedMinMax,
        month_minmax: monthMinMax,
        daily_records: dailyRecords,
        daily_count: dailyRecords.length
      };

      totalMonthsFetched++;
      
      // Save checkpoint every 10 months
      if (totalMonthsFetched % 10 === 0) {
        const checkpoint = buildOutput(result, today);
        fs.writeFileSync(outputPath, JSON.stringify(checkpoint, null, 2), 'utf8');
        console.log(`  [Checkpoint saved: ${totalMonthsFetched} months processed]`);
      }
    }
  }

  // Final save
  const output = buildOutput(result, today);
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');
  
  // Summary
  let totalDailyRecords = 0;
  let monthsWithData = 0;
  for (const yrKey of Object.keys(output.years)) {
    for (const moKey of Object.keys(output.years[yrKey].months)) {
      const mo = output.years[yrKey].months[moKey];
      totalDailyRecords += (mo.daily_records || []).length;
      if ((mo.daily_records || []).length > 0) monthsWithData++;
    }
  }

  console.log('\n========== DONE ==========');
  console.log(`Months with data: ${monthsWithData}`);
  console.log(`Total daily records: ${totalDailyRecords}`);
  console.log(`Total errors: ${totalErrors}`);
  console.log(`Output saved to: ${outputPath}`);
  console.log(`File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
}

function buildOutput(result, today) {
  let totalMonths = 0;
  let totalDailyRecords = 0;
  let monthsWithData = 0;

  for (const yrKey of Object.keys(result.years)) {
    for (const moKey of Object.keys(result.years[yrKey].months)) {
      totalMonths++;
      const mo = result.years[yrKey].months[moKey];
      const count = (mo.daily_records || []).length;
      totalDailyRecords += count;
      if (count > 0) monthsWithData++;
    }
  }

  return {
    meta: {
      description: 'Official FENEGOSIDA historical gold & silver prices by BS month (2070–2083)',
      source: 'https://api.fenegosida.org/api/website/v1',
      generated_at: today,
      bs_years_covered: `2070–2083`,
      total_months: totalMonths,
      months_with_data: monthsWithData,
      total_daily_records: totalDailyRecords,
      rate_types: {
        gold_10g: 'छापावाल सुन (१० ग्राम) - Fine Gold per 10 grams (NPR)',
        gold_tola: 'छापावाल सुन (१ तोला) - Fine Gold per 1 Tola (NPR)',
        silver_10g: 'असली चाँदी दर (१० ग्राम) - Silver per 10 grams (NPR)',
        silver_tola: 'असली चाँदी दर (१ तोला) - Silver per 1 Tola (NPR)'
      }
    },
    years: result.years
  };
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
