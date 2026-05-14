import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Nepal Home Loan EMI Calculator 2082/83 | NRB Rates | NepaCalc",
  description: "Calculate home loan EMI in Nepal with NRB base rates. Shows monthly installment, total interest and amortization schedule. Covers 20% and 30% down payment rules.",
  slug: 'mortgage-calculator',
  keywords: ["home loan calculator nepal", "nepal home loan down payment 20% 30%", "emi calculator nepal", "mortgage calculator nepal", "nepal bank emi calculator"],
});
export default function Page() { return <Calculator />; }

