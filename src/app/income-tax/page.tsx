import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: 'Nepal Income Tax Guide & Calculators',
  description: 'Complete hub for Nepal income tax 2083/84. Access the salary tax calculator, view the latest tax slabs, and learn how to calculate your income tax in Nepal.',
  slug: 'income-tax',
});

export default function IncomeTaxHubPage() {
  return (
    <div className="bg-[#F1F3F4] min-h-screen py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-slate-900 mb-8">Nepal Income Tax 2083/84 Hub</h1>
        
        <p className="text-lg text-slate-700 mb-10 max-w-3xl">
          Everything you need to know about income tax in Nepal for the fiscal year 2083/84. Choose from our tools, slab references, or step-by-step guides.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/calculator/nepal-income-tax/" className="block bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Income Tax Calculator Nepal</h2>
            <p className="text-slate-600 text-sm">Calculate your exact income tax, SSF waiver, and EPF deductions instantly.</p>
          </Link>
          
          <Link href="/income-tax/nepal-income-tax-slab-2083-84/" className="block bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📋</div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Nepal Income Tax Slab 2083/84</h2>
            <p className="text-slate-600 text-sm">View the latest tax brackets for single and married filers, plus allowable deductions.</p>
          </Link>

          <Link href="/income-tax/how-to-calculate-income-tax-nepal/" className="block bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🧠</div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">How to Calculate Income Tax</h2>
            <p className="text-slate-600 text-sm">Learn the step-by-step process of calculating your income tax manually with examples.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
