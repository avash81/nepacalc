import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Age Calculator | Precise Years, Months & Days | NepaCalc",
  description: "Calculate your exact age in years, months, and days. Find your upcoming birthday countdown and life statistics instantly. Free, fast, and accurate.",
  slug: 'age-calculator',
  keywords: ["age calculator", "calculate age online", "how old am i", "birthday countdown", "exact age tool"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

