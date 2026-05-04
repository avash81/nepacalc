'use client';
import { useMemo, useState, useEffect, useRef } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { 
  Map, Layers, Ruler, Building2, Lightbulb, ExternalLink, History, 
  Landmark, Compass, Table, Sigma, Target, Activity, ShieldCheck, 
  MapPin, Search, Zap, Globe, Receipt, ArrowRight, PieChart, Info
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, PieChart as RePieChart, Pie 
} from 'recharts';

const SQFT_PER_ROPANI = 5476;
const SQFT_PER_BIGHA  = 72900;
const SQM_PER_SQFT    = 0.09290304; 

function LandInput({ label, value, onChange, id, color = 'blue' }: { label: string, value: number, onChange: (v: number) => void, id: string, color?: 'blue' | 'emerald' | 'amber' }) {
  const [localVal, setLocalVal] = useState('');
  const isFocused = useRef(false);

  useEffect(() => {
    if (!isFocused.current) {
      const formatted = value === 0 ? '' : Number(value.toFixed(4)).toString();
      setLocalVal(formatted);
    }
  }, [value]);

  const colorClasses = {
    blue: 'focus:border-blue-500',
    emerald: 'focus:border-emerald-500',
    amber: 'focus:border-amber-500'
  };

  return (
    <div className="space-y-1">
      <label className="text-[8px] font-black uppercase text-slate-500 tracking-widest block ml-1" htmlFor={id}>{label}</label>
      <input 
        id={id}
        type="number"
        value={localVal}
        className={`w-full h-11 px-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-black outline-none transition-all ${colorClasses[color]}`}
        placeholder="0"
        step="any"
        onFocus={() => { isFocused.current = true; }}
        onBlur={() => { 
          isFocused.current = false; 
          setLocalVal(value === 0 ? '' : Number(value.toFixed(4)).toString());
        }}
        onChange={(e) => {
          const v = e.target.value;
          setLocalVal(v);
          const num = parseFloat(v);
          onChange(isNaN(num) ? 0 : num);
        }}
      />
    </div>
  );
}

