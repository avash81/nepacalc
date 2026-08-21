'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ClipboardList } from 'lucide-react';

interface MobileCollapsibleProps {
  title: string;
  children: React.ReactNode;
}

export default function MobileCollapsible({ title, children }: MobileCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-2 text-sm font-black text-[#5f6368] uppercase tracking-widest">
          <ClipboardList className="w-4 h-4 text-[#b59a00]" />
          {title}
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[#5f6368]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#5f6368]" />
        )}
      </button>
      {isOpen && (
        <div className="p-6 border-t border-[#DADCE0] bg-white">
          {children}
        </div>
      )}
    </div>
  );
}
