import { calcMeta } from '@/lib/calcMeta';
import WeightCalculator from './Calculator';

export const metadata = calcMeta({
  title: "Weight Converter: Kg to Tola, Grams & Pounds",
  description: "Convert kilograms, grams, pounds, ounces and Nepal-standard tola with an online weight converter. View common conversions and estimate gold value per tola.",
  slug: 'weight-converter',
  keywords: ["weight converter nepal", "convert kg to lbs", "gram to kg calculator", "tola to gram converter", "mass converter tool", "measurement tool nepal"],
});

export default function Page() {
  return (
    <WeightCalculator />
  );
}
