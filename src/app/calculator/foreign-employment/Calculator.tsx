'use client';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { useSyncState } from '@/hooks/useSyncState';
import { Plane, ShieldAlert, ShieldCheck, HeartPulse, FileText } from 'lucide-react';

const DESTINATIONS = [
  { id: 'qatar', name: 'Qatar', policy: 'Free Visa/Ticket', maxFee: 10000 },
  { id: 'uae', name: 'UAE', policy: 'Free Visa/Ticket', maxFee: 10000 },
  { id: 'saudi', name: 'Saudi Arabia', policy: 'Free Visa/Ticket', maxFee: 10000 },
  { id: 'malaysia', name: 'Malaysia', policy: 'Free Visa/Ticket', maxFee: 10000 },
  { id: 'japan', name: 'Japan (SSW)', policy: 'Regulated Fee', maxFee: 50000 },
  { id: 'korea', name: 'South Korea (EPS)', policy: 'Gov-to-Gov', maxFee: 110000 },
];

export default function ForeignEmploymentFee() {
  const [state, setState] = useSyncState('foreign_emp_v2', { destinationId: 'qatar', medicalFee: 5000, insuranceFee: 2500, orientationFee: 700, manpowerFee: 10000 });
  const { destinationId, medicalFee, insuranceFee, orientationFee, manpowerFee } = state;
  const update = (u: Partial<typeof state>) => setState({ ...state, ...u });

  const dest = DESTINATIONS.find(d => d.id === destinationId) || DESTINATIONS[0];
  const totalCharge = medicalFee + insuranceFee + orientationFee + manpowerFee;
  const isOvercharged = manpowerFee > dest.maxFee;

  const fmt = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  const inputCls = "w-full h-12 pl-12 pr-4 border border-[#DADCE0] rounded-md bg-white text-sm font-medium focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8] outline-none transition-all";
  const labelCls = "text-[11px] font-bold uppercase text-[#70757A] tracking-wider block mb-1.5";

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Nepal Tools', href: '/nepal/' }, { label: 'Foreign Employment Fees' }]}
      title="Foreign Employment Fee Checker"
      description="Verify whether you are being overcharged for your foreign employment process. Check legal maximum fees for Qatar, UAE, Malaysia, Japan, and Korea."
      icon={Plane}
      inputs={
        <div className="space-y-6">
           <div className="space-y-3">
              <label className={labelCls}>Select Destination Country</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                 {DESTINATIONS.map(d => (
                    <button key={d.id} onClick={() => update({ destinationId: d.id, manpowerFee: d.maxFee })}
                      className={`p-3 border rounded-lg text-center transition-all ${destinationId === d.id ? 'bg-[#E8F0FE] border-[#1A73E8]' : 'bg-white border-[#DADCE0] hover:bg-[#F8F9FA]'}`}>
                       <div className={`text-xs font-black uppercase tracking-tight ${destinationId === d.id ? 'text-[#1A73E8]' : 'text-[#202124]'}`}>{d.name}</div>
                       <div className="text-[9px] font-bold uppercase mt-1 text-[#70757A]">{d.policy}</div>
                    </button>
                 ))}
              </div>
           </div>

           <div className="pt-6 border-t border-[#DADCE0] space-y-4">
              <div>
                 <label className={labelCls}>Agency / Manpower Fee Charged</label>
                 <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#70757A]">Rs.</span>
                    <input type="number" value={manpowerFee} min={0} onChange={e => update({ manpowerFee: Number(e.target.value) })} className={`${inputCls} ${isOvercharged ? 'border-[#D93025] focus:border-[#D93025] focus:ring-[#D93025]' : ''}`} />
                 </div>
                 {isOvercharged && <p className="text-[10px] font-bold text-[#D93025] uppercase tracking-wider mt-1 px-1">Legal Limit is Rs. {fmt(dest.maxFee)}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 <div>
                    <label className={labelCls}>Medical (GAMCA)</label>
                    <div className="relative">
                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#70757A]">Rs.</span>
                       <input type="number" value={medicalFee} min={0} onChange={e => update({ medicalFee: Number(e.target.value) })} className={inputCls} />
                    </div>
                 </div>
                 <div>
                    <label className={labelCls}>Insurance (DOFE)</label>
                    <div className="relative">
                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#70757A]">Rs.</span>
                       <input type="number" value={insuranceFee} min={0} onChange={e => update({ insuranceFee: Number(e.target.value) })} className={inputCls} />
                    </div>
                 </div>
                 <div>
                    <label className={labelCls}>Orientation</label>
                    <div className="relative">
                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#70757A]">Rs.</span>
                       <input type="number" value={orientationFee} min={0} onChange={e => update({ orientationFee: Number(e.target.value) })} className={inputCls} />
                    </div>
                 </div>
              </div>
           </div>

           <div className={`p-5 rounded-lg border flex gap-4 ${isOvercharged ? 'bg-[#FCE8E6] border-[#FAD2CF]' : 'bg-[#E6F4EA] border-[#CEEAD6]'}`}>
              <div className="mt-0.5">
                 {isOvercharged ? <ShieldAlert className="w-6 h-6 text-[#D93025]" /> : <ShieldCheck className="w-6 h-6 text-[#188038]" />}
              </div>
              <div>
                 <h4 className={`text-[11px] font-black uppercase tracking-wider mb-1 ${isOvercharged ? 'text-[#D93025]' : 'text-[#188038]'}`}>
                    {isOvercharged ? 'OVERCHARGE DETECTED' : 'FEE COMPLIANCE OK'}
                 </h4>
                 <p className={`text-[10px] leading-relaxed ${isOvercharged ? 'text-[#B3261E]' : 'text-[#0F5223]'}`}>
                    {isOvercharged ? `The recruitment agency is illegally overcharging you by Rs. ${fmt(manpowerFee - dest.maxFee)}. The government limit for ${dest.name} is Rs. ${fmt(dest.maxFee)}.` : `The manpower fee complies with the current DOFE policies for ${dest.name}. Note: Keep bank receipts for all payments.`}
                 </p>
              </div>
           </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className={`p-8 rounded-lg border text-center ${isOvercharged ? 'bg-[#FCE8E6] border-[#FAD2CF]' : 'bg-[#E6F4EA] border-[#CEEAD6]'}`}>
             <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isOvercharged ? 'text-[#D93025]' : 'text-[#188038]'}`}>Total Process Cost</div>
             <div className={`text-5xl font-black tracking-tighter flex items-baseline justify-center gap-2 ${isOvercharged ? 'text-[#D93025]' : 'text-[#188038]'}`}>
               Rs. {fmt(totalCharge)}
             </div>
             <div className="text-[10px] font-bold text-[#70757A] uppercase mt-2">Includes statutory & agency fees</div>
          </div>

          <div className="bg-[#1A1A2E] rounded-lg p-6 space-y-4 border border-[#DADCE0] relative overflow-hidden">
             <Plane className="absolute top-0 right-0 p-4 w-24 h-24 text-white/5 pointer-events-none" />
             <div className="text-[10px] font-bold text-[#8AB4F8] uppercase tracking-wider relative z-10">Migration Ledger Tracker</div>
             
             <div className="space-y-3 relative z-10">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                   <span className="text-xs text-white/70">Legal Max Service Fee</span>
                   <span className="text-sm font-black text-[#81C995] font-mono">Rs. {fmt(dest.maxFee)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                   <span className="text-xs text-white/70">Statutory Expenses (Med/Ins/Ori)</span>
                   <span className="text-sm font-black text-white font-mono">Rs. {fmt(medicalFee + insuranceFee + orientationFee)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                   <span className="text-xs text-white/70">Overcharge Amount</span>
                   <span className={`text-sm font-black font-mono ${isOvercharged ? 'text-[#F28B82]' : 'text-[#81C995]'}`}>
                     Rs. {isOvercharged ? fmt(manpowerFee - dest.maxFee) : '0'}
                   </span>
                </div>
             </div>
          </div>

          <div className="p-5 bg-white border border-[#DADCE0] rounded-lg flex gap-3">
             <FileText className="w-5 h-5 text-[#E37400] shrink-0 mt-0.5" />
             <div className="space-y-1">
                <h5 className="text-[10px] font-bold text-[#70757A] uppercase tracking-wider">DOFE Verification</h5>
                <p className="text-[11px] text-[#202124] leading-relaxed">
                   Verify your demand letter strictly on the official DOFE website. Never hand over your passport to a recruitment agent without a formal receipt. Pay only via bank deposit.
                </p>
             </div>
          </div>
        </div>
      }
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">DOFE Compliance & Financial Security</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>
                Navigating the financial requirements for overseas work requires strict adherence to Department of Foreign Employment (DOFE) guidelines. Our <strong className="text-[#202124]">foreign employment fee nepal</strong> calculator is engineered as a defensive compliance tool, instantly flagging if a recruitment agency is demanding illegal overcharges.
              </p>
              <p>
                For major Gulf Cooperation Council (GCC) countries and Malaysia, the Nepal Government strictly enforces the <strong className="text-[#202124]">free visa free ticket nepal</strong> policy. This mandate explicitly caps the <strong className="text-[#202124]">manpower agency fee limit nepal</strong> at a maximum of NPR 10,000 as a service charge, legally requiring the foreign employer to absorb the costs of the visa and airfare.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Destinations & Legal Tiers</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">GCC & Malaysia (Free Visa/Ticket):</strong> Recruitment agencies can only legally charge NPR 10,000 for their services. Workers are responsible for statutory costs (Medical, Insurance, Orientation, and Welfare Fund), which generally total between NPR 15,000 and 20,000. Any demand exceeding this total structure should trigger a <strong className="text-[#202124]">dofe nepal complaint</strong>.</li>
              <li><strong className="text-[#188038]">Government-to-Government (EPS):</strong> The <strong className="text-[#202124]">eps korea cost nepal</strong> operates outside the private manpower system entirely. Costs are strictly regulated by government entities, encompassing language test fees, specialized health checkups, and centralized processing fees, typically avoiding the extreme overcharging seen in private channels.</li>
              <li><strong className="text-[#D93025]">Regulated Sectors (Japan SSW):</strong> Unlike the GCC, Japan's Specified Skilled Worker (SSW) program involves higher processing and language training limits allowed by DOFE, requiring detailed receipt tracking for transparency.</li>
            </ul>
          </div>
        </div>
      }
      howToUse={{
        steps: [
          "Select the Destination Country you are applying to from the dropdown grid.",
          "Enter the exact Manpower Fee (Service Charge) the recruitment agency is demanding.",
          "Input your statutory medical evaluation fee (GAMCA or equivalent).",
          "Input your DOFE Term Life Insurance premium.",
          "Input your Pre-Departure Orientation Training fee.",
          "Check the compliance banner. If the total manpower fee exceeds the legal limit, the system will calculate the exact illegal overcharge."
        ]
      }}
      formula={{
        title: "Nepal DOFE Statutory Model",
        description: "Standard model used to differentiate between legal limits and total out-of-pocket costs.",
        raw: "1. Legal Limit = Max Manpower Fee allowed for destination\n2. Overcharge = (Demanded Manpower Fee) - (Legal Limit)\n3. Total Process Cost = Demanded Manpower Fee + Medical + Insurance + Orientation\n\n*If Overcharge > 0, the agency is violating DOFE regulations."
      }}
      faqs={[
        {
          question: "What exactly does 'Free Visa, Free Ticket' mean in Nepal?",
          answer: "It is a Nepal Government mandate dictating that foreign employers in the Gulf (Qatar, Saudi Arabia, UAE, etc.) and Malaysia must bear the cost of the worker's visa and airfare. Local manpower agencies can only charge a maximum service fee of Rs. 10,000."
        },
        {
          question: "Can agencies charge me extra for medical tests or insurance?",
          answer: "No, agencies should not mark up these fees. You are legally required to pay for GAMCA medicals, Term Life Insurance, Foreign Employment Welfare Fund, and Orientation directly to the authorized centers or banks. Manpower agencies cannot bundle these into a 'package' and overcharge."
        },
        {
          question: "What should I do if an agency demands Rs. 1.5 Lakhs for Qatar?",
          answer: "This is completely illegal under the Free Visa/Free Ticket policy. You should demand a bank account to deposit the funds (never pay cash). If they refuse or demand cash without receipts, you can file a formal complaint with DOFE."
        },
        {
          question: "Why is the EPS Korea limit so much higher?",
          answer: "The EPS (Employment Permit System) for South Korea is a Government-to-Government process. The higher limit (approx Rs. 1.1 Lakhs) covers standardized flight costs, intensive language test (TOPIK) fees, and specialized training, ensuring zero exploitation by private middlemen."
        },
        {
          question: "Does the manpower fee cover my air ticket?",
          answer: "Under the Free Visa/Free Ticket policy, the employer pays for the ticket. The Rs. 10,000 manpower fee is strictly a service charge for the agency processing your documents."
        },
        {
          question: "Is the welfare fund fee included in the calculator?",
          answer: "We recommend adding your Foreign Employment Welfare Fund deposit (usually Rs. 1,500 or Rs. 2,500 depending on tenure) into the 'Insurance' or 'Orientation' box to see your total out-of-pocket expense accurately."
        }
      ]}
      sidebar={{ title: "Public Service", links: [{ label: "Passport Status Checker", href: "/calculator/passport-status" }, { label: "Remittance Calculator", href: "/calculator/remittance-calculator" }], banner: { title: "Migrant Safety", description: "Report illegal fee demands to the Department of Foreign Employment.", image: "/images/nepal-banner.jpg" } }}
      relatedTools={[{ label: "Remittance Calculator", href: "/calculator/remittance-calculator" }]}
    />
  );
}
