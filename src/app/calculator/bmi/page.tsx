import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "BMI Calculator | WHO Standard Body Mass Index NepaCalc",
  description: "Check your Body Mass Index (BMI) using WHO standards. Accurate tool for adults with support for both Metric and Imperial units. Verified for clinical screening.",
  slug: 'bmi',
  keywords: ["bmi calculator", "body mass index nepal", "weight classification tool", "who bmi standards", "calculate bmi online", "healthy weight range"],
});

export default function Page() {
  return <Calculator />;
}
