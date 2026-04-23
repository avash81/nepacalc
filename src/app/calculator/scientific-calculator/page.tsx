import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Scientific Calculator Online | Advanced Math & Trig Nepal NepaCal",
  description: "Professional online scientific calculator with trigonometry, logs, and power functions. Free, high-precision tool for students and engineers in Nepal.",
  slug: 'scientific-calculator',
  keywords: ["scientific calculator nepal", "online trig calculator", "logarithm calculator", "advanced math solver", "scientific notation calc", "ioe entrance math tool"],
});

const SCIENTIFIC_FAQS = [
  {
    question: "What advanced functions are supported by this calculator?",
    answer: "Our engine supports full trigonometry (sin, cos, tan), logarithmic functions (log, ln), exponents (x^y), square roots, and basic algebraic parsing."
  },
  {
    question: "How do I use trigonometric functions correctly?",
    answer: "You can toggle between Degree and Radian modes. Ensure your input matches the mode selected for accurate results in geometry and calculus."
  },
  {
    question: "Does it handle scientific notation?",
    answer: "Yes. The calculator can process and display results in E-notation (e.g., 1.2e+5), which is vital for physics and engineering constants."
  },
  {
    question: "What is the 'Order of Operations' followed?",
    answer: "Our expression parser strictly follows PEMDAS/BODMAS rules, correctly prioritizing parentheses and exponents over multiplication and addition."
  },
  {
    question: "Is this a suitable replacement for a physical calculator?",
    answer: "For study and home research, yes. It provides all standard functions found in high-end scientific calculators like the Casio FX-991EX."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Scientific Logic Suite"
        description="Industrial-grade mathematical engine for advanced algebraic, trigonometric, and logarithmic calculations with absolute precision."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Scientific' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Matrices', slug: 'matrices' },
          { name: 'Quadratic Solver', slug: 'quadratic-solver' },
          { name: 'Logarithm Calc', slug: 'logarithm-calculator' }
        ]}
        formula="y = f(x) [Scientific Notation Engine]"
      >
        <Calculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-slate-900 text-white px-6 py-3 rounded-2xl inline-block shadow-lg">
              Scientific Guide: Advanced Computing
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                Advanced mathematics requires more than simple arithmetic—it requires a <strong>robust computational framework</strong> that respects universal laws of priority and precision.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Advanced Computing Laboratory</strong> is built for the high-rigor environments of university-level science and engineering in Nepal. From <strong>trigonometric modeling</strong> to solving complex power series, our cloud-based engine provides a responsive, error-free alternative to traditional handheld scientific hardware.
              </p>
            </div>

            <PillarFAQ faqs={SCIENTIFIC_FAQS} title="Computing & Mathematics FAQ" />
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
