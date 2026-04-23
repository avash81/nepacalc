import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Child BMI Calculator | Kids BMI Percentile NepaCalc",
  description: "Calculate Body Mass Index (BMI) for children and teens (ages 2-19). Understand growth percentiles based on pediatric CDC/WHO guidelines.",
  slug: 'bmi-child',
  keywords: ["child bmi calculator", "pediatric bmi", "kids bmi percentile", "bmi calculator for teenagers", "underweight child bmi", "child obesity calculator"],
});
export default function Page() { return <Calculator />; }
