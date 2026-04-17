import Calculator from './Calculator';
import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: 'Decimal to Fraction Calculator | Step-by-Step Conversion | NEPACALC',
  description: 'Convert any decimal number to its simplest fraction form. Includes mixed number support and detailed conversion steps.',
  keywords: ['decimal to fraction', 'convert decimal', 'fraction calculator', 'repeating decimals', 'math tools', 'nepal education'],
  slug: 'decimal-to-fraction',
});

export default function DecimalFractionPage() {
  return <Calculator />;
}
