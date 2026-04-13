import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'NEPSE Bonus & Dividend Tax Calculator | Nepal Share Market | Equaly',
  description: 'Calculate tax on bonus shares and cash dividends in the Nepal Stock Exchange (NEPSE). Accurate calculations for individual and institutional investors.',
  keywords: ['nepse bonus tax', 'dividend tax nepal', 'share market tax nepal', 'bonus share tax', 'nepal stock market calculator', 'meroshare tax'],
  openGraph: {
    title: 'NEPSE Bonus & Dividend Tax Calculator | Equaly',
    description: 'Calculate NEPSE dividend and bonus taxes accurately.',
    images: ['https://firebasestorage.googleapis.com/v0/b/equaly-np.appspot.com/o/tools%2Fnepse-tax-og.png?alt=media'],
  }
};

export default function NepseBonusTaxPage() {
  return <Calculator />;
}
