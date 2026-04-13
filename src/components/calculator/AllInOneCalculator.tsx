'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import * as math from 'mathjs';
import { History, ChevronUp, ChevronDown, MoreVertical, Delete } from 'lucide-react';

/* ── Factorial Helper ── */
function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n) || n > 170) return NaN;
  let r = 1; for (let i = 2; i <= n; i++) r *= i; return r;
}

/* ── Master Evaluator ── */
function masterEval(expr: string, deg: boolean): { res: string; err: string | null } {
  try {
    if (!expr) return { res: '0', err: null };
    let p = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'pi')
        .replace(/e/g, 'e')
        .replace(/EXP/g, '*10^');
    const result = math.evaluate(p, {
      pi: Math.PI, e: Math.E,
      sin: (x: number) => deg ? Math.sin(x * Math.PI / 180) : Math.sin(x),
      cos: (x: number) => deg ? Math.cos(x * Math.PI / 180) : Math.cos(x),
      tan: (x: number) => deg ? Math.tan(x * Math.PI / 180) : Math.tan(x),
      sqrt: Math.sqrt, log: Math.log10, ln: Math.log, abs: Math.abs, fact: factorial
    });
    if (typeof result === 'number') {
      if (!isFinite(result)) return { res: 'Error', err: 'Error' };
      return { res: parseFloat(result.toPrecision(10)).toString(), err: null };
    }
    return { res: String(result), err: null };
  } catch { 
     // Silently swallow errors during typing to maintain Google's live-resolve approach without flashing syntax errors
     return { res: '', err: 'SYNTAX ERROR' }; 
  }
}

/* ── Generic Button Component ── */
function CalcBtn({ label, onClick, className, span = 1 }: { label: React.ReactNode, onClick: () => void, className?: string, span?: number }) {
    return (
        <button 
           onClick={onClick}
           className={`flex items-center justify-center rounded-full text-[15px] sm:text-[17px] transition-colors duration-150 py-3 sm:py-3.5 focus:outline-none active:scale-[0.97] min-h-[48px] ${className} ${span > 1 ? `col-span-${span}` : ''}`}
           style={span > 1 ? { gridColumn: `span ${span} / span ${span}` } : {}}
        >
           {label}
        </button>
    );
}

