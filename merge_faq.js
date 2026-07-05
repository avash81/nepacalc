const fs = require('fs');
let text = fs.readFileSync('src/app/electricity/nepal-unit-price/page.tsx', 'utf8');

const quickAnsRegex = /<h2[^>]*>Quick Answers to Common Queries<\/h2>[\s\S]*?<div className=\"space-y-4\">\s*\{\[\s*([\s\S]*?)\s*\]\.map/m;
const m1 = text.match(quickAnsRegex);

const paaRegex = /<h2[^>]*>People Also Ask<\/h2>[\s\S]*?<div className=\"space-y-3\">\s*\{\[\s*([\s\S]*?)\s*\]\.map/m;
const m2 = text.match(paaRegex);

const faqRegex = /<h2[^>]*>Frequently Asked Questions<\/h2>[\s\S]*?<div className=\"space-y-4\">\s*\{\[\s*([\s\S]*?)\s*\]\.map/m;
const m3 = text.match(faqRegex);

console.log('M1:', !!m1);
console.log('M2:', !!m2);
console.log('M3:', !!m3);

if(m1 && m2 && m3) {
    const allQuestions = m1[1] + ',\n' + m2[1] + ',\n' + m3[1];
    // We want to replace the third block with the combined one, and delete the first two.
    
    // Actually, we can just replace the third block's array.
    let newText = text.replace(m3[1], allQuestions);
    
    // Rename the third block to People Also Ask
    newText = newText.replace('Frequently Asked Questions', 'People Also Ask');
    
    // Now delete the entire first two blocks.
    // Quick Answers block
    const block1Regex = /\{\/\* ── AI ANSWER TABLE ── \*\/\}[\s\S]*?<\/div>\s*<\/section>/;
    newText = newText.replace(block1Regex, '');
    
    // People Also Ask block
    const block2Regex = /\{\/\* ── PEOPLE ALSO ASK ── \*\/\}[\s\S]*?<\/div>\s*<\/section>/;
    newText = newText.replace(block2Regex, '');

    fs.writeFileSync('src/app/electricity/nepal-unit-price/page.tsx', newText);
    console.log('Successfully merged FAQs');
} else {
    console.log('Could not find all blocks');
}
