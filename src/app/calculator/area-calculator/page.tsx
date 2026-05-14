import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Area Calculator | Square, Rectangle, Circle, Triangle | NepaCalc",
  description: "Calculate the area of geometric shapes instantly. Professional tool for students and engineers. Supports metric and imperial units.",
  slug: 'area-calculator',
  keywords: ["area calculator", "rectangle area", "circle area calculator", "triangle area formula", "calculate square feet"],
});
export default function Page() { return <Calculator />; }

