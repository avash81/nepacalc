const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(fullPath));
        } else {
            if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

const files = walkDir('src/app');
let modifiedCount = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace 11.664 with 11.6638
    content = content.replace(/11\.6641/g, '11.6638');
    content = content.replace(/11\.664/g, '11.6638');
    
    if (content !== original) {
        fs.writeFileSync(file, content);
        modifiedCount++;
        console.log(`Updated ${file}`);
    }
}

console.log(`Replaced in ${modifiedCount} files.`);
