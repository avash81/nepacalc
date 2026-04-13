import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Simple Calculator | Fast Online Arithmetic Tool | Equaly',
  description: 'Easy-to-use online calculator for basic arithmetic, percentages, and scientific functions. Clean and responsive interface.',
  keywords: ['online calculator', 'math calculator', 'basic calculator', 'arithmetic tool', 'percentage calculator'],
  openGraph: {
    title: 'Simple Calculator | Equaly',
    description: 'Perform quick calculations with our sleek online calculator.',
    images: ['https://firebasestorage.googleapis.com/v0/b/equaly-np.appspot.com/o/tools%2Fcalculator-og.png?alt=media'],
  }
};

export default function SimpleCalculatorPage() {
  return <Calculator />;
}
