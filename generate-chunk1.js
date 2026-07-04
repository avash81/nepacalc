const fs = require('fs');

const part3_chunk1 = `
            <h2 className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">What is a 3D Graph Calculator?</h2>
            <p className="text-[#5F6368] mb-4">
              A <strong>3D graph calculator</strong> is an advanced mathematical visualization tool that renders functions across three dimensions (x, y, and z). While traditional 2D graphers plot lines on a flat Cartesian plane, a 3D plotter adds depth, allowing you to model complex surfaces, curves, and spatial relationships.
            </p>
            <p className="text-[#5F6368] mb-6">
              When working with multivariable calculus, physics simulations, or 3D modeling, you are dealing with equations where the output (z) depends on two independent variables (x and y). A 3D surface grapher evaluates thousands of these coordinate points in real-time and connects them using WebGL rendering to create a rotatable, interactive 3D model.
            </p>

            <h2 className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">How to Use the 3D Graph Calculator</h2>
            <div className="bg-[#F8F9FA] p-6 rounded-xl border border-[#DADCE0] mb-8">
              <ol className="space-y-4 list-decimal pl-5 text-[#5F6368]">
                <li>
                  <strong className="text-[#202124]">Enter Your Equation:</strong> Use the equation box to type a function. For explicit surfaces, use the format <code>z = sin(x)*cos(y)</code>. For implicit surfaces, type the full equation such as <code>x^2 + y^2 + z^2 = 16</code>.
                </li>
                <li>
                  <strong className="text-[#202124]">Adjust Variable Sliders:</strong> If your equation includes variables (like <code>a</code> or <code>b</code>), the calculator automatically generates interactive sliders. Adjust these to see the surface morph in real-time.
                </li>
                <li>
                  <strong className="text-[#202124]">Rotate and Zoom:</strong> Click and drag anywhere on the 3D canvas to rotate the graph. Use your mouse wheel or the on-screen controls to zoom in and examine specific cross-sections.
                </li>
                <li>
                  <strong className="text-[#202124]">Add Multiple Equations:</strong> Click the "+" icon to overlay additional functions. This is critical for finding intersections between multiple planes or surfaces.
                </li>
                <li>
                  <strong className="text-[#202124]">Customize Rendering:</strong> Use the display settings to toggle wireframe mode, adjust opacity for overlapping graphs, or increase the mesh resolution for high-quality mathematical exports.
                </li>
              </ol>
            </div>

            <h2 className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Interactive Calculator Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-5 border border-[#DADCE0] rounded-lg">
                <h3 className="font-bold text-[#1967D2] mb-2">Multiple Equations</h3>
                <p className="text-sm text-[#5F6368]">Plot up to 5 distinct equations simultaneously. Our engine automatically color-codes each surface, allowing you to easily visualize complex intersections and bounding regions.</p>
              </div>
              <div className="p-5 border border-[#DADCE0] rounded-lg">
                <h3 className="font-bold text-[#1967D2] mb-2">Cross Sections & Slicing</h3>
                <p className="text-sm text-[#5F6368]">Activate the slicing tool to cut through any graph along the X, Y, or Z axis. This is perfect for generating 2D contour maps from 3D surfaces.</p>
              </div>
              <div className="p-5 border border-[#DADCE0] rounded-lg">
                <h3 className="font-bold text-[#1967D2] mb-2">Dynamic Variable Sliders</h3>
                <p className="text-sm text-[#5F6368]">Define custom parameters (e.g., <code>z = a*sin(x)</code>). The calculator detects 'a' and generates a slider, letting you animate the graph's behavior interactively.</p>
              </div>
              <div className="p-5 border border-[#DADCE0] rounded-lg">
                <h3 className="font-bold text-[#1967D2] mb-2">Wireframe & Opacity</h3>
                <p className="text-sm text-[#5F6368]">Toggle between solid shading and geometric wireframes. Adjust transparency to see inside closed implicit surfaces like spheres and toruses.</p>
              </div>
              <div className="p-5 border border-[#DADCE0] rounded-lg">
                <h3 className="font-bold text-[#1967D2] mb-2">Orthographic & Perspective Projection</h3>
                <p className="text-sm text-[#5F6368]">Switch rendering modes instantly. Use Perspective for realistic depth, or Orthographic for precise, non-distorted engineering views.</p>
              </div>
              <div className="p-5 border border-[#DADCE0] rounded-lg">
                <h3 className="font-bold text-[#1967D2] mb-2">High-Resolution Export</h3>
                <p className="text-sm text-[#5F6368]">Crank up the mesh resolution slider to generate ultra-smooth, high-polygon surfaces suitable for academic papers and mathematical documentation.</p>
              </div>
            </div>

            <h2 className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Supported Graph Types</h2>
            <p className="text-[#5F6368] mb-8">NepaCalc's rendering engine supports a massive variety of mathematical graphing formats to ensure comprehensive topical coverage for students and professionals.</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#202124] mb-2">Explicit Functions (z = f(x,y))</h3>
                <p className="text-[#5F6368]">The most common type of 3D graph. For every (x,y) coordinate, there is exactly one z-height. Examples include paraboloids (<code>z = x^2 + y^2</code>) and wave functions (<code>z = sin(x)*cos(y)</code>). Our WebGL engine renders explicit functions instantly using a highly optimized vertex grid.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#202124] mb-2">Implicit Surfaces (f(x,y,z) = 0)</h3>
                <p className="text-[#5F6368]">Implicit equations define 3D shapes where not every (x,y) has a direct z-value. A perfect example is a sphere (<code>x^2 + y^2 + z^2 = 16</code>). NepaCalc utilizes the advanced Marching Cubes algorithm to accurately mesh and render complex implicit geometries in real-time.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#202124] mb-2">Parametric Curves and Surfaces</h3>
                <p className="text-[#5F6368]"><em>(Coming Soon)</em> Parametric equations allow you to plot 3D paths and surfaces using independent parameters like 'u' and 'v'. These are essential for modeling Mobius strips, Klein bottles, and complex 3D knots.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#202124] mb-2">Polar, Cylindrical, and Spherical Coordinates</h3>
                <p className="text-[#5F6368]">While standard graphs use Cartesian (x,y,z) space, many engineering problems are easier to solve using radius and angle. Our engine natively supports trigonometric evaluations allowing you to map cylindrical and spherical transformations seamlessly.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#202124] mb-2">Vector Fields</h3>
                <p className="text-[#5F6368]"><em>(Coming Soon)</em> Visualize fluid dynamics, magnetic fields, and gravitational pulls. A 3D vector field plots directional arrows at specific coordinates to map the flow and magnitude of a multivariable system.</p>
              </div>
            </div>
`;

let file = fs.readFileSync('src/app/engineering/3d/page.tsx', 'utf8');

// I will insert this content right after the introductory paragraph.
const introRegex = /(<p className="text-lg leading-relaxed text-\[#5F6368\] mb-12">[\s\S]*?<\/p>)/;

if (introRegex.test(file)) {
  // Replace the rest of the old article content with our new chunk 1
  // We'll retain the <article> tag and just rebuild its interior.
  const articleRegex = /(<article className="prose prose-slate max-w-none">[\s\S]*?)(<h1[\s\S]*?<\/p>)([\s\S]*?)(<\/article>)/;
  
  file = file.replace(articleRegex, (match, p1, p2, p3, p4) => {
    return p1 + p2 + part3_chunk1 + p4;
  });
  
  fs.writeFileSync('src/app/engineering/3d/page.tsx', file);
  console.log('Successfully injected Part 3 Chunk 1');
} else {
  console.log('Failed to find insertion point.');
}
