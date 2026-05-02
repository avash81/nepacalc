'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';

type Tool = 'select' | 'point' | 'line' | 'circle' | 'polygon';
interface Point { id: number; x: number; y: number; label: string; }
interface Line { id: number; p1: number; p2: number; }
interface Circle { id: number; center: number; edge: number; }

const TOOL_ITEMS: { id: Tool; icon: string; name: string }[] = [
  { id: 'select', icon: '👆', name: 'Select / Move' },
  { id: 'point', icon: '●', name: 'Point' },
  { id: 'line', icon: '╱', name: 'Line Segment' },
  { id: 'circle', icon: '○', name: 'Circle' },
];

let nextPtId = 1;
let nextLineId = 1;
let nextCircleId = 1;

function dist(a: Point, b: Point) { return Math.sqrt((a.x-b.x)**2 + (a.y-b.y)**2); }

export default function GeometryCanvasClient() {
  const [tool, setTool] = useState<Tool>('point');
  const [points, setPoints] = useState<Point[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [pendingPt, setPendingPt] = useState<number | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ active: boolean; ptId: number; offX: number; offY: number }>({ active: false, ptId: 0, offX: 0, offY: 0 });
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
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0,0,W,H);

    // Grid
    if (showGrid) {
      ctx.strokeStyle = '#f1f5f9'; ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < W; x += gridSize) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += gridSize) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
    }

    // Lines
    lines.forEach(l => {
      const p1 = points.find(p => p.id === l.p1), p2 = points.find(p => p.id === l.p2);
      if (!p1 || !p2) return;
      ctx.strokeStyle = '#4361ee'; ctx.lineWidth = 2; ctx.beginPath();
      ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
      // Distance label
      const d = dist(p1, p2);
      const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
      ctx.fillStyle = '#4361ee'; ctx.font = '11px Inter,system-ui';
      ctx.textAlign = 'center'; ctx.fillText(d.toFixed(1) + ' px', mx, my, 8);
    });

    // Circles
    circles.forEach(ci => {
      const center = points.find(p => p.id === ci.center), edge = points.find(p => p.id === ci.edge);
      if (!center || !edge) return;
      const r = dist(center, edge);
      ctx.strokeStyle = '#f72585'; ctx.lineWidth = 2; ctx.beginPath();
      ctx.arc(center.x, center.y, r, 0, Math.PI * 2); ctx.stroke();
      // Radius label
      ctx.fillStyle = '#f72585'; ctx.font = '11px Inter,system-ui';
      ctx.textAlign = 'left'; ctx.fillText('r=' + r.toFixed(1), center.x + 8, center.y, r, 8);
    });

    // Points
    points.forEach(pt => {
      const isSel = selected === pt.id;
      ctx.beginPath(); ctx.arc(pt.x, pt.y, isSel ? 7 : 5, 0, Math.PI * 2);
      ctx.fillStyle = isSel ? '#f72585' : '#4361ee'; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      // Label
      ctx.fillStyle = '#202124'; ctx.font = 'bold 11px Inter,system-ui';
      ctx.textAlign = 'left'; ctx.fillText(pt.label, pt.x + 10, pt.y, 8);
      // Coordinates
      ctx.fillStyle = '#94a3b8'; ctx.font = '10px Inter,system-ui';
      ctx.fillText(`(${Math.round(pt.x)}, ${Math.round(pt.y)})`, pt.x + 10, pt.y + 6);
    });

    // Empty state
    if (points.length === 0) {
      ctx.fillStyle = '#cbd5e1'; ctx.font = 'bold 14px Inter,system-ui'; ctx.textAlign = 'center';
      ctx.fillText('Click on the canvas to place points', W/2, H/2, 10);
      ctx.font = '12px Inter,system-ui'; ctx.fillStyle = '#94a3b8';
      ctx.fillText('Then use Line or Circle tools to construct shapes', W/2, H/2 + 14);
    }
  }, [points, lines, circles, selected, showGrid]);

  useEffect(() => { const w = wrapRef.current; if (!w) return; const obs = new ResizeObserver(() => { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(draw); }); obs.observe(w); return () => obs.disconnect(); }, [draw]);
  useEffect(() => { cancelAnimationFrame(raf.current); raf.current = requestAnimationFrame(draw); }, [draw]);

  const findPointAt = (x: number, y: number): Point | undefined => {
    return points.find(p => Math.sqrt((p.x-x)**2 + (p.y-y)**2) < 12);
  };

  const handleClick = (e: React.MouseEvent) => {
    const c = canvasRef.current; if (!c) return;
    const rect = c.getBoundingClientRect();
    const x = e.clientX, rect.left, y = e.clientY, rect.top;

    if (tool === 'select') {
      const pt = findPointAt(x, y);
      setSelected(pt ? pt.id : null);
      return;
    }

    if (tool === 'point') {
      const label = String.fromCharCode(65 + points.length % 26);
      setPoints(p => [...p, { id: nextPtId++, x, y, label }]);
      return;
    }

    if (tool === 'line' || tool === 'circle') {
      let pt = findPointAt(x, y);
      if (!pt) {
        const label = String.fromCharCode(65 + points.length % 26);
        pt = { id: nextPtId++, x, y, label };
        setPoints(p => [...p, pt!]);
      }
      if (pendingPt === null) {
        setPendingPt(pt.id);
        setSelected(pt.id);
      } else {
        if (tool === 'line') setLines(l => [...l, { id: nextLineId++, p1: pendingPt!, p2: pt!.id }]);
        else setCircles(ci => [...ci, { id: nextCircleId++, center: pendingPt!, edge: pt!.id }]);
        setPendingPt(null);
        setSelected(null);
      }
      return;
    }
  };

  // Drag points
  const onMD = (e: React.MouseEvent) => {
    if (tool !== 'select') return;
    const c = canvasRef.current; if (!c) return;
    const rect = c.getBoundingClientRect();
    const x = e.clientX, rect.left, y = e.clientY, rect.top;
    const pt = findPointAt(x, y);
    if (pt) { dragRef.current = { active: true, ptId: pt.id, offX: x, pt.x, offY: y, pt.y }; setSelected(pt.id); }
  };
  const onMM = (e: React.MouseEvent) => {
    if (!dragRef.current.active) return;
    const c = canvasRef.current; if (!c) return;
    const rect = c.getBoundingClientRect();
    const x = e.clientX, rect.left, dragRef.current.offX;
    const y = e.clientY, rect.top, dragRef.current.offY;
    setPoints(pts => pts.map(p => p.id === dragRef.current.ptId ? { ...p, x, y } : p));
  };
  const onMU = () => { dragRef.current.active = false; };

  const clearAll = () => { setPoints([]); setLines([]); setCircles([]); setSelected(null); setPendingPt(null); nextPtId = 1; nextLineId = 1; nextCircleId = 1; };

  return (
    <div className="min-h-screen bg-[#fafbfc] pt-16">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <nav className="text-[11px] font-medium text-slate-400">
          <Link href="/" className="hover:text-blue-600">Home</Link><span className="mx-1.5">›</span>
          <Link href="/engineering/" className="hover:text-blue-600">Engineering</Link><span className="mx-1.5">›</span>
          <span className="text-slate-600">Geometry</span>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-0" style={{ height: 'calc(100vh, 120px)' }}>
        {/* Toolbar */}
        <div className="w-full lg:w-[240px] flex-shrink-0 bg-white border border-slate-200 rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none flex flex-col">
          <div className="p-4 border-b border-slate-100">
            <h1 className="text-[15px] font-bold text-[#202124]">📐 Geometry Canvas</h1>
          </div>
          <div className="p-3 space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Tools</div>
            {TOOL_ITEMS.map(t => (
              <button key={t.id} onClick={() => { setTool(t.id); setPendingPt(null); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${tool === t.id ? 'bg-[#4361ee] text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                <span className="text-[16px]">{t.icon}</span>{t.name}
              </button>
            ))}
          </div>
          <div className="p-3 border-t border-slate-100 space-y-2">
            <label className="flex items-center gap-3 text-[13px] text-slate-600 cursor-pointer">
              <input type="checkbox" checked={showGrid} onChange={e => setShowGrid(e.target.checked)} className="accent-[#4361ee] w-4 h-4" />
              Show Grid
            </label>
            <button onClick={clearAll} className="w-full py-2 rounded-xl text-[12px] font-bold text-red-500 bg-red-50 hover:bg-red-100 transition-colors border border-red-200">
              Clear All
            </button>
          </div>
          <div className="mt-auto p-3 border-t border-slate-100 text-[10px] text-slate-400 leading-relaxed">
            <strong>Points:</strong> {points.length} &nbsp;·&nbsp; <strong>Lines:</strong> {lines.length} &nbsp;·&nbsp; <strong>Circles:</strong> {circles.length}
            {pendingPt !== null && <div className="mt-1 text-amber-500 font-bold">Click 2nd point to complete {tool}</div>}
          </div>
        </div>
        {/* Canvas */}
        <div ref={wrapRef} className="flex-1 relative bg-white border border-l-0 border-slate-200 rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none overflow-hidden">
          <canvas ref={canvasRef}
            style={{ display:'block',width:'100%',height:'100%', cursor: tool === 'select' ? 'default' : 'crosshair', touchAction:'none' }}
            onClick={handleClick} onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onMU} />
        </div>
      </div>
    </div>
  );
}
