import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'NEA Electricity Bill Calculator — Nepal Domestic Tariff',
  description: 'Calculate your monthly NEA electricity bill with progressive slab rates, fixed service charges, and 13% VAT. Updated for Nepal FY 2081/82.',
  keywords: ['nea bill calculator', 'electricity bill nepal', 'nea tariff rates', 'calculate electricity bill'],
  slug: 'nea-bill',
});

export default function Page() {
  return <Calculator />;
}
