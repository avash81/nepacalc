import Calculator from '../../calculator/remittance-calculator/Calculator';
import { Metadata } from 'next';
import RemittanceDashboardClient from './RemittanceDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';

export const metadata: Metadata = {
  title: 'Live Remittance Board Nepal ,  Compare Western Union, IME Rates',
  description: 'Compare remittance rates to Nepal from around the world. Live Western Union, IME, and Prabhu Remit NPR conversions.',
  keywords: ['remittance rates nepal', 'send money to nepal', 'ime rates today', 'western union npr rate', 'remittance board live'],
  alternates: {
    canonical: 'https://NepaCalc.com/market-rates/remittance/',
  },
  openGraph: {
    title: 'Live Remittance Board Nepal | NepaCalc',
    description: 'Track and compare remittance rates for Nepal from Middle East, USA, and Australia. Real-time transparency.',
    type: 'article',
  },
};

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Live Remittance Board"
        description="Daily remittance indices synchronized with official provider exchange rates for the Nepalese market."
        crumbs={[{ label: 'Directory', href: '/directory/' }, { label: 'Remittance Board' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Exchange Rates', slug: '/market-rates/exchange-rate/' },
          { name: 'Live Gold Price', slug: '/market-rates/live-gold-price/' },
          { name: 'Income Tax', slug: '/calculator/nepal-income-tax/' }
        ]}
      >
        <RemittanceDashboardClient />
      </CalcWrapper>
    </div>
  );
}
