import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Probability Calculator | NEPACALC',
  description: 'Free online probability calculator. Convert favorable outcomes and sample space into percentage, decimal, and odds values instantly.',
  keywords: ['probability', 'odds', 'statistics', 'likelihood', 'chance', 'math calculator'],

  openGraph: {
    title: 'Probability Calculator | NEPACALC',
    description: 'Free online probability calculator. Convert favorable outcomes and sample space into percentage, decimal, and odds values instantly.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Probability Calculator | NEPACALC',
    description: 'Free online probability calculator. Convert favorable outcomes and sample space into percentage, decimal, and odds values instantly.',
  },
};

export default function Page() {
  return <Calculator />;
}
