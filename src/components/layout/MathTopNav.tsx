'use client';

import { Logo } from '@/components/ui/Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Grid, Hexagon, AlignLeft, Menu, Activity, X, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { JsonLd } from '@/components/seo/JsonLd';

const ECO_LINKS = [
  { name: 'Graphing Calculator', path: '/math-tools/calculator', icon: Activity },
  { name: 'Scientific Calculator', path: '/math-tools/scientific', icon: Calculator },
  { name: 'Four Function Calculator', path: '/math-tools/fourfunction', icon: Calculator },
  { name: 'Matrix Calculator', path: '/math-tools/matrix', icon: Grid },
  { name: 'Test Practice', path: '/math-tools/practice', icon: AlignLeft },
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
           { name: 'Home', item: 'https://nepacalc.com' },
           { name: 'Math Tools', item: 'https://nepacalc.com/directory' },
           { name: activeLink.name, item: `https://nepacalc.com${activeLink.path}` }
         ]}
      />
      <header className="h-[48px] w-full bg-white border-b border-[#e8eaed] flex items-center justify-between px-4 z-[9000] fixed top-0 left-0 right-0 select-none shadow-sm">
        <div className="flex items-center gap-4 h-full">
          <button 
             onClick={() => window.history.length > 2 ? window.history.back() : (window.location.href = '/')}
             className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#5F6368] hover:text-[#1A73E8] transition-all border-r border-[#e8eaed] pr-4 h-full"
          >
             <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back</span>
          </button>
          
          <Link href="/" className="hover:opacity-80 transition-all flex items-center gap-4 group">
            <Logo size="sm" />
          </Link>
          
          <div className="h-4 w-px bg-[#e8eaed] hidden lg:block"></div>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 hover:bg-[#F1F3F4] h-8 px-3 rounded-lg text-[10px] font-black uppercase tracking-widest text-black transition-all border border-[#e8eaed]"
          >
            <span>Math Tools</span>
            <svg width="8" height="5" viewBox="0 0 10 6" fill="none" className={`transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`}>
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-[#FFC107] bg-black px-3 py-1 rounded-full hidden lg:block">
            {activeLink.name} Edition
          </span>
        </div>

        <div className="flex items-center gap-1 h-full">
          <Link href="/blog" className="hidden lg:flex items-center gap-2 px-4 h-8 rounded-lg text-[10px] font-black uppercase tracking-widest text-[#5F6368] hover:text-black hover:bg-[#F1F3F4] transition-all">Documentation</Link>
          <button 
             onClick={() => setMenuOpen(!menuOpen)}
             className="md:hidden flex items-center justify-center h-8 w-8 hover:bg-[#F1F3F4] rounded-lg"
          >
             {menuOpen ? <X className="w-4 h-4 text-black" /> : <Menu className="w-4 h-4 text-black" />}
          </button>
        </div>
      </header>

      {/* Math Tools Dropdown / Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-[48px] left-0 md:left-[140px] w-full md:w-[320px] bg-white border-b md:border md:rounded-b-lg border-[#e8eaed] shadow-2xl z-[8900] py-4 flex flex-col max-h-[calc(100vh-50px)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
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
    </>
  );
}
