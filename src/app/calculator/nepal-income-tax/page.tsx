import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Income Tax Calculator 2081/82 | Tax Slabs Nepal NepaCalc",
  description: "Advanced income tax calculator for Nepal FY 2081/82. Calculate tax slabs, SSF benefits, and female rebates accurately. Verified for individual and couple taxpayers.",
  slug: 'nepal-income-tax',
  keywords: ["nepal income tax calculator 2081/82", "tax slabs nepal", "ssf tax waiver", "female tax rebate nepal", "salary tax calculator nepal", "married tax threshold nepal"],
});

export default function Page() {
  return <Calculator />;
}
