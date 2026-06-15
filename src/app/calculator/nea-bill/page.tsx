import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "NEA Electricity Bill Calculator Nepal (2083/84 Tariff Rates)",
  description: "Calculate your NEA electricity bill online using the latest 2083/84 tariff rates. Check unit costs, demand charges, VAT, and bill breakdown instantly.",
  slug: 'nea-bill',
  keywords: [
    "NEA electricity bill calculator",
    "electricity bill calculator Nepal",
    "Nepal Electricity Authority bill",
    "nea tariff rates 2083",
    "electricity unit cost Nepal",
    "nea bill check online"
  ],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

