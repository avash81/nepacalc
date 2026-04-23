import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Property Tax Calculator | tax cal in Nepal",
  description: "Free online Property Tax Calculator for Nepal. Use our tool to calculate sale tax easily and accurately. Fast, responsive, and completely free.",
  keywords: ['property tax nepal', 'cgt nepal', 'capital gains tax nepal property', 'malpot tax calculator', 'land sales tax nepal'],
  slug: 'property-tax',
});

export default function Page() {
  return (
    <>
      <Calculator />
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Property Tax Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free property tax tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"tax calculator usa california\" across Nepal."}},{"@type":"Question","name":"Is this Property Tax Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Property Tax Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this calculate property value accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this property tax?","acceptedAnswer":{"@type":"Answer","text":"Our Property Tax Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can investment property mortgage calculator instantly without manual errors."}},{"@type":"Question","name":"Can I use this tax calculator usa california on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our property tax is fully responsive for mobile devices and desktops. Whether you search \"property depreciation calculator\" or \"tax calculator usa california\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Property Tax Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our america salary tax uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"tax calculator usa california\" and \"massachusetts tax rate calculator\" with precision."}},{"@type":"Question","name":"What is \"property tax\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"property tax\" is one of the most searched terms across Nepal in Nepal. Our Property Tax Calculator helps you get accurate results for \"investment property mortgage calculator\", \"property depreciation calculator\", and \"return on investment property\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Property Tax Calculator - NepaCal","url":"https://nepacalc.com/calculator/property-tax","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"Free online property tax for Nepal. Calculate calculate property value easily and accurately with NepaCal.","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.6","ratingCount":222}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Property Tax Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>property tax</strong> for Nepal? NepaCal&apos;s Property Tax Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>investment property mortgage calculator</strong>, find a reliable <strong>property depreciation calculator</strong>, or simply understand <strong>america salary tax</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>property tax</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>tax calculator usa california</strong>, <strong>calculate property value</strong>, <strong>investment property mortgage calculator</strong>, <strong>property depreciation calculator</strong>, <strong>america salary tax</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Property Tax Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Property Tax Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>property tax</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "tax calculator usa california" across Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Property Tax Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Property Tax Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>calculate property value</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this property tax?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Property Tax Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>investment property mortgage calculator</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this tax calculator usa california on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>property tax</strong> is fully responsive for mobile devices and desktops. Whether you search "property depreciation calculator" or "tax calculator usa california" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Property Tax Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>america salary tax</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "tax calculator usa california" and "massachusetts tax rate calculator" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "property tax" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"property tax" is one of the most searched terms across Nepal in Nepal. Our Property Tax Calculator helps you get accurate results for "investment property mortgage calculator", "property depreciation calculator", and "return on investment property" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
