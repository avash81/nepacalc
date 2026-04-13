'use client';

import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { Sun, Battery, Zap, TrendingUp } from 'lucide-react';

export default function SolarCalculator() {
  const [monthlyBill, setMonthlyBill] = useState<number>(2500);
  const [sunshineHours, setSunshineHours] = useState<number>(4.5);
  const [backupHours, setBackupHours] = useState<number>(4);

  const results = useMemo(() => {
    // Basic Estimate for Nepal
    // Avg unit price ~ NPR 10
    const dailyUnits = (monthlyBill / 10) / 30;
    
    // Solar Panel size (kW) needed to produce periodic daily units
    // Efficiency approx 0.8
    const systemSizeKW = Number((dailyUnits / sunshineHours / 0.8).toFixed(2));
    
    // Battery calculation (simplified)
    // Backup needed in Wh = Load (W) * Hours
    // Assuming load is proportional to average daily use
    const avgLoadWatts = (dailyUnits * 1000) / 24; 
    const backupWh = avgLoadWatts * backupHours;
    const batteryAh = Math.ceil(backupWh / 12); // For 12V system

    const numPanels = Math.ceil((systemSizeKW * 1000) / 400); // Using 400W panels

    return {
      dailyUnits,
      systemSizeKW,
      numPanels,
      batteryAh
    };
  }, [monthlyBill, sunshineHours, backupHours]);

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
                    onChange={setMonthlyBill} 
                    min={0}
                    placeholder="e.g. 2000"
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <ValidatedInput 
                        label="Avg Sunlight Hours/Day" 
                        value={sunshineHours} 
                        onChange={setSunshineHours} 
                        min={1}
                        max={12}
                        step={0.1}
                    />
                    <ValidatedInput 
                        label="Desired Backup (Hours)" 
                        value={backupHours} 
                        onChange={setBackupHours} 
                        min={0}
                        max={24}
                    />
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                    <Sun className="w-5 h-5 text-amber-500 shrink-0" />
                    <p className="text-xs text-amber-900 leading-normal font-medium">
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
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mb-2">Recommended System Size</div>
                  <div className="text-5xl font-black text-slate-900 tracking-tighter">
                    {results.systemSizeKW} <span className="text-2xl">kW</span>
                  </div>
               </div>
               
               <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-bold text-slate-600 uppercase">Panels (Approx)</span>
                      </div>
                      <span className="text-lg font-black text-slate-900">{results.numPanels} x 400W</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-2">
                        <Battery className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-bold text-slate-600 uppercase">Battery Backup</span>
                      </div>
                      <span className="text-lg font-black text-slate-900">{results.batteryAh} Ah (12V)</span>
                  </div>
               </div>
            </div>

            <div className="p-6 bg-slate-900 rounded-3xl text-white">
                <div className="flex items-center gap-3 text-amber-400 mb-4">
                    <TrendingUp className="w-5 h-5" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Estimated Annual Impact</h4>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-bold">Annual Generation</span>
                        <span className="text-white font-black">~{(results.dailyUnits * 365).toFixed(0)} kWh</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-bold">Annual Savings</span>
                        <span className="text-emerald-400 font-black">NPR {(monthlyBill * 12).toLocaleString()}</span>
                    </div>
                </div>
            </div>
          </div>
        }
        faqSection={
          <div className="prose prose-slate max-w-none w-full print-hide mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Solar Power in Nepal</h2>
            <p>Nepal has high solar potential. A 1kW system typically generates enough power for a small family to run lights, fans, and a TV.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-slate-800">Grid-Tied vs Off-Grid</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Grid-tied systems (Net Metering) allow you to sell excess power back to NEA, while off-grid systems require batteries for night-time use.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-slate-800">Maintenance</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Cleaning the panels once a month can increase efficiency by up to 15%. Batteries should be checked every 6 months.</p>
              </div>
            </div>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
