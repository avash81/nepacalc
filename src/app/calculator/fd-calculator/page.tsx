import Link from 'next/link';
import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'Fixed Deposit (FD) Calculator Nepal 2083/84 | Maturity & Interest',
  description: 'Calculate FD maturity amount and quarterly interest returns for Nepal banks in FY 2083/84. Compounding interest logic as per NRB standards.',
  slug: 'fd-calculator',
  keywords: ["fd calculator nepal 2083", "fixed deposit maturity nepal", "nepal bank fd rates 2083", "fd interest calculator", "compound interest fd", "quarterly compounding nepal"],
});

export default function Page() { return 
      <Calculator />
      ; }

