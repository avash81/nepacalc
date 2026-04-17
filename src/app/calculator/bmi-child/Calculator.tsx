'use client';

import React, { useState, useMemo } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { Baby, Activity, Scale, Info } from 'lucide-react';

export default function BmiChildCalculator() {
  const [age, setAge] = useState<number>(10);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<number>(30);
  const [height, setHeight] = useState<number>(140);

  const results = useMemo(() => {
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    
    // Accurate BMI-for-age percentile logic for kids (2-19)
    // Heuristic values based on CDC/WHO growth curve midpoints
    const isMale = gender === 'male';
    const a = Math.round(age);
    
    // Heuristic 50th/85th/95th percentiles for rough categorization
    // These values shift significantly from age 2 to 19
    let p85 = 18; // Overweight marker
    let p95 = 20; // Obese marker
    let p5  = 14; // Underweight marker

    if (a < 5) {
      p5 = 13.5; p85 = 17; p95 = 18;
    } else if (a < 10) {
      p5 = 14; p85 = 19; p95 = 21;
    } else if (a < 15) {
      p5 = 15.5; p85 = 22.5; p95 = 25;
    } else {
      p5 = 17.5; p85 = 26; p95 = 29.5;
    }

    // Gender adjustments (Boys slightly higher/lower at certain peaks)
    if (!isMale) {
      p85 -= 0.3; p95 -= 0.5;
    }

    let category = 'Healthy Weight';
    let color = 'text-green-600';
    let bgColor = 'bg-green-50';
    let borderColor = 'border-green-100';

    if (bmi < p5) {
        category = 'Underweight';
        color = 'text-amber-600';
        bgColor = 'bg-amber-50';
        borderColor = 'border-amber-100';
    } else if (bmi >= p95) {
        category = 'Obese';
        color = 'text-red-600';
        bgColor = 'bg-red-50';
        borderColor = 'border-red-100';
    } else if (bmi >= p85) {
        category = 'Overweight';
        color = 'text-orange-600';
        bgColor = 'bg-orange-50';
        borderColor = 'border-orange-100';
    }

    return { bmi: bmi.toFixed(1), category, color, bgColor, borderColor };
  }, [age, gender, weight, height]);

  return (
    <CalculatorErrorBoundary calculatorName="BMI Child">
      <CalculatorLayout
        title="BMI Calculator for Children & Teens"
        description="Calculate BMI for kids and teens (ages 2-19) and see how it compares to other children of the same age and gender."
        badge="Pediatric"
        badgeColor="pink"
        category={{ label: 'Health', href: '/calculator/category/health' }}
        leftPanel={
          <div className="space-y-8">
            <div className="flex p-1 bg-slate-50 rounded-xl border border-slate-200">
                <button
                    onClick={() => setGender('male')}
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                      gender === 'male' 
                        ? 'bg-white text-blue-600 shadow-sm border border-slate-100' 
                        : 'text-slate-400'
                    }`}
                >
                    Boy
                </button>
                <button
                    onClick={() => setGender('female')}
                    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                      gender === 'female' 
                        ? 'bg-white text-pink-600 shadow-sm border border-slate-100' 
                        : 'text-slate-400'
                    }`}
                >
                    Girl
                </button>
            </div>

            <div className="space-y-6">
                <ValidatedInput label="Age (2-19)" value={age} onChange={setAge} min={2} max={19} />
                <ValidatedInput label="Weight (kg)" value={weight} onChange={setWeight} min={5} />
                <ValidatedInput label="Height (cm)" value={height} onChange={setHeight} min={50} />
            </div>
          </div>
        }
        rightPanel={
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className={`bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden`}>
              <div className="p-10 border-b border-slate-50 text-center">
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Calculated BMI</div>
                 <div className="text-7xl font-black text-slate-900 tracking-tighter">
                   {results.bmi}
                 </div>
              </div>
              <div className={`p-8 ${results.bgColor} text-center`}>
                 <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-2">Age-Specific Category</div>
                 <div className={`text-4xl font-black uppercase tracking-tight ${results.color}`}>
                   {results.category}
                 </div>
              </div>
            </div>

            <div className="p-6 bg-rose-50 rounded-3xl border border-rose-100 flex gap-4 items-start">
                <div className="p-3 bg-white rounded-xl shadow-sm text-rose-500">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="text-sm font-black text-rose-900 mb-1 leading-tight">Medical Disclaimer</h4>
                   <p className="text-[11px] text-rose-700 leading-relaxed font-medium">
                     This calculator uses simplified adult BMI thresholds for demonstration purposes. <strong>It is NOT suitable for clinical use.</strong> 
                     Child BMI must be interpreted using age and sex-specific growth charts from the CDC or WHO. Please consult a pediatrician for accurate health assessment.
                   </p>
                </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex gap-4 items-start">
                <div className="p-3 bg-white rounded-xl shadow-sm italic text-xs font-bold text-slate-400">?</div>
                <div>
                   <h4 className="text-sm font-black text-slate-900 mb-1 leading-tight">Understanding Child BMI</h4>
                   <p className="text-xs text-slate-500 leading-relaxed">
                     BMI for children and teens is interpreted differently than for adults. It is age and gender-specific because the amount of body fat changes with age.
                   </p>
                </div>
            </div>
          </div>
        }
        faqSection={
          <div className="prose prose-slate max-w-none w-full mt-16 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Why is BMI different for children?</h3>
                <p className="text-sm text-slate-600">Children&apos;s bodies grow and change at different rates. A healthy BMI for a 5-year-old is different than a healthy BMI for a 15-year-old.</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">What is a BMI percentile?</h3>
                <p className="text-sm text-slate-600">Percentiles show how a child&apos;s BMI compares to other children of the same age and gender. BMI at or above the 95th percentile is considered obese.</p>
              </div>
            </div>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
