import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Loan EMI Calculator Nepal 2083/84 | Home Car Personal | NepaCalc",
  description: "Calculate EMI for home, car and personal loans in Nepal. Full amortization schedule, total interest payable, NRB base rate context. Reducing balance method.",
  slug: 'loan-emi',
  keywords: ["emi calculator nepal", "loan emi nepal", "bank emi calculator nepal", "home loan emi calculator"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      
      <Calculator />
      
    </div>
  );
}

