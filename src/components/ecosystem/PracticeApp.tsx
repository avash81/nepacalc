'use client';

import { useState, useEffect } from 'react';
import { Timer, Shield, X, ArrowRight, CheckCircle2, AlertTriangle, PlayCircle } from 'lucide-react';
import { GraphApp } from './GraphApp';
import { ScientificApp } from './ScientificApp';
import { MatrixApp } from './MatrixApp';
import { GeometryApp } from './GeometryApp';

type ToolType = 'graphing' | 'scientific' | 'matrix' | 'geometry';

export function PracticeApp() {
  const [status, setStatus] = useState<'setup' | 'practice'>('setup');
  const [tool, setTool] = useState<ToolType>('scientific');
  const [duration, setDuration] = useState(60); // minutes
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let interval: any;
    if (status === 'practice' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && status === 'practice') {
      setStatus('setup');
      alert('Practice session completed!');
    }
    return () => clearInterval(interval);
  }, [status, timeLeft]);

  const startPractice = () => {
    setTimeLeft(duration * 60);
    setStatus('practice');
    
    // Attempt request fullscreen for better immersion
    if (typeof document !== 'undefined' && (document.documentElement as any).requestFullscreen) {
       // Optional: (document.documentElement as any).requestFullscreen();
    }
  };

  const endPractice = () => {
    if (confirm('End practice session? Your progress in this focused state will be lost.')) {
      setStatus('setup');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (status === 'practice') {
     return (
        <div className="fixed inset-0 bg-white z-[500] flex flex-col no-print">
           {/* Restricted HUD */}
           <div className="h-14 bg-white border border-[#dadce0] text-[#202124] flex items-center justify-between px-6 shadow-sm">
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 px-3 py-1 bg-indigo-600 rounded-full">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-widest italic">NepaCalc Practice Mode</span>
                 </div>
                 <div className="h-4 w-px bg-slate-700" />
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Tool: {tool}</span>
              </div>

              <div className="flex items-center gap-8">
                 <div className="flex items-center gap-3">
                    <Timer className={`w-5 h-5 ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-indigo-400'}`} />
                    <span className={`text-xl font-mono font-black ${timeLeft < 300 ? 'text-red-500' : 'text-[#202124]'}`}>
                       {formatTime(timeLeft)}
                    </span>
                 </div>
                 <button 
                  onClick={endPractice}
                  className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-[#202124] px-4 py-1.5 rounded-lg border border-red-500/20 text-xs font-black uppercase tracking-widest transition-all"
                 >
                    <X className="w-4 h-4" /> Exit
                 </button>
              </div>
           </div>

           {/* Injected Content */}
           <div className="flex-1 overflow-hidden pointer-events-auto">
              {tool === 'graphing' && <GraphApp />}
              {tool === 'scientific' && <ScientificApp mode="scientific" />}
              {tool === 'matrix' && <MatrixApp />}
              {tool === 'geometry' && <GeometryApp />}
           </div>
        </div>
     );
  }

  return (
    <div className="w-full h-[calc(100vh-50px)] flex flex-col items-center justify-center bg-slate-50 p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-[40px] shadow-sm border border-slate-100 p-8 md:p-16 overflow-hidden relative">
         
         {/* Decorative Background */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
         
         {/* Left Side: Setup */}
         <div className="flex flex-col gap-8 relative z-10">
            <div>
               <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">
                  Simulated <br/> <span className="text-indigo-600">Testing Environment</span>
               </h1>
               <p className="text-slate-500 leading-relaxed font-medium">
                  Practice for the SAT, ACT, or IB exams in a distraction-free, timed workspace. 
                  This mode simulates the official NepaCalc testing boundaries.
               </p>
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Exam Duration</label>
               <div className="grid grid-cols-3 gap-2">
                  {[30, 60, 90, 120, 180].slice(0, 3).map(m => (
                     <button 
                        key={m}
                        onClick={() => setDuration(m)}
                        className={`py-3 rounded-2xl font-bold transition-all border ${duration === m ? 'bg-indigo-600 border-indigo-700 text-[#202124] shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                     >
                        {m}m
                     </button>
                  ))}
               </div>
            </div>

            <button 
               onClick={startPractice}
               className="group flex items-center justify-center gap-3 bg-white border border-[#dadce0] text-[#202124] py-5 rounded-lg font-black uppercase tracking-[0.2em] transform transition-all hover:scale-[1.02] hover:bg-slate-800 shadow-sm active:scale-95"
            >
               <PlayCircle className="w-6 h-6" />
               Start Session
               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
         </div>

         {/* Right Side: Tool Selector */}
         <div className="flex flex-col gap-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Restricted Tool Access</label>
            <div className="grid grid-cols-1 gap-2">
               {[
                  { id: 'scientific', name: 'Scientific Suite', desc: 'Standard exam configuration', icon: '🧮' },
                  { id: 'graphing', name: 'Graphing Engine', desc: 'Visual coordinate analysis', icon: '📈' },
                  { id: 'geometry', name: 'Geometric Workspace', desc: 'Euclidean constructions', icon: '📐' },
                  { id: 'matrix', name: 'Linear Algebra', desc: 'Matrix array processing', icon: '▦' },
               ].map((t) => (
                  <button 
                     key={t.id}
                     onClick={() => setTool(t.id as ToolType)}
                     className={`flex items-center gap-4 p-4 rounded-lg border transition-all text-left group ${tool === t.id ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-500/20' : 'bg-white border-slate-100 hover:border-slate-300'}`}
                  >
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all ${tool === t.id ? 'bg-white shadow' : 'bg-slate-50'}`}>
                        {t.icon}
                     </div>
                     <div className="flex-1">
                        <div className={`font-black uppercase tracking-widest text-[11px] ${tool === t.id ? 'text-indigo-600' : 'text-slate-700'}`}>{t.name}</div>
                        <div className="text-[10px] font-medium text-slate-400 mt-0.5">{t.desc}</div>
                     </div>
                  </button>
               ))}
            </div>
         </div>

      </div>

      <div className="mt-12 flex items-center gap-3 text-slate-400">
         <AlertTriangle className="w-4 h-4 text-amber-500" />
         <span className="text-[10px] font-black uppercase tracking-widest">Entering practice mode will hide the global navigation bar.</span>
      </div>
    </div>
  );
}
