'use client';

import { Logo } from '@/components/ui/Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Grid, Hexagon, AlignLeft, Menu, Activity, X, ArrowLeft, Binary, Sigma, FunctionSquare } from 'lucide-react';
import { useState } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';

const ECO_LINKS = [
  { name: 'Graphing Calculator', path: '/math-tools/calculator', icon: Activity },
  { name: 'Scientific Calculator', path: '/math-tools/scientific', icon: Calculator },
  { name: 'Calculus & Algebra', path: '/math-tools/calculus', icon: FunctionSquare },
  { name: 'Statistics Laboratory', path: '/math-tools/statistics', icon: Sigma },
  { name: 'Matrix Calculator', path: '/math-tools/matrix', icon: Grid },
  { name: 'Programmer Console', path: '/math-tools/programmer', icon: Binary },
  { name: 'Geometry Tool', path: '/math-tools/geometry', icon: Hexagon },
  { name: '3D Calculator', path: '/math-tools/3d', icon: Hexagon }
];

export function MathTopNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const activeLink = ECO_LINKS.find(l => pathname === l.path) || ECO_LINKS[0];

  return (
    <>
      <JsonLd 
         type="breadcrumb"
         breadcrumbItems={[
           { name: 'Home', item: 'https://NepaCalc.com' },
           { name: 'Math Tools', item: 'https://NepaCalc.com/directory' },
           { name: activeLink.name, item: `https://NepaCalc.com${activeLink.path}` }
         ]}
      />
      <header className="h-[44px] w-full bg-[#f8f9fa] border-b border-[#e8eaed] flex items-center justify-between px-4 sm:px-6 select-none relative z-[50]">
        <div className="flex items-center gap-2 h-full">
          <button 
             onClick={() => window.history.length > 2 ? window.history.back() : (window.location.href = '/')}
             className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#5F6368] hover:text-[#1A73E8] transition-all border-r border-[#e8eaed] pr-4 h-full"
          >
             <ArrowLeft className="w-3.5 h-3.5" /> <span>Back</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 hidden sm:inline">Home / Math Tools /</span>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 hover:bg-[#F1F3F4] h-7 px-3 rounded-lg text-[10px] font-black uppercase tracking-widest text-black transition-all border border-[#e8eaed] bg-white shadow-sm"
            >
              <span>{activeLink.name}</span>
              <svg width="8" height="5" viewBox="0 0 10 6" fill="none" className={`transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 h-full">
          <button 
             onClick={() => setMenuOpen(!menuOpen)}
             className="flex items-center justify-center h-8 px-3 hover:bg-[#F1F3F4] rounded-lg text-[10px] font-black uppercase tracking-widest text-[#5F6368]"
          >
             {menuOpen ? <X className="w-4 h-4 text-black" /> : <Menu className="w-4 h-4 text-black" />}
          </button>
        </div>
      {/* Math Tools Dropdown / Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 md:left-[140px] w-full md:w-[320px] bg-white border-b md:border md:rounded-b-lg border-[#e8eaed] shadow-sm z-[8900] py-4 flex flex-col max-h-[calc(100vh-120px)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
           <div className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#5F6368] border-b border-[#F1F3F4] mb-2 mx-2">Laboratory Suite</div>
           {ECO_LINKS.map(link => {
             const Icon = link.icon;
             const isCurrent = pathname === link.path;
             return (
               <Link 
                  key={link.path} 
                  href={link.path}
                   onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-4 px-6 py-4 transition-all ${isCurrent ? 'bg-black text-[#FFC107]' : 'hover:bg-[#F1F3F4] text-[#5F6368] hover:text-black'}`}
               >
                 <Icon className={`w-5 h-5 ${isCurrent ? 'text-[#FFC107]' : 'text-[#DADCE0]'}`} />
                 <span className={`text-[11px] font-black uppercase tracking-widest`}>{link.name}</span>
               </Link>
             )
           })}
        </div>
      )}
      
      {/* Backdrop for desktop dropdown */}
      {menuOpen && <div className="hidden md:block fixed inset-0 z-[8800]" onClick={() => setMenuOpen(false)} />}
      </header>
    </>
  );
}

