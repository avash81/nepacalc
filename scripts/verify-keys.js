const fs = require('fs');
const c = fs.readFileSync('src/data/seo-content.tsx', 'utf8');
const keys = [
  'math-tools/calculus',
  'math-tools/matrix',
  'math-tools/statistics',
  'math-tools/programmer',
  'math-tools/scientific',
  'math-tools/fourfunction',
  'engineering/graphing',
  'engineering/formulas',
  'engineering/3d',
  'engineering/geometry',
  'market-rates/live-gold-price',
  'market-rates/remittance',
  'market-rates/exchange-rate',
];
keys.forEach(k => {
  const found = c.includes("'" + k + "'");
  console.log((found ? '✅' : '❌') + ' ' + k);
});
console.log('\nTotal lines in file:', c.split('\n').length);
