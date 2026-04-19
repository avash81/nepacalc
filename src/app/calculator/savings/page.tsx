import type { Metadata } from 'next';
import SavingsCalculator from './Calculator';
export const metadata: Metadata = {
  title: 'Savings Calculator Nepal — Future Value of Monthly Savings',
  description: 'Calculate how much your monthly savings will grow over time. See the power of compound interest on your savings in Nepal. Free online tool.',
  alternates: { canonical: 'https://nepacalc.com/calculator/savings' },

  openGraph: {
    title: 'Savings Calculator Nepal — Future Value of Monthly Savings',
    description: 'Calculate how much your monthly savings will grow over time. See the power of compound interest on your savings in Nepal. Free online tool.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savings Calculator Nepal — Future Value of Monthly Savings',
    description: 'Calculate how much your monthly savings will grow over time. See the power of compound interest on your savings in Nepal. Free online tool.',
  },
};
export default function SavingsPage() { return <SavingsCalculator />; }
