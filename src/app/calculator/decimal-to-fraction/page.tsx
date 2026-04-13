import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Decimal to Fraction Calculator | Step-by-Step Conversion | Equaly',
  description: 'Convert any decimal number to its simplest fraction form. Includes mixed number support and detailed conversion steps.',
  keywords: ['decimal to fraction', 'convert decimal', 'fraction calculator', 'repeating decimals', 'math tools', 'nepal education'],
  openGraph: {
    title: 'Decimal to Fraction Calculator | Equaly',
    description: 'Instant decimal to fraction conversion with simplification.',
    images: ['https://firebasestorage.googleapis.com/v0/b/equaly-np.appspot.com/o/tools%2Fdecimal-fraction-og.png?alt=media'],
  }
};

export default function DecimalFractionPage() {
  return <Calculator />;
}
