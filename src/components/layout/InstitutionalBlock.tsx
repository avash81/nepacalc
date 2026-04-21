'use client';

import Link from 'next/link';

export function InstitutionalBlock() {
  return (
    <div className="mt-16 sm:mt-20 pt-8 border-t border-slate-200">
      <div className="w-full">
        <h2 className="text-[#202124] text-[15px] sm:text-[16px] font-bold tracking-tight mb-2">
          Simple Math & Finance Tools for Nepal
        </h2>
        <p className="text-[12px] sm:text-[13px] text-[#5f6368] leading-relaxed font-medium mb-5">
          Welcome to <strong>NEPACALC</strong>: your simple yet powerful toolkit for everything from school math to complex financial planning in Nepal. 
          We’ve combined a fast scientific calculator with an interactive graphing engine and over 80 specialized tools to help you get things done. 
          Whether you’re calculating your income tax, planning a loan EMI, or just need a quick unit conversion, NEPACALC provides accurate results 
          without the need for sign-ups. It’s free, it’s fast, and it’s built specifically for our local needs.
        </p>
        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
           <Link href="/sitemap/" className="text-[11px] sm:text-[12px] font-black text-red-600 hover:opacity-70 uppercase tracking-[0.15em] transition-opacity">
             Full Site Index &rarr;
           </Link>
           <Link href="/about" className="text-[11px] sm:text-[12px] font-black text-blue-600 hover:opacity-70 uppercase tracking-[0.15em] transition-opacity">
             Our Methodology &rarr;
           </Link>
        </div>
      </div>
    </div>
  );
}
