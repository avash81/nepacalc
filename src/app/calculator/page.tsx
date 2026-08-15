import { Metadata } from 'next';
import DirectoryClient from '../directory/DirectoryClient';

export const metadata: Metadata = {
  title: 'Calculators Hub | NepaCalc',
  description: 'Explore our complete index of scientific, financial, health, and engineering calculators.',
  alternates: {
    canonical: 'https://nepacalc.com/calculator/',
  },
  openGraph: {
    title: 'Calculators Hub | NepaCalc',
    description: 'Explore our complete index of scientific, financial, health, and engineering calculators.',
    url: 'https://nepacalc.com/calculator/',
  }
};

export default function CalculatorPage() {
  return (
    <>
      <DirectoryClient />
    </>
  );
}

