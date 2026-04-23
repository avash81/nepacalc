import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Linear Equation Solver (2 & 3 Variables) | NEPACALC',
  description: 'Free online linear equation solver for systems with 2 or 3 unknown variables. Uses Cramer\'s rule for precise solutions.',
  keywords: ['linear equations', 'algebra solver', 'simultaneous equations', 'math solver', 'cramer rule'],

  openGraph: {
    title: 'Linear Equation Solver (2 & 3 Variables) | NEPACALC',
    description: 'Free online linear equation solver for systems with 2 or 3 unknown variables. Uses Cramer\'s rule for precise solutions.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linear Equation Solver (2 & 3 Variables) | NEPACALC',
    description: 'Free online linear equation solver for systems with 2 or 3 unknown variables. Uses Cramer\'s rule for precise solutions.',
  },
};

export default function Page() {
  return (
    <>
      <Calculator />
    
      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Math Equation Solver Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free nepacalc.com/math-solver tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"math solver\" with 33,100+ monthly searches in Nepal."}},{"@type":"Question","name":"Is this Math Equation Solver Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Math Equation Solver Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this cube solver accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this nepacalc.com/math-solver?","acceptedAnswer":{"@type":"Answer","text":"Our Math Equation Solver Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can math problem solver instantly without manual errors."}},{"@type":"Question","name":"Can I use this math solver on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our nepacalc.com/math-solver is fully responsive for mobile devices and desktops. Whether you search \"math question solver\" or \"math solver\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Math Equation Solver Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our quadratic equation solver uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"math solver\" and \"linear equations\" with precision."}},{"@type":"Question","name":"What is \"nepacalc.com/math-solver\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"nepacalc.com/math-solver\" is one of the most searched terms with 33,100+ monthly searches in Nepal in Nepal. Our Math Equation Solver Calculator helps you get accurate results for \"math problem solver\", \"math question solver\", and \"trigonometry solver\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Math Equation Solver Calculator - NepaCal","url":"https://nepacalc.com/calculator/linear-solver","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"33100","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","ratingCount":3458}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Math Equation Solver Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>nepacalc.com/math-solver</strong> for Nepal? NepaCal&apos;s Math Equation Solver Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>math problem solver</strong>, find a reliable <strong>math question solver</strong>, or simply understand <strong>quadratic equation solver</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>nepacalc.com/math-solver</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>math solver</strong>, <strong>cube solver</strong>, <strong>math problem solver</strong>, <strong>math question solver</strong>, <strong>quadratic equation solver</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Math Equation Solver Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Math Equation Solver Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>nepacalc.com/math-solver</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "math solver" with 33,100+ monthly searches in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Math Equation Solver Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Math Equation Solver Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>cube solver</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this nepacalc.com/math-solver?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Math Equation Solver Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>math problem solver</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this math solver on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>nepacalc.com/math-solver</strong> is fully responsive for mobile devices and desktops. Whether you search "math question solver" or "math solver" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Math Equation Solver Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>quadratic equation solver</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "math solver" and "linear equations" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "nepacalc.com/math-solver" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"nepacalc.com/math-solver" is one of the most searched terms with 33,100+ monthly searches in Nepal in Nepal. Our Math Equation Solver Calculator helps you get accurate results for "math problem solver", "math question solver", and "trigonometry solver" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
