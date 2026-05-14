import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Salary Calculator 2082/83 | Net Take-Home Pay | NepaCalc",
  description: "Find your exact take-home salary in Nepal for FY 2082/83. Calculates SSF 11%, CIT, EPF, income tax slabs. Works for single and married filers. Instant results.",
  slug: 'nepal-salary',
  keywords: ["nepal salary calculator 2082/83", "monthly salary", "take home pay nepal", "ssf calculator nepal", "online payroll calculator nepal free"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

