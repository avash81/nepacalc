const fs = require('fs');

const path = 'C:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/engineering/3d/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove the figure completely
content = content.replace(/<figure className="mt-8 mb-12">[\s\S]*?<\/figure>\s*/, '');

// 2. Fix em-dashes and en-dashes
content = content.replace(/ Step (\d+) — /g, ' Step $1: ');
content = content.replace(/third dimension—the Z-axis—/g, 'third dimension (the Z-axis) ');
content = content.replace(/z = a × sin\(x\)<\/code> — /g, 'z = a × sin(x)</code>: ');
content = content.replace(/ plotting tool — it is /g, ' plotting tool, it is ');
content = content.replace(/visualization tool—it is /g, 'visualization tool; it is ');

// 3. Remove all existing custom internal links that we added manually earlier to start fresh
// We won't remove the related tools links at the bottom (they are in <li> and mapping)
// We will only replace the ones we injected in <p> tags.
content = content.replace(/<Link href="\/math-tools\/scientific" className="text-\[#1967D2\] hover:underline">(scientific research|scientific)<\/Link>/g, '$1');
content = content.replace(/<Link href="\/algebra\/quadratic-equation" className="text-\[#1967D2\] hover:underline">(quadratic equations)<\/Link>/g, '$1');
content = content.replace(/<Link href="\/geometry" className="text-\[#1967D2\] hover:underline">(geometric objects|geometry)<\/Link>/g, '$1');
content = content.replace(/<Link href="\/algebra\/linear-equation" className="text-\[#1967D2\] hover:underline">(linear equations)<\/Link>/g, '$1');
content = content.replace(/<Link href="\/math-tools\/geometry" className="text-\[#1967D2\] hover:underline">(geometry)<\/Link>/g, '$1');

// Now inject 6 to 8 internal links naturally in the text, from top to bottom
// Link 1: geometry
content = content.replace(
  'allows users to interactively plot and rotate geometric shapes',
  'allows users to interactively plot and rotate <Link href="/geometry" className="text-[#1967D2] hover:underline">geometric shapes</Link>'
);

// Link 2: scientific calculator (math-tools/scientific)
content = content.replace(
  'scientific data, and multivariable functions.',
  '<Link href="/math-tools/scientific" className="text-[#1967D2] hover:underline">scientific</Link> data, and multivariable functions.'
);

// Link 3: matrix / linear algebra (algebra/matrix)
content = content.replace(
  'such as rotation matrices or perspective projections.',
  'such as <Link href="/algebra/matrix" className="text-[#1967D2] hover:underline">rotation matrices</Link> or perspective projections.'
);

// Link 4: quadratic equations (algebra/quadratic-equation)
content = content.replace(
  'equations like paraboloids or ellipsoids.',
  '<Link href="/algebra/quadratic-equation" className="text-[#1967D2] hover:underline">quadratic equations</Link> like paraboloids or ellipsoids.'
);

// Link 5: linear equation (algebra/linear-equation)
content = content.replace(
  'Linear transformations can be visualized',
  '<Link href="/algebra/linear-equation" className="text-[#1967D2] hover:underline">Linear transformations</Link> can be visualized'
);
// If that exact phrase isn't there, we'll try another one
content = content.replace(
  'better understand multivariable calculus, engineering mathematics',
  'better understand multivariable calculus, <Link href="/algebra/linear-equation" className="text-[#1967D2] hover:underline">linear equations</Link>, engineering mathematics'
);


// Link 6: calculus (math-tools/calculus)
content = content.replace(
  'multivariable calculus, engineering mathematics, differential equations',
  '<Link href="/math-tools/calculus" className="text-[#1967D2] hover:underline">multivariable calculus</Link>, engineering mathematics, differential equations'
);

// Link 7: geometry (math-tools/geometry)
content = content.replace(
  'A slice to analyze internal geometry.',
  'A slice to analyze internal <Link href="/math-tools/geometry" className="text-[#1967D2] hover:underline">geometry</Link>.'
);

// Link 8: scientific (math-tools/scientific)
content = content.replace(
  'differential equations, and scientific visualization',
  'differential equations, and <Link href="/math-tools/scientific" className="text-[#1967D2] hover:underline">scientific visualization</Link>'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Update complete.');
