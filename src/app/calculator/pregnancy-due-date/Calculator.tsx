'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Calendar, Baby, Activity } from 'lucide-react';

export default function PregnancyDueDateCalculator() {
  const [lmp, setLmp] = useState(new Date().toISOString().split('T')[0]);

  const r = useMemo(() => {
    const d = new Date(new Date(lmp).getTime() + 280 * 86400000);
    const diff = d.getTime(), new Date().getTime();
    const daysLeft = Math.max(0, Math.ceil(diff / 86400000));
    const weeksPregnant = Math.floor((280, daysLeft) / 7);
    const daysPregnant  = (280, daysLeft) % 7;
    const progress = Math.max(0, Math.min(100, ((280, daysLeft) / 280) * 100));
    return { dueDate: d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), daysLeft, weeksPregnant, daysPregnant, progress };
  }, [lmp]);

  const TRIMESTERS = [
    { label: '1st Trimester', range: 'Week 1–13',  detail: 'Development of major organs.' },
    { label: '2nd Trimester', range: 'Week 14–26', detail: 'Baby starts moving & growing rapidly.' },
    { label: '3rd Trimester', range: 'Week 27–40', detail: 'Final development before birth.' },
  ];

  return (
    <ModernCalcLayout hideH1={true}
      crumbs={[{ label: 'Health', href: '/health/' }, { label: 'Pregnancy Calculator' }]}
      title="Pregnancy Due Date Calculator"
      description="Estimate your expected due date using Naegele's Rule. Track your trimester progress, weeks pregnant, and countdown to delivery."
      icon={Baby}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800">First Day of Last Menstrual Period (LMP)</label>
            <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500 transition-all overflow-hidden">
              <Calendar className="w-5 h-5 ml-4 text-slate-400 shrink-0" />
              <input type="date" value={lmp} onChange={e => setLmp(e.target.value)}
                className="flex-1 px-4 py-3 bg-transparent font-bold text-slate-800 text-base outline-none cursor-pointer" />
            </div>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4 shadow-sm">
            <div className="flex justify-between text-xs font-bold uppercase text-slate-500 tracking-wider">
              <span>Pregnancy Progress</span>
              <span className="text-pink-600">{r.weeksPregnant}w {r.daysPregnant}d / 40w</span>
            </div>
            <div className="h-4 bg-slate-100 rounded-full overflow-hidden w-full relative">
              <div className="absolute inset-0 bg-pink-100" />
              <div className="relative h-full bg-pink-500 transition-all duration-700" style={{ width: `${r.progress}%` }} />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400">
              <span>LMP</span><span>13w</span><span>26w</span><span>Due Date</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-500" />
              <h3 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Trimester Guide</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {TRIMESTERS.map((t, i) => (
                <div key={i} className="px-5 py-4 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold text-slate-800">{t.label}</span>
                    <span className="text-xs font-black text-pink-600 bg-pink-50 px-2 py-0.5 rounded">{t.range}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{t.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-8 bg-pink-50 border border-pink-100 rounded-2xl text-center relative overflow-hidden shadow-inner">
            <Baby className="absolute -right-6 -top-6 w-32 h-32 text-pink-500/10 rotate-12" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-pink-500" />
                <div className="text-xs font-bold uppercase tracking-wider text-pink-600">Estimated Due Date</div>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">{r.dueDate}</div>
              
              <div className="inline-block px-6 py-4 bg-white/80 rounded-2xl backdrop-blur-sm border border-white/40 shadow-sm mt-4">
                <div className="text-5xl font-black text-pink-600 tracking-tighter mb-1">{r.daysLeft}</div>
                <div className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">Days Remaining</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100">
              <div className="p-4 flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Current Stage</span>
                <span className="text-base font-black text-pink-600">{r.weeksPregnant}w {r.daysPregnant}d</span>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">LMP Entered</span>
                <span className="text-sm font-bold text-slate-800">{lmp}</span>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Completion</span>
                <span className="text-sm font-black text-slate-800">{r.progress.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      }
      sidebar={{
        title: "Health & Fitness",
        links: [
          { label: 'BMI Calculator', href: '/calculator/bmi-calculator' },
          { label: 'Sleep Calculator', href: '/calculator/sleep' },
        ],
      }}
      howToUse={{
        steps: [
          "Determine the exact date of the first day of your Last Menstrual Period (LMP).",
          "Click on the date input field and select that date from the calendar.",
          "The calculator instantly updates your Estimated Due Date (EDD).",
          "Review your progress bar, current week of pregnancy, and days remaining until birth."
        ]
      }}
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Obstetric Dating & Naegele's Rule Methodology</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Our <strong className="text-[#202124]">pregnancy due date calculator</strong> employs Naegele's Rule, the universally accepted obstetric formula, published by Franz Karl Naegele in 1812 and still used by obstetricians worldwide. The formula adds exactly 280 days (40 weeks) to the first day of your Last Menstrual Period (LMP). This standardized 280-day figure assumes a 28-day menstrual cycle and counts from the LMP rather than the date of conception.
              </p>
              <p>
                It is critical to understand that during the first two weeks of this calculated 40-week pregnancy, you are not yet technically pregnant, conception typically occurs around week 2-3. The medical community uses the LMP as the starting reference point simply because it is an objectively verifiable date, whereas the precise date of ovulation and conception can rarely be confirmed without clinical monitoring.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Trimester Milestones & Developmental Stages</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">1st Trimester (Weeks 1–13):</strong> The period of most rapid embryonic development. The heart begins beating (week 6), the neural tube closes (week 7), and all major organ systems are established. The risk of miscarriage is highest during this phase.</li>
              <li><strong className="text-[#188038]">2nd Trimester (Weeks 14–26):</strong> Often called the 'honeymoon phase', most early symptoms like nausea subside. The fetus begins responding to sound (week 18), and fetal movement (quickening) is typically felt by the mother between weeks 18-20. Anatomy scans are performed.</li>
              <li><strong className="text-[#D93025]">3rd Trimester (Weeks 27–40):</strong> Final growth and organ maturation. The baby gains approximately 50% of its birth weight during this phase. The lungs mature last. Labor is considered full-term between 37–42 weeks.</li>
            </ul>
          </div>
        </div>
      }
      faqs={[
        {
          question: "How accurate is a due date calculated from LMP?",
          answer: "Naegele's Rule is the clinical gold standard, but it assumes a perfect 28-day cycle. In reality, only about 4-5% of babies are born on their exact EDD. A normal, healthy delivery can occur anywhere between 37 weeks (early-term) and 42 weeks (late-term)."
        },
        {
          question: "What is Naegele's Rule and why is it used?",
          answer: "Naegele's Rule calculates the Estimated Due Date (EDD) by adding 280 days (40 weeks) to the first day of the Last Menstrual Period. It was standardized in the 19th century and persists because LMP is an objective, reliably known date, unlike the actual date of conception."
        },
        {
          question: "Why does my OB/GYN's due date differ from this calculator?",
          answer: "Your doctor may adjust the EDD based on an early ultrasound, which measures the fetal crown-rump length (CRL). This measurement provides a highly accurate gestational age estimate during the first trimester. An ultrasound-corrected EDD is considered more accurate than an LMP-based one."
        },
        {
          question: "What does 'Full-Term' actually mean?",
          answer: "A pregnancy is classified as 'full-term' between 39 weeks 0 days and 40 weeks 6 days. 37-38 weeks is 'early-term', and 41 weeks+ is 'late-term'. Babies born before 37 weeks are classified as premature (preterm)."
        },
        {
          question: "Can I use this calculator if I have irregular periods?",
          answer: "Not accurately. Naegele's Rule assumes a standard 28-day menstrual cycle. If your cycle is shorter (e.g., 21 days) or longer (e.g., 35 days), your ovulation date and therefore conception date shifts significantly. In these cases, a first-trimester ultrasound is the most reliable dating method."
        },
        {
          question: "What happens if I go past my due date?",
          answer: "Going past the EDD is common. Most OB/GYNs will monitor pregnancies closely after 40 weeks and typically recommend inducing labor by 41-42 weeks to prevent complications such as placental degradation and meconium aspiration."
        }
      ]}

    />
  );
}

