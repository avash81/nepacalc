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
  blue: 'bg-white border-[var(--border)] text-[var(--text-main)]',
  green: 'bg-white border-[var(--border)] text-[var(--text-main)]',
  red: 'bg-white border-[var(--border)] text-[var(--text-main)]',
  yellow: 'bg-white border-[var(--border)] text-[var(--text-main)]',
  purple: 'bg-white border-[var(--border)] text-[var(--text-main)]',
  gray: 'bg-white border-[var(--border)] text-[var(--text-main)]',
  indigo: 'bg-white border-[var(--border)] text-[var(--text-main)]',
  emerald: 'bg-white border-[var(--border)] text-[var(--text-main)]',
  rose: 'bg-white border-[var(--border)] text-[var(--text-main)]',
  amber: 'bg-white border-[var(--border)] text-[var(--text-main)]',
};

/**
 * ResultCard — High-aesthetics result display for Phase 4+ optimizations.
 * Focused on "Wow" factor and instant clarity.
 */
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
    <div className={`relative overflow-hidden rounded-3xl border ${COLORS[color]} p-8 shadow-sm hover:shadow-md transition-all`}>
      
      <div className="relative flex flex-col items-center text-center space-y-4">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">
          {label}
        </span>
        
        <div className="flex items-baseline gap-2" aria-live="polite">
          <span className="text-4xl sm:text-6xl font-black tracking-tighter text-[var(--primary)]">
            {value.toLocaleString()}
          </span>
          {unit && (
            <span className="text-xl sm:text-2xl font-bold text-[var(--text-muted)]">
              {unit}
            </span>
          )}
        </div>

        {title && (
          <div className="rounded-full bg-[var(--bg-subtle)] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] border border-[var(--border)]">
            {title} Verified
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button 
            onClick={handleCopy}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 transition-all border border-[var(--border)] text-[var(--text-secondary)] shadow-sm"
            title="Copy Result"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
          </button>
          
          {shareUrl && (
            <button 
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 transition-all border border-[var(--border)] text-[var(--text-secondary)] shadow-sm"
              title="Share Result"
            >
              <Share2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
