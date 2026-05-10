import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Probability Calculator | Odds & Statistical Likelihood Nepal NepaCalc",
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
    <Calculator />
  );
}

