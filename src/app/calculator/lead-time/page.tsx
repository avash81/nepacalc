import { Metadata } from 'next';
import { Calculator } from './Calculator';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { JsonLd } from '@/components/seo/JsonLd';

const faqs = [
  {
    question: "What is a lead time calculator?",
    answer: "A lead time calculator helps procurement professionals and engineers determine the exact calendar date an item will arrive based on a stated lead time, or conversely, what date an order must be placed to ensure delivery by a specific target deadline."
  },
  {
    question: "How are business days calculated?",
    answer: "When 'Business Days Only' is toggled, the calculator strictly skips Saturdays and Sundays during the elapsed time calculation, giving you an accurate working-day delivery metric."
  },
  {
    question: "Should I calculate using days, weeks, or months?",
    answer: "If a supplier quotes a lead time in weeks or months, it generally refers to elapsed calendar time. If they quote in days (e.g., '14 days lead time'), clarify if they mean business days or calendar days. Our tool supports both."
  }
];

export const metadata: Metadata = {
  title: 'Lead Time Calculator - Expected Delivery & Order Dates | NEPACALC',
  description: 'Easily calculate expected delivery dates and when to place your orders based on manufacturing and shipping lead times. Includes business day logic.',
  keywords: 'lead time calculator, expected delivery calculator, order-by date calculator, lead time business days, supply chain calculator engineering',
  alternates: {
    canonical: 'https://nepacalc.com/calculator/lead-time',
  },
  openGraph: {
    title: 'Lead Time Calculator - Expected Delivery & Order Dates | NEPACALC',
    description: 'Easily calculate expected delivery dates and when to place your orders based on manufacturing and shipping lead times. Includes business day logic.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lead Time Calculator - Expected Delivery & Order Dates | NEPACALC',
    description: 'Easily calculate expected delivery dates and when to place your orders based on manufacturing and shipping lead times. Includes business day logic.',
  },
};

export default function LeadTimeCalculatorPage() {
  return (
    <div className="hp-container py-12">
      <Calculator faqs={faqs} />
    

      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Stopwatch and Timer Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free nepacalc.com/stopwatch-timer tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"time\" with 8,100+ monthly searches in Nepal."}},{"@type":"Question","name":"Is this Stopwatch and Timer Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Stopwatch and Timer Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this time converter accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this nepacalc.com/stopwatch-timer?","acceptedAnswer":{"@type":"Answer","text":"Our Stopwatch and Timer Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can time duration calculator instantly without manual errors."}},{"@type":"Question","name":"Can I use this time on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our nepacalc.com/stopwatch-timer is fully responsive for mobile devices and desktops. Whether you search \"time difference utc\" or \"time\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Stopwatch and Timer Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our time converter time zones uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"time\" and \"time calculator by date\" with precision."}},{"@type":"Question","name":"What is \"nepacalc.com/stopwatch-timer\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"nepacalc.com/stopwatch-timer\" is one of the most searched terms with 8,100+ monthly searches in Nepal in Nepal. Our Stopwatch and Timer Calculator helps you get accurate results for \"time duration calculator\", \"time difference utc\", and \"time zone zone converter\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Stopwatch and Timer Calculator - NepaCal","url":"https://nepacalc.com/calculator/lead-time","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"8100","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":834}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Stopwatch and Timer Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>nepacalc.com/stopwatch-timer</strong> for Nepal? NepaCal&apos;s Stopwatch and Timer Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>time duration calculator</strong>, find a reliable <strong>time difference utc</strong>, or simply understand <strong>time converter time zones</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>nepacalc.com/stopwatch-timer</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>time</strong>, <strong>time converter</strong>, <strong>time duration calculator</strong>, <strong>time difference utc</strong>, <strong>time converter time zones</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Stopwatch and Timer Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Stopwatch and Timer Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>nepacalc.com/stopwatch-timer</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "time" with 8,100+ monthly searches in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Stopwatch and Timer Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Stopwatch and Timer Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>time converter</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this nepacalc.com/stopwatch-timer?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Stopwatch and Timer Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>time duration calculator</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this time on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>nepacalc.com/stopwatch-timer</strong> is fully responsive for mobile devices and desktops. Whether you search "time difference utc" or "time" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Stopwatch and Timer Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>time converter time zones</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "time" and "time calculator by date" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "nepacalc.com/stopwatch-timer" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"nepacalc.com/stopwatch-timer" is one of the most searched terms with 8,100+ monthly searches in Nepal in Nepal. Our Stopwatch and Timer Calculator helps you get accurate results for "time duration calculator", "time difference utc", and "time zone zone converter" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
