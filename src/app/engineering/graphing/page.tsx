import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import GraphingCalculatorClient from './GraphingCalculatorClient';

export const metadata: Metadata = {
  title: 'Free Online Graphing Calculator ,  Plot Functions | NepaCalc',
  description: 'Interactive graphing calculator: plot multiple functions simultaneously with custom colors, infinite pan & zoom, real-time rendering. Supports sin, cos, tan, log, polynomials, and more. Free, no login required.',
  keywords: ['graphing calculator', 'function plotter', 'graph functions online', 'desmos alternative', 'plot equations', 'math grapher'],
  openGraph: {
    title: 'Free Graphing Calculator | NepaCalc',
    description: 'Plot multiple functions with custom colors, pan, zoom, and real-time rendering.',
    url: 'https://NepaCalc.com/engineering/graphing/',
  },
};

export default function GraphingPage() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Free Online Graphing Calculator"
        description="Interactive graphing calculator: plot multiple functions simultaneously with custom colors, infinite pan & zoom. Supports sin, cos, tan, log, polynomials, and more."
        url="https://nepacalc.com/engineering/graphing/"
        category="EducationalApplication"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering/' },
          { name: 'Graphing Calculator', item: 'https://nepacalc.com/engineering/graphing/' }
        ]}
        faqs={[
          { question: "Can I plot multiple equations at once?", answer: "Yes, simply click the '+' button to add new expression layers. Each function can be toggled on/off or customized with distinct colors for easier comparison." },
          { question: "Does it support trigonometric functions?", answer: "Absolutely. Our engine supports all standard trigonometric, hyperbolic, and inverse functions (sin, cos, tan, asin, acos, atan, sinh, cosh, tanh) using high-precision floating point arithmetic." },
          { question: "How do I zoom or pan the graph?", answer: "Use your mouse wheel or pinch-to-zoom on mobile. You can also click and drag anywhere on the canvas to pan across the coordinate system infinitely." },
          { question: "Can I use this for university-level calculus?", answer: "Yes, the engine is designed to handle limits, derivatives, and complex polynomial expansions common in TU, KU, and PU engineering curricula in Nepal." },
          { question: "Is this a free alternative to Desmos?", answer: "Yes. NepaCalc's graphing calculator is a completely free, no-login-required alternative to Desmos and GeoGebra, optimized for students and engineers in Nepal." }
        ]}
      />
      <GraphingCalculatorClient />
    
      <section className="mt-12 bg-white rounded-lg p-8 sm:p-12 border border-slate-200 shadow-sm shadow-slate-200/40">
        <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Professional Graphing Intelligence</h2>
        <p className="text-slate-600 text-base leading-relaxed mb-6 font-medium">
          NepaCalc&apos;s High-Precision Graphing Engine is a professional-grade mathematical visualizer designed for students and engineers in Nepal. Unlike generic plotters, our engine utilizes a custom Pratt-parser to handle complex trigonometric, logarithmic, and polynomial functions with zero computational lag.
        </p>
        <p className="text-slate-600 text-base leading-relaxed mb-10">
          Visualize multiple functions simultaneously, customize color palettes for clarity, and explore mathematical relationships through an infinite Cartesian plane. Whether you&apos;re preparing for SEE exams or solving complex engineering variables, our tool provides the visual clarity needed for deep conceptual understanding.
        </p>
        
        <h3 className="text-xl font-bold text-slate-900 mb-6 border-t border-slate-100 pt-8">
          Graphing Engine FAQs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Can I plot multiple equations at once?</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Yes, simply click the &apos;+&apos; button to add new expression layers. Each function can be toggled on/off or customized with distinct colors for easier comparison.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Does it support trigonometric functions?</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Absolutely. Our engine supports all standard trigonometric, hyperbolic, and inverse functions (sin, cos, tan, etc.) using high-precision floating point arithmetic.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">How do I zoom or pan the graph?</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Use your mouse wheel or pinch-to-zoom on mobile. You can also click and drag anywhere on the canvas to pan across the coordinate system infinitely.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Can I use this for university-level calculus?</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Yes, the engine is designed to handle limits, derivatives, and complex polynomial expansions common in TU, KU, and PU engineering curricula.</p>
          </div>
        </div>
      </section>
    </>
  );
}

