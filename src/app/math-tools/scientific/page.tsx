import { ScientificApp } from '@/components/ecosystem/ScientificApp';
import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: "Math Tools and Calculators at NepaCalc",
  description: "Explore all free math tools and calculators at NepaCalc. Solve algebra geometry statistics and arithmetic problems online instantly",
  slug: 'math-tools/scientific',
  keywords: ["math tools", "nepal", "calculator", "free", "online"],
});

export default function ScientificCalculatorPage() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <h1 className="sr-only">Scientific Calculator</h1>
      <ScientificApp mode="scientific" />
    
    </div>
  );
}
