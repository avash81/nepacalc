const fs = require('fs');

const pagePath = 'C:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/engineering/3d/page.tsx';
let content = fs.readFileSync(pagePath, 'utf8');

// We want to add natural internal links spaced out.
// Let's replace exact phrases in specific paragraphs to ensure spacing.

// Link 1: scientific visualization -> /math-tools/scientific (Near Top)
content = content.replace(
  'solving engineering problems, conducting <Link href="/math-tools/scientific" className="text-[#1967D2] hover:underline">scientific</Link> research,',
  'solving engineering problems, conducting <Link href="/math-tools/scientific" className="text-[#1967D2] hover:underline">scientific research</Link>,'
); // Just fixing the existing one to be more natural

// Link 2: quadratic equations -> /algebra/quadratic-equation (Middle)
content = content.replace(
  'A paraboloid is curved from quadratic equations',
  'A paraboloid is curved from <Link href="/algebra/quadratic-equation" className="text-[#1967D2] hover:underline">quadratic equations</Link>'
);

// Link 3: geometry -> /math-tools/geometry (Middle-Bottom)
content = content.replace(
  'by plotting surfaces, curves, and geometric objects using',
  'by plotting surfaces, curves, and <Link href="/geometry" className="text-[#1967D2] hover:underline">geometric objects</Link> using'
);

// Link 4: linear equation -> /algebra/linear-equation (Bottom)
// We will look for "Linear Algebra" or "matrix" and link it if not already linked. Or add a natural sentence.
content = content.replace(
  'Yes. Many university students use interactive graphing tools to better understand multivariable calculus, engineering mathematics, differential equations, and scientific visualization.',
  'Yes. Many university students use interactive graphing tools to better understand multivariable calculus, <Link href="/algebra/linear-equation" className="text-[#1967D2] hover:underline">linear equations</Link>, engineering mathematics, differential equations, and scientific visualization.'
);

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Internal links added.');
