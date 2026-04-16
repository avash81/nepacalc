'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const AllInOneCalculator = dynamic(
  () => import('@/components/calculator/AllInOneCalculator'),
  { 
    ssr: false, 
    loading: () => (
      <div className="h-[500px] w-full bg-slate-50 animate-pulse rounded-[2.5rem] border border-slate-100 flex flex-col items-center justify-center p-12">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest text-center">Launching Google Search Calculator...</p>
      </div>
    ) 
  }
);

export function HomePageCalculatorClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return <AllInOneCalculator />;
}
