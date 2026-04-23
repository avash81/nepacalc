'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Calendar, Baby, Activity } from 'lucide-react';

export default function PregnancyDueDateCalculator() {
  const [lmp, setLmp] = useState(new Date().toISOString().split('T')[0]);

  const r = useMemo(() => {
    const d = new Date(new Date(lmp).getTime() + 280 * 86400000);
    const diff = d.getTime() - new Date().getTime();
    const daysLeft = Math.max(0, Math.ceil(diff / 86400000));
    const weeksPregnant = Math.floor((280 - daysLeft) / 7);
    const daysPregnant  = (280 - daysLeft) % 7;
    const progress = Math.max(0, Math.min(100, ((280 - daysLeft) / 280) * 100));
    return { dueDate: d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), daysLeft, weeksPregnant, daysPregnant, progress };
  }, [lmp]);

  const TRIMESTERS = [
    { label: '1st Trimester', range: 'Week 1–13',  detail: 'Development of major organs.' },
    { label: '2nd Trimester', range: 'Week 14–26', detail: 'Baby starts moving & growing rapidly.' },
    { label: '3rd Trimester', range: 'Week 27–40', detail: 'Final development before birth.' },
  ];

  return (
    <ModernCalcLayout
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
      faqs={[
        {
          question: "How accurate is this due date calculation?",
          answer: "The calculator uses Naegele's rule, which is the standard method used by OB/GYNs. However, only about 4-5% of babies are actually born on their exact due date. It is an estimate; normal term deliveries happen anywhere between 37 and 42 weeks."
        },
        {
          question: "What is Naegele's rule?",
          answer: "Naegele's rule calculates the expected date of delivery (EDD) by adding one year, subtracting three months, and adding seven days to the first day of a woman's last menstrual period (LMP). This effectively adds 280 days (40 weeks) to the LMP."
        }
      ]}
      seoContent={
        <div>
          <h2>Understanding Your Estimated Due Date (EDD)</h2>
          <p>Finding out you are pregnant is an exciting time, and one of the first questions expecting parents have is: "When is the baby due?" Our Pregnancy Due Date Calculator uses standard medical formulas to help you estimate when you will meet your little one.</p>
          
          <h3>How Due Dates are Calculated</h3>
          <p>Most pregnancies last around 40 weeks (or 280 days). The standard medical approach to calculating a due date is called <strong>Naegele's Rule</strong>.</p>
          <p>Interestingly, this calculation does not start from the date of conception. Because the exact date of ovulation and conception is difficult to pinpoint for most women, the medical community standardized counting from the first day of your Last Menstrual Period (LMP). This means that during the first two weeks of your calculated "40-week pregnancy," you aren't actually pregnant yet!</p>
          
          <h3>The Trimesters of Pregnancy</h3>
          <p>A 40-week pregnancy is divided into three trimesters, each marking significant developmental milestones for the baby and physical changes for the mother:</p>
          <ul>
            <li><strong>First Trimester (Weeks 1 to 13):</strong> This is a period of rapid development. The baby's brain, spinal cord, and organs begin to form. Mothers often experience early pregnancy symptoms like morning sickness and fatigue.</li>
            <li><strong>Second Trimester (Weeks 14 to 26):</strong> Often called the "honeymoon phase" of pregnancy, many early symptoms subside. The baby's sex can usually be determined, and the mother may start to feel the baby move (quickening).</li>
            <li><strong>Third Trimester (Weeks 27 to 40):</strong> The baby gains significant weight and matures in preparation for birth. Mothers may experience physical discomfort as the baby grows larger.</li>
          </ul>
          
          <h3>Are Due Dates Exact?</h3>
          <p>It is crucial to understand that an Estimated Due Date is just that—an estimate. Only about 5% of babies are born on their exact due date. A pregnancy is considered "full-term" if the baby is born anywhere between 37 weeks and 42 weeks. Always rely on ultrasound measurements and your healthcare provider's guidance for the most accurate assessment of your pregnancy timeline.</p>
        </div>
      }
    />
  );
}
