const fs = require('fs');
let c = fs.readFileSync('src/components/layout/ModernCalcLayout.tsx', 'utf8');

// Find and replace the variables.map block
const search = '{(enrichedFormula as any).variables.map((v: string, i: number) => (';
const idx = c.indexOf(search);

if (idx === -1) {
  console.log('SEARCH STRING NOT FOUND');
  process.exit(1);
}

// Find the closing ))} of this map
const endSearch = '))}';
const endIdx = c.indexOf(endSearch, idx);

if (endIdx === -1) {
  console.log('END STRING NOT FOUND');
  process.exit(1);
}

const oldBlock = c.slice(idx, endIdx + endSearch.length);
console.log('Found block to replace:', JSON.stringify(oldBlock.slice(0, 100)));

const newBlock = `{(enrichedFormula as any).variables.map((v: string, i: number) => {
                              const eqIdx = v.indexOf(' = ');
                              const key = eqIdx !== -1 ? v.slice(0, eqIdx) : v;
                              const val = eqIdx !== -1 ? v.slice(eqIdx + 3) : '';
                              return (
                                <p key={i} className="text-sm text-[#5F6368] flex items-start gap-2 leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#dadce0] mt-1.5 shrink-0" />
                                  <span><strong className="text-[#202124]">{key}</strong>{val ? \` = \${val}\` : ''}</span>
                                </p>
                              );
                            })}`;

c = c.slice(0, idx) + newBlock + c.slice(endIdx + endSearch.length);
fs.writeFileSync('src/components/layout/ModernCalcLayout.tsx', c, 'utf8');
console.log('SUCCESS: renderer updated with bold key terms');
