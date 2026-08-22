import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import GraphingCalculatorClient from './GraphingCalculatorClient';
import Link from 'next/link';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';

export const metadata: Metadata = {
  title: 'Free Online Graphing Calculator – Plot Functions | NepaCalc',
  description: 'Free online graphing calculator for plotting functions and equations. Compare multiple functions, zoom and pan the graph, and explore supported mathematical functions directly in your browser.',
  alternates: {
    canonical: 'https://nepacalc.com/engineering/graphing/',
  },
  openGraph: {
    title: 'Free Online Graphing Calculator | NepaCalc',
    description: 'Plot multiple functions with custom colors, pan, zoom, and real-time rendering.',
    url: 'https://nepacalc.com/engineering/graphing/',
  },
};

export default function GraphingPage() {
  return (
    <CalcWrapper
      title="Graphing Calculator"
      description="Plot functions and equations online on an interactive coordinate plane."
      crumbs={[
        { label: 'Engineering', href: '/engineering/' },
        { label: 'Graphing Calculator' }
      ]}
    >
      <JsonLd
        type="unified"
        name="Free Online Graphing Calculator"
        description="Free online graphing calculator for plotting functions and equations. Compare multiple functions, zoom and pan the graph, and explore supported mathematical functions directly in your browser."
        url="https://nepacalc.com/engineering/graphing/"
        category="EducationalApplication"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering/' },
          { name: 'Graphing Calculator', item: 'https://nepacalc.com/engineering/graphing/' }
        ]}
        faqs={[
          { question: "Can I plot multiple functions?", answer: "Yes. The calculator supports multiple function layers so you can compare more than one expression on the same graph." },
          { question: "Does it support trigonometric functions?", answer: "Yes. The current calculator supports functions including sin, cos, and tan." },
          { question: "Can I zoom and pan the graph?", answer: "Yes. The interactive graph supports zooming and panning so you can examine different parts of the coordinate plane." },
          { question: "Is the graphing calculator free?", answer: "Yes. NepaCalc provides the graphing calculator online for free." },
          { question: "Do I need to download software?", answer: "No separate download is required. The calculator is provided through the NepaCalc website in the browser." }
        ]}
      />
      
      <div className="max-w-[1200px] mx-auto pb-12">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8">Free Online Graphing Calculator</h1>
        
        <GraphingCalculatorClient />
      
        <section className="mt-12 bg-white rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm">
          <div className="prose prose-slate max-w-none">
            <p className="lead text-lg text-slate-700 font-medium">
              Plot functions and equations online with NepaCalc's free graphing calculator. Enter a supported mathematical expression and visualize it on an interactive coordinate graph directly in your browser. You can compare multiple functions, zoom and pan the graph, and explore mathematical relationships visually without downloading a separate application.
            </p>
            <p>
              Learn more about <Link href="/engineering/graphing-calculator-guide/" className="text-blue-600 hover:underline">how to graph functions and equations online</Link>, including common function types, graphing examples, and how to interpret graphs.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-100 pb-2">How to Use the Graphing Calculator</h2>
            
            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Enter a Function or Equation</h3>
            <p>
              Enter a function or equation to visualize its behavior on the coordinate plane. For equations that need algebraic solving before graphing, you can also use the 
              
              <Link href="/calculator/matrices/" className="flex items-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <span className="font-bold text-slate-700 group-hover:text-blue-700">Matrix Calculator</span>
              </Link>
              <Link href="/calculator/geometry-3d/" className="flex items-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <span className="font-bold text-slate-700 group-hover:text-blue-700">3D Geometry</span>
              </Link>
            </div>

            
              <Link href="/engineering/graphing-calculator-guide/" className="shrink-0 px-5 py-2.5 bg-white border border-slate-200 text-blue-600 font-bold rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm text-center">
                Graphing Calculator Guide
              </Link>
            </div>
          </div>
        </section>
      </div>
    </CalcWrapper>
  );
}
