const fs = require('fs');

const content = fs.readFileSync('src/data/seo/financial.tsx', 'utf8');
const lines = content.split('\n');

let depth = 0;
let inString = null; // ' or " or ` or jsx
let inComment = false;
let openBraces = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    
    // Simple string literal check (doesn't handle all JSX or templates perfectly, but good enough)
    if (inString) {
      if (char === inString && line[j-1] !== '\\') {
        inString = null;
      }
      continue;
    }
    
    if (char === "'" || char === '"' || char === '`') {
      inString = char;
      continue;
    }
    
    // Comment check
    if (char === '/' && line[j+1] === '/') {
      break; // Ignore rest of the line
    }
    
    if (char === '{') {
      depth++;
      openBraces.push(i + 1);
    } else if (char === '}') {
      depth--;
      const openedAt = openBraces.pop();
      if (depth < 0) {
        console.log(`EXTRA CLOSING BRACE at L${i + 1}: ${line.trim()}`);
        depth = 0; // reset
      }
    }
  }
  
  // Print depth at the end of each key definition to see where it shifts unexpectedly
  if (line.match(/^\s+'[\w-]+':\s*\{/)) {
    console.log(`L${i + 1}: Key start, current depth = ${depth}`);
  }
}

console.log(`Final depth: ${depth}`);
