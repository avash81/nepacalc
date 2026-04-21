import { CalculusApp } from '@/components/ecosystem/CalculusApp';
import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: 'Calculus & Algebra Laboratory — NEPACALC',
  description: 'Solve derivatives, integrals, limits, and algebraic equations with step-by-step symbolic logic. Professional grade engineering tools.',
  slug: 'math-tools/calculus',
  keywords: ['calculus solver', 'derivative calculator', 'integral calculator', 'algebra solver', 'step by step math'],
});

export default function CalculusPage() {
  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      <h1 className="sr-only">Calculus & Algebra Laboratory</h1>
      <CalculusApp />
    </div>
  );
}
