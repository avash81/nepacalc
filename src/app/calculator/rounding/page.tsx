import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Rounding Calculator | Round Off Decimals & Significant Figures Nepal NepaCalc",
  description: "Round any number to the nearest whole, tenth, hundredth, or specified decimal place instantly. Professional precision tool for students in Nepal.",
  slug: 'rounding',
  keywords: ["rounding calculator nepal", "round off numbers", "round to nearest tenth", "significant figures calculator", "math precision tool", "decimal rounding calculator"],
});

export default function Page() {
  return (
    <Calculator />
  );
}
