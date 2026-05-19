const fs = require('fs');
const path = require('path');
const financialPath = path.join(__dirname, '../src/data/seo/financial.tsx');
let financial = fs.readFileSync(financialPath, 'utf8');

const salaryStartMarker = "'nepal-salary': {";
let salaryStartIndex = financial.indexOf(salaryStartMarker);
console.log('salaryStartIndex:', salaryStartIndex);
if (salaryStartIndex !== -1) {
    let contentStartIndex = financial.indexOf('content: (', salaryStartIndex);
    console.log('contentStartIndex (space):', contentStartIndex);
    if (contentStartIndex === -1) {
        contentStartIndex = financial.indexOf('content:(', salaryStartIndex);
        console.log('contentStartIndex (no space):', contentStartIndex);
    }
    
    let currentDepth = 0;
    let contentEndIndex = -1;
    
    // adjust index based on what we found
    let searchStart = contentStartIndex !== -1 ? (financial.substr(contentStartIndex, 10).indexOf('(') + contentStartIndex) : -1;
    console.log('searchStart:', searchStart);

    if (searchStart !== -1) {
        for (let i = searchStart; i < financial.length; i++) {
            if (financial[i] === '(') currentDepth++;
            if (financial[i] === ')') {
                currentDepth--;
                if (currentDepth === 0) {
                    contentEndIndex = i;
                    break;
                }
            }
        }
        console.log('contentEndIndex:', contentEndIndex);
    }
}
