import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';

export const metadata = calcMeta({
  title: "NEPAL TELECOM :: SEE.NTC.NET.NP :: SEE Results 2082/2083 | SEE GPA Calculator | NepaCalc",
  description: "Check SEE Results 2082/2083 with Marksheet. Calculate your SEE GPA online based on the official NEB grading system. Official SEE.NTC.NET.NP results portal data.",
  slug: 'see-gpa',
  keywords: ["see result 2082", "see result 2083", "nepal telecom see result", "see.ntc.net.np 2082", "see gpa calculator 2083", "neb gov np see result", "how to check see result with marksheet"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />
    </div>
  );
}

