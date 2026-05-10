import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Brick Calculator Nepal | Estimate Construction Material NepaCalc",
  description: "Calculate the exact number of bricks required for your wall construction in Nepal. Pre-configured with standard Nepali brick sizes and 5% wastage.",
  slug: 'brick-calculator',
  keywords: ["brick calculator nepal", "wall brick estimator", "how many bricks per square foot", "nepal standard brick size", "construction material calculator"],
});
export default function Page() { return <Calculator />; }

