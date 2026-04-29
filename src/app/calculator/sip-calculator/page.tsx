import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: 'SIP Calculator Nepal Monthly Investment Returns',
  description: 'Calculate SIP returns for Nepal mutual funds. Monthly and yearly projections.',
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
