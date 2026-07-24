import React from 'react';

export default function TdsSeoContent() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      {/* SECTION 1 */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-black text-[#202124] tracking-tight mb-6">
          What is Tax Deducted at Source (TDS) in Nepal?
        </h2>
        <div className="prose prose-blue max-w-none text-[#3C4043] leading-relaxed space-y-4">
          <p>
            Tax Deducted at Source (TDS) is a withholding tax mechanism under Nepal's Income Tax Act where a person or organisation making certain types of payments is legally required to deduct a prescribed percentage of tax before paying the remaining amount to the recipient. Instead of collecting tax only at the end of the financial year, the Government receives tax at the time income is earned, improving tax compliance and reducing tax evasion.
          </p>
          <p>
            The responsibility for deducting TDS generally falls on the payer, often referred to as the withholding agent. After deducting the applicable amount, the withholding agent must deposit the tax with the Inland Revenue Department (IRD), maintain proper records, and issue supporting documentation where required. Depending on the type of payment and the recipient, the deducted amount may either be treated as Advance Tax that can later be adjusted against the recipient's annual tax liability or as a Final Withholding Tax where no further income tax is payable on that income.
          </p>
          <p>
            TDS applies to a wide range of payments including rent, consultancy services, contract payments, commissions, brokerage, dividends, interest, royalties, insurance commissions, meeting allowances, transport services, professional fees, and several other categories specified by Nepal's tax laws. The applicable rate depends on factors such as the payment category, the recipient's status, and the relevant provisions of the Income Tax Act and Finance Act.
          </p>
          <p>
            Although TDS reduces the amount paid to the recipient immediately, it does not always represent the recipient's final tax liability. In many cases, especially for businesses and professionals, the deducted amount is treated as an advance payment of income tax and is adjusted when filing the annual tax return. Understanding the applicable rate, payment category, and compliance requirements is therefore essential for both payers and recipients.
          </p>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left border-collapse border border-[#DADCE0] bg-white rounded-lg shadow-sm">
            <thead>
              <tr className="bg-[#F8F9FA]">
                <th className="border border-[#DADCE0] px-4 py-3 text-xs font-bold text-[#5F6368] uppercase tracking-wider">Term</th>
                <th className="border border-[#DADCE0] px-4 py-3 text-xs font-bold text-[#5F6368] uppercase tracking-wider">Meaning</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#3C4043]">
              <tr>
                <td className="border border-[#DADCE0] px-4 py-3 font-semibold text-[#202124]">Tax Deducted at Source (TDS)</td>
                <td className="border border-[#DADCE0] px-4 py-3">Tax withheld before making a payment to the recipient.</td>
              </tr>
              <tr className="bg-[#F8F9FA]">
                <td className="border border-[#DADCE0] px-4 py-3 font-semibold text-[#202124]">Withholding Agent</td>
                <td className="border border-[#DADCE0] px-4 py-3">Person or organisation responsible for deducting and depositing TDS.</td>
              </tr>
              <tr>
                <td className="border border-[#DADCE0] px-4 py-3 font-semibold text-[#202124]">Recipient</td>
                <td className="border border-[#DADCE0] px-4 py-3">Individual or organisation receiving the payment after TDS deduction.</td>
              </tr>
              <tr className="bg-[#F8F9FA]">
                <td className="border border-[#DADCE0] px-4 py-3 font-semibold text-[#202124]">Inland Revenue Department (IRD)</td>
                <td className="border border-[#DADCE0] px-4 py-3">Government authority responsible for tax administration in Nepal.</td>
              </tr>
              <tr>
                <td className="border border-[#DADCE0] px-4 py-3 font-semibold text-[#202124]">Advance Tax</td>
                <td className="border border-[#DADCE0] px-4 py-3">TDS that can generally be adjusted against the recipient's annual income tax liability, subject to the applicable law.</td>
              </tr>
              <tr className="bg-[#F8F9FA]">
                <td className="border border-[#DADCE0] px-4 py-3 font-semibold text-[#202124]">Final Withholding Tax</td>
                <td className="border border-[#DADCE0] px-4 py-3">TDS that generally settles the tax obligation on that specific income where the law provides final withholding treatment.</td>
              </tr>
              <tr>
                <td className="border border-[#DADCE0] px-4 py-3 font-semibold text-[#202124]">Resident</td>
                <td className="border border-[#DADCE0] px-4 py-3">Taxpayer treated as resident under Nepal's Income Tax Act.</td>
              </tr>
              <tr className="bg-[#F8F9FA]">
                <td className="border border-[#DADCE0] px-4 py-3 font-semibold text-[#202124]">Non-Resident</td>
                <td className="border border-[#DADCE0] px-4 py-3">Taxpayer treated as non-resident under Nepal's Income Tax Act.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-[#FFF8E1] border border-[#FFE082] rounded-lg p-5">
          <h4 className="text-xs font-bold text-[#F57C00] uppercase tracking-wider mb-2">IMPORTANT NOTICE</h4>
          <p className="text-sm text-[#616161] leading-relaxed">
            Not every payment in Nepal is subject to the same TDS rate. The applicable withholding depends on the payment category, the recipient's status, the relevant legal provision, and whether the deduction is treated as Advance Tax or Final Withholding Tax. Always determine the correct payment category before calculating TDS.
          </p>
        </div>
      </section>
    </div>
  );
}
