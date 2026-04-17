import Calculator from './Calculator';
import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: 'Nepal TDS Calculator | Tax Deducted at Source | NEPACALC',
  description: 'Calculate Tax Deducted at Source (TDS) for various payments in Nepal including Rent, Interest, and Consultancy as per latest IRD guidelines.',
  keywords: ['nepal tds calculator', 'tds rates nepal', 'rent tds nepal', 'interest tds nepal', 'consultancy tds nepal', 'ird nepal tds'],
  slug: 'nepal-tds-calculator',
});

export default function NepalTdsPage() {
  return <Calculator />;
}
