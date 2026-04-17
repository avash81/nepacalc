'use client';
import { useMemo } from 'react';
import { ValidatedInput } from '@/components/calculator/ValidatedInput';
import { QuickPresets } from '@/components/calculator/QuickPresets';
import { TAX_YEARS, DEDUCTIONS } from '@/config/tax-config';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { useSyncState } from '@/hooks/useSyncState';
import { CalcFAQ } from '@/components/calculator/CalcFAQ';
import { CalculatorLayout } from '@/components/layout/CalculatorLayout';
import { Info, Receipt, Wallet, ShieldCheck } from 'lucide-react';
import { calculateNepalIncomeTax } from '@/utils/math/country-rules/nepal';

const DEFAULT_STATE = {
  fiscalYear: 'current' as keyof typeof TAX_YEARS,
  income: 1500000,
  married: false,
  isSSFContributor: false,
  lifeInsurance: 40000,
  homeLoanInterest: 0,
  educationAllowance: 0,
};

export default function NepalIncomeTaxCalculator() {
  const [state, setState] = useSyncState('nepal_tax_v2', DEFAULT_STATE);
  const { fiscalYear, income, married, isSSFContributor, lifeInsurance, homeLoanInterest, educationAllowance } = state;

  const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
    setState({ ...state, ...updates });
  };

  const presets = [
    { name: 'Standard Employee', description: 'Avg income, simple life insurance', icon: 'briefcase', values: { income: 900000, married: false, isSSFContributor: false, lifeInsurance: 25000, homeLoanInterest: 0 } },
    { name: 'SSF Contributor', description: 'Tax-free first slab via SSF', icon: 'shield', values: { income: 1500000, married: true, isSSFContributor: true, lifeInsurance: 40000, homeLoanInterest: 0 } },
    { name: 'High Earner', description: 'Maximum deductions applied', icon: 'target', values: { income: 5000000, married: true, isSSFContributor: true, lifeInsurance: 40000, homeLoanInterest: 300000 } },
  ];

  const result = useMemo(() => {
    // Other deductions are subtracted from gross income BEFORE reaching the tax calculation slabs
    // SSF deduction is handled INSIDE calculateNepalIncomeTax
    const otherDeductions = Math.min(lifeInsurance, 40000) + homeLoanInterest + educationAllowance;
    const coreIncome = income - otherDeductions;
    
    const calculation = calculateNepalIncomeTax(coreIncome, married, isSSFContributor);

    return {
      totalTax: Math.round(calculation.totalTax),
      taxableIncome: calculation.taxableIncome,
      breakdown: calculation.breakdown.map(b => ({
        slab: b.slabLabel,
        income: b.taxableInSlab,
        tax: b.taxAmount,
        rate: b.rate
      })),
      totalDeductions: otherDeductions + (calculation.grossIncome - calculation.taxableIncome)
    };
  }, [income, married, isSSFContributor, lifeInsurance, homeLoanInterest, educationAllowance]);

  const formatNPR = (n: number) =>
    new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR',
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <CalculatorErrorBoundary calculatorName="Income Tax">
      <CalculatorLayout
        title="Nepal Income Tax Calculator"
        description="Nepal Income Tax Calculator: Calculate personal tax for the latest fiscal mandates based on current IRD Nepal tax slabs, SSF contributions, and legal deductions."
        badge="Nepal Exclusive"
        badgeColor="red"
        category={{ label: 'Nepal Sanchar', href: '/calculator/category/nepal' }}
        leftPanel={
          <div className="space-y-8">
            <QuickPresets presets={presets as any[]} onSelect={(p) => updateState(p.values)} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Fiscal Year</label>
                <select
                  value={fiscalYear}
                  onChange={(e) => updateState({ fiscalYear: e.target.value as keyof typeof TAX_YEARS })}
                  className="w-full h-12 px-4 border border-[var(--border)] rounded-xl bg-[var(--bg-subtle)] focus:border-[var(--primary)] outline-none text-sm font-bold"
                >
                  {Object.values(TAX_YEARS).map((year) => <option key={year.year} value={year.year}>{year.label}</option>)}
                </select>
              </div>
              <ValidatedInput label="Annual Income (NPR)" value={income} onChange={(v) => updateState({ income: v })} min={0} max={100000000} step={100000} />
            </div>

            <div className="pt-6 border-t border-[var(--border)] space-y-6">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Deductions & Status</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ValidatedInput 
                    label="Life Insurance Premium" 
                    value={lifeInsurance} 
                    onChange={(v) => updateState({ lifeInsurance: v })} 
                    min={0} 
                    max={40000}
                    hint="Max deductible: NPR 40,000"
                  />
                  <ValidatedInput label="Home Loan Interest" value={homeLoanInterest} onChange={(v) => updateState({ homeLoanInterest: v })} min={0} max={1000000} />
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">SSF Contributor</label>
                    <button
                      onClick={() => updateState({ isSSFContributor: !isSSFContributor })}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                        isSSFContributor 
                          ? 'bg-[var(--primary-light)] border-[var(--primary)]/20 text-[var(--primary)] shadow-sm' 
                          : 'bg-[var(--bg-subtle)] border-[var(--border)] text-[var(--text-muted)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <ShieldCheck className={`w-5 h-5 ${isSSFContributor ? 'text-[var(--primary)]' : 'text-slate-400'}`} />
                        <span className="text-xs font-bold uppercase tracking-wider">Formal Sector (SSF)</span>
                      </div>
                      <div className={`w-10 h-5 rounded-full relative transition-colors ${isSSFContributor ? 'bg-[var(--primary)]' : 'bg-slate-300'}`}>
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isSSFContributor ? 'left-6' : 'left-1'}`} />
                      </div>
                    </button>
                    {isSSFContributor && (
                      <p className="text-[10px] text-[var(--primary)] font-bold uppercase mt-1">✓ 1% Social Security Tax Waived on first slab</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Marital Status</label>
                    <div className="flex p-1 bg-[var(--bg-subtle)] rounded-xl border border-[var(--border)]">
                      {[{ v: false, l: 'Single' }, { v: true, l: 'Married' }].map((m) => (
                        <button
                          key={m.l}
                          onClick={() => updateState({ married: m.v })}
                          className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                            married === m.v ? 'bg-[var(--bg-surface)] text-[var(--primary)] shadow-sm' : 'text-[var(--text-muted)]'
                          }`}
                        >
                          {m.l}
                        </button>
                      ))}
                    </div>
                  </div>
               </div>
            </div>
          </div>
        }
        rightPanel={
          <div className="space-y-8">
            <div className="p-6 bg-[var(--primary-light)]/50 rounded-2xl border border-[var(--primary)]/10 flex gap-4 items-start mb-4">
              <Info className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
              <p className="text-[11px] text-[var(--primary)] leading-relaxed font-medium">
                <strong>SSF Benefit:</strong> Contributing to the Social Security Fund waives the 1% SST on your first tax bracket, significantly increasing take-home pay for lower income ranges.
              </p>
            </div>
            {result.totalTax !== undefined ? (
              <>
                <div className="text-center p-6 bg-white rounded-2xl border border-[var(--primary)]/10 shadow-sm relative overflow-hidden">
                  {isSSFContributor && <div className="absolute top-0 right-0 p-2 bg-[var(--primary)] text-white text-[8px] font-black uppercase tracking-widest rounded-bl-lg">SSF Active</div>}
                  <div className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">Estimated Tax Liability</div>
                  <div className="text-4xl font-black text-[var(--primary)] tracking-tighter mb-1">{formatNPR(result.totalTax)}</div>
                  <div className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Effective Rate: {((result.totalTax / (income || 1)) * 100).toFixed(2)}%</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Receipt className="w-4 h-4 text-[var(--primary)]" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)]">Slab Breakdown</h4>
                  </div>
                  <div className="space-y-3">
                    {result.breakdown?.map((item, i) => (
                      <div key={i} className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[11px] font-bold">
                          <span className="text-[var(--text-secondary)]">{item.slab} ({item.rate}%)</span>
                          <span className="text-[var(--text-main)] uppercase">{formatNPR(item.tax)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-[var(--primary)]/5 rounded-full overflow-hidden">
                           <div 
                            className="h-full bg-[var(--primary)] transition-all duration-1000" 
                            style={{ width: `${(item.tax / (result.totalTax || 1)) * 100}%` }}
                           />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--primary)]/10 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                     <Wallet className="w-4 h-4 text-[var(--success)]" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">In Hand Income</span>
                   </div>
                   <span className="text-xl font-black text-[var(--success)]">{formatNPR(income - result.totalTax)}</span>
                </div>
              </>
            ) : (
              <div className="p-4 bg-rose-50 text-rose-600 rounded-xl text-xs font-medium border border-rose-100">
                {(result as any).error}
              </div>
            )}
          </div>
        }
        faqSection={
           <div className="prose prose-slate max-w-none w-full print-hide mt-16 pt-12 border-t border-slate-200">
             <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-6">Mastering Nepal Income Tax Guide (Latest Slabs)</h2>
             
             <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">Income Tax in Nepal is regulated by the Inland Revenue Department (IRD). As per the Income Tax Act 2058 (2002), whether you are a salaried employee, a freelancer, or a business owner, understanding exactly how your taxable limits are calculated is crucial for maintaining legal compliance while legally maximizing your take-home pay.</p>
             
             <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8">
               <h3 className="text-lg font-black text-slate-900 mb-4">Tax Exemptions & Deduction Limits</h3>
               <p className="text-slate-600 text-xs mb-4">Before applying the progressive tax slabs, the government allows you to deduct specific investments directly from your Gross Salary, significantly lowering your final tax burden:</p>
               <ul className="list-disc pl-5 space-y-2 text-xs text-slate-700 font-medium">
                 <li><strong>Provident Fund (EPF/SSF):</strong> Up to 1/3rd of your Gross Income, maxed at NPR 5,00,000 per year.</li>
                 <li><strong>Citizen Investment Trust (CIT):</strong> Similar bounds apply, often pooled with PF up to the 3 Lakhs mutual threshold.</li>
                 <li><strong>Life Insurance Premium:</strong> Actual premium paid or NPR 40,000 (whichever is lower).</li>
                 <li><strong>Health Insurance Premium:</strong> Actual premium paid or NPR 20,000 (whichever is lower).</li>
               </ul>
             </div>

             <h3 className="text-xl font-black text-slate-900 mt-8 mb-4">The Progressive Tax Slab System</h3>
             <p className="text-slate-600 text-sm leading-relaxed mb-4">Nepal utilizes a marginal tax rate system. This means your entire salary is NOT taxed at the highest bracket you fall into. Instead, your income is sliced into chunks, and each chunk is taxed sequentially.</p>
             
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
               <div className="bg-white p-5 border border-slate-200 shadow-sm">
                 <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-2">Individual Taxpayer</h4>
                 <ul className="space-y-1 text-xs text-slate-600 font-mono">
                   <li>First 5,00,000 : 1% (Social Security Tax)</li>
                   <li>Next 2,00,000 : 10%</li>
                   <li>Next 3,00,000 : 20%</li>
                   <li>Next 10,00,000 : 30%</li>
                   <li>Above 20,00,000 : 36% (Includes 20% Additional Surcharge)</li>
                 </ul>
               </div>
               <div className="bg-white p-5 border border-slate-200 shadow-sm">
                 <h4 className="font-bold text-slate-900 uppercase text-xs tracking-wider mb-2">Couple / Married Taxpayer</h4>
                 <ul className="space-y-1 text-xs text-slate-600 font-mono">
                   <li>First 6,00,000 : 1% (Social Security Tax)</li>
                   <li>Next 2,00,000 : 10%</li>
                   <li>Next 3,00,000 : 20%</li>
                   <li>Next 9,00,000 : 30%</li>
                   <li>Above 20,00,000 : 36% (Includes 20% Additional Surcharge)</li>
                 </ul>
               </div>
             </div>

              <div className="bg-blue-50 border-l-4 border-[var(--primary)] p-5 mt-6 mb-10">
                <h4 className="font-bold text-[var(--primary)] text-sm uppercase tracking-wide mb-1">Tax Loophole: The 1% Exemption</h4>
                <p className="text-xs text-[var(--primary)] leading-relaxed opacity-80">If you are formally contributing strictly to the Social Security Fund (SSF), you are completely exempt from paying the base 1% Social Security Tax on your primary salary bracket. This is a massive systemic advantage designed to drive SSF adoption across Nepal.</p>
              </div>
           </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
