const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles(SRC_DIR).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

const issues = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const h1Count = (content.match(/<h1/g) || []).length;
  
  if (h1Count > 1) {
    issues.push(`[DUPLICATE H1] ${path.relative(SRC_DIR, file)}: Found ${h1Count} H1 tags.`);
  }

  // Check for <img> without alt (simple regex)
  if (content.includes('<img') && !content.includes('alt=')) {
     issues.push(`[MISSING ALT] ${path.relative(SRC_DIR, file)}: <img> tag might be missing alt attribute.`);
  }

  // Check for links missing trailing slash in strings
  const links = content.match(/href=["'](\/calculator\/[^"']+)["']/g);
  if (links) {
    links.forEach(link => {
       if (!link.endsWith('/"') && !link.endsWith("/'")) {
          issues.push(`[TRAILING SLASH] ${path.relative(SRC_DIR, file)}: Link ${link} is missing trailing slash.`);
       }
    });
  }
});

console.log('--- SEO Audit Results ---');
if (issues.length === 0) {
  console.log('No major issues found!');
} else {
  issues.forEach(issue => console.log(issue));
}
