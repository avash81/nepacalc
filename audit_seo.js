const fs = require('fs');
const path = require('path');

// Extract slugs from src/data/calculators.tsx
const calculatorsFile = fs.readFileSync('src/data/calculators.tsx', 'utf8');
const slugRegex = /slug:\s*'([^']+)'/g;
const slugs = [];
let match;
while ((match = slugRegex.exec(calculatorsFile)) !== null) {
    slugs.push(match[1]);
}

const seoDir = 'src/data/seo/';
const seoFiles = fs.readdirSync(seoDir).filter(f => f.endsWith('.tsx') && f !== 'index.tsx' && f !== 'types.ts');

const seoContentMap = {};

seoFiles.forEach(file => {
    const content = fs.readFileSync(path.join(seoDir, file), 'utf8');
    
    // Split by keys at the top level of the object
    // Key pattern:   'key-name': {
    const keys = [];
    const keyRegex = /^\s*['"]([^'"]+)['"]:\s*{/gm;
    while ((match = keyRegex.exec(content)) !== null) {
        keys.push({ key: match[1], index: match.index });
    }

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i].key;
        const start = keys[i].index;
        const end = (i < keys.length - 1) ? keys[i+1].index : content.length;
        const block = content.substring(start, end);
        
        const wordCount = block.split(/\s+/).length;
        const hasFY = block.includes('2082/83') || block.includes('2083') || block.includes('2025/26');
        const hasHowToUse = block.includes('howToUse:');
        const hasFormula = block.includes('formula:');
        const hasContent = block.includes('content:');
        const hasFAQs = block.includes('faqs:');

        seoContentMap[key] = {
            file: file,
            wordCount: wordCount,
            hasFY: hasFY,
            hasHowToUse: hasHowToUse,
            hasFormula: hasFormula,
            hasContent: hasContent,
            hasFAQs: hasFAQs
        };
    }
});

console.log('--- SEO AUDIT REPORT ---');
console.log('Total Calculators Registered: ' + slugs.length);
console.log('Total SEO Blocks Found: ' + Object.keys(seoContentMap).length);

const missing = slugs.filter(s => !seoContentMap[s]);
console.log('\n--- MISSING SEO CONTENT (' + missing.length + ') ---');
missing.forEach(s => console.log(s));

const lowWordCount = Object.keys(seoContentMap).filter(k => seoContentMap[k].wordCount < 1000);
console.log('\n--- LOW WORD COUNT (< 1000 words) (' + lowWordCount.length + ') ---');
lowWordCount.sort((a,b) => seoContentMap[a].wordCount - seoContentMap[b].wordCount);
lowWordCount.forEach(k => console.log(k + ' (' + seoContentMap[k].wordCount + ' words) in ' + seoContentMap[k].file));

const missingFY = Object.keys(seoContentMap).filter(k => !seoContentMap[k].hasFY && slugs.includes(k));
console.log('\n--- MISSING FISCAL YEAR 2082/83 (' + missingFY.length + ') ---');
missingFY.forEach(k => console.log(k + ' in ' + seoContentMap[k].file));

const incomplete = Object.keys(seoContentMap).filter(k => {
    const meta = seoContentMap[k];
    return !(meta.hasHowToUse && meta.hasFormula && meta.hasContent && meta.hasFAQs);
});
console.log('\n--- INCOMPLETE STRUCTURE (' + incomplete.length + ') ---');
incomplete.forEach(k => {
    const m = seoContentMap[k];
    const missingParts = [];
    if (!m.hasHowToUse) missingParts.push('howToUse');
    if (!m.hasFormula) missingParts.push('formula');
    if (!m.hasContent) missingParts.push('content');
    if (!m.hasFAQs) missingParts.push('faqs');
    console.log(k + ' missing: ' + missingParts.join(', ') + ' in ' + m.file);
});
