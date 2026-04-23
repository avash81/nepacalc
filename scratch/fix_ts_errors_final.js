const fs = require('fs');
const path = require('path');

const projectRoot = 'c:\\Users\\hp\\Desktop\\Movie\\calcpro-FIXED\\calcpro-final-build';

// 1. Fix percentage/Calculator.tsx
const percentPath = path.join(projectRoot, 'src/app/calculator/percentage/Calculator.tsx');
if (fs.existsSync(percentPath)) {
  let content = fs.readFileSync(percentPath, 'utf8');
  content = content.replace(/import { (.*?) } from 'lucide-react';/, (match, p1) => {
    if (!p1.includes('Target')) {
      return `import { ${p1}, Target } from 'lucide-react';`;
    }
    return match;
  });
  fs.writeFileSync(percentPath, content);
  console.log('Fixed percentage/Calculator.tsx imports');
}

// 2. Fix quadratic-solver/Calculator.tsx
const quadPath = path.join(projectRoot, 'src/app/calculator/quadratic-solver/Calculator.tsx');
if (fs.existsSync(quadPath)) {
  let content = fs.readFileSync(quadPath, 'utf8');
  if (!content.includes('import { CalcFAQ }')) {
    content = content.replace(/import { (.*?) } from 'lucide-react';/, (match) => {
      return `${match}\nimport { CalcFAQ } from '@/components/calculator/CalcFAQ';`;
    });
    fs.writeFileSync(quadPath, content);
    console.log('Fixed quadratic-solver/Calculator.tsx imports');
  }
}

// 3. Fix metadata in page.tsx files
const pagesToFix = [
  'src/app/calculator/ratio-proportion/page.tsx',
  'src/app/calculator/remittance-calculator/page.tsx',
  'src/app/calculator/physics-energy/page.tsx',
  'src/app/calculator/paint-cost/page.tsx',
  'src/app/calculator/calorie-calculator/page.tsx',
  'src/app/calculator/nepal-stocks/page.tsx'
];

pagesToFix.forEach(relPath => {
  const fullPath = path.join(projectRoot, relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if it has manual metadata
    if (content.includes('export const metadata: Metadata = {')) {
      // Find the metadata block
      const startIdx = content.indexOf('export const metadata: Metadata = {');
      const endIdx = content.indexOf('};', startIdx);
      
      if (startIdx !== -1 && endIdx !== -1) {
        const block = content.substring(startIdx, endIdx + 2);
        
        // Extract fields
        const titleMatch = block.match(/title:\s*["'](.*?)["']/);
        const descMatch = block.match(/description:\s*["'](.*?)["']/);
        const slugMatch = block.match(/slug:\s*["'](.*?)["']/);
        const kwMatch = block.match(/keywords:\s*(\[.*?\])/);
        
        if (titleMatch && descMatch && slugMatch) {
          const title = titleMatch[1];
          const desc = descMatch[1];
          const slug = slugMatch[1];
          const keywords = kwMatch ? kwMatch[1] : '[]';
          
          const newBlock = `export const metadata = calcMeta({\n  title: "${title}",\n  description: "${desc}",\n  slug: '${slug}',\n  keywords: ${keywords},\n});`;
          
          content = content.replace(block, newBlock);
          
          // Add calcMeta import if missing
          if (!content.includes("import { calcMeta }")) {
            content = "import { calcMeta } from '@/lib/calcMeta';\n" + content;
          }
          
          // Remove Metadata import if it was only for this
          content = content.replace(/import { Metadata } from 'next';\n?/, '');
          
          fs.writeFileSync(fullPath, content);
          console.log(`Fixed metadata in ${relPath}`);
        }
      }
    }
  }
});

console.log('All TS and metadata fixes applied.');
