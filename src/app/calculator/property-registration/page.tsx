import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
export const metadata = calcMeta({
  title: "Property Registration Fee Calculator Nepal 2083/84 | Malpot Fee",
  description: "Calculate Malpot property registration fees and stamp duty in Nepal for FY 2083/84. Rural & Urban rates with 25-50% female rebate and joint ownership rules.",
  slug: 'property-registration',
  keywords: ["property registration fee nepal 2083", "malpot fee calculator", "lalpurja tax nepal", "female property discount nepal", "joint registration fee nepal", "land pass fee 2083"],
});
export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

