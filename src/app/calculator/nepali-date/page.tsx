import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Nepali Date Converter | AD to BS & BS to AD NepaCalc",
  description: "Accurate Gregorian (AD) to Bikram Sambat (BS) date converter. Syncs directly with Nepal Panchanga for accurate days, months, and leap years.",
  slug: 'nepali-date',
  keywords: ["nepali date converter", "ad to bs converter", "bs to ad converter", "english to nepali date", "bikram sambat calculator", "nepali calendar converter"],
});
export default function Page() { return <Calculator />; }
