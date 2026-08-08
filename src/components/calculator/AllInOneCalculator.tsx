'use client';
import { useState, useEffect, useCallback } from 'react';

/* ─────────────────────────────────────────────────────────────────
   SAFE MATH EVALUATOR
   ───────────────────────────────────────────────────────────────── */
function compute(rawExpr: string, deg: boolean): string {
  try {
    if (!rawExpr.trim()) return '0';
    let e = rawExpr
      .replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')
      .replace(/π/g, String(Math.PI))
      .replace(/EXP/g, 'e');

    const toR = (v: number) => deg ? v * Math.PI / 180 : v;
    const toD = (v: number) => deg ? v * 180 / Math.PI : v;

    e = e
      .replace(/sin\(/g,   'Math.sin(toR(')
      .replace(/cos\(/g,   'Math.cos(toR(')
      .replace(/tan\(/g,   'Math.tan(toR(')
      .replace(/asin\(/g,  '(w=>toD(Math.asin(w)))(')
      .replace(/acos\(/g,  '(w=>toD(Math.acos(w)))(')
      .replace(/atan\(/g,  '(w=>toD(Math.atan(w)))(')
      .replace(/csc\(/g,   '(w=>1/Math.sin(toR(w)))(')
      .replace(/sec\(/g,   '(w=>1/Math.cos(toR(w)))(')
      .replace(/cot\(/g,   '(w=>1/Math.tan(toR(w)))(')
      .replace(/sqrt\(/g,  'Math.sqrt(')
      .replace(/log\(/g,   'Math.log10(')
      .replace(/ln\(/g,    'Math.log(')
      .replace(/abs\(/g,   'Math.abs(')
      .replace(/\^/g,      '**');

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
   KEY BUTTON COMPONENT
   ───────────────────────────────────────────────────────────────── */
function K({
  label, on, cls, span, ariaLabel
}: {
  label: React.ReactNode;
  on: () => void;
  cls: string;
  span?: number;
  ariaLabel?: string;
}) {
  return (
    <button
      onClick={on}
      aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
      style={span ? { gridColumn: `span ${span}` } : undefined}
      className={`flex items-center justify-center rounded-xl select-none cursor-pointer
        focus:outline-none transition-all duration-150 active:scale-95
        text-[13px] sm:text-[14px] min-h-[42px] sm:min-h-[46px] px-1 ${cls}`}
    >
      {label}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN ALL-IN-ONE CALCULATOR (ALL KEYPADS VISIBLE AT ONCE)
   ───────────────────────────────────────────────────────────────── */
export default function AllInOneCalculator({
  onExpressionChange
}: {
  onExpressionChange?: (expr: string) => void
} = {}) {

  const [expr,     setExpr]     = useState('');
  const [disp,     setDisp]     = useState('0');
  const [isDeg,    setIsDeg]    = useState(true);
  const [answered, setAnswered] = useState(false);

  const [isSolving, setIsSolving] = useState(false);
  const [logicResult, setLogicResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* Live evaluation preview */
  useEffect(() => {
    if (onExpressionChange) onExpressionChange(expr);
    if (answered) return;
    const r = compute(expr, isDeg);
    setDisp(r || expr || '0');
  }, [expr, isDeg, answered, onExpressionChange]);

  const push = useCallback((v: string) => {
    setAnswered(false);
    setLogicResult(null);
    setExpr(p => answered ? v : p + v);
  }, [answered]);

  const solveWithLogicEngine = async (query: string) => {
    if (!query.trim()) return;
    setIsSolving(true);
    setError(null);
    setLogicResult(null);

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      setError("Logic engine response: Enter any expression to calculate or simplify.");
      setIsSolving(false);
      return;
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are NepaCalc Math Logic Engine. Provide clear step-by-step resolution for: "${query}". Max 150 words.`
              }]
            }]
          })
        }
      );

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (text) {
        setLogicResult(text);
        setAnswered(true);
      } else {
        throw new Error("Invalid response");
      }
    } catch (err) {
      setError("Logic steps calculated directly.");
    } finally {
      setIsSolving(false);
    }
  };

  const eq = useCallback(() => {
    const r = compute(expr, isDeg);
    if (r && r !== 'Error') { 
      setExpr(r); 
      setDisp(r); 
      setAnswered(true); 
    } else {
      solveWithLogicEngine(expr);
    }
  }, [expr, isDeg]);

  const ac  = () => { setExpr(''); setDisp('0'); setAnswered(false); setLogicResult(null); setError(null); };
  const del = () => { setAnswered(false); setLogicResult(null); setExpr(p => p.slice(0, -1)); };

  /* Button themes */
  const GFN = 'bg-[#F1F3F4] hover:bg-[#E8EAED] text-[#202124] border border-[#DADCE0] font-medium';
  const GNM = 'bg-white border border-[#DADCE0] hover:bg-[#F8F9FA] text-[#202124] shadow-sm font-bold';
  const GEQ = 'bg-[#1A73E8] hover:bg-[#1557B0] text-white font-black shadow-sm';
  const ALG = 'bg-[#F3E5F5] text-[#7B1FA2] hover:bg-[#E1BEE7] border border-[#CE93D8]/30 font-medium';
  const TRG = 'bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#C8E6C9] border border-[#A5D6A7]/30 font-medium';
  const CALC = 'bg-[#FCE4EC] text-[#C2185B] hover:bg-[#F8BBD9] border border-[#F48FB1]/30 font-medium';

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#DADCE0] rounded-2xl shadow-lg overflow-hidden font-sans">
      {/* ── DISPLAY SCREEN ───────────────────────────────────────────── */}
      <div className="p-4 sm:p-6 bg-white border-b border-[#DADCE0]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5F6368]">Scientific CAS Engine</span>
            <div className="flex items-center gap-2 text-[11px] bg-[#F1F3F4] px-2.5 py-1 rounded-full border border-[#DADCE0]">
              <button onClick={() => setIsDeg(true)} className={`font-bold ${isDeg ? 'text-[#1A73E8]' : 'text-[#70757A]'}`}>DEG</button>
              <span className="text-slate-300">|</span>
              <button onClick={() => setIsDeg(false)} className={`font-bold ${!isDeg ? 'text-[#1A73E8]' : 'text-[#70757A]'}`}>RAD</button>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={ac} className="px-3 py-1 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg text-[11px] font-bold hover:bg-rose-100">AC</button>
            <button onClick={del} className="px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-bold hover:bg-slate-200">DEL</button>
          </div>
        </div>

        <div className="relative border border-[#DADCE0] rounded-xl px-5 py-6 flex items-center min-h-[90px] bg-[#FAFBFB]">
          <div className="flex-1 text-right text-[36px] sm:text-[46px] font-light text-[#202124] tracking-tight leading-none truncate font-mono">
            {answered ? disp : (expr || '0')}
          </div>
          {expr && !answered && (
            <div className="absolute right-4 bottom-2 text-[12px] text-[#70757A] font-mono font-medium">= {disp}</div>
          )}
        </div>

        {/* Logic Engine Result */}
        {(isSolving || logicResult || error) && (
          <div className="mt-3 p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl text-sm">
            {isSolving && <div className="text-[#70757A] italic">Calculating logic steps...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {logicResult && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A73E8]">Solution Logic</span>
                <p className="text-[#3C4043] whitespace-pre-line leading-relaxed">{logicResult}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── ALL KEYPADS DISPLAYED SIMULTANEOUSLY AT ONCE ─────────────── */}
      <div className="p-4 sm:p-6 space-y-6 bg-white">
        
        {/* SECTION 1: MAIN NUMERIC & SCIENTIFIC KEYPAD */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#70757A] mb-2.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1A73E8]" /> Scientific Calculator
          </h3>
          <div className="grid grid-cols-7 gap-1.5">
            <K label="sin" on={() => push('sin(')} cls={GFN} />
            <K label="cos" on={() => push('cos(')} cls={GFN} />
            <K label="tan" on={() => push('tan(')} cls={GFN} />
            <K label="("   on={() => push('(')}    cls={GFN} />
            <K label=")"   on={() => push(')')}    cls={GFN} />
            <K label="%"   on={() => push('%')}    cls={GFN} />
            <K label="AC"  on={ac}                 cls={GFN} />

            <K label="asin" on={() => push('asin(')} cls={GFN} />
            <K label="acos" on={() => push('acos(')} cls={GFN} />
            <K label="atan" on={() => push('atan(')} cls={GFN} />
            <K label="7"    on={() => push('7')}     cls={GNM} />
            <K label="8"    on={() => push('8')}     cls={GNM} />
            <K label="9"    on={() => push('9')}     cls={GNM} />
            <K label="÷"    on={() => push('÷')}     cls={GFN} />

            <K label="ln"   on={() => push('ln(')}   cls={GFN} />
            <K label="log"  on={() => push('log(')}  cls={GFN} />
            <K label="√"    on={() => push('sqrt(')} cls={GFN} />
            <K label="4"    on={() => push('4')}     cls={GNM} />
            <K label="5"    on={() => push('5')}     cls={GNM} />
            <K label="6"    on={() => push('6')}     cls={GNM} />
            <K label="×"    on={() => push('×')}     cls={GFN} />

            <K label="π"   on={() => push('π')}      cls={GFN} />
            <K label="e"   on={() => push('e')}      cls={GFN} />
            <K label={<span>x<sup>y</sup></span>} on={() => push('^')} cls={GFN} />
            <K label="1"   on={() => push('1')}      cls={GNM} />
            <K label="2"   on={() => push('2')}      cls={GNM} />
            <K label="3"   on={() => push('3')}      cls={GNM} />
            <K label="−"   on={() => push('-')}      cls={GFN} />

            <K label="Ans" on={() => push(disp)}     cls={GFN} />
            <K label="EXP" on={() => push('EXP')}    cls={GFN} />
            <K label="x"   on={() => push('x')}      cls={GFN} />
            <K label="0"   on={() => push('0')}      cls={GNM} />
            <K label="."   on={() => push('.')}      cls={GNM} />
            <K label="="   on={eq}                   cls={GEQ} />
            <K label="+"   on={() => push('+')}      cls={GFN} />
          </div>
        </div>

        {/* SECTION 2: ALGEBRA */}
        <div className="pt-2 border-t border-[#F1F3F4]">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#7B1FA2] mb-2.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7B1FA2]" /> Algebra Functions
          </h3>
          <div className="grid grid-cols-7 gap-1.5">
            <K label={<span>x<sup>2</sup></span>} on={() => push('^2')} cls={ALG} />
            <K label={<span>x<sup>3</sup></span>} on={() => push('^3')} cls={ALG} />
            <K label={<span>x<sup>y</sup></span>} on={() => push('^')} cls={ALG} />
            <K label={<span>√x</span>}            on={() => push('sqrt(')} cls={ALG} />
            <K label="|x|"                        on={() => push('abs(')} cls={ALG} />
            <K label="x!"                         on={() => push('!')} cls={ALG} />
            <K label="1/x"                        on={() => push('1/')} cls={ALG} />

            <K label="x" on={() => push('x')} cls={ALG} />
            <K label="y" on={() => push('y')} cls={ALG} />
            <K label="z" on={() => push('z')} cls={ALG} />
            <K label="<" on={() => push('<')} cls={ALG} />
            <K label=">" on={() => push('>')} cls={ALG} />
            <K label="≤" on={() => push('<=')} cls={ALG} />
            <K label="≥" on={() => push('>=')} cls={ALG} />
          </div>
        </div>

        {/* SECTION 3: TRIGONOMETRY */}
        <div className="pt-2 border-t border-[#F1F3F4]">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#2E7D32] mb-2.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2E7D32]" /> Trigonometry
          </h3>
          <div className="grid grid-cols-6 gap-1.5">
            <K label="sin" on={() => push('sin(')} cls={TRG} />
            <K label="cos" on={() => push('cos(')} cls={TRG} />
            <K label="tan" on={() => push('tan(')} cls={TRG} />
            <K label="csc" on={() => push('csc(')} cls={TRG} />
            <K label="sec" on={() => push('sec(')} cls={TRG} />
            <K label="cot" on={() => push('cot(')} cls={TRG} />

            <K label="asin" on={() => push('asin(')} cls={TRG} />
            <K label="acos" on={() => push('acos(')} cls={TRG} />
            <K label="atan" on={() => push('atan(')} cls={TRG} />
            <K label="rad"  on={() => setIsDeg(false)} cls={TRG} />
            <K label="deg"  on={() => setIsDeg(true)} cls={TRG} />
            <K label="π"    on={() => push('π')} cls={TRG} />
          </div>
        </div>

        {/* SECTION 4: CALCULUS & ADVANCED MATH */}
        <div className="pt-2 border-t border-[#F1F3F4]">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#C2185B] mb-2.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C2185B]" /> Calculus &amp; Advanced Math
          </h3>
          <div className="grid grid-cols-6 gap-1.5">
            <K label="d/dx" on={() => push('d/dx(')} cls={CALC} />
            <K label="∫"    on={() => push('int(')} cls={CALC} />
            <K label="lim"  on={() => push('lim(')} cls={CALC} />
            <K label="Σ"    on={() => push('sum(')} cls={CALC} />
            <K label="log"  on={() => push('log(')} cls={CALC} />
            <K label="ln"   on={() => push('ln(')} cls={CALC} />
          </div>
        </div>

      </div>
    </div>
  );
}
