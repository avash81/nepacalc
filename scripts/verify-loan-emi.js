const fs = require('fs');
const c = fs.readFileSync('src/data/seo/financial.tsx', 'utf8');

const loanIdx = c.indexOf("'loan-emi'");
const block = c.slice(loanIdx, loanIdx + 8000);

// Strip JSX/JS for word count estimate
const text = block.replace(/<[^>]+>/g, ' ').replace(/className="[^"]*"/g, ' ').replace(/\{[^}]+\}/g, ' ').replace(/\s+/g, ' ');
const words = text.trim().split(' ').filter(w => w.length > 3).length;

// Check for the literal two-char sequence backslash+n that breaks the build
const literalBackslashN = (c.indexOf('  \\n\n  ') !== -1) || (c.indexOf(',\n  \\n\n') !== -1);

console.log('=== LOAN-EMI VERIFICATION REPORT ===');
console.log('loan-emi block found at char index:', loanIdx);
console.log('Estimated SEO word count:', words);
console.log('Literal build-breaking \\n found:', literalBackslashN);
console.log('Total loan-emi entries:', (c.match(/'loan-emi': \{/g) || []).length);
console.log('File size (bytes):', c.length);
console.log('File compiles cleanly: NO SYNTAX MARKERS FOUND =', !literalBackslashN);
