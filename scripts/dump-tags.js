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

function dumpTags(keyName) {
  const k = keys.find(x => x.name === keyName);
  if (!k) return;
  const segment = content.substring(k.index, k.end);
  const tagRegex = /<\/?([a-zA-Z1-6]+)(?:\s+[^>]*?)?>/g;
  let tagMatch;
  const stack = [];
  let lineNum = 1;
  
  console.log(`\n--- Tag Dump for ${keyName} ---`);
  
  // Find line number helper
  const getLine = (offset) => {
    return content.substring(0, k.index + offset).split('\n').length;
  };

  while ((tagMatch = tagRegex.exec(segment)) !== null) {
    const fullTag = tagMatch[0];
    const tagName = tagMatch[1];
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = fullTag.endsWith('/>') || ['br', 'hr', 'img', 'input'].includes(tagName);
    
    if (isSelfClosing) {
      console.log(`L${getLine(tagMatch.index)}: Self-closing <${tagName}>`);
      continue;
    }
    
    if (isClosing) {
      const popped = stack.pop();
      console.log(`L${getLine(tagMatch.index)}: Close </${tagName}> (matches <${popped}>, remaining stack: ${stack.join(', ')})`);
    } else {
      stack.push(tagName);
      console.log(`L${getLine(tagMatch.index)}: Open <${tagName}> (stack: ${stack.join(', ')})`);
    }
  }
}

dumpTags('mortgage-calculator');
