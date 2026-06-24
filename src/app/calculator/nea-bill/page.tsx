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
      
      <Calculator />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg text-slate-700"><strong>Tip:</strong> If you own a vehicle, check our <Link href="/calculator/nepal-vehicle-tax/" className="text-blue-600 hover:underline">Vehicle Tax Calculator Nepal</Link> to estimate your annual road tax.</p>
      </div>

      
    </div>
  );
}

