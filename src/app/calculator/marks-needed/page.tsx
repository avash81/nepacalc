import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Marks Needed Calculator | Final Grade Predictor NepaCalc",
  description: "Calculate exactly what you need to score on your final exam to reach your target overall class grade. Perfect for students planning their study goals.",
  slug: 'marks-needed',
  keywords: ["marks needed calculator", "final grade calculator", "exam score needed", "target grade calculator", "university grade calculator"],
});
export default function Page() { return <Calculator />; }
