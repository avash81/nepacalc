import { calcMeta } from '@/lib/calcMeta';
import SimpleCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Simple Calculator | Online Basic Arithmetic Tool Nepal NepaCal",
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
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Standard Arithmetic Engine"
        description="Low-latency mathematical interface for rapid addition, subtraction, and multi-step basic arithmetic calculations."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Simple Calc' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Scientific Calc', slug: 'scientific-calculator' },
          { name: 'Percentage Calc', slug: 'percentage' },
          { name: 'Discount Calc', slug: 'discount-calculator' }
        ]}
        formula="Basic Arithmetic [BODMAS Logic]"
      >
        <SimpleCalculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-slate-900 text-white px-6 py-3 rounded-2xl inline-block shadow-lg">
              Utility Guide: Standard Arithmetic
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                Sometimes, the most powerful tool is the <strong>simplest one</strong>. Whether you are balancing daily expenses or double-checking a retail invoice, a reliable basic calculator is an essential utility.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Standard Calculation Laboratory</strong> provides a clean, distraction-free environment for your daily arithmetic. Designed to follow the <strong>BODMAS order of operations</strong>, our engine ensures that even simple equations are handled with the same rigor and precision as our most advanced engineering tools.
              </p>
            </div>

            <PillarFAQ faqs={SIMPLE_FAQS} title="Basic Arithmetic & Usage FAQ" />
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
