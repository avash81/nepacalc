import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kinetic Energy Calculator (1/2mv²) | NEPACALC',
  description: 'Free online physics calculator for kinetic energy (KE = ½mv²). Solve for energy, mass, or velocity instantly.',
  keywords: ['kinetic energy', 'physics calculator', 'energy', 'velocity', 'mass', '1/2mv2'],

  openGraph: {
    title: 'Kinetic Energy Calculator (1/2mv²) | NEPACALC',
    description: 'Free online physics calculator for kinetic energy (KE = ½mv²). Solve for energy, mass, or velocity instantly.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kinetic Energy Calculator (1/2mv²) | NEPACALC',
    description: 'Free online physics calculator for kinetic energy (KE = ½mv²). Solve for energy, mass, or velocity instantly.',
  },
};

export default function Page() {
  return (
    <>
      <Calculator />
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How to use the Kinetic Energy Calculator Physics NepaCal tool?", "acceptedAnswer": { "@type": "Answer", "text": "Simply enter your data and our free kinetic energy formula tool will provide instant results tailored for Nepal." } },
            { "@type": "Question", "name": "Is this Kinetic Energy Calculator Physics NepaCal free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, NepaCal's Kinetic Energy Calculator Physics NepaCal is 100% free with no registration required." } }
          ]
        }) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Kinetic Energy Calculator Physics NepaCal</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Our free <strong>kinetic energy formula</strong> is optimized for Nepalese users. Whether you need an online kinetic energy formula or want to calculate accurately — NepaCal is your best tool.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Related: <strong>kinetic energy formula</strong>, <strong>kinetic energy formula</strong>, <strong>what is kinetic energy</strong>, <strong>kinetic energy calculator</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Kinetic Energy Calculator Physics NepaCal?</span>
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
              Yes, our <strong>kinetic energy formula</strong> is regularly updated to reflect local standards.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
