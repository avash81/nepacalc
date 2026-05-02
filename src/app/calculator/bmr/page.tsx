import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "BMR Calculator | Basal Metabolic Rate & TDEE NepaCalc",
  description: "Find your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). Accurate calorie needs calculator using Mifflin-St Jeor equation. Try NepaCalc today.",
  slug: 'bmr',
  keywords: ["bmr calculator", "basal metabolic rate nepal", "tdee calculator", "calorie needs calculator", "mifflin st jeor equation", "weight loss calories"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}
