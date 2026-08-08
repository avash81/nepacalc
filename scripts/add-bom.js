const fs = require('fs');
let content = fs.readFileSync('scripts/fix-bulk.js', 'utf8');

// Replace both CSV blob constructors to include UTF-8 BOM
const before = "new Blob([csv], {type:'text/csv;charset=utf-8;'})";
const after   = "new Blob(['\\\\ufeff', csv], {type:'text/csv;charset=utf-8;'})";

let count = 0;
while (content.includes(before)) {
  content = content.replace(before, after);
  count++;
}

fs.writeFileSync('scripts/fix-bulk.js', content);
console.log(`Added UTF-8 BOM to ${count} CSV blob(s) in fix-bulk.js`);
