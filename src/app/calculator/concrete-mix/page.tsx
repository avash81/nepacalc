import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'Concrete Mix Calculator (Cement, Sand & Aggregate Estimator)',
  description: 'Pro Civil engineering tool for calculating cement bags, sand, and aggregate volume for M5-M25 concrete grades. Optimized for Nepal construction standards.',
  slug: 'concrete-mix',
  keywords: ['concrete mix calculator', 'cement sand aggregate ratio', 'construction estimator nepal', 'm20 mix ratio'],
});

export default function Page() {
  return <Calculator />;
}
