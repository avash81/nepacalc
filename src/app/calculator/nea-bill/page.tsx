import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "NEA Bill Calculator 2082/83 Nepal | Domestic Electricity Rates",
  description: "Advanced Nepal electricity bill calculator with 2082 tariff slabs. Calculate NEA domestic bill, commercial rates, and fines/rebates accurately. Official NEA rates.",
  slug: 'nea-bill',
  keywords: ["nea bill calculator 2082", "electricity bill nepal", "nea tariff 2082/83", "nea rate calculation", "nepal electricity authority bill", "20 unit price nepal", "nea online payment rebate"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

