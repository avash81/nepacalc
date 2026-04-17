import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Paint Cost Calculator | Interior & Exterior Wall Estimator | NEPACALC',
  description: 'Estimate the cost of painting your room or house. Calculate total paint quantity (liters/gallons) and material costs based on wall area.',
  keywords: ['paint cost calculator', 'room painting cost', 'wall area calculator', 'paint quantity calculator', 'nepal painting cost', 'home renovation tool'],
  openGraph: { title: 'Paint Cost Calculator | NEPACALC', description: 'Estimate your home painting budget accurately.', siteName: 'NEPACALC', url: 'https://nepacalc.com/calculator/paint-cost', type: 'website' },
  alternates: { canonical: 'https://nepacalc.com/calculator/paint-cost' },
};

export default function PaintCostPage() {
  return <Calculator />;
}
