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
              Enter a function or equation to visualize its behavior on the coordinate plane. For equations that need algebraic solving before graphing, you can also use the <Link href="/calculator/linear-solver/" className="text-blue-600 hover:underline">Linear Equations Solver</Link>. The calculator's current input options include functions such as sin, cos, tan, log, ln, sqrt, and abs, along with standard mathematical operators and powers.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Compare Multiple Functions</h3>
            <p>
              Add multiple functions to the graph when you want to compare equations or study how different curves behave relative to each other. When comparing curves, plotting a quadratic equation alongside another function can help you understand its shape and intersections. For equations that need to be solved separately, see the <Link href="/calculator/quadratic-solver/" className="text-blue-600 hover:underline">Quadratic Solver</Link>.
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Zoom and Pan the Graph</h3>
            <p>
              Use zoom and pan controls to examine a function at different scales and focus on the part of the graph that matters to your calculation or study.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2">Supported Functions</h2>
            <p>
              The calculator is designed for common mathematical graphing tasks, including polynomial and trigonometric expressions and other supported functions available through the calculator input interface. Use the examples and input controls provided by the tool to check the syntax available for each expression. For broader mathematical calculations beyond graphing, the <Link href="/calculator/scientific-calculator/" className="text-blue-600 hover:underline">Scientific Calculator</Link> provides additional mathematical operations.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Trigonometric Functions</h3>
            <p>Includes sin, cos, tan, and other standard trigonometric functions.</p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Polynomial and Algebraic Functions</h3>
            <p>Includes simple variables, exponents, and polynomial expressions.</p>
            
            <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">Logarithmic and Exponential Functions</h3>
            <p>Includes log, ln, and exponential functions.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2">Graphing Calculator FAQs</h2>
            
            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Can I plot multiple functions?</h3>
            <p>Yes. The calculator supports multiple function layers so you can compare more than one expression on the same graph.</p>

            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Does it support trigonometric functions?</h3>
            <p>Yes. The current calculator supports functions including sin, cos, and tan.</p>

            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Can I zoom and pan the graph?</h3>
            <p>Yes. The interactive graph supports zooming and panning so you can examine different parts of the coordinate plane.</p>

            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Is the graphing calculator free?</h3>
            <p>Yes. NepaCalc provides the graphing calculator online for free.</p>

            <h3 className="text-lg font-bold text-slate-900 mt-6 mb-2">Do I need to download software?</h3>
            <p>No separate download is required. The calculator is provided through the NepaCalc website in the browser.</p>

            <p className="mt-6 mb-2">For three-dimensional mathematical visualization, try the <Link href="/engineering/3d/" className="text-blue-600 hover:underline">3D Surface Plotter</Link>.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 border-b border-slate-100 pb-2">Mathematical References</h2>
            <ul className="list-disc pl-6 mb-10 text-slate-600">
              <li><a href="https://openstax.org/books/contemporary-mathematics/pages/5-8-graphing-functions" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenStax: Graphing Functions</a></li>
              <li><a href="https://dlmf.nist.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NIST Digital Library of Mathematical Functions (DLMF)</a></li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-6 border-b border-slate-100 pb-2">Related Calculators</h2>
            
            {/* Custom compact card grid for related tools instead of H3s */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10 not-prose">
              <Link href="/engineering/3d/" className="flex items-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <span className="font-bold text-slate-700 group-hover:text-blue-700">3D Surface Plotter</span>
              </Link>
              <Link href="/calculator/quadratic-solver/" className="flex items-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <span className="font-bold text-slate-700 group-hover:text-blue-700">Quadratic Solver</span>
              </Link>
              <Link href="/calculator/linear-solver/" className="flex items-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <span className="font-bold text-slate-700 group-hover:text-blue-700">Linear Equations Solver</span>
              </Link>
              <Link href="/calculator/scientific-calculator/" className="flex items-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <span className="font-bold text-slate-700 group-hover:text-blue-700">Scientific Calculator</span>
              </Link>
              <Link href="/calculator/matrices/" className="flex items-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <span className="font-bold text-slate-700 group-hover:text-blue-700">Matrix Calculator</span>
              </Link>
              <Link href="/calculator/geometry-3d/" className="flex items-center p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                <span className="font-bold text-slate-700 group-hover:text-blue-700">3D Geometry</span>
              </Link>
            </div>

            <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100 mt-8 not-prose flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Related Guide</span>
                <span className="text-sm text-slate-600">Read the complete guide to graphing functions and equations.</span>
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
