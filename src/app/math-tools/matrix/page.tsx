import { Metadata } from 'next';
import { MatrixApp } from '@/components/ecosystem/MatrixApp';

export const metadata: Metadata = {
  title: 'Advanced Matrix Calculator ,  Operations, Inverse & Rank | NepaCalc',
  description: 'Pro-grade matrix laboratory for addition, multiplication, inverse, determinant, and rank. Designed for linear algebra students and engineering professionals.',
  alternates: {
    canonical: '/math-tools/matrix/',
  },
};

export default function MatrixCalculatorPage() {
  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      <h1 className="sr-only">Advanced Matrix Laboratory ,  Operations, Inverse & Rank</h1>
      <MatrixApp />
    </div>
  );
}
