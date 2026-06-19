import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "NEA Bill Calculator 2083/84 Nepal - Calculate Electricity Bill Online",
  description: "Calculate your NEA electricity bill online using the latest 2083/84 tariff rates. Get an instant breakdown of unit charges, service charges, VAT and total bill amount.",
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
    </div>
  );
}

