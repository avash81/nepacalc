const fs = require('fs');
const path = require('path');

const filesToFix = [
    'src/app/calculator/number-to-words/Calculator.tsx',
    'src/app/calculator/paint-cost/Calculator.tsx',
    'src/app/calculator/password-generator/Calculator.tsx',
    'src/app/calculator/physics-energy/Calculator.tsx',
    'src/app/calculator/physics-force/Calculator.tsx',
    'src/app/calculator/pregnancy-due-date/Calculator.tsx',
    'src/app/calculator/qr-generator/Calculator.tsx'
];

filesToFix.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
        console.log(`Fixing ${file}...`);
        let content = fs.readFileSync(filePath, 'utf8');
        const newContent = content.replace('hideH1={true}', 'hideH1={false}');
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Successfully fixed ${file}.`);
    } else {
        console.log(`File not found: ${file}`);
    }
});
