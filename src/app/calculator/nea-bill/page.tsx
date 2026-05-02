import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "NEA Electricity Bill Calculator | Current Tariffs NepaCalc",
  description: "Calculate your Nepal electricity bill online. Get the exact 20 unit price, 40 unit cost, and all NEA tariff slabs for 2082/83. Verified accuracy.",
  slug: 'nea-bill',
  keywords: ["nea bill calculator", "electricity bill nepal", "nea tariff 2082", "nea rate calculation", "nepal electricity authority bill", "20 unit price nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}
