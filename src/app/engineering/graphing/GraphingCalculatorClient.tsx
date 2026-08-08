'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const AdvancedCalculator = dynamic(() => import('@/components/calculator/AdvancedCalculator'), { ssr: false });

/* ── Colors for up to 8 expressions ─────────────────────────── */
const COLORS = ['#4361ee','#f72585','#4cc9f0','#7209b7','#06d6a0','#ff6b35','#3a86ff','#e63946'];

/* ── Math evaluator ─────────────────────────────────────────── */
function evalExpr(raw: string, x: number): number | null {
  try {
    if (!raw.trim()) return null;
    let e = raw
      .replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-')
      .replace(/π/g, String(Math.PI)).replace(/\be\b/g, String(Math.E))
      .replace(/(\d)([a-df-z])/gi,'$1*$2').replace(/\)([a-df-z])/gi,')*$1')
      .replace(/\b[a-df-z]\b/gi, `(${x})`);
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

function hasX(expr: string) {
  if (!expr) return false;
  const clean = expr.replace(/exp/gi,'');
  return /\b[a-df-z]\b/i.test(clean) || 
         /sin\(|cos\(|tan\(|log\(|ln\(|sqrt\(|abs\(|exp\(/.test(expr) ||
         /^[0-9.+\-*\/^() \t]+$/.test(expr.trim());
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const view = useRef({ xMin: -10, xMax: 10, yMin: -7, yMax: 7 });
  const drag = useRef({ active: false, lx: 0, ly: 0 });
  const raf = useRef(0);

  const addExpr = () => {
    const idx = exprs.length % COLORS.length;
    setExprs(p => [...p, { id: nextId.current++, text: '', color: COLORS[idx], visible: true }]);
  };
  const removeExpr = (id: number) => setExprs(p => p.length > 1 ? p.filter(e => e.id !== id) : p);
  const updateExpr = (id: number, text: string) => setExprs(p => p.map(e => e.id === id ? { ...e, text } : e));
  const toggleExpr = (id: number) => setExprs(p => p.map(e => e.id === id ? { ...e, visible: !e.visible } : e));

  const loadPreset = (presetText: string) => {
    setExprs([{ id: 1, text: presetText, color: COLORS[0], visible: true }]);
  };

  /* ── Draw Canvas ──────────────────────────────────────── */
  const draw = useCallback(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    const rect = c.parentElement?.getBoundingClientRect();
    const W = rect?.width || c.clientWidth || 800;
    const H = rect?.height || c.clientHeight || 500;
    const dpr = window.devicePixelRatio || 1;
    const bw = Math.round(W * dpr), bh = Math.round(H * dpr);
    if (c.width !== bw || c.height !== bh) { c.width = bw; c.height = bh; }
    c.style.width = W + 'px'; c.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const { xMin, xMax, yMin, yMax } = view.current;
    const xS = xMax - xMin, yS = yMax - yMin;
    const toX = (x: number) => ((x - xMin) / xS) * W;
    const toY = (y: number) => H - ((y - yMin) / yS) * H;

    // BG
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);

    // Minor Grid
    const xs = niceStep(xS, 10), ys = niceStep(yS, 8);
    ctx.strokeStyle = '#f8fafc'; ctx.lineWidth = 0.5; ctx.beginPath();
    for (let x = Math.floor(xMin / (xs/5)) * (xs/5); x <= xMax; x += xs/5) { const p = toX(x); ctx.moveTo(p, 0); ctx.lineTo(p, H); }
    for (let y = Math.floor(yMin / (ys/5)) * (ys/5); y <= yMax; y += ys/5) { const p = toY(y); ctx.moveTo(0, p); ctx.lineTo(W, p); }
    ctx.stroke();

    // Major Grid
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.beginPath();
    for (let x = Math.floor(xMin / xs) * xs; x <= xMax; x += xs) { const p = toX(x); ctx.moveTo(p, 0); ctx.lineTo(p, H); }
    for (let y = Math.floor(yMin / ys) * ys; y <= yMax; y += ys) { const p = toY(y); ctx.moveTo(0, p); ctx.lineTo(W, p); }
    ctx.stroke();

    // Axis Labels
    ctx.font = '11px Inter,system-ui,sans-serif'; ctx.fillStyle = '#64748b';
    const ox = Math.min(Math.max(toX(0), 5), W - 5), oy = Math.min(Math.max(toY(0), 5), H - 5);
    
    ctx.textAlign = 'center';
    for (let x = Math.floor(xMin / xs) * xs; x <= xMax; x += xs) {
      if (Math.abs(x) < xs * 0.01) continue;
      const lx = toX(x);
      if (lx < 0 || lx > W) continue;
      ctx.fillText(fmt(x), lx, Math.min(H - 5, Math.max(15, oy + 15)));
    }

    ctx.textAlign = 'right';
    for (let y = Math.floor(yMin / ys) * ys; y <= yMax; y += ys) {
      if (Math.abs(y) < ys * 0.01) continue;
      const ly = toY(y);
      if (ly < 0 || ly > H) continue;
      ctx.fillText(fmt(y), Math.max(25, Math.min(W - 5, ox - 5)), ly + 4);
    }

    // Axes
    ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.5; ctx.beginPath();
    ctx.moveTo(0, oy); ctx.lineTo(W, oy); ctx.moveTo(ox, 0); ctx.lineTo(ox, H); ctx.stroke();
    ctx.fillStyle = '#1e293b';
    ctx.beginPath(); ctx.moveTo(W-1, oy); ctx.lineTo(W-8, oy-4); ctx.lineTo(W-8, oy+4); ctx.fill();
    ctx.beginPath(); ctx.moveTo(ox, 1); ctx.lineTo(ox-4, 9); ctx.lineTo(ox+4, 9); ctx.fill();

    // Plot Curves
    const SAMPLES = Math.min(Math.round(W * 3), 2000);
    const step = xS / SAMPLES;
    exprs.forEach(expr => {
      if (!expr.visible || !hasX(expr.text)) return;
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

    // Hint when empty
    if (exprs.every(e => !e.text.trim())) {
      ctx.fillStyle = '#94a3b8'; ctx.font = 'bold 15px Inter,system-ui,sans-serif';
      ctx.textAlign = 'center'; ctx.fillText('Type a function or click a preset below to plot', W/2, H/2 - 10);
      ctx.font = '13px Inter,system-ui,sans-serif'; ctx.fillStyle = '#cbd5e1';
      ctx.fillText('e.g.  sin(x)  ·  x^2 - 4  ·  1/x  ·  cos(2*x)', W/2, H/2 + 20);
    }
  }, [exprs]);

  // Resize & Redraw
  useEffect(() => {
    const w = wrapRef.current; if (!w) return;
    const obs = new ResizeObserver(() => { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(draw); });
    obs.observe(w); return () => obs.disconnect();
  }, [draw]);
  useEffect(() => { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(draw); }, [draw]);

  // Pan controls
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

  // Zoom controls
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

  // Touch handlers
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-6 pb-20">
      {/* Top Header & Navigation */}
      <div className="max-w-7xl mx-auto px-4 mb-4">
        <nav className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/engineering/" className="hover:text-blue-600">Engineering</Link>
          <span className="mx-1.5">/</span>
          <span className="text-slate-700">Graphing Visualizer</span>
        </nav>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Interactive Graphing Calculator</h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Plot trigonometric, polynomial, and algebraic functions with live 2D Cartesian visualizer.</p>
          </div>
          
          {/* Presets Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase shrink-0">Presets:</span>
            {[
              { label: 'sin(x)', val: 'sin(x)' },
              { label: 'x² - 4', val: 'x^2 - 4' },
              { label: '1 / x', val: '1/x' },
              { label: 'cos(2x)', val: 'cos(2*x)' },
              { label: '|x|', val: 'abs(x)' }
            ].map(p => (
              <button
                key={p.val}
                onClick={() => loadPreset(p.val)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 text-slate-700 rounded-full text-xs font-bold border border-slate-200 transition-all shrink-0 shadow-sm"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* LEFT SIDEBAR: Expressions Manager & Floating Calculator */}
          <div className="w-full lg:w-[420px] flex flex-col gap-6 flex-shrink-0">
            {/* Expressions Manager */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📈</span>
                  <h2 className="text-sm font-bold text-slate-900">Active Functions</h2>
                </div>
                <button onClick={addExpr} className="px-3 py-1.5 bg-[#4361ee] text-white text-[11px] font-bold rounded-lg hover:bg-[#3a56d4] transition-all shadow-sm active:scale-95 uppercase tracking-wide">
                  + Add
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {exprs.map((expr, i) => (
                  <div key={expr.id} className="flex items-center gap-2.5 p-2 bg-slate-50 border border-slate-200 rounded-xl group relative transition-all hover:border-slate-300">
                    <button onClick={() => toggleExpr(expr.id)} title="Toggle Visibility" className="w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all" style={{ borderColor: expr.color, background: expr.visible ? expr.color : 'transparent' }}>
                      {expr.visible && <span className="text-white text-[11px] font-bold">✓</span>}
                    </button>
                    <div className="flex-1 relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[12px] font-mono text-slate-400 font-bold">f{i+1}=</span>
                      <input
                        type="text"
                        value={expr.text}
                        onChange={e => updateExpr(expr.id, e.target.value)}
                        placeholder="e.g. sin(x)"
                        className="w-full pl-10 pr-3 py-2 text-[13px] font-mono rounded-lg border border-transparent focus:border-[#4361ee] focus:ring-1 focus:ring-[#4361ee] outline-none transition-all bg-white font-medium text-slate-900 shadow-sm"
                        style={{ borderLeftColor: expr.color, borderLeftWidth: 3 }}
                      />
                    </div>
                    {exprs.length > 1 && (
                      <button onClick={() => removeExpr(expr.id)} title="Remove Function" className="text-slate-400 hover:text-red-500 text-[16px] font-bold px-1 transition-all flex-shrink-0 absolute right-2 opacity-0 group-hover:opacity-100 bg-slate-50">✕</button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-500 flex flex-wrap gap-x-3 gap-y-1 font-medium leading-relaxed">
                <span><strong className="text-slate-700">Supported:</strong> sin, cos, tan, log, ln, sqrt, abs, asin, acos</span>
                <span><strong className="text-slate-700">Constants:</strong> π, e</span>
                <span><strong className="text-slate-700">Powers:</strong> x^2</span>
              </div>
            </div>

            {/* Input Keypad / Advanced Calculator Helper */}
            <div className="relative">
              <div className="absolute -top-3 left-6 bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md z-10">
                Input Helper
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden pt-4 relative transform transition-all hover:shadow-md">
                <AdvancedCalculator onExpressionChange={(text) => {
                  if (exprs.length > 0) {
                    updateExpr(exprs[0].id, text);
                  }
                }} />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: High-Resolution Interactive Canvas Graph */}
          <div ref={wrapRef} className="flex-1 w-full h-[500px] lg:h-[700px] relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <canvas
              ref={canvasRef}
              style={{ display:'block', width:'100%', height:'100%', cursor: drag.current.active ? 'grabbing' : 'crosshair', touchAction:'none' }}
              onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onMU}
              onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={() => { tRef.current = null; }}
            />
            
            {/* Zoom / Pan Controls Overlay */}
            <div className="absolute right-4 bottom-12 flex flex-col gap-2 z-10">
              <button onClick={resetView} title="Reset View" className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-md flex items-center justify-center text-[16px] hover:bg-slate-50 transition-transform active:scale-95 font-bold text-slate-700">⊡</button>
              <button onClick={() => zoomBy(0.75)} title="Zoom In" className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-md flex items-center justify-center text-[20px] font-bold hover:bg-slate-50 transition-transform active:scale-95 text-slate-700">+</button>
              <button onClick={() => zoomBy(1.33)} title="Zoom Out" className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-md flex items-center justify-center text-[20px] font-bold hover:bg-slate-50 transition-transform active:scale-95 text-slate-700">−</button>
            </div>
            
            <div className="absolute bottom-4 right-16 text-[10px] font-bold text-slate-400 uppercase tracking-widest pointer-events-none bg-white/80 px-2 py-1 rounded">
              Drag to pan · Scroll to zoom
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
