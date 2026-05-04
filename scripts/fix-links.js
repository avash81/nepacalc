const fs = require('fs');
const path = require('path');

const calcDir = './src/app/calculator';
const files = fs.readdirSync(calcDir);

const linkBank = [
  { label: "Nepal Salary", href: "/calculator/nepal-salary/" },
  { label: "Age Calculator", href: "/calculator/age-calculator/" },
  { label: "Percentage Calc", href: "/calculator/percentage/" },
  { label: "BMI Calculator", href: "/calculator/bmi/" },
  { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" },
  { label: "Income Tax", href: "/calculator/nepal-income-tax/" },
  { label: "Gratuity Calc", href: "/calculator/gratuity-calculator/" }
];

let updatedCount = 0;

files.forEach(dir => {
  const filePath = path.join(calcDir, dir, 'Calculator.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const matches = content.match(/href(?:=|:\s*)["']\/calculator\/[^"']+["']/g);
    const count = matches ? matches.length : 0;
    
    if (count < 6) { // target is 5+, so let's aim to be safe
      const sidebarRegex = /(sidebar=\{\{[\s\S]*?links:\s*\[)([\s\S]*?)(\])/m;
      const relatedRegex = /(relatedTools=\{\[)([\s\S]*?)(\]\})/m;
      
      let newContent = content;
      
      // We will inject 3 random links
      const shuffled = linkBank.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      const injectedStr = selected.map(l => `{ label: "${l.label}", href: "${l.href}" }`).join(',\n          ');
      
      if (sidebarRegex.test(newContent)) {
        newContent = newContent.replace(sidebarRegex, (match, p1, p2, p3) => {
          let inner = p2.trim();
          if (inner && !inner.endsWith(',')) inner += ',';
          if (inner) inner += '\n          ';
          return p1 + '\n          ' + inner + injectedStr + '\n        ' + p3;
        });
      }
      
      if (relatedRegex.test(newContent)) {
        newContent = newContent.replace(relatedRegex, (match, p1, p2, p3) => {
          let inner = p2.trim();
          if (inner && !inner.endsWith(',')) inner += ',';
          if (inner) inner += '\n        ';
          return p1 + '\n        ' + inner + injectedStr + '\n      ' + p3;
        });
      }
      
      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        updatedCount++;
      }
    }
  }
});
console.log(`Updated ${updatedCount} calculators to meet link density.`);
