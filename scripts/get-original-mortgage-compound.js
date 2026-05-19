const { execSync } = require('child_process');
const fs = require('fs');

const fileContent = execSync('git show aeba4dc:src/data/seo/financial.tsx').toString();

const keyRegex = /^\s+'([\w-]+)':\s*\{/gm;
let match;
const keys = [];
while ((match = keyRegex.exec(fileContent)) !== null) {
  keys.push({
    name: match[1],
    index: match.index
  });
}
for (let i = 0; i < keys.length; i++) {
  keys[i].end = i < keys.length - 1 ? keys[i+1].index : fileContent.length;
}

const mortgageKey = keys.find(x => x.name === 'mortgage-calculator');
if (mortgageKey) {
  const mortgageBlock = fileContent.substring(mortgageKey.index, mortgageKey.end);
  fs.writeFileSync('scripts/original-mortgage.txt', mortgageBlock, 'utf8');
  console.log('Saved original-mortgage.txt');
}

const compoundKey = keys.find(x => x.name === 'compound-interest');
if (compoundKey) {
  const compoundBlock = fileContent.substring(compoundKey.index, compoundKey.end);
  fs.writeFileSync('scripts/original-compound.txt', compoundBlock, 'utf8');
  console.log('Saved original-compound.txt');
}
