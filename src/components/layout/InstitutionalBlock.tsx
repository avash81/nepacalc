'use client';

import Link from 'next/link';

export function InstitutionalBlock() {
  return (
    <div className="mt-16 sm:mt-20 pt-8 border-t border-slate-200">
      <div className="w-full">
        <h2 className="text-[#202124] text-[15px] sm:text-[16px] font-bold tracking-tight mb-2">
          Free Online Calculators for Nepal
        </h2>
        <p className="text-[12px] sm:text-[13px] text-[#5f6368] leading-relaxed font-medium mb-3">
          NepaCalc is a Nepal-focused calculator platform offering free online tools for finance, taxation, electricity billing, education, engineering, health, unit conversion, and market rates. Our calculators are designed for students, professionals, businesses, homeowners, investors, and everyday users across Nepal.
        </p>
        <p className="text-[12px] sm:text-[13px] text-[#5f6368] leading-relaxed font-medium mb-3">
          Popular tools include the NEA Electricity Bill Calculator, Nepal Income Tax Calculator, Nepal Salary Tax Calculator, SIP Calculator, EMI Calculator, GPA Calculator, Land Area Converter, Scientific Calculator, Vehicle Tax Calculator, and Live Gold Price Tracker.
        </p>
        <p className="text-[12px] sm:text-[13px] text-[#5f6368] leading-relaxed font-medium mb-3">
          We continuously expand our calculator library to provide accurate, practical, and easy-to-use tools tailored to Nepal. Whether you are looking for a calculator in Nepal, a tax calculator, engineering calculator, GPA calculator, electricity bill calculator, or financial planning tool, NepaCalc provides free and easy-to-use online solutions.
        </p>
        <p className="text-[12px] sm:text-[13px] text-[#5f6368] leading-relaxed font-medium mb-5">
          Several calculators use publicly available information and official references where applicable, including Nepal Electricity Authority (NEA), Inland Revenue Department (IRD), Nepal Rastra Bank (NRB), Nepal Stock Exchange (NEPSE), and the Federation of Nepal Gold and Silver Dealers’ Association (FENEGOSIDA).
        </p>
        <div className="sr-only">
          NepaCalc provides calculators for Nepal including NEA bill calculators, income tax calculators, salary tax calculators, SIP calculators, EMI calculators, land area converters, engineering calculators, GPA calculators, scientific calculators, market rate tools, gold price calculators, silver price tools, stock calculators, and financial planning calculators.
        </div>
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

