import { calcMeta } from '@/lib/calcMeta';
import RomanCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Roman Numerals Converter | Date & Number Translator Nepal NepaCalc",
  description: "Convert numbers to Roman numerals and vice versa instantly. Fast, accurate translator for dates, chapters, and formal numbering in Nepal.",
  slug: 'roman-numerals',
  keywords: ["roman numerals converter nepal", "convert numbers to roman", "roman numeral date converter", "latin numbers tool", "math solver nepal", "roman numeral symbols"],
});

const ROMAN_FAQS = [
  {
    question: "What are the basic symbols of Roman Numerals?",
    answer: "The basic symbols are I (1), V (5), X (10), L (50), C (100), D (500), and M (1000)."
  },
  {
    question: "How does the subtraction rule work?",
    answer: "If a smaller numeral appears before a larger one, it is subtracted (e.g., IV = 4, IX = 9, XL = 40). Our converter handles these rules automatically."
  },
  {
    question: "Is there a Roman Numeral for Zero?",
    answer: "No. The Roman numeral system does not have a representation for zero. It was primarily used for counting and measuring physical quantities."
  },
  {
    question: "What is the largest number I can convert?",
    answer: "Standard Roman numerals go up to 3,999 (MMMCMXCIX). For numbers larger than 4,000, a bar (vinculum) is placed over the numeral to multiply it by 1,000."
  },
  {
    question: "Where are Roman numerals still used in Nepal today?",
    answer: "They are commonly used in clock faces, chapter titles in books, formal dates on monuments, and for denoting grades or classes in schools."
  }
];

export default function Page() {
  return (
    <RomanCalculator />
  );
}

