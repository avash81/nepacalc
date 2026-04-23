import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Z-Score Calculator | Normal Distribution & Probability Nepal NepaCal",
  description: "Calculate Z-scores and find probabilities using the standard normal distribution. Professional statistical tool for students and researchers in Nepal.",
  slug: 'z-score',
  keywords: ["z-score calculator nepal", "calculate standard score", "normal distribution calculator", "p-value from z-score", "statistics tool nepal", "z-table calculator"],
});

const ZSCORE_FAQS = [
  {
    question: "What is a Z-Score?",
    answer: "A Z-score (or standard score) indicates how many standard deviations a data point is from the mean of its distribution. A Z-score of 0 is exactly at the mean."
  },
  {
    question: "How do I calculate a Z-score?",
    answer: "The formula is z = (x - μ) / σ, where 'x' is the value, 'μ' is the mean, and 'σ' is the standard deviation."
  },
  {
    question: "What does a negative Z-score mean?",
    answer: "A negative Z-score indicates that the data point is below the average. For example, a z = -1.5 means the value is 1.5 standard deviations less than the mean."
  },
  {
    question: "How is the Z-score used in Normal Distribution?",
    answer: "It is used to determine the probability (p-value) of an observation occurring within a standard normal distribution, often used in hypothesis testing in Nepal's academic research."
  },
  {
    question: "Is a high Z-score always better?",
    answer: "Not necessarily. In some contexts (like blood pressure or error rates), a lower Z-score is better. In others (like exam results), a higher Z-score indicates superior performance relative to the group."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Z-Score Normalization Engine"
        description="High-precision statistical tool for calculating standard scores and determining positioning within a normal distribution curve."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Z-Score Calc' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Standard Deviation', slug: 'standard-deviation' },
          { name: 'Probability Calc', slug: 'probability' },
          { name: 'Scientific Calc', slug: 'scientific-calculator' }
        ]}
        formula="z = (x - μ) / σ"
      >
        <Calculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-slate-900 text-white px-6 py-3 rounded-2xl inline-block shadow-lg">
              Statistical Guide: Data Normalization
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                In <strong>statistical analysis</strong>, comparing data from different distributions requires a common scale. The Z-score is the primary tool for this normalization.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Gaussian Analysis Laboratory</strong> allows researchers in Nepal to quickly determine the relative standing of any observation. By converting raw data into <strong>standardized scores</strong>, you can accurately assess outliers, calculate percentiles, and perform rigorous hypothesis testing with absolute mathematical certainty.
              </p>
            </div>

            <PillarFAQ faqs={ZSCORE_FAQS} title="Z-Scores & Normal Distribution FAQ" />
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
