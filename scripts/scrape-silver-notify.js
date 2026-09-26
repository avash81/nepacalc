/**
 * scrape-silver-notify.js
 * Scrapes all silver price history from NotifyNepal using their API.
 * Saves results to silver_notifynepal_raw.json
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '..', 'silver_notifynepal_raw.json');
const BASE_URL = 'https://notifynepal.com';
const DELAY_MS = 500; // polite delay between requests

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function discoverApiEndpoint() {
  // Try common API patterns used by NotifyNepal
  const candidates = [
    '/api/silver-price-history',
    '/api/silver/history',
    '/en/api/silver-price-history-nepal',
    '/api/v1/silver-price-history',
    '/silver-price-history/api',
  ];

  console.log('Discovering API endpoint...');
  for (const endpoint of candidates) {
    try {
      const res = await axios.get(BASE_URL + endpoint, {
        params: { page: 1, per_page: 20 },
        headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        timeout: 8000,
      });
      if (res.status === 200 && (Array.isArray(res.data) || res.data?.data)) {
        console.log(`Found endpoint: ${endpoint}`);
        return endpoint;
      }
    } catch (_) {}
  }
  return null;
}

async function scrapeViaApi(endpoint) {
  let page = 1;
  let allRecords = [];
  let totalPages = null;

  while (true) {
    console.log(`Fetching page ${page}${totalPages ? `/${totalPages}` : ''}...`);
    try {
      const res = await axios.get(BASE_URL + endpoint, {
        params: { page, per_page: 20 },
        headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        timeout: 15000,
      });

      const body = res.data;
      let records = [];

      // Handle different API response shapes
      if (Array.isArray(body)) {
        records = body;
        if (records.length === 0) break;
      } else if (body?.data && Array.isArray(body.data)) {
        records = body.data;
        if (body.last_page) totalPages = body.last_page;
        if (body.total_pages) totalPages = body.total_pages;
        if (records.length === 0) break;
      } else {
        console.log('Unexpected response shape:', JSON.stringify(body).slice(0, 200));
        break;
      }

      // Normalize records
      const normalized = records.map(r => {
        // Try to extract AD date, BS date, tola price, 10g price
        return {
          date_ad: r.date_ad || r.dateAd || r.date || r.created_at?.split('T')[0] || null,
          date_bs: r.date_bs || r.dateBS || r.bs_date || null,
          tola: parseFloat(r.tola || r.per_tola || r.price_tola || r.rate_tola || 0) || null,
          per_10g: parseFloat(r.per_10g || r.per10g || r.price_10g || r.rate_10g || 0) || null,
        };
      });

      allRecords = allRecords.concat(normalized);
      console.log(`  → Got ${records.length} records (total so far: ${allRecords.length})`);

      if (totalPages && page >= totalPages) break;
      if (records.length < 20) break; // last page
      page++;
      await sleep(DELAY_MS);
    } catch (err) {
      console.error(`Error on page ${page}:`, err.message);
      break;
    }
  }

  return allRecords;
}

async function scrapeViaHTMLPage() {
  // Fallback: try fetching page HTML and look for embedded JSON data
  console.log('Trying HTML page scrape with page param...');
  let page = 1;
  let allRecords = [];

  while (true) {
    try {
      const res = await axios.get(`${BASE_URL}/en/silver-price-history-nepal`, {
        params: { page },
        headers: {
          'Accept': 'text/html,application/xhtml+xml',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        timeout: 15000,
      });

      const html = res.data;

      // Look for JSON data in script tags or data attributes
      const jsonMatches = html.match(/window\.__INITIAL_STATE__\s*=\s*({.+?});/s) ||
                          html.match(/window\.priceData\s*=\s*(\[.+?\]);/s) ||
                          html.match(/"prices"\s*:\s*(\[.+?\])/s);

      if (jsonMatches) {
        try {
          const data = JSON.parse(jsonMatches[1]);
          const records = Array.isArray(data) ? data : data?.prices || data?.data || [];
          if (records.length === 0) break;

          const normalized = records.map(r => ({
            date_ad: r.date_ad || r.date || null,
            date_bs: r.date_bs || null,
            tola: parseFloat(r.tola || r.per_tola || 0) || null,
            per_10g: parseFloat(r.per_10g || 0) || null,
          }));

          allRecords = allRecords.concat(normalized);
          console.log(`Page ${page}: got ${records.length} records (total: ${allRecords.length})`);

          if (records.length < 20) break;
          page++;
          await sleep(DELAY_MS);
        } catch (parseErr) {
          console.log('JSON parse error:', parseErr.message);
          break;
        }
      } else {
        // Try table scraping
        const tableRows = html.match(/<tr[^>]*>(.+?)<\/tr>/gs) || [];
        if (tableRows.length <= 1) break; // only header

        const dataRows = tableRows.slice(1).map(row => {
          const cells = (row.match(/<td[^>]*>(.+?)<\/td>/gs) || [])
            .map(cell => cell.replace(/<[^>]+>/g, '').trim());
          return cells;
        }).filter(cells => cells.length >= 2);

        if (dataRows.length === 0) break;

        const normalized = dataRows.map(cells => ({
          date_ad: cells[0] || null,
          date_bs: cells[1] || null,
          tola: parseFloat((cells[2] || '').replace(/,/g, '')) || null,
          per_10g: parseFloat((cells[3] || '').replace(/,/g, '')) || null,
        }));

        allRecords = allRecords.concat(normalized);
        console.log(`Page ${page}: got ${dataRows.length} records from table (total: ${allRecords.length})`);

        if (dataRows.length < 15) break;
        page++;
        await sleep(DELAY_MS);
      }
    } catch (err) {
      console.error(`Error on page ${page}:`, err.message);
      break;
    }
  }

  return allRecords;
}

async function tryDirectApiPatterns() {
  // NotifyNepal uses Laravel/similar backends — try XHR endpoints
  const patterns = [
    { url: `${BASE_URL}/en/silver-price-history`, method: 'GET' },
    { url: `${BASE_URL}/silver-price/history`, method: 'GET' },
    { url: `${BASE_URL}/api/metal-prices?metal=silver`, method: 'GET' },
    { url: `${BASE_URL}/en/gold-silver-price-history/api`, method: 'GET' },
  ];

  for (const p of patterns) {
    for (let pg = 1; pg <= 2; pg++) {
      try {
        const res = await axios.get(p.url, {
          params: { page: pg, type: 'silver', metal: 'silver' },
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Referer': `${BASE_URL}/en/silver-price-history-nepal`,
          },
          timeout: 8000,
        });
        if (res.status === 200 && typeof res.data === 'object' && !res.data?.error) {
          console.log(`✓ Working endpoint: ${p.url} (page ${pg})`);
          console.log('Sample response:', JSON.stringify(res.data).slice(0, 500));
          return p.url;
        }
      } catch (_) {}
    }
  }
  return null;
}

async function main() {
  console.log('=== NotifyNepal Silver Price Scraper ===\n');

  let records = [];

  // Step 1: Try to discover API endpoint
  const apiEndpoint = await discoverApiEndpoint();

  if (apiEndpoint) {
    records = await scrapeViaApi(apiEndpoint);
  } else {
    // Step 2: Try direct API patterns
    const workingUrl = await tryDirectApiPatterns();
    if (workingUrl) {
      // Re-scrape using found URL
      let page = 1;
      while (true) {
        const res = await axios.get(workingUrl, {
          params: { page, per_page: 20 },
          headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
          timeout: 15000,
        });
        const data = res.data?.data || res.data;
        const rows = Array.isArray(data) ? data : [];
        if (rows.length === 0) break;
        records = records.concat(rows.map(r => ({
          date_ad: r.date_ad || r.date || null,
          date_bs: r.date_bs || null,
          tola: parseFloat(r.tola || r.per_tola || 0) || null,
          per_10g: parseFloat(r.per_10g || 0) || null,
        })));
        console.log(`Page ${page}: ${rows.length} rows (total: ${records.length})`);
        if (rows.length < 20) break;
        page++;
        await sleep(DELAY_MS);
      }
    } else {
      // Step 3: HTML page scrape
      records = await scrapeViaHTMLPage();
    }
  }

  if (records.length === 0) {
    console.log('\n❌ Could not extract any records. The site may require JS rendering.');
    console.log('Try: 1) Check Network tab in browser for XHR calls, 2) Use Playwright/Puppeteer');
    process.exit(1);
  }

  // Save
  const output = {
    scraped_at: new Date().toISOString(),
    source: 'https://notifynepal.com/en/silver-price-history-nepal',
    total_records: records.length,
    records,
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf8');

  console.log(`\n✓ Saved ${records.length} records to ${OUTPUT_FILE}`);
  if (records.length > 0) {
    const sorted = [...records].sort((a, b) => (a.date_ad || '').localeCompare(b.date_ad || ''));
    console.log(`Date range: ${sorted[0]?.date_ad} → ${sorted[sorted.length - 1]?.date_ad}`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
