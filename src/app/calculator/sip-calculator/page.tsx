import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'SIP Calculator Nepal Monthly Investment Returns',
  description: 'Calculate your SIP returns in Nepal for 2026. Optimized for Nepali banks and the current NEPSE market trends.',
  slug: 'sip-calculator',
  keywords: ["sip calculator nepal", "mutual fund return calculator", "nepse sip tool", "investment growth calculator", "sip step up calculator", "compound interest nepal"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

