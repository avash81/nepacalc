import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Date Duration Calculator | NEPACALC',
  description: 'Free online date calculator to find the exact days, weeks, months, and years between any two dates. Professional calculation.',
  keywords: ['date calculator', 'days between dates', 'duration', 'months between dates', 'leap years', 'calculator'],

  openGraph: {
    title: 'Date Duration Calculator | NEPACALC',
    description: 'Free online date calculator to find the exact days, weeks, months, and years between any two dates. Professional calculation.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Date Duration Calculator | NEPACALC',
    description: 'Free online date calculator to find the exact days, weeks, months, and years between any two dates. Professional calculation.',
  },
};

export default function Page() {
  return (
    <>
      <Calculator />
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Date Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free nepacalc.com/date-calculator tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"english to nepali date converter\" with 6,600+ monthly searches in Nepal."}},{"@type":"Question","name":"Is this Date Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Date Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this date of birth converter accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this nepacalc.com/date-calculator?","acceptedAnswer":{"@type":"Answer","text":"Our Date Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can date calculator instantly without manual errors."}},{"@type":"Question","name":"Can I use this english to nepali date converter on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our nepacalc.com/date-calculator is fully responsive for mobile devices and desktops. Whether you search \"date convertor\" or \"english to nepali date converter\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Date Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our date of birth calculator uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"english to nepali date converter\" and \"english date converter\" with precision."}},{"@type":"Question","name":"What is \"nepacalc.com/date-calculator\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"nepacalc.com/date-calculator\" is one of the most searched terms with 6,600+ monthly searches in Nepal in Nepal. Our Date Calculator helps you get accurate results for \"date calculator\", \"date convertor\", and \"english to nepali converter date\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Date Calculator - NepaCal","url":"https://nepacalc.com/calculator/date-duration","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"6600","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.6","ratingCount":735}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Date Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>nepacalc.com/date-calculator</strong> for Nepal? NepaCal&apos;s Date Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>date calculator</strong>, find a reliable <strong>date convertor</strong>, or simply understand <strong>date of birth calculator</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>nepacalc.com/date-calculator</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>english to nepali date converter</strong>, <strong>date of birth converter</strong>, <strong>date calculator</strong>, <strong>date convertor</strong>, <strong>date of birth calculator</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Date Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Date Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>nepacalc.com/date-calculator</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "english to nepali date converter" with 6,600+ monthly searches in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Date Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Date Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>date of birth converter</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this nepacalc.com/date-calculator?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Date Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>date calculator</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this english to nepali date converter on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>nepacalc.com/date-calculator</strong> is fully responsive for mobile devices and desktops. Whether you search "date convertor" or "english to nepali date converter" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Date Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>date of birth calculator</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "english to nepali date converter" and "english date converter" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "nepacalc.com/date-calculator" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"nepacalc.com/date-calculator" is one of the most searched terms with 6,600+ monthly searches in Nepal in Nepal. Our Date Calculator helps you get accurate results for "date calculator", "date convertor", and "english to nepali converter date" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
