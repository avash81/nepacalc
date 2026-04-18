import { ReactNode } from 'react';
import { MathTopNav } from '@/components/layout/MathTopNav';

export default function MathEcosystemLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#FDFDFD] min-h-screen text-black pt-16 flex flex-col">
      <MathTopNav />
      <div className="w-full flex-1 flex flex-col relative z-0">
        {children}
      </div>
    </div>
  );
}
