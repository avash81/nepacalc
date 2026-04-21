import Calculator from '../../calculator/currency-converter/Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Exchange Rate Nepal — USD, INR, GBP to NPR Today',
  description: 'Official foreign exchange rates in Nepal. Real-time USD, INR, EUR, and GBP to NPR conversions synchronized with NRB benchmarks.',
  keywords: ['exchange rate nepal', 'usd to npr live', 'inr to npr rate', 'forex nepal today', 'nrb exchange rate'],
  openGraph: {
    title: 'Live Foreign Exchange Rates Nepal | NEPACALC',
    description: 'Track live currency exchange rates against the Nepalese Rupee (NPR). Official indices and NRB sync.',
    type: 'article',
  },
};

import ForexDashboardClient from './ForexDashboardClient';

export default function Page() {
  return <ForexDashboardClient />;
}
