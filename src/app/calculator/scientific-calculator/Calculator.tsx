'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import * as math from 'mathjs';
import QRCode from 'qrcode';

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
    if (typeof result === 'number') {
      if (!isFinite(result)) return { res: 'MATH ERROR', err: 'MATH ERROR' };
      let s = parseFloat(result.toPrecision(10)).toString();
      if (Math.abs(result) >= 1e15) return { res: 'OVERFLOW', err: 'OVERFLOW' };
      if (Math.abs(result) >= 1e10 || (Math.abs(result) > 0 && Math.abs(result) < 1e-6)) s = result.toExponential(6);
      return { res: s, err: null };
    }
    return { res: String(result), err: null };
  } catch { return { res: 'SYNTAX ERROR', err: 'SYNTAX ERROR' }; }
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

const VAR_KEYS: Record<string, string> = { '(-)': 'A', '.,,,': 'B', 'hyp': 'C', 'sin': 'D', 'cos': 'E', 'tan': 'F', '(': 'X', ')': 'Y', 'M+': 'M' };

export default function ScientificCalculator() {
  const [isMounted, setIsMounted]   = useState(false);
  const [isOff, setIsOff]           = useState(false);
  const [expressions, setExpressions] = useState<string[]>(['', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const [display, setDisplay]       = useState('0');
  const [memory, setMemory]         = useState(0);
  const [vars, setVars]             = useState<Record<string, number>>({ A:0, B:0, C:0, D:0, E:0, F:0, X:0, Y:0, M:0 });
  const [lastAns, setLastAns]       = useState('0');
  const [shift, setShift]           = useState(false);
  const [alpha, setAlpha]           = useState(false);
  const [stoMode, setStoMode]       = useState(false);
  const [qrBlob, setQrBlob]         = useState<string | null>(null);
  const [angleMode, setAngleMode]   = useState<'DEG'|'RAD'|'GRA'>('DEG');
  const [cursorIndex, setCursorIndex] = useState(0);
  const canvasRef                   = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const m = localStorage.getItem('cp_m'); if (m) setMemory(parseFloat(m));
    const v = localStorage.getItem('cp_v'); if (v) setVars(JSON.parse(v));
    const a = localStorage.getItem('cp_a'); if (a) setAngleMode(a as any);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('cp_m', memory.toString());
    localStorage.setItem('cp_v', JSON.stringify(vars));
    localStorage.setItem('cp_a', angleMode);
  }, [memory, vars, angleMode, isMounted]);

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

  const generateQR = async () => {
    try {
      const data = `Expression: ${expressions[activeIndex]}\nResult: ${display}`;
      const url = await QRCode.toDataURL(data);
      setQrBlob(url);
      setTimeout(() => setQrBlob(null), 5000);
    } catch (err) { console.error(err); }
  };

  const exec = useCallback((action: string) => {
    if (isOff && action !== 'ON') return;
    if (stoMode && VAR_KEYS[action]) {
       const vName = VAR_KEYS[action];
       const currentVal = parseFloat(display);
       if (!isNaN(currentVal)) { setVars(prev => ({ ...prev, [vName]: currentVal })); setStoMode(false); setShift(false); return; }
    }
    if (alpha && VAR_KEYS[action]) {
       const vName = VAR_KEYS[action];
       setExpressions(p => { const n=[...p]; n[activeIndex]=n[activeIndex].slice(0, cursorIndex) + String(vars[vName]) + n[activeIndex].slice(cursorIndex); return n; });
       setCursorIndex(p => p + String(vars[vName]).length);
       setAlpha(false); return;
    }
    switch (action) {
      case 'ON': setIsOff(false); return;
      case 'SHIFT': setShift(s => !s); setAlpha(false); setStoMode(false); return;
      case 'ALPHA': setAlpha(a => !a); setShift(false); setStoMode(false); return;
      case 'STO': setStoMode(true); return;
      case 'QR': generateQR(); return;
      case 'AC': if (shift) { setIsOff(true); setShift(false); } else { setExpressions(p=>{ const n=[...p]; n[activeIndex]=''; return n; }); setDisplay('0'); setCursorIndex(0); setShift(false); setAlpha(false); setStoMode(false); } return;
      case 'DEL': setExpressions(p => { const n=[...p]; n[activeIndex]=n[activeIndex].slice(0, cursorIndex - 1) + n[activeIndex].slice(cursorIndex); return n; }); setCursorIndex(p => Math.max(0, p - 1)); return;
      case '=': { const { res, err } = stemEval(expressions[activeIndex], angleMode==='DEG'); if(!err) { setLastAns(res); setExpressions(p => { const n=[...p]; n[activeIndex]=res; return n; }); setCursorIndex(res.length); } return; }
      case 'M+': { const v=parseFloat(display); if(!isNaN(v)) setMemory(m=>m+v); return; }
      case 'MR': setExpressions(p => { const n=[...p]; n[activeIndex]=n[activeIndex].slice(0, cursorIndex) + String(memory) + n[activeIndex].slice(cursorIndex); return n; }); setCursorIndex(p=>p+String(memory).length); return;
      case 'ANGLE': setAngleMode(m => m==='DEG'?'RAD':m==='RAD'?'GRA':'DEG'); return;
      case 'ANS': setExpressions(p => { const n=[...p]; n[activeIndex]=n[activeIndex].slice(0, cursorIndex) + lastAns + n[activeIndex].slice(cursorIndex); return n; }); setCursorIndex(p=>p+lastAns.length); return;
      case 'LEFT': setCursorIndex(p => Math.max(0, p - 1)); return;
      case 'RIGHT': setCursorIndex(p => Math.min(expressions[activeIndex].length, p + 1)); return;
      case 'UP': setActiveIndex(p => (p + 1) % 3); return;
      case 'DOWN': setActiveIndex(p => (p - 1 + 3) % 3); return;
      case 'SIMPLIFY': setExpressions(p => { const n=[...p]; n[activeIndex]=`simplify(${n[activeIndex]})`; return n; }); return;
      case 'DIFF': setExpressions(p => { const n=[...p]; n[activeIndex]=`diff(${n[activeIndex]})`; return n; }); return;
      default: setExpressions(p => { const n=[...p]; n[activeIndex]=n[activeIndex].slice(0, cursorIndex) + action + n[activeIndex].slice(cursorIndex); return n; }); setCursorIndex(p=>p+action.length);
    }
  }, [expressions, activeIndex, display, angleMode, memory, vars, isOff, shift, alpha, lastAns, stoMode, cursorIndex]);

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

  return (
    <div className="w-full flex justify-center py-10 bg-slate-200 min-h-screen px-4 overflow-auto">
      <div className="flex flex-col lg:flex-row w-full max-w-[1240px] bg-[#1e2024] rounded-[4rem] overflow-hidden border-[16px] border-[#2d2f34] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] relative">
        
        {/* HARWARE INTERFACE */}
        <div className="w-full lg:w-[600px] p-8 sm:p-14 lg:p-16 border-b-8 lg:border-b-0 lg:border-r-8 border-black/20 flex flex-col relative z-10">
          
          <div className="flex justify-between items-end px-2 mb-6">
            <div className="text-white font-black italic text-3xl tracking-tighter drop-shadow-md">CASIO <span className="text-[12px] font-normal not-italic opacity-50 ml-1 tracking-widest">SCIENTIFIC MASTER</span></div>
            <div className="text-slate-400 text-[10px] uppercase tracking-widest hidden lg:block border-l border-white/10 pl-3">TI-Nspire CAS Mode</div>
          </div>

          <div className="bg-[#151c14] min-h-[200px] p-8 rounded-2xl border-[8px] border-[#16181b] shadow-[inset_0_20px_50px_rgba(0,0,0,0.8)] flex flex-col font-mono text-green-500 relative overflow-hidden">
            {!isOff && (
               <>
                <div className="flex justify-between items-center text-[11px] border-b border-green-500/20 pb-1 mb-4 font-black uppercase tracking-tighter">
                  <div className="flex gap-4">
                    <span className={shift?'bg-green-500 text-black px-1.5 rounded-sm':''}>S</span>
                    <span className={alpha?'bg-green-500 text-black px-1.5 rounded-sm':''}>A</span>
                    <span className={stoMode?'bg-blue-500 text-white px-1.5 rounded-sm':''}>STO</span>
                    <span>f{activeIndex+1}</span>
                  </div>
                  <div>{angleMode}</div>
                </div>
                <div className="text-3xl mt-1 overflow-hidden whitespace-nowrap flex items-center">
                   {expressions[activeIndex].slice(0, cursorIndex)}<span className="w-0.5 h-6 bg-green-500 animate-pulse" />{expressions[activeIndex].slice(cursorIndex) || '0'}
                </div>
                <div className="mt-auto text-7xl font-black text-right leading-none tracking-tighter drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]">{display}</div>
               </>
            )}
            {qrBlob && <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center animate-in fade-in transition-all"><img src={qrBlob} className="w-32 h-32 mb-2 p-2 bg-white rounded-lg shadow-xl"/><span className="text-[10px] uppercase font-black text-white px-2 py-1 bg-green-600 rounded">Shared Link Ready</span></div>}
          </div>

          {/* D-PAD */}
          <div className="flex justify-between items-center mt-12 gap-4">
            <div className="flex flex-col gap-3 flex-1">
               <SciBtn label="SHIFT" act="SHIFT" cls="bg-[#fb923c] text-white border-[#9a3412] h-12 rounded-xl" />
               <SciBtn label="ALPHA" alpha="A-LOCK" act="ALPHA" cls="bg-[#db2777] text-white border-[#831843] h-12 rounded-xl" />
            </div>

            <div className="w-[160px] h-[160px] relative bg-gradient-to-tr from-[#64748b] via-[#cbd5e1] to-[#f8fafc] rounded-full border-[6px] border-[#1e293b] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex items-center justify-center">
               <button onClick={()=>exec('UP')} className="absolute top-0 w-full h-[35%] flex items-center justify-center"><div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px] border-[#1e293b]" /></button>
               <button onClick={()=>exec('DOWN')} className="absolute bottom-0 w-full h-[35%] flex items-center justify-center"><div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] border-[#1e293b]" /></button>
               <button onClick={()=>exec('LEFT')} className="absolute left-0 h-full w-[35%] flex items-center justify-center"><div className="w-0 h-0 border-t-[8px] border-b-[8px] border-r-[10px] border-[#1e293b]" /></button>
               <button onClick={()=>exec('RIGHT')} className="absolute right-0 h-full w-[35%] flex items-center justify-center"><div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[10px] border-[#1e293b]" /></button>
               <div className="w-16 h-16 bg-[#1e293b]/5 rounded-full border border-black/10 flex items-center justify-center"><div className="text-[10px] font-black text-[#1e293b]/30 tracking-widest uppercase">Select</div></div>
            </div>

            <div className="flex flex-col gap-3 flex-1 text-right">
               <button onClick={()=>press('MODE')} className="bg-slate-300 text-black border-b-[4px] border-slate-500 h-12 rounded-xl text-[10px] font-black uppercase">Setup</button>
               <button onClick={()=>press('ON')} className="bg-slate-300 text-black border-b-[4px] border-slate-500 h-12 rounded-xl text-[10px] font-black">ON</button>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-x-3 gap-y-6 mt-12 px-1">
             <SciBtn label="OPTN" shift="QR" act="OPTN" sA="QR" /> 
             <SciBtn label="CALC" shift="SOLVE" sA="SIMPLIFY" /> 
             <SciBtn label="∫dx" shift="d/dx" act="∫" sA="DIFF" /> 
             <SciBtn label="x⁻¹" shift="x!" act="^-1" /> 
             <SciBtn label="log口" shift="Σ" act="log(" /> 
             <SciBtn label="ln" shift="eˣ" act="ln(" />
             {['ab/c','√','x²','x^','log','ln'].map((l, i) => (
                <SciBtn key={l} label={l} shift={['b/c','∛','x³','nth√','10ˣ','eˣ'][i]} act={['(','sqrt(','^2','^','log10(','ln('][i]} />
             ))}
             <SciBtn label="(-)" shift="STO" alpha="A" act="(-)" sA="STO" aA="X" /> 
             <SciBtn label=".,,," shift="←" alpha="B" act="," aA="Y" /> 
             <SciBtn label="hyp" shift="Abs" alpha="C" /> 
             <SciBtn label="sin" shift="sin⁻¹" alpha="D" act="sin(" sA="asin(" /> 
             <SciBtn label="cos" shift="cos⁻¹" alpha="E" act="cos(" sA="acos(" /> 
             <SciBtn label="tan" shift="tan⁻¹" alpha="F" act="tan(" sA="atan(" />
          </div>

          <div className="grid grid-cols-5 gap-x-4 gap-y-7 mt-12 px-1 pb-10">
             {[7,8,9].map(n => <NumBtn key={n} label={String(n)} />)}
             <NumBtn label="DEL" cls="bg-red-600 text-white border-red-900 h-14 rounded-xl" act="DEL" />
             <NumBtn label="AC" cls="bg-red-600 text-white border-red-900 h-14 rounded-xl" shift="OFF" act="AC" />
             {[4,5,6].map(n => <NumBtn key={n} label={String(n)} />)}
             <NumBtn label="×" act="×" /> <NumBtn label="÷" act="÷" />
             {[1,2,3].map(n => <NumBtn key={n} label={String(n)} />)}
             <NumBtn label="+" act="+" /> <NumBtn label="-" act="-" />
             <NumBtn label="0" /> <NumBtn label="." act="." /> 
             <NumBtn label="x10ˣ" shift="π" alpha="e" act="*10^" sA="pi" aA="e" /> 
             <NumBtn label="Ans" shift="DRG▶" act="ANS" sA="ANGLE" /> 
             <NumBtn label="=" act="=" cls="bg-blue-600 text-white border-blue-900 h-14 rounded-xl" />
          </div>
        </div>

        {/* MASTER VISUAL ENGINE */}
        <div className="flex-1 bg-[#0f172a] relative overflow-hidden min-h-[600px] flex flex-col shadow-[inset_30px_0_100px_rgba(0,0,0,0.8)]">
          <canvas ref={canvasRef} width={1000} height={1200} className="w-full h-full object-cover opacity-90" />
          <div className="absolute top-10 right-10 flex flex-col items-end gap-3 pointer-events-none">
             <div className="px-4 py-2 border-r-4 border-blue-500 bg-blue-500/5 backdrop-blur-xl">
                <div className="text-blue-500 font-mono text-xs tracking-[6px] uppercase font-black">MASTER_STEM_ENGINE_ACTIVE</div>
                <div className="text-white/20 font-mono text-[8px] uppercase tracking-widest mt-1">Symbolic Logic: TI-Nspire CAS Mode</div>
             </div>
             <div className="flex gap-4">
                {PLOT_COLORS.map((c, i) => <div key={c} className="flex items-center gap-2 px-2 py-1 bg-black/40 rounded border border-white/5"><div className="w-2 h-2 rounded-full" style={{backgroundColor:c}}/><span className="text-[9px] text-white/40 font-mono">f{i+1}</span></div>)}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
