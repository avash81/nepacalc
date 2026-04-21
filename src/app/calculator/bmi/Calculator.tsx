'use client';
import { useMemo } from 'react';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { safeCalculateBMI } from '@/utils/math/safeCalculations';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSyncState } from '@/hooks/useSyncState';
import { Info, History, Trash2, Heart, Scale, User } from 'lucide-react';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';

interface BMIReading {
  date: string;
  bmi: number;
  weight: number;
  status: string;
}

const DEFAULT_STATE = {
  unit: 'metric' as 'metric' | 'imperial',
  weight: 70,
  height: 170, // cm
  feet: 5,
  inches: 7,
  lbs: 154,
};

export default function BMICalculator() {
  const [state, setState] = useSyncState('bmi_v4', DEFAULT_STATE);
  const [readings, setReadings] = useLocalStorage<BMIReading[]>('NEPACALC_bmi_history_v2', []);
  const { unit, weight, height, feet, inches, lbs } = state;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

  const result = useMemo(() => {
    if (unit === 'metric') {
      return safeCalculateBMI(weight, height, 'metric');
    } else {
      const totalInches = feet * 12 + inches;
      return safeCalculateBMI(lbs, totalInches, 'imperial');
    }
  }, [unit, weight, height, feet, inches, lbs, state]);

  const saveReading = () => {
    if (result.success && result.data) {
      const newReading: BMIReading = {
        date: new Date().toLocaleDateString('en-NP'),
        bmi: result.data.bmi,
        weight: unit === 'metric' ? weight : lbs,
        status: result.data.status,
      };
      setReadings([newReading, ...readings].slice(0, 5));
    }
  };

  const getStatusColor = (status: string) => {
     const s = status.toLowerCase();
     if (s.includes('underweight')) return 'text-blue-500 bg-blue-50';
     if (s.includes('normal')) return 'text-emerald-500 bg-emerald-50';
     if (s.includes('overweight')) return 'text-amber-500 bg-amber-50';
     return 'text-rose-500 bg-rose-50';
  };

  return (
    <CalculatorErrorBoundary calculatorName="BMI">
      <CalculatorLayout
        title="Clinical BMI Calculator"
        description="Verify your Body Mass Index (BMI) based on global WHO standards. High-precision screening for clinicians and health enthusiasts."
        badge="Clinical"
        badgeColor="blue"
        category={{ label: 'Health', href: '/calculator/category/health' }}
        hideTitle={true}
        leftPanel={
          <div className="space-y-8">
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
              {['metric', 'imperial'].map((u) => (
                <button
                  key={u}
                  onClick={() => updateState({ unit: u as any })}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                    unit === u ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>

            <div className="space-y-8">
              {unit === 'metric' ? (
                <>
                  <ValidatedInput label="Body Weight (kg)" value={weight} onChange={(v) => updateState({ weight: v })} min={2} max={300} required withSlider />
                  <ValidatedInput label="Stature Height (cm)" value={height} onChange={(v) => updateState({ height: v })} min={30} max={250} required withSlider />
                </>
              ) : (
                <>
                  <ValidatedInput label="Body Weight (lbs)" value={lbs} onChange={(v) => updateState({ lbs: v })} min={5} max={650} required withSlider />
                  <div className="grid grid-cols-2 gap-6">
                    <ValidatedInput label="Feet" value={feet} onChange={(v) => updateState({ feet: v })} min={1} max={8} required withSlider />
                    <ValidatedInput label="Inches" value={inches} onChange={(v) => updateState({ inches: v })} min={0} max={11.9} step={0.1} required withSlider />
                  </div>
                </>
              )}
            </div>

            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative group">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Scale className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-2 mb-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <Info className="w-4 h-4" />
                <span>Reference Ranges (WHO)</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { label: 'Underweight', range: '< 18.5', color: 'bg-blue-400' },
                   { label: 'Healthy', range: '18.5 - 24.9', color: 'bg-emerald-400' },
                   { label: 'Overweight', range: '25.0 - 29.9', color: 'bg-amber-400' },
                   { label: 'Obese', range: '≥ 30.0', color: 'bg-rose-400' },
                 ].map(r => (
                   <div key={r.label} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${r.color}`} />
                      <div className="text-[11px] font-bold text-slate-700">{r.label}: <span className="text-slate-400 font-mono">{r.range}</span></div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        }
        rightPanel={
          <div className="space-y-6">
            {result.success && result.data ? (
              <>
                <div className="p-12 bg-white border border-slate-100 rounded-[3rem] text-center shadow-2xl shadow-blue-500/5 group relative overflow-hidden">
                   <div className="absolute inset-x-0 top-0 h-2 bg-slate-50">
                      <div className={`h-full transition-all duration-1000 ${
                        result.data.bmi < 18.5 ? 'bg-blue-500 w-[20%]' : 
                        result.data.bmi < 25 ? 'bg-emerald-500 w-[50%]' : 
                        result.data.bmi < 30 ? 'bg-amber-500 w-[75%]' : 'bg-rose-500 w-full'
                      }`} />
                   </div>
                   <div className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest mt-4">Current BMI Metric</div>
                   <div className="text-8xl font-black text-slate-900 tracking-tighter mb-4 group-hover:scale-105 transition-transform font-mono">
                     {result.data.bmi.toFixed(1)}
                   </div>
                   <div className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] inline-block ${getStatusColor(result.data.status)}`}>
                     {result.data.status}
                   </div>
                </div>

                <button
                  onClick={saveReading}
                  className="w-full py-5 bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20 rounded-[2rem] active:scale-95 flex items-center justify-center gap-2"
                >
                  <History className="w-4 h-4" /> Save Record
                </button>

                {readings.length > 0 && (
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden">
                    <div className="px-8 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                       <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">History Log</h3>
                       <button onClick={() => setReadings([])} className="p-2 hover:bg-rose-50 rounded-lg text-rose-400 transition-colors" aria-label="Clear all readings"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="divide-y divide-slate-50 max-h-60 overflow-y-auto scrollbar-hide">
                      {readings.map((r, i) => (
                        <div key={i} className="px-8 py-4 flex justify-between items-center hover:bg-slate-50/50 transition-colors group">
                           <div className="space-y-0.5">
                              <p className="text-[13px] font-black text-slate-900">{r.bmi.toFixed(1)}</p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{r.date}</p>
                           </div>
                           <div className={`text-[10px] font-bold uppercase tracking-tighter px-3 py-1 rounded-full ${getStatusColor(r.status)}`}>
                              {r.status}
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="p-10 bg-amber-50 border-2 border-dashed border-amber-200 rounded-[2.5rem] text-center space-y-3">
                 <Info className="w-8 h-8 text-amber-500 mx-auto" />
                 <p className="text-sm font-bold text-amber-700">Enter your dimensions to begin assessment.</p>
              </div>
            )}
          </div>
        }
        faqSection={
          <CalcFAQ toolName="Clinical BMI Calculator" faqs={[
            { question: 'Is BMI accurate for athletes?', answer: 'BMI does not differentiate between muscle and fat. Athletes with high muscle mass may have a high BMI but low body fat percentage.' },
            { question: 'What is the healthy BMI range?', answer: 'The World Health Organization (WHO) considers a BMI between 18.5 and 24.9 as the "Healthy/Normal" range for adults.' },
            { question: 'Why does height matter in BMI?', answer: 'BMI scales weight by the square of height to account for body volume, assuming body proportions are relatively consistent across different heights.' },
          ]} />
        }
      />
    </CalculatorErrorBoundary>
  );
}
