import Calculator from '../../calculator/remittance-calculator/Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Remittance Board Nepal — Compare Western Union, IME Rates',
  description: 'Compare remittance rates to Nepal from around the world. Live Western Union, IME, and Prabhu Remit NPR conversions.',
  keywords: ['remittance rates nepal', 'send money to nepal', 'ime rates today', 'western union npr rate', 'remittance board live'],
  openGraph: {
    title: 'Live Remittance Board Nepal | NEPACALC',
    description: 'Track and compare remittance rates for Nepal from Middle East, USA, and Australia. Real-time transparency.',
    type: 'article',
  },
};

export default function Page() {
  return <Calculator />;
}
