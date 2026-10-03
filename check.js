const fs = require('fs');
let content = fs.readFileSync('src/components/calculators/ThreeDCalculatorClient.tsx', 'utf-8');

// Find current Canvas block
const idx = content.indexOf('<Canvas');
const snippetAround = content.substring(idx, idx + 400);
console.log('Canvas block:', JSON.stringify(snippetAround));
