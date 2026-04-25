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
        </div>
  );
}
