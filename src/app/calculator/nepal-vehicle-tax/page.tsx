import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Bike and Vehicle Tax Calculator Nepal NepaCal",
  description: "Calculate bike and vehicle tax for Nepal registration and renewal. Free vehicle tax calculator for bluebook renewal at NepaCal",
  slug: 'nepal-vehicle-tax',
  keywords: ["bike tax calculator nepal", "nepal", "calculator", "free", "online"],
});

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
            { "@type": "Question", "name": "How to use the Bike and Vehicle Tax Calculator Nepal NepaCal tool?", "acceptedAnswer": { "@type": "Answer", "text": "Simply enter your data and our free bike tax calculator nepal tool will provide instant results tailored for Nepal." } },
            { "@type": "Question", "name": "Is this Bike and Vehicle Tax Calculator Nepal NepaCal free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, NepaCal's Bike and Vehicle Tax Calculator Nepal NepaCal is 100% free with no registration required." } }
          ]
        }) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Bike and Vehicle Tax Calculator Nepal NepaCal</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Our free <strong>bike tax calculator nepal</strong> is optimized for Nepalese users. Whether you need an online bike tax calculator nepal or want to calculate accurately — NepaCal is your best tool.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Related: <strong>bike tax calculator nepal</strong>, <strong>bike speed calculator</strong>, <strong>exercise bike calories burned</strong>, <strong>calories burned on a exercise bike</strong>, <strong>gym bike calories burned</strong>, <strong>calories burned by bike riding</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Bike and Vehicle Tax Calculator Nepal NepaCal?</span>
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
              Yes, our <strong>bike tax calculator nepal</strong> is regularly updated to reflect local standards.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
