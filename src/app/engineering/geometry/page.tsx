import { calcMeta } from '@/lib/calcMeta';
import { JsonLd } from '@/components/seo/JsonLd';
import GeometryCanvasClient from './GeometryCanvasClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import Link from 'next/link';

export const metadata = calcMeta({
  title: 'Geometry Area Calculator LCM GCF Online',
  description: 'Free online geometry calculator for area, perimeter, LCM, and GCF. Calculate area of triangles, circles, rectangles and find LCM and GCF instantly. Best math tool for students.',
  keywords: ['area calculator', 'area formula calculator', 'online geometry tool', 'calculator for lcm and gcf', 'lcm gcf calculator', 'lcm and gcf calculator', 'perimeter calculator', 'geometry formula calculator'],
  slug: 'engineering/geometry'
});

export default function GeometryPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering/' },
          { name: 'Geometry Calculator', item: 'https://nepacalc.com/engineering/geometry/' }
        ]}
      />

      <CalcWrapper
        title="Geometry Calculator: Area, Perimeter, LCM & GCF"
        description="A professional-grade Euclidean construction engine. Draw, measure, and analyze geometric relationships with precision."
        crumbs={[{ label: 'Engineering', href: '/engineering/' }, { label: 'Geometry' }]}
      >
        <div className="py-4">
          <GeometryCanvasClient />

          {/* SEO Rich Content ,  Server Rendered */}
          <section className="bg-white border border-[#DADCE0] rounded-xl p-8 lg:p-12 shadow-sm mt-8">
            <article className="prose prose-slate max-w-none">
              <h2 className="text-3xl lg:text-4xl font-black text-[#202124] mb-8">Area Calculator & Geometry Formula Guide</h2>

              <p className="text-lg leading-relaxed text-[#5F6368] mb-12">
                An <strong>area calculator</strong> is one of the most used mathematical tools in school, college, and professional work. Whether you are calculating the floor space of a room in Nepal, working out the surface area of a construction plot, or solving LCM and GCF problems for a competitive exam, having a reliable <strong>area formula calculator</strong> and an <strong>online geometry tool</strong> saves time and eliminates errors. NepaCalc&apos;s Geometry Studio combines all these functions in a single, interactive workspace.
              </p>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase text-[#202124] tracking-widest border-l-4 border-blue-600 pl-3">Complete Area Formula Reference</h3>
                  <p className="text-sm text-[#5F6368] mb-4">The following table covers every major shape with its area formula. These are the same formulas used in the curriculum of Nepal&apos;s NEB (National Examinations Board) for Classes 9 through 12.</p>

                  <div className="overflow-x-auto border border-[#DADCE0] rounded-md">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                        <tr>
                          <th className="px-4 py-3">Shape</th>
                          <th className="px-4 py-3">Area Formula</th>
                          <th className="px-4 py-3">Variables</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Square</td><td className="px-4 py-3 text-blue-600 font-bold font-mono">A = s²</td><td className="px-4 py-3 text-[#5F6368]">s = side length</td></tr>
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Rectangle</td><td className="px-4 py-3 text-blue-600 font-bold font-mono">A = l × w</td><td className="px-4 py-3 text-[#5F6368]">l = length, w = width</td></tr>
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Triangle</td><td className="px-4 py-3 text-blue-600 font-bold font-mono">A = ½ × b × h</td><td className="px-4 py-3 text-[#5F6368]">b = base, h = height</td></tr>
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Circle</td><td className="px-4 py-3 text-blue-600 font-bold font-mono">A = π × r²</td><td className="px-4 py-3 text-[#5F6368]">r = radius</td></tr>
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Parallelogram</td><td className="px-4 py-3 text-blue-600 font-bold font-mono">A = b × h</td><td className="px-4 py-3 text-[#5F6368]">b = base, h = perpendicular height</td></tr>
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Trapezoid</td><td className="px-4 py-3 text-emerald-600 font-bold font-mono">A = ½(a + b) × h</td><td className="px-4 py-3 text-[#5F6368]">a, b = parallel sides, h = height</td></tr>
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Rhombus</td><td className="px-4 py-3 text-emerald-600 font-bold font-mono">A = ½ × d₁ × d₂</td><td className="px-4 py-3 text-[#5F6368]">d₁, d₂ = diagonals</td></tr>
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Ellipse</td><td className="px-4 py-3 text-emerald-600 font-bold font-mono">A = π × a × b</td><td className="px-4 py-3 text-[#5F6368]">a = semi-major, b = semi-minor axis</td></tr>
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Regular Hexagon</td><td className="px-4 py-3 text-red-600 font-bold font-mono">A = (3√3/2) × s²</td><td className="px-4 py-3 text-[#5F6368]">s = side length</td></tr>
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Triangle (Heron&apos;s)</td><td className="px-4 py-3 text-red-600 font-bold font-mono">A = √(s(s−a)(s−b)(s−c))</td><td className="px-4 py-3 text-[#5F6368]">s = semi-perimeter, a,b,c = sides</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 pt-8">
                  <div className="p-6 bg-[#E8F0FE] rounded-lg border border-[#D2E3FC]">
                    <h4 className="text-sm font-black text-[#1967D2] uppercase tracking-wider mb-2">LCM (Least Common Multiple)</h4>
                    <p className="text-sm text-[#5F6368] leading-relaxed">The <strong>LCM</strong> of two or more numbers is the smallest positive integer that is divisible by each of those numbers. It is used in adding fractions with different denominators, scheduling repeating events, and solving gear ratio problems.</p>
                    <div className="mt-4 p-3 bg-white rounded border font-mono text-sm text-blue-700">
                      LCM(a, b) = (a × b) / GCF(a, b)
                    </div>
                    <p className="text-xs text-[#5F6368] mt-2">Example: LCM(12, 18) = (12×18)/6 = 36</p>
                  </div>
                  <div className="bg-[#F8F9FA] p-6 rounded-lg border border-[#DADCE0]">
                    <h4 className="text-sm font-black text-[#202124] uppercase tracking-wider mb-2">GCF (Greatest Common Factor)</h4>
                    <p className="text-sm text-[#5F6368] leading-relaxed">The <strong>GCF</strong> (also called GCD for Greatest Common Divisor) is the largest number that divides all given numbers without a remainder. It is used in simplifying fractions, dividing items into equal groups, and in the Euclidean algorithm.</p>
                    <div className="mt-4 p-3 bg-white rounded border font-mono text-sm text-[#3C4043]">
                      GCF via Euclidean: GCF(a, b) = GCF(b, a mod b)
                    </div>
                    <p className="text-xs text-[#5F6368] mt-2">Example: GCF(12, 18) = GCF(18, 12) = GCF(12, 6) = 6</p>
                  </div>
                </div>

                <div className="space-y-4 mt-12">
                  <h3 className="text-sm font-black uppercase text-[#202124] tracking-widest border-l-4 border-emerald-600 pl-3">Methods to Calculate LCM and GCF</h3>
                  <p className="text-sm text-[#5F6368] mb-4">Our <strong>calculator for LCM and GCF</strong> uses the most efficient algorithm known as the Euclidean method. Here is how the major methods compare.</p>
                  <div className="overflow-x-auto border border-[#DADCE0] rounded-md">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                        <tr>
                          <th className="px-4 py-3">Method</th>
                          <th className="px-4 py-3">Best For</th>
                          <th className="px-4 py-3">Speed</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Listing Multiples</td><td className="px-4 py-3 text-[#5F6368]">Small numbers (below 50)</td><td className="px-4 py-3 text-orange-600 font-bold">Slow</td></tr>
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Prime Factorization</td><td className="px-4 py-3 text-[#5F6368]">Medium numbers, educational clarity</td><td className="px-4 py-3 text-yellow-600 font-bold">Medium</td></tr>
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Euclidean Algorithm</td><td className="px-4 py-3 text-[#5F6368]">Any size numbers, programming</td><td className="px-4 py-3 text-green-600 font-bold">Fast</td></tr>
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Division Method</td><td className="px-4 py-3 text-[#5F6368]">Multiple numbers at once</td><td className="px-4 py-3 text-blue-600 font-bold">Efficient</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-4 mt-12">
                  <h3 className="text-sm font-black uppercase text-[#202124] tracking-widest border-l-4 border-purple-600 pl-3">Perimeter Formulas for All Major Shapes</h3>
                  <div className="overflow-x-auto border border-[#DADCE0] rounded-md">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                        <tr>
                          <th className="px-4 py-3">Shape</th>
                          <th className="px-4 py-3">Perimeter Formula</th>
                          <th className="px-4 py-3">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Square</td><td className="px-4 py-3 text-blue-600 font-bold font-mono">P = 4s</td><td className="px-4 py-3 text-[#5F6368]">All sides equal</td></tr>
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Rectangle</td><td className="px-4 py-3 text-blue-600 font-bold font-mono">P = 2(l + w)</td><td className="px-4 py-3 text-[#5F6368]">Two pairs of equal sides</td></tr>
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Triangle</td><td className="px-4 py-3 text-blue-600 font-bold font-mono">P = a + b + c</td><td className="px-4 py-3 text-[#5F6368]">Sum of all three sides</td></tr>
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Circle</td><td className="px-4 py-3 text-blue-600 font-bold font-mono">C = 2πr</td><td className="px-4 py-3 text-[#5F6368]">Circumference, r = radius</td></tr>
                        <tr className="hover:bg-[#fcfcfc] transition-colors"><td className="px-4 py-3 font-medium">Regular Polygon</td><td className="px-4 py-3 text-blue-600 font-bold font-mono">P = n × s</td><td className="px-4 py-3 text-[#5F6368]">n = number of sides, s = side length</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-[#F1F3F4]">
                  <h3 className="text-xl font-black text-[#202124] mb-6">Real-World Uses of the Area Formula Calculator</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 bg-[#F8F9FA] rounded-xl border border-[#DADCE0]">
                      <h4 className="font-bold text-[#202124] mb-2 text-sm">Construction in Nepal</h4>
                      <p className="text-xs text-[#5F6368]">Contractors calculate floor area (in square feet) to estimate cost of tiles, cement, and flooring. A standard room of 12×14 ft has an area of 168 sq ft. Our tool computes this instantly.</p>
                    </div>
                    <div className="p-5 bg-[#F8F9FA] rounded-xl border border-[#DADCE0]">
                      <h4 className="font-bold text-[#202124] mb-2 text-sm">Agriculture & Land</h4>
                      <p className="text-xs text-[#5F6368]">Farmers use area calculations to estimate crop yield. A circular field with radius 50m has area = π×50² ≈ 7,854 m². Combined with our Land Converter, this gives acreage in local units too.</p>
                    </div>
                    <div className="p-5 bg-[#F8F9FA] rounded-xl border border-[#DADCE0]">
                      <h4 className="font-bold text-[#202124] mb-2 text-sm">SEE & NEB Exams</h4>
                      <p className="text-xs text-[#5F6368]">Area and perimeter problems are standard in Nepal&apos;s SEE math exam. LCM and GCF are tested heavily in Class 9 and 10. Our <strong>LCM GCF calculator</strong> is used by thousands of Nepali students daily.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-[#F1F3F4]">
                  <h3 className="text-xl font-black text-[#202124] mb-6">Frequently Asked Questions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { q: 'What is the LCM of 4 and 6?', a: 'LCM(4, 6) = 12. Using prime factorization: 4 = 2², 6 = 2×3. LCM = 2² × 3 = 12.' },
                      { q: 'What is the GCF of 24 and 36?', a: 'GCF(24, 36) = 12. Factors of 24: 1,2,3,4,6,8,12,24. Factors of 36: 1,2,3,4,6,9,12,18,36. Largest common = 12.' },
                      { q: 'How do I calculate the area of an irregular shape?', a: 'Use the Shoelace Formula: A = ½|Σ(xᵢ × yᵢ₊₁ − xᵢ₊₁ × yᵢ)|. Our geometry canvas calculates this automatically as you place points.' },
                      { q: 'What is the difference between area and perimeter?', a: 'Area measures the 2D space inside a shape (in square units). Perimeter measures the total boundary length around a shape (in linear units).' },
                      { q: 'Is LCM always larger than GCF?', a: 'Yes, for numbers greater than 1, LCM ≥ GCF. And LCM × GCF = product of the two numbers. For equal numbers a, LCM = GCF = a.' },
                      { q: 'Can I calculate area in Ropani or Bigha?', a: 'Yes! After finding the area in square feet, use our Nepal Land Converter to convert to Ropani, Aana, Bigha, or Kattha for real estate transactions.' },
                    ].map((faq, i) => (
                      <div key={i} className="p-5 border border-[#DADCE0] rounded-xl space-y-2">
                        <h4 className="font-bold text-[#202124] text-sm">{faq.q}</h4>
                        <p className="text-sm text-[#5F6368] leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 p-8 bg-[#202124] text-[#202124] rounded-2xl">
                  <h3 className="text-[#202124] text-xl font-bold mb-4">Related Math Tools</h3>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/engineering/3d/" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold text-[#202124] no-underline transition-all">3D Graph Calculator</Link>
                    <Link href="/calculator/ratio-proportion/" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold text-[#202124] no-underline transition-all">Ratio & Proportion</Link>
                    <Link href="/calculator/quadratic-solver/" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold text-[#202124] no-underline transition-all">Quadratic Solver</Link>
                    <Link href="/calculator/area-calculator/" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold text-[#202124] no-underline transition-all">Nepal Land Converter</Link>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </div>
      </CalcWrapper>
    </>
  );
}


