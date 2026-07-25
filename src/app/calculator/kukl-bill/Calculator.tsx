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
  Download
} from 'lucide-react';

function formatNPR(n: number) { return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); }

type CalcMode = 'official' | 'custom';

function KUKLCalculatorInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [state, setState] = useSyncState('kukl_v14', {
    mode: 'official' as CalcMode,
    units: 0,
    pipeSize: '0.5' as KUKLPipeSize,
    cUnits: 0, cMinUnits: 0, cMinCharge: 0, cExtraRate: 0,
    cSewPct: 0, cService: 0, cVat: 0, cOther: 0, cCompare: false
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const update = (u: Partial<typeof state>) => {
    setState({ ...state, ...u });
    if (u.units !== undefined || u.pipeSize !== undefined || state.mode === 'official') {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      const newUnits  = u.units    !== undefined ? u.units    : state.units;
      const newPipe   = u.pipeSize !== undefined ? u.pipeSize : state.pipeSize;
      current.set('units', newUnits.toString());
      current.set('pipe', newPipe);
      router.replace(`${pathname}?${current.toString()}`, { scroll: false });
    }
  };

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

  /* ── OFFICIAL CALC ─────────────────────────────────────────── */
  const officialResult = useMemo(() => calculateKUKLBill(state.units, state.pipeSize), [state.units, state.pipeSize]);

  /* ── CUSTOM CALC ───────────────────────────────────────────── */
  const customResult = useMemo(() => {
    const safeUnits = Math.max(0, state.cUnits);
    let waterCharge = state.cMinCharge;
    if (safeUnits > state.cMinUnits) waterCharge += (safeUnits - state.cMinUnits) * state.cExtraRate;
    const sewerageTax = waterCharge * (state.cSewPct / 100);
    const subtotal = waterCharge + sewerageTax + state.cService + state.cOther;
    const vatAmount = subtotal * (state.cVat / 100);
    return { waterCharge, sewerageTax, totalBill: subtotal + vatAmount, vatAmount };
  }, [state.cUnits, state.cMinUnits, state.cMinCharge, state.cExtraRate, state.cSewPct, state.cService, state.cOther, state.cVat]);

  const officialCompare = useMemo(() => calculateKUKLBill(state.cUnits, state.pipeSize), [state.cUnits, state.pipeSize]);

  const tariffMap: Record<KUKLPipeSize, { minUnits: number; minCharge: number; excessRate: number }> = {
    '0.5':  { minUnits: 10,   minCharge: 100,    excessRate: 32 },
    '0.75': { minUnits: 27,   minCharge: 1910,   excessRate: 71 },
    '1':    { minUnits: 56,   minCharge: 3960,   excessRate: 71 },
    '1.5':  { minUnits: 155,  minCharge: 10950,  excessRate: 71 },
    '2':    { minUnits: 320,  minCharge: 22600,  excessRate: 71 },
    '3':    { minUnits: 881,  minCharge: 62240,  excessRate: 71 },
    '4':    { minUnits: 1810, minCharge: 127865, excessRate: 71 },
  };
  const currentOfficialTariff = tariffMap[state.pipeSize];

  /* ── EMPTY STATE ────────────────────────────────────────────── */
  const hasUnits = state.units > 0;

  return (
    <ModernCalcLayout
      slug="kukl-bill"
      crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Nepal Calculators', href: '/calculator/' },
        { label: 'Utility Calculators', href: '/calculator/utility/' },
        { label: 'KUKL Water Bill Calculator' }
      ]}
      title="KUKL Water Bill Calculator"
      description="Calculate your KUKL water bill online using the latest Kathmandu water tariff rates. Includes sewerage charges, minimum billing, and connection-size calculations."
      icon={Droplets}
      seoContent={<KuklSeoContent />}
      inputs={
        <div className="space-y-6">

          {/* Mode Tabs */}
          <div className="flex bg-[#F1F3F4] rounded-lg p-1">
            <button onClick={() => update({ mode: 'official' })} className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${state.mode === 'official' ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368] hover:text-[#202124]'}`}>Official KUKL</button>
            <button onClick={() => update({ mode: 'custom' })}   className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${state.mode === 'custom'   ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368] hover:text-[#202124]'}`}>Custom Tariff</button>
          </div>

          {state.mode === 'official' ? (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#188038]" />
                <span className="text-[11px] font-black text-[#188038] uppercase tracking-widest">Official KUKL Tariff Calculation</span>
              </div>

              {/* Pipe Size */}
              <div className="space-y-2">
                <label htmlFor="pipe-size" className="text-[11px] font-bold uppercase text-[#5F6368] tracking-wider">Pipe Size</label>
                <div className="relative">
                  <select id="pipe-size" value={state.pipeSize} onChange={(e) => update({ pipeSize: e.target.value as KUKLPipeSize })}
                    className="w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all appearance-none cursor-pointer">
                    <option value="0.5">½" (0.5 Inch) — Most homes</option>
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

              {/* Monthly Units Input */}
              <div className="space-y-2">
                <label htmlFor="water-units" className="text-[11px] font-bold uppercase text-[#5F6368] tracking-wider">
                  Monthly Consumption (Units)
                </label>
                <div className="relative">
                  <input
                    id="water-units" type="number"
                    value={state.units || ''}
                    onChange={(e) => update({ units: e.target.value ? Number(e.target.value) : 0 })}
                    placeholder="Enter units from your KUKL meter bill"
                    className="w-full h-12 pl-4 pr-24 border border-[#DADCE0] rounded-md bg-white text-sm font-bold text-[#202124] focus:border-[#1A73E8] outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-[#1A73E8] pointer-events-none">UNITS</span>
                </div>
                <p className="text-[9px] text-[#5F6368] font-bold uppercase tracking-wider">1 Unit = 1,000 Litres (1 kL)</p>
              </div>
            </div>

          ) : (
            /* ── CUSTOM MODE ─────────────────────────────────── */
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-start gap-3 p-3 bg-[#FFF8E1] border border-[#FDE293] rounded-md">
                <AlertCircle className="w-5 h-5 text-[#F29900] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-bold text-[#B06000] uppercase tracking-wider mb-0.5">Custom Water Tariff</p>
                  <p className="text-[10px] text-[#202124]">Use this mode if your municipality, water user committee, or apartment uses different rates.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase text-[#5F6368] tracking-wider">Consumption (Units)</label>
                  <input type="number" value={state.cUnits || ''} onChange={(e) => update({ cUnits: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold focus:border-[#1A73E8] outline-none" placeholder="0" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-[#5F6368] tracking-wider">Min Units</label><input type="number" value={state.cMinUnits || ''} onChange={(e) => update({ cMinUnits: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold focus:border-[#1A73E8] outline-none" placeholder="0" /></div>
                  <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-[#5F6368] tracking-wider">Min Charge (Rs.)</label><input type="number" value={state.cMinCharge || ''} onChange={(e) => update({ cMinCharge: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold focus:border-[#1A73E8] outline-none" placeholder="0" /></div>
                  <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-[#5F6368] tracking-wider">Extra Unit Rate</label><input type="number" value={state.cExtraRate || ''} onChange={(e) => update({ cExtraRate: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold focus:border-[#1A73E8] outline-none" placeholder="0" /></div>
                  <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-[#5F6368] tracking-wider">Sewerage %</label><input type="number" value={state.cSewPct || ''} onChange={(e) => update({ cSewPct: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold focus:border-[#1A73E8] outline-none" placeholder="0" /></div>
                </div>
                <div className="border border-[#DADCE0] rounded-md overflow-hidden">
                  <button onClick={() => setShowAdvanced(!showAdvanced)} className="w-full flex items-center justify-between p-3 bg-[#F8F9FA] hover:bg-[#F1F3F4] text-[#5F6368] transition-colors">
                    <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-2"><Settings className="w-4 h-4" /> Advanced Settings</span>
                    {showAdvanced ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  {showAdvanced && (
                    <div className="p-4 grid grid-cols-2 gap-4 bg-white border-t border-[#DADCE0]">
                      <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-[#5F6368]">Service Charge</label><input type="number" value={state.cService || ''} onChange={(e) => update({ cService: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold" placeholder="0" /></div>
                      <div className="space-y-2"><label className="text-[10px] font-bold uppercase text-[#5F6368]">VAT %</label><input type="number" value={state.cVat || ''} onChange={(e) => update({ cVat: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold" placeholder="0" /></div>
                      <div className="space-y-2 col-span-2"><label className="text-[10px] font-bold uppercase text-[#5F6368]">Other Charges</label><input type="number" value={state.cOther || ''} onChange={(e) => update({ cOther: Number(e.target.value) })} className="w-full h-10 px-3 border border-[#DADCE0] rounded-md text-sm font-bold" placeholder="0" /></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-4 border-t border-[#F1F3F4]">
            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert('URL copied!'); }} className="h-10 flex flex-col items-center justify-center bg-[#F8F9FA] hover:bg-[#E8EAED] text-[#5F6368] border border-[#DADCE0] rounded-md transition-colors">
                <Copy className="w-3.5 h-3.5 mb-0.5" /><span className="text-[8px] font-bold uppercase">Copy Link</span>
              </button>
              <button onClick={() => window.print()} className="h-10 flex flex-col items-center justify-center bg-[#F8F9FA] hover:bg-[#E8EAED] text-[#5F6368] border border-[#DADCE0] rounded-md transition-colors">
                <Printer className="w-3.5 h-3.5 mb-0.5" /><span className="text-[8px] font-bold uppercase">Print</span>
              </button>
              <button onClick={() => {}} className="h-10 flex flex-col items-center justify-center bg-[#F8F9FA] hover:bg-[#E8EAED] text-[#5F6368] border border-[#DADCE0] rounded-md transition-colors">
                <Share className="w-3.5 h-3.5 mb-0.5" /><span className="text-[8px] font-bold uppercase">Share</span>
              </button>
              <button onClick={() => {
                update({ units: 0, pipeSize: '0.5' });
              }} className="h-10 flex flex-col items-center justify-center bg-[#FCE8E6] hover:bg-[#FAD2CF] text-[#C5221F] border border-[#F8B0A9] rounded-md transition-colors">
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
              {/* ── TOTAL BILL HERO ─────────────────────────────────── */}
              <div className={`rounded-lg border-2 p-8 text-center space-y-2 transition-all ${
                hasUnits
                  ? 'bg-[#E8F0FE] border-[#D2E3FC]'
                  : 'bg-[#F8F9FA] border-[#DADCE0]'
              }`}>
                <div className={`text-[10px] font-bold uppercase tracking-wider ${hasUnits ? 'text-[#1A73E8]' : 'text-[#9AA0A6]'}`}>
                  Total Payable Bill
                </div>
                {hasUnits ? (
                  <div className="text-4xl font-black tracking-tight text-[#1A73E8]">
                    {formatNPR(officialResult.totalBill)}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 py-2">
                    <div className="text-3xl font-black text-[#DADCE0]">Rs. —</div>
                    <p className="text-[10px] text-[#9AA0A6] font-medium">
                      Enter units above to see your bill
                    </p>
                  </div>
                )}
                {hasUnits && (
                  <div className="flex justify-center mt-1">
                    <span className="px-3 py-1 bg-white rounded-full text-[10px] font-black text-[#5F6368] uppercase border border-[#DADCE0] shadow-sm">
                      Inclusive of 50% Sewerage Tax
                    </span>
                  </div>
                )}
              </div>

              {/* ── WATER + SEWERAGE CARDS ───────────────────────────── */}
              <div className="grid grid-cols-2 gap-3">
                <div className={`border rounded-md p-4 text-center shadow-sm transition-all ${hasUnits ? 'border-[#DADCE0] bg-white' : 'border-[#F1F3F4] bg-[#F8F9FA]'}`}>
                  <div className="text-[10px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Water Charge</div>
                  <div className={`text-xl font-black ${hasUnits ? 'text-[#202124]' : 'text-[#DADCE0]'}`}>
                    {hasUnits ? formatNPR(officialResult.waterCharge) : 'Rs. —'}
                  </div>
                </div>
                <div className={`border rounded-md p-4 text-center shadow-sm transition-all ${hasUnits ? 'border-[#1A73E8] bg-[#E8F0FE]' : 'border-[#F1F3F4] bg-[#F8F9FA]'}`}>
                  <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${hasUnits ? 'text-[#1A73E8]' : 'text-[#9AA0A6]'}`}>Sewerage (50%)</div>
                  <div className={`text-xl font-black ${hasUnits ? 'text-[#1A73E8]' : 'text-[#DADCE0]'}`}>
                    {hasUnits ? formatNPR(officialResult.sewerageTax) : 'Rs. —'}
                  </div>
                </div>
              </div>

              {/* ── DETAILED BREAKDOWN (only when units > 0) ─────────── */}
              {hasUnits ? (
                <div className="border border-[#DADCE0] rounded-lg bg-white shadow-sm overflow-hidden">
                  <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center gap-2">
                    <LayoutList className="w-4 h-4 text-[#1A73E8]" />
                    <span className="text-[11px] font-black text-[#202124] uppercase tracking-widest">How Your Bill is Calculated</span>
                  </div>
                  <div className="p-4 space-y-3 text-sm">

                    {/* Minimum Block */}
                    <div className="flex items-start justify-between gap-2 pb-2 border-b border-dashed border-[#DADCE0]">
                      <div>
                        <div className="font-bold text-[#5F6368] text-[11px] uppercase tracking-wider">
                          {state.units <= currentOfficialTariff.minUnits ? 'Within Minimum Block' : 'Step 1 — Minimum Block'}
                        </div>
                        <div className="text-[10px] text-[#70757A] mt-0.5">
                          First {currentOfficialTariff.minUnits} units = flat minimum charge
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-black text-[#202124]">{formatNPR(currentOfficialTariff.minCharge)}</div>
                        <div className="text-[9px] text-[#70757A]">base charge</div>
                      </div>
                    </div>

                    {/* Extra Units */}
                    {state.units > currentOfficialTariff.minUnits && (
                      <div className="flex items-start justify-between gap-2 pb-2 border-b border-dashed border-[#DADCE0]">
                        <div>
                          <div className="font-bold text-[#5F6368] text-[11px] uppercase tracking-wider">Step 2 — Extra Units</div>
                          <div className="text-[10px] text-[#70757A] mt-0.5">
                            {state.units - currentOfficialTariff.minUnits} units × {formatNPR(currentOfficialTariff.excessRate)}/unit
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-black text-[#202124]">{formatNPR((state.units - currentOfficialTariff.minUnits) * currentOfficialTariff.excessRate)}</div>
                          <div className="text-[9px] text-[#70757A]">extra charge</div>
                        </div>
                      </div>
                    )}

                    {/* Water subtotal */}
                    <div className="flex items-center justify-between py-1.5 px-3 bg-[#F8F9FA] rounded border border-[#DADCE0]">
                      <span className="text-[11px] font-black text-[#202124] uppercase">Water Charge Sub-total</span>
                      <span className="font-black text-[#202124]">{formatNPR(officialResult.waterCharge)}</span>
                    </div>

                    {/* Sewerage */}
                    <div className="flex items-start justify-between gap-2 pb-2 border-b border-dashed border-[#DADCE0]">
                      <div>
                        <div className="font-bold text-[#5F6368] text-[11px] uppercase tracking-wider">Sewerage Tax (50%)</div>
                        <div className="text-[10px] text-[#70757A] mt-0.5">
                          {formatNPR(officialResult.waterCharge)} × 50%
                        </div>
                      </div>
                      <div className="font-black text-[#1A73E8] shrink-0">{formatNPR(officialResult.sewerageTax)}</div>
                    </div>

                    {/* Grand total */}
                    <div className="flex items-center justify-between py-3 px-3 bg-[#E8F0FE] rounded-md border border-[#1A73E8]">
                      <div>
                        <div className="text-sm font-black text-[#1A73E8] uppercase">Total Payable Bill</div>
                        <div className="text-[9px] text-[#1A73E8]/70 mt-0.5">Water + Sewerage</div>
                      </div>
                      <div className="text-xl font-black text-[#1A73E8]">{formatNPR(officialResult.totalBill)}</div>
                    </div>

                    <div className="text-[9px] text-[#70757A] text-center italic">
                      Formula: Water Charge + (Water Charge × 50%) = Total Bill
                    </div>
                  </div>
                </div>
              ) : (
                /* ── PLACEHOLDER when no units ─── */
                <div className="border border-dashed border-[#DADCE0] rounded-lg p-6 text-center space-y-2 bg-[#F8F9FA]">
                  <Droplets className="w-8 h-8 text-[#DADCE0] mx-auto" />
                  <p className="text-sm font-bold text-[#9AA0A6]">Your bill breakdown will appear here</p>
                  <p className="text-[10px] text-[#BDBDBD]">Enter your monthly units above to calculate</p>
                </div>
              )}

              {/* Consumption summary chips — only when units entered */}
              {hasUnits && (
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
                    <div className="text-[9px] font-bold text-[#5F6368] uppercase tracking-wider mb-1">Litres</div>
                    <div className="text-base font-black text-[#202124]">{(state.units * 1000).toLocaleString('en-IN')}</div>
                    <div className="text-[8px] text-[#70757A] font-medium">L</div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* ── CUSTOM RESULT ─────────────────────────────────── */
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-[#F1F3F4] pb-3">
                <Calculator className="w-5 h-5 text-[#1A73E8]" />
                <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Live Custom Bill</h3>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm"><span className="font-bold text-[#5F6368]">Water Charge</span><span className="font-black text-[#202124]">{formatNPR(customResult.waterCharge)}</span></div>
                <div className="flex justify-between items-center text-sm"><span className="font-bold text-[#5F6368]">Sewerage ({state.cSewPct}%)</span><span className="font-black text-[#202124]">{formatNPR(customResult.sewerageTax)}</span></div>
                {state.cService > 0 && <div className="flex justify-between items-center text-sm"><span className="font-bold text-[#5F6368]">Service Charge</span><span className="font-black text-[#202124]">{formatNPR(state.cService)}</span></div>}
                {state.cOther > 0 && <div className="flex justify-between items-center text-sm"><span className="font-bold text-[#5F6368]">Other Charges</span><span className="font-black text-[#202124]">{formatNPR(state.cOther)}</span></div>}
                {state.cVat > 0 && <div className="flex justify-between items-center text-sm"><span className="font-bold text-[#5F6368]">VAT ({state.cVat}%)</span><span className="font-black text-[#202124]">{formatNPR(customResult.vatAmount)}</span></div>}
              </div>
              <div className="pt-4 border-t border-[#DADCE0]">
                <div className="flex flex-col items-center justify-center p-4 bg-[#E8F0FE] rounded-md border border-[#1A73E8]">
                  <span className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider mb-1">Total Custom Bill</span>
                  <span className="text-3xl font-black text-[#1A73E8]">{formatNPR(customResult.totalBill)}</span>
                </div>
              </div>
              <div className="mt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={state.cCompare} onChange={(e) => update({ cCompare: e.target.checked })} className="w-4 h-4 text-[#1A73E8] rounded" />
                  <span className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Compare with Official KUKL Tariff</span>
                </label>
                {state.cCompare && (
                  <div className="mt-4 border border-[#DADCE0] rounded-md overflow-hidden text-sm">
                    <div className="grid grid-cols-3 bg-[#F8F9FA] p-2 border-b border-[#DADCE0]">
                      <div className="font-bold text-[10px] text-[#5F6368] uppercase">Charge</div>
                      <div className="font-bold text-[10px] text-[#5F6368] uppercase text-right">Official</div>
                      <div className="font-bold text-[10px] text-[#1A73E8] uppercase text-right">Custom</div>
                    </div>
                    <div className="grid grid-cols-3 p-2 border-b border-[#F1F3F4]"><div className="font-bold text-[#5F6368]">Water</div><div className="text-right">{formatNPR(officialCompare.waterCharge)}</div><div className="text-right font-bold">{formatNPR(customResult.waterCharge)}</div></div>
                    <div className="grid grid-cols-3 p-2 border-b border-[#F1F3F4]"><div className="font-bold text-[#5F6368]">Sewerage</div><div className="text-right">{formatNPR(officialCompare.sewerageTax)}</div><div className="text-right font-bold">{formatNPR(customResult.sewerageTax)}</div></div>
                    <div className="grid grid-cols-3 p-2 bg-[#E8F0FE]"><div className="font-bold text-[#1A73E8]">Total</div><div className="text-right font-black text-[#1A73E8]">{formatNPR(officialCompare.totalBill)}</div><div className="text-right font-black text-[#1A73E8]">{formatNPR(customResult.totalBill)}</div></div>
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
                <div className="space-y-6">
                  <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 border-b border-[#F1F3F4] pb-3">
                      <LayoutList className="w-5 h-5 text-[#1A73E8]" />
                      <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Calculation Steps</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between"><span className="text-xs font-bold text-[#5F6368] uppercase">Step 1: Units Entered</span><span className="text-sm font-black text-[#202124]">{state.units} Units</span></div>
                      <div className="w-0.5 h-4 bg-[#DADCE0] ml-2" />
                      <div className="flex items-center justify-between"><span className="text-xs font-bold text-[#5F6368] uppercase">Step 2: Minimum Charge (Up to {currentOfficialTariff.minUnits} Units)</span><span className="text-sm font-black text-[#202124]">{formatNPR(currentOfficialTariff.minCharge)}</span></div>
                      <div className="w-0.5 h-4 bg-[#DADCE0] ml-2" />
                      {state.units > currentOfficialTariff.minUnits && (<><div className="flex items-center justify-between"><span className="text-xs font-bold text-[#5F6368] uppercase">Step 3: Extra Units ({state.units - currentOfficialTariff.minUnits} × {formatNPR(currentOfficialTariff.excessRate)})</span><span className="text-sm font-black text-[#202124]">{formatNPR((state.units - currentOfficialTariff.minUnits) * currentOfficialTariff.excessRate)}</span></div><div className="w-0.5 h-4 bg-[#DADCE0] ml-2" /></>)}
                      <div className="flex items-center justify-between p-2 bg-[#F8F9FA] rounded border border-[#DADCE0]"><span className="text-xs font-black text-[#1A73E8] uppercase">Total Water Charge</span><span className="text-sm font-black text-[#1A73E8]">{formatNPR(officialResult.waterCharge)}</span></div>
                      <div className="w-0.5 h-4 bg-[#DADCE0] ml-2" />
                      <div className="flex items-center justify-between"><span className="text-xs font-bold text-[#5F6368] uppercase">Step 4: Sewerage (50%)</span><span className="text-sm font-black text-[#202124]">{formatNPR(officialResult.sewerageTax)}</span></div>
                      <div className="w-0.5 h-4 bg-[#DADCE0] ml-2" />
                      <div className="flex items-center justify-between p-3 bg-[#E8F0FE] rounded border border-[#1A73E8]"><span className="text-sm font-black text-[#1A73E8] uppercase">Final Payable Bill</span><span className="text-lg font-black text-[#1A73E8]">{formatNPR(officialResult.totalBill)}</span></div>
                    </div>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 border-b border-[#F1F3F4] pb-3">
                      <ShieldCheck className="w-5 h-5 text-[#188038]" />
                      <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Official Tariff Used</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-[#F8F9FA] rounded border border-[#DADCE0] text-center"><div className="text-[10px] font-bold text-[#5F6368] uppercase mb-1">Pipe Size</div><div className="text-base font-black text-[#202124]">{state.pipeSize} Inch</div></div>
                      <div className="p-3 bg-[#F8F9FA] rounded border border-[#DADCE0] text-center"><div className="text-[10px] font-bold text-[#5F6368] uppercase mb-1">Min Units</div><div className="text-base font-black text-[#202124]">{currentOfficialTariff.minUnits} Units</div></div>
                      <div className="p-3 bg-[#F8F9FA] rounded border border-[#DADCE0] text-center"><div className="text-[10px] font-bold text-[#5F6368] uppercase mb-1">Base Charge</div><div className="text-base font-black text-[#202124]">{formatNPR(currentOfficialTariff.minCharge)}</div></div>
                      <div className="p-3 bg-[#F8F9FA] rounded border border-[#DADCE0] text-center"><div className="text-[10px] font-bold text-[#5F6368] uppercase mb-1">Extra Rate</div><div className="text-base font-black text-[#202124]">{formatNPR(currentOfficialTariff.excessRate)}/unit</div></div>
                    </div>
                    <div className="mt-4 p-3 bg-[#FFF8E1] border border-[#FDE293] rounded-md text-center">
                      <p className="text-[10px] font-bold text-[#B06000] uppercase">Tariff reviewed against latest official KUKL schedule.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-2 pb-2">
                    <span className="text-xs font-bold text-[#5F6368] uppercase tracking-wider mr-1">Export:</span>
                    <button onClick={() => { try { window.print(); } catch(e){} }} className="h-8 px-3 border border-[#DADCE0] bg-white rounded flex items-center gap-1.5 hover:bg-[#F8F9FA] text-[10px] font-bold text-[#5F6368] uppercase"><Printer className="w-3 h-3" /> Print</button>
                    <button onClick={() => { const t = `KUKL Water Bill\nPipe: ${state.pipeSize}"\nUnits: ${state.units}\nWater: ${formatNPR(officialResult.waterCharge)}\nSewerage: ${formatNPR(officialResult.sewerageTax)}\nTotal: ${formatNPR(officialResult.totalBill)}`; navigator.clipboard?.writeText(t).catch(()=>{}); }} className="h-8 px-3 border border-[#DADCE0] bg-white rounded flex items-center gap-1.5 hover:bg-[#F8F9FA] text-[10px] font-bold text-[#5F6368] uppercase"><Copy className="w-3 h-3" /> Copy</button>
                    <button onClick={() => { const d = { pipeSize: state.pipeSize, consumptionUnits: state.units, waterCharge: officialResult.waterCharge, sewerageTax: officialResult.sewerageTax, totalBill: officialResult.totalBill }; const b = new Blob([JSON.stringify(d, null, 2)], {type:'application/json'}); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = `kukl-bill-${state.units}units.json`; a.click(); }} className="h-8 px-3 border border-[#1A73E8] bg-[#E8F0FE] rounded flex items-center gap-1.5 hover:bg-[#D2E3FC] text-[10px] font-bold text-[#1A73E8] uppercase"><Download className="w-3 h-3" /> Download</button>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 border-b border-[#F1F3F4] pb-3">
                      <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Sample Bills ({state.pipeSize}")</h3>
                    </div>
                    <div className="border border-[#DADCE0] rounded-md overflow-hidden text-sm">
                      <div className="grid grid-cols-2 bg-[#F8F9FA] p-3 border-b border-[#DADCE0]"><div className="font-bold text-[10px] text-[#5F6368] uppercase">Units</div><div className="font-bold text-[10px] text-[#5F6368] uppercase text-right">Total Bill</div></div>
                      {[10, 15, 20, 30].map((u) => (
                        <div key={u} className={`grid grid-cols-2 p-3 border-b border-[#F1F3F4] last:border-0 ${state.units === u ? 'bg-[#E8F0FE]' : ''}`}>
                          <div className={`font-bold ${state.units === u ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>{u} Units</div>
                          <div className={`text-right ${state.units === u ? 'text-[#1A73E8] font-black' : 'text-[#5F6368]'}`}>{formatNPR(calculateKUKLBill(u, state.pipeSize).totalBill)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 border-b border-[#F1F3F4] pb-3">
                      <h3 className="text-[11px] font-black text-[#202124] uppercase tracking-widest">Typical Household Usage</h3>
                    </div>
                    <div className="border border-[#DADCE0] rounded-md overflow-hidden text-sm">
                      <div className="grid grid-cols-2 bg-[#F8F9FA] p-3 border-b border-[#DADCE0]"><div className="font-bold text-[10px] text-[#5F6368] uppercase">Household</div><div className="font-bold text-[10px] text-[#5F6368] uppercase text-right">Est. Monthly Units</div></div>
                      {[['1 Person', '4–7 Units'], ['2–3 People', '8–12 Units'], ['4–5 People', '12–18 Units'], ['6+ People', '18–30+ Units']].map(([h, u], i) => (
                        <div key={i} className={`grid grid-cols-2 p-3 border-b border-[#F1F3F4] last:border-0 ${i === 3 ? 'bg-[#FFF8E1]' : ''}`}>
                          <div className="font-bold text-[#202124]">{h}</div>
                          <div className={`text-right ${i === 3 ? 'text-[#B06000]' : 'text-[#5F6368]'}`}>{u}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
