'use client';

import Link from 'next/link';
import { AlertTriangle, Clock, RefreshCcw } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export default function HighTrafficPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden relative">
      
      {/* 🔬 Institutional Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'radial-gradient(#202124 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      
      <div className="relative z-10 max-w-xl flex flex-col items-center">
        <div className="mb-12">
           <Logo size="lg" theme="indigo" />
        </div>

        <div className="w-24 h-24 rounded-full bg-[#FFC107] flex items-center justify-center mb-8 shadow-sm shadow-yellow-500/20 animate-pulse-subtle">
           <AlertTriangle className="w-10 h-10 text-black" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-[#202124] tracking-tighter leading-tight mb-6 uppercase">
          Laboratory <span className="bg-black text-[#FFC107] px-4 py-1 rounded-xl">Overloaded</span>
        </h1>

        <div className="flex items-center gap-3 text-[#5F6368] font-black uppercase tracking-widest text-[11px] mb-8 bg-[#F1F3F4] px-6 py-3 rounded-full border border-[#DADCE0]">
           <Clock className="w-4 h-4 text-[#FFC107]" /> Our servers are experiencing high traffic right now
        </div>

        <p className="text-[#5F6368] text-lg font-medium leading-relaxed mb-12 opacity-80">
          We are currently processing an unprecedented volume of research requests. Please allow our systems a moment to calibrate before attempting your next calculation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
           <button 
             onClick={() => window.location.reload()}
             className="flex-1 flex items-center justify-center gap-3 bg-black text-[#FFC107] px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-sm hover:scale-105 active:scale-95 transition-all"
           >
             <RefreshCcw className="w-4 h-4" /> Try Again In A Minute
           </button>
           
           <Link 
             href="/"
             className="flex-1 flex items-center justify-center bg-[#F1F3F4] text-[#202124] px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#DADCE0] transition-all"
           >
             Institutional Home
           </Link>
        </div>

        <div className="mt-16 text-[10px] font-black uppercase tracking-[0.3em] text-[#DADCE0]">
           System Status: Temporary Calibration Required (NC-429)
        </div>
      </div>
    </div>
  );
}

