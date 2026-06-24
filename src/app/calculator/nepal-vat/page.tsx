import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal VAT Calculator 2083/84 | 13% VAT Inclusive & Exclusive | NepaCalc",
  description: "Calculate 13% VAT in Nepal for FY 2083/84. Add or remove VAT from any amount. IRD-compliant VAT inclusive and exclusive calculations for businesses and consumers.",
  slug: 'nepal-vat',
  keywords: ["nepal vat calculator", "13 percent vat nepal", "vat calculator 2083", "ird nepal vat", "vat inclusive exclusive nepal"],
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
            <li><Link href="/calculator/nepal-vehicle-tax/" className="hover:underline text-blue-600">Vehicle Tax Calculator Nepal</Link></li>
          </ul>
        </div>
      </div>
    </>
    </div>
  );
}

