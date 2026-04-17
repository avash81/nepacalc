import { ReactNode } from 'react';
import { MathTopNav } from '@/components/layout/MathTopNav';

export default function MathEcosystemLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#FDFDFD] min-h-screen text-black">
      {/* Precision Offset for Main Institutional Nav */}
      <div className="pt-16 w-full min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
