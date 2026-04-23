const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\hp\\Desktop\\Movie\\calcpro-FIXED\\calcpro-final-build\\src\\app\\calculator';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Pattern: comma, followed by array elements with { question: ... }, followed by ]} /> and then }
  // Example:
  // ,
  //   { question: '...', answer: '...' },
  // ]} />
  // }
  
  // Surgical removal of the broken FAQ remnants
  content = content.replace(/,\s*\{\s*question:[\s\S]*?\]\}\s*\/>\s*\}/g, '');

  // Also clean up any double commas if they were created (though unlikely here)
  content = content.replace(/,\s*,/g, ',');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`FIXED: ${filePath}`);
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

console.log('--- STARTING EMERGENCY SYNTAX REPAIR ---');
scanDir(baseDir);
console.log('--- REPAIR COMPLETE ---');
