import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Salary Calculator 2083/84 | Net Take-Home Pay | NepaCalc",
  description: "Free online payroll calculator Nepal 2083/84. Net take-home after SSF 11%, income tax TDS, CIT, EPF. Single and married filers. Instant result.",
  slug: 'nepal-salary',
  keywords: ["nepal salary calculator 2083/84", "net pay calculator nepal", "salary tax calculator nepal 2083", "payroll calculator nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

