import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export function IncomeTaxHero() {
  return (
    <div className="bg-white border-b border-[#E8EAED] pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
      <div className="inline-flex items-center gap-2 bg-[#E6F4EA] text-[#137333] px-3 py-1 rounded-full text-xs font-bold mb-4">
        <ShieldCheck className="w-4 h-4" />
        <span>Trusted by Thousands</span>
      </div>
      
      <h1 className="text-3xl md:text-5xl font-black text-[#202124] tracking-tight mb-4">
        Nepal Income Tax Calculator <span className="text-[#1A73E8]">(FY 2083/84)</span>
      </h1>
      
      <p className="text-[#5F6368] max-w-2xl text-base md:text-lg mb-6">
        Calculate your Nepal income tax accurately using the latest FY 2083/84 tax slabs. 
        Fully compliant with the Government of Nepal Finance Act updates.
      </p>

      <div className="flex flex-wrap justify-center gap-3 text-sm font-medium text-[#3C4043]">
        <div className="flex items-center gap-1.5 bg-[#F1F3F4] px-3 py-1.5 rounded-md border border-[#DADCE0]">
          <CheckCircle2 className="w-4 h-4 text-[#1A73E8]" />
          <span>Finance Act 2083/84</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#F1F3F4] px-3 py-1.5 rounded-md border border-[#DADCE0]">
          <CheckCircle2 className="w-4 h-4 text-[#1A73E8]" />
          <span>Latest IRD Tax Slabs</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#F1F3F4] px-3 py-1.5 rounded-md border border-[#DADCE0]">
          <CheckCircle2 className="w-4 h-4 text-[#1A73E8]" />
          <span>SSF Compatible</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#F1F3F4] px-3 py-1.5 rounded-md border border-[#DADCE0]">
          <CheckCircle2 className="w-4 h-4 text-[#1A73E8]" />
          <span>Free</span>
        </div>
      </div>
    </div>
  );
}
