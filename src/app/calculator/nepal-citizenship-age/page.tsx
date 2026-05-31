import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Citizenship Age Calculator | 16 Year Eligibility 2081 BS | NepaCalc",
  description: "Calculate your exact age for Nepal citizenship eligibility (16 years+). Accurate BS/AD date conversion. Check documents required for Nagarikta in 2081/82 BS.",
  slug: 'nepal-citizenship-age',
  keywords: ["nepal citizenship age calculator", "nagarikta age nepal", "16 year citizenship nepal", "citizenship eligibility nepal 2081"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

