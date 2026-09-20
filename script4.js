const fs = require('fs');
const file = 'src/app/nepal/bluebook-renewal-nepal/page.tsx';
let text = fs.readFileSync(file, 'utf8');

// Remove from both TOCs (mobile uses \r\n, desktop uses \r\n too based on earlier findings)
text = text.replace(/\r?\n\s+\['#portals', '— Provincial EDL\/VRS Portals'\],/g, '');

fs.writeFileSync(file, text, 'utf8');
console.log('Removed #portals from TOCs.');
