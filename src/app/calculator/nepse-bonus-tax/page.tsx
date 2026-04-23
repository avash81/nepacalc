import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "NEPSE Dividend Tax Calculator | Bonus Share WHT NepaCalc",
  description: "Calculate 5% withholding tax on NEPSE bonus shares and cash dividends. Shows total tax liability and net in-hand amount for Nepal stock investors.",
  slug: 'nepse-bonus-tax',
  keywords: ["nepse bonus tax calculator", "dividend tax nepal", "bonus share tax nepal", "withholding tax nepse", "5 percent dividend tax", "cdsc dividend tax nepal"],
});
export default function Page() { return <Calculator />; }
