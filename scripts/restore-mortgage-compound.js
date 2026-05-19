const fs = require('fs');

const filePath = 'src/data/seo/financial.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const originalMortgage = fs.readFileSync('scripts/original-mortgage.txt', 'utf8').trim();
const originalCompound = fs.readFileSync('scripts/original-compound.txt', 'utf8').trim();

// Find key boundaries
const keyRegex = /^\s+'([\w-]+)':\s*\{/gm;
let match;
const keys = [];
while ((match = keyRegex.exec(content)) !== null) {
  keys.push({
    name: match[1],
    index: match.index
  });
}
for (let i = 0; i < keys.length; i++) {
  keys[i].end = i < keys.length - 1 ? keys[i+1].index : content.length;
}

const mortgageKey = keys.find(x => x.name === 'mortgage-calculator');
const simpleInterestKey = keys.find(x => x.name === 'simple-interest');

if (!mortgageKey || !simpleInterestKey) {
  console.error('Keys not found!');
  process.exit(1);
}

// Reconstruct file
const replacement = originalMortgage + ',\n\n' + originalCompound + ',\n\n';
const newContent = content.substring(0, mortgageKey.index) + replacement + content.substring(simpleInterestKey.index);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully restored mortgage-calculator and compound-interest in financial.tsx!');
