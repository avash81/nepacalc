import { ReactNode } from 'react';

export default function MathEcosystemLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#FDFDFD] min-h-screen text-black flex flex-col pt-4">
      <div className="w-full flex-1 flex flex-col relative z-0">
        {children}
      </div>
    </div>
  );
}
