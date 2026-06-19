import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "NEA Bill Calculator Nepal (2083/84) - Calculate Electricity Bill Online",
  description: "Calculate your NEA bill instantly using the latest Nepal Electricity Authority (NEA) tariff rates for 2083/84. Get a complete electricity bill breakdown including unit charges, service charges, VAT and total payable amount.",
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

