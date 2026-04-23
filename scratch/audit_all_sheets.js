const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const researchDir = path.join(__dirname, '..', 'research_keyword');

// ── 1. Dump all sheets from the strategy doc ──────────────────────────────────
const strategyFile = path.join(researchDir, 'NepaCal_Complete_SEO_Strategy_113_Pages.xlsx');
const wb = xlsx.readFile(strategyFile);

console.log(`\n=== NepaCal_Complete_SEO_Strategy_113_Pages.xlsx ===`);
console.log(`Sheets (${wb.SheetNames.length}): ${wb.SheetNames.join(', ')}\n`);

for (const sheetName of wb.SheetNames) {
    const data = xlsx.utils.sheet_to_json(wb.Sheets[sheetName], { defval: '' });
    console.log(`\n--- Sheet: "${sheetName}" (${data.length} rows) ---`);
    if (data.length > 0) {
        console.log('Columns:', Object.keys(data[0]).join(' | '));
        // Show first 3 rows
        for (let i = 0; i < Math.min(3, data.length); i++) {
            const row = data[i];
            const preview = Object.entries(row)
                .map(([k, v]) => `${k}: "${String(v).substring(0, 60)}"`)
                .join(' || ');
            console.log(`  Row ${i+1}: ${preview}`);
        }
    }
}

// ── 2. Sample each competitor file for column names ───────────────────────────
console.log(`\n\n=== COMPETITOR FILES COLUMN AUDIT ===\n`);
const files = fs.readdirSync(researchDir).filter(f => f !== 'NepaCal_Complete_SEO_Strategy_113_Pages.xlsx');

for (const file of files) {
    const fp = path.join(researchDir, file);
    try {
        let cols = [];
        let sampleKw = '';
        if (file.endsWith('.csv')) {
            const lines = fs.readFileSync(fp, 'utf8').split('\n');
            cols = lines[0].split(';').map(c => c.trim());
            const firstDataLine = lines[1] ? lines[1].split(';') : [];
            sampleKw = firstDataLine[0] || '';
        } else {
            const wb2 = xlsx.readFile(fp);
            const data = xlsx.utils.sheet_to_json(wb2.Sheets[wb2.SheetNames[0]], { defval: '' });
            cols = data.length > 0 ? Object.keys(data[0]) : [];
            sampleKw = data.length > 0 ? String(Object.values(data[0])[0]).substring(0, 50) : '';
        }
        console.log(`${file.substring(0, 65).padEnd(65)} | cols: [${cols.slice(0,4).join(', ')}] | sample: "${sampleKw}"`);
    } catch(e) {
        console.log(`${file.substring(0, 65).padEnd(65)} | ERROR: ${e.message}`);
    }
}
