import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'BMI Calculator for Kids & Teens | Child BMI Percentile | NEPACALC',
  description: 'Calculate BMI for children and teenagers (ages 2-19). Understand BMI-for-age percentiles and growth patterns for boys and girls.',
  keywords: ['child bmi calculator', 'teen bmi', 'growth chart', 'bmi for kids', 'body mass index child', 'nepal child health'],
  openGraph: {
    title: 'BMI Calculator for Kids & Teens | NEPACALC',
    description: 'Track your child\'s health with our specialized BMI calculator.',
    siteName: 'NEPACALC',
    url: 'https://nepacalc.com/calculator/bmi-child',
    type: 'website',
  },
  alternates: { canonical: 'https://nepacalc.com/calculator/bmi-child' },
};

export default function BmiChildPage() {
  return <Calculator />;
}
