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
        
        {/* Precious Metals Authority Links */}
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl max-w-2xl mx-auto mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-3">Explore Precious Metals</h3>
          <p className="text-[14px] text-slate-700 font-medium leading-relaxed mb-5">
            Beyond currency exchange rates, we also track precious metals. Check today's <Link href="/market-rates/live-gold-price/" className="text-blue-600 font-bold hover:underline">Live Gold Price</Link> and <Link href="/market-rates/live-silver-price/" className="text-blue-600 font-bold hover:underline">Live Silver Price</Link>. You can also convert weight and value instantly using our <Link href="/calculator/gold-converter/" className="text-blue-600 font-bold hover:underline">Gold Converter</Link> and <Link href="/calculator/silver-converter/" className="text-blue-600 font-bold hover:underline">Silver Converter</Link>.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/market-rates/live-gold-price/" className="px-4 py-2 text-[13px] bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
              Gold Price
            </Link>
            <Link href="/market-rates/live-silver-price/" className="px-4 py-2 text-[13px] bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
              Silver Price
            </Link>
            <Link href="/calculator/gold-converter/" className="px-4 py-2 text-[13px] bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
              Gold Converter
            </Link>
            <Link href="/calculator/silver-converter/" className="px-4 py-2 text-[13px] bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
              Silver Converter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

