const fs = require('fs');
const content = fs.readFileSync('src/data/seo/nepal-specific.tsx', 'utf8');

const lines = content.split('\n');
lines.forEach((line, i) => {
  // Find < that is NOT followed by / or a tag name (a-z) or {
  // Or < that is inside text nodes
  const matches = line.matchAll(/<(?![a-zA-Z\/!{])/g);
  for (const match of matches) {
    console.log(`Line ${i + 1}: Suspicious < at col ${match.index + 1}: ${line.trim()}`);
  }
});
