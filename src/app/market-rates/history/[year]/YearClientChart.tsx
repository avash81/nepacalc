'use client';

import React, { useState } from 'react';

type ChartProps = {
  data: {
    date_ad: string;
    fine_gold: number | null;
  }[];
};

export default function YearClientChart({ data }: ChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number, y: number, date: string, price: number } | null>(null);

  const validData = data.filter(d => d.fine_gold !== null).reverse(); // oldest to newest
  
  if (validData.length < 2) return null;

  const minPrice = Math.min(...validData.map(d => d.fine_gold as number));
  const maxPrice = Math.max(...validData.map(d => d.fine_gold as number));
  
  // Add some padding to max and min for the chart boundaries
  const pricePadding = (maxPrice - minPrice) * 0.1 || 1000;
  const chartMin = Math.floor((minPrice - pricePadding) / 1000) * 1000;
  const chartMax = Math.ceil((maxPrice + pricePadding) / 1000) * 1000;
  const range = chartMax - chartMin || 1;

  const width = 800;
  const height = 350;
  const paddingX = 60;
  const paddingY = 40;

  const getX = (index: number) => paddingX + (index / (validData.length - 1)) * (width - 2 * paddingX);
  const getY = (price: number) => height - paddingY - ((price - chartMin) / range) * (height - 2 * paddingY);

  const pathD = validData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.fine_gold as number)}`).join(' ');

  // Grid lines (5 horizontal lines)
  const gridLines = [];
  for (let i = 0; i <= 4; i++) {
    const price = chartMin + (range * i) / 4;
    gridLines.push({
      y: getY(price),
      price: Math.round(price)
    });
  }

  // X axis labels (approx 6 evenly spaced)
  const xLabels = [];
  const xSteps = 5;
  for (let i = 0; i <= xSteps; i++) {
    const dataIndex = Math.floor((i / xSteps) * (validData.length - 1));
    xLabels.push({
      x: getX(dataIndex),
      date: validData[dataIndex].date_ad
    });
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-x-auto mb-8 relative">
      <h2 className="text-xl font-black text-slate-900 mb-4">Gold Price Trend (24K)</h2>
      
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[600px] overflow-visible">
        {/* Grid and Y Axis Labels */}
        {gridLines.map((line, i) => (
          <g key={`grid-${i}`}>
            <line x1={paddingX} y1={line.y} x2={width - paddingX} y2={line.y} stroke="#f1f5f9" strokeWidth="1" />
            <text x={paddingX - 10} y={line.y + 4} className="text-[10px] fill-slate-500" textAnchor="end">
              {line.price.toLocaleString()}
            </text>
          </g>
        ))}
        
        {/* X Axis Labels */}
        {xLabels.map((label, i) => (
          <text key={`xlabel-${i}`} x={label.x} y={height - paddingY + 20} className="text-[10px] fill-slate-500" textAnchor="middle">
            {label.date}
          </text>
        ))}

        {/* Trend Line */}
        <path d={pathD} fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Data Points */}
        {validData.map((d, i) => (
          <circle
            key={`point-${i}`}
            cx={getX(i)}
            cy={getY(d.fine_gold as number)}
            r="4"
            fill="#fff"
            stroke="#d97706"
            strokeWidth="2"
            className="cursor-pointer hover:r-[6px] hover:fill-[#d97706] transition-all"
            onMouseEnter={() => setHoveredPoint({ x: getX(i), y: getY(d.fine_gold as number), date: d.date_ad, price: d.fine_gold as number })}
            onMouseLeave={() => setHoveredPoint(null)}
            onTouchStart={() => setHoveredPoint({ x: getX(i), y: getY(d.fine_gold as number), date: d.date_ad, price: d.fine_gold as number })}
          >
            <title>{`${d.date_ad}: NPR ${d.fine_gold?.toLocaleString()}`}</title>
          </circle>
        ))}

        {/* SVG Interactive Tooltip */}
        {hoveredPoint && (
          <g transform={`translate(${hoveredPoint.x}, ${hoveredPoint.y - 45})`}>
            {/* Tooltip Background */}
            <rect x="-60" y="0" width="120" height="36" rx="4" fill="#1e293b" opacity="0.95" />
            {/* Tooltip Pointer */}
            <polygon points="-6,36 6,36 0,42" fill="#1e293b" opacity="0.95" />
            {/* Tooltip Text */}
            <text x="0" y="14" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">{hoveredPoint.date}</text>
            <text x="0" y="28" fill="#cbd5e1" fontSize="10" textAnchor="middle">NPR {hoveredPoint.price.toLocaleString()}</text>
          </g>
        )}
      </svg>
    </div>
  );
}
