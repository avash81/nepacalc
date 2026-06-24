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
      
      <Calculator />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg text-slate-700"><strong>Tip:</strong> Similar to property registration, vehicle ownership requires tax clearance. Estimate your costs with the <Link href="/calculator/nepal-vehicle-tax/" className="text-blue-600 hover:underline">Vehicle Tax Calculator Nepal</Link>.</p>
      </div>

      
    </div>
  );
}

