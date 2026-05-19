const fs = require('fs');

const content = fs.readFileSync('src/data/seo/financial.tsx', 'utf8');

// We want to find the positions of keys in financialSEO.
// We can use a regex to find all matches of:  'key-name': {
const keyRegex = /^\s*'([\w-]+)':\s*\{/gm;
let match;
const keys = [];
while ((match = keyRegex.exec(content)) !== null) {
  keys.push({
    name: match[1],
    index: match.index
  });
}

// Add an end index for the last key.
for (let i = 0; i < keys.length; i++) {
  keys[i].end = i < keys.length - 1 ? keys[i+1].index : content.length;
}

console.log(`Found ${keys.length} keys in financialSEO:`);
keys.forEach(k => {
  const segment = content.substring(k.index, k.end);
  const openTags = [];
  const tagRegex = /<\/?([a-zA-Z1-6]+)(?:\s+[^>]*?)?>/g;
  let tagMatch;
  let hasError = false;
  
  // Try to find balance in content or anywhere in segment
  while ((tagMatch = tagRegex.exec(segment)) !== null) {
    const fullTag = tagMatch[0];
    const tagName = tagMatch[1];
    const isClosing = fullTag.startsWith('</');
    
    // Ignore self-closing tags like <br/> or <img/>
    if (fullTag.endsWith('/>')) continue;
    if (tagName === 'br' || tagName === 'hr' || tagName === 'img' || tagName === 'input') continue;
    
    if (isClosing) {
      if (openTags.length === 0) {
        console.log(`[${k.name}] Error: Closing tag </${tagName}> found but no open tags in stack.`);
        hasError = true;
        break;
      }
      const lastOpen = openTags.pop();
      if (lastOpen !== tagName) {
        console.log(`[${k.name}] Error: Mismatched closing tag </${tagName}>, expected </${lastOpen}>.`);
        hasError = true;
        break;
      }
    } else {
      openTags.push(tagName);
    }
  }
  
  if (openTags.length > 0 && !hasError) {
    console.log(`[${k.name}] Error: Unclosed tags remaining in stack: ${openTags.join(', ')}`);
  } else if (!hasError) {
    console.log(`[${k.name}] OK (all tags balanced)`);
  }
});
