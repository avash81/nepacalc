import { calcMeta } from '@/lib/calcMeta';
import RomanCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Roman Numerals Converter | Date & Number Translator Nepal NepaCal",
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
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Roman Numeral Engine"
        description="Classical numbering tool for converting between modern Arabic digits and traditional Roman alphanumeric systems with absolute accuracy."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Roman Numerals' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Unit Converter', slug: 'unit-converter' },
          { name: 'Number to Words', slug: 'number-to-words' },
          { name: 'Simple Calculator', slug: 'simple-calculator' }
        ]}
        formula="Additive/Subtractive Roman Logic"
      >
        <RomanCalculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-slate-900 text-white px-6 py-3 rounded-2xl inline-block shadow-lg">
              Historical Guide: Roman Numbering
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                The <strong>Roman numeral system</strong> is an ancient numbering method that remains a staple of formal design, historical dating, and academic categorization.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Chronological Translation Laboratory</strong> provides an intuitive way to map these classical symbols to modern digits. Whether you are a student in Nepal decoding <strong>historical inscriptions</strong> or a designer creating formal certificates, our engine applies rigorous additive and subtractive logic to provide instant, error-free conversions for any valid numerical range.
              </p>
            </div>

            <PillarFAQ faqs={ROMAN_FAQS} title="Roman Numerals & History FAQ" />
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
