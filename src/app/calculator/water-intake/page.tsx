import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Water Intake Calculator | Daily Hydration Tool NepaCalc",
  description: "Calculate your optimal daily water intake based on body weight and exercise level. Personalized hydration recommendations backed by science.",
  slug: 'water-intake',
  keywords: ["water intake calculator", "daily water requirement", "hydration calculator", "how much water per day", "water intake by weight"],
});
export default function Page() { return <Calculator />; }
