import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Rounding Calculator | Round Off Decimals & Significant Figures Nepal NepaCal",
  description: "Round any number to the nearest whole, tenth, hundredth, or specified decimal place instantly. Professional precision tool for students in Nepal.",
  slug: 'rounding',
  keywords: ["rounding calculator nepal", "round off numbers", "round to nearest tenth", "significant figures calculator", "math precision tool", "decimal rounding calculator"],
});

const ROUNDING_FAQS = [
  {
    question: "What are the basic rules for rounding?",
    answer: "The general rule is: if the digit after the rounding point is 5 or greater, round up. If it is 4 or less, keep the digit the same (round down)."
  },
  {
    question: "How do I round to the nearest tenth or hundredth?",
    answer: "To round to the nearest tenth, look at the hundredths digit. To round to the nearest hundredth, look at the thousandths digit, and apply the standard rounding rule."
  },
  {
    question: "What is 'Rounding to Significant Figures'?",
    answer: "Significant figures represent the digits in a number that carry meaningful information. Rounding to them ensures your result doesn't imply more precision than the data supports."
  },
  {
    question: "Why is rounding important in accounting and science?",
    answer: "In accounting, rounding ensures currency balances align. In science, it prevents 'false precision' in experimental results, adhering to the limits of measurement tools."
  },
  {
    question: "Does this calculator support 'Banker's Rounding'?",
    answer: "Our standard engine uses the common 'Half Up' method, which is the academic standard in Nepal. For specific engineering needs, we provide high-precision decimal controls."
  }
];

export default function Page() {
  return (
    <Calculator />
  );
}
