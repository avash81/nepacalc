'use client';
import { Copy, Check, Share2, QrCode, AlertCircle, TrendingUp } from 'lucide-react';
import * as QRCode from 'qrcode';
import { useEffect, useState } from 'react';

export interface ResultData {
  label: string;
  value: string | number;
  description?: string | React.ReactNode;
  color?: string; // Tailwind text color class, e.g., 'text-blue-600'
  bgColor?: string; // Tailwind bg color class, e.g., 'bg-blue-50'
}

export interface ResultDisplayProps {
  title: string;
  primaryResult: ResultData;
  secondaryResults?: ResultData[];
  interpretation?: {
    text: string;
    variant: 'info' | 'success' | 'warning' | 'danger';
  };
  onShare?: () => void;
  className?: string;
}

export function ResultDisplay({
  title,
  primaryResult,
  secondaryResults = [],
  interpretation,
  onShare,
  className = '',
}: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');

  useEffect(() => {
    if (showQr) {
      QRCode.toDataURL(window.location.href, { scale: 8, margin: 2 })
        .then(url => setQrDataUrl(url))
        .catch(err => console.error(err));
    }
  }, [showQr]);

  const handleCopy = async () => {
    const textToCopy = `${title}: ${primaryResult.value} ${typeof primaryResult.description === 'string' ? primaryResult.description : ''}\n` +
      secondaryResults.map(r => `${r.label}: ${r.value}`).join('\n') + 
      `\nCalculated on Equaly — ${window.location.href}`;
      
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const interpretationColors = {
    info: 'bg-blue-50 text-[var(--primary)] border-blue-100',
    success: 'bg-emerald-50 text-[var(--success)] border-emerald-100',
    warning: 'bg-amber-50 text-amber-800 border-amber-100',
    danger: 'bg-rose-50 text-[var(--error)] border-rose-100',
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Primary Result Showcase */}
      <div 
        role="status"
        aria-live="polite"
        className={`relative overflow-hidden rounded-3xl p-8 sm:p-14 text-center border-2 transition-all duration-500
                      ${primaryResult.bgColor || 'bg-white border-[#F1F3F4] text-[#202124] shadow-sm hover:shadow-md'}
                      print:bg-white print:text-black print:border-2 print:border-black print:shadow-none print:rounded-3xl print:p-8`}
      >
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-white/10 transition-all duration-700 pointer-events-none" />

        {/* Actions Hub */}
        <div className="absolute top-5 right-5 flex gap-2 z-10 no-print">
          <button
            onClick={handleCopy}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-[var(--bg-surface)] hover:bg-[#E8F0FE] transition-all border border-[var(--border)] shadow-sm active:scale-95"
            title="Copy Result"
          >
            {copied ? <Check className="w-4 h-4 text-[var(--success)]" /> : <Copy className="w-4 h-4 text-[var(--text-secondary)]" />}
          </button>
          <button
            onClick={() => setShowQr(!showQr)}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-[var(--bg-surface)] hover:bg-[#E8F0FE] transition-all border border-[var(--border)] shadow-sm active:scale-95"
            title="Share via QR"
          >
            <QrCode className="w-4 h-4 text-[var(--text-secondary)]" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center relative z-10 print:mt-2">
          <div className="text-[11px] font-black uppercase tracking-[0.4em] mb-4 text-[var(--text-muted)] print:text-slate-600">
            {primaryResult.label}
          </div>
          
          <div className="text-5xl sm:text-7xl font-black mb-5 tracking-tighter text-[var(--primary)] drop-shadow-sm leading-tight print:text-black">
            {primaryResult.value}
          </div>
          
          {primaryResult.description && (
            <div className="text-[10px] items-center gap-2 font-black uppercase tracking-[0.2em] px-6 py-2.5 bg-[var(--bg-subtle)] rounded-full inline-flex border border-[var(--border)] text-[var(--text-secondary)] shadow-inner print:bg-white print:text-black print:border-slate-300">
              <TrendingUp className="w-3.5 h-3.5 text-[var(--primary)] print:text-slate-500" />
              {primaryResult.description}
            </div>
          )}
        </div>

        {/* Interpretation Band - MDCalc Style Premium */}
        {interpretation && (
          <div className={`mt-10 -mx-12 -mb-12 p-5 border-t flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest backdrop-blur-md ${interpretationColors[interpretation.variant]}`}>
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="truncate">{interpretation.text}</span>
          </div>
        )}
      </div>

      {/* QR Code Modal Overlay */}
      {showQr && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-md no-print p-4" onClick={() => setShowQr(false)}>
           <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center space-y-5 animate-in zoom-in-95 duration-300 relative" onClick={e => e.stopPropagation()}>
              {/* Decorative top pill */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-200 rounded-full" />
              
              <h3 className="text-base font-black uppercase tracking-[0.2em] text-slate-900 pt-2">Share Calculation</h3>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">Scan to perfectly sync this exact state to another device.</p>
              
              <div className="bg-slate-50 p-5 rounded-3xl inline-block border-[3px] border-slate-100 shadow-inner">
                 {qrDataUrl ? (
                   // eslint-disable-next-line @next/next/no-img-element
                   <img src={qrDataUrl} alt="QR Code" className="w-52 h-52 mx-auto mix-blend-darken" />
                 ) : (
                   <div className="w-52 h-52 flex items-center justify-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">Generating Engine...</div>
                 )}
              </div>
              
              <button 
                onClick={() => setShowQr(false)}
                className="w-full py-4 mt-2 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all active:scale-[0.98] shadow-md"
              >
                Close Scanner
              </button>
           </div>
        </div>
      )}

      {/* Secondary Intelligence Grid */}
      {secondaryResults.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {secondaryResults.map((res, idx) => (
            <div 
              key={idx} 
              className={`p-6 rounded-2xl border transition-all hover:bg-slate-50 border-slate-200 bg-white shadow-sm flex flex-col justify-center print:border-black print:break-inside-avoid`}
            >
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 opacity-60 print:text-slate-500 print:opacity-100">
                {res.label}
              </div>
              <div className="text-xl font-black text-slate-900 break-words font-mono print:text-black">
                {res.value}
              </div>
              {res.description && <div className="text-[9px] font-bold text-slate-400 mt-1 uppercase print:text-slate-500">{res.description}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
