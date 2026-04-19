import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'TU/PU Attendance Calculator — 75% Eligibility Tracker',
  description: 'Check if you meet the mandatory 75% attendance requirement for TU and PU exams. Find out how many classes you can miss or must attend.',
  keywords: ['tu attendance calculator', 'pu attendance nepal', 'university attendance 75 percent', 'exam eligibility nepal'],

  openGraph: {
    title: 'TU/PU Attendance Calculator — 75% Eligibility Tracker',
    description: 'Check if you meet the mandatory 75% attendance requirement for TU and PU exams. Find out how many classes you can miss or must attend.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TU/PU Attendance Calculator — 75% Eligibility Tracker',
    description: 'Check if you meet the mandatory 75% attendance requirement for TU and PU exams. Find out how many classes you can miss or must attend.',
  },
};

export default function Page() {
  return <Calculator />;
}
