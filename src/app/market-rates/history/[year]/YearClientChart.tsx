'use client';

import React from 'react';

type ChartProps = {
  data: {
    date_ad: string;
    fine_gold: number | null;
  }[];
};

export default function YearClientChart({ data }: ChartProps) {
  const validData = data.filter(d => d.fine_gold !== null).reverse(); // oldest to newest
  
  if (validData.length < 2) return null;

  const minPrice = Math.min(...validData.map(d => d.fine_gold as number));
  const maxPrice = Math.max(...validData.map(d => d.fine_gold as number));
  const range = maxPrice - minPrice || 1;

  const width = 800;
  const height = 300;
  const padding = 40;

  const getX = (index: number) => padding + (index / (validData.length - 1)) * (width - 2 * padding);
  const getY = (price: number) => height - padding - ((price - minPrice) / range) * (height - 2 * padding);

  const pathD = validData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.fine_gold as number)}`).join(' ');

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-x-auto mb-8">
      <h2 className="text-xl font-black text-slate-900 mb-4">Gold Price Trend (24K)</h2>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[500px]">
        {/* Y Axis Labels */}
        <text x="0" y={getY(maxPrice) + 4} className="text-[10px] fill-slate-500">{maxPrice.toLocaleString()}</text>
        <text x="0" y={getY(minPrice) + 4} className="text-[10px] fill-slate-500">{minPrice.toLocaleString()}</text>
        
        {/* Trend Line */}
        <path d={pathD} fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* X Axis Labels */}
        <text x={getX(0)} y={height - 10} className="text-[10px] fill-slate-500">{validData[0].date_ad}</text>
        <text x={getX(validData.length - 1) - 40} y={height - 10} className="text-[10px] fill-slate-500">{validData[validData.length - 1].date_ad}</text>
      </svg>
    </div>
  );
}
