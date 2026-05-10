'use client';
import React from 'react';
import { Lightbulb, Info } from 'lucide-react';

interface ResultCardProps {
  title: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  badge?: string;
  color?: string;
}

export function GoogleResultCard({ title, value, prefix = "Rs. ", suffix, badge, color = "#1A73E8" }: ResultCardProps) {
  return (
    <div className="bg-white border border-[#DADCE0] rounded-xl p-8 text-center shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className="text-[10px] font-black text-[#70757A] uppercase tracking-[0.2em] mb-2">{title}</div>
      <div className="text-4xl font-black mb-1" style={{ color }}>{prefix}{value}{suffix}</div>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E8F0FE] rounded-full text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider mt-2">
          {badge}
        </div>
      )}
    </div>
  );
}

export function GoogleSubCard({ title, value, label, color = "#202124", borderAccent = false }: { title: string, value: string, label?: string, color?: string, borderAccent?: boolean }) {
  return (
    <div className={`bg-white border border-[#DADCE0] rounded-xl p-4 text-center ${borderAccent ? 'border-b-4 border-b-[#1A73E8]' : ''}`}>
      <div className="text-[9px] font-bold text-[#70757A] uppercase tracking-wider mb-2" style={{ color: borderAccent ? '#1A73E8' : '#70757A' }}>{title}</div>
      <div className="text-lg font-black" style={{ color }}>{value}</div>
      {label && <div className="text-[8px] text-[#5F6368] font-medium mt-1 uppercase">{label}</div>}
    </div>
  );
}

export function GoogleTip({ tip, title = "Pro Tip" }: { tip: string, title?: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl">
       <Lightbulb className="w-4 h-4 text-[#1A73E8] shrink-0" />
       <p className="text-[11px] text-[#5F6368] leading-tight font-medium">
         <strong className="text-[#202124]">{title}:</strong> {tip}
       </p>
    </div>
  );
}

