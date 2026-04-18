import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Property Capital Gains Tax (CGT) Calculator — Nepal Malpok Tax',
  description: 'Calculate property sales tax (CGT) in Nepal. Rates 5% vs 7.5% based on 5-year holding period. Includes Lalpurja gain calculation and exemptions.',
};

export default function Page() {
  return <Calculator />;
}
