'use client';

import { useState } from 'react';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { ResultCard } from '@/components/calculator/ResultCard';
import { useSyncState } from '@/hooks/useSyncState';
import { Plane, ShieldAlert, CheckCircle2, ShieldCheck, HeartPulse, Info } from 'lucide-react';

const DESTINATIONS = [
  { id: 'qatar', name: 'Qatar', policy: 'Free Visa/Ticket', maxFee: 10000, color: 'blue' },
  { id: 'uae', name: 'UAE', policy: 'Free Visa/Ticket', maxFee: 10000, color: 'blue' },
  { id: 'saudi', name: 'Saudi Arabia', policy: 'Free Visa/Ticket', maxFee: 10000, color: 'blue' },
  { id: 'malaysia', name: 'Malaysia', policy: 'Free Visa/Ticket', maxFee: 10000, color: 'blue' },
  { id: 'japan', name: 'Japan (SSW)', policy: 'Regulated Fee', maxFee: 50000, color: 'amber' },
  { id: 'korea', name: 'South Korea (EPS)', policy: 'Government-to-Govt', maxFee: 110000, color: 'emerald' },
];

export default function ForeignEmploymentFee() {
  const [state, setState] = useSyncState('foreign_emp_v1', {
    destinationId: 'qatar',
    medicalFee: 5000,
    insuranceFee: 2500,
    orientationFee: 700,
    manpowerFee: 10000,
  });

  const { destinationId, medicalFee, insuranceFee, orientationFee, manpowerFee } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const dest = DESTINATIONS.find(d => d.id === destinationId) || DESTINATIONS[0];
  const totalCharge = medicalFee + insuranceFee + orientationFee + manpowerFee;
  const isOvercharged = manpowerFee > dest.maxFee;

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  return (
    <CalculatorLayout
      title="Foreign Employment Fee Checker"
      description="Verify whether you are being overcharged for your foreign employment process. Check legal maximum fees for Qatar, UAE, Malaysia, and Korea."
      category={{ label: 'Public Service', href: '/calculator/category/nepal' }}
      leftPanel={
        <div className="space-y-8">
           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-[var(--text-muted)] tracking-widest">Select Destination Country</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                 {DESTINATIONS.map(d => (
                    <button 
                      key={d.id} 
                      onClick={() => update({ destinationId: d.id, manpowerFee: d.maxFee })}
                      className={`p-4 rounded-2xl border text-center transition-all ${destinationId === d.id ? 'bg-blue-600 text-white shadow-lg border-blue-600' : 'bg-white border-[var(--border)] text-slate-600 hover:border-blue-400'}`}
                    >
                       <div className="text-xs font-black uppercase tracking-tight">{d.name}</div>
                       <div className={`text-[8px] font-bold uppercase mt-1 ${destinationId === d.id ? 'text-blue-200' : 'text-slate-400'}`}>{d.policy}</div>
                    </button>
                 ))}
              </div>
           </div>

           <div className="pt-6 border-t border-[var(--border)] space-y-6">
              <ValidatedInput 
                label="Agency / Manpower Fee Charged" 
                value={manpowerFee} 
                onChange={v => update({ manpowerFee: v })} 
                prefix="Rs." 
                error={isOvercharged ? `Legal Limit is Rs. ${fmt(dest.maxFee)}` : undefined}
                hint={isOvercharged ? "Warning: This agency is charging more than the government limit." : "Correct according to legal standards."}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <ValidatedInput label="Medical (GAMCA)" value={medicalFee} onChange={v => update({ medicalFee: v })} prefix="Rs." />
                 <ValidatedInput label="Insurance (DOFE)" value={insuranceFee} onChange={v => update({ insuranceFee: v })} prefix="Rs." />
                 <ValidatedInput label="Orientation" value={orientationFee} onChange={v => update({ orientationFee: v })} prefix="Rs." />
              </div>
           </div>

           <div className={`p-6 rounded-3xl border flex gap-4 animate-in slide-in-from-top-4 ${isOvercharged ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isOvercharged ? 'bg-rose-100' : 'bg-emerald-100'}`}>
                 {isOvercharged ? <ShieldAlert className="w-6 h-6 text-rose-600" /> : <ShieldCheck className="w-6 h-6 text-emerald-600" />}
              </div>
              <div>
                 <h4 className={`text-sm font-black uppercase tracking-tight mb-1 ${isOvercharged ? 'text-rose-900' : 'text-emerald-900'}`}>
                    {isOvercharged ? 'WARNING: OVERCHARGE DETECTED' : 'LEGAL FEE COMPLIANCE'}
                 </h4>
                 <p className={`text-[11px] font-medium leading-relaxed ${isOvercharged ? 'text-rose-700' : 'text-emerald-700'}`}>
                    {isOvercharged 
                      ? `According to government regulations for ${dest.name}, the recruitment agency should not charge more than NPR ${fmt(dest.maxFee)}. You are being charged NPR ${fmt(manpowerFee - dest.maxFee)} extra.`
                      : `The fees entered comply with the current "Free Visa, Free Ticket" or regulated fee policies set by the Department of Foreign Employment (DOFE).`}
                 </p>
              </div>
           </div>
        </div>
      }
      rightPanel={
        <div className="space-y-6">
          <ResultCard 
            label="Total Process Cost" 
            value={fmt(totalCharge)} 
            unit=" Rs." 
            color={isOvercharged ? 'red' : 'green'} 
            title="Migration Expenses"
            copyValue={`Total cost for ${dest.name} is Rs. ${totalCharge}`}
          />

          <div className="bg-slate-900 text-white rounded-[2rem] p-8 space-y-6 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Plane className="w-24 h-24" />
             </div>
             <div className="relative z-10 space-y-4">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Migration Safety Ledger</div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center pb-3 border-b border-white/10 text-[11px] font-bold">
                      <span className="text-slate-400 italic">Legal Max Service Fee</span>
                      <span className="text-emerald-400 italic font-mono">Rs. {fmt(dest.maxFee)}</span>
                   </div>
                   <div className="flex justify-between items-center pb-3 border-b border-white/10 text-[11px] font-bold">
                      <span className="text-slate-400 italic">Statutory Expenses</span>
                      <span className="text-slate-200 italic font-mono">Rs. {fmt(medicalFee + insuranceFee + orientationFee)}</span>
                   </div>
                   <div className="pt-2">
                       <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic">
                          "Verify your demand letter on the official DOFE website before paying anything."
                       </p>
                   </div>
                </div>
             </div>
          </div>

          <div className="p-5 bg-white border border-[var(--border)] rounded-2xl flex gap-3">
             <HeartPulse className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
             <div className="space-y-1">
                <h5 className="text-[10px] font-black text-rose-900 uppercase">Worker Rights</h5>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">
                   "Never hand over your passport to a recruitment agent without a formal receipt. Always pay through a bank transfer to have a legal proof of transaction."
                </p>
             </div>
          </div>
        </div>
      }
      faqSection={
         <div className="mt-16 pt-12 border-t border-[var(--border)] prose prose-slate max-w-none">
            <h2 className="text-2xl font-black text-slate-900 mb-8 italic tracking-tighter">Migration Rights & Safety Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                     <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2">Free Visa, Free Ticket Policy</h4>
                    <p className="text-[12px] text-slate-600 leading-relaxed font-medium">For major Gulf destinations (UAE, Qatar, Saudi, Kuwait, Bahrain, Oman) and Malaysia, the Nepal government has implemented a zero-cost policy. Employers must provide the visa and air ticket. Agencies are only allowed a maximum service fee of **NPR 10,000**.</p>
                  </div>
               </div>
               <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                     <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2">Legal Redressal</h4>
                    <p className="text-[12px] text-slate-600 leading-relaxed font-medium">If a manpower company charges you more than the regulated fee, you can file a complaint with the **Department of Foreign Employment (DOFE)** in Tahachal, Kathmandu. Ensure you have evidence of payment to claim a refund.</p>
                  </div>
               </div>
            </div>
         </div>
      }
    />
  );
}
