import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Nepal Vehicle Tax Calculator 2083/84 | Bluebook Renewal | NepaCalc",
  description: "Calculate annual vehicle tax (bluebook renewal) for bikes and cars in Nepal for FY 2083/84. Bagmati Province slab rates. 20% late penalty included.",
  slug: 'nepal-vehicle-tax',
  keywords: ["vehicle tax calculator nepal", "bluebook renewal 2083", "bagmati province tax", "bike tax nepal"],
});
export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

