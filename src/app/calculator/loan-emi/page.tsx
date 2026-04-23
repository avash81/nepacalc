import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Loan EMI Calculator Nepal | Monthly Installment Tool NepaCalc",
  description: "Calculate your Home, Auto, or Personal Loan EMI instantly. Includes amortization schedule and loan affordability calculator. Verified for Nepal bank interest rates.",
  slug: 'loan-emi',
  keywords: ["loan emi calculator nepal", "monthly installment tool", "home loan emi nepal", "car loan emi nepal", "reducing balance emi", "loan affordability calculator"],
});

export default function Page() {
  return <Calculator />;
}
