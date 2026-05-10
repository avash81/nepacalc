import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Area Calculator | Square, Rectangle, Circle, Triangle NepaCalc",
  description: "Calculate the exact area of geometric 2D shapes including Squares, Rectangles, Circles, Triangles, and Trapezoids instantly with precise formulas.",
  slug: 'area-calculator',
  keywords: ["area calculator", "calculate area of circle", "rectangle area calculator", "triangle area formula", "square feet calculator", "geometry calculator"],
});
export default function Page() { return <Calculator />; }

