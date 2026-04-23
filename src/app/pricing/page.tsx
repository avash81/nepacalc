import { Metadata } from 'next';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: '100% Free Access | NEPACALC Professional Tools',
  description: 'NEPACALC is now free for everyone. Access 150+ precision calculators, engineering tools, and financial models for Nepal with no subscription.',
  alternates: { canonical: 'https://nepacalc.com/pricing/' },
};

export default function PricingPage() {
  return <PricingClient />;
}
