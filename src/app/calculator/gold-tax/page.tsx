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
      {/* Bidirectional SEO Link — back to authority page */}
      <div className="max-w-3xl mx-auto px-4 py-6 text-center">
        <p className="text-[12px] text-slate-500 font-medium">
          Check today&apos;s official rate:{' '}
          <a href="/market-rates/live-gold-price/" className="text-amber-700 font-bold underline hover:text-amber-900">
            Live Gold Price in Nepal Today (FENEGOSIDA)
          </a>
        </p>
      </div>
    </div>
  );
}
