const fs = require('fs');

const path = 'src/app/engineering/3d/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Fix the Linear Algebra link in the table data
content = content.replace(
  "{ name: 'Plane', eq: 'z = ax + by + c', app: 'Linear algebra, Optimization' },",
  "{ name: 'Plane', eq: 'z = ax + by + c', app: <><Link href=\"/math-tools/matrix\" className=\"text-[#1967D2] hover:underline font-medium\">Linear algebra</Link>, Optimization</> },"
);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed linear algebra link.');
