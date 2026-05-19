import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "KUKL Water Bill Calculator Nepal 2083/84 | Kathmandu Water",
  description: "Calculate your Kathmandu Upatyaka Khanepani Limited (KUKL) water bill for FY 2083/84. Slab-based charges, 50% sewerage tax, and meter reading logic.",
  slug: 'kukl-bill',
  keywords: ["kukl bill calculator 2083", "kathmandu water bill 2084", "water bill nepal", "kukl tariff rates", "sewerage tax calculation nepal"],
});
export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

