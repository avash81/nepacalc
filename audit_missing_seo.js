
const fs = require('fs');
const path = require('path');

// Extract IDs and Slugs from calculators.tsx
const calculatorsFile = fs.readFileSync('src/data/calculators.tsx', 'utf8');
const idMatches = calculatorsFile.match(/id:\s*'([^']+)'/g);
const slugMatches = calculatorsFile.match(/slug:\s*'([^']+)'/g);
const calculatorIds = idMatches.map(m => m.match(/'([^']+)'/)[1]);
const calculatorSlugs = slugMatches.map(m => m.match(/'([^']+)'/)[1]);

// Extract keys from SEO files
const seoFiles = [
    'src/data/seo/financial.tsx',
    'src/data/seo/health.tsx',
    'src/data/seo/utility.tsx',
    'src/data/seo/nepal-specific.tsx',
    'src/data/seo/algebra.tsx',
    'src/data/seo/geometry.tsx',
    'src/data/seo/statistics.tsx',
    'src/data/seo/physics.tsx',
    'src/data/seo/education.tsx',
    'src/data/seo/converters.tsx',
    'src/data/seo/market-rates.tsx',
    'src/data/seo/construction.tsx',
    'src/data/seo/unit-converters.tsx',
    'src/data/seo/engineering.tsx'
];

let seoKeys = [];
seoFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const keys = content.match(/['"]([^'"]+)['"]\s*:/g);
        if (keys) {
            keys.forEach(k => {
                const key = k.match(/['"]([^'"]+)['"]/)[1];
                // Filter out common object keys
                if (!['id', 'slug', 'name', 'icon', 'description', 'category', 'title', 'raw', 'variables', 'question', 'answer', 'steps'].includes(key)) {
                    seoKeys.push(key);
                }
            });
        }
    } catch (e) {}
});

// Find missing (not in IDs AND not in Slugs)
const missing = [];
for(let i=0; i<calculatorIds.length; i++) {
    const id = calculatorIds[i];
    const slug = calculatorSlugs[i];
    if (!seoKeys.includes(id) && !seoKeys.includes(slug)) {
        missing.push({ id, slug });
    }
}

console.log('Total Calculators:', calculatorIds.length);
console.log('Missing Items:', missing);
