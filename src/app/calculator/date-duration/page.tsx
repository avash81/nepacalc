import Calculator from './Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Date Duration Calculator | NEPACALC',
  description: 'Free online date calculator to find the exact days, weeks, months, and years between any two dates. Professional calculation.',
  keywords: ['date calculator', 'days between dates', 'duration', 'months between dates', 'leap years', 'calculator'],

  openGraph: {
    title: 'Date Duration Calculator | NEPACALC',
    description: 'Free online date calculator to find the exact days, weeks, months, and years between any two dates. Professional calculation.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Date Duration Calculator | NEPACALC',
    description: 'Free online date calculator to find the exact days, weeks, months, and years between any two dates. Professional calculation.',
  },
};

export default function Page() {
  return <Calculator />;
}
