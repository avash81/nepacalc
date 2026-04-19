import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TU/PU Attendance Calculator — Nepal Exam Eligibility',
  description: 'Calculate your university attendance percentage for Tribhuvan University (TU) and Pokhara University (PU). Track the 75% eligibility threshold.',

  openGraph: {
    title: 'TU/PU Attendance Calculator — Nepal Exam Eligibility',
    description: 'Calculate your university attendance percentage for Tribhuvan University (TU) and Pokhara University (PU). Track the 75% eligibility threshold.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TU/PU Attendance Calculator — Nepal Exam Eligibility',
    description: 'Calculate your university attendance percentage for Tribhuvan University (TU) and Pokhara University (PU). Track the 75% eligibility threshold.',
  },
};

export default function Page() {
  return <Calculator />;
}
