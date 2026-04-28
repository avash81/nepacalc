'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as math from 'mathjs';
import { ExpressionItem, CameraState } from './GraphApp';

interface PlotCanvasProps {
  expressions: ExpressionItem[];
  camera: CameraState;
  setCamera: React.Dispatch<React.SetStateAction<CameraState>>;
}

export function PlotCanvas({ expressions, camera, setCamera }: PlotCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  // Main Render Loop - Defined before effects
  const renderGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const cw = rect.width;
    const ch = rect.height;

    ctx.clearRect(0, 0, cw, ch);

    const zoom = camera.zoom;
    const cx = cw / 2 + camera.x;
    const cy = ch / 2 + camera.y;

    const toScreenX = (mathX: number) => cx + mathX * zoom;
    const toScreenY = (mathY: number) => cy - mathY * zoom;
    const toMathX = (screenX: number) => (screenX - cx) / zoom;
    const toMathY = (screenY: number) => (cy - screenY) / zoom;

    // Grid
    ctx.lineWidth = 1;
    const startX = Math.floor(toMathX(0));
    const endX = Math.ceil(toMathX(cw));
    const startY = Math.floor(toMathY(ch));
    const endY = Math.ceil(toMathY(0));

    let step = 1;
    if (zoom > 100) step = 0.5;
    if (zoom > 200) step = 0.1;
    if (zoom < 30) step = 5;
    if (zoom < 10) step = 10;
    if (zoom < 2) step = 50;

    ctx.strokeStyle = '#f0f0f0';
    ctx.beginPath();
    for (let x = Math.floor(startX / step) * step; x <= endX; x += step) {
      const sx = toScreenX(x);
      ctx.moveTo(Math.floor(sx) + 0.5, 0);
      ctx.lineTo(Math.floor(sx) + 0.5, ch);
    }
    for (let y = Math.floor(startY / step) * step; y <= endY; y += step) {
      const sy = toScreenY(y);
      ctx.moveTo(0, Math.floor(sy) + 0.5);
      ctx.lineTo(cw, Math.floor(sy) + 0.5);
    }
    ctx.stroke();

    // Axes
    ctx.strokeStyle = '#aaaaaa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const sX0 = toScreenX(0);
    if (sX0 >= 0 && sX0 <= cw) {
       ctx.moveTo(Math.floor(sX0) + 0.5, 0);
       ctx.lineTo(Math.floor(sX0) + 0.5, ch);
    }
    const sY0 = toScreenY(0);
    if (sY0 >= 0 && sY0 <= ch) {
       ctx.moveTo(0, Math.floor(sY0) + 0.5);
       ctx.lineTo(cw, Math.floor(sY0) + 0.5);
    }
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#666666';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let x = Math.floor(startX / step) * step; x <= endX; x += step) {
      if (Math.abs(x) < 0.0001) continue;
      ctx.fillText(Number.isInteger(x) ? x.toString() : x.toFixed(1), toScreenX(x), Math.min(Math.max(sY0 + 5, 5), ch - 20));
    }
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let y = Math.floor(startY / step) * step; y <= endY; y += step) {
      if (Math.abs(y) < 0.0001) continue;
      ctx.fillText(Number.isInteger(y) ? y.toString() : y.toFixed(1), Math.min(Math.max(sX0 - 5, 20), cw - 5), toScreenY(y));
    }

    // Expressions
    const stepMath = (toMathX(cw) - toMathX(0)) / cw;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    expressions.forEach(exp => {
       if (!exp.isVisible || !exp.latex.trim()) return;
       try {
          let sanitized = exp.latex.replace(/\\sin/g, 'sin').replace(/\\cos/g, 'cos').replace(/\\tan/g, 'tan').replace(/\\sqrt/g, 'sqrt').replace(/\\pi/g, 'pi');
          if (sanitized.includes('=')) sanitized = sanitized.split('=')[1].trim();
          const compiled = math.parse(sanitized).compile();

          ctx.strokeStyle = exp.color;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          let drawing = false;

          for (let px = 0; px <= cw; px++) {
            const mx = startX + px * stepMath;
            try {
               const my = compiled.evaluate({ x: mx });
               if (typeof my !== 'number' || isNaN(my) || !isFinite(my)) { drawing = false; continue; }
               const sy = toScreenY(my);
               if (drawing) ctx.lineTo(toScreenX(mx), sy);
               else ctx.moveTo(toScreenX(mx), sy);
               drawing = true;
            } catch { drawing = false; }
          }
          ctx.stroke();
       } catch { /* skip invalid expressions */ }
    });
  }, [expressions, camera]);

  // Handle Resize - Safe to use renderGraph
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvasRef.current.width = width * dpr;
      canvasRef.current.height = height * dpr;
      canvasRef.current.style.width = `${width}px`;
      canvasRef.current.style.height = `${height}px`;
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
      renderGraph();
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [renderGraph]);

  // Trigger render
  useEffect(() => {
    renderGraph();
  }, [renderGraph]);

  // Interaction handlers
  const handleWheel = (e: React.WheelEvent) => {
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    setCamera(prev => {
       const nextZoom = Math.max(1, Math.min(prev.zoom * factor, 2000));
       const rect = containerRef.current?.getBoundingClientRect();
       if (!rect) return prev;
       const mouseX = e.clientX - rect.left - rect.width / 2;
       const mouseY = e.clientY - rect.top - rect.height / 2;
       const ratio = nextZoom / prev.zoom;
       return { ...prev, zoom: nextZoom, x: mouseX - (mouseX - prev.x) * ratio, y: mouseY - (mouseY - prev.y) * ratio };
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;
    setLastMouse({ x: e.clientX, y: e.clientY });
    setCamera(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div ref={containerRef} className="w-full h-full relative touch-none" onWheel={handleWheel} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}>
      <canvas ref={canvasRef} className="absolute top-0 left-0 outline-none" style={{ cursor: isDragging ? 'grabbing' : 'grab' }} />
    </div>
  );
}
