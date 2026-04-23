const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Fix 1: physics-force - corrupted description
const pfPath = path.join(__dirname, '..', 'src', 'app', 'calculator', 'physics-force', 'page.tsx');
let pf = fs.readFileSync(pfPath, 'utf8');
// Remove the stray suffix appended to the description string
pf = pf.replace(
    /("Free online Physics Force Calculator for Nepal\. Use our tool to calculate force table easily and accurately\. Fast, responsive, and completely free\.")s second law \(F=ma\)\. Find force, mass, or acceleration results instantly\./,
    `"Free online Physics Force Calculator for Nepal. Use Newton's second law (F=ma) to find force, mass, or acceleration instantly. Fast, responsive, and completely free."`
);
fs.writeFileSync(pfPath, pf, 'utf8');
console.log('[FIXED] physics-force description');

// Fix 2: Replace Q{i+1}. literals across all pages
const appDir = path.join(__dirname, '..', 'src', 'app');

function walkDir(dir, results = []) {
    for (const f of fs.readdirSync(dir)) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isDirectory()) walkDir(full, results);
        else if (f === 'page.tsx') results.push(full);
    }
    return results;
}

const allPages = walkDir(appDir);
let fixCount = 0;

for (const fp of allPages) {
    let c = fs.readFileSync(fp, 'utf8');
    if (!c.includes('Q{i+1}.')) continue;

    let idx = 0;
    c = c.replace(/Q\{i\+1\}\./g, () => {
        idx++;
        return `Q${idx}.`;
    });
    fs.writeFileSync(fp, c, 'utf8');
    fixCount++;
    console.log(`[FIXED Q labels] ${path.relative(path.join(__dirname, '..'), fp)}`);
}

console.log(`\nFixed Q{{i+1}} literals in ${fixCount} pages.`);
