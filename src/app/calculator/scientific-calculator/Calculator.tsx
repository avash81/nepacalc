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
      hideH1={true}
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Scientific Calculator' }]}
      title="Scientific Calculator"
      description="Professional online scientific calculator with trigonometry, logs, and power functions. Industrial-grade mathematical engine for advanced algebraic calculations."
      icon={Calculator}
      fullWidth={true}
      inputs={
        <div className="w-full">
          {!isMounted ? (
            <div className="hp-loader h-[400px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
            </div>
          ) : (
            <>
              <div className="p-8 bg-slate-900 text-white rounded-3xl shadow-2xl relative overflow-hidden ring-4 ring-slate-800">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Calculator className="w-48 h-48" />
                </div>
                
                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <div className="flex gap-3">
                      <span className={`text-[10px] font-black tracking-widest ${shift ? 'text-yellow-400' : 'text-slate-600'}`}>SHIFT</span>
                      <span className={`text-[10px] font-black tracking-widest ${alpha ? 'text-pink-400' : 'text-slate-600'}`}>ALPHA</span>
                      <span className={`text-[10px] font-black tracking-widest ${stoMode ? 'text-blue-400' : 'text-slate-600'}`}>STO</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <button onClick={()=>exec('ANGLE')} className="text-[10px] font-black bg-slate-800 px-3 py-1 rounded-md hover:bg-slate-700">{angleMode}</button>
                       <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Scientific Mode</span>
                       </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 space-y-2 min-h-[140px] flex flex-col justify-end text-right">
                    <div className="text-slate-400 text-sm font-mono tracking-wider overflow-x-auto whitespace-nowrap scrollbar-hide flex items-center justify-end gap-1">
                      {expressions[activeIndex].split('').map((char, i) => (
                        <span key={i} className={i === cursorIndex ? "border-l-2 border-blue-400 animate-pulse" : ""}>{char}</span>
                      ))}
                      {cursorIndex === expressions[activeIndex].length && <span className="border-l-2 border-blue-400 animate-pulse h-4" />}
                    </div>
                    <div className="text-5xl font-black tracking-tighter text-white font-mono break-all leading-tight">
                      {display}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                 <div className="space-y-6">
                    <div className="grid grid-cols-6 gap-2">
                      <SciBtn label="SHIFT" cls="bg-slate-700 text-yellow-400 border-slate-900" act="SHIFT" />
                      <SciBtn label="ALPHA" cls="bg-slate-700 text-pink-400 border-slate-900" act="ALPHA" />
                      <SciBtn label="STO" cls="bg-slate-700 text-blue-400 border-slate-900" act="STO" />
                      <SciBtn label="QR" cls="bg-slate-700 text-emerald-400 border-slate-900" act="QR" />
                      <SciBtn label="←" act="LEFT" />
                      <SciBtn label="→" act="RIGHT" />
                    </div>

                    <div className="grid grid-cols-6 gap-2">
                       <SciBtn label="sin" shift="sin⁻¹" alpha="D" sA="asin" aA="D" />
                       <SciBtn label="cos" shift="cos⁻¹" alpha="E" sA="acos" aA="E" />
                       <SciBtn label="tan" shift="tan⁻¹" alpha="F" sA="atan" aA="F" />
                       <SciBtn label="log" shift="10ˣ" sA="10^" />
                       <SciBtn label="ln" shift="eˣ" sA="e^" />
                       <SciBtn label="√" shift="x²" sA="^2" />
                    </div>

                    <div className="grid grid-cols-4 gap-3 bg-slate-100 p-4 rounded-3xl">
                      <NumBtn label="7" /> <NumBtn label="8" /> <NumBtn label="9" /> <NumBtn label="DEL" cls="bg-rose-500 text-white border-rose-700 hover:bg-rose-600" act="DEL" />
                      <NumBtn label="4" /> <NumBtn label="5" /> <NumBtn label="6" /> <NumBtn label="×" act="*" />
                      <NumBtn label="1" /> <NumBtn label="2" /> <NumBtn label="3" /> <NumBtn label="÷" act="/" />
                      <NumBtn label="0" /> <NumBtn label="." /> <NumBtn label="EXP" act="*10^" /> <NumBtn label="+" />
                      <NumBtn label="AC" cls="bg-slate-800 text-white border-slate-950 hover:bg-slate-700" act="AC" />
                      <NumBtn label="Ans" act="ANS" />
                      <NumBtn label="=" cls="col-span-2 bg-blue-600 text-white border-blue-800 hover:bg-blue-700 shadow-blue-200" act="=" />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                       <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Live Multi-Plot Visualizer</h3>
                       <div className="flex gap-2">
                          <button onClick={()=>exec('SIMPLIFY')} className="text-[9px] font-black bg-blue-50 text-blue-600 px-2.5 py-1 rounded border border-blue-100 hover:bg-blue-100 uppercase">Simplify</button>
                          <button onClick={()=>exec('DIFF')} className="text-[9px] font-black bg-rose-50 text-rose-600 px-2.5 py-1 rounded border border-rose-100 hover:bg-rose-100 uppercase">d/dx</button>
                       </div>
                    </div>
                    <div className="bg-slate-900 rounded-3xl p-1 shadow-2xl overflow-hidden aspect-square lg:aspect-auto lg:h-[400px] ring-4 ring-slate-800">
                      <canvas ref={canvasRef} width={800} height={600} className="w-full h-full opacity-90" />
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                      <p className="text-[10px] text-blue-700 font-bold leading-tight">Pro Tip: Use 'x' in your equations to activate the real-time graphing engine. You can plot up to 3 simultaneous curves.</p>
                    </div>
                 </div>
              </div>
            </>
          )}
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
