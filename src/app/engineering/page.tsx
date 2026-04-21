import Link from 'next/link';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Engineering Math Suite — 3D Surface Plotter & Graphing | NEPACALC',
  description:
    'Advanced engineering math suite featuring an interactive 3D Surface Plotter with Orbit Camera, Wireframe View, and real-time Graphing Calculator. A professional alternative to CalcPlot3D for Nepal.',
  keywords: [
    'engineering calculator', '3D surface plotter', 'orbit camera graph',
    '3D wireframe mesh', 'graphing calculator', '3D plotter nepal',
    'math formulas', 'geometry tool', 'math tools',
  ],
  alternates: { 
    canonical: 'https://nepacalc.com/engineering',
    languages: {
       'en-NP': 'https://nepacalc.com/engineering',
       'x-default': 'https://nepacalc.com/engineering'
    }
  },
  openGraph: {
    title: '3D Surface Plotter & Engineering Suite | NEPACALC',
    description: 'Interactive 3D visualization with orbit camera, wireframe mesh, and 80+ math tools.',
    url: 'https://nepacalc.com/engineering',
  },
};

const TOOLS = [
  {
    title: 'Graphing Calculator',
    desc: 'Plot high-precision 2D functions with real-time rendering and Pratt-parsing support.',
    href: '/engineering/graphing',
    icon: '📈',
    color: '#4361ee',
    status: 'live',
  },
  {
    title: '3D Surface Plotter',
    desc: 'Plot complex z = f(x,y) surfaces with interactive Orbit Camera, Wireframe Mode, and WebGL rendering.',
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
        <section className="pt-20 pb-8 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-2 flex items-center gap-3">
              <span className="text-3xl">🧮</span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#4361ee]">Engineering Suite</span>
            </div>
            <h1 className="text-[18px] sm:text-[24px] font-black text-[#202124] tracking-tight leading-tight mb-2">
              Engineering & Math Tools
            </h1>
            <p className="text-[13px] text-[#5f6368] max-w-2xl leading-relaxed">
              Professional-grade graphing, 3D visualization, interactive geometry, and a comprehensive formula library.
              Plus 20+ existing math & science calculators — all free, all instant.
            </p>
          </div>
        </section>

        {/* Main tools grid */}
        <section className="max-w-6xl mx-auto px-6 pt-6 pb-16">
          <h2 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#4361ee] mb-8 border-b-2 border-slate-100 pb-2">
            Advanced Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOOLS.map(tool => (
              <div
                key={tool.title}
                className="group relative rounded-xl border border-slate-200 p-3 hover:border-transparent hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Gradient accent */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${tool.color}08, ${tool.color}15)` }} />

                <div className="relative z-10">
                  <div className="text-xl mb-2">{tool.icon}</div>
                  <h3 className="text-[13px] font-bold text-[#202124] mb-1">{tool.title}</h3>
                  <p className="text-[11px] text-[#5f6368] leading-relaxed mb-2">{tool.desc}</p>

                  {tool.status === 'coming' ? (
                    <span className="inline-block px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-50 text-amber-600 border border-amber-200">
                      Coming Soon
                    </span>
                  ) : (
                    <Link
                      href={tool.href}
                      className="inline-block px-3 py-1 rounded-full text-[10px] font-bold text-white transition-all hover:opacity-90"
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
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {EXISTING.map(calc => (
              <Link
                key={calc.name}
                href={calc.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:border-[#4361ee] hover:bg-[#4361ee08] transition-all group min-h-[56px]"
              >
                <span className="text-lg flex-shrink-0">{calc.icon}</span>
                <span className="text-[12px] sm:text-[13px] font-medium text-[#202124] group-hover:text-[#4361ee] transition-colors leading-tight">
                  {calc.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO text */}
        <section className="border-t border-slate-200 py-16 bg-slate-50/50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-[16px] font-black text-[#202124] mb-6 uppercase tracking-tight">
               Online 3D Surface Plotter & Mathematical Visualizer
            </h2>
            <p className="text-[13px] text-[#5f6368] leading-relaxed">
              The NEPACALC Engineering Suite provides an advanced **Online 3D Surface Plotter** comparable to industry standards like CalcPlot3D and Math3d.org. Our engine features a high-performance **interactive Orbit Camera** (drag to rotate, scroll to zoom) and a specialized **Wireframe Mesh view** to visualize complex multivariable functions z = f(x, y). 
              Built with hardware-accelerated WebGL rendering, the plotter supports real-time transparency, specific bound controls for X, Y, and Z axes, and dynamic grid density adjustments. 
              
              Beyond 3D plotting, the suite includes a 2D graphing calculator with Pratt-style expression parsing, an interactive geometry canvas for constructions, and a comprehensive math formula library covering calculus, physics, and statistics. NEPACALC is a legitimate, recognized platform for high-end mathematical visualization in Nepal, meticulously engineered for accuracy and speed without requiring any login or software installation.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
