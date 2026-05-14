import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Income Tax Calculator 2082/83 | Tax Slabs & SSF | NepaCalc",
  description: "Calculate your Nepal income tax for FY 2082/83. Covers SSF waiver, EPF/CIT deductions, female 10% rebate, and married thresholds. Instant slab-wise breakdown.",
  slug: 'nepal-income-tax',
  keywords: ["nepal income tax calculator 2082/83", "ird tax calculator", "income tax slab nepal 2082", "nepal tax calculator", "salary tax calculator nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

