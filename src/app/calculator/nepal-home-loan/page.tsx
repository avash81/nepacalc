import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Home Loan & Banking EMI Console — Nepal (v2)',
  description: 'Calculate professional EMIs for home and vehicle loans using the official Base Rate + Premium model for Nepal.',
  keywords: ['home loan calculator nepal', 'banking emi nepal', 'base rate loan', 'emi calculator with amortization'],

  openGraph: {
    title: 'Home Loan & Banking EMI Console — Nepal (v2)',
    description: 'Calculate professional EMIs for home and vehicle loans using the official Base Rate + Premium model for Nepal.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Loan & Banking EMI Console — Nepal (v2)',
    description: 'Calculate professional EMIs for home and vehicle loans using the official Base Rate + Premium model for Nepal.',
  },
};

export default function Page() {
  return <Calculator />;
}
