import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Simple Calculator | Fast Online Arithmetic Tool | NEPACALC',
  description: 'Easy-to-use online calculator for basic arithmetic, percentages, and scientific functions. Clean and responsive interface.',
  keywords: ['online calculator', 'math calculator', 'basic calculator', 'arithmetic tool', 'percentage calculator'],
  openGraph: { title: 'Simple Calculator | NEPACALC', description: 'Perform quick calculations with our sleek online calculator.', siteName: 'NEPACALC', url: 'https://nepacalc.com/calculator/simple-calculator', type: 'website' },
  alternates: { canonical: 'https://nepacalc.com/calculator/simple-calculator' },
};

export default function SimpleCalculatorPage() {
  return <Calculator />;
}
