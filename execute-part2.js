const fs = require('fs');

const pageContent = `import { calcMeta } from '@/lib/calcMeta';
import { JsonLd } from '@/components/seo/JsonLd';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const ThreeDCalculatorClient = dynamic(
  () => import('@/components/calculators/ThreeDCalculatorClient'),
  { 
    ssr: false, 
    loading: () => (
      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6 min-h-screen items-center justify-center bg-[#f8fafc]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">Loading 3D Engine...</p>
        </div>
      </div>
    )
  }
);

export const metadata = calcMeta({
  title: '3D Graph Calculator Free Online 3D Plotter and Surface Grapher',
  description: 'Use our free 3D Graph Calculator to plot equations visualize mathematical surfaces graph multivariable functions and explore interactive 3D graphs online.',
  slug: 'engineering/3d',
  keywords: [
    '3d graph calculator', '3d calculator', '3d graphing calculator', 'online 3d graph calculator', 
    'free 3d graph calculator', '3d plot calculator', '3d plotter', '3d grapher', 
    'online 3d grapher', '3d surface grapher', '3d equation grapher', '3d function plotter',
    'graph 3d functions', 'plot 3d graph', 'multivariable graph calculator', 'implicit surface calculator',
    'parametric surface calculator'
  ],
});

export default function ThreeDPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering/' },
          { name: '3D Graph Calculator', item: 'https://nepacalc.com/engineering/3d/' }
        ]}
      />
      <JsonLd 
        type="calculator" 
        name="3D Graph Calculator" 
        description="Free online 3D Graph Calculator. Plot multivariable functions, visualize mathematical surfaces, and graph parametric or implicit equations in 3D space." 
        url="https://nepacalc.com/engineering/3d/" 
        category="EducationalApplication" 
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "3D Graph Calculator",
              "url": "https://nepacalc.com/engineering/3d/",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires WebGL",
              "softwareVersion": "4.0.0",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": "Multiple equations, Opacity, Cross sections, Variable sliders, Presets, Wireframe, WebGL Shading, High-res Export",
              "isAccessibleForFree": true,
              "educationalUse": "Graphing"
            },
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "3D Graph Calculator – Free Online 3D Plotter & Surface Grapher",
              "url": "https://nepacalc.com/engineering/3d/",
              "description": "Use our free 3D Graph Calculator to plot equations, visualize mathematical surfaces, graph multivariable functions, and explore interactive 3D graphs online.",
              "publisher": {
                "@type": "Organization",
                "name": "NepaCalc",
                "url": "https://nepacalc.com"
              }
            }
          ])
        }}
      />

      <div className="max-w-[1280px] mx-auto px-4 pt-8 pb-4">
        <h1 className="text-3xl lg:text-4xl font-black text-[#202124] mb-4 text-center">3D Graph Calculator – Free Online 3D Plotter & Surface Grapher</h1>
        <p className="text-lg text-center leading-relaxed text-[#5F6368] max-w-4xl mx-auto">
          Plot mathematical equations, visualize 3D surfaces, and explore multivariable functions with NepaCalc's free <strong>3D Graph Calculator</strong>. Whether you're graphing explicit functions, implicit surfaces, engineering models, or calculus equations, this interactive <strong>3D graphing calculator</strong> lets you rotate, zoom, compare multiple equations, and analyze complex mathematical surfaces directly in your browser. Designed for students, engineers, educators, researchers, and professionals, it provides fast, accurate, browser-based 3D visualization without requiring software installation.
        </p>
      </div>

      <ThreeDCalculatorClient />

      <section className="max-w-[1280px] mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          
          {/* Left Column (Stats, Trust, Links) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* On This Page (Jump Links) */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#202124] mb-4">On This Page</h2>
              <ul className="space-y-2 text-sm text-[#1967D2] font-medium">
                <li><a href="#what-is-3d-calculator" className="hover:underline">What is a 3D Graph Calculator?</a></li>
                <li><a href="#how-to-use" className="hover:underline">How to Use It</a></li>
                <li><a href="#supported-graph-types" className="hover:underline">Supported Graph Types</a></li>
                <li><a href="#mathematical-formulas" className="hover:underline">Mathematical Formulas</a></li>
                <li><a href="#engineering-applications" className="hover:underline">Engineering Applications</a></li>
                <li><a href="#surface-library" className="hover:underline">Surface Library</a></li>
                <li><a href="#examples" className="hover:underline">Examples</a></li>
                <li><a href="#comparison" className="hover:underline">Comparison</a></li>
                <li><a href="#faqs" className="hover:underline">Frequently Asked Questions</a></li>
              </ul>
            </div>

            {/* Trust Box */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm text-sm">
              <h3 className="font-bold text-[#202124] mb-3 border-b pb-2">Trust & Details</h3>
              <div className="space-y-2 text-[#5F6368]">
                <p><strong className="text-[#202124]">Last Updated:</strong> 2026</p>
                <p><strong className="text-[#202124]">Version:</strong> 4.0</p>
                <p><strong className="text-[#202124]">Powered by:</strong> WebGL</p>
                <div>
                  <strong className="text-[#202124] block mb-1">Built for:</strong>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Engineering</li>
                    <li>Mathematics</li>
                    <li>Education</li>
                    <li>Research</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Quick Statistics */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm text-sm">
              <h3 className="font-bold text-[#202124] mb-3 border-b pb-2">Supports</h3>
              <ul className="space-y-2 text-[#5F6368]">
                <li className="flex items-center gap-2"><span className="text-green-600">✔</span> Explicit Functions</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✔</span> Implicit Equations</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✔</span> Multiple Surfaces</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✔</span> Real-Time Rendering</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✔</span> Cross Sections</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✔</span> Variable Controls</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✔</span> Browser-Based WebGL</li>
              </ul>
            </div>

            {/* Related Tools */}
            <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#202124] mb-4">Related Tools</h3>
              <ul className="space-y-2 text-sm text-[#1967D2] font-medium">
                <li><Link href="/scientific" className="hover:underline">Scientific Calculator</Link></li>
                <li><Link href="/algebra/matrix" className="hover:underline">Matrix Calculator</Link></li>
                <li><Link href="/algebra/linear-equation" className="hover:underline">Linear Equation Solver</Link></li>
                <li><Link href="/algebra/quadratic-equation" className="hover:underline">Quadratic Solver</Link></li>
                <li><Link href="/geometry" className="hover:underline">Geometry Calculator</Link></li>
              </ul>
            </div>

          </div>

          {/* Right Column (Quick Features & Main Content) */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-[#DADCE0] rounded-xl p-8 lg:p-12 shadow-sm">
              <h2 className="text-2xl lg:text-3xl font-black text-[#202124] mb-6">Why Use This 3D Graph Calculator?</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                {['Plot Explicit Functions', 'Plot Implicit Surfaces', 'Multiple Equations', 'Variable Sliders', 'Interactive Rotation', 'Cross Section Slicing', 'High Resolution Rendering', 'Engineering Presets', 'Mathematical Surface Library', 'Browser Based', 'Free to Use', 'Mobile Friendly'].map(feature => (
                  <div key={feature} className="flex items-center gap-2 text-sm md:text-base text-[#5F6368] font-medium p-3 bg-[#F8F9FA] rounded-lg border border-slate-100">
                    <span className="text-green-600 shrink-0">✓</span>
                    {feature}
                  </div>
                ))}
              </div>

              <article className="prose prose-slate max-w-none">
                {/* Main Content (Part 3) will go here */}
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
`;

fs.writeFileSync('src/app/engineering/3d/page.tsx', pageContent);
console.log('Part 2 successfully executed.');
