import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Scientific Calculator Online | Advanced Math & Trig Nepal NepaCalc",
  description: "Professional online scientific calculator with trigonometry, logs, and power functions. Free, high-precision tool for students and engineers in Nepal.",
  slug: 'scientific-calculator',
  keywords: ["scientific calculator nepal", "online trig calculator", "logarithm calculator", "advanced math solver", "scientific notation calc", "ioe entrance math tool"],
});

const SCIENTIFIC_FAQS = [
  {
    question: "What advanced functions are supported by this calculator?",
    answer: "Our engine supports full trigonometry (sin, cos, tan), logarithmic functions (log, ln), exponents (x^y), square roots, and basic algebraic parsing."
  },
  {
    question: "How do I use trigonometric functions correctly?",
    answer: "You can toggle between Degree and Radian modes. Ensure your input matches the mode selected for accurate results in geometry and calculus."
  },
  {
    question: "Does it handle scientific notation?",
    answer: "Yes. The calculator can process and display results in E-notation (e.g., 1.2e+5), which is vital for physics and engineering constants."
  },
  {
    question: "What is the 'Order of Operations' followed?",
    answer: "Our expression parser strictly follows PEMDAS/BODMAS rules, correctly prioritizing parentheses and exponents over multiplication and addition."
  },
  {
    question: "Is this a suitable replacement for a physical calculator?",
    answer: "For study and home research, yes. It provides all standard functions found in high-end scientific calculators like the Casio FX-991EX."
  }
];

export default function Page() {
  return (
    <Calculator />
  );
}
