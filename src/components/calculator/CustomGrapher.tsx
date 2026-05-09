'use client';
import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import Link from 'next/link';
import { Settings, Maximize, Minus, Plus, Home, Grid, X } from 'lucide-react';

/* ── Expression evaluator supporting 'x' ─────────────────────── */

function isPlottable(expr: string) {
  if (!expr) return false;
  // Allow if it contains x, a function, OR is purely a numeric expression (constant)
  const clean = expr.replace(/EXP|exp/g, '').replace(/max|min/g, '');
  return /\b[a-df-z]\b/i.test(clean) || 
         /sin\(|cos\(|tan\(|log\(|ln\(|sqrt\(|abs\(/.test(expr) ||
         /^[0-9.+\-*\/^() \t]+$/.test(expr.trim());
}

/* ── Nice round grid intervals ──────────────────────────────── */
function niceStep(range: number, targetCount: number): number {
  const rough = range / targetCount;
  const pow   = Math.pow(10, Math.floor(Math.log10(Math.abs(rough))));
  const norm  = rough / pow;
  let nice: number;
  if      (norm <  1.5) nice = 1;
  else if (norm <  3.5) nice = 2;
  else if (norm <  7.5) nice = 5;
  else                  nice = 10;
  return nice * pow;
}

function fmtLabel(v: number): string {
  if (Math.abs(v) < 1e-10) return '0';
  return String(parseFloat(v.toPrecision(6)));
}

const CURVE_COLOR   = '#4361ee';
const AXIS_COLOR    = '#334155';
const GRID_COLOR    = '#e2e8f0';
const SUBGRID_COLOR = '#f1f5f9';
const LABEL_COLOR   = '#64748b';
const BG            = '#ffffff';

export default function CustomGrapher({ expression }: { expression: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);

  // View state ,  truly infinite, no clamping
  const view = useRef({ xMin: -10, xMax: 10, yMin: -7, yMax: 7 });
  const dragRef = useRef({ active: false, lx: 0, ly: 0 });
  
  // Settings state
  const [showAxes, setShowAxes] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [gridStyle, setGridStyle] = useState<'full' | 'major' | 'none' | 'dots'>('full');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const rafRef = useRef(0);

  // ── Pre-compile the math function for high performance ──
  const compiledFn = useMemo(() => {
    try {
      if (!expression.trim()) return null;
      let e = expression
        .replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-')
        .replace(/π/g, String(Math.PI)).replace(/EXP/g, 'e')
        .replace(/(\d)([a-df-z])/gi, '$1*$2').replace(/\)([a-df-z])/gi, ')*$1')
        .replace(/\b[a-df-z]\b/gi, `x`); // Use 'x' as variable

      const fnSafe = e
        .replace(/sin\(/g,  'Math.sin(')
        .replace(/cos\(/g,  'Math.cos(')
        .replace(/tan\(/g,  'Math.tan(')
        .replace(/asin\(/g, 'Math.asin(')
        .replace(/acos\(/g, 'Math.acos(')
        .replace(/atan\(/g, 'Math.atan(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/log\(/g,  'Math.log10(')
        .replace(/ln\(/g,   'Math.log(')
        .replace(/abs\(/g,  'Math.abs(')
        .replace(/\^/g,     '**');

      const open  = (fnSafe.match(/\(/g) || []).length;
      const close = (fnSafe.match(/\)/g) || []).length;
      const closedExpr = fnSafe + ')'.repeat(Math.max(0, open, close));

      // eslint-disable-next-line no-new-func
      return new Function('x', `"use strict"; return (${closedExpr})`);
    } catch {
      return null;
    }
  }, [expression]);

  const safeEval = useCallback((x: number) => {
    if (!compiledFn) return null;
    try {
      const res = compiledFn(x);
      return (typeof res === 'number' && isFinite(res) && !isNaN(res)) ? res : null;
    } catch { return null; }
  }, [compiledFn]);

  /* ─── DRAW (called every frame change) ─────────────────────── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const rect = canvas.parentElement?.getBoundingClientRect();
    const W = rect?.width  || canvas.clientWidth  || 600;
    const H = rect?.height || canvas.clientHeight || 400;
    const dpr = window.devicePixelRatio || 1;

    // Sync buffer
    const bw = Math.round(W * dpr);
    const bh = Math.round(H * dpr);
    if (canvas.width !== bw || canvas.height !== bh) {
      canvas.width  = bw;
      canvas.height = bh;
    }
    
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const { xMin, xMax, yMin, yMax } = view.current;
    const xSpan = xMax - xMin;
    const ySpan = yMax - yMin;

    const toPixX = (x: number) => ((x - xMin) / xSpan) * W;
    const toPixY = (y: number) => H - ((y - yMin) / ySpan) * H;

    /* Background */
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    /* Grid Rendering logic */
    if (showGrid && gridStyle !== 'none') {
      const xStep = niceStep(xSpan, 10);
      const yStep = niceStep(ySpan, 8);
      const xSub  = xStep / 5;
      const ySub  = yStep / 5;

      if (gridStyle === 'full') {
        // Minor grid
        ctx.strokeStyle = SUBGRID_COLOR;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let x = Math.floor(xMin / xSub) * xSub; x <= xMax; x += xSub) {
          const px = Math.round(toPixX(x)) + 0.5;
          ctx.moveTo(px, 0); ctx.lineTo(px, H);
        }
        for (let y = Math.floor(yMin / ySub) * ySub; y <= yMax; y += ySub) {
          const py = Math.round(toPixY(y)) + 0.5;
          ctx.moveTo(0, py); ctx.lineTo(W, py);
        }
        ctx.stroke();
      }

      if (gridStyle === 'full' || gridStyle === 'major') {
        // Major grid
        ctx.strokeStyle = GRID_COLOR;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = Math.floor(xMin / xStep) * xStep; x <= xMax; x += xStep) {
          const px = Math.round(toPixX(x)) + 0.5;
          ctx.moveTo(px, 0); ctx.lineTo(px, H);
        }
        for (let y = Math.floor(yMin / yStep) * yStep; y <= yMax; y += yStep) {
          const py = Math.round(toPixY(y)) + 0.5;
          ctx.moveTo(0, py); ctx.lineTo(W, py);
        }
        ctx.stroke();
      }

      if (gridStyle === 'dots') {
        ctx.fillStyle = GRID_COLOR;
        for (let x = Math.floor(xMin / xStep) * xStep; x <= xMax; x += xStep) {
          for (let y = Math.floor(yMin / yStep) * yStep; y <= yMax; y += yStep) {
            ctx.beginPath(); ctx.arc(toPixX(x), toPixY(y), 1.2, 0, Math.PI * 2); ctx.fill();
          }
        }
      }

      /* Labelling Axes */
      ctx.font = '11px Inter, system-ui';
      ctx.fillStyle = LABEL_COLOR;
      // Clamp x-axis label row to visible area
      const oyPx = Math.min(Math.max(toPixY(0), 16), H - 16);
      // Clamp y-axis label column to visible area
      const oxPx = Math.min(Math.max(toPixX(0), 28), W - 4);

      for (let x = Math.floor(xMin / xStep) * xStep; x <= xMax; x += xStep) {
        if (Math.abs(x) < xStep * 0.01) continue;
        const px = toPixX(x);
        ctx.textAlign = 'center';
        ctx.fillText(fmtLabel(x), px, oyPx + 14);
      }
      for (let y = Math.floor(yMin / yStep) * yStep; y <= yMax; y += yStep) {
        if (Math.abs(y) < yStep * 0.01) continue;
        const py = toPixY(y);
        ctx.textAlign = 'right';
        ctx.fillText(fmtLabel(y), oxPx - 4, py + 4);
      }
    }

    /* Primary Axes */
    if (showAxes) {
      ctx.strokeStyle = AXIS_COLOR;
      ctx.lineWidth = 1.8;
      const oxPx = toPixX(0);
      const oyPx = toPixY(0);
      ctx.beginPath();
      ctx.moveTo(0, oyPx); ctx.lineTo(W, oyPx);
      ctx.moveTo(oxPx, 0); ctx.lineTo(oxPx, H);
      ctx.stroke();
    }

    /* ── Curve ─────────────────────────────────────────────── */
    if (compiledFn && isPlottable(expression)) {
      const SAMPLES = Math.min(Math.round(W * 3.5), 2500);
      const step = xSpan / SAMPLES;

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = CURVE_COLOR;
      ctx.lineWidth = 3.2;
      ctx.lineJoin = 'round';
      ctx.lineCap  = 'round';

      let penDown = false;
      let prevY: number | null = null;

      for (let i = 0; i <= SAMPLES; i++) {
        const mx = xMin + i * step;
        const my = safeEval(mx);
        if (my === null) { penDown = false; prevY = null; continue; }
        const px = toPixX(mx);
        const py = toPixY(my);
        if (py < -H || py > H * 2) { penDown = false; prevY = null; continue; }
        if (prevY !== null && Math.abs(py - prevY) > H * 0.75) { penDown = false; }
        prevY = py;
        if (!penDown) { ctx.moveTo(px, py); penDown = true; }
        else { ctx.lineTo(px, py); }
      }
      ctx.stroke();
      ctx.restore();
    }
  }, [expression, showAxes, showGrid, gridStyle, compiledFn, safeEval]);

  /* Resize and Refresh hooks */
  useEffect(() => {
    const wrap = wrapRef.current; if (!wrap) return;
    const obs = new ResizeObserver(() => { draw(); });
    obs.observe(wrap);
    return () => obs.disconnect();
  }, [draw]);
  
  useEffect(() => { draw(); }, [draw]);

  /* Interaction events */
  const onMouseDown = (e: React.MouseEvent) => { dragRef.current = { active: true, lx: e.clientX, ly: e.clientY }; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.active) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const W = canvas.clientWidth; const H = canvas.clientHeight;
    const v = view.current;
    const dx = -(e.clientX - dragRef.current.lx) / W * (v.xMax - v.xMin);
    const dy =  (e.clientY - dragRef.current.ly) / H * (v.yMax - v.yMin);
    view.current = { xMin: v.xMin+dx, xMax: v.xMax+dx, yMin: v.yMin+dy, yMax: v.yMax+dy };
    dragRef.current.lx = e.clientX; dragRef.current.ly = e.clientY;
    draw();
  };
  const onMouseUp = () => { dragRef.current.active = false; };
  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current; if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left; const my = e.clientY - rect.top;
    const v = view.current;
    const mathX = v.xMin + (mx / canvas.clientWidth) * (v.xMax - v.xMin);
    const mathY = v.yMin + (1 - my / canvas.clientHeight) * (v.yMax - v.yMin);
    const factor = e.deltaY > 0 ? 1.15 : 0.87;
    view.current = { xMin: mathX + (v.xMin - mathX) * factor, xMax: mathX + (v.xMax - mathX) * factor, yMin: mathY + (v.yMin - mathY) * factor, yMax: mathY + (v.yMax - mathY) * factor };
    draw();
  }, [draw]);

  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    c.addEventListener('wheel', onWheel, { passive: false });
    return () => c.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  const zoomBy = (factor: number) => {
    const v = view.current;
    const cx = (v.xMin + v.xMax) / 2; const cy = (v.yMin + v.yMax) / 2;
    const hw = (v.xMax - v.xMin) / 2 * factor; const hh = (v.yMax - v.yMin) / 2 * factor;
    view.current = { xMin: cx-hw, xMax: cx+hw, yMin: cy-hh, yMax: cy+hh };
    draw();
  };
  const toggleFullscreen = () => {
    if (!wrapRef.current) return;
    if (!document.fullscreenElement) wrapRef.current.requestFullscreen();
    else document.exitFullscreen();
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`relative w-full h-full flex flex-col bg-white border border-slate-200 shadow-sm transition-all duration-300 rounded-[1.5rem] overflow-hidden ${isFullscreen ? 'fixed inset-0 z-[9999] rounded-none' : ''}`}>
      
      {/* Settings Panel & UI Controls (Top Right) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end">
        <button 
          onClick={() => setSettingsOpen(!settingsOpen)}
          aria-label="Toggle settings"
          className={`p-2.5 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-sm transition-all hover:bg-slate-50 active:scale-95 ${settingsOpen ? 'text-indigo-600 ring-4 ring-indigo-50/50' : 'text-slate-500'}`}
        >
          <Settings size={22} />
        </button>

        {settingsOpen && (
          <div className="mt-2 w-72 bg-white/95 backdrop-blur-md border border-slate-200 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-5 animate-in fade-in zoom-in slide-in-from-top-4 duration-200 origin-top-right">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-black tracking-tight text-slate-800">Quick Tools</span>
                <X size={18} className="text-slate-400 cursor-pointer hover:text-slate-600" onClick={() => setSettingsOpen(false)} />
              </div>
              
              <div className="space-y-3 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-[13px] font-bold text-slate-700">Show Axes</span>
                  <div className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${showAxes ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${showAxes ? 'translate-x-4' : ''}`} />
                  </div>
                  <input type="checkbox" className="hidden" checked={showAxes} onChange={e => setShowAxes(e.target.checked)} />
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-[13px] font-bold text-slate-700">Show Grid</span>
                  <div className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${showGrid ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transition-transform ${showGrid ? 'translate-x-4' : ''}`} />
                  </div>
                  <input type="checkbox" className="hidden" checked={showGrid} onChange={e => setShowGrid(e.target.checked)} />
                </label>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                   <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Grid Style</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {(['full', 'major', 'dots', 'none'] as const).map(s => (
                    <button 
                      key={s}
                      onClick={() => setGridStyle(s)}
                      className={`h-11 border rounded-xl flex items-center justify-center transition-all ${gridStyle === s ? 'border-indigo-500 bg-indigo-50 text-indigo-600 scale-105' : 'border-slate-100 hover:border-slate-300 text-slate-400 hover:bg-slate-50'}`}
                      title={s.toUpperCase()}
                    >
                      {s === 'full' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
                        </svg>
                      )}
                      {s === 'major' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <path d="M3 12h18M12 3v18" />
                        </svg>
                      )}
                      {s === 'dots' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                          <circle cx="8" cy="8" r="0.5" fill="currentColor" />
                          <circle cx="12" cy="8" r="0.5" fill="currentColor" />
                          <circle cx="16" cy="8" r="0.5" fill="currentColor" />
                          <circle cx="8" cy="12" r="0.5" fill="currentColor" />
                          <circle cx="12" cy="12" r="0.5" fill="currentColor" />
                          <circle cx="16" cy="12" r="0.5" fill="currentColor" />
                          <circle cx="8" cy="16" r="0.5" fill="currentColor" />
                          <circle cx="12" cy="16" r="0.5" fill="currentColor" />
                          <circle cx="16" cy="16" r="0.5" fill="currentColor" />
                        </svg>
                      )}
                      {s === 'none' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <Link href="/engineering/graphing/" className="block text-center py-2.5 text-indigo-600 text-[13px] font-black hover:bg-indigo-50 rounded-xl transition-all border border-indigo-50 mt-2">
                Open advanced settings
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Control Cluster (Bottom Right) */}
      <div className="absolute bottom-24 lg:bottom-6 right-4 lg:right-6 z-20 flex flex-col gap-2 lg:gap-3">
        <button onClick={toggleFullscreen} aria-label="Toggle fullscreen" className="p-3.5 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-full shadow-sm text-slate-600 hover:text-indigo-600 hover:scale-110 active:scale-95 transition-all">
          <Maximize size={22} />
        </button>
        <div className="flex flex-col gap-[2px] bg-slate-200 border border-slate-200 rounded-[1.5rem] shadow-sm overflow-hidden">
          <button onClick={() => zoomBy(0.85)} aria-label="Zoom in" className="p-3.5 bg-white hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors" title="Zoom In">
            <Plus size={22} />
          </button>
          <button onClick={() => zoomBy(1.15)} aria-label="Zoom out" className="p-3.5 bg-white hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors" title="Zoom Out">
            <Minus size={22} />
          </button>
        </div>
        <button onClick={() => { view.current = { xMin: -10, xMax: 10, yMin: -7, yMax: 7 }; draw(); }} aria-label="Recenter graph" className="p-3.5 bg-white border border-slate-200 rounded-full shadow-sm text-slate-600 hover:text-indigo-600 transition-all hover:scale-110 active:scale-90" title="Recentre">
          <Home size={22} />
        </button>
      </div>

      {/* Interaction Stage */}
      <div ref={wrapRef} className="flex-1 relative bg-white">
        <canvas
          ref={canvasRef}
          className={`block w-full h-full touch-none select-none ${dragRef.current.active ? 'cursor-grabbing' : 'cursor-crosshair'}`}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        />
        
        {/* Adaptive Status Pill */}
        <div className="absolute bottom-24 lg:bottom-6 left-4 lg:left-6 p-3 lg:p-4 bg-white/90 backdrop-blur-md border border-slate-200 rounded-[1.25rem] lg:rounded-[1.5rem] shadow-sm max-w-[180px] lg:max-w-[220px]">
          <div className="flex items-center gap-2 mb-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${expression ? 'bg-indigo-500 animate-pulse' : 'bg-slate-300'}`} />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Precision Plotter</span>
          </div>
          <div className="text-[15px] font-black text-slate-800 truncate tracking-tight">
            y = <span className="text-indigo-600">{expression || 'sin(x)'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
