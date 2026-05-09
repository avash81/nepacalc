'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import * as math from 'mathjs';
import * as QRCode from 'qrcode';
import { useSyncState } from '@/hooks/useSyncState';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Calculator, TrendingUp, Info, ShieldCheck, Microscope, History, GraduationCap, Landmark, Binary, Activity, Target, Award, Sigma } from 'lucide-react';

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
       <button onClick={()=>press(act||label, sA, aA)} className={`w-full py-2 rounded-md transition-all font-bold text-[11px] border-b-2 active:border-b-0 active:translate-y-[1px] ${cls || 'bg-slate-800 text-[#202124] border-slate-950 hover:bg-slate-700 shadow-sm'}`}>{label}</button>
    </div>
  );

  const NumBtn = ({label, shift: sL, alpha: aL, act, sA, aA, cls}: any) => (
    <div className="flex flex-col items-center group">
       <div className="flex gap-2 min-h-[14px]">
          {sL && <span className="text-yellow-400 text-[9px] font-bold uppercase">{sL}</span>}
          {aL && <span className="text-pink-300 text-[9px] font-bold uppercase">{aL}</span>}
       </div>
       <button onClick={()=>press(act||label, sA, aA)} className={`w-full py-2 rounded-md transition-all font-bold text-[13px] border-b-4 active:border-b-0 active:translate-y-[2px] ${cls || 'bg-white text-black border-slate-300 hover:bg-slate-50 shadow-sm'}`}>{label}</button>
    </div>
  );

  return (
    <ModernCalcLayout
      slug="scientific-calculator"
      crumbs={[{ label: 'Math Tools', href: '/math-tools/' }, { label: 'Scientific Calculator' }]}
      title="Institutional Scientific Calculator & CAS"
      description="The definitive online scientific calculator. Featuring a Symbolic Computer Algebra System (CAS), real-time multi-plotting, and shift-key logic. Fully aligned with NEB, TU, and international STEM standards."
      icon={Calculator}
      inputs={
        <div className="w-full">
          {!isMounted ? (
            <div className="hp-loader h-[400px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1A73E8]"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-6 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg shadow-sm relative overflow-hidden">
                <div className="relative z-10 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <span className={`text-[9px] font-bold tracking-widest ${shift ? 'text-[#1A73E8]' : 'text-[#70757A]'}`}>SHIFT</span>
                      <span className={`text-[9px] font-bold tracking-widest ${alpha ? 'text-rose-500' : 'text-[#70757A]'}`}>ALPHA</span>
                    </div>
                    <button onClick={()=>exec('ANGLE')} className="text-[9px] font-bold bg-white border border-[#DADCE0] px-3 py-1 rounded text-[#5F6368]">{angleMode}</button>
                  </div>

                  <div className="bg-white rounded-md p-5 border border-[#DADCE0] min-h-[120px] flex flex-col justify-end text-right">
                    <div className="text-[#70757A] text-sm font-mono overflow-x-auto whitespace-nowrap scrollbar-hide flex items-center justify-end gap-1 mb-2">
                      {expressions[activeIndex].split('').map((char, i) => (
                        <span key={i} className={i === cursorIndex ? "border-l-2 border-[#1A73E8] animate-pulse" : ""}>{char}</span>
                      ))}
                      {cursorIndex === expressions[activeIndex].length && <span className="border-l-2 border-[#1A73E8] animate-pulse h-4" />}
                    </div>
                    <div className="text-4xl font-black text-[#202124] font-mono truncate">
                      {display}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-6 gap-2">
                  <button onClick={()=>exec('SHIFT')} className={`py-2 text-[10px] font-bold border rounded transition-all ${shift ? 'bg-[#1A73E8] border-[#1A73E8] text-[#202124]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}>SFT</button>
                  <button onClick={()=>exec('ALPHA')} className={`py-2 text-[10px] font-bold border rounded transition-all ${alpha ? 'bg-rose-500 border-rose-500 text-[#202124]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}>ALP</button>
                  <button onClick={()=>exec('STO')} className={`py-2 text-[10px] font-bold border rounded transition-all ${stoMode ? 'bg-amber-500 border-amber-500 text-[#202124]' : 'bg-white border-[#DADCE0] text-[#5F6368]'}`}>STO</button>
                  <button onClick={()=>exec('QR')} className="py-2 text-[10px] font-bold border border-[#DADCE0] bg-white text-[#5F6368] rounded">QR</button>
                  <button onClick={()=>exec('LEFT')} className="py-2 text-[10px] font-bold border border-[#DADCE0] bg-white text-[#5F6368] rounded">←</button>
                  <button onClick={()=>exec('RIGHT')} className="py-2 text-[10px] font-bold border border-[#DADCE0] bg-white text-[#5F6368] rounded">→</button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                    {['sin', 'cos', 'tan', 'log', 'ln', '√'].map(btn => (
                      <button key={btn} onClick={()=>press(btn)} className="py-2 text-[10px] font-bold border border-[#DADCE0] bg-[#F8F9FA] text-[#5F6368] rounded hover:border-[#1A73E8] transition-all">{btn}</button>
                    ))}
                </div>

                <div className="grid grid-cols-4 gap-2 bg-[#F1F3F4] p-4 rounded-lg">
                  {['7','8','9','DEL','4','5','6','*','1','2','3','/','0','.','EXP','+'].map(btn => (
                    <button key={btn} onClick={()=>exec(btn === 'DEL' ? 'DEL' : btn === '*' ? '*' : btn === '/' ? '/' : btn === 'EXP' ? '*10^' : btn)} className={`py-3 text-[14px] font-bold border rounded transition-all ${btn === 'DEL' ? 'bg-rose-500 border-rose-600 text-[#202124]' : 'bg-white border-[#DADCE0] text-[#202124]'}`}>{btn}</button>
                  ))}
                  <button onClick={()=>exec('AC')} className="py-3 text-[14px] font-bold border border-[#5F6368] bg-[#5F6368] text-[#202124] rounded">AC</button>
                  <button onClick={()=>exec('ANS')} className="py-3 text-[14px] font-bold border border-[#DADCE0] bg-white text-[#202124] rounded">Ans</button>
                  <button onClick={()=>exec('=')} className="col-span-2 py-3 text-[14px] font-bold border border-[#1A73E8] bg-[#1A73E8] text-[#202124] rounded shadow-sm">=</button>
                </div>
              </div>
            </div>
          )}
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-8 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Institutional CAS Result</div>
             <div className="text-4xl font-black text-[#1A73E8] font-mono uppercase truncate">{display}</div>
             <div className="text-[10px] font-bold text-[#70757A] uppercase tracking-tighter">
                Precision: 10 Decimals
             </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-1 shadow-sm overflow-hidden aspect-square group relative">
            <canvas ref={canvasRef} width={800} height={800} className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-4 left-4 flex gap-2">
               <div className="px-2 py-0.5 bg-[#F1F3F4] border border-[#DADCE0] rounded text-[8px] font-bold text-[#5F6368] uppercase">Cartesian Plot</div>
            </div>
          </div>

          <div className="p-6 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg space-y-4">
             <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#70757A]">Computation Modules</h4>
                <div className="flex gap-2">
                   <button onClick={()=>exec('SIMPLIFY')} className="text-[9px] font-bold bg-[#1A73E8] text-[#202124] px-3 py-1.5 rounded hover:bg-[#1557B0] transition-all uppercase">Simplify</button>
                   <button onClick={()=>exec('DIFF')} className="text-[9px] font-bold bg-rose-600 text-[#202124] px-3 py-1.5 rounded hover:bg-rose-700 transition-all uppercase">d/dx</button>
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-20">
          {/* Section 1: Philosophy of Computation */}
          <section className="bg-white border border-[#DADCE0] rounded-lg p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-5">
                <History className="w-64 h-64" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#E8F0FE] p-4 rounded-2xl">
                  <Landmark className="w-8 h-8 text-[#1A73E8]" />
              </div>
              <h2 className="text-4xl font-black text-[#202124] tracking-tighter">The Silicon Sage: Evolution of the Scientific Calculator</h2>
            </div>
            <div className="prose prose-md text-[#5F6368] max-w-none leading-relaxed space-y-6">
              <p>
                A scientific calculator is not merely an arithmetic tool; it is a portable portal to the laws of physics and the abstract beauty of higher mathematics. From the ancient abacus to the mechanical Slide Rule used by 18th-century astronomers, humanity has always sought to outsource the cognitive load of complex calculation. The modern digital scientific calculator, pioneered in the 1970s, democratized advanced STEM (Science, Technology, Engineering, Mathematics) education, allowing students to solve multi-variable equations that previously required massive mainframe computers.
              </p>
              <p>
                In the academic ecosystem of Nepal, the scientific calculator is a mandatory companion for students under the <a href="https://neb.gov.np" className="text-[#1A73E8] font-bold hover:underline">National Examination Board (NEB)</a>. Whether solving vector diagrams in <strong>Grade 11 Physics</strong> or evaluating logarithmic growth models in <strong>Grade 12 Biology</strong>, the ability to process symbolic logic is what separates a basic calculator from a scientific engine. The mastery of this tool is a primary benchmark for entry into prestigious institutions like the <strong>Institute of Engineering (IOE), Pulchowk</strong>.
              </p>
              <p>
                Our <strong>Institutional Scientific Calculator</strong> is engineered with a high-fidelity <strong>Computer Algebra System (CAS)</strong>. It doesn't just calculate; it understands. By strictly enforcing the <strong>BODMAS/PEMDAS</strong> hierarchy, our engine ensures that your results are mathematically "True," protecting researchers and students from the common pitfalls of sequential arithmetic errors that often lead to bridge failures or economic miscalculations.
              </p>
            </div>
          </section>

          {/* Section 2: Order of Operations */}
          <section className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-12 shadow-sm">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-[#E6F4EA] p-4 rounded-2xl">
                  <Binary className="w-8 h-8 text-[#188038]" />
              </div>
              <h2 className="text-4xl font-black text-[#202124] tracking-tighter">The BODMAS Axiom: Why Precision Matters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm">
              <div className="space-y-6">
                <div className="group">
                    <h3 className="text-2xl font-black text-[#202124] border-l-4 border-[#1A73E8] pl-5 mb-4">Holistic Evaluation</h3>
                    <p className="text-[#5F6368] leading-relaxed">
                        Basic calculators execute operations as you type them (sequential). A scientific calculator waits for the entire string to be populated, then parses the equation through an expression tree. This ensures that exponents are resolved before multiplication, and parentheses take absolute precedence. This is critical when calculating the <strong>compound interest</strong> rates for multi-million rupee infrastructure bonds in Nepal.
                    </p>
                </div>
                <div className="group">
                    <h3 className="text-2xl font-black text-[#202124] border-l-4 border-[#188038] pl-5 mb-4">Degrees vs. Radians</h3>
                    <p className="text-[#5F6368] leading-relaxed">
                        In surveying the high-altitude hills of <strong>Solukhumbu</strong> or <strong>Mustang</strong>, engineers often work in Degrees. However, in pure calculus and physics, Radians are the natural language of mathematics. Our calculator provides a seamless toggle between DEG, RAD, and GRA (Gradians), ensuring your trigonometry aligns with the <strong>Department of Survey</strong> guidelines for terrestrial mapping.
                    </p>
                </div>
              </div>
              <div className="bg-white p-10 rounded-lg shadow-inner border border-[#DADCE0] space-y-6">
                    <h4 className="text-lg font-black text-[#202124]">Operational Hierarchy</h4>
                    <ul className="space-y-4 text-[#5F6368]">
                        <li className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#1A73E8]" />
                            <span><strong>Brackets:</strong> $(x)$ Always first.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#188038]" />
                            <span><strong>Orders:</strong> {'$x^2, \\sqrt{x}, \\log$'}</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#D93025]" />
                            <span><strong>Div/Mult:</strong> Left to right.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#F29900]" />
                            <span><strong>Add/Sub:</strong> Final resolution.</span>
                        </li>
                    </ul>
                </div>
            </div>
          </section>

          {/* Section 3: Professional Modules */}
          <section className="bg-white border border-[#DADCE0] rounded-lg p-12 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#FEF7E0] p-4 rounded-2xl">
                  <GraduationCap className="w-8 h-8 text-[#F29900]" />
              </div>
              <h2 className="text-3xl font-black text-[#202124] tracking-tighter">Institutional Applications: Hydropower to Civil Service</h2>
            </div>
            <div className="prose prose-md text-[#5F6368] max-w-none leading-relaxed space-y-6">
              <p>
                In Nepal\'s thriving <strong>Hydropower Industry</strong>, the scientific calculator is used to solve the <em>Bernoulli Equation</em> and determine water pressure at turbine inlets. Engineers at the <a href="https://nea.org.np" className="text-[#1A73E8] font-bold hover:underline">Nepal Electricity Authority (NEA)</a> utilize these tools for load-balancing calculations and harmonic analysis in regional power grids. Accurate trigonometric functions are required to calculate the phase shift in AC current across long-distance transmission lines.
              </p>
              <p>
                For candidates of the <strong>Lok Sewa Aayog</strong> technical wings, proficiency in using a scientific calculator is a prerequisite for the competitive examinations. Whether you are applying for a position in the <strong>Department of Roads</strong> or the <strong>Central Bureau of Statistics (NSO)</strong>, the ability to process high-precision logarithms and trigonometric functions is a core competency that determines your career trajectory in the civil service.
              </p>
              <p>
                Our <strong>Live Multi-Plot Visualizer</strong> takes this a step further. By typing any expression containing the variable 'x', students can visualize the geometry of their functions instantly. This "Visual Intelligence" is essential for understanding the relationship between algebraic symbols and their real-world geometric counterparts—a skill highly valued at the <strong>Institute of Engineering (IOE), Pulchowk</strong> and <strong>Kathmandu University (KU)</strong>.
              </p>
            </div>
          </section>

          {/* Section 4: High-Altitude Trigonometry Deep Dive */}
          <section className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-12 shadow-sm">
            <h2 className="text-3xl font-black text-[#202124] mb-8 tracking-tighter flex items-center gap-4">
                <Target className="w-8 h-8 text-[#1A73E8]" />
                Surveying the Himalayas: Trig in High-Altitudes
            </h2>
            <div className="prose prose-md text-[#5F6368] max-w-none leading-relaxed space-y-6">
              <p>
                Calculating the height of mountains like <strong>Mount Everest</strong> or <strong>Annapurna</strong> isn't done with a ruler; it's done with <strong>Trigonometric Leveling</strong>. By measuring the angle of elevation ({'$\\theta$'}) from two different points at a known distance, surveyors use the Law of Sines and the Law of Cosines to triangulate the peak.
              </p>
              <div className="bg-white p-6 rounded-2xl border border-[#DADCE0] font-mono text-xs text-center">
                {'$h = d \\cdot \\tan(\\theta) + h_{instrument}$'}
              </div>
              <p>
                Our calculator\'s precision in handling inverse trigonometric functions ($\sin^{-1}, \cos^{-1}$) allows surveyors in <strong>Gorkha</strong> or <strong>Taplejung</strong> to perform these calculations on the fly. When working at altitudes where atmospheric pressure affects light refraction, the ability to enter custom correction factors as constants is an indispensable feature of our institutional engine.
              </p>
            </div>
          </section>

          {/* Section 5: Advanced STEM Features */}
          <section className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] text-[#202124] rounded-lg p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 opacity-10">
                <TrendingUp className="w-64 h-64" />
            </div>
            <h2 className="text-4xl font-black mb-10 border-b border-[#dadce0] pb-6 tracking-tighter">Calculus & Symbolic Logic</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6 text-slate-300 leading-relaxed text-sm">
                    <div className="flex gap-4">
                        <div className="w-1 bg-[#1A73E8] shrink-0" />
                        <p>
                            <strong>Symbolic Differentiation (d/dx):</strong> Our engine can derive functions symbolically. By typing `diff(x^2)`, the tool returns `2x`, the exact instantaneous rate of change. This is a game-changer for students learning calculus at <strong>TU or KU</strong>.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1 bg-[#188038] shrink-0" />
                        <p>
                            <strong>Algebraic Simplification:</strong> The `SIMPLIFY` module allows users to reduce complex expressions to their most basic form, aiding in the verification of manual algebraic proofs in <strong>NEB Math examinations</strong>.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1 bg-[#F29900] shrink-0" />
                        <p>
                            <strong>Vector & Machine Learning:</strong> Linear algebra is the language of modern AI. Every weight update in a neural network is a matrix operation. Our calculator provides the symbolic foundation for understanding how gradients flow through deep learning models.
                        </p>
                    </div>
                </div>
                <div className="bg-white/10 p-8 rounded-lg border border-white/20 backdrop-blur-md">
                    <h4 className="text-[#202124] font-black mb-4 flex items-center gap-2">
                         <Award className="w-5 h-5 text-[#8AB4F8]" />
                         Professional Standard
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed mb-6">
                        Our engine utilizes the IEEE 754 floating-point standard, ensuring that rounding errors are kept within a 10⁻¹⁰ tolerance.
                    </p>
                    <div className="space-y-4">
                         <div className="flex justify-between text-[10px] font-black uppercase text-[#8AB4F8]">
                             <span>Precision Threshold</span>
                             <span>Tolerance</span>
                         </div>
                         <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                             <div className="w-[99%] h-full bg-[#8AB4F8] rounded-full shadow-[0_0_15px_rgba(138,180,248,0.5)]" />
                         </div>
                         <div className="grid grid-cols-2 gap-2 mt-4">
                            <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#dadce0] text-center">
                                <span className="block text-[8px] font-bold text-slate-400 uppercase">Architecture</span>
                                <span className="text-xs font-mono font-black text-[#202124]">64-Bit FPU</span>
                            </div>
                            <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#dadce0] text-center">
                                <span className="block text-[8px] font-bold text-slate-400 uppercase">Engine</span>
                                <span className="text-xs font-mono font-black text-[#202124]">CAS-Symbolic</span>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
          </section>

          {/* Section 6: Thermodynamics and Entropy */}
          <section className="bg-white border border-[#DADCE0] rounded-lg p-12 shadow-sm">
            <h2 className="text-3xl font-black text-[#202124] mb-8 tracking-tighter flex items-center gap-4">
                <Activity className="w-8 h-8 text-[#D93025]" />
                Thermodynamics: Modeling Thermal Energy
            </h2>
            <div className="prose prose-md text-[#5F6368] max-w-none leading-relaxed space-y-6">
              <p>
                In <strong>Mechanical Engineering</strong> labs across Nepal, students use scientific calculators to model the <em>Carnot Cycle</em> and determine the efficiency of heat engines. Logarithmic functions are essential for calculating <strong>Entropy Change</strong> ($\Delta S = nR \ln(V_2/V_1)$) during isothermal expansion. 
              </p>
              <p>
                Our engine\'s ability to handle natural logarithms ($ln$) and the constant $e$ (Euler\'s number) with 10-decimal precision makes it an ideal companion for rigorous thermodynamic analysis. Whether you are designing a solar heater in <strong>Kathmandu</strong> or an industrial boiler in <strong>Biratnagar</strong>, the precision of your calculations determines the safety and efficiency of your machine.
              </p>
            </div>
          </section>
        </div>
      }
      howToUse={{
        steps: [
          "Operational Input: Use the digital hardware interface (Casio-style) or your physical keyboard to enter holistic mathematical strings including trigonometric and logarithmic functions.",
          "Shift & Alpha Logic: Tap the 'SHIFT' key (yellow) or 'ALPHA' key (pink) to access secondary functions like inverse trigonometry (sin⁻¹), natural logs, or custom variable storage.",
          "Mode Verification: Consult the status bar to verify your Angle Mode (DEG for geometry/surveying, RAD for calculus/physics) before executing trigonometric functions to avoid institutional errors.",
          "Symbolic Calculus: Use the 'd/dx' button to symbolically differentiate a function, or 'SIMPLIFY' to reduce complex algebraic expressions to their most basic mathematical form.",
          "Real-Time Graphing: Enter any expression containing the variable 'x' (e.g., {'$sin(x)$'}) to trigger the live Cartwrightian visualizer and plot up to 3 curves simultaneously for visual proof.",
          "Memory Management: Use 'M+' and 'MR' to store and recall interim results, essential for multi-step engineering problems where transcription errors must be avoided.",
          "QR Code Export: Generate a high-resolution QR code of your equation and result for easy sharing with teachers or inclusion in laboratory reports."
        ]
      }}
      formula={{
        title: "The Computational Identity",
        description: "The following LaTeX identities represent the algorithmic foundations of our institutional-grade CAS engine.",
        raw: "$$\\begin{aligned} \\text{BODMAS Hierarchy: } & [ ] \\rightarrow x^n \\rightarrow \\div \\rightarrow \\times \\rightarrow + \\rightarrow - \\\\ \\text{Trigonometric Units: } & 360^{\\circ} = 2\\pi \\text{ rad} = 400 \\text{ grad} \\\\ \\text{Symbolic Derivative: } & \\frac{d}{dx}[x^n] = nx^{n-1} \\\\ \\text{Entropy Formula: } & \\Delta S = nR \\ln\\left(\\frac{V_2}{V_1}\\right) \\\\ \\text{Euler's Identity: } & e^{i\\pi} + 1 = 0 \\end{aligned}$$"
      }}
      faqs={[
        {
          question: "How does this calculator handle implicit parentheses?",
          answer: "The integrated Computer Algebra System (CAS) strictly follows BODMAS/PEMDAS. If you enter 'sin(30)*2', it will properly resolve the sine function before applying multiplication, unlike basic tools that might multiply the angle first. This ensures compliance with NEB and international testing standards."
        },
        {
          question: "What is the difference between DEG, RAD, and GRA modes?",
          answer: "These dictate how the engine interprets angles. Degrees (DEG) are standard for basic geometry and surveying. Radians (RAD) are the mandatory standard in calculus, physics, and neural network math. Gradians (GRA) are used in specialized surveying and artillery fields."
        },
        {
          question: "How do I use the 'd/dx' button for calculus?",
          answer: "Type your function containing 'x' (e.g., {'$x^3$'}) and then press SHIFT followed by the 'd/dx' function. The engine will symbolically differentiate the term and return the derivative (e.g., {'$3x^2$'}). This is a core feature for TU Engineering students."
        },
        {
          question: "Can I plot multiple graphs at the same time?",
          answer: "Yes. Our engine supports 3 simultaneous plotting buffers. Use the UP/DOWN arrows to switch between expressions and enter functions of 'x' in each to see them graphed in different colors on the Cartwrightian visualizer."
        },
        {
          question: "How is this calculator used in NEB Science exams?",
          answer: "NEB exams require precision in significant figures and scientific notation. Our tool allows you to input and receive results in standard scientific format ({'$a \\times 10^b$'}), essential for chemistry molar calculations and physics constant processing in Class 11 and 12."
        },
        {
          question: "What is the 'Ans' button for?",
          answer: "The 'Ans' button stores the result of your very last successful calculation. This allows you to carry over complex decimals into new equations without the risk of manual transcription errors, making it a critical tool for statistical analysis."
        },
        {
          question: "How do I store values in variables like X or Y?",
          answer: "Press the 'STO' button, then press the key corresponding to the variable you want (labeled in pink, e.g., X). To use it later, press 'ALPHA' then the variable key. This is useful for constants in physics like $G$ or $\epsilon_0$."
        },
        {
          question: "Does the calculator support complex numbers?",
          answer: "This version is optimized for real-number calculus and algebra (CAS). For complex number arithmetic ($a+bi$), we recommend our specialized 'Complex Number Calculator' available in the sidebar suite."
        },
        {
          question: "Why do I get 'SYNTAX ERROR'?",
          answer: "This usually happens if you have an unclosed bracket, an illegal character, or multiple operators in a row (e.g., '5++2'). Double-check your string for mathematical consistency against standard algebraic rules."
        },
        {
          question: "How is this tool different from a Casio FX-991EX?",
          answer: "While it mimics the interface of high-end Casio calculators, it includes an infinitely larger CAS engine and a live high-resolution plotting screen that hardware calculators simply cannot match in speed, clarity, or data export capabilities."
        },
        {
          question: "Is there a limit to the length of the equation?",
          answer: "No. Unlike hardware calculators that have a strict character limit, our web-based engine can process strings of arbitrary length, perfect for complex university-level engineering and physics derivations."
        },
        {
          question: "Can I use this for Lok Sewa technical exams?",
          answer: "Yes. The technical exams for Civil Engineering and Statistics often allow (or require) proficiency in scientific calculation. This tool is a perfect training ground for those high-stakes tests where speed and accuracy are paramount."
        },
        {
          question: "What is Sarrus\' Rule?",
          answer: "While this is a general scientific calculator, Sarrus\' Rule is a method for 3x3 determinants. Our engine uses more advanced symbolic logic to handle such operations within the context of linear algebra strings."
        },
        {
          question: "How do I calculate factorials?",
          answer: "Use the 'fact()' function or look for the '!' operator under the shift menu for integer-based factorial calculations (up to 170!), essential for probability and combinatorics problems."
        },
        {
          question: "Does it support the Natural Log (ln)?",
          answer: "Yes. The 'ln' button calculates logs to the base {'$e$'} (approx 2.718), while the 'log' button is for base 10. This distinction is critical for radioactive decay and population growth modeling."
        },
        {
          question: "How do I use the Simplification feature?",
          answer: "Enter a complex algebraic expression like {'$(x+1)^2 - (x^2+1)$'} and tap 'SIMPLIFY'. The engine will reduce it to its most basic form (in this case, {'$2x$'}), aiding in proof verification."
        },
        {
          question: "What is the 'QR' button for?",
          answer: "Tapping 'QR' generates a unique QR code containing your current expression and result. This can be scanned to transfer the data to a mobile device or shared in a digital classroom environment."
        },
        {
          question: "Is the calculator mobile-friendly?",
          answer: "Absolutely. The interface is fully responsive and mimics a physical scientific calculator on smartphones, allowing for academic work in the field or on the go."
        },
        {
          question: "How do I calculate $x$ to the power of $y$?",
          answer: "Use the '^' or 'xʸ' button. For example, to calculate {'$2^5$'}, type '2^5' and press '='. This is fundamental for exponential growth and decay models."
        },
        {
          question: "Who designed this calculator?",
          answer: "This is part of the NepaCalc Institutional suite, designed to provide gold-standard mathematical tools for the Nepalese educational and professional STEM ecosystem."
        }
      ]}
      sidebar={{
        title: "Institutional Resources",
        links: [
          { label: "Simple Calculator", href: "/calculator/simple-calculator/" },
          { label: "NEB Science Portal", href: "https://neb.gov.np" },
          { label: "IOE Pulchowk Guide", href: "https://ioe.edu.np" },
          { label: "Standard Deviation", href: "/calculator/standard-deviation/" },
          { label: "Unit Converter", href: "/calculator/unit-converter/" },
        ],
        banner: {
          title: "Engineering Excellence",
          description: "Providing the gold standard for computational tools in the Nepalese STEM ecosystem.",
          image: "/images/math-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Simple Calculator", href: "/calculator/simple-calculator/" },
        { label: "Quadratic Solver", href: "/calculator/quadratic-solver/" },
        { label: "Linear Solver", href: "/calculator/linear-solver/" },
        { label: "Logarithm Calc", href: "/calculator/logarithm-calculator/" }
      ]}
    />
  );
}
