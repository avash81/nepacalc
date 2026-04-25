'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import * as math from 'mathjs';
import * as QRCode from 'qrcode';
import { useSyncState } from '@/hooks/useSyncState';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Calculator } from 'lucide-react';

/* ── Professional Factorial ───────────────── */
function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n) || n > 170) return NaN;
  let r = 1; for (let i = 2; i <= n; i++) r *= i; return r;
}

/* ── MASTER STEM ENGINE (CAS & Symbolic) ────── */
function stemEval(expr: string, deg: boolean): { res: string; err: string | null } {
  try {
    if (!expr) return { res: '0', err: null };
    let processed = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/π/g, 'pi').replace(/e/g, 'e');
    if (processed.includes('simplify')) {
       const inner = processed.match(/simplify\((.*)\)/)?.[1] || '';
       const result = math.simplify(inner).toString();
       return { res: result, err: null };
    }
    if (processed.includes('diff')) {
       const inner = processed.match(/diff\((.*)\)/)?.[1] || '';
       const result = math.derivative(inner, 'x').toString();
       return { res: result, err: null };
    }
    const result = math.evaluate(processed, {
      pi: Math.PI, e: Math.E,
      sin: (x: number) => deg ? Math.sin(x * Math.PI / 180) : Math.sin(x),
      cos: (x: number) => deg ? Math.cos(x * Math.PI / 180) : Math.cos(x),
      tan: (x: number) => deg ? Math.tan(x * Math.PI / 180) : Math.tan(x),
      asin: (x: number) => deg ? Math.asin(x) * 180 / Math.PI : Math.asin(x),
      acos: (x: number) => deg ? Math.acos(x) * 180 / Math.PI : Math.acos(x),
      atan: (x: number) => deg ? Math.atan(x) * 180 / Math.PI : Math.atan(x),
      sqrt: Math.sqrt, log: Math.log10, ln: Math.log, abs: Math.abs, fact: factorial
    });

    if (result === undefined || result === null) return { res: '0', err: null };

    if (typeof result === 'number') {
      if (!isFinite(result)) return { res: 'MATH ERROR', err: 'MATH ERROR' };
      let s = parseFloat(result.toPrecision(10)).toString();
      if (Math.abs(result) >= 1e15) return { res: 'OVERFLOW', err: 'OVERFLOW' };
      if (Math.abs(result) >= 1e10 || (Math.abs(result) > 0 && Math.abs(result) < 1e-6)) s = result.toExponential(6);
      return { res: s, err: null };
    }

    if (typeof result === 'object' && 'toNumber' in result) {
       const n = (result as any).toNumber();
       return { res: n.toPrecision(10), err: null };
    }

    return { res: String(result), err: null };
  } catch (e) { 
    return { res: 'SYNTAX ERROR', err: 'SYNTAX ERROR' }; 
  }
}

/* ── COLOR MULTI-PLOTTER ── */
const PLOT_COLORS = ['#3b82f6', '#ef4444', '#10b981']; 
function drawMultiGraph(canvas: HTMLCanvasElement, expressions: string[], deg: boolean) {
  const ctx = canvas.getContext('2d'); if (!ctx) return;
  const w = canvas.width, h = canvas.height; ctx.clearRect(0, 0, w, h);
  const scale = 60; const offsetX = w / 2, offsetY = h / 2;
  ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1; ctx.setLineDash([2, 5]);
  ctx.beginPath();
  for (let x = -offsetX; x < w; x += scale) { ctx.moveTo(x + (offsetX % scale), 0); ctx.lineTo(x + (offsetX % scale), h); }
  for (let y = -offsetY; y < h; y += scale) { ctx.moveTo(0, y + (offsetY % scale)); ctx.lineTo(w, y + (offsetY % scale)); }
  ctx.stroke(); ctx.setLineDash([]);
  ctx.strokeStyle = 'rgba(74, 222, 128, 0.2)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, offsetY); ctx.lineTo(w, offsetY); ctx.moveTo(offsetX, 0); ctx.lineTo(offsetX, h); ctx.stroke();
  expressions.forEach((expr, idx) => {
    if (!expr || !expr.includes('x')) return;
    ctx.strokeStyle = PLOT_COLORS[idx % PLOT_COLORS.length]; ctx.lineWidth = 3;
    ctx.shadowBlur = 10; ctx.shadowColor = ctx.strokeStyle as string;
    ctx.beginPath(); let first = true;
    for (let px = 0; px < w; px++) {
      const vx = (px - offsetX) / scale;
      try {
        const { res, err } = stemEval(expr.replace(/x/g, `(${vx})`), deg);
        const val = parseFloat(res);
        if (!err && isFinite(val)) {
          const py = offsetY - val * scale;
          if (first) { ctx.moveTo(px, py); first = false; } else { ctx.lineTo(px, py); }
        } else { first = true; }
      } catch { first = true; }
    }
    ctx.stroke(); ctx.shadowBlur = 0;
  });
}

