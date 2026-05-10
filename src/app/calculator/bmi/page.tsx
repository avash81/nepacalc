import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "BMI Calculator Nepal | WHO Body Mass Index Standards NepaCalc",
  description: "Advanced BMI calculator for Nepal using WHO & Asian standards. Calculate Body Mass Index, check weight categories, and understand health risks. Try NepaCalc for precise health tools.",
  slug: 'bmi',
  keywords: ["bmi calculator nepal", "body mass index asian standards", "calculate bmi online", "who weight categories", "healthy weight nepal", "bmi formula for adults"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

