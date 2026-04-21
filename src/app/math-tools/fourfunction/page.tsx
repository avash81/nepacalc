import { ScientificApp } from '@/components/ecosystem/ScientificApp';
import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: '4-Function Calculator — Simple Math Tool',
  description: 'Easy-to-use 4-function calculator for basic arithmetic: addition, subtraction, multiplication, and division. Perfect for quick daily calculations.',
  slug: 'math-tools/fourfunction',
  keywords: ['4 function calculator', 'simple calculator', 'basic math tool', 'online calculator'],
});

export default function FourFunctionPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <h1 className="sr-only">4-Function Calculator</h1>
      <ScientificApp mode="basic" />
    </div>
  );
}
