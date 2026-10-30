import { calcMeta } from '@/lib/calcMeta';
import { JsonLd } from '@/components/seo/JsonLd';
import GeometryCanvasClient from './GeometryCanvasClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import Link from 'next/link';

export const metadata = calcMeta({
  title: 'Interactive Geometry Calculator & Coordinate Canvas – NepaCalc',
  description: 'Draw, construct, and measure geometric shapes online. Calculate area, perimeter, angles, segment lengths, and coordinates with an interactive Euclidean canvas.',
  keywords: ['geometry calculator', 'interactive geometry canvas', 'area and perimeter calculator', 'coordinate geometry tool', 'polygon area calculator', 'euclidean construction online'],
  slug: 'engineering/geometry'
});

const GEOMETRY_FAQS = [
  {
    question: "How do I calculate the area of an irregular polygon on this canvas?",
    answer: "Place points at each vertex of your polygon in order around the perimeter. The canvas uses the Shoelace Formula (Gauss's area formula): A = ½ |Σ(xᵢyᵢ₊₁ − xᵢ₊₁yᵢ)| to compute the exact enclosed area in real time."
  },
  {
    question: "How is the distance between two points calculated?",
    answer: "Using the Euclidean distance formula derived from the Pythagorean theorem: d = √((x₂ − x₁)² + (y₂ − y₁)²). The canvas displays length measurements for every line segment."
  },
  {
    question: "What is the formula for the sum of interior angles in a polygon?",
    answer: "For any simple polygon with n sides, the sum of interior angles is (n − 2) × 180°. For a triangle (n=3) it is 180°, for a quadrilateral (n=4) it is 360°, and for a hexagon (n=6) it is 720°."
  },
  {
    question: "How does Heron's Formula work for triangles?",
    answer: "When you know all three side lengths (a, b, c) but not the height, calculate the semi-perimeter s = (a + b + c) / 2. Then Area = √(s(s − a)(s − b)(s − c)). This gives the exact area of any valid triangle."
  },
  {
    question: "Can I convert calculated area into Nepali units like Ropani or Bigha?",
    answer: "Yes. Once you find the area in square feet or square meters on the canvas, use our Nepal Land Calculator to convert directly to Ropani, Aana, Paisa, Daam (hills) or Bigha, Kattha, Dhur (terai)."
  },
];

