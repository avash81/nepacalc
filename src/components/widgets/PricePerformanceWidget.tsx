'use client';
import React from 'react';

interface PricePerformanceRow {
  period: string;
  price?: string;
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
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '16px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: '#f4f4f4',
          borderBottom: '1px solid #e0e0e0',
          padding: '10px',
          fontSize: '16px',
          color: '#333',
          fontWeight: 'bold',
          textAlign: 'right',
        }}
      >
        {asset} Price Performance NPR
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
          <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
            <th style={{ padding: '8px 10px', textAlign: 'left', color: '#111', fontWeight: 'bold' }}>Change</th>
            {rows.some(r => r.price) && <th style={{ padding: '8px 10px', textAlign: 'right', color: '#111', fontWeight: 'bold' }}>Price</th>}
            <th style={{ padding: '8px 10px', textAlign: 'right', color: '#111', fontWeight: 'bold' }}>Amount</th>
            <th style={{ padding: '8px 10px', textAlign: 'right', color: '#111', fontWeight: 'bold' }}>%</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                            <td style={{ padding: '8px 10px', color: '#000', fontWeight: 'bold' }}>{row.period}</td>
              {rows.some(r => r.price) && <td style={{ padding: '8px 10px', textAlign: 'right', color: '#333' }}>{row.price || '—'}</td>}
              <td
                style={{
                  padding: '8px 10px',
                  textAlign: 'right',
                  fontWeight: 'normal',
                  color: row.amount === '—' || row.amount === '-' ? '#000' : (row.isNegative ? '#cc0000' : '#006600'),
                }}
              >
                {row.amount}
              </td>
              <td
                style={{
                  padding: '8px 10px',
                  textAlign: 'right',
                  fontWeight: 'normal',
                  color: row.percent === '—' || row.percent === '-' ? '#000' : (row.isNegative ? '#cc0000' : '#006600'),
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
            background: '#f4f4f4',
            padding: '8px 10px',
            fontSize: '12px',
            color: '#000',
            fontWeight: 'bold',
            textAlign: 'right',
            borderTop: '1px solid #e0e0e0',
          }}
        >
          {source}
        </div>
      )}
    </div>
  );
}

