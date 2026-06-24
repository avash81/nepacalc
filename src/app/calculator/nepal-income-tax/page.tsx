import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Income Tax Calculator 2083/84 | IRD Slabs | NepaCalc",
  description: "Calculate Nepal income tax for FY 2083/84. IRD-verified slabs, SSF waiver, EPF/CIT deductions, female 10% rebate. Instant slab-wise result — no signup.",
  slug: 'nepal-income-tax',
  keywords: ["nepal income tax calculator 2083/84", "ird tax calculator", "income tax slab nepal 2083", "salary tax calculator nepal"],
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

