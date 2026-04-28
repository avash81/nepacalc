import { calcMeta } from '@/lib/calcMeta';
import WeightCalculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Weight Converter | Kilograms, Pounds & Tolas Online Nepal NepaCalc",
  description: "Convert between kg, lbs, grams, and traditional Nepal weight units instantly. Professional weight conversion tool for commerce and home use.",
  slug: 'weight-converter',
  keywords: ["weight converter nepal", "convert kg to lbs", "gram to kg calculator", "tola to gram converter", "mass converter tool", "measurement tool nepal"],
});

const WEIGHT_FAQS = [
  {
    question: "What units of weight are used in Nepal?",
    answer: "Nepal uses the Metric system (grams, kilograms) for official use. However, traditional units like Dharni (approx 2.39kg) and Pau (250g) are still common in local vegetable markets."
  },
  {
    question: "How many pounds are in a kilogram?",
    answer: "One kilogram is approximately equal to 2.20462 pounds. Our converter uses high-precision decimals for commercial-grade accuracy."
  },
  {
    question: "Difference between Kilogram and Metric Ton?",
    answer: "One metric ton equals exactly 1,000 kilograms. This is used for measuring bulk commodities like cement and grains in Nepal's trade."
  },
  {
    question: "How do I convert Grams to Ounces?",
    answer: "Multiply the number of grams by 0.03527. Our tool automates this for cooking, jewelry, and postage calculations."
  },
  {
    question: "Is this accurate for gold weighing?",
    answer: "While our tool is highly precise, gold in Nepal is measured in Tolas (approx 11.66g). For jewelry, we recommend our dedicated 'Gold Converter' tool for maximum precision."
  }
];

export default function Page() {
  return (
    <WeightCalculator />
  );
}
