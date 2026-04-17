import { calcMeta } from '@/lib/calcMeta';
import NepalSalaryCalculator from './Calculator';

export const metadata = calcMeta({
  title: 'Nepal Salary Calculator — Net Take-Home Pay',
  description: 'Calculate your net take-home salary in Nepal after SSF, CIT, and Income Tax deductions. Updated for the latest fiscal mandates. Free online tool.',
  slug: 'nepal-salary',
  keywords: ['nepal salary calculator', 'net salary nepal', 'ssf calculator nepal', 'cit calculator nepal', 'take home salary nepal'],
});

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <NepalSalaryCalculator />
      
      {/* 🛡️ SEO Authority Layer (Static Server-Rendered Content) */}
      <div className="hp-container pb-24 border-t border-slate-100 pt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-blue-50 px-6 py-3 rounded-2xl inline-block">
            Professional Guide: Salary & Payroll in Nepal
          </h2>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 text-base leading-relaxed mb-8 font-medium">
              Navigating the payroll landscape in Nepal requires more than just a simple calculation—it requires alignment with the latest labor mandates of the fiscal year 2082/83. Whether you are an employer managing a team or an employee negotiating your package, the <strong>NEPACALC Salary Laboratory</strong> provides the precision needed to understand every deduction from SSF to local income tax.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div className="p-8 bg-[#002147] rounded-[3rem] border border-blue-100 shadow-2xl text-white relative group transition-all">
                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                <h3 className="text-lg font-black text-[#FFC107] mb-6 uppercase tracking-widest border-b border-white/10 pb-2">The SSF Mandate</h3>
                <p className="text-xs text-white/70 leading-relaxed font-semibold">
                  With the introduction of the <strong>Social Security Fund (SSF)</strong>, the traditional EPF/CIT landscape has shifted. Formal sector employees now see 11% of their basic salary deducted for SSF, with employers contributing an additional 20%. This tool precisely tracks these percentages to ensure your pay slip is compliant with modern labor laws.
                </p>
              </div>
              <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-200 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-widest border-b border-slate-200 pb-2">Voluntary Deductions</h3>
                <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <li className="flex justify-between items-center"><span className="p-2 bg-white rounded-lg border border-slate-100">Citizen Investment (CIT)</span> <span className="text-blue-600">UP TO 33%</span></li>
                  <li className="flex justify-between items-center"><span className="p-2 bg-white rounded-lg border border-slate-100">Provident Fund (EPF)</span> <span className="text-blue-600">10% MANDATORY</span></li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-6">Gross vs. Net (Take-Home) Pay</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              In Nepal, your <strong>Gross Salary</strong> is the total amount before any deductions. However, your <strong>Net Salary</strong> (Take-Home) is what hits your bank account after Income Tax, SSF, and CIT deductions. NEPACALC uses the latest 2082/83 IRD tax slabs to ensure that your net income is calculated down to the rupee, accounting for married/unmarried status and insurance benefits.
            </p>

            <div className="bg-[#FFC107] text-black p-8 rounded-[2rem] border border-black shadow-xl">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4">Institutional Compliance Notice</h4>
               <p className="text-xs leading-relaxed font-bold">This payroll engine is verified against the latest budget speech directives. We ensure that our SSF and Tax logic is the most up-to-date mathematical model available in the Nepalese digital space.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
