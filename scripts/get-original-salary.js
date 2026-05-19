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

const salaryKey = keys.find(x => x.name === 'nepal-salary');
if (salaryKey) {
  const originalBlock = fileContent.substring(salaryKey.index, salaryKey.end);
  fs.writeFileSync('scripts/original-salary.txt', originalBlock, 'utf8');
  console.log('Saved original-salary.txt');
} else {
  console.log('nepal-salary not found in aeba4dc');
}
