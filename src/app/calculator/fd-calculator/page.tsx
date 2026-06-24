import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'Fixed Deposit (FD) Calculator Nepal 2083/84 | Maturity & Interest',
  description: 'Calculate FD maturity amount and quarterly interest returns for Nepal banks in FY 2083/84. Compounding interest logic as per NRB standards.',
  slug: 'fd-calculator',
  keywords: ["fd calculator nepal 2083", "fixed deposit maturity nepal", "nepal bank fd rates 2083", "fd interest calculator", "compound interest fd", "quarterly compounding nepal"],
});

export default function Page() { return <>
      <Calculator />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 text-slate-800 prose prose-slate max-w-none">
          <h2 className="text-xl font-bold mb-4">Related Calculators</h2>
          <ul className="list-disc pl-6 space-y-2 text-blue-600">
            <li><Link href="/calculator/nepal-vehicle-tax/" className="hover:underline text-blue-600">Vehicle Tax Calculator Nepal</Link></li>
          </ul>
        </div>
      </div>
    </>; }

