import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Percentage Calculator | Percentage Change & Growth NepaCalc",
  description: "Calculate percentages, percentage change (increase/decrease), and original values. Quick tool for discounts, markups, and math problems.",
  slug: 'percentage',
  keywords: ["percentage calculator", "calculate percentage increase", "percentage decrease tool", "discount calculator", "math percentage calculator", "growth rate calculator"],
});

export default function Page() {
  return <Calculator />;
}

