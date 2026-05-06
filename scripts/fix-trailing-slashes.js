const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
        walkDir(dirPath, callback);
      }
    } else {
      if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
        callback(dirPath);
      }
    }
  });
}

let modifiedCount = 0;

walkDir('./src', (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Match both href="/..." and href: "/..."
  // The regex group 1 is either = or : \s*
  // The regex group 2 is the quote
  // The regex group 3 is the base path
  // The regex group 4 is the rest of the path
  const regex = /href(=|:\s*)(["'])\/(calculator|math-tools|finance|health|engineering|converters|market-rates|nepal|guide|blog)([^"']*?)\2/g;
  
  let newContent = content.replace(regex, (match, sep, quote, base, rest) => {
    if (rest === '' || rest === '/') {
       return `href${sep}${quote}/${base}/${quote}`;
    }
    
    if (rest.includes('?') || rest.includes('#')) {
       return match; 
    }

    if (rest.endsWith('/') || rest.includes('.')) {
       return match;
    }
    
    return `href${sep}${quote}/${base}${rest}/${quote}`;
  });

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    modifiedCount++;
  }
});

console.log(`Updated trailing slashes in ${modifiedCount} files.`);
