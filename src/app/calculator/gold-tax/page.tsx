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
      {/* SEO Links — precious metals cluster */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <p className="text-[13px] text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed mb-4">
          Import duties are calculated separately from the daily bullion value, so always verify the <a href="/market-rates/live-gold-price/" className="text-blue-700 font-bold underline hover:text-blue-900">official gold rate</a> before estimating taxes.
        </p>
        <p className="text-[13px] text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed mb-4">
          Understanding the precise customs duty on precious metals is essential for anyone returning to Nepal from abroad with jewelry or raw bullion, as allowances are strictly enforced at the airport.
        </p>
        <p className="text-[13px] text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          If your jewellery weight is in Lal, Aana or Grams, convert it first using our <a href="/calculator/gold-converter/" className="text-blue-700 font-bold underline hover:text-blue-900">Gold Weight Converter</a>.
        </p>
      </div>
    </div>
  );
}
