import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Discount Calculator | Sale Price & Savings Tool NepaCalc",
  description: "Calculate final price after any discount instantly. See exact savings amount and deal rating. Perfect for shoppers, retailers, and business pricing.",
  slug: 'discount-calculator',
  keywords: ["discount calculator", "sale price calculator", "percentage off calculator", "shopping savings tool", "original price calculator", "deal calculator nepal"],
});

export default function Page() { return <Calculator />; }
