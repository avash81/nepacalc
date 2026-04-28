import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Foreign Employment Fee Checker Nepal | DOFE Limit NepaCalc",
  description: "Verify if your manpower agency is overcharging you. Check legal DOFE fees for Qatar, UAE, Malaysia, Japan (SSW), and Korea (EPS).",
  slug: 'foreign-employment',
  keywords: ["foreign employment fee nepal", "free visa free ticket nepal", "manpower charge nepal", "dofe fee limit", "japan ssw cost nepal", "korea eps cost nepal"],
});
export default function Page() { return <Calculator />; }
