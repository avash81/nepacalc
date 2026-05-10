
const fs = require('fs');
const content = fs.readFileSync('./src/data/calculators.tsx', 'utf8');

const calcRegex = /id:\s*'([^']+)'/g;
const categoryRegex = /category:\s*'([^']+)'/g;

let match;
const ids = [];
while ((match = calcRegex.exec(content)) !== null) {
    if (match[1] !== 'id' && match[1] !== 'name') { // skip interface
        ids.push(match[1]);
    }
}

const categories = {};
const calcToCat = {};
let currentId = null;
const lines = content.split('\n');
lines.forEach(line => {
    const idMatch = line.match(/id:\s*'([^']+)'/);
    if (idMatch) {
        currentId = idMatch[1];
    }
    const catMatch = line.match(/category:\s*'([^']+)'/);
    if (catMatch && currentId) {
        categories[catMatch[1]] = (categories[catMatch[1]] || 0) + 1;
        calcToCat[currentId] = catMatch[1];
        currentId = null;
    }
});

console.log('Calculators found:', Object.keys(calcToCat).length);
console.log('Categories counts:', categories);

const pillarCats = ['market', 'nepal', 'finance', 'education', 'utility', 'health', 'engineering'];
const expectedTotal = Object.values(categories).reduce((a, b) => a + b, 0);
console.log('Total categorized:', expectedTotal);

const missing = Object.keys(calcToCat).filter(id => !pillarCats.includes(calcToCat[id]));
console.log('Calculators with unknown categories:', missing);
