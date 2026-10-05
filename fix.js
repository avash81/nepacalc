const fs = require('fs');
let content = fs.readFileSync('src/app/market-rates/history/[year]/page.tsx', 'utf8');
const lines = content.split('\n');
lines[278] = '              <span className={`block text-xl font-black ${changeSilver && changeSilver > 0 ? \\\'text-emerald-600\\\' : \\\'text-rose-600\\\'}`}>';
fs.writeFileSync('src/app/market-rates/history/[year]/page.tsx', lines.join('\n'));
