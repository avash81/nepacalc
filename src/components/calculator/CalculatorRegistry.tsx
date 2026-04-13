import dynamic from 'next/dynamic';
import React from 'react';

/**
 * CalculatorRegistry — Powering the "Inline Calculator" feature.
 * 
 * Uses Next.js dynamic imports to only load the calculator code 
 * when it's actually requested by a blog post.
 */
export const CalculatorRegistry: Record<string, any> = {
  'bmi': dynamic(() => import('@/app/calculator/bmi/Calculator'), { ssr: false }),
  'loan-emi': dynamic(() => import('@/app/calculator/loan-emi/Calculator'), { ssr: false }),
  'nepal-income-tax': dynamic(() => import('@/app/calculator/nepal-income-tax/Calculator'), { ssr: false }),
  'nepal-salary': dynamic(() => import('@/app/calculator/nepal-salary/Calculator'), { ssr: false }),
  'sip-calculator': dynamic(() => import('@/app/calculator/sip-calculator/Calculator'), { ssr: false }),
  'nepali-date': dynamic(() => import('@/app/calculator/nepali-date/Calculator'), { ssr: false }),
  // Add more as needed by blog content
};

export function InlineCalculator({ slug }: { slug: string }) {
  const Component = CalculatorRegistry[slug];
  if (!Component) return null;
  
  return (
    <div className="my-12 p-1 bg-slate-100 rounded-[2.5rem] shadow-inner no-print">
       <div className="bg-white rounded-[2.4rem] overflow-hidden border border-slate-200">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 px-4 py-1.5 bg-blue-50 rounded-full">Interactive Tool</span>
             <span className="text-[10px] font-bold text-slate-400 uppercase italic">Powered by Equaly</span>
          </div>
          <div className="scale-90 origin-top -mb-[5%]">
             <Component />
          </div>
       </div>
    </div>
  );
}
