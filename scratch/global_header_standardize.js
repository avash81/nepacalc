const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\hp\\Desktop\\Movie\\calcpro-FIXED\\calcpro-final-build\\src\\app\\calculator';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Add hideHeader={true} to CalculatorLayout
  // We look for <CalculatorLayout and check if hideHeader is already there
  if (content.includes('<CalculatorLayout') && !content.includes('hideHeader=')) {
    content = content.replace('<CalculatorLayout', '<CalculatorLayout\n      hideHeader={true}');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`HEADER HIDDEN: ${filePath}`);
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

console.log('--- STARTING GLOBAL HEADER STANDARDIZATION ---');
scanDir(baseDir);
console.log('--- STANDARDIZATION COMPLETE ---');
