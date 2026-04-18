import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Remittance & Forex Laboratory — Nepal Today’s Exchange Rates',
  description: 'Convert USD, SAR, QAR, AED, MYR to NPR. Compare Western Union, IME, and Prabhu Remit rates. Stay updated with daily NRB buying rates.',
};

export default function Page() {
  return <Calculator />;
}
