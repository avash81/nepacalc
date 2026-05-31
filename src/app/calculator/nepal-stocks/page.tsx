import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "NEPSE Profit & CGT Calculator 2083/84 | Share Commission Nepal | NepaCalc",
  description: "Calculate NEPSE share profit after broker commission (FY 2083/84 rates), SEBON fee, DP fee, and capital gains tax (5% long-term / 7.5% short-term). Instant net profit result.",
  slug: 'nepal-stocks',
  keywords: ["nepse profit calculator", "share commission calculator nepal", "cgt nepse 2083", "nepse broker commission 2083 84"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

