import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'NEPSE WACC Calculator — Calculate Average Share Cost in Nepal',
  description: 'Official NEPSE WACC calculator. Calculate Weighted Average Cost of Capital (WACC) for stocks including bonus and right shares for accurate profit and tax estimation.',
  slug: 'nepse-wacc',
  keywords: ['nepse wacc calculator', 'average cost nepal stocks', 'share market tax nepal', 'bonus share wacc'],
});

export default function Page() {
  return <Calculator />;
}
