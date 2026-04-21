import Calculator from '../../calculator/gold-converter/Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Gold Price Today in Nepal — 24K Hallmark & 22K Tejabi',
  description: 'Real-time gold rates in Nepal per tola and gram. Official FENEGOSIDA benchmarks for 24K and 22K gold hallmarked jewelry.',
  keywords: ['gold price nepal', 'gold tola price today', '24k gold price nepal', '22k gold price nepal', 'gold converter nepal'],
  openGraph: {
    title: 'Live Gold Price Today Nepal | NEPACALC',
    description: 'Track hallmark and tejabi gold rates in Nepal per tola and gram with live market updates.',
    type: 'article',
  },
};

import GoldDashboardClient from './GoldDashboardClient';

export default function Page() {
  return <GoldDashboardClient />;
}
