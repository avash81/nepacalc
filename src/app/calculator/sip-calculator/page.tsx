import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "SIP Calculator Nepal | Return & Interest Rate",
  description: "Calculate SIP investment returns and compounding interest rates in Nepal. Project mutual fund growth, calculate 5% Capital Gains Tax (CGT), and check maturity values.",
  slug: 'sip-calculator',
  keywords: ["sip calculator nepal", "sip interest rate in nepal", "sip return rate in nepal", "compounding calculator nepal", "nepal bank sip calculator", "sip calculator nimb"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      
      <Calculator />
      
    </div>
  );
}

