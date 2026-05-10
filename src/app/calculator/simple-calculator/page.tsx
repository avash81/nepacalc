import { calcMeta } from '@/lib/calcMeta';
import SimpleCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Simple Calculator | Online Basic Arithmetic Tool Nepal NepaCalc",
  description: "Free online simple calculator for addition, subtraction, multiplication, and division. Fast, responsive basic math tool for daily calculations in Nepal.",
  slug: 'simple-calculator',
  keywords: ["simple calculator nepal", "online basic calculator", "arithmetic calculator", "free math tool", "quick calculation nepal", "keyboard shortcut calculator"],
});

const SIMPLE_FAQS = [
  {
    question: "What basic functions are supported in this calculator?",
    answer: "Our simple calculator supports addition, subtraction, multiplication, division, and basic percentage operations, along with memory functions (M+, M-, MR)."
  },
  {
    question: "Is this calculator faster than mobile apps?",
    answer: "Our tool is optimized for low latency and high accessibility, making it the perfect fallback for quick calculations when you are already browsing on a desktop."
  },
  {
    question: "Does it handle very large numbers accurately?",
    answer: "Yes. Our engine uses high-precision floating-point arithmetic, ensuring accuracy even for calculations involving millions or billions."
  },
  {
    question: "Can I use physical keyboard shortcuts?",
    answer: "Absolutely. You can use your number pad and operation keys (+, -, *, /) to perform calculations rapidly without manual clicking."
  },
  {
    question: "Is my calculation history saved on the server?",
    answer: "For security and privacy, calculations are processed locally in your browser and are not stored on our servers."
  }
];

export default function Page() {
  return (
    <SimpleCalculator />
  );
}

