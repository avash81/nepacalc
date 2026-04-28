import { StatisticsApp } from '@/components/ecosystem/StatisticsApp';
import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: "Math Tools and Calculators at NepaCalc",
  description: "Explore all free math tools and calculators at NepaCalc. Solve algebra geometry statistics and arithmetic problems online instantly",
  slug: 'math-tools/statistics',
  keywords: ["math tools", "nepal", "calculator", "free", "online"],
});

export default function StatisticsPage() {
  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      <h1 className="sr-only">Statistics Laboratory</h1>
      <StatisticsApp />
    
    </div>
  );
}
