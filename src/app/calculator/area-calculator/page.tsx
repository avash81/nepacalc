import Calculator from './Calculator';
import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: 'Area Calculator | Precise 2D Shape Calculations | NEPACALC',
  description: 'Free online area calculator to calculate the area of a circle, rectangle, triangle, square, trapezoid, and more with step-by-step formulas.',
  keywords: ['area calculator', 'geometry calculator', 'calculate area', 'square area', 'circle area', 'triangle area', 'nepal geometry'],
  slug: 'area-calculator',
});

export default function AreaCalculatorPage() {
  return <Calculator />;
}
