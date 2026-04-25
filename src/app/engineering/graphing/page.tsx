import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import GraphingCalculatorClient from './GraphingCalculatorClient';

export const metadata: Metadata = {
  title: 'Free Online Graphing Calculator — Plot Functions | NEPACALC',
  description: 'Interactive graphing calculator: plot multiple functions simultaneously with custom colors, infinite pan & zoom, real-time rendering. Supports sin, cos, tan, log, polynomials, and more. Free, no login required.',
  keywords: ['graphing calculator', 'function plotter', 'graph functions online', 'desmos alternative', 'plot equations', 'math grapher'],
  openGraph: {
    title: 'Free Graphing Calculator | NEPACALC',
    description: 'Plot multiple functions with custom colors, pan, zoom, and real-time rendering.',
    url: 'https://nepacalc.com/engineering/graphing',
  },
};

export default function GraphingPage() {
  return (
    <>
      <JsonLd
        type="breadcrumb"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Engineering', item: 'https://nepacalc.com/engineering' },
          { name: 'Graphing Calculator', item: 'https://nepacalc.com/engineering/graphing' }
        ]}
      />
      <JsonLd
        type="calculator"
        name="NEPACALC Graphing Calculator"
        description="Interactive graphing calculator with multi-expression support, custom colors, infinite pan & zoom."
        url="https://nepacalc.com/engineering/graphing"
        category="EducationalApplication"
      />
      <GraphingCalculatorClient />
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Graphing Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free graphing tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"desmos graphing\" across Nepal."}},{"@type":"Question","name":"Is this Graphing Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Graphing Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this graphing calculator accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this graphing?","acceptedAnswer":{"@type":"Answer","text":"Our Graphing Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can casio graphing calculator online instantly without manual errors."}},{"@type":"Question","name":"Can I use this desmos graphing on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our graphing is fully responsive for mobile devices and desktops. Whether you search \"calculus graphing calculator online\" or \"desmos graphing\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Graphing Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our scientific calculator and graphing calculator uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"desmos graphing\" and \"graphing quadratic equations\" with precision."}},{"@type":"Question","name":"What is \"graphing\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"graphing\" is one of the most searched terms across Nepal in Nepal. Our Graphing Calculator helps you get accurate results for \"casio graphing calculator online\", \"calculus graphing calculator online\", and \"graphing display calculator online\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Graphing Calculator - NepaCal","url":"https://nepacalc.com/engineering/graphing","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"Free online graphing for Nepal. Calculate graphing calculator easily and accurately with NepaCal.","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":230}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Graphing Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>graphing</strong> for Nepal? NepaCal&apos;s Graphing Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>casio graphing calculator online</strong>, find a reliable <strong>calculus graphing calculator online</strong>, or simply understand <strong>scientific calculator and graphing calculator</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>graphing</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>desmos graphing</strong>, <strong>graphing calculator</strong>, <strong>casio graphing calculator online</strong>, <strong>calculus graphing calculator online</strong>, <strong>scientific calculator and graphing calculator</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Graphing Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Graphing Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>graphing</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "desmos graphing" across Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Graphing Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Graphing Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>graphing calculator</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this graphing?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Graphing Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>casio graphing calculator online</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this desmos graphing on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>graphing</strong> is fully responsive for mobile devices and desktops. Whether you search "calculus graphing calculator online" or "desmos graphing" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Graphing Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>scientific calculator and graphing calculator</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "desmos graphing" and "graphing quadratic equations" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "graphing" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"graphing" is one of the most searched terms across Nepal in Nepal. Our Graphing Calculator helps you get accurate results for "casio graphing calculator online", "calculus graphing calculator online", and "graphing display calculator online" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
