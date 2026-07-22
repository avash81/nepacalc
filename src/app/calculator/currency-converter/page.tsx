import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

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
      <div className="max-w-3xl mx-auto px-4 py-6">
        <p className="text-[13px] text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed mb-4">
          If you are sending money to Nepal, compare today&apos;s live exchange rates across providers on the <a href="/market-rates/remittance/" className="text-blue-700 font-bold underline hover:text-blue-900">Remittance Board</a>.
        </p>
        <p className="text-[13px] text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed mb-8">
          For the official NRB buying and selling rates, view the full <a href="/market-rates/exchange-rate-nepal/" className="text-blue-700 font-bold underline hover:text-blue-900">Exchange Rate Nepal</a> dashboard.
        </p>
        
        
      </div>
    </div>
  );
}

