const { execSync } = require('child_process');
const fs = require('fs');

try {
  console.log('Running tsc...');
  execSync('npx tsc --noEmit --pretty false', { stdio: 'pipe' });
  console.log('No TypeScript errors found!');
} catch (error) {
  const output = error.stdout.toString() + '\n' + error.stderr.toString();
  const lines = output.split('\n');
  const financialErrors = lines.filter(l => l.includes('financial.tsx'));
  
  console.log(`Found ${financialErrors.length} errors in financial.tsx:`);
  
  const fileLines = fs.readFileSync('src/data/seo/financial.tsx', 'utf8').split('\n');
  
  financialErrors.slice(0, 15).forEach(err => {
    console.log('\n----------------------------------------');
    console.log(err);
    const match = err.match(/financial\.tsx\((\d+),(\d+)\)/);
    if (match) {
      const lineNum = parseInt(match[1], 10);
      const colNum = parseInt(match[2], 10);
      
      console.log(`Line ${lineNum}:`);
      for (let i = Math.max(1, lineNum - 3); i <= Math.min(fileLines.length, lineNum + 3); i++) {
        const prefix = i === lineNum ? '=> ' : '   ';
        console.log(`${prefix}${i}: ${fileLines[i-1]}`);
      }
    }
  });
}
