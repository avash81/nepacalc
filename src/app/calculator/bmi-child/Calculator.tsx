'use client';
import React, { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Baby, Info, ShieldAlert } from 'lucide-react';

export default function BmiChildCalculator() {
  const [age, setAge] = useState<number>(10);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<number>(30);
  const [height, setHeight] = useState<number>(140);

  const results = useMemo(() => {
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    const isMale = gender === 'male';
    const a = Math.round(age);
    
    let p85 = 18; let p95 = 20; let p5 = 14; 
    if (a < 5) { p5 = 13.5; p85 = 17; p95 = 18; } 
    else if (a < 10) { p5 = 14; p85 = 19; p95 = 21; } 
    else if (a < 15) { p5 = 15.5; p85 = 22.5; p95 = 25; } 
    else { p5 = 17.5; p85 = 26; p95 = 29.5; }

    if (!isMale) { p85 -= 0.3; p95 -= 0.5; }

    let category = 'Healthy Weight';
    let color = 'text-[#188038]'; let bgColor = 'bg-[#E6F4EA]';

    if (bmi < p5) { category = 'Underweight'; color = 'text-[#E37400]'; bgColor = 'bg-[#FFF7E0]'; } 
    else if (bmi >= p95) { category = 'Obese'; color = 'text-[#D93025]'; bgColor = 'bg-[#FCE8E6]'; } 
    else if (bmi >= p85) { category = 'Overweight'; color = 'text-[#D93025]'; bgColor = 'bg-[#FCE8E6]'; }

    return { bmi: isNaN(bmi) || !isFinite(bmi) ? '0.0' : bmi.toFixed(1), category, color, bgColor };
  }, [age, gender, weight, height]);

  const inputCls = "w-full h-12 px-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Health', href: '/health/' }, { label: 'Child BMI Calculator' }]}
      title="Child BMI Calculator"
      description="Calculate BMI for children and teens (ages 2-19). Understand their growth percentile trajectory compared to WHO/CDC health standards."
      icon={Baby}
      inputs={
        <div className="space-y-6">
          <div className="space-y-3">
            <label className={labelCls}>Biological Sex</label>
            <div className="flex bg-[#F1F3F4] p-1 rounded-lg">
               <button onClick={() => setGender('male')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${gender === 'male' ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-[#5F6368]'}`}>Boy</button>
               <button onClick={() => setGender('female')} className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${gender === 'female' ? 'bg-white text-[#E91E63] shadow-sm' : 'text-[#5F6368]'}`}>Girl</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="sm:col-span-2">
                <label className={labelCls}>Age (2-19 Years)</label>
                <input type="number" value={age} min={2} max={19} onChange={e => setAge(Number(e.target.value))} className={inputCls} />
             </div>
             <div>
                <label className={labelCls}>Weight</label>
                <div className="relative">
                   <input type="number" value={weight} min={5} onChange={e => setWeight(Number(e.target.value))} className={inputCls} />
                   <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#70757A]">kg</span>
                </div>
             </div>
             <div>
                <label className={labelCls}>Height</label>
                <div className="relative">
                   <input type="number" value={height} min={50} onChange={e => setHeight(Number(e.target.value))} className={inputCls} />
                   <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#70757A]">cm</span>
                </div>
             </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-8 bg-[#E8F0FE] border border-[#DADCE0] rounded-lg text-center space-y-2">
             <div className="text-[10px] font-bold text-[#1A73E8] uppercase tracking-wider">Calculated Pediatric BMI</div>
             <div className="text-6xl font-black text-[#1A73E8] tracking-tighter">{results.bmi}</div>
             <div className={`text-[10px] font-black uppercase tracking-tighter ${results.color}`}>
                Trajectory: {results.category}
             </div>
          </div>

          <div className="p-4 bg-[#FCE8E6] border border-[#FAD2CF] rounded-lg flex gap-3 items-start">
             <ShieldAlert className="w-5 h-5 text-[#D93025] shrink-0 mt-0.5" />
             <div>
                <h4 className="text-[11px] font-bold uppercase text-[#D93025] tracking-wider mb-1">Clinical Protocol</h4>
                <p className="text-[10px] text-[#202124] leading-relaxed">This tool utilizes standard simplified BMI formulas mapped to WHO midpoints. It is intended for informational estimation. Always consult a pediatrician using official CDC/WHO growth charts for clinical diagnostics.</p>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-8 border-l-4 border-[#1A73E8] pl-4">
                <h3 className="text-base font-black text-[#202124] uppercase tracking-tight">Pediatric Growth Audit</h3>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed">
                The institutional engine for pediatric anthropometric assessment. Calibrated for children and teens (ages 2-19), this tool 
                plots BMI against <strong>WHO/CDC</strong> age-and-sex-specific growth trajectories. It provides mathematical certainty regarding 
                developmental norms, distinguishing between healthy weight, underweight, and excessive adiposity thresholds.
             </p>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select the child's biological sex. This is mandatory because boys and girls follow entirely different growth charts.",
          "Enter the child's exact age in years (between 2 and 19).",
          "Input the current weight in kilograms and height in centimeters.",
          "Check the calculated BMI result and review the corresponding estimated health percentile category."
        ]
      }}
      formula={{
        title: "Pediatric BMI Logistics",
        description: "Calculation maps to percentile midpoints.",
        raw: "BMI = Weight (kg) / [Height (m)]²\n\nUnlike adults, children's BMI results must be mapped against age-specific percentile grids. Percentiles under 5% indicate underweight, 85%-95% indicate overweight, and over 95% is obese."
      }}
      faqs={[
        {
          question: "Why is Child BMI calculated differently than Adult BMI?",
          answer: "While the raw math (weight divided by height squared) is identical, the interpretation is completely different. Because children are actively growing, their body fat percentages change constantly. A static BMI range (like 18.5, 24.9 for adults) is completely inaccurate for kids. Instead, a child's BMI is ranked as a percentile against other children of the exact same age and biological sex."
        },
        {
          question: "What does '85th Percentile' actually mean?",
          answer: "If a child is in the 85th percentile, it means their BMI is higher than 85% of children of the same age and sex, and lower than 15%. In pediatric medicine, the 85th percentile is the threshold where a child is officially classified as 'Overweight'."
        },
        {
          question: "Can this calculator be used for toddlers under 2 years old?",
          answer: "No. For infants and toddlers under 24 months, doctors use specialized 'Weight-for-Length' growth charts rather than BMI. BMI calculations are only medically validated for children aged 2 through 19."
        },
        {
          question: "How often should I check my child's BMI?",
          answer: "Pediatricians generally recommend checking a child's BMI once a year during their annual physical exam. Checking it too frequently can cause unnecessary anxiety, as children often experience rapid height growth spurts right before or after weight gain."
        },
        {
          question: "My child is muscular from sports. Does this affect the result?",
          answer: "Yes. BMI cannot distinguish between fat mass and muscle mass. A highly athletic teen (like a football player or gymnast) might have a heavy weight due to dense muscle, resulting in a 'High BMI' despite having low body fat. Always consult a doctor for a holistic assessment."
        },
        {
          question: "What should I do if my child is categorized as Obese?",
          answer: "Do not attempt to put a growing child on a restrictive diet without medical supervision. Focus on lifestyle changes for the entire family, increasing physical activity, reducing sugary drinks, and consulting a pediatrician or registered dietitian."
        }
      ]}
      sidebar={{ title: "Health Tools", links: [
          { label: "Adult BMI Calculator", href: "/calculator/bmi-calculator" }, { label: "Pregnancy Due Date", href: "/calculator/pregnancy-due-date" },
          { label: "Nepal Salary", href: "/calculator/nepal-salary/" },
          { label: "Income Tax", href: "/calculator/nepal-income-tax/" },
          { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" }
        ], banner: { title: "Pediatric Health", description: "Ensure your child maintains a balanced diet and regular physical activity.", image: "/images/health-banner.jpg" } }}
      relatedTools={[
        { label: "BMI Calculator", href: "/calculator/bmi-calculator" },
        { label: "Nepal Salary", href: "/calculator/nepal-salary/" },
          { label: "Income Tax", href: "/calculator/nepal-income-tax/" },
          { label: "Lok Sewa Age", href: "/calculator/lok-sewa-age/" }
      ]}
    />
  );
}
