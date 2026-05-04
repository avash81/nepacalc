const fs = require('fs');
const path = require('path');

const calcDir = './src/app/calculator';
const files = fs.readdirSync(calcDir);
let issues = [];

files.forEach(dir => {
  const filePath = path.join(calcDir, dir, 'Calculator.tsx');
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = content.match(/href(?:=|:\s*)["']\/calculator\/[^"']+["']/g);
    const count = matches ? matches.length : 0;
    if (count < 4) {
      issues.push(`${dir} has ${count} cross-links.`);
    }
  }
});

console.log(`Total calculators checked: ${files.length}`);
if (issues.length > 0) {
  console.log('Calculators with < 4 links:\n' + issues.join('\n'));
} else {
  console.log('All calculators have 4+ internal links.');
}
