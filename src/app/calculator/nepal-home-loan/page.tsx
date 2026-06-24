import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Nepal Home Loan EMI Calculator 2083/84 | NRB Base Rate | NepaCalc",
  description: "Calculate home loan EMI in Nepal for FY 2083/84. Using NRB-mandated 'Base Rate + Premium' model with latest bank rates and mortgage rules.",
  slug: 'nepal-home-loan',
  keywords: ["home loan nepal 2083", "emi calculator nepal", "nrb base rate 2083", "nepal bank interest rates", "housing loan calculator kathmandu"],
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

