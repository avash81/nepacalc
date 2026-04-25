import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal TDS Calculator 2081/82 | Tax Deducted at Source NepaCalc",
  description: "Calculate TDS for rent, consultancy, interest, and dividends in Nepal. Updated with latest IRD tax rates and VAT service rules for 2081/82.",
  slug: 'nepal-tds',
  keywords: ["nepal tds calculator", "tax deducted at source nepal", "rent tax nepal", "consultancy tds nepal", "ird tds rates 2081", "tds on dividend nepal"],
});

export default function Page() {
  return <Calculator />;
}
