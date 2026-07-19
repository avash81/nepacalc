'use client';
import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

const PURPLE = '#5b5ea6';

export function HomeHero() {
  const [CalculatorComponent, setCalculatorComponent] = useState<React.ComponentType | null>(null);
  const [isActivating, setIsActivating] = useState(false);

  const handleActivate = async () => {
    setIsActivating(true);
    try {
      const mod = await import('./HomePageCalculatorClient');
      setCalculatorComponent(() => mod.default);
    } catch (err) {
      console.error('Failed to load calculator', err);
    } finally {
      setIsActivating(false);
    }
  };

  if (CalculatorComponent) {
    return <CalculatorComponent />;
  }

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto gap-3">
      <div
        className="w-full h-[300px] lg:h-[340px] bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-6 cursor-pointer group hover:border-blue-300 hover:shadow-md transition-all duration-300"
        onClick={handleActivate}
        role="button"
        aria-label="Launch Calculator"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#5b5ea6] to-[#3b3e8a] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
          <Calculator className="w-10 h-10 text-[#202124]" />
        </div>
        <div className="text-center space-y-2 px-4">
          <p className="text-lg font-black text-[#202124] tracking-tight">Scientific & Graphing Calculator</p>
          <p className="text-sm text-slate-500 font-medium">Click to launch ,  Deg/Rad · Trig · Graphing Engine</p>
        </div>
        <button
          className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest text-[#202124] shadow-md transition-all duration-300 ${isActivating ? 'opacity-80 cursor-wait' : 'hover:scale-105 active:scale-100'}`}
          style={{ background: PURPLE }}
          disabled={isActivating}
        >
          {isActivating ? 'Loading Engine...' : 'Launch Calculator'}
        </button>
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <span>100+ Tools</span>
          <span>•</span>
          <span>Free Forever</span>
          <span>•</span>
          <span>No Ads</span>
        </div>
      </div>
    </div>
  );
}

