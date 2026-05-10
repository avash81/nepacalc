import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Salary Calculator 2082/83 | Take-Home Pay NepaCalc",
  description: "Calculate your exact take-home pay in Nepal for FY 2082/83. Includes SSF, CIT, and Income Tax deductions. Professional payroll tool for individuals and HR.",
  slug: 'nepal-salary',
  keywords: ["nepal salary calculator", "take home pay nepal", "ssf calculator nepal", "salary tax nepal", "monthly salary breakdown", "nepal payroll tool"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

