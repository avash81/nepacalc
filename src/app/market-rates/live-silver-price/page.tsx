import Calculator from '../../calculator/gold-converter/Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Silver Price Today in Nepal — Chandi Tola & Gram Rates',
  description: 'Current silver (Chandi) prices in Nepal per tola and 10 grams. Live market benchmarks and official local federation rates.',
  keywords: ['silver price nepal', 'chandi rate today', 'silver price per tola', 'silver to gram nepal'],
  openGraph: {
    title: 'Live Silver Price Today Nepal | NEPACALC',
    description: 'Real-time silver rate dashboard for the Nepalese market. Per tola and gram conversions.',
    type: 'article',
  },
};

import SilverDashboardClient from './SilverDashboardClient';

export default function Page() {
  return (
    <>
      <SilverDashboardClient />
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Live Silver Price Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free live silver price tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"marked price formula\" across Nepal."}},{"@type":"Question","name":"Is this Live Silver Price Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Live Silver Price Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this how much price accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this live silver price?","acceptedAnswer":{"@type":"Answer","text":"Our Live Silver Price Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can selling price formula instantly without manual errors."}},{"@type":"Question","name":"Can I use this marked price formula on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our live silver price is fully responsive for mobile devices and desktops. Whether you search \"cost price formula\" or \"marked price formula\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Live Silver Price Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our scientific calculator price uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"marked price formula\" and \"price increase calculator\" with precision."}},{"@type":"Question","name":"What is \"live silver price\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"live silver price\" is one of the most searched terms across Nepal in Nepal. Our Live Silver Price Calculator helps you get accurate results for \"selling price formula\", \"cost price formula\", and \"calculation of estimated date of delivery\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Live Silver Price Calculator - NepaCal","url":"https://nepacalc.com/market-rates/live-silver-price","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"Free online live silver price for Nepal. Calculate how much price easily and accurately with NepaCal.","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":184}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Live Silver Price Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>live silver price</strong> for Nepal? NepaCal&apos;s Live Silver Price Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>selling price formula</strong>, find a reliable <strong>cost price formula</strong>, or simply understand <strong>scientific calculator price</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>live silver price</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>marked price formula</strong>, <strong>how much price</strong>, <strong>selling price formula</strong>, <strong>cost price formula</strong>, <strong>scientific calculator price</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Live Silver Price Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Live Silver Price Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>live silver price</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "marked price formula" across Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Live Silver Price Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Live Silver Price Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>how much price</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this live silver price?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Live Silver Price Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>selling price formula</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this marked price formula on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>live silver price</strong> is fully responsive for mobile devices and desktops. Whether you search "cost price formula" or "marked price formula" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Live Silver Price Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>scientific calculator price</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "marked price formula" and "price increase calculator" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "live silver price" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"live silver price" is one of the most searched terms across Nepal in Nepal. Our Live Silver Price Calculator helps you get accurate results for "selling price formula", "cost price formula", and "calculation of estimated date of delivery" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
