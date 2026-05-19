const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    'src/data/seo/nepal-specific.tsx',
    'src/data/seo/financial.tsx',
    'src/data/seo/market-rates.tsx',
    'src/data/seo/algebra.tsx',
    'src/data/seo/geometry.tsx',
    'src/data/seo/statistics.tsx',
    'src/data/seo/physics.tsx',
    'src/data/seo/education.tsx',
    'src/data/seo/converters.tsx',
    'src/data/seo/construction.tsx',
    'src/data/seo/unit-converters.tsx',
    'src/data/seo/engineering.tsx',
    'src/data/seo/nepal_header.txt'
];

filesToUpdate.forEach(relPath => {
    const fullPath = path.join(__dirname, '..', relPath);
    if (!fs.existsSync(fullPath)) return;

    let content = fs.readFileSync(fullPath, 'utf8');

    // Order matters: 2082/83 -> 2083/84
    content = content.replace(/2082\/83/g, '2083/84');
    content = content.replace(/2082\/2083/g, '2083/2084');
    content = content.replace(/2025\/26/g, '2026/27');
    content = content.replace(/2025\/2026/g, '2026/2027');
    content = content.replace(/FY 2082/g, 'FY 2083');
    content = content.replace(/Finance Act 2082/g, 'Finance Act 2083');
    
    // Careful with just "2082" -> "2083" to avoid breaking code logic or years in JSON
    // Only in SEO strings
    content = content.replace(/in 2082/g, 'in 2083');
    content = content.replace(/for 2082/g, 'for 2083');
    content = content.replace(/Nepal 2082/g, 'Nepal 2083');

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${relPath}`);
});
