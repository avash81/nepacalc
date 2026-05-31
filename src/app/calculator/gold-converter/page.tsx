import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Gold Price Calculator Nepal 2082/83 | Tola, Lal & Gram Converter | NepaCalc",
  description: "Convert gold between Tola, Lal, and Grams at today's live Nepal gold rates (2082/83). FENEGOSIDA verified prices. Calculate 24K, 22K, and 18K gold values instantly.",
  slug: 'gold-converter',
  canonical: '/market-rates/live-gold-price/',
  keywords: ["gold converter nepal", "tola to gram nepal", "1 tola gold price nepal today", "gold price 2083", "gold lal gram converter", "suvarna nepal"],
});
export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

