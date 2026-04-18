import { CalculusApp } from '@/components/ecosystem/CalculusApp';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculus & Algebra Laboratory — NEPACALC',
  description: 'Solve derivatives, integrals, limits, and algebraic equations with step-by-step symbolic logic. Professional grade engineering tools.',
  keywords: ['calculus solver', 'derivative calculator', 'integral calculator', 'algebra solver', 'step by step math'],
};

export default function CalculusPage() {
  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      <CalculusApp />
    </div>
  );
}
