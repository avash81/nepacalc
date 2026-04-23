'use client';
import { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Scale, Heart, Info, History, Trash2, Activity, Target } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { safeCalculateBMI } from '@/utils/math/safeCalculations';

interface BMIReading {
  date: string;
  bmi: number;
  weight: number;
  status: string;
}

const DEFAULT_STATE = {
  unit: 'metric' as 'metric' | 'imperial',
  weight: 70,
  height: 170,
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
  }, [unit, weight, height, feet, inches, lbs]);

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
     if (s.includes('underweight')) return 'text-[#1A73E8]';
     if (s.includes('normal')) return 'text-[#188038]';
     if (s.includes('overweight')) return 'text-[#F29900]';
     return 'text-[#D93025]';
  };

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Health', href: '/health/' }, { label: 'BMI Calculator' }]}
      title="BMI Calculator"
      description="Check your Body Mass Index (BMI) based on global WHO standards. A quick tool to assess your weight relative to height."
      icon={Scale}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className={labelCls}>System of Unit</label>
            <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
              {['metric', 'imperial'].map((u) => (
                <button 
                  key={u} 
                  onClick={() => updateState({ unit: u as any })}
                  className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition-all ${unit === u ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {unit === 'metric' ? (
              <>
                <div className="space-y-2">
                  <label className={labelCls}>Weight (kg)</label>
                  <input type="number" value={weight} onChange={e => updateState({ weight: Number(e.target.value) })} className={inputCls} />
                </div>
                <div className="space-y-2">
                  <label className={labelCls}>Height (cm)</label>
                  <input type="number" value={height} onChange={e => updateState({ height: Number(e.target.value) })} className={inputCls} />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className={labelCls}>Weight (lbs)</label>
                  <input type="number" value={lbs} onChange={e => updateState({ lbs: Number(e.target.value) })} className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={labelCls}>Height (ft)</label>
                    <input type="number" value={feet} onChange={e => updateState({ feet: Number(e.target.value) })} className={inputCls} />
                  </div>
                  <div className="space-y-2">
                    <label className={labelCls}>Height (in)</label>
                    <input type="number" value={inches} onChange={e => updateState({ inches: Number(e.target.value) })} className={inputCls} />
                  </div>
                </div>
              </>
            )}
          </div>

          <button 
            onClick={saveReading}
            className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-white font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            Calculate & Save
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          {result.success && result.data ? (
            <>
              <div className="p-6 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-1">
                <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Your BMI Score</div>
                <div className="text-5xl font-black text-[#202124]">{result.data.bmi.toFixed(1)}</div>
                <div className={`text-xs font-black uppercase tracking-widest ${getStatusColor(result.data.status)}`}>
                  {result.data.status}
                </div>
              </div>

              <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
                 <div className="px-4 py-2 border-b border-[#DADCE0] bg-[#F8F9FA]">
                   <span className="text-[10px] font-bold text-[#70757A] uppercase">WHO Classification</span>
                 </div>
                 <div className="p-3 space-y-2">
                    {[
                      { label: 'Underweight', range: '< 18.5', color: 'bg-[#1A73E8]' },
                      { label: 'Normal Weight', range: '18.5 - 24.9', color: 'bg-[#188038]' },
                      { label: 'Overweight', range: '25.0 - 29.9', color: 'bg-[#F29900]' },
                      { label: 'Obese', range: '≥ 30.0', color: 'bg-[#D93025]' },
                    ].map((r) => (
                      <div key={r.label} className={`flex justify-between items-center text-[11px] p-1.5 rounded ${result.data?.status.includes(r.label.split(' ')[0]) ? 'bg-[#F1F3F4] font-bold' : ''}`}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${r.color}`} />
                          <span>{r.label}</span>
                        </div>
                        <span className="font-mono text-[#70757A]">{r.range}</span>
                      </div>
                    ))}
                 </div>
              </div>

              {readings.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <span className={labelCls}>History</span>
                    <button onClick={() => setReadings([])} className="text-[9px] font-bold text-[#D93025] uppercase">Clear</button>
                  </div>
                  <div className="space-y-2">
                    {readings.map((r, i) => (
                      <div key={i} className="p-3 bg-white border border-[#DADCE0] rounded-lg flex justify-between items-center text-xs">
                        <div>
                          <span className="font-bold">{r.bmi.toFixed(1)}</span>
                          <span className="text-[#70757A] ml-2 text-[10px]">{r.date}</span>
                        </div>
                        <span className={`font-bold ${getStatusColor(r.status)}`}>{r.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10 opacity-40">
              <Activity className="w-10 h-10 mx-auto mb-2" />
              <p className="text-sm">Enter stats to see classification</p>
            </div>
          )}
        </div>
      }
      howToUse={{
        steps: [
          "Choose between Metric (kg/cm) or Imperial (lbs/ft) units.",
          "Enter your weight and height accurately.",
          "Click 'Calculate' to see your BMI score and WHO health category.",
          "Use the 'Save' feature to track your BMI progress over time."
        ]
      }}
      formula={{
        title: "BMI Calculation Formula",
        description: "BMI is a simple index of weight-for-height that is commonly used to classify underweight, overweight and obesity in adults.",
        raw: "Metric: BMI = weight (kg) / height² (m²)\nImperial: BMI = 703 × weight (lbs) / height² (in²)"
      }}
      faqs={[
        {
          question: "Is BMI a reliable health indicator?",
          answer: "BMI is a useful screening tool for the general population, but it does not account for muscle mass, bone density, or overall body composition. Athletes may have a high BMI but low body fat."
        },
        {
          question: "What is a healthy BMI for adults?",
          answer: "For most adults, a healthy BMI is between 18.5 and 24.9. Staying within this range reduces the risk of weight-related health issues."
        }
      ]}
      sidebar={{
        title: "Health Tools",
        links: [
          { label: "Calorie Calculator", href: "/calculator/calorie-calculator" },
          { label: "Ideal Weight", href: "/calculator/ideal-weight" },
          { label: "Body Fat %", href: "/calculator/body-fat" },
          { label: "BMR Calculator", href: "/calculator/bmr" },
        ],
        banner: {
          title: "Focus on Health",
          description: "BMI is just one metric. Combine it with healthy eating and regular exercise for a holistic wellness approach.",
          image: "/images/health-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Calorie Calculator", href: "/calculator/calorie-calculator" },
        { label: "Ideal Weight", href: "/calculator/ideal-weight" },
        { label: "BMR Calculator", href: "/calculator/bmr" }
      ]}
    />
  );
}
