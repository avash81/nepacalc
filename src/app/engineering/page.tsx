import Link from 'next/link';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Engineering & Math Tools — Graphing, 3D Visualizer, Geometry, Formulas | NEPACALC',
  description:
    'Advanced engineering math suite: graphing calculator, 3D surface plotter, interactive geometry, scientific calculator, formula reference, matrices, statistics, and more. Free, no login.',
  keywords: [
    'engineering calculator', 'graphing calculator', '3D graph',
    'math formulas', 'geometry tool', 'matrix calculator',
    'statistics calculator', 'quadratic solver', 'scientific calculator',
  ],
  openGraph: {
    title: 'Engineering Math Suite | NEPACALC',
    description: 'Advanced graphing, 3D visualization, geometry, and 80+ math tools.',
    url: 'https://nepacalc.com/engineering',
  },
};

const TOOLS = [
  {
    title: 'Graphing Calculator',
    desc: 'Plot functions, explore equations, add multiple expressions with colors and sliders.',
    href: '/engineering/graphing',
    icon: '📈',
    color: '#4361ee',
    status: 'live',
  },
  {
    title: '3D Visualizer',
    desc: 'Plot 3D surfaces z = f(x,y) with orbit camera, wireframe, and solid rendering.',
    href: '/engineering/3d',
    icon: '🧊',
    color: '#7209b7',
    status: 'live',
  },
  {
    title: 'Geometry Canvas',
    desc: 'Interactive constructions — points, lines, circles, polygons with measurements.',
    href: '/engineering/geometry',
    icon: '📐',
    color: '#f72585',
    status: 'live',
  },
  {
    title: 'Math Formula Reference',
    desc: 'Every formula from school to engineering level — algebra, calculus, physics, statistics.',
    href: '/engineering/formulas',
    icon: '📖',
    color: '#4cc9f0',
    status: 'live',
  },
];

const EXISTING = [
  { name: 'Scientific Calculator', href: '/calculator/scientific-calculator', icon: '🔬' },
  { name: 'Quadratic Solver', href: '/calculator/quadratic-solver', icon: '📊' },
  { name: 'Linear Equation Solver', href: '/calculator/linear-solver', icon: '📏' },
  { name: 'Matrix Calculator', href: '/calculator/matrices', icon: '🔢' },
  { name: 'Logarithm Calculator', href: '/calculator/logarithm-calculator', icon: '📐' },
  { name: 'Fraction Calculator', href: '/calculator/fraction-calculator', icon: '½' },
  { name: '3D Geometry', href: '/calculator/geometry-3d', icon: '🔺' },
  { name: 'Statistics Plus', href: '/calculator/statistics-plus', icon: '📈' },
  { name: 'Standard Deviation', href: '/calculator/standard-deviation', icon: 'σ' },
  { name: 'Probability', href: '/calculator/probability', icon: '🎲' },
  { name: 'Z-Score Calculator', href: '/calculator/z-score', icon: 'Z' },
  { name: 'Physics: Force', href: '/calculator/physics-force', icon: '⚡' },
  { name: 'Physics: Energy', href: '/calculator/physics-energy', icon: '🔋' },
  { name: 'Chemistry: Molar Mass', href: '/calculator/chemistry-molar', icon: '⚗️' },
  { name: 'Base Converter', href: '/calculator/base-converter', icon: '🔄' },
  { name: 'Ratio & Proportion', href: '/calculator/ratio-proportion', icon: '⚖️' },
  { name: 'Percentage Calculator', href: '/calculator/percentage', icon: '%' },
  { name: 'LCM & GCF', href: '/calculator/lcm-gcf-calculator', icon: '🔗' },
  { name: 'Roman Numerals', href: '/calculator/roman-numerals', icon: 'Ⅳ' },
  { name: 'Number to Words', href: '/calculator/number-to-words', icon: '🔤' },
];

export default function EngineeringPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering' }
        ]}
      />
      <JsonLd
        type="calculator"
        name="NEPACALC Engineering Math Suite"
        description="Advanced engineering math tools: graphing calculator, 3D visualizer, geometry canvas, formula reference, and 20+ existing math calculators."
        url="https://nepacalc.com/engineering"
        category="EducationalApplication"
      />

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="pt-20 pb-16 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-3xl">🧮</span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#4361ee]">Engineering Suite</span>
            </div>
            <h1 className="text-[36px] sm:text-[48px] font-black text-[#202124] tracking-tight leading-tight mb-4">
              Engineering & Math Tools
            </h1>
            <p className="text-[16px] text-[#5f6368] max-w-2xl leading-relaxed">
              Professional-grade graphing, 3D visualization, interactive geometry, and a comprehensive formula library.
              Plus 20+ existing math & science calculators — all free, all instant.
            </p>
          </div>
        </section>

        {/* Main tools grid */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#4361ee] mb-8 border-b-2 border-slate-100 pb-2">
            Advanced Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOOLS.map(tool => (
              <div
                key={tool.title}
                className="group relative rounded-2xl border border-slate-200 p-6 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient accent */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${tool.color}08, ${tool.color}15)` }} />

                <div className="relative z-10">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-[18px] font-bold text-[#202124] mb-2">{tool.title}</h3>
                  <p className="text-[13px] text-[#5f6368] leading-relaxed mb-4">{tool.desc}</p>

                  {tool.status === 'coming' ? (
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 border border-amber-200">
                      Coming Soon
                    </span>
                  ) : (
                    <Link
                      href={tool.href}
                      className="inline-block px-4 py-2 rounded-full text-[12px] font-bold text-white transition-all hover:opacity-90"
                      style={{ background: tool.color }}
                    >
                      Open Tool →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Existing calculators */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#4361ee] mb-8 border-b-2 border-slate-100 pb-2">
            Math & Science Calculators
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {EXISTING.map(calc => (
              <Link
                key={calc.name}
                href={calc.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-[#4361ee] hover:bg-[#4361ee08] transition-all group"
              >
                <span className="text-lg flex-shrink-0">{calc.icon}</span>
                <span className="text-[13px] font-medium text-[#202124] group-hover:text-[#4361ee] transition-colors truncate">
                  {calc.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO text */}
        <section className="border-t border-slate-200 py-12">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-[16px] font-black text-[#202124] mb-3">
              NEPACALC Engineering Math Laboratory
            </h2>
            <p className="text-[13px] text-[#5f6368] leading-relaxed">
              The NEPACALC Engineering Suite provides advanced mathematical tools comparable to GeoGebra and Desmos — entirely free and browser-based. Our graphing calculator uses an HTML5 Canvas rendering engine with Pratt-style expression parsing, supporting real-time function plotting with infinite pan and zoom. The 3D visualizer uses WebGL for hardware-accelerated surface rendering of z = f(x, y) functions. The interactive geometry canvas supports compass-and-straightedge constructions with dynamic measurement display. Our math formula reference covers every formula from school-level arithmetic to engineering-level differential equations, Fourier transforms, and Laplace transforms — all beautifully rendered with KaTeX. Combined with our 20+ existing math and science calculators (matrices, statistics, probability, physics, chemistry), NEPACALC is the most comprehensive free math platform for Nepali students and engineers.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
