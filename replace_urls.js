const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      results.push(file);
    }
  });
  return results;
}
walk('./src').filter(f => f.endsWith('.ts') || f.endsWith('.tsx')).forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('NEPACALC.com')) {
    fs.writeFileSync(file, content.replace(/NEPACALC\.com/g, 'nepacalc.com'), 'utf8');
    console.log('Updated: ' + file);
  }
});
