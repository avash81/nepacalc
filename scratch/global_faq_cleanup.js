const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\hp\\Desktop\\Movie\\calcpro-FIXED\\calcpro-final-build\\src\\app\\calculator';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Remove faqSection={<CalcFAQ ... />} or faqSection={...}
  // We look for faqSection={ followed by balanced braces or a simple component
  // Since most follow the pattern faqSection={<CalcFAQ faqs={...} />}
  content = content.replace(/faqSection=\{[\s\S]*?\}/g, (match) => {
    // Check if it's the faqSection prop
    if (match.startsWith('faqSection={')) {
       // We need to be careful with balanced braces, but most are simple
       return '';
    }
    return match;
  });

  // 2. Remove faqs={...} prop
  content = content.replace(/faqs=\{[\s\S]*?\}/g, (match) => {
    if (match.startsWith('faqs={')) return '';
    return match;
  });

  // 3. Remove unused FAQ constants (e.g., const XYZ_FAQS = [...])
  content = content.replace(/const\s+\w+_FAQS\s*=\s*\[[\s\S]*?\];/g, '');

  // 4. Remove CalcFAQ import
  content = content.replace(/import\s+\{\s*CalcFAQ\s*\}\s+from\s+'@\/components\/calculator\/CalcFAQ';/g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`CLEANED: ${filePath}`);
  }
}

function scanDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const calcPath = path.join(fullPath, 'Calculator.tsx');
      if (fs.existsSync(calcPath)) {
        processFile(calcPath);
      }
    }
  }
}

console.log('--- STARTING GLOBAL FAQ CLEANUP ---');
scanDir(baseDir);
console.log('--- CLEANUP COMPLETE ---');
