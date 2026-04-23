import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Matrix Calculator | Determinant & Inverse NepaCalc",
  description: "Compute determinant, trace, and inverse of 2×2 and 3×3 matrices. Essential tool for linear algebra, physics, and engineering students.",
  slug: 'matrices',
  keywords: ["matrix calculator", "determinant calculator", "inverse matrix", "3x3 matrix solver", "matrix trace", "linear algebra calculator"],
});
export default function Page() { return <Calculator />; }
