import Calculator from './Calculator';
import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: 'NEPSE Bonus & Dividend Tax Calculator | Nepal Share Market | NEPACALC',
  description: 'Calculate tax on bonus shares and cash dividends in the Nepal Stock Exchange (NEPSE). Accurate calculations for individual and institutional investors.',
  keywords: ['nepse bonus tax', 'dividend tax nepal', 'share market tax nepal', 'bonus share tax', 'nepal stock market calculator', 'meroshare tax'],
  slug: 'nepse-bonus-tax',
});

export default function NepseBonusTaxPage() {
  return <Calculator />;
}
