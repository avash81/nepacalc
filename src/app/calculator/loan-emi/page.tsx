import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Loan EMI Calculator Nepal | Personal & Home Loan EMI NepaCalc",
  description: "Calculate your monthly loan installments (EMI) for Home, Car, and Personal loans in Nepal. Use our high-precision reducing balance tool. Try NepaCalc for financial clarity.",
  slug: 'loan-emi',
  keywords: ["loan emi calculator nepal", "home loan emi nepal", "monthly installment tool", "reducing balance interest", "loan amortization schedule", "bank loan calculator nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

