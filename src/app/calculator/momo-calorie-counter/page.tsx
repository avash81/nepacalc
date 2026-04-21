import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'Momo Calorie Counter 🥟 — Free Fitness Tool Nepal | NEPACALC',
  description: 'The ultimate fitness tool for Nepal. Calculate calories, protein, and macros for Buff, Chicken, and Veg Momos. 100% free and mobile friendly.',
  keywords: ['momo calorie counter', 'buff momo calories', 'nepal fitness calculator', 'weight loss nepal'],
  slug: 'momo-calorie-counter',
});

export default function Page() {
  return <Calculator />;
}
