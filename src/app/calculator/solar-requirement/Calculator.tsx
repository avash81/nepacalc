'use client';

import React, { useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
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
      <ModernCalcLayout
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Solar Calculator' }]}
        title="Solar Power Requirement Calculator"
        description="Estimate the ideal solar panel size, battery backup, and required capacity for your home based on your monthly electricity bill."
        icon={Sun}
        inputs={
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner space-y-6">
                <ValidatedInput 
                    label="Monthly Electricity Bill (NPR)" 
                    value={monthlyBill} 
                    onChange={(v) => updateState({ monthlyBill: v })} 
                    min={0}
                    placeholder="e.g. 2500"
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

                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">System Voltage (Battery Bank)</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[12, 24, 48].map((v) => (
                      <button
                        key={v}
                        onClick={() => updateState({ systemVoltage: v })}
                        className={`py-3 text-sm font-bold rounded-xl border transition-all ${
                          systemVoltage === v 
                            ? 'bg-amber-500 border-amber-600 text-white shadow-md' 
                            : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {v}V
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {systemVoltage === 48 ? 'Recommended for modern hybrid/lithium setups (High Efficiency).' : 'Standard for smaller, legacy lead-acid setups.'}
                  </p>
                </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                <Sun className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                    Did you know? Nepal receives an average of <strong>4.5 to 5 peak sun hours per day</strong>, making it an excellent location for solar energy harvesting.
                </p>
            </div>
          </div>
        }
        results={
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-100 text-center bg-slate-50">
                  <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">Recommended System Size</div>
                  <div className="text-6xl font-black text-slate-900 tracking-tighter">
                    {results.systemSizeKW} <span className="text-2xl text-slate-500 font-bold">kW</span>
                  </div>
               </div>
               
               <div className="p-6 space-y-4 divide-y divide-slate-100">
                  <div className="flex items-center justify-between pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-50 rounded-lg"><Zap className="w-5 h-5 text-amber-500" /></div>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Panels (Approx)</span>
                      </div>
                      <span className="text-lg font-black text-slate-900">{results.numPanels} x 400W</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg"><Battery className="w-5 h-5 text-blue-500" /></div>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Storage Needed</span>
                      </div>
                      <span className="text-lg font-black text-slate-900">{results.batteryAh} Ah @ {systemVoltage}V</span>
                  </div>
               </div>
            </div>

            <div className="p-8 bg-slate-900 rounded-3xl text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10">
                   <Sun className="w-48 h-48 -mr-10 -mt-10" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 text-amber-400 mb-6">
                      <TrendingUp className="w-5 h-5" />
                      <h4 className="text-xs font-black uppercase tracking-widest text-white">Estimated Annual Impact</h4>
                  </div>
                  <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-white/10 pb-4">
                          <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">Total Generation</span>
                          <span className="text-xl font-black">~{(results.dailyUnits * 365).toFixed(0)} kWh</span>
                      </div>
                      <div className="flex justify-between items-center">
                          <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">Potential Bill Savings</span>
                          <span className="text-2xl text-emerald-400 font-black">NPR {(monthlyBill * 12).toLocaleString()}</span>
                      </div>
                  </div>
                </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex gap-3 items-start">
               <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
               <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Note: Estimates are based on 80% system efficiency and standard 400W panels. Actual generation varies based on roof tilt, shading, and local weather patterns.
               </p>
            </div>
          </div>
        }
        sidebar={{
          title: "Related Calculators",
          links: [
            { label: 'Percentage Calculator', href: '/calculator/percentage' },
            { label: 'Remittance Calculator', href: '/calculator/remittance-calculator' },
          ],
        }}
        howToUse={{
          steps: [
            "Enter your average monthly electricity bill in Nepalese Rupees (NPR).",
            "Adjust the average sunlight hours for your specific location (4.5 to 5 is typical for Nepal).",
            "Specify how many hours of battery backup you need during load shedding or nighttime.",
            "Select your preferred battery bank voltage (48V is recommended for modern systems).",
            "The calculator will instantly provide your required system size (kW), the number of panels needed, and the required battery capacity (Ah)."
          ]
        }}
        faqs={[
          {
            question: "Why does the calculator assume 80% efficiency?",
            answer: "Solar systems never operate at 100% efficiency. Energy is lost as heat, during DC to AC conversion in the inverter, through wiring resistance, and due to dust on the panels. An 80% efficiency factor provides a realistic, real-world estimate."
          },
          {
            question: "Should I choose 12V, 24V, or 48V for my battery?",
            answer: "For small setups (under 1kW), 12V is fine. For medium systems (1kW - 3kW), 24V is standard. For whole-home setups (3kW+), 48V is highly recommended as it uses thinner wires, handles more power safely, and is the standard for modern lithium/hybrid inverters."
          }
        ]}
        seoContent={
          <div>
            <h2>How to Size a Solar Power System</h2>
            <p>Moving to solar energy is a major investment. Before purchasing panels or inverters, it is critical to properly size your system so that it generates enough power for your needs without overspending on excess capacity.</p>

            <h2>Energy Guide: Solar Power in Nepal</h2>
            <p className="font-medium">
              With increasing electricity tariffs and a focus on renewable energy, solar power has become a mainstream solution for homes and businesses in Nepal. Accurate <strong>load calculation</strong> is the first step toward energy independence.
            </p>
            <p>
              Our <strong>Solar Requirement Laboratory</strong> helps you size your system correctly. By analyzing your daily wattage consumption and desired backup hours, our engine provides a clear recommendation for <strong>Photovoltaic (PV) panel wattage</strong> and battery Ampere-hour (Ah) capacity, ensuring you never run out of light.
            </p>
            
            <h3>Understanding Peak Sun Hours</h3>
            <p>A "peak sun hour" is not the total hours the sun is up; it represents an hour when the intensity of sunlight reaches 1,000 watts per square meter. Even if the sun is visible for 12 hours, you may only get 4 to 5 peak sun hours per day. Nepal is generally an excellent location for solar, averaging around 4.5 peak sun hours.</p>
            
            <h3>The Calculation Logic</h3>
            <p>This calculator determines your system size through a few steps:</p>
            <ol>
              <li><strong>Calculate Daily Units:</strong> We divide your monthly bill by the average cost per unit (approx NPR 10) to find your monthly consumption in kWh, then divide by 30 for the daily average.</li>
              <li><strong>Factor in Sunlight:</strong> We divide your daily need by the number of peak sun hours. If you need 10kWh and get 5 sun hours, you need a system that generates 2kW per hour.</li>
              <li><strong>Apply Efficiency Loss:</strong> Because of system losses, we divide the requirement by 0.8 (80% efficiency). In the previous example, a 2kW requirement becomes a 2.5kW recommended system size.</li>
            </ol>
            
            <h3>Battery Sizing (Ah)</h3>
            <p>Batteries are sized in Amp-Hours (Ah). To determine this, we calculate the total Watt-Hours (Wh) needed during your backup period and divide it by the voltage of your battery bank. A higher voltage bank (48V vs 12V) means you need fewer Amp-Hours to store the same amount of total energy, which is safer and more efficient for wiring.</p>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
