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
      slug="nepal-land"
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'Land Measurement' }]}
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
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">The Standardized Nepal Land Measurement Converter</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Navigating real estate in Nepal requires an exact <strong className="text-[#202124]">nepal land measurement converter</strong> capable of bridging the gap between two deeply entrenched regional systems. Our algorithm standardizes inputs against an immutable physical base: square feet. By dynamically parsing inputs through this absolute base, it operates as a flawless <strong className="text-[#202124]">ropani to bigha calculator</strong>, ensuring zero data loss during bidirectional conversions between the Hilly and Terai systems.
              </p>
              <p>
                The mathematical logic handles both fractional and whole constraints. When processing an <strong className="text-[#202124]">aana paisa daam conversion</strong> in the Hilly system, the limits are strictly modulo-enforced (16 Aana = 1 Ropani, 4 Paisa = 1 Aana). Similarly, for the Terai plains, <strong className="text-[#202124]">square feet to kattha dhur</strong> calculations utilize the standard denominator where 1 Bigha perfectly equates to 72,900 sq.ft.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Hilly vs. Terai Measurement Architecture</h3>
            <p className="text-sm text-[#5F6368] mb-4">Nepal's geographical diversity gave rise to two completely different historical systems of land measurement, which are still legally binding on official government land ownership documents (Lalpurja).</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">The Hilly System (Ropani-Aana-Paisa-Daam):</strong> Primarily used in Kathmandu Valley and the mountainous regions. The base unit is the Ropani (5,476 sq.ft.). A Ropani is divided into 16 Aana. An Aana is further divided into 4 Paisa, and a Paisa into 4 Daam. When buying residential plots in Kathmandu, prices are typically quoted "per Aana."</li>
              <li><strong className="text-[#1A73E8]">The Terai System (Bigha-Kattha-Dhur):</strong> Used in the flat plains of southern Nepal. It is designed for larger agricultural tracts. The base unit is the Bigha (72,900 sq.ft.), which is massive compared to a Ropani (1 Bigha ≈ 13.31 Ropani). A Bigha is divided into 20 Kattha, and a Kattha into 20 Dhur. Prices in urban Terai centers are often quoted "per Dhur."</li>
            </ul>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Legal Standards and the "Haath" Discrepancy</h3>
            <p className="text-sm text-[#5F6368] mb-4">While the mathematics in this calculator represent the official standards codified by the Nepal Survey Department, practical real estate transactions sometimes encounter colloquial discrepancies.</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#188038]">The Standard Haath:</strong> Traditionally, land in the Terai was measured using a wooden stick called a 'Laggi' or 'Haath' (cubit). The official government standard dictates that 1 Haath = 1.5 feet. However, in certain remote districts, local customs might historically use a slightly longer or shorter 'Haath'. <strong className="text-[#D93025]">Always ensure your surveyor uses the standard 1.5-foot Haath for legal documentation.</strong></li>
              <li><strong className="text-[#188038]">Lalpurja (Land Ownership Certificate):</strong> Regardless of the universal metrics (Acres, Hectares, or Square Meters) used in your architectural blueprint, the Malpot Karyalaya (Land Revenue Office) will exclusively record your property boundaries in either the Ropani or Bigha system depending on your district.</li>
            </ul>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Real Estate Planning and Urban Zoning</h3>
            <p className="text-sm text-[#5F6368] mb-4">Converting exact square footage is critical before designing residential properties to ensure compliance with municipal bylaws.</p>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#202124]">Minimum Area Requirements:</strong> Most municipalities inside the Kathmandu Valley have strict zoning laws prohibiting the subdivision and transfer of land parcels smaller than 2 Aana 2 Paisa (approx. 855 sq.ft.) to prevent overcrowding and ensure adequate access for emergency vehicles.</li>
              <li><strong className="text-[#202124]">FAR (Floor Area Ratio) Calculations:</strong> When architects design your home, they require the exact Square Meter or Square Foot area to calculate the FAR and Ground Coverage allowed by the city. Converting your 'Aana' or 'Dhur' measurement into Square Meters is the first step in acquiring a building permit (N नक्सा पास).</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Determine the regional system of your source data. If your Lalpurja (Land Document) is from Kathmandu, look at the Hilly Region section.",
          "Enter your area value in the respective input field (e.g., enter '4' in the Aana field).",
          "Observe the other fields. The calculator instantly cascades this value across all other units.",
          "For example, entering 1 'Bigha' in the Terai section will instantly populate '13' Ropani, '5' Aana, etc., in the Hilly section, and '72,900' in the Square Feet section.",
          "Use the Universal Area Metrics to provide exact figures to your architect or international investors."
        ]
      }}
      formula={{
        title: "Official Conversion Factors (Survey Department of Nepal)",
        description: "These are the absolute mathematical constants used for land registration in Nepal.",
        raw: "HILLY SYSTEM:\n1 Ropani = 16 Aana = 5,476 Sq.Ft.\n1 Aana = 4 Paisa = 342.25 Sq.Ft.\n1 Paisa = 4 Daam = 85.56 Sq.Ft.\n1 Daam = 21.39 Sq.Ft.\n\nTERAI SYSTEM:\n1 Bigha = 20 Kattha = 72,900 Sq.Ft.\n1 Kattha = 20 Dhur = 3,645 Sq.Ft.\n1 Dhur = 182.25 Sq.Ft.\n\nUNIVERSAL MATRICES:\n1 Square Meter (m²) = 10.7639 Square Feet (ft²)\n1 Hectare = 10,000 m²\n1 Acre = 43,560 Sq.Ft."
      }}
      faqs={[
        {
          question: "Are the Ropani and Bigha systems used everywhere in Nepal?",
          answer: "No, they are strictly regional. The Ropani system (Ropani, Aana, Paisa, Daam) is exclusively used in the Hilly and Mountainous regions, including the Kathmandu Valley. The Bigha system (Bigha, Kattha, Dhur) is used exclusively in the flat Terai plains in the south."
        },
        {
          question: "How many Ropani make 1 Bigha?",
          answer: "Because 1 Bigha is 72,900 sq.ft. and 1 Ropani is 5,476 sq.ft., 1 Bigha mathematically equates to exactly 13.3126 Ropani (or 13 Ropani, 5 Aana)."
        },
        {
          question: "How big is 1 Aana of land in Square Feet?",
          answer: "1 Aana of land is exactly 342.25 Square Feet. In municipal terms, a standard small residential plot in Kathmandu is typically between 3 to 4 Aana."
        },
        {
          question: "How big is 1 Dhur in Square Feet?",
          answer: "1 Dhur of land is exactly 182.25 Square Feet. It is the smallest standard measurement unit used in the Terai region."
        },
        {
          question: "Why does my local Amin (Surveyor) use a different measurement for a Kattha?",
          answer: "While the government standard dictates that 1 Bigha = 72,900 sq.ft., some older local communities historically used slightly longer or shorter physical measuring sticks ('Haath'). However, for all official government registration, buying, and selling, the standard 72,900 sq.ft. rule applies."
        },
        {
          question: "What is the minimum land area required to build a house in Kathmandu?",
          answer: "As per the current municipal building bylaws in the Kathmandu Valley, you generally cannot formally subdivide and pass a building map (Naksha Pass) on a plot of land smaller than 2 Aana 2 Paisa (approx. 855.6 sq.ft.) to ensure proper spacing and road access."
        }
      ]}
      sidebar={{
        title: "Real Estate Tools",
        links: [
          { label: "Home Loan Calculator", href: "/calculator/nepal-home-loan/" },
          { label: "Income Tax Calculator", href: "/calculator/nepal-income-tax/" },
          { label: "Salary Calculator", href: "/calculator/nepal-salary/" }
        ],
        banner: {
          title: "Legal Verification",
          description: "Always consult a registered 'Amin' (Surveyor) for precise boundary demarcations before finalizing any real estate transaction.",
          image: "/images/land-banner.jpg"
        }
      }}
      relatedTools={[
        { label: "Home Loan Calculator", href: "/calculator/nepal-home-loan/" },
        { label: "Income Tax", href: "/calculator/nepal-income-tax/" }
      ]}
    />
  );
}
