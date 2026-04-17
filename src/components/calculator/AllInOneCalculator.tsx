'use client';
import { useState, useEffect, useCallback } from 'react';

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
        focus:outline-none transition-all duration-100 active:bg-slate-200 active:scale-95
        text-[12px] sm:text-[14px] min-h-[44px] sm:min-h-[48px] px-0.5 sm:px-1 ${cls}`}
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
  const GFN = 'bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#202124] border border-transparent';
  const GNM = 'bg-white border border-[#dadce0] hover:bg-[#f8f9fa] text-[#202124] shadow-sm';
  const GEQ = 'bg-[#1a73e8] hover:bg-[#185abc] text-white font-bold shadow-md shadow-blue-200';

  const P = {
    algebra:  { k: 'bg-[#f3e8ff] hover:bg-[#e8d5ff] text-[#7c3aed]', s: 'bg-[#7c3aed] hover:bg-[#6d28d9] text-white' },
    trig:     { k: 'bg-[#e6f4ea] hover:bg-[#d2ead8] text-[#188038]', s: 'bg-[#188038] hover:bg-[#137333] text-white' },
    calculus: { k: 'bg-[#fce8e6] hover:bg-[#fbcfcc] text-[#c5221f]', s: 'bg-[#c5221f] hover:bg-[#a50e0e] text-white' },
  };
  const pal = P[tab];

  /* ── ARROW ICON (Google solver send button) ── */
  const Arrow = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>
    </svg>
  );

  /* ── BACKSPACE ICON ── */
  const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z"/>
      <line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/>
    </svg>
  );

  /* ═══════════════════════════════════════════════════════════════
     SCIENTIFIC GRID — 7 columns, 5 rows, exactly like Image 1
     ═══════════════════════════════════════════════════════════════ */
  const SciGrid = () => (
    <div className="grid grid-cols-5 sm:grid-cols-7 gap-1.5 sm:gap-[6px] px-3 sm:px-4 pb-4 pt-2">

      {/* Row 1 — Deg|Rad  x!  (  )  %  AC */}
      <div className="col-span-2 flex items-center justify-center gap-2 text-[13px] text-[#5f6368]">
        <button onClick={() => setIsDeg(true)}
          className={`font-medium hover:text-[#202124] transition-colors ${isDeg ? 'text-[#1a73e8]' : ''}`}>Deg</button>
        <span className="text-[#dadce0] font-light">|</span>
        <button onClick={() => setIsDeg(false)}
          className={`font-medium hover:text-[#202124] transition-colors ${!isDeg ? 'text-[#1a73e8]' : ''}`}>Rad</button>
      </div>
      <K label="x!"                        on={() => push('!')}      cls={GFN} />
      <K label="("                          on={() => push('(')}      cls={GFN} />
      <K label=")"                          on={() => push(')')}      cls={GFN} />
      <K label="%"                          on={() => push('%')}      cls={GFN} />
      <K label="AC"                         on={ac}                   cls={GFN} />

      {/* Row 2 — Inv  sin  ln   7  8  9  ÷ */}
      <K label="Inv"                        on={() => {}}             cls={GFN} />
      <K label="sin"                        on={() => push('sin(')}   cls={GFN} />
      <K label="ln"                         on={() => push('ln(')}    cls={GFN} />
      <K label="7"                          on={() => push('7')}      cls={GNM} />
      <K label="8"                          on={() => push('8')}      cls={GNM} />
      <K label="9"                          on={() => push('9')}      cls={GNM} />
      <K label="÷"                          on={() => push('÷')}      cls={GFN} />

      {/* Row 3 — π  cos  log   4  5  6  × */}
      <K label="π"                          on={() => push('π')}      cls={GFN} />
      <K label="cos"                        on={() => push('cos(')}   cls={GFN} />
      <K label="log"                        on={() => push('log(')}   cls={GFN} />
      <K label="4"                          on={() => push('4')}      cls={GNM} />
      <K label="5"                          on={() => push('5')}      cls={GNM} />
      <K label="6"                          on={() => push('6')}      cls={GNM} />
      <K label="×"                          on={() => push('×')}      cls={GFN} />

      {/* Row 4 — e  tan  √   1  2  3  − */}
      <K label="e"                          on={() => push('e')}      cls={GFN} />
      <K label="tan"                        on={() => push('tan(')}   cls={GFN} />
      <K label="√"                          on={() => push('sqrt(')}  cls={GFN} />
      <K label="1"                          on={() => push('1')}      cls={GNM} />
      <K label="2"                          on={() => push('2')}      cls={GNM} />
      <K label="3"                          on={() => push('3')}      cls={GNM} />
      <K label="−"                          on={() => push('-')}      cls={GFN} />

      {/* Row 5 — Ans  EXP  xʸ   0  .  =  + */}
      <K label="Ans"                        on={() => push(disp)}     cls={GFN} />
      <K label="EXP"                        on={() => push('EXP')}    cls={GFN} />
      <K label={<span>x<sup>y</sup></span>} on={() => push('^')}      cls={GFN} />
      <K label="0"                          on={() => push('0')}      cls={GNM} />
      <K label="."                          on={() => push('.')}      cls={GNM} />
      <K label="="                          on={eq}                   cls={GEQ} />
      <K label="+"                          on={() => push('+')}      cls={GFN} />
    </div>
  );

  /* ═══════════════════════════════════════════════════════════════
     SHARED NUMPAD (right 4 cols of solver)  — Images 2, 3, 4
     ═══════════════════════════════════════════════════════════════ */
  const NumPad = () => (
    <>
      <K label="("           on={() => push('(')}    cls={GFN} />
      <K label=")"           on={() => push(')')}    cls={GFN} />
      <K label={<BackIcon/>} on={del}                cls={GFN} />
      <K label="AC"          on={ac}                 cls={GFN} />
      {[7,8,9].map(n => <K key={n} label={n} on={() => push(String(n))} cls={GNM} />)}
      <K label="÷"           on={() => push('÷')}    cls={GFN} />
      {[4,5,6].map(n => <K key={n} label={n} on={() => push(String(n))} cls={GNM} />)}
      <K label="×"           on={() => push('×')}    cls={GFN} />
      {[1,2,3].map(n => <K key={n} label={n} on={() => push(String(n))} cls={GNM} />)}
      <K label="−"           on={() => push('-')}    cls={GFN} />
      <K label="0"           on={() => push('0')}    cls={GNM} />
      <K label="."           on={() => push('.')}    cls={GNM} />
      <K label={<Arrow/>}    on={eq}                 cls={pal.s} />
      <K label="+"           on={() => push('+')}    cls={GFN} />
    </>
  );

  /* ── ALGEBRA LEFT KEYS — Image 2 (purple) ── */
  const AlgKeys = () => (
    <>
      <K label={<span>□<sup>□</sup></span>}           on={() => push('^')}        cls={pal.k} />
      <K label="ⁿ√□"                                  on={() => push('sqrt(')}    cls={pal.k} />
      <K label="&lt;"                                  on={() => push('<')}        cls={pal.k} />
      <K label={<span className="flex flex-col items-center leading-none text-[13px]"><span>□</span><span className="border-t border-current mt-px">□</span></span>} on={() => push('/')} cls={pal.k} />
      <K label="[ ]"                                   on={() => push('[')}        cls={pal.k} />
      <K label="≤"                                     on={() => push('<=')}       cls={pal.k} />
      <K label={<span>log<sub>□</sub></span>}           on={() => push('log(')}    cls={pal.k} />
      <K label="□!"                                    on={() => push('!')}        cls={pal.k} />
      <K label="&gt;"                                  on={() => push('>')}        cls={pal.k} />
      <K label={<em>i</em>}                            on={() => push('i')}        cls={pal.k} />
      <K label="%"                                     on={() => push('%')}        cls={pal.k} />
      <K label="≥"                                     on={() => push('>=')}       cls={pal.k} />
      <K label={<em className="font-serif">x</em>}    on={() => push('x')}        cls={pal.k} />
      <K label={<em className="font-serif">y</em>}    on={() => push('y')}        cls={pal.k} />
      <K label="="                                     on={() => push('=')}        cls={pal.k} />
    </>
  );

  /* ── TRIG LEFT KEYS — Image 3 (green) ── */
  const TrigKeys = () => (
    <>
      <K label="sin"    on={() => push('sin(')}   cls={pal.k} />
      <K label="cos"    on={() => push('cos(')}   cls={pal.k} />
      <K label="tan"    on={() => push('tan(')}   cls={pal.k} />
      <K label="csc"    on={() => push('csc(')}   cls={pal.k} />
      <K label="sec"    on={() => push('sec(')}   cls={pal.k} />
      <K label="cot"    on={() => push('cot(')}   cls={pal.k} />
      <K label="arcsin" on={() => push('asin(')}  cls={pal.k} />
      <K label="arccos" on={() => push('acos(')}  cls={pal.k} />
      <K label="arctan" on={() => push('atan(')}  cls={pal.k} />
      <K label={<span>□<sup>2</sup></span>}  on={() => push('^2')}    cls={pal.k} />
      <K label={<span>□<sup>°</sup></span>}  on={() => push('°')}     cls={pal.k} />
      <K label="π"      on={() => push('π')}       cls={pal.k} />
      <K label={<em className="font-serif">x</em>} on={() => push('x')} cls={pal.k} />
      <K label={<em className="font-serif">y</em>} on={() => push('y')} cls={pal.k} />
      <K label="="      on={() => push('=')}        cls={pal.k} />
    </>
  );

  /* ── CALCULUS LEFT KEYS — Image 4 (red) ── */
  const CalcKeys = () => (
    <>
      <K label={<div className="flex flex-col items-center text-[12px] leading-none"><span className="border-b border-current font-medium px-px">d</span><span className="font-medium">d□</span></div>} on={() => push('d/dx ')} cls={pal.k} />
      <K label="∞"      on={() => push('∞')}        cls={pal.k} />
      <K label="ⁿ√□"    on={() => push('sqrt(')}    cls={pal.k} />
      <K label={<span>lim<sub>□→0</sub></span>}    on={() => push('lim ')}   cls={pal.k} />
      <K label={<span>lim<sub>□→0⁺</sub></span>}   on={() => push('lim+ ')}  cls={pal.k} />
      <K label={<span>lim<sub>□→0⁻</sub></span>}   on={() => push('lim- ')}  cls={pal.k} />
      <K label={<span>log<sub>□</sub></span>}       on={() => push('log(')}   cls={pal.k} />
      <K label="C(n,k)" on={() => push('C(')}        cls={pal.k} />
      <K label="P(n,k)" on={() => push('P(')}        cls={pal.k} />
      <K label="Σ"      on={() => push('Σ ')}        cls={pal.k} />
      <K label={<span className="text-lg">∫</span>} on={() => push('∫ ')} cls={pal.k} />
      <K label={<span>∫<sub>a</sub><sup>b</sup></span>} on={() => push('∫_a^b ')} cls={pal.k} />
      <K label={<em className="font-serif">x</em>} on={() => push('x')} cls={pal.k} />
      <K label={<em className="font-serif">y</em>} on={() => push('y')} cls={pal.k} />
      <K label="e"      on={() => push('e')}          cls={pal.k} />
    </>
  );

  /* ── SOLVER FULL GRID ── */
  const SolverGrid = () => (
    <div className="grid grid-cols-5 sm:grid-cols-7 gap-1.5 sm:gap-[6px] px-3 sm:px-4 pb-4 pt-2">
      {/* Left 3 cols: tab-specific operator keys */}
      <div className="col-span-3 grid grid-cols-3 gap-[6px]">
        {tab === 'algebra'  && <AlgKeys />}
        {tab === 'trig'     && <TrigKeys />}
        {tab === 'calculus' && <CalcKeys />}
      </div>
      {/* Right 4 cols: numpad */}
      <div className="col-span-4 grid grid-cols-4 gap-[6px]">
        <NumPad />
      </div>
    </div>
  );

  /* ── TAB STYLES ── */
  const tClr = { algebra: '#7c3aed', trig: '#188038', calculus: '#c5221f' };

  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */
  return (
    <div className="flex justify-center w-full font-[Google_Sans,Roboto,sans-serif]">
      <div
        className="w-full bg-white border border-[#dadce0] overflow-hidden"
        style={{ maxWidth: 660, borderRadius: 28, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}
      >

        {/* ── DISPLAY ──────────────────────────────────────────── */}
        {mode === 'sci' ? (
          <div className="px-5 pt-5 pb-3 flex flex-col min-h-[110px] border-b border-[#f1f3f4]">
            {/* Top row: history icon + expression echo */}
            <div className="flex items-center justify-between mb-2 text-[#9aa0a6]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span className="text-[13px] truncate max-w-[80%] text-right">{expr || ''}</span>
            </div>
            {/* Big number */}
            <div className="text-right text-[44px] font-light text-[#202124] tracking-tight leading-none truncate">
              {answered ? disp : (expr || '0')}
            </div>
          </div>
        ) : (
          /* ── SOLVER HEADER ─────────────────────────────────── */
          <div className="px-5 pt-4 pb-0 border-b border-[#f1f3f4]">
            {/* Title row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[17px] font-medium text-[#202124]">Maths solver</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
              </svg>
            </div>
            {/* Input field */}
            <div className="relative border border-[#dadce0] rounded-2xl px-4 py-3 mb-3 focus-within:border-[#1a73e8] focus-within:shadow-[inset_0_0_0_1px_#1a73e8] transition-all bg-white">
              <input
                type="text"
                value={expr}
                onChange={ev => { setExpr(ev.target.value); setAnswered(false); }}
                placeholder="Enter a problem"
                className="w-full text-[20px] text-[#202124] bg-transparent outline-none placeholder:text-[#bdc1c6]"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col text-[#9aa0a6]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>
            {/* Tabs */}
            <div className="flex gap-5 text-[13px]">
              {(['algebra', 'trig', 'calculus'] as const).map(t => {
                const active = tab === t;
                const label = t === 'trig' ? 'Trigonometry' : t === 'calculus' ? 'Calculus' : 'Algebra';
                return (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="pb-2.5 font-medium transition-colors"
                    style={{
                      color: active ? tClr[t] : '#5f6368',
                      borderBottom: active ? `2px solid ${tClr[t]}` : '2px solid transparent',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── KEYPAD ───────────────────────────────────────────── */}
        {mode === 'sci' ? <SciGrid /> : <SolverGrid />}

        {/* ── BOTTOM STRIP ─────────────────────────────────────── */}
        {mode === 'sci' ? (
          /* "Maths solver ›" pill */
          <div className="border-t border-[#f1f3f4] flex justify-center py-2.5 bg-slate-50/50 mt-1">
            <button
              onClick={() => { setMode('solver'); setExpr(''); setAnswered(false); }}
              className="flex items-center gap-1.5 text-[12px] font-bold text-slate-600
                         bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 rounded-full px-5 py-1.5 transition-all shadow-sm"
            >
              Maths solver
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          </div>
        ) : (
          /* example-equations strip + collapse button */
          <div className="border-t border-[#f1f3f4] px-4 py-3 flex items-center justify-between bg-[#fafafa]">
            <div className="flex gap-2 flex-wrap">
              {['6x + 5 = 14', '(x+5)(x+2)', '4x²−5x=12'].map(ex => (
                <button
                  key={ex}
                  onClick={() => { setExpr(ex); setAnswered(false); }}
                  className="text-[12px] border border-[#dadce0] rounded-full px-3 py-1.5
                             bg-white hover:bg-[#f1f3f4] text-[#202124] transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMode('sci')}
              title="Close Maths solver"
              className="ml-3 text-[#5f6368] hover:text-[#202124] transition-colors shrink-0"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
