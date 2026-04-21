import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'TU/PU Attendance Calculator — Nepal Exam Eligibility',
  description: 'Calculate your university attendance percentage for Tribhuvan University (TU) and Pokhara University (PU). Track the 75% eligibility threshold.',
  keywords: ['attendance calculator TU', 'TU attendance percentage', 'exam eligibility nepal', 'attendance calculator nepal'],
  slug: 'attendance',
});

export default function Page() {
  return <Calculator />;
}
