const fs = require('fs');

function checkFile(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const text = fs.readFileSync(filePath, 'utf8');
    
    // Split by keys like 'loan-emi': { or "loan-emi": {
    const regex = /['"]([a-zA-Z0-9-]+)['"]\s*:\s*\{/g;
    let match;
    let keys = [];
    while ((match = regex.exec(text)) !== null) {
        keys.push({ key: match[1], index: match.index });
    }

    let results = [];
    for (let i = 0; i < keys.length; i++) {
        const start = keys[i].index;
        const end = i < keys.length - 1 ? keys[i+1].index : text.length;
        const block = text.substring(start, end);

        // Does it have faqs?
        const hasFaqs = block.includes('faqs:');

        // Extract content section specifically to avoid counting faqs/headers multiple times if we just strip
        // It usually starts with `content:` and ends at `faqs:` or end of object
        let contentBlock = block;
        const contentMatch = block.match(/content\s*:\s*([\s\S]*?)(?:faqs\s*:|\}[,;]?\s*$)/);
        if (contentMatch) {
            contentBlock = contentMatch[1];
        }

        // Strip TSX/HTML tags
        const textOnly = contentBlock.replace(/<[^>]+>/g, ' ').replace(/\{[^}]+\}/g, ' '); // remove tags and simple JS expressions
        
        // Count words (alphanumeric sequences)
        const words = (textOnly.match(/\b\w+\b/g) || []).length;

        results.push({ key: keys[i].key, words, hasFaqs });
    }
    return results;
}

const res1 = checkFile('./src/data/seo-content.tsx');
const res2 = checkFile('./src/data/seo/nepal.tsx');

const all = [...res1, ...res2];

// We know the requirement is 1500+ words. 
// Regex extraction isn't perfect, so let's look at anything below 1200 as definitely suspect.
const underTarget = all.filter(x => x.words < 1200);
const noFaqs = all.filter(x => !x.hasFaqs);

console.log(`\n=== SEO Content Audit ===`);
console.log(`Total Calculators Checked: ${all.length}`);
console.log(`\n[Word Count Issues - less than ~1200 words detected]`);
if (underTarget.length > 0) {
    underTarget.forEach(x => console.log(`- ${x.key}: ~${x.words} words`));
} else {
    console.log(`All ${all.length} items appear to meet the high word count threshold.`);
}

console.log(`\n[Missing FAQs]`);
if (noFaqs.length > 0) {
    noFaqs.forEach(x => console.log(`- ${x.key}`));
} else {
    console.log(`All ${all.length} items have FAQs.`);
}
