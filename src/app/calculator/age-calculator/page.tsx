import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Age Calculator | Birthday & Life Statistics NepaCalc",
  description: "Exact age calculator for years, months, and days. Find your zodiac sign, total days lived, and countdown to your next birthday. 100% accurate tool.",
  slug: 'age-calculator',
  keywords: ["age calculator", "calculate age online", "how old am i", "birthday countdown", "zodiac sign calculator", "days lived calculator"],
});

export default function Page() {
  return <Calculator />;
}
