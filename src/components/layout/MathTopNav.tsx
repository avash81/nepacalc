'use client';

import { Logo } from '@/components/ui/Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Grid, Hexagon, AlignLeft, Menu, Activity, X } from 'lucide-react';
import { useState } from 'react';

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
      <header className="h-[50px] w-full bg-white border-b border-gray-300 flex items-center justify-between px-4 z-[9000] fixed top-0 left-0 right-0 select-none shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-6 h-full">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo size="sm" />
          </Link>
          
          <div className="h-6 w-px bg-gray-300 hidden md:block"></div>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="hidden md:flex items-center gap-2 hover:bg-gray-100 h-9 px-3 rounded text-sm font-bold text-gray-700 transition-colors"
          >
            <span>Math Tools</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <span className="text-sm font-black text-gray-800 ml-2 hidden md:block">
            {activeLink.name}
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-4 h-full">
          <Link href="/blog" className="hidden border border-gray-300 px-3 py-1.5 rounded lg:flex text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">Resources</Link>
          <div className="flex items-center gap-2">
             <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex items-center justify-center h-10 w-10 hover:bg-gray-100 rounded-full"
             >
                {menuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
             </button>
          </div>
        </div>
      </header>

      {/* Math Tools Dropdown / Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-[50px] left-0 md:left-[140px] w-full md:w-[320px] bg-white border-b md:border md:rounded-b-lg border-gray-300 shadow-xl z-[8900] py-2 md:py-4 flex flex-col max-h-[calc(100vh-50px)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
           <div className="px-5 py-2 text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 mb-2">Math Tools Suite</div>
           {ECO_LINKS.map(link => {
             const Icon = link.icon;
             const isCurrent = pathname === link.path;
             return (
               <Link 
                  key={link.path} 
                  href={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors ${isCurrent ? 'bg-green-50/50' : ''}`}
               >
                 <Icon className={`w-5 h-5 ${isCurrent ? 'text-green-600' : 'text-gray-400'}`} />
                 <span className={`text-sm ${isCurrent ? 'font-black text-green-700' : 'font-semibold text-gray-700'}`}>{link.name}</span>
               </Link>
             )
           })}
           <div className="md:hidden border-t border-gray-100 mt-2 p-4 flex flex-col gap-3">
              <Link href="/blog" className="text-sm font-bold text-gray-600">Resources</Link>
           </div>
        </div>
      )}
      
      {/* Backdrop for desktop dropdown */}
      {menuOpen && <div className="hidden md:block fixed inset-0 z-[8800]" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
