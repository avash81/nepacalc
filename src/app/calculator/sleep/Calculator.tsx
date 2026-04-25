'use client';

import React, { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { Moon, Sparkles, Info } from 'lucide-react';

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

        // Calculate backward (when to sleep)
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
        // Calculate forward (when to wake up)
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
      <ModernCalcLayout
      crumbs={[{ label: 'Health', href: '/health/' }, { label: 'Sleep Calculator' }]}
        title="Sleep Cycle Calculator"
        description="Optimize your sleep by waking up between 90-minute sleep cycles. Avoid grogginess and wake up feeling refreshed and energized."
        icon={Moon}
        inputs={
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-800">I want to...</label>
              <div className="flex p-1.5 bg-slate-100 rounded-xl">
                <button
                    onClick={() => setMode('wake')}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                      mode === 'wake' 
                        ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Wake up at
                </button>
                <button
                    onClick={() => setMode('sleep')}
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                      mode === 'sleep' 
                        ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    Sleep Now
                </button>
              </div>
            </div>

            {mode === 'wake' && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                    <label className="text-sm font-bold text-slate-800">Set Wake Time</label>
                    <input 
                        type="time" 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-6 py-4 text-3xl font-black text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                    />
                </div>
            )}

            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex gap-3">
                <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-xs text-indigo-800 leading-relaxed font-medium">
                    The average person takes about <strong>14 minutes to fall asleep</strong>. We have automatically factored this into your optimal times.
                </p>
            </div>
          </div>
        }
        results={
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {mode === 'wake' ? 'Optimal Bedtimes:' : 'Optimal Wake Times:'}
            </h4>
            
            <div className="grid grid-cols-1 gap-3">
                {results.map((res, i) => (
                    <div 
                        key={i} 
                        className={`p-6 rounded-2xl border transition-all hover:shadow-md ${
                            res.label === 'Recommended' 
                            ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white border-transparent shadow-lg shadow-indigo-200' 
                            : 'bg-white border-slate-200 text-slate-800'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className={`text-3xl font-black tracking-tight ${res.label === 'Recommended' ? 'text-white' : 'text-slate-900'}`}>{res.time}</div>
                                <div className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${res.label === 'Recommended' ? 'text-indigo-200' : 'text-slate-500'}`}>
                                    {res.hours} Hours • {res.cycles} Cycles
                                </div>
                            </div>
                            {res.label === 'Recommended' ? (
                                <Sparkles className="w-8 h-8 text-yellow-300" />
                            ) : (
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">Minimal</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
          </div>
        }
        sidebar={{
          title: "Health & Wellness",
          links: [
            { label: 'BMI Calculator', href: '/calculator/bmi' },
            { label: 'Pregnancy Due Date', href: '/calculator/pregnancy-due-date' },
            { label: 'Weight Converter', href: '/calculator/weight-converter' },
          ],
        }}
        howToUse={{
          steps: [
            "Select whether you want to calculate a bedtime based on a specific wake-up time, or if you are going to sleep right now.",
            "If choosing 'Wake up at', enter the exact time your alarm will go off.",
            "The calculator will display multiple optimal times.",
            "Choose a 'Recommended' time (5-6 cycles) for the best rest, or a 'Minimal' time (3-4 cycles) if you are short on time.",
            "Important: Do NOT set your alarm for these times if using 'Wake up at'; these are the times you should physically get into bed."
          ]
        }}
        faqs={[
          {
            question: "Why do I feel tired even after 8 hours of sleep?",
            answer: "If you wake up in the middle of a deep sleep cycle, you will feel groggy (sleep inertia). It is often better to sleep for slightly less time (e.g., 7.5 hours) if it means waking up at the end of a natural cycle."
          },
          {
            question: "How long is a sleep cycle?",
            answer: "A standard sleep cycle lasts about 90 minutes. During this time, you move through light sleep, deep sleep, and REM (Rapid Eye Movement) sleep before starting the cycle over."
          }
        ]}
        seoContent={
          <div>
            <h2>Understanding the 90-Minute Sleep Cycle</h2>
            <p>Good sleep is not just about the total hours you spend in bed; it is about how many complete sleep cycles you achieve. The human brain naturally cycles through different stages of sleep—ranging from light sleep to deep sleep and REM sleep—roughly every 90 minutes.</p>

            <h2>Recovery Guide: Sleep Optimization</h2>
            <p className="font-medium">
              Sleep is the most powerful <strong>recovery tool</strong> for the human body. It's not just about how long you stay in bed, but how many complete sleep cycles you experience.
            </p>
            <p>
              Our <strong>Circadian Analytics Laboratory</strong> leverages the science of <strong>ultradian rhythms</strong>. By calculating the precise moments your brain naturally shifts between sleep cycles, we help you find the 'perfect' wake-up time, ensuring you start your day in Nepal feeling energized rather than groggy.
            </p>
            
            <h3>What Happens if You Interrupt a Cycle?</h3>
            <p>If your alarm goes off while you are in the middle of deep sleep (stage 3 or 4), you experience a phenomenon known as <strong>sleep inertia</strong>. This leaves you feeling groggy, disoriented, and fatigued, regardless of whether you slept for 6 hours or 10 hours. Conversely, waking up at the end of a cycle (during light sleep) makes you feel naturally refreshed and alert.</p>
            
            <h3>How to Use Sleep Cycles to Your Advantage</h3>
            <p>To optimize your rest, you should aim to sleep in multiples of 90 minutes. For example:</p>
            <ul>
              <li><strong>4 Cycles (6 Hours):</strong> The minimum threshold for a functional day.</li>
              <li><strong>5 Cycles (7.5 Hours):</strong> The recommended optimal duration for most adults.</li>
              <li><strong>6 Cycles (9 Hours):</strong> Ideal for recovery, teens, or individuals who are sick.</li>
            </ul>
            <p>Our calculator accounts for these 90-minute blocks and automatically adds 14 minutes—the average time it takes a healthy adult to transition from wakefulness to stage 1 sleep—so you know exactly when to turn off the lights.</p>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
