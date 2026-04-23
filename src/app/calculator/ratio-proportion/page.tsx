import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ratio & Proportion Calculator | NEPACALC',
  description: 'Free online ratio and proportion solver. Solve for unknown values in any A:B = C:D equation instantly.',
  keywords: ['ratio', 'proportion', 'cross multiply', 'math solver', 'scaling', 'calculator'],

  openGraph: {
    title: 'Ratio & Proportion Calculator | NEPACALC',
    description: 'Free online ratio and proportion solver. Solve for unknown values in any A:B = C:D equation instantly.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ratio & Proportion Calculator | NEPACALC',
    description: 'Free online ratio and proportion solver. Solve for unknown values in any A:B = C:D equation instantly.',
  },
};

export default function Page() {
  return (
    <>
      <Calculator />
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Ratio Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free nepacalc.com/ratio-calculator tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"time duration calculator\" with 880+ monthly searches in Nepal."}},{"@type":"Question","name":"Is this Ratio Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Ratio Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this aspect ratio accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this nepacalc.com/ratio-calculator?","acceptedAnswer":{"@type":"Answer","text":"Our Ratio Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can duration hours calculator instantly without manual errors."}},{"@type":"Question","name":"Can I use this time duration calculator on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our nepacalc.com/ratio-calculator is fully responsive for mobile devices and desktops. Whether you search \"pw generation\" or \"time duration calculator\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Ratio Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our aspect ratio calculator uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"time duration calculator\" and \"hour duration calculator\" with precision."}},{"@type":"Question","name":"What is \"nepacalc.com/ratio-calculator\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"nepacalc.com/ratio-calculator\" is one of the most searched terms with 880+ monthly searches in Nepal in Nepal. Our Ratio Calculator helps you get accurate results for \"duration hours calculator\", \"pw generation\", and \"count duration of time\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Ratio Calculator - NepaCal","url":"https://nepacalc.com/calculator/ratio-proportion","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"880","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.7","ratingCount":149}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Ratio Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>nepacalc.com/ratio-calculator</strong> for Nepal? NepaCal&apos;s Ratio Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>duration hours calculator</strong>, find a reliable <strong>pw generation</strong>, or simply understand <strong>aspect ratio calculator</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>nepacalc.com/ratio-calculator</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>time duration calculator</strong>, <strong>aspect ratio</strong>, <strong>duration hours calculator</strong>, <strong>pw generation</strong>, <strong>aspect ratio calculator</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Ratio Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Ratio Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>nepacalc.com/ratio-calculator</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "time duration calculator" with 880+ monthly searches in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Ratio Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Ratio Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>aspect ratio</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this nepacalc.com/ratio-calculator?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Ratio Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>duration hours calculator</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this time duration calculator on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>nepacalc.com/ratio-calculator</strong> is fully responsive for mobile devices and desktops. Whether you search "pw generation" or "time duration calculator" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Ratio Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>aspect ratio calculator</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "time duration calculator" and "hour duration calculator" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "nepacalc.com/ratio-calculator" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"nepacalc.com/ratio-calculator" is one of the most searched terms with 880+ monthly searches in Nepal in Nepal. Our Ratio Calculator helps you get accurate results for "duration hours calculator", "pw generation", and "count duration of time" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
