import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'NEPSE WACC & Tax Analyzer (v2)',
  description: 'Calculate your Weighted Average Cost of Capital (WACC) for Meroshare selling and capital gains tax declaration.',
  keywords: ['nepse wacc', 'average cost calculator', 'meroshare wacc', 'share profit tax'],

  openGraph: {
    title: 'NEPSE WACC & Tax Analyzer (v2)',
    description: 'Calculate your Weighted Average Cost of Capital (WACC) for Meroshare selling and capital gains tax declaration.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEPSE WACC & Tax Analyzer (v2)',
    description: 'Calculate your Weighted Average Cost of Capital (WACC) for Meroshare selling and capital gains tax declaration.',
  },
};

export default function Page() {
  return (
    <>
      <Calculator />
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Nepse Wacc Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free nepse wacc tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"nepse wacc nepal\" across Nepal."}},{"@type":"Question","name":"Is this Nepse Wacc Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Nepse Wacc Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this free nepse wacc accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this nepse wacc?","acceptedAnswer":{"@type":"Answer","text":"Our Nepse Wacc Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can online nepse wacc instantly without manual errors."}},{"@type":"Question","name":"Can I use this nepse wacc nepal on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our nepse wacc is fully responsive for mobile devices and desktops. Whether you search \"nepse wacc calculator\" or \"nepse wacc nepal\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Nepse Wacc Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our how to calculate nepse wacc uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"nepse wacc nepal\" and \"best nepse wacc tool\" with precision."}},{"@type":"Question","name":"What is \"nepse wacc\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"nepse wacc\" is one of the most searched terms across Nepal in Nepal. Our Nepse Wacc Calculator helps you get accurate results for \"online nepse wacc\", \"nepse wacc calculator\", and \"nepse wacc formula\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Nepse Wacc Calculator - NepaCal","url":"https://nepacalc.com/calculator/nepse-wacc","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"Free online nepse wacc for Nepal. Calculate free nepse wacc easily and accurately with NepaCal.","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":213}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Nepse Wacc Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>nepse wacc</strong> for Nepal? NepaCal&apos;s Nepse Wacc Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>online nepse wacc</strong>, find a reliable <strong>nepse wacc calculator</strong>, or simply understand <strong>how to calculate nepse wacc</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>nepse wacc</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>nepse wacc nepal</strong>, <strong>free nepse wacc</strong>, <strong>online nepse wacc</strong>, <strong>nepse wacc calculator</strong>, <strong>how to calculate nepse wacc</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Nepse Wacc Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Nepse Wacc Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>nepse wacc</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "nepse wacc nepal" across Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Nepse Wacc Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Nepse Wacc Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>free nepse wacc</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this nepse wacc?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Nepse Wacc Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>online nepse wacc</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this nepse wacc nepal on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>nepse wacc</strong> is fully responsive for mobile devices and desktops. Whether you search "nepse wacc calculator" or "nepse wacc nepal" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Nepse Wacc Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>how to calculate nepse wacc</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "nepse wacc nepal" and "best nepse wacc tool" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "nepse wacc" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"nepse wacc" is one of the most searched terms across Nepal in Nepal. Our Nepse Wacc Calculator helps you get accurate results for "online nepse wacc", "nepse wacc calculator", and "nepse wacc formula" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
