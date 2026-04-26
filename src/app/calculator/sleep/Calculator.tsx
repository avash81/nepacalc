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
      <ModernCalcLayout hideH1={false}
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
        details={
          <div className="space-y-8">
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-4">Circadian Rhythm & Ultradian Sleep Cycle Science</h2>
              <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
                <p>
                  Sleep is the human body's most powerful biological recovery mechanism. Far from a passive state, your brain cycles through five distinct stages of sleep—Stages 1, 2, 3, 4 (collectively non-REM sleep), and REM (Rapid Eye Movement)—in a recurring 90-minute ultradian rhythm. Our <strong className="text-[#202124]">sleep cycle calculator</strong> maps these rhythms to your specific schedule, identifying the mathematically optimal moments to wake up naturally at the boundary between cycles.
                </p>
                <p>
                  The scientific principle at work is straightforward: waking up during Stage 3 or Stage 4 deep sleep (slow-wave sleep) triggers a neurological state called <strong className="text-[#202124]">sleep inertia</strong>—a transient cognitive impairment that can last 30-60 minutes. By calculating and targeting the light-sleep window at the end of each cycle, this tool eliminates sleep inertia, allowing you to begin your day with maximum mental clarity.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">The Five Stages of Sleep Architecture</h3>
              <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
                <li><strong className="text-[#1A73E8]">Stage 1 (Light Sleep, ~5 min):</strong> The transition from wakefulness. Muscle activity decreases, and you can be easily awakened. This is where hypnic jerks (sudden muscle twitches) often occur.</li>
                <li><strong className="text-[#188038]">Stage 2 (True Sleep, ~25 min):</strong> Heart rate and body temperature drop. The brain begins producing sleep spindles—bursts of brain activity that prevent you from waking. This is the stage you want to wake up in.</li>
                <li><strong className="text-[#D93025]">Stages 3 & 4 (Deep Slow-Wave Sleep, ~30 min):</strong> The most physically restorative phase. Growth hormone is released, and the body performs tissue repair and immune system reinforcement. Waking here causes severe sleep inertia.</li>
                <li><strong className="text-[#F29900]">REM Sleep (~20 min, growing longer each cycle):</strong> The brain is highly active. Memory consolidation, emotional processing, and creative problem-solving all occur here. Dreaming is most vivid during REM.</li>
              </ul>
            </div>
          </div>
        }
        faqs={[
          {
            question: "Why do I feel tired even after sleeping 8 full hours?",
            answer: "Because 8 hours doesn't align perfectly with 90-minute cycles. If you sleep from midnight to 8am (480 minutes), that is 5.33 cycles. You likely wake up mid-cycle, deep in slow-wave sleep, triggering severe sleep inertia. Sleeping 7.5 hours (5 exact cycles) would leave you feeling far more refreshed."
          },
          {
            question: "Why is a sleep cycle exactly 90 minutes?",
            answer: "The 90-minute duration is a biological constant of the human brain's ultradian rhythm—the internal oscillation governing sleep architecture. It is regulated by the interplay of adenosine (sleep pressure) and the circadian clock driven by the suprachiasmatic nucleus in the hypothalamus."
          },
          {
            question: "What is sleep inertia and how long does it last?",
            answer: "Sleep inertia is the transient cognitive grogginess felt immediately upon waking from deep (slow-wave) sleep. Neurologically, it reflects a rapid but incomplete transition from sleep to wakefulness. It typically lasts 15-60 minutes but can persist for several hours in cases of severe sleep deprivation."
          },
          {
            question: "Why does the calculator add 14 minutes to every sleep time?",
            answer: "The 14-minute offset accounts for the average sleep onset latency—the time a healthy adult takes to transition from lying in bed to the onset of Stage 1 sleep. If you set an alarm for 7:00 AM, the calculator tells you to get into bed at the calculated time, not to fall asleep at it."
          },
          {
            question: "How many sleep cycles should I be getting per night?",
            answer: "For most adults, 5-6 complete cycles (7.5 to 9 hours) is optimal. Research consistently shows that adults who regularly achieve fewer than 4 cycles per night have significantly elevated risks of cardiovascular disease, impaired immune function, and metabolic disorders."
          },
          {
            question: "Is it better to sleep less but wake at the right time vs. sleep more but wake mid-cycle?",
            answer: "Yes. The quality of your awakening is often more impactful on daytime performance than raw hours. Waking up at the end of 5 cycles (7.5 hours) typically produces better cognitive outcomes than waking up mid-cycle after 8 hours, because sleep inertia's neurological cost is significant."
          }
        ]}

      />
    </CalculatorErrorBoundary>
  );
}

