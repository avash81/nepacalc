import { calcMeta } from '@/lib/calcMeta';
import SimpleCalculator from './Calculator';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "Simple Online Calculator | Free Basic Arithmetic Tool – NepaCalc",
  description: "Free online simple calculator for addition, subtraction, multiplication, and division. Fast, responsive basic math tool with keyboard support for daily calculations in Nepal.",
  slug: 'simple-calculator',
  keywords: ["simple calculator", "basic calculator online", "arithmetic calculator", "easy calculator", "free math tool nepal", "keyboard calculator"],
});

const SIMPLE_CALC_FAQS = [
  {
    question: "What basic operations are supported?",
    answer: "Our simple calculator supports addition (+), subtraction (−), multiplication (×), division (÷), percentage (%), and decimal inputs. All calculations use clean precision arithmetic to avoid binary rounding glitches."
  },
  {
    question: "Can I use my physical computer keyboard?",
    answer: "Yes. The interface is fully keyboard-mapped. Use number keys (0-9), operator keys (+, -, *, /), Enter or = for result, Backspace to delete the last digit, and Escape to clear all."
  },
  {
    question: "How does the percentage button (%) work?",
    answer: "The % button converts the current displayed number to its decimal percentage equivalent (dividing by 100). For instance, typing 50 and pressing % gives 0.5. To calculate 15% of 200: type 200 × 15 % = 30."
  },
  {
    question: "Does this calculator save my data or require login?",
    answer: "No. All calculations run 100% locally in your browser. No account is required, no information is sent to external servers, and it works completely offline once loaded."
  },
  {
    question: "Does it follow BODMAS order of operations?",
    answer: "Yes. Multiplications and divisions are evaluated before additions and subtractions, so chained expressions give mathematically accurate answers."
  }
];

export default function Page() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Simple Online Calculator"
        description="Free online simple calculator for addition, subtraction, multiplication, and division. Fast, responsive basic math tool for daily calculations."
        url="https://nepacalc.com/calculator/simple-calculator/"
        category="UtilityApplication"
        breadcrumbItems={[
          { name: 'Home', item: 'https://nepacalc.com' },
          { name: 'Math Tools', item: 'https://nepacalc.com/math-tools/' },
          { name: 'Simple Calculator', item: 'https://nepacalc.com/calculator/simple-calculator/' }
        ]}
        faqs={SIMPLE_CALC_FAQS}
      />
      <SimpleCalculator />
    </>
  );
}
