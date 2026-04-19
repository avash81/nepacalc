import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kinetic Energy Calculator (1/2mv²) | NEPACALC',
  description: 'Free online physics calculator for kinetic energy (KE = ½mv²). Solve for energy, mass, or velocity instantly.',
  keywords: ['kinetic energy', 'physics calculator', 'energy', 'velocity', 'mass', '1/2mv2'],

  openGraph: {
    title: 'Kinetic Energy Calculator (1/2mv²) | NEPACALC',
    description: 'Free online physics calculator for kinetic energy (KE = ½mv²). Solve for energy, mass, or velocity instantly.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kinetic Energy Calculator (1/2mv²) | NEPACALC',
    description: 'Free online physics calculator for kinetic energy (KE = ½mv²). Solve for energy, mass, or velocity instantly.',
  },
};

export default function Page() {
  return <Calculator />;
}
