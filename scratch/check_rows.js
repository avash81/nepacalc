const xlsx = require('xlsx');
const path = require('path');

const strategyFile = 'c:\\Users\\hp\\Desktop\\Movie\\calcpro-FIXED\\calcpro-final-build\\research_keyword\\NepaCal_Complete_SEO_Strategy_113_Pages.xlsx';
const wb = xlsx.readFile(strategyFile);
const sheet = wb.Sheets['2. Keyword Mapping'];
const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

// Note: Rows in data are 0-indexed. Row 1 is header, Row 2 is #1.
// So #4 is at index 5. #98 is at index 99.
console.log('Row 4 (#3):', data[4]);
console.log('Row 5 (#4):', data[5]);
console.log('Row 98 (#97):', data[98]);
console.log('Row 99 (#98):', data[99]);
