const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/seo-content.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /'([a-zA-Z0-9-]+)':\s*{/g;
let match;
const keys = [];
while ((match = regex.exec(content)) !== null) {
    keys.push(match[1]);
}

let missingInternal = [];
let missingExternal = [];

for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let nextKey = i < keys.length - 1 ? keys[i+1] : null;
    
    let startIndex = content.indexOf(`'${key}': {`);
    let endIndex = nextKey ? content.indexOf(`'${nextKey}': {`, startIndex) : content.length;
    let sectionContent = content.substring(startIndex, endIndex);

    const internalMatches = sectionContent.match(/<a href="\/(calculator|math-tools|engineering|market-rates|health|finance|education|utility)[^>]*>/g) || [];
    const externalMatches = sectionContent.match(/<a href="(https?:\/\/[^"]+)"[^>]*>/g) || [];
    
    if (internalMatches.length < 4) missingInternal.push(key);
    
    // Check if it has a non-nepacalc external link
    let hasExternal = false;
    for (let link of externalMatches) {
       if (!link.includes('nepacalc.com')) {
           hasExternal = true;
           break;
       }
    }
    if (!hasExternal) missingExternal.push(key);
}

console.log(`Calculators: ${keys.length}`);
console.log(`Missing Internal (<4): ${missingInternal.length}`);
console.log(`Missing External (0): ${missingExternal.length}`);
