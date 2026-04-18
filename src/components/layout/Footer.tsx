'use client';
import Link from 'next/link';
import { Globe, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { GLOBAL_CONFIG } from '@/config/GlobalConfig';

import { usePathname } from 'next/navigation';

export function Footer() {
  const path = usePathname();

  return (
    <footer className="bg-[#002147] text-white/90 pt-10 pb-24 lg:pb-12 mt-0 no-print select-none border-t-[3px] border-[#FFC107]">
      <div className="hp-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-y-8 gap-x-8 mb-8 text-center sm:text-left">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col items-center sm:items-start pr-0 lg:pr-12">
            <div className="mb-4">
               <Logo size="sm" theme="white" />
            </div>
            <p className="text-white font-bold text-[10px] leading-relaxed max-w-[260px]">
              The authoritative laboratory for professional-grade research. Verified for institutional precision.
            </p>
            <div className="mt-4 flex items-center gap-3">
               <div className="w-7 h-7 rounded-full bg-black border border-white/20 flex items-center justify-center">
                  <span className="text-[9px] font-black text-[#FFC107]">NP</span>
               </div>
               <span className="text-[8px] font-black uppercase tracking-widest text-white">Research Edition</span>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="space-y-4">
              <h3 className="text-[#FFC107] font-black uppercase tracking-[0.1em] text-[10px] border-b border-white/10 pb-1.5">Academic</h3>
              <ul className="space-y-2 text-[11px] font-bold">
                <li><Link href="/math-tools" className="text-white hover:text-[#FFC107] transition-all">Laboratory</Link></li>
                <li><Link href="/directory" className="text-white hover:text-[#FFC107] transition-all">Tool Directory</Link></li>
                <li><Link href="/health" className="text-white hover:text-[#FFC107] transition-all">Health & Fitness</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-[#FFC107] font-black uppercase tracking-[0.1em] text-[10px] border-b border-white/10 pb-1.5">Economics</h3>
              <ul className="space-y-2 text-[11px] font-bold">
                <li><Link href="/finance" className="text-white hover:text-[#FFC107] transition-all">Financial Hub</Link></li>
                <li><Link href="/nepal" className="text-white hover:text-[#FFC107] transition-all">Nepal Specific</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-[#FFC107] font-black uppercase tracking-[0.1em] text-[10px] border-b border-white/10 pb-1.5">Institutional</h3>
              <ul className="space-y-2 text-[11px] font-bold">
                <li><Link href="/about" className="text-white hover:text-[#FFC107] transition-all">Our Mission</Link></li>
                <li><Link href="/education" className="text-white hover:text-[#FFC107] transition-all">Education Hub</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-[#FFC107] font-black uppercase tracking-[0.1em] text-[10px] border-b border-white/10 pb-1.5">Support</h3>
              <ul className="space-y-2 text-[11px] font-bold">
                <li><Link href="/utility" className="text-white hover:text-[#FFC107] transition-all">Utility Tools</Link></li>
                <li><Link href="/privacy" className="text-white hover:text-[#FFC107] transition-all">Privacy Policy</Link></li>
                <li><Link href="/blog" className="text-white hover:text-[#FFC107] transition-all">Institutional Blog</Link></li>
                <li><Link href="/contact" className="text-white hover:text-[#FFC107] transition-all">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.15em] text-white/50">
              <span>© NEPACALC — Research & Laboratory Edition</span>
              <div className="hidden sm:block w-px h-3 bg-white/10" />
              <div className="flex items-center gap-4">
                 <span className="flex items-center gap-1.5 font-black text-white"><ShieldCheck className="w-3.5 h-3.5 text-[#FFC107]" /> COMPLIANT</span>
              </div>
           </div>
           <div className="text-[9px] font-black uppercase tracking-[0.15em] text-black bg-[#FFC107] px-6 py-2 rounded-full border border-black shadow-xl shadow-yellow-500/10">
              NEPACALC — PROFESSIONAL NEPAL CALCULATORS & GUIDES
           </div>
        </div>
      </div>
    </footer>
  );
}
