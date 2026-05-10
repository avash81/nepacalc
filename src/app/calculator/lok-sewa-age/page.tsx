import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "Lok Sewa Age Calculator Nepal | Check PSC Eligibility",
  description: "Check your exact age and eligibility for Lok Sewa Aayog (Public Service Commission) exams in Nepal. Calculate age limits for Kharidar, Nayab Subba, and Section Officer.",
  slug: 'lok-sewa-age',
  keywords: ["lok sewa age calculator", "psc nepal age limit", "kharidar age limit", "nasu age limit", "section officer age limit nepal", "age eligibility lok sewa"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

