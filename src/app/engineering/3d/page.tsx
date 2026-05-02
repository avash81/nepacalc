import { calcMeta } from '@/lib/calcMeta';
import { JsonLd } from '@/components/seo/JsonLd';
import ThreeDCalculatorClient from '@/components/calculators/ThreeDCalculatorClient';
import Link from 'next/link';

export const metadata = calcMeta({
  title: '3D Graph Calculator | 3D Plot Calculator Online',
  description: 'Use our free 3D graph calculator to plot functions and visualize 3D graphs online. Graph equations like z=sin(x,y), paraboloids, spheres, and more with our fast 3D plotting tool.',
  slug: 'engineering/3d',
  keywords: ['3d graph calculator', 'graph 3d calculator', '3d graphing calculator', '3d plot calculator', '3d plot online', '3d calculator', '3d calculator graphing', 'graphing calculator 3d', 'online 3d graphing', 'plotter 3d online'],
});

export default function ThreeDPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering' },
          { name: '3D Graph Calculator', item: 'https://nepacalc.com/engineering/3d' }
        ]}
      />
      <JsonLd type="calculator" name="3D Graph Calculator" description="Use our free 3D graph calculator to plot functions and visualize 3D graphs online. Graph equations like z=sin(x,y), paraboloids, spheres, and more." url="https://nepacalc.com/engineering/3d" category="EducationalApplication" />
      <ThreeDCalculatorClient />

      {/* SEO Rich Content ,  Server Rendered */}
      <section className="max-w-[1280px] mx-auto px-4 pb-16">
        <div className="bg-white border border-[#DADCE0] rounded-xl p-8 lg:p-12 shadow-sm mt-8">
          <article className="prose prose-slate max-w-none">
            <h1 className="text-3xl lg:text-4xl font-black text-[#202124] mb-8">3D Graph Calculator: Plot Any Function in Three Dimensions</h1>

            <p className="text-lg leading-relaxed text-[#5F6368] mb-12">
              A <strong>3D graph calculator</strong> is an interactive mathematical tool that lets you visualize equations as three-dimensional surfaces in real time. Unlike a standard 2D calculator that plots lines on a flat plane, a <strong>3D graphing calculator online</strong> adds a third axis. This allows you to explore the shape, curvature, and behavior of functions across X, Y, and Z simultaneously. Whether you are a student learning multivariable calculus, an engineer modeling surfaces, or a researcher visualizing data, this <strong>3D plot calculator</strong> gives you the visual clarity that flat equations cannot.
            </p>

            <div className="space-y-8">
              <div className="p-6 bg-[#E8F0FE] rounded-lg border border-[#D2E3FC]">
                <h4 className="text-sm font-black text-[#1967D2] uppercase tracking-wider mb-2">What is a 3D Graph Calculator?</h4>
                <p className="text-sm text-[#5F6368] leading-relaxed mb-4">
                  A <strong>3D calculator graphing</strong> tool takes a mathematical function of two variables such as <code>z = f(x, y)</code> and renders it as a colored, rotatable surface in 3D space. The result is a live, interactive model. You can spin it, zoom in, change the color scheme, and even overlay multiple functions to compare their geometry side by side. This is exactly how professional software like MATLAB, Wolfram Mathematica, and Desmos 3D work, now available free and in your browser.
                </p>
                <div className="flex gap-4">
                  <Link href="/engineering/geometry/" className="text-xs font-bold text-[#1A73E8] hover:underline">Geometry Calculator</Link>
                  <Link href="/calculator/linear-solver/" className="text-xs font-bold text-[#1A73E8] hover:underline">Linear Equation Solver</Link>
                </div>
              </div>

              <div className="bg-[#F8F9FA] p-6 rounded-lg border border-[#DADCE0]">
                <h3 className="text-lg font-bold text-[#202124] mb-4">How to Use the 3D Plot Calculator Online (Step-by-Step)</h3>
                <p className="text-sm text-[#5F6368] mb-4">Using our <strong>online 3D graphing</strong> tool is straightforward. Here is the process:</p>
                <ol className="space-y-4 list-decimal pl-5 text-sm text-[#5F6368]">
                  <li>
                    <strong className="text-[#202124]">Enter Your Equation:</strong> Type your function in the input field. For explicit functions, use the format <code>z = sin(x) * cos(y)</code>. For implicit surfaces, type the full equation like <code>x^2 + y^2 + z^2 = 16</code>.
                  </li>
                  <li>
                    <strong className="text-[#202124]">Use Preset Formulas:</strong> Click any preset in the &quot;Function Presets&quot; panel (Wave, Gaussian, Sphere, Torus) to instantly load a standard mathematical surface and see it rendered live.
                  </li>
                  <li>
                    <strong className="text-[#202124]">Rotate & Explore:</strong> Click and drag the 3D plot to rotate it. Use the scroll wheel or the zoom buttons to focus on any region. Switch between Perspective and Orthographic projection for different analytical views.
                  </li>
                  <li>
                    <strong className="text-[#202124]">Add Multiple Functions:</strong> Use the <strong>+</strong> button to add a second or third function on the same 3D plot. This lets you visualize intersections, compare shapes, and study how surfaces relate to each other in 3D space.
                  </li>
                </ol>
              </div>

              <div className="space-y-4 mt-12">
                <h3 className="text-sm font-black uppercase text-[#202124] tracking-widest border-l-4 border-blue-600 pl-3">Standard 3D Graphing Formulas Reference</h3>
                <p className="text-sm text-[#5F6368] mb-4">The following are the most important equations used in our <strong>3D graph calculator</strong> and why they matter across academic disciplines:</p>
                <div className="overflow-x-auto border border-[#DADCE0] rounded-md">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                      <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Equation</th>
                        <th className="px-4 py-3">Field of Use</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Wave (Ripples)</td><td className="px-4 py-3 text-blue-600 font-bold font-mono">z = sin(sqrt(x²+y²))</td><td className="px-4 py-3">Multivariable Calculus, Physics</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Saddle Surface</td><td className="px-4 py-3 text-blue-600 font-bold font-mono">z = (x²−y²)/4</td><td className="px-4 py-3">Structural Engineering, Optimization</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Sombrero / Sinc</td><td className="px-4 py-3 text-blue-600 font-bold font-mono">z = sin(r)/r</td><td className="px-4 py-3">Signal Processing, Digital Filtering</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Gaussian Bell</td><td className="px-4 py-3 text-blue-600 font-bold font-mono">z = exp(−(x²+y²)/10)</td><td className="px-4 py-3">Statistics, Probability Theory</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Sphere</td><td className="px-4 py-3 text-emerald-600 font-bold font-mono">x²+y²+z²=16</td><td className="px-4 py-3">Geometry, Orbital Mechanics</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Ellipsoid</td><td className="px-4 py-3 text-emerald-600 font-bold font-mono">x²/16+y²/9+z²/4=1</td><td className="px-4 py-3">Aerospace, Medical Imaging</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Torus</td><td className="px-4 py-3 text-emerald-600 font-bold font-mono">(6−√(x²+y²))²+z²=4</td><td className="px-4 py-3">Topology, Plasma Physics</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Paraboloid</td><td className="px-4 py-3 text-emerald-600 font-bold font-mono">z = (x²+y²)/4</td><td className="px-4 py-3">Optics, Antenna Design</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Monkey Saddle</td><td className="px-4 py-3 text-red-600 font-bold font-mono">z = (x³−3xy²)/4</td><td className="px-4 py-3">Advanced Calculus, Topology</td></tr>
                      <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Cone</td><td className="px-4 py-3 text-red-600 font-bold font-mono">z = √(x²+y²)</td><td className="px-4 py-3">Optics, Engineering Geometry</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 pt-8">
                <div>
                  <h3 className="text-xl font-black text-[#202124] mb-4">3D Graphing Calculator vs 2D: Key Differences</h3>
                  <p className="text-sm text-[#5F6368] mb-4">
                    Most students start their graphing journey with 2D tools by plotting <code>y = f(x)</code> on a flat coordinate plane. A <strong>graphing calculator 3D</strong> extends this into a full three-dimensional coordinate system (x, y, z). Instead of a line, you get a surface. This transition is critical in courses like:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-[#5F6368]">
                    <li><strong>Multivariable Calculus:</strong> Partial derivatives, gradients, and surface integrals.</li>
                    <li><strong>Linear Algebra:</strong> Planes defined by equations like <code>ax + by + cz = d</code>.</li>
                    <li><strong>Physics:</strong> Electromagnetic field potentials and wave interference patterns.</li>
                    <li><strong>Data Science & Statistics:</strong> The bivariate normal distribution (a 3D bell curve).</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#202124] mb-4">Implicit vs Explicit 3D Surfaces</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-[#DADCE0] rounded-lg">
                      <h4 className="font-bold text-[#1967D2] mb-2 text-sm">Explicit Functions: z = f(x, y)</h4>
                      <p className="text-xs text-[#5F6368]">These are the most common. For every (x, y) pair, there is exactly one z value. Examples: <code>z = sin(x)*cos(y)</code>. Our <strong>3D plot calculator</strong> renders these as continuous colored mesh surfaces.</p>
                    </div>
                    <div className="p-4 border border-[#DADCE0] rounded-lg">
                      <h4 className="font-bold text-[#202124] mb-2 text-sm">Implicit Surfaces: f(x, y, z) = 0</h4>
                      <p className="text-xs text-[#5F6368]">These define surfaces where the equation holds true, like a sphere: <code>x²+y²+z²=16</code>. Not all (x, y) pairs have a z value. Our engine uses the Marching Cubes algorithm to render these accurately.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-[#F1F3F4]">
                <h3 className="text-xl font-black text-[#202124] mb-6">Engineering Applications of 3D Graphing</h3>
                <p className="text-sm text-[#5F6368] mb-6">Professional engineers and researchers use <strong>plotter 3D online</strong> tools daily for practical design work. Here are the most important real-world applications:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 bg-[#F8F9FA] rounded-xl border border-[#DADCE0]">
                    <h4 className="font-bold text-[#202124] mb-2 text-sm">Structural Engineering</h4>
                    <p className="text-xs text-[#5F6368]">Saddle surfaces (hyperbolic paraboloids) are used in roof designs because they carry load efficiently in both tension and compression.</p>
                  </div>
                  <div className="p-5 bg-[#F8F9FA] rounded-xl border border-[#DADCE0]">
                    <h4 className="font-bold text-[#202124] mb-2 text-sm">Signal Processing</h4>
                    <p className="text-xs text-[#5F6368]">The 3D sinc function <code>sin(r)/r</code> is the foundation of digital filter design. Visualizing it in 3D helps engineers understand frequency response.</p>
                  </div>
                  <div className="p-5 bg-[#F8F9FA] rounded-xl border border-[#DADCE0]">
                    <h4 className="font-bold text-[#202124] mb-2 text-sm">Machine Learning</h4>
                    <p className="text-xs text-[#5F6368]">Loss functions in neural networks are complex 3D surfaces with saddle points. Gradient descent is literally moving downhill on these surfaces.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-[#F1F3F4]">
                <h3 className="text-xl font-black text-[#202124] mb-6">Frequently Asked Questions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { q: 'Is this 3D graphing calculator free?', a: 'Yes. NepaCalc\'s 3D graph calculator is completely free with no signup, no watermarks, and no limits on the number of functions you can plot.' },
                    { q: 'Can I plot multiple functions at once?', a: 'Yes. Click the + button to add more equations. Each function gets a different color and they all render on the same 3D canvas so you can compare them.' },
                    { q: 'What is the difference between a 3D graph and a contour plot?', a: 'A 3D graph shows the full surface in 3D space. A contour plot (2D) shows horizontal slices of that surface, similar to a topographic map. Both represent the same data differently.' },
                    { q: 'Can I graph parametric or polar equations in 3D?', a: 'Currently, our engine supports explicit z = f(x,y) and implicit f(x,y,z) = 0 equations. Parametric 3D curves are on our development roadmap.' },
                    { q: 'How do I rotate the 3D graph?', a: 'Click and drag anywhere on the graph viewport to orbit around the surface. Use scroll wheel to zoom. The reset button restores the default camera angle.' },
                    { q: 'What browsers support the 3D calculator?', a: 'Any modern browser (Chrome, Firefox, Safari, Edge) supports WebGL, which powers the 3D rendering. Mobile browsers are also fully supported.' },
                  ].map((faq, i) => (
                    <div key={i} className="space-y-2">
                      <h4 className="text-sm font-bold text-[#202124]">{faq.q}</h4>
                      <p className="text-sm text-[#5F6368] leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </article>
        </div>
      </section>
    </>
  );
}
