const fs = require('fs');
const glob = require('glob');
const path = require('path');

const dir = 'src/app/market-rates/live-gold-price';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');
  
  // Replace `<th className="..."` with `<th scope="col" className="..."`
  // But only if it doesn't already have `scope=` anywhere in the tag
  content = content.replace(/<th\s+([^>]*?)>/g, (match, attrs) => {
    if (attrs.includes('scope=')) return match;
    return `<th scope="col" ${attrs}>`;
  });
  
  // also handle `<th >` or `<th>`
  content = content.replace(/<th>/g, '<th scope="col">');

  fs.writeFileSync(p, content);
});

console.log('Added scope="col" to th tags');
