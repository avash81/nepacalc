'use client';

import React, { useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { Sun, Battery, Zap, TrendingUp, Info } from 'lucide-react';
import { useSyncState } from '@/hooks/useSyncState';

const DEFAULT_STATE = {
  monthlyBill: 2500,
  sunshineHours: 4.5,
  backupHours: 4,
  systemVoltage: 48, // Modern standard
};

export default function SolarCalculator() {
  const [state, setState] = useSyncState('solar_req_v2', DEFAULT_STATE);
  const { monthlyBill, sunshineHours, backupHours, systemVoltage } = state;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

  const results = useMemo(() => {
    // Basic Estimate for Nepal
    // Avg unit price ~ NPR 10
    const dailyUnits = (monthlyBill / 10) / 30;
    
    // Solar Panel size (kW) needed to produce periodic daily units
    // Efficiency approx 0.8
    const systemSizeKW = Number((dailyUnits / (sunshineHours || 1) / 0.8).toFixed(2));
    
    // Battery calculation
    // Backup needed in Wh = Load (W) * Hours
    // Assuming load is proportional to average daily use
    const avgLoadWatts = (dailyUnits * 1000) / 24; 
    const backupWh = avgLoadWatts * backupHours;
    const batteryAh = Math.ceil(backupWh / systemVoltage); 

    const numPanels = Math.ceil((systemSizeKW * 1000) / 400); // Using 400W panels

    return {
      dailyUnits,
      systemSizeKW,
      numPanels,
      batteryAh
    };
  }, [monthlyBill, sunshineHours, backupHours, systemVoltage]);

  return (
    <CalculatorErrorBoundary calculatorName="Solar Requirement">
      <CalculatorLayout
        title="Solar Power Calculator"
        description="Calculate the ideal solar system size for your home or office. Estimate solar panel capacity, battery bank size, and potential savings."
        badge="Renewable Energy"
        badgeColor="orange"
        category={{ label: 'Home & Living', href: '/calculator/category/living' }}
        leftPanel={
          <div className="space-y-8">
            <div className="space-y-6">
                <ValidatedInput 
                    label="Monthly Electricity Bill (NPR)" 
                    value={monthlyBill} 
                    onChange={(v) => updateState({ monthlyBill: v })} 
                    min={0}
                    placeholder="e.g. 2000"
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <ValidatedInput 
                        label="Avg Sunlight Hours/Day" 
                        value={sunshineHours} 
                        onChange={(v) => updateState({ sunshineHours: v })} 
                        min={1}
                        max={12}
                        step={0.1}
                    />
                    <ValidatedInput 
                        label="Desired Backup (Hours)" 
                        value={backupHours} 
                        onChange={(v) => updateState({ backupHours: v })} 
                        min={0}
                        max={24}
                    />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Voltage (Battery)</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[12, 24, 48].map((v) => (
                      <button
                        key={v}
                        onClick={() => updateState({ systemVoltage: v })}
                        className={`py-3 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all ${
                          systemVoltage === v 
                            ? 'bg-amber-600 border-amber-600 text-white' 
                            : 'bg-white border-slate-200 text-slate-500'
                        }`}
                      >
                        {v}V
                      </button>
                    ))}
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">
                    {systemVoltage === 48 ? 'Recommended for modern hybrid/lithium systems' : 'Standard for small lead-acid setups'}
                  </p>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                    <Sun className="w-5 h-5 text-amber-500 shrink-0" />
                    <p className="text-[11px] text-amber-900 leading-normal font-medium">
                        Nepal receives an average of 4.5 to 5 peak sun hours per day.
                    </p>
                </div>
            </div>
          </div>
        }
        rightPanel={
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 text-center">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mb-2">Recommended System</div>
                  <div className="text-5xl font-black text-slate-900 tracking-tighter">
                    {results.systemSizeKW} <span className="text-2xl">kW</span>
                  </div>
               </div>
               
               <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Panels (Approx)</span>
                      </div>
                      <span className="text-sm font-black text-slate-900">{results.numPanels} x 400W</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Battery className="w-4 h-4 text-blue-500" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Storage Needed</span>
                      </div>
                      <span className="text-sm font-black text-slate-900">{results.batteryAh} Ah @ {systemVoltage}V</span>
                  </div>
               </div>
            </div>

            <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-xl">
                <div className="flex items-center gap-3 text-amber-400 mb-4">
                    <TrendingUp className="w-5 h-5" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Annual Impact</h4>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-400 uppercase tracking-wider text-[9px] font-black">Total Generation</span>
                        <span className="text-white font-black">~{(results.dailyUnits * 365).toFixed(0)} kWh</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-400 uppercase tracking-wider text-[9px] font-black">Bill Savings</span>
                        <span className="text-emerald-400 font-black">NPR {(monthlyBill * 12).toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4 items-start">
               <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
               <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-wider font-medium">
                  Estimates are based on average efficiency and 400W Panel standards. Actual generation may vary by location and tilt.
               </p>
            </div>
          </div>
        }
        faqSection={
          <div className="prose prose-slate max-w-none w-full print-hide mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Solar Power in Nepal</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="text-lg font-black text-slate-800">Grid-Tied vs Off-Grid</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Grid-tied systems (Net Metering) allow you to sell excess power back to NEA, while off-grid systems require batteries for night-time use.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="text-lg font-black text-slate-800">Why Voltage Matters?</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Higher voltage systems (48V) are more efficient for larger loads as they reduce current flow, allowing for thinner wires and less heat loss compared to 12V systems.</p>
              </div>
            </div>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
