import { calcMeta } from '@/lib/calcMeta';
import QuadraticCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Quadratic Equation Solver | Roots & Discriminant Nepal NepaCalc",
  description: "Solve quadratic equations instantly. Find real and complex roots, calculate the discriminant, and see step-by-step solutions for ax² + bx + c = 0.",
  slug: 'quadratic-solver',
  keywords: ["quadratic equation solver nepal", "calculate roots of quadratic", "quadratic formula calculator", "discriminant calculator", "math solver nepal", "algebra tool"],
});

const QUADRATIC_FAQS = [
  {
    question: "How do I solve a quadratic equation?",
    answer: "A quadratic equation (ax² + bx + c = 0) is solved using the quadratic formula: x = [-b ± sqrt(b², 4ac)] / 2a. Our tool calculates both roots instantly."
  },
  {
    question: "What is the 'Discriminant' (D)?",
    answer: "The discriminant is b², 4ac. It determines the nature of the roots: D > 0 (two real roots), D = 0 (one real root), or D < 0 (two complex roots)."
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
    answer: "If the discriminant (b², 4ac) is less than zero, the equation has no real roots, only complex ones. Our calculator explicitly identifies this state."
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
        formula="Quadratic Formula: x = [-b ± √(b², 4ac)] / 2a"
      >
        <QuadraticCalculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-white border border-[#dadce0] text-[#202124] px-6 py-3 rounded-2xl inline-block shadow-sm">
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
    
    </div>
  );
}
