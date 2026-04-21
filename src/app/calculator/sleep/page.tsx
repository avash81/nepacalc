import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'Sleep Calculator | Wake up Refreshed | NEPACALC',
  description: 'Calculate the best time to wake up or go to bed based on 90-minute sleep cycles. Improve your sleep quality and wake up feeling great.',
  keywords: ['sleep calculator', 'sleep cycles', 'best time to wake up', 'bedtime calculator', 'circadian rhythm', 'sleep health'],
  slug: 'sleep',
});

export default function SleepCalculatorPage() {
  return <Calculator />;
}
