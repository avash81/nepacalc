const http = require('http');

async function fetchUrl(urlPath) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3004${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
    }).on('error', err => resolve({ status: 500, error: err.message }));
  });
}

async function runCompleteQAAudit() {
  console.log(`\n======================================================`);
  console.log(`🚀 NEPACALC AUTOMATED QA SUITE (PHASES 2, 3, 4)`);
  console.log(`======================================================\n`);

  let failures = 0;

  // ---------------------------------------------------------
  // PHASE 2: SECURITY & MIDDLEWARE
  // ---------------------------------------------------------
  console.log(`[PHASE 2] Executing Security Intrusion Check...`);
  const adminTest = await fetchUrl('/admin/posts/new');
  if (adminTest.status === 307 || adminTest.status === 308) {
    console.log(`✅ PASS: Unauthorized access blocked. Middleware redirected to: ${adminTest.headers.location}`);
  } else {
    console.error(`❌ FAIL: Admin route returned status ${adminTest.status}. Expected redirect.`);
    failures++;
  }

  // ---------------------------------------------------------
  // PHASE 3 & 4: UNIVERSAL REACH & SEMANTIC VALIDATION
  // ---------------------------------------------------------
  console.log(`\n[PHASE 3] Extracting dynamic platform architecture from Sitemap...`);
  const sitemapTest = await fetchUrl('/sitemap.xml');
  
  if (sitemapTest.status !== 200 || !sitemapTest.data.includes('<urlset')) {
    console.error(`❌ FAIL: Sitemap generation failed or malformed.`);
    failures++;
    return;
  }

  const urlsRegex = /<loc>(https?:\/\/[^\/]+)?([^<]+)<\/loc>/g;
  let matches;
  const paths = [];
  while ((matches = urlsRegex.exec(sitemapTest.data)) !== null) {
      if (matches[2]) paths.push(matches[2]);
  }

  console.log(`✅ PASS: Extracted ${paths.length} active nodes/calculators.`);

  console.log(`\n[PHASE 4] Commencing high-speed routing & SEO payload extraction across ALL ${paths.length} pages...`);
  let passedNodes = 0;
  let semanticNodesFound = 0;

  // We will run this in batches so we don't blow up the Node connection pool
  const batchSize = 10;
  for (let i = 0; i < paths.length; i += batchSize) {
    const batch = paths.slice(i, i + batchSize);
    const results = await Promise.all(batch.map(p => fetchUrl(p)));

    results.forEach((res, index) => {
      const p = batch[index];
      if (res.status === 200) {
        passedNodes++;
        // Check for JSON-LD semantic dominance
        if (res.data.includes('application/ld+json')) {
            semanticNodesFound++;
        }
      } else {
        console.error(`❌ FAIL: Routing failed for ${p} - Status: ${res.status}`);
        failures++;
      }
    });
  }

  console.log(`✅ PASS: Navigation & Load Audit complete. ${passedNodes}/${paths.length} pages returned HTTP 200 OK.`);
  console.log(`✅ PASS: Semantic Dominance Audit complete. ${semanticNodesFound}/${paths.length} pages contain active JSON-LD Schema payloads.`);

  console.log(`\n======================================================`);
  if (failures === 0 && passedNodes === paths.length && semanticNodesFound === paths.length) {
      console.log(`🏆 PLATFORM CERTIFICATION APPROVED: 100% SUCCESS.`);
  } else {
      console.log(`⚠️ PLATFORM CERTIFICATION FAILED with ${failures} errors.`);
  }
  console.log(`======================================================\n`);
}

runCompleteQAAudit().catch(console.error);