export default function NepalLandCalculator() {
  const [totalSqft, setTotalSqft] = useState(5476);

  const values = useMemo(() => {
    const s = totalSqft;
    const m = s * SQM_PER_SQFT;

    let rh = s;
    const ropani_b = Math.floor(rh / SQFT_PER_ROPANI); rh %= SQFT_PER_ROPANI;
    const aana_b = Math.floor(rh / (SQFT_PER_ROPANI/16)); rh %= (SQFT_PER_ROPANI/16);
    const paisa_b = Math.floor(rh / (SQFT_PER_ROPANI/64)); rh %= (SQFT_PER_ROPANI/64);
    const daam_b = rh / (SQFT_PER_ROPANI/256);

    let rt = s;
    const bigha_b = Math.floor(rt / SQFT_PER_BIGHA); rt %= SQFT_PER_BIGHA;
    const kattha_b = Math.floor(rt / (SQFT_PER_BIGHA/20)); rt %= (SQFT_PER_BIGHA/20);
    const dhur_b = rt / (SQFT_PER_BIGHA/400);

    const chartData = [
      { name: 'Ropani Ratio', val: Math.round(s / SQFT_PER_ROPANI * 100) / 100, fill: '#3b82f6' },
      { name: 'Bigha Ratio', val: Math.round(s / SQFT_PER_BIGHA * 100) / 100, fill: '#10b981' }
    ];

    const hierarchyData = [
      { name: 'Ropani', val: 5476, fill: '#3b82f6' },
      { name: 'Aana', val: 342.25, fill: '#60a5fa' },
      { name: 'Paisa', val: 85.56, fill: '#93c5fd' },
      { name: 'Daam', val: 21.39, fill: '#bfdbfe' }
    ];

    return { 
      sqft: s, sqm: m, 
      ropani: s / SQFT_PER_ROPANI, aana: s / (SQFT_PER_ROPANI/16), paisa: s / (SQFT_PER_ROPANI/64), daam: s / (SQFT_PER_ROPANI/256),
      bigha: s / SQFT_PER_BIGHA, kattha: s / (SQFT_PER_BIGHA/20), dhur: s / (SQFT_PER_BIGHA/400),
      ropani_b, aana_b, paisa_b, daam_b, bigha_b, kattha_b, dhur_b,
      chartData, hierarchyData
    };
  }, [totalSqft]);

  const update = (field: string, val: number) => {
    let newSqft = 0;
    switch(field) {
      case 'ropani': newSqft = val * SQFT_PER_ROPANI; break;
      case 'aana':   newSqft = val * (SQFT_PER_ROPANI/16); break;
      case 'paisa':  newSqft = val * (SQFT_PER_ROPANI/64); break;
      case 'daam':   newSqft = val * (SQFT_PER_ROPANI/256); break;
      case 'bigha':  newSqft = val * SQFT_PER_BIGHA; break;
      case 'kattha': newSqft = val * (SQFT_PER_BIGHA/20); break;
      case 'dhur':   newSqft = val * (SQFT_PER_BIGHA/400); break;
      case 'sqft':   newSqft = val; break;
      case 'sqm':    newSqft = val / SQM_PER_SQFT; break;
    }
    setTotalSqft(Math.max(0, newSqft));
  };

  const inputBlock = (
    <div className="space-y-8">
      <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-10 opacity-10"><Map className="w-40 h-40" /></div>
         <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-blue-500/20 rounded-lg"><Compass className="w-4 h-4 text-blue-400" /></div>
               <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-400">Hill Region (R-A-P-D)</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <LandInput label="Ropani" value={values.ropani} onChange={v => update('ropani', v)} id="ropani" color="blue" />
               <LandInput label="Aana" value={values.aana} onChange={v => update('aana', v)} id="aana" color="blue" />
               <LandInput label="Paisa" value={values.paisa} onChange={v => update('paisa', v)} id="paisa" color="blue" />
               <LandInput label="Daam" value={values.daam} onChange={v => update('daam', v)} id="daam" color="blue" />
            </div>
            <div className="pt-6 border-t border-white/10 flex items-center gap-3">
               <div className="p-2 bg-emerald-500/20 rounded-lg"><Globe className="w-4 h-4 text-emerald-400" /></div>
               <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Terai Region (B-K-D)</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
               <LandInput label="Bigha" value={values.bigha} onChange={v => update('bigha', v)} id="bigha" color="emerald" />
               <LandInput label="Kattha" value={values.kattha} onChange={v => update('kattha', v)} id="kattha" color="emerald" />
               <LandInput label="Dhur" value={values.dhur} onChange={v => update('dhur', v)} id="dhur" color="emerald" />
            </div>
         </div>
      </div>

      <div className="p-8 border border-slate-200 rounded-[2rem] bg-white space-y-6 shadow-sm">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-lg"><Ruler className="w-4 h-4 text-slate-600" /></div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Metric Reference</h3>
         </div>
         <div className="grid grid-cols-1 gap-4">
            <div className="relative">
               <label className="text-[8px] font-black text-slate-500 uppercase ml-1">Total Square Feet (ft²)</label>
               <input type="number" value={values.sqft} onChange={e => update('sqft', Number(e.target.value))} className="w-full h-12 px-6 bg-slate-50 border border-slate-200 rounded-xl text-lg font-black text-slate-900 focus:border-blue-500 outline-none transition-all" />
            </div>
            <div className="relative">
               <label className="text-[8px] font-black text-slate-500 uppercase ml-1">Total Square Meters (m²)</label>
               <input type="number" value={values.sqm} onChange={e => update('sqm', Number(e.target.value))} className="w-full h-12 px-6 bg-slate-50 border border-slate-200 rounded-xl text-lg font-black text-slate-900 focus:border-blue-500 outline-none transition-all" />
            </div>
         </div>
      </div>
    </div>
  );

  return (
    <ModernCalcLayout
      slug="nepal-land"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Tools', href: '/nepal/' }, { label: 'Land Converter' }]}
      title="Nepal Land"
      description="The definitive institutional benchmark for Nepalese land measurement. Convert Ropani, Aana, Bigha, and Kattha with 100% Lalpurja precision based on DoLMA 2082 standards."
      icon={Map}
      inputs={inputBlock}
      results={
        <div className="space-y-6">
          <div className="p-10 bg-white border border-slate-200 rounded-[3.5rem] text-center space-y-2 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><MapPin className="w-24 h-24 text-blue-600" /></div>
             <div className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Official notation (Hill)</div>
             <div className="text-4xl font-black tracking-tighter text-slate-900 font-mono uppercase">
                {values.ropani_b}-{values.aana_b}-{values.paisa_b}-{values.daam_b.toFixed(1)}
             </div>
             <div className="px-5 py-2 bg-slate-100 rounded-full inline-block text-[10px] font-black uppercase tracking-tight text-slate-500">
                R-A-P-D Standard
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-1 text-center">
                <div className="text-[9px] font-black text-slate-400 uppercase">Terai B-K-D</div>
                <div className="text-xl font-black text-slate-900">
                   {values.bigha_b}-{values.kattha_b}-{values.dhur_b.toFixed(1)}
                </div>
             </div>
             <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl space-y-1 text-center">
                <div className="text-[9px] font-black text-blue-600 uppercase">Gross SQFT</div>
                <div className="text-xl font-black text-blue-600">{Math.round(values.sqft).toLocaleString()}</div>
             </div>
          </div>

          <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all"><Landmark className="w-24 h-24 text-blue-500" /></div>
             <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Metric Integrity</h4>
                   <p className="text-2xl font-black">{Math.round(values.sqm)} m²</p>
                </div>
                <div className="bg-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-black text-emerald-400 uppercase tracking-tighter">
                   DoLMA 2082 Standard
                </div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><PieChart className="w-20 h-20 text-blue-600" /></div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Hilly Unit Hierarchy</h3>
              </div>
              <div className="h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={values.hierarchyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={95}
                      paddingAngle={8}
                      dataKey="val"
                      stroke="none"
                    >
                      {values.hierarchyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                       formatter={(v: number) => `${v} ft²`}
                       contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', fontSize: '11px', fontWeight: 'bold' }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                   <span className="text-[9px] font-black text-slate-400 uppercase">1 Ropani</span>
                   <span className="text-lg font-black text-slate-900">5476 ft²</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1A1A2E] text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden flex flex-col justify-center">
               <div className="absolute -bottom-12 -right-12 opacity-10"><ShieldCheck className="w-64 h-64 text-emerald-500" /></div>
               <h3 className="text-2xl font-black mb-8 tracking-tight text-emerald-400 uppercase tracking-widest">Regional Scale Matrix</h3>
               <div className="h-[240px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={values.chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#94a3b8', fontWeight: 'bold'}} />
                      <YAxis hide />
                      <Tooltip 
                         contentStyle={{ backgroundColor: '#1A1A2E', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '10px' }}
                         formatter={(v: number) => `${v} Ratio`}
                      />
                      <Bar dataKey="val" radius={[4, 4, 0, 0]} barSize={40}>
                         {values.chartData.map((entry, index) => (
                            <Cell key={`cell-bar-${index}`} fill={entry.fill} />
                         ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
               </div>
               <p className="mt-6 text-[9px] text-slate-500 leading-relaxed uppercase tracking-widest font-black">
                  Audit of relative area density across Hilly (Ropani) and Terai (Bigha) systems.
               </p>
            </div>
          </div>

          <section className="bg-white border border-slate-200 rounded-[3rem] p-12 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 opacity-5">
                <Landmark className="w-64 h-64 text-blue-600" />
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-2xl">
                  <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">The Nepal Land Encyclopedia: Institutional Area Mechanics</h2>
            </div>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8 text-lg">
              <p>
                Land measurement in <strong>Nepal</strong> is a unique dualistic system governed by topography. The <strong>Ropani-Aana-Paisa-Daam (RAPD)</strong> system is the legal standard for hilly regions (including the Kathmandu Valley), while the <strong>Bigha-Kattha-Dhur (BKD)</strong> system is used in the Terai plains. Understanding these units is critical for property registration, banking valuation, and legal documentation (Lalpurja).
              </p>
              
              <div className="bg-blue-50 border border-blue-100 p-8 rounded-[2.5rem] flex gap-6 items-start my-10">
                 <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Info className="w-6 h-6 text-blue-600" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-widest">The Ropani Standard (5476 sq. ft.)</h4>
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                      1 Ropani is defined as <strong>5476 square feet</strong>. This unit is subdivided into 16 Aana. The precision of these measurements is vital for <strong>Kittakat</strong> (land subdivision) processes in urban Kathmandu and Lalitpur.
                    </p>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">1. Regional System Divergence</h3>
              <p>
                Investors moving from the Terai to the Hills (or vice versa) often face confusion due to the scale difference. 1 Bigha is equivalent to <strong>13.31 Ropani</strong>, or 72,900 square feet. This massive difference reflects the agricultural vs. residential land-use history of the two regions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-slate-50">
                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">Hill RAPD Matrix</h4>
                    <div className="text-[10px] space-y-2 text-slate-500 font-bold">
                       <div className="flex justify-between border-b pb-1"><span>1 Ropani</span><span>16 Aana</span></div>
                       <div className="flex justify-between border-b pb-1"><span>1 Aana</span><span>4 Paisa</span></div>
                       <div className="flex justify-between border-b pb-1"><span>1 Paisa</span><span>4 Daam</span></div>
                    </div>
                 </div>
                 <div className="p-8 border border-slate-200 rounded-[2rem] space-y-4 bg-emerald-50">
                    <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest">Terai BKD Matrix</h4>
                    <div className="text-[10px] space-y-2 text-slate-500 font-bold">
                       <div className="flex justify-between border-b pb-1"><span>1 Bigha</span><span>20 Kattha</span></div>
                       <div className="flex justify-between border-b pb-1"><span>1 Kattha</span><span>20 Dhur</span></div>
                       <div className="flex justify-between border-b pb-1"><span>1 Dhur</span><span>182.25 ft²</span></div>
                    </div>
                 </div>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase">2. Vastu & Urban Development Rules</h3>
              <p>
                In Nepal, plot orientation (Vastu) is often as important as area. Plots facing <strong>North or East</strong> carry a premium. Urban development rules in Kathmandu (KVDA) also mandate <strong>minimum land requirements</strong> for building permits—typically 3-4 Aana depending on the specific municipality and road access width.
              </p>
            </div>
          </section>

          <section className="bg-slate-900 text-white rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
             <div className="absolute -bottom-12 -right-12 opacity-10"><Compass className="w-64 h-64 text-blue-500" /></div>
             <h2 className="text-3xl font-black mb-10 tracking-tight text-blue-400 uppercase tracking-widest">Land Integrity Guardrails</h2>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><History className="w-5 h-5" /> Kittakat Restriction</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Legal land subdivision (Kittakat) is often restricted to prevent fragmented urban sprawl. Always check the current <strong>Malpot</strong> (Land Revenue) notices for active freezes.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><Receipt className="w-5 h-5" /> Registration Tax</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Land transfer tax (Registration Fee) is calculated based on <strong>Government Valuation</strong>, which is usually lower than the market price but updated annually by the district office.
                   </p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-black flex items-center gap-2 text-emerald-400"><ShieldCheck className="w-5 h-5" /> Lalpurja Audit</h4>
                   <p className="text-xs text-slate-400 leading-relaxed">
                      Verify that the area on the <strong>Lalpurja</strong> matches the physical survey (Napi). Encroachments are common and can lead to legal disputes during bank valuation.
                   </p>
                </div>
             </div>
          </section>
        </div>
      }
      howToUse={{
        steps: [
          "Selection: Use the Hill section for Kathmandu/Hilly regions and Terai for plains.",
          "Input: Enter the specific units (Ropani, Aana, etc.) or gross Square Feet/Meters.",
          "Audit: Review the real-time conversion across all standard Nepalese systems.",
          "Notation: Use the dash-notation (e.g., 0-12-2-1) for official Malpot and bank forms.",
          "Validation: Cross-check the result with your Lalpurja area field for verification."
        ]
      }}
      formula={{
        title: "Standard Conversion Calculus",
        description: "Official constants used by the Department of Land Reform and Management.",
        raw: "$$1\ Ropani = 5476\ ft^2 \\quad | \\quad 1\ Bigha = 72900\ ft^2$$",
        latex: "1 Ropani = 5476 ft^2 | 1 Bigha = 72900 ft^2"
      }}
      faqs={[
        { question: "How many square feet are in 1 Aana?", answer: "1 Aana is equal to 342.25 square feet in the Nepalese hilly land measurement system." },
        { question: "How many Aana make 1 Ropani?", answer: "Exactly 16 Aana make 1 Ropani (5476 square feet)." },
        { question: "What is 1 Bigha in Ropani?", answer: "1 Bigha is equivalent to approximately 13.31 Ropani (72,900 square feet)." },
        { question: "What is the difference between RAPD and BKD systems?", answer: "RAPD (Ropani-Aana-Paisa-Daam) is used in Hilly regions and Kathmandu, while BKD (Bigha-Kattha-Dhur) is used in the Terai plains." },
        { question: "What is a 'Lalpurja'?", answer: "Lalpurja is the official Land Ownership Certificate issued by the Government of Nepal (Department of Land Management)." },
        { question: "How many Dhur make 1 Kattha?", answer: "Exactly 20 Dhur make 1 Kattha, and 20 Kattha make 1 Bigha." },
        { question: "Is this updated for FY 2081/82?", answer: "Yes, it utilizes the official constants maintained by the Ministry of Land Management for the current fiscal year." }
      ]}
      sidebar={{
        title: "Nepal Land Hub",
        subtitle: "Property Standards",
        links: [
          { label: "Salary Calculator", href: "/calculator/nepal-salary", icon: Receipt },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax", icon: Landmark },
          { label: "Vehicle Tax Tool", href: "/calculator/nepal-vehicle-tax", icon: Globe },
          { label: "DoLMA Official", href: "https://dolma.gov.np", icon: MapPin },
        ],
      }}
      relatedTools={[
        { label: "Salary Calculator", href: "/calculator/nepal-salary" },
        { label: "Income Tax Tool", href: "/calculator/nepal-income-tax" },
        { label: "Vehicle Tax Tool", href: "/calculator/nepal-vehicle-tax" }
      ]}
    />
  );
}
