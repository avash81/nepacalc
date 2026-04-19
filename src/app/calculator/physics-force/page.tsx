import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Force Calculator (F=ma) | NEPACALC',
  description: 'Free online physics calculator for Newton\'s second law (F=ma). Find force, mass, or acceleration results instantly.',
  keywords: ['force', 'mass', 'acceleration', 'newton second law', 'physics solver', 'calculator'],

  openGraph: {
    title: 'Force Calculator (F=ma) | NEPACALC',
    description: 'Free online physics calculator for Newton\'s second law (F=ma). Find force, mass, or acceleration results instantly.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Force Calculator (F=ma) | NEPACALC',
    description: 'Free online physics calculator for Newton\'s second law (F=ma). Find force, mass, or acceleration results instantly.',
  },
};

export default function Page() {
  return <Calculator />;
}
