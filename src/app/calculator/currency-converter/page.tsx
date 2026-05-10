import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Currency Exchange Rate Calculator Nepal | USD to NPR NepaCalc",
  description: "Live foreign exchange rates for Nepal. Convert USD, EUR, INR, GBP, AUD, and more to Nepalese Rupees (NPR). Pegged to NRB rates.",
  slug: 'currency-converter',
  keywords: ["currency converter nepal", "usd to npr", "inr to npr", "aud to npr", "foreign exchange rate nepal", "nrb exchange rate today", "money converter nepal"],
});
export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

