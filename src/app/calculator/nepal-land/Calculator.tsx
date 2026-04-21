'use client';
import { useMemo, useState } from 'react';
import { useSyncState } from '@/hooks/useSyncState';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { Info, LayoutGrid, Map, Ruler, Layers } from 'lucide-react';

const SQFT_PER_ROPANI = 5476;
const SQFT_PER_BIGHA  = 72900;
const SQM_PER_SQFT    = 0.09290304;

export default function NepalLandCalculator() {
  const [activeUnit, setActiveUnit] = useState<string | null>(null);
  
  const [state, setState] = useSyncState('nepal_land_pro_v1', {
    totalSqft: 5476 // Default 1 Ropani
  });

  const { totalSqft } = state;

  // ── Conversion Logic ──
  const values = useMemo(() => {
    let s = totalSqft;
    let m = s * SQM_PER_SQFT;

    // Hill Logic
    let rh = s;
    const ropani = Math.floor(rh / SQFT_PER_ROPANI); rh %= SQFT_PER_ROPANI;
    const aana   = Math.floor(rh / (SQFT_PER_ROPANI/16)); rh %= (SQFT_PER_ROPANI/16);
    const paisa  = Math.floor(rh / (SQFT_PER_ROPANI/64)); rh %= (SQFT_PER_ROPANI/64);
    const daam   = rh / (SQFT_PER_ROPANI/256);

    // Terai Logic
    let rt = s;
    const bigha  = Math.floor(rt / SQFT_PER_BIGHA); rt %= SQFT_PER_BIGHA;
    const kattha = Math.floor(rt / (SQFT_PER_BIGHA/20)); rt %= (SQFT_PER_BIGHA/20);
    const dhur   = rt / (SQFT_PER_BIGHA/400);

    return {
      sqft: s, sqm: m,
      ropani, aana, paisa, daam,
      bigha, kattha, dhur,
      acres: s / 43560,
      hectares: m / 10000
    };
  }, [totalSqft]);

  const updateFrom = (unit: string, val: number) => {
    let newSqft = 0;
    const v = values;

    switch(unit) {
      case 'ropani': newSqft = val * SQFT_PER_ROPANI + v.aana*(SQFT_PER_ROPANI/16) + v.paisa*(SQFT_PER_ROPANI/64) + v.daam*(SQFT_PER_ROPANI/256); break;
      case 'aana':   newSqft = v.ropani * SQFT_PER_ROPANI + val*(SQFT_PER_ROPANI/16) + v.paisa*(SQFT_PER_ROPANI/64) + v.daam*(SQFT_PER_ROPANI/256); break;
      case 'paisa':  newSqft = v.ropani * SQFT_PER_ROPANI + v.aana*(SQFT_PER_ROPANI/16) + val*(SQFT_PER_ROPANI/64) + v.daam*(SQFT_PER_ROPANI/256); break;
      case 'daam':   newSqft = v.ropani * SQFT_PER_ROPANI + v.aana*(SQFT_PER_ROPANI/16) + v.paisa*(SQFT_PER_ROPANI/64) + val*(SQFT_PER_ROPANI/256); break;
      
      case 'bigha':  newSqft = val * SQFT_PER_BIGHA + v.kattha*(SQFT_PER_BIGHA/20) + v.dhur*(SQFT_PER_BIGHA/400); break;
      case 'kattha': newSqft = v.bigha * SQFT_PER_BIGHA + val*(SQFT_PER_BIGHA/20) + v.dhur*(SQFT_PER_BIGHA/400); break;
      case 'dhur':   newSqft = v.bigha * SQFT_PER_BIGHA + v.kattha*(SQFT_PER_BIGHA/20) + val*(SQFT_PER_BIGHA/400); break;
      
      case 'sqft':   newSqft = val; break;
      case 'sqm':    newSqft = val / SQM_PER_SQFT; break;
    }
    setState({ totalSqft: Math.max(0, newSqft) });
  };

  const InputGroup = ({ title, icon: Icon, children, color }: any) => (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm transition-all hover:shadow-md">
      <div className={`px-5 py-3 ${color} border-b border-slate-100 flex items-center gap-2.5`}>
        <Icon className="w-4 h-4 opacity-70" />
        <h3 className="text-[10px] font-black uppercase tracking-widest">{title}</h3>
      </div>
      <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );

  return (
    <CalculatorLayout
      title="Institutional Land Converter"
      description="Professional-grade real-time land unit synchronizer for Ropani, Bigha, Sq.Ft, and international metrics. Verified against Nepal Land Measurement standards."
      category={{ label: 'Nepal Tools', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-6">
          
          {/* 1. Hill System (Hills/Valley) */}
          <InputGroup title="Hilly Region (Ropani System)" icon={Map} color="bg-blue-50/50 text-blue-700">
            <ValidatedInput label="Ropani" value={values.ropani} onChange={v => updateFrom('ropani', v)} min={0} />
            <ValidatedInput label="Aana"   value={values.aana}   onChange={v => updateFrom('aana', v)}   min={0} max={15} />
            <ValidatedInput label="Paisa"  value={values.paisa}  onChange={v => updateFrom('paisa', v)}  min={0} max={3}  />
            <ValidatedInput label="Daam"   value={values.daam}   onChange={v => updateFrom('daam', v)}   min={0} max={3.99} />
          </InputGroup>

          {/* 2. Terai System (Plains) */}
          <InputGroup title="Terai Region (Bigha System)" icon={Layers} color="bg-emerald-50/50 text-emerald-700">
            <ValidatedInput label="Bigha"  value={values.bigha}  onChange={v => updateFrom('bigha', v)}  min={0} />
            <ValidatedInput label="Kattha" value={values.kattha} onChange={v => updateFrom('kattha', v)} min={0} max={19} />
            <div className="col-span-2">
              <ValidatedInput label="Dhur"   value={values.dhur}   onChange={v => updateFrom('dhur', v)}   min={0} max={19.99} />
            </div>
          </InputGroup>

          {/* 3. Global Standards */}
          <InputGroup title="Universal Metrics (Area)" icon={Ruler} color="bg-slate-50 text-slate-700">
            <div className="col-span-2">
              <ValidatedInput label="Square Feet (sq.ft)" value={Math.round(values.sqft)} onChange={v => updateFrom('sqft', v)} min={0} suffix="ft²" />
            </div>
            <div className="col-span-2">
              <ValidatedInput label="Square Meters (sq.m)" value={values.sqm.toFixed(2)} onChange={v => updateFrom('sqm', parseFloat(String(v)))} min={0} suffix="m²" />
            </div>
          </InputGroup>

          {/* Quick Benchmark Reference */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: '1 Ropani', desc: '74 ft × 74 ft', sqft: 5476 },
              { label: '1 Bigha',  desc: '13.31 Ropani', sqft: 72900 },
              { label: '1 Kattha', desc: '442.2 sq.yards', sqft: 3645 },
            ].map(b => (
              <button 
                key={b.label}
                onClick={() => setState({ totalSqft: b.sqft })}
                className="p-5 border-2 border-slate-100 rounded-3xl bg-white hover:border-blue-500 hover:shadow-xl transition-all text-center group"
              >
                <div className="text-sm font-black text-slate-900 group-hover:text-blue-600 mb-1">{b.label}</div>
                <div className="text-[10px] font-bold text-slate-400 group-hover:text-blue-400 uppercase tracking-widest">{b.desc}</div>
              </button>
            ))}
          </div>

        </div>
      }
      rightPanel={
        <div className="space-y-6">
          
          {/* Main Visualized Result */}
          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/40 transition-all duration-700" />
            <div className="relative z-10">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-6 drop-shadow-sm">Consolidated Area Analysis</div>
              <div className="text-6xl font-black tracking-tighter mb-2">{Math.round(values.sqft).toLocaleString()} <span className="text-2xl text-blue-400">ft²</span></div>
              <div className="text-xl font-bold text-slate-400">{values.sqm.toFixed(2).toLocaleString()} sq.meters</div>
              
              <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                   <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Total Acres</span>
                   <span className="text-sm font-black text-blue-400">{values.acres.toFixed(4)} ac</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Total Hectares</span>
                   <span className="text-sm font-black text-blue-400">{values.hectares.toFixed(4)} ha</span>
                </div>
              </div>
            </div>
          </div>

          {/* Unit Information at a Glance (Hilly Area) */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
             <div className="flex items-center gap-2 mb-6">
               <Info className="w-4 h-4 text-blue-500" />
               <h3 className="text-[13px] font-black text-slate-800">Hilly Area Benchmarks</h3>
             </div>
             <div className="grid grid-cols-3 gap-y-6 text-center">
                <div>
                   <div className="text-lg font-black text-slate-900 italic">16</div>
                   <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Aana</div>
                </div>
                <div>
                   <div className="text-lg font-black text-slate-900 italic">64</div>
                   <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Paisa</div>
                </div>
                <div>
                   <div className="text-lg font-black text-slate-900 italic">256</div>
                   <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Daam</div>
                </div>
                <div className="col-span-3 pt-4 border-t border-slate-50 flex justify-around">
                   <div className="text-[11px] font-bold text-slate-500">1 Ropani = 5476 ft²</div>
                   <div className="text-[11px] font-bold text-slate-500">1 Aana = 342.25 ft²</div>
                </div>
             </div>
          </div>

          {/* Unit Information at a Glance (Terai Area) */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
             <div className="flex items-center gap-2 mb-6">
               <Info className="w-4 h-4 text-emerald-500" />
               <h3 className="text-[13px] font-black text-slate-800">Terai Area Benchmarks</h3>
             </div>
             <div className="grid grid-cols-3 gap-y-6 text-center">
                <div>
                   <div className="text-lg font-black text-slate-900 italic">20</div>
                   <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Kattha</div>
                </div>
                <div>
                   <div className="text-lg font-black text-slate-900 italic">400</div>
                   <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Dhur</div>
                </div>
                <div>
                   <div className="text-lg font-black text-slate-900 italic">13.31</div>
                   <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ropani</div>
                </div>
                <div className="col-span-3 pt-4 border-t border-slate-50 flex justify-around">
                   <div className="text-[11px] font-bold text-slate-500">1 Bigha = 72900 ft²</div>
                   <div className="text-[11px] font-bold text-slate-500">1 Kattha = 3645 ft²</div>
                </div>
             </div>
          </div>

        </div>
      }
      faqSection={
        <CalcFAQ faqs={[
          { question: 'What is the Hills Land System?', answer: 'The Hill system (Kathmandu Valley and hilly regions) is based on the Ropani. 1 Ropani = 16 Aana = 64 Paisa = 256 Daam = 5,476 square feet.' },
          { question: 'What is the Terai Land System?', answer: 'The Terai system (plains) is based on the Bigha. 1 Bigha = 20 Kattha = 400 Dhur = 72,900 square feet.' },
          { question: 'How is the cross-conversion calculated?', answer: 'Calculations use the fixed Square Feet mapping as the pivot. 1 Bigha is equivalent to approximately 13.31 Ropani.' },
          { question: 'Are these units official?', answer: 'Yes, these measurements follow the standards used by the Nepal Department of Land Management and Archive (DOLMA).' },
        ]} />
      }
    />
  );
}
