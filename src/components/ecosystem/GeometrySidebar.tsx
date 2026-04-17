'use client';

import { useState } from 'react';
import { GeoObject, GeoPoint } from './GeometryApp';
import { Plus, Trash2, Link as LinkIcon, Circle as CircleIcon, MousePointer2 } from 'lucide-react';

interface GeometrySidebarProps {
  objects: GeoObject[];
  onAddPoint: () => void;
  onAddSegment: (p1: string, p2: string) => void;
  onAddCircle: (center: string, radiusPoint: string) => void;
  onDelete: (id: string) => void;
}

export function GeometrySidebar({ objects, onAddPoint, onAddSegment, onAddCircle, onDelete }: GeometrySidebarProps) {
  const [activeMode, setActiveMode] = useState<'move' | 'segment' | 'circle'>('move');
  const [selection, setSelection] = useState<string[]>([]);

  const points = objects.filter(o => o.type === 'point') as GeoPoint[];

  const handlePointClick = (id: string) => {
    if (activeMode === 'move') return;

    const newSelection = [...selection, id];
    if (activeMode === 'segment' && newSelection.length === 2) {
       onAddSegment(newSelection[0], newSelection[1]);
       setSelection([]);
       setActiveMode('move');
    } else if (activeMode === 'circle' && newSelection.length === 2) {
       onAddCircle(newSelection[0], newSelection[1]);
       setSelection([]);
       setActiveMode('move');
    } else {
       setSelection(newSelection);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 border-r border-slate-200 shadow-xl overflow-hidden">
      
      {/* Header Toolbar */}
      <div className="p-3 border-b border-slate-200 bg-white shadow-sm flex items-center justify-between">
         <div className="flex gap-1.5">
            <button 
              onClick={() => { setActiveMode('move'); setSelection([]); }}
              className={`p-2 rounded transition-all ${activeMode === 'move' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-100 text-slate-400'}`}
              title="Move Tool"
            >
               <MousePointer2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => { setActiveMode('segment'); setSelection([]); }}
              className={`p-2 rounded transition-all ${activeMode === 'segment' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-100 text-slate-400'}`}
              title="Segment Tool"
            >
               <LinkIcon className="w-4 h-4" />
            </button>
            <button 
              onClick={() => { setActiveMode('circle'); setSelection([]); }}
              className={`p-2 rounded transition-all ${activeMode === 'circle' ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-100 text-slate-400'}`}
              title="Circle Tool"
            >
               <CircleIcon className="w-4 h-4" />
            </button>
         </div>
         <button 
            onClick={onAddPoint}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 text-xs font-black uppercase tracking-widest transition-all"
         >
            <Plus className="w-3.5 h-3.5" /> Point
         </button>
      </div>

      {/* Mode Status Bar */}
      {activeMode !== 'move' && (
        <div className="bg-indigo-600 text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest animate-pulse flex justify-between items-center">
           <span>
             {activeMode === 'segment' ? 'Select two points to draw segment' : 'Select center then radius point'}
             {selection.length > 0 && ` (${selection.length}/2)`}
           </span>
           <button onClick={() => { setActiveMode('move'); setSelection([]); }} className="underline">Cancel</button>
        </div>
      )}

      {/* Object List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
         
         <section>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Vertices</h3>
            <div className="space-y-1">
               {points.map(p => (
                 <div 
                    key={p.id} 
                    className={`group flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl transition-all cursor-pointer ${selection.includes(p.id) ? 'ring-2 ring-indigo-500 border-indigo-200' : 'hover:border-slate-300'}`}
                    onClick={() => handlePointClick(p.id)}
                 >
                    <div className="flex items-center gap-3">
                       <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold" style={{ borderColor: p.color, color: p.color }}>
                          {p.name}
                       </div>
                       <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-700">Point {p.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({p.x.toFixed(2)}, {p.y.toFixed(2)})</span>
                       </div>
                    </div>
                    <button 
                       onClick={(e) => { e.stopPropagation(); onDelete(p.id); }}
                       className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-300 hover:text-red-500 transition-all"
                    >
                       <Trash2 className="w-3.5 h-3.5" />
                    </button>
                 </div>
               ))}
            </div>
         </section>

         <section>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Constructions</h3>
            <div className="space-y-1">
               {objects.filter(o => o.type !== 'point').map(o => (
                  <div key={o.id} className="group flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-all">
                     <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center text-slate-500">
                           {o.type === 'segment' ? <LinkIcon className="w-3 h-3" /> : <CircleIcon className="w-3 h-3" />}
                        </div>
                        <span className="text-xs font-bold text-slate-600 capitalize">
                           {o.type} 
                           {o.type === 'segment' && ` (${points.find(p => p.id === o.p1)?.name}-${points.find(p => p.id === o.p2)?.name})`}
                        </span>
                     </div>
                     <button 
                        onClick={() => onDelete(o.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-300 hover:text-red-500 transition-all"
                     >
                        <Trash2 className="w-3.5 h-3.5" />
                     </button>
                  </div>
               ))}
            </div>
         </section>

      </div>

      <div className="p-4 bg-slate-100 border-t border-slate-200 text-center">
         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NEPACALC Geometry Engine</div>
      </div>
    </div>
  );
}
