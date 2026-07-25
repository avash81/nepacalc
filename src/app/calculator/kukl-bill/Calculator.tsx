'use client';
import React, { useMemo, useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateKUKLBill, KUKLPipeSize } from '@/utils/math/country-rules/nepal';
import KuklSeoContent from './KuklSeoContent';
import { 
  Droplets, RefreshCw, Share, Copy, Printer, Calculator, Settings,
  ChevronDown, ChevronRight, CheckCircle2, AlertCircle, LayoutList, ShieldCheck,
  HelpCircle, Download, Users, Bath, Flower2, WashingMachine, Info, Check
} from 'lucide-react';

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

type CalcMode = 'official' | 'custom';

function KUKLCalculatorInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [state, setState] = useSyncState('kukl_v13', { 
    mode: 'official' as CalcMode,
    
    // Official State
    units: 0, 
    pipeSize: '0.5' as KUKLPipeSize,
    
    // Custom State
    cUnits: 0,
    cMinUnits: 0,
    cMinCharge: 0,
    cExtraRate: 0,
    cSewPct: 0,
    cService: 0,
    cVat: 0,
    cOther: 0,
    cCompare: false
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showEstimator, setShowEstimator] = useState(false);
  // Whether user has opted-in to use estimator result
  const [estimatorApplied, setEstimatorApplied] = useState(false);

  // Estimator State — all default to 0 so user must consciously fill in
  const [estPeople, setEstPeople]     = useState(0);
  const [estBathrooms, setEstBathrooms] = useState(0);
  const [estGarden, setEstGarden]     = useState<'no' | 'yes'>('no');
  const [estWashing, setEstWashing]   = useState<'Never' | 'Weekly' | 'Daily'>('Never');

  const update = (u: Partial<typeof state>) => {
    setState({ ...state, ...u });
    
    // Sync URL if official mode
    if (u.units !== undefined || u.pipeSize !== undefined || state.mode === 'official') {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      const newUnits = u.units !== undefined ? u.units : state.units;
      const newPipe = u.pipeSize !== undefined ? u.pipeSize : state.pipeSize;
      
      current.set('units', newUnits.toString());
      current.set('pipe', newPipe);
      router.replace(`${pathname}?${current.toString()}`, { scroll: false });
    }
  };

  // On mount, load from URL if present
  useEffect(() => {
    const u = searchParams.get('units');
    const p = searchParams.get('pipe');
    if (u !== null || p !== null) {
      setState((prev: any) => ({
        ...prev,
        units: u !== null ? Number(u) : prev.units,
        pipeSize: p !== null ? (p as KUKLPipeSize) : prev.pipeSize,
        mode: 'official'
      }));
    }
  }, [searchParams]);

  // Official Calculation
  const officialResult = useMemo(() => {
    return calculateKUKLBill(state.units, state.pipeSize);
  }, [state.units, state.pipeSize]);

  // Custom Calculation
  const customResult = useMemo(() => {
    const safeUnits = Math.max(0, state.cUnits);
    let waterCharge = state.cMinCharge;
    let extraUnits = 0;
    
    if (safeUnits > state.cMinUnits) {
      extraUnits = safeUnits - state.cMinUnits;
      waterCharge += extraUnits * state.cExtraRate;
    }
    
    const sewerageTax = waterCharge * (state.cSewPct / 100);
    const subtotal = waterCharge + sewerageTax + state.cService + state.cOther;
    const vatAmount = subtotal * (state.cVat / 100);
    const totalBill = subtotal + vatAmount;
    
    return { waterCharge, sewerageTax, totalBill, extraUnits, vatAmount };
  }, [state.cUnits, state.cMinUnits, state.cMinCharge, state.cExtraRate, state.cSewPct, state.cService, state.cOther, state.cVat]);

  // Official compare equivalent based on custom units
  const officialCompare = useMemo(() => {
    return calculateKUKLBill(state.cUnits, state.pipeSize);
  }, [state.cUnits, state.pipeSize]);

  const tariffMap: Record<KUKLPipeSize, { minUnits: number, minCharge: number, excessRate: number }> = {
    '0.5':  { minUnits: 10,   minCharge: 100,    excessRate: 32 },
    '0.75': { minUnits: 27,   minCharge: 1910,   excessRate: 71 },
    '1':    { minUnits: 56,   minCharge: 3960,   excessRate: 71 },
    '1.5':  { minUnits: 155,  minCharge: 10950,  excessRate: 71 },
    '2':    { minUnits: 320,  minCharge: 22600,  excessRate: 71 },
    '3':    { minUnits: 881,  minCharge: 62240,  excessRate: 71 },
    '4':    { minUnits: 1810, minCharge: 127865, excessRate: 71 },
  };

  const currentOfficialTariff = tariffMap[state.pipeSize];

  // Estimator Logic
  const estimatedUnits = useMemo(() => {
    let base = estPeople * 3;
    if (estBathrooms > 1) base += (estBathrooms - 1) * 1;
    if (estGarden === 'yes') base += 3;
    if (estWashing === 'Weekly') base += 1;
    if (estWashing === 'Daily') base += 3;
    return base;
  }, [estPeople, estBathrooms, estGarden, estWashing]);

  // Estimator breakdown lines for the result panel
  const estimatorBreakdown = useMemo(() => {
    if (!estimatorApplied || estPeople === 0) return null;
    const lines: { label: string; value: string; units: number }[] = [];
    lines.push({ label: `${estPeople} person(s) × 3 Units each`, value: 'Daily use', units: estPeople * 3 });
    if (estBathrooms > 1) lines.push({ label: `+${estBathrooms - 1} extra bathroom(s)`, value: '+1 Unit each', units: estBathrooms - 1 });
    if (estGarden === 'yes') lines.push({ label: 'Garden / Lawn watering', value: 'Fixed', units: 3 });
    if (estWashing === 'Weekly') lines.push({ label: 'Washing machine (weekly)', value: 'Fixed', units: 1 });
    if (estWashing === 'Daily') lines.push({ label: 'Washing machine (daily)', value: 'Fixed', units: 3 });
    return lines;
  }, [estimatorApplied, estPeople, estBathrooms, estGarden, estWashing]);

  const isEstimatorReady = estPeople > 0;

  return (
    <ModernCalcLayout
      slug="kukl-bill"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'Nepal Calculators', href: '/calculator/' }, { label: 'Utility Calculators', href: '/calculator/utility/' }, { label: 'KUKL Water Bill Calculator' }]}
      title="KUKL Water Bill Calculator"
      description="Calculate your KUKL water bill online using the latest Kathmandu water tariff rates. Includes sewerage charges, minimum billing, and connection-size calculations."
      icon={Droplets}
      seoContent={<KuklSeoContent />}
      inputs={
        <div className="space-y-6">
          
          {/* Tabs */}
          <div className="flex bg-[#F1F3F4] rounded-lg p-1">
            <button 
              onClick={() => update({ mode: 'official' })}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${state.mode === 'official' ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368] hover:text-[#202124]'}`}
            >
              Official KUKL
            </button>
            <button 
              onClick={() => update({ mode: 'custom' })}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${state.mode === 'custom' ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368] hover:text-[#202124]'}`}
            >
              Custom Tariff
            </button>
          </div>

          {state.mode === 'official' ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#188038]" />
                <span className="text-[11px] font-black text-[#188038] uppercase tracking-widest">Official KUKL Tariff Calculation</span>
              </div>
              
              <div className="space-y-4">

                {/* ── ESTIMATOR SECTION ──────────────────────────────────── */}
                <div className="border border-[#DADCE0] rounded-lg overflow-hidden">
                  {/* Header row — always visible */}
                  <button
                    onClick={() => setShowEstimator(!showEstimator)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-[#F8F9FA] hover:bg-[#F1F3F4] text-[#1A73E8] transition-colors"
                  >
                    <div className="flex items-start gap-2 text-left">
                      <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider">Don't Know Your Water Usage?</div>
                        {/* Subtitle always shown so user knows what's inside */}
                        <div className="text-[9px] font-medium text-[#5F6368] mt-0.5 normal-case tracking-normal">
                          ✦ Optional — estimate from household size, bathrooms &amp; appliances
                        </div>
                      </div>
                    </div>
                    {showEstimator ? <ChevronDown className="w-4 h-4 shrink-0" /> : <ChevronRight className="w-4 h-4 shrink-0" />}
                  </button>

                  {showEstimator && (
                    <div className="p-4 bg-white border-t border-[#DADCE0] space-y-5">
                      {/* Info banner */}
                      <div className="flex items-start gap-2 p-3 bg-[#E8F0FE] border border-[#D2E3FC] rounded-md">
                        <Info className="w-4 h-4 text-[#1A73E8] shrink-0 mt-0.5" />
                        <p className="text-[10px] text-[#3C4043] leading-relaxed">
                          Fill in your household details below and click <strong>"Use this estimate"</strong> to auto-fill your monthly consumption.
                          This is completely <strong>optional</strong> — you can also type your consumption directly in the field below.
                        </p>
                      </div>

                      {/* Input grid — all default to 0 */}
                      <div className="grid grid-cols-2 gap-4">

                        {/* People */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider flex items-center gap-1.5">
                            <Users className="w-3 h-3" /> People in Household
                          </label>
                          <input
                            type="number"
                            value={estPeople || ''}
                            onChange={(e) => { setEstPeople(Number(e.target.value)); setEstimatorApplied(false); }}
                            placeholder="0"
                            className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold focus:border-[#1A73E8] outline-none transition-all"
                            min="0"
                          />
                          <p className="text-[9px] text-[#70757A]">≈ 3 units / person / month</p>
                        </div>

                        {/* Bathrooms */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider flex items-center gap-1.5">
                            <Bath className="w-3 h-3" /> Bathrooms
                          </label>
                          <input
                            type="number"
                            value={estBathrooms || ''}
                            onChange={(e) => { setEstBathrooms(Number(e.target.value)); setEstimatorApplied(false); }}
                            placeholder="0"
                            className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold focus:border-[#1A73E8] outline-none transition-all"
                            min="0"
                          />
                          <p className="text-[9px] text-[#70757A]">+1 unit per extra bathroom</p>
                        </div>

                        {/* Garden */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider flex items-center gap-1.5">
                            <Flower2 className="w-3 h-3" /> Garden / Lawn
                          </label>
                          <select
                            value={estGarden}
                            onChange={(e) => { setEstGarden(e.target.value as 'no' | 'yes'); setEstimatorApplied(false); }}
                            className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold bg-white outline-none focus:border-[#1A73E8] transition-all"
                          >
                            <option value="no">No</option>
                            <option value="yes">Yes (+3 units)</option>
                          </select>
                        </div>

                        {/* Washing Machine */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider flex items-center gap-1.5">
                            <WashingMachine className="w-3 h-3" /> Washing Machine
                          </label>
                          <select
                            value={estWashing}
                            onChange={(e) => { setEstWashing(e.target.value as any); setEstimatorApplied(false); }}
                            className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold bg-white outline-none focus:border-[#1A73E8] transition-all"
                          >
                            <option value="Never">Never used</option>
                            <option value="Weekly">Weekly (+1 unit)</option>
                            <option value="Daily">Daily (+3 units)</option>
                          </select>
                        </div>
                      </div>

                      {/* Result + CTA */}
                      <div className={`rounded-lg border-2 p-4 transition-all ${isEstimatorReady ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#DADCE0] bg-[#F8F9FA] opacity-70'}`}>
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <div>
                            <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider mb-0.5">Estimated Monthly Consumption</div>
                            <div className="text-xl font-black text-[#1A73E8]">
                              {estimatedUnits} Units
                              <span className="text-xs font-bold text-[#1A73E8]/70 ml-1.5">
                                (≈ {(estimatedUnits * 1000).toLocaleString('en-IN')} Litres)
                              </span>
                            </div>
                            {!isEstimatorReady && (
                              <div className="text-[9px] text-[#5F6368] mt-0.5">Enter at least 1 person to get an estimate</div>
                            )}
                          </div>
                          <button
                            disabled={!isEstimatorReady}
                            onClick={() => {
                              update({ units: estimatedUnits });
                              setEstimatorApplied(true);
                              setShowEstimator(false);
                            }}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                              isEstimatorReady
                                ? 'bg-[#1A73E8] hover:bg-[#1557B0] text-white shadow-sm'
                                : 'bg-[#DADCE0] text-[#9AA0A6] cursor-not-allowed'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            Use this estimate
                          </button>
                        </div>
                      </div>

                      {/* Hint: estimator is optional */}
                      <p className="text-[9px] text-[#70757A] text-center italic">
                        ✦ Using the estimator is optional. You can skip it and type your exact unit reading directly below.
                      </p>
                    </div>
                  )}
                </div>
                {/* ── END ESTIMATOR ──────────────────────────────────────── */}

                <div className="space-y-2">
                  <label htmlFor="pipe-size" className="text-[11px] font-bold uppercase text-[#5F6368] tracking-wider">Pipe Size</label>
                  <div className="relative">
                    <select
                      id="pipe-size"
                      value={state.pipeSize}
                      onChange={(e) => update({ pipeSize: e.target.value as KUKLPipeSize })}
                      className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="0.5">½" (0.5 Inch)</option>
                      <option value="0.75">¾" (0.75 Inch)</option>
                      <option value="1">1" (1 Inch)</option>
                      <option value="1.5">1½" (1.5 Inch)</option>
                      <option value="2">2" (2 Inch)</option>
                      <option value="3">3" (3 Inch)</option>
                      <option value="4">4" (4 Inch)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                      <ChevronDown className="w-4 h-4 text-[#5F6368]" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="water-units" className="text-[11px] font-bold uppercase text-[#5F6368] tracking-wider">
                    Monthly Consumption (Units)
                  </label>
                  <div className="relative">
                    <input
                      id="water-units"
                      type="number"
                      value={state.units || ''}
                      onChange={(e) => { update({ units: e.target.value ? Number(e.target.value) : 0 }); setEstimatorApplied(false); }}
                      placeholder="0"
                      className="w-full h-12 pl-4 pr-24 border border-[#DADCE0] rounded-md bg-white text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-[#1A73E8] pointer-events-none">UNITS</span>
                  </div>
                  <p className="text-[9px] text-[#5F6368] font-bold uppercase tracking-wider mt-1">1 Unit = 1,000 Litres (1 kL)</p>
                  {estimatorApplied && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <CheckCircle2 className="w-3 h-3 text-[#188038]" />
                      <span className="text-[9px] font-bold text-[#188038] uppercase tracking-wider">Filled from estimator</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
               <div className="flex items-start gap-3 p-3 bg-[#FFF8E1] border border-[#FDE293] rounded-md">
                 <AlertCircle className="w-5 h-5 text-[#F29900] shrink-0 mt-0.5" />
                 <div>
                   <p className="text-[11px] font-bold text-[#B06000] uppercase tracking-wider mb-0.5">Custom Water Tariff</p>
                   <p className="text-[10px] text-[#202124]">Use this mode if your municipality, water user committee, or apartment uses different rates. Enter your own charges to estimate your bill.</p>
                 </div>
               </div>

               <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase text-[#5F6368] tracking-wider">Consumption (Units)</label>
                    <input type="number" value={state.cUnits || ''} onChange={(e) => update({ cUnits: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold focus:border-[#1A73E8] outline-none" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-[#5F6368] tracking-wider">Min Units</label>
                      <input type="number" value={state.cMinUnits || ''} onChange={(e) => update({ cMinUnits: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold focus:border-[#1A73E8] outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-[#5F6368] tracking-wider">Min Charge</label>
                      <input type="number" value={state.cMinCharge || ''} onChange={(e) => update({ cMinCharge: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold focus:border-[#1A73E8] outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-[#5F6368] tracking-wider">Extra Unit Rate</label>
                      <input type="number" value={state.cExtraRate || ''} onChange={(e) => update({ cExtraRate: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold focus:border-[#1A73E8] outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-[#5F6368] tracking-wider">Sewerage %</label>
                      <input type="number" value={state.cSewPct || ''} onChange={(e) => update({ cSewPct: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold focus:border-[#1A73E8] outline-none" />
                    </div>
                  </div>

                  <div className="border border-[#DADCE0] rounded-md overflow-hidden">
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="w-full flex items-center justify-between p-3 bg-[#F8F9FA] hover:bg-[#F1F3F4] text-[#5F6368] transition-colors"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-2"><Settings className="w-4 h-4"/> Advanced Settings</span>
                      {showAdvanced ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                    {showAdvanced && (
                      <div className="p-4 grid grid-cols-2 gap-4 bg-white border-t border-[#DADCE0]">
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-[#5F6368]">Service Charge</label>
                            <input type="number" value={state.cService || ''} onChange={(e) => update({ cService: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-[#5F6368]">VAT %</label>
                            <input type="number" value={state.cVat || ''} onChange={(e) => update({ cVat: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold" />
                         </div>
                         <div className="space-y-2 col-span-2">
                            <label className="text-[10px] font-bold uppercase text-[#5F6368]">Other Charges</label>
                            <input type="number" value={state.cOther || ''} onChange={(e) => update({ cOther: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold" />
                         </div>
                      </div>
                    )}
                  </div>
               </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-4 border-t border-[#F1F3F4]">
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('URL copied to clipboard! You can share this exact calculation.');
                }}
                className="h-10 flex flex-col items-center justify-center bg-[#F8F9FA] hover:bg-[#E8EAED] text-[#5F6368] border border-[#DADCE0] rounded-md transition-colors"
              >
                <Copy className="w-3.5 h-3.5 mb-0.5" /><span className="text-[8px] font-bold uppercase">Copy Link</span>
              </button>
              <button onClick={() => window.print()} className="h-10 flex flex-col items-center justify-center bg-[#F8F9FA] hover:bg-[#E8EAED] text-[#5F6368] border border-[#DADCE0] rounded-md transition-colors">
                <Printer className="w-3.5 h-3.5 mb-0.5" /><span className="text-[8px] font-bold uppercase">Print</span>
              </button>
              <button onClick={() => {}} className="h-10 flex flex-col items-center justify-center bg-[#F8F9FA] hover:bg-[#E8EAED] text-[#5F6368] border border-[#DADCE0] rounded-md transition-colors">
                <Share className="w-3.5 h-3.5 mb-0.5" /><span className="text-[8px] font-bold uppercase">Share</span>
              </button>
              <button
                onClick={() => {
                  if (state.mode === 'official') {
                    update({ units: 0, pipeSize: '0.5' });
                    setEstPeople(0); setEstBathrooms(0); setEstGarden('no'); setEstWashing('Never');
                    setEstimatorApplied(false);
                  } else {
                    update({ cUnits: 0, cMinUnits: 0, cMinCharge: 0, cExtraRate: 0, cSewPct: 0, cService: 0, cVat: 0, cOther: 0 });
                  }
                }}
                className="h-10 flex flex-col items-center justify-center bg-[#FCE8E6] hover:bg-[#FAD2CF] text-[#C5221F] border border-[#F8B0A9] rounded-md transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 mb-0.5" /><span className="text-[8px] font-bold uppercase">Reset</span>
              </button>
            </div>
          </div>

        </div>
      }
      results={
        <div className="space-y-5 h-full flex flex-col justify-start">
          {state.mode === 'official' ? (
            <>
              {/* Total Bill Hero */}
              <div className="bg-[#E8F0FE] border border-[#D2E3FC] rounded-lg p-8 text-center space-y-2">
                 <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Total Payable Bill</div>
                 <div className="text-4xl font-black tracking-tight text-[#1A73E8]">{formatNPR(officialResult.totalBill)}</div>
                 <div className="flex justify-center mt-1">
                   <span className="px-3 py-1 bg-white rounded-full text-[10px] font-black text-[#5F6368] uppercase border border-[#DADCE0] shadow-sm">
                     Inclusive of 50% Sewerage Tax
                   </span>
                 </div>
              </div>

              {/* Water + Sewerage quick cards */}
              <div className="grid grid-cols-2 gap-3">
                 <div className="border border-[#DADCE0] rounded-md p-4 text-center bg-white shadow-sm">
                    <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Water Charge</div>
                    <div className="text-xl font-black text-[#202124]">{formatNPR(officialResult.waterCharge)}</div>
                 </div>
                 <div className="border border-[#1A73E8] rounded-md p-4 text-center bg-[#E8F0FE] shadow-sm">
                    <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1">Sewerage (50%)</div>
                    <div className="text-xl font-black text-[#1A73E8]">{formatNPR(officialResult.sewerageTax)}</div>
                 </div>
              </div>

              {/* ── DETAILED BILL BREAKDOWN ──────────────────────── */}
              <div className="border border-[#DADCE0] rounded-lg bg-white shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center gap-2">
                  <LayoutList className="w-4 h-4 text-[#1A73E8]" />
                  <span className="text-[11px] font-black text-[#202124] uppercase tracking-widest">How Your Bill is Calculated</span>
                </div>
                <div className="p-4 space-y-3 text-sm">

                  {/* Step 1 — Estimator origin (only shown if estimator was used) */}
                  {estimatorApplied && estimatorBreakdown && estimatorBreakdown.length > 0 && (
                    <div className="bg-[#E8F0FE] border border-[#D2E3FC] rounded-md p-3 space-y-2 mb-1">
                      <div className="text-[10px] font-black text-[#1A73E8] uppercase tracking-wider">Usage Estimated From Household Info</div>
                      {estimatorBreakdown.map((line, i) => (
                        <div key={i} className="flex items-center justify-between text-[11px]">
                          <span className="text-[#5F6368]">{line.label}</span>
                          <span className="font-bold text-[#202124]">+{line.units} units</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-1 border-t border-[#D2E3FC] text-[11px]">
                        <span className="font-black text-[#1A73E8]">Total Estimated</span>
                        <span className="font-black text-[#1A73E8]">{estimatedUnits} units</span>
                      </div>
                    </div>
                  )}

                  {/* Step 1 or 2 — Consumption */}
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-dashed border-[#DADCE0]">
                    <div>
                      <div className="font-bold text-[#5F6368] text-[11px] uppercase tracking-wider">
                        {state.units <= currentOfficialTariff.minUnits ? 'Within Minimum Block' : 'Step 1 — Minimum Block'}
                      </div>
                      <div className="text-[10px] text-[#70757A] mt-0.5">
                        First {currentOfficialTariff.minUnits} units covered by minimum charge
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-black text-[#202124]">{formatNPR(currentOfficialTariff.minCharge)}</div>
                      <div className="text-[9px] text-[#70757A]">Base charge</div>
                    </div>
                  </div>

                  {/* Step 2 — Extra units (only if applicable) */}
                  {state.units > currentOfficialTariff.minUnits && (
                    <div className="flex items-start justify-between gap-2 pb-2 border-b border-dashed border-[#DADCE0]">
                      <div>
                        <div className="font-bold text-[#5F6368] text-[11px] uppercase tracking-wider">Step 2 — Extra Units</div>
                        <div className="text-[10px] text-[#70757A] mt-0.5">
                          {state.units - currentOfficialTariff.minUnits} extra units × {formatNPR(currentOfficialTariff.excessRate)}/unit
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-black text-[#202124]">
                          {formatNPR((state.units - currentOfficialTariff.minUnits) * currentOfficialTariff.excessRate)}
                        </div>
                        <div className="text-[9px] text-[#70757A]">Extra charge</div>
                      </div>
                    </div>
                  )}

                  {/* Sub-total: Water Charge */}
                  <div className="flex items-center justify-between py-1.5 px-3 bg-[#F8F9FA] rounded border border-[#DADCE0]">
                    <span className="text-[11px] font-black text-[#202124] uppercase tracking-wider">Water Charge Sub-total</span>
                    <span className="font-black text-[#202124]">{formatNPR(officialResult.waterCharge)}</span>
                  </div>

                  {/* Sewerage */}
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-dashed border-[#DADCE0]">
                    <div>
                      <div className="font-bold text-[#5F6368] text-[11px] uppercase tracking-wider">Sewerage Tax (50%)</div>
                      <div className="text-[10px] text-[#70757A] mt-0.5">
                        50% of water charge = {formatNPR(officialResult.waterCharge)} × 0.50
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-black text-[#1A73E8]">{formatNPR(officialResult.sewerageTax)}</div>
                    </div>
                  </div>

                  {/* Grand total */}
                  <div className="flex items-center justify-between py-3 px-3 bg-[#E8F0FE] rounded-md border border-[#1A73E8]">
                    <div>
                      <div className="text-sm font-black text-[#1A73E8] uppercase tracking-wider">Total Payable Bill</div>
                      <div className="text-[9px] text-[#1A73E8]/70 mt-0.5">Water + Sewerage</div>
                    </div>
                    <div className="text-xl font-black text-[#1A73E8]">{formatNPR(officialResult.totalBill)}</div>
                  </div>

                  {/* Formula note */}
                  <div className="text-[9px] text-[#70757A] text-center pt-1 italic">
                    Formula: Water Charge + (Water Charge × 50%) = Total Bill
                  </div>
                </div>
              </div>
              {/* ── END BILL BREAKDOWN ───────────────────────────── */}

              {/* Consumption summary */}
              <div className="grid grid-cols-3 gap-2">
                <div className="border border-[#DADCE0] rounded-md p-3 text-center bg-[#F8F9FA]">
                  <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Consumption</div>
                  <div className="text-base font-black text-[#202124]">{state.units}</div>
                  <div className="text-[8px] text-[#70757A] font-medium">units</div>
                </div>
                <div className="border border-[#DADCE0] rounded-md p-3 text-center bg-[#F8F9FA]">
                  <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Pipe Size</div>
                  <div className="text-base font-black text-[#202124]">{state.pipeSize}"</div>
                  <div className="text-[8px] text-[#70757A] font-medium">inch</div>
                </div>
                <div className="border border-[#DADCE0] rounded-md p-3 text-center bg-[#F8F9FA]">
                  <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">In Litres</div>
                  <div className="text-base font-black text-[#202124]">{(state.units * 1000).toLocaleString('en-IN')}</div>
                  <div className="text-[8px] text-[#70757A] font-medium">L</div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm sticky top-4">
               <div className="flex items-center gap-2 mb-6 border-b border-[#F1F3F4] pb-3">
                  <Calculator className="w-5 h-5 text-[#1A73E8]" />
                  <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Live Custom Bill</h3>
               </div>
               
               <div className="space-y-3 mb-6">
                 <div className="flex justify-between items-center text-sm">
                   <span className="font-bold text-[#5F6368]">Water Charge</span>
                   <span className="font-black text-[#202124]">{formatNPR(customResult.waterCharge)}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                   <span className="font-bold text-[#5F6368]">Sewerage ({state.cSewPct}%)</span>
                   <span className="font-black text-[#202124]">{formatNPR(customResult.sewerageTax)}</span>
                 </div>
                 {state.cService > 0 && (
                   <div className="flex justify-between items-center text-sm">
                     <span className="font-bold text-[#5F6368]">Service Charge</span>
                     <span className="font-black text-[#202124]">{formatNPR(state.cService)}</span>
                   </div>
                 )}
                 {state.cOther > 0 && (
                   <div className="flex justify-between items-center text-sm">
                     <span className="font-bold text-[#5F6368]">Other Charges</span>
                     <span className="font-black text-[#202124]">{formatNPR(state.cOther)}</span>
                   </div>
                 )}
                 {state.cVat > 0 && (
                   <div className="flex justify-between items-center text-sm">
                     <span className="font-bold text-[#5F6368]">VAT ({state.cVat}%)</span>
                     <span className="font-black text-[#202124]">{formatNPR(customResult.vatAmount)}</span>
                   </div>
                 )}
               </div>

               <div className="pt-4 border-t border-[#DADCE0]">
                 <div className="flex flex-col items-center justify-center p-4 bg-[#E8F0FE] rounded-md border border-[#1A73E8]">
                   <span className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1">Total Custom Bill</span>
                   <span className="text-3xl font-black text-[#1A73E8]">{formatNPR(customResult.totalBill)}</span>
                 </div>
               </div>
               
               {/* Comparison feature */}
               <div className="mt-6">
                 <label className="flex items-center gap-2 cursor-pointer">
                   <input type="checkbox" checked={state.cCompare} onChange={(e) => update({ cCompare: e.target.checked })} className="w-4 h-4 text-[#1A73E8] rounded" />
                   <span className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Compare with Official KUKL Tariff</span>
                 </label>
                 
                 {state.cCompare && (
                   <div className="mt-4 border border-[#DADCE0] rounded-md overflow-hidden text-sm">
                     <div className="grid grid-cols-3 bg-[#F8F9FA] p-2 border-b border-[#DADCE0]">
                       <div className="font-bold text-[10px] text-[#5F6368] uppercase">Charge</div>
                       <div className="font-bold text-[10px] text-[#5F6368] uppercase text-right">Official KUKL</div>
                       <div className="font-bold text-[10px] text-[#1A73E8] uppercase text-right">Custom</div>
                     </div>
                     <div className="grid grid-cols-3 p-2 border-b border-[#F1F3F4]">
                       <div className="font-bold text-[#5F6368]">Water</div>
                       <div className="text-right">{formatNPR(officialCompare.waterCharge)}</div>
                       <div className="text-right font-bold text-[#202124]">{formatNPR(customResult.waterCharge)}</div>
                     </div>
                     <div className="grid grid-cols-3 p-2 border-b border-[#F1F3F4]">
                       <div className="font-bold text-[#5F6368]">Sewerage</div>
                       <div className="text-right">{formatNPR(officialCompare.sewerageTax)}</div>
                       <div className="text-right font-bold text-[#202124]">{formatNPR(customResult.sewerageTax)}</div>
                     </div>
                     <div className="grid grid-cols-3 p-2 bg-[#E8F0FE]">
                       <div className="font-bold text-[#1A73E8]">Total</div>
                       <div className="text-right font-black text-[#1A73E8]">{formatNPR(officialCompare.totalBill)}</div>
                       <div className="text-right font-black text-[#1A73E8]">{formatNPR(customResult.totalBill)}</div>
                     </div>
                   </div>
                 )}
               </div>
            </div>
          )}
        </div>
      }
      details={
        <div className="space-y-6">
          {state.mode === 'official' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                 {/* Left Column */}
                 <div className="space-y-6">
                 
                 {/* Step-by-Step Breakdown */}
                <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
                   <div className="flex items-center gap-2 mb-6 border-b border-[#F1F3F4] pb-3">
                      <LayoutList className="w-5 h-5 text-[#1A73E8]" />
                      <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Calculation Steps</h3>
                   </div>
                   
                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <span className="text-xs font-bold text-[#5F6368] uppercase">Step 1: Units Entered</span>
                         <span className="text-sm font-black text-[#202124]">{state.units} Units</span>
                      </div>
                      <div className="w-0.5 h-4 bg-[#DADCE0] ml-2" />
                      
                      <div className="flex items-center justify-between">
                         <span className="text-xs font-bold text-[#5F6368] uppercase">Step 2: Minimum Charge (Up to {currentOfficialTariff.minUnits} Units)</span>
                         <span className="text-sm font-black text-[#202124]">{formatNPR(currentOfficialTariff.minCharge)}</span>
                      </div>
                      <div className="w-0.5 h-4 bg-[#DADCE0] ml-2" />
                      
                      {state.units > currentOfficialTariff.minUnits && (
                        <>
                          <div className="flex items-center justify-between">
                             <span className="text-xs font-bold text-[#5F6368] uppercase">Step 3: Extra Units ({state.units - currentOfficialTariff.minUnits} × {formatNPR(currentOfficialTariff.excessRate)})</span>
                             <span className="text-sm font-black text-[#202124]">{formatNPR((state.units - currentOfficialTariff.minUnits) * currentOfficialTariff.excessRate)}</span>
                          </div>
                          <div className="w-0.5 h-4 bg-[#DADCE0] ml-2" />
                        </>
                      )}
                      
                      <div className="flex items-center justify-between p-2 bg-[#F8F9FA] rounded border border-[#DADCE0]">
                         <span className="text-xs font-black text-[#1A73E8] uppercase">Total Water Charge</span>
                         <span className="text-sm font-black text-[#1A73E8]">{formatNPR(officialResult.waterCharge)}</span>
                      </div>
                      <div className="w-0.5 h-4 bg-[#DADCE0] ml-2" />
                      
                      <div className="flex items-center justify-between">
                         <span className="text-xs font-bold text-[#5F6368] uppercase">Step 4: Sewerage (50%)</span>
                         <span className="text-sm font-black text-[#202124]">{formatNPR(officialResult.sewerageTax)}</span>
                      </div>
                      <div className="w-0.5 h-4 bg-[#DADCE0] ml-2" />
                      
                      <div className="flex items-center justify-between p-3 bg-[#E8F0FE] rounded border border-[#1A73E8]">
                         <span className="text-sm font-black text-[#1A73E8] uppercase">Final Payable Bill</span>
                         <span className="text-lg font-black text-[#1A73E8]">{formatNPR(officialResult.totalBill)}</span>
                      </div>
                   </div>
                </div>
  
                {/* Official Tariff Reference */}
                <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
                   <div className="flex items-center gap-2 mb-6 border-b border-[#F1F3F4] pb-3">
                      <ShieldCheck className="w-5 h-5 text-[#188038]" />
                      <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Official Tariff Used</h3>
                   </div>
                   
                   <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                       <div className="p-3 bg-[#F8F9FA] rounded border border-[#DADCE0] text-center">
                         <div className="text-[10px] font-bold text-[#5F6368] uppercase mb-1">Pipe Size</div>
                         <div className="text-base font-black text-[#202124]">{state.pipeSize} Inch</div>
                       </div>
                       <div className="p-3 bg-[#F8F9FA] rounded border border-[#DADCE0] text-center">
                         <div className="text-[10px] font-bold text-[#5F6368] uppercase mb-1">Minimum Units</div>
                         <div className="text-base font-black text-[#202124]">{currentOfficialTariff.minUnits} Units</div>
                       </div>
                       <div className="p-3 bg-[#F8F9FA] rounded border border-[#DADCE0] text-center">
                         <div className="text-[10px] font-bold text-[#5F6368] uppercase mb-1">Base Charge</div>
                         <div className="text-base font-black text-[#202124]">{formatNPR(currentOfficialTariff.minCharge)}</div>
                       </div>
                       <div className="p-3 bg-[#F8F9FA] rounded border border-[#DADCE0] text-center">
                         <div className="text-[10px] font-bold text-[#5F6368] uppercase mb-1">Additional Rate</div>
                         <div className="text-base font-black text-[#202124]">{formatNPR(currentOfficialTariff.excessRate)} / Unit</div>
                       </div>
                     </div>
                     
                     <div className="p-3 bg-[#FFF8E1] border border-[#FDE293] rounded-md text-center">
                       <p className="text-[10px] font-bold text-[#B06000] uppercase">
                         Tariff information reviewed against the latest officially published KUKL schedule.
                       </p>
                     </div>
                   </div>
                </div>
                 </div> {/* End Left Column */}
                 
                 {/* Right Column */}
                 <div className="space-y-6">
                   {/* Export & Share Buttons */}
                   <div className="flex flex-wrap items-center gap-2 pb-2">
                     <span className="text-xs font-bold text-[#5F6368] uppercase tracking-wider mr-1">Export & Share:</span>
                     <button onClick={() => { try { window.print(); } catch(e){} }} className="h-8 px-3 border border-[#DADCE0] bg-white rounded flex items-center justify-center gap-1.5 hover:bg-[#F8F9FA] transition-colors text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                       <Printer className="w-3 h-3" /> Print
                     </button>
                     <button onClick={() => { const text = `KUKL Water Bill Calculation\nPipe Size: ${state.pipeSize}"\nConsumption: ${state.units} Units\nWater Charge: ${formatNPR(officialResult.waterCharge)}\nSewerage Tax (50%): ${formatNPR(officialResult.sewerageTax)}\nTotal Bill: ${formatNPR(officialResult.totalBill)}`; navigator.clipboard?.writeText(text).catch(()=>{}); }} className="h-8 px-3 border border-[#DADCE0] bg-white rounded flex items-center justify-center gap-1.5 hover:bg-[#F8F9FA] transition-colors text-[10px] font-bold text-[#5F6368] uppercase tracking-wider">
                       <Copy className="w-3 h-3" /> Copy
                     </button>
                     <button onClick={() => { const data = { pipeSize: state.pipeSize, consumptionUnits: state.units, waterCharge: officialResult.waterCharge, sewerageTax: officialResult.sewerageTax, totalBill: officialResult.totalBill, calculatedAt: new Date().toISOString() }; const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'}); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `kukl-bill-${state.units}units.json`; a.click(); }} className="h-8 px-3 border border-[#1A73E8] bg-[#E8F0FE] rounded flex items-center justify-center gap-1.5 hover:bg-[#D2E3FC] transition-colors text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">
                       <Download className="w-3 h-3" /> Download
                     </button>
                   </div>
                   
                   {/* Monthly Cost Comparison Table */}
                   <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
                   <div className="flex items-center gap-2 mb-6 border-b border-[#F1F3F4] pb-3">
                      <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Monthly Cost Comparison ({state.pipeSize}")</h3>
                   </div>
                   <div className="border border-[#DADCE0] rounded-md overflow-hidden text-sm">
                     <div className="grid grid-cols-2 bg-[#F8F9FA] p-3 border-b border-[#DADCE0]">
                       <div className="font-bold text-[10px] text-[#5F6368] uppercase">Consumption</div>
                       <div className="font-bold text-[10px] text-[#5F6368] uppercase text-right">Total Bill</div>
                     </div>
                     {[10, 15, 20, 30].map((testUnit) => {
                       const testBill = calculateKUKLBill(testUnit, state.pipeSize).totalBill;
                       return (
                         <div key={testUnit} className="grid grid-cols-2 p-3 border-b border-[#F1F3F4] last:border-0">
                           <div className="font-bold text-[#202124]">{testUnit} Units</div>
                           <div className="text-right text-[#5F6368]">{formatNPR(testBill)}</div>
                         </div>
                       );
                     })}
                   </div>
                </div>
                
                {/* Household Usage Examples */}
                <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
                   <div className="flex items-center gap-2 mb-6 border-b border-[#F1F3F4] pb-3">
                      <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Household Usage Examples</h3>
                   </div>
                   <div className="border border-[#DADCE0] rounded-md overflow-hidden text-sm">
                     <div className="grid grid-cols-2 bg-[#F8F9FA] p-3 border-b border-[#DADCE0]">
                       <div className="font-bold text-[10px] text-[#5F6368] uppercase">Household Size</div>
                       <div className="font-bold text-[10px] text-[#5F6368] uppercase text-right">Estimated Monthly Usage</div>
                     </div>
                     <div className="grid grid-cols-2 p-3 border-b border-[#F1F3F4]">
                       <div className="font-bold text-[#202124]">1 Person</div>
                       <div className="text-right text-[#5F6368]">4–7 Units</div>
                     </div>
                     <div className="grid grid-cols-2 p-3 border-b border-[#F1F3F4]">
                       <div className="font-bold text-[#202124]">2–3 People</div>
                       <div className="text-right text-[#5F6368]">8–12 Units</div>
                     </div>
                     <div className="grid grid-cols-2 p-3 border-b border-[#F1F3F4]">
                       <div className="font-bold text-[#202124]">4–5 People</div>
                       <div className="text-right text-[#5F6368]">12–18 Units</div>
                     </div>
                     <div className="grid grid-cols-2 p-3 border-b border-[#F1F3F4] bg-[#FFF8E1]">
                       <div className="font-bold text-[#202124]">6+ People</div>
                       <div className="text-right text-[#B06000]">18–30+ Units</div>
                     </div>
                   </div>
                </div>
                 </div> {/* End Right Column */}
              </div>
            </>
          )}
        </div>
      }
      faqs={[]}
      sidebar={{ title: "", subtitle: "", links: [] }}
      relatedTools={[
        { label: 'NEA Electricity Bill Calculator', href: '/calculator/nea-bill/' },
        { label: 'Property Tax Calculator', href: '/calculator/property-tax/' },
        { label: 'Nepal Salary Tax Calculator', href: '/calculator/nepal-salary/' },
        { label: 'Income Tax Calculator', href: '/calculator/nepal-income-tax/' }
      ]}
    />
  );
}

export default function KUKLCalculator() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading calculator...</div>}>
      <KUKLCalculatorInner />
    </Suspense>
  );
}
