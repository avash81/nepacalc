import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { ShieldCheck, Scale, FileText, CheckCircle, Database, AlertTriangle } from 'lucide-react';
import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: "Editorial Policy & Data Integrity | NepaCalc",
  description: "Learn how NepaCalc ensures mathematical accuracy and regulatory compliance for all calculators including Income Tax, Loan EMI, and Land Area.",
  slug: 'about/editorial-policy',
});

export default function EditorialPolicyPage() {
  return (
    <ModernCalcLayout
      title="Editorial Policy & Mathematical Integrity"
      description="Our commitment to precision, transparency, and regulatory alignment in all NepaCalc tools."
      slug="editorial-policy"
      crumbs={[{ label: 'Home', href: '/' }, { label: 'About', href: '/about/' }, { label: 'Editorial Policy', href: '/about/editorial-policy/' }]}
      inputs={
        <div className="space-y-6">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
                <Database className="w-5 h-5 text-[#1A73E8]" />
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#202124]">Primary Data Sources</h2>
             </div>
             <p className="text-sm text-[#5F6368] leading-relaxed mb-6">
                Every calculation on NepaCalc is benchmarked against official data sources to ensure legal and institutional validity. Our primary references include:
             </p>
             <div className="space-y-4">
                {[
                  { name: "Inland Revenue Department (IRD)", tool: "Income Tax, VAT, TDS", icon: Scale },
                  { name: "Nepal Rastra Bank (NRB)", tool: "Loan EMI, Fixed Deposit, Forex", icon: CheckCircle },
                  { name: "Department of Land Management (DoLMA)", tool: "Ropani/Bigha Conversions", icon: FileText },
                  { name: "National Examination Board (NEB)", tool: "SEE GPA Grading Scale", icon: CheckCircle }
                ].map((source, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[#F8F9FA] border border-[#DADCE0] rounded-md">
                     <div className="flex items-center gap-3">
                        <source.icon className="w-4 h-4 text-[#1A73E8]" />
                        <span className="text-xs font-bold text-[#202124]">{source.name}</span>
                     </div>
                     <span className="text-[10px] font-black text-[#5F6368] uppercase">{source.tool}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      }
      results={
        <div className="h-full flex flex-col justify-center space-y-6">
           <div className="bg-[#E8F0FE] rounded-lg p-10 text-center space-y-4">
              <ShieldCheck className="w-12 h-12 text-[#1A73E8] mx-auto" />
              <div className="text-[10px] font-black text-[#1A73E8] uppercase tracking-[0.3em]">Compliance Protocol</div>
              <h3 className="text-2xl font-black text-[#202124]">100% Verified Logic</h3>
              <p className="text-xs text-[#5F6368] leading-relaxed">
                 All algorithms are audited quarterly to reflect the latest Finance Act and NRB circulars.
              </p>
           </div>
           
           <div className="p-6 bg-[#FCE8E6] border border-[#D93025] rounded-lg flex gap-4">
              <AlertTriangle className="w-6 h-6 text-[#D93025] shrink-0" />
              <div>
                 <h4 className="text-[11px] font-black text-[#D93025] uppercase mb-1">Professional Disclaimer</h4>
                 <p className="text-[10px] text-[#5F6368] leading-relaxed">
                    While our tools are mathematically precise, results are for informational purposes only. Always verify critical financial decisions with a certified Chartered Accountant or your Bank Manager.
                 </p>
              </div>
           </div>
        </div>
      }
      details={
        <div className="space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
                 <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-4">Precision Guarantee</h3>
                 <p className="text-sm text-[#5F6368] leading-relaxed">
                    NepaCalc utilizes floating-point arithmetic optimized for Nepalese currency (NPR). We enforce the <strong>Reducing Balance Method</strong> for all loan calculations by default, as mandated by Nepal Rastra Bank for banking and financial institutions (BFIs).
                 </p>
              </div>
              <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
                 <h3 className="text-sm font-black text-[#202124] uppercase tracking-widest mb-4">Transparency</h3>
                 <p className="text-sm text-[#5F6368] leading-relaxed">
                    We do not store your financial data. All calculations are performed on the client-side (your browser), ensuring that your salary, loan amounts, and personal details remain private and secure.
                 </p>
              </div>
           </div>

           <div className="bg-white border border-[#DADCE0] rounded-lg p-10 shadow-sm text-center">
              <h2 className="text-xl font-black text-[#202124] mb-4">Questions about our data?</h2>
              <p className="text-sm text-[#5F6368] mb-6">If you spot a discrepancy or have questions about a specific formula, please contact our auditing team.</p>
              <a href="/contact/" className="inline-block px-8 py-3 bg-[#1A73E8] text-white text-[11px] font-black uppercase tracking-widest rounded-md hover:bg-[#1557B0] transition-colors">
                 Report a Bug
              </a>
           </div>
        </div>
      }
    />
  );
}
