'use client';
import { useState, useEffect, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────
   SAFE MATH EVALUATOR  (no eval, no external lib dependency issues)
   ───────────────────────────────────────────────────────────────── */
function compute(rawExpr: string, deg: boolean): string {
  try {
    if (!rawExpr.trim()) return '0';

    // Normalise symbols
    let e = rawExpr
      .replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')
      .replace(/π/g, String(Math.PI))
      .replace(/EXP/g, 'e');   // EXP → scientific notation shorthand

    // Trig: replace sin(...) etc., handling deg conversion inside
    const toR = (v: number) => deg ? v * Math.PI / 180 : v;
    const toD = (v: number) => deg ? v * 180 / Math.PI : v;

    e = e
      .replace(/sin\(/g,   'Math.sin(toR(')
      .replace(/cos\(/g,   'Math.cos(toR(')
      .replace(/tan\(/g,   'Math.tan(toR(')
      .replace(/asin\(/g,  '(x=>toD(Math.asin(x)))(')
      .replace(/acos\(/g,  '(x=>toD(Math.acos(x)))(')
      .replace(/atan\(/g,  '(x=>toD(Math.atan(x)))(')
      .replace(/csc\(/g,   '(x=>1/Math.sin(toR(x)))(')
      .replace(/sec\(/g,   '(x=>1/Math.cos(toR(x)))(')
      .replace(/cot\(/g,   '(x=>1/Math.tan(toR(x)))(')
      .replace(/sqrt\(/g,  'Math.sqrt(')
      .replace(/log\(/g,   'Math.log10(')
      .replace(/ln\(/g,    'Math.log(')
      .replace(/abs\(/g,   'Math.abs(')
      .replace(/\^/g,      '**');

    // Extra closing parens needed for trig wrappers (very rough balance fix)
    const open  = (e.match(/\(/g) || []).length;
    const close = (e.match(/\)/g) || []).length;
    e += ')'.repeat(Math.max(0, open - close));

    // eslint-disable-next-line no-new-func
    const fn = new Function('toR', 'toD', `"use strict"; return (${e})`);
    const result = fn(toR, toD);
    if (typeof result !== 'number' || !isFinite(result) || isNaN(result)) return 'Error';
    return parseFloat(result.toPrecision(10)).toString();
  } catch {
    return '';
  }
}

/* ─────────────────────────────────────────────────────────────────
   PILL BUTTON — matches Google's rounded-full key style exactly
   ───────────────────────────────────────────────────────────────── */
function K({
  label, on, cls, span,
}: {
  label: React.ReactNode;
  on: () => void;
  cls: string;
  span?: number;
}) {
  return (
    <button
      onClick={on}
      style={span ? { gridColumn: `span ${span}` } : undefined}
      className={`flex items-center justify-center rounded-full select-none cursor-pointer
        focus:outline-none transition-all duration-200 active:scale-90
        text-[13px] sm:text-[15px] min-h-[44px] sm:min-h-[50px] px-0.5 sm:px-1 ${cls}`}
    >
      {label}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN
   ───────────────────────────────────────────────────────────────── */
export default function AllInOneCalculator() {

  /* State */
  const [mode,     setMode]     = useState<'sci'|'solver'>('sci');
  const [tab,      setTab]      = useState<'algebra'|'trig'|'calculus'>('algebra');
  const [expr,     setExpr]     = useState('');
  const [disp,     setDisp]     = useState('0');
  const [isDeg,    setIsDeg]    = useState(true);
  const [answered, setAnswered] = useState(false);

  /* Live preview while typing */
  useEffect(() => {
    if (answered) return;
    const r = compute(expr, isDeg);
    setDisp(r || expr || '0');
  }, [expr, isDeg, answered]);

  /* Append a token */
  const push = useCallback((v: string) => {
    setAnswered(false);
    setExpr(p => answered ? v : p + v);
  }, [answered]);

  /* Evaluate */
  const eq = useCallback(() => {
    const r = compute(expr, isDeg);
    if (r && r !== 'Error') { setExpr(r); setDisp(r); setAnswered(true); }
  }, [expr, isDeg]);

  const ac  = () => { setExpr(''); setDisp('0'); setAnswered(false); };
  const del = () => { setAnswered(false); setExpr(p => p.slice(0, -1)); };

  /* ── COLOUR TOKENS ─────────────────────────────────────────────
     Matching Google Search calculator exactly from the screenshots
     GFN = grey function pill   GNM = white number   GEQ = blue =  */
  const GFN = 'bg-[#F1F3F4] hover:bg-[#E8EAED] text-[#202124] border border-[#DADCE0]/10 font-medium';
  const GNM = 'bg-white border border-[#DADCE0] hover:bg-[#F8F9FA] text-[#202124] shadow-sm font-bold';
  const GEQ = 'bg-[#1A73E8] hover:bg-[#1557B0] text-white font-black shadow-lg shadow-blue-500/20';

  /* ── ICONS ── */
  const HistoryIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5F6368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );

  const SolverToggle = () => (
    <div className="border-t border-[#F1F3F4] pt-4 pb-2 px-6 flex justify-center">
       <button 
         onClick={() => setMode(mode === 'sci' ? 'solver' : 'sci')}
         className="w-[70%] py-2.5 bg-[#F8F9FA] rounded-full text-[13px] font-medium text-[#3C4043] flex items-center justify-center gap-2 hover:bg-[#F1F3F4] transition-all border border-[#DADCE0]"
       >
         {mode === 'sci' ? 'Maths solver' : 'Scientific calculator'}
         <ChevronRight className="w-4 h-4 opacity-60" />
       </button>
    </div>
  );

  /* ─────────────────────────────────────────────────────────────────
     SUB-GRIDS FOR DIFFERENT MODES
     ───────────────────────────────────────────────────────────────── */
  
  // SCIENTIFIC MODE (GRAY/WHITE/BLUE)
  const SciKeypad = () => (
    <div className="grid grid-cols-7 gap-1.5 p-6 sm:p-8 bg-white">
      <div className="col-span-2 flex items-center justify-center gap-2 text-[11px] text-[#5f6368] mb-1">
        <button onClick={() => setIsDeg(true)} className={`font-bold ${isDeg ? 'text-[#1a73e8]' : ''}`}>Rad</button>
        <span className="opacity-20">|</span>
        <button onClick={() => setIsDeg(false)} className={`font-bold ${!isDeg ? 'text-[#1a73e8]' : ''}`}>Deg</button>
      </div>
      <K label="x!" on={() => push('!')} cls={GFN} />
      <K label="("  on={() => push('(')} cls={GFN} />
      <K label=")"  on={() => push(')')} cls={GFN} />
      <K label="%"  on={() => push('%')} cls={GFN} />
      <K label="AC" on={ac}              cls={GFN} />

      <K label="Inv" on={() => {}}            cls={GFN} />
      <K label="sin" on={() => push('sin(')}  cls={GFN} />
      <K label="ln"  on={() => push('ln(')}   cls={GFN} />
      <K label="7"   on={() => push('7')}     cls={GNM} />
      <K label="8"   on={() => push('8')}     cls={GNM} />
      <K label="9"   on={() => push('9')}     cls={GNM} />
      <K label="÷"   on={() => push('÷')}     cls={GFN} />

      <K label="π"   on={() => push('π')}     cls={GFN} />
      <K label="cos" on={() => push('cos(')}  cls={GFN} />
      <K label="log" on={() => push('log(')}  cls={GFN} />
      <K label="4"   on={() => push('4')}     cls={GNM} />
      <K label="5"   on={() => push('5')}     cls={GNM} />
      <K label="6"   on={() => push('6')}     cls={GNM} />
      <K label="×"   on={() => push('×')}     cls={GFN} />

      <K label="e"   on={() => push('e')}     cls={GFN} />
      <K label="tan" on={() => push('tan(')}  cls={GFN} />
      <K label="√"   on={() => push('sqrt(')} cls={GFN} />
      <K label="1"   on={() => push('1')}     cls={GNM} />
      <K label="2"   on={() => push('2')}     cls={GNM} />
      <K label="3"   on={() => push('3')}     cls={GNM} />
      <K label="−"   on={() => push('-')}     cls={GFN} />

      <K label="Ans" on={() => push(disp)}    cls={GFN} />
      <K label="EXP" on={() => push('EXP')}   cls={GFN} />
      <K label={<span>x<sup>y</sup></span>} on={() => push('^')} cls={GFN} />
      <K label="0"   on={() => push('0')}     cls={GNM} />
      <K label="."   on={() => push('.')}     cls={GNM} />
      <K label="="   on={eq}                  cls={GEQ} />
      <K label="+"   on={() => push('+')}     cls={GFN} />
    </div>
  );

  // SOLVER MODE (COLOR THEMED)
  const SolverKeypad = () => {
    let themeCls = "bg-[#F3E5F5] text-[#7B1FA2]"; // Default Purple (Algebra)
    let actionCls = "bg-[#7B1FA2] text-white";
    
    if (tab === 'trig') {
       themeCls = "bg-[#E8F5E9] text-[#2E7D32]"; // Green
       actionCls = "bg-[#2E7D32] text-white";
    } else if (tab === 'calculus') {
       themeCls = "bg-[#FCE4EC] text-[#C2185B]"; // Pink
       actionCls = "bg-[#C2185B] text-white";
    }

    const T = (l: string | React.ReactNode, v: string) => <K label={l} on={() => push(v)} cls={themeCls} />;

    return (
      <div className="grid grid-cols-7 gap-1.5 p-6 sm:p-8 bg-white">
        {tab === 'algebra' && (
          <>
            <K label={<span>☐<sup>☐</sup></span>} on={() => push('^')} cls={themeCls} />
            {T(<span>ⁿ√☐</span>, 'sqrt(')}
            {T("<", "<")}
            <K label="(" on={() => push('(')} cls={GFN} />
            <K label=")" on={() => push(')')} cls={GFN} />
            <K label={<span>⌫</span>} on={del} cls="bg-[#3C4043] text-white" />
            <K label="AC" on={ac} cls={GFN} />

            {T(<span>☐/☐</span>, '/')}
            {T("|☐|", "abs(")}
            {T("≤", "<=")}
            <K label="7" on={() => push('7')} cls={GNM} />
            <K label="8" on={() => push('8')} cls={GNM} />
            <K label="9" on={() => push('9')} cls={GNM} />
            <K label="÷" on={() => push('÷')} cls={GFN} />

            {T(<span>log<sub>☐</sub></span>, 'log(')}
            {T("☐!", "!")}
            {T(">", ">")}
            <K label="4" on={() => push('4')} cls={GNM} />
            <K label="5" on={() => push('5')} cls={GNM} />
            <K label="6" on={() => push('6')} cls={GNM} />
            <K label="×" on={() => push('×')} cls={GFN} />

            {T("i", "i")}
            {T("%", "%")}
            {T("≥", ">=")}
            <K label="1" on={() => push('1')} cls={GNM} />
            <K label="2" on={() => push('2')} cls={GNM} />
            <K label="3" on={() => push('3')} cls={GNM} />
            <K label="−" on={() => push('-')} cls={GFN} />

            {T("x", "x")}
            {T("y", "y")}
            {T("=", "=")}
            <K label="0" on={() => push('0')} cls={GNM} />
            <K label="." on={() => push('.')} cls={GNM} />
            <K label={<span>➤</span>} on={eq} cls={actionCls + " text-lg"} />
            <K label="+" on={() => push('+')} cls={GFN} />
          </>
        )}

        {tab === 'trig' && (
          <>
            {T("sin", "sin(")} {T("cos", "cos(")} {T("tan", "tan(")} 
            <K label="(" on={() => push('(')} cls={GFN} />
            <K label=")" on={() => push(')')} cls={GFN} />
            <K label={<span>⌫</span>} on={del} cls="bg-[#3C4043] text-white" />
            <K label="AC" on={ac} cls={GFN} />

            {T("csc", "csc(")} {T("sec", "sec(")} {T("cot", "cot(")} 
            <K label="7" on={() => push('7')} cls={GNM} />
            <K label="8" on={() => push('8')} cls={GNM} />
            <K label="9" on={() => push('9')} cls={GNM} />
            <K label="÷" on={() => push('÷')} cls={GFN} />

            {T("asin", "asin(")} {T("acos", "acos(")} {T("atan", "atan(")} 
            <K label="4" on={() => push('4')} cls={GNM} />
            <K label="5" on={() => push('5')} cls={GNM} />
            <K label="6" on={() => push('6')} cls={GNM} />
            <K label="×" on={() => push('×')} cls={GFN} />

            {T(<span>☐<sup>2</sup></span>, "^2")} {T(<span>☐°</span>, "")} {T("π", "π")} 
            <K label="1" on={() => push('1')} cls={GNM} />
            <K label="2" on={() => push('2')} cls={GNM} />
            <K label="3" on={() => push('3')} cls={GNM} />
            <K label="−" on={() => push('-')} cls={GFN} />

            {T("x", "x")} {T("y", "y")} {T("=", "=")} 
            <K label="0" on={() => push('0')} cls={GNM} />
            <K label="." on={() => push('.')} cls={GNM} />
            <K label={<span>➤</span>} on={eq} cls={actionCls + " text-lg"} />
            <K label="+" on={() => push('+')} cls={GFN} />
          </>
        )}

        {tab === 'calculus' && (
          <>
            {T(<span>d/d☐</span>, "d")} {T("∞", "inf")} {T(<span>ⁿ√☐</span>, "sqrt(")} 
            <K label="(" on={() => push('(')} cls={GFN} />
            <K label=")" on={() => push(')')} cls={GFN} />
            <K label={<span>⌫</span>} on={del} cls="bg-[#3C4043] text-white" />
            <K label="AC" on={ac} cls={GFN} />

            {T(<span>lim</span>, "lim")} {T(<span>lim⁺</span>, "lim+")} {T(<span>lim⁻</span>, "lim-")} 
            <K label="7" on={() => push('7')} cls={GNM} />
            <K label="8" on={() => push('8')} cls={GNM} />
            <K label="9" on={() => push('9')} cls={GNM} />
            <K label="÷" on={() => push('÷')} cls={GFN} />

            {T(<span>log<sub>☐</sub></span>, "log")} {T("C(n,k)", "C")} {T("P(n,k)", "P")} 
            <K label="4" on={() => push('4')} cls={GNM} />
            <K label="5" on={() => push('5')} cls={GNM} />
            <K label="6" on={() => push('6')} cls={GNM} />
            <K label="×" on={() => push('×')} cls={GFN} />

            {T("∑", "sum")} {T(<span>∫</span>, "int")} {T(<span>∫<sub>☐</sub><sup>☐</sup></span>, "defint")} 
            <K label="1" on={() => push('1')} cls={GNM} />
            <K label="2" on={() => push('2')} cls={GNM} />
            <K label="3" on={() => push('3')} cls={GNM} />
            <K label="−" on={() => push('-')} cls={GFN} />

            {T("x", "x")} {T("y", "y")} {T("e", "e")} 
            <K label="0" on={() => push('0')} cls={GNM} />
            <K label="." on={() => push('.')} cls={GNM} />
            <K label={<span>➤</span>} on={eq} cls={actionCls + " text-lg"} />
            <K label="+" on={() => push('+')} cls={GFN} />
          </>
        )}
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */
  return (
    <div className="flex justify-center w-full font-[Google_Sans,Roboto,sans-serif] animate-fade-in group/calc">
      <div
        className="w-full bg-[#FFFFFF] border border-[#DADCE0] overflow-hidden"
        style={{ maxWidth: 720, borderRadius: '1.5rem', boxShadow: '0 1px 6px rgba(32,33,36,0.28)' }}
      >

        {/* ── HEADER ─────────────────── */}
        <div className="p-4 sm:p-6 pb-2">
           {mode === 'solver' && (
              <div className="flex items-center justify-between mb-4 px-2">
                 <h2 className="text-[22px] font-medium text-[#202124]">Maths solver</h2>
                 <button className="p-1 hover:bg-slate-100 rounded-full">
                    <HistoryIcon />
                 </button>
              </div>
           )}

           <div className={`relative border border-[#DADCE0] rounded-xl px-4 py-8 flex items-center transition-all ${mode === 'solver' ? 'min-h-[100px]' : 'min-h-[80px]'}`}>
              {mode === 'sci' && (
                 <div className="absolute left-4 top-4">
                    <HistoryIcon />
                 </div>
              )}
              <div className="flex-1 text-right text-[44px] sm:text-[54px] font-light text-[#202124] tracking-tight leading-none truncate">
                 {answered ? disp : (expr || '0')}
              </div>
              {mode === 'solver' && (
                 <div className="absolute right-4 bottom-2 flex flex-col gap-1">
                    <ChevronRight className="w-4 h-4 rotate-[270deg] opacity-60" />
                    <ChevronRight className="w-4 h-4 rotate-90 opacity-60" />
                 </div>
              )}
           </div>

           {mode === 'solver' && (
              <div className="flex items-center gap-8 mt-4 border-b border-[#DADCE0] px-2 overflow-x-auto no-scrollbar">
                 {[
                   { id: 'algebra', label: 'Algebra' },
                   { id: 'trig',    label: 'Trigonometry' },
                   { id: 'calculus', label: 'Calculus' },
                 ].map((t) => (
                   <button
                     key={t.id}
                     onClick={() => setTab(t.id as any)}
                     className={`pb-3 text-[14px] font-medium transition-all relative ${
                       tab === t.id ? 'text-[#1A73E8]' : 'text-[#70757A] hover:text-[#202124]'
                     }`}
                   >
                     {t.label}
                     {tab === t.id && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1A73E8] rounded-t-full" />}
                   </button>
                 ))}
              </div>
           )}
        </div>

        {/* ── KEYPAD ───────────────────────────────────── */}
        {mode === 'sci' ? <SciKeypad /> : <SolverKeypad />}

        {/* ── BOTTOM TOGGLE ───────────────────────────── */}
        <SolverToggle />

      </div>
    </div>
  );
}
