import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "BMI Calculator | WHO Body Mass Index Standards | NepaCalc",
  description: "Advanced BMI calculator using WHO & Asian standards. Calculate Body Mass Index, check weight categories, and understand health risks. Free, fast, and accurate.",
  slug: 'bmi',
  keywords: ["bmi calculator", "body mass index", "asian bmi standards", "calculate bmi online", "who weight categories", "bmi formula"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

