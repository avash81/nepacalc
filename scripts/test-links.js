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

for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let nextKey = keys[i+1];
    let startIndex = content.indexOf(`'${key}': {`);
    let endIndex = nextKey ? content.indexOf(`'${nextKey}': {`, startIndex) : content.length;
    let section = content.substring(startIndex, endIndex);
    
    // Check both <a href and <Link href
    const internalsA = section.match(/<a href="\/(calculator|math-tools|engineering|market-rates|health|finance|education|utility)[^>]*>/g) || [];
    const internalsLink = section.match(/<Link href="\/(calculator|math-tools|engineering|market-rates|health|finance|education|utility)[^>]*>/g) || [];
    
    const totalInternal = internalsA.length + internalsLink.length;
    
    if (totalInternal < 4) {
        console.log(key, 'has', totalInternal, 'internals');
    }
}
