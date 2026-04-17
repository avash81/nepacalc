'use client';
import Link from 'next/link';
import { Globe, ShieldCheck, Zap } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { GLOBAL_CONFIG } from '@/config/GlobalConfig';

import { usePathname } from 'next/navigation';

export function Footer() {
  const path = usePathname();
  if (path.startsWith('/math-tools')) return null;

  return (
    <footer className="bg-[#002147] text-white pt-16 pb-24 lg:pb-12 mt-20 no-print select-none border-t-[3px] border-[#D4AF37]">
      <div className="hp-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-y-12 gap-x-8 mb-16 text-center sm:text-left">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col items-center sm:items-start pr-0 lg:pr-12">
            <div className="mb-6">
               <Logo size="sm" isWhite={true} />
            </div>
            <p className="text-white/70 text-[11px] leading-relaxed font-medium max-w-[280px]">
              The authoritative laboratory for professional-grade financial, tax, and engineering research. Verified for computational precision {GLOBAL_CONFIG.CURRENT_YEAR}.
            </p>
            <div className="mt-6 flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-[#D4AF37]/30">
                  <span className="text-[10px] font-black text-[#D4AF37]">NP</span>
               </div>
               <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Nepal Authorized Research Edition</span>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h3 className="text-[#D4AF37] font-black mb-6 uppercase tracking-[0.25em] text-[10px]">Academic Tools</h3>
              <ul className="space-y-3 text-[11px] font-bold">
                <li><Link href="/math-tools" className="text-white/80 hover:text-white transition-colors">Math Laboratory</Link></li>
                <li><Link href="/calculator" className="text-white/80 hover:text-white transition-colors">Tool Directory</Link></li>
                <li><Link href="/blog" className="text-white/80 hover:text-white transition-colors">Journal & Guides</Link></li>
                <li><Link href="/math-tools/scientific" className="text-white/80 hover:text-white transition-colors">Scientific Suite</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#D4AF37] font-black mb-6 uppercase tracking-[0.25em] text-[10px]">Specialized</h3>
              <ul className="space-y-3 text-[11px] font-bold">
                <li><Link href="/calculator/category/finance" className="text-white/80 hover:text-white transition-colors">Economic Analysis</Link></li>
                <li><Link href="/calculator/category/health" className="text-white/80 hover:text-white transition-colors">Biological Metrics</Link></li>
                <li><Link href="/calculator/category/engineering" className="text-white/80 hover:text-white transition-colors">Structural Labs</Link></li>
                <li><Link href="/calculator/category/nepal" className="text-white/80 hover:text-white transition-colors">National Standards</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#D4AF37] font-black mb-6 uppercase tracking-[0.25em] text-[10px]">Institutional</h3>
              <ul className="space-y-3 text-[11px] font-bold">
                <li><Link href="/about" className="text-white/80 hover:text-white transition-colors">Our Mission</Link></li>
                <li><Link href="/contact" className="text-white/80 hover:text-white transition-colors">Board of Contact</Link></li>
                <li><Link href="/privacy" className="text-white/80 hover:text-white transition-colors">Security Manual</Link></li>
                <li><Link href="/terms" className="text-white/80 hover:text-white transition-colors">Ethical Terms</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#D4AF37] font-black mb-6 uppercase tracking-[0.25em] text-[10px]">Support</h3>
              <ul className="space-y-3 text-[11px] font-bold">
                <li><Link href="/calculator/loan-emi" className="text-white/80 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/blog" className="text-white/80 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/contact" className="text-white/80 hover:text-white transition-colors">Submit Report</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/90">
              <span>© {GLOBAL_CONFIG.CURRENT_YEAR} NEPACALC PRECISION LABORATORY</span>
              <div className="hidden sm:block w-px h-4 bg-white/20" />
              <div className="flex items-center gap-6">
                 <span className="flex items-center gap-2 text-[#D4AF37]"><ShieldCheck className="w-4 h-4" /> COMPLIANT</span>
                 <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> GLOBAL EDITION</span>
              </div>
           </div>
           <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] bg-white/5 px-6 py-2 rounded-full border border-[#D4AF37]/20">
              ISO 27001:2022 STANDARDIZED
           </div>
        </div>
      </div>
    </footer>
  );
}

