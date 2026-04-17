'use client';
import { useState, useEffect } from 'react';
import AllInOneCalculator from '@/components/calculator/AllInOneCalculator';

export function HomePageCalculatorClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return (
    <div className="h-[500px] w-full bg-white border border-slate-100 rounded-[2rem] shadow-sm animate-pulse flex items-center justify-center p-12">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
    </div>
  );

  return <AllInOneCalculator />;
}
