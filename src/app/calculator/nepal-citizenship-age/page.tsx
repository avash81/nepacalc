import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Nepal Citizenship Age Calculator | 16 Year Eligibility | NepaCalc",
  description: "Check if you are eligible for a Nepalese citizenship certificate. Calculate exact age from birth date (BS/AD) to verify the 16-year minimum requirement.",
  slug: 'nepal-citizenship-age',
  keywords: ["citizenship age nepal", "16 year citizenship nepal", "age calculator for citizenship nepal", "nagarkita age calculator"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

