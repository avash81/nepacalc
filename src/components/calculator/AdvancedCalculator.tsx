'use client';
import { useState, useEffect, useCallback } from 'react';

/* ─── EVALUATOR ─────────────────────────────────────────────────── */
function compute(rawExpr: string, deg: boolean): string {
  try {
    if (!rawExpr.trim()) return '0';
    let e = rawExpr
      .replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')
      .replace(/π/g, String(Math.PI)).replace(/EXP/g, 'e')
      .replace(/(\d)(x)/g, '$1*$2');

    const toR = (v: number) => deg ? v * Math.PI / 180 : v;
    const toD = (v: number) => deg ? v * 180 / Math.PI : v;

    e = e
      .replace(/sin\(/g,  'Math.sin(toR(')
      .replace(/cos\(/g,  'Math.cos(toR(')
      .replace(/tan\(/g,  'Math.tan(toR(')
      .replace(/asin\(/g, '(w=>toD(Math.asin(w)))(')
      .replace(/acos\(/g, '(w=>toD(Math.acos(w)))(')
      .replace(/atan\(/g, '(w=>toD(Math.atan(w)))(')
      .replace(/csc\(/g,  '(w=>1/Math.sin(toR(w)))(')
      .replace(/sec\(/g,  '(w=>1/Math.cos(toR(w)))(')
      .replace(/cot\(/g,  '(w=>1/Math.tan(toR(w)))(')
      .replace(/sqrt\(/g, 'Math.sqrt(')
      .replace(/log\(/g,  'Math.log10(')
      .replace(/ln\(/g,   'Math.log(')
      .replace(/abs\(/g,  'Math.abs(')
      .replace(/\^/g,     '**');

    const open  = (e.match(/\(/g) || []).length;
    const close = (e.match(/\)/g) || []).length;
    e += ')'.repeat(Math.max(0, open - close));

    // eslint-disable-next-line no-new-func
    const fn = new Function('toR', 'toD', `"use strict"; return (${e})`);
    const result = fn(toR, toD);
    if (typeof result !== 'number' || !isFinite(result) || isNaN(result)) return 'Error';
    return parseFloat(result.toPrecision(10)).toString();
  } catch { return ''; }
}

/* ─── THEME ─────────────────────────────────────────────────────── */
const PURPLE = '#5b5ea6';

/* ─── KEY BUTTON ────────────────────────────────────────────────── */
function Key({ label, on, variant = 'normal', small = false, ariaLabel }: {
  label: React.ReactNode;
  on: () => void;
  variant?: 'normal' | 'dark' | 'purple' | 'num';
  small?: boolean;
  ariaLabel?: string;
}) {
  const themes: Record<string, string> = {
    normal: 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm font-medium',
    num:    'bg-white border-slate-200 text-slate-900 hover:bg-slate-50 shadow-sm font-bold',
    dark:   'bg-slate-600 border-slate-500 text-white hover:bg-slate-700 shadow-sm font-bold',
    purple: '',
  };
  return (
    <button
      onClick={on}
      aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
      className={`flex items-center justify-center select-none cursor-pointer rounded-xl transition-all duration-150 active:scale-90 focus:outline-none border w-full min-h-[44px] py-2 ${small ? 'text-[11px]' : 'text-[14px]'} ${themes[variant]}`}
      style={variant === 'purple' ? { background: PURPLE, borderColor: PURPLE, color: '#fff' } : undefined}
    >
      {label}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ADVANCED CALCULATOR — GeoGebra-style 4-tab keyboard
════════════════════════════════════════════════════════════════════ */
export default function AdvancedCalculator({
  onExpressionChange,
}: {
  onExpressionChange?: (expr: string) => void;
} = {}) {

  type TabId = '123' | 'fx' | 'abc' | 'sym';

  const [tab,      setTab]      = useState<TabId>('123');
  const [abcMode,  setAbcMode]  = useState<'latin' | 'greek'>('latin');
  const [expr,     setExpr]     = useState('');
  const [disp,     setDisp]     = useState('0');
  const [isDeg,    setIsDeg]    = useState(true);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    onExpressionChange?.(expr);
    if (answered) return;
    const r = compute(expr, isDeg);
    setDisp(r || expr || '0');
  }, [expr, isDeg, answered, onExpressionChange]);

  const push = useCallback((v: string) => {
    setAnswered(false);
    setExpr(p => answered ? v : p + v);
  }, [answered]);

  const eq  = useCallback(() => {
    const r = compute(expr, isDeg);
    if (r && r !== 'Error') { setExpr(r); setDisp(r); setAnswered(true); }
  }, [expr, isDeg]);

  const ac  = () => { setExpr(''); setDisp('0'); setAnswered(false); };
  const del = () => { setAnswered(false); setExpr(p => p.slice(0, -1)); };

  /* TAB BAR */
  const TABS: { id: TabId; label: string }[] = [
    { id: '123', label: '123' },
    { id: 'fx',  label: 'f(x)' },
    { id: 'abc', label: 'ABC' },
    { id: 'sym', label: '#&¬' },
  ];

  /* Bottom row — reusable */
  const BotRow = ({ leftLabel, leftFn }: { leftLabel: string; leftFn: () => void }) => (
    <div className="flex gap-1.5">
      <button onClick={leftFn} aria-label="Toggle keyboard type" className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-slate-100 text-slate-700 text-[12px] font-bold hover:bg-slate-200 transition-all active:scale-90">{leftLabel}</button>
      <button onClick={() => push(',')} aria-label="Comma" className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[14px] font-medium hover:bg-slate-50 shadow-sm transition-all active:scale-90">,</button>
      <button onClick={() => push('(')} aria-label="Open parenthesis" className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[14px] font-medium hover:bg-slate-50 shadow-sm transition-all active:scale-90">(</button>
      <button onClick={() => push(')')} aria-label="Close parenthesis" className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[14px] font-medium hover:bg-slate-50 shadow-sm transition-all active:scale-90">)</button>
      <div className="flex-[2]" />
      <button onClick={eq} aria-label="Calculate result" style={{ background: PURPLE, color: '#fff', borderColor: PURPLE }} className="flex-[2] min-h-[44px] rounded-xl text-[14px] font-bold hover:opacity-90 shadow-sm transition-all active:scale-90">↵</button>
    </div>
  );

  /* ── 123 ── */
  const K123 = () => {
    const L = (l: React.ReactNode, v: string, a?: string) => <Key label={l} on={() => push(v)} ariaLabel={a} />;
    return (
      <div className="px-4 pb-2 flex flex-col gap-1.5">
        <div className="flex gap-1 mb-1">
          {['Deg', 'Rad'].map(m => (
            <button key={m} onClick={() => setIsDeg(m === 'Deg')}
              aria-label={`Switch to ${m}`}
              className="px-3 py-1 rounded-full text-[12px] font-bold transition-all"
              style={{ background: (m === 'Deg') === isDeg ? PURPLE : '#f1f5f9', color: (m === 'Deg') === isDeg ? '#fff' : '#64748b' }}>
              {m}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-9 gap-1.5">
          {L('x','x')} {L('y','y')} {L('π','π')} {L('e','e')}
          <Key label="7" on={() => push('7')} variant="num" />
          <Key label="8" on={() => push('8')} variant="num" />
          <Key label="9" on={() => push('9')} variant="num" />
          {L('×','×','Multiply')} {L('÷','÷','Divide')}
        </div>
        <div className="grid grid-cols-9 gap-1.5">
          {L(<span>□<sup>2</sup></span>,'^2','Square')} {L(<span>□<sup>y</sup></span>,'^','Power')} {L('√□','sqrt(','Square root')} {L('|□|','abs(','Absolute value')}
          <Key label="4" on={() => push('4')} variant="num" />
          <Key label="5" on={() => push('5')} variant="num" />
          <Key label="6" on={() => push('6')} variant="num" />
          {L('+','+','Plus')} {L('−','-','Minus')}
        </div>
        <div className="grid grid-cols-9 gap-1.5">
          {L('<','<','Less than')} {L('>','>','Greater than')} {L('≤','<=','Less than or equal')} {L('≥','>=','Greater than or equal')}
          <Key label="1" on={() => push('1')} variant="num" />
          <Key label="2" on={() => push('2')} variant="num" />
          <Key label="3" on={() => push('3')} variant="num" />
          {L('=','=','Equals')}
          <Key label="⌫" on={del} variant="dark" ariaLabel="Backspace" />
        </div>
        <div className="flex gap-1.5">
          <button onClick={ac} aria-label="All Clear" className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-slate-100 text-slate-700 text-[13px] font-bold hover:bg-slate-200 transition-all active:scale-90">AC</button>
          <button onClick={() => push(',')} aria-label="Comma" className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[14px] font-medium hover:bg-slate-50 shadow-sm transition-all active:scale-90">,</button>
          <button onClick={() => push('(')} aria-label="Open parenthesis" className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[14px] font-medium hover:bg-slate-50 shadow-sm transition-all active:scale-90">(</button>
          <button onClick={() => push(')')} aria-label="Close parenthesis" className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[14px] font-medium hover:bg-slate-50 shadow-sm transition-all active:scale-90">)</button>
          <button onClick={() => push('0')} aria-label="Number 0" className="flex-[2] min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-900 text-[14px] font-bold hover:bg-slate-50 shadow-sm transition-all active:scale-90">0</button>
          <button onClick={() => push('.')} aria-label="Decimal point" className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[14px] font-medium hover:bg-slate-50 shadow-sm transition-all active:scale-90">.</button>
          <button onClick={eq} aria-label="Calculate result" style={{ background: PURPLE, color: '#fff', borderColor: PURPLE }} className="flex-[2] min-h-[44px] rounded-xl text-[14px] font-bold hover:opacity-90 shadow-sm transition-all active:scale-90">↵</button>
        </div>
      </div>
    );
  };

  /* ── f(x) ── */
  const KFx = () => {
    const F = (l: React.ReactNode, v: string) => <Key label={l} on={() => push(v)} small />;
    return (
      <div className="px-4 pb-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-7 gap-1.5">
          {F('sin','sin(')} {F('cos','cos(')} {F('tan','tan(')} {F('%','%')} {F('!','!')} {F('$','$')} {F('°','°')}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {F(<span>sin<sup>-1</sup></span>,'asin(')} {F(<span>cos<sup>-1</sup></span>,'acos(')} {F(<span>tan<sup>-1</sup></span>,'atan(')}
          {F('{','{')} {F('}','}')} {F('≤','<=')} {F('≥','>=')}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {F('ln','ln(')} {F(<span>log<sub>10</sub></span>,'log(')} {F(<span>log<sub>□</sub></span>,'log(')}
          {F(<span className="text-[10px]">d/dx</span>,'d/dx')} {F('∫','∫')} {F('i','i')}
          <Key label="⌫" on={del} variant="dark" />
        </div>
        <div className="flex gap-1.5">
          <button onClick={() => push('e^')}    className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[12px] font-medium hover:bg-slate-50 shadow-sm active:scale-90"><span>e<sup>□</sup></span></button>
          <button onClick={() => push('10^')}   className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[12px] font-medium hover:bg-slate-50 shadow-sm active:scale-90"><span>10<sup>□</sup></span></button>
          <button onClick={() => push('sqrt(')} className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[12px] font-medium hover:bg-slate-50 shadow-sm active:scale-90"><span><sup>n</sup>√</span></button>
          <button onClick={() => push('π')}     className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[14px] font-medium hover:bg-slate-50 shadow-sm active:scale-90">π</button>
          <button onClick={() => push(',')}     className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[14px] font-medium hover:bg-slate-50 shadow-sm active:scale-90">,</button>
          <button onClick={() => push('(')}     className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[14px] font-medium hover:bg-slate-50 shadow-sm active:scale-90">(</button>
          <button onClick={eq} style={{ background: PURPLE, color: '#fff', borderColor: PURPLE }} className="flex-[2] min-h-[44px] rounded-xl text-[14px] font-bold hover:opacity-90 shadow-sm active:scale-90">↵</button>
        </div>
      </div>
    );
  };

  /* ── ABC ── */
  const KAbc = () => {
    const LATIN  = [['q','w','e','r','t','y','u','i','o','p'],['a','s','d','f','g','h','j','k','l'],['z','x','c','v','b','n','m']];
    const GREEK  = [['φ','ζ','ε','ρ','τ','υ','θ','ι','ο','π'],['α','σ','δ','γ','η','ξ','κ','λ','β'],['χ','ψ','ω','ν','μ','φ']];
    const rows   = abcMode === 'latin' ? LATIN : GREEK;
    return (
      <div className="px-4 pb-2 flex flex-col gap-1.5">
        {rows.map((row, ri) => (
          <div key={ri} className="flex gap-1.5 justify-center">
            {ri === 2 && <button onClick={() => setAbcMode(m => m === 'latin' ? 'greek' : 'latin')} className="min-h-[44px] px-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-600 text-[12px] font-bold hover:bg-slate-200 active:scale-90">⇧</button>}
            {row.map(l => <button key={l} onClick={() => push(l)} className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[13px] font-medium hover:bg-slate-50 shadow-sm active:scale-90">{l}</button>)}
            {ri === 2 && <Key label="⌫" on={del} variant="dark" />}
          </div>
        ))}
        <BotRow leftLabel={abcMode === 'latin' ? 'αβγ' : 'ABC'} leftFn={() => setAbcMode(m => m === 'latin' ? 'greek' : 'latin')} />
      </div>
    );
  };

  /* ── #&¬ ── */
  const KSym = () => {
    const SYMS = [['!','@','#','$','%','^','&','*'],['~','`','|','\\',':',';','"',"'"],['_','-','=','+','[',']','{','}'],['<','>','?','/','©','®','™','…']];
    return (
      <div className="px-4 pb-2 flex flex-col gap-1.5">
        {SYMS.map((row, ri) => (
          <div key={ri} className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${row.length},1fr)` }}>
            {row.map(s => <button key={s} onClick={() => push(s)} className="min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[14px] font-medium hover:bg-slate-50 shadow-sm active:scale-90">{s}</button>)}
          </div>
        ))}
        <div className="flex gap-1.5 mt-1">
          <button onClick={() => setTab('123')} className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-slate-100 text-slate-700 text-[12px] font-bold hover:bg-slate-200 active:scale-90">123</button>
          <button onClick={() => push(',')} className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[14px] font-medium hover:bg-slate-50 shadow-sm active:scale-90">,</button>
          <button onClick={() => push('(')} className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[14px] font-medium hover:bg-slate-50 shadow-sm active:scale-90">(</button>
          <button onClick={() => push(')')} className="flex-1 min-h-[44px] rounded-xl border border-slate-200 bg-white text-slate-700 text-[14px] font-medium hover:bg-slate-50 shadow-sm active:scale-90">)</button>
          <div className="flex-[2]" />
          <button onClick={eq} style={{ background: PURPLE, color: '#fff', borderColor: PURPLE }} className="flex-[2] min-h-[44px] rounded-xl text-[14px] font-bold hover:opacity-90 active:scale-90">↵</button>
        </div>
      </div>
    );
  };

  /* ── RENDER ─────────────────────────────────────────────────────── */
  return (
    <div className="w-full bg-white overflow-hidden font-[Inter,system-ui,sans-serif]"
      style={{ borderRadius:'1.5rem', border:'1px solid #DADCE0', boxShadow:'0 1px 6px rgba(32,33,36,0.28)' }}>

      {/* Display */}
      <div className="px-5 pt-5 pb-3">
        <div className="relative border border-[#DADCE0] rounded-xl px-5 py-6 flex items-center min-h-[72px] bg-[#fafafa]">
          <div className="flex-1 text-right text-[40px] sm:text-[48px] font-light text-[#202124] tracking-tight leading-none truncate">
            {answered ? disp : (expr || '0')}
          </div>
          {expr && !answered && (
            <div className="absolute right-4 bottom-2 text-[12px] text-slate-400 font-medium">= {disp}</div>
          )}
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 px-4 pt-2 pb-1">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="px-3 py-1.5 rounded-full text-[13px] font-semibold transition-all"
            style={{ background: tab === t.id ? PURPLE : 'transparent', color: tab === t.id ? '#fff' : '#64748b' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Keypad */}
      <div className="bg-[#f8f9fa] border-t border-slate-100 pb-3 pt-2">
        {tab === '123' && <K123 />}
        {tab === 'fx'  && <KFx  />}
        {tab === 'abc' && <KAbc />}
        {tab === 'sym' && <KSym />}
      </div>
    </div>
  );
}
