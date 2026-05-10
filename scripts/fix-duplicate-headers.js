const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach( f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

function processPage(filePath) {
    // Only target subdirectories of calculator and market-rates
    const isSubPage = filePath.includes('calculator' + path.sep) || 
                      (filePath.includes('market-rates' + path.sep) && !filePath.endsWith('market-rates' + path.sep + 'page.tsx'));
    
    if (!isSubPage) return;
    if (!filePath.endsWith('page.tsx')) return;

    console.log(`Checking ${filePath}...`);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('<CalcWrapper') && !content.includes('hideHeader={true}')) {
        console.log(`Fixing ${filePath}...`);
        // Find <CalcWrapper
        // Insert hideHeader={true} right after the opening tag or in a good spot
        const newContent = content.replace(/<CalcWrapper(\s+)/, '<CalcWrapper\n        hideHeader={true}$1');
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Successfully fixed ${filePath}.`);
    }
}

walk('src/app/calculator', processPage);
walk('src/app/market-rates', processPage);
