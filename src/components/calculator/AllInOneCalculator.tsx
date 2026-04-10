'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import * as math from 'mathjs';

/* ── Factorial ─────────────────────────────── */
function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n) || n > 170) return NaN;
  let r = 1; for (let i = 2; i <= n; i++) r *= i; return r;
}

/* ── Master Evaluator ──────────────────────── */
function masterEval(expr: string, deg: boolean): { res: string; err: string | null } {
  try {
    if (!expr) return { res: '0', err: null };
    let p = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/π/g, 'pi').replace(/e/g, 'e').replace(/EXP/g, '*10^');
    const result = math.evaluate(p, {
      pi: Math.PI, e: Math.E,
      sin: (x: number) => deg ? Math.sin(x * Math.PI / 180) : Math.sin(x),
      cos: (x: number) => deg ? Math.cos(x * Math.PI / 180) : Math.cos(x),
      tan: (x: number) => deg ? Math.tan(x * Math.PI / 180) : Math.tan(x),
      sqrt: Math.sqrt, log: Math.log10, ln: Math.log, abs: Math.abs, fact: factorial
    });
    if (typeof result === 'number') {
      if (!isFinite(result)) return { res: 'MATH ERROR', err: 'MATH ERROR' };
      return { res: parseFloat(result.toPrecision(10)).toString(), err: null };
    }
    return { res: String(result), err: null };
  } catch { return { res: 'SYNTAX ERROR', err: 'SYNTAX ERROR' }; }
}

/* ── Graphic Engine (PURE HARDWARE MATCH: WHITE BG) ── */
function drawGraphic(canvas: HTMLCanvasElement, expr: string, deg: boolean) {
  const ctx = canvas.getContext('2d'); if (!ctx) return;
  const w = canvas.width, h = canvas.height;
  ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, w, h);
  const scale = 50; const offsetX = w / 2, offsetY = h / 2;
  ctx.strokeStyle = '#d1d5db'; ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x=0; x<w; x+=scale) { ctx.moveTo(x,0); ctx.lineTo(x,h); }
  for (let y=0; y<h; y+=scale) { ctx.moveTo(0,y); ctx.lineTo(w,y); }
  ctx.stroke();
  ctx.strokeStyle = '#000000'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(0, offsetY); ctx.lineTo(w, offsetY); ctx.moveTo(offsetX, 0); ctx.lineTo(offsetX, h); ctx.stroke();
  if (!expr || !expr.includes('x')) return;
  ctx.strokeStyle = '#000000'; ctx.lineWidth = 4;
  ctx.beginPath(); let first = true;
  for (let px=0; px<w; px++) {
    const vx = (px - offsetX) / scale;
    try {
      const { res, err } = masterEval(expr.replace(/x/g, `(${vx})`), deg);
      const val = parseFloat(res);
      if (!err && isFinite(val)) {
        const py = offsetY - val * scale;
        if (first) { ctx.moveTo(px, py); first = false; } else { ctx.lineTo(px, py); }
      } else { first = true; }
    } catch { first = true; }
  }
  ctx.stroke();
}

