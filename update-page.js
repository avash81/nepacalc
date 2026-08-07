const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'src/app/calculator/nepal-vehicle-tax/page.tsx');
let code = fs.readFileSync(p, 'utf8');

// Replace <Calculator /> with <Calculator details={
code = code.replace('<Calculator />', '<Calculator details={');

// Remove the max-w-[1200px] ... wrapper
code = code.replace(
  /<div className="max-w-\[1200px\] mx-auto px-4 sm:px-6 lg:px-8 py-10">\s*<div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 text-slate-800 prose prose-slate max-w-none">/,
  '<div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 text-slate-800 prose prose-slate max-w-none">'
);

// We removed one opening div, so we must remove one closing div at the end, and close the details prop
code = code.replace(
  /<\/div>\s*<\/div>\s*<\/>\s*\);\s*}\s*$/,
  '        </div>\n      } />\n    </>\n  );\n}\n'
);

fs.writeFileSync(p, code);
console.log('Done modifying page.tsx');
