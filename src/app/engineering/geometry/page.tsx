import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import GeometryCanvasClient from './GeometryCanvasClient';

export const metadata: Metadata = {
  title: 'Free Interactive Geometry Tool — Constructions | NEPACALC',
  description: 'Interactive geometry canvas: construct points, lines, circles, and polygons with real-time measurements. Drag objects, measure angles and distances. Free online geometry tool.',
  keywords: ['geometry tool', 'interactive geometry', 'draw circles online', 'geometry canvas', 'compass and straightedge', 'measure angles online'],
  openGraph: { title: 'Free Geometry Tool | NEPACALC', description: 'Interactive constructions with measurements.', url: 'https://nepacalc.com/engineering/geometry' },
};

export default function GeometryPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering' },
          { name: 'Geometry Canvas', item: 'https://nepacalc.com/engineering/geometry' }
        ]}
      />
      <JsonLd type="calculator" name="NEPACALC Geometry Canvas" description="Interactive geometry construction tool with points, lines, circles, polygons and measurements." url="https://nepacalc.com/engineering/geometry" category="EducationalApplication" />
      <GeometryCanvasClient />
    
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
