import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "SIP Calculator Nepal 2082/83 | Systematic Investment | NepaCalc",
  description: "Calculate your SIP returns for Nepal mutual funds. Features compounding, step-up SIP, and inflation adjustment. Plan your wealth with NepaCalc 2082/83 rates.",
  slug: 'sip-calculator',
  keywords: ["sip calculator nepal", "nepal mutual fund sip", "sip return calculator", "systematic investment plan nepal", "best sip calculator nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

