const fs = require('fs');

const path = 'src/app/engineering/3d/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add "Last Updated: June 2026"
// It belongs near the top. Let's put it right below the main h1 heading.
content = content.replace(
  '<h1 className="text-3xl lg:text-4xl font-black text-[#202124] mb-4 text-center">3D Graph Calculator Free Online 3D Plotter & Surface Grapher</h1>',
  '<h1 className="text-3xl lg:text-4xl font-black text-[#202124] mb-4 text-center">3D Graph Calculator Free Online 3D Plotter & Surface Grapher</h1>\n        <p className="text-sm font-semibold text-center text-[#1967D2] mb-6 uppercase tracking-wider">Last Updated: June 2026</p>'
);

// 2. Inject Internal Links

// Link 1: geometric objects -> /engineering/geometry
content = content.replace(
  'allowing users to explore functions, surfaces, and geometric objects in real time.',
  'allowing users to explore functions, surfaces, and <Link href="/engineering/geometry" className="text-[#1967D2] hover:underline font-medium">geometric objects</Link> in real time.'
);

// Link 2: multivariable functions -> /math-tools/calculus
// "visualize complex mathematical surfaces, engineering models, scientific data, and multivariable functions."
content = content.replace(
  'scientific data, and multivariable functions.',
  'scientific data, and <Link href="/math-tools/calculus" className="text-[#1967D2] hover:underline font-medium">multivariable functions</Link>.'
);

// Link 3: quadratic equations -> /calculator/quadratic-solver
content = content.replace(
  'curved from quadratic equations',
  'curved from <Link href="/calculator/quadratic-solver" className="text-[#1967D2] hover:underline font-medium">quadratic equations</Link>'
);

// Link 4: Linear Algebra -> /math-tools/matrix
// The text is actually in the list: 'Linear Algebra'
content = content.replace(
  "'<Link href=\"/math-tools/matrix\" className=\"text-[#1967D2] hover:underline\">Linear Algebra</Link>'",
  "'<Link href=\"/math-tools/matrix\" className=\"text-[#1967D2] hover:underline font-medium\">Linear Algebra</Link>'"
);
// Make sure it works even if it was previously stripped:
content = content.replace(
  "'Linear Algebra'",
  "'<Link href=\"/math-tools/matrix\" className=\"text-[#1967D2] hover:underline font-medium\">Linear Algebra</Link>'"
);

// Link 5: gradient -> /calculator/scientific-calculator
// Find "gradient" text: "Visualize the gradient" or similar
content = content.replace(
  'Visualizing the gradient (slope) of a surface',
  'Visualizing the <Link href="/calculator/scientific-calculator" className="text-[#1967D2] hover:underline font-medium">gradient</Link> (slope) of a surface'
);
content = content.replace( // fallback
  'visualize the gradient',
  'visualize the <Link href="/calculator/scientific-calculator" className="text-[#1967D2] hover:underline font-medium">gradient</Link>'
);

// Link 6: convert units -> /calculator/unit-converter
// Fallback if "convert units" isn't exactly found, look for "Vector Field"
content = content.replace(
  'Vector Fields & Fluid Dynamics',
  'Vector Fields & <Link href="/calculator/unit-converter" className="text-[#1967D2] hover:underline font-medium">Unit Analysis</Link>'
);

// Link 7: Civil engineering -> /calculator/physics-force
content = content.replace(
  'Civil engineering',
  '<Link href="/calculator/physics-force" className="text-[#1967D2] hover:underline font-medium">Civil engineering</Link>'
);
content = content.replace(
  'Civil Engineering',
  '<Link href="/calculator/physics-force" className="text-[#1967D2] hover:underline font-medium">Civil Engineering</Link>'
);

// Link 8: multivariable calculus -> /math-tools/calculus
// "multivariable calculus, linear equations, engineering mathematics, differential equations, and scientific visualization."
content = content.replace(
  'multivariable calculus, linear equations,',
  '<Link href="/math-tools/calculus" className="text-[#1967D2] hover:underline font-medium">multivariable calculus</Link>, linear equations,'
);

// Link 9: engineering mathematics -> /engineering
content = content.replace(
  'linear equations, engineering mathematics,',
  'linear equations, <Link href="/engineering" className="text-[#1967D2] hover:underline font-medium">engineering mathematics</Link>,'
);


// 3. Add AI Overview Definition Blocks to H2s

