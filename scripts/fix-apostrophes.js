const fs = require('fs');
const file = 'src/data/seo-content.tsx';
let src = fs.readFileSync(file, 'utf8');
const lines = src.split('\n');

// Process only lines from 7500 onwards
const fixFrom = 7499;

const fixed = lines.map((line, i) => {
  if (i < fixFrom) return line;

  // Skip lines that are pure JSX attribute lines (we don't want to touch attributes)
  // Detect if this is a JSX text content line (inside a tag's children, not an attribute)
  // We fix text content that appears between > and <
  
  // Replace unescaped apostrophe in JSX text (two's -> two&apos;s)
  // Only in text content positions (between > ... <), not in attributes
  // Strategy: find all text segments between > and <, fix apostrophes there
  
  let result = '';
  let pos = 0;
  const len = line.length;
  
  while (pos < len) {
    // Find next > (end of tag)
    const gtPos = line.indexOf('>', pos);
    if (gtPos === -1) {
      // No more tags - rest is text or code
      result += line.slice(pos);
      break;
    }
    
    // Add everything up to and including >
    result += line.slice(pos, gtPos + 1);
    pos = gtPos + 1;
    
    // Now we're in text content until next <
    const ltPos = line.indexOf('<', pos);
    const textEnd = ltPos === -1 ? len : ltPos;
    
    let text = line.slice(pos, textEnd);
    
    // Fix apostrophes in text content (but not &apos; which is already escaped)
    // Replace ' that's not part of &apos; or className=' etc.
    text = text.replace(/'/g, '&apos;');
    
    result += text;
    pos = textEnd;
  }
  
  return result;
});

const result = fixed.join('\n');
fs.writeFileSync(file, result, 'utf8');
console.log('✅ Fixed apostrophes in JSX text content');

// Quick verify - check line 7884
const verify = result.split('\n');
console.log('Line 7884:', verify[7883].substring(0, 120));
