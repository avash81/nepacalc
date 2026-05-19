import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Auto Loan EMI Calculator Nepal 2083/84 | Car & Bike Loan | NepaCalc",
  description: "Calculate EMI for car and bike loans in Nepal for FY 2083/84. Support for EV (80%) and Fuel (50%) financing rules as per NRB mandates.",
  slug: 'auto-loan',
  keywords: ["auto loan calculator nepal", "car loan emi nepal", "bike loan calculator", "ev financing nepal", "nrb auto loan rules"],
});

export default function Page() {
  return <Calculator />;
}
