'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';

/* ── Colors for up to 8 expressions ─────────────────────────── */
const COLORS = ['#4361ee','#f72585','#4cc9f0','#7209b7','#06d6a0','#ff6b35','#3a86ff','#e63946'];

/* ── Math evaluator ─────────────────────────────────────────── */
function evalExpr(raw: string, x: number): number | null {
  try {
    if (!raw.trim()) return null;
    let e = raw
      .replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-')
      .replace(/π/g, String(Math.PI)).replace(/\be\b/g, String(Math.E))
      .replace(/(\d)([a-df-wyzA-DF-WYZ])/g,'$1*$2').replace(/\)([a-df-wyzA-DF-WYZ])/g,')*$1')
      .replace(/\bx\b/g, `(${x})`);
    e = e
      .replace(/sin\(/g,'Math.sin(').replace(/cos\(/g,'Math.cos(').replace(/tan\(/g,'Math.tan(')
      .replace(/asin\(/g,'Math.asin(').replace(/acos\(/g,'Math.acos(').replace(/atan\(/g,'Math.atan(')
      .replace(/sqrt\(/g,'Math.sqrt(').replace(/log\(/g,'Math.log10(').replace(/ln\(/g,'Math.log(')
      .replace(/exp\(/g,'Math.exp(').replace(/abs\(/g,'Math.abs(').replace(/\^/g,'**');
    const open = (e.match(/\(/g)||[]).length;
    const close = (e.match(/\)/g)||[]).length;
    e += ')'.repeat(Math.max(0, open - close));
    const r = new Function(`"use strict"; return (${e})`)();
    return typeof r === 'number' && isFinite(r) ? r : null;
  } catch { return null; }
}

function niceStep(range: number, target: number) {
  const rough = range / target;
  const pow = Math.pow(10, Math.floor(Math.log10(Math.abs(rough))));
  const n = rough / pow;
  return (n < 1.5 ? 1 : n < 3.5 ? 2 : n < 7.5 ? 5 : 10) * pow;
}

function fmt(v: number) { return Math.abs(v) < 1e-10 ? '0' : String(parseFloat(v.toPrecision(6))); }

interface Expr { id: number; text: string; color: string; visible: boolean; }

export default function GraphingCalculatorClient() {
  const [exprs, setExprs] = useState<Expr[]>([
    { id: 1, text: 'sin(x)', color: COLORS[0], visible: true },
    { id: 2, text: 'x^2 - 4', color: COLORS[1], visible: true }
  ]);
  const nextId = useRef(3);
  const [focusedId, setFocusedId] = useState<number>(1);
  const [keypadOpen, setKeypadOpen] = useState(false);
  const [keypadTab, setKeypadTab] = useState<'123'|'fx'|'abc'>('123');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const view = useRef({ xMin: -10, xMax: 10, yMin: -7, yMax: 7 });
  const drag = useRef({ active: false, lx: 0, ly: 0 });
  const raf = useRef(0);

  const addExpr = () => {
    const id = nextId.current++;
    const idx = exprs.length % COLORS.length;
    setExprs(p => [...p, { id, text: '', color: COLORS[idx], visible: true }]);
    setFocusedId(id);
  };
  const removeExpr = (id: number) => setExprs(p => p.length > 1 ? p.filter(e => e.id !== id) : p);
  const updateExpr = (id: number, text: string) => setExprs(p => p.map(e => e.id === id ? { ...e, text } : e));
  const toggleExpr = (id: number) => setExprs(p => p.map(e => e.id === id ? { ...e, visible: !e.visible } : e));

  const loadPreset = (val: string) => {
    setExprs([{ id: 1, text: val, color: COLORS[0], visible: true }]);
    setFocusedId(1);
  };

  /* ── Keypad push into focused expression ─── */
  const kpush = useCallback((v: string) => {
    setExprs(p => p.map(e => e.id === focusedId ? { ...e, text: e.text + v } : e));
  }, [focusedId]);

  const kdel = useCallback(() => {
    setExprs(p => p.map(e => e.id === focusedId ? { ...e, text: e.text.slice(0, -1) } : e));
  }, [focusedId]);

  const kac = useCallback(() => {
    setExprs(p => p.map(e => e.id === focusedId ? { ...e, text: '' } : e));
  }, [focusedId]);

  /* ── Draw Canvas ──────────────────────────────────────── */
  const draw = useCallback(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    const rect = c.parentElement?.getBoundingClientRect();
    const W = rect?.width || c.clientWidth || 800;
    const H = rect?.height || c.clientHeight || 600;
    const dpr = window.devicePixelRatio || 1;
    const bw = Math.round(W * dpr), bh = Math.round(H * dpr);
    if (c.width !== bw || c.height !== bh) { c.width = bw; c.height = bh; }
    c.style.width = W + 'px'; c.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const { xMin, xMax, yMin, yMax } = view.current;
    const xS = xMax - xMin, yS = yMax - yMin;
    const toX = (x: number) => ((x - xMin) / xS) * W;
    const toY = (y: number) => H - ((y - yMin) / yS) * H;

    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);

    const xs = niceStep(xS, 10), ys = niceStep(yS, 8);

    // Minor grid
    ctx.strokeStyle = '#f1f5f9'; ctx.lineWidth = 0.5; ctx.beginPath();
    for (let x = Math.floor(xMin / (xs/5)) * (xs/5); x <= xMax; x += xs/5) { const p = toX(x); ctx.moveTo(p, 0); ctx.lineTo(p, H); }
    for (let y = Math.floor(yMin / (ys/5)) * (ys/5); y <= yMax; y += ys/5) { const p = toY(y); ctx.moveTo(0, p); ctx.lineTo(W, p); }
    ctx.stroke();

    // Major grid
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.beginPath();
    for (let x = Math.floor(xMin / xs) * xs; x <= xMax; x += xs) { const p = toX(x); ctx.moveTo(p, 0); ctx.lineTo(p, H); }
    for (let y = Math.floor(yMin / ys) * ys; y <= yMax; y += ys) { const p = toY(y); ctx.moveTo(0, p); ctx.lineTo(W, p); }
    ctx.stroke();

    const ox = Math.min(Math.max(toX(0), 5), W - 5), oy = Math.min(Math.max(toY(0), 5), H - 5);

    // Axis labels
    ctx.font = '11px Inter,system-ui,sans-serif'; ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    for (let x = Math.floor(xMin / xs) * xs; x <= xMax; x += xs) {
      if (Math.abs(x) < xs * 0.01) continue;
      const lx = toX(x); if (lx < 0 || lx > W) continue;
      ctx.fillText(fmt(x), lx, Math.min(H - 5, Math.max(15, oy + 15)));
    }
    ctx.textAlign = 'right';
    for (let y = Math.floor(yMin / ys) * ys; y <= yMax; y += ys) {
      if (Math.abs(y) < ys * 0.01) continue;
      const ly = toY(y); if (ly < 0 || ly > H) continue;
      ctx.fillText(fmt(y), Math.max(25, Math.min(W - 5, ox - 5)), ly + 4);
    }

    // Axes
    ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.5; ctx.beginPath();
    ctx.moveTo(0, oy); ctx.lineTo(W, oy); ctx.moveTo(ox, 0); ctx.lineTo(ox, H); ctx.stroke();
    ctx.fillStyle = '#1e293b';
    ctx.beginPath(); ctx.moveTo(W-1, oy); ctx.lineTo(W-8, oy-4); ctx.lineTo(W-8, oy+4); ctx.fill();
    ctx.beginPath(); ctx.moveTo(ox, 1); ctx.lineTo(ox-4, 9); ctx.lineTo(ox+4, 9); ctx.fill();

    // Curves
    const SAMPLES = Math.min(Math.round(W * 3), 2000);
    const step = xS / SAMPLES;
    exprs.forEach(expr => {
      if (!expr.visible || !expr.text.trim()) return;
      ctx.save(); ctx.beginPath();
      ctx.strokeStyle = expr.color; ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      let pen = false, prevPy: number | null = null;
      for (let i = 0; i <= SAMPLES; i++) {
        const mx = xMin + i * step;
        const my = evalExpr(expr.text, mx);
        if (my === null) { pen = false; prevPy = null; continue; }
        const px = toX(mx), py = toY(my);
        if (py < -5000 || py > H + 5000) { pen = false; prevPy = null; continue; }
        if (prevPy !== null && Math.abs(py - prevPy) > H * 0.6) pen = false;
        prevPy = py;
        if (!pen) { ctx.moveTo(px, py); pen = true; } else ctx.lineTo(px, py);
      }
      ctx.stroke(); ctx.restore();
    });

    // Empty hint
    if (exprs.every(e => !e.text.trim())) {
      ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 15px Inter,system-ui,sans-serif';
      ctx.textAlign = 'center'; ctx.fillText('Type a function to plot it', W/2, H/2 - 10);
      ctx.font = '13px Inter,system-ui,sans-serif'; ctx.fillStyle = '#cbd5e1';
      ctx.fillText('e.g.  sin(x)  ·  x^2 - 4  ·  1/x', W/2, H/2 + 20);
    }
  }, [exprs]);

  useEffect(() => {
    const w = wrapRef.current; if (!w) return;
    const obs = new ResizeObserver(() => { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(draw); });
    obs.observe(w); return () => obs.disconnect();
  }, [draw]);
  useEffect(() => { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(draw); }, [draw]);

  const onMD = (e: React.MouseEvent) => { drag.current = { active: true, lx: e.clientX, ly: e.clientY }; };
  const onMM = (e: React.MouseEvent) => {
    if (!drag.current.active) return;
    const c = canvasRef.current; if (!c) return;
    const v = view.current, W = c.clientWidth, H = c.clientHeight;
    const dx = -(e.clientX - drag.current.lx) / W * (v.xMax - v.xMin);
    const dy = (e.clientY - drag.current.ly) / H * (v.yMax - v.yMin);
    view.current = { xMin: v.xMin+dx, xMax: v.xMax+dx, yMin: v.yMin+dy, yMax: v.yMax+dy };
    drag.current.lx = e.clientX; drag.current.ly = e.clientY;
    cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(draw);
  };
  const onMU = () => { drag.current.active = false; };

  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const c = canvasRef.current; if (!c) return;
    const r = c.getBoundingClientRect(), v = view.current;
    const mx = v.xMin + ((e.clientX - r.left) / c.clientWidth) * (v.xMax - v.xMin);
    const my = v.yMin + (1 - (e.clientY - r.top) / c.clientHeight) * (v.yMax - v.yMin);
    const f = e.deltaY > 0 ? 1.12 : 0.89;
    view.current = { xMin: mx+(v.xMin-mx)*f, xMax: mx+(v.xMax-mx)*f, yMin: my+(v.yMin-my)*f, yMax: my+(v.yMax-my)*f };
    cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(draw);
  }, [draw]);
  useEffect(() => { const c = canvasRef.current; if (!c) return; c.addEventListener('wheel', onWheel, { passive: false }); return () => c.removeEventListener('wheel', onWheel); }, [onWheel]);

  const zoomBy = (f: number) => { const v = view.current, cx = (v.xMin+v.xMax)/2, cy = (v.yMin+v.yMax)/2, hw = (v.xMax-v.xMin)/2*f, hh = (v.yMax-v.yMin)/2*f; view.current = { xMin:cx-hw,xMax:cx+hw,yMin:cy-hh,yMax:cy+hh }; cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(draw); };
  const resetView = () => { view.current = { xMin:-10,xMax:10,yMin:-7,yMax:7 }; cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(draw); };

  const tRef = useRef<{x:number;y:number}|null>(null);
  const onTS = (e: React.TouchEvent) => { if (e.touches.length===1) tRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const onTM = (e: React.TouchEvent) => {
    e.preventDefault(); if (e.touches.length!==1||!tRef.current) return;
    const c = canvasRef.current; if (!c) return; const t = e.touches[0], v = view.current;
    const dx = -(t.clientX-tRef.current.x)/c.clientWidth*(v.xMax-v.xMin);
    const dy = (t.clientY-tRef.current.y)/c.clientHeight*(v.yMax-v.yMin);
    view.current = { xMin:v.xMin+dx,xMax:v.xMax+dx,yMin:v.yMin+dy,yMax:v.yMax+dy };
    tRef.current = { x:t.clientX,y:t.clientY };
    cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(draw);
  };

  /* ── Keypad rows ───────────────────────── */
  const Btn = ({ label, val, wide, color }: { label: React.ReactNode; val?: string; wide?: boolean; color?: string }) => (
    <button
      onMouseDown={e => { e.preventDefault(); if (val !== undefined) kpush(val); }}
      className={`flex items-center justify-center rounded-lg border text-[13px] font-medium transition-all active:scale-90 select-none min-h-[38px] ${wide ? 'col-span-2' : ''}`}
      style={{ background: color || '#fff', borderColor: color ? color : '#e2e8f0', color: color ? '#fff' : '#1e293b', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col bg-[#F8FAFC]" style={{ height: 'calc(100dvh - 64px)', overflow: 'hidden' }}>
      {/* Breadcrumb */}
      <div className="px-4 py-2 border-b border-slate-200 bg-white flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/engineering/" className="hover:text-blue-600">Engineering</Link>
        <span>/</span>
        <span className="text-slate-700">Graphing Visualizer</span>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* ─── LEFT SIDEBAR ─── */}
        <div className="w-full lg:w-[300px] flex-shrink-0 flex flex-col bg-white border-r border-slate-200 overflow-y-auto">
          
          {/* Presets */}
          <div className="px-3 pt-3 pb-2 border-b border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Presets</p>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'sin(x)', val: 'sin(x)' },
                { label: 'x² - 4', val: 'x^2 - 4' },
                { label: '1/x', val: '1/x' },
                { label: 'cos(2x)', val: 'cos(2*x)' },
                { label: '|x|', val: 'abs(x)' },
              ].map(p => (
                <button
                  key={p.val}
                  onClick={() => loadPreset(p.val)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 text-slate-700 rounded-full text-[11px] font-bold border border-slate-200 transition-all"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Expressions List */}
          <div className="flex-1 px-3 pt-3 pb-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Functions</p>
              <button
                onClick={addExpr}
                className="w-6 h-6 rounded-full bg-[#4361ee] text-white text-[16px] font-bold flex items-center justify-center hover:bg-[#3a56d4] transition-all shadow-sm"
              >+</button>
            </div>

            <div className="flex flex-col gap-2">
              {exprs.map((expr, i) => (
                <div
                  key={expr.id}
                  onClick={() => setFocusedId(expr.id)}
                  className={`flex items-center gap-2 p-2 rounded-xl border transition-all cursor-pointer ${focusedId === expr.id ? 'border-[#4361ee] bg-blue-50/40 shadow-sm' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                >
                  {/* Color dot / visibility toggle */}
                  <button
                    onMouseDown={e => e.stopPropagation()}
                    onClick={e => { e.stopPropagation(); toggleExpr(expr.id); }}
                    className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all"
                    style={{ borderColor: expr.color, background: expr.visible ? expr.color : 'transparent' }}
                  >
                    {expr.visible && <span className="text-white text-[9px] font-bold">✓</span>}
                  </button>

                  {/* Expression input */}
                  <div className="flex-1 relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] font-mono text-slate-400">f{i+1}=</span>
                    <input
                      type="text"
                      value={expr.text}
                      onFocus={() => setFocusedId(expr.id)}
                      onChange={e => updateExpr(expr.id, e.target.value)}
                      placeholder="e.g. sin(x)"
                      className="w-full pl-9 pr-2 py-1.5 text-[13px] font-mono rounded-lg border border-transparent focus:border-[#4361ee] focus:ring-1 focus:ring-[#4361ee] outline-none transition-all bg-white font-medium text-slate-900"
                      style={{ borderLeftColor: expr.color, borderLeftWidth: 2 }}
                    />
                  </div>

                  {/* Remove */}
                  {exprs.length > 1 && (
                    <button
                      onMouseDown={e => e.stopPropagation()}
                      onClick={e => { e.stopPropagation(); removeExpr(expr.id); }}
                      className="text-slate-300 hover:text-red-500 text-[14px] font-bold px-0.5 transition-all flex-shrink-0"
                    >✕</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Keypad: always open on desktop, collapsible on mobile ── */}
          <div className="border-t border-slate-200">
            {/* Mobile toggle — hidden on lg+ */}
            <button
              onClick={() => setKeypadOpen(o => !o)}
              className="lg:hidden w-full flex items-center justify-between px-4 py-3 text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              <span className="flex items-center gap-2">
                <span className="text-base">⌨️</span> Input Helper
              </span>
              <span className={`transition-transform duration-200 text-slate-400 ${keypadOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {/* Desktop: always shown. Mobile: only when keypadOpen */}
            <div className={`${keypadOpen ? 'block' : 'hidden'} lg:block`}>
              <div className="px-3 pb-3 bg-slate-50">
                {/* Editing label */}
                <div className="mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Editing: <span className="text-[#4361ee]">f{exprs.findIndex(e => e.id === focusedId) + 1}</span>
                  {' — '}
                  <span className="font-mono text-slate-600">{exprs.find(e => e.id === focusedId)?.text || '(empty)'}</span>
                </div>

                {/* Tab bar */}
                <div className="flex gap-1 mb-2">
                  {(['123','fx','abc'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setKeypadTab(t)}
                      className={`flex-1 py-1 rounded-lg text-[11px] font-bold border transition-all ${keypadTab === t ? 'bg-[#4361ee] text-white border-[#4361ee]' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                    >
                      {t === 'fx' ? 'f(x)' : t}
                    </button>
                  ))}
                </div>

                {/* Key grid */}
                {keypadTab === '123' && (
                  <div className="grid grid-cols-4 gap-1">
                    <Btn label="x" val="x" /><Btn label="y" val="y" /><Btn label="π" val="π" /><Btn label="e" val="e" />
                    <Btn label="7" val="7" /><Btn label="8" val="8" /><Btn label="9" val="9" /><Btn label="÷" val="/" />
                    <Btn label="4" val="4" /><Btn label="5" val="5" /><Btn label="6" val="6" /><Btn label="×" val="*" />
                    <Btn label="1" val="1" /><Btn label="2" val="2" /><Btn label="3" val="3" /><Btn label="−" val="-" />
                    <Btn label="0" val="0" /><Btn label="." val="." /><Btn label="(" val="(" /><Btn label=")" val=")" />
                    <Btn label="^" val="^" /><Btn label="+/-" val="-" />
                    <button onMouseDown={e => { e.preventDefault(); kdel(); }} className="flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 text-[13px] min-h-[38px] active:scale-90 transition-all">⌫</button>
                    <button onMouseDown={e => { e.preventDefault(); kac(); }} className="flex items-center justify-center rounded-lg border text-[12px] font-bold min-h-[38px] active:scale-90 transition-all" style={{ background: '#ef4444', borderColor: '#ef4444', color: '#fff' }}>AC</button>
                  </div>
                )}

                {keypadTab === 'fx' && (
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { label: 'sin(', val: 'sin(' }, { label: 'cos(', val: 'cos(' }, { label: 'tan(', val: 'tan(' },
                      { label: 'asin(', val: 'asin(' }, { label: 'acos(', val: 'acos(' }, { label: 'atan(', val: 'atan(' },
                      { label: 'log(', val: 'log(' }, { label: 'ln(', val: 'ln(' }, { label: 'exp(', val: 'exp(' },
                      { label: '√(', val: 'sqrt(' }, { label: 'abs(', val: 'abs(' }, { label: 'x^2', val: 'x^2' },
                    ].map(k => <Btn key={k.val} label={k.label} val={k.val} />)}
                  </div>
                )}

                {keypadTab === 'abc' && (
                  <div className="grid grid-cols-4 gap-1">
                    {['a','b','c','d','f','g','h','i','j','k','l','m','n','o','p','q'].map(c => (
                      <Btn key={c} label={c} val={c} />
                    ))}
                  </div>
                )}

                {/* Operator bar */}
                <div className="flex gap-1 mt-1">
                  {['+','-','*','/','='].map(op => <Btn key={op} label={op} val={op} />)}
                </div>
              </div>
            </div>
          </div>

          {/* Hints */}
          <div className="px-3 py-2 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
              <strong className="text-slate-500">Functions:</strong> sin, cos, tan, log, ln, sqrt, abs<br/>
              <strong className="text-slate-500">Constants:</strong> π, e &nbsp;·&nbsp; <strong className="text-slate-500">Power:</strong> x^2
            </p>
          </div>
        </div>

        {/* ─── RIGHT: Graph Canvas — hidden on mobile until sidebar is closed ─── */}
        <div ref={wrapRef} className="hidden lg:block flex-1 relative bg-white overflow-hidden">
          <canvas
            ref={canvasRef}
            style={{ display:'block', width:'100%', height:'100%', cursor: drag.current.active ? 'grabbing' : 'crosshair', touchAction:'none' }}
            onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onMU}
            onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={() => { tRef.current = null; }}
          />

          {/* Zoom Controls */}
          <div className="absolute right-4 bottom-10 flex flex-col gap-2 z-10">
            <button onClick={resetView} title="Reset View" className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-md flex items-center justify-center text-[14px] hover:bg-slate-50 transition-transform active:scale-95 font-bold text-slate-700">⊡</button>
            <button onClick={() => zoomBy(0.75)} title="Zoom In" className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-md flex items-center justify-center text-[18px] font-bold hover:bg-slate-50 transition-transform active:scale-95 text-slate-700">+</button>
            <button onClick={() => zoomBy(1.33)} title="Zoom Out" className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-md flex items-center justify-center text-[18px] font-bold hover:bg-slate-50 transition-transform active:scale-95 text-slate-700">−</button>
          </div>

          <div className="absolute bottom-3 right-16 text-[10px] font-bold text-slate-400 uppercase tracking-widest pointer-events-none bg-white/80 px-2 py-0.5 rounded">
            Drag to pan · Scroll to zoom
          </div>
        </div>
      </div>
    </div>
  );
}
