import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'FD Calculator Nepal Fixed Deposit Returns FY 2082 82',
  description: 'Calculate FD maturity and interest for Nepal banks. Updated rates.',
  slug: 'fd-calculator',
  keywords: ["fd calculator nepal", "fixed deposit maturity", "nepal bank fd rates", "fd interest calculator", "compound interest fd", "quarterly compounding nepal"],
});

export default function Page() { return <Calculator />; }

