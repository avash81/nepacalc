const fs = require('fs');

const revisedPart3A = `
<h2 id="what-is-3d-calculator" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">What is a 3D Graph Calculator?</h2>
<p className="text-lg leading-relaxed text-[#5F6368] mb-6">
  A <strong>3D Graph Calculator</strong> is an interactive mathematical visualization tool that converts equations into three-dimensional graphs, allowing users to explore functions, surfaces, and geometric objects in real time. Unlike a traditional two-dimensional graphing calculator that displays relationships between only the X and Y axes, a 3D graphing calculator introduces a third dimension—the Z-axis—making it possible to visualize complex mathematical surfaces, engineering models, scientific data, and multivariable functions.
</p>
<p className="text-lg leading-relaxed text-[#5F6368] mb-6">
  Instead of reading equations as abstract mathematical expressions, users can instantly transform them into interactive models that can be rotated, zoomed, sliced, and examined from every angle. This visual approach makes complex concepts significantly easier to understand while helping students, educators, engineers, architects, researchers, and scientists analyze mathematical relationships that cannot be represented on a flat graph.
</p>
<p className="text-lg leading-relaxed text-[#5F6368] mb-6">
  Modern <strong>online 3D graph calculators</strong> operate entirely within a web browser, eliminating the need to install expensive mathematical software. Users can simply enter an equation, choose visualization settings, and immediately interact with the generated surface.
</p>
<p className="text-lg leading-relaxed text-[#5F6368] mb-8">
  Our <strong>3D Graph Calculator</strong> supports a wide range of mathematical equations including explicit functions, implicit surfaces, engineering models, geometric solids, and advanced multivariable functions. Whether you are studying calculus, solving engineering problems, visualizing physical phenomena, or teaching mathematics, the calculator provides an intuitive environment for exploring three-dimensional mathematics.
</p>

<h2 id="why-use-3d-calculator" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Why Use a 3D Graph Calculator?</h2>
<p className="text-lg leading-relaxed text-[#5F6368] mb-6">
  Many mathematical concepts become difficult to understand when viewed only as equations. Three-dimensional visualization allows you to see how variables interact, how surfaces change, and how mathematical relationships behave across space.
</p>
<p className="text-lg leading-relaxed text-[#5F6368] mb-4">A 3D graphing calculator helps you:</p>
<ul className="list-disc pl-6 space-y-2 text-[#5F6368] mb-6 text-lg">
  <li>Visualize complex mathematical surfaces instantly</li>
  <li>Explore multivariable functions interactively</li>
  <li>Understand calculus concepts more easily</li>
  <li>Analyze engineering and architectural models</li>
  <li>Compare multiple equations simultaneously</li>
  <li>Investigate intersections between surfaces</li>
  <li>Demonstrate mathematical concepts during teaching</li>
  <li>Improve problem-solving through visualization</li>
  <li>Build intuition for higher-dimensional mathematics</li>
</ul>
<p className="text-lg leading-relaxed text-[#5F6368] mb-8">
  Instead of imagining how an equation behaves, you can observe its complete structure in real time.
</p>

<h2 id="how-it-works" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">How Does a 3D Graph Calculator Work?</h2>
<p className="text-lg leading-relaxed text-[#5F6368] mb-6">
  A 3D graph calculator converts mathematical equations into graphical surfaces by evaluating thousands of coordinate points across three-dimensional space.
</p>
<p className="text-lg leading-relaxed text-[#5F6368] mb-6">
  For every point within the selected coordinate range, the calculator computes the corresponding values and generates a continuous surface composed of thousands of interconnected polygons. Modern rendering technologies such as WebGL then display these polygons as smooth interactive models inside your browser.
</p>
<p className="text-lg leading-relaxed text-[#5F6368] mb-4">The visualization process generally follows these steps:</p>
<ol className="list-decimal pl-6 space-y-2 text-[#5F6368] mb-6 text-lg">
  <li>Read the mathematical equation entered by the user.</li>
  <li>Generate coordinate values across the selected X and Y ranges.</li>
  <li>Calculate the corresponding Z value for every coordinate pair.</li>
  <li>Build a polygon mesh representing the mathematical surface.</li>
  <li>Apply lighting, shading, and color gradients.</li>
  <li>Render the model using GPU acceleration.</li>
  <li>Allow users to rotate, zoom, pan, and inspect the surface interactively.</li>
</ol>
<p className="text-lg leading-relaxed text-[#5F6368] mb-8">
  This entire process happens almost instantly, making it possible to explore even complex mathematical functions in real time.
</p>

<h2 id="coordinate-system" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Understanding the Three-Dimensional Coordinate System</h2>
<p className="text-lg leading-relaxed text-[#5F6368] mb-8">
  A three-dimensional graph uses three perpendicular axes to describe the position of every point in space.
</p>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  <div className="p-6 bg-[#F8F9FA] rounded-xl border border-[#DADCE0]">
    <h3 className="text-xl font-bold text-[#1967D2] mb-3">X-Axis</h3>
    <p className="text-[#5F6368]">The X-axis represents horizontal movement from left to right. Positive values extend to the right, while negative values extend to the left.</p>
  </div>
  <div className="p-6 bg-[#F8F9FA] rounded-xl border border-[#DADCE0]">
    <h3 className="text-xl font-bold text-[#1967D2] mb-3">Y-Axis</h3>
    <p className="text-[#5F6368]">The Y-axis represents movement from front to back (or depth depending on the viewing angle). Together, the X and Y axes define the base plane where functions are evaluated.</p>
  </div>
  <div className="p-6 bg-[#F8F9FA] rounded-xl border border-[#DADCE0]">
    <h3 className="text-xl font-bold text-[#1967D2] mb-3">Z-Axis</h3>
    <p className="text-[#5F6368]">The Z-axis represents height. Every calculated value of a function determines how high or low the surface rises above the X-Y plane.</p>
  </div>
</div>
<p className="text-lg leading-relaxed text-[#5F6368] mb-8">
  This additional dimension allows mathematical surfaces to represent relationships that cannot be visualized using ordinary two-dimensional graphs.
</p>

<h2 id="explicit-functions" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Explicit Functions</h2>
<p className="text-lg leading-relaxed text-[#5F6368] mb-4">
  One of the most common graph types supported by a <strong>3D Graph Calculator</strong> is the explicit function.
</p>
<p className="text-lg leading-relaxed text-[#5F6368] mb-6">
  An explicit function defines the height of a surface directly as a function of two variables.
</p>
<div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6 mb-6">
  <p className="text-[#5F6368] font-bold mb-2">General form:</p>
  <p className="text-xl font-mono text-[#202124] bg-white p-3 rounded border border-slate-200 inline-block">z = f(x, y)</p>
</div>
<p className="text-lg leading-relaxed text-[#5F6368] mb-4">Examples include:</p>
<ul className="list-disc pl-6 space-y-2 text-[#5F6368] font-mono mb-6 text-lg">
  <li>z = x² + y²</li>
  <li>z = sin(x) × cos(y)</li>
  <li>z = √(x² + y²)</li>
  <li>z = e^(-(x²+y²))</li>
</ul>
<p className="text-lg leading-relaxed text-[#5F6368] mb-8">
  Because every coordinate pair (x, y) produces exactly one corresponding value of z, explicit functions generate smooth continuous surfaces that are ideal for studying calculus, optimization, physics, and engineering.
</p>

<h2 id="implicit-surfaces" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Implicit Surfaces</h2>
<p className="text-lg leading-relaxed text-[#5F6368] mb-6">
  Unlike explicit functions, implicit equations define relationships among all three variables simultaneously.
</p>
<div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6 mb-6">
  <p className="text-[#5F6368] font-bold mb-2">General form:</p>
  <p className="text-xl font-mono text-[#202124] bg-white p-3 rounded border border-slate-200 inline-block">F(x, y, z) = 0</p>
</div>
<p className="text-lg leading-relaxed text-[#5F6368] mb-4">Examples include:</p>
<ul className="list-disc pl-6 space-y-2 text-[#5F6368] font-mono mb-6 text-lg">
  <li>x² + y² + z² = 16</li>
  <li>x² + y² − z² = 4</li>
  <li>x²/16 + y²/9 + z²/4 = 1</li>
</ul>
<p className="text-lg leading-relaxed text-[#5F6368] mb-4">
  These equations describe complete three-dimensional objects rather than simple surfaces. Implicit surfaces are widely used in:
</p>
<ul className="list-disc pl-6 space-y-2 text-[#5F6368] mb-6 text-lg">
  <li>Geometry</li>
  <li>Computer graphics</li>
  <li>Mechanical engineering</li>
  <li>Medical imaging</li>
  <li>Scientific visualization</li>
  <li>Physics simulations</li>
</ul>
<p className="text-lg leading-relaxed text-[#5F6368] mb-8">
  Specialized rendering algorithms convert these equations into interactive 3D models.
</p>

<h2 id="who-uses-it" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Who Uses a 3D Graph Calculator?</h2>
<p className="text-lg leading-relaxed text-[#5F6368] mb-8">
  Interactive three-dimensional graphing tools are used across many academic and professional disciplines.
</p>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
    <h3 className="text-lg font-bold text-[#202124] mb-2">Students</h3>
    <p className="text-[#5F6368]">Students use 3D graph calculators to understand multivariable calculus, geometry, algebra, and mathematical visualization.</p>
  </div>
  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
    <h3 className="text-lg font-bold text-[#202124] mb-2">Teachers</h3>
    <p className="text-[#5F6368]">Educators demonstrate difficult concepts visually, helping students understand surfaces, gradients, intersections, and mathematical models more effectively.</p>
  </div>
  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
    <h3 className="text-lg font-bold text-[#202124] mb-2">Engineers</h3>
    <p className="text-[#5F6368]">Mechanical, civil, structural, and aerospace engineers use three-dimensional graphs to model physical systems, optimize structures, and analyze mathematical relationships.</p>
  </div>
  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
    <h3 className="text-lg font-bold text-[#202124] mb-2">Researchers</h3>
    <p className="text-[#5F6368]">Scientists visualize mathematical models, simulation outputs, and experimental datasets using interactive three-dimensional graphs.</p>
  </div>
  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
    <h3 className="text-lg font-bold text-[#202124] mb-2">Architects</h3>
    <p className="text-[#5F6368]">Architects explore curved surfaces, shell structures, and geometric forms before translating concepts into real-world designs.</p>
  </div>
  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
    <h3 className="text-lg font-bold text-[#202124] mb-2">Data Scientists</h3>
    <p className="text-[#5F6368]">Machine learning engineers and statisticians use surface plots to visualize optimization functions, probability distributions, and multidimensional datasets.</p>
  </div>
</div>

<h2 id="why-interactive" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Why Interactive Visualization Matters</h2>
<p className="text-lg leading-relaxed text-[#5F6368] mb-4">
  Reading an equation provides numerical information, but visualizing it provides understanding.
</p>
<p className="text-lg leading-relaxed text-[#5F6368] mb-4">Interactive graphing enables users to:</p>
<ul className="list-disc pl-6 space-y-2 text-[#5F6368] mb-6 text-lg">
  <li>Rotate models from every direction</li>
  <li>Zoom into important regions</li>
  <li>Inspect peaks and valleys</li>
  <li>Compare multiple surfaces</li>
  <li>Understand symmetry</li>
  <li>Explore curvature</li>
  <li>Identify intersections</li>
  <li>Observe mathematical behavior dynamically</li>
</ul>
<p className="text-lg leading-relaxed text-[#5F6368] mb-6">
  For many advanced mathematical topics, visualization significantly reduces the time required to understand abstract concepts.
</p>
<p className="text-lg leading-relaxed text-[#5F6368] mb-8">
  A modern <strong>3D Graph Calculator</strong> transforms equations into intuitive visual models, making mathematics more accessible, engaging, and practical for learners and professionals alike.
</p>
`;

let file = fs.readFileSync('src/app/engineering/3d/page.tsx', 'utf8');

const articleRegex = /<article className="prose prose-slate max-w-none">[\s\S]*?<\/article>/;

if (articleRegex.test(file)) {
  const replacement = "<article className=\\"prose prose-slate max-w-none\\">\\n" + revisedPart3A + "\\n                {/* CORE_PART_3B */}\\n              </article>";
  file = file.replace(articleRegex, replacement);
  fs.writeFileSync('src/app/engineering/3d/page.tsx', file);
  console.log("Revised Part 3A successfully injected.");
} else {
  console.log("Failed to find article tag.");
}
