import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Compound Interest Calculator | Investment Growth NepaCalc",
  description: "Calculate how your money grows over time with compound interest. Supports annual, semi-annual, quarterly, and monthly compounding for savings and FD.",
  slug: 'compound-interest',
  keywords: ["compound interest calculator", "savings growth tool", "investment calculator nepal", "fd interest calculator", "compound interest formula", "wealth builder"],
});

export default function Page() {
  return <Calculator />;
}
