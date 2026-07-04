import re

path = 'src/app/engineering/3d/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# SECTIONS TO ADD
sections_to_add = """                {/* ── Why Choose NepaCalc 3D Graph Calculator? ── */}
                <h2 id="why-choose" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Why Choose NepaCalc 3D Graph Calculator?</h2>
                <ul className="list-disc pl-6 space-y-2 text-[#5F6368] mb-12 text-lg">
                  <li><strong>Browser-based:</strong> Runs entirely in your web browser.</li>
                  <li><strong>No installation:</strong> No heavy software downloads required.</li>
                  <li><strong>Free:</strong> Completely free to use.</li>
                  <li><strong>GPU accelerated:</strong> Uses WebGL for high-performance rendering.</li>
                  <li><strong>Multiple equations:</strong> Plot multiple functions simultaneously.</li>
                  <li><strong>Variable sliders:</strong> Interactive parameters for dynamic exploration.</li>
                  <li><strong>Cross-section slicing:</strong> Analyze internal structures easily.</li>
                  <li><strong>Interactive rotation:</strong> Drag and zoom intuitively.</li>
                  <li><strong>Engineering presets:</strong> Built-in formulas for immediate use.</li>
                  <li><strong>High-resolution rendering:</strong> Crisp and clear mathematical visualization.</li>
                  <li><strong>Mobile friendly:</strong> Works seamlessly on smartphones and tablets.</li>
                  <li><strong>Fast WebGL rendering:</strong> Real-time feedback and smooth animations.</li>
                </ul>

                {/* ── Common Mistakes When Graphing 3D Functions ── */}
                <h2 id="common-mistakes" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Common Mistakes When Graphing 3D Functions</h2>
                <ul className="list-disc pl-6 space-y-2 text-[#5F6368] mb-12 text-lg">
                  <li><strong>Incorrect parentheses:</strong> Failing to balance brackets properly alters the mathematical order of operations.</li>
                  <li><strong>Invalid equation syntax:</strong> Using symbols like 'x' for multiplication instead of '*' can cause parsing errors.</li>
                  <li><strong>Division by zero:</strong> Functions that divide by zero create undefined asymptotes that may render incorrectly.</li>
                  <li><strong>Poor graph ranges:</strong> Setting domain bounds too large or too small can hide critical surface features.</li>
                  <li><strong>Confusing radians and degrees:</strong> Trigonometric functions typically expect radians by default.</li>
                  <li><strong>Mixing implicit and explicit equations:</strong> Ensure the calculator is set to the correct mode for the equation type.</li>
                  <li><strong>Plotting outside valid domains:</strong> Taking the square root of negative numbers without complex support causes missing surfaces.</li>
                </ul>

                {/* ── Educational Applications ── */}
                <h2 id="educational-applications" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Educational Applications</h2>
                <ul className="list-disc pl-6 space-y-2 text-[#5F6368] mb-12 text-lg">
                  <li><strong>High School:</strong> Introduce students to 3D geometry and spatial reasoning.</li>
                  <li><strong>AP Calculus:</strong> Visualize volumes of revolution and surface areas.</li>
                  <li><strong>IB Mathematics:</strong> Support internal assessments and exploration projects.</li>
                  <li><strong>University Mathematics:</strong> Master multivariable calculus, partial derivatives, and multiple integrals.</li>
                  <li><strong>Engineering Courses:</strong> Model stress distributions and mechanical components.</li>
                  <li><strong>Research:</strong> Analyze complex mathematical models and experimental data.</li>
                  <li><strong>Classroom Demonstrations:</strong> Teachers can use interactive graphs to explain abstract concepts.</li>
                </ul>

                {/* ── Engineering Applications ── */}
                <h2 id="engineering-applications" className="text-2xl lg:text-3xl font-black text-[#202124] mt-12 mb-6">Engineering Applications</h2>
                <ul className="list-disc pl-6 space-y-2 text-[#5F6368] mb-12 text-lg">
                  <li><strong>Structural Analysis:</strong> Visualize load distributions and deformation across surfaces.</li>
                  <li><strong>Fluid Mechanics:</strong> Model pressure gradients, flow velocity profiles, and turbulence.</li>
                  <li><strong>Heat Transfer:</strong> Map temperature distributions across thermal conductors.</li>
                  <li><strong>Signal Processing:</strong> Plot frequency spectra and 2D Fourier transforms.</li>
                  <li><strong>Mechanical Design:</strong> Model gear profiles, cams, and complex mechanical surfaces.</li>
                  <li><strong>CAD Modeling:</strong> Develop and test mathematical definitions of surfaces before drafting.</li>
                  <li><strong>Numerical Analysis:</strong> Visualize errors and convergence in computational methods.</li>
                  <li><strong>Finite Element Analysis:</strong> Display boundary conditions and stress contours.</li>
                </ul>

                {/* ── Learning Path ── */}
                <div className="bg-[#E8F0FE] border border-[#1967D2] rounded-xl p-8 mb-12 text-center">
                  <h2 id="learning-path" className="text-2xl font-black text-[#202124] mb-6">Recommended Learning Path</h2>
                  <p className="text-lg text-[#5F6368] mb-6">Follow this progression to master mathematical visualization:</p>
                  <div className="flex flex-col items-center gap-2">
                    <Link href="/math-tools/scientific/" className="text-[#1967D2] font-bold hover:underline text-lg">Scientific Calculator</Link>
                    <span className="text-[#5F6368]">↓</span>
                    <Link href="/calculator/linear-solver/" className="text-[#1967D2] font-bold hover:underline text-lg">Linear Equation Solver</Link>
                    <span className="text-[#5F6368]">↓</span>
                    <Link href="/math-tools/matrix/" className="text-[#1967D2] font-bold hover:underline text-lg">Matrix Calculator</Link>
                    <span className="text-[#5F6368]">↓</span>
                    <Link href="/calculator/quadratic-solver/" className="text-[#1967D2] font-bold hover:underline text-lg">Quadratic Equation Solver</Link>
                    <span className="text-[#5F6368]">↓</span>
                    <span className="text-[#202124] font-bold text-lg bg-white px-4 py-2 rounded shadow">3D Graph Calculator</span>
                  </div>
                </div>"""

