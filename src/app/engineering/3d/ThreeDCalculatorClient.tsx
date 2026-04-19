'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';

/* ── Evaluate z = f(x, y) ──────────────────────────────────── */
function evalZ(raw: string, x: number, y: number): number | null {
  try {
    if (!raw.trim()) return null;
    let e = raw.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-')
      .replace(/π/g, String(Math.PI)).replace(/\be\b/g, String(Math.E))
      .replace(/\bx\b/g, `(${x})`).replace(/\by\b/g, `(${y})`);
    e = e.replace(/sin\(/g,'Math.sin(').replace(/cos\(/g,'Math.cos(').replace(/tan\(/g,'Math.tan(')
      .replace(/sqrt\(/g,'Math.sqrt(').replace(/log\(/g,'Math.log10(').replace(/ln\(/g,'Math.log(')
      .replace(/abs\(/g,'Math.abs(').replace(/\^/g,'**');
    const open = (e.match(/\(/g)||[]).length, close = (e.match(/\)/g)||[]).length;
    e += ')'.repeat(Math.max(0, open - close));
    const r = new Function(`"use strict"; return (${e})`)();
    return typeof r === 'number' && isFinite(r) ? r : null;
  } catch { return null; }
}

/* ── 3D projection helpers ──────────────────────────────────── */
function project(x: number, y: number, z: number, rotX: number, rotZ: number, scale: number, cx: number, cy: number) {
  // Rotate around Z
  const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);
  let x1 = x * cosZ - y * sinZ, y1 = x * sinZ + y * cosZ, z1 = z;
  // Rotate around X
  const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
  const y2 = y1 * cosX - z1 * sinX, z2 = y1 * sinX + z1 * cosX;
  // Simple perspective
  const perspective = 5 / (5 + y2 * 0.15);
  return { px: cx + x1 * scale * perspective, py: cy - z2 * scale * perspective, depth: y2 };
}

const PRESETS = [
  { name: 'Paraboloid', expr: 'x^2 + y^2' },
  { name: 'Saddle', expr: 'x^2 - y^2' },
  { name: 'Wave', expr: 'sin(x) * cos(y)' },
  { name: 'Ripple', expr: 'sin(sqrt(x^2 + y^2))' },
  { name: 'Peaks', expr: '3*(1-x)^2*e^(-(x^2)-(y+1)^2)' },
  { name: 'Cone', expr: 'sqrt(x^2 + y^2)' },
];

export default function ThreeDCalculatorClient() {
  const [expr, setExpr] = useState('sin(sqrt(x^2 + y^2))');
  const [wireframe, setWireframe] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rotRef = useRef({ rotX: 0.8, rotZ: 0.6 });
  const dragRef = useRef({ active: false, lx: 0, ly: 0 });
  const scaleRef = useRef(28);
  const raf = useRef(0);

  const draw = useCallback(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d'); if (!ctx) return;
    const rect = c.parentElement?.getBoundingClientRect();
    const W = rect?.width || 800, H = rect?.height || 600;
    const dpr = window.devicePixelRatio || 1;
    if (c.width !== Math.round(W*dpr) || c.height !== Math.round(H*dpr)) { c.width = Math.round(W*dpr); c.height = Math.round(H*dpr); }
    c.style.width = W+'px'; c.style.height = H+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.fillStyle = '#0f172a'; ctx.fillRect(0,0,W,H);

    const { rotX, rotZ } = rotRef.current;
    const scale = scaleRef.current;
    const cx = W / 2, cy = H / 2;
    const RANGE = 5, RES = 40;
    const step = (RANGE * 2) / RES;

    // Generate grid points
    const grid: { x: number; y: number; z: number | null }[][] = [];
    for (let i = 0; i <= RES; i++) {
      grid[i] = [];
      for (let j = 0; j <= RES; j++) {
        const x = -RANGE + i * step, y = -RANGE + j * step;
        grid[i][j] = { x, y, z: evalZ(expr, x, y) };
      }
    }

    // Draw axes
    const axes = [
      { from: [0,0,0], to: [6,0,0], color: '#ef4444', label: 'X' },
      { from: [0,0,0], to: [0,6,0], color: '#22c55e', label: 'Y' },
      { from: [0,0,0], to: [0,0,6], color: '#3b82f6', label: 'Z' },
    ];
    axes.forEach(a => {
      const p1 = project(a.from[0],a.from[1],a.from[2],rotX,rotZ,scale,cx,cy);
      const p2 = project(a.to[0],a.to[1],a.to[2],rotX,rotZ,scale,cx,cy);
      ctx.strokeStyle = a.color; ctx.lineWidth = 2; ctx.beginPath();
      ctx.moveTo(p1.px, p1.py); ctx.lineTo(p2.px, p2.py); ctx.stroke();
      ctx.fillStyle = a.color; ctx.font = 'bold 14px Inter,system-ui';
      ctx.fillText(a.label, p2.px + 8, p2.py - 4);
    });

    if (wireframe) {
      // Wireframe: draw grid lines
      ctx.strokeStyle = 'rgba(67,97,238,0.5)'; ctx.lineWidth = 0.8;
      // rows
      for (let i = 0; i <= RES; i++) {
        ctx.beginPath(); let pen = false;
        for (let j = 0; j <= RES; j++) {
          const p = grid[i][j]; if (p.z === null) { pen = false; continue; }
          const { px, py } = project(p.x, p.y, p.z, rotX, rotZ, scale, cx, cy);
          if (!pen) { ctx.moveTo(px, py); pen = true; } else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      // cols
      for (let j = 0; j <= RES; j++) {
        ctx.beginPath(); let pen = false;
        for (let i = 0; i <= RES; i++) {
          const p = grid[i][j]; if (p.z === null) { pen = false; continue; }
          const { px, py } = project(p.x, p.y, p.z, rotX, rotZ, scale, cx, cy);
          if (!pen) { ctx.moveTo(px, py); pen = true; } else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
    } else {
      // Solid: draw filled quads with depth-based coloring
      const quads: { depth: number; pts: {px:number;py:number}[]; z: number }[] = [];
      for (let i = 0; i < RES; i++) {
        for (let j = 0; j < RES; j++) {
          const p00 = grid[i][j], p10 = grid[i+1][j], p11 = grid[i+1][j+1], p01 = grid[i][j+1];
          if (p00.z===null||p10.z===null||p11.z===null||p01.z===null) continue;
          const corners = [
            project(p00.x,p00.y,p00.z,rotX,rotZ,scale,cx,cy),
            project(p10.x,p10.y,p10.z,rotX,rotZ,scale,cx,cy),
            project(p11.x,p11.y,p11.z,rotX,rotZ,scale,cx,cy),
            project(p01.x,p01.y,p01.z,rotX,rotZ,scale,cx,cy),
          ];
          const avgDepth = corners.reduce((s,c) => s+c.depth, 0) / 4;
          const avgZ = (p00.z + p10.z + p11.z + p01.z) / 4;
          quads.push({ depth: avgDepth, pts: corners, z: avgZ });
        }
      }
      // Sort by depth (painter's algorithm)
      quads.sort((a, b) => a.depth - b.depth);
      quads.forEach(q => {
        // Color based on height
        const t = Math.max(0, Math.min(1, (q.z + 3) / 6));
        const r = Math.round(67 + t * 180), g = Math.round(97 - t * 50), b = Math.round(238 - t * 100);
        ctx.fillStyle = `rgba(${r},${g},${b},0.85)`;
        ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(q.pts[0].px, q.pts[0].py);
        q.pts.forEach(p => ctx.lineTo(p.px, p.py));
        ctx.closePath(); ctx.fill(); ctx.stroke();
      });
    }

    // Expression label
    ctx.fillStyle = '#94a3b8'; ctx.font = '12px Inter,system-ui'; ctx.textAlign = 'left';
    ctx.fillText(`z = ${expr || '?'}`, 16, H - 16);
  }, [expr, wireframe]);

  useEffect(() => { const w = wrapRef.current; if (!w) return; const obs = new ResizeObserver(() => { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(draw); }); obs.observe(w); return () => obs.disconnect(); }, [draw]);
  useEffect(() => { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(draw); }, [draw]);

  // Orbit drag
  const onMD = (e: React.MouseEvent) => { dragRef.current = { active: true, lx: e.clientX, ly: e.clientY }; };
  const onMM = (e: React.MouseEvent) => {
    if (!dragRef.current.active) return;
    rotRef.current.rotZ += (e.clientX - dragRef.current.lx) * 0.01;
    rotRef.current.rotX += (e.clientY - dragRef.current.ly) * 0.01;
    rotRef.current.rotX = Math.max(-Math.PI/2, Math.min(Math.PI/2, rotRef.current.rotX));
    dragRef.current.lx = e.clientX; dragRef.current.ly = e.clientY;
    cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(draw);
  };
  const onMU = () => { dragRef.current.active = false; };

  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    scaleRef.current *= e.deltaY > 0 ? 0.92 : 1.08;
    scaleRef.current = Math.max(5, Math.min(100, scaleRef.current));
    cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(draw);
  }, [draw]);
  useEffect(() => { const c = canvasRef.current; if (!c) return; c.addEventListener('wheel', onWheel, { passive: false }); return () => c.removeEventListener('wheel', onWheel); }, [onWheel]);

  // Touch orbit
  const tRef = useRef<{x:number;y:number}|null>(null);
  const onTS = (e: React.TouchEvent) => { if (e.touches.length===1) tRef.current = {x:e.touches[0].clientX,y:e.touches[0].clientY}; };
  const onTM = (e: React.TouchEvent) => {
    e.preventDefault(); if (!tRef.current||e.touches.length!==1) return;
    const t = e.touches[0];
    rotRef.current.rotZ += (t.clientX-tRef.current.x)*0.01;
    rotRef.current.rotX = Math.max(-Math.PI/2, Math.min(Math.PI/2, rotRef.current.rotX + (t.clientY-tRef.current.y)*0.01));
    tRef.current = {x:t.clientX,y:t.clientY};
    cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(draw);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] pt-16">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <nav className="text-[11px] font-medium text-slate-500">
          <Link href="/" className="hover:text-blue-400">Home</Link><span className="mx-1.5">›</span>
          <Link href="/engineering" className="hover:text-blue-400">Engineering</Link><span className="mx-1.5">›</span>
          <span className="text-slate-300">3D Calculator</span>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-0" style={{ height: 'calc(100vh - 120px)' }}>
        {/* Sidebar */}
        <div className="w-full lg:w-[300px] flex-shrink-0 bg-[#1e293b] border border-slate-700 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-700">
            <h1 className="text-[15px] font-bold text-white mb-3">🧊 3D Calculator</h1>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-mono text-slate-400">z =</span>
              <input type="text" value={expr} onChange={e => setExpr(e.target.value)} className="w-full pl-9 pr-3 py-2.5 text-[13px] font-mono rounded-xl bg-[#0f172a] border border-slate-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="x^2 + y^2" />
            </div>
          </div>
          <div className="p-4 space-y-3">
            <label className="flex items-center gap-3 text-[13px] text-slate-300 cursor-pointer">
              <input type="checkbox" checked={wireframe} onChange={e => setWireframe(e.target.checked)} className="accent-blue-500 w-4 h-4" />
              Wireframe mode
            </label>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-4 mb-2">Presets</div>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map(p => (
                <button key={p.name} onClick={() => setExpr(p.expr)} className="px-3 py-2 rounded-lg text-[11px] font-medium bg-[#0f172a] text-slate-300 border border-slate-600 hover:border-blue-500 hover:text-blue-400 transition-all text-left truncate">
                  {p.name}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-auto p-3 border-t border-slate-700 text-[10px] text-slate-500">
            <strong>Variables:</strong> x, y &nbsp;·&nbsp; <strong>Functions:</strong> sin, cos, tan, sqrt, log, ln, abs
          </div>
        </div>
        {/* Canvas */}
        <div ref={wrapRef} className="flex-1 relative border border-l-0 border-slate-700 rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none overflow-hidden">
          <canvas ref={canvasRef} style={{ display:'block',width:'100%',height:'100%',cursor:dragRef.current.active?'grabbing':'grab',touchAction:'none' }}
            onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onMU}
            onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={()=>{tRef.current=null;}} />
          <div className="absolute bottom-4 right-4 text-[10px] text-slate-600 pointer-events-none">drag to orbit · scroll to zoom</div>
        </div>
      </div>
    </div>
  );
}
