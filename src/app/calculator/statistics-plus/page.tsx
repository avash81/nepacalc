import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mean, Median, Mode Calculator | NEPACALC',
  description: 'Free online statistics calculator for mean, median, mode, and range of any data set. Analyze datasets instantly.',
  keywords: ['mean', 'median', 'mode', 'range', 'statistics calculator', 'averages', 'datasets'],

  openGraph: {
    title: 'Mean, Median, Mode Calculator | NEPACALC',
    description: 'Free online statistics calculator for mean, median, mode, and range of any data set. Analyze datasets instantly.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mean, Median, Mode Calculator | NEPACALC',
    description: 'Free online statistics calculator for mean, median, mode, and range of any data set. Analyze datasets instantly.',
  },
};

export default function Page() {
  return <Calculator />;
}
