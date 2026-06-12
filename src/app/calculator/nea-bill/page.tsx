import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "NEA Electricity Bill Calculator Nepal 2083/84 | NepaCalc",
  description: "Calculate your Nepal Electricity Authority utility bill instantly using updated 2083/84 progressive tariff rates.",
  slug: 'nea-bill',
  keywords: ["nea bill calculator", "electricity bill calculator nepal", "nea bill calculator 2083", "nea tariff 2083"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

