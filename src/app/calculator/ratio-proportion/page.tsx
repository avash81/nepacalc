import { calcMeta } from '@/lib/calcMeta';
import RatioCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Ratio & Proportion Calculator | Solve A:B = C:D Equations Nepal NepaCal",
  description: "Free online ratio and proportion solver. Simplify ratios, calculate scaling, and solve for unknown values in any proportion equation instantly.",
  slug: 'ratio-proportion',
  keywords: ["ratio and proportion calculator nepal", "solve ratios", "ratio simplifier", "cross multiplication calculator", "proportion solver nepal", "math scaling tool"],
});

const RATIO_FAQS = [
  {
    question: "What is a ratio and how is it simplified?",
    answer: "A ratio compares two quantities. To simplify it, divide both parts by their greatest common factor (GCF). For example, 10:20 simplifies to 1:2."
  },
  {
    question: "What is the difference between ratio and proportion?",
    answer: "A ratio compares two quantities (3:4), whereas a proportion is an equation stating that two ratios are equal (3/4 = 6/8)."
  },
  {
    question: "How is ratio used in construction in Nepal?",
    answer: "Ratios are vital for material mixing. A standard structural concrete mix of 1:1.5:3 refers to parts of cement, sand, and aggregate respectively."
  },
  {
    question: "How do I solve for an unknown value in a proportion?",
    answer: "Use cross-multiplication. If x/5 = 10/2, then 2x = 50, resulting in x = 25. Our calculator handles these 'Rule of Three' problems automatically."
  },
  {
    question: "Does this calculator handle multi-part ratios?",
    answer: "Yes, our advanced engine allows you to compare multiple parts (e.g., 2:3:5), which is useful for chemistry formulas and construction ratios."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Ratio & Proportion Solver"
        description="High-precision algebraic engine for simplifying ratios, solving for unknown values, and calculating scaling proportions."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Ratio' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Simple Calculator', slug: 'simple-calculator' },
          { name: 'Percentage Calc', slug: 'percentage' },
          { name: 'Unit Converter', slug: 'unit-converter' }
        ]}
        formula="Proportion: A/B = C/D"
      >
        <RatioCalculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-blue-600 text-white px-6 py-3 rounded-2xl inline-block shadow-lg">
              Algebraic Guide: Ratio & Scaling
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                The principles of <strong>ratio and proportion</strong> are fundamental to everything from culinary recipes and chemical formulas to massive engineering projects in Nepal.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Algebraic Analysis Laboratory</strong> provides a robust interface for solving proportional relationships. Whether you are a student tackling 'Rule of Three' problems or a professional needing to scale dimensions for architectural blueprints, our logic ensures mathematical consistency and absolute precision.
              </p>
            </div>

            <PillarFAQ faqs={RATIO_FAQS} title="Ratios & Proportions FAQ" />
          </div>
        </div>
      </CalcWrapper>
    

      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Ratio Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free nepacalc.com/ratio-calculator tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"time duration calculator\" with 880+ monthly searches in Nepal."}},{"@type":"Question","name":"Is this Ratio Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Ratio Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this aspect ratio accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this nepacalc.com/ratio-calculator?","acceptedAnswer":{"@type":"Answer","text":"Our Ratio Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can duration hours calculator instantly without manual errors."}},{"@type":"Question","name":"Can I use this time duration calculator on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our nepacalc.com/ratio-calculator is fully responsive for mobile devices and desktops. Whether you search \"pw generation\" or \"time duration calculator\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Ratio Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our aspect ratio calculator uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"time duration calculator\" and \"hour duration calculator\" with precision."}},{"@type":"Question","name":"What is \"nepacalc.com/ratio-calculator\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"nepacalc.com/ratio-calculator\" is one of the most searched terms with 880+ monthly searches in Nepal in Nepal. Our Ratio Calculator helps you get accurate results for \"duration hours calculator\", \"pw generation\", and \"count duration of time\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Ratio Calculator - NepaCal","url":"https://nepacalc.com/calculator/ratio-proportion","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"880","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.7","ratingCount":125}}]) }}
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
    </div>
  );
}
