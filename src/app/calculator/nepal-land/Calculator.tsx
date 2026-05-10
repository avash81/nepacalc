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

function LandInput({ label, value, onChange, id }: { label: string, value: number, onChange: (v: number) => void, id: string }) {
  const [localVal, setLocalVal] = useState('');
  const isFocused = useRef(false);

  useEffect(() => {
    if (!isFocused.current) {
      const formatted = value === 0 ? '' : Number(value.toFixed(4)).toString();
      setLocalVal(formatted);
    }
  }, [value]);

  return (
    <div className="space-y-1">
      <label className="text-[10px] font-bold uppercase text-[#5F6368] tracking-wider block ml-1" htmlFor={id}>{label}</label>
      <input 
        id={id}
        type="number"
        value={localVal}
        className="w-full h-11 px-4 bg-white border border-[#DADCE0] rounded-md text-[#202124] text-sm font-bold outline-none focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] transition-all"
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

    const pieData = [
      { name: 'Ropani Fraction', value: s / SQFT_PER_ROPANI },
      { name: 'Aana Fraction', value: (s % SQFT_PER_ROPANI) / (SQFT_PER_ROPANI/16) }
    ];

    const hierarchyData = [
      { name: 'Ropani', val: 5476, fill: '#1A73E8' },
      { name: 'Aana', val: 342.25, fill: '#188038' },
      { name: 'Paisa', val: 85.56, fill: '#F29900' },
      { name: 'Daam', val: 21.39, fill: '#D93025' }
    ];

    return { 
      sqft: s, sqm: m, 
      ropani: s / SQFT_PER_ROPANI, aana: s / (SQFT_PER_ROPANI/16), paisa: s / (SQFT_PER_ROPANI/64), daam: s / (SQFT_PER_ROPANI/256),
      bigha: s / SQFT_PER_BIGHA, kattha: s / (SQFT_PER_BIGHA/20), dhur: s / (SQFT_PER_BIGHA/400),
      ropani_b, aana_b, paisa_b, daam_b, bigha_b, kattha_b, dhur_b,
      pieData, hierarchyData
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

  return (
    <ModernCalcLayout
      slug="nepal-land"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Specific', href: '/nepal/' }, { label: 'Land Converter' }]}
      title="Nepal Land"
      description="The definitive real estate auditing engine for Nepal. Convert Ropani, Aana, Bigha, and Kattha with 100% Lalpurja precision based on DoLMA standards."
      icon={Map}
      inputs={
        <div className="space-y-6">
          <div className="space-y-4">
             <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#5F6368]" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#5F6368]">Hilly Region (R-A-P-D)</h3>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <LandInput label="Ropani" value={values.ropani} onChange={v => update('ropani', v)} id="ropani" />
                <LandInput label="Aana" value={values.aana} onChange={v => update('aana', v)} id="aana" />
                <LandInput label="Paisa" value={values.paisa} onChange={v => update('paisa', v)} id="paisa" />
                <LandInput label="Daam" value={values.daam} onChange={v => update('daam', v)} id="daam" />
             </div>
          </div>

          <div className="pt-6 border-t border-[#DADCE0] space-y-4">
             <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#5F6368]" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#5F6368]">Terai Region (B-K-D)</h3>
             </div>
             <div className="grid grid-cols-3 gap-3">
                <LandInput label="Bigha" value={values.bigha} onChange={v => update('bigha', v)} id="bigha" />
                <LandInput label="Kattha" value={values.kattha} onChange={v => update('kattha', v)} id="kattha" />
                <LandInput label="Dhur" value={values.dhur} onChange={v => update('dhur', v)} id="dhur" />
             </div>
          </div>

          <div className="pt-6 border-t border-[#DADCE0] space-y-4">
             <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#5F6368]" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#5F6368]">Metric Standards</h3>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <LandInput label="Sq. Feet" value={values.sqft} onChange={v => update('sqft', v)} id="sqft" />
                <LandInput label="Sq. Meters" value={values.sqm} onChange={v => update('sqm', v)} id="sqm" />
             </div>
          </div>
          <button className="w-full h-12 bg-[#38761D] hover:bg-[#274e13] text-[#202124] text-sm font-bold uppercase tracking-widest rounded-md transition-colors shadow-sm">
             Generate Area Report
          </button>
        </div>
      }
      results={
        <div className="space-y-6 h-full flex flex-col justify-center">
          <div className="bg-[#E8F0FE] rounded-lg p-8 text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Official Hilly Notation</div>
             <div className="text-4xl font-black text-[#1A73E8]">
                {values.ropani_b}-{values.aana_b}-{values.paisa_b}-{values.daam_b.toFixed(1)}
             </div>
             <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">Ropani-Aana-Paisa-Daam</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#202124] uppercase tracking-wider mb-1">Terai (B-K-D)</div>
                <div className="text-lg font-black text-[#202124]">
                   {values.bigha_b}-{values.kattha_b}-{values.dhur_b.toFixed(1)}
                </div>
             </div>
             <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white">
                <div className="text-[10px] font-bold text-[#202124] uppercase tracking-wider mb-1">Gross Metric</div>
                <div className="text-lg font-black text-[#202124]">{Math.round(values.sqm)} m²</div>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Unit Hierarchy Map</h3>
               </div>
               <div className="h-[240px] w-full relative mb-6">
                 <ResponsiveContainer width="100%" height="100%">
                   <RePieChart>
                     <Pie
                       data={values.hierarchyData}
                       cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="val" stroke="none"
                     >
                       {values.hierarchyData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                     </Pie>
                     <Tooltip formatter={(v: number) => `${v} ft²`} contentStyle={{ borderRadius: '8px', border: '1px solid #DADCE0', fontSize: '11px', fontWeight: 'bold' }} />
                   </RePieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">1 Ropani</span>
                    <span className="text-lg font-black text-[#202124]">5476 ft²</span>
                 </div>
               </div>
               <div className="flex items-center justify-center gap-4 text-[9px] font-bold text-[#5F6368] uppercase tracking-wider">
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#1A73E8]"></div> Ropani</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#188038]"></div> Aana</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#F29900]"></div> Paisa</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#D93025]"></div> Daam</div>
               </div>
             </div>

             <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm flex flex-col justify-center">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-4 bg-[#1A73E8] rounded-full" />
                 <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Regional Scale Audit</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#5F6368] uppercase">Hill (Ropani) Ratio</span>
                     <span className="text-sm font-black text-[#202124]">{values.ropani.toFixed(4)} R</span>
                  </div>
                  <div className="p-4 rounded-md bg-[#F8F9FA] border border-[#DADCE0] flex justify-between items-center">
                     <span className="text-[10px] font-bold text-[#5F6368] uppercase">Terai (Bigha) Ratio</span>
                     <span className="text-sm font-black text-[#202124]">{values.bigha.toFixed(4)} B</span>
                  </div>
                  <div className="p-6 rounded-md bg-[#E8F0FE] border border-[#1A73E8] text-center">
                     <div className="text-[9px] font-black text-[#1A73E8] uppercase mb-1">Scale Difference</div>
                     <p className="text-[11px] font-bold text-[#5F6368] leading-tight">1 Bigha is equivalent to approximately 13.31 Ropani in area density.</p>
                  </div>
               </div>
             </div>
           </div>

           <div className="bg-white border border-[#DADCE0] rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#DADCE0] flex items-center justify-between bg-[#F8F9FA]">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-[#1A73E8]" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Institutional Conversion Table</h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-black uppercase text-[#5F6368] border-b border-[#DADCE0]">
                    <th className="px-6 py-4 bg-white">Unit Name</th>
                    <th className="px-6 py-4 bg-white text-right">Square Feet (ft²)</th>
                    <th className="px-6 py-4 bg-white text-right">Square Meters (m²)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F3F4]">
                  {[
                    { n: '1 Ropani', f: 5476 },
                    { n: '1 Aana', f: 342.25 },
                    { n: '1 Bigha', f: 72900 },
                    { n: '1 Kattha', f: 3645 },
                    { n: '1 Dhur', f: 182.25 }
                  ].map((u, idx) => (
                    <tr key={idx} className="text-sm hover:bg-[#F8F9FA] transition-colors">
                      <td className="px-6 py-4 font-bold text-[#3C4043]">{u.n}</td>
                      <td className="px-6 py-4 text-right font-black text-[#5F6368]">{u.f.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right font-black text-[#1A73E8]">{(u.f * SQM_PER_SQFT).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Units: Select the appropriate section (Hill or Terai) based on the land's location.",
          "Input: Enter the area values from your Lalpurja (Land Ownership Certificate).",
          "Conversion: The engine instantly calculates values across all standard Nepalese systems.",
          "Validation: Check the metric results (Sq. Meters) for official government documentation.",
          "Audit: Review the conversion table for quick reference of institutional constants."
        ]
      }}
      formula={{
        title: "Standard Land Calculus (DoLMA)",
        description: "Official area constants used by the Department of Land Management and Archive of Nepal.",
        raw: "$$1\ Ropani = 5476\ ft^2 \\quad | \\quad 1\ Bigha = 72900\ ft^2$$",
        variables: [
          "Hill: 1 Ropani = 16 Aana = 64 Paisa = 256 Daam",
          "Terai: 1 Bigha = 20 Kattha = 400 Dhur",
          "Metric: 1 Square Foot = 0.0929 Square Meters"
        ]
      }}
      faqs={[
        { question: "How many square feet are in 1 Aana?", answer: "1 Aana is exactly 342.25 square feet in the Nepalese hilly land measurement system." },
        { question: "What is the difference between Ropani and Bigha?", answer: "Ropani is used in the Hilly regions (including Kathmandu), whereas Bigha is used in the Terai plains. 1 Bigha is much larger, equal to 13.31 Ropani." },
        { question: "Is the conversion rate the same for all districts?", answer: "Yes, the mathematical constants for Ropani and Bigha to square feet are institutionalized across Nepal for legal and banking purposes." },
        { question: "What is 1 Kattha in square feet?", answer: "1 Kattha is exactly 3,645 square feet (72900 / 20)." }
      ]}
      sidebar={{
        title: "Nepal Land Hub",
        subtitle: "Property Tools",
        links: [
          { label: "Salary Calculator", href: "/calculator/nepal-salary/", icon: Receipt },
          { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/", icon: Landmark },
          { label: "Home Loan EMI", href: "/calculator/nepal-home-loan/", icon: Building2 },
          { label: "DoLMA Official", href: "https://dolma.gov.np", icon: MapPin },
        ],
      }}
      relatedTools={[
        { label: "Salary Calculator", href: "/calculator/nepal-salary/" },
        { label: "Income Tax Tool", href: "/calculator/nepal-income-tax/" },
        { label: "Home Loan EMI", href: "/calculator/nepal-home-loan/" },
        { label: "Vehicle Tax Tool", href: "/calculator/nepal-vehicle-tax/" }
      ]}
    />
  );
}

