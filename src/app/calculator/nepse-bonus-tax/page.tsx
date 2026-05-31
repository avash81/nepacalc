import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "NEPSE Bonus Share Tax Calculator 2083/84 | Dividend WHT Nepal | NepaCalc",
  description: "Calculate 5% withholding tax on NEPSE bonus shares and cash dividends for FY 2083/84. Shows net shares received and cash receivable after tax deduction.",
  slug: 'nepse-bonus-tax',
  keywords: ["nepse bonus tax calculator", "bonus share tax nepal", "dividend tax nepal 2083", "5 percent bonus tax nepse"],
});
export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

