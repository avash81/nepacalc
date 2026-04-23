import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "SIP Calculator Nepal | Mutual Fund Return Calculator NepaCalc",
  description: "Calculate your Systematic Investment Plan (SIP) returns with annual step-up. Best tool for Nepal mutual funds and stock market investment planning.",
  slug: 'sip-calculator',
  keywords: ["sip calculator nepal", "mutual fund return calculator", "nepse sip tool", "investment growth calculator", "sip step up calculator", "compound interest nepal"],
});

export default function Page() {
  return <Calculator />;
}
