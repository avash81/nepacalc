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
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border)] pt-12 pb-24 lg:pb-10 mt-20 text-[var(--text-secondary)] no-print select-none">
      <div className="hp-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-y-10 gap-x-4 mb-12 text-center sm:text-left">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col items-center sm:items-start pr-4 sm:pr-12">
            <div className="mb-4">
               <Logo size="sm" />
            </div>
            <p className="text-[var(--text-muted)] text-[11px] leading-relaxed font-medium max-w-[240px]">
              The authoritative laboratory for professional-grade financial, tax, and engineering calculations. Verified for precision {GLOBAL_CONFIG.CURRENT_YEAR}.
            </p>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h3 className="text-[var(--text-main)] font-black mb-4 uppercase tracking-[0.2em] text-[10px]">Finance</h3>
              <ul className="space-y-2 text-[11px] font-bold">
                <li><Link href="/calculator/loan-emi" className="hover:text-[var(--primary)] transition-colors">EMI Engine</Link></li>
                <li><Link href="/calculator/sip-calculator" className="hover:text-[var(--primary)] transition-colors">SIP Wealth</Link></li>
                <li><Link href="/calculator/tax-hub" className="hover:text-[var(--primary)] transition-colors">Tax Hub</Link></li>
                <li><Link href="/calculator/discount-calculator" className="hover:text-[var(--primary)] transition-colors">Discounts</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[var(--text-main)] font-black mb-4 uppercase tracking-[0.2em] text-[10px]">Technical</h3>
              <ul className="space-y-2 text-[11px] font-bold">
                <li><Link href="/math-tools/scientific" className="hover:text-[var(--primary)] transition-colors">Scientific</Link></li>
                <li><Link href="/calculator/concrete-mix" className="hover:text-[var(--primary)] transition-colors">Civil Eng</Link></li>
                <li><Link href="/math-tools/geometry" className="hover:text-[var(--primary)] transition-colors">Geometry</Link></li>
                <li><Link href="/calculator/physics-force" className="hover:text-[var(--primary)] transition-colors">Physics</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[var(--text-main)] font-black mb-4 uppercase tracking-[0.2em] text-[10px]">Academic</h3>
              <ul className="space-y-2 text-[11px] font-bold">
                <li><Link href="/calculator/gpa" className="hover:text-[var(--primary)] transition-colors">GPA Suite</Link></li>
                <li><Link href="/math-tools/practice" className="hover:text-[var(--primary)] transition-colors">Test Practice</Link></li>
                <li><Link href="/calculator/age-calculator" className="hover:text-[var(--primary)] transition-colors">Timeline</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[var(--text-main)] font-black mb-4 uppercase tracking-[0.2em] text-[10px]">Platform</h3>
              <ul className="space-y-2 text-[11px] font-bold">
                <li><Link href="/blog" className="hover:text-[var(--primary)] transition-colors">Resources</Link></li>
                <li><Link href="/about" className="hover:text-[var(--primary)] transition-colors">Mission</Link></li>
                <li><Link href="/privacy" className="hover:text-[var(--primary)] transition-colors">Privacy</Link></li>
                <li><Link href="/contact" className="hover:text-[var(--primary)] transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
           <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
              <span>© {GLOBAL_CONFIG.CURRENT_YEAR} NEPACALC MATHEMATICAL LABORATORY</span>
              <div className="w-px h-3 bg-[var(--border)]" />
              <div className="flex items-center gap-4">
                 <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[var(--primary)]" /> SECURED</span>
                 <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> GLOBAL EDITION</span>
              </div>
           </div>
           <div className="text-[9px] font-black uppercase tracking-[0.2em]">ISO 27001:2022 STANDARDIZED MATHEMATICS</div>
        </div>
      </div>
    </footer>
  );
}

