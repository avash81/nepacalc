const fs = require('fs');
const manifest = JSON.parse(fs.readFileSync('.next/build-manifest.json', 'utf8'));
const files = manifest.pages['/'] || [];
let totalSize = 0;
files.forEach(file => {
  if (file.endsWith('.js')) {
    const stat = fs.statSync('.next/' + file);
    totalSize += stat.size;
  }
});
console.log('Size of /:', (totalSize / 1024).toFixed(2), 'KB');
