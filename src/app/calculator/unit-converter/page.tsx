import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Universal Unit Converter | Metric & Imperial NepaCalc",
  description: "Fast and precise unit converter for length, weight, area, and volume. Convert kg to lbs, meters to feet, and gallons to liters instantly.",
  slug: 'unit-converter',
  keywords: ["unit converter online", "metric to imperial converter", "length converter", "weight converter", "area converter", "volume calculator", "kg to lbs converter"],
});
export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

