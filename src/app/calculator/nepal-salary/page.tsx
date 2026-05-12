import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Salary Calculator 2082/83 | Take-Home Pay & SSF | NepaCalc",
  description: "Calculate your exact take-home pay in Nepal for FY 2082/83. Features SSF, CIT, and Income Tax auditing. Professional payroll tool with tax slab breakdown.",
  slug: 'nepal-salary',
  keywords: ["nepal salary calculator 2082", "take home pay nepal", "ssf calculator nepal", "salary tax nepal 2082/83", "monthly salary breakdown", "nepal payroll tool", "net salary nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

