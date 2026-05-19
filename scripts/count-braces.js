const fs = require('fs');

const content = fs.readFileSync('src/data/seo/financial.tsx', 'utf8');

const keyRegex = /^\s+'([\w-]+)':\s*\{/gm;
let match;
const keys = [];
while ((match = keyRegex.exec(content)) !== null) {
  keys.push({
    name: match[1],
    index: match.index
  });
}
for (let i = 0; i < keys.length; i++) {
  keys[i].end = i < keys.length - 1 ? keys[i+1].index : content.length;
}

keys.forEach(k => {
  const segment = content.substring(k.index, k.end);
  const contentStart = segment.indexOf('content: (');
  if (contentStart === -1) return;
  
  const searchArea = segment.substring(contentStart);
  const faqsIdx = searchArea.indexOf('faqs:');
  const endIdx = faqsIdx !== -1 ? searchArea.lastIndexOf(')', faqsIdx) : searchArea.lastIndexOf(')');
  
  if (endIdx === -1) return;
  
  const contentBody = searchArea.substring('content: ('.length, endIdx);
  
  // Count '{' and '}'
  const openCount = (contentBody.match(/\{/g) || []).length;
  const closeCount = (contentBody.match(/\}/g) || []).length;
  
  if (openCount !== closeCount) {
    console.log(`[${k.name}] BRACE MISMATCH: open = ${openCount}, close = ${closeCount} (diff = ${openCount - closeCount})`);
  } else {
    console.log(`[${k.name}] Braces balanced (count = ${openCount})`);
  }
});
