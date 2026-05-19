import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "TDS Calculator Nepal 2083/84 | Tax Deducted at Source | NepaCalc",
  description: "Calculate TDS for professional services, rent, interest, and commissions in Nepal for FY 2083/84. Stay compliant with IRD tax regulations.",
  slug: 'tds-calculator',
  keywords: ["tds calculator nepal", "tax deducted at source nepal", "professional service tds nepal", "rent tds nepal", "ird nepal tax rates"],
});

export default function Page() {
  return <Calculator />;
}
