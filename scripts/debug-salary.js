const fs = require('fs');
const financial = fs.readFileSync('src/data/seo/financial.tsx', 'utf8');
console.log('Index with space:', financial.indexOf("'nepal-salary': {"));
console.log('Index without space:', financial.indexOf("'nepal-salary':{"));
console.log('Index with double quotes:', financial.indexOf('"nepal-salary": {'));