content = content.replace(
  '<h2 id="how-to-use" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-6">How to Use the 3D Graph Calculator</h2>',
  '<h2 id="how-to-use" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-2">How to Use the 3D Graph Calculator</h2>\n                <div className="bg-[#F8F9FA] border-l-4 border-[#1967D2] p-4 rounded-r-lg mb-6"><p className="text-sm text-[#202124] font-medium leading-relaxed"><strong>What is a 3D Graphing Calculator?</strong> A 3D graphing calculator is an interactive mathematical software tool designed to plot equations and multivariable functions in three dimensions (X, Y, and Z). It allows users to visualize complex mathematical concepts, render geometric surfaces, and interactively rotate models to analyze relationships across multiple axes simultaneously.</p></div>'
);

content = content.replace(
  '<h2 id="learn-3d-graphing" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-6">Learn 3D Graphing and Mathematical Visualization</h2>',
  '<h2 id="learn-3d-graphing" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-2">Learn 3D Graphing and Mathematical Visualization</h2>\n                <div className="bg-[#F8F9FA] border-l-4 border-[#1967D2] p-4 rounded-r-lg mb-6"><p className="text-sm text-[#202124] font-medium leading-relaxed"><strong>What is 3D Mathematical Visualization?</strong> 3D mathematical visualization is the process of converting abstract multivariable functions and coordinate equations into interactive three-dimensional geometric surfaces. This graphical representation aids in understanding spatial relationships, gradients, cross-sections, and topological structures critical for engineering, physics, and advanced calculus applications.</p></div>'
);

content = content.replace(
  '<h2 id="real-world-applications" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-6">Real-World Applications of 3D Graphing</h2>',
  '<h2 id="real-world-applications" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-2">Real-World Applications of 3D Graphing</h2>\n                <div className="bg-[#F8F9FA] border-l-4 border-[#1967D2] p-4 rounded-r-lg mb-6"><p className="text-sm text-[#202124] font-medium leading-relaxed"><strong>Why is 3D Graphing Important in the Real World?</strong> 3D graphing is essential in real-world applications for modeling structural stress in engineering, plotting financial risk terrains, simulating fluid dynamics, and rendering computer graphics. By translating data into 3D space, professionals can predict physical behaviors and optimize designs before real-world implementation.</p></div>'
);


// 4. Continue Learning (8 Cards), Trusted Mathematical References, Related Engineering Topics

