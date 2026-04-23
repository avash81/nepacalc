import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Savings Calculator Nepal | Monthly Savings Growth Tool NepaCalc",
  description: "Calculate how your monthly savings grow with compound interest. Plan long-term wealth with Nepal bank rates. Includes principal vs interest breakdown.",
  slug: 'savings',
  keywords: ["savings calculator nepal", "monthly savings growth", "compound interest savings", "wealth planning nepal", "savings account interest calculator"],
});
export default function Page() { return <Calculator />; }
