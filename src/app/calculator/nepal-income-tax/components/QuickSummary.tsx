import { CalendarDays, TrendingUp, ShieldCheck, Scale } from 'lucide-react';

export function QuickSummary() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#DADCE0] shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
          <div className="bg-[#E8F0FE] p-2 rounded-lg mb-3">
            <CalendarDays className="w-5 h-5 text-[#1A73E8]" />
          </div>
          <span className="text-xs font-bold text-[#5F6368] uppercase tracking-wider mb-1">Updated</span>
          <span className="text-lg font-black text-[#202124]">FY 2083/84</span>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-[#DADCE0] shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
          <div className="bg-[#FCE8E6] p-2 rounded-lg mb-3">
            <TrendingUp className="w-5 h-5 text-[#D93025]" />
          </div>
          <span className="text-xs font-bold text-[#5F6368] uppercase tracking-wider mb-1">Top Rate</span>
          <span className="text-lg font-black text-[#202124]">29%</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#DADCE0] shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
          <div className="bg-[#E6F4EA] p-2 rounded-lg mb-3">
            <ShieldCheck className="w-5 h-5 text-[#137333]" />
          </div>
          <span className="text-xs font-bold text-[#5F6368] uppercase tracking-wider mb-1">Tax Free</span>
          <span className="text-lg font-black text-[#202124] text-sm md:text-lg">1st Slab (SSF)</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#DADCE0] shadow-sm flex flex-col items-start hover:shadow-md transition-shadow">
          <div className="bg-[#FEF7E0] p-2 rounded-lg mb-3">
            <Scale className="w-5 h-5 text-[#E37400]" />
          </div>
          <span className="text-xs font-bold text-[#5F6368] uppercase tracking-wider mb-1">Compliance</span>
          <span className="text-lg font-black text-[#202124] text-sm md:text-lg">Govt Compliant</span>
        </div>
      </div>
    </div>
  );
}
