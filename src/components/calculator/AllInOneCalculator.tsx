'use client';
import { useState, useEffect, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';

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
    e += ')'.repeat(Math.max(0, open, close));

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
   PILL BUTTON ,  Google's rounded-full key style
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
export default function AllInOneCalculator({
  onExpressionChange
}: {
  onExpressionChange?: (expr: string) => void
} = {}) {

  const [mode,     setMode]     = useState<'sci'|'solver'>('sci');
  const [tab,      setTab]      = useState<'algebra'|'trig'|'calculus'>('algebra');
  const [expr,     setExpr]     = useState('');
  const [disp,     setDisp]     = useState('0');
  const [isDeg,    setIsDeg]    = useState(true);
  const [answered, setAnswered] = useState(false);

  const [isSolving, setIsSolving] = useState(false);
  const [logicResult, setLogicResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* Live preview */
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
      setError("Logic Engine is in maintenance. Contact support.");
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
                text: `You are the NepaCalc Logic Engine. Provide expert, clinical step-by-step logic for: "${query}".
                RULES: 1. Plain text only. 2. No brand names (Google, Gemini, etc.). 3. Max 150 words. 4. Professional tone.`
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
      setError("Logical evaluation unavailable.");
    } finally {
      setIsSolving(false);
    }
  };

  const eq = useCallback(() => {
    if (mode === 'solver') {
      solveWithLogicEngine(expr);
      return;
    }
    const r = compute(expr, isDeg);
    if (r && r !== 'Error') { setExpr(r); setDisp(r); setAnswered(true); }
  }, [expr, isDeg, mode]);

  const ac  = () => { setExpr(''); setDisp('0'); setAnswered(false); setLogicResult(null); setError(null); };
  const del = () => { setAnswered(false); setLogicResult(null); setExpr(p => p.slice(0, -1)); };

  /* ── COLOUR TOKENS ──────────────────────────────────────────────
     Matching Google Search calculator exactly
     GFN = grey function pill   GNM = white number   GEQ = blue =   */
  const GFN = 'bg-[#F1F3F4] hover:bg-[#E8EAED] text-[#202124] border border-[#DADCE0]/10 font-medium';
  const GNM = 'bg-white border border-[#DADCE0] hover:bg-[#F8F9FA] text-[#202124] shadow-sm font-bold';
  const GEQ = 'bg-[#1A73E8] hover:bg-[#1557B0] text-white font-black shadow-lg shadow-blue-500/20';

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
     SCIENTIFIC KEYPAD ,  7  columns (Google layout)
     ───────────────────────────────────────────────────────────────── */
  const SciKeypad = () => (
    <div className="grid grid-cols-7 gap-1.5 p-6 sm:p-8 bg-white">
      {/* Deg / Rad toggle */}
      <div className="col-span-2 flex items-center justify-center gap-2 text-[11px] text-[#5f6368] mb-1">
        <button onClick={() => setIsDeg(true)}  className={`font-bold ${isDeg  ? 'text-[#1a73e8]' : ''}`}>Deg</button>
        <span className="opacity-20">|</span>
        <button onClick={() => setIsDeg(false)} className={`font-bold ${!isDeg ? 'text-[#1a73e8]' : ''}`}>Rad</button>
      </div>
      <K label="x!" on={() => push('!')} cls={GFN} />
      <K label="("  on={() => push('(')} cls={GFN} />
      <K label=")"  on={() => push(')')} cls={GFN} />
      <K label="%"  on={() => push('%')} cls={GFN} />
      <K label="AC" on={ac}              cls={GFN} ariaLabel="All Clear" />
      <K label="⌫"  on={del}             cls={GFN} ariaLabel="Backspace" />
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
      <K label={<span>x<sup>y</sup></span>} on={() => push('^')} cls={GFN} ariaLabel="Power of" />
      <K label="0"   on={() => push('0')}     cls={GNM} />
      <K label="."   on={() => push('.')}     cls={GNM} />
      <K label="="   on={eq}                  cls={GEQ} />
      <K label="+"   on={() => push('+')}     cls={GFN} />
    </div>
  );

  /* ─────────────────────────────────────────────────────────────────
     SOLVER KEYPAD ,  3 coloured tabs (Google Maths Solver)
     ───────────────────────────────────────────────────────────────── */
  const SolverKeypad = () => {
    // Tab colour themes exactly matching Google
    let funcCls = 'bg-[#F3E5F5] text-[#7B1FA2] hover:bg-[#E1BEE7] border border-[#CE93D8]/20 font-medium'; // purple ,  algebra
    let actCls  = 'bg-[#7B1FA2] hover:bg-[#6A1B9A] text-white font-black shadow';

    if (tab === 'trig') {
      funcCls = 'bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#C8E6C9] border border-[#A5D6A7]/20 font-medium';
      actCls  = 'bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-black shadow';
    } else if (tab === 'calculus') {
      funcCls = 'bg-[#FCE4EC] text-[#C2185B] hover:bg-[#F8BBD9] border border-[#F48FB1]/20 font-medium';
      actCls  = 'bg-[#C2185B] hover:bg-[#880E4F] text-white font-black shadow';
    }

    const F = (l: React.ReactNode, v: string, a?: string) => <K label={l} on={() => push(v)} cls={funcCls} ariaLabel={a} />;

    return (
      <div className="grid grid-cols-7 gap-1.5 p-6 sm:p-8 bg-white">

        {/* ── ALGEBRA ── */}
        {tab === 'algebra' && (<>
          <K label={<span>□<sup>□</sup></span>} on={() => push('^')}    cls={funcCls} ariaLabel="Power of" />
          {F(<span>ⁿ√□</span>, 'sqrt(', "Square root")}
          {F('<',  '<')}
          <K label="(" on={() => push('(')} cls={GFN} ariaLabel="Open parenthesis" />
          <K label=")" on={() => push(')')} cls={GFN} ariaLabel="Close parenthesis" />
          <K label={<span>⌫</span>} on={del} cls="bg-[#3C4043] text-white hover:bg-[#2C3033] border border-[#3C4043] font-bold" ariaLabel="Backspace" />
          <K label="AC" on={ac} cls={GFN} ariaLabel="All Clear" />

          {F(<span>□/□</span>, '/', "Fraction")}
          {F('|□|', 'abs(')}
          {F('≤', '<=')}
          <K label="7" on={() => push('7')} cls={GNM} />
          <K label="8" on={() => push('8')} cls={GNM} />
          <K label="9" on={() => push('9')} cls={GNM} />
          <K label="÷" on={() => push('÷')} cls={GFN} />

          {F(<span>log<sub>□</sub></span>, 'log(', "Logarithm")}
          {F('□!', '!')}
          {F('>',  '>')}
          <K label="4" on={() => push('4')} cls={GNM} />
          <K label="5" on={() => push('5')} cls={GNM} />
          <K label="6" on={() => push('6')} cls={GNM} />
          <K label="×" on={() => push('×')} cls={GFN} />

          {F('i',  'i')}
          {F('%',  '%')}
          {F('≥', '>=')}
          <K label="1" on={() => push('1')} cls={GNM} />
          <K label="2" on={() => push('2')} cls={GNM} />
          <K label="3" on={() => push('3')} cls={GNM} />
          <K label="−" on={() => push('-')} cls={GFN} />

          {F('x', 'x')}
          {F('y', 'y')}
          {F('=', '=')}
          <K label="0" on={() => push('0')} cls={GNM} />
          <K label="." on={() => push('.')} cls={GNM} />
          <K label={<span>➤</span>} on={eq} cls={actCls + ' text-lg'} />
          <K label="+" on={() => push('+')} cls={GFN} />
        </>)}

        {/* ── TRIGONOMETRY ── */}
        {tab === 'trig' && (<>
          {F('sin', 'sin(')}  {F('cos', 'cos(')}  {F('tan', 'tan(')}
          <K label="(" on={() => push('(')} cls={GFN} ariaLabel="Open parenthesis" />
          <K label=")" on={() => push(')')} cls={GFN} ariaLabel="Close parenthesis" />
          <K label={<span>⌫</span>} on={del} cls="bg-[#3C4043] text-white hover:bg-[#2C3033] border border-[#3C4043] font-bold" ariaLabel="Backspace" />
          <K label="AC" on={ac} cls={GFN} ariaLabel="All Clear" />

          {F('csc', 'csc(')}  {F('sec', 'sec(')}  {F('cot', 'cot(')}
          <K label="7" on={() => push('7')} cls={GNM} />
          <K label="8" on={() => push('8')} cls={GNM} />
          <K label="9" on={() => push('9')} cls={GNM} />
          <K label="÷" on={() => push('÷')} cls={GFN} />

          {F('arcsin', 'asin(')}  {F('arccos', 'acos(')}  {F('arctan', 'atan(')}
          <K label="4" on={() => push('4')} cls={GNM} />
          <K label="5" on={() => push('5')} cls={GNM} />
          <K label="6" on={() => push('6')} cls={GNM} />
          <K label="×" on={() => push('×')} cls={GFN} />

          {F(<span>□<sup>2</sup></span>, '^2')}  {F(<span>□°</span>, '')}  {F('π', 'π')}
          <K label="1" on={() => push('1')} cls={GNM} />
          <K label="2" on={() => push('2')} cls={GNM} />
          <K label="3" on={() => push('3')} cls={GNM} />
          <K label="−" on={() => push('-')} cls={GFN} />

          {F('x', 'x')}  {F('y', 'y')}  {F('=', '=')}
          <K label="0" on={() => push('0')} cls={GNM} />
          <K label="." on={() => push('.')} cls={GNM} />
          <K label={<span>➤</span>} on={eq} cls={actCls + ' text-lg'} />
          <K label="+" on={() => push('+')} cls={GFN} />
        </>)}

        {/* ── CALCULUS ── */}
        {tab === 'calculus' && (<>
          {F(<span>d/d□</span>, 'd')}  {F('∞', 'inf')}  {F(<span>ⁿ√□</span>, 'sqrt(')}
          <K label="(" on={() => push('(')} cls={GFN} ariaLabel="Open parenthesis" />
          <K label=")" on={() => push(')')} cls={GFN} ariaLabel="Close parenthesis" />
          <K label={<span>⌫</span>} on={del} cls="bg-[#3C4043] text-white hover:bg-[#2C3033] border border-[#3C4043] font-bold" ariaLabel="Backspace" />
          <K label="AC" on={ac} cls={GFN} ariaLabel="All Clear" />

          {F(<span>lim<br /><span className="text-[9px]">□→□</span></span>, 'lim')}
          {F(<span>lim<sup>+</sup><br /><span className="text-[9px]">□→□</span></span>, 'lim+')}
          {F(<span>lim<sup>-</sup><br /><span className="text-[9px]">□→□</span></span>, 'lim-')}
          <K label="7" on={() => push('7')} cls={GNM} />
          <K label="8" on={() => push('8')} cls={GNM} />
          <K label="9" on={() => push('9')} cls={GNM} />
          <K label="÷" on={() => push('÷')} cls={GFN} />

          {F(<span>log<sub>□</sub></span>, 'log(')}  {F('C(n,k)', 'C')}  {F('P(n,k)', 'P')}
          <K label="4" on={() => push('4')} cls={GNM} />
          <K label="5" on={() => push('5')} cls={GNM} />
          <K label="6" on={() => push('6')} cls={GNM} />
          <K label="×" on={() => push('×')} cls={GFN} />

          {F('Σ', 'sum')}  {F('∫', 'int')}  {F(<span>∫<sub>□</sub><sup>□</sup></span>, 'defint')}
          <K label="1" on={() => push('1')} cls={GNM} />
          <K label="2" on={() => push('2')} cls={GNM} />
          <K label="3" on={() => push('3')} cls={GNM} />
          <K label="−" on={() => push('-')} cls={GFN} />

          {F('x', 'x')}  {F('y', 'y')}  {F('e', 'e')}
          <K label="0" on={() => push('0')} cls={GNM} />
          <K label="." on={() => push('.')} cls={GNM} />
          <K label={<span>➤</span>} on={eq} cls={actCls + ' text-lg'} />
          <K label="+" on={() => push('+')} cls={GFN} />
        </>)}
      </div>
    );
  };

  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */
  return (
    <div className="flex justify-center w-full font-[Google_Sans,Roboto,sans-serif] animate-fade-in">
      <div
        className="w-full bg-[#FFFFFF] border border-[#DADCE0] overflow-hidden"
        style={{ maxWidth: 720, borderRadius: '1.5rem', boxShadow: '0 1px 6px rgba(32,33,36,0.28)' }}
      >
        {/* ── HEADER ───────────────────────────────────────────── */}
        <div className="p-4 sm:p-6 pb-2">
          {mode === 'solver' && (
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-[22px] font-medium text-[#202124]">Maths solver</h2>
              <button className="p-1 hover:bg-slate-100 rounded-full" aria-label="View history">
                <HistoryIcon />
              </button>
            </div>
          )}

          {/* Display */}
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

          {/* Algebra / Trig / Calculus tabs (solver only) */}
          {mode === 'solver' && (
            <div className="flex items-center gap-8 mt-4 border-b border-[#DADCE0] px-2 overflow-x-auto">
              {([
                { id: 'algebra',  label: 'Algebra' },
                { id: 'trig',     label: 'Trigonometry' },
                { id: 'calculus', label: 'Calculus' },
              ] as const).map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
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

          {/* Logic Engine Result Area */}
          {mode === 'solver' && (isSolving || logicResult || error) && (
            <div className="mt-4 p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
               {isSolving && (
                 <div className="flex items-center gap-3 text-[#70757A] italic text-sm">
                   <div className="w-4 h-4 border-2 border-[#1A73E8] border-t-transparent rounded-full animate-spin" />
                   Evaluating logical steps...
                 </div>
               )}
               {error && <div className="text-red-500 text-sm">{error}</div>}
               {logicResult && !isSolving && (
                 <div className="space-y-3">
                    <div className="text-[11px] font-black uppercase tracking-widest text-[#1A73E8] opacity-70">
                      Step-by-Step Logic
                    </div>
                    <div className="text-[#3C4043] text-[14px] leading-relaxed whitespace-pre-line font-sans">
                      {logicResult}
                    </div>
                 </div>
               )}
            </div>
          )}
        </div>

        {/* ── KEYPAD ─────────────────────────────────────────────── */}
        {mode === 'sci' ? <SciKeypad /> : <SolverKeypad />}

        {/* ── TOGGLE ─────────────────────────────────────────────── */}
        <div className="border-t border-[#F1F3F4] pt-4 pb-2 px-6 flex justify-center">
          <button
            onClick={() => setMode(mode === 'sci' ? 'solver' : 'sci')}
            className="w-[70%] py-2.5 bg-[#F8F9FA] rounded-full text-[13px] font-medium text-[#3C4043] flex items-center justify-center gap-2 hover:bg-[#F1F3F4] transition-all border border-[#DADCE0]"
            aria-label={mode === 'sci' ? "Switch to Maths Solver" : "Switch to Scientific Calculator"}
          >
            {mode === 'sci' ? 'Maths solver' : 'Scientific calculator'}
            <ChevronRight className="w-4 h-4 opacity-60" />
          </button>
        </div>
      </div>
    </div>
  );
}
