const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const dir = path.join(__dirname, '../research_keyword');
const files = fs.readdirSync(dir);

let keywords = [];

for (const file of files) {
  if (file.endsWith('.csv') || file.endsWith('.xlsx')) {
    const filePath = path.join(dir, file);
    try {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }); // array of arrays
      
      // Get the header row to find the keyword column
      const headers = data[0] || [];
      const keywordColIdx = headers.findIndex(h => typeof h === 'string' && h.toLowerCase().includes('keyword'));
      
      if (keywordColIdx !== -1) {
        // Just grab top 5 keywords to see what they look like
        for (let i = 1; i < Math.min(data.length, 6); i++) {
            if (data[i][keywordColIdx]) {
                keywords.push({ file, keyword: data[i][keywordColIdx] });
            }
        }
      }
    } catch(e) {
      console.log('Error reading', file);
    }
  }
}

console.log(JSON.stringify(keywords.slice(0, 20), null, 2));
