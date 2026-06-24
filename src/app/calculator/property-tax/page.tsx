import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Nepal Property Tax & CGT Calculator 2083/84 | NepaCalc",
  description: "Calculate Capital Gains Tax (CGT) on property sales and annual property tax in Nepal for FY 2083/84. Covers 5% vs 7.5% CGT rates and local wada taxes.",
  slug: 'property-tax',
  keywords: ["property tax calculator nepal 2083", "capital gains tax nepal", "house sale tax nepal", "nepal real estate tax", "malpot tax calculator"],
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

