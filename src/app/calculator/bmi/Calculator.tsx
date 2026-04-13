'use client';
import { useMemo } from 'react';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { safeCalculateBMI } from '@/utils/math/safeCalculations';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSyncState } from '@/hooks/useSyncState';
import { Info } from 'lucide-react';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ResultDisplay } from '@/components/calculator/ResultDisplay';

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
  const [state, setState] = useSyncState('bmi_v3', DEFAULT_STATE);
  const [readings, setReadings] = useLocalStorage<BMIReading[]>('equaly_bmi_history', []);
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
  }, [unit, weight, height, feet, inches, lbs]);

  const saveReading = () => {
    if (result.success && result.data) {
      const newReading: BMIReading = {
        date: new Date().toLocaleDateString('en-NP'),
        bmi: result.data.bmi,
        weight: unit === 'metric' ? weight : lbs,
        status: result.data.status,
      };
      setReadings([newReading, ...readings].slice(0, 10));
    }
  };

  const getInterpretation = (bmi: number): { text: string; variant: 'info' | 'success' | 'warning' | 'danger' } => {
    if (bmi < 18.5) return { text: `Your BMI of ${bmi} is Underweight. Normal range: 18.5–24.9. Consult a nutritionist.`, variant: 'info' };
    if (bmi < 25) return { text: `Your BMI of ${bmi} is Normal. You are within the healthy reference range.`, variant: 'success' };
    if (bmi < 30) return { text: `Your BMI of ${bmi} is Overweight. Normal range: 18.5–24.9. Lifestyle changes advised.`, variant: 'warning' };
    return { text: `Your BMI of ${bmi} is Obese. Clinical consultation strongly recommended.`, variant: 'danger' };
  };

  return (
    <CalculatorErrorBoundary calculatorName="BMI">
      <CalculatorLayout
        title="Clinical BMI Calculator"
        description="Verify your Body Mass Index (BMI) based on WHO standards. All calculations are private, instant, and shareable."
        purpose="Health Assessment"
        category={{ label: 'Health', href: '/calculator/category/health' }}
        leftPanel={
          <div className="space-y-8">
            {/* Unit Toggle */}
            <div className="flex p-1 bg-slate-50 border border-slate-200 rounded-xl">
              {['metric', 'imperial'].map((u) => (
                <button
                  key={u}
                  onClick={() => updateState({ unit: u as any })}
                  className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${
                    unit === u ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
              {unit === 'metric' ? (
                <>
                  <ValidatedInput label="Weight (kg)" value={weight} onChange={(v) => updateState({ weight: v })} min={2} max={300} required withSlider />
                  <ValidatedInput label="Height (cm)" value={height} onChange={(v) => updateState({ height: v })} min={30} max={250} required withSlider />
                </>
              ) : (
                <>
                  <ValidatedInput label="Weight (lbs)" value={lbs} onChange={(v) => updateState({ lbs: v })} min={5} max={650} required withSlider />
                  <div className="grid grid-cols-2 gap-4">
                    <ValidatedInput label="Feet" value={feet} onChange={(v) => updateState({ feet: v })} min={1} max={8} required withSlider />
                    <ValidatedInput label="Inches" value={inches} onChange={(v) => updateState({ inches: v })} min={0} max={11.9} step={0.1} required withSlider />
                  </div>
                </>
              )}
            </div>

            <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-3xl">
              <div className="flex items-center gap-2 mb-3 text-blue-600 text-[10px] font-black uppercase tracking-widest">
                <Info className="w-4 h-4" />
                <span>WHO Reference Range</span>
              </div>
              <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                Healthy weight range for your height: <span className="font-black text-slate-900">
                  {unit === 'metric' ? ((18.5 * (height/100)**2).toFixed(1)) : ((18.5 * (feet*12+inches)**2 / 703).toFixed(1))} - {unit === 'metric' ? ((25 * (height/100)**2).toFixed(1)) : ((25 * (feet*12+inches)**2 / 703).toFixed(1))} {unit === 'metric' ? 'kg' : 'lbs'}
                </span>
              </p>
            </div>
          </div>
        }
        rightPanel={
          <div className="space-y-8">
            {result.success && result.data ? (
              <>
                <ResultDisplay 
                  title="Your BMI Result"
                  primaryResult={{
                    label: "Calculated BMI",
                    value: result.data.bmi,
                    description: result.data.category,
                    bgColor: 'bg-slate-900',
                  }}
                  interpretation={getInterpretation(result.data.bmi)}
                />

                <button
                  onClick={saveReading}
                  className="w-full py-4 bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 rounded-2xl active:scale-95"
                >
                  Save to History Log
                </button>
              </>
            ) : (
              <div className="p-6 bg-rose-50 text-rose-600 font-black text-xs border border-rose-100 rounded-2xl">
                {result.error || 'Please enter valid height and weight values.'}
              </div>
            )}
          </div>
        }
        faqSection={
          <div className="space-y-12">
            {readings.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-6 bg-slate-50 flex items-center justify-between">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900">BMI Performance History</h3>
                   <button onClick={() => setReadings([])} className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline">Clear Records</button>
                </div>
                <div className="p-6">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[9px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100">
                        <th className="pb-4">Date</th>
                        <th className="pb-4">BMI</th>
                        <th className="pb-4">Weight</th>
                        <th className="pb-4">Category</th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px] font-bold text-slate-700">
                      {readings.map((r, i) => (
                        <tr key={i} className="border-b border-slate-50 last:border-0">
                          <td className="py-4 text-slate-400">{r.date}</td>
                          <td className="py-4 text-blue-600 font-black">{r.bmi}</td>
                          <td className="py-4">{r.weight}{unit === 'metric' ? 'kg' : 'lbs'}</td>
                          <td className={`py-4 uppercase text-[10px] font-black`}>{r.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            <div className="prose prose-slate max-w-none w-full print-hide pt-12 border-t border-slate-200">
             <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6 uppercase">Understanding Your Clinical BMI</h2>
             <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">Body Mass Index (BMI) is an internationally recognized anthropometric metric used by the WHO to classify weight risk. Fundamentals of Nepalese health also rely on these metrics for primary screening.</p>
            </div>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
