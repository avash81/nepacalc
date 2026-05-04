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
  const [readings, setReadings] = useLocalStorage<BMIReading[]>('NepaCalc_bmi_history_v2', []);
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
      slug="bmi"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Health Tools', href: '/health/' }, { label: 'BMI' }]}
      title="Institutional BMI"
      description="The definitive anthropometric engine for Nepal. Calibrated to global WHO standards for high-precision Body Mass Index (BMI) tracking and metabolic screening."
      icon={Scale}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className={labelCls}>Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
                <input type="number" value={unit === 'metric' ? weight : lbs} onChange={e => updateState(unit === 'metric' ? { weight: Number(e.target.value) } : { lbs: Number(e.target.value) })} className={inputCls} />
             </div>
             <div className="space-y-2">
                <label className={labelCls}>Unit System</label>
                <select value={unit} onChange={e => updateState({ unit: e.target.value as any })} className={inputCls}>
                   <option value="metric">Metric (cm/kg)</option>
                   <option value="imperial">Imperial (ft/in/lbs)</option>
                </select>
             </div>
          </div>

          {unit === 'metric' ? (
             <div className="space-y-2">
                <label className={labelCls}>Height (cm)</label>
                <input type="number" value={height} onChange={e => updateState({ height: Number(e.target.value) })} className={inputCls} />
             </div>
          ) : (
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
          )}

          <button 
            onClick={saveReading}
            className="w-full h-12 bg-[#1A73E8] hover:bg-[#1765CC] text-white font-bold uppercase tracking-widest rounded-md transition-all shadow-sm flex items-center justify-center gap-3"
          >
            <Activity className="w-4 h-4" /> Calculate & Archive
          </button>

          <div className="p-6 bg-[#F8F9FA] border border-[#DADCE0] rounded-lg space-y-4">
             <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-[#70757A]" />
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#70757A]">Anthropometric History</h3>
             </div>
             {readings.length > 0 ? (
                <div className="space-y-2">
                   {readings.map((r, i) => (
                      <div key={i} className="p-3 bg-white border border-[#DADCE0] rounded-md flex justify-between items-center group hover:border-[#1A73E8] transition-all">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#F8F9FA] border border-[#DADCE0] flex items-center justify-center text-[10px] font-black">{r.bmi.toFixed(1)}</div>
                            <div className="text-[9px] text-[#70757A] font-bold uppercase">{r.date}</div>
                         </div>
                         <span className={`text-[10px] font-black uppercase ${getStatusColor(r.status)}`}>{r.status}</span>
                      </div>
                   ))}
                   <button onClick={() => setReadings([])} className="w-full py-2 text-[9px] font-bold text-[#D93025] uppercase tracking-widest hover:bg-rose-50 rounded transition-all mt-2">Clear Records</button>
                </div>
             ) : (
                <p className="text-[10px] text-[#70757A] text-center py-2 italic uppercase">No snapshots archived.</p>
             )}
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-8 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Anthropometric BMI Score</div>
             <div className="text-6xl font-black text-[#1A73E8] tracking-tighter">
               {result.success && result.data ? result.data.bmi.toFixed(1) : '--.-'}
             </div>
             {result.success && result.data && (
                <div className={`text-[10px] font-black uppercase tracking-tighter ${getStatusColor(result.data.status)}`}>
                   Classification: {result.data.status}
                </div>
             )}
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 space-y-4 shadow-sm">
             <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#70757A] text-center border-b border-[#F1F3F4] pb-2">WHO Standard Thresholds</h4>
             <div className="space-y-2">
                {[
                  { label: 'Underweight', range: '< 18.5', color: 'bg-blue-500' },
                  { label: 'Normal Weight', range: '18.5 - 24.9', color: 'bg-emerald-500' },
                  { label: 'Overweight', range: '25.0 - 29.9', color: 'bg-amber-500' },
                  { label: 'Obese', range: '≥ 30.0', color: 'bg-rose-500' },
                ].map((r) => {
                  const active = result.data?.status.toLowerCase().includes(r.label.split(' ')[0].toLowerCase());
                  return (
                     <div key={r.label} className={`flex justify-between items-center p-3 rounded-md border transition-all ${active ? 'bg-[#F8F9FA] border-[#1A73E8]' : 'bg-transparent border-transparent opacity-40'}`}>
                        <div className="flex items-center gap-3">
                           <div className={`w-2 h-2 rounded-full ${r.color}`} />
                           <span className="text-[10px] font-black uppercase tracking-tight text-[#202124]">{r.label}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#70757A]">{r.range}</span>
                     </div>
                  );
                })}
             </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg items-start">
             <Info className="w-4 h-4 text-[#1A73E8] shrink-0 mt-0.5" />
             <p className="text-[10px] text-[#202124] leading-tight uppercase font-bold">
                Note: BMI is a population screening tool. Highly muscular individuals may receive non-linear classifications.
             </p>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Anthropometric Health Audit</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                The standard metabolic screening engine for adults in Nepal. Calibrated to <strong>WHO International</strong> standards, this tool 
                provides immediate verification of Body Mass Index (BMI). Designed for longitudinal health tracking, it helps identify potential 
                metabolic risks across population-level datasets.
             </p>
          </div>
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
        },
        {
          question: "Can I use this calculator for children?",
          answer: "No, BMI calculation for children and teens is interpreted differently using age-and-sex-specific percentiles. This calculator is designed for adults aged 20 and older."
        },
        {
          question: "Does BMI measure body fat directly?",
          answer: "No, BMI does not measure body fat directly. It is a measure of excess weight rather than excess body fat. However, it is moderately correlated with direct measures of body fat."
        },
        {
          question: "Why does the South Asian population have different risk thresholds?",
          answer: "Research indicates that South Asians often have a higher percentage of body fat and increased metabolic risk at lower BMI levels compared to other populations. Some experts suggest using 23.0 as the overweight threshold for this region."
        },
        {
          question: "How often should I check my BMI?",
          answer: "Checking your BMI every few months as part of a general health routine is usually sufficient. Focus more on long-term trends and lifestyle habits rather than daily fluctuations."
        }
      ]}
      sidebar={{
        title: "Health Tools",
        links: [
          { label: "Calorie Calculator", href: "/calculator/calorie-calculator/" },
          { label: "Ideal Weight", href: "/calculator/ideal-weight/" },
          { label: "Body Fat %", href: "/calculator/body-fat/" },
          { label: "BMR Calculator", href: "/calculator/bmr/" },
        ],
        banner: {
          title: "Focus on Health",
          description: "BMI is just one metric. Combine it with healthy eating and regular exercise for a holistic wellness approach.",
          image: "/images/health-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Calorie Calculator", href: "/calculator/calorie-calculator/" },
        { label: "Ideal Weight", href: "/calculator/ideal-weight/" },
        { label: "BMR Calculator", href: "/calculator/bmr/" }
      ]}
    />
  );
}
