const fs = require('fs');

const filePath = 'src/data/seo/financial.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const originalSalary = fs.readFileSync('scripts/original-salary.txt', 'utf8').trim();

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

const salaryKey = keys.find(x => x.name === 'nepal-salary');
if (!salaryKey) {
  console.error('nepal-salary key not found!');
  process.exit(1);
}

// Reconstruct file
const newContent = content.substring(0, salaryKey.index) + originalSalary + '\n\n' + content.substring(salaryKey.end);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully restored nepal-salary in financial.tsx!');
