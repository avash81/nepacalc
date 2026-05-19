const fs = require('fs');
const path = require('path');

const updateFiles = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            updateFiles(fullPath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.json')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;

            // Preserve nepali-calendar.json keys
            if (file === 'nepali-calendar.json') return;

            // Pattern replacements
            const replacements = [
                { from: /2082\/83/g, to: '2083/84' },
                { from: /2082\/2083/g, to: '2083/2084' },
                { from: /2025\/26/g, to: '2026/27' },
                { from: /2025\/2026/g, to: '2026/2027' },
                { from: /Finance Act 2082/g, to: 'Finance Act 2083' },
                { from: /Directive 2082/g, to: 'Directive 2083' },
                { from: /standards for 2082/g, to: 'standards for 2083' },
                { from: /in 2082/g, to: 'in 2083' },
                { from: /for 2082/g, to: 'for 2083' },
                { from: /Tax 2082/g, to: 'Tax 2083' }
            ];

            replacements.forEach(rep => {
                if (rep.from.test(content)) {
                    content = content.replace(rep.from, rep.to);
                    changed = true;
                }
            });

            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    });
};

updateFiles(path.join(__dirname, '../src/app'));
updateFiles(path.join(__dirname, '../src/components'));
updateFiles(path.join(__dirname, '../src/utils'));
