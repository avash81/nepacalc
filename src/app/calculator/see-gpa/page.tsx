import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'SEE GPA Calculator | Grade Point Average for Nepal SE Examination | Equaly',
  description: 'Calculate your SEE GPA based on the latest grading system of Nepal. Average your marks and find your overall grade point.',
  keywords: ['see gpa calculator', 'nepal see results', 'gpa calculator nepal', 'grade point average', 'school leaving certificate gpa'],
  openGraph: {
    title: 'SEE GPA Calculator | Equaly',
    description: 'Calculate your SEE GPA accurately with the new grading system.',
    images: ['https://firebasestorage.googleapis.com/v0/b/equaly-np.appspot.com/o/tools%2Fsee-gpa-og.png?alt=media'],
  }
};

export default function SeeGpaPage() {
  return <Calculator />;
}
