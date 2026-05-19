const fs = require('fs');
const { execSync } = require('child_process');

const content = execSync('git show aeba4dc:src/data/seo/financial.tsx').toString();

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

console.log(`Checking tags in commit aeba4dc:`);
keys.forEach(k => {
  const segment = content.substring(k.index, k.end);
  const openTags = [];
  const tagRegex = /<\/?([a-zA-Z1-6]+)(?:\s+[^>]*?)?>/g;
  let tagMatch;
  let hasError = false;
  
  while ((tagMatch = tagRegex.exec(segment)) !== null) {
    const fullTag = tagMatch[0];
    const tagName = tagMatch[1];
    const isClosing = fullTag.startsWith('</');
    
    if (fullTag.endsWith('/>')) continue;
    if (tagName === 'br' || tagName === 'hr' || tagName === 'img' || tagName === 'input') continue;
    
    if (isClosing) {
      if (openTags.length === 0) {
        console.log(`[${k.name}] Error: Closing tag </${tagName}> found but no open tags.`);
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
    console.log(`[${k.name}] Error: Unclosed tags: ${openTags.join(', ')}`);
  } else if (!hasError) {
    console.log(`[${k.name}] OK`);
  }
});
