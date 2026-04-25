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
    <Calculator />
  );
}
