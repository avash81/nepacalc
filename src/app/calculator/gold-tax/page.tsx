import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Gold Tax Calculator Nepal 2083/84 | VAT, Making Charges & Import Duty | NepaCalc",
  description: "Calculate total gold price in Nepal for 2083/84 including 13% VAT, making charges, and import customs duty. Covers 24K, 22K Hallmark gold. FENEGOSIDA rates.",
  slug: 'gold-tax',
  keywords: ["gold tax nepal", "gold vat nepal 2083", "gold import duty nepal", "gold price with tax nepal", "gold making charge calculator"],
});

export default function Page() {
  return (
    <div>
      <Calculator />
      {/* Bidirectional SEO Links — precious metals cluster */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4 text-center">Today's Precious Metal Rates</h2>
        <p className="text-[13px] text-slate-600 font-medium text-center max-w-2xl mx-auto leading-relaxed">
          Before calculating taxes or jewellery costs, always verify the latest official benchmark prices.
          <br /><br />
          View today&apos;s:<br />
          <br />
          • <a href="/market-rates/live-gold-price/" className="text-blue-700 font-bold underline hover:text-blue-900">Live Gold Price</a><br />
          <br />
          Need silver prices instead? Check today&apos;s <a href="/market-rates/live-silver-price/" className="text-blue-700 font-bold underline hover:text-blue-900">Live Silver Price in Nepal</a> before calculating jewellery value.
        </p>
      </div>
    </div>
  );
}
