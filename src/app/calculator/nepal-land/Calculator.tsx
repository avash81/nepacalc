'use client';
import { useMemo, useState } from 'react';
import { useSyncState } from '@/hooks/useSyncState';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Map, Layers, Ruler, Info } from 'lucide-react';

const SQFT_PER_ROPANI = 5476;
const SQFT_PER_BIGHA  = 72900;
const SQM_PER_SQFT    = 0.09290304;

export default function NepalLandCalculator() {
  const [state, setState] = useSyncState('nepal_land_pro_v1', { totalSqft: 5476 });
  const { totalSqft } = state;

  const values = useMemo(() => {
    let s = totalSqft, m = s * SQM_PER_SQFT;
    let rh = s;
    const ropani = Math.floor(rh / SQFT_PER_ROPANI); rh %= SQFT_PER_ROPANI;
    const aana = Math.floor(rh / (SQFT_PER_ROPANI/16)); rh %= (SQFT_PER_ROPANI/16);
    const paisa = Math.floor(rh / (SQFT_PER_ROPANI/64)); rh %= (SQFT_PER_ROPANI/64);
    const daam = rh / (SQFT_PER_ROPANI/256);

    let rt = s;
    const bigha = Math.floor(rt / SQFT_PER_BIGHA); rt %= SQFT_PER_BIGHA;
    const kattha = Math.floor(rt / (SQFT_PER_BIGHA/20)); rt %= (SQFT_PER_BIGHA/20);
    const dhur = rt / (SQFT_PER_BIGHA/400);

    return { sqft: s, sqm: m, ropani, aana, paisa, daam, bigha, kattha, dhur, acres: s / 43560, hectares: m / 10000 };
  }, [totalSqft]);

  const updateFrom = (unit: string, val: number) => {
    let newSqft = 0; const v = values;
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

  const inputCls = "w-full h-10 px-3 border border-[#DADCE0] rounded bg-white text-xs font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[10px] font-bold uppercase text-[#70757A] tracking-wider block mb-1";

  const InputGroup = ({ title, icon: Icon, colorCls, children }: any) => (
    <div className="bg-white border border-[#DADCE0] rounded-lg overflow-hidden">
      <div className={`px-4 py-2 flex items-center gap-2 ${colorCls}`}>
        <Icon className="w-3 h-3 opacity-80" />
        <h3 className="text-[10px] font-bold uppercase tracking-wider">{title}</h3>
      </div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {children}
      </div>
    </div>
  );

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'Land Area Converter' }]}
      title="Nepal Land Converter"
      description="Convert Ropani, Bigha, Kattha, Dhur, and global metrics instantly. Bidirectional mapping between Hilly and Terai measurement systems."
      icon={Map}
      inputs={
        <div className="space-y-6">
          <InputGroup title="Hilly Region (Ropani System)" icon={Map} colorCls="bg-[#E8F0FE] text-[#1A73E8] border-b border-[#C5D9F7]">
            <div><label className={labelCls}>Ropani</label><input type="number" value={values.ropani} onChange={e => updateFrom('ropani', Number(e.target.value))} className={inputCls} min={0} /></div>
            <div><label className={labelCls}>Aana</label><input type="number" value={values.aana} onChange={e => updateFrom('aana', Number(e.target.value))} className={inputCls} min={0} max={15} /></div>
            <div><label className={labelCls}>Paisa</label><input type="number" value={values.paisa} onChange={e => updateFrom('paisa', Number(e.target.value))} className={inputCls} min={0} max={3} /></div>
            <div><label className={labelCls}>Daam</label><input type="number" value={Number(values.daam.toFixed(2))} onChange={e => updateFrom('daam', Number(e.target.value))} className={inputCls} min={0} max={3.99} /></div>
          </InputGroup>

          <InputGroup title="Terai Region (Bigha System)" icon={Layers} colorCls="bg-[#E6F4EA] text-[#188038] border-b border-[#CEEAD6]">
            <div><label className={labelCls}>Bigha</label><input type="number" value={values.bigha} onChange={e => updateFrom('bigha', Number(e.target.value))} className={inputCls} min={0} /></div>
            <div><label className={labelCls}>Kattha</label><input type="number" value={values.kattha} onChange={e => updateFrom('kattha', Number(e.target.value))} className={inputCls} min={0} max={19} /></div>
            <div className="col-span-2"><label className={labelCls}>Dhur</label><input type="number" value={Number(values.dhur.toFixed(2))} onChange={e => updateFrom('dhur', Number(e.target.value))} className={inputCls} min={0} max={19.99} /></div>
          </InputGroup>

          <InputGroup title="Universal Area Metrics" icon={Ruler} colorCls="bg-[#F8F9FA] text-[#202124] border-b border-[#DADCE0]">
            <div className="col-span-2"><label className={labelCls}>Square Feet (ft²)</label><input type="number" value={Math.round(values.sqft)} onChange={e => updateFrom('sqft', Number(e.target.value))} className={inputCls} min={0} /></div>
            <div className="col-span-2"><label className={labelCls}>Square Meters (m²)</label><input type="number" value={Number(values.sqm.toFixed(2))} onChange={e => updateFrom('sqm', Number(e.target.value))} className={inputCls} min={0} /></div>
          </InputGroup>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-[#70757A] tracking-wider">Quick Benchmarks</label>
            <div className="grid grid-cols-3 gap-2">
              {[{ label: '1 Ropani', sqft: 5476 }, { label: '1 Bigha', sqft: 72900 }, { label: '1 Kattha', sqft: 3645 }].map(b => (
                <button key={b.label} onClick={() => setState({ totalSqft: b.sqft })}
                  className="py-2 bg-white border border-[#DADCE0] hover:bg-[#F8F9FA] rounded text-[10px] font-bold uppercase transition-colors">
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-[#1A1A2E] border border-[#DADCE0] rounded-lg text-center space-y-2 text-white">
            <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Consolidated Area Base</div>
            <div className="text-4xl font-black">{Math.round(values.sqft).toLocaleString()} <span className="text-lg text-blue-400">ft²</span></div>
            <div className="text-[11px] font-bold text-white/60 uppercase">{values.sqm.toFixed(2).toLocaleString()} sq.meters</div>
            
            <div className="pt-4 mt-4 border-t border-white/10 flex justify-around">
               <div><div className="text-[9px] text-white/40 uppercase">Total Acres</div><div className="font-bold text-sm">{values.acres.toFixed(4)}</div></div>
               <div><div className="text-[9px] text-white/40 uppercase">Total Hectares</div><div className="font-bold text-sm">{values.hectares.toFixed(4)}</div></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#E8F0FE] border border-[#C5D9F7] rounded-lg p-4 text-center">
              <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider mb-3">Hill Breakdown</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="font-black text-lg">{values.ropani}</span><div className="text-[9px] text-[#70757A] uppercase">Ropani</div></div>
                <div><span className="font-black text-lg">{values.aana}</span><div className="text-[9px] text-[#70757A] uppercase">Aana</div></div>
                <div><span className="font-black text-lg">{values.paisa}</span><div className="text-[9px] text-[#70757A] uppercase">Paisa</div></div>
                <div><span className="font-black text-lg">{values.daam.toFixed(1)}</span><div className="text-[9px] text-[#70757A] uppercase">Daam</div></div>
              </div>
            </div>
            
            <div className="bg-[#E6F4EA] border border-[#CEEAD6] rounded-lg p-4 text-center">
              <div className="text-[10px] font-bold text-[#188038] uppercase tracking-wider mb-3">Terai Breakdown</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="font-black text-lg">{values.bigha}</span><div className="text-[9px] text-[#70757A] uppercase">Bigha</div></div>
                <div><span className="font-black text-lg">{values.kattha}</span><div className="text-[9px] text-[#70757A] uppercase">Kattha</div></div>
                <div className="col-span-2"><span className="font-black text-lg">{values.dhur.toFixed(1)}</span><div className="text-[9px] text-[#70757A] uppercase">Dhur</div></div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 p-3 bg-[#FFF7E0] border border-[#FEEFC3] rounded-lg items-start">
            <Info className="w-4 h-4 text-[#F29900] shrink-0 mt-0.5" />
            <p className="text-[10px] text-[#202124] leading-tight">These conversions follow standard Nepal Survey Department formulas. Be aware that traditional local measures (e.g. Haath) may vary slightly from region to region.</p>
          </div>
        </div>
      }
      howToUse={{ steps: ["Choose the section matching your source data (Hilly, Terai, or Universal).", "Enter your area value in the respective input field.", "All other fields instantly sync. For example, editing 'Kattha' updates 'Aana', 'SqFt', and 'Acres' automatically."] }}
      formula={{ title: "Nepal Land Conversions", description: "Standard conversions between systems.", raw: "1 Ropani = 16 Aana = 5476 SqFt\n1 Aana = 4 Paisa = 342.25 SqFt\n1 Paisa = 4 Daam = 85.56 SqFt\n\n1 Bigha = 20 Kattha = 72900 SqFt = 13.31 Ropani\n1 Kattha = 20 Dhur = 3645 SqFt\n1 Dhur = 182.25 SqFt" }}
      faqs={[
        { question: "Are Ropani and Bigha used everywhere in Nepal?", answer: "No. The Ropani system (Ropani, Aana, Paisa, Daam) is primarily used in the Hilly and Mountainous regions, including Kathmandu Valley. The Bigha system (Bigha, Kattha, Dhur) is used in the Terai plains." },
        { question: "How many Ropani makes 1 Bigha?", answer: "1 Bigha is equivalent to approximately 13.31 Ropani." }
      ]}
      sidebar={{ title: "Real Estate Tools", links: [{ label: "Property Registration", href: "/calculator/property-registration" }, { label: "Property Tax", href: "/calculator/property-tax" }, { label: "Mortgage Calculator", href: "/calculator/mortgage-calculator" }, { label: "EMI Calculator", href: "/calculator/loan-emi" }], banner: { title: "Land Survey", description: "Always consult a registered surveyor for precise boundary demarcations.", image: "/images/land-banner.jpg" } }}
      relatedTools={[{ label: "Property Registration", href: "/calculator/property-registration" }, { label: "Property Tax", href: "/calculator/property-tax" }, { label: "Mortgage", href: "/calculator/mortgage-calculator" }]}
    />
  );
}
