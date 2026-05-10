import { Metadata } from 'next';
import DirectoryClient from './DirectoryClient';

export const metadata: Metadata = {
  title: 'Full Tool Directory ,  80+ Precision Calculators | NepaCalc',
  description: 'Explore our complete index of scientific, financial, health, and engineering calculators. Official directory of high-precision mathematical units for Nepal.',
  alternates: {
    canonical: 'https://NepaCalc.com/directory/',
  },
  openGraph: {
    title: 'Full Tool Directory ,  80+ Precision Calculators | NepaCalc',
    description: 'Explore our complete index of scientific, financial, health, and engineering calculators.',
    url: 'https://NepaCalc.com/directory',
  }
};

export default function DirectoryPage() {
  return (
    <>
      <DirectoryClient />
    </>
  );
}

