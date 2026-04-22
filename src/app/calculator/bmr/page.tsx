import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'Metabolic Rate TDEE Calculator — BMR & Daily Calorie Needs',
  description: 'Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) instantly. Uses the Mifflin-St Jeor formula. Find exact daily calories for weight loss, gain, or maintenance.',
  slug: 'bmr',
  keywords: ['metabolic rate tdee calculator', 'bmr calculator', 'basal metabolic rate', 'tdee calculator online', 'daily calorie needs', 'mifflin st jeor formula', 'calorie calculator for weight loss'],
});

export default function Page() {
  return <Calculator />;
}
