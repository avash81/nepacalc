const fs = require('fs');
const path = require('path');

const updatePages = (dir) => {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            updatePages(fullPath);
        } else if (file === 'page.tsx') {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;

            if (content.includes('2082/83')) {
                content = content.replace(/2082\/83/g, '2083/84');
                changed = true;
            }
            if (content.includes('2082')) {
                content = content.replace(/2082/g, '2083');
                changed = true;
            }
            if (content.includes('2025/26')) {
                content = content.replace(/2025\/26/g, '2026/27');
                changed = true;
            }

            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated metadata in ${fullPath}`);
            }
        }
    });
};

updatePages(path.join(__dirname, '../src/app'));