# Glossary expansion
glossary_target = """                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Cross Section & Wireframe</p>
                    <p className="text-[#5F6368] text-sm">A slice to analyze internal geometry. Wireframe displays only edges instead of filled polygons.</p>
                  </div>"""

glossary_replacement = glossary_target + """
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Mesh Resolution</p>
                    <p className="text-[#5F6368] text-sm">The density of the grid used to draw the surface. Higher resolution is smoother but slower.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Polygon Mesh</p>
                    <p className="text-[#5F6368] text-sm">A collection of vertices, edges, and faces that defines the shape of a 3D object.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Vertex</p>
                    <p className="text-[#5F6368] text-sm">A specific data point in 3D space defined by (x, y, z) coordinates.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Rendering</p>
                    <p className="text-[#5F6368] text-sm">The process of generating the final 2D image from the 3D model data.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">GPU & WebGL</p>
                    <p className="text-[#5F6368] text-sm">GPU is the hardware processor; WebGL is the web standard used to access it for fast graphics.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Perspective vs Orthographic Projection</p>
                    <p className="text-[#5F6368] text-sm">Perspective adds depth (closer objects are larger). Orthographic keeps scale uniform regardless of distance.</p>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-xl p-5">
                    <p className="font-bold text-[#1967D2] text-lg mb-1">Scalar & Vector Fields</p>
                    <p className="text-[#5F6368] text-sm">A scalar field assigns a single value (like temperature) to every point; a vector field assigns magnitude and direction (like wind).</p>
                  </div>"""

target_insertion_point = """                {/* ── Common Problems You Can Solve ── */}"""
if target_insertion_point in content and "Why Choose NepaCalc" not in content:
    content = content.replace(target_insertion_point, sections_to_add + "\n" + target_insertion_point)
else:
    print("Warning: target insertion point not found or already added")

if glossary_target in content and "Mesh Resolution" not in content:
    content = content.replace(glossary_target, glossary_replacement)
else:
    print("Warning: glossary target not found or already added")

# Ensure faq matches user request.
# I already added implicit equations, difference between 2d and 3d, parametric equations, surface plot, engineers, multiple equations, free.
# Need to add "Does it work on mobile devices?"
faq_target = """                  <details className="group border border-[#DADCE0] rounded-xl bg-white p-4 cursor-pointer">
                    <summary className="font-bold text-[#202124] text-lg outline-none flex justify-between items-center">
                      Is this calculator free?
                      <span className="text-[#1967D2] group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-[#5F6368] leading-relaxed">
                      Yes, our 3D Graph Calculator is 100% free to use. There are no paywalls, hidden fees, or subscription required, making it ideal for students and professionals looking for accessible math tools.
                    </p>
                  </details>"""

faq_replacement = faq_target + """
                  <details className="group border border-[#DADCE0] rounded-xl bg-white p-4 cursor-pointer">
                    <summary className="font-bold text-[#202124] text-lg outline-none flex justify-between items-center">
                      Does it work on mobile devices?
                      <span className="text-[#1967D2] group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-[#5F6368] leading-relaxed">
                      Yes, the calculator is fully responsive and supports smartphones and tablets with touch-based rotation and zoom, allowing you to plot surfaces on the go.
                    </p>
                  </details>"""

if faq_target in content and "Does it work on mobile devices?" not in content:
    content = content.replace(faq_target, faq_replacement)
else:
    print("Warning: faq target not found or already added")

# Append FAQ schema
schema_target = """                {
                  "@type": "Question",
                  "name": "Is this calculator free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, our 3D Graph Calculator is 100% free to use. There are no paywalls, hidden fees, or subscription required, making it ideal for students and professionals looking for accessible math tools."
                  }
                }"""

schema_replacement = schema_target + """,
                {
                  "@type": "Question",
                  "name": "Does it work on mobile devices?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, the calculator is fully responsive and supports smartphones and tablets with touch-based rotation and zoom, allowing you to plot surfaces on the go."
                  }
                }"""

if schema_target in content and "Does it work on mobile devices?" not in content:
    content = content.replace(schema_target, schema_replacement)
else:
    print("Warning: schema target not found or already added")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Page 4 update done")
