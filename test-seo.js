const http = require('http');

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function testPage(url) {
  console.log(`\nFetching ${url}...`);
  try {
    const html = await fetchHTML(url);
    const matches = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/gs);
    if (!matches) {
      console.log('No ld+json found!');
      return;
    }
    console.log(`Found ${matches.length} ld+json tags.`);
    for (const match of matches) {
      const content = match.replace(/<\/?script[^>]*>/g, '').trim();
      const obj = JSON.parse(content);
      if (obj['@type'] === 'SoftwareApplication' || obj['@type'] === 'FAQPage' || obj['@type'] === 'HowTo') {
        console.log(`SUCCESS: Found ${obj['@type']} schema.`);
        if (obj['@type'] === 'FAQPage') {
            console.log(`  - FAQs count: ${obj.mainEntity.length}`);
        } else if (obj['@type'] === 'HowTo') {
            console.log(`  - Steps count: ${obj.step.length}`);
        }
      }
    }
  } catch (err) {
    console.error('Error fetching:', err.message);
  }
}

async function runTests() {
  await testPage('http://localhost:3005/calculator/loan-emi');
  await testPage('http://localhost:3005/calculator/nepal-income-tax');
}

runTests();
