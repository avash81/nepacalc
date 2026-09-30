const fs = require('fs');
let content = fs.readFileSync('src/data/calculators.tsx', 'utf8');

// Replace ALL icons completely. The user wants them gone.
content = content.replace(/icon:\s*['"`].*?['"`],?/g, '');
// Replace all HOT/NEW flags
content = content.replace(/isHot:\s*true,?\s*/g, '');
content = content.replace(/isNew:\s*true,?\s*/g, '');

fs.writeFileSync('src/data/calculators.tsx', content);
