import { Metadata } from 'next';
import DirectoryClient from './DirectoryClient';

export const metadata: Metadata = {
  title: 'Calculator & Tool Directory | NepaCalc',
  description: 'Browse NepaCalc calculators and digital tools by category, including Nepal, finance, engineering, health, mathematics, education and converters.',
  alternates: {
    canonical: 'https://NepaCalc.com/directory/',
  },
  openGraph: {
    title: 'Calculator & Tool Directory | NepaCalc',
    description: 'Browse NepaCalc calculators and digital tools by category, including Nepal, finance, engineering, health, mathematics, education and converters.',
    url: 'https://NepaCalc.com/directory/',
  }
};

export default function DirectoryPage() {
  return (
    <>
      <DirectoryClient />
    </>
  );
}