const VAR_KEYS: Record<string, string> = { '(-)': 'A', '.,,': 'B', 'hyp': 'C', 'sin': 'D', 'cos': 'E', 'tan': 'F', '(': 'X', ')': 'Y', 'M+': 'M' };

const DEFAULT_STATE = {
  expressions: ['', '', ''],
  activeIndex: 0,
  memory: 0,
  vars: { A:0, B:0, C:0, D:0, E:0, F:0, X:0, Y:0, M:0 } as Record<string, number>,
  lastAns: '0',
  angleMode: 'DEG' as 'DEG'|'RAD'|'GRA',
  cursorIndex: 0
};

export default function ScientificCalculator() {
  const [isMounted, setIsMounted]   = useState(false);
  const [isOff, setIsOff]           = useState(false);
  const [state, setState]           = useSyncState('sci_calc_v4', DEFAULT_STATE);
  const { expressions, activeIndex, memory, vars, lastAns, angleMode, cursorIndex } = state;

  const [display, setDisplay]       = useState('0');
  const [shift, setShift]           = useState(false);
  const [alpha, setAlpha]           = useState(false);
  const [stoMode, setStoMode]       = useState(false);
  const [qrBlob, setQrBlob]         = useState<string | null>(null);
  const canvasRef                   = useRef<HTMLCanvasElement>(null);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (isOff) { setDisplay('0'); return; }
    const { res } = stemEval(expressions[activeIndex] || '0', angleMode === 'DEG');
    setDisplay(res);
  }, [expressions, activeIndex, angleMode, isOff]);

  useEffect(() => {
    if (canvasRef.current && isMounted && !isOff) {
      drawMultiGraph(canvasRef.current, expressions, angleMode === 'DEG');
    }
  }, [expressions, angleMode, isOff, isMounted]);

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

  const generateQR = useCallback(async () => {
    try {
      const data = `Expression: ${expressions[activeIndex]}\nResult: ${display}`;
      const url = await QRCode.toDataURL(data);
      setQrBlob(url);
      setTimeout(() => setQrBlob(null), 5000);
    } catch (err) { console.error(err); }
  }, [expressions, activeIndex, display]);

  const exec = useCallback((action: string) => {
    if (isOff && action !== 'ON') return;
    if (stoMode && VAR_KEYS[action]) {
       const vName = VAR_KEYS[action];
       const currentVal = parseFloat(display);
       if (!isNaN(currentVal)) { updateState({ vars: { ...vars, [vName]: currentVal }, cursorIndex }); setStoMode(false); setShift(false); return; }
    }
    if (alpha && VAR_KEYS[action]) {
       const vName = VAR_KEYS[action];
       const n=[...expressions]; n[activeIndex]=n[activeIndex].slice(0, cursorIndex) + String(vars[vName]) + n[activeIndex].slice(cursorIndex);
       updateState({ expressions: n, cursorIndex: cursorIndex + String(vars[vName]).length });
       setAlpha(false); return;
    }
    switch (action) {
      case 'ON': setIsOff(false); return;
      case 'SHIFT': setShift(s => !s); setAlpha(false); setStoMode(false); return;
      case 'ALPHA': setAlpha(a => !a); setShift(false); setStoMode(false); return;
      case 'STO': setStoMode(true); return;
      case 'QR': generateQR(); return;
      case 'AC': if (shift) { setIsOff(true); setShift(false); } else { const n=[...expressions]; n[activeIndex]=''; updateState({ expressions: n, cursorIndex: 0 }); setDisplay('0'); setShift(false); setAlpha(false); setStoMode(false); } return;
      case 'DEL': { const n=[...expressions]; n[activeIndex]=n[activeIndex].slice(0, cursorIndex - 1) + n[activeIndex].slice(cursorIndex); updateState({ expressions: n, cursorIndex: Math.max(0, cursorIndex - 1) }); return; }
      case '=': { const { res, err } = stemEval(expressions[activeIndex], angleMode==='DEG'); if(!err) { const n=[...expressions]; n[activeIndex]=res; updateState({ lastAns: res, expressions: n, cursorIndex: res.length }); } return; }
      case 'M+': { const v=parseFloat(display); if(!isNaN(v)) updateState({ memory: memory + v }); return; }
      case 'MR': { const n=[...expressions]; n[activeIndex]=n[activeIndex].slice(0, cursorIndex) + String(memory) + n[activeIndex].slice(cursorIndex); updateState({ expressions: n, cursorIndex: cursorIndex + String(memory).length }); return; }
      case 'ANGLE': updateState({ angleMode: angleMode==='DEG'?'RAD':angleMode==='RAD'?'GRA':'DEG' }); return;
      case 'ANS': { const n=[...expressions]; n[activeIndex]=n[activeIndex].slice(0, cursorIndex) + lastAns + n[activeIndex].slice(cursorIndex); updateState({ expressions: n, cursorIndex: cursorIndex + lastAns.length }); return; }
      case 'LEFT': updateState({ cursorIndex: Math.max(0, cursorIndex - 1) }); return;
      case 'RIGHT': updateState({ cursorIndex: Math.min(expressions[activeIndex].length, cursorIndex + 1) }); return;
      case 'UP': updateState({ activeIndex: (activeIndex + 1) % 3 }); return;
      case 'DOWN': updateState({ activeIndex: (activeIndex - 1 + 3) % 3 }); return;
      case 'SIMPLIFY': { const n=[...expressions]; n[activeIndex]=`simplify(${n[activeIndex]})`; updateState({ expressions: n }); return; }
      case 'DIFF': { const n=[...expressions]; n[activeIndex]=`diff(${n[activeIndex]})`; updateState({ expressions: n }); return; }
      default: { 
        const n=[...expressions]; 
        // Auto-clear zero if it's the only character
        if (n[activeIndex] === '' || n[activeIndex] === '0') {
           n[activeIndex] = action;
           updateState({ expressions: n, cursorIndex: action.length });
        } else {
           n[activeIndex]=n[activeIndex].slice(0, cursorIndex) + action + n[activeIndex].slice(cursorIndex); 
           updateState({ expressions: n, cursorIndex: cursorIndex + action.length });
        }
      }
    }
  }, [state, isOff, shift, alpha, stoMode, display, generateQR]);

  const press = (p: string, s?: string, a?: string) => {
    if (shift) { setShift(false); exec(s ?? p); return; }
    if (alpha) { setAlpha(false); exec(a ?? p); return; }
    exec(p);
  };

  if (!isMounted) return null;

  const SciBtn = ({label, shift: sL, alpha: aL, act, sA, aA, cls}: any) => (
    <div className="flex flex-col items-center group">
       <div className="flex gap-2 min-h-[14px]">
          {sL && <span className="text-yellow-500 text-[9px] font-bold uppercase shadow-sm">{sL}</span>}
          {aL && <span className="text-pink-100 text-[9px] font-bold uppercase shadow-sm">{aL}</span>}
       </div>
       <button onClick={()=>press(act||label, sA, aA)} className={`w-full py-2 rounded-md transition-all font-bold text-[11px] border-b-2 active:border-b-0 active:translate-y-[1px] ${cls || 'bg-slate-800 text-white border-slate-950 hover:bg-slate-700 shadow-lg'}`}>{label}</button>
    </div>
  );

  const NumBtn = ({label, shift: sL, alpha: aL, act, sA, aA, cls}: any) => (
    <div className="flex flex-col items-center group">
       <div className="flex gap-2 min-h-[14px]">
          {sL && <span className="text-yellow-400 text-[9px] font-bold uppercase">{sL}</span>}
          {aL && <span className="text-pink-300 text-[9px] font-bold uppercase">{aL}</span>}
       </div>
       <button onClick={()=>press(act||label, sA, aA)} className={`w-full py-2 rounded-md transition-all font-bold text-[13px] border-b-4 active:border-b-0 active:translate-y-[2px] ${cls || 'bg-white text-black border-slate-300 hover:bg-slate-50 shadow-lg'}`}>{label}</button>
    </div>
  );

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Scientific Calculator' }]}
      title="Scientific Calculator"
      description="Professional online scientific calculator with trigonometry, logs, and power functions. Industrial-grade mathematical engine for advanced algebraic calculations."
      icon={Calculator}
      fullWidth={true}
      inputs={
        <div className="w-full">
          {/* ── MOBILE LAYOUT (phones < lg) ─────────────────────────────────── */}
          <div className="lg:hidden flex flex-col bg-slate-200 min-h-screen px-4 py-6">
            <div className="text-center mb-4">
              <div className="text-slate-700 font-black italic text-2xl tracking-tighter">CASIO <span className="text-xs font-normal not-italic tracking-widest opacity-60">SCIENTIFIC</span></div>
              <div className="mt-2 inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                🖥️ Full scientific mode available on desktop
              </div>
            </div>

            {/* Mobile Display */}
            <div className="bg-[#151c14] rounded-2xl border-4 border-black p-5 mb-4 font-mono">
              <div className="flex justify-between text-[10px] text-green-500/60 font-bold uppercase mb-3">
                <span className={shift ? 'text-yellow-400 font-black' : ''}>SHIFT</span>
                <span className={alpha ? 'text-pink-400 font-black' : ''}>ALPHA</span>
                <span>{angleMode}</span>
              </div>
              <div className="text-green-400 text-sm overflow-hidden whitespace-nowrap mb-1 opacity-70">{expressions[activeIndex] || '0'}</div>
              <div className="text-green-400 text-4xl font-black text-right leading-none">{display}</div>
            </div>

            {/* Mobile Key Rows */}
            <div className="bg-[#1e2024] rounded-3xl p-5 flex flex-col gap-3">
              {/* Utility row */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  ['SHIFT','bg-amber-500 text-white border-amber-800','SHIFT'],
                  ['ALPHA','bg-purple-600 text-white border-purple-900','ALPHA'],
                  ['DEL','bg-red-600 text-white border-red-900','DEL'],
                  ['AC','bg-red-600 text-white border-red-900','AC'],
                ].map(([l,c,a]) => (
                  <button key={l} onClick={() => exec(a)} className={`py-3 rounded-lg font-black text-xs border-b-4 active:border-b-0 active:translate-y-[2px] transition-all ${c}`}>{l}</button>
                ))}
              </div>
              {/* Trig row */}
              <div className="grid grid-cols-4 gap-2">
                {[['sin','sin('],['cos','cos('],['tan','tan('],['√','sqrt(']].map(([l,a]) => (
                  <button key={l} onClick={() => exec(a)} className="py-3 rounded-lg font-bold text-sm bg-slate-700 text-white border-b-4 border-slate-900 active:border-b-0 active:translate-y-[2px]">{l}</button>
                ))}
              </div>
              {/* Log / power row */}
              <div className="grid grid-cols-4 gap-2">
                {[['log10','log10('],['ln','ln('],['x²','^2'],['( )','(']].map(([l,a]) => (
                  <button key={l} onClick={() => exec(a)} className="py-3 rounded-lg font-bold text-sm bg-slate-700 text-white border-b-4 border-slate-900 active:border-b-0 active:translate-y-[2px]">{l}</button>
                ))}
              </div>
              {/* Number pad */}
              {[[7,8,9],[4,5,6],[1,2,3]].map(row => (
                <div key={row[0]} className="grid grid-cols-5 gap-2">
                  {row.map(n => (
                    <button key={n} onClick={() => exec(String(n))} className="col-span-1 py-4 rounded-lg font-black text-lg bg-white text-black border-b-4 border-slate-300 active:border-b-0 active:translate-y-[2px]">{n}</button>
                  ))}
                  {row[0] === 7 && <><button onClick={() => exec('÷')} className="py-4 rounded-lg font-black text-lg bg-slate-700 text-white border-b-4 border-slate-900 active:border-b-0">÷</button><button onClick={() => exec('×')} className="py-4 rounded-lg font-black text-lg bg-slate-700 text-white border-b-4 border-slate-900 active:border-b-0">×</button></>}
                  {row[0] === 4 && <><button onClick={() => exec('-')} className="py-4 rounded-lg font-black text-lg bg-slate-700 text-white border-b-4 border-slate-900 active:border-b-0">−</button><button onClick={() => exec('+')} className="py-4 rounded-lg font-black text-lg bg-slate-700 text-white border-b-4 border-slate-900 active:border-b-0">+</button></>}
                  {row[0] === 1 && <><button onClick={() => exec('.')} className="py-4 rounded-lg font-black text-lg bg-white text-black border-b-4 border-slate-300 active:border-b-0">.</button><button onClick={() => exec('=')} className="py-4 rounded-lg font-black text-lg bg-blue-600 text-white border-b-4 border-blue-900 active:border-b-0">=</button></>}
                </div>
              ))}
              <div className="grid grid-cols-3 gap-2 mt-1">
                <button onClick={() => exec('0')} className="col-span-1 py-4 rounded-lg font-black text-lg bg-white text-black border-b-4 border-slate-300 active:border-b-0">0</button>
                <button onClick={() => exec('(')} className="py-4 rounded-lg font-bold text-lg bg-slate-700 text-white border-b-4 border-slate-900 active:border-b-0">(</button>
                <button onClick={() => exec(')')} className="py-4 rounded-lg font-bold text-lg bg-slate-700 text-white border-b-4 border-slate-900 active:border-b-0">)</button>
              </div>
            </div>
          </div>

          {/* ── DESKTOP LAYOUT (≥ lg only) ────────────────────────────────────── */}
          <div className="hidden lg:flex justify-center py-1 bg-slate-200 px-4 overflow-hidden">
            <div className="flex flex-row w-full max-w-[1240px] bg-[#1e2024] rounded-[2rem] overflow-hidden border-[8px] border-[#2d2f34] shadow-2xl relative">
            
            {/* HARWARE INTERFACE */}
            <div className="w-full lg:w-[500px] p-8 border-b-8 lg:border-b-0 lg:border-r-8 border-black/20 flex flex-col relative z-10">
              
              <div className="flex justify-between items-end px-2 mb-6">
                <div className="text-white font-black italic text-2xl tracking-tighter drop-shadow-md">CASIO <span className="text-[10px] font-normal not-italic opacity-50 ml-1 tracking-widest">SCIENTIFIC</span></div>
              </div>

              <div className="bg-[#151c14] min-h-[160px] p-6 rounded-xl border-[6px] border-[#16181b] shadow-[inset_0_10px_30px_rgba(0,0,0,0.8)] flex flex-col font-mono text-green-500 relative overflow-hidden">
                {!isOff && (
                   <>
                    <div className="flex justify-between items-center text-[10px] border-b border-green-500/20 pb-1 mb-3 font-black uppercase tracking-tighter">
                      <div className="flex gap-4">
                        <span className={shift?'bg-green-500 text-black px-1.5 rounded-sm':''}>S</span>
                        <span className={alpha?'bg-green-500 text-black px-1.5 rounded-sm':''}>A</span>
                        <span className={stoMode?'bg-blue-500 text-white px-1.5 rounded-sm':''}>STO</span>
                        <span>f{activeIndex+1}</span>
                      </div>
                      <div>{angleMode}</div>
                    </div>
                    <div className="text-2xl mt-1 overflow-hidden whitespace-nowrap flex items-center">
                       {expressions[activeIndex].slice(0, cursorIndex)}<span className="w-0.5 h-6 bg-green-500 animate-pulse" />{expressions[activeIndex].slice(cursorIndex) || '0'}
                    </div>
                    <div className="mt-auto text-6xl font-black text-right leading-none tracking-tighter drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]">{display}</div>
                   </>
                )}
                {qrBlob && <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center animate-in fade-in transition-all"><img src={qrBlob} className="w-24 h-24 mb-2 p-2 bg-white rounded-lg shadow-xl" alt="QR Code"/><span className="text-[8px] uppercase font-black text-white px-2 py-1 bg-green-600 rounded">Shared Link Ready</span></div>}
              </div>

              {/* D-PAD */}
              <div className="flex justify-between items-center mt-8 gap-4">
                <div className="flex flex-col gap-2 flex-1">
                   <SciBtn label="SHIFT" act="SHIFT" cls="bg-[#fb923c] text-white border-[#9a3412] h-10 rounded-lg" />
                   <SciBtn label="ALPHA" alpha="A-LOCK" act="ALPHA" cls="bg-[#db2777] text-white border-[#831843] h-10 rounded-lg" />
                </div>

                <div className="w-[120px] h-[120px] relative bg-gradient-to-tr from-[#64748b] via-[#cbd5e1] to-[#f8fafc] rounded-full border-[4px] border-[#1e293b] shadow-xl flex items-center justify-center">
                   <button onClick={()=>exec('UP')} className="absolute top-0 w-full h-[35%] flex items-center justify-center"><div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-[#1e293b]" /></button>
                   <button onClick={()=>exec('DOWN')} className="absolute bottom-0 w-full h-[35%] flex items-center justify-center"><div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-[#1e293b]" /></button>
                   <button onClick={()=>exec('LEFT')} className="absolute left-0 h-full w-[35%] flex items-center justify-center"><div className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[8px] border-[#1e293b]" /></button>
                   <button onClick={()=>exec('RIGHT')} className="absolute right-0 h-full w-[35%] flex items-center justify-center"><div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-[#1e293b]" /></button>
                   <div className="w-10 h-10 bg-[#1e293b]/5 rounded-full border border-black/10 flex items-center justify-center"><div className="text-[8px] font-black text-[#1e293b]/30 tracking-widest uppercase">OK</div></div>
                </div>

                <div className="flex flex-col gap-2 flex-1 text-right">
                   <button onClick={()=>press('MODE')} className="bg-slate-300 text-black border-b-[3px] border-slate-500 h-10 rounded-lg text-[9px] font-black uppercase">Setup</button>
                   <button onClick={()=>press('ON')} className="bg-slate-300 text-black border-b-[3px] border-slate-500 h-10 rounded-lg text-[9px] font-black">ON</button>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-x-2 gap-y-4 mt-8 px-1">
                 <SciBtn label="OPTN" shift="QR" act="OPTN" sA="QR" /> 
                 <SciBtn label="CALC" shift="SOLVE" sA="SIMPLIFY" /> 
                 <SciBtn label="∫dx" shift="d/dx" act="∫" sA="DIFF" /> 
                 <SciBtn label="x⁻¹" shift="x!" act="^-1" /> 
                 <SciBtn label="log" shift="Σ" act="log10(" /> 
                 <SciBtn label="ln" shift="eˣ" act="ln(" />
                 {['(',')','x²','x^','log','ln'].map((l, i) => (
                    <SciBtn key={i} label={l} shift={['b/c','∛','x³','nth√','10ˣ','eˣ'][i]} act={['(','sqrt(','^2','^','log10(','ln('][i]} />
                 ))}
                 <SciBtn label="(-)" shift="STO" alpha="A" act="(-)" sA="STO" aA="X" /> 
                 <SciBtn label=".,," shift="←" alpha="B" act="," aA="Y" /> 
                 <SciBtn label="hyp" shift="Abs" alpha="C" /> 
                 <SciBtn label="sin" shift="sin⁻¹" alpha="D" act="sin(" sA="asin(" /> 
                 <SciBtn label="cos" shift="cos⁻¹" alpha="E" act="cos(" sA="acos(" /> 
                 <SciBtn label="tan" shift="tan⁻¹" alpha="F" act="tan(" sA="atan(" />
              </div>

              <div className="grid grid-cols-5 gap-x-3 gap-y-5 mt-8 px-1 pb-4">
                 {[7,8,9].map(n => <NumBtn key={n} label={String(n)} />)}
                 <NumBtn label="DEL" cls="bg-red-600 text-white border-red-900 h-12 rounded-lg" act="DEL" />
                 <NumBtn label="AC" cls="bg-red-600 text-white border-red-900 h-12 rounded-lg" shift="OFF" act="AC" />
                 {[4,5,6].map(n => <NumBtn key={n} label={String(n)} />)}
                 <NumBtn label="×" act="×" /> <NumBtn label="÷" act="÷" />
                 {[1,2,3].map(n => <NumBtn key={n} label={String(n)} />)}
                 <NumBtn label="+" act="+" /> <NumBtn label="-" act="-" />
                 <NumBtn label="0" /> <NumBtn label="." act="." /> 
                 <NumBtn label="x10ˣ" shift="π" alpha="e" act="*10^" sA="pi" aA="e" /> 
                 <NumBtn label="Ans" shift="DRG▶" act="ANS" sA="ANGLE" /> 
                 <NumBtn label="=" act="=" cls="bg-blue-600 text-white border-blue-900 h-12 rounded-lg" />
              </div>
            </div>

            {/* MASTER VISUAL ENGINE */}
            <div className="flex-1 bg-[#0f172a] relative overflow-hidden min-h-[500px] flex flex-col shadow-[inset_20px_0_60px_rgba(0,0,0,0.8)]">
              <canvas ref={canvasRef} width={1000} height={1200} className="w-full h-full object-cover opacity-90" />
              <div className="absolute top-6 right-6 flex flex-col items-end gap-2 pointer-events-none">
                 <div className="px-3 py-1.5 border-r-4 border-blue-500 bg-blue-500/5 backdrop-blur-xl">
                    <div className="text-blue-500 font-mono text-[10px] tracking-[4px] uppercase font-black">STEM_ENGINE_ACTIVE</div>
                 </div>
                 <div className="flex gap-3">
                    {PLOT_COLORS.map((c, i) => <div key={c} className="flex items-center gap-2 px-2 py-0.5 bg-black/40 rounded border border-white/5"><div className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:c}}/><span className="text-[8px] text-white/40 font-mono">f{i+1}</span></div>)}
                 </div>
              </div>
            </div>

          </div>
          </div>
        </div>
      }
      results={null}
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Advanced Scientific Computation Architecture</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                A scientific calculator differs from a standard arithmetic tool by incorporating a <strong className="text-[#202124]">Computer Algebra System (CAS)</strong> and adhering strictly to established order-of-operations protocols (PEMDAS/BODMAS). This computational engine evaluates holistic mathematical strings rather than executing sequential, single-step operations, ensuring absolute mathematical integrity when parsing complex, multi-layered polynomials.
              </p>
              <p>
                Our scientific laboratory utilizes an industrial-grade expression evaluation engine powered by dynamic parsing trees. This permits seamless integration of trigonometric modeling, logarithmic expansion, and advanced calculus operations (differentiation and simplification). The integrated <strong className="text-[#202124]">Multi-Plot Visualizer</strong> simultaneously translates these algebraic expressions into real-time Cartesian geometry.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Core Computational Modules</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Trigonometric Modality:</strong> Instantly process sine, cosine, and tangent functions across Degrees, Radians, and Gradians. Critical for civil engineering, surveying, and physics vectors.</li>
              <li><strong className="text-[#188038]">Symbolic Differentiation (d/dx):</strong> Unlike standard calculators, our engine can symbolically process mathematical derivatives, instantly yielding the instantaneous rate of change of a given function.</li>
              <li><strong className="text-[#D93025]">Base-10 & Natural Logarithms:</strong> Execute exponential decay algorithms and compute pH balances utilizing absolute precision logarithms (log) and natural logarithms (ln) based on Euler's number.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Desktop Interface: Use the interactive Casio-style hardware interface or your physical keyboard to enter expressions into the display.",
          "Trigonometry: Ensure your Angle Mode (DEG/RAD) matches your data before executing sin, cos, or tan operations.",
          "Secondary Functions: Press 'SHIFT' or 'ALPHA' to access the secondary operations (labeled in yellow or pink above the primary keys).",
          "Graphing Engine: Type algebraic expressions containing the variable 'x' (e.g., 'sin(x)' or 'x^2'). The system will automatically map the curve on the right-hand visualizer.",
          "Calculus Operations: Use the SHIFT menu to access d/dx (Differentiation) or SIMPLIFY for algebraic reduction."
        ]
      }}
      formula={{
        title: "Order of Operations Protocol",
        description: "The engine strictly parses mathematical strings based on the universal hierarchy.",
        raw: "Priority 1: Parentheses / Brackets ()\nPriority 2: Exponents & Roots (x², √)\nPriority 3: Multiplication & Division (×, ÷)\nPriority 4: Addition & Subtraction (+, −)\n\nNote: Trigonometric and logarithmic functions are evaluated prior to multiplication."
      }}
      faqs={[
        {
          question: "What is the difference between DEG, RAD, and GRA modes?",
          answer: "These dictate how the engine interprets angles. A full circle is 360 Degrees (DEG), 2π Radians (RAD), or 400 Gradians (GRA). In calculus and advanced physics, Radians are the mandatory universal standard."
        },
        {
          question: "How does the 'simplify' function work?",
          answer: "The simplify function uses the internal Computer Algebra System (CAS) to analytically reduce complex algebraic strings. For example, entering 'simplify(2x + 3x)' will return '5x' rather than attempting to calculate a numerical value."
        },
        {
          question: "Can I store numerical values in variables?",
          answer: "Yes. Use the STO function followed by a variable key (A, B, C, D, E, F, X, Y, M). You can then use the ALPHA key to inject those saved values back into new equations."
        },
        {
          question: "Why do I get a 'SYNTAX ERROR'?",
          answer: "Syntax errors occur when the mathematical string violates parsing rules. Common causes include mismatched parentheses (e.g., '(2+3'), missing operators, or attempting to divide by zero."
        },
        {
          question: "What does the 'd/dx' button do?",
          answer: "It executes symbolic differentiation. By entering 'diff(x^2)', the engine analytically derives the function with respect to 'x' and returns '2x', which represents the slope of the curve at any given point."
        },
        {
          question: "How does the live graphing visualizer operate?",
          answer: "The visualizer actively scans the current expression line. If it detects the variable 'x', it intercepts the expression, substitutes 'x' with sequential pixel coordinates, and maps the resulting y-values onto the Cartesian grid in real-time."
        }
      ]}
    />
  );
}
