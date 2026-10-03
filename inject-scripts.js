const fs = require('fs');
let c = fs.readFileSync('src/app/calculator/gold-converter/page.tsx', 'utf8');

// Find the exact marker using a regex that handles both \r\n and \n
const marker = /dangerouslySetInnerHTML=\{\{ __html: JSON\.stringify\(faqSchema\) \}\}\s*\/>/;

if (!marker.test(c)) {
  console.log('MARKER NOT FOUND');
  process.exit(1);
}

const newScripts = [
  'getWebPageSchema(rawDate)',
  'softwareAppSchema',
  'datasetSchema',
  'howToSchema'
].map(schema => `      <script\n        type="application/ld+json"\n        dangerouslySetInnerHTML={{ __html: JSON.stringify(${schema}) }}\n      />`).join('\n');

c = c.replace(marker, (m) => m + '\n' + newScripts);

fs.writeFileSync('src/app/calculator/gold-converter/page.tsx', c);
console.log('Done — 4 schema scripts injected');
