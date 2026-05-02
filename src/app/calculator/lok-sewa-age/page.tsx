import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: "Lok Sewa Age Calculator Nepal | Check PSC Eligibility",
  description: "Check your exact age and eligibility for Lok Sewa Aayog (Public Service Commission) exams in Nepal. Calculate age limits for Kharidar, Nayab Subba, and Section Officer.",
  alternates: {
    canonical: 'https://nepacalc.com/calculator/lok-sewa-age/',
  },
};

export default function Page() {
  return <Calculator />;
}
