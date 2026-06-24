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
      <>
      <Calculator />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 text-slate-800 prose prose-slate max-w-none">
          <h2 className="text-xl font-bold mb-4">Related Calculators</h2>
          <ul className="list-disc pl-6 space-y-2 text-blue-600">
            <li><Link href="/calculator/nepal-vehicle-tax/" className="hover:underline text-blue-600">Road Tax Calculator Nepal</Link></li>
          </ul>
        </div>
      </div>
    </>
    </div>
  );
}

