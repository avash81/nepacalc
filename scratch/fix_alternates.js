const fs = require('fs');
const path = require('path');

const files = [
  'src/app/terms/page.tsx',
  'src/app/privacy/page.tsx',
  'src/app/nepal/page.tsx',
  'src/app/math-tools/page.tsx',
  'src/app/math-tools/matrix/page.tsx',
  'src/app/market-rates/live-gold-price/page.tsx',
  'src/app/market-rates/layout.tsx',
  'src/app/health/page.tsx',
  'src/app/guide/[slug]/page.tsx',
  'src/app/guide/page.tsx',
  'src/app/finance/page.tsx',
  'src/app/engineering/page.tsx',
  'src/app/directory/page.tsx',
  'src/app/engineering/3d/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/converters/page.tsx',
  'src/app/blog/page.tsx',
  'src/app/blog/[slug]/page.tsx',
  'src/app/about/page.tsx'
];

let changedCount = 0;

for (const file of files) {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.warn('Not found:', file);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Find canonical: '...', or canonical: `...`, or canonical: "..."
  // Specifically we want to add a / before the closing quote if it's not there.
  content = content.replace(/(canonical:\s*['"`]https:\/\/nepacalc\.com\/(?:[^'"`]+?[^/])?)(['"`])/g, '$1/$2');
  
  // Also fix relative canonicals: canonical: '/about' -> canonical: '/about/'
  content = content.replace(/(canonical:\s*['"`]\/(?:[^'"`]+?[^/])?)(['"`])/g, '$1/$2');
  
  // Also fix languages alternates
  content = content.replace(/('en-NP':\s*['"`]https:\/\/nepacalc\.com\/(?:[^'"`]+?[^/])?)(['"`])/g, '$1/$2');
  content = content.replace(/('x-default':\s*['"`]https:\/\/nepacalc\.com\/(?:[^'"`]+?[^/])?)(['"`])/g, '$1/$2');

  // Edge cases where the regex might add an extra slash if it was exactly https://nepacalc.com
  content = content.replace(/https:\/\/nepacalc\.com\/\//g, 'https://nepacalc.com/');
  content = content.replace(/canonical:\s*['"`]\/\/['"`]/g, "canonical: '/'");

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    changedCount++;
    console.log('Fixed:', file);
  }
}

console.log('Total fixed:', changedCount);
