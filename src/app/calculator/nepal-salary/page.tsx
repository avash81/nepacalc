import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Salary Calculator 2081/82 | Take-Home Pay NepaCalc",
  description: "Calculate your exact take-home pay in Nepal for FY 2081/82. Includes SSF, CIT, and Income Tax deductions. Professional payroll tool for individuals and HR.",
  slug: 'nepal-salary',
  keywords: ["nepal salary calculator", "take home pay nepal", "ssf calculator nepal", "salary tax nepal", "monthly salary breakdown", "nepal payroll tool"],
});

export default function Page() {
  return <Calculator />;
}
