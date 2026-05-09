const fs = require('fs');
const src = fs.readFileSync('src/data/seo-content.tsx', 'utf8');
const lines = src.split('\n');
// Show lines 7878-7895 (0-indexed: 7877-7894)
for (let i = 7877; i <= 7894 && i < lines.length; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
