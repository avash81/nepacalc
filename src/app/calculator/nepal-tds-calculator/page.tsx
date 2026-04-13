import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Nepal TDS Calculator | Tax Deducted at Source 2082/83 | Equaly',
  description: 'Calculate Tax Deducted at Source (TDS) for various payments in Nepal including Rent, Interest, and Consultancy as per IRD guidelines.',
  keywords: ['nepal tds calculator', 'tds rates nepal', 'rent tds nepal', 'interest tds nepal', 'consultancy tds nepal', 'ird nepal tds'],
  openGraph: {
    title: 'Nepal TDS Calculator | Equaly',
    description: 'Calculate Nepal TDS for all payment types accurately.',
    images: ['https://firebasestorage.googleapis.com/v0/b/equaly-np.appspot.com/o/tools%2Ftds-og.png?alt=media'],
  }
};

export default function NepalTdsPage() {
  return <Calculator />;
}
