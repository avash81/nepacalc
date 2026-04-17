'use client';

import Link from 'next/link';
import { Activity, Calculator, Grid, Hexagon, AlignLeft, ChevronRight, Zap } from 'lucide-react';

const MATH_TOOLS = [
  {
    title: 'Graphing Calculator',
    description: 'Explore math with our beautiful, free online graphing calculator. Graph functions, plot points, visualize algebraic equations.',
    icon: Activity,
    path: '/math-tools/calculator',
    tag: 'Flagship Tool'
  },
  {
    title: 'Scientific Calculator',
    description: 'Advanced features for evaluating percentages, fractions, exponential functions, and logarithms.',
    icon: Calculator,
    path: '/math-tools/scientific',
  },
  {
    title: 'Geometry Tool',
    description: 'Explore geometry construct polygons, transform objects, and explore spatial math concepts visually.',
    icon: Hexagon,
    path: '/math-tools/geometry',
  },
  {
    title: 'Matrix Calculator',
    description: 'Perform arithmetic operations, find the determinant, inverse, or REF of matrices in a laboratory environment.',
    icon: Grid,
    path: '/math-tools/matrix',
  },
  {
    title: '3D Calculator',
    description: 'Graph surfaces, visualize vector fields, and plot parameterized curves in three-dimensional space.',
    icon: Hexagon,
    path: '/math-tools/3d',
  },
  {
    title: 'Test Practice',
    description: 'Practice using the testing versions of our calculators in a secure, high-precision environment.',
    icon: AlignLeft,
    path: '/math-tools/practice',
  }
];

export default function MathToolsPillarPage() {
  return (
    <div className="w-full min-h-screen bg-[#F1F3F4] flex flex-col pt-14 relative overflow-hidden">
      
      {/* 🔬 SCIENTIFIC GRID BACKGROUND (MATCHING HOME) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'radial-gradient(#202124 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0" 
           style={{ backgroundImage: 'linear-gradient(#202124 1px, transparent 1px), linear-gradient(90deg, #202124 1px, transparent 1px)', backgroundSize: '128px 128px' }}></div>

      {/* Hero Section: Mathematical Laboratory */}
      <div className="hp-container relative z-10 pt-20 pb-16 text-center">
         <div className="flex items-center justify-center gap-2 text-[#1A73E8] font-black uppercase tracking-[0.3em] text-[10px] mb-6">
            <Zap className="w-4 h-4 fill-current" /> Verified Laboratory Standards
         </div>
         <h1 className="text-6xl sm:text-8xl font-black text-[#202124] tracking-tighter leading-none mb-8">
            Mathematical <span className="text-[#1A73E8]">Laboratory</span>
         </h1>
         <p className="text-xl text-[#5F6368] font-medium max-w-2xl mx-auto mb-12 leading-relaxed opacity-80">
            Professional-grade mathematical visualization tools engineered for precision, speed, and deep scientific exploration.
         </p>
         
         <Link 
           href="/math-tools/calculator"
           className="inline-flex items-center gap-4 bg-[#1A73E8] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/40 transition-all hover:-translate-y-1 active:scale-95"
         >
           Launch Graphing Console
         </Link>
      </div>

      {/* Directory Section: Laboratory Sheet */}
      <div className="flex-1 relative z-10 px-4 pb-24">
        <div className="hp-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-1 bg-[#DADCE0] border border-[#DADCE0] rounded-[2.5rem] overflow-hidden shadow-2xl">
             {MATH_TOOLS.map(tool => {
               const Icon = tool.icon;
               return (
                 <Link 
                   key={tool.path}
                   href={tool.path}
                   className="group bg-white p-10 hover:bg-[#F8F9FA] transition-all flex flex-col h-full border-[0.5px] border-[#DADCE0]/10"
                 >
                    <div className="mb-8 flex justify-between items-start">
                       <div className="w-14 h-14 rounded-2xl bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-[#1A73E8] group-hover:text-white shadow-sm">
                          <Icon className="w-6 h-6" />
                       </div>
                       {tool.tag && (
                         <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-[#E8F0FE] text-[#1A73E8] rounded-full">
                           {tool.tag}
                         </span>
                       )}
                    </div>
                    
                    <h2 className="text-2xl font-black text-[#202124] mb-4 tracking-tight group-hover:text-[#1A73E8] transition-colors">
                      {tool.title}
                    </h2>
                    <p className="text-[#5F6368] leading-relaxed font-medium flex-1 text-[15px] opacity-80 group-hover:opacity-100 transition-opacity">
                      {tool.description}
                    </p>
                    
                    <div className="mt-10 flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-[#1A73E8] opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                       <span>Initialize Tool</span>
                       <ChevronRight className="w-4 h-4" />
                    </div>
                 </Link>
               )
             })}
          </div>

          <div className="mt-16 text-center text-[#5F6368] text-[11px] font-black uppercase tracking-[0.3em] opacity-40">
             Laboratory Session ID: NC-MATH-2026-B
          </div>
        </div>
      </div>
    </div>
  );
}
