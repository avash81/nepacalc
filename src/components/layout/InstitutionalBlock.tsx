'use client';

import Link from 'next/link';

export function InstitutionalBlock() {
  return (
    <div className="mt-16 sm:mt-20 pt-8 border-t border-slate-200 px-4 sm:px-0">
      <div className="w-full">
        <h2 className="text-[#202124] text-[15px] sm:text-[16px] font-bold tracking-tight mb-2">
          Free Online Calculators for Nepal and Worldwide
        </h2>
        <p className="text-[12px] sm:text-[13px] text-[#5f6368] leading-relaxed font-medium mb-5">
          Popular tools include the NEA Electricity Bill Calculator, Nepal Income Tax Calculator, Nepal Salary Tax Calculator, SIP Calculator, EMI Calculator, GPA Calculator, Scientific Calculator, Vehicle Tax Calculator, and Live Gold Price Tracker.
        </p>
        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
           <Link href="/sitemap/" className="text-[11px] sm:text-[12px] font-black text-red-600 hover:opacity-70 uppercase tracking-[0.15em] transition-opacity">
             Full Site Index &rarr;
           </Link>
           <Link href="/about/" className="text-[11px] sm:text-[12px] font-black text-blue-600 hover:opacity-70 uppercase tracking-[0.15em] transition-opacity">
             Our Methodology &rarr;
           </Link>
        </div>
      </div>
    </div>
  );
}

