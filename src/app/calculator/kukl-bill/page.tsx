import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KUKL Water Bill Analyzer — Kathmandu Residential Slabs',
  description: 'Estimate your monthly KUKL water bill in Kathmandu. Calculate volumetric charges and the 50% sewerage tax.',

  openGraph: {
    title: 'KUKL Water Bill Analyzer — Kathmandu Residential Slabs',
    description: 'Estimate your monthly KUKL water bill in Kathmandu. Calculate volumetric charges and the 50% sewerage tax.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KUKL Water Bill Analyzer — Kathmandu Residential Slabs',
    description: 'Estimate your monthly KUKL water bill in Kathmandu. Calculate volumetric charges and the 50% sewerage tax.',
  },
};

export default function Page() {
  return <Calculator />;
}
