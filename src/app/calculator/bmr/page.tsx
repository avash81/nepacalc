import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "BMR Calculator | Basal Metabolic Rate & TDEE NepaCalc",
  description: "Calculate your BMR and TDEE instantly. Find how many calories you need to maintain, lose, or gain weight using the clinical Mifflin-St Jeor equation.",
  slug: 'bmr',
  keywords: ["bmr calculator", "basal metabolic rate", "tdee calculator", "calorie maintenance calculator", "weight loss calories", "mifflin st jeor equation"],
});

export default function Page() {
  return <Calculator />;
}
