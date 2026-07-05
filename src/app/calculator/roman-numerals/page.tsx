import { calcMeta } from '@/lib/calcMeta';
import RomanCalculator from './Calculator';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "Roman Numerals Converter | Date & Number Translator Nepal NepaCalc",
  description: "Convert numbers to Roman numerals and vice versa instantly. Fast, accurate translator for dates, chapters, and formal numbering in Nepal.",
  slug: 'roman-numerals',
  keywords: ["roman numerals converter nepal", "convert numbers to roman", "roman numeral date converter", "latin numbers tool", "math solver nepal", "roman numeral symbols"],
});

const ROMAN_FAQS = [
  {
    question: "What are the basic symbols of Roman Numerals?",
    answer: "The seven basic Roman numeral symbols are I (1), V (5), X (10), L (50), C (100), D (500), and M (1000). All numbers up to 3,999 can be written by combining these symbols using addition and subtraction rules."
  },
  {
    question: "How does the subtraction rule in Roman numerals work?",
    answer: "If a smaller numeral appears immediately before a larger one, it is subtracted. For example, IV = 4 (5−1), IX = 9 (10−1), XL = 40 (50−10), XC = 90, CD = 400, CM = 900. Our converter applies all these rules automatically."
  },
  {
    question: "What is 2026 in Roman numerals?",
    answer: "2026 in Roman numerals is MMXXVI. This breaks down as MM (2000) + XX (20) + VI (6) = 2026."
  },
  {
    question: "Is there a Roman Numeral for Zero?",
    answer: "No. The Roman numeral system has no symbol for zero. It was designed for counting physical quantities where zero is not needed. The concept of zero was later developed by Indian mathematicians and spread through Arabic numerals."
  },
  {
    question: "What is the largest number that can be written in standard Roman numerals?",
    answer: "Standard Roman numerals go up to 3,999 (MMMCMXCIX). Beyond this, a vinculum (bar) is placed over a numeral to multiply it by 1,000, but this is rarely used in modern practice."
  },
  {
    question: "Where are Roman numerals still used in Nepal today?",
    answer: "Roman numerals remain common in Nepal on clock faces, chapter and section headings in academic books, formal dates carved on monuments and buildings, school grade levels (Grade I, II, III), and in legal documents for sub-sections."
  }
];

export default function Page() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Roman Numerals Converter"
        description="Convert numbers to Roman numerals and vice versa instantly. Fast, accurate translator for dates, chapters, and formal numbering."
        url="https://nepacalc.com/calculator/roman-numerals/"
        category="EducationalApplication"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Math Tools', item: 'https://nepacalc.com/math-tools/' },
          { name: 'Roman Numerals Converter', item: 'https://nepacalc.com/calculator/roman-numerals/' }
        ]}
        faqs={ROMAN_FAQS}
      />
      <RomanCalculator />
    </>
  );
}
