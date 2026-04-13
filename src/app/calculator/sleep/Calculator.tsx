'use client';

import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { Moon, Sun, Clock, Sparkles, Info } from 'lucide-react';

export default function SleepCalculator() {
  const [mode, setMode] = useState<'wake' | 'sleep'>('wake'); // 'wake' means "I want to wake up at", 'sleep' means "I'm going to sleep now"
  const [time, setTime] = useState('07:00');

  const FALL_ASLEEP_TIME = 14; // minutes

  const results = useMemo(() => {
    const now = new Date();
    const targetTime = new Date();

    if (mode === 'wake') {
        const [hours, minutes] = time.split(':').map(Number);
        targetTime.setHours(hours, minutes, 0, 0);
        if (targetTime < now) {
            targetTime.setDate(targetTime.getDate() + 1);
        }

        // Calculate breakfast times (cycles backwards)
        const cycles = [6, 5, 4, 3];
        return cycles.map(c => {
            const date = new Date(targetTime.getTime() - (c * 90 * 60 * 1000) - (FALL_ASLEEP_TIME * 60 * 1000));
            return {
                time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                hours: (c * 1.5).toFixed(1),
                cycles: c,
                label: c >= 5 ? 'Recommended' : 'Minimal'
            };
        });
    } else {
        // Calculate wake up times (cycles forward)
        const cycles = [6, 5, 4, 3];
        return cycles.map(c => {
            const date = new Date(now.getTime() + (c * 90 * 60 * 1000) + (FALL_ASLEEP_TIME * 60 * 1000));
            return {
                time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                hours: (c * 1.5).toFixed(1),
                cycles: c,
                label: c >= 5 ? 'Recommended' : 'Minimal'
            };
        }).reverse();
    }
  }, [mode, time]);

  return (
    <CalculatorErrorBoundary calculatorName="Sleep Calculator">
      <CalculatorLayout
        title="Sleep Cycle Calculator"
        description="Optimize your sleep by waking up between 90-minute sleep cycles. Feel fresh and energized instead of groggy."
        badge="Wellness"
        badgeColor="indigo"
        category={{ label: 'Health', href: '/calculator/category/health' }}
        leftPanel={
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">I want to...</label>
              <div className="flex p-1 bg-slate-50 rounded-xl border border-slate-200">
                <button
                    onClick={() => setMode('wake')}
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                      mode === 'wake' 
                        ? 'bg-white text-indigo-600 shadow-sm border border-slate-100' 
                        : 'text-slate-400'
                    }`}
                >
                    Wake up at
                </button>
                <button
                    onClick={() => setMode('sleep')}
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                      mode === 'sleep' 
                        ? 'bg-white text-indigo-600 shadow-sm border border-slate-100' 
                        : 'text-slate-400'
                    }`}
                >
                    Sleep Now
                </button>
              </div>
            </div>

            {mode === 'wake' && (
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Set Wake Time</label>
                    <input 
                        type="time" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-2xl font-black text-slate-900 focus:ring-2 focus:ring-indigo-500 shadow-inner"
                    />
                </div>
            )}

            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex gap-3">
                <Info className="w-5 h-5 text-indigo-500 shrink-0" />
                <p className="text-xs text-indigo-900 leading-normal font-medium">
                    The average person takes about 14 minutes to fall asleep. We&apos;ve included this in our calculations.
                </p>
            </div>
          </div>
        }
        rightPanel={
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {mode === 'wake' ? 'You should go to bed at:' : 'You should wake up at:'}
            </h4>
            
            <div className="grid grid-cols-1 gap-3">
                {results.map((res, i) => (
                    <div 
                        key={i} 
                        className={`p-6 rounded-3xl border transition-all hover:scale-[1.02] cursor-default flex items-center justify-between ${
                            res.label === 'Recommended' 
                            ? 'bg-gradient-to-br from-indigo-600 to-violet-700 text-white border-transparent shadow-xl shadow-indigo-100' 
                            : 'bg-white border-slate-100 text-slate-900'
                        }`}
                    >
                        <div>
                            <div className="text-3xl font-black tracking-tight">{res.time}</div>
                            <div className={`text-[10px] font-bold uppercase tracking-wider opacity-80 mt-1`}>
                                {res.hours} Hours • {res.cycles} Cycles
                            </div>
                        </div>
                        {res.label === 'Recommended' && <Sparkles className="w-6 h-6 text-white/50" />}
                    </div>
                ))}
            </div>
          </div>
        }
        faqSection={
          <div className="prose prose-slate max-w-none w-full print-hide mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Why Sleep Cycles?</h2>
            <p>If you wake up in the middle of a sleep cycle, you feel groggy and tired. However, waking up at the end of a cycle makes you feel refreshed and alert.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Moon className="w-5 h-5 text-indigo-600" /> Deep Sleep</h3>
                <p className="text-sm text-slate-600 leading-relaxed italic">Waking up during deep sleep (stage 3/4) results in sleep inertia, which can last for up to an hour.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Sun className="w-5 h-5 text-amber-500" /> REM Sleep</h3>
                <p className="text-sm text-slate-600 leading-relaxed italic">Most people have about 5-6 sleep cycles per night. This tool helps you target the end of these cycles.</p>
              </div>
            </div>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
