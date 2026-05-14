import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Loan EMI Calculator Nepal 2082/83 | Home, Car & Personal | NepaCalc",
  description: "Calculate EMI for home, car, and personal loans in Nepal. Full amortization schedule, total interest payable, and NRB base rate reference. Reducing balance method.",
  slug: 'loan-emi',
  keywords: ["emi calculator nepal", "loan emi calculator nepal", "nepal bank emi calculator", "car loan emi nepal", "personal loan calculator nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

