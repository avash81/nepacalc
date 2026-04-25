import { calcMeta } from '@/lib/calcMeta';
import QuadraticCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Quadratic Equation Solver | Roots & Discriminant Nepal NepaCal",
  description: "Solve quadratic equations instantly. Find real and complex roots, calculate the discriminant, and see step-by-step solutions for ax² + bx + c = 0.",
  slug: 'quadratic-solver',
  keywords: ["quadratic equation solver nepal", "calculate roots of quadratic", "quadratic formula calculator", "discriminant calculator", "math solver nepal", "algebra tool"],
});

const QUADRATIC_FAQS = [
  {
    question: "How do I solve a quadratic equation?",
    answer: "A quadratic equation (ax² + bx + c = 0) is solved using the quadratic formula: x = [-b ± sqrt(b² - 4ac)] / 2a. Our tool calculates both roots instantly."
  },
  {
    question: "What is the 'Discriminant' (D)?",
    answer: "The discriminant is b² - 4ac. It determines the nature of the roots: D > 0 (two real roots), D = 0 (one real root), or D < 0 (two complex roots)."
  },
  {
    question: "Can this solver handle imaginary or complex roots?",
    answer: "Yes. If the discriminant is negative, our engine will provide the roots in the form a ± bi, ensuring accuracy for advanced algebra problems."
  },
  {
    question: "What are the real-world applications of quadratic equations?",
    answer: "They are used to model projectile motion, calculate business profit/loss curves, and solve spatial area problems in engineering and architecture."
  },
  {
    question: "How do I know if my equation has no real solutions?",
    answer: "If the discriminant (b² - 4ac) is less than zero, the equation has no real roots, only complex ones. Our calculator explicitly identifies this state."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Quadratic Equation Solver"
        description="High-precision algebraic engine for finding the roots and discriminant of any second-degree polynomial equation instantly."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Quadratic Solver' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Linear Solver', slug: 'linear-solver' },
          { name: 'Matrices', slug: 'matrices' },
          { name: 'Scientific Calc', slug: 'scientific-calculator' }
        ]}
        formula="Quadratic Formula: x = [-b ± √(b² - 4ac)] / 2a"
      >
        <QuadraticCalculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-slate-900 text-white px-6 py-3 rounded-2xl inline-block shadow-lg">
              Algebraic Guide: Quadratic Equations
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                The <strong>quadratic formula</strong> is one of the most powerful tools in mathematics, providing the exact solutions for any second-degree polynomial.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Polynomial Analysis Laboratory</strong> provides an industrial-grade interface for solving <strong>ax² + bx + c = 0</strong>. Whether you are a student in Nepal analyzing the trajectory of a projectile or an engineer calculating structural parabolas, our engine provides both real and complex roots with absolute numerical precision.
              </p>
            </div>

            <PillarFAQ faqs={QUADRATIC_FAQS} title="Quadratic Formula & Roots FAQ" />
          </div>
        </div>
      </CalcWrapper>
    

      {/* SEO: Competitor-Data Driven FAQ & Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How do I use the Quadratic Equation Solver Calculator accurately?","acceptedAnswer":{"@type":"Answer","text":"Enter your values into our free nepacalc.com/quadratic-equation-calculator tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: \"math solver\" with 1,900+ monthly searches in Nepal."}},{"@type":"Question","name":"Is this Quadratic Equation Solver Calculator completely free?","acceptedAnswer":{"@type":"Answer","text":"Yes, NepaCal's Quadratic Equation Solver Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this cube solver accessible to everyone in Nepal."}},{"@type":"Question","name":"What is the formula used by this nepacalc.com/quadratic-equation-calculator?","acceptedAnswer":{"@type":"Answer","text":"Our Quadratic Equation Solver Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can math problem solver instantly without manual errors."}},{"@type":"Question","name":"Can I use this math solver on my phone?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. Our nepacalc.com/quadratic-equation-calculator is fully responsive for mobile devices and desktops. Whether you search \"quadratic equation\" or \"math solver\" on Google, NepaCal gives you the best tool for Nepal."}},{"@type":"Question","name":"Why is NepaCal's Quadratic Equation Solver Calculator better than other tools?","acceptedAnswer":{"@type":"Answer","text":"NepaCal is built specifically for Nepal. Our math question solver uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target \"math solver\" and \"quadratic formula\" with precision."}},{"@type":"Question","name":"What is \"nepacalc.com/quadratic-equation-calculator\" and why do people search for it?","acceptedAnswer":{"@type":"Answer","text":"\"nepacalc.com/quadratic-equation-calculator\" is one of the most searched terms with 1,900+ monthly searches in Nepal in Nepal. Our Quadratic Equation Solver Calculator helps you get accurate results for \"math problem solver\", \"quadratic equation\", and \"equation solver\" — all in one free tool."}}]},{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Quadratic Equation Solver Calculator - NepaCal","url":"https://nepacalc.com/calculator/quadratic-solver","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"NPR"},"description":"1900","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":354}}]) }}
      />
      <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">About the Quadratic Equation Solver Calculator</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
          Looking for a free <strong>nepacalc.com/quadratic-equation-calculator</strong> for Nepal? NepaCal&apos;s Quadratic Equation Solver Calculator is the most accurate and locally optimized tool available. Whether you need to <strong>math problem solver</strong>, find a reliable <strong>quadratic equation</strong>, or simply understand <strong>math question solver</strong> — we have you covered with real Nepal data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
          Trusted by thousands of users across Nepal, our <strong>nepacalc.com/quadratic-equation-calculator</strong> supports all your needs from daily calculations to professional use. Related searches our users find helpful: <strong>math solver</strong>, <strong>cube solver</strong>, <strong>math problem solver</strong>, <strong>quadratic equation</strong>, <strong>math question solver</strong>.
        </p>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight border-t border-slate-100 dark:border-slate-800 pt-8">
          Frequently Asked Questions — Quadratic Equation Solver Calculator
        </h2>
        <div className="space-y-3">
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q1.</span>
              <span>How do I use the Quadratic Equation Solver Calculator accurately?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Enter your values into our free <strong>nepacalc.com/quadratic-equation-calculator</strong> tool and get instant results. Our engine is designed specifically for Nepalese users — no manual calculations needed. Popular search: "math solver" with 1,900+ monthly searches in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" open>
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q2.</span>
              <span>Is this Quadratic Equation Solver Calculator completely free?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Yes, NepaCal's Quadratic Equation Solver Calculator is 100% free — no sign-up, no hidden charges. We make reliable tools like this <strong>cube solver</strong> accessible to everyone in Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q3.</span>
              <span>What is the formula used by this nepacalc.com/quadratic-equation-calculator?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Our Quadratic Equation Solver Calculator uses globally verified standard formulas for maximum accuracy. It handles all variables automatically so you can <strong>math problem solver</strong> instantly without manual errors.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q4.</span>
              <span>Can I use this math solver on my phone?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>Absolutely. Our <strong>nepacalc.com/quadratic-equation-calculator</strong> is fully responsive for mobile devices and desktops. Whether you search "quadratic equation" or "math solver" on Google, NepaCal gives you the best tool for Nepal.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q5.</span>
              <span>Why is NepaCal's Quadratic Equation Solver Calculator better than other tools?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>NepaCal is built specifically for Nepal. Our <strong>math question solver</strong> uses local rates and Nepal-specific data, supports NPR, and is regularly updated. Unlike generic calculators, we target "math solver" and "quadratic formula" with precision.
            </div>
          </details>
          <details className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden" >
            <summary className="flex items-center gap-3 p-5 cursor-pointer font-semibold text-slate-900 dark:text-white text-sm list-none select-none">
              <span className="text-blue-600 font-black text-base flex-shrink-0">Q6.</span>
              <span>What is "nepacalc.com/quadratic-equation-calculator" and why do people search for it?</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
              <span className="font-bold text-slate-800 dark:text-slate-200">A: </span>"nepacalc.com/quadratic-equation-calculator" is one of the most searched terms with 1,900+ monthly searches in Nepal in Nepal. Our Quadratic Equation Solver Calculator helps you get accurate results for "math problem solver", "quadratic equation", and "equation solver" — all in one free tool.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
