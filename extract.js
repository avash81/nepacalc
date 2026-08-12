const fs = require('fs');
const files = [
  '.next/server/app/index.html', 
  '.next/server/app/nepal.html', 
  '.next/server/app/calculator/nepal-income-tax.html', 
  '.next/server/app/market-rates/live-gold-price.html'
];
files.forEach(f => { 
  if (!fs.existsSync(f)) { 
    console.log(f + ' missing'); 
    return; 
  } 
  const html = fs.readFileSync(f, 'utf8'); 
  const regex = /<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/g; 
  let match; 
  console.log('\n--- ' + f + ' ---'); 
  while ((match = regex.exec(html)) !== null) { 
    try {
      console.log(JSON.stringify(JSON.parse(match[1]), null, 2)); 
    } catch (e) {
      console.log('Failed to parse:', match[1].substring(0, 50) + '...');
    }
  } 
});
