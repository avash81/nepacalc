import { ScientificApp } from '@/components/ecosystem/ScientificApp';
import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: 'Full Scientific Calculator Online — Advanced Math & Functions | NEPACALC',
  description: 'Pro-grade scientific calculator with Deg/Rad support, advanced trigonometry, and function history. Built for students and engineers in Nepal.',
  slug: 'math-tools/scientific',
  keywords: ['scientific calculator', 'online scientific calculator', 'trigonometry calculator', 'rad deg calculator'],
});

export default function ScientificCalculatorPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <h1 className="sr-only">Scientific Calculator</h1>
      <ScientificApp mode="scientific" />
    </div>
  );
}
