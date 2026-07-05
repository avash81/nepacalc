import { calcMeta } from '@/lib/calcMeta';
import SimpleCalculator from './Calculator';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = calcMeta({
  title: "Simple Calculator | Online Basic Arithmetic Tool Nepal NepaCalc",
  description: "Free online simple calculator for addition, subtraction, multiplication, and division. Fast, responsive basic math tool for daily calculations in Nepal.",
  slug: 'simple-calculator',
  keywords: ["simple calculator nepal", "online basic calculator", "arithmetic calculator", "free math tool", "quick calculation nepal", "keyboard shortcut calculator"],
});

const SIMPLE_CALC_FAQS = [
  {
    question: "What makes this calculator different from Google's built-in calculator?",
    answer: "NepaCalc's simple calculator offers keyboard shortcut support, a full calculation history panel, memory functions (M+, M-, MR), and a larger display optimized for readability. It also works fully offline once loaded, with no tracking or data collection."
  },
  {
    question: "What basic functions are supported?",
    answer: "Our simple calculator supports addition (+), subtraction (-), multiplication (×), division (÷), percentage (%), decimal inputs, and memory functions (M+, M-, MR). All operations use high-precision arithmetic to avoid floating-point rounding errors."
  },
  {
    question: "Can I use my physical computer keyboard?",
    answer: "Yes. The interface is fully keyboard-mapped. Use number keys (0-9), operator keys (+, -, *, /), Enter or = for result, Backspace to delete, and Escape to clear. The numpad is also fully supported for faster input."
  },
  {
    question: "Does it handle very large numbers accurately?",
    answer: "Yes. Our engine uses high-precision floating-point arithmetic, ensuring accuracy even for calculations involving millions or billions. For extremely large scientific numbers, consider using our Scientific Calculator."
  },
  {
    question: "Is my calculation history saved?",
    answer: "For security and privacy, all calculations are processed locally in your browser and are never transmitted to our servers. Your recent calculation history is saved temporarily in your browser's local storage."
  },
  {
    question: "What is the percentage button (%) used for?",
    answer: "The % button converts the current displayed number to its decimal equivalent. For instance, entering 50 and pressing % gives 0.5. In a running calculation like 200 × 15%, it will calculate 200 × 0.15 = 30, making percentage-based discounts and tips very easy."
  }
];

export default function Page() {
  return (
    <>
      <JsonLd
        type="unified"
        name="Simple Calculator"
        description="Free online simple calculator for addition, subtraction, multiplication, and division. Fast, responsive basic math tool for daily calculations in Nepal."
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
