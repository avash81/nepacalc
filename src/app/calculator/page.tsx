import { Metadata } from 'next';
import DirectoryClient from '../directory/DirectoryClient';

export const metadata: Metadata = {
  title: 'Calculators & Tools | NepaCalc',
  description: 'Explore our complete collection of online calculators and tools for Nepal-specific calculations, finance, engineering, health, math, converters and everyday use.',
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

