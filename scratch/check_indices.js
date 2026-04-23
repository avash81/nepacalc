const xlsx = require('xlsx');
const path = require('path');

const strategyFile = path.join(__dirname, '..', 'research_keyword', 'NepaCal_Complete_SEO_Strategy_113_Pages.xlsx');
const wb = xlsx.readFile(strategyFile);
const sheet = wb.Sheets[wb.SheetNames[1]];
const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });

console.log('Sheet 2 Headers (Row 1):', rows[0]);
console.log('Sheet 2 Headers (Row 2):', rows[1]);
console.log('Sheet 2 Data (Row 3):', rows[2]);
console.log('Sheet 2 Data (Row 4):', rows[3]);