export default function GeometryPage() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Interactive Geometry Calculator & Canvas"
        description="Draw, construct, and measure geometric shapes online. Calculate area, perimeter, angles, and segment lengths with an interactive Euclidean canvas."
        url="https://nepacalc.com/engineering/geometry/"
        category="EducationalApplication"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering/' },
          { name: 'Geometry Calculator', item: 'https://nepacalc.com/engineering/geometry/' }
        ]}
        faqs={GEOMETRY_FAQS}
      />

      <CalcWrapper
        title="Interactive Geometry Studio & Coordinate Canvas"
        description="Construct, measure, and analyze 2D geometric shapes, lines, angles, and polygons with real-time coordinate calculations."
        crumbs={[{ label: 'Engineering', href: '/engineering/' }, { label: 'Geometry' }]}
      >
        <div className="py-4">
          <GeometryCanvasClient />

          {/* Reference Content */}
          <div className="max-w-4xl mx-auto w-full py-12 space-y-8">

            {/* 2D Area & Perimeter Formulas */}
            <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
              <h2 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-500 pl-3 mb-6">
                2D Shape Formulas Reference
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-[#DADCE0] rounded-md overflow-hidden">
                  <thead className="bg-[#F8F9FA] text-[#70757A] uppercase font-bold">
                    <tr>
                      <th className="px-4 py-3">Shape</th>
                      <th className="px-4 py-3">Area Formula</th>
                      <th className="px-4 py-3">Perimeter Formula</th>
                      <th className="px-4 py-3">Variables</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DADCE0] text-[#3C4043]">
                    <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Square</td><td className="px-4 py-3 font-mono font-bold text-blue-600">A = s²</td><td className="px-4 py-3 font-mono">P = 4s</td><td className="px-4 py-3 text-[#5F6368]">s = side length</td></tr>
                    <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Rectangle</td><td className="px-4 py-3 font-mono font-bold text-blue-600">A = l × w</td><td className="px-4 py-3 font-mono">P = 2(l + w)</td><td className="px-4 py-3 text-[#5F6368]">l = length, w = width</td></tr>
                    <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Triangle</td><td className="px-4 py-3 font-mono font-bold text-blue-600">A = ½ × b × h</td><td className="px-4 py-3 font-mono">P = a + b + c</td><td className="px-4 py-3 text-[#5F6368]">b = base, h = height</td></tr>
                    <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Triangle (Heron&apos;s)</td><td className="px-4 py-3 font-mono font-bold text-blue-600">A = √(s(s−a)(s−b)(s−c))</td><td className="px-4 py-3 font-mono">s = (a+b+c)/2</td><td className="px-4 py-3 text-[#5F6368]">a, b, c = side lengths</td></tr>
                    <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Circle</td><td className="px-4 py-3 font-mono font-bold text-blue-600">A = π × r²</td><td className="px-4 py-3 font-mono">C = 2πr</td><td className="px-4 py-3 text-[#5F6368]">r = radius, π ≈ 3.14159</td></tr>
                    <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Parallelogram</td><td className="px-4 py-3 font-mono font-bold text-emerald-600">A = b × h</td><td className="px-4 py-3 font-mono">P = 2(a + b)</td><td className="px-4 py-3 text-[#5F6368]">b = base, h = perp. height</td></tr>
                    <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Trapezoid</td><td className="px-4 py-3 font-mono font-bold text-emerald-600">A = ½(a + b) × h</td><td className="px-4 py-3 font-mono">P = a + b + c + d</td><td className="px-4 py-3 text-[#5F6368]">a, b = parallel bases</td></tr>
                    <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Rhombus</td><td className="px-4 py-3 font-mono font-bold text-emerald-600">A = ½ × d₁ × d₂</td><td className="px-4 py-3 font-mono">P = 4s</td><td className="px-4 py-3 text-[#5F6368]">d₁, d₂ = diagonals, s = side</td></tr>
                    <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Ellipse</td><td className="px-4 py-3 font-mono font-bold text-purple-600">A = π × a × b</td><td className="px-4 py-3 font-mono">P ≈ π[3(a+b)−√((3a+b)(a+3b))]</td><td className="px-4 py-3 text-[#5F6368]">a, b = semi-axes</td></tr>
                    <tr className="hover:bg-[#fcfcfc]"><td className="px-4 py-3 font-medium">Regular Hexagon</td><td className="px-4 py-3 font-mono font-bold text-purple-600">A = (3√3 / 2) × s²</td><td className="px-4 py-3 font-mono">P = 6s</td><td className="px-4 py-3 text-[#5F6368]">s = side length</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Coordinate Geometry Formulas */}
            <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-emerald-500 pl-3 mb-6">
                Coordinate Geometry Essentials
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Distance Between Two Points',
                    formula: 'd = √((x₂ − x₁)² + (y₂ − y₁)²)',
                    desc: 'Finds the straight-line Euclidean distance between (x₁, y₁) and (x₂, y₂). Applied directly by the canvas ruler.'
                  },
                  {
                    title: 'Midpoint of a Segment',
                    formula: 'M = ((x₁ + x₂)/2, (y₁ + y₂)/2)',
                    desc: 'Coordinates of the exact center point between two endpoints on the Cartesian plane.'
                  },
                  {
                    title: 'Slope of a Line (Gradient)',
                    formula: 'm = (y₂ − y₁) / (x₂ − x₁)',
                    desc: 'Measures line steepness. Parallel lines have equal slopes; perpendicular lines have m₁ × m₂ = −1.'
                  },
                  {
                    title: 'Shoelace Formula (Polygon Area)',
                    formula: 'A = ½ |Σ(xᵢyᵢ₊₁ − xᵢ₊₁yᵢ)|',
                    desc: 'Calculates the area of any non-self-intersecting polygon directly from its ordered vertex coordinates.'
                  },
                ].map(({ title, formula, desc }) => (
                  <div key={title} className="p-5 bg-[#F8F9FA] rounded-xl border border-[#DADCE0] space-y-2">
                    <h4 className="font-bold text-[#202124] text-sm">{title}</h4>
                    <div className="p-2.5 bg-white border border-[#DADCE0] rounded font-mono text-xs text-blue-700 font-bold">
                      {formula}
                    </div>
                    <p className="text-xs text-[#5F6368] leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Practical Applications in Nepal */}
            <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-purple-500 pl-3 mb-6">
                Practical Geometry Applications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  {
                    title: 'Building & Plot Survey',
                    body: 'Irregular residential plots in Kathmandu or Pokhara rarely have right-angle corners. Breaking a polygon into triangles or using coordinate vertices gives exact ground area.'
                  },
                  {
                    title: 'Flooring & Tile Estimation',
                    body: 'Calculate the true floor area (length × width) and subtract cutouts for columns or stairs to order exact tile packs and avoid overspending.'
                  },
                  {
                    title: 'SEE & NEB Mathematics',
                    body: 'Verify Class 9 and 10 Euclidean geometry theorems, circle properties, and coordinate calculations directly on the interactive grid.'
                  },
                ].map(({ title, body }) => (
                  <div key={title} className="p-5 bg-[#F8F9FA] rounded-xl border border-[#DADCE0]">
                    <h4 className="font-bold text-[#202124] text-sm mb-2">{title}</h4>
                    <p className="text-xs text-[#5F6368] leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs */}
            <section className="bg-white border border-[#DADCE0] rounded-xl p-8 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] border-l-4 border-blue-500 pl-3 mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {GEOMETRY_FAQS.map((faq, i) => (
                  <div key={i} className="p-5 border border-[#DADCE0] rounded-xl space-y-2">
                    <h4 className="font-bold text-[#202124] text-sm">{faq.question}</h4>
                    <p className="text-sm text-[#5F6368] leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Related Tools */}
            <div className="p-6 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl">
              <h4 className="text-sm font-black text-[#202124] uppercase tracking-wider mb-3">Related Math & Engineering Tools</h4>
              <div className="flex flex-wrap gap-2">
                <Link href="/calculator/area-calculator/" className="px-3 py-1.5 bg-white border border-[#DADCE0] hover:border-blue-500 rounded text-xs font-bold text-[#202124] hover:text-blue-600 transition-all">Nepal Land Converter</Link>
                <Link href="/calculator/geometry-3d/" className="px-3 py-1.5 bg-white border border-[#DADCE0] hover:border-blue-500 rounded text-xs font-bold text-[#202124] hover:text-blue-600 transition-all">3D Surface & Volume</Link>
                <Link href="/math-tools/calculator/" className="px-3 py-1.5 bg-white border border-[#DADCE0] hover:border-blue-500 rounded text-xs font-bold text-[#202124] hover:text-blue-600 transition-all">Graphing Calculator</Link>
                <Link href="/calculator/concrete-mix/" className="px-3 py-1.5 bg-white border border-[#DADCE0] hover:border-blue-500 rounded text-xs font-bold text-[#202124] hover:text-blue-600 transition-all">Concrete Mix Calculator</Link>
              </div>
            </div>

          </div>
        </div>
      </CalcWrapper>
    </>
  );
}
