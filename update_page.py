import re

path = 'src/app/engineering/3d/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. ADD CONTEXTUAL INTERNAL LINKS THROUGHOUT THE PAGE
# 11. IMPROVE ENTITY COVERAGE

replacements = [
    ("engineering mathematics", "<Link href=\"/engineering/\" className=\"text-[#1967D2] hover:underline\">engineering mathematics</Link>"),
    ("Scientific Computing", "<Link href=\"/math-tools/scientific/\" className=\"text-[#1967D2] hover:underline\">Scientific Computing</Link>"),
    ("Numerical Analysis", "Numerical Analysis"),
    ("Computer Graphics", "Computer Graphics"),
    ("Differential Equations", "Differential Equations"),
    ("multivariable functions", "<Link href=\"/math-tools/calculus/\" className=\"text-[#1967D2] hover:underline\">multivariable functions</Link>"),
    ("Mechanical, civil, structural, and aerospace engineers", "Mechanical, civil, structural, and aerospace engineers (<Link href=\"/engineering/\" className=\"text-[#1967D2] hover:underline\">Engineering Calculator Hub</Link>)"),
]

for old, new in replacements:
    content = content.replace(old, new, 1)

# 6. EXPAND "WHO USES THIS CALCULATOR"
who_uses_target = """                  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-[#202124] mb-2">Researchers</h3>
                    <p className="text-[#5F6368] text-base">Scientists visualize mathematical models, simulation outputs, and experimental datasets using interactive three-dimensional graphs.</p>
                  </div>
                  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-[#202124] mb-2">Architects</h3>
                    <p className="text-[#5F6368] text-base">Architects explore curved surfaces, shell structures, and geometric forms before translating concepts into real-world designs.</p>
                  </div>
                  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-[#202124] mb-2">Data Scientists</h3>
                    <p className="text-[#5F6368] text-base">Machine learning engineers and statisticians use surface plots to visualize optimization functions, probability distributions, and multidimensional datasets.</p>
                  </div>
                </div>"""

who_uses_replacement = """                  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-[#202124] mb-2">Researchers</h3>
                    <p className="text-[#5F6368] text-base">Physics researchers and scientists visualize mathematical models, simulation outputs, and experimental datasets using interactive three-dimensional graphs.</p>
                  </div>
                  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-[#202124] mb-2">Architects & Designers</h3>
                    <p className="text-[#5F6368] text-base">Architecture students and CAD Designers explore curved surfaces, shell structures, and geometric forms before translating concepts into real-world designs.</p>
                  </div>
                  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-[#202124] mb-2">Data Scientists & ML</h3>
                    <p className="text-[#5F6368] text-base">Machine learning engineers and data scientists use surface plots to visualize optimization functions, probability distributions, and multidimensional datasets.</p>
                  </div>
                  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-[#202124] mb-2">Educators</h3>
                    <p className="text-[#5F6368] text-base">Mathematics teachers and university professors use it to interactively demonstrate complex topology and surface concepts in the classroom.</p>
                  </div>
                  <div className="p-6 bg-white border border-[#DADCE0] rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold text-[#202124] mb-2">Specialized Engineers</h3>
                    <p className="text-[#5F6368] text-base">Robotics engineers and aerospace engineers rely on 3D visualizations for kinematics and fluid dynamics modeling.</p>
                  </div>
                </div>"""

if who_uses_target in content:
    content = content.replace(who_uses_target, who_uses_replacement)
else:
    print("Who uses target not found")

# 10. ADD RELATED CALCULATORS HIGHER ON PAGE
intro_target = """        <p className="text-lg text-center leading-relaxed text-[#5F6368] max-w-4xl mx-auto">
          Plot mathematical equations, visualize 3D surfaces, and explore multivariable functions with NepaCalc's free <strong>3D Graph Calculator</strong>. Whether you're graphing explicit functions, implicit surfaces, engineering models, or calculus equations, this interactive <strong>3D graphing calculator</strong> (and online 3D function grapher) lets you rotate, zoom, compare multiple equations, and analyze complex mathematical surfaces directly in your browser. Designed for students, engineers, educators, researchers, and professionals, it provides fast, accurate, browser-based 3D visualization without requiring software installation.
        </p>"""

