import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Z-Score Calculator | NEPACALC',
  description: 'Free online Z-score calculator for statistical analysis. Calculate standard scores from population mean and standard deviation instantly.',
  keywords: ['z-score', 'standard score', 'normal distribution', 'statistics', 'bell curve', 'standard deviation', 'calculator'],

  openGraph: {
    title: 'Z-Score Calculator | NEPACALC',
    description: 'Free online Z-score calculator for statistical analysis. Calculate standard scores from population mean and standard deviation instantly.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Z-Score Calculator | NEPACALC',
    description: 'Free online Z-score calculator for statistical analysis. Calculate standard scores from population mean and standard deviation instantly.',
  },
};

export default function Page() {
  return <Calculator />;
}
