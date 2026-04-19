import type { Metadata } from 'next';
import CalorieCalculator from './Calculator';
export const metadata: Metadata = {
  title: 'Calorie Calculator Nepal — Daily Calorie Needs & Goals',
  description: 'Calculate your daily calorie needs using BMR and activity level. Get calorie goals for weight loss, maintenance, and muscle gain. Free online tool.',
  alternates: { canonical: 'https://nepacalc.com/calculator/calorie-calculator' },

  openGraph: {
    title: 'Calorie Calculator Nepal — Daily Calorie Needs & Goals',
    description: 'Calculate your daily calorie needs using BMR and activity level. Get calorie goals for weight loss, maintenance, and muscle gain. Free online tool.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calorie Calculator Nepal — Daily Calorie Needs & Goals',
    description: 'Calculate your daily calorie needs using BMR and activity level. Get calorie goals for weight loss, maintenance, and muscle gain. Free online tool.',
  },
};
export default function CaloriePage() { return <CalorieCalculator />; }
