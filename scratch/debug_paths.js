const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const appDir = path.join(__dirname, '..', 'src', 'app');
const strategyFile = path.join(__dirname, '..', 'research_keyword', 'NepaCal_Complete_SEO_Strategy_113_Pages.xlsx');

// 1. Get all file system URLs
const fsUrls = [];
function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) walk(p);
        else if (f === 'page.tsx') fsUrls.push(path.relative(appDir, path.dirname(p)).replace(/\\/g, '/'));
    });
}
walk(appDir);

// 2. Get all Excel URLs
const wb = xlsx.readFile(strategyFile);
const mappingSheet = wb.Sheets['2. Keyword Mapping'];
const mappingRaw = xlsx.utils.sheet_to_json(mappingSheet, { header: 1 });
const excelUrls = [];
for (let i = 2; i < mappingRaw.length; i++) {
    const row = mappingRaw[i];
    if (row && row[3]) excelUrls.push(String(row[3]).trim().replace('nepacalc.com', '').replace(/^\/+/, '').replace(/\/+$/, '') || 'root');
}

console.log('--- FILE SYSTEM PATHS ---');
console.log(fsUrls.sort().join('\n'));
console.log('\n--- EXCEL TARGET URLs ---');
console.log(excelUrls.sort().join('\n'));
