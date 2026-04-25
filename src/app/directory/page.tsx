import { Metadata } from 'next';
import DirectoryClient from './DirectoryClient';

export const metadata: Metadata = {
  title: 'Full Tool Directory — 80+ Precision Calculators | NEPACALC',
  description: 'Explore our complete index of scientific, financial, health, and engineering calculators. Official directory of high-precision mathematical units for Nepal.',
  alternates: {
    canonical: 'https://nepacalc.com/directory/',
  },
  openGraph: {
    title: 'Full Tool Directory — 80+ Precision Calculators | NEPACALC',
    description: 'Explore our complete index of scientific, financial, health, and engineering calculators.',
    url: 'https://nepacalc.com/directory',
  }
};

export default function DirectoryPage() {
  return (
    <>
      <DirectoryClient />
    </>
  );
}
