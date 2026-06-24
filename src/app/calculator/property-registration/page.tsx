import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Property Registration Fee Calculator Nepal 2083/84 | Malpot Fee",
  description: "Calculate Malpot property registration fees and stamp duty in Nepal for FY 2083/84. Rural & Urban rates with 25-50% female rebate and joint ownership rules.",
  slug: 'property-registration',
  keywords: ["property registration fee nepal 2083", "malpot fee calculator", "lalpurja tax nepal", "female property discount nepal", "joint registration fee nepal", "land pass fee 2083"],
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

