import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "NEPSE WACC Calculator | Weighted Average Cost NepaCalc",
  description: "Calculate your Weighted Average Cost of Capital (WACC) for NEPSE. Track multiple buys, average down, and prepare for Meroshare tax declarations.",
  slug: 'nepse-wacc',
  keywords: ["nepse wacc calculator", "wacc calculation nepal", "meroshare wacc", "average cost of shares nepal", "cgt calculation nepse", "bonus share wacc"],
});
export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

