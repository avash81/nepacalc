import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Area Calculator | Precise 2D Shape Calculations | Equaly',
  description: 'Free online area calculator to calculate the area of a circle, rectangle, triangle, square, trapezoid, and more with step-by-step formulas.',
  keywords: ['area calculator', 'geometry calculator', 'calculate area', 'square area', 'circle area', 'triangle area', 'nepal geometry'],
  openGraph: {
    title: 'Area Calculator | Equaly',
    description: 'Calculate area for various 2D shapes instantly.',
    images: ['https://firebasestorage.googleapis.com/v0/b/equaly-np.appspot.com/o/tools%2Farea-og.png?alt=media'],
  }
};

export default function AreaCalculatorPage() {
  return <Calculator />;
}
