import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "NEA Bill Calculator 2083/84 Nepal - Calculate Electricity Bill Online",
  description: "Calculate your NEA electricity bill online using the latest 2083/84 tariff rates. Get accurate unit charges, service charges, VAT and full bill breakdown instantly.",
  slug: 'nea-bill',
  keywords: [
    "NEA Bill Calculator",
    "NEA Electricity Bill Calculator",
    "Electricity Bill Calculator Nepal",
    "Nepal Electricity Bill Calculator",
    "NEA Bill Calculator 2083",
    "NEA Tariff Rates 2083/84",
    "Electricity Unit Price in Nepal",
    "1 Unit Electricity Cost in Nepal"
  ],
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

