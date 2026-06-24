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
      
      <Calculator />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg text-slate-700"><strong>Tip:</strong> Aside from income tax, vehicle owners should also account for annual road taxes. Use the <Link href="/calculator/nepal-vehicle-tax/" className="text-blue-600 hover:underline">Vehicle Tax Calculator Nepal</Link> to calculate your dues.</p>
      </div>

      
    </div>
  );
}

