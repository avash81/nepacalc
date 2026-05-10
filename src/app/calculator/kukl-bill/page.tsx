import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "KUKL Water Bill Calculator | Kathmandu Nepal NepaCalc",
  description: "Estimate your monthly water bill from Kathmandu Upatyaka Khanepani Limited (KUKL). Calculates slab-based charges and the mandatory 50% sewerage tax.",
  slug: 'kukl-bill',
  keywords: ["kukl bill calculator", "water bill nepal", "kathmandu water charge", "sewerage tax nepal", "kukl tariff structure", "water meter reading nepal"],
});
export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

