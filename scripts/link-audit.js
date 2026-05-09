const fs = require('fs');

const content = fs.readFileSync('src/data/seo-content.tsx', 'utf8');
const sections = content.split('id: ');

console.log('Total sections:', sections.length - 1);
let countBelow4 = 0;
let totalInternal = 0;
let totalExternal = 0;

for (let i = 1; i < sections.length; i++) {
  const internalCount = (sections[i].match(/<a href="\//g) || []).length + (sections[i].match(/<Link href="\//g) || []).length;
  const externalCount = (sections[i].match(/<a href="(http|https):\/\//g) || []).length;
  
  totalInternal += internalCount;
  totalExternal += externalCount;
  
  if (internalCount < 4) countBelow4++;
}

console.log('Sections with < 4 internal links:', countBelow4);
console.log('Average internal links per section:', (totalInternal / (sections.length - 1)).toFixed(2));
console.log('Average external links per section:', (totalExternal / (sections.length - 1)).toFixed(2));
