import { Metadata } from 'next';
import { MatrixApp } from '@/components/ecosystem/MatrixApp';

export const metadata: Metadata = {
  title: 'Advanced Matrix Calculator — Operations, Inverse & Rank | NEPACALC',
  description: 'Pro-grade matrix laboratory for addition, multiplication, inverse, determinant, and rank. Designed for linear algebra students and engineering professionals.',
  alternates: {
    canonical: '/math-tools/matrix',
  },
};

export default function MatrixCalculatorPage() {
  return <MatrixApp />;
}
