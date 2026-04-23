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
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Numerical Rounding Engine"
        description="High-precision mathematical tool for rounding numbers to any decimal place or significant figure using standardized academic protocols."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Rounding Calculator' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Decimal to Fraction', slug: 'decimal-to-fraction' },
          { name: 'Significant Figures', slug: 'significant-figures' },
          { name: 'Simple Calculator', slug: 'simple-calculator' }
        ]}
        formula="Round Half-Up [Mathematical Standard]"
      >
        <Calculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-slate-900 text-white px-6 py-3 rounded-2xl inline-block shadow-lg">
              Precision Guide: Numerical Rounding
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                In <strong>mathematics and data analysis</strong>, maintaining the correct level of precision is vital for the integrity of your results.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Numerical Precision Laboratory</strong> provides a robust interface for managing decimal approximations. Whether you are a student in Nepal simplifying physics problems or a professional preparing <strong>financial statements</strong>, our engine applies standard rounding laws with absolute consistency, ensuring your data is both accurate and presentation-ready.
              </p>
            </div>

            <PillarFAQ faqs={ROUNDING_FAQS} title="Rounding & Precision FAQ" />
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
