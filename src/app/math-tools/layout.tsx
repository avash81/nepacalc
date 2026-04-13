import { ReactNode } from 'react';
import { MathTopNav } from '@/components/layout/MathTopNav';

export default function MathEcosystemLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white min-h-screen text-slate-800">
      <MathTopNav />
      {/* 50px top padding to account for fixed MathTopNav */}
      <div className="pt-[50px] w-full min-h-screen flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
