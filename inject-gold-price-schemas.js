const fs = require('fs');

let content = fs.readFileSync('src/app/market-rates/live-gold-price/page.tsx', 'utf8');

// Exact marker from the file (note the \r\n endings)
const marker = `          }} \r\n        />\r\n  \r\n        {/* ── Server-rendered SEO header`;

if (!content.includes(marker)) {
  // Try with \n only
  const markerLF = `          }} \n        />\n  \n        {/* ── Server-rendered SEO header`;
  if (!content.includes(markerLF)) {
    console.log('MARKER NOT FOUND - dumping 20 chars around /> for debug');
    const idx = content.indexOf('        />');
    console.log(JSON.stringify(content.substring(idx - 10, idx + 60)));
    process.exit(1);
  }
}

const newSchemas = `
      {/* ── FAQPage schema — AEO: powers FAQ rich results ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": "https://nepacalc.com/market-rates/live-gold-price/#faq-schema",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the gold price in Nepal today?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": \`Today's official gold price in Nepal is Rs. \${gold24k ? gold24k.toLocaleString('en-IN') : 'N/A'} per Tola for 24K Hallmark Gold and Rs. \${gold22k ? gold22k.toLocaleString('en-IN') : 'N/A'} per Tola for 22K Tejabi Gold, as published by FENEGOSIDA.\`
              }
            },
            {
              "@type": "Question",
              "name": "Who sets the gold price in Nepal?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Federation of Nepal Gold and Silver Dealers Association (FENEGOSIDA) sets the official gold price in Nepal daily. Their rates are the benchmark used by all licensed gold and silver dealers across the country."
              }
            },
            {
              "@type": "Question",
              "name": "What is the difference between 24K Hallmark and 22K Tejabi gold in Nepal?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "24K Hallmark gold (Chhapawal) is pure 99.9% gold and carries the highest price. 22K Tejabi gold is 91.6% pure gold alloyed with other metals, making it more durable for jewellery. FENEGOSIDA publishes separate daily rates for both grades."
              }
            },
            {
              "@type": "Question",
              "name": "How much is 1 gram of gold in Nepal today?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": \`1 gram of 24K Hallmark gold in Nepal today costs approximately Rs. \${gold24k ? Math.round(gold24k / 11.6638).toLocaleString('en-IN') : 'N/A'}, calculated from the FENEGOSIDA rate of Rs. \${gold24k ? gold24k.toLocaleString('en-IN') : 'N/A'} per Tola (1 Tola = 11.6638 grams).\`
              }
            },
            {
              "@type": "Question",
              "name": "How often does the gold price change in Nepal?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "FENEGOSIDA publishes new official gold rates once every business day, typically by 11:00 AM Nepal Time (NPT). The rate reflects international spot market movements and import costs for that day."
              }
            },
            {
              "@type": "Question",
              "name": "How many grams is 1 Tola of gold in Nepal?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "1 Tola of gold equals 11.6638 grams in Nepal. This is the official FENEGOSIDA measurement standard. 1 Tola also equals 16 Aana or 100 Lal."
              }
            }
          ]
        })}}
      />
      {/* ── Dataset schema — GEO: makes price data citable by AI engines ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dataset",
          "@id": "https://nepacalc.com/market-rates/live-gold-price/#dataset",
          "name": "Live Gold Price in Nepal — FENEGOSIDA Daily Rates",
          "description": "Official daily gold and silver prices in Nepal published by FENEGOSIDA. Includes 24K Hallmark, 22K Tejabi gold rates and silver rates per Tola and per 10 grams.",
          "url": "https://nepacalc.com/market-rates/live-gold-price/",
          "creator": { "@type": "Organization", "name": "NepaCalc", "url": "https://nepacalc.com" },
          "isAccessibleForFree": true,
          "inLanguage": "en",
          "license": "https://creativecommons.org/licenses/by/4.0/",
          "dateModified": new Date(rawDate).toISOString(),
          "variableMeasured": ["Gold Price 24K per Tola NPR", "Gold Price 22K per Tola NPR", "Silver Price per Tola NPR", "Gold Price per 10g NPR"],
          "measurementTechnique": "Official FENEGOSIDA benchmark rate published daily",
          "hasPart": [
            { "@type": "Dataset", "name": "Today's Gold Price by Unit", "url": "https://nepacalc.com/market-rates/live-gold-price/#gold-conversion-table" },
            { "@type": "Dataset", "name": "Nepal Gold Price History", "url": "https://nepacalc.com/market-rates/live-gold-price/#gold-price-history" }
          ]
        })}}
      />
      {/* ── Speakable schema — AIO: tells Google AI Overview which sections to cite ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://nepacalc.com/market-rates/live-gold-price/#speakable",
          "speakable": {
            "@type": "SpeakableSpecification",
            "cssSelector": ["#todays-gold-price", "#quick-answer", "#faq"]
          }
        })}}
      />`;

// Use regex to handle both \r\n and \n endings
const markerRegex = /(\s*\}\}\s*\n\s*\/>)\s*\n(\s*\{\/\*\s*──\s*Server-rendered SEO header)/;

if (!markerRegex.test(content)) {
  console.log('Regex marker not found. Trying direct string replace...');
  // Find the /> that closes JsonLd and the comment after it
  const closeIdx = content.lastIndexOf('/>');
  if (closeIdx === -1) { console.log('No /> found'); process.exit(1); }
  content = content.substring(0, closeIdx + 2) + '\n' + newSchemas + content.substring(closeIdx + 2);
  fs.writeFileSync('src/app/market-rates/live-gold-price/page.tsx', content);
  console.log('Done via lastIndexOf fallback');
} else {
  content = content.replace(markerRegex, (m, p1, p2) => p1 + '\n' + newSchemas + '\n' + p2);
  fs.writeFileSync('src/app/market-rates/live-gold-price/page.tsx', content);
  console.log('Done via regex — FAQPage, Dataset, Speakable schemas injected');
}
