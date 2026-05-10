import { calcMeta } from '@/lib/calcMeta';
import NumberToWordsCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Number to Words Converter | Lakh & Crore Cheque Writer Nepal NepaCalc",
  description: "Convert numbers to words instantly using the South Asian (Lakh/Crore) or International (Million/Billion) system. Perfect for writing cheques in Nepal.",
  slug: 'number-to-words',
  keywords: ["number to words converter nepal", "lakh crore converter", "cheque writing tool", "convert digits to words", "south asian numbering system", "nepal financial tools"],
});

const WORDS_FAQS = [
  {
    question: "Does the calculator support the Lakh and Crore system?",
    answer: "Yes. Our engine is optimized for the South Asian numbering system (Nepal/India), correctly placing commas at Lakh and Crore intervals rather than just Millions and Billions."
  },
  {
    question: "How do I write large numbers on a cheque in Nepal?",
    answer: "On a cheque, you should write the amount in words followed by 'Only'. For example: 'NPR One Lakh Fifty Thousand Only'."
  },
  {
    question: "Can I convert decimals to words?",
    answer: "Yes. Our tool handles fractional values and decimals, converting them into the 'Point' or 'Paisa' equivalent for legal and financial precision."
  },
  {
    question: "Is there a limit to how large the number can be?",
    answer: "Our engine can process numbers up to 15 digits (up to Nil or Quadrillions), ensuring it covers all common government and corporate financial scales."
  },
  {
    question: "Why use words instead of digits in legal documents?",
    answer: "Writing numbers in words prevents fraudulent alterations of digits (like adding a zero) on cheques and legal contracts in Nepal."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        hideHeader={true}
        title="Numerical Verbiage Engine"
        description="High-precision linguistic tool for converting complex digits into formal words using both regional and international numbering standards."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Number to Words' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Unit Converter', slug: 'unit-converter' },
          { name: 'Currency Converter', slug: 'currency-converter' },
          { name: 'Decimal to Fraction', slug: 'decimal-to-fraction' }
        ]}
        formula="Linguistic Translation Logic"
      >
        <NumberToWordsCalculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-white border border-[#dadce0] text-[#202124] px-6 py-3 rounded-2xl inline-block shadow-sm">
              Financial Guide: Writing Numbers in Words
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                In the financial and legal sectors of Nepal, <strong>verbal representation of numbers</strong> is a critical security measure for preventing fraud in documents and cheques.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Numerical Analysis Laboratory</strong> provides a robust interface for converting digits into formal English or Nepali context words. Whether you are writing an <strong>NPR Lakhs cheque</strong> or drafting a complex contract requiring quadrillion-scale accuracy, our engine ensures that your numerical data is translated into words with 100% linguistic and mathematical consistency.
              </p>
            </div>

            <PillarFAQ faqs={WORDS_FAQS} title="Numbering Systems & Usage FAQ" />
          </div>
        </div>
      </CalcWrapper>    </div>
  );
}