export default function AllInOneCalculator() {
  const [mode, setMode] = useState<'standard' | 'solver'>('standard');
  const [tab, setTab] = useState<'algebra' | 'trig' | 'calc'>('algebra');
  
  const [expression, setExpression] = useState('');
  const [display, setDisplay] = useState('0');
  const [isDeg, setIsDeg] = useState(true);
  const [hasEvaluated, setHasEvaluated] = useState(false);

  // Live evaluation effect
  useEffect(() => {
    if (hasEvaluated) return;
    const { res, err } = masterEval(expression, isDeg);
    if (!err && res) {
      setDisplay(res);
    } else if (!expression) {
      setDisplay('0');
    }
  }, [expression, isDeg, hasEvaluated]);

  const exec = useCallback((action: string) => {
    setHasEvaluated(false);
    switch (action) {
      case 'AC': setExpression(''); setDisplay('0'); return;
      case 'DEL': setExpression(p => p.slice(0, -1)); return;
      case 'DegRad': setIsDeg(!isDeg); return;
      case '=': { 
        const { res, err } = masterEval(expression, isDeg); 
        if(!err) { setExpression(res); setDisplay(res); setHasEvaluated(true); }
        return; 
      }
      default: setExpression(p => (hasEvaluated ? action : p + action));
    }
  }, [expression, isDeg, hasEvaluated]);

  /* Base Colors referencing Google Search Palette */
  const cFunc = "bg-[#f0f4f9] hover:bg-[#e0e4e9] text-[#202124]"; // Light blue/grey
  const cNum = "bg-white hover:bg-[#f0f4f9] text-[#202124]"; // Clean white
  const cEqBase = "bg-[#0a56d1] hover:bg-[#0842a0] text-white"; // Blue eq
  
  // Solver Colors
  const cAlg = "bg-[#f3e8ff] hover:bg-[#e9d5ff] text-[#6b21a8] font-medium"; // Purple
  const cAlgEq = "bg-[#6b21a8] hover:bg-[#581c87] text-white";
  
  const cTrig = "bg-[#e6f4ea] hover:bg-[#ceead6] text-[#137333] font-medium"; // Green
  const cTrigEq = "bg-[#188038] hover:bg-[#137333] text-white";
  
  const cCalc = "bg-[#fce8e6] hover:bg-[#fad2cf] text-[#b31412] font-medium"; // Red/Pink
  const cCalcEq = "bg-[#b31412] hover:bg-[#a50e0e] text-white";

  const renderStandardGrid = () => (
    <div className="grid grid-cols-7 gap-1.5 sm:gap-2 px-2 pb-4">
       {/* ROW 1 */}
       <div className="col-span-2 bg-[#f0f4f9] rounded-full flex items-center justify-between p-1 select-none">
          <button onClick={() => setIsDeg(true)} className={`flex-1 rounded-full text-center py-2 text-[13px] font-bold ${isDeg ? 'text-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Deg</button>
          <div className="w-[1px] h-4 bg-slate-300"></div>
          <button onClick={() => setIsDeg(false)} className={`flex-1 rounded-full text-center py-2 text-[13px] font-bold ${!isDeg ? 'text-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Rad</button>
       </div>
       <CalcBtn label="x!" onClick={() => exec('!')} className={cFunc} />
       <CalcBtn label="(" onClick={() => exec('(')} className={cFunc} />
       <CalcBtn label=")" onClick={() => exec(')')} className={cFunc} />
       <CalcBtn label="%" onClick={() => exec('%')} className={cFunc} />
       <CalcBtn label="AC" onClick={() => exec('AC')} className={cFunc} />
       
       {/* ROW 2 */}
       <CalcBtn label="Inv" onClick={() => {}} className={cFunc} />
       <CalcBtn label="sin" onClick={() => exec('sin(')} className={cFunc} />
       <CalcBtn label="ln" onClick={() => exec('ln(')} className={cFunc} />
       <CalcBtn label="7" onClick={() => exec('7')} className={cNum} />
       <CalcBtn label="8" onClick={() => exec('8')} className={cNum} />
       <CalcBtn label="9" onClick={() => exec('9')} className={cNum} />
       <CalcBtn label="÷" onClick={() => exec('÷')} className={cFunc} />
       
       {/* ROW 3 */}
       <CalcBtn label="π" onClick={() => exec('π')} className={cFunc} />
       <CalcBtn label="cos" onClick={() => exec('cos(')} className={cFunc} />
       <CalcBtn label="log" onClick={() => exec('log(')} className={cFunc} />
       <CalcBtn label="4" onClick={() => exec('4')} className={cNum} />
       <CalcBtn label="5" onClick={() => exec('5')} className={cNum} />
       <CalcBtn label="6" onClick={() => exec('6')} className={cNum} />
       <CalcBtn label="×" onClick={() => exec('×')} className={cFunc} />
       
       {/* ROW 4 */}
       <CalcBtn label="e" onClick={() => exec('e')} className={cFunc} />
       <CalcBtn label="tan" onClick={() => exec('tan(')} className={cFunc} />
       <CalcBtn label="√" onClick={() => exec('sqrt(')} className={cFunc} />
       <CalcBtn label="1" onClick={() => exec('1')} className={cNum} />
       <CalcBtn label="2" onClick={() => exec('2')} className={cNum} />
       <CalcBtn label="3" onClick={() => exec('3')} className={cNum} />
       <CalcBtn label="−" onClick={() => exec('-')} className={cFunc} />
       
       {/* ROW 5 */}
       <CalcBtn label="Ans" onClick={() => exec('ans')} className={cFunc} />
       <CalcBtn label="EXP" onClick={() => exec('EXP')} className={cFunc} />
       <CalcBtn label={<span>x<sup>y</sup></span>} onClick={() => exec('^')} className={cFunc} />
       <CalcBtn label="0" onClick={() => exec('0')} className={cNum} />
       <CalcBtn label="." onClick={() => exec('.')} className={cNum} />
       <CalcBtn label="=" onClick={() => exec('=')} className={cEqBase} />
       <CalcBtn label="+" onClick={() => exec('+')} className={cFunc} />
    </div>
  );

  const renderSolverGrid = () => {
    let tBtn = cAlg;
    let tEq = cAlgEq;
    if (tab === 'trig') { tBtn = cTrig; tEq = cTrigEq; }
    if (tab === 'calc') { tBtn = cCalc; tEq = cCalcEq; }

    const NumpadCols = (
      <>
       <CalcBtn label="(" onClick={() => exec('(')} className={cFunc} />
       <CalcBtn label=")" onClick={() => exec(')')} className={cFunc} />
       <CalcBtn label={<Delete className="w-5 h-5 fill-slate-700 stroke-white" />} onClick={() => exec('DEL')} className={cFunc} />
       <CalcBtn label="AC" onClick={() => exec('AC')} className={cFunc} />
       
       <CalcBtn label="7" onClick={() => exec('7')} className={cNum} />
       <CalcBtn label="8" onClick={() => exec('8')} className={cNum} />
       <CalcBtn label="9" onClick={() => exec('9')} className={cNum} />
       <CalcBtn label="÷" onClick={() => exec('÷')} className={cFunc} />
       
       <CalcBtn label="4" onClick={() => exec('4')} className={cNum} />
       <CalcBtn label="5" onClick={() => exec('5')} className={cNum} />
       <CalcBtn label="6" onClick={() => exec('6')} className={cNum} />
       <CalcBtn label="×" onClick={() => exec('×')} className={cFunc} />
       
       <CalcBtn label="1" onClick={() => exec('1')} className={cNum} />
       <CalcBtn label="2" onClick={() => exec('2')} className={cNum} />
       <CalcBtn label="3" onClick={() => exec('3')} className={cNum} />
       <CalcBtn label="−" onClick={() => exec('-')} className={cFunc} />
       
       <CalcBtn label="0" onClick={() => exec('0')} className={cNum} />
       <CalcBtn label="." onClick={() => exec('.')} className={cNum} />
       <CalcBtn label={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>} onClick={() => exec('=')} className={tEq} />
       <CalcBtn label="+" onClick={() => exec('+')} className={cFunc} />
      </>
    );

    const Lbl = ({ m, s, b }: {m?:string, s?:string, b?:string}) => (
       <div className="flex flex-col items-center">
          {m && <span>{m}</span>}
          <div className="flex text-[10px] mt-0.5 opacity-60">
             {s && <sup>{s}</sup>}
             {b && <sub>{b}</sub>}
          </div>
       </div>
    );

    return (
       <div className="grid grid-cols-7 gap-1.5 sm:gap-2 px-2 pb-4 h-full relative">
          <div className="col-span-3 grid grid-cols-3 gap-1.5 sm:gap-2 mr-2 border-r border-slate-100 pr-2">
             {tab === 'algebra' && (
                <>
                  <CalcBtn label="□/□" onClick={() => exec('/')} className={tBtn} />
                  <CalcBtn label="ⁿ√" onClick={() => exec('nthRoot(')} className={tBtn} />
                  <CalcBtn label="<" onClick={() => exec('<')} className={tBtn} />
                  
                  <CalcBtn label="[ ]" onClick={() => {}} className={tBtn} />
                  <CalcBtn label="|x|" onClick={() => exec('abs(')} className={tBtn} />
                  <CalcBtn label="≤" onClick={() => exec('<=')} className={tBtn} />
                  
                  <CalcBtn label={<Lbl m="log" b="□" />} onClick={() => exec('log(')} className={tBtn} />
                  <CalcBtn label="x!" onClick={() => exec('!')} className={tBtn} />
                  <CalcBtn label=">" onClick={() => exec('>')} className={tBtn} />
                  
                  <CalcBtn label={<span className="italic">i</span>} onClick={() => exec('i')} className={tBtn} />
                  <CalcBtn label="%" onClick={() => exec('%')} className={tBtn} />
                  <CalcBtn label="≥" onClick={() => exec('>=')} className={tBtn} />
                  
                  <CalcBtn label={<span className="italic font-serif">x</span>} onClick={() => exec('x')} className={tBtn} />
                  <CalcBtn label={<span className="italic font-serif">y</span>} onClick={() => exec('y')} className={tBtn} />
                  <CalcBtn label="=" onClick={() => exec('=')} className={tBtn} />
                </>
             )}
             {tab === 'trig' && (
                <>
                  <CalcBtn label="sin" onClick={() => exec('sin(')} className={tBtn} />
                  <CalcBtn label="cos" onClick={() => exec('cos(')} className={tBtn} />
                  <CalcBtn label="tan" onClick={() => exec('tan(')} className={tBtn} />
                  
                  <CalcBtn label="csc" onClick={() => exec('csc(')} className={tBtn} />
                  <CalcBtn label="sec" onClick={() => exec('sec(')} className={tBtn} />
                  <CalcBtn label="cot" onClick={() => exec('cot(')} className={tBtn} />
                  
                  <CalcBtn label="arcsin" onClick={() => exec('asin(')} className={tBtn} />
                  <CalcBtn label="arccos" onClick={() => exec('acos(')} className={tBtn} />
                  <CalcBtn label="arctan" onClick={() => exec('atan(')} className={tBtn} />
                  
                  <CalcBtn label={<Lbl m="x" s="2" />} onClick={() => exec('^2')} className={tBtn} />
                  <CalcBtn label={<Lbl m="x" s="°" />} onClick={() => exec('deg')} className={tBtn} />
                  <CalcBtn label="π" onClick={() => exec('π')} className={tBtn} />
                  
                  <CalcBtn label={<span className="italic font-serif">x</span>} onClick={() => exec('x')} className={tBtn} />
                  <CalcBtn label={<span className="italic font-serif">y</span>} onClick={() => exec('y')} className={tBtn} />
                  <CalcBtn label="=" onClick={() => exec('=')} className={tBtn} />
                </>
             )}
             {tab === 'calc' && (
                <>
                  <CalcBtn label={<div className="flex flex-col items-center leading-none text-sm"><span className="border-b border-rose-800">d</span><span>dx</span></div>} onClick={() => exec('d/dx ')} className={tBtn} />
                  <CalcBtn label="∞" onClick={() => exec('∞')} className={tBtn} />
                  <CalcBtn label="ⁿ√" onClick={() => exec('nthRoot(')} className={tBtn} />
                  
                  <CalcBtn label={<Lbl m="lim" b="x→0" />} onClick={() => exec('lim ')} className={tBtn} />
                  <CalcBtn label={<Lbl m="lim" b="x→0+" />} onClick={() => exec('lim+ ')} className={tBtn} />
                  <CalcBtn label={<Lbl m="lim" b="x→0-" />} onClick={() => exec('lim- ')} className={tBtn} />
                  
                  <CalcBtn label={<Lbl m="log" b="□" />} onClick={() => exec('log(')} className={tBtn} />
                  <CalcBtn label="C(n,k)" onClick={() => exec('C(')} className={tBtn} />
                  <CalcBtn label="P(n,k)" onClick={() => exec('P(')} className={tBtn} />
                  
                  <CalcBtn label="Σ" onClick={() => exec('Σ ')} className={tBtn} />
                  <CalcBtn label={<span className="text-xl">∫</span>} onClick={() => exec('∫ ')} className={tBtn} />
                  <CalcBtn label={<Lbl m="∫" s="b" b="a" />} onClick={() => exec('∫_a^b ')} className={tBtn} />
                  
                  <CalcBtn label={<span className="italic font-serif">x</span>} onClick={() => exec('x')} className={tBtn} />
                  <CalcBtn label={<span className="italic font-serif">y</span>} onClick={() => exec('y')} className={tBtn} />
                  <CalcBtn label="e" onClick={() => exec('e')} className={tBtn} />
                </>
             )}
          </div>
          <div className="col-span-4 grid grid-cols-4 gap-1.5 sm:gap-2">
             {NumpadCols}
          </div>
       </div>
    );
  };

  return (
    <div className="w-full flex justify-center pb-8 pt-4">
      <div className={`w-full max-w-[700px] border border-slate-200 rounded-[28px] overflow-hidden bg-white shadow-xl transition-all duration-300 font-sans ${mode === 'solver' ? 'min-h-[550px]' : ''}`}>
         
         {/* Top Display Area */}
         {mode === 'standard' ? (
           <div className="px-6 py-4 flex flex-col justify-between min-h-[140px] border-b border-slate-100">
             <div className="flex justify-between items-center text-slate-500">
                <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><History className="w-5 h-5" /></button>
                <div className="text-lg tracking-wide opacity-50 truncate max-w-[80%] text-right">{expression || '\u00A0'}</div>
             </div>
             <div className="text-right">
                <div className="text-5xl font-normal text-slate-800 truncate" style={{ fontFamily: 'ui-sans-serif, system-ui' }}>
                   {hasEvaluated ? display : expression || '0'}
                </div>
             </div>
           </div>
         ) : (
           <div className="px-6 py-4 flex flex-col border-b border-slate-100 bg-white z-10 relative">
             <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-medium text-slate-800">Maths solver</div>
                <button className="p-1.5 hover:bg-slate-100 rounded-full"><MoreVertical className="w-5 h-5 text-slate-600" /></button>
             </div>
             <div className="flex items-center border border-slate-200 rounded-2xl px-4 py-3 bg-white shadow-sm ring-1 ring-transparent focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                <input 
                  type="text" 
                  value={expression} 
                  onChange={(e) => { setExpression(e.target.value); setHasEvaluated(false); }}
                  className="flex-1 text-2xl outline-none text-slate-800 placeholder-slate-300"
                  placeholder="Enter equation..."
                />
                <button onClick={() => setMode('standard')} className="ml-2 p-1 bg-slate-100 hover:bg-slate-200 rounded-full">
                  <ChevronUp className="w-5 h-5 text-slate-600" />
                </button>
             </div>
             <div className="flex gap-6 mt-4 px-2">
                <button onClick={() => setTab('algebra')} className={`pb-2 text-sm font-medium border-b-2 transition-colors ${tab === 'algebra' ? 'border-[#0a56d1] text-[#0a56d1]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>Algebra</button>
                <button onClick={() => setTab('trig')} className={`pb-2 text-sm font-medium border-b-2 transition-colors ${tab === 'trig' ? 'border-[#0a56d1] text-[#0a56d1]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>Trigonometry</button>
                <button onClick={() => setTab('calc')} className={`pb-2 text-sm font-medium border-b-2 transition-colors ${tab === 'calc' ? 'border-[#0a56d1] text-[#0a56d1]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>Calculus</button>
             </div>
           </div>
         )}

         {/* Content Grid Area */}
         <div className="pt-4 bg-white">
            {mode === 'standard' ? renderStandardGrid() : renderSolverGrid()}
            
            {mode === 'standard' && (
               <div className="border-t border-slate-100 mt-2">
                 <button 
                   onClick={() => setMode('solver')}
                   className="w-full py-3.5 text-[15px] font-medium text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-1 transition-colors"
                 >
                   Maths solver <ChevronDown className="w-4 h-4" />
                 </button>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}

