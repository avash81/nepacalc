const fs = require('fs');
let content = fs.readFileSync('src/components/calculators/ThreeDCalculatorClient.tsx', 'utf-8');

// Replace exactly using the known pattern
const oldCanvas = "<Canvas \r\n                shadows \r\n                gl={{ \r\n                  antialias: true, \r\n                  localClippingEnabled: true, \r\n                  toneMapping: THREE.ACESFilmicToneMapping,\r\n                }}\r\n                dpr={[1, 1.5]}\r\n              >";
const newCanvas = "<Canvas \r\n                shadows \r\n                frameloop=\"demand\"\r\n                gl={{ \r\n                  antialias: true, \r\n                  localClippingEnabled: true, \r\n                  toneMapping: THREE.ACESFilmicToneMapping,\r\n                  powerPreference: 'high-performance',\r\n                }}\r\n                dpr={[1, 1.5]}\r\n              >";

content = content.replace(oldCanvas, newCanvas);

fs.writeFileSync('src/components/calculators/ThreeDCalculatorClient.tsx', content);
console.log('Done. Contains frameloop:', content.includes('frameloop'));
