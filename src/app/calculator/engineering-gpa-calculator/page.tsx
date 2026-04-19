import { Metadata } from 'next';
import Calculator from './Calculator';

export const metadata: Metadata = {
  title: 'Engineering GPA ⚙️ — IOE, TU and KU Nepal | NEPACALC',
  description: 'Convert Engineering marks and percentages to GPA for IOE, Kathmandu University (KU), and TU students. Updated for 2082/83.',
  keywords: ['engineering gpa', 'ioe gpa', 'nepal gpa converter', 'tu engineering marks'],
  alternates: {
    canonical: 'https://nepacalc.com/calculator/engineering-gpa-calculator',
  },

  openGraph: {
    title: 'Engineering GPA ⚙️ — IOE, TU and KU Nepal | NEPACALC',
    description: 'Convert Engineering marks and percentages to GPA for IOE, Kathmandu University (KU), and TU students. Updated for 2082/83.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering GPA ⚙️ — IOE, TU and KU Nepal | NEPACALC',
    description: 'Convert Engineering marks and percentages to GPA for IOE, Kathmandu University (KU), and TU students. Updated for 2082/83.',
  },
};

export default function Page() {
  return <Calculator />;
}
