'use client';

import { ExpressionItem } from './GraphApp';
import { Settings, Plus, AlignLeft } from 'lucide-react';

interface ExpressionDrawerProps {
  expressions: ExpressionItem[];
  onUpdate: (id: string, newLatex: string) => void;
  onToggle: (id: string) => void;
  onAdd: () => void;
}

export function ExpressionDrawer({ expressions, onUpdate, onToggle, onAdd }: ExpressionDrawerProps) {
  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-[#f9f9f9]">
        <div className="flex items-center gap-2">
           <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500 transition-colors">
              <Plus className="w-4 h-4" />
           </button>
           <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500 transition-colors hidden sm:block">
              <AlignLeft className="w-4 h-4" />
           </button>
        </div>
        <button className="p-1.5 hover:bg-gray-200 rounded text-gray-400 transition-colors">
           <Settings className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {expressions.map((exp, index) => (
          <div key={exp.id} className="group flex relative border-b border-gray-100 bg-white hover:bg-[#fbfbfb] min-h-[56px] transition-colors">
             
             {/* Left Column: Line Number & Color Circle */}
             <div className="w-[50px] shrink-0 border-r border-gray-100 flex flex-col items-center pt-4 relative bg-[#fdfdfd] group-hover:bg-[#f7f7f7] transition-colors cursor-pointer" onClick={() => onToggle(exp.id)}>
                <span className="absolute top-1 left-1.5 text-[9px] font-bold text-gray-300 group-hover:text-gray-400">
                  {index + 1}
                </span>
                <div 
                  className={`w-5 h-5 rounded-full border-[3px] flex items-center justify-center transition-all ${exp.isVisible ? 'opacity-100' : 'opacity-30'}`}
                  style={{ borderColor: exp.color }}
                >
                  {exp.isVisible && (
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: exp.color }} />
                  )}
                </div>
             </div>

             {/* Right Column: Input Field */}
             <div className="flex-1 min-w-0 p-3 flex flex-col justify-center relative cursor-text">
                {/* MathQuill Placeholder: For now utilizing a standard text input mapped to LaTeX style font */}
                <input
                  type="text"
                  value={exp.latex}
                  onChange={(e) => onUpdate(exp.id, e.target.value)}
                  placeholder=""
                  className="w-full bg-transparent outline-none font-serif text-xl tracking-wider text-slate-800 placeholder:text-gray-200 font-bold"
                  style={{ minHeight: '30px' }}
                />
             </div>
          </div>
        ))}

        {/* Ghost Row for empty state / adding */}
        <div 
          className="flex border-b border-gray-100 bg-white hover:bg-gray-50 min-h-[56px] cursor-pointer transition-colors"
          onClick={onAdd}
        >
          <div className="w-[50px] shrink-0 border-r border-gray-100 flex items-center justify-center bg-[#fdfdfd]">
            <span className="text-[9px] font-bold text-gray-300">{expressions.length + 1}</span>
          </div>
          <div className="flex-1 p-3 flex items-center">
             <span className="text-gray-300 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
               Click to add expression
             </span>
          </div>
        </div>
      </div>
    </div>
  );
}
