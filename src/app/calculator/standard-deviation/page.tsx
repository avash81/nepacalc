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
    <Calculator />
  );
}
