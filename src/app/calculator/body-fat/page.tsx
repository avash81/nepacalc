import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Body Fat Calculator | U.S. Navy Method NepaCalc",
  description: "Estimate your body fat percentage accurately using the U.S. Navy circumference method. Learn your fitness category and healthy ranges instantly.",
  slug: 'body-fat',
  keywords: ["body fat calculator", "calculate body fat online", "navy method body fat", "fitness percentage calculator", "body composition tool", "healthy body fat ranges"],
});

export default function Page() {
  return <Calculator />;
}

