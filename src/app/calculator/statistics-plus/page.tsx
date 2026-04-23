import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Statistics Plus | Mean, Median, Mode & Range Nepal NepaCal",
  description: "Calculate descriptive statistics instantly. Find the mean, median, mode, and range for any dataset with our professional math tool for students in Nepal.",
  slug: 'statistics-plus',
  keywords: ["statistics calculator nepal", "calculate mean median mode", "descriptive statistics tool", "range calculator", "average calculator nepal", "math solver"],
});

const STATS_PLUS_FAQS = [
  {
    question: "What are the measures of Central Tendency?",
    answer: "They include Mean (average), Median (middle value), and Mode (most frequent value). Together, they describe the 'center' of a dataset."
  },
  {
    question: "When should I use the Median instead of the Mean?",
    answer: "The median is better when a dataset has outliers (extreme values), as the mean can be heavily skewed. For example, median income often gives a more realistic picture than mean income."
  },
  {
    question: "What is 'Range' in statistics?",
    answer: "The range is the difference between the highest and lowest values in a dataset. It is the simplest measure of statistical dispersion."
  },
  {
    question: "What is the difference between Discrete and Continuous data?",
    answer: "Discrete data consists of distinct, countable values (e.g., number of students), while continuous data can take any value within a range (e.g., height or temperature)."
  },
  {
    question: "Does this calculator provide a full descriptive analysis?",
    answer: "Yes. Our engine calculates mean, median, mode, range, and sum, providing a comprehensive statistical snapshot of any provided dataset in Nepal."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Descriptive Statistics Suite"
        description="Comprehensive analytical engine for calculating measures of central tendency and dispersion for any numerical dataset."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Statistics Plus' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Standard Deviation', slug: 'standard-deviation' },
          { name: 'Z-Score Calc', slug: 'z-score' },
          { name: 'Percentage Calc', slug: 'percentage' }
        ]}
        formula="Statistical Descriptive Logic"
      >
        <Calculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-slate-900 text-white px-6 py-3 rounded-2xl inline-block shadow-lg">
              Analytical Guide: Descriptive Statistics
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                Descriptive statistics are the <strong>foundation of data interpretation</strong>, allowing us to summarize complex datasets into meaningful insights.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Analytical Suite</strong> provides a detailed snapshot of your data's characteristics. Whether you are a student in Nepal summarizing research findings or a business analyst reviewing <strong>sales distributions</strong>, our engine computes the mean, median, mode, and range with absolute accuracy, ensuring your analysis is grounded in mathematical truth.
              </p>
            </div>

            <PillarFAQ faqs={STATS_PLUS_FAQS} title="Descriptive Statistics FAQ" />
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
