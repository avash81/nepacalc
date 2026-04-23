import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Molar Mass Calculator (Chemical Compounds) | NEPACALC',
  description: 'Free online chemistry molar mass calculator. Calculate molecular weight for chemical formulas like H2O, NaCl, C6H12O6 instantly.',
  keywords: ['molar mass', 'molecular weight', 'chemistry', 'composition', 'periodic table', 'atomic weight', 'calculator'],

  openGraph: {
    title: 'Molar Mass Calculator (Chemical Compounds) | NEPACALC',
    description: 'Free online chemistry molar mass calculator. Calculate molecular weight for chemical formulas like H2O, NaCl, C6H12O6 instantly.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Molar Mass Calculator (Chemical Compounds) | NEPACALC',
    description: 'Free online chemistry molar mass calculator. Calculate molecular weight for chemical formulas like H2O, NaCl, C6H12O6 instantly.',
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
            { "@type": "Question", "name": "How to use the Molecular Weight Calculator Molar Mass tool?", "acceptedAnswer": { "@type": "Answer", "text": "Simply enter your data and our free molecular weight tool will provide instant results tailored for Nepal." } },
            { "@type": "Question", "name": "Is this Molecular Weight Calculator Molar Mass free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, NepaCal's Molecular Weight Calculator Molar Mass is 100% free with no registration required." } }
          ]
        }) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Molecular Weight Calculator Molar Mass</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Our free <strong>molecular weight</strong> is optimized for Nepalese users. Whether you need an online molecular weight or want to calculate accurately — NepaCal is your best tool.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Related: <strong>molecular weight</strong>, <strong>mass molecular weight</strong>, <strong>molecular wt</strong>, <strong>molecular weight finder</strong>, <strong>molecular weight si unit</strong>, <strong>molecular weight of k</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Molecular Weight Calculator Molar Mass?</span>
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
              Yes, our <strong>molecular weight</strong> is regularly updated to reflect local standards.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