intro_replacement = intro_target + """
        <p className="text-sm text-center font-medium text-[#5F6368] max-w-4xl mx-auto mt-4">
          Looking for other tools? Try our <Link href="/math-tools/scientific/" className="text-[#1967D2] hover:underline">Scientific Calculator</Link>, <Link href="/math-tools/matrix/" className="text-[#1967D2] hover:underline">Matrix Calculator</Link>, <Link href="/calculator/linear-solver/" className="text-[#1967D2] hover:underline">Linear Equation Solver</Link>, or <Link href="/calculator/quadratic-solver/" className="text-[#1967D2] hover:underline">Quadratic Equation Solver</Link>.
        </p>"""

if intro_target in content:
    content = content.replace(intro_target, intro_replacement)
else:
    print("Intro target not found")

# 8. ADD TRUST SIGNALS
trust_target = """              <h3 className="font-bold text-[#202124] mb-3 border-b pb-2">Trust & Details</h3>
              <div className="space-y-3 text-[#5F6368] text-sm">
                <p><strong className="text-[#202124]">Last Updated:</strong> June 2026</p>
                <p><strong className="text-[#202124]">Reviewed by:</strong> NepaCalc Mathematics Team</p>
                <p><strong className="text-[#202124]">Accuracy Statement:</strong> All formulas are verified against internationally accepted mathematical references.</p>
                <p><strong className="text-[#202124]">Browser Compatibility:</strong> Supports Chrome, Firefox, Safari, Edge (WebGL Required)</p>
                <p><strong className="text-[#202124]">Suitable for:</strong> Students, Teachers, Researchers, Engineers</p>
              </div>"""

trust_replacement = """              <h3 className="font-bold text-[#202124] mb-3 border-b pb-2">Trust & Details</h3>
              <div className="space-y-3 text-[#5F6368] text-sm">
                <p><strong className="text-[#202124]">Last Updated:</strong> June 2026</p>
                <p><strong className="text-[#202124]">Formula Verification:</strong> Updated June 2026</p>
                <p><strong className="text-[#202124]">Calculation Engine:</strong> WebGL GPU Rendering</p>
                <p><strong className="text-[#202124]">Educational Level:</strong> High School, College, University, Professional</p>
                <p><strong className="text-[#202124]">Reviewed by:</strong> NepaCalc Mathematics Team</p>
                <p><strong className="text-[#202124]">Accuracy Statement:</strong> All formulas are verified against internationally accepted mathematical references.</p>
                <div className="pt-2 border-t border-[#DADCE0]">
                  <p><strong className="text-[#202124]">Reference Standards:</strong></p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>MIT OpenCourseWare</li>
                    <li>Wolfram MathWorld</li>
                    <li>NIST</li>
                    <li>OpenCourseWare Mathematics</li>
                  </ul>
                </div>
              </div>"""

if trust_target in content:
    content = content.replace(trust_target, trust_replacement)
else:
    print("Trust target not found")

# 7. EXPAND COMPARISON TABLE
comp_target = """                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                        <th className="p-4 font-bold text-[#202124]">Feature</th>
                        <th className="p-4 font-bold text-[#1967D2] text-center border-l border-[#DADCE0]">NepaCalc 3D Grapher</th>
                        <th className="p-4 font-bold text-[#5F6368] text-center border-l border-[#DADCE0]">Standard 2D Graphers</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DADCE0]">
                      <tr>
                        <td className="p-4 text-[#202124] font-medium">Visual Dimensions</td>
                        <td className="p-4 text-center text-green-600 font-bold border-l border-[#DADCE0]">3D (X, Y, Z)</td>
                        <td className="p-4 text-center text-[#5F6368] border-l border-[#DADCE0]">2D (X, Y)</td>
                      </tr>
                      <tr className="bg-[#F8F9FA]">
                        <td className="p-4 text-[#202124] font-medium">Surface Rendering</td>
                        <td className="p-4 text-center text-green-600 font-bold border-l border-[#DADCE0]">Yes</td>
                        <td className="p-4 text-center text-red-500 border-l border-[#DADCE0]">No</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-[#202124] font-medium">Variable Sliders</td>
                        <td className="p-4 text-center text-green-600 font-bold border-l border-[#DADCE0]">Interactive</td>
                        <td className="p-4 text-center text-[#5F6368] border-l border-[#DADCE0]">Sometimes</td>
                      </tr>
                      <tr className="bg-[#F8F9FA]">
                        <td className="p-4 text-[#202124] font-medium">Hardware Acceleration</td>
                        <td className="p-4 text-center text-green-600 font-bold border-l border-[#DADCE0]">WebGL</td>
                        <td className="p-4 text-center text-[#5F6368] border-l border-[#DADCE0]">CPU / Canvas</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-[#202124] font-medium">Cross Section Slicing</td>
                        <td className="p-4 text-center text-green-600 font-bold border-l border-[#DADCE0]">Yes</td>
                        <td className="p-4 text-center text-red-500 border-l border-[#DADCE0]">No</td>
                      </tr>
                    </tbody>
                  </table>"""

