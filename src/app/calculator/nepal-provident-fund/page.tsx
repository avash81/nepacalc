import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Provident Fund (EPF) Calculator 2083/84 | PF & Gratuity | NepaCalc",
  description: "Calculate your EPF (Employee Provident Fund) contributions and interest in Nepal. Estimate retirement corpus based on 10% + 10% rule and current Kosh interest rates.",
  slug: 'nepal-provident-fund',
  keywords: ["provident fund calculator nepal", "epf calculator nepal", "pf interest rate nepal", "retirement fund calculator nepal", "kosh pf calculator"],
});

export default function Page() {
  return <Calculator />;
}
