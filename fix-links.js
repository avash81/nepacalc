const fs = require('fs');
const path = require('path');

const replacements = [
  { old: /\/calculator\/income-tax\/?(?!-)/g, new: '/calculator/nepal-income-tax/' },
  { old: /\/calculator\/age\/?(?!-)/g, new: '/calculator/age-calculator/' },
  { old: /\/calculator\/formulas-lab\/?/g, new: '/engineering/formulas/' },
  { old: /\/calculator\/scientific\/?(?!-)/g, new: '/calculator/scientific-calculator/' },
  { old: /\/calculator\/fraction\/?(?!-)/g, new: '/calculator/fraction-calculator/' },
  { old: /\/calculator\/date-add-subtract\/?/g, new: '/calculator/date-duration/' },
  { old: /\/calculator\/nepal-tax-calculator\/?/g, new: '/calculator/nepal-income-tax/' },
  { old: /\/calculator\/category\/nepal\/?/g, new: '/calculator/' },
  { old: /\/calculator\/category\/?/g, new: '/directory/' },
  { old: /\/calculator\/finance\/?/g, new: '/finance/' },
  { old: /\/calculator\/swp-calculator\/?/g, new: '/calculator/sip-calculator/' },
  { old: /["']\/market\/?["']/g, new: '"/market-rates/"' },
  { old: /["']\/utility\/?["']/g, new: '"/directory/"' },
  { old: /["']\/calculators\/?["']/g, new: '"/directory/"' },
  { old: /\/calculator\/matrix\/?(?!-)/g, new: '/calculator/matrices/' }
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      for (const req of replacements) {
        content = content.replace(req.old, req.new);
      }
      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(path.join(__dirname, 'src'));