comp_replacement = """                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                        <th className="p-4 font-bold text-[#202124]">Feature</th>
                        <th className="p-4 font-bold text-[#1967D2] text-center border-l border-[#DADCE0]">NepaCalc 3D Grapher</th>
                        <th className="p-4 font-bold text-[#5F6368] text-center border-l border-[#DADCE0]">Standard 2D Graphers</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DADCE0]">
                      <tr>
                        <td className="p-4 text-[#202124] font-medium">Visual Dimensions</td>
                        <td className="p-4 text-center text-green-600 font-bold border-l border-[#DADCE0]">3D (X, Y, Z)</td>
                        <td className="p-4 text-center text-[#5F6368] border-l border-[#DADCE0]">2D (X, Y)</td>
                      </tr>
                      <tr className="bg-[#F8F9FA]">
                        <td className="p-4 text-[#202124] font-medium">Surface Rendering</td>
                        <td className="p-4 text-center text-green-600 font-bold border-l border-[#DADCE0]">Yes</td>
                        <td className="p-4 text-center text-red-500 border-l border-[#DADCE0]">No</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-[#202124] font-medium">Variable Sliders</td>
                        <td className="p-4 text-center text-green-600 font-bold border-l border-[#DADCE0]">Interactive</td>
                        <td className="p-4 text-center text-[#5F6368] border-l border-[#DADCE0]">Sometimes</td>
                      </tr>
                      <tr className="bg-[#F8F9FA]">
                        <td className="p-4 text-[#202124] font-medium">Hardware Acceleration</td>
                        <td className="p-4 text-center text-green-600 font-bold border-l border-[#DADCE0]">WebGL</td>
                        <td className="p-4 text-center text-[#5F6368] border-l border-[#DADCE0]">CPU / Canvas</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-[#202124] font-medium">Browser Based</td>
                        <td className="p-4 text-center text-green-600 font-bold border-l border-[#DADCE0]">Yes</td>
                        <td className="p-4 text-center text-[#5F6368] border-l border-[#DADCE0]">Yes</td>
                      </tr>
                      <tr className="bg-[#F8F9FA]">
                        <td className="p-4 text-[#202124] font-medium">Installation Required</td>
                        <td className="p-4 text-center text-green-600 font-bold border-l border-[#DADCE0]">No</td>
                        <td className="p-4 text-center text-[#5F6368] border-l border-[#DADCE0]">No</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-[#202124] font-medium">Multiple Surfaces</td>
                        <td className="p-4 text-center text-green-600 font-bold border-l border-[#DADCE0]">Yes</td>
                        <td className="p-4 text-center text-red-500 border-l border-[#DADCE0]">No</td>
                      </tr>
                      <tr className="bg-[#F8F9FA]">
                        <td className="p-4 text-[#202124] font-medium">Engineering Presets</td>
                        <td className="p-4 text-center text-green-600 font-bold border-l border-[#DADCE0]">Yes</td>
                        <td className="p-4 text-center text-red-500 border-l border-[#DADCE0]">No</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-[#202124] font-medium">Interactive Rotation</td>
                        <td className="p-4 text-center text-green-600 font-bold border-l border-[#DADCE0]">Yes</td>
                        <td className="p-4 text-center text-red-500 border-l border-[#DADCE0]">No</td>
                      </tr>
                      <tr className="bg-[#F8F9FA]">
                        <td className="p-4 text-[#202124] font-medium">Free</td>
                        <td className="p-4 text-center text-green-600 font-bold border-l border-[#DADCE0]">Yes</td>
                        <td className="p-4 text-center text-green-600 font-bold border-l border-[#DADCE0]">Yes</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-[#202124] font-medium">Cross Section Slicing</td>
                        <td className="p-4 text-center text-green-600 font-bold border-l border-[#DADCE0]">Yes</td>
                        <td className="p-4 text-center text-red-500 border-l border-[#DADCE0]">No</td>
                      </tr>
                    </tbody>
                  </table>"""

