const xlsx = require('xlsx');
const path = require('path');

const strategyFile = 'c:\\Users\\hp\\Desktop\\Movie\\calcpro-FIXED\\calcpro-final-build\\research_keyword\\NepaCal_Complete_SEO_Strategy_113_Pages.xlsx';
const wb = xlsx.readFile(strategyFile);

wb.SheetNames.forEach(name => {
    const sheet = wb.Sheets[name];
    const data = xlsx.utils.sheet_to_json(sheet);
    data.forEach((row, idx) => {
        const str = JSON.stringify(row).toLowerCase();
        if (str.includes('noindex')) {
            console.log(`Sheet: ${name}, Row: ${idx + 2}, Content:`, row);
        }
    });
});
