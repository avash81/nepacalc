const fs = require('fs');
let content = fs.readFileSync('scripts/fix-bulk.js', 'utf8');

// Remove the "Conversion Protocol" card-head heading
content = content.replace(
  '<div class="card-head">Conversion Protocol</div>\n',
  ''
);

fs.writeFileSync('scripts/fix-bulk.js', content);
console.log('Removed Conversion Protocol heading from fix-bulk.js');
