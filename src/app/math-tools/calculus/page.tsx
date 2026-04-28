import { CalculusApp } from '@/components/ecosystem/CalculusApp';
import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: "Math Tools and Calculators at NepaCalc",
  description: "Explore all free math tools and calculators at NepaCalc. Solve algebra geometry statistics and arithmetic problems online instantly",
  slug: 'math-tools/calculus',
  keywords: ["math tools", "nepal", "calculator", "free", "online"],
});

export default function CalculusPage() {
  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      <h1 className="sr-only">Calculus & Algebra Laboratory</h1>
      <CalculusApp />
    
    </div>
  );
}
