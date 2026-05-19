const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/seo/nepal-specific.tsx');
let content = fs.readFileSync(file, 'utf8');

// Remove non-printable characters except newlines and tabs
content = content.replace(/[\u200B-\u200D\uFEFF]/g, '');

// Explicitly check for BOM again
if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Cleaned nepal-specific.tsx');
