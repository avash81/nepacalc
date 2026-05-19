const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/seo/nepal-specific.tsx');
let content = fs.readFileSync(file, 'utf8');

// Pattern to find each item's content block
// It starts with 'content: (' and ends with '), followed by faqs or another key'
const itemRegex = /content: \([\s\S]+?\n\s+\),/g;

content = content.replace(itemRegex, (block) => {
    const openTags = (block.match(/<div/g) || []).length;
    const closeTags = (block.match(/<\/div>/g) || []).length;
    
    if (openTags > closeTags) {
        const diff = openTags - closeTags;
        console.log(`Adding ${diff} missing closing divs to a block.`);
        // Add missing divs before the closing paren
        const closingParenPos = block.lastIndexOf(')');
        const extraDivs = '\n        ' + '</div>'.repeat(diff);
        return block.slice(0, closingParenPos) + extraDivs + '\n    ' + block.slice(closingParenPos);
    } else if (closeTags > openTags) {
        const diff = closeTags - openTags;
        console.log(`Removing ${diff} extra closing divs from a block.`);
        let fixed = block;
        for (let i = 0; i < diff; i++) {
            fixed = fixed.replace(/<\/div>\s+\),/, '),');
        }
        return fixed;
    }
    return block;
});

fs.writeFileSync(file, content, 'utf8');
console.log('Final balancing complete.');
