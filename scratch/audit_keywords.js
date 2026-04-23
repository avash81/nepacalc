const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const researchDir = path.join(__dirname, '..', 'research_keyword');
const files = fs.readdirSync(researchDir);

let grandTotal = 0;
const report = [];

for (const file of files) {
    const fp = path.join(researchDir, file);
    const stat = fs.statSync(fp);
    let count = 0;

    if (file.endsWith('.csv')) {
        const lines = fs.readFileSync(fp, 'utf8').split('\n').slice(1).filter(l => l.trim());
        count = lines.length;
    } else if (file.endsWith('.xlsx')) {
        try {
            const wb = xlsx.readFile(fp);
            const sheet = wb.Sheets[wb.SheetNames[0]];
            const data = xlsx.utils.sheet_to_json(sheet);
            count = data.length;
        } catch(e) {
            count = 0;
        }
    }

    grandTotal += count;
    report.push({ file: file.substring(0, 70), count });
}

report.sort((a, b) => b.count - a.count);

console.log('\n=== COMPETITOR KEYWORD DATA AUDIT ===\n');
console.log(`${'FILE'.padEnd(72)} | KEYWORDS`);
console.log('-'.repeat(85));
for (const r of report) {
    console.log(`${r.file.padEnd(72)} | ${r.count.toLocaleString()}`);
}
console.log('-'.repeat(85));
console.log(`TOTAL KEYWORDS ACROSS ALL ${report.length} FILES: ${grandTotal.toLocaleString()}`);
