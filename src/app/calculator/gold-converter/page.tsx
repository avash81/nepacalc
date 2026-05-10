import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Gold Rate Calculator Nepal | Tola to Gram Converter NepaCalc",
  description: "Calculate live gold and silver prices in Nepal. Convert Tola, Lal to Grams. Add making charges (Jarti) to estimate final jewelry valuation.",
  slug: 'gold-converter',
  canonical: '/market-rates/live-gold-price/',
  keywords: ["gold rate calculator nepal", "tola to gram converter", "live gold price nepal", "fenegosida gold rate", "jewelry valuation nepal", "gold calculator with making charges"],
});
export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

