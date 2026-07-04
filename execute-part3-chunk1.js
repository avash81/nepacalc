const fs = require('fs');

const chunk1 = `
<h2 id="what-is-3d-calculator" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">What is a 3D Graph Calculator?</h2>
<p className="text-[#5F6368] mb-4 leading-relaxed">
  A <strong>3D graph calculator</strong> is an advanced mathematical visualization tool designed to render functions and equations across three spatial dimensions: the x-axis, the y-axis, and the z-axis. While traditional two-dimensional graphers restrict plotting to lines and curves on a flat Cartesian plane, a three-dimensional plotter introduces depth, allowing users to accurately model complex geometric surfaces, volumetric shapes, and intricate spatial relationships. This makes it an indispensable asset for students, educators, and professionals navigating multivariable calculus, linear algebra, and spatial geometry.
</p>
<p className="text-[#5F6368] mb-4 leading-relaxed">
  At its core, a <strong>3D graphing calculator</strong> transforms abstract algebraic expressions into interactive, manipulatable visual models. When dealing with functions of two independent variables—typically denoted as <code>z = f(x,y)</code>—the calculator evaluates thousands of coordinate pairs simultaneously. The output is a continuous mathematical surface that can represent anything from the ripples of a wave to the curvature of a saddle surface. For engineering and physics applications, the ability to visualize these structures is critical for understanding physical phenomena like electromagnetic fields, fluid dynamics, and thermodynamic distributions.
</p>
<p className="text-[#5F6368] mb-4 leading-relaxed">
  Modern web-based tools have revolutionized how we interact with mathematical surfaces. An <strong>online 3D graph calculator</strong> leverages the power of WebGL (Web Graphics Library) to utilize your device's graphics processing unit (GPU). This means that whether you are plotting a basic sphere or a highly complex implicit surface, the rendering happens instantly within your browser. There is no need for heavy, localized software installations. By providing real-time interactive graphing capabilities, these tools democratize access to high-level mathematical visualization.
</p>
<p className="text-[#5F6368] mb-6 leading-relaxed">
  The transition from 2D to 3D graphing fundamentally changes problem-solving. In a 2D space, you are analyzing rates of change (slopes) and areas under a curve. In a 3D Cartesian coordinate system, you analyze gradients, directional derivatives, tangent planes, and surface integrals. A robust <strong>3D plotter</strong> not only displays these shapes but provides interactive tools—like rotation, zooming, and cross-section slicing—that enable a deep, intuitive understanding of multivariable behavior.
</p>

<h2 id="how-it-works" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">How Does a 3D Graph Calculator Work?</h2>
<p className="text-[#5F6368] mb-4 leading-relaxed">
  Understanding the underlying mechanics of a <strong>3D graphing calculator</strong> reveals why it is such a powerful tool for scientific visualization. The process begins with the Cartesian coordinate system, expanding the standard (x, y) grid by introducing the orthogonal z-axis for depth. When an equation is inputted, the calculator's parsing engine evaluates the mathematical syntax, translating human-readable algebra into computational instructions.
</p>
<p className="text-[#5F6368] mb-4 leading-relaxed">
  For explicit equations (e.g., <code>z = sin(x) + cos(y)</code>), the calculator generates a dense 2D grid across the x and y axes. It then computes the corresponding z-value for every single point on this grid. This collection of 3D coordinates forms a surface mesh—a network of interconnected vertices and polygons (usually triangles). The denser the grid, the smoother the resulting mathematical surface appears, though this requires more computational power. 
</p>
<p className="text-[#5F6368] mb-4 leading-relaxed">
  Implicit equations (e.g., <code>x^2 + y^2 + z^2 = 25</code>) require a significantly more advanced approach. Because the relationship between variables is intertwined and not easily solved for a single axis, the calculator employs techniques like the Marching Cubes algorithm. This algorithm divides the 3D space into tiny volumetric cubes (voxels) and determines where the mathematical surface intersects the edges of these cubes, seamlessly stitching together a mesh to form complex structures like spheres, toruses, and intersecting planes.
</p>
<p className="text-[#5F6368] mb-6 leading-relaxed">
  Once the surface mesh is mathematically defined, the interactive rendering phase begins. Using WebGL, the browser sends the mesh data directly to the GPU. The graphics pipeline applies shading, calculates surface normals for accurate light reflection, and renders the scene using a virtual camera. As you interact with the <strong>online 3D graph calculator</strong>, manipulating variable sliders or rotating the view, the matrix transformations are recalculated instantly. This creates the fluid, real-time interactivity necessary for exploring multiple equations and complex geometry without lag.
</p>

<h2 id="how-to-use" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">How to Use the 3D Graph Calculator</h2>
<p className="text-[#5F6368] mb-6 leading-relaxed">
  Mastering an <strong>interactive 3D graph</strong> tool requires understanding its core controls. Our calculator is designed for immediate ease-of-use while maintaining the depth required for advanced multivariable calculus and engineering analysis. Follow these steps to maximize your graphing experience.
</p>

<div className="space-y-6 mb-8">
  <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#DADCE0]">
    <h3 className="text-lg font-bold text-[#1967D2] mb-2">1. Enter Your Equation</h3>
    <p className="text-[#5F6368] leading-relaxed">
      Begin by typing your mathematical function into the primary input field. For explicit functions, you can define 'z' in terms of 'x' and 'y' (e.g., <code>z = x^2 - y^2</code>). For implicit surfaces, type the full relationship (e.g., <code>x^2/4 + y^2/9 + z^2/16 = 1</code>). The parser supports standard trigonometric functions, logarithms, exponentials, and basic arithmetic operators.
    </p>
  </div>
  
  <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#DADCE0]">
    <h3 className="text-lg font-bold text-[#1967D2] mb-2">2. Choose a Preset (Optional)</h3>
    <p className="text-[#5F6368] leading-relaxed">
      If you are exploring common mathematical surfaces, utilize the built-in preset library. Clicking on presets like "Sphere", "Torus", or "Gaussian" will automatically populate the equation field with the correct syntax. This is highly recommended for students learning the foundational shapes of 3D geometry.
    </p>
  </div>

  <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#DADCE0]">
    <h3 className="text-lg font-bold text-[#1967D2] mb-2">3. Adjust Variable Sliders</h3>
    <p className="text-[#5F6368] leading-relaxed">
      A defining feature of this <strong>3D plot calculator</strong> is dynamic variable support. If you introduce undefined parameters into your equation (such as 'a', 'b', or 'c'), the interface automatically generates interactive sliders below the input box. Dragging these sliders updates the graph in real-time, allowing you to animate the surface and observe how different coefficients impact the curvature and scale of your <strong>plot 3D functions</strong>.
    </p>
  </div>

  <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#DADCE0]">
    <h3 className="text-lg font-bold text-[#1967D2] mb-2">4. Rotate and Zoom the Canvas</h3>
    <p className="text-[#5F6368] leading-relaxed">
      Spatial visualization requires active manipulation. Click and drag anywhere within the graphing window to orbit the camera around the origin. Use your mouse scroll wheel (or pinch-to-zoom on mobile) to inspect minute details or zoom out to view the broader asymptotic behavior of the surface.
    </p>
  </div>

  <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#DADCE0]">
    <h3 className="text-lg font-bold text-[#1967D2] mb-2">5. Slice with Cross Sections</h3>
    <p className="text-[#5F6368] leading-relaxed">
      To analyze internal structures or convert a 3D surface into a 2D contour map, activate the cross-section slicing tool. This allows you to restrict the rendering along the X, Y, or Z planes. By dragging the clipping slider, you can effectively "scan" through the volume of the graph—an essential technique in medical imaging analysis and multivariable calculus.
    </p>
  </div>

  <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#DADCE0]">
    <h3 className="text-lg font-bold text-[#1967D2] mb-2">6. Compare Multiple Equations</h3>
    <p className="text-[#5F6368] leading-relaxed">
      Use the "+" button to add subsequent equation fields. The <strong>surface grapher</strong> will render each new function in a distinct, contrasting color. This is critical for finding the intersection curves between multiple planes, checking bounds for volume integrals, or comparing an original function against its tangent plane.
    </p>
  </div>
</div>
`;

let file = fs.readFileSync('src/app/engineering/3d/page.tsx', 'utf8');

const injectionPoint = "{/* Main Content (Part 3) will go here */}";
if (file.includes(injectionPoint)) {
  file = file.replace(injectionPoint, chunk1 + '\n\n                {/* CORE_CHUNK_2 */}');
  fs.writeFileSync('src/app/engineering/3d/page.tsx', file);
  console.log("Chunk 1 written successfully.");
} else {
  console.log("Error: Injection point not found.");
}
