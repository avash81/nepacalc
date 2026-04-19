import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEPSE Profit & CGT Calculator — Nepal Stock Trading Lab',
  description: 'Calculate net share profit after broker commissions (Jestha 2081 tiers), SEBON fees, and capital gains tax (5% vs 7.5%).',

  openGraph: {
    title: 'NEPSE Profit & CGT Calculator — Nepal Stock Trading Lab',
    description: 'Calculate net share profit after broker commissions (Jestha 2081 tiers), SEBON fees, and capital gains tax (5% vs 7.5%).',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEPSE Profit & CGT Calculator — Nepal Stock Trading Lab',
    description: 'Calculate net share profit after broker commissions (Jestha 2081 tiers), SEBON fees, and capital gains tax (5% vs 7.5%).',
  },
};

export default function Page() {
  return <Calculator />;
}
