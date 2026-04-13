import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Paint Cost Calculator | Interior & Exterior Wall Estimator | Equaly',
  description: 'Estimate the cost of painting your room or house. Calculate total paint quantity (liters/gallons) and material costs based on wall area.',
  keywords: ['paint cost calculator', 'room painting cost', 'wall area calculator', 'paint quantity calculator', 'nepal painting cost', 'home renovation tool'],
  openGraph: {
    title: 'Paint Cost Calculator | Equaly',
    description: 'Estimate your home painting budget accurately.',
    images: ['https://firebasestorage.googleapis.com/v0/b/equaly-np.appspot.com/o/tools%2Fpaint-og.png?alt=media'],
  }
};

export default function PaintCostPage() {
  return <Calculator />;
}
