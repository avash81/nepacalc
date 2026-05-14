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

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace /calculator/slug with /calculator/slug/
  // Matches href="/calculator/anything" where anything doesn't end in /
  const regex = /href=(["'])\/calculator\/([^"']+)(?<!\/)(["'])/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, (match, p1, p2, p3) => {
      // Avoid replacing if it already has a trailing slash in some form or is a complex template
      if (p2.endsWith('/')) return match;
      return `href=${p1}/calculator/${p2}/${p3}`;
    });
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed trailing slashes in: ${path.relative(SRC_DIR, file)}`);
  }
});
