'use client';
import React from 'react';

interface PricePerformanceRow {
  period: string;
  amount: string;
  percent: string;
  isNegative: boolean;
}

interface PricePerformanceWidgetProps {
  asset: 'Gold' | 'Silver';
  rows: PricePerformanceRow[];
  source?: string;
}

export default function PricePerformanceWidget({ asset, rows, source }: PricePerformanceWidgetProps) {
  const accentColor = asset === 'Gold' ? '#b59a00' : '#5f6368';

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #DADCE0',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '12px',
      }}
    >
      <div
        style={{
          background: '#F8F9FA',
          borderBottom: '1px solid #e8eaed',
          padding: '10px 14px',
          fontFamily: 'monospace',
          fontSize: '0.72rem',
          textTransform: 'uppercase' as const,
          letterSpacing: '0.1em',
          color: '#70757a',
          fontWeight: 700,
        }}
      >
        {asset} Price Performance
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
        <thead>
          <tr style={{ background: '#F8F9FA', borderBottom: '1px solid #e8eaed' }}>
            <th style={{ padding: '6px 10px', textAlign: 'left', color: '#5f6368', fontWeight: 700, fontSize: '0.72rem' }}>Change</th>
            <th style={{ padding: '6px 10px', textAlign: 'right', color: '#5f6368', fontWeight: 700, fontSize: '0.72rem' }}>Amount</th>
            <th style={{ padding: '6px 10px', textAlign: 'right', color: '#5f6368', fontWeight: 700, fontSize: '0.72rem' }}>%</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid #f1f3f4' : 'none' }}>
              <td style={{ padding: '5px 10px', color: '#202124', fontWeight: 600 }}>{row.period}</td>
              <td
                style={{
                  padding: '5px 10px',
                  textAlign: 'right',
                  fontWeight: 700,
                  color: row.isNegative ? '#d93025' : '#188038',
                }}
              >
                {row.amount}
              </td>
              <td
                style={{
                  padding: '5px 10px',
                  textAlign: 'right',
                  fontWeight: 700,
                  color: row.isNegative ? '#d93025' : '#188038',
                }}
              >
                {row.percent}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {source && (
        <div
          style={{
            padding: '5px 10px 8px',
            fontSize: '0.67rem',
            color: '#9aa0a6',
            textAlign: 'center',
            borderTop: '1px solid #f1f3f4',
          }}
        >
          {source}
        </div>
      )}
    </div>
  );
}
