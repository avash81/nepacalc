import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Momo Calorie Counter | Nepal Health Tracker NepaCalc",
  description: "Track calories and macronutrients for Nepal's favourite dish. Mix varieties and serving sizes for a complete nutritional picture.",
  slug: 'momo-calorie-counter',
  keywords: ["momo calories", "nepal food calorie counter", "buff momo calories", "chicken momo nutrition", "veg momo calories", "health calculator nepal"],
});
export default function Page() { return <Calculator />; }

