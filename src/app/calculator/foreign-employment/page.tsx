import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Foreign Employment Fee Checker Nepal 2083/84 | DOFE Limits",
  description: "Check legal DOFE fees and manpower agency limits for FY 2083/84. Verify costs for Malaysia, Qatar, Japan (SSW), and EPS Korea. Avoid overcharging.",
  slug: 'foreign-employment',
  keywords: ["foreign employment fee nepal 2083", "free visa free ticket rule", "manpower agency cost 2084", "dofe fee limit nepal", "japan ssw fees nepal"],
});
export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

