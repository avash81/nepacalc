import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import ThreeDCalculatorClient from './ThreeDCalculatorClient';

export const metadata: Metadata = {
  title: 'Free 3D Graphing Calculator — Plot 3D Surfaces Online | NEPACALC',
  description: '3D surface plotter: visualize z=f(x,y) functions with orbit camera, rotation, zoom, wireframe & solid rendering modes. Supports sin, cos, tan, log and more. Free, no login.',
  keywords: ['3d graphing calculator', '3d surface plotter', 'plot z=f(x,y)', '3d math visualizer', '3d function graph'],
  alternates: {
    canonical: '/engineering/3d',
  },
  openGraph: { title: 'Free 3D Calculator | NEPACALC', description: '3D surface plotter with orbit camera and wireframe rendering.', url: 'https://nepacalc.com/engineering/3d' },
};

export default function ThreeDPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering' },
          { name: '3D Calculator', item: 'https://nepacalc.com/engineering/3d' }
        ]}
      />
      <JsonLd type="calculator" name="NEPACALC 3D Calculator" description="3D surface plotter for z=f(x,y) functions with orbit camera rotation and zoom." url="https://nepacalc.com/engineering/3d" category="EducationalApplication" />
      <ThreeDCalculatorClient />
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How to use the Engineering Calculators Free Tools NepaCal tool?", "acceptedAnswer": { "@type": "Answer", "text": "Simply enter your data and our free engineering calculator tool will provide instant results tailored for Nepal." } },
            { "@type": "Question", "name": "Is this Engineering Calculators Free Tools NepaCal free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, NepaCal's Engineering Calculators Free Tools NepaCal is 100% free with no registration required." } }
          ]
        }) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Engineering Calculators Free Tools NepaCal</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Our free <strong>engineering calculator</strong> is optimized for Nepalese users. Whether you need an online engineering calculator or want to calculate accurately — NepaCal is your best tool.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Related: <strong>engineering calculator</strong>, <strong>calc engineering</strong>, <strong>best scientific calculator for engineering students</strong>, <strong>best calculator for engineering</strong>, <strong>engineering percentage calculator</strong>, <strong>engineering calculator</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Engineering Calculators Free Tools NepaCal?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              Enter your values above to get results instantly.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is it accurate for Nepal?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              Yes, our <strong>engineering calculator</strong> is regularly updated to reflect local standards.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
