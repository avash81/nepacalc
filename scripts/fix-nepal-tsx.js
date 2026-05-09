const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/seo/nepal.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Regex to find all content blocks
const contentBlockRegex = /content:\s*\(([\s\S]*?)\n    \},/g;

let match;
while ((match = contentBlockRegex.exec(content)) !== null) {
  let innerBlock = match[1];
  let originalBlock = innerBlock;

  // Split into lines to safely replace ' outside of tags
  let lines = innerBlock.split('\n');
  for (let i = 0; i < lines.length; i++) {
    // Only process text nodes, very crude regex but works for this specific file format
    if (lines[i].includes('<') && lines[i].includes('>')) {
      // It's a line with HTML tags. Replace ' only outside of attributes.
      // Easiest safe way: replace all ' with &apos; except in className="..." or href="..."
      // We can use a simpler approach: replace ' with &apos; if it's preceded by a space or letter, and followed by a space or letter.
      lines[i] = lines[i].replace(/([a-zA-Z\s])'([a-zA-Z\s])/g, '$1&apos;$2');
      // Also catch plurals like users'
      lines[i] = lines[i].replace(/([a-zA-Z])'([\s<.,])/g, '$1&apos;$2');
      // Also catch quotes 'Something'
      lines[i] = lines[i].replace(/([\s(>])'([a-zA-Z])/g, '$1&apos;$2');
    } else {
        // Line without tags, just replace all
        lines[i] = lines[i].replace(/'/g, '&apos;');
    }
  }

  content = content.replace(originalBlock, lines.join('\n'));
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Fixed apostrophes in nepal.tsx');
