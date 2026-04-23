import Calculator from '../../calculator/currency-converter/Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Exchange Rate Nepal — USD, INR, GBP to NPR Today',
  description: 'Official foreign exchange rates in Nepal. Real-time USD, INR, EUR, and GBP to NPR conversions synchronized with NRB benchmarks.',
  keywords: ['exchange rate nepal', 'usd to npr live', 'inr to npr rate', 'forex nepal today', 'nrb exchange rate'],
  openGraph: {
    title: 'Live Foreign Exchange Rates Nepal | NEPACALC',
    description: 'Track live currency exchange rates against the Nepalese Rupee (NPR). Official indices and NRB sync.',
    type: 'article',
  },
};

import ForexDashboardClient from './ForexDashboardClient';

export default function Page() {
  return (
    <>
      <ForexDashboardClient />
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How to use the NPR Exchange Rate Dollar to Nepali Rupees tool?", "acceptedAnswer": { "@type": "Answer", "text": "Simply enter your data and our free 1 dollars in nepali rupees tool will provide instant results tailored for Nepal." } },
            { "@type": "Question", "name": "Is this NPR Exchange Rate Dollar to Nepali Rupees free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, NepaCal's NPR Exchange Rate Dollar to Nepali Rupees is 100% free with no registration required." } }
          ]
        }) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the NPR Exchange Rate Dollar to Nepali Rupees</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Our free <strong>1 dollars in nepali rupees</strong> is optimized for Nepalese users. Whether you need an online 1 dollars in nepali rupees or want to calculate accurately — NepaCal is your best tool.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Related: <strong>1 dollars in nepali rupees</strong>, <strong>21 days from today</strong>, <strong>14 days from today</strong>, <strong>1 usd indian money</strong>, <strong>1 kilo how many calories</strong>, <strong>120 pounds kilo</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the NPR Exchange Rate Dollar to Nepali Rupees?</span>
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
              Yes, our <strong>1 dollars in nepali rupees</strong> is regularly updated to reflect local standards.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
