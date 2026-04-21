import { StatisticsApp } from '@/components/ecosystem/StatisticsApp';
import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: 'Statistics Laboratory — NEPACALC',
  description: 'Perform advanced statistical analysis, T-tests, regressions, and data distributions. Professional laboratory grade data science tools.',
  slug: 'math-tools/statistics',
  keywords: ['statistics calculator', 'data analysis tool', 'linear regression', 'standard deviation calculator', 'mean median mode'],
});

export default function StatisticsPage() {
  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      <h1 className="sr-only">Statistics Laboratory</h1>
      <StatisticsApp />
    </div>
  );
}
