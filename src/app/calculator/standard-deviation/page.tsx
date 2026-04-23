import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Standard Deviation Calculator | Variance & Mean Analysis Nepal NepaCal",
  description: "Calculate standard deviation, variance, and mean for any dataset instantly. Professional statistical tool for research and data analysis in Nepal.",
  slug: 'standard-deviation',
  keywords: ["standard deviation calculator nepal", "calculate variance online", "mean and SD calculator", "population standard deviation", "sample standard deviation", "statistics tool nepal"],
});

const STATS_FAQS = [
  {
    question: "What is Standard Deviation?",
    answer: "Standard deviation is a measure of the amount of variation or dispersion in a set of values. A low value indicates that data points tend to be close to the mean."
  },
  {
    question: "Difference between Population and Sample SD?",
    answer: "Population SD is used for entire datasets, while Sample SD is used for subsets. Sample SD uses N-1 in the denominator for an unbiased estimate."
  },
  {
    question: "How is 'Variance' related to standard deviation?",
    answer: "Variance is the average of the squared differences from the Mean. Standard deviation is simply the square root of the variance."
  },
  {
    question: "What does a high standard deviation tell me?",
    answer: "A high standard deviation indicates that the data points are spread out over a wider range of values, suggesting higher volatility in the dataset."
  },
  {
    question: "Can I calculate SD for any number of inputs?",
    answer: "Yes. Our statistical engine allows you to input any sequence of numbers to get instant results for mean, variance, and standard deviation."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Statistical Variance Engine"
        description="Professional data analysis tool for calculating mean, variance, and standard deviation for both population and sample datasets."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Standard Deviation' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Z-Score Calc', slug: 'z-score' },
          { name: 'Probability Calc', slug: 'probability' },
          { name: 'Scientific Calc', slug: 'scientific-calculator' }
        ]}
        formula="σ = √[Σ(x - μ)² / N] [Population SD]"
      >
        <Calculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-slate-900 text-white px-6 py-3 rounded-2xl inline-block shadow-lg">
              Statistical Guide: Variance Analysis
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                In <strong>data science and academic research</strong>, understanding the spread of your data is just as important as knowing the average.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Statistical Analysis Laboratory</strong> provides the precision required for rigorous data interpretation. Whether you are a student in Nepal analyzing survey results or a researcher tracking <strong>market volatility</strong>, our engine handles both population and sample standard deviations with industrial-grade accuracy, providing a clear window into your data's consistency.
              </p>
            </div>

            <PillarFAQ faqs={STATS_FAQS} title="Statistics & Data Analysis FAQ" />
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
