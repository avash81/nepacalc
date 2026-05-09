const fs = require('fs');

const calcsContent = fs.readFileSync('src/data/calculators.tsx', 'utf8');
const seoContent = fs.readFileSync('src/data/seo-content.tsx', 'utf8');

// Extract all slugs from calculators.tsx
const slugRegex = /slug:\s*'([^']+)'/g;
let match;
const allSlugs = [];
while ((match = slugRegex.exec(calcsContent)) !== null) {
  allSlugs.push(match[1]);
}

// Check which slugs are missing from seo-content.tsx
// The key is the last part of the slug path
const missing = [];
const present = [];

for (const s of allSlugs) {
  const key = s.includes('/') ? s.split('/').pop() : s;
  if (seoContent.includes(`'${key}':`) || seoContent.includes(`"${key}":`)) {
    present.push(s);
  } else {
    missing.push({ original: s, key });
  }
}

console.log('PRESENT (' + present.length + '):');
present.forEach(s => console.log('  ✅ ' + s));
console.log('\nMISSING (' + missing.length + '):');
missing.forEach(m => console.log('  ❌ ' + m.original + ' (key: ' + m.key + ')'));
