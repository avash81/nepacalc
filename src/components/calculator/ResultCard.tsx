'use client';
import React from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ResultCardProps {
  label: string;
  value: string | number;
  unit?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray' | 'indigo' | 'emerald' | 'rose' | 'amber';
  title?: string;
  shareUrl?: string;
  copyValue?: string;
}

const COLORS = {
  blue: 'bg-white border-slate-200 text-slate-900',
  green: 'bg-white border-slate-200 text-slate-900',
  red: 'bg-white border-slate-200 text-slate-900',
  yellow: 'bg-white border-slate-200 text-slate-900',
  purple: 'bg-white border-slate-200 text-slate-900',
  gray: 'bg-white border-slate-200 text-slate-900',
  indigo: 'bg-white border-slate-200 text-slate-900',
  emerald: 'bg-white border-slate-200 text-slate-900',
  rose: 'bg-white border-slate-200 text-slate-900',
  amber: 'bg-white border-slate-200 text-slate-900',
};

export function ResultCard({
  label,
  value,
  unit = '',
  color = 'blue',
  title,
  shareUrl,
  copyValue
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!copyValue && typeof value !== 'string' && typeof value !== 'number') return;
    navigator.clipboard.writeText(copyValue || String(value));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${COLORS[color]} p-5 shadow-sm hover:shadow-md transition-all`}>
      
      <div className="relative flex flex-col items-center text-center space-y-3">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
          {label}
        </span>
        
        <div className="flex items-baseline gap-1.5" aria-live="polite">
          <span className="text-2xl sm:text-3xl font-black tracking-tighter text-blue-600">
            {value.toLocaleString()}
          </span>
          {unit && (
            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-widest">
              {unit}
            </span>
          )}
        </div>

        {title && (
          <div className="rounded-full bg-slate-50 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-slate-500 border border-slate-100">
            {title} Verified
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button 
            onClick={handleCopy}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 hover:bg-slate-100 transition-all border border-slate-200 text-slate-500 shadow-sm"
            title="Copy Result"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
          
          {shareUrl && (
            <button 
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 hover:bg-slate-100 transition-all border border-slate-200 text-slate-500 shadow-sm"
              title="Share Result"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