export default function AllInOneCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOff, setIsOff] = useState(false);
  const [expression, setExpression] = useState('');
  const [display, setDisplay] = useState('0');
  const [shift, setShift] = useState(false);
  const [alpha, setAlpha] = useState(false);
  const [angleMode] = useState<'DEG'|'RAD'|'GRA'>('DEG');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { setIsMounted(true); }, []);
  useEffect(() => {
    if (isOff) { setDisplay('0'); return; }
    const { res } = masterEval(expression || '0', angleMode === 'DEG');
    setDisplay(res);
  }, [expression, angleMode, isOff]);
  useEffect(() => {
    if (canvasRef.current && isMounted && !isOff) {
      drawGraphic(canvasRef.current, expression, angleMode === 'DEG');
    }
  }, [expression, angleMode, isOff, isMounted]);

  const exec = useCallback((action: string) => {
    if (isOff && action !== 'ON') return;
    switch (action) {
      case 'ON': setIsOff(false); return;
      case 'OFF': setIsOff(true); return;
      case 'SHIFT': setShift(s => !s); setAlpha(false); return;
      case 'ALPHA': setAlpha(a => !a); setShift(false); return;
      case 'AC': setExpression(''); setDisplay('0'); setShift(false); setAlpha(false); return;
      case 'DEL': setExpression(p => p.slice(0, -1)); return;
      case '=': { const { res, err } = masterEval(expression, angleMode==='DEG'); if(!err) setExpression(res); return; }
      default: setExpression(p => p + action);
    }
  }, [expression, display, angleMode, isOff]);

  const Key = ({l, s, a, b, r, c, act}: any) => (
    <div className="flex flex-col items-center">
       <div className="flex justify-between w-full px-1 min-h-[14px]">
          <span className="text-yellow-500 text-[8px] font-bold uppercase">{s}</span>
          <div className="flex gap-1">
             <span className="text-purple-400 text-[8px] font-bold uppercase">{a}</span>
             <span className="text-blue-400 text-[8px] font-bold uppercase">{b}</span>
             <span className="text-red-400 text-[8px] font-bold uppercase">{r}</span>
          </div>
       </div>
       <button onClick={()=>exec(act||l)} className={`w-full py-3 rounded-lg font-bold transition-all border-b-[6px] active:translate-y-1 active:border-b-0 ${c || 'bg-[#2a2c30] text-white border-black hover:bg-[#3a3c40] shadow-xl'}`}>{l}</button>
    </div>
  );

  const NumBtn = ({label, shift: sL, alpha: aL, act, c}: any) => (
    <Key l={label} s={sL} r={aL} act={act} c={c || 'bg-white text-black border-slate-400 hover:bg-slate-100 shadow-lg h-16 rounded-xl'} />
  );

  return (
    <div className="w-full flex justify-center py-10 bg-slate-300 min-h-screen px-4 overflow-auto">
      <div className="flex flex-col lg:flex-row w-full max-w-[1280px] bg-[#1a1c1e] rounded-[4rem] overflow-hidden border-[16px] border-[#222428] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.8)]">
        
        {/* GRAPH PANEL (WHITE BG - IMAGE MATCH) */}
        <div className="flex-1 bg-white relative overflow-hidden min-h-[600px] border-b-8 lg:border-b-0 lg:border-r-8 border-black/20">
          <canvas ref={canvasRef} width={1000} height={1200} className="w-full h-full object-cover" />
          <div className="absolute top-10 right-10 flex flex-col items-end gap-2 pointer-events-none opacity-20">
             <div className="text-black font-black text-6xl tracking-tighter">IPEROT</div>
             <div className="text-black font-mono text-[10px] tracking-[6px] uppercase">Scientific_Graphic_v7.0</div>
          </div>
        </div>

        {/* CALCULATOR PANEL */}
        <div className="w-full lg:w-[680px] p-8 sm:p-14 lg:p-16 flex flex-col items-stretch">
          
          <div className="bg-[#9cae9c] min-h-[220px] p-8 rounded-[2rem] border-[10px] border-[#16181b] shadow-[inset_0_20px_60px_rgba(0,0,0,0.3)] mb-12 flex flex-col font-mono text-slate-900 border-double">
            {!isOff && (
               <div className="flex flex-col h-full">
                  <div className="flex justify-between text-[11px] font-black uppercase mb-4 opacity-70">
                    <div className="flex gap-4">
                      <span className={shift?'bg-black text-white px-1.5':''}>S</span>
                      <span className={alpha?'bg-black text-white px-1.5':''}>A</span>
                      <span>FIX</span>
                    </div>
                    <div>{angleMode}</div>
                  </div>
                  <div className="text-4xl mt-1 overflow-hidden whitespace-nowrap">{expression || '0'}</div>
                  <div className="mt-auto text-8xl font-black text-right leading-none tracking-tighter">{display}</div>
               </div>
            )}
          </div>

          {/* HEADER: LRN, GRAPHIC, OFF, ON */}
          <div className="grid grid-cols-4 gap-6 mb-10 items-center">
             <Key l="LRN" c="bg-slate-300 text-black border-slate-500" />
             <div className="text-emerald-500 font-black italic tracking-[8px] text-[10px] text-center border-l border-r border-emerald-500/30">GRAPHIC</div>
             <Key l="OFF" act="OFF" c="bg-slate-300 text-black border-slate-500" />
             <Key l="ON" act="ON" c="bg-slate-300 text-black border-slate-500" />
          </div>

          {/* UTIL: SHIFT, ALPHA, G-SOLVE, REPLAY, MODE */}
          <div className="flex justify-between items-center mb-10 gap-4">
             <Key l="SHIFT" act="SHIFT" s="GRAPH" c="bg-[#ffa500] text-white border-[#cc8400] rounded-xl px-5" />
             <Key l="ALPHA" act="ALPHA" r="A-LOCK" c="bg-[#9370db] text-white border-[#7b68ee] rounded-xl px-5" />
             <Key l="G-SOLVE" s="Funct" c="bg-slate-300 text-black border-slate-500 text-[9px]" />
             <div className="w-[160px] h-[160px] relative bg-slate-700 rounded-full border-[6px] border-black shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden">
                <div className="text-yellow-500 text-[8px] font-black absolute top-5">Value</div>
                <div className="text-green-500 text-[8px] font-black absolute left-4">Cls</div>
                <div className="text-green-500 text-[8px] font-black absolute right-4">G-T</div>
                <div className="text-yellow-500 text-[8px] font-black absolute bottom-5">Y=f</div>
                <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center border border-white/5"><div className="text-[9px] text-white/20 font-black uppercase tracking-widest">Replay</div></div>
             </div>
             <Key l="MODE" c="bg-slate-300 text-black border-slate-500" />
          </div>

          {/* GRAPH KEYS */}
          <div className="grid grid-cols-4 gap-6 mb-12">
             <Key l="DRAW" s="Zoom Org" /> <Key l="RANGE" s="Factor" /> <Key l="TRACE" s="SKETCH" /> <Key l="CALC" s="PROG" />
          </div>

          {/* SCI GRID (6X3) */}
          <div className="grid grid-cols-6 gap-x-4 gap-y-10 mb-12">
             <Key l="x³" s="∛" r="A" /> <Key l="x^y" s="x√" r="=" /> <Key l="√" s="x!" b="DEC" /> <Key l="x²" s="x⁻¹" b="HEX" /> <Key l="LOG" s="10ˣ" b="BIN" /> <Key l="IN" s="eˣ" b="OCT" />
             <Key l="X,T" s=":" b="LOGIC" r="A" /> <Key l="°'''" s="←" r="B" /> <Key l="hyp" b="[d]" r="C" /> <Key l="sin" b="[h] sin⁻¹" r="D" act="sin(" /> <Key l="cos" b="[b] cos⁻¹" r="E" act="cos(" /> <Key l="tan" b="[a] tan⁻¹" r="F" act="tan(" />
             <Key l="STO" s="RCL" /> <Key l="ab/c" s="d/c" b="∫dx" /> <Key l="ENG" s=",,," b="i" /> <Key l="(" s="arg" r="X" /> <Key l=")" s="Abs" r="Y" /> <Key l="M+" s="M-" r="M" />
          </div>

          {/* NUM GRID (5X4) */}
          <div className="grid grid-cols-5 gap-x-5 gap-y-10 px-1">
             <Key l="7" b="[4]" r="Σx²y" /> <Key l="8" b="[8]" r="Σx²" /> <Key l="9" b="[C]" r="Σx" /> <Key l="DEL" s="INS" c="bg-red-700 text-white border-red-900 h-16 rounded-xl" /> <Key l="AC" b="Mel" s="[CL]" c="bg-red-700 text-white border-red-900 h-16 rounded-xl" />
             <Key l="4" b="[ȳ]" r="Σxy" /> <Key l="5" b="[yon]" r="Σy" /> <Key l="6" b="[yon-1]" r="Σy²" /> <Key l="×" s="Zoom xf" /> <Key l="÷" s="Zoom x1/f" />
             <Key l="1" b="[x̄]" r="n" /> <Key l="2" b="[xon]" r="Σx" /> <Key l="3" b="[xon-1]" r="Σx²" /> <Key l="+" b="[x̂]" s="POL(" /> <Key l="-" b="[ŷ]" s="Rec(" />
             <Key l="0" s="Rnd" /> <Key l="." s="Ran#" /> <Key l="EXP" s="π" /> <Key l="(-)" s="Ans" /> <Key l="=" s="%" b="[Re<=>Im]" c="bg-slate-700 text-white border-black h-16 rounded-xl" />
          </div>

          <div className="mt-14 text-center">
             <div className="text-white/20 font-black tracking-[12px] text-xl uppercase italic">Scientific Calculator</div>
          </div>
        </div>

      </div>
    </div>
  );
}
