import Calculator from '../../calculator/gold-converter/Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Silver Price Today in Nepal — Chandi Tola & Gram Rates',
  description: 'Current silver (Chandi) prices in Nepal per tola and 10 grams. Live market benchmarks and official local federation rates.',
  keywords: ['silver price nepal', 'chandi rate today', 'silver price per tola', 'silver to gram nepal'],
  openGraph: {
    title: 'Live Silver Price Today Nepal | NEPACALC',
    description: 'Real-time silver rate dashboard for the Nepalese market. Per tola and gram conversions.',
    type: 'article',
  },
};

import SilverDashboardClient from './SilverDashboardClient';

export default function Page() {
  return <SilverDashboardClient />;
}
