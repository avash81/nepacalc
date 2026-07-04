const fs = require('fs');

const newPageContent = `import { calcMeta } from '@/lib/calcMeta';
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

      <ThreeDCalculatorClient />

      <section className="max-w-[1280px] mx-auto px-4 pb-16">
        <div className="bg-white border border-[#DADCE0] rounded-xl p-8 lg:p-12 shadow-sm mt-8">
          <article className="prose prose-slate max-w-none">
            {/* E-E-A-T Signals */}
            <div className="text-xs md:text-sm text-slate-500 flex flex-wrap gap-x-6 gap-y-2 border-b border-slate-100 pb-6 mb-8">
              <span><strong>Last Updated:</strong> June 2026</span>
              <span><strong>Version:</strong> 4.0.0</span>
              <span><strong>Verified:</strong> Powered by Math.js & WebGL</span>
              <span><strong>Maintained by:</strong> NepaCalc Laboratory</span>
              <span><strong>Compatibility:</strong> Chrome, Firefox, Safari, Edge (Desktop & Mobile)</span>
            </div>
            
            {/* Core content chunks will be injected here starting in Part 2 */}
            
          </article>
        </div>
      </section>
    </>
  );
}
`;

fs.writeFileSync('src/app/engineering/3d/page.tsx', newPageContent);
console.log('Part 1 successfully executed.');
