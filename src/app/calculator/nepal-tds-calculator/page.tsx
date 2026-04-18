import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Nepal TDS (Withholding Tax) Laboratory',
  description: 'Calculate 2081/82 TDS rates for rent, service fees, interest, and contracts in Nepal according to IRD guidelines.',
  keywords: ['tds calculator nepal', 'house rent tds', 'service tds nepal', 'withholding tax rates']
};

export default function Page() {
  return <Calculator />;
}
