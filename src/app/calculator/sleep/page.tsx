import { calcMeta } from '@/lib/calcMeta';
import SleepCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Sleep Calculator | Optimal Wake-Up Time & REM Cycles Nepal NepaCalc",
  description: "Calculate the best time to wake up or go to bed using 90-minute sleep cycles. Improve your sleep quality and feel refreshed every morning.",
  slug: 'sleep',
  keywords: ["sleep calculator nepal", "sleep cycle calculator", "best time to wake up", "90 minute sleep cycles", "bedtime calculator", "improve sleep quality"],
});

const SLEEP_FAQS = [
  {
    question: "How many hours of sleep do I really need?",
    answer: "Most adults need 7-9 hours of quality sleep. Children and teens require more (9-11 hours) for healthy brain development and physical growth."
  },
  {
    question: "What are 'Sleep Cycles'?",
    answer: "A typical cycle lasts 90 minutes, consisting of light, deep, and REM sleep. Waking up at the end of a cycle makes you feel significantly more refreshed."
  },
  {
    question: "Can I catch up on sleep during the weekend?",
    answer: "While you can recover some 'sleep debt', it doesn't fully reverse the cognitive and heart risks of chronic deprivation during the week."
  },
  {
    question: "Why do I feel tired even after 8 hours of sleep?",
    answer: "Quality matters as much as quantity. Factors like caffeine, blue light exposure, and disruptions like sleep apnea can lower the restorative value of your rest."
  },
  {
    question: "What is the best time to wake up?",
    answer: "The best time is at the end of a 90-minute sleep cycle. Our calculator finds these 'golden windows' based on when you plan to go to bed."
  }
];

export default function Page() {
  return (
    <SleepCalculator />
  );
}
