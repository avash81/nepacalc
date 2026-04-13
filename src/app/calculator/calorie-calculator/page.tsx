import type { Metadata } from 'next';
import CalorieCalculator from './Calculator';
export const metadata: Metadata = {
  title: 'Calorie Calculator Nepal — Daily Calorie Needs & Goals',
  description: 'Calculate your daily calorie needs using BMR and activity level. Get calorie goals for weight loss, maintenance, and muscle gain. Free online tool.',
  alternates: { canonical: 'https://equaly.com/calculator/calorie-calculator' },
};
export default function CaloriePage() { return <CalorieCalculator />; }
