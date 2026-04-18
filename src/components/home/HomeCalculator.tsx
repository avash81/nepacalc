'use client';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { safeEval } from '@/utils/math/safeEval';
import { 
  Send, MoveUpRight, Clock, ChevronRight, Calculator, Activity, 
  Globe, BookOpen, Trash2, Delete, X, MoreVertical, History, Play
} from 'lucide-react';

type CalcMode = 'scientific' | 'solver';
type SolverTab = 'Algebra' | 'Trigonometry' | 'Calculus';

export function HomeCalculator() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<CalcMode>('scientific');
  const [solverTab, setSolverTab] = useState<SolverTab>('Algebra');
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isDeg, setIsDeg] = useState(true);
  const [solverInput, setSolverInput] = useState('');
  const [solverResult, setSolverResult] = useState('');
  const [memory, setMemory] = useState<number>(0);

  useEffect(() => { setMounted(true); }, []);

  const append = useCallback((val: string) => {
    setDisplay(prev => (prev === '0') ? val : prev + val);
    setEquation(prev => prev + val);
  }, []);

  const calculate = useCallback(() => {
    try {
      const res = safeEval(equation || display, { isDeg });
      setDisplay(res);
      setEquation('');
    } catch { setDisplay('Error'); }
  }, [display, equation, isDeg]);

  const solveMathQuery = () => {
    if (!solverInput.trim()) return;
    const res = safeEval(solverInput, { isDeg: true });
    
    // If it's an equation (contains =) or safeEval can't handle it (returns Error)
    // we redirect to the full solver which has advanced parsing.
    if (res === 'Error' || solverInput.includes('=')) {
       localStorage.setItem('calc_query', solverInput.trim());
       // Use hard location for maximum reliability in dev environments
       window.location.href = '/calculator/scientific-calculator';
       return;
    }
    
    setSolverResult(res);
  };

  const memOp = (op: string) => {
    const v = parseFloat(display);
    if (op === 'MC') setMemory(0);
    if (op === 'MR') setDisplay(String(memory));
    if (op === 'MS') setMemory(v);
    if (op === 'M+') setMemory(m => m + v);
    if (op === 'M-') setMemory(m => m - v);
  };

  if (!mounted) return null;

  return (
    <div className="w-full bg-white border border-google-border rounded-[32px] shadow-sm overflow-hidden select-none font-sans">
      <div className="p-6 md:p-8">
        <div className="space-y-6">
          <div className="bg-google-gray rounded-[24px] p-6 text-right border border-google-border min-h-[120px] flex flex-col justify-end text-gray-900">
             <div className="text-sm text-gray-600 font-mono mb-1">{equation || ' '}</div>
             <div className="text-5xl md:text-6xl font-sans font-bold text-gray-900 tracking-tighter">{display}</div>
          </div>

          <div className="flex gap-4">
             <button onClick={() => setIsDeg(true)} className={`text-xs font-black uppercase px-3 py-1 rounded-lg ${isDeg ? 'bg-google-blue-light text-google-blue' : 'text-gray-300'}`}>Deg</button>
             <button onClick={() => setIsDeg(false)} className={`text-xs font-black uppercase px-3 py-1 rounded-lg ${!isDeg ? 'bg-google-blue-light text-google-blue' : 'text-gray-300'}`}>Rad</button>
          </div>

          <div className="grid grid-cols-7 gap-2">
             <button className="h-11 bg-google-gray font-bold text-xs rounded-xl text-gray-500">Inv</button>
             <button onClick={() => append('sin(')} className="h-11 bg-google-blue-light text-google-blue font-black text-xs rounded-xl">sin</button>
             <button onClick={() => append('ln(')} className="h-11 bg-google-blue-light text-google-blue font-black text-xs rounded-xl">ln</button>
             {[7,8,9].map(n => <button key={n} onClick={() => append(String(n))} className="h-11 bg-white border border-google-border font-bold rounded-xl text-gray-900">{n}</button>)}
             <button onClick={() => append('/')} className="h-11 bg-google-gray text-gray-600 text-xl font-bold rounded-xl">÷</button>

             <button onClick={() => append('pi')} className="h-11 bg-google-gray text-google-blue font-black text-xs rounded-xl">π</button>
             <button onClick={() => append('cos(')} className="h-11 bg-google-blue-light text-google-blue font-black text-xs rounded-xl">cos</button>
             <button onClick={() => append('log(')} className="h-11 bg-google-blue-light text-google-blue font-black text-xs rounded-xl">log</button>
             {[4,5,6].map(n => <button key={n} onClick={() => append(String(n))} className="h-11 bg-white border border-google-border font-bold rounded-xl text-gray-900">{n}</button>)}
             <button onClick={() => append('*')} className="h-11 bg-google-gray text-gray-600 text-xl font-bold rounded-xl">×</button>

             <button onClick={() => append('e')} className="h-11 bg-google-gray text-google-blue font-black text-xs rounded-xl">e</button>
             <button onClick={() => append('tan(')} className="h-11 bg-google-blue-light text-google-blue font-black text-xs rounded-xl">tan</button>
             <button onClick={() => append('sqrt(')} className="h-11 bg-google-blue-light text-google-blue font-black text-xs rounded-xl">√</button>
             {[1,2,3].map(n => <button key={n} onClick={() => append(String(n))} className="h-11 bg-white border border-google-border font-bold rounded-xl text-gray-900">{n}</button>)}
             <button onClick={() => append('-')} className="h-11 bg-google-gray text-gray-600 text-3xl font-bold rounded-xl">−</button>

             <button onClick={() => setDisplay('Ans')} className="h-11 bg-google-gray text-gray-600 text-xs font-black rounded-xl">Ans</button>
             <button onClick={() => append('EXP')} className="h-11 bg-google-blue-light text-google-blue text-xs font-black rounded-xl">EXP</button>
             <button onClick={() => append('^')} className="h-11 bg-google-blue-light text-google-blue text-xs font-black rounded-xl">x^y</button>
             <button onClick={() => append('0')} className="h-11 bg-white border border-google-border font-bold rounded-xl text-gray-900">0</button>
             <button onClick={() => append('.')} className="h-11 bg-white border border-google-border font-bold rounded-xl text-gray-900">.</button>
             <button onClick={calculate} className="h-11 bg-google-blue text-white rounded-xl font-black">=</button>
             <button onClick={() => append('+')} className="h-11 bg-google-gray text-gray-600 text-2xl font-bold rounded-xl">+</button>

             <button onClick={() => append('(')} className="h-11 bg-google-gray font-bold rounded-xl text-gray-900">(</button>
             <button onClick={() => append(')')} className="h-11 bg-google-gray font-bold rounded-xl text-gray-900">)</button>
             <button onClick={() => append('%')} className="h-11 bg-google-gray font-bold rounded-xl text-gray-900">%</button>
             <button onClick={() => { setDisplay(d=>d.slice(0,-1)||'0'); setEquation(e=>e.slice(0,-1)); }} className="h-11 bg-google-gray text-gray-600 rounded-xl flex items-center justify-center" aria-label="Delete last character"><Delete className="w-5 h-5"/></button>
             <button onClick={() => { setDisplay('0'); setEquation(''); }} className="h-11 bg-google-gray text-google-blue font-black text-xs rounded-xl">AC</button>
             <button onClick={() => append('fact(')} className="h-11 bg-google-blue-light text-google-blue font-black text-xs rounded-xl">n!</button>
             <button onClick={() => append('inv(')} className="h-11 bg-google-blue-light text-google-blue font-black text-xs rounded-xl">1/x</button>
          </div>

          <div className="grid grid-cols-5 gap-2">
             {['MS', 'MR', 'M+', 'M−', 'MC'].map(m => (
               <button key={m} onClick={() => memOp(m)} className="h-11 bg-google-gray text-gray-600 text-xs font-black uppercase tracking-widest rounded-xl hover:text-google-blue transition-all">
                  {m}
               </button>
             ))}
          </div>
        </div>
      </div>

      <div className="bg-google-gray/50 py-4 text-center border-t border-google-border">
         <Link 
           href="/calculator/scientific-calculator"
           className="text-[10px] font-black text-google-blue uppercase tracking-widest hover:underline transition-all inline-block"
         >
           Access Advanced Engineering Mode →
         </Link>
      </div>
    </div>
  );
}
