import React from 'react';
import { Info, CheckCircle2, AlertCircle, HelpCircle, FileText, Briefcase, Landmark, XCircle } from 'lucide-react';

export default function TdsSeoContent() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12 space-y-16">
      
      {/* SECTION 2: What is TDS? (Corresponding to Part 4 of the Prompt) */}
      <section id="what-is-tds" className="scroll-mt-24 space-y-8">
        <h2 className="text-2xl md:text-3xl font-black text-[#202124] tracking-tight">
          Understanding Tax Deducted at Source (TDS) in Nepal
        </h2>

        {/* Knowledge Panel */}
        <div className="overflow-hidden border border-[#DADCE0] rounded-xl shadow-sm bg-white">
          <div className="bg-[#E8F0FE] border-b border-[#D2E3FC] px-6 py-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-[#1A73E8]" />
            <h3 className="text-[13px] font-black text-[#1A73E8] uppercase tracking-wider">Knowledge Panel</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                  <th className="px-6 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider w-1/3">Quick Summary</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#3C4043] divide-y divide-[#F1F3F4]">
                <tr className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="px-6 py-4 font-bold text-[#202124]">What is TDS?</td>
                  <td className="px-6 py-4 leading-relaxed">Tax Deducted at Source (TDS) is a withholding tax deducted by the payer before making certain payments.</td>
                </tr>
                <tr className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="px-6 py-4 font-bold text-[#202124]">Who deducts TDS?</td>
                  <td className="px-6 py-4 leading-relaxed">Businesses, organisations, employers, and other withholding agents responsible under Nepal's Income Tax Act.</td>
                </tr>
                <tr className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="px-6 py-4 font-bold text-[#202124]">Who receives the tax?</td>
                  <td className="px-6 py-4 leading-relaxed">The deducted amount is deposited with Nepal's Inland Revenue Department (IRD).</td>
                </tr>
                <tr className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="px-6 py-4 font-bold text-[#202124]">Why is TDS deducted?</td>
                  <td className="px-6 py-4 leading-relaxed">To collect tax at the time income is paid, improve compliance, and reduce tax evasion.</td>
                </tr>
                <tr className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="px-6 py-4 font-bold text-[#202124]">Does every payment have the same rate?</td>
                  <td className="px-6 py-4 leading-relaxed">No. The applicable rate depends on the payment category, recipient, and the relevant legal provisions.</td>
                </tr>
                <tr className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="px-6 py-4 font-bold text-[#202124]">Is TDS always the final tax?</td>
                  <td className="px-6 py-4 leading-relaxed">No. Depending on the payment type and applicable law, it may be treated as Advance Tax or Final Withholding Tax.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="prose prose-blue max-w-none text-[#3C4043] leading-relaxed space-y-6">
          
          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-3 tracking-tight">What is Tax Deducted at Source (TDS)?</h3>
            <p>
              Tax Deducted at Source (TDS) is a system of withholding income tax at the time a payment is made. Instead of paying the full amount to the recipient and collecting tax later, the payer deducts the applicable tax, deposits it with the Inland Revenue Department (IRD), and pays the remaining amount to the recipient.
            </p>
            <p className="mt-3">
              This mechanism allows the Government of Nepal to collect tax throughout the financial year rather than waiting until annual tax returns are filed. It also helps improve tax compliance, creates a record of taxable transactions, and reduces the risk of under-reporting income.
            </p>
            <p className="mt-3">
              Under Nepal's Income Tax Act, TDS applies to many common business and financial transactions, including rent, consultancy fees, contract payments, commissions, brokerage, dividends, interest, royalties, meeting allowances, insurance commissions, and several other categories specified by law. The applicable rate depends on the nature of the payment, the recipient's status, and the relevant statutory provisions.
            </p>
            <p className="mt-3">
              For businesses and institutions acting as withholding agents, deducting TDS is more than a calculation—it is a legal compliance responsibility. In addition to calculating the correct amount, the payer is generally responsible for depositing the tax within the prescribed time, maintaining supporting records, and completing any required reporting.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-3 tracking-tight">Why Does Nepal Use TDS?</h3>
            <p>
              Nepal uses the TDS system to improve tax collection and strengthen compliance. By collecting tax when income is paid rather than after the end of the fiscal year, the Government can reduce delays in revenue collection while creating a transparent record of taxable payments.
            </p>
            <p className="mt-3">
              For taxpayers, TDS can also simplify compliance. Depending on the applicable legal provisions, the deducted amount may either represent a final settlement of tax on that income or be credited as an advance against the taxpayer's annual income tax liability.
            </p>
          </div>

          {/* Quick Fact Box */}
          <div className="bg-[#E6F4EA] border-l-4 border-[#188038] rounded-r-lg p-5 sm:p-6 shadow-sm my-6">
             <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-[#188038]" />
                <h4 className="text-sm font-black text-[#202124] uppercase tracking-wider">Quick Fact</h4>
             </div>
             <p className="text-[13px] sm:text-sm text-[#3C4043] leading-relaxed font-medium">
                TDS is deducted before payment is made to the recipient. The payer withholds the applicable amount, deposits it with the Inland Revenue Department (IRD), and pays the remaining balance to the recipient.
             </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-4 tracking-tight">Key Parties Involved in a TDS Transaction</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-[#DADCE0] rounded-lg">
                <thead>
                  <tr className="bg-[#F8F9FA]">
                    <th className="border border-[#DADCE0] px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider w-1/4">Party</th>
                    <th className="border border-[#DADCE0] px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Role</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-[#3C4043]">
                  <tr>
                    <td className="border border-[#DADCE0] px-4 py-3 font-semibold text-[#202124] flex items-center gap-2"><Briefcase className="w-4 h-4 text-[#1A73E8]" /> Withholding Agent</td>
                    <td className="border border-[#DADCE0] px-4 py-3 leading-relaxed">The person or organisation responsible for deducting and depositing TDS before making payment.</td>
                  </tr>
                  <tr className="bg-[#F8F9FA]">
                    <td className="border border-[#DADCE0] px-4 py-3 font-semibold text-[#202124] flex items-center gap-2"><HelpCircle className="w-4 h-4 text-[#1A73E8]" /> Recipient (Payee)</td>
                    <td className="border border-[#DADCE0] px-4 py-3 leading-relaxed">The individual or organisation receiving the payment after TDS has been deducted.</td>
                  </tr>
                  <tr>
                    <td className="border border-[#DADCE0] px-4 py-3 font-semibold text-[#202124] flex items-center gap-2"><Landmark className="w-4 h-4 text-[#1A73E8]" /> Inland Revenue Department (IRD)</td>
                    <td className="border border-[#DADCE0] px-4 py-3 leading-relaxed">Nepal's tax authority responsible for administering tax laws and receiving withheld tax.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-3 tracking-tight">Common Payments Subject to TDS</h3>
            <p className="mb-4">Depending on the applicable provisions of Nepal's tax laws, TDS may apply to payments such as:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {[
                'House and land rent',
                'Vehicle hire',
                'Consultancy & professional services',
                'Contract payments',
                'Commission and brokerage',
                'Interest payments',
                'Dividend distributions',
                'Royalty payments',
                'Insurance commissions',
                'Meeting allowances',
                'Transport and freight services',
                'Technical services',
                'Software licensing',
                'Legal and audit services',
                'Other specified payments'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-[#F8F9FA] p-3 rounded border border-[#E8EAED]">
                  <CheckCircle2 className="w-4 h-4 text-[#1A73E8] shrink-0 mt-0.5" />
                  <span className="text-[13px] font-semibold text-[#3C4043]">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-[#5F6368] italic border-l-2 border-[#DADCE0] pl-3">
              Always determine the correct payment category before calculating TDS, as different categories may have different withholding rates and legal treatment.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-3 tracking-tight">Advance Tax vs Final Withholding Tax</h3>
            <p>Not every TDS deduction has the same tax treatment.</p>
            <p className="mt-3">
              In some cases, the deducted amount may generally be credited against the recipient's annual income tax liability (commonly referred to as Advance Tax). In other cases, the withholding may represent the final tax on that specific income where the law provides for Final Withholding Tax treatment.
            </p>
            <p className="mt-3 mb-4">
              The applicable treatment depends on the payment type and the relevant legal provisions. The calculator identifies the implemented treatment for the selected scenario, but users should review official guidance where transactions are complex.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-[#DADCE0] rounded-lg">
                <thead>
                  <tr className="bg-[#F8F9FA]">
                    <th className="border border-[#DADCE0] px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider w-1/2">Advance Tax</th>
                    <th className="border border-[#DADCE0] px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider w-1/2">Final Withholding Tax</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-[#3C4043]">
                  <tr>
                    <td className="border border-[#DADCE0] px-4 py-3 leading-relaxed">Generally credited against the taxpayer's annual income tax liability, subject to applicable law.</td>
                    <td className="border border-[#DADCE0] px-4 py-3 leading-relaxed bg-[#F8F9FA]">Generally settles the tax obligation on that specific income where final withholding treatment applies.</td>
                  </tr>
                  <tr>
                    <td className="border border-[#DADCE0] px-4 py-3 leading-relaxed">Commonly relevant for many business-related payments.</td>
                    <td className="border border-[#DADCE0] px-4 py-3 leading-relaxed bg-[#F8F9FA]">Commonly used for specific categories identified by law.</td>
                  </tr>
                  <tr>
                    <td className="border border-[#DADCE0] px-4 py-3 leading-relaxed">May require adjustment when filing annual tax returns.</td>
                    <td className="border border-[#DADCE0] px-4 py-3 leading-relaxed bg-[#F8F9FA]">Usually does not require further tax on that specific income, subject to applicable law.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Worked Example */}
          <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6 sm:p-8 my-8 shadow-sm">
            <h3 className="text-lg font-black text-[#202124] tracking-tight mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1A73E8]" /> Worked Example
            </h3>
            <div className="bg-white border border-[#E8EAED] rounded-lg p-4 mb-5">
              <p className="text-sm font-medium text-[#202124]">
                <strong>Scenario:</strong> A company pays a consultant NPR 100,000 for professional services.
              </p>
            </div>
            <ol className="space-y-4">
              {[
                'Identify the correct payment category.',
                'Determine the applicable TDS rate according to the implemented FY 2083/84 rules and supporting documentation.',
                'Calculate the withholding amount.',
                'Deduct the TDS before making the payment.',
                'Pay the remaining amount to the consultant.',
                'Deposit the withheld tax with the IRD within the prescribed timeline and maintain the required records.'
              ].map((step, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-[#3C4043]">
                  <div className="w-6 h-6 rounded-full bg-[#E8F0FE] text-[#1A73E8] font-bold flex items-center justify-center shrink-0 text-xs">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed mt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <p className="text-[12px] text-[#5F6368] mt-5 italic">
              The exact withholding rate depends on the payment category and applicable legal provisions. Use the calculator above to determine the implemented rate for your scenario.
            </p>
          </div>

          {/* Compliance Tip */}
          <div className="bg-[#E8F0FE] border border-[#D2E3FC] rounded-xl p-6 sm:p-8 my-8 shadow-sm">
             <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-6 h-6 text-[#1A73E8]" />
                <h4 className="text-sm font-black text-[#1A73E8] uppercase tracking-wider">Compliance Tip</h4>
             </div>
             <p className="text-sm font-bold text-[#202124] mb-3">Before processing any payment that may be subject to TDS:</p>
             <ul className="space-y-2 mb-0 text-sm text-[#3C4043]">
               {[
                 'Confirm the correct payment category.',
                 'Verify the recipient\'s PAN and supporting documentation where applicable.',
                 'Check whether any special treatment or exception applies.',
                 'Deduct TDS before making the payment.',
                 'Deposit the withheld amount within the statutory deadline.',
                 'Keep invoices, payment records, and supporting documents for future reference.'
               ].map((tip, idx) => (
                 <li key={idx} className="flex items-start gap-2">
                   <CheckCircle2 className="w-4 h-4 text-[#1A73E8] shrink-0 mt-0.5" />
                   <span>{tip}</span>
                 </li>
               ))}
             </ul>
          </div>

          {/* Key Takeaway */}
          <div className="border-l-4 border-[#F57C00] pl-5 py-2 my-8">
            <h4 className="text-sm font-black text-[#202124] uppercase tracking-wider mb-2">Key Takeaway</h4>
            <p className="text-sm text-[#3C4043] leading-relaxed">
              Tax Deducted at Source (TDS) is one of Nepal's primary withholding tax mechanisms. Correctly identifying the payment category and understanding the applicable legal treatment are just as important as calculating the withholding amount. The calculator helps estimate the deduction, while the sections below explain the official rates, payment categories, VAT rules, compliance requirements, and practical examples needed to apply TDS correctly in real-world situations.
            </p>
          </div>

          {/* Important Notice */}
          <div className="bg-[#FFF8E1] border border-[#FFE082] rounded-lg p-5 my-6 flex gap-3">
             <AlertCircle className="w-5 h-5 text-[#F57C00] shrink-0 mt-0.5" />
             <div>
                <h4 className="text-[11px] font-black text-[#F57C00] uppercase tracking-wider mb-1">Important Notice</h4>
                <p className="text-[12px] text-[#616161] leading-relaxed">
                  This guide is designed to help users understand Nepal's Tax Deducted at Source (TDS) system and estimate withholding amounts using the implemented FY 2083/84 rules. Certain transactions, exemptions, international tax treaties, and specialised tax situations may require additional analysis. Always refer to the latest official publications issued by the Inland Revenue Department (IRD) when dealing with complex or unusual transactions.
                </p>
             </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: Payment Categories Explained */}
      <section id="payment-categories" className="scroll-mt-24 space-y-8 pt-8 border-t border-[#DADCE0]">
        <h2 className="text-2xl md:text-3xl font-black text-[#202124] tracking-tight">
          Nepal TDS Payment Categories Explained (FY 2083/84)
        </h2>

        {/* Quick Navigation */}
        <div className="space-y-3">
          <h3 className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Quick Navigation</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'cat-rent', label: 'House and Land Rent' },
              { id: 'cat-vehicle', label: 'Vehicle Hire' },
              { id: 'cat-consultancy', label: 'Consultancy Services' },
              { id: 'cat-professional', label: 'Professional Services' },
              { id: 'cat-contract', label: 'Contract Payments' },
              { id: 'cat-commission', label: 'Commission' },
              { id: 'cat-brokerage', label: 'Brokerage' },
              { id: 'cat-interest', label: 'Interest' },
              { id: 'cat-dividend', label: 'Dividend' },
              { id: 'cat-royalty', label: 'Royalty' },
              { id: 'cat-insurance', label: 'Insurance Commission' },
              { id: 'cat-meeting', label: 'Meeting Allowance' },
              { id: 'cat-transport', label: 'Transport and Freight' },
              { id: 'cat-technical', label: 'Technical Services' },
              { id: 'cat-software', label: 'Software Licensing' },
              { id: 'cat-legal', label: 'Legal Services' },
              { id: 'cat-audit', label: 'Audit Services' },
              { id: 'cat-ridesharing', label: 'Ride-sharing Platform Payments' },
            ].map(cat => (
              <a key={cat.id} href={`#${cat.id}`} className="px-3 py-1.5 bg-[#F1F3F4] hover:bg-[#E8F0FE] text-[#3C4043] hover:text-[#1A73E8] text-[12px] font-semibold rounded-full transition-colors border border-transparent hover:border-[#D2E3FC]">
                {cat.label}
              </a>
            ))}
          </div>
        </div>

        <div className="prose prose-blue max-w-none text-[#3C4043] leading-relaxed space-y-4">
          <h3 className="text-xl font-bold text-[#202124] tracking-tight mb-3">Why Payment Categories Matter</h3>
          <p>
            The first step in calculating Tax Deducted at Source (TDS) is identifying the correct payment category. Under Nepal's withholding tax system, the nature of the payment determines which legal provisions apply and which TDS rate should be used. Two payments with the same value may have different withholding requirements because they fall under different categories.
          </p>
          <p>
            Selecting the wrong category can result in under-deduction, over-deduction, late corrections, additional compliance work, and potential interest or penalties. Before calculating TDS, confirm the purpose of the payment, review the supporting documents, and identify the correct category under the applicable tax rules.
          </p>
        </div>

        {/* CATEGORY CARDS */}
        <div className="space-y-6">
          {[
            {
              id: "cat-rent",
              title: "House and Land Rent",
              when: "Use this category when rent is paid for the use of land, buildings, offices, warehouses, factories, shops, or other immovable property.",
              examples: ["Office rent", "Warehouse rent", "Commercial building rent", "Factory lease", "Shop rent", "Land lease"],
              treatment: "Where the transaction falls within the standard rent provisions implemented by this calculator, a 10% withholding rate is applied.",
              docs: ["Rental agreement", "Landlord details", "PAN (where applicable)", "Payment voucher"],
              mistakes: ["Selecting \"Contract Payment\" instead of \"Rent\"", "Forgetting to verify the rental agreement", "Applying an incorrect rate without confirming the nature of the payment"]
            },
            {
              id: "cat-consultancy",
              title: "Consultancy Services",
              when: "Use this category for payments made to consultants who provide professional advice or specialised expertise.",
              examples: ["Business consultants", "Management consultants", "IT consultants", "Engineering consultants", "Tax consultants", "Financial consultants"],
              treatment: "Where the implemented FY 2083/84 rules and supporting documentation permit, consultancy payments may qualify for different withholding treatment. The calculator applies the implemented logic based on the information entered by the user.",
              docs: ["Consultancy agreement", "Invoice", "PAN", "VAT invoice (where applicable)"],
              mistakes: ["Confusing consultancy services with contract work", "Ignoring supporting documentation that affects the implemented calculation", "Selecting the wrong recipient type"]
            },
            {
              id: "cat-contract",
              title: "Contract Payments",
              when: "This category generally covers payments for construction, maintenance, installation, fabrication, and similar contractual work performed under a contract.",
              examples: ["Building construction", "Civil works", "Road construction", "Electrical installation", "Plumbing contracts", "Mechanical installation"],
              treatment: "Always distinguish contract work from consultancy or professional services before calculating TDS."
            },
            {
              id: "cat-commission",
              title: "Commission",
              when: "Commission is paid when a person earns compensation for facilitating sales, arranging transactions, or acting on behalf of another business.",
              examples: ["Sales commission", "Marketing commission", "Agency commission", "Property commission", "Distribution commission"],
              treatment: "Commission payments should not be confused with salaries or consultancy fees."
            },
            {
              id: "cat-brokerage",
              title: "Brokerage",
              when: "Brokerage generally refers to fees paid to intermediaries for arranging transactions or acting as brokers.",
              examples: ["Securities brokerage", "Property brokerage", "Commercial brokerage", "Trade brokerage"],
              treatment: "Brokerage should be classified separately from commission where the applicable legal provisions distinguish between the two."
            },
            {
              id: "cat-interest",
              title: "Interest",
              when: "Interest is income earned on deposits, loans, savings accounts, fixed deposits, or similar financial arrangements.",
              examples: ["Bank interest", "Fixed deposit interest", "Cooperative interest", "Loan interest"],
              treatment: "Different legal treatment may apply depending on the recipient and the type of interest payment."
            },
            {
              id: "cat-dividend",
              title: "Dividend",
              when: "Dividend represents the distribution of profits by a company to its shareholders.",
              examples: ["Cash dividend", "Interim dividend", "Final dividend"],
              treatment: "The withholding treatment for dividends is governed by the applicable provisions relating to dividend distributions."
            },
            {
              id: "cat-royalty",
              title: "Royalty",
              when: "Royalty payments arise from the use of intellectual property or similar rights.",
              examples: ["Trademark licence", "Patent licence", "Copyright licence", "Software royalty", "Brand licensing"],
              treatment: "Always confirm whether the payment is a royalty or a service fee before applying TDS."
            },
            {
              id: "cat-insurance",
              title: "Insurance Commission",
              when: "Insurance commission is paid to insurance agents or intermediaries for arranging or servicing insurance business.",
              treatment: "For FY 2083/84, the implemented rules reflect the updated treatment for qualifying insurance commission payments described in the official budget changes."
            },
            {
              id: "cat-meeting",
              title: "Meeting Allowance",
              when: "Meeting allowance includes payments made to board members, committee members, or similar participants for attending meetings where withholding requirements apply.",
              examples: ["Board meeting allowance", "Committee allowance", "Sitting fee"]
            },
            {
              id: "cat-transport",
              title: "Transport and Freight",
              when: "This category covers qualifying payments for transportation and freight services where withholding obligations apply.",
              examples: ["Goods transportation", "Freight forwarding", "Logistics services", "Vehicle transport"]
            },
            {
              id: "cat-technical",
              title: "Technical Services",
              when: "Technical services involve specialised technical expertise rather than general consultancy.",
              examples: ["System implementation", "Technical installation", "Technical supervision", "Equipment commissioning"],
              treatment: "Always review the agreement to distinguish technical services from consultancy or contract work."
            },
            {
              id: "cat-software",
              title: "Software Licensing",
              when: "Use this category for payments made for software licences, subscription rights, or licensing arrangements where the payment falls within the applicable withholding framework.",
              examples: ["Enterprise software licence", "Annual software subscription", "Licensed business software"]
            },
            {
              id: "cat-legal",
              title: "Legal Services",
              when: "Legal services include professional legal advice and representation provided by lawyers or law firms.",
              examples: ["Legal consultation", "Contract drafting", "Litigation support", "Corporate legal advisory"]
            },
            {
              id: "cat-audit",
              title: "Audit Services",
              when: "Audit services relate to statutory audits, internal audits, assurance engagements, and similar professional accounting services.",
              examples: ["Statutory audit", "Internal audit", "Financial review", "Assurance services"]
            },
            {
              id: "cat-ridesharing",
              title: "Ride-sharing Platform Payments",
              when: "This category applies to qualifying payouts made by ride-sharing platform operators to drivers or service providers where the Finance Act requires withholding.",
              examples: ["Driver earnings", "Delivery partner payouts", "Platform service payouts"],
              treatment: "The calculator applies the implemented FY 2083/84 treatment for this category."
            }
          ].map(cat => (
            <div key={cat.id} id={cat.id} className="scroll-mt-24 bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#F8F9FA] px-5 py-4 border-b border-[#DADCE0]">
                <h3 className="text-lg font-black text-[#202124]">{cat.title}</h3>
              </div>
              <div className="p-5 space-y-5 text-[14px]">
                {cat.when && (
                  <div>
                    <strong className="text-[#1A73E8] block mb-1">When this category applies</strong>
                    <p className="text-[#3C4043] leading-relaxed">{cat.when}</p>
                  </div>
                )}
                
                {(cat.examples?.length || cat.docs?.length) ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cat.examples && cat.examples.length > 0 && (
                      <div>
                        <strong className="text-[#1A73E8] block mb-2">Typical examples</strong>
                        <ul className="space-y-1.5 text-[#3C4043]">
                          {cat.examples.map((ex, i) => (
                            <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#188038] mt-[3px] shrink-0" /> <span className="leading-tight">{ex}</span></li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {cat.docs && cat.docs.length > 0 && (
                      <div>
                        <strong className="text-[#1A73E8] block mb-2">Documents to verify</strong>
                        <ul className="space-y-1.5 text-[#3C4043]">
                          {cat.docs.map((doc, i) => (
                            <li key={i} className="flex items-start gap-2"><FileText className="w-4 h-4 text-[#5F6368] mt-[3px] shrink-0" /> <span className="leading-tight">{doc}</span></li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : null}

                {cat.treatment && (
                  <div>
                    <strong className="text-[#1A73E8] block mb-1">General withholding treatment</strong>
                    <p className="text-[#3C4043] leading-relaxed">{cat.treatment}</p>
                  </div>
                )}
                
                {cat.mistakes && cat.mistakes.length > 0 && (
                  <div className="bg-[#FFF8E1] p-4 rounded-lg border border-[#FFE082]">
                    <strong className="text-[#F57C00] block mb-2 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> Common mistakes</strong>
                    <ul className="list-disc pl-5 text-[#616161] space-y-1">
                      {cat.mistakes.map((mistake, i) => (
                        <li key={i} className="leading-relaxed">{mistake}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* How to Choose the Correct Category */}
        <div className="prose prose-blue max-w-none text-[#3C4043] leading-relaxed space-y-4 pt-6">
          <h3 className="text-xl font-bold text-[#202124] tracking-tight">How to Choose the Correct Category</h3>
          <p>Before calculating TDS, ask the following questions:</p>
          <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6 shadow-sm">
             <ul className="space-y-3 mb-0">
               {[
                 'What is the primary purpose of the payment?',
                 'Is the payment for goods, services, rent, interest, or profit distribution?',
                 'Who is receiving the payment?',
                 'Does the transaction involve supporting documents that affect the withholding treatment?',
                 'Which legal provision best matches the transaction?'
               ].map((q, idx) => (
                 <li key={idx} className="flex items-start gap-3">
                   <HelpCircle className="w-5 h-5 text-[#1A73E8] mt-0.5 shrink-0" />
                   <span className="font-semibold text-[#202124]">{q}</span>
                 </li>
               ))}
             </ul>
          </div>
          <p className="text-[13px] text-[#5F6368] italic mt-4">
            If there is uncertainty, review the agreement or contract before processing the payment.
          </p>
        </div>

        {/* Common Classification Errors */}
        <div className="pt-6">
          <h3 className="text-xl font-bold text-[#202124] tracking-tight mb-4">Common Classification Errors</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-[#DADCE0] rounded-lg">
              <thead>
                <tr className="bg-[#F8F9FA]">
                  <th className="border border-[#DADCE0] px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider w-1/2">Incorrect Selection</th>
                  <th className="border border-[#DADCE0] px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider w-1/2">Correct Category</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#3C4043]">
                {[
                  { wrong: 'Office rent recorded as contract work', right: 'House and Land Rent' },
                  { wrong: 'IT consulting recorded as technical installation', right: 'Consultancy Services (or Technical Services, depending on the engagement)' },
                  { wrong: 'Sales commission recorded as salary', right: 'Commission' },
                  { wrong: 'Shareholder profit distribution recorded as interest', right: 'Dividend' },
                  { wrong: 'Patent licensing recorded as consultancy', right: 'Royalty' }
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-[#F8F9FA]' : ''}>
                    <td className="border border-[#DADCE0] px-4 py-3 text-[#D93025] flex items-start gap-2"><XCircle className="w-4 h-4 shrink-0 mt-0.5" /> <span className="leading-relaxed">{row.wrong}</span></td>
                    <td className="border border-[#DADCE0] px-4 py-3 text-[#188038]">
                      <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> <span className="leading-relaxed">{row.right}</span></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="border-l-4 border-[#F57C00] pl-5 py-2 my-8">
          <h4 className="text-sm font-black text-[#202124] uppercase tracking-wider mb-2">Key Takeaway</h4>
          <p className="text-sm text-[#3C4043] leading-relaxed">
            Accurate TDS calculations begin with accurate classification. Before applying any withholding rate, identify the true nature of the payment, review the supporting agreement, and ensure the selected category matches the transaction. Correct classification improves compliance, reduces errors, and helps ensure that the withholding amount produced by the calculator aligns with the implemented FY 2083/84 rules.
          </p>
        </div>

      </section>

      {/* SECTION 6: VAT and TDS Rules in Nepal */}
      <section id="vat-and-tds" className="scroll-mt-24 space-y-8 pt-8 border-t border-[#DADCE0]">
        <h2 className="text-2xl md:text-3xl font-black text-[#202124] tracking-tight">
          VAT and TDS Rules in Nepal (FY 2083/84)
        </h2>

        {/* Quick Answer Panel */}
        <div className="overflow-hidden border border-[#DADCE0] rounded-xl shadow-sm bg-white">
          <div className="bg-[#E8F0FE] border-b border-[#D2E3FC] px-6 py-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-[#1A73E8]" />
            <h3 className="text-[13px] font-black text-[#1A73E8] uppercase tracking-wider">Quick Answer</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                  <th className="px-6 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider w-1/3">Question</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Answer</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#3C4043] divide-y divide-[#F1F3F4]">
                {[
                  { q: 'Does VAT replace TDS?', a: 'No. VAT and TDS are separate tax obligations.' },
                  { q: 'Is TDS the same as VAT?', a: 'No. VAT is an indirect tax on the supply of goods and services, while TDS is a withholding income tax deducted from certain payments.' },
                  { q: 'Can a payment be subject to both VAT and TDS?', a: 'Yes. Depending on the transaction, both VAT and TDS obligations may apply.' },
                  { q: 'Should VAT registration be considered when determining TDS?', a: 'Yes. For certain payment categories implemented by this calculator, VAT-related conditions affect the withholding treatment.' },
                  { q: 'Does every VAT invoice receive the same TDS treatment?', a: 'No. The applicable treatment depends on the payment category and the relevant legal provisions.' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="px-6 py-4 font-bold text-[#202124]">{row.q}</td>
                    <td className="px-6 py-4 leading-relaxed">{row.a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="prose prose-blue max-w-none text-[#3C4043] leading-relaxed space-y-6">
          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-3 tracking-tight">Understanding the Difference Between VAT and TDS</h3>
            <p>
              Value Added Tax (VAT) and Tax Deducted at Source (TDS) serve different purposes within Nepal's tax system and should never be treated as the same tax.
            </p>
            <p className="mt-3">
              VAT is an indirect tax charged on the supply of taxable goods and services. The supplier collects VAT from the customer and remits it to the Government in accordance with the Value Added Tax Act and applicable regulations.
            </p>
            <p className="mt-3">
              TDS, on the other hand, is a withholding income tax. Instead of collecting tax from the customer, the payer deducts a prescribed amount from certain payments before making the payment to the recipient. The deducted amount is then deposited with the Inland Revenue Department (IRD).
            </p>
            <p className="mt-3">
              Because these taxes have different legal purposes, the existence of VAT does not automatically remove or replace the obligation to deduct TDS where withholding is required by law.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-4 tracking-tight">VAT vs TDS Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-[#DADCE0] rounded-lg">
                <thead>
                  <tr className="bg-[#F8F9FA]">
                    <th className="border border-[#DADCE0] px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider w-1/2">VAT</th>
                    <th className="border border-[#DADCE0] px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider w-1/2">TDS</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-[#3C4043]">
                  {[
                    ['Indirect tax on the supply of taxable goods and services.', 'Withholding income tax deducted before certain payments are made.'],
                    ['Collected by the supplier from the customer.', 'Deducted by the payer before paying the recipient.'],
                    ['Governed by VAT legislation.', 'Governed by the Income Tax Act and Finance Act.'],
                    ['Applies only to taxable supplies within the VAT framework.', 'Applies only to payments that fall within the withholding provisions.'],
                    ['Reported through VAT returns.', 'Deposited and reported through the applicable TDS process.']
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-[#F8F9FA]' : ''}>
                      <td className="border border-[#DADCE0] px-4 py-3 leading-relaxed">{row[0]}</td>
                      <td className="border border-[#DADCE0] px-4 py-3 leading-relaxed">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-3 tracking-tight">Can VAT and TDS Apply to the Same Payment?</h3>
            <p><strong>Yes.</strong></p>
            <p className="mt-3">
              A payment may involve both VAT obligations and TDS obligations where the applicable tax laws require both. Whether both taxes apply depends on the nature of the transaction, the parties involved, and the relevant statutory provisions.
            </p>
            <p className="mt-3 mb-4">
              For example, certain professional or consultancy services may involve a VAT invoice while also requiring TDS to be deducted by the payer. The presence of VAT does not automatically eliminate the withholding obligation.
            </p>
            <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6 shadow-sm">
              <p className="font-bold text-[#202124] mb-3">Always determine:</p>
              <ul className="space-y-2 mb-0">
                {[
                  'The nature of the payment.',
                  'Whether the transaction is subject to VAT.',
                  'Whether the payment falls within the withholding provisions of the Income Tax Act.',
                  'Whether any specific statutory conditions affect the implemented withholding treatment.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#1A73E8] shrink-0 mt-[1px]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-3 tracking-tight">Why Does the Calculator Ask About VAT?</h3>
            <p>
              Some payment categories implemented in this calculator require additional information because VAT-related conditions can affect the withholding treatment applied by the calculator.
            </p>
            <p className="mt-3">
              Rather than asking users to interpret the legislation themselves, the calculator requests the necessary information and applies the implemented FY 2083/84 rules for the selected scenario.
            </p>
            <p className="mt-3">
              This helps reduce common classification errors and improves the accuracy of the withholding estimate.
            </p>
          </div>

          {/* Workflow */}
          <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6 sm:p-8 my-8 shadow-sm">
            <h3 className="text-lg font-black text-[#202124] tracking-tight mb-5 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1A73E8]" /> Typical Workflow for a Business Payment
            </h3>
            <p className="text-sm text-[#3C4043] mb-4">A business making a payment should generally follow this sequence:</p>
            <ol className="space-y-4">
              {[
                'Confirm the nature of the payment.',
                'Determine whether VAT applies to the transaction.',
                'Verify supporting documents, including invoices and registration details where relevant.',
                'Determine whether TDS must be deducted.',
                'Calculate the applicable withholding amount.',
                'Pay the recipient after deducting TDS where required.',
                'Deposit the withheld amount with the Inland Revenue Department (IRD).',
                'Maintain all supporting records for future reference.'
              ].map((step, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-[#3C4043]">
                  <div className="w-6 h-6 rounded-full bg-[#E8F0FE] text-[#1A73E8] font-bold flex items-center justify-center shrink-0 text-xs">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed mt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Examples Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#F8F9FA] px-5 py-4 border-b border-[#DADCE0]">
                <h4 className="text-[15px] font-black text-[#202124]">Example 1 – Consultancy Service</h4>
              </div>
              <div className="p-5">
                <p className="text-sm font-bold text-[#202124] mb-3">Scenario: A company hires a management consultant to provide business advisory services.</p>
                <p className="text-[13px] text-[#3C4043] mb-2">Before making payment, the finance department should:</p>
                <ul className="space-y-1.5 text-[13px] text-[#3C4043]">
                  {['Review the consultancy agreement.', 'Verify the invoice.', 'Confirm whether the transaction falls within the implemented VAT-related treatment.', 'Apply the withholding logic used by the calculator.', 'Deduct TDS where applicable.', 'Deposit the withheld amount with the IRD.'].map((s, i) => (
                    <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#188038] mt-[2px] shrink-0" /> {s}</li>
                  ))}
                </ul>
                <p className="text-[12px] text-[#5F6368] italic mt-4 border-t border-[#F1F3F4] pt-3">
                  The calculator performs the calculation automatically after the required information has been entered.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm">
                <div className="bg-[#F8F9FA] px-5 py-4 border-b border-[#DADCE0]">
                  <h4 className="text-[15px] font-black text-[#202124]">Example 2 – Office Rent</h4>
                </div>
                <div className="p-5">
                  <p className="text-[13px] text-[#3C4043] leading-relaxed">
                    <strong className="text-[#202124] block mb-1">Scenario: A company pays monthly office rent.</strong>
                    Although the landlord may have issued supporting documentation, the payer must still determine whether the payment falls within the applicable withholding provisions and deduct TDS where required before making the payment.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm">
                <div className="bg-[#F8F9FA] px-5 py-4 border-b border-[#DADCE0]">
                  <h4 className="text-[15px] font-black text-[#202124]">Example 3 – Dividend Distribution</h4>
                </div>
                <div className="p-5">
                  <p className="text-[13px] text-[#3C4043] leading-relaxed">
                    Dividend distributions generally involve withholding obligations under the applicable income tax provisions but do not represent a VAT transaction. The payer should follow the relevant withholding requirements for dividends and maintain supporting corporate records.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-4 tracking-tight">Common VAT and TDS Mistakes</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-[#DADCE0] rounded-lg">
                <thead>
                  <tr className="bg-[#F8F9FA]">
                    <th className="border border-[#DADCE0] px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider w-1/2">Mistake</th>
                    <th className="border border-[#DADCE0] px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider w-1/2">Why It Is Incorrect</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-[#3C4043]">
                  {[
                    { m: 'Assuming VAT and TDS are the same tax.', w: 'They are different taxes governed by different legislation.' },
                    { m: 'Ignoring TDS because a VAT invoice has been issued.', w: 'A VAT invoice does not automatically remove a withholding obligation.' },
                    { m: 'Treating every service payment the same.', w: 'Different payment categories may have different withholding treatment.' },
                    { m: 'Selecting the wrong payment category.', w: 'Incorrect classification can lead to the wrong TDS calculation.' },
                    { m: 'Failing to keep supporting invoices.', w: 'Proper documentation is essential for compliance and audit purposes.' }
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-[#F8F9FA]' : ''}>
                      <td className="border border-[#DADCE0] px-4 py-3 text-[#D93025] flex items-start gap-2"><XCircle className="w-4 h-4 mt-[3px] shrink-0" /> <span className="leading-relaxed">{row.m}</span></td>
                      <td className="border border-[#DADCE0] px-4 py-3 leading-relaxed">{row.w}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm my-8">
            <h3 className="text-lg font-bold text-[#202124] mb-4 tracking-tight">Documents to Review Before Applying TDS</h3>
            <p className="text-sm text-[#3C4043] mb-4">Before processing a payment, review the following documents where applicable:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {[
                'Service agreement or contract',
                'Invoice',
                'VAT invoice (if applicable)',
                'PAN details',
                'Payment voucher',
                'Purchase order',
                'Supporting correspondence',
                'Internal approval records'
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#F8F9FA] p-3 rounded border border-[#E8EAED]">
                  <FileText className="w-4 h-4 text-[#5F6368] shrink-0" />
                  <span className="text-[13px] font-semibold text-[#3C4043]">{doc}</span>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-[#5F6368] italic">
              Maintaining complete documentation helps support the withholding calculation and simplifies future compliance reviews.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-4 tracking-tight">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="border border-[#DADCE0] rounded-lg p-5">
                <h4 className="font-bold text-[#202124] mb-2 flex items-start gap-2"><HelpCircle className="w-5 h-5 text-[#1A73E8] shrink-0 mt-[2px]" /> Is VAT deducted from the payment like TDS?</h4>
                <p className="text-[14px] text-[#3C4043] leading-relaxed ml-7">No. VAT and TDS are different taxes with different legal purposes. VAT is charged on taxable supplies, while TDS is withheld from certain payments before they are made to the recipient.</p>
              </div>
              <div className="border border-[#DADCE0] rounded-lg p-5">
                <h4 className="font-bold text-[#202124] mb-2 flex items-start gap-2"><HelpCircle className="w-5 h-5 text-[#1A73E8] shrink-0 mt-[2px]" /> Does every VAT invoice require TDS?</h4>
                <p className="text-[14px] text-[#3C4043] leading-relaxed ml-7">No. Whether TDS applies depends on the nature of the payment and the applicable provisions of Nepal's tax laws. A VAT invoice alone does not determine whether withholding is required.</p>
              </div>
              <div className="border border-[#DADCE0] rounded-lg p-5">
                <h4 className="font-bold text-[#202124] mb-2 flex items-start gap-2"><HelpCircle className="w-5 h-5 text-[#1A73E8] shrink-0 mt-[2px]" /> Why does the calculator ask about VAT status?</h4>
                <p className="text-[14px] text-[#3C4043] leading-relaxed ml-7">For certain payment categories implemented by the calculator, VAT-related information affects the withholding treatment. The additional input helps apply the correct calculation logic for those scenarios.</p>
              </div>
              <div className="border border-[#DADCE0] rounded-lg p-5">
                <h4 className="font-bold text-[#202124] mb-2 flex items-start gap-2"><HelpCircle className="w-5 h-5 text-[#1A73E8] shrink-0 mt-[2px]" /> Can a payment have both VAT and TDS?</h4>
                <p className="text-[14px] text-[#3C4043] leading-relaxed ml-7">Yes. Depending on the transaction and the applicable legal provisions, a payment may involve both VAT obligations and TDS obligations.</p>
              </div>
            </div>
          </div>

          {/* Compliance Tip */}
          <div className="bg-[#E8F0FE] border border-[#D2E3FC] rounded-xl p-6 sm:p-8 my-8 shadow-sm">
             <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-6 h-6 text-[#1A73E8]" />
                <h4 className="text-sm font-black text-[#1A73E8] uppercase tracking-wider">Compliance Tip</h4>
             </div>
             <p className="text-sm text-[#3C4043] leading-relaxed">
               Always review the payment agreement before processing any transaction. Confirm the payment category, determine whether VAT applies, verify supporting documents, and then calculate TDS using the appropriate withholding rules. Treat VAT and TDS as separate compliance requirements, even when they relate to the same payment.
             </p>
          </div>

          {/* Key Takeaway */}
          <div className="border-l-4 border-[#F57C00] pl-5 py-2 my-8">
            <h4 className="text-sm font-black text-[#202124] uppercase tracking-wider mb-2">Key Takeaway</h4>
            <p className="text-sm text-[#3C4043] leading-relaxed">
              VAT and TDS perform different functions within Nepal's tax system. VAT applies to taxable supplies of goods and services, while TDS is a withholding income tax deducted from specified payments. Understanding this distinction—and correctly identifying when each obligation applies—is essential for accurate tax compliance. The calculator combines the relevant inputs to estimate TDS for the implemented FY 2083/84 scenarios while helping users avoid common classification and documentation errors.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 7: Calculation Examples */}
      <section id="calculation-examples" className="scroll-mt-24 space-y-8 pt-8 border-t border-[#DADCE0]">
        <h2 className="text-2xl md:text-3xl font-black text-[#202124] tracking-tight">
          Nepal TDS Calculation Examples (FY 2083/84)
        </h2>

        <div className="prose prose-blue max-w-none text-[#3C4043] leading-relaxed space-y-4">
          <h3 className="text-xl font-bold text-[#202124] tracking-tight mb-3">Why These Examples Matter</h3>
          <p>
            Understanding the applicable TDS rate is easier when you see how the rules apply in real business situations. The examples below illustrate common payment types, the calculation method, and the resulting net payment. These examples are for educational purposes and assume the transaction falls within the implemented FY 2083/84 rules used by this calculator.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Table-based Examples */}
          {[
            { id: 1, title: 'House Rent', scenario: 'ABC Trading Pvt. Ltd. pays monthly office rent.', gross: '100,000', rate: '10%', tds: '10,000', net: '90,000' },
            { id: 4, title: 'Sales Commission', scenario: 'A sales agent earns commission.', gross: '75,000', rate: '15%', tds: '11,250', net: '63,750' },
            { id: 5, title: 'Brokerage Fee', scenario: 'A property broker receives brokerage for arranging a commercial lease.', gross: '120,000', rate: '15%', tds: '18,000', net: '102,000' },
            { id: 6, title: 'Dividend Distribution', scenario: 'A company distributes dividends to shareholders.', gross: '50,000', rate: '5%', tds: '2,500', net: '47,500' },
            { id: 8, title: 'Royalty Payment', scenario: 'A business pays royalty for the use of a trademark.', gross: '300,000', rate: '15%', tds: '45,000', net: '255,000' },
            { id: 9, title: 'Insurance Commission', scenario: 'An insurance company pays commission to an eligible insurance agent.', gross: '150,000', rate: '20%', tds: '30,000', net: '120,000' },
            { id: 10, title: 'Meeting Allowance', scenario: 'A director receives a meeting allowance.', gross: '20,000', rate: '15%', tds: '3,000', net: '17,000' }
          ].map(ex => (
            <div key={ex.id} className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm flex flex-col">
              <div className="bg-[#F8F9FA] px-4 py-3 border-b border-[#DADCE0]">
                <h4 className="text-[14px] font-black text-[#202124]">Example {ex.id} – {ex.title}</h4>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-[13px] text-[#3C4043] leading-relaxed mb-4"><strong>Scenario:</strong> {ex.scenario}</p>
                <div className="mt-auto bg-[#F8F9FA] rounded border border-[#E8EAED] overflow-hidden">
                  <div className="flex justify-between px-3 py-2 border-b border-[#E8EAED] text-[12px]">
                    <span className="text-[#5F6368]">Gross Amount</span>
                    <span className="font-semibold text-[#202124]">NPR {ex.gross}</span>
                  </div>
                  <div className="flex justify-between px-3 py-2 border-b border-[#E8EAED] text-[12px]">
                    <span className="text-[#5F6368]">TDS Rate</span>
                    <span className="font-semibold text-[#1A73E8]">{ex.rate}</span>
                  </div>
                  <div className="flex justify-between px-3 py-2 border-b border-[#E8EAED] text-[12px] bg-[#FCE8E6]">
                    <span className="text-[#D93025] font-medium">TDS Amount</span>
                    <span className="text-[#D93025] font-bold">NPR {ex.tds}</span>
                  </div>
                  <div className="flex justify-between px-3 py-2 text-[12px] bg-[#E6F4EA]">
                    <span className="text-[#188038] font-medium">Net Payment</span>
                    <span className="text-[#188038] font-bold">NPR {ex.net}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Text-based Examples */}
          {[
            { id: 2, title: 'Consultancy Service', scenario: 'XYZ Company hires a management consultant. Consultancy Fee: NPR 200,000.', detail: 'Applicable Rate: Based on the selected consultancy treatment implemented by the calculator. The calculator automatically determines the withholding amount after the required inputs are selected.' },
            { id: 3, title: 'Contract Payment', scenario: 'A construction company completes renovation work. Contract Amount: NPR 500,000.', detail: 'The calculator applies the implemented contract withholding treatment after the correct category is selected.' },
            { id: 7, title: 'Bank Interest', scenario: 'A bank pays interest to an eligible depositor. Interest Earned: NPR 40,000.', detail: 'Applicable Rate: As determined by the applicable category and recipient. The calculator automatically estimates the withholding amount.' },
            { id: 11, title: 'Vehicle Hire', scenario: 'A business hires a vehicle for project work. Vehicle Hire Charge: NPR 60,000.', detail: 'Where the implemented FY 2083/84 rules apply, the calculator uses the relevant withholding treatment based on the selected inputs.' },
            { id: 12, title: 'Software Licence', scenario: 'A company purchases an annual software licence. Licence Fee: NPR 180,000.', detail: 'The applicable withholding depends on the nature of the payment and the implemented calculator rules.' },
            { id: 13, title: 'Legal Services', scenario: 'A law firm provides legal advisory services. Professional Fee: NPR 90,000.', detail: 'The calculator estimates the withholding after the correct category and supporting information are selected.' },
            { id: 14, title: 'Audit Services', scenario: 'An audit firm completes the annual statutory audit. Audit Fee: NPR 250,000.', detail: 'The withholding estimate is calculated using the implemented payment category.' },
            { id: 15, title: 'Technical Services', scenario: 'An engineering company installs specialised equipment. Technical Service Fee: NPR 350,000.', detail: 'The calculator determines the withholding using the selected payment category.' },
            { id: 16, title: 'Transport Service', scenario: 'A logistics company transports goods for a manufacturer. Freight Charge: NPR 80,000.', detail: 'The applicable withholding depends on the transaction and implemented category.' },
            { id: 17, title: 'Ride-sharing Platform Payout', scenario: 'A ride-sharing platform pays earnings to a driver.', detail: 'The calculator applies the implemented FY 2083/84 treatment for qualifying platform payouts.' },
            { id: 18, title: 'Mixed Services', scenario: 'A supplier provides consultancy and technical implementation under the same engagement.', detail: 'Before calculating TDS, the business should review the agreement to determine the true nature of the payment and whether separate payment categories apply.' },
            { id: 19, title: 'Foreign Royalty Payment', scenario: 'A Nepalese company pays royalty to a foreign software owner.', detail: 'Cross-border transactions may involve additional legal considerations, including treaty provisions where applicable. The calculator provides an estimate for the implemented scenarios and should not be used as a substitute for transaction-specific tax advice.' },
            { id: 20, title: 'Incorrect Classification', scenario: 'A consultancy payment is mistakenly classified as a construction contract.', detail: 'Although the payment amount is unchanged, the withholding treatment may differ because the payment category is incorrect. Always review the agreement and supporting documents before calculating TDS.' }
          ].sort((a, b) => a.id - b.id).map(ex => (
            <div key={ex.id} style={{ order: ex.id }} className="bg-white border border-[#DADCE0] rounded-xl overflow-hidden shadow-sm flex flex-col">
              <div className="bg-[#F8F9FA] px-4 py-3 border-b border-[#DADCE0]">
                <h4 className="text-[14px] font-black text-[#202124]">Example {ex.id} – {ex.title}</h4>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-[13px] text-[#3C4043] leading-relaxed mb-3"><strong>Scenario:</strong> {ex.scenario}</p>
                <div className="mt-auto bg-[#F8F9FA] p-3 rounded border border-[#E8EAED]">
                  <p className="text-[12px] text-[#5F6368] leading-relaxed">{ex.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="prose prose-blue max-w-none text-[#3C4043] leading-relaxed space-y-6 pt-6">
          
          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-4 tracking-tight">Summary Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-[#DADCE0] rounded-lg">
                <thead>
                  <tr className="bg-[#F8F9FA]">
                    <th className="border border-[#DADCE0] px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider w-1/3">Scenario</th>
                    <th className="border border-[#DADCE0] px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Key Point</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-[#3C4043]">
                  {[
                    ['Office Rent', 'Classify as House & Land Rent.'],
                    ['Consultancy', 'Review the nature of the service and supporting documents.'],
                    ['Contract Work', 'Use the contract payment category where applicable.'],
                    ['Commission', 'Separate from salary and consultancy.'],
                    ['Brokerage', 'Distinguish from commission where required.'],
                    ['Interest', 'Confirm the type of interest and recipient.'],
                    ['Dividend', 'Profit distribution has its own withholding treatment.'],
                    ['Royalty', 'Payments for intellectual property should be classified separately.'],
                    ['Insurance Commission', 'Apply the FY 2083/84 implemented treatment where applicable.'],
                    ['Meeting Allowance', 'Confirm that the payment qualifies as a meeting allowance.']
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-[#F8F9FA]' : ''}>
                      <td className="border border-[#DADCE0] px-4 py-3 font-semibold text-[#202124]">{row[0]}</td>
                      <td className="border border-[#DADCE0] px-4 py-3 leading-relaxed">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-[#DADCE0] rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 tracking-tight">Practical Tips</h3>
            <ul className="space-y-2 mb-0">
              {[
                'Start by identifying the true nature of the payment.',
                'Review the contract or invoice before selecting a category.',
                'Use the calculator only after confirming the payment type.',
                'Keep supporting documents with every calculation.',
                'Reassess the classification if the transaction includes multiple types of services.'
              ].map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#1A73E8] shrink-0 mt-[1px]" />
                  <span className="text-[#3C4043]">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Takeaway */}
          <div className="border-l-4 border-[#F57C00] pl-5 py-2 my-8">
            <h4 className="text-sm font-black text-[#202124] uppercase tracking-wider mb-2">Key Takeaway</h4>
            <p className="text-sm text-[#3C4043] leading-relaxed">
              Real-world transactions are not always straightforward. Two payments of the same amount can have different withholding outcomes because the underlying payment category, documentation, and legal treatment differ. These examples demonstrate how the calculator should be used after the transaction has been correctly classified, helping businesses and taxpayers apply Nepal's TDS rules more consistently under the implemented FY 2083/84 framework.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 8: Knowledge Base (FAQ) */}
      <section id="knowledge-base" className="scroll-mt-24 space-y-8 pt-8 border-t border-[#DADCE0]">
        <h2 className="text-2xl md:text-3xl font-black text-[#202124] tracking-tight">
          Nepal TDS Knowledge Base (Frequently Asked Questions)
        </h2>
        
        <div className="space-y-10 text-[#3C4043]">
          
          {/* General Questions */}
          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-4 border-b border-[#DADCE0] pb-2">General Questions</h3>
            <div className="space-y-6">
              <div>
                <strong className="block text-[#1A73E8] mb-1">What is TDS in Nepal?</strong>
                <p className="leading-relaxed">Tax Deducted at Source (TDS) is a tax collection mechanism under Nepal's Income Tax Act where the payer deducts a prescribed amount of tax before making payment to the recipient. Instead of collecting the entire tax after the end of the fiscal year, the government collects tax progressively as qualifying payments are made. Depending on the nature of the payment and the applicable legal provisions, the withheld amount may represent either Advance Tax or Final Withholding Tax.</p>
              </div>
              <div>
                <strong className="block text-[#1A73E8] mb-1">Who is required to deduct TDS?</strong>
                <p className="leading-relaxed">Businesses, companies, government offices, financial institutions, cooperatives, NGOs, INGOs, public entities, and other persons acting as withholding agents under the Income Tax Act may be required to deduct TDS when making qualifying payments.</p>
              </div>
              <div>
                <strong className="block text-[#1A73E8] mb-1">Who pays the TDS?</strong>
                <p className="leading-relaxed">The payer deducts the tax and deposits it with the Inland Revenue Department (IRD), while the economic burden generally falls on the recipient because the withheld amount is deducted from the payment due.</p>
              </div>
              <div>
                <strong className="block text-[#1A73E8] mb-1">Is TDS a separate tax?</strong>
                <p className="leading-relaxed">No. TDS is not a separate tax. It is a method of collecting income tax before or at the time qualifying payments are made.</p>
              </div>
              <div>
                <strong className="block text-[#1A73E8] mb-1">Is TDS always applicable?</strong>
                <p className="leading-relaxed">No. TDS only applies to payments that fall within the withholding provisions of Nepal's Income Tax Act and related legislation.</p>
              </div>
            </div>
          </div>

          {/* Calculator Questions */}
          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-4 border-b border-[#DADCE0] pb-2">Calculator Questions</h3>
            <div className="space-y-6">
              <div>
                <strong className="block text-[#1A73E8] mb-1">How does this Nepal TDS Calculator work?</strong>
                <p className="leading-relaxed">The calculator estimates withholding tax based on the payment category, payment amount, and other required inputs. It applies the implemented FY 2083/84 rules for supported scenarios and instantly displays the estimated TDS amount, net payment, and effective withholding rate.</p>
              </div>
              <div>
                <strong className="block text-[#1A73E8] mb-1">Is the calculator free?</strong>
                <p className="leading-relaxed">Yes. The calculator is available free of charge for educational and estimation purposes.</p>
              </div>
              <div>
                <strong className="block text-[#1A73E8] mb-1">Does the calculator store my financial information?</strong>
                <p className="leading-relaxed">The calculator performs calculations within your browser. If local storage is used to preserve your latest inputs, the information remains on your device and is not submitted as part of the calculation itself.</p>
              </div>
              <div>
                <strong className="block text-[#1A73E8] mb-1">Can I use the calculator for official filing?</strong>
                <p className="leading-relaxed">No. The calculator is designed to assist with estimating withholding tax. Official tax filing should always be completed using the applicable IRD procedures and supported by accurate accounting records.</p>
              </div>
            </div>
          </div>

          {/* Business Questions */}
          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-4 border-b border-[#DADCE0] pb-2">Business Questions</h3>
            <div className="space-y-6">
              <div>
                <strong className="block text-[#1A73E8] mb-1">When should TDS be deducted?</strong>
                <p className="leading-relaxed">Where withholding is required, TDS should generally be deducted before or at the time the payment is made or credited, in accordance with the applicable provisions of Nepal's Income Tax Act.</p>
              </div>
              <div>
                <strong className="block text-[#1A73E8] mb-1">When should TDS be deposited?</strong>
                <p className="leading-relaxed">Withheld TDS should be deposited with the Inland Revenue Department (IRD) within the applicable statutory deadline prescribed by law.</p>
              </div>
              <div>
                <strong className="block text-[#1A73E8] mb-1">What documents should businesses keep?</strong>
                <p className="leading-relaxed mb-2">Recommended records include:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Contracts or agreements</li>
                  <li>Invoices</li>
                  <li>VAT invoices where applicable</li>
                  <li>PAN details</li>
                  <li>Payment vouchers</li>
                  <li>Bank payment confirmations</li>
                  <li>TDS deposit confirmations</li>
                  <li>TDS certificates where applicable</li>
                  <li>Accounting records</li>
                  <li>Internal approvals</li>
                </ul>
              </div>
              <div>
                <strong className="block text-[#1A73E8] mb-1">What happens if the wrong TDS rate is used?</strong>
                <p className="leading-relaxed">Applying an incorrect withholding rate may lead to under-deduction or over-deduction of tax, additional reconciliation work, and possible compliance issues.</p>
              </div>
            </div>
          </div>

          {/* Category-specific Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#202124] mb-4 border-b border-[#DADCE0] pb-2">Rent Questions</h3>
              <div className="space-y-4">
                <div>
                  <strong className="block text-[#1A73E8] mb-1">What is the TDS rate on house rent?</strong>
                  <p className="text-sm leading-relaxed">The applicable withholding treatment depends on the nature of the rental arrangement and the relevant provisions of the Income Tax Act. Use the calculator after selecting the correct rent category.</p>
                </div>
                <div>
                  <strong className="block text-[#1A73E8] mb-1">Is TDS deducted from residential rent?</strong>
                  <p className="text-sm leading-relaxed">Whether withholding applies depends on the nature of the payer, the recipient, and the applicable legal provisions.</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#202124] mb-4 border-b border-[#DADCE0] pb-2">Consultancy Questions</h3>
              <div className="space-y-4">
                <div>
                  <strong className="block text-[#1A73E8] mb-1">What is consultancy TDS?</strong>
                  <p className="text-sm leading-relaxed">Consultancy TDS refers to withholding tax on qualifying consultancy or professional service payments under the Income Tax Act.</p>
                </div>
                <div>
                  <strong className="block text-[#1A73E8] mb-1">Is engineering service treated as consultancy?</strong>
                  <p className="text-sm leading-relaxed">The correct classification depends on the nature of the work performed, the agreement between the parties, and the applicable legal provisions. Businesses should review the transaction carefully before selecting a payment category.</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#202124] mb-4 border-b border-[#DADCE0] pb-2">Interest Questions</h3>
              <div className="space-y-4">
                <div>
                  <strong className="block text-[#1A73E8] mb-1">Is TDS deducted on bank interest?</strong>
                  <p className="text-sm leading-relaxed">Certain interest payments are subject to withholding tax. The applicable treatment depends on the nature of the interest and the recipient.</p>
                </div>
                <div>
                  <strong className="block text-[#1A73E8] mb-1">Is interest TDS final?</strong>
                  <p className="text-sm leading-relaxed">Some categories of interest may be subject to final withholding treatment, while others may not. The applicable legal provisions determine the treatment.</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#202124] mb-4 border-b border-[#DADCE0] pb-2">Dividend Questions</h3>
              <div className="space-y-4">
                <div>
                  <strong className="block text-[#1A73E8] mb-1">What is the dividend TDS rate?</strong>
                  <p className="text-sm leading-relaxed">Dividend distributions are subject to the withholding treatment provided by the applicable provisions of the Income Tax Act. Use the calculator for supported scenarios.</p>
                </div>
                <div>
                  <strong className="block text-[#1A73E8] mb-1">Does the shareholder pay additional tax?</strong>
                  <p className="text-sm leading-relaxed">Where dividend income is subject to final withholding treatment under the applicable law, additional tax on that income is generally not required. Individual circumstances may differ.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance & Legal & Penalties */}
          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-4 border-b border-[#DADCE0] pb-2">Compliance, Legal & Penalties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <strong className="block text-[#1A73E8] mb-1">What is a TDS certificate?</strong>
                <p className="text-sm leading-relaxed">A TDS certificate is a document showing the amount of tax withheld from a payment. It helps the recipient maintain accurate records and may support tax reporting where applicable.</p>
              </div>
              <div>
                <strong className="block text-[#1A73E8] mb-1">Which law governs TDS in Nepal?</strong>
                <p className="text-sm leading-relaxed">TDS is governed primarily by the Income Tax Act, 2058 (2002), together with the annual Finance Act, Income Tax Rules, and official guidance issued by the Inland Revenue Department (IRD).</p>
              </div>
              <div>
                <strong className="block text-[#1A73E8] mb-1">How long should businesses keep TDS records?</strong>
                <p className="text-sm leading-relaxed">Businesses should retain supporting records in accordance with the applicable legal and accounting requirements and any relevant document retention policies.</p>
              </div>
              <div>
                <strong className="block text-[#1A73E8] mb-1">Does the Finance Act change TDS every year?</strong>
                <p className="text-sm leading-relaxed">The Finance Act may introduce amendments affecting withholding rates, payment categories, compliance procedures, or other tax provisions. Businesses should review the latest Finance Act each fiscal year.</p>
              </div>
              <div>
                <strong className="block text-[#1A73E8] mb-1">Can IRD audit TDS records?</strong>
                <p className="text-sm leading-relaxed">Yes. Businesses should maintain complete documentation to support withholding calculations, deposits, and reporting.</p>
              </div>
              <div>
                <strong className="block text-[#1A73E8] mb-1">What happens if TDS is not deducted?</strong>
                <p className="text-sm leading-relaxed">Failure to deduct TDS where required may result in additional tax exposure, interest, penalties, or other consequences under the applicable tax laws.</p>
              </div>
              <div>
                <strong className="block text-[#1A73E8] mb-1">What happens if TDS is deposited late?</strong>
                <p className="text-sm leading-relaxed">Late deposits may attract interest and other consequences in accordance with Nepal's tax legislation.</p>
              </div>
            </div>
          </div>

          {/* Related Calculators & Disclaimer */}
          <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-6 sm:p-8 mt-8 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-3">Related Calculators</h3>
            <p className="text-sm text-[#3C4043] mb-4">If you are calculating other Nepal taxes, you may also find these calculators useful:</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Nepal Income Tax Calculator', 'Nepal Salary Tax Calculator', 'Nepal VAT Calculator', 'Nepal Vehicle Tax Calculator', 'Nepal Capital Gains Tax Calculator', 'Nepal SSF Calculator', 'Nepal EPF Calculator', 'Nepal CIT Calculator', 'Nepal Bonus Tax Calculator'].map((calc, i) => (
                <span key={i} className="px-3 py-1.5 bg-white border border-[#DADCE0] text-[#1A73E8] text-[13px] font-semibold rounded-full hover:bg-[#E8F0FE] transition-colors cursor-pointer">{calc}</span>
              ))}
            </div>

            <div className="pt-6 border-t border-[#DADCE0]">
              <h4 className="text-[11px] font-black text-[#5F6368] uppercase tracking-wider mb-2">Disclaimer</h4>
              <p className="text-[12px] text-[#5F6368] leading-relaxed mb-2">
                The Nepal TDS Calculator is intended to help estimate Tax Deducted at Source (TDS) for supported FY 2083/84 payment categories. Although every effort has been made to align the calculator with the applicable provisions of Nepal's Income Tax Act, Finance Act, Income Tax Rules, and official IRD guidance, the calculator is provided for informational and educational purposes only. It does not constitute legal, tax, or accounting advice.
              </p>
              <p className="text-[12px] text-[#5F6368] leading-relaxed">
                Users should verify transaction-specific requirements using the latest legislation, official IRD publications, and professional advice where appropriate. In the event of any conflict between this page and the applicable law, the legislation and official government guidance prevail.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 9: Official Rate Directory */}
      <section id="rate-directory" className="scroll-mt-24 space-y-8 pt-8 border-t border-[#DADCE0]">
        <h2 className="text-2xl md:text-3xl font-black text-[#202124] tracking-tight">
          Official Nepal TDS Rate Directory (FY 2083/84)
        </h2>

        <div className="prose prose-blue max-w-none text-[#3C4043] leading-relaxed space-y-4">
          <p>
            The following directory summarizes the withholding tax (TDS) categories supported by this calculator for FY 2083/84. Use this table to identify the appropriate payment category before performing a calculation. The applicable legal treatment depends on the nature of the payment, the recipient, and the relevant provisions of Nepal's Income Tax Act and Finance Act.
          </p>
        </div>

        {/* Large Data Table */}
        <div className="overflow-hidden border border-[#DADCE0] rounded-xl shadow-sm bg-white">
          <div className="bg-[#E8F0FE] border-b border-[#D2E3FC] px-6 py-4 flex items-center gap-2">
            <Landmark className="w-5 h-5 text-[#1A73E8]" />
            <h3 className="text-[13px] font-black text-[#1A73E8] uppercase tracking-wider">Official TDS Rate Directory</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap lg:whitespace-normal">
              <thead>
                <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                  <th className="px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Payment Category</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Standard Rate</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Resident</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Non-Resident</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Tax Treatment*</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Primary Legal Basis</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-[#3C4043] divide-y divide-[#F1F3F4]">
                {[
                  ['House & Land Rent', '10%', '✓', '✓', 'Final / Advance (depends on recipient)', 'Section 88 / 89'],
                  ['Vehicle Hire (qualifying VAT invoice)', '1.5%', '✓', '✓', 'Advance', 'Applicable withholding provisions'],
                  ['Consultancy Services', '1.5% or 15%', '✓', '✓', 'Advance / Final (depends on recipient and law)', 'Section 88 / 89'],
                  ['Contract Payments', '1.5%', '✓', '✓', 'Advance', 'Section 89'],
                  ['International Competitive Bidding', '5%', '✓', '✓', 'Advance', 'Section 89'],
                  ['Commercial Commission', '15%', '✓', '✓', 'Advance', 'Section 88 / 89'],
                  ['Broker Commission', '15%', '✓', '✓', 'Advance', 'Section 88'],
                  ['Dividend', '5%', '✓', '✓', 'Final Withholding', 'Section 88 / 88A'],
                  ['Interest – Individual', '6%', '✓', '✓', 'Final Withholding', 'Section 88'],
                  ['Interest – Corporate', '15%', '✓', '✓', 'Advance', 'Section 88'],
                  ['Royalty', '15%', '✓', '✓', 'Advance / Final', 'Section 88 / 89'],
                  ['Insurance Commission', '20%', '✓', '✓', 'Final Withholding', 'Section 92'],
                  ['Meeting Allowance', '15%', '✓', '✓', 'Final Withholding (where applicable)', 'Section 88'],
                  ['Ride-sharing Platform Payout', '1%', '✓', '—', 'Advance', 'Finance Act FY 2083/84']
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[#F8F9FA] transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#202124]">{row[0]}</td>
                    <td className="px-4 py-3 font-bold text-[#1A73E8]">{row[1]}</td>
                    <td className="px-4 py-3 text-[#188038] font-bold">{row[2]}</td>
                    <td className="px-4 py-3 text-[#188038] font-bold">{row[3]}</td>
                    <td className="px-4 py-3">{row[4]}</td>
                    <td className="px-4 py-3 text-[#5F6368]">{row[5]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-[#F8F9FA] px-4 py-3 border-t border-[#DADCE0]">
            <p className="text-[11px] text-[#5F6368] italic">*Tax treatment shown is a simplified guide. Always review the applicable legislation and transaction details before determining the final legal treatment.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-4 tracking-tight">How to Use This Directory</h3>
            <ol className="space-y-4">
              {[
                'Identify the true nature of the payment.',
                'Match the payment with the correct category in the table above.',
                'Review whether any special conditions (such as VAT registration or recipient type) affect the withholding treatment.',
                'Use the calculator to estimate the withholding amount.'
              ].map((step, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-[#3C4043]">
                  <div className="w-6 h-6 rounded-full bg-[#E8F0FE] text-[#1A73E8] font-bold flex items-center justify-center shrink-0 text-xs">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed mt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <p className="text-[13px] text-[#5F6368] italic mt-4 pl-9">
              Correct classification is essential because two payments of the same value may have different withholding outcomes depending on the applicable category.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-[#202124] mb-4 tracking-tight">Quick Reference by Industry</h3>
            <div className="overflow-hidden border border-[#DADCE0] rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                    <th className="px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Industry</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-[#5F6368] uppercase tracking-wider">Common TDS Categories</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-[#3C4043] divide-y divide-[#F1F3F4]">
                  {[
                    ['Real Estate', 'House & Land Rent, Brokerage'],
                    ['Construction', 'Contract Payments, Consultancy'],
                    ['Manufacturing', 'Consultancy, Commission, Royalty'],
                    ['Banking & Finance', 'Interest, Dividend'],
                    ['Insurance', 'Insurance Commission'],
                    ['Information Technology', 'Consultancy, Royalty, Technical Services'],
                    ['Retail & Trading', 'Commission, Brokerage, Rent'],
                    ['Logistics', 'Vehicle Hire, Transport Contracts'],
                    ['Digital Platforms', 'Ride-sharing Platform Payouts']
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-[#F8F9FA] transition-colors">
                      <td className="px-4 py-2 font-semibold text-[#202124]">{row[0]}</td>
                      <td className="px-4 py-2">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="prose prose-blue max-w-none text-[#3C4043] leading-relaxed space-y-6 pt-4">
          <h3 className="text-xl font-bold text-[#202124] tracking-tight mb-4">Payment Categories Explained</h3>
          
          <div className="space-y-4">
            <div>
              <strong className="block text-[#202124] mb-1">House & Land Rent</strong>
              <p className="text-[14px]">Applies to payments for the use of land, office space, buildings, warehouses, and similar property. The applicable withholding treatment depends on the recipient and the relevant provisions of the Income Tax Act.</p>
            </div>
            <div>
              <strong className="block text-[#202124] mb-1">Consultancy Services</strong>
              <p className="text-[14px]">Applies to professional advisory services such as management consulting, engineering advice, legal consultancy, accounting, audit, and similar professional engagements. The implemented calculator reflects the supported FY 2083/84 withholding scenarios.</p>
            </div>
            <div>
              <strong className="block text-[#202124] mb-1">Contract Payments</strong>
              <p className="text-[14px]">Applies to qualifying construction, installation, maintenance, infrastructure, and other contract-based work. Users should classify payments based on the substance of the contract rather than its title.</p>
            </div>
            <div>
              <strong className="block text-[#202124] mb-1">Commission and Brokerage</strong>
              <p className="text-[14px]">Commission generally relates to payments for sales or agency services, while brokerage applies to intermediary services such as securities or property transactions. These categories should not be confused with salary or consultancy payments.</p>
            </div>
            <div>
              <strong className="block text-[#202124] mb-1">Interest and Dividend</strong>
              <p className="text-[14px]">Interest applies to qualifying income earned from deposits, loans, or other financial arrangements. Dividend applies to profit distributions made by companies to shareholders. Each has its own withholding treatment under the Income Tax Act.</p>
            </div>
            <div>
              <strong className="block text-[#202124] mb-1">Royalty</strong>
              <p className="text-[14px]">Royalty includes payments for the use of intellectual property such as trademarks, patents, software licences, copyrights, and similar rights. Businesses should review licence agreements carefully before selecting this category.</p>
            </div>
            <div>
              <strong className="block text-[#202124] mb-1">Insurance Commission</strong>
              <p className="text-[14px]">The FY 2083/84 Finance Act introduced an updated withholding treatment for qualifying insurance commission paid to resident natural person insurance agents. Insurance companies should ensure that payment systems reflect the updated rate.</p>
            </div>
            <div>
              <strong className="block text-[#202124] mb-1">Ride-sharing Platform Payments</strong>
              <p className="text-[14px]">Qualifying platform operators are required to deduct Advance Tax from eligible payouts to drivers or service providers. Businesses operating digital platforms should review their payment systems to ensure compliance with the current requirements.</p>
            </div>
          </div>

          {/* Key Takeaway */}
          <div className="border-l-4 border-[#F57C00] pl-5 py-2 my-8">
            <h4 className="text-sm font-black text-[#202124] uppercase tracking-wider mb-2">Key Takeaway</h4>
            <p className="text-sm text-[#3C4043] leading-relaxed">
              The Official Nepal TDS Rate Directory provides a consolidated reference for the payment categories and withholding rates supported by this calculator. Before estimating TDS, users should first identify the correct payment category, review any applicable conditions, and then use the calculator to determine the withholding amount. Proper classification is the foundation of accurate TDS compliance.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
