import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'NEPSE WACC & Tax Analyzer (v2)',
  description: 'Calculate your Weighted Average Cost of Capital (WACC) for Meroshare selling and capital gains tax declaration.',
  keywords: ['nepse wacc', 'average cost calculator', 'meroshare wacc', 'share profit tax']
};

export default function Page() {
  return <Calculator />;
}
