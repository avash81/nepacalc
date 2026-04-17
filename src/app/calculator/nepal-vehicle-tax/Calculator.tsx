'use client';

import { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { useSyncState } from '@/hooks/useSyncState';
import { Car, Bike, Info, ShieldCheck } from 'lucide-react';

const DEFAULT_STATE = {
  vType: 'bike' as 'bike' | 'car',
  engineCC: 150,
  carType: 'private' as 'private' | 'public',
};

// Rates based on Bagmati Province FY 2081/82 (Latest standard)
const BIKE_RATES = [
  { max: 125, rate: 3000 },
  { max: 150, rate: 5000 },
  { max: 225, rate: 6500 },
  { max: 400, rate: 11000 },
  { max: 650, rate: 20000 },
  { max: Infinity, rate: 35000 },
];

const CAR_RATES = {
  private: [
    { max: 1000, rate: 22000 },
    { max: 1500, rate: 25000 },
    { max: 2000, rate: 34000 },
    { max: 2500, rate: 43000 },
    { max: 2900, rate: 56000 },
    { max: Infinity, rate: 65000 },
  ],
  public: [
    { max: 1000, rate: 2500 }, // Typical rate for small taxi
    { max: 1500, rate: 3500 },
    { max: Infinity, rate: 5000 },
  ]
};

export default function NepalVehicleTaxCalculator() {
  const [state, setState] = useSyncState('nepal_vehicle_tax_v1', DEFAULT_STATE);
  const { vType, engineCC, carType } = state;

  const results = useMemo(() => {
    let baseTax = 0;
    if (vType === 'bike') {
      const slab = BIKE_RATES.find(s => engineCC <= s.max);
      baseTax = slab ? slab.rate : 0;
    } else {
      const list = CAR_RATES[carType];
      const slab = list.find(s => engineCC <= s.max);
      baseTax = slab ? slab.rate : 0;
    }

    const insuranceEst = vType === 'bike' ? 2200 : 8000; // Rough estimation
    return { baseTax, total: baseTax + insuranceEst, insuranceEst };
  }, [vType, engineCC, carType]);

  return (
    <CalculatorLayout
      title="Nepal Vehicle Tax Calculator"
      description="Calculate your annual pink-book (blue-book) renewal tax for motorbikes and cars in Nepal. Based on the latest provincial tax slabs (Bagmati Province standard)."
      category={{ label: 'Nepal Tools', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-6">
          <div className="space-y-3">
             <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Vehicle Type</label>
             <div className="flex gap-4">
                <button 
                   onClick={() => setState({ ...state, vType: 'bike' })}
                   className={`flex-1 p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${vType === 'bike' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                >
                   <Bike className={`w-8 h-8 ${vType === 'bike' ? 'text-emerald-600' : 'text-slate-400'}`} />
                   <span className={`text-[10px] font-black uppercase tracking-widest ${vType === 'bike' ? 'text-emerald-700' : 'text-slate-500'}`}>Motorbike</span>
                </button>
                <button 
                   onClick={() => setState({ ...state, vType: 'car' })}
                   className={`flex-1 p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${vType === 'car' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                >
                   <Car className={`w-8 h-8 ${vType === 'car' ? 'text-emerald-600' : 'text-slate-400'}`} />
                   <span className={`text-[10px] font-black uppercase tracking-widest ${vType === 'car' ? 'text-emerald-700' : 'text-slate-500'}`}>Car / Jeep</span>
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
             <ValidatedInput 
                label="Engine Capacity (CC)" 
                value={engineCC} 
                onChange={v => setState({ ...state, engineCC: v })} 
                min={1} max={10000} 
                suffix="CC" 
             />
             
             {vType === 'car' && (
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Ownership Type</label>
                   <div className="flex p-1 bg-slate-100 rounded-xl">
                      {(['private', 'public'] as const).map(t => (
                        <button key={t} onClick={() => setState({ ...state, carType: t })}
                          className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${carType === t ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}>
                          {t}
                        </button>
                      ))}
                   </div>
                </div>
             )}
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-3 items-start">
            <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-emerald-700 font-medium leading-relaxed">
              Tax rates vary slightly by province. These slabs are based on Bagmati Province standards for FY 2081/82 and 2082/83.
            </p>
          </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-center">
            <div className="p-10 border-b border-slate-50">
               <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-2">Annual Government Tax</div>
               <div className="text-6xl font-black text-slate-900 tracking-tighter">
                 Rs. {results.baseTax.toLocaleString()}
               </div>
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{engineCC} CC {vType}</div>
            </div>
            <div className="p-6 bg-slate-50 flex justify-between px-10">
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total with Est. Insurance</span>
               <span className="text-sm font-black text-slate-900">Rs. {results.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="p-6 bg-emerald-950 text-white rounded-3xl space-y-4 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                 <ShieldCheck className="w-5 h-5 text-emerald-400" />
                 <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Compliance Check</h3>
              </div>
              <div className="space-y-3">
                  <p className="text-[11px] text-emerald-200 leading-relaxed">
                    Make sure to pay your tax within the first 3 months of the new fiscal year (or blue book expiry) to avoid the 20% fine.
                  </p>
              </div>
          </div>
        </div>
      }
      faqSection={
        <CalcFAQ faqs={[
          { question: 'When should I pay vehicle tax in Nepal?', answer: 'Annual tax must be paid within 3 months of the expiry date mentioned in your vehicle registration book (Blue Book). Failure to do so results in a penalty.' },
          { question: 'What are the penalties for late payment?', answer: 'The penalty starts from 5% within the first month after the 3-month grace period and goes up to 20% for the full fiscal year delay.' },
          { question: 'Do electric vehicles pay tax?', answer: 'Electric vehicles in Nepal enjoy significantly lower annual taxes compared to fuel-burning vehicles, often based on peak power output in Kilowatts.' },
        ]} />
      }
    />
  );
}
