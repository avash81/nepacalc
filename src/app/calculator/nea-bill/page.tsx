import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEA Electricity Bill Calculator — Nepal Domestic Tariff',
  description: 'Calculate your monthly NEA electricity bill with progressive slab rates, fixed service charges, and 13% VAT. Updated for Nepal FY 2081/82.',

  openGraph: {
    title: 'NEA Electricity Bill Calculator — Nepal Domestic Tariff',
    description: 'Calculate your monthly NEA electricity bill with progressive slab rates, fixed service charges, and 13% VAT. Updated for Nepal FY 2081/82.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEA Electricity Bill Calculator — Nepal Domestic Tariff',
    description: 'Calculate your monthly NEA electricity bill with progressive slab rates, fixed service charges, and 13% VAT. Updated for Nepal FY 2081/82.',
  },
};

export default function Page() {
  return <Calculator />;
}
