const fs = require('fs');
const path = 'src/data/seo/financial.tsx';
let content = fs.readFileSync(path, 'utf8');

// Fix unclosed number circles
content = content.replace(/(font-bold">)([0-9])(\s*\n)/g, '$1$2</div>$3');

// Fix (May 2026 . -> (May 2026).
content = content.replace(/\(May 2026 \./g, '(May 2026).');
content = content.replace(/\(June 2026 \./g, '(June 2026).');

// Fix missing </div> in mortgage liability check
content = content.replace(/<span>Total Payout:<\/span> <span>Rs. 2.47 Crore<\/span>(\s*\n)/g, '<span>Total Payout:</span> <span>Rs. 2.47 Crore</span></div>$1');

// Fix missing </div> in interest cost view
content = content.replace(/<span>Interest-to-Principal:<\/span> <span>147%<\/span>(\s*\n)/g, '<span>Interest-to-Principal:</span> <span>147%</span></div>$1');

fs.writeFileSync(path, content);
console.log('Applied pattern fixes to ' + path);
