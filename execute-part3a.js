const fs = require('fs');

const part3A_content = `
<h2 id="what-is-3d-calculator" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">What is a 3D Graph Calculator?</h2>
<p className="text-[#5F6368] mb-4 leading-relaxed">
  A <strong>3D graph calculator</strong> is a highly advanced mathematical visualization tool designed to render algebraic equations and mathematical functions across three spatial dimensions: the x-axis, the y-axis, and the z-axis. Unlike traditional two-dimensional graphing utilities that restrict plotting to flat lines and curves on a Cartesian plane, a three-dimensional plotter introduces volumetric depth. This capability allows students, educators, and engineering professionals to accurately model complex geometric surfaces, spatial relationships, and multivariable functions in an interactive environment.
</p>
<p className="text-[#5F6368] mb-4 leading-relaxed">
  At its foundation, a <strong>3D graphing calculator</strong> transforms abstract mathematical syntax into manipulatable visual models. When dealing with functions of two independent variables—typically denoted algebraically as <code>z = f(x,y)</code>—the calculator evaluates thousands of coordinate pairs simultaneously. The resulting output is a continuous mathematical surface that can represent physical phenomena ranging from the ripples of an electromagnetic wave to the distinct curvature of a hyperbolic paraboloid (often called a saddle surface). For applications in physics and civil engineering, the ability to rapidly visualize these structures is critical for modeling fluid dynamics, stress distributions, and thermodynamic states.
</p>
<p className="text-[#5F6368] mb-6 leading-relaxed">
  Historically, generating three-dimensional mathematical plots required expensive, heavy desktop software. Today, an <strong>online 3D graph calculator</strong> leverages the power of WebGL (Web Graphics Library) to utilize your local device's graphics processing unit (GPU) directly through the browser. This technological shift means that whether you are plotting a basic sphere or analyzing a highly complex implicit equation, the rendering happens instantaneously. By providing real-time interactive graphing capabilities, these web-based tools democratize access to high-level scientific visualization without any software installation barriers.
</p>

<h2 id="how-it-works" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">How a 3D Graph Calculator Works</h2>
<p className="text-[#5F6368] mb-4 leading-relaxed">
  Understanding the underlying mechanics of a <strong>3D graphing calculator</strong> reveals why it is such an indispensable tool for scientific computing. The entire process begins when an equation is inputted into the interface. The calculator's mathematical parsing engine evaluates the syntax, breaking down trigonometric functions, logarithms, and standard arithmetic operators into raw computational instructions that the browser can process.
</p>
<p className="text-[#5F6368] mb-4 leading-relaxed">
  For standard explicit equations, the calculator generates a highly dense two-dimensional grid across the independent x and y axes. It then computes the corresponding dependent z-value for every single intersection point on this grid. This massive collection of 3D coordinates forms a mathematical surface mesh—a continuous network of interconnected vertices and polygons (typically triangles). The denser the underlying grid, the smoother and more accurate the resulting mathematical surface appears.
</p>
<p className="text-[#5F6368] mb-6 leading-relaxed">
  Once the mathematical mesh is defined, the interactive rendering phase takes over. Using WebGL APIs, the browser pushes the mesh data directly to your computer's GPU. The graphics rendering pipeline calculates surface normals to simulate accurate light reflection, applies material shading (such as wireframe or solid fill), and renders the scene through a virtual mathematical camera. As you interact with the <strong>online 3D graph calculator</strong>—manipulating variable sliders or orbiting the viewing angle—the underlying transformation matrices are recalculated in milliseconds. This guarantees the fluid, real-time interactivity necessary for exploring complex mathematical geometry.
</p>

<h2 id="cartesian-coordinate" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Understanding the Cartesian Coordinate System</h2>
<p className="text-[#5F6368] mb-4 leading-relaxed">
  To effectively utilize a <strong>3D plot calculator</strong>, one must grasp the fundamentals of the three-dimensional Cartesian coordinate system. In a standard 2D graph, space is defined by a horizontal x-axis and a vertical y-axis. The 3D Cartesian system expands this by introducing the orthogonal z-axis, which extends perpendicular to both the x and y axes, thereby establishing the concept of depth.
</p>
<ul className="list-disc pl-6 space-y-2 text-[#5F6368] mb-6">
  <li><strong>The X-Axis (Width):</strong> Traditionally represented as the red axis in 3D graphing tools, it denotes horizontal movement left and right from the origin (0,0,0).</li>
  <li><strong>The Y-Axis (Depth):</strong> Traditionally represented as the green axis, it denotes forward and backward movement. In 2D it points "up," but in 3D mathematics, it defines the horizontal plane alongside the x-axis.</li>
  <li><strong>The Z-Axis (Height):</strong> Traditionally represented as the blue axis, the z-axis controls the vertical elevation. In equations like <code>z = x^2 + y^2</code>, the z-value is the height of the surface at any given (x,y) location.</li>
</ul>
<p className="text-[#5F6368] mb-6 leading-relaxed">
  By mapping equations into this three-dimensional space, an <strong>interactive 3D graph</strong> allows mathematicians and engineers to locate points in space, calculate the distance between vectors, and define the boundaries of solid geometric volumes. Every surface you plot is fundamentally a collection of (x, y, z) coordinates satisfying a specific mathematical condition.
</p>

<h2 id="explicit-implicit" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Explicit vs Implicit Functions in 3D Graphing</h2>
<p className="text-[#5F6368] mb-4 leading-relaxed">
  A robust <strong>surface grapher</strong> must be capable of processing different mathematical formats. The two primary categories of equations you will encounter in multivariable calculus and 3D modeling are explicit functions and implicit surfaces.
</p>
<div className="overflow-x-auto mb-6">
  <table className="w-full text-left border-collapse border border-[#DADCE0] bg-white text-sm">
    <thead className="bg-[#F8F9FA]">
      <tr>
        <th className="border border-[#DADCE0] p-3 font-bold text-[#202124]">Feature</th>
        <th className="border border-[#DADCE0] p-3 font-bold text-[#202124]">Explicit Functions</th>
        <th className="border border-[#DADCE0] p-3 font-bold text-[#202124]">Implicit Surfaces</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border border-[#DADCE0] p-3 font-bold text-[#202124]">Definition</td>
        <td className="border border-[#DADCE0] p-3 text-[#5F6368]">The dependent variable (z) is isolated on one side of the equation.</td>
        <td className="border border-[#DADCE0] p-3 text-[#5F6368]">Variables are intertwined; no single variable is isolated.</td>
      </tr>
      <tr>
        <td className="border border-[#DADCE0] p-3 font-bold text-[#202124]">Standard Format</td>
        <td className="border border-[#DADCE0] p-3 text-[#5F6368] font-mono">z = f(x,y)</td>
        <td className="border border-[#DADCE0] p-3 text-[#5F6368] font-mono">f(x,y,z) = 0</td>
      </tr>
      <tr>
        <td className="border border-[#DADCE0] p-3 font-bold text-[#202124]">Examples</td>
        <td className="border border-[#DADCE0] p-3 text-[#5F6368]"><code>z = x^2 + y^2</code> (Paraboloid)</td>
        <td className="border border-[#DADCE0] p-3 text-[#5F6368]"><code>x^2 + y^2 + z^2 = 16</code> (Sphere)</td>
      </tr>
      <tr>
        <td className="border border-[#DADCE0] p-3 font-bold text-[#202124]">Rendering Method</td>
        <td className="border border-[#DADCE0] p-3 text-[#5F6368]">2D Grid Evaluation (Fast GPU rendering)</td>
        <td className="border border-[#DADCE0] p-3 text-[#5F6368]">Marching Cubes Algorithm / Raymarching</td>
      </tr>
    </tbody>
  </table>
</div>
<p className="text-[#5F6368] mb-6 leading-relaxed">
  While explicit functions are highly efficient to compute and ideal for visualizing standard multivariable calculus problems, an <strong>implicit surface calculator</strong> is absolutely necessary for closed geometric shapes. Because a sphere has two z-values for every (x,y) coordinate (a top hemisphere and a bottom hemisphere), it cannot be written as a single explicit function. Advanced calculators support both methodologies seamlessly.
</p>

<h2 id="why-it-matters" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Why 3D Graphing Matters</h2>
<p className="text-[#5F6368] mb-4 leading-relaxed">
  The transition from 2D to 3D graphing fundamentally alters how we solve problems in the STEM (Science, Technology, Engineering, and Mathematics) fields. In a two-dimensional space, analysts are primarily concerned with rates of change (slopes) and the areas under a curve. However, when you introduce the third dimension, the mathematical landscape explodes into gradients, directional derivatives, tangent planes, and complex volume integrals.
</p>
<p className="text-[#5F6368] mb-6 leading-relaxed">
  Without a reliable tool to <strong>plot 3D functions</strong>, visualizing the intersection of a plane and a quadratic surface relies entirely on mental mapping and rough hand-drawn sketches. Interactive graphing removes the cognitive overload. By instantly seeing how altering a constant shifts the saddle point of a hyperbolic paraboloid, students gain an intuitive, almost tactile understanding of multivariable behavior that textbooks simply cannot provide.
</p>

<h2 id="who-uses" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Who Uses a 3D Graph Calculator?</h2>
<p className="text-[#5F6368] mb-4 leading-relaxed">
  Because mathematical surfaces dictate the physical laws of our universe, the need for a fast, reliable <strong>engineering graph calculator</strong> spans dozens of professional disciplines:
</p>
<ul className="list-disc pl-6 space-y-2 text-[#5F6368] mb-8">
  <li><strong>Engineering Students:</strong> Visualizing stress distributions, fluid flow velocities, and thermodynamic surfaces in mechanical and civil engineering coursework.</li>
  <li><strong>Multivariable Calculus Students:</strong> Evaluating double and triple integrals, identifying local maxima/minima, and plotting vector fields for academic assignments.</li>
  <li><strong>Architects and CAD Designers:</strong> Prototyping parametric curves, modern non-Euclidean structures, and calculating the exact surface area of roofing elements.</li>
  <li><strong>Data Scientists and Machine Learning Engineers:</strong> Visualizing gradient descent algorithms, loss functions, and optimization landscapes in artificial intelligence training models.</li>
  <li><strong>Physicists:</strong> Modeling electromagnetic field intensity, general relativity spacetime curvature, and quantum probability density functions.</li>
  <li><strong>Educators and Teachers:</strong> Generating high-resolution, interactive 3D models to project onto smartboards during high school and university mathematics lectures.</li>
</ul>
`;

let file = fs.readFileSync('src/app/engineering/3d/page.tsx', 'utf8');

const articleRegex = /<article className="prose prose-slate max-w-none">[\s\S]*?<\/article>/;

if (articleRegex.test(file)) {
  const replacement = `<article className="prose prose-slate max-w-none">\n${part3A_content}\n                {/* CORE_PART_3B */}\n              </article>`;
  file = file.replace(articleRegex, replacement);
  fs.writeFileSync('src/app/engineering/3d/page.tsx', file);
  console.log("Part 3A successfully injected.");
} else {
  console.log("Failed to find article tag.");
}
