import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "SIP Calculator Nepal 2083/84 | NEPSE Mutual Fund | NepaCalc",
  description: "Calculate SIP returns for Nepal's mutual funds. Step-up SIP, annual growth projection, corpus breakdown. Reference rates: NIBL Sunrise, NMB Sulav, NEPSE funds.",
  slug: 'sip-calculator',
  keywords: ["sip calculator nepal", "nepse mutual fund", "nibl sunrise sip", "sip returns nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      
      <Calculator />
      
    </div>
  );
}