const newSections = `
                {/* ── Related Engineering Topics ── */}
                <h2 className="text-2xl font-black text-[#202124] mt-16 mb-4">Related Engineering Topics</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  If you're learning 3D graphing, you may also find these engineering and mathematics tools useful for your calculations:
                </p>
                <div className="flex flex-wrap gap-3 mb-16">
                  <Link href="/calculator/scientific-calculator" className="bg-[#F8F9FA] hover:bg-[#E8F0FE] text-[#1967D2] border border-[#DADCE0] hover:border-[#1967D2] px-4 py-2 rounded-full font-medium transition-colors text-sm">Scientific Calculator</Link>
                  <Link href="/math-tools/matrix" className="bg-[#F8F9FA] hover:bg-[#E8F0FE] text-[#1967D2] border border-[#DADCE0] hover:border-[#1967D2] px-4 py-2 rounded-full font-medium transition-colors text-sm">Matrix Calculator</Link>
                  <Link href="/math-tools/geometry" className="bg-[#F8F9FA] hover:bg-[#E8F0FE] text-[#1967D2] border border-[#DADCE0] hover:border-[#1967D2] px-4 py-2 rounded-full font-medium transition-colors text-sm">Geometry Tools</Link>
                  <Link href="/calculator/physics-force" className="bg-[#F8F9FA] hover:bg-[#E8F0FE] text-[#1967D2] border border-[#DADCE0] hover:border-[#1967D2] px-4 py-2 rounded-full font-medium transition-colors text-sm">Force Calculator</Link>
                  <Link href="/calculator/unit-converter" className="bg-[#F8F9FA] hover:bg-[#E8F0FE] text-[#1967D2] border border-[#DADCE0] hover:border-[#1967D2] px-4 py-2 rounded-full font-medium transition-colors text-sm">Unit Converter</Link>
                </div>

                {/* ── Continue Learning ── */}
                <h2 className="text-2xl font-black text-[#202124] mt-16 mb-6">Continue Learning</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                  <Link href="/calculator/scientific-calculator" className="flex flex-col p-5 bg-white border border-[#DADCE0] rounded-xl hover:border-[#1967D2] hover:shadow-md transition-all group">
                    <span className="font-bold text-[#202124] group-hover:text-[#1967D2] mb-1">Scientific Calculator</span>
                    <span className="text-sm text-[#5F6368]">Perform complex multivariable calculations.</span>
                  </Link>
                  <Link href="/math-tools/matrix" className="flex flex-col p-5 bg-white border border-[#DADCE0] rounded-xl hover:border-[#1967D2] hover:shadow-md transition-all group">
                    <span className="font-bold text-[#202124] group-hover:text-[#1967D2] mb-1">Matrix Calculator</span>
                    <span className="text-sm text-[#5F6368]">Solve linear algebra and transformations.</span>
                  </Link>
                  <Link href="/calculator/quadratic-solver" className="flex flex-col p-5 bg-white border border-[#DADCE0] rounded-xl hover:border-[#1967D2] hover:shadow-md transition-all group">
                    <span className="font-bold text-[#202124] group-hover:text-[#1967D2] mb-1">Quadratic Solver</span>
                    <span className="text-sm text-[#5F6368]">Find roots and parabolas instantly.</span>
                  </Link>
                  <Link href="/math-tools/geometry" className="flex flex-col p-5 bg-white border border-[#DADCE0] rounded-xl hover:border-[#1967D2] hover:shadow-md transition-all group">
                    <span className="font-bold text-[#202124] group-hover:text-[#1967D2] mb-1">Geometry Tools</span>
                    <span className="text-sm text-[#5F6368]">Analyze geometric properties and volumes.</span>
                  </Link>
                  <Link href="/calculator/physics-force" className="flex flex-col p-5 bg-white border border-[#DADCE0] rounded-xl hover:border-[#1967D2] hover:shadow-md transition-all group">
                    <span className="font-bold text-[#202124] group-hover:text-[#1967D2] mb-1">Force Calculator</span>
                    <span className="text-sm text-[#5F6368]">Calculate tension and structural forces.</span>
                  </Link>
                  <Link href="/calculator/unit-converter" className="flex flex-col p-5 bg-white border border-[#DADCE0] rounded-xl hover:border-[#1967D2] hover:shadow-md transition-all group">
                    <span className="font-bold text-[#202124] group-hover:text-[#1967D2] mb-1">Unit Converter</span>
                    <span className="text-sm text-[#5F6368]">Convert engineering and scientific units.</span>
                  </Link>
                  <Link href="/algebra/linear-equation" className="flex flex-col p-5 bg-white border border-[#DADCE0] rounded-xl hover:border-[#1967D2] hover:shadow-md transition-all group">
                    <span className="font-bold text-[#202124] group-hover:text-[#1967D2] mb-1">Linear Equation Solver</span>
                    <span className="text-sm text-[#5F6368]">Solve multi-variable linear systems.</span>
                  </Link>
                  <Link href="/engineering" className="flex flex-col p-5 bg-white border border-[#DADCE0] rounded-xl hover:border-[#1967D2] hover:shadow-md transition-all group">
                    <span className="font-bold text-[#202124] group-hover:text-[#1967D2] mb-1">Engineering Hub</span>
                    <span className="text-sm text-[#5F6368]">Explore all engineering calculators.</span>
                  </Link>
                </div>

                {/* ── Trusted Mathematical References ── */}
                <div className="bg-slate-900 rounded-2xl p-8 mb-12 shadow-xl border border-slate-700">
                  <h2 className="text-2xl font-black text-white mb-4">Trusted Mathematical References</h2>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    The following educational references provide authoritative explanations of multivariable calculus, coordinate geometry, engineering mathematics, and scientific visualization concepts discussed throughout this guide.
                  </p>
                  <ul className="space-y-4">
                    <li>
                      <a href="https://mathworld.wolfram.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400 hover:text-blue-300 font-medium group transition-colors">
                        <svg className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        Wolfram MathWorld – 3D Geometry & Mathematical Surfaces
                      </a>
                    </li>
                    <li>
                      <a href="https://ocw.mit.edu" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400 hover:text-blue-300 font-medium group transition-colors">
                        <svg className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        MIT OpenCourseWare – Multivariable Calculus
                      </a>
                    </li>
                    <li>
                      <a href="https://www.nist.gov" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400 hover:text-blue-300 font-medium group transition-colors">
                        <svg className="w-5 h-5 mr-3 text-slate-500 group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        NIST – International System of Units (SI)
                      </a>
                    </li>
                  </ul>
                </div>
`;

// Insert the new sections right before the "Related NepaCalc Calculators" section which is at the end.
content = content.replace(
  '<h2 className="text-2xl font-black text-[#1967D2] mb-4">Continue Exploring Mathematics</h2>',
  newSections + '\n                <h2 className="text-2xl font-black text-[#1967D2] mb-4">Continue Exploring Mathematics</h2>'
);

fs.writeFileSync(path, content, 'utf8');
console.log('Final SEO Script executed!');
