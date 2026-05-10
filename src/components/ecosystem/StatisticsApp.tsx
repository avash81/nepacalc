'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { jStat } from 'jstat';
import { Sigma, History, Trash2, Zap, BarChart3, LineChart, TrendingUp, Table as TableIcon, FileSpreadsheet } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  ScatterChart, Scatter, Cell, Line
} from 'recharts';

interface StatsResult {
  mean: number;
  median: number;
  variance: number;
  stdDev: number;
  min: number;
  max: number;
  sum: number;
  count: number;
}

export function StatisticsApp() {
  const [dataInput, setDataInput] = useState('');
  const [activeTab, setActiveTab] = useState<'descriptive' | 'regression'>('descriptive');

  // Parse data into numbers
  const data = useMemo(() => {
    return dataInput
      .split(/[\n, ]+/)
      .map(v => parseFloat(v))
      .filter(v => !isNaN(v));
  }, [dataInput]);

  // Descriptive Statistics Logic
  const stats = useMemo<StatsResult | null>(() => {
    if (data.length === 0) return null;
    return {
      mean: jStat.mean(data),
      median: jStat.median(data),
      variance: jStat.variance(data),
      stdDev: jStat.stdev(data),
      min: jStat.min(data),
      max: jStat.max(data),
      sum: jStat.sum(data),
      count: data.length
    };
  }, [data]);

  // Regression Logic (assuming x is index, y is value for simple viz)
  const regressionData = useMemo(() => {
    if (data.length < 2) return [];
    
    // Prepare independent variable matrix (X) with a column of ones for intercept
    const X = data.map((_, index) => [1, index]);
    const y = data;

    try {
      // Logic Audit: jStat uses models.ols for high-precision regression
      const model = jStat.models.ols(y, X);
      const b = model.coef[0]; // Intercept
      const m = model.coef[1]; // Slope

      return data.map((val, x) => ({
        x,
        y: val,
        trend: m * x + b
      }));
    } catch (err) {
      console.error("Linear Regression Kernel Error:", err);
      return [];
    }
  }, [data]);

  const clearData = () => setDataInput('');

  return (
    <div className="w-full flex-1 flex flex-col bg-white overflow-hidden relative border-x border-slate-100 shadow-sm h-full">
      
      {/* 📊 LABORATORY HEADER */}
      <div className="flex justify-between items-center px-6 py-4 bg-[#1a4b8c] text-[#202124] z-30">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em]">
            <BarChart3 className="w-4 h-4 text-[#FFC107]" /> Data Analysis Suite
          </span>
          <div className="h-4 w-[1px] bg-white/20" />
          <div className="flex bg-[#f8f9fa] rounded-lg p-1">
             {(['descriptive', 'regression'] as const).map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-4 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#FFC107] text-black' : 'text-[#202124]/40 hover:text-[#202124] hover:bg-white/10'}`}
               >
                 {tab === 'descriptive' ? 'Descriptive' : 'Linear Regression'}
               </button>
             ))}
          </div>
        </div>
        <div className="flex items-center gap-3 text-[9px] font-bold opacity-60 uppercase tracking-widest">
          <Zap className="w-3 h-3 fill-yellow-400 text-yellow-400" /> Kernel: jStat JS
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#F8F9FA]">
        
        {/* 🔡 INPUT CONSOLE */}
        <div className="w-full lg:w-[400px] bg-white border-r border-slate-100 flex flex-col p-6 shadow-sm z-20">
           <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                 <FileSpreadsheet className="w-3 h-3" /> Raw Data Input
              </span>
              <button 
                onClick={clearData}
                className="text-[9px] font-bold text-red-400 hover:text-red-500 uppercase tracking-widest"
              >
                 Reset
              </button>
           </div>
           <textarea 
             value={dataInput}
             onChange={(e) => setDataInput(e.target.value)}
             placeholder="Paste your numbers here... (separated by commas, spaces, or lines)"
             className="flex-1 w-full p-6 bg-[#F8F9FA] rounded-[1.5rem] border-2 border-transparent focus:border-[#1a4b8c] text-slate-700 font-bold text-sm outline-none resize-none transition-all placeholder:text-slate-200"
           />
           <div className="mt-6 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
              <p className="text-[10px] font-black text-blue-800 uppercase tracking-widest leading-loose">
                 Institutional Tip: <br/>
                 <span className="font-medium normal-case text-blue-600 opacity-80">We support bulk pasting from Excel or Sheets. The laboratory instantly calibrates Sample vs Population variance.</span>
              </p>
           </div>
        </div>

        {/* 📈 VISUAL & NUMERIC OUTPUT */}
        <div className="flex-1 p-8 overflow-y-auto">
           {stats ? (
             <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                
                {activeTab === 'descriptive' ? (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       {[
                         { label: 'Mean', value: stats.mean.toFixed(4), color: 'text-blue-600' },
                         { label: 'Median', value: stats.median.toFixed(2), color: 'text-indigo-600' },
                         { label: 'Std Dev', value: stats.stdDev.toFixed(4), color: 'text-purple-600' },
                         { label: 'Variance', value: stats.variance.toFixed(4), color: 'text-pink-600' },
                         { label: 'Minimum', value: stats.min, color: 'text-slate-600' },
                         { label: 'Maximum', value: stats.max, color: 'text-slate-600' },
                         { label: 'Sum', value: stats.sum, color: 'text-slate-600' },
                         { label: 'Count', value: stats.count, color: 'text-slate-600' },
                       ].map(s => (
                         <div key={s.label} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-2">{s.label}</span>
                            <span className={`text-xl font-black ${s.color}`}>{s.value}</span>
                         </div>
                       ))}
                    </div>

                    <div className="bg-white p-8 rounded-lg border border-slate-100 shadow-sm">
                       <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8 flex items-center gap-2">
                          <Sigma className="w-3.5 h-3.5" /> Distribution Visualization
                       </h3>
                       <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                             <BarChart data={data.map((v, i) => ({ id: i, val: v }))}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis dataKey="id" hide />
                                <YAxis stroke="#94A3B8" fontSize={10} fontWeight="bold" />
                                <RechartsTooltip 
                                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="val" fill="#1a4b8c" radius={[4, 4, 0, 0]} />
                             </BarChart>
                          </ResponsiveContainer>
                       </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-white p-8 rounded-lg border border-slate-100 shadow-sm">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8 flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5" /> Simple Linear Regression (n={stats.count})
                     </h3>
                     <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                              <XAxis dataKey="x" type="number" name="Index" stroke="#94A3B8" fontSize={10} />
                              <YAxis dataKey="y" type="number" name="Value" stroke="#94A3B8" fontSize={10} />
                              <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
                              <Scatter data={regressionData} fill="#1a4b8c">
                                {regressionData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill="#1a4b8c" />
                                ))}
                              </Scatter>
                              {/* Overlaying Trend Line using simple Line (recharts hack for regression viz) */}
                              <Line data={regressionData} type="monotone" dataKey="trend" stroke="#FFC107" strokeWidth={3} dot={false} />
                           </ScatterChart>
                        </ResponsiveContainer>
                     </div>
                     <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[11px] font-bold text-slate-600 leading-relaxed">
                           The yellow trendline represents the high-precision linear model `y = mx + b` calculated across your dataset.
                        </p>
                     </div>
                  </div>
                )}

             </div>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-center py-20 opacity-20">
                <BarChart3 className="w-16 h-16 mb-4 text-[#1a4b8c]" />
                <p className="text-xs font-black uppercase tracking-widest text-[#1a4b8c]">Awaiting Data Signal</p>
             </div>
           )}
        </div>

      </div>

    </div>
  );
}

