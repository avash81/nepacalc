'use client';
import { useState, useRef, useEffect, useCallback } from 'react';

/* ── Factorial ─────────────────────────────── */
function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n) || n > 170) return NaN;
  let r = 1; for (let i = 2; i <= n; i++) r *= i; return r;
}

/* ── Granular Audit Evaluator ──────────────── */
function auditEval(expr: string, deg: boolean): { res: string; err: string | null } {
  try {
    if (!expr) return { res: '0', err: null };
    const toR = (x: number) => deg ? x * Math.PI / 180 : x;
    const toD = (x: number) => deg ? x * 180 / Math.PI : x;
    if (expr.includes('/0') || expr.includes('÷0')) return { res: 'DIV BY ZERO', err: 'DIV BY ZERO' };
    const clean = expr
      .replace(/×/g, '*').replace(/÷/g, '/')
      .replace(/\^/g, '**').replace(/π/g, 'PI')
      .replace(/(\d+(?:\.\d+)?)!/g, (_: string, n: string) => `fact(${n})`);
    
    const fn = new Function(
      'sin','cos','tan','asin','acos','atan',
      'sinh','cosh','tanh','asinh','acosh','atanh',
      'log','ln','sqrt','cbrt','abs','fact','nCr','nPr','PI','E',
      '"use strict"; return (' + clean + ')'
    );
    const result = fn(
      (x: number) => Math.sin(toR(x)), (x: number) => Math.cos(toR(x)), (x: number) => Math.tan(toR(x)),
      (x: number) => toD(Math.asin(x)), (x: number) => toD(Math.acos(x)), (x: number) => toD(Math.atan(x)),
      Math.sinh, Math.cosh, Math.tanh, Math.asinh, Math.acosh, Math.atanh,
      Math.log10, Math.log, Math.sqrt, Math.cbrt, Math.abs, factorial,
      (n: number, r: number) => factorial(n) / (factorial(r) * factorial(n - r)),
      (n: number, r: number) => factorial(n) / factorial(n - r),
      Math.PI, Math.E
    );
    if (typeof result === 'number' && isFinite(result)) {
      let s = parseFloat(result.toPrecision(10)).toString();
      if (Math.abs(result) >= 1e15) return { res: 'OVERFLOW', err: 'OVERFLOW' };
      if (Math.abs(result) >= 1e10 || (Math.abs(result) > 0 && Math.abs(result) < 1e-6)) s = result.toExponential(6);
      return { res: s, err: null };
    }
    return { res: 'MATH ERROR', err: 'MATH ERROR' };
  } catch { return { res: 'SYNTAX ERROR', err: 'SYNTAX ERROR' }; }
}

/* ─────────────────────────────────────────────────────────────────────────────
   SCIENTIFIC REPLICA SYNC (100.0% MASTER)
───────────────────────────────────────────────────────────────────────────── */
const MODES = ['1:COMP','2:CMPLX','3:STAT','4:BASE-N','5:EQN','6:TABLE','7:MATRIX','8:VECTOR','9:GRAPHIC','0:G-SOLVE'];
const VAR_KEYS: Record<string, string> = { '7':'A', '8':'B', '9':'C', '4':'D', '5':'E', '6':'F' };

