import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Nepal Home Loan Calculator 2083/84 | NRB Rates | NepaCalc",
  description: "Calculate home loan EMI in Nepal with NRB base rates. Shows monthly installment, total interest, amortization. Covers 20% and 30% down payment rules.",
  slug: 'mortgage-calculator',
  keywords: ["nepal home loan calculator 2083/84", "home loan emi nepal", "nrb home loan rules", "mortgage calculator nepal"],
});
export default function Page() { return <Calculator />; }

