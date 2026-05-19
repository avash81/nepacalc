import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "NEA Electricity Bill Calculator Nepal 2083/84 | NepaCalc",
  description: "Calculate your NEA electricity bill using 2083/84 official tariff slabs. Supports 5A–60A meters. Shows energy charge, fixed charge, VAT and late penalty instantly.",
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

