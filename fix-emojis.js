const fs = require('fs');
let content = fs.readFileSync('src/data/calculators.tsx', 'utf8');

// Replace icon fields that have emojis in them (i.e. anything that is not alphanumeric/basic symbols)
content = content.replace(/icon:\s*['"][^'"]*?['"]/g, match => {
  // if it contains mostly letters (like a lucide icon name), keep it
  if (/[a-zA-Z]{3,}/.test(match)) {
    return match;
  }
  // otherwise, it's an emoji, so remove the field entirely
  return '';
});

// Also remove isHot
content = content.replace(/isHot:\s*true,?\s*/g, '');
// Also remove isNew
content = content.replace(/isNew:\s*true,?\s*/g, '');

fs.writeFileSync('src/data/calculators.tsx', content);
