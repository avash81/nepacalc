import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'Z-Score Calculator | NEPACALC',
  description: 'Free online Z-score calculator for statistical analysis. Calculate standard scores from population mean and standard deviation instantly.',
  keywords: ['z-score', 'standard score', 'normal distribution', 'statistics', 'bell curve', 'standard deviation', 'calculator'],
  slug: 'z-score',
});

export default function Page() {
  return <Calculator />;
}
