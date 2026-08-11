import { Metadata } from 'next';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: '100% Free Access | NepaCalc Professional Tools',
  description: 'NepaCalc is now free for everyone. Access 100+ precision calculators, engineering tools, and financial models for Nepal with no subscription.',
  alternates: { canonical: 'https://NepaCalc.com/pricing/' },
};

export default function PricingPage() {
  return <PricingClient />;
}

