const fs = require('fs');

let page = fs.readFileSync('src/app/calculator/gold-converter/page.tsx', 'utf8');
const newTables = fs.readFileSync('new-tables.html', 'utf8');

// 1. Remove the old "Nepal Gold Conversion Table"
// It starts with `<div className="overflow-x-auto mb-6">` immediately after `<h2 id="conversion-table"...`
// and ends right before `<h3 className="font-bold text-slate-900 mb-2 mt-8">1. Core Gold Weight Conversion</h3>`

const h2Index = page.indexOf('<h2 id="conversion-table"');
const t1Index = page.indexOf('<h3 className="font-bold text-slate-900 mb-2 mt-8">1. Core Gold Weight Conversion</h3>');

if (h2Index === -1 || t1Index === -1) {
    console.log("Could not find headers");
    process.exit(1);
}

// Find the start of the <div className="overflow-x-auto mb-6"> after h2
const divStart = page.indexOf('<div className="overflow-x-auto mb-6">', h2Index);

if (divStart === -1 || divStart > t1Index) {
    console.log("Could not find the old table div");
    process.exit(1);
}

// We will remove from divStart up to t1Index
const p1 = page.substring(0, divStart);
const p2 = page.substring(t1Index);
page = p1 + p2;

// 2. Replace Tables 2-10 with the newly generated Tables 2-9
const t2Index = page.indexOf('<h3 className="font-bold text-slate-900 mb-2 mt-8">2. Tola → Gram / Aana / Lal</h3>');
const officialStandardIndex = page.indexOf('<h2 id="official-standard"');

if (t2Index === -1 || officialStandardIndex === -1) {
    console.log("Could not find table 2 or official standard header");
    process.exit(1);
}

const p3 = page.substring(0, t2Index);
const p4 = page.substring(officialStandardIndex);

page = p3 + newTables + '\n          ' + p4;

fs.writeFileSync('src/app/calculator/gold-converter/page.tsx', page);
console.log("Successfully updated page.tsx");
