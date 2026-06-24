import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal TDS Calculator 2083/84 | Tax Deducted at Source NepaCalc",
  description: "Calculate TDS for rent, consultancy, interest, and dividends in Nepal. Updated with latest IRD tax rates and VAT service rules for 2083/84.",
  slug: 'nepal-tds',
  keywords: ["nepal tds calculator", "tax deducted at source nepal", "rent tax nepal", "consultancy tds nepal", "ird tds rates 2083", "tds on dividend nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      
      <Calculator />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg text-slate-700"><strong>Tip:</strong> If you are calculating taxes, you might also need the <Link href="/calculator/nepal-vehicle-tax/" className="text-blue-600 hover:underline">Road Tax Calculator Nepal</Link> for your personal or commercial vehicles.</p>
      </div>

      
    </div>
  );
}

