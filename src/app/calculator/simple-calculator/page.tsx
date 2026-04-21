import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'Simple Calculator | Fast Online Arithmetic Tool | NEPACALC',
  description: 'Easy-to-use online calculator for basic arithmetic, percentages, and scientific functions. Clean and responsive interface.',
  keywords: ['online calculator', 'math calculator', 'basic calculator', 'arithmetic tool', 'percentage calculator'],
  slug: 'simple-calculator',
});

export default function SimpleCalculatorPage() {
  return <Calculator />;
}
