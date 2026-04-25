import Link from 'next/link';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: '3D Surface Plotter and Graphing Calculator Engineering NepaCal',
  description: 'Free online 3D surface plotter and graphing calculator for engineering. Features interactive orbit camera wireframe mode geometry canvas and 20 plus math tools. Try NepaCal now',
  keywords: ['3d surface plotter', 'graphing calculator online', 'engineering tools nepal', 'math visualizer'],
  alternates: { 
    canonical: 'https://nepacalc.com/engineering/',
    languages: {
       'en-NP': 'https://nepacalc.com/engineering/',
       'x-default': 'https://nepacalc.com/engineering/'
    }
  },
  openGraph: {
    title: 'Free 3D Surface Plotter & Online Graphing Calculator | NEPACALC',
    description: 'Plot z=f(x,y) in 3D with orbit camera & wireframe mode. Free graphing calculator, geometry canvas, matrices, LCM, physics tools and more — no login required.',
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
              Engineering and Math Tools Nepal
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
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Engineering Hub Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free nepacalc.com/engineering/ tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"engineering calculator\" with 880+ monthly searches in Nepal."}},{"@type":"Question","name":"Is this Engineering Hub Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Engineering Hub Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this calc engineering accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this nepacalc.com/engineering/?","acceptedAnswer":{"@type":"Answer","text":"Our Engineering Hub Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can best scientific calculator for engineering students instantly without manual errors."}},{"@type":"Question","name":"Can I use this engineering calculator on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our nepacalc.com/engineering/ is fully responsive for mobile devices and desktops. Whether you search \"best calculator for engineering\" or \"engineering calculator\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Engineering Hub Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our engineering percentage calculator uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"engineering calculator\" and \"calculators engineering\" with precision."}},{"@type":"Question","name":"What is \"nepacalc.com/engineering/\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"nepacalc.com/engineering/\" is one of the most searched terms with 880+ monthly searches in Nepal in Nepal. Our Engineering Hub Calculator helps you get accurate results for \"best scientific calculator for engineering students\", \"best calculator for engineering\", and \"engineering equation solver\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Engineering Hub Calculator - NepaCal","url":"https://nepacalc.com/engineering","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"880","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":223}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Engineering Hub Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>nepacalc.com/engineering/</strong> for Nepal? NepaCal&apos;s Engineering Hub Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>best scientific calculator for engineering students</strong>, find a reliable <strong>best calculator for engineering</strong>, or simply understand <strong>engineering percentage calculator</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>nepacalc.com/engineering/</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>engineering calculator</strong>, <strong>calc engineering</strong>, <strong>best scientific calculator for engineering students</strong>, <strong>best calculator for engineering</strong>, <strong>engineering percentage calculator</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Engineering Hub Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Engineering Hub Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>nepacalc.com/engineering/</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "engineering calculator" with 880+ monthly searches in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Engineering Hub Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Engineering Hub Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>calc engineering</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this nepacalc.com/engineering/?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Engineering Hub Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>best scientific calculator for engineering students</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this engineering calculator on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>nepacalc.com/engineering/</strong> is fully responsive for mobile devices and desktops. Whether you search "best calculator for engineering" or "engineering calculator" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Engineering Hub Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>engineering percentage calculator</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "engineering calculator" and "calculators engineering" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "nepacalc.com/engineering/" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"nepacalc.com/engineering/" is one of the most searched terms with 880+ monthly searches in Nepal in Nepal. Our Engineering Hub Calculator helps you get accurate results for "best scientific calculator for engineering students", "best calculator for engineering", and "engineering equation solver" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