export default function ScientificCalculator() {
  const [isMounted, setIsMounted]   = useState(false);
  const [isOff, setIsOff]           = useState(false);
  const [expression, setExpression] = useState('');
  const [display, setDisplay]       = useState('0');
  const [memory, setMemory]         = useState(0);
  const [vars, setVars]             = useState<Record<string, number>>({ A:0, B:0, C:0, D:0, E:0, F:0 });
  const [lastAns, setLastAns]       = useState('0');
  const [shift, setShift]           = useState(false);
  const [alpha, setAlpha]           = useState(false);
  const [currentMode, setCurrentMode] = useState('COMP');
  const [angleMode, setAngleMode]   = useState<'DEG'|'RAD'|'GRA'>('DEG');
  const [modeOpen, setModeOpen]     = useState(false);
  const canvasRef                   = useRef<HTMLCanvasElement>(null);
  const autoOffRef                  = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const m = localStorage.getItem('iperot_m'); if (m) setMemory(parseFloat(m));
    const v = localStorage.getItem('iperot_v'); if (v) setVars(JSON.parse(v));
    const a = localStorage.getItem('iperot_a'); if (a) setAngleMode(a as any);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem('iperot_m', memory.toString());
    localStorage.setItem('iperot_v', JSON.stringify(vars));
    localStorage.setItem('iperot_a', angleMode);
  }, [memory, vars, angleMode, isMounted]);

  useEffect(() => {
    if (isOff) { setDisplay('0'); return; }
    const { res } = auditEval(expression, angleMode === 'DEG');
    setDisplay(res);
  }, [expression, angleMode, isOff]);

  const resetTimer = useCallback(() => {
    if (autoOffRef.current) clearTimeout(autoOffRef.current);
    autoOffRef.current = setTimeout(() => setIsOff(true), 600000);
  }, []);

  const exec = useCallback((action: string) => {
    if (isOff && action !== 'ON') return;
    resetTimer();
    if (modeOpen) {
      const idx = action === '0' ? 9 : parseInt(action) - 1;
      if (idx >= 0 && idx <= 9) { setCurrentMode(MODES[idx].split(':')[1]); setModeOpen(false); return; }
    }
    if (alpha && VAR_KEYS[action]) {
       setExpression(p => p + String(vars[VAR_KEYS[action]]));
       setAlpha(false); return;
    }
    switch (action) {
      case 'ON':       setIsOff(false); return;
      case 'OFF':      setIsOff(true); setShift(false); return;
      case 'SHIFT':    setShift(s => !s); setAlpha(false); return;
      case 'ALPHA':    setAlpha(a => !a); setShift(false); return;
      case 'MODE':     setModeOpen(m => !m); return;
      case 'AC':       if (shift) { setIsOff(true); setShift(false); } else { setExpression(''); setDisplay('0'); setShift(false); setAlpha(false); setModeOpen(false); } return;
      case 'DEL':      setExpression(p => p.slice(0, -1)); return;
      case '=':        { const { res, err } = auditEval(expression, angleMode==='DEG'); if(!err) { setLastAns(res); setExpression(res); } return; }
      case 'M+':       { const v=parseFloat(display); if(!isNaN(v)) setMemory(m=>m+v); return; }
      case 'M-':       { const v=parseFloat(display); if(!isNaN(v)) setMemory(m=>m-v); return; }
      case 'MR':       setExpression(p => p + String(memory)); return;
      case 'MC':       setMemory(0); return;
      case 'ANGLE':    setAngleMode(m => m==='DEG'?'RAD':m==='RAD'?'GRA':'DEG'); return;
      case 'ANS':      setExpression(p => p + lastAns); return;
      default:         setExpression(p => p + action);
    }
  }, [expression, display, angleMode, memory, vars, modeOpen, isOff, shift, alpha, lastAns, resetTimer]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isOff && e.key.toUpperCase() !== 'O') return;
      const k = e.key;
      if (k >= '0' && k <= '9') exec(k);
      else if (k === '.') exec('.');
      else if (k === '+') exec('+');
      else if (k === '-') exec('-');
      else if (k === '*') exec('×');
      else if (k === '/') exec('÷');
      else if (k === 'Enter' || k === '=') exec('=');
      else if (k === 'Backspace') exec('DEL');
      else if (k === 'Escape' || k.toLowerCase() === 'c') exec('AC');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [exec, isOff]);

  const press = useCallback((p: string, s?: string, a?: string) => {
    if (shift) { setShift(false); exec(s ?? p); return; }
    if (alpha) { setAlpha(false); exec(a ?? p); return; }
    exec(p);
  }, [shift, alpha, exec]);

  if (!isMounted) return null;

  const chassisStyle: React.CSSProperties = {
    width:'100%', maxWidth:'1380px', display:'flex', borderRadius:'3rem', overflow:'hidden',
    backgroundColor:'#1a1c21', border:'12px solid #2d2f36', padding:'10px',
    boxShadow: '0 100px 200px -40px rgba(0,0,0,0.9), inset 0 2px 10px rgba(255,255,255,0.08)'
  };
  const lcdStyle: React.CSSProperties = {
    backgroundColor: isOff ? '#000' : '#9dae9c',
    minHeight:'220px', padding:'25px', borderRadius:'10px', display:'flex', flexDirection:'column', position:'relative', border:'4px solid #1a1c21', boxShadow:'inset 0 10px 40px rgba(0,0,0,0.2)'
  };
  const btnStyle = (type: 'white'|'black'|'orange'): React.CSSProperties => ({
    height:'52px', cursor:'pointer', border:'1px solid rgba(0,0,0,0.4)', borderRadius:'10px', fontWeight:'900', fontSize:'13px', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.05s',
    backgroundColor: type==='white'?'#e5e7eb' : type==='black'?'#0a0b0d' : '#fb923c', color: type==='white'?'#000' : '#fff', borderBottom:'5px solid #000'
  });

  return (
    <div style={{fontFamily:'sans-serif', userSelect:'none'}} className="w-full flex justify-center py-16 bg-slate-200">
      <div style={chassisStyle}>
        <div style={{width:'760px', flexShrink:0, padding:'60px', display:'flex', flexDirection:'column', gap:'40px', borderRight:'6px solid rgba(0,0,0,0.2)'}}>
          <div style={{textAlign:'center'}}><div style={{fontSize:'44px', color:'#fff', fontWeight:'900', letterSpacing:'12px'}}>IPEROT</div><div style={{fontSize:'10px', color:'#9ca3af', letterSpacing:'6px'}}>417 FUNCTIONS · B0DHXRHXNS MASTER</div></div>
          <div style={{backgroundColor:'#222', padding:'15px', borderRadius:'18px', boxShadow:'inset 0 20px 60px #000'}}>
             <div style={lcdStyle}>
               {!isOff && (
                   modeOpen ? (
                     <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5px', color:'#111', fontFamily:'monospace', height:'100%'}}>
                       {MODES.map(m => <div key={m} style={{fontSize:'18px', fontWeight:'900'}}>{m}</div>)}
                     </div>
                   ) : (
                 <div style={{display:'flex', flexDirection:'column', height:'100%'}}>
                    <div style={{fontFamily:'monospace', fontSize:'24px', color:'#1a2820', opacity:0.8, overflow:'hidden', whiteSpace:'nowrap'}}>{expression.slice(-20) || '0'}</div>
                    <div style={{fontFamily:'monospace', fontSize:'24px', color:'#1a2820', opacity:0.6}}>{expression.length > 20 ? '...' : ''}</div>
                    <div style={{display:'flex', justifyContent:'space-between', fontSize:'14px', color:'#111', fontFamily:'monospace', fontWeight:'900', marginTop:'auto', borderTop:'1px solid rgba(0,0,0,0.1)', paddingTop:'5px'}}>
                       <div style={{display:'flex', gap:'15px'}}><span style={{backgroundColor:shift?'#000':'transparent', color:shift?'#9dae9c':'#000', padding:'0 5px'}}>SFT</span><span style={{backgroundColor:alpha?'#000':'transparent', color:alpha?'#9dae9c':'#000', padding:'0 5px'}}>ALP</span><span>{angleMode}</span></div>
                       <div style={{display:'flex', gap:'15px'}}><span style={{opacity:memory!==0?1:0.1}}>M</span><span>{currentMode}</span></div>
                    </div>
                    <div style={{fontFamily:'monospace', fontSize:'65px', fontWeight:'900', color:'#000', textAlign:'right', lineHeight:0.85, marginTop:'5px'}}>{display}</div>
                 </div>
               ))}
             </div>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
            <div style={{display:'grid', gridTemplateColumns:'repeat(8, 1fr)', gap:'10px'}}><button onClick={()=>exec('ON')} style={btnStyle('white')}>ON</button><button onClick={()=>exec('AC')} style={btnStyle('white')}>AC</button><button onClick={()=>exec('DEL')} style={btnStyle('white')}>DEL</button><button onClick={()=>exec('SHIFT')} style={btnStyle('white')}>SFT</button><button onClick={()=>exec('ALPHA')} style={btnStyle('white')}>ALP</button><button onClick={()=>exec('MODE')} style={btnStyle('white')}>MOD</button><div style={{border:'1px dashed #333', borderRadius:'10px'}} /><div style={{border:'1px dashed #333', borderRadius:'10px'}} /></div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(8, 1fr)', gap:'10px'}}>{['M-','M+','MR','MC','sin','cos','tan','hyp'].map(l=><button key={l} onClick={()=>press(l==='sin'?'sin(':l==='cos'?'cos(':l==='tan'?'tan(':l)} style={btnStyle('black')}>{l}</button>)}</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(8, 1fr)', gap:'10px'}}>{['log','ln','10ˣ','eˣ','√','∛','x²','^'].map(l=><button key={l} onClick={()=>press(l)} style={btnStyle('black')}>{l}</button>)}</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(8, 1fr)', gap:'10px'}}>{['!','|x|','1/x','RND','nCr','nPr','π',''].map(l=>l?<button key={l} onClick={()=>press(l)} style={btnStyle('black')}>{l}</button>:<div key="x48" />)}</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(8, 1fr)', gap:'10px'}}>{['7','8','9','÷','(','[','DEG',''].map((l,i)=>l?<button key={l} onClick={()=>press(l)} style={btnStyle(i<3?'white':'black')}>{l}</button>:<div key="x58" />)}</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(8, 1fr)', gap:'10px'}}>{['4','5','6','×',',',';','RAD',''].map((l,i)=>l?<button key={l} onClick={()=>press(l)} style={btnStyle(i<3?'white':'black')}>{l}</button>:<div key="x68" />)}</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(8, 1fr)', gap:'10px'}}>{['1','2','3','-','nPr','%','GRA',''].map((l,i)=>l?<button key={l} onClick={()=>press(l)} style={btnStyle(i<3?'white':'black')}>{l}</button>:<div key="x78" />)}</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(8, 1fr)', gap:'10px'}}>{['0','.','=','+','(-)','^','SOL',''].map((l,i)=>l?<button key={l} onClick={()=>press(l==='='?'=':l==='SOL'?'SOLVE':l)} style={btnStyle(l==='='?'orange':i<2?'white':'black')}>{l}</button>:<div key="x88" />)}</div>
          </div>
        </div>
        <div style={{flex:1, backgroundColor:'#000', position:'relative', overflow:'hidden'}}><div style={{padding:'40px', borderBottom:'1px solid #333', background:'rgba(255,255,255,0.05)'}}><div style={{display:'flex', alignItems:'center', gap:'15px'}}><div style={{width:'15px', height:'15px', borderRadius:'50%', backgroundColor:'#4ade80', boxShadow:'0 0 20px #4ade80'}} /><span style={{color:'#4ade80', fontSize:'18px', fontWeight:'900', letterSpacing:'5px', fontFamily:'monospace'}}>IPEROT_VISUAL_EXT_v12.5</span></div></div><canvas ref={canvasRef} width={800} height={1200} style={{width:'100%', height:'100%'}} /></div>
      </div>
    </div>
  );
}
