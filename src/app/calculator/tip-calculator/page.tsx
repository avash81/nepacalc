import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Tip Calculator | Bill Split Tool Nepal NepaCalc",
  description: "Calculate tip amounts and split restaurant bills among any group. Includes tip presets and per-person breakdown. Perfect for dining out in Nepal.",
  slug: 'tip-calculator',
  keywords: ["tip calculator", "bill split calculator", "restaurant tip nepal", "split bill calculator", "how much to tip nepal"],
});
export default function Page() { return <Calculator />; }
