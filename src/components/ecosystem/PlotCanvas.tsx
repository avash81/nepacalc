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

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      // Use device pixel ratio for retina displays to map perfectly crisp lines
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
    handleResize(); // Initial setup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main Render Loop
  const renderGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get display dimension (not internal buffer dimension)
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const cw = rect.width;
    const ch = rect.height;

    ctx.clearRect(0, 0, cw, ch);

    // Calculate Grid parameters
    const zoom = camera.zoom;      // Pixels per 1 mathematical unit
    const cx = cw / 2 + camera.x;  // Center X in pixels
    const cy = ch / 2 + camera.y;  // Center Y in pixels (y reversed mathematically)

    // Helper functions: math <-> pixel
    const toScreenX = (mathX: number) => cx + mathX * zoom;
    const toScreenY = (mathY: number) => cy - mathY * zoom; // Invert Y
    const toMathX = (screenX: number) => (screenX - cx) / zoom;
    const toMathY = (screenY: number) => (cy - screenY) / zoom;

    // --- DRAW BACKGROUND GRID ---
    ctx.lineWidth = 1;
    const startX = Math.floor(toMathX(0));
    const endX = Math.ceil(toMathX(cw));
    const startY = Math.floor(toMathY(ch));
    const endY = Math.ceil(toMathY(0));

    // Determine grid step based on zoom
    let step = 1;
    if (zoom > 100) step = 0.5;
    if (zoom > 200) step = 0.1;
    if (zoom < 30) step = 5;
    if (zoom < 10) step = 10;
    if (zoom < 2) step = 50;

    ctx.strokeStyle = '#f0f0f0'; // Minor grid lines
    ctx.beginPath();
    // Vertical lines
    for (let x = Math.floor(startX / step) * step; x <= endX; x += step) {
      const sx = toScreenX(x);
      ctx.moveTo(Math.floor(sx) + 0.5, 0);
      ctx.lineTo(Math.floor(sx) + 0.5, ch);
    }
    // Horizontal lines
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
    
    // Y-Axis
    const screenXZero = toScreenX(0);
    if (screenXZero >= 0 && screenXZero <= cw) {
       ctx.moveTo(Math.floor(screenXZero) + 0.5, 0);
       ctx.lineTo(Math.floor(screenXZero) + 0.5, ch);
    }
    // X-Axis
    const screenYZero = toScreenY(0);
    if (screenYZero >= 0 && screenYZero <= ch) {
       ctx.moveTo(0, Math.floor(screenYZero) + 0.5);
       ctx.lineTo(cw, Math.floor(screenYZero) + 0.5);
    }
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#666666';
    ctx.font = '12px var(--font-inter, sans-serif)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    for (let x = Math.floor(startX / step) * step; x <= endX; x += step) {
      if (Math.abs(x) < 0.0001) continue; // Skip 0
      const sx = toScreenX(x);
      ctx.fillText(Number.isInteger(x) ? x.toString() : x.toFixed(1), sx, Math.min(Math.max(screenYZero + 5, 5), ch - 20));
    }
    
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let y = Math.floor(startY / step) * step; y <= endY; y += step) {
      if (Math.abs(y) < 0.0001) continue; // Skip 0
      const sy = toScreenY(y);
      ctx.fillText(Number.isInteger(y) ? y.toString() : y.toFixed(1), Math.min(Math.max(screenXZero - 5, 20), cw - 5), sy);
    }

    // --- DRAW EXPRESSIONS ---
    // We increase resolution directly tied to canvas width (e.g., 2 points per pixel)
    const pointsPerPixel = 1;
    const stepMath = (toMathX(cw) - toMathX(0)) / (cw * pointsPerPixel);

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    expressions.forEach(exp => {
       if (!exp.isVisible || !exp.latex.trim()) return;

       // Attempt to compile the expression once for massive performance boost
       let compiled: math.EvalFunction;
       try {
          // Replace common latex sequences safely
          let sanitized = exp.latex
            .replace(/\\sin/g, 'sin')
            .replace(/\\cos/g, 'cos')
            .replace(/\\tan/g, 'tan')
            .replace(/\\sqrt/g, 'sqrt')
            .replace(/\\pi/g, 'pi');
            
          // If equation has 'y = ...', strip it. E.g., 'y=x^2' -> 'x^2'
          if (sanitized.includes('=')) {
             const parts = sanitized.split('=');
             sanitized = parts[1].trim();
          }

          const node = math.parse(sanitized);
          compiled = node.compile();
       } catch (e) {
          // Syntax error while typing, silently fail rendering this frame
          return; 
       }

       ctx.strokeStyle = exp.color;
       ctx.lineWidth = 2.5; // Desmos thick lines
       ctx.beginPath();

       let isDrawing = false;

       for (let px = 0; px <= cw * pointsPerPixel; px++) {
         const mathX = startX + px * stepMath;
         
         try {
            const mathY = compiled.evaluate({ x: mathX });

            // Handle Imaginary/NaN Returns (e.g. sqrt(-x))
            if (typeof mathY !== 'number' || isNaN(mathY) || !isFinite(mathY)) {
               isDrawing = false;
               continue;
            }

            const sy = toScreenY(mathY);
            
            // Asymptote detection (don't draw vertical line from +Infinity to -Infinity like 1/x)
            if (isDrawing) {
               ctx.lineTo(toScreenX(mathX), sy);
            } else {
               ctx.moveTo(toScreenX(mathX), sy);
            }
            isDrawing = true;

         } catch (e) {
            isDrawing = false;
         }
       }
       ctx.stroke();
    });

  }, [expressions, camera]);

  // Trigger render anytime dependencies change
  useEffect(() => {
    renderGraph();
  }, [renderGraph]);

  // --- PAN & ZOOM LOGIC ---
  const handleWheel = (e: React.WheelEvent) => {
    // Determine target zoom
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1; // 10% zoom per tick
    
    setCamera(prev => {
       // Math tracking: mouse position relative to center shouldn't physically shift the math coordinate under cursor
       const nextZoom = Math.max(1, Math.min(prev.zoom * zoomFactor, 2000));
       
       // Calculate cursor offset from center
       const rect = containerRef.current?.getBoundingClientRect();
       if (!rect) return prev;
       
       const mouseX = e.clientX - rect.left - rect.width / 2;
       const mouseY = e.clientY - rect.top - rect.height / 2;

       // Complex pan adjustment keeping mouse coordinate static
       const scaleRatio = nextZoom / prev.zoom;
       const nextX = mouseX - (mouseX - prev.x) * scaleRatio;
       const nextY = mouseY - (mouseY - prev.y) * scaleRatio;

       return { ...prev, zoom: nextZoom, x: nextX, y: nextY };
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only left click pan
    if (e.button !== 0) return;
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId); // Ensure move goes outside
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;
    setLastMouse({ x: e.clientX, y: e.clientY });

    setCamera(prev => ({
      ...prev,
      x: prev.x + dx,
      y: prev.y + dy // Raw pixel deltas map directly to camera X/Y since camera X/Y is pixel-based center offsets
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative touch-none"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 outline-none"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      />
    </div>
  );
}
