import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Linear Equation Solver | 2 & 3 Variables NepaCalc",
  description: "Solve systems of 2 or 3 simultaneous linear equations using Cramer's Rule. Instantly find exact x, y, and z intersection vectors.",
  slug: 'linear-solver',
  keywords: ["linear equation solver", "cramers rule calculator", "solve for x y z", "system of equations calculator", "simultaneous equations solver"],
});
export default function Page() { return <Calculator />; }
