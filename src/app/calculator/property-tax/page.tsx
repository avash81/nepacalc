import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'Property Capital Gains Tax (CGT) Calculator — Nepal Malpok Tax',
  description: 'Calculate property sales tax (CGT) in Nepal. Rates 5% vs 7.5% based on 5-year holding period. Includes Lalpurja gain calculation and exemptions.',
  keywords: ['property tax nepal', 'cgt nepal', 'capital gains tax nepal property', 'malpot tax calculator', 'land sales tax nepal'],
  slug: 'property-tax',
});

export default function Page() {
  return <Calculator />;
}
