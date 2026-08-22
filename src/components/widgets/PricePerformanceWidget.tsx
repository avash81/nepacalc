'use client';
import React, { useState } from 'react';

interface PricePerformanceRow {
  period: string;
  priceTola: number;   // NPR per Tola (base)
  amount: number;      // absolute change in NPR (per Tola)
  percent: string;
  isNegative: boolean;
}

interface PricePerformanceWidgetProps {
  asset: 'Gold' | 'Silver';
  rows: PricePerformanceRow[];
  source?: string;
}

type Unit = 'tola' | '10gram' | 'gram';

const TOLA_TO_GRAM = 11.6638;

function convertPrice(priceTola: number, unit: Unit): number {
  if (unit === 'tola') return priceTola;
  if (unit === '10gram') return Math.round((priceTola / TOLA_TO_GRAM) * 10);
  return Math.round(priceTola / TOLA_TO_GRAM);
}

function convertAmount(amount: number, unit: Unit): number {
  if (unit === 'tola') return amount;
  if (unit === '10gram') return Math.round((amount / TOLA_TO_GRAM) * 10);
  return Math.round(amount / TOLA_TO_GRAM);
}

function fmtNum(n: number): string {
  return n.toLocaleString('en-IN');
}

const UNIT_LABELS: Record<Unit, string> = {
  tola: 'Per Tola',
  '10gram': 'Per 10g',
  gram: 'Per Gram',
};

export default function PricePerformanceWidget({ asset, rows, source }: PricePerformanceWidgetProps) {
  const [unit, setUnit] = useState<Unit>('tola');

  const sourceBase = source?.replace(/per tola/i, '').trim().replace(/·\s*$/, '').trim();

  return (
    <div
      style={{
        background: '#fff',
        border: '1.5px solid #d1d5db',
        borderRadius: '10px',
        overflow: 'hidden',
        marginBottom: '16px',
        fontFamily: 'ui-sans-serif, system-ui, Arial, sans-serif',
        width: '100%',
        minWidth: 0,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: '#f8fafc',
          borderBottom: '1.5px solid #e2e8f0',
          padding: '10px 14px 8px',
        }}
      >
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          {asset} Price Performance NPR
        </div>
        {/* Unit selector */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {(['tola', '10gram', 'gram'] as Unit[]).map((u) => (
            <button
              key={u}
              onClick={() => setUnit(u)}
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '3px 8px',
                borderRadius: '5px',
                border: unit === u ? '1.5px solid #2563eb' : '1.5px solid #e2e8f0',
                background: unit === u ? '#eff6ff' : '#fff',
                color: unit === u ? '#1d4ed8' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {UNIT_LABELS[u]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', tableLayout: 'fixed' }}>
        <thead>
          <tr style={{ borderBottom: '1.5px solid #e2e8f0', background: '#f8fafc' }}>
            <th style={{ padding: '8px 10px', textAlign: 'left', color: '#475569', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', width: '30%' }}>Period</th>
            <th style={{ padding: '8px 8px', textAlign: 'right', color: '#475569', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', width: '26%' }}>Price</th>
            <th style={{ padding: '8px 8px', textAlign: 'right', color: '#475569', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', width: '24%' }}>Change</th>
            <th style={{ padding: '8px 10px', textAlign: 'right', color: '#475569', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em', width: '20%' }}>%</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const price = convertPrice(row.priceTola, unit);
            const amt = convertAmount(row.amount, unit);
            const amtStr = amt === 0 ? '—' : `${amt >= 0 ? '+' : ''}${fmtNum(amt)}`;
            const color = row.amount === 0 ? '#64748b' : (row.isNegative ? '#dc2626' : '#16a34a');
            return (
              <tr
                key={i}
                style={{
                  borderBottom: i < rows.length - 1 ? '1px solid #f1f5f9' : 'none',
                  background: i % 2 === 0 ? '#fff' : '#fafafa',
                }}
              >
                <td style={{ padding: '8px 10px', color: '#1e293b', fontWeight: 700, fontSize: '13px' }}>{row.period}</td>
                <td style={{ padding: '8px 8px', textAlign: 'right', color: '#334155', fontWeight: 600, fontSize: '12px', whiteSpace: 'nowrap' }}>
                  {fmtNum(price)}
                </td>
                <td style={{ padding: '8px 8px', textAlign: 'right', color: color, fontWeight: 600, fontSize: '12px', whiteSpace: 'nowrap' }}>
                  {amtStr}
                </td>
                <td style={{ padding: '8px 10px', textAlign: 'right', color: color, fontWeight: 700, fontSize: '12px', whiteSpace: 'nowrap' }}>
                  {row.percent}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Footer */}
      {source && (
        <div
          style={{
            background: '#f8fafc',
            padding: '7px 14px',
            fontSize: '10px',
            color: '#64748b',
            fontWeight: 600,
            textAlign: 'right',
            borderTop: '1.5px solid #e2e8f0',
            letterSpacing: '0.02em',
          }}
        >
          {sourceBase} · NPR {UNIT_LABELS[unit]}
        </div>
      )}
    </div>
  );
}
