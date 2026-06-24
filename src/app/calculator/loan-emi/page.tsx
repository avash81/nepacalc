import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Loan EMI Calculator Nepal 2083/84 | Home Car Personal | NepaCalc",
  description: "Calculate EMI for home, car and personal loans in Nepal. Full amortization schedule, total interest payable, NRB base rate context. Reducing balance method.",
  slug: 'loan-emi',
  keywords: ["emi calculator nepal", "loan emi nepal", "bank emi calculator nepal", "home loan emi calculator"],
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

