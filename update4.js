const fs = require('fs');
let content = fs.readFileSync('src/components/calculators/ThreeDCalculatorClient.tsx', 'utf-8');

// Add frameloop="demand" and powerPreference after shadows
content = content.replace(
  '<Canvas \n                  shadows \n                  gl={{ \n                    antialias: true, \n                    localClippingEnabled: true, \n                    toneMapping: THREE.ACESFilmicToneMapping,\n                  }}\n                  dpr={[1, 1.5]}\n                >',
  '<Canvas \n                  shadows \n                  frameloop="demand"\n                  gl={{ \n                    antialias: true, \n                    localClippingEnabled: true, \n                    toneMapping: THREE.ACESFilmicToneMapping,\n                    powerPreference: "high-performance",\n                  }}\n                  dpr={[1, 1.5]}\n                >'
);

fs.writeFileSync('src/components/calculators/ThreeDCalculatorClient.tsx', content);
console.log('Canvas optimized');
