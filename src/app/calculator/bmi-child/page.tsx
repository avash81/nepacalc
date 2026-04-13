import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'BMI Calculator for Kids & Teens | Child BMI Percentile | Equaly',
  description: 'Calculate BMI for children and teenagers (ages 2-19). Understand BMI-for-age percentiles and growth patterns for boys and girls.',
  keywords: ['child bmi calculator', 'teen bmi', 'growth chart', 'bmi for kids', 'body mass index child', 'nepal child health'],
  openGraph: {
    title: 'BMI Calculator for Kids & Teens | Equaly',
    description: 'Track your child\'s health with our specialized BMI calculator.',
    images: ['https://firebasestorage.googleapis.com/v0/b/equaly-np.appspot.com/o/tools%2Fbmi-child-og.png?alt=media'],
  }
};

export default function BmiChildPage() {
  return <Calculator />;
}
