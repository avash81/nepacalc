import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Probability Calculator | Odds & Statistical Likelihood Nepal NepaCal",
  description: "Calculate the probability of independent and dependent events instantly. Convert odds to percentages and solve complex statistical problems in Nepal.",
  slug: 'probability',
  keywords: ["probability calculator nepal", "calculate odds", "statistical probability tool", "independent events calculator", "theoretical probability nepal", "math solver"],
});

const PROBABILITY_FAQS = [
  {
    question: "What is the difference between Theoretical and Experimental Probability?",
    answer: "Theoretical probability is based on reasoning (e.g., a 1/6 chance of rolling a 4 on a die), while experimental probability is based on the actual results of trials or experiments."
  },
  {
    question: "How do I calculate the probability of multiple independent events?",
    answer: "Multiply the probabilities of each individual event. For example, the probability of flipping two heads in a row is 1/2 × 1/2 = 1/4 (25%)."
  },
  {
    question: "What are 'Odds' and how do they differ from Probability?",
    answer: "Probability measures the ratio of favorable outcomes to total outcomes. Odds measure the ratio of favorable to unfavorable outcomes. A 20% probability equals 1:4 odds."
  },
  {
    question: "What is a 'Sample Space'?",
    answer: "The sample space is the set of all possible outcomes of a probability experiment. For a coin flip, the sample space is {Heads, Tails}."
  },
  {
    question: "Can probability be greater than 100%?",
    answer: "No. Probability always ranges from 0 (impossible) to 1 (certainty), often expressed as a percentage from 0% to 100%."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Probability Logic Engine"
        description="High-precision statistical engine for determining the likelihood of events and converting between odds, ratios, and percentages."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Probability' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Standard Deviation', slug: 'standard-deviation' },
          { name: 'Z-Score Calc', slug: 'z-score' },
          { name: 'Scientific Calc', slug: 'scientific-calculator' }
        ]}
        formula="P(A) = Favorable Outcomes / Total Outcomes"
      >
        <Calculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-slate-900 text-white px-6 py-3 rounded-2xl inline-block shadow-lg">
              Statistical Guide: Probability Theory
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                Understanding <strong>risk and likelihood</strong> is essential for data science, finance, and everyday decision-making. Probability provides the mathematical framework for quantifying uncertainty.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Probability Analysis Laboratory</strong> simplifies complex statistical queries. Whether you are a student in Nepal calculating independent event outcomes or a professional analyzing risk ratios, our engine provides instant conversions between <strong>odds, decimals, and percentages</strong> with absolute mathematical certainty.
              </p>
            </div>

            <PillarFAQ faqs={PROBABILITY_FAQS} title="Probability & Statistics FAQ" />
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
