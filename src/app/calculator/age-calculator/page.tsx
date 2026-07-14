import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Age Calculator – Calculate Exact Age in Years, Months & Days | NepaCalc",
  description: "Calculate your exact age instantly using the NepaCalc Age Calculator. Find your age in years, months, weeks, days, hours, minutes and seconds with automatic leap year support. Free online age calculator for worldwide use.",
  slug: 'age-calculator',
  keywords: [
    "Age Calculator", "Calculate Age", "Age Calculator Online", "Date of Birth Calculator",
    "Birthday Calculator", "Exact Age Calculator", "Age in Years Months Days", "How Old Am I",
    "Chronological Age Calculator", "Age Difference Calculator", "International Age Calculator",
    "Free Age Calculator", "Online Age Calculator"
  ],
  ogImage: "https://nepacalc.com/images/age-calculator.webp",
  canonical: "https://nepacalc.com/calculator/age-calculator/"
});

export default function Page() {
  return (
    <main className="bg-[#F1F3F4]">
      <Calculator />
    </main>
  );
}
