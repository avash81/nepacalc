import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Sleep Calculator | Wake up Refreshed | Equaly',
  description: 'Calculate the best time to wake up or go to bed based on 90-minute sleep cycles. Improve your sleep quality and wake up feeling great.',
  keywords: ['sleep calculator', 'sleep cycles', 'best time to wake up', 'bedtime calculator', 'circadian rhythm', 'sleep health'],
  openGraph: {
    title: 'Sleep Calculator | Equaly',
    description: 'Calculate your optimal sleep cycles.',
    images: ['https://firebasestorage.googleapis.com/v0/b/equaly-np.appspot.com/o/tools%2Fsleep-og.png?alt=media'],
  }
};

export default function SleepCalculatorPage() {
  return <Calculator />;
}
