import { StatisticsApp } from '@/components/ecosystem/StatisticsApp';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Statistics Laboratory — NEPACALC',
  description: 'Perform advanced statistical analysis, T-tests, regressions, and data distributions. Professional laboratory grade data science tools.',
  keywords: ['statistics calculator', 'data analysis tool', 'linear regression', 'standard deviation calculator', 'mean median mode'],
};

export default function StatisticsPage() {
  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      <StatisticsApp />
    </div>
  );
}
