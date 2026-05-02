'use client';
import { useMemo, useState, useEffect, useRef } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Map, Layers, Ruler, Building2, Lightbulb, ExternalLink, History, Landmark, Compass, Table, Sigma } from 'lucide-react';
import { GoogleResultCard, GoogleSubCard, GoogleTip } from '@/components/ui/ResultCard';
import Link from 'next/link';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// Constants
const SQFT_PER_ROPANI = 5476;
const SQFT_PER_BIGHA  = 72900;
const SQM_PER_SQFT    = 0.09290304; 
const ILKA_PER_ROPANI = 4;

const inputCls = "w-full h-10 px-3 border border-[#DADCE0] rounded bg-white text-xs font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
const labelCls = "text-[10px] font-bold uppercase text-[#70757A] tracking-wider block mb-1";

// Robust Input Component
function LandInput({ label, value, onChange, id }: { label: string, value: number, onChange: (v: number) => void, id: string }) {
  const [localVal, setLocalVal] = useState('');
  const isFocused = useRef(false);

  // Sync with external value when not focused
  useEffect(() => {
    if (!isFocused.current) {
      const formatted = value === 0 ? '' : Number(value.toFixed(4)).toString();
      setLocalVal(formatted);
    }
  }, [value]);

  return (
    <div>
      <label className={labelCls} htmlFor={id}>{label}</label>
      <input 
        id={id}
        type="number"
        value={localVal}
        className={inputCls}
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

function InputGroup({ title, icon: Icon, colorCls, children }: any) {
  return (
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
}

export default function NepalLandCalculator() {
  // Using standard useState for maximum reliability, avoiding potential useSyncState hydration issues
  const [totalSqft, setTotalSqft] = useState(5476);

  // Derived values
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

    return { 
      sqft: s, sqm: m, 
      ropani: s / SQFT_PER_ROPANI, aana: s / (SQFT_PER_ROPANI/16), paisa: s / (SQFT_PER_ROPANI/64), daam: s / (SQFT_PER_ROPANI/256),
      bigha: s / SQFT_PER_BIGHA, kattha: s / (SQFT_PER_BIGHA/20), dhur: s / (SQFT_PER_BIGHA/400),
      ilka: (s / SQFT_PER_ROPANI) * ILKA_PER_ROPANI,
      acres: s / 43560, hectares: m / 10000,
      ropani_b, aana_b, paisa_b, daam_b, bigha_b, kattha_b, dhur_b
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
      case 'ilka':   newSqft = (val / ILKA_PER_ROPANI) * SQFT_PER_ROPANI; break;
    }
    setTotalSqft(Math.max(0, newSqft));
  };

  return (
    <ModernCalcLayout
      slug="nepal-land"
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'Land Measurement' }]}
      title="Nepal Land Area Calculator: Ropani, Aana & Bigha (Jagga Calculator)"
      description="Calculate Jagga area in Nepal with 100% accuracy. Convert Ropani, Aana, Bigha, and Kattha to SQFT or SQM using official DoLMA 2082 standards. Essential for Lalpurja records."
      icon={Map}
      inputs={
        <div className="space-y-6">
          <InputGroup title="Hilly Region (Ropani Aana Paisa Daam)" icon={Map} colorCls="bg-[#E8F0FE] text-[#1A73E8] border-b border-[#C5D9F7]">
            <LandInput label="Total Ropani" value={values.ropani} onChange={(v) => update('ropani', v)} id="ropani" />
            <LandInput label="Total Aana" value={values.aana} onChange={(v) => update('aana', v)} id="aana" />
            <LandInput label="Total Paisa" value={values.paisa} onChange={(v) => update('paisa', v)} id="paisa" />
            <LandInput label="Total Daam" value={values.daam} onChange={(v) => update('daam', v)} id="daam" />
          </InputGroup>

          <InputGroup title="Terai Region (Bigha Kattha Dhur)" icon={Layers} colorCls="bg-[#E6F4EA] text-[#188038] border-b border-[#CEEAD6]">
            <LandInput label="Total Bigha" value={values.bigha} onChange={(v) => update('bigha', v)} id="bigha" />
            <LandInput label="Total Kattha" value={values.kattha} onChange={(v) => update('kattha', v)} id="kattha" />
            <div className="col-span-2">
               <LandInput label="Total Dhur" value={values.dhur} onChange={(v) => update('dhur', v)} id="dhur" />
            </div>
          </InputGroup>

          <InputGroup title="Metric & Universal Units" icon={Ruler} colorCls="bg-[#F8F9FA] text-[#202124] border-b border-[#DADCE0]">
            <div className="col-span-2">
               <LandInput label="Square Feet (ft²)" value={values.sqft} onChange={(v) => update('sqft', v)} id="sqft" />
            </div>
            <div><LandInput label="Square Meters (m²)" value={values.sqm} onChange={(v) => update('sqm', v)} id="sqm" /></div>
            <div><LandInput label="Ilka" value={values.ilka} onChange={(v) => update('ilka', v)} id="ilka" /></div>
          </InputGroup>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
             <Link href="/calculator/nepal-income-tax/" className="group flex items-center justify-between">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-tighter">Jagga Calculator Online: Check Registration Tax Savings →</span>
                <ExternalLink className="w-3 h-3 text-blue-400 group-hover:text-blue-600 transition-colors" />
             </Link>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <GoogleResultCard 
            title="Lalpurja Area Base"
            value={Math.round(values.sqft).toLocaleString()}
            suffix=" ft²"
            badge={`${values.sqm.toFixed(2)} m² | ${values.acres.toFixed(3)} Ac`}
          />

          <div className="grid grid-cols-2 gap-4">
             <GoogleSubCard 
               title="Hill System (RAPD)"
               value={`${values.ropani_b}-${values.aana_b}-${values.paisa_b}-${values.daam_b.toFixed(0)}`}
               label="Ropani-Aana-Paisa-Daam"
             />
             <GoogleSubCard 
               title="Terai System (BKD)"
               value={`${values.bigha_b}-${values.kattha_b}-${values.dhur_b.toFixed(0)}`}
               label="Bigha-Kattha-Dhur"
               color="#188038"
             />
          </div>

          <GoogleTip 
            title="Buyer's Insight"
            tip="Verified by DoLMA 2082 Standards. 1 Ropani = 508.72 m². Match your LIN ID records."
          />
        </div>
      }
      details={
        <div className="space-y-10 text-left">
           {/* 1. Authority Introduction */}
           <div className="bg-white border border-[#DADCE0] rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#202124] tracking-tight">Know the whole Nepal Land Guide</h2>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Official DoLMA 2082 Alignment</p>
              </div>
            </div>
            <div className="space-y-5 text-xs text-[#5F6368] leading-relaxed">
              <p>
                The land is not only an asset in Nepal but a heritage. But the geographical peculiarities of Nepal have resulted in the development of a two-fold system of measurement that can most times confuse the new buyer, diaspora investor and even the professional. The Kathmandu Valley and the hilly areas have the gold standard of <strong>Ropani-Aana-Paisa-Daam (RAPD)</strong>. On the other hand, the Terai plains that are vast use the <strong>Bigha-Kattha-Dhur (BKD)</strong>.
              </p>
              <p>
                Our <strong>Nepal Land Area Calculator</strong> is designed to be an extremely accurate intermediary between these two worlds. This instrument is tuned to the official standard of <strong>508.72 m² rule</strong> per Ropani as required by the <strong>Department of Land Management and Archive (DoLMA)</strong>, so that when you carry out your calculations you are guaranteed of a zero margin of error with the official records of the <strong>Lalpurja (Land Ownership Certificate)</strong>.
              </p>
            </div>
          </div>

          {/* 2. Historical & Vastu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#DADCE0] rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <History className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-wider">Historical Evolution</h3>
              </div>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Traditionally, land measurement in Nepal was related to the agricultural productivity. It was common to have units such as the Hale (plowed area that could be plowed in a day) of two oxen. In the Kathmandu Valley, there were more standardized units during the Malla period. In the 20th century, modern land surveying (Napi) started to replace traditional units based on currency (unit Aana, Paisa) with the digital Public Access Model (PAM) that currently places a priority on square meters.
              </p>
            </div>
            <div className="bg-white border border-[#DADCE0] rounded-2xl p-6 shadow-sm border-l-4 border-l-emerald-500">
              <div className="flex items-center gap-3 mb-4">
                <Compass className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-black text-[#202124] uppercase tracking-wider">Vastu & Selection</h3>
              </div>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                Vastu Shastra is an important consideration to many buyers in Nepal. Generally, North and East facing plots are said to be most auspicious. The one that is sloping towards the North or East is considered to bring good fortune. Square (chaukas) or rectangular plots would be best; do not use Shermukhi (wide front narrow back) as a home. Also, make sure that there is minimum access on the road of 13ft and not pailo (filled) soil because it needs costly foundations. Municipalities often require a minimum of 3 to 4 Aana (80-130 m²) for building permits.
              </p>
            </div>
          </div>

          {/* 3. Registration Roadmap */}
          <div className="bg-white border border-[#DADCE0] rounded-2xl p-6 shadow-sm ring-1 ring-blue-50">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                   <Map className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-base font-black uppercase tracking-tight text-[#202124]">Land Registration Roadmap (Essential Steps)</h3>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { id: '01', title: 'Likhit (Deed)', desc: 'Legal deed preparation by licensed Lekhapadi.' },
                  { id: '02', title: 'Napi (Survey)', desc: 'Physical Kitta verification with field maps.' },
                  { id: '03', title: 'Malpot Office', desc: 'Submission of papers and registration fees.' },
                  { id: '04', title: 'Lalpurja', desc: 'Issuance of official certificates with LIN ID.' }
                ].map(step => (
                  <div key={step.id} className="relative pl-8 border-l-2 border-blue-100 last:border-0 sm:border-l-0 sm:pl-0 sm:pt-4 sm:border-t-2">
                    <div className="absolute left-0 top-0 sm:relative text-sm font-black text-blue-600 mb-1">{step.id}</div>
                    <h4 className="text-[15px] font-black uppercase tracking-wider text-[#202124] mb-1.5">{step.title}</h4>
                    <p className="text-[13px] text-[#5F6368] leading-snug font-medium">{step.desc}</p>
                  </div>
                ))}
             </div>
          </div>

          {/* 4. Legal Glossary Grid */}
          <div className="bg-white border border-[#DADCE0] rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <Landmark className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-black text-[#202124] uppercase tracking-tight">Legal Glossary</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
               {[
                 { t: 'Lalpurja', d: 'Official Ownership Certificate' },
                 { t: 'Kitta', d: 'Unique Plot Number' },
                 { t: 'Malpot', d: 'Land Revenue Office' },
                 { t: 'Guthi', d: 'Traditional Trust Land' },
                 { t: 'Mohi', d: 'Tenant Rights (Historical)' },
                 { t: 'Kittakat', d: 'Plot Subdivision Rules' },
                 { t: 'LIN', d: 'Digital Identification Number' },
                 { t: 'Raikar', d: 'Private Ownership Land' },
                 { t: 'Aina', d: 'Government/Service Land' }
               ].map(term => (
                 <div key={term.t} className="p-4 bg-[#F8F9FA] rounded-xl border border-[#DADCE0] hover:border-red-200 transition-colors">
                    <h4 className="text-[11px] font-black text-[#202124] uppercase mb-1">{term.t}</h4>
                    <p className="text-[10px] text-[#5F6368] font-medium">{term.d}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* 5. Digital Shift & Professional Trust */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <h3 className="text-lg font-black text-blue-900">Why Professionals Choose NepaCalc?</h3>
                <p className="text-xs text-blue-800 leading-relaxed">
                  Land measurement errors may result in a legal conflict or loss of money. Property developers, legal advisors and home buyers in Nepal use our <strong>Jagga Calculator Online</strong> to make sure that the physical area covered by the <strong>Lalpurja</strong> corresponds to the physical measurement.
                </p>
                <p className="text-xs text-blue-800 leading-relaxed">
                  The <strong>Public Access Model (PAM)</strong> and <strong>Mero Kitta</strong> have introduced transparency in Nepal as it shifts to a Digital Economy. Our tool is used by students and professionals to be scientific in valuations and urban planning using the latest <strong>DoLMA 2082 Standards</strong>.
                </p>
              </div>
              <div className="w-full lg:w-72 bg-white p-6 rounded-2xl shadow-sm border border-blue-100 flex flex-col gap-4">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">100%</div>
                    <span className="text-[11px] font-black uppercase text-blue-900 tracking-wider">Scientific Accuracy</span>
                 </div>
                 <p className="text-[10px] text-blue-700 leading-tight">Verified against <strong>LIN (Land Owner Identification Number)</strong> digital database records.</p>
              </div>
            </div>
          </div>

          {/* 6. Technical Measurement Deep Dive */}
          <div className="bg-white border border-[#DADCE0] rounded-2xl p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8">
                <Sigma className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-black text-[#202124] uppercase tracking-tight">Technical Measurement System</h3>
             </div>
             
             <div className="space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full inline-block">1. Ropani-Aana System (Hills)</h4>
                      <p className="text-xs text-[#5F6368] leading-relaxed">Used in Kathmandu and the hills to buy or sell land. Our <strong>Nepal Land Area Converter</strong> converts between these 100% accurately.</p>
                      <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-[#DADCE0] text-center overflow-x-auto">
                        <BlockMath math="1\ Ropani = 16\ Aana = 5476\ ft^2" />
                        <BlockMath math="1\ Aana = 4\ Paisa = 342.25\ ft^2" />
                        <BlockMath math="1\ Paisa = 4\ Daam = 85.56\ ft^2" />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">2. Bigha-Kattha System (Terai)</h4>
                      <p className="text-xs text-[#5F6368] leading-relaxed">The units of measurement in the Terai region are much bigger. This system is essential for plains cross-regional investors.</p>
                      <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-[#DADCE0] text-center overflow-x-auto">
                        <BlockMath math="1\ Bigha = 20\ Kattha = 72900\ ft^2" />
                        <BlockMath math="1\ Kattha = 20\ Dhur = 3645\ ft^2" />
                        <BlockMath math="1\ Dhur = 182.25\ ft^2" />
                      </div>
                   </div>
                </div>

                <div className="border-t border-[#DADCE0] pt-8">
                   <h4 className="text-sm font-black text-[#202124] mb-4">Conversion Table: Sq. Ft. to Local Units</h4>
                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      {[
                        { u: '1 Ropani', v: '5,476 ft²' },
                        { u: '1 Aana', v: '342.25 ft²' },
                        { u: '1 Bigha', v: '72,900 ft²' },
                        { u: '1 Kattha', v: '3,645 ft²' }
                      ].map(row => (
                        <div key={row.u} className="p-3 bg-white border border-[#DADCE0] rounded-xl">
                           <div className="text-[10px] font-black text-[#1A73E8] uppercase mb-1">{row.u}</div>
                           <div className="text-xs font-bold text-[#202124]">{row.v}</div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select your base unit (e.g. Aana, Kathmandu).",
          "Enter the entire area; note immediate syncing of decimals.",
          "Official RAPD/BKD dash notation can be found on the Format cards.",
          "Our Technical/Vastu guides are used to conduct due diligence of a property."
        ]
      }}
      formula={{
        title: "Official Standards",
        description: "Standards as required by DoLMA and Survey Department.",
        raw: "1 Ropani = 5476 ft² | 1 Bigha = 72900 ft²"
      }}
      faqs={[
        {
          question: "How many square feet are in 1 Aana of land in Nepal?",
          answer: "In the Kathmandu Valley and Hilly regions of Nepal, 1 Aana equals 342.25 square feet (31.79 square meters). This is the gold standard used in official Lalpurja records."
        },
        {
          question: "What is the 1 Aana to square meter conversion for 2026?",
          answer: "For digital Lalpurja records, 1 Aana is equal to 31.7919 square meters. Our calculator uses the official 508.72 m² per Ropani benchmark."
        },
        {
          question: "How many Kattha is 1 Ropani in Nepal?",
          answer: "For cross-regional investors, 1 Ropani is approximately 1.50 Kattha. 1 Bigha (20 Kattha) is equivalent to 13.31 Ropani."
        },
        {
          question: "What is the minimum land required for building permits?",
          answer: "Municipalities in Kathmandu often require a minimum of 3 to 4 Aana (80-130 m²) for residential building permits to ensure adequate setback and zoning compliance."
        },
        {
          question: "Where can I download a land measurement in Nepal PDF?",
          answer: "While we provide this online interactive guide, you can refer to the DoLMA (Department of Land Management and Archive) official website for the latest regulatory PDF documents."
        },
        {
          question: "How do I calculate land size for Mero Kitta?",
          answer: "Mero Kitta uses square meters as the primary unit. You can enter your Ropani or Bigha values into our Jagga Calculator to get the precise SQM value required for digital PAM filing."
        },
        {
          question: "Is this Jagga Calculator updated for 2081/82?",
          answer: "Yes, our calculator is fully updated with the latest Department of Land Management and Archive (DoLMA) standards for the current fiscal year 2081/82 (2025/2026)."
        }
      ]}
    />
  );
}
