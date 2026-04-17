import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Sleep Calculator | Wake up Refreshed | NEPACALC',
  description: 'Calculate the best time to wake up or go to bed based on 90-minute sleep cycles. Improve your sleep quality and wake up feeling great.',
  keywords: ['sleep calculator', 'sleep cycles', 'best time to wake up', 'bedtime calculator', 'circadian rhythm', 'sleep health'],
  openGraph: {
    title: 'Sleep Calculator | NEPACALC',
    description: 'Calculate your optimal sleep cycles.',
    siteName: 'NEPACALC', url: 'https://nepacalc.com/calculator/sleep', type: 'website',
  },
  alternates: { canonical: 'https://nepacalc.com/calculator/sleep' },
};

export default function SleepCalculatorPage() {
  return <Calculator />;
}
