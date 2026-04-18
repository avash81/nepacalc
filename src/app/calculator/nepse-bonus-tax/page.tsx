import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'NEPSE Bonus & Dividend Tax Calculator (v2)',
  description: 'Calculate 5% tax on Nepal stock dividends and bonus shares accurately for FY 2081/82.',
  keywords: ['nepse bonus tax', 'dividend tax nepal', 'share tax calculator', 'meroshare tax']
};

export default function Page() {
  return <Calculator />;
}
