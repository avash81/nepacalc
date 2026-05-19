import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Income Tax Calculator 2083/84 | IRD Slabs | NepaCalc",
  description: "Calculate Nepal income tax for FY 2083/84. IRD-verified slabs, SSF waiver, EPF/CIT deductions, female 10% rebate. Instant slab-wise result — no signup.",
  slug: 'nepal-income-tax',
  keywords: ["nepal income tax calculator 2083/84", "ird tax calculator", "income tax slab nepal 2083", "salary tax calculator nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

