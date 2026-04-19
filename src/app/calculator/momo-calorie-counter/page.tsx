import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Momo Calorie Counter 🥟 — Free Fitness Tool Nepal | NEPACALC',
  description: 'The ultimate fitness tool for Nepal. Calculate calories, protein, and macros for Buff, Chicken, and Veg Momos. 100% free and mobile friendly.',
  keywords: ['momo calorie counter', 'buff momo calories', 'nepal fitness calculator', 'weight loss nepal'],
  alternates: {
    canonical: 'https://nepacalc.com/calculator/momo-calorie-counter',
  },

  openGraph: {
    title: 'Momo Calorie Counter 🥟 — Free Fitness Tool Nepal | NEPACALC',
    description: 'The ultimate fitness tool for Nepal. Calculate calories, protein, and macros for Buff, Chicken, and Veg Momos. 100% free and mobile friendly.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Momo Calorie Counter 🥟 — Free Fitness Tool Nepal | NEPACALC',
    description: 'The ultimate fitness tool for Nepal. Calculate calories, protein, and macros for Buff, Chicken, and Veg Momos. 100% free and mobile friendly.',
  },
};

export default function Page() {
  return <Calculator />;
}
