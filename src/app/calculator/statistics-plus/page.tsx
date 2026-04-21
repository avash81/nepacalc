import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'Mean, Median, Mode Calculator | NEPACALC',
  description: 'Free online statistics calculator for mean, median, mode, and range of any data set. Analyze datasets instantly.',
  keywords: ['mean', 'median', 'mode', 'range', 'statistics calculator', 'averages', 'datasets'],
  slug: 'statistics-plus',
});

export default function Page() {
  return <Calculator />;
}
