const xlsx = require('xlsx');
const fs = require('fs');

try {
  // Load the workbook
  const filePath = 'research_keyword/NepaCal_Complete_SEO_Strategy_113_Pages.xlsx';
  const workbook = xlsx.readFile(filePath);
  
  console.log("Sheets found:", workbook.SheetNames);
  
  // Dump each sheet to JSON for easier processing
  const outputDir = 'scratch/excel_dump';
  if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
  }

  workbook.SheetNames.forEach(sheetName => {
      const sheet = workbook.Sheets[sheetName];
      const json = xlsx.utils.sheet_to_json(sheet);
      
      const outPath = `${outputDir}/${sheetName.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
      fs.writeFileSync(outPath, JSON.stringify(json, null, 2));
      console.log(`Saved ${sheetName} -> ${outPath} (${json.length} rows)`);
  });

  console.log("Successfully extracted Excel data!");
} catch (e) {
  console.error("Failed to parse Excel file:", e.message);
}