if comp_target in content:
    content = content.replace(comp_target, comp_replacement)
else:
    print("Comp target not found")

# 5. ADD A NEW SECTION: Try These Example Equations
# 3. ADD A NEW SECTION: Common Problems You Can Solve
# 2. ADD A NEW SECTION: Related Mathematics Topics
# 4. ADD A NEW SECTION: Also Known As

sections_target = """                {/* ── Who Uses It ── */}"""

sections_to_add = """                {/* ── Try These Example Equations ── */}
                <h2 id="example-equations" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Try These Example Equations</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  You can copy and paste these equations directly into the 3D Graph Calculator to see how they render.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  <div className="bg-[#F8F9FA] p-4 rounded-xl border border-[#DADCE0]">
                    <p className="text-[#1967D2] font-bold text-sm mb-1 uppercase tracking-wider">Paraboloid</p>
                    <code className="text-[#202124] font-mono text-lg">z = x² + y²</code>
                  </div>
                  <div className="bg-[#F8F9FA] p-4 rounded-xl border border-[#DADCE0]">
                    <p className="text-[#1967D2] font-bold text-sm mb-1 uppercase tracking-wider">Wave</p>
                    <code className="text-[#202124] font-mono text-lg">z = sin(x) cos(y)</code>
                  </div>
                  <div className="bg-[#F8F9FA] p-4 rounded-xl border border-[#DADCE0]">
                    <p className="text-[#1967D2] font-bold text-sm mb-1 uppercase tracking-wider">Ripple</p>
                    <code className="text-[#202124] font-mono text-lg">z = sin(√(x²+y²))</code>
                  </div>
                  <div className="bg-[#F8F9FA] p-4 rounded-xl border border-[#DADCE0]">
                    <p className="text-[#1967D2] font-bold text-sm mb-1 uppercase tracking-wider">Cone</p>
                    <code className="text-[#202124] font-mono text-lg">z = √(x²+y²)</code>
                  </div>
                  <div className="bg-[#F8F9FA] p-4 rounded-xl border border-[#DADCE0]">
                    <p className="text-[#1967D2] font-bold text-sm mb-1 uppercase tracking-wider">Sphere</p>
                    <code className="text-[#202124] font-mono text-lg">x²+y²+z²=16</code>
                  </div>
                  <div className="bg-[#F8F9FA] p-4 rounded-xl border border-[#DADCE0]">
                    <p className="text-[#1967D2] font-bold text-sm mb-1 uppercase tracking-wider">Hyperboloid</p>
                    <code className="text-[#202124] font-mono text-lg">x²+y²−z²=4</code>
                  </div>
                  <div className="bg-[#F8F9FA] p-4 rounded-xl border border-[#DADCE0]">
                    <p className="text-[#1967D2] font-bold text-sm mb-1 uppercase tracking-wider">Gaussian</p>
                    <code className="text-[#202124] font-mono text-lg">z = exp(-(x²+y²)/8)</code>
                  </div>
                  <div className="bg-[#F8F9FA] p-4 rounded-xl border border-[#DADCE0]">
                    <p className="text-[#1967D2] font-bold text-sm mb-1 uppercase tracking-wider">Monkey Saddle</p>
                    <code className="text-[#202124] font-mono text-lg">z = x³−3xy²</code>
                  </div>
                </div>

                {/* ── Common Problems You Can Solve ── */}
                <h2 id="common-problems" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Common Problems You Can Solve</h2>
                <p className="text-lg leading-relaxed text-[#5F6368] mb-6">
                  This calculator is designed to help users with a variety of mathematical and engineering challenges:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#5F6368] mb-12 text-lg">
                  <li><strong>Plot 3D equations:</strong> See the exact shape of any valid mathematical function.</li>
                  <li><strong>Visualize multivariable functions:</strong> Easily understand functions that depend on both x and y.</li>
                  <li><strong>Understand calculus surfaces:</strong> Master gradients, partial derivatives, and multiple integrals visually.</li>
                  <li><strong>Compare mathematical functions:</strong> Overlay multiple equations to see how they differ.</li>
                  <li><strong>Study optimization surfaces:</strong> Find saddle points, local maxima, and minima for machine learning models.</li>
                  <li><strong>Visualize Gaussian distributions:</strong> Plot bivariate normal distributions in statistics.</li>
                  <li><strong>Plot saddle surfaces:</strong> Easily visualize hyperbolic paraboloids.</li>
                  <li><strong>Explore engineering geometry:</strong> Model physical properties like stress and fluid flow mathematically.</li>
                  <li><strong>Learn coordinate systems:</strong> Gain an intuitive grasp of the Cartesian, cylindrical, and spherical coordinates.</li>
                  <li><strong>Understand implicit equations:</strong> See complete objects like spheres and toruses defined by a single relationship.</li>
                </ul>

                {/* ── Related Mathematics Topics ── */}
                <h2 id="related-topics" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Related Mathematics Topics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  <div>
                    <h4 className="font-bold text-[#202124]">Cartesian Coordinates</h4>
                    <p className="text-sm text-[#5F6368]">The fundamental 3D (x, y, z) coordinate system used for spatial graphing.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#202124]">Multivariable Calculus</h4>
                    <p className="text-sm text-[#5F6368]">The extension of calculus to functions of multiple variables, relying heavily on 3D visualization.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#202124]">Surface Plotting</h4>
                    <p className="text-sm text-[#5F6368]">The technique of rendering continuous 3D surfaces from mathematical equations.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#202124]">Implicit Equations</h4>
                    <p className="text-sm text-[#5F6368]">Equations defining relationships between variables (like F(x,y,z)=0) without explicit solved forms.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#202124]">Parametric Surfaces</h4>
                    <p className="text-sm text-[#5F6368]">Surfaces defined by parameters u and v, useful in computer graphics and CAD.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#202124]">Differential Geometry</h4>
                    <p className="text-sm text-[#5F6368]">The study of smooth shapes, curvature, and spaces using calculus.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#202124]">Vector Calculus</h4>
                    <p className="text-sm text-[#5F6368]">Analysis of vector fields, used extensively in physics and engineering.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#202124]">Optimization</h4>
                    <p className="text-sm text-[#5F6368]">Finding the best solution (maxima/minima), crucial for machine learning and economics.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#202124]">Topology</h4>
                    <p className="text-sm text-[#5F6368]">The study of spatial properties that are preserved under continuous deformations.</p>
                  </div>
                </div>

                {/* ── Also Known As ── */}
                <div className="bg-[#F8F9FA] rounded-xl p-6 border border-[#DADCE0] mb-12">
                  <h3 className="text-lg font-bold text-[#202124] mb-3">Also Known As</h3>
                  <p className="text-sm text-[#5F6368] mb-3">Users often search for our tool using different terminology depending on their region and field of study. You may hear it referred to as a:</p>
                  <ul className="text-sm text-[#5F6368] grid grid-cols-2 gap-2 list-disc pl-4">
                    <li>3D Graph Calculator</li>
                    <li>3D Grapher</li>
                    <li>Online 3D Plotter</li>
                    <li>3D Surface Grapher</li>
                    <li>3D Equation Grapher</li>
                    <li>3D Function Grapher</li>
                    <li>Online 3D Graphing Calculator</li>
                    <li>Multivariable Grapher</li>
                    <li>3D Plot Calculator</li>
                    <li>3D Surface Plotter</li>
                  </ul>
                </div>

                {/* ── Who Uses It ── */}"""
if sections_target in content:
    content = content.replace(sections_target, sections_to_add)
else:
    print("Sections target not found")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully")
