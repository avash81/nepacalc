const fs = require('fs');
const file = 'C:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/app/engineering/3d/page.tsx';
let content = fs.readFileSync(file, 'utf8');
const target = '{/* CORE_PART_10 */}';
if (!content.includes(target)) {
    console.log('Target not found');
    process.exit(1);
}

const replacement = `                {/* ── Part 10: Resources, Glossary, FAQs ── */}
                <h2 id="glossary" className="text-2xl lg:text-3xl font-black text-[#202124] mt-16 mb-6">3D Graphing Glossary</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  Understanding common graphing terminology makes it easier to interpret mathematical surfaces and use advanced visualization tools effectively.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Cartesian Coordinates</p>
                    <p className="text-[#5F6368] text-sm">The standard three-dimensional coordinate system consisting of the x, y, and z axes.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Surface</p>
                    <p className="text-[#5F6368] text-sm">A two-dimensional mathematical object that exists within three-dimensional space. Examples include spheres, paraboloids, cones, and saddles.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Mesh & Vertex</p>
                    <p className="text-[#5F6368] text-sm">A collection of small polygons used to approximate a surface. Higher density creates smoother graphs. A vertex is a single coordinate point within the mesh.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Parametric Equation</p>
                    <p className="text-[#5F6368] text-sm">An equation representing coordinates as functions of parameters. e.g., <code className="bg-[#F8F9FA] px-1 rounded font-mono">x=cos(t), y=sin(t), z=t</code>.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Implicit Surface</p>
                    <p className="text-[#5F6368] text-sm">A surface defined by an equation involving x, y, and z together, like <code className="bg-[#F8F9FA] px-1 rounded font-mono">x²+y²+z²=16</code>.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Explicit Function</p>
                    <p className="text-[#5F6368] text-sm">A function where z depends directly on x and y, like <code className="bg-[#F8F9FA] px-1 rounded font-mono">z=x²+y²</code>.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Contour Plot & Gradient</p>
                    <p className="text-[#5F6368] text-sm">A 2D representation using lines of equal height. The gradient is the direction of steepest increase.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Saddle Point</p>
                    <p className="text-[#5F6368] text-sm">A point where the surface rises in one direction and falls in another.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Gaussian Surface</p>
                    <p className="text-[#5F6368] text-sm">A bell-shaped surface representing the normal probability distribution.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Hyperbolic Paraboloid</p>
                    <p className="text-[#5F6368] text-sm">A saddle-shaped surface commonly used in structural engineering and architecture.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Paraboloid & Torus</p>
                    <p className="text-[#5F6368] text-sm">A paraboloid is curved from quadratic equations (e.g. satellite dishes). A torus is a donut-shape.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Cross Section & Wireframe</p>
                    <p className="text-[#5F6368] text-sm">A slice to analyze internal geometry. Wireframe displays only edges instead of filled polygons.</p>
                  </div>
                </div>

                <h2 id="learn-more" className="text-2xl lg:text-3xl font-black text-[#202124] mb-6">Learn More About 3D Mathematics</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  Three-dimensional graphing is closely connected to many advanced mathematical topics. Many of these concepts become significantly easier to understand when visualized interactively. To deepen your understanding, explore:
                </p>
                <div className="flex flex-wrap gap-2 mb-12">
                  {['Multivariable Calculus','Vector Calculus','Linear Algebra','Analytical Geometry','Differential Equations','Numerical Methods','Computer Graphics','Engineering Mathematics','Scientific Visualization','Machine Learning Mathematics'].map(t => (
                    <span key={t} className="bg-[#F8F9FA] border border-[#DADCE0] text-[#5F6368] px-3 py-1 rounded-full text-sm">{t}</span>
                  ))}
                </div>

                <h2 id="related-calculators" className="text-2xl lg:text-3xl font-black text-[#202124] mb-6">Related NepaCalc Calculators</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  Continue exploring mathematics using our specialized calculators. These tools complement the 3D Graph Calculator and help solve a wide range of mathematical, engineering, and scientific problems.
                </p>
                <div className="flex flex-wrap gap-2 mb-12">
                  {['Scientific Calculator','Matrix Calculator','Linear Equation Solver','Quadratic Equation Solver','Geometry Calculator','Area Calculator','Percentage Calculator','Standard Deviation Calculator','Fraction Calculator','Decimal to Fraction Calculator','Physics Force Calculator','Energy Calculator','Unit Converter','Length Converter','Weight Converter'].map(t => (
                    <span key={t} className="bg-[#E8F0FE] border border-[#1967D2] text-[#1967D2] px-3 py-1 rounded-full text-sm font-medium">{t}</span>
                  ))}
                </div>

                <h2 id="who-uses" className="text-2xl lg:text-3xl font-black text-[#202124] mb-6">Who Uses a 3D Graph Calculator?</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-4">
                  Interactive three-dimensional visualization is valuable across numerous professions. Professionals often rely on graphical visualization to communicate complex mathematical ideas more effectively. Common users include:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
                  {['High school students','University students','Mathematics teachers','Engineering professors','Civil engineers','Mechanical engineers','Electrical engineers','Software developers','Data scientists','Machine learning engineers','Architects','Physicists','Researchers','Financial analysts','Scientific institutions'].map(u => (
                    <div key={u} className="flex items-start gap-2 text-sm text-[#5F6368]">
                      <span className="text-[#1967D2] mt-0.5">●</span>
                      {u}
                    </div>
                  ))}
                </div>

                <h2 id="faq" className="text-2xl lg:text-3xl font-black text-[#202124] mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4 mb-16">
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">What is a 3D graph calculator?</h3>
                    <p className="text-[#5F6368]">A 3D graph calculator visualizes mathematical equations in three-dimensional space by plotting surfaces, curves, and geometric objects using x, y, and z coordinates.</p>
                  </div>
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">Is NepaCalc free?</h3>
                    <p className="text-[#5F6368]">Yes. The NepaCalc 3D Graph Calculator is completely free and works directly in your web browser.</p>
                  </div>
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">Can I graph multiple equations?</h3>
                    <p className="text-[#5F6368]">Yes. You can add multiple equations and compare their shapes simultaneously using different colors.</p>
                  </div>
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">Does NepaCalc support engineering equations?</h3>
                    <p className="text-[#5F6368]">Yes. Engineering presets include saddles, cones, paraboloids, cylinders, spheres, ellipsoids, hyperboloids, and many other commonly studied mathematical surfaces.</p>
                  </div>
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">Can I rotate and zoom the graph?</h3>
                    <p className="text-[#5F6368]">Yes. Simply drag with your mouse or touch controls to rotate the model in real time. Zoom controls allow you to inspect both global surface behavior and small local regions.</p>
                  </div>
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">Does it work on mobile devices and all browsers?</h3>
                    <p className="text-[#5F6368]">Yes. The calculator is fully responsive and supports all modern browsers including Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, Brave, and Opera. It works on smartphones, tablets, laptops, and desktop computers.</p>
                  </div>
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">Do I need to install software?</h3>
                    <p className="text-[#5F6368]">No. Everything runs directly inside your browser using modern WebGL rendering.</p>
                  </div>
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">Can I use this calculator for university assignments?</h3>
                    <p className="text-[#5F6368]">Yes. Many university students use interactive graphing tools to better understand multivariable calculus, engineering mathematics, differential equations, and scientific visualization.</p>
                  </div>
                  <div className="border border-[#DADCE0] rounded-xl p-5 bg-white">
                    <h3 className="font-bold text-[#202124] text-lg mb-2">Is NepaCalc suitable for beginners?</h3>
                    <p className="text-[#5F6368]">Absolutely. The calculator includes educational explanations, preset equations, mathematical references, and interactive examples designed for learners at every level.</p>
                  </div>
                </div>

                <div className="bg-[#F0F4FF] border border-[#1967D2] rounded-2xl p-8 mb-12">
                  <h2 className="text-2xl font-black text-[#1967D2] mb-4">Continue Exploring Mathematics</h2>
                  <p className="text-lg leading-relaxed text-[#202124] mb-4">
                    Mathematics becomes much easier when you can see it.
                  </p>
                  <p className="text-[#5F6368] mb-4">
                    The NepaCalc 3D Graph Calculator transforms abstract equations into interactive models that improve understanding, strengthen intuition, and support learning across mathematics, engineering, physics, statistics, computer science, and data visualization.
                  </p>
                  <p className="text-[#5F6368]">
                    Whether you are solving homework, preparing for university examinations, teaching a classroom, building engineering models, or conducting research, interactive visualization helps bridge the gap between equations and real-world understanding. Explore more calculators throughout NepaCalc to continue your mathematical journey.
                  </p>
                </div>
`;

const newContent = content.replace(target, replacement);
fs.writeFileSync(file, newContent, 'utf8');
console.log('Update script finished successfully.');
