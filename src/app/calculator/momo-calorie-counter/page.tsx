import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Momo Calorie Counter (Chicken, Veg & Steamed Momos Calculator)",
  description: "Calculate calories in momos instantly. Estimate calories for chicken, veg, steamed, fried, jhol, paneer, buff and tandoori momos. Find calories per piece, per plate and total nutrition using our free Momo Calorie Counter.",
  slug: 'momo-calorie-counter',
  keywords: ["Momo Calorie Counter", "Momo Calories", "Calories in Momos", "Chicken Momo Calories", "Veg Momo Calories", "Steamed Momo Calories", "Fried Momo Calories", "Calories in Chicken Momos", "Calories in Veg Momos", "Calories in 1 Momo", "Calories in 1 Plate Momos", "Jhol Momo Calories", "Paneer Momo Calories", "Buff Momo Calories", "Momo Calorie Calculator", "Calories Per Momo", "Calories Per Plate Momos"],
});

export default function Page() {
  return <Calculator />;
}
