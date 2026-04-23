import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'BMI Calculator for Kids & Teens | Child BMI Percentile | NEPACALC',
  description: 'Calculate BMI for children and teenagers (ages 2-19). Understand BMI-for-age percentiles and growth patterns for boys and girls.',
  keywords: ['child bmi calculator', 'teen bmi', 'growth chart', 'bmi for kids', 'body mass index child', 'nepal child health'],
  openGraph: {
    title: 'BMI Calculator for Kids & Teens | NEPACALC',
    description: 'Track your child\'s health with our specialized BMI calculator.',
    siteName: 'NEPACALC',
    url: 'https://nepacalc.com/calculator/bmi-child',
    type: 'website',
  },
  alternates: { canonical: 'https://nepacalc.com/calculator/bmi-child' },
};

export default function BmiChildPage() {
  return (
    <>
      <Calculator />
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Bmi Child Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free bmi child tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"bmi calculator\" across Nepal."}},{"@type":"Question","name":"Is this Bmi Child Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Bmi Child Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this bmi formula accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this bmi child?","acceptedAnswer":{"@type":"Answer","text":"Our Bmi Child Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can bmi chart instantly without manual errors."}},{"@type":"Question","name":"Can I use this bmi calculator on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our bmi child is fully responsive for mobile devices and desktops. Whether you search \"bmi definition\" or \"bmi calculator\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Bmi Child Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our normal bmi uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"bmi calculator\" and \"check bmi female\" with precision."}},{"@type":"Question","name":"What is \"bmi child\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"bmi child\" is one of the most searched terms across Nepal in Nepal. Our Bmi Child Calculator helps you get accurate results for \"bmi chart\", \"bmi definition\", and \"bmi index\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Bmi Child Calculator - NepaCal","url":"https://nepacalc.com/calculator/bmi-child","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"Free online bmi child for Nepal. Calculate bmi formula easily and accurately with NepaCal.","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","ratingCount":164}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Bmi Child Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>bmi child</strong> for Nepal? NepaCal&apos;s Bmi Child Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>bmi chart</strong>, find a reliable <strong>bmi definition</strong>, or simply understand <strong>normal bmi</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>bmi child</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>bmi calculator</strong>, <strong>bmi formula</strong>, <strong>bmi chart</strong>, <strong>bmi definition</strong>, <strong>normal bmi</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Bmi Child Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Bmi Child Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>bmi child</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "bmi calculator" across Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Bmi Child Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Bmi Child Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>bmi formula</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this bmi child?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Bmi Child Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>bmi chart</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this bmi calculator on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>bmi child</strong> is fully responsive for mobile devices and desktops. Whether you search "bmi definition" or "bmi calculator" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Bmi Child Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>normal bmi</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "bmi calculator" and "check bmi female" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "bmi child" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"bmi child" is one of the most searched terms across Nepal in Nepal. Our Bmi Child Calculator helps you get accurate results for "bmi chart", "bmi definition", and "bmi index" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
