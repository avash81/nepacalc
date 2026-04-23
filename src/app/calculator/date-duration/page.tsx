import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Date Duration Calculator | Days Between Dates Online Nepal NepaCal",
  description: "Calculate the exact number of days, weeks, months, and years between any two dates. Professional chronological tool for project planning in Nepal.",
  slug: 'date-duration',
  keywords: ["date duration calculator nepal", "days between dates", "time interval calculator", "date difference tool", "calculate weeks between dates", "project timeline tool"],
});

export default function Page() {
  return <Calculator />;
}
