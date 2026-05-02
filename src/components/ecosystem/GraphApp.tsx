'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ExpressionDrawer } from './ExpressionDrawer';

// Dynamically import heavy plotter component to isolate mathjs bundle
const PlotCanvas = dynamic(() => import('./PlotCanvas').then(mod => mod.PlotCanvas), {
  ssr: false,
  loading: () => (
    <div className="flex-1 h-full flex items-center justify-center bg-[#fdfdfd]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#FFC107] border-t-transparent rounded-full animate-spin" />
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Initializing Core...</span>
      </div>
    </div>
  )
});

export interface ExpressionItem {
  id: string;
  latex: string;
  color: string;
  isVisible: boolean;
}

export interface CameraState {
  x: number; // Center X
  y: number; // Center Y
  zoom: number; // Pixels per unit
}

const DESMOS_COLORS = [
  '#c74440', // Red
  '#2d70b3', // Blue
  '#388c46', // Green
  '#6042a6', // Purple
  '#000000', // Black
];

export function GraphApp() {
  const [expressions, setExpressions] = useState<ExpressionItem[]>([
    { id: '1', latex: '\\sin(x)', color: '#c74440', isVisible: true },
    { id: '2', latex: 'x^2, 4', color: '#2d70b3', isVisible: true },
  ]);

  const [camera, setCamera] = useState<CameraState>({
    x: 0,
    y: 0,
    zoom: 60, // Standard starting zoom: ~60px per integer unit
  });

  const addExpression = () => {
    setExpressions(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        latex: '',
        color: DESMOS_COLORS[prev.length % DESMOS_COLORS.length],
        isVisible: true
      }
    ]);
  };

  const updateExpression = (id: string, newLatex: string) => {
    setExpressions(prev => prev.map(exp => exp.id === id ? { ...exp, latex: newLatex } : exp));
  };

  const toggleVisibility = (id: string) => {
    setExpressions(prev => prev.map(exp => exp.id === id ? { ...exp, isVisible: !exp.isVisible } : exp));
  };

  return (
    <div className="w-full h-[calc(100vh-50px)] flex flex-col md:flex-row bg-[#f5f5f5] overflow-hidden">
      
      {/* 30% Left Expression Drawer */}
      <div className="w-full md:w-[320px] lg:w-[380px] h-1/2 md:h-full bg-white border-b md:border-b-0 md:border-r border-gray-300 shadow-[4px_0_12px_rgba(0,0,0,0.05)] z-20 flex flex-col">
         <ExpressionDrawer 
            expressions={expressions}
            onUpdate={updateExpression}
            onToggle={toggleVisibility}
            onAdd={addExpression}
         />
      </div>

      {/* 70% Right Plot Canvas */}
      <div className="flex-1 h-1/2 md:h-full relative overflow-hidden bg-[#fdfdfd] z-10 cursor-move">
         <PlotCanvas 
            expressions={expressions} 
            camera={camera} 
            setCamera={setCamera} 
         />
         
         {/* Zoom Controls overlay exactly like Desmos */}
         <div className="absolute top-4 right-4 flex flex-col shadow-sm rounded-lg overflow-hidden border border-gray-300 bg-white">
            <button 
              onClick={() => setCamera(p => ({ ...p, zoom: p.zoom * 1.5 }))}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-700 font-bold border-b border-gray-200"
            >
              +
            </button>
            <button 
              onClick={() => setCamera({ x: 0, y: 0, zoom: 60 })}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-500 font-bold border-b border-gray-200"
              title="Default Zoom"
            >
              ⌂
            </button>
            <button 
              onClick={() => setCamera(p => ({ ...p, zoom: p.zoom / 1.5 }))}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-700 font-bold"
            >
              −
            </button>
         </div>
      </div>

    </div>
  );
}
