const fs = require('fs');

// Fix 1: calculators.tsx - rename so search bar finds it
let calcs = fs.readFileSync('../calcpro-final-build/src/data/calculators.tsx', 'utf-8');
calcs = calcs.replace(
  "{ id: 'date-duration', slug: 'date-duration', name: 'Date Calculator',  description: 'Calculate time delta in days between arbitrary dates.', category: 'utility' }",
  "{ id: 'date-duration', slug: 'date-duration', name: 'Date Duration Calculator', description: 'Calculate the exact number of days between two dates. Includes business days, weeks, months and years.', category: 'utility', keywords: ['date duration calculator', 'days between dates', 'date difference calculator', 'day duration calculator', 'business days calculator', 'date calculator'] }"
);
fs.writeFileSync('../calcpro-final-build/src/data/calculators.tsx', calcs);
console.log('calculators.tsx fixed');
