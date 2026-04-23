const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\hp\\Desktop\\Movie\\calcpro-FIXED\\calcpro-final-build\\src\\app\\calculator';

function scanDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const pagePath = path.join(fullPath, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        const content = fs.readFileSync(pagePath, 'utf8');
        const hasWrapper = content.includes('CalcWrapper');
        const hasFAQ = content.includes('PillarFAQ');
        if (!hasWrapper || !hasFAQ) {
          console.log(`OUTLIER FOUND: ${pagePath} (Wrapper: ${hasWrapper}, FAQ: ${hasFAQ})`);
        }
      }
    }
  }
}

console.log('--- STARTING FINAL AUDIT ---');
scanDir(baseDir);
console.log('--- AUDIT COMPLETE ---');
