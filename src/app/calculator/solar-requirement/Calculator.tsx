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
      <ModernCalcLayout hideH1={false}
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
        details={
          <div className="space-y-8">
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-4">Nepal's Solar Resource & System Sizing Methodology</h2>
              <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
                <p>Nepal is exceptionally well-positioned for solar energy. With an average of <strong className="text-[#202124]">4.5–5.0 peak sun hours per day</strong> across most of the country (6+ in high-altitude Mustang and Humla), the country receives a solar irradiance of approximately 3.6–6.2 kWh/m²/day. Our <strong className="text-[#202124]">solar calculator</strong> converts your monthly electricity bill into a precise system specification using the standard photovoltaic sizing methodology.</p>
                <p>The calculation chain: Bill → kWh/month → kWh/day → System kW (adjusting for peak sun hours and 80% real-world efficiency) → Panel count (based on 400W panels, current market standard) → Battery capacity (Ah) for the desired backup duration.</p>
              </div>
            </div>
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Battery Voltage Selection Guide for Nepal</h3>
              <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
                <li><strong className="text-[#1A73E8]">12V Systems:</strong> Small off-grid setups under 500W. Simple, low-cost. Common for basic lighting and phone charging in remote areas. Not suitable for modern inverters or whole-home backup.</li>
                <li><strong className="text-[#188038]">24V Systems:</strong> Medium setups 1–3kW. Handles most appliances. Standard for many residential solar installations in Nepal with lead-acid batteries.</li>
                <li><strong className="text-[#D93025]">48V Systems (Recommended):</strong> Modern standard for whole-home solar (3kW+). Thinner wiring, higher efficiency, compatible with lithium iron phosphate (LiFePO4) batteries. Best option for new installations in 2025+.</li>
              </ul>
            </div>
          </div>
        }
        faqs={[
          {
            question: "Why does the calculator assume 80% system efficiency?",
            answer: "Solar systems lose energy through: inverter conversion (DC to AC, ~5–10% loss), cable/wiring resistance (~2–3% loss), temperature derating (panels produce less at high temperatures), and dust accumulation. Cumulatively, 80% is the standard industry real-world efficiency factor used for sizing calculations."
          },
          {
            question: "Should I choose 12V, 24V, or 48V for my battery bank?",
            answer: "For small setups (under 1kW), 12V is acceptable. For medium systems (1–3kW), 24V is standard. For whole-home setups (3kW+), 48V is strongly recommended, it allows thinner wiring, handles more power safely, and is compatible with all modern hybrid/lithium inverters available in Nepal."
          },
          {
            question: "How many peak sun hours does Nepal get?",
            answer: "Nepal averages 4.5–5.0 peak sun hours per day in the Terai and hilly regions. High-altitude districts like Mustang, Humla, and Dolpa receive 6+ hours, making them ideal for solar. Coastal/valley locations like Kathmandu average about 4.5 hours due to monsoon cloud cover (June–September)."
          },
          {
            question: "How much does a solar system cost in Nepal?",
            answer: "As of 2025, a complete 3kW grid-tie solar system in Nepal costs approximately NPR 4–6 lakh, depending on panel brand, inverter type, and installation complexity. A 5kW system with lithium battery backup costs NPR 8–12 lakh. Payback period is typically 5–8 years given rising NEA tariffs."
          },
          {
            question: "Do I need government approval to install solar in Nepal?",
            answer: "For grid-tie systems (systems connected to the NEA grid) above 5kW, approval from the Nepal Electricity Authority (NEA) and your local distribution center is required. Off-grid systems and small on-grid systems under 5kW can typically be installed without prior government approval, though local bylaws may vary."
          },
          {
            question: "What is the difference between on-grid and off-grid solar?",
            answer: "On-grid (grid-tie) systems feed surplus power back to the NEA grid and draw from it at night. They do not require batteries but provide no backup during outages. Off-grid systems use battery banks for 24/7 independent power. Hybrid systems combine both, grid-connected with battery backup for outages, which is the most popular option in Nepal today."
          }
        ]}
      />
    </CalculatorErrorBoundary>
  );
}

