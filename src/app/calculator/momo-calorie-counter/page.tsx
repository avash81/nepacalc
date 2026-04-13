import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Momo Calorie Counter 🥟 — Free Fitness Tool Nepal | Equaly',
  description: 'The ultimate fitness tool for Nepal. Calculate calories, protein, and macros for Buff, Chicken, and Veg Momos. 100% free and mobile friendly.',
  keywords: ['momo calorie counter', 'buff momo calories', 'nepal fitness calculator', 'weight loss nepal'],
  alternates: {
    canonical: 'https://equaly.com/calculator/momo-calorie-counter',
  },
};

export default function Page() {
  return <Calculator />;
}
