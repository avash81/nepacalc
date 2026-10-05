'use client';

import React, { useState } from 'react';

type ChartProps = {
  data: {
    date_ad: string;
    fine_gold: number | null;
    silver: number | null;
  }[];
};

export default function YearClientChart({ data }: ChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number, y: number, date: string, gold: number | null, silver: number | null } | null>(null);

  // We need data that has at least one of the values. We'll plot both if they exist.
  const validData = data.filter(d => d.fine_gold !== null || d.silver !== null).reverse();
  
  if (validData.length < 2) return null;

  // Gold Scale
  const goldValues = validData.map(d => d.fine_gold).filter(v => v !== null) as number[];
  const minGold = Math.min(...goldValues);
  const maxGold = Math.max(...goldValues);
  const goldPadding = (maxGold - minGold) * 0.1 || 1000;
  const chartMinGold = Math.floor((minGold - goldPadding) / 1000) * 1000;
  const chartMaxGold = Math.ceil((maxGold + goldPadding) / 1000) * 1000;
  const rangeGold = chartMaxGold - chartMinGold || 1;

  // Silver Scale
  const silverValues = validData.map(d => d.silver).filter(v => v !== null) as number[];
  const minSilver = Math.min(...silverValues);
  const maxSilver = Math.max(...silverValues);
  const silverPadding = (maxSilver - minSilver) * 0.1 || 100;
  const chartMinSilver = Math.floor((minSilver - silverPadding) / 100) * 100;
  const chartMaxSilver = Math.ceil((maxSilver + silverPadding) / 100) * 100;
  const rangeSilver = chartMaxSilver - chartMinSilver || 1;

  const width = 800;
  const height = 350;
  const paddingX = 60; // Left padding (Gold Axis)
  const paddingRight = 60; // Right padding (Silver Axis)
  const paddingY = 40;

  const getX = (index: number) => paddingX + (index / (validData.length - 1)) * (width - paddingX - paddingRight);
  const getGoldY = (price: number) => height - paddingY - ((price - chartMinGold) / rangeGold) * (height - 2 * paddingY);
  const getSilverY = (price: number) => height - paddingY - ((price - chartMinSilver) / rangeSilver) * (height - 2 * paddingY);

  // Generate paths, skipping nulls
  let pathDGold = '';
  let firstGold = true;
  validData.forEach((d, i) => {
    if (d.fine_gold !== null) {
      pathDGold += `${firstGold ? 'M' : 'L'} ${getX(i)} ${getGoldY(d.fine_gold)} `;
      firstGold = false;
    }
  });

  let pathDSilver = '';
  let firstSilver = true;
  validData.forEach((d, i) => {
    if (d.silver !== null) {
      pathDSilver += `${firstSilver ? 'M' : 'L'} ${getX(i)} ${getSilverY(d.silver)} `;
      firstSilver = false;
    }
  });

  // Grid lines based on Gold scale segments
  const gridLines = [];
  const ySteps = 4;
  for (let i = 0; i <= ySteps; i++) {
    const goldPrice = chartMinGold + (rangeGold * i) / ySteps;
    const silverPrice = chartMinSilver + (rangeSilver * i) / ySteps;
    gridLines.push({
      y: getGoldY(goldPrice),
      goldPrice: Math.round(goldPrice),
      silverPrice: Math.round(silverPrice)
    });
  }

  // X axis labels
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
      <h2 className="text-xl font-black text-slate-900 mb-2">Gold & Silver Price Trend</h2>
      
      {/* Legend */}
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-600"></div>
          <span className="text-xs font-bold text-slate-600">Gold (24K)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-400"></div>
          <span className="text-xs font-bold text-slate-600">Silver</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[600px] overflow-visible">
        {/* Grid and Y Axis Labels */}
        {gridLines.map((line, i) => (
          <g key={`grid-${i}`}>
            <line x1={paddingX} y1={line.y} x2={width - paddingRight} y2={line.y} stroke="#f1f5f9" strokeWidth="1" />
            {/* Left Y-axis (Gold) */}
            <text x={paddingX - 10} y={line.y + 4} className="text-[10px] fill-amber-700 font-bold" textAnchor="end">
              {line.goldPrice.toLocaleString()}
            </text>
            {/* Right Y-axis (Silver) */}
            <text x={width - paddingRight + 10} y={line.y + 4} className="text-[10px] fill-slate-500 font-bold" textAnchor="start">
              {line.silverPrice.toLocaleString()}
            </text>
          </g>
        ))}
        
        {/* X Axis Labels */}
        {xLabels.map((label, i) => (
          <text key={`xlabel-${i}`} x={label.x} y={height - paddingY + 20} className="text-[10px] fill-slate-500" textAnchor="middle">
            {label.date}
          </text>
        ))}

        {/* Silver Trend Line */}
        {pathDSilver && <path d={pathDSilver} fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
        
        {/* Gold Trend Line */}
        {pathDGold && <path d={pathDGold} fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}
        
        {/* Data Points (Invisible hover targets + visible points) */}
        {validData.map((d, i) => {
          const px = getX(i);
          const pyGold = d.fine_gold !== null ? getGoldY(d.fine_gold) : null;
          const pySilver = d.silver !== null ? getSilverY(d.silver) : null;
          const tooltipY = pyGold !== null ? pyGold : (pySilver || 0); // anchor tooltip to highest line

          return (
            <g 
              key={`point-${i}`}
              onMouseEnter={() => setHoveredPoint({ x: px, y: tooltipY, date: d.date_ad, gold: d.fine_gold, silver: d.silver })}
              onMouseLeave={() => setHoveredPoint(null)}
              onTouchStart={() => setHoveredPoint({ x: px, y: tooltipY, date: d.date_ad, gold: d.fine_gold, silver: d.silver })}
            >
              {/* Invisible larger hover target area for easier triggering */}
              <rect x={px - (width / validData.length) / 2} y={0} width={width / validData.length || 10} height={height} fill="transparent" className="cursor-pointer" />
              
              {pySilver !== null && (
                <circle cx={px} cy={pySilver} r="3.5" fill="#fff" stroke="#94a3b8" strokeWidth="2" className="pointer-events-none" />
              )}
              {pyGold !== null && (
                <circle cx={px} cy={pyGold} r="3.5" fill="#fff" stroke="#d97706" strokeWidth="2" className="pointer-events-none" />
              )}
            </g>
          );
        })}

        {/* SVG Interactive Tooltip */}
        {hoveredPoint && (
          <g transform={`translate(${hoveredPoint.x}, ${hoveredPoint.y - 60})`}>
            {/* Tooltip Background */}
            <rect x="-65" y="0" width="130" height="52" rx="4" fill="#1e293b" opacity="0.95" />
            {/* Tooltip Pointer */}
            <polygon points="-6,52 6,52 0,58" fill="#1e293b" opacity="0.95" />
            {/* Tooltip Text */}
            <text x="0" y="14" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">{hoveredPoint.date}</text>
            <text x="-55" y="30" fill="#fbbf24" fontSize="10" textAnchor="start">Gold:</text>
            <text x="55" y="30" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="end">{hoveredPoint.gold ? hoveredPoint.gold.toLocaleString() : '-'}</text>
            
            <text x="-55" y="44" fill="#cbd5e1" fontSize="10" textAnchor="start">Silver:</text>
            <text x="55" y="44" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="end">{hoveredPoint.silver ? hoveredPoint.silver.toLocaleString() : '-'}</text>
          </g>
        )}
      </svg>
    </div>
  );
}
