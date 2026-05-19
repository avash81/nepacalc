import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Nepal Home Loan EMI Calculator 2083/84 | NRB Base Rate | NepaCalc",
  description: "Calculate home loan EMI in Nepal for FY 2083/84. Using NRB-mandated 'Base Rate + Premium' model with latest bank rates and mortgage rules.",
  slug: 'nepal-home-loan',
  keywords: ["home loan nepal 2083", "emi calculator nepal", "nrb base rate 2083", "nepal bank interest rates", "housing loan calculator kathmandu"],
});
export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

