import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "NEPSE Profit & CGT Calculator | Share Market Nepal NepaCalc",
  description: "Calculate net share profit after broker commissions (2082/83 tiers), SEBON fees, and capital gains tax (5% vs 7.5%) for NEPSE stock trading.",
  slug: 'nepal-stocks',
  keywords: ["nepse profit calculator", "broker commission nepal", "cgt calculator nepal", "share market tax", "calculate stock profit", "nepse trading fee"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

