import React from 'react';
import { SEOContent } from './types';

export const nepalSEO: Record<string, SEOContent> = {
  'nepal-land': {
    title: "Nepal Land Area Converter | Aana, Ropani, Bigha to Sq. Ft Lab",
    description: "The definitive systematic resource for Nepal&apos;s unique land measurement system. Convert Ropani, Aana, Paisa, Daam and Bigha, Kattha, Dhur with 1500+ words of depth.",
    howToUse: {
      steps: [
        "System Selection: Choose between the 'Hilly' system (Ropani-Aana) or the 'Terai' system (Bigha-Kattha).",
        "Input Values: Enter the measurements into the respective fields (e.g., 2 Ropani, 4 Aana).",
        "Unit Normalization: The engine automatically converts input to a base Square Foot value.",
        "Cross-System Mapping: View the equivalent values in the alternate Nepali system (e.g., Ropani to Bigha).",
        "Metric Integration: Analyze the land area in Square Meters and Square Kilometers for legal documentation.",
        "Precision Audit: Review the final breakdown to ensure all units (like Daam and Dhur) are accounted for."
      ]
    },
    formula: {
      title: "The Land Area Axiom",
      description: "Nepal uses two distinct systems based on geography. The Hilly system is Ropani-based, while the Terai system is Bigha-based. Both are normalized against the Square Foot for modern real estate transactions.",
      raw: "1 Ropani = 16 Aana = 5476 Sq. Ft\n1 Bigha = 20 Kattha = 72900 Sq. Ft"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Nepal&apos;s Land Measurement Systems</h2>
        
        <div className="bg-[#f8f9fa] border-2 border-[#dadce0] rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1a73e8] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#1a73e8] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Geospatial Intelligence Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#5f6368] uppercase tracking-tighter">
             <a href="#hilly" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>01.</span> Hilly System (Ropani-Aana-Paisa-Daam)</a>
             <a href="#terai" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>02.</span> Terai System (Bigha-Kattha-Dhur)</a>
             <a href="#conversions" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>03.</span> Cross-System Conversion Logic</a>
             <a href="#metric" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>04.</span> Metric (Sq. Meter) Integration</a>
             <a href="#legal" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>05.</span> Malpot & Legal Documentation Standards</a>
             <a href="#errors" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>06.</span> Avoiding Common Measurement Errors</a>
             <a href="#history" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>07.</span> History of Land Reform in Nepal</a>
             <a href="#precision" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>08.</span> Precision in High-Value Real Estate</a>
             <a href="#digital" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>09.</span> Digital Mapping & GIS Trends</a>
          </div>
        </div>

        <section id="hilly" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. The Hilly System: Ropani-Aana Framework</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            In the Kathmandu Valley and the hilly regions of Nepal, land is measured using the Ropani system. This hierarchical structure is exceptionally precise, breaking down into four distinct tiers: Ropani, Aana, Paisa, and Daam.
          </p>
          <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm mb-8">
            <table className="w-full text-left text-xs bg-white">
              <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                <tr>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Unit</th>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Equivalent (Higher Unit)</th>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Sq. Feet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dadce0]">
                <tr><td className="p-5 font-black">1 Ropani</td><td className="p-5">16 Aana</td><td className="p-5">5476</td></tr>
                <tr><td className="p-5 font-black">1 Aana</td><td className="p-5">4 Paisa</td><td className="p-5">342.25</td></tr>
                <tr><td className="p-5 font-black">1 Paisa</td><td className="p-5">4 Daam</td><td className="p-5">85.56</td></tr>
                <tr><td className="p-5 font-black">1 Daam</td><td className="p-5">-</td><td className="p-5">21.39</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="terai" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">2. The Terai System: Bigha-Kattha-Dhur</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            The southern plains (Terai) of Nepal use a different system influenced by ancestral agricultural practices. This system uses larger base units, primarily the Bigha, which is nearly 13 times larger than a Ropani.
          </p>
          <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm">
            <table className="w-full text-left text-xs bg-white">
              <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                <tr>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Unit</th>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Equivalent (Higher Unit)</th>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Sq. Feet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dadce0]">
                <tr><td className="p-5 font-black">1 Bigha</td><td className="p-5">20 Kattha</td><td className="p-5">72900</td></tr>
                <tr><td className="p-5 font-black">1 Kattha</td><td className="p-5">20 Dhur</td><td className="p-5">3645</td></tr>
                <tr><td className="p-5 font-black">1 Dhur</td><td className="p-5">-</td><td className="p-5">182.25</td></tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/nepal-salary/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Salary</a>
                <a href="/calculator/nepal-stocks/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Stocks</a>
                <a href="/calculator/property-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Property Tax</a>
                <a href="/calculator/property-registration/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Property Registration</a>
                <a href="/calculator/nepal-tds/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Tds</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Real Estate Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/property-tax/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Tax Auditor</a>
             <a href="/calculator/loan-emi/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">EMI Planner</a>
             <a href="/calculator/property-registration/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Malpot Suite</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "How many Aana are in one Ropani?", answer: "There are exactly 16 Aana in one Ropani of land." },
      { question: "What is the size of 1 Bigha in square feet?", answer: "1 Bigha is equivalent to 72,900 square feet." },
      { question: "Which land system is used in Kathmandu?", answer: "The Ropani-Aana system (Hilly system) is the standard measurement used in Kathmandu and surrounding hilly districts." },
      { question: "How many Kattha make one Bigha?", answer: "Exactly 20 Kattha constitute one Bigha of land in the Terai system." },
      { question: "How to convert square feet to Ropani-Aana?", answer: "To convert square feet to the hilly system, divide the total area by 5476 to get Ropani, then the remainder by 342.25 to get Aana, and so on. Our calculator automates this with 100% precision." },
      { question: "Is there a difference between government and private land measurement?", answer: "Legally, both follow the same Ropani/Bigha systems, but cadastral maps (government records) use precise mathematical coordinates that our engine mirrors." }
    ]
  },



  'nepal-salary': {
    title: "Nepal Salary Calculator 2081/82 | Institutional Payroll Lab",
    description: "The definitive systematic resource for payroll in Nepal. Calculate net salary with 1500+ words of depth on EPF, CIT, SSF, and Income Tax slabs.",
    howToUse: {
      steps: [
        "Base Salary Entry: Input your gross monthly salary as per your appointment letter.",
        "Social Security Toggle: Select between SSF (31% model) or traditional EPF/CIT/Gratuity.",
        "Deduction Mapping: Define your voluntary CIT contributions and other monthly deductions.",
        "Marital Calibration: Select Individual or Married status for accurate tax slab application.",
        "Insurance Credit: Input your annual life and health insurance premiums.",
        "Net Disbursement: Analyze the final 'Take-Home' salary after all statutory and tax deductions."
      ]
    },
    formula: {
      title: "The Net Disbursement Axiom",
      description: "Net Salary is the result of Gross Income minus Retirement Contributions (EPF/CIT/SSF) and applicable Income Tax based on current IRD slabs.",
      raw: "Net Salary = Gross - (EPF + CIT + SSF) - Income Tax"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Salary & Payroll Architecture in Nepal</h2>
        
        <div className="bg-[#f3e5f5] border-2 border-[#9c27b0]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#9c27b0] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#4a148c] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Human Capital Finance Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#4a148c] uppercase tracking-tighter">
             <a href="#ssf" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>01.</span> SSF Model: The 31% Breakdown</a>
             <a href="#traditional" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>02.</span> Traditional EPF/PF/CIT Structure</a>
             <a href="#tax" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>03.</span> Salary Tax Slabs FY 2081/82</a>
             <a href="#allowances" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>04.</span> Taxable vs Non-Taxable Allowances</a>
             <a href="#bonus" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>05.</span> Dashain Bonus & Gratuity Accruals</a>
             <a href="#female" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>06.</span> Women's Tax Rebate (10% Rule)</a>
             <a href="#medical" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>07.</span> Medical & Insurance Tax Credits</a>
             <a href="#remote" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>08.</span> Remote Area (A/B/C/D) Allowances</a>
             <a href="#legal" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>09.</span> Labor Law 2074: Minimum Wage Compliance</a>
          </div>
        </div>

        <section id="ssf" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. The SSF Revolution: 31% Total Contribution</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            The Social Security Fund (SSF) has unified several retirement and insurance benefits into a single 31% contribution model, mandatory for the formal private sector.
          </p>
          <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm mb-8">
            <table className="w-full text-left text-xs bg-white">
              <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                <tr>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Contributor</th>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Rate (%)</th>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Components</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dadce0]">
                <tr><td className="p-5 font-black">Employer</td><td className="p-5 font-bold">20%</td><td className="p-5">10% PF + 8.33% Gratuity + 1.67% Accident/Medical</td></tr>
                <tr><td className="p-5 font-black">Employee</td><td className="p-5 font-bold">11%</td><td className="p-5">10% PF + 1% Other Benefits</td></tr>
                <tr className="bg-[#f8f9fa]"><td className="p-5 font-black">Total</td><td className="p-5 font-bold">31%</td><td className="p-5">Comprehensive Retirement & Insurance</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="allowances" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">2. Taxable vs Non-Taxable components</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            Not all money you receive is taxed. Understanding the distinction between base salary, dearness allowance, and reimbursed expenses is key to accurate payroll management.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
             <div className="p-8 bg-[#e8f0fe] rounded-lg border border-[#1a73e8]/20">
                <h4 className="text-xs font-black uppercase text-[#1a73e8] mb-4">Taxable</h4>
                <ul className="text-[11px] text-[#3c4043] space-y-2">
                   <li>• Basic Salary & Dearness Allowance</li>
                   <li>• Overtime & Performance Bonuses</li>
                   <li>• Dashain Bonus (Festival Allowance)</li>
                   <li>• Leave Encashment Payouts</li>
                </ul>
             </div>
             <div className="p-8 bg-[#f1f8e9] rounded-lg border border-[#188038]/20">
                <h4 className="text-xs font-black uppercase text-[#188038] mb-4">Exempt (Under conditions)</h4>
                <ul className="text-[11px] text-[#3c4043] space-y-2">
                   <li>• Fuel & Communication Reimbursements</li>
                   <li>• Remote Area Allowances (Slab based)</li>
                   <li>• Medical Expense Reclaim (via Tax Credit)</li>
                   <li>• Daily Travel Allowance (Per Diem)</li>
                </ul>
             </div>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mb-4">
             <h3 className="text-md font-bold text-[#202124] mb-2">Official Data Reference</h3>
             <p className="text-sm text-slate-600">Calculations are modeled according to the guidelines of: <a href="https://ird.gov.np" target="_blank" rel="nofollow noopener" className="text-[#1a0dab] underline font-medium">Inland Revenue Department (IRD) Nepal</a>.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/nepal-stocks/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Stocks</a>
                <a href="/calculator/property-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Property Tax</a>
                <a href="/calculator/property-registration/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Property Registration</a>
                <a href="/calculator/nepal-tds/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Tds</a>
                <a href="/calculator/nepal-provident-fund/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Provident Fund</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Payroll Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/income-tax/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Tax Auditor</a>
             <a href="/calculator/nepal-provident-fund/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">EPF/CIT Lab</a>
             <a href="/calculator/gratuity-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Gratuity Suite</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the take-home salary after SSF in Nepal?", answer: "If you are in SSF, 11% of your basic salary is deducted. The employer adds 20%. Your 'take-home' is your gross minus the 11% and the calculated income tax based on the 801/82 slabs." },
      { question: "Is the Dashain bonus taxable in Nepal?", answer: "Yes, the Dashain bonus (Festival Allowance) is considered part of your annual taxable income and is subject to the same progressive slabs." },
      { question: "How does the 10% female tax rebate work?", answer: "For female employees filing as 'Individual', the IRD provides a 10% discount on the final calculated income tax amount. Our calculator applies this automatically." },
      { question: "What is the maximum CIT contribution allowed?", answer: "The maximum limit for all retirement contributions (EPF + CIT + SSF) is 1/3rd of your total income or Rs. 5 Lakhs, whichever is lower." },
      { question: "How is overtime calculated under Nepal Labor Act?", answer: "As per the Labor Act 2074, overtime should be paid at 1.5 times the regular hourly rate for work exceeding 8 hours a day or 48 hours a week." },
      { question: "What is the difference between net salary and basic salary?", answer: "Basic salary is the fixed amount before any allowances or deductions. Net salary (take-home) is the final amount after adding allowances and subtracting retirement funds and taxes." }
    ]
  },

  'nepal-stocks': {
    title: "NEPSE Stock Calculator | Broker Commission & Profit Lab",
    description: "The definitive NEPSE trading utility for Nepal. Calculate broker commissions, SEBON fees, DP charges, and CGT with 1500+ words of depth and holding-period logic.",
    howToUse: {
      steps: [
        "Transaction Definition: Choose between 'Buy' or 'Sell' to apply the correct fee structure.",
        "Share Data Entry: Input the number of shares and the transaction price per share.",
        "Commission Slab: The engine automatically applies SEBON-mandated broker commission (0.27% to 0.36%).",
        "Tax Calibration: For sell transactions, select your holding period (Short Term 7.5% vs Long Term 5%).",
        "WACC Integration: Input your WACC price for sell orders to calculate accurate Capital Gains Tax (CGT).",
        "Institutional Breakdown: View the net amount receivable or payable including DP fees and SEBON charges."
      ]
    },
    formula: {
      title: "The NEPSE Transaction Algorithm",
      description: "NEPSE trading involves a multi-layered fee structure. Our engine aggregates these costs sequentially: Broker Commission + SEBON Fee (0.015%) + DP Fee (Rs. 25) + CGT (on profits).",
      raw: "Net Profit = (Selling Price - Buying Price) - (Buy Costs + Sell Costs) - CGT"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: NEPSE Trading & Commission in Nepal</h2>
        
        <div className="bg-[#1a1a2e] border-2 border-[#1a73e8]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1a73e8] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#4fc3f7] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Stock Market Masterclass</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
             <a href="#commissions" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>01.</span> SEBON Broker Commission Tiers</a>
             <a href="#cgt" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>02.</span> Capital Gains Tax (5% vs 7.5%)</a>
             <a href="#wacc" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>03.</span> WACC Calculation Theory</a>
             <a href="#fees" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>04.</span> DP & SEBON Regulatory Fees</a>
             <a href="#bonus" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>05.</span> Bonus & Right Share Adjustment</a>
             <a href="#holding" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>06.</span> Holding Period Verification Logic</a>
             <a href="#meroshare" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>07.</span> MeroShare & TMS Integration</a>
             <a href="#dividends" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>08.</span> Cash Dividend Taxation (5% TDS)</a>
             <a href="#strategies" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>09.</span> Trading Psychology & Exit Disciplines</a>
          </div>
        </div>

        <section id="commissions" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. SEBON Broker Commission Tiers</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            Brokerage costs in Nepal are strictly regulated by the <strong>Securities Board of Nepal (SEBON)</strong>. The commission rate is progressive, meaning the percentage you pay decreases as your transaction volume increases.
          </p>
          <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm mb-8">
            <table className="w-full text-left text-xs bg-white">
              <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                <tr>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Transaction Volume</th>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Commission Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dadce0]">
                <tr>
                  <td className="p-5 text-[#3c4043]">Up to Rs. 50,000</td>
                  <td className="p-5 text-[#1a73e8] font-bold">0.36%</td>
                </tr>
                <tr>
                  <td className="p-5 text-[#3c4043]">Rs. 50,001 to Rs. 5,00,000</td>
                  <td className="p-5 text-[#3c4043]">0.33%</td>
                </tr>
                <tr>
                  <td className="p-5 text-[#3c4043]">Rs. 5,00,001 to Rs. 20,00,000</td>
                  <td className="p-5 text-[#3c4043]">0.31%</td>
                </tr>
                <tr>
                  <td className="p-5 text-[#3c4043]">Above Rs. 20,00,000</td>
                  <td className="p-5 text-[#188038] font-bold">0.27%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-[#5f6368] font-bold italic">
            Note: A fixed SEBON regulatory fee of 0.015% is applied to every transaction in addition to the broker commission.
          </p>
        </section>

        <section id="cgt" className="mb-16 p-10 bg-[#fff3e0] border border-[#ffb74d]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#e65100] mb-4">2. Capital Gains Tax (CGT): The Holding Period Policy</h3>
          <p className="text-sm text-[#3c4033] leading-relaxed mb-6">
            Nepal differentiates between "Short-Term" and "Long-Term" investors for tax purposes. This policy is designed to encourage stable investments in the NEPSE market.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-6 bg-white border border-[#ffccbc] rounded-2xl shadow-sm">
                <h4 className="text-xs font-black uppercase text-[#e65100] tracking-widest mb-2">Short-Term (7.5%)</h4>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Applied to profits from shares held for <strong>less than 365 days</strong>. Most active traders fall into this category.</p>
             </div>
             <div className="p-6 bg-white border border-[#ffccbc] rounded-2xl shadow-sm">
                <h4 className="text-xs font-black uppercase text-[#188038] tracking-widest mb-2">Long-Term (5.0%)</h4>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Applied to profits from shares held for <strong>more than 365 days</strong>. This is a final tax and is deducted automatically by the TMS/Broker.</p>
             </div>
          </div>
        </section>

        <section id="wacc" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">3. WACC: The Foundation of Profit Calculation</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            Before selling shares, you must calculate and confirm the <strong>Weighted Average Cost of Capital (WACC)</strong> on MeroShare. This value represents your average buying price including commissions and taxes. If you fail to calculate WACC, the system may default to your base price, potentially leading to higher tax liabilities.
          </p>
          <div className="p-8 bg-[#1a1a2e] text-[#202124] rounded-lg shadow-sm">
             <h4 className="text-lg font-black text-[#4fc3f7] mb-4">The WACC Formula:</h4>
             <p className="text-xs text-slate-400 leading-relaxed mb-4">
                WACC = (Total Purchase Value + Total Buying Commissions) / Total Number of Shares.
             </p>
             <p className="text-xs font-black uppercase tracking-widest text-[#202124] border-l-4 border-[#1a73e8] pl-4">
                Rule: WACC must be updated after every new purchase or bonus/right share adjustment.
             </p>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/property-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Property Tax</a>
                <a href="/calculator/property-registration/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Property Registration</a>
                <a href="/calculator/nepal-tds/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Tds</a>
                <a href="/calculator/nepal-provident-fund/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Provident Fund</a>
                <a href="/calculator/nepal-vehicle-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Vehicle Tax</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Stock Market Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/nepse-wacc/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">WACC Auditor</a>
             <a href="/calculator/sip-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Mutual Fund Lab</a>
             <a href="/calculator/cagr-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Portfolio Growth</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the broker commission on a Rs. 10 Lakh trade in Nepal?", answer: "For a transaction of Rs. 10,00,000, the commission rate is 0.31%, which amounts to Rs. 3,100. Additionally, a SEBON fee of 0.015% (Rs. 150) and a DP fee of Rs. 25 will apply." },
      { question: "How is CGT calculated if I sell shares at a loss?", answer: "Capital Gains Tax is only applied to the profit. If you sell at a loss, no CGT is deducted. Furthermore, you cannot currently offset losses from one trade against profits from another in the same fiscal year for individuals in Nepal." },
      { question: "What is the DP charge in NEPSE?", answer: "The Depository Participant (DP) fee is a fixed charge of Rs. 25 per company per day, regardless of the number of shares sold. This is paid to the institution holding your DEMAT account." },
      { question: "When should I update my WACC on MeroShare?", answer: "You must update your WACC after every purchase of shares or after receiving bonus/right shares. This ensures that the TMS calculates your CGT accurately when you sell." },
      { question: "Is there any tax on cash dividends from NEPSE companies?", answer: "Yes. Cash dividends are subject to a 5% Final Withholding Tax (TDS). This is usually deducted at the source by the company before the dividend is credited to your bank account." },
      { question: "Can I trade on NEPSE without a TMS account?", answer: "No. To buy or sell shares on NEPSE, you need a Trade Management System (TMS) account provided by a licensed stockbroker, along with a DEMAT account and a linked bank account." }
    ]
  },

  'property-tax': {
    title: "Real Estate CGT Calculator Nepal 2081/82 | Institutional Asset Lab",
    description: "The definitive systematic resource for real estate tax planning in Nepal. Calculate Capital Gains Tax (CGT) with 1500+ words of depth, Malpot valuation logic, and holding-period optimization.",
    howToUse: {
      steps: [
        "Transaction Entry: Input the Purchase Price and Selling Price of the property in NPR.",
        "Duration Mapping: Define the holding period in years to determine the applicable CGT slab.",
        "Valuation Audit: Compare the actual transaction value against the government's minimum Malpot valuation.",
        "Deduction Allocation: Include verifiable costs like registration fees and legal documentation.",
        "Tax Liability View: Analyze the net capital gain and the final tax payable to the IRD.",
        "Compliance Check: Review the documentation required for the final tax clearance certificate."
      ]
    },
    formula: {
      title: "The Real Estate Capital Gain Axiom",
      description: "CGT in Nepal is calculated on the net profit from the sale. The rate depends on whether the owner is an individual or a company, and the duration the asset was held.",
      raw: "CGT = (Selling Price - Buying Price - Verifiable Expenses) x Applicable Rate (%)"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Real Estate Capital Gains Tax in Nepal</h2>
        
        <div className="bg-[#fff3e0] border-2 border-[#ffb74d]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#fb8c00] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#e65100] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Real Estate Strategy Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#5d4037] uppercase tracking-tighter">
             <a href="#rates" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>01.</span> Holding Period Slabs: 5% vs 7.5%</a>
             <a href="#malpot" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>02.</span> Malpot vs Actual Valuation Conflict</a>
             <a href="#exemptions" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>03.</span> First-Home & Inheritance Exemptions</a>
             <a href="#documentation" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>04.</span> Verifiable Costs & Deductions</a>
             <a href="#corporate" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>05.</span> Corporate CGT (15% Standard)</a>
             <a href="#reporting" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>06.</span> IRD Filing & PAN Synchronization</a>
             <a href="#agri" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>07.</span> Agricultural Land Tax Policy</a>
             <a href="#urban" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>08.</span> Urban vs Rural Tax Disparities</a>
             <a href="#reinvestment" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>09.</span> Capital Reinvestment Tax Shields</a>
          </div>
        </div>

        <section id="rates" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. Holding Period Slabs: The Timing Strategy</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            Nepal&apos;s Income Tax Act mandates a differential tax rate for real estate based on the duration of ownership. This is designed to discourage short-term speculation while rewarding long-term homeownership.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
             <div className="p-8 bg-white border-l-8 border-[#e65100] rounded-lg shadow-sm">
                <h4 className="text-xs font-black uppercase text-[#e65100] tracking-widest mb-2">Held &lt; 5 Years</h4>
                <p className="text-sm font-black text-[#202124] mb-2">7.5% CGT</p>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Considered a short-term gain. Applied if you sell a property within 5 years of the registration date.</p>
             </div>
             <div className="p-8 bg-white border-l-8 border-[#188038] rounded-lg shadow-sm">
                <h4 className="text-xs font-black uppercase text-[#188038] tracking-widest mb-2">Held &gt; 5 Years</h4>
                <p className="text-sm font-black text-[#202124] mb-2">5% CGT</p>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Considered a long-term gain. This lower rate applies once you cross the 5-year ownership threshold.</p>
             </div>
          </div>
        </section>

        <section id="malpot" className="mb-16 p-10 bg-[#e8eaf6] border border-[#3f51b5]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#1a237e] mb-4">2. Malpot Valuation: The Government Baseline</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            In Nepal, every piece of land has a <strong>Minimum Government Valuation</strong> set by the Malpot office. The CGT is calculated based on the <strong>Actual Sale Price</strong> or the <strong>Malpot Valuation</strong>, whichever is higher.
          </p>
          <div className="p-6 bg-[#f8f9fa]0 rounded-2xl border border-white">
             <p className="text-xs font-bold text-[#1a237e] uppercase mb-2">Institutional Protocol:</p>
             <p className="text-[11px] text-[#5f6368]">
               "If you sell a property for Rs. 50 Lakhs but the Malpot valuation is Rs. 60 Lakhs, the tax authorities will charge CGT based on Rs. 60 Lakhs. Our calculator helps you identify this gap before you finalize the deal."
             </p>
          </div>
        </section>

        <section id="exemptions" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">4. Exemptions & Social Thresholds</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            Not all property sales attract tax. The IRD provides specific relief for small-scale transactions and residential relocations under strict conditions.
          </p>
          <ul className="space-y-4">
             <li className="p-5 bg-[#f1f8e9] rounded-2xl flex items-start gap-4">
                <span className="w-6 h-6 rounded-full bg-[#33691e] flex items-center justify-center text-[#202124] text-[10px] font-bold">01</span>
                <p className="text-[11px] text-[#33691e] font-bold leading-relaxed">Transactions below Rs. 10 Lakhs are generally exempt from CGT reporting for individuals.</p>
             </li>
             <li className="p-5 bg-[#f1f8e9] rounded-2xl flex items-start gap-4">
                <span className="w-6 h-6 rounded-full bg-[#33691e] flex items-center justify-center text-[#202124] text-[10px] font-bold">02</span>
                <p className="text-[11px] text-[#33691e] font-bold leading-relaxed">Agricultural land in rural areas (outside municipal limits) may qualify for special tax-free status.</p>
             </li>
          </ul>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/property-registration/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Property Registration</a>
                <a href="/calculator/nepal-tds/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Tds</a>
                <a href="/calculator/nepal-provident-fund/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Provident Fund</a>
                <a href="/calculator/nepal-vehicle-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Vehicle Tax</a>
                <a href="/calculator/nepse-wacc/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepse Wacc</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Real Estate Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/property-registration/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Registration Lab</a>
             <a href="/calculator/loan-emi/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Mortgage Planner</a>
             <a href="/calculator/nepal-land/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Land Area Suite</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the CGT rate if I sell my house after 6 years?", answer: "Since the property was held for more than 5 years, the applicable Capital Gains Tax rate is 5% on the net profit." },
      { question: "Can I deduct the cost of house renovation from my profit?", answer: "Yes. Verifiable construction and renovation costs (backed by VAT invoices) can be deducted from the sale price to reduce the taxable capital gain." },
      { question: "Who is responsible for paying CGT in a property deal?", answer: "The seller is legally responsible for paying the Capital Gains Tax. It is usually settled at the Malpot office during the ownership transfer process." },
      { question: "Is there CGT on inherited property?", answer: "Inheritance itself is not taxed. However, when the heir eventually sells the inherited property, CGT is calculated based on the gain from the original acquisition value or the base valuation at the time of inheritance." },
      { question: "How does the 'Panic Sale' affect CGT in Nepal?", answer: "Even in a panic sale below market value, the tax authorities will calculate CGT based on the minimum government valuation if it is higher than your selling price." },
      { question: "Do companies pay the same CGT as individuals?", answer: "No. Companies and businesses pay a flat 15% Capital Gains Tax on property sales in Nepal, regardless of the holding period." }
    ]
  },

  'property-registration': {
    title: "Property Registration Fee Nepal 2081/82 | Malpot & Stamp Duty Lab",
    description: "Calculate land and house registration fees in Nepal. Includes provincial stamp duty, Bagmati province rates, social security tax, and Malpot valuation logic.",
    howToUse: {
      steps: [
        "Province Selection: Choose the province (e.g., Bagmati, Lumbini) as rates vary by local legislation.",
        "Gender Calibration: Define the owner's gender (Discounts apply for female ownership).",
        "Transaction Value: Enter the higher value between the sale price and Malpot valuation.",
        "Stamp Duty Mapping: Analyze the fixed and percentage-based stamp duty requirements.",
        "Social Security Tax: Account for the mandatory 0.01% or fixed social welfare contribution.",
        "Total Disbursement: Review the final amount required at the Malpot office for ownership transfer."
      ]
    },
    formula: {
      title: "The Registration Cost Matrix",
      description: "Registration fees are a combination of Provincial Stamp Duty + Local Infrastructure Tax + Social Security Tax. These are calculated as a percentage of the valuation.",
      raw: "Total Fee = (Valuation x Stamp Duty %) + Social Security Tax + Local Service Fee"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Property Registration & Malpot Fees in Nepal</h2>
        
        <div className="bg-[#f3e5f5] border-2 border-[#ce93d8]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#9c27b0] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#4a148c] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Real Estate Compliance Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#4a148c] uppercase tracking-tighter">
             <a href="#bagmati" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>01.</span> Bagmati Province Specific Rates</a>
             <a href="#female" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>02.</span> Female Ownership Rebates (25-35%)</a>
             <a href="#stamp" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>03.</span> Stamp Duty & Local Surcharge Math</a>
             <a href="#urban" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>04.</span> Metropolitan vs Village Council Rates</a>
             <a href="#social" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>05.</span> Social Security & Infrastructure Tax</a>
             <a href="#apartment" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>06.</span> Apartment & Housing Colony Fees</a>
             <a href="#mortgage" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>07.</span> Bank Mortgage (Dristibandhak) Costs</a>
             <a href="#inheritance" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>08.</span> Bakaspatra vs Anshabanda Fees</a>
             <a href="#deadlines" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>09.</span> Payment Timelines & Penalty Risks</a>
          </div>
        </div>

        <section id="bagmati" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. Provincial Disparities: The Bagmati Standard</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            Following Nepal&apos;s federalization, property registration fees are determined by Provincial Finance Acts. Bagmati Province, containing Kathmandu, typically has the most complex and tiered fee structure.
          </p>
          <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm mb-8">
            <table className="w-full text-left text-xs bg-white">
              <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                <tr>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Ownership Type</th>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Bagmati Rate (Urban)</th>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Other Provinces</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dadce0]">
                <tr>
                  <td className="p-5 font-black text-[#3c4043]">Male Individual</td>
                  <td className="p-5 text-[#3c4043]">5% Stamp Duty</td>
                  <td className="p-5 text-[#3c4043]">4% - 4.5%</td>
                </tr>
                <tr>
                  <td className="p-5 font-black text-[#3c4043]">Female Individual</td>
                  <td className="p-5 text-[#188038] font-bold">3.75% (25% Rebate)</td>
                  <td className="p-5 text-[#3c4043]">3% - 3.5%</td>
                </tr>
                <tr>
                  <td className="p-5 font-black text-[#3c4043]">Senior Citizen/Disabled</td>
                  <td className="p-5 text-[#1a73e8] font-bold">50% Rebate (Limit apply)</td>
                  <td className="p-5 text-[#3c4043]">Varies by local body</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="female" className="mb-16 p-10 bg-[#e1f5fe] border border-[#03a9f4]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#01579b] mb-4">2. The Female Ownership Multiplier</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            The Government of Nepal promotes women's property rights through significant tax rebates. Depending on the geographical location, a female buyer can save 25% to 35% on the total registration fee.
          </p>
          <div className="p-8 bg-white border border-[#bbdefb] rounded-2xl shadow-sm">
             <p className="text-xs font-black text-[#01579b] uppercase mb-4 tracking-widest text-center">Empowerment Logic</p>
             <p className="text-[11px] text-[#5f6368] leading-relaxed text-center">
               "In certain remote village councils, the rebate for female ownership can go up to 50%. Our calculator includes these local body permutations to give you the most accurate fee projection."
             </p>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/nepal-tds/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Tds</a>
                <a href="/calculator/nepal-provident-fund/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Provident Fund</a>
                <a href="/calculator/nepal-vehicle-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Vehicle Tax</a>
                <a href="/calculator/nepse-wacc/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepse Wacc</a>
                <a href="/calculator/gratuity-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Gratuity Calculator</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Malpot Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/property-tax/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">CGT Auditor</a>
             <a href="/calculator/nepal-land/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Land Area Lab</a>
             <a href="/calculator/loan-emi/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Closing Cost Plan</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the property registration fee for Bagmati Province in 2081/82?", answer: "For individual male owners in urban areas, the rate is 5% stamp duty plus local infrastructure and social security taxes. Females receive a 25% rebate on this stamp duty." },
      { question: "Does the size of the land affect the registration fee?", answer: "No. The fee is primarily based on the valuation (Malpot or Transaction value). However, different rates might apply for residential vs agricultural land types." },
      { question: "What is 'Anshabanda' registration fee in Nepal?", answer: "Anshabanda (Property Partition) between family members attracts a significantly lower fee, often a fixed nominal amount or a very small percentage compared to a commercial sale." },
      { question: "Can I pay the registration fee online?", answer: "Most Malpot offices in Nepal now use a computerized system. While initial forms can be filled via the 'PEMS' portal, the final payment is usually made at the bank counter inside the Malpot office." },
      { question: "What is 'Social Security Tax' on land registration?", answer: "It is a nominal tax (typically 0.01%) or a fixed fee (Rs. 100-500) added to the registration cost to fund social welfare programs in Nepal." },
      { question: "Is there a discount for joint ownership (Husband & Wife)?", answer: "Yes. Many local bodies provide a fixed discount (often Rs. 100 to Rs. 500) on the registration certificate fee to encourage joint ownership between spouses." }
    ]
  },

  'nepal-tds': {
    title: "TDS Calculator Nepal 2081/82 | Institutional Withholding Tax Lab",
    description: "Calculate Tax Deducted at Source (TDS) for services, rent, and consultancy in Nepal. Updated for FY 2081/82 with 1.5%, 10%, and 15% IRD slab logic.",
    howToUse: {
      steps: [
        "Payment Type: Select the category (e.g., Professional Service, House Rent, Interest).",
        "Gross Payment: Input the total invoice amount before any tax deductions.",
        "Recipient Status: Specify if the payee is PAN/VAT registered or an individual.",
        "Institutional Slabs: View the applicable TDS percentage as mandated by the IRD.",
        "Net Disbursement: Analyze the final amount to be paid to the vendor and the tax to be deposited.",
        "Compliance Audit: Review the deadline for depositing the TDS at the Integrated Tax System."
      ]
    },
    formula: {
      title: "The Withholding Algorithm",
      description: "TDS is a final or non-final tax deducted by the payer. The formula is straightforward, but the complexity lies in selecting the correct regulatory slab.",
      raw: "TDS Amount = Gross Payment x (TDS Rate / 100)"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Tax Deducted at Source (TDS) in Nepal</h2>
        
        <div className="bg-[#e0f2f1] border-2 border-[#80cbc4]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#009688] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#00695c] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Compliance Intelligence Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#00695c] uppercase tracking-tighter">
             <a href="#services" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>01.</span> Professional Services: The 1.5% Rule</a>
             <a href="#rent" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>02.</span> House Rent TDS (10% Mandate)</a>
             <a href="#consultancy" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>03.</span> Consultancy & Commissions (15%)</a>
             <a href="#deadlines" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>04.</span> IRD Deposit Deadlines (Monthly)</a>
             <a href="#etds" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>05.</span> E-TDS Filing & Verification Process</a>
             <a href="#final" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>06.</span> Final vs Non-Final Withholding</a>
             <a href="#nonpan" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>07.</span> Penalty for Non-PAN Payments</a>
             <a href="#certificate" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>08.</span> Issuing TDS Certificates to Vendors</a>
             <a href="#exemptions" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>09.</span> VAT vs TDS Sequence Logic</a>
          </div>
        </div>

        <section id="services" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. Professional Services: The VAT-Linked TDS</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            For businesses registered in VAT, payments for professional services or supply of goods attract a <strong>1.5% TDS</strong>. This is not a final tax but a prepayment that the vendor can claim against their annual income tax liability.
          </p>
          <div className="p-8 border-2 border-dashed border-[#dadce0] rounded-lg mb-8">
            <p className="text-xs font-black text-[#202124] uppercase mb-2">Institutional Protocol:</p>
            <p className="text-[11px] text-[#5f6368] leading-relaxed">
              "TDS must be calculated on the <strong>Base Amount</strong> (excluding VAT). If an invoice is for Rs. 113 (Rs. 100 + 13% VAT), the 1.5% TDS is calculated on Rs. 100, resulting in Rs. 1.50 deduction."
            </p>
          </div>
        </section>

        <section id="rent" className="mb-16 p-10 bg-[#fffde7] border border-[#fbc02d]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#f57f17] mb-4">2. House Rent TDS: The 10% Policy</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            Payments for house rent to individuals attract a flat <strong>10% TDS</strong>. This is a final withholding tax for the individual landlord, meaning they do not need to include this in their personal income tax return if it&apos;s their only source of rental income.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-6 bg-white border border-[#fff9c4] rounded-2xl shadow-sm">
                <h4 className="text-xs font-black uppercase text-[#f57f17] tracking-widest mb-2">Residential Rent</h4>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Mandatory 10% TDS. Must be deposited under the landlord's PAN at the IRD.</p>
             </div>
             <div className="p-6 bg-white border border-[#fff9c4] rounded-2xl shadow-sm">
                <h4 className="text-xs font-black uppercase text-[#188038] tracking-widest mb-2">Commercial Rent</h4>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Subject to VAT (13%) if the landlord is registered, plus the 10% TDS on the base amount.</p>
             </div>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/nepal-provident-fund/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Provident Fund</a>
                <a href="/calculator/nepal-vehicle-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Vehicle Tax</a>
                <a href="/calculator/nepse-wacc/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepse Wacc</a>
                <a href="/calculator/gratuity-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Gratuity Calculator</a>
                <a href="/calculator/nepal-vat/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Vat</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Tax Compliance Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/income-tax/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Personal Tax Lab</a>
             <a href="/calculator/nepal-salary/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Payroll Auditor</a>
             <a href="/calculator/nepal-vat/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">VAT Calculator</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the TDS rate for professional services in Nepal?", answer: "The standard rate for professional services provided by VAT-registered entities is 1.5%. For individuals or non-VAT entities, it can be 15% depending on the nature of the contract." },
      { question: "When should TDS be deposited in Nepal?", answer: "TDS must be deposited within 25 days of the end of the Nepali month in which the payment was made. Failure to do so attracts interest and penalties from the IRD." },
      { question: "Is TDS calculated on the VAT amount?", answer: "No. According to IRD regulations, TDS is always calculated on the base amount of the invoice, excluding the 13% Value Added Tax." },
      { question: "What is 'E-TDS'?", answer: "E-TDS is the electronic filing of TDS details on the IRD portal. Payers must upload the details of each vendor and the tax deducted to ensure the vendor can claim the tax credit." },
      { question: "What happens if I don&apos;t deduct TDS?", answer: "If you fail to deduct or deposit TDS, the IRD will hold you liable for the tax amount plus a 15% annual interest and potential fines for non-compliance." },
      { question: "Is TDS on house rent a final tax?", answer: "Yes, for individuals receiving rental income, the 10% TDS deducted by the tenant is considered a final withholding tax." }
    ]
  },

  'nepal-provident-fund': {
    title: "EPF Nepal Calculator 2081/82 | Retirement & Interest Lab",
    description: "Calculate Employee Provident Fund (EPF) savings and interest in Nepal. Compare EPF vs SSF vs CIT with 1500+ words of retirement architecture depth.",
    howToUse: {
      steps: [
        "Salary Mapping: Input your basic salary (Statutory deductions are 10% of basic).",
        "Contribution Ratio: Confirm the 10% (Employee) + 10% (Employer) model.",
        "Interest Calibration: Input the current annual interest rate (Set by KSK/EPF board).",
        "Tenure Projection: Define the number of years for contribution accumulation.",
        "Withdrawal Logic: Analyze the 70% loan eligibility and final maturity corpus.",
        "Retirement Audit: Review the total tax-free withdrawal limit upon retirement."
      ]
    },
    formula: {
      title: "The Compounding Retirement Axiom",
      description: "EPF grows through monthly contributions and annual interest compounding. Our engine uses the KSK-standard daily-basis interest calculation logic.",
      raw: "Total Balance = Σ (Monthly Contribution) + Accrued Interest"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Employee Provident Fund (EPF) in Nepal</h2>
        
        <div className="bg-[#fff3e0] border-2 border-[#ffb74d]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#fb8c00] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#e65100] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Retirement Architecture Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#5d4037] uppercase tracking-tighter">
             <a href="#structure" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>01.</span> 10%+10% Contribution Model</a>
             <a href="#ksk" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>02.</span> Karmachari Sanchaya Kosh (KSK) Rules</a>
             <a href="#loans" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>03.</span> Loan Against EPF (The 70% Rule)</a>
             <a href="#interest" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>04.</span> Annual Interest & Profit Sharing</a>
             <a href="#tax" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>05.</span> Tax Benefits (80L Deduction)</a>
             <a href="#withdrawal" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>06.</span> Retirement vs Resignation Withdrawal</a>
             <a href="#ssf_vs_epf" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>07.</span> EPF vs SSF: The Critical Choice</a>
             <a href="#insurance" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>08.</span> EPF Accident & Medical Insurance</a>
             <a href="#cit" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>09.</span> Adding CIT for Extra Tax Shield</a>
          </div>
        </div>

        <section id="structure" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. The Statutory Framework: 10% + 10%</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            In Nepal, the Employee Provident Fund (EPF) is a mandatory retirement scheme for government employees and a standard benefit for the private sector. Both the employee and the employer contribute an amount equal to <strong>10% of the Basic Salary</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
             <div className="p-6 bg-white border border-[#dadce0] rounded-2xl shadow-sm">
                <p className="text-xs font-bold text-[#202124] mb-2 text-center">Employee Share (10%)</p>
                <p className="text-[11px] text-[#5f6368] leading-relaxed text-center">Deducted from your monthly basic salary before tax.</p>
             </div>
             <div className="p-6 bg-white border border-[#dadce0] rounded-2xl shadow-sm">
                <p className="text-xs font-bold text-[#202124] mb-2 text-center">Employer Share (10%)</p>
                <p className="text-[11px] text-[#5f6368] leading-relaxed text-center">Added by the company as a retirement benefit.</p>
             </div>
          </div>
        </section>

        <section id="loans" className="mb-16 p-10 bg-[#f1f8e9] border border-[#81c784]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#33691e] mb-4">2. The 70% Loan Rule: Liquidity in Savings</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            Unlike many other savings, EPF in Nepal allows you to borrow against your own contributions. You can typically take a "Sanchayakarta Loan" for up to <strong>70% of your total balance</strong>.
          </p>
          <div className="bg-white p-8 rounded-lg border border-[#c8e6c9]">
             <h4 className="text-sm font-black text-[#33691e] mb-2 uppercase">Institutional Benefits:</h4>
             <ul className="text-[11px] text-[#5f6368] space-y-2">
                <li>• Lower interest rates compared to commercial personal loans.</li>
                <li>• No hidden processing fees for contributors.</li>
                <li>• Direct deduction from future contributions or easy monthly installments.</li>
             </ul>
          </div>
        </section>

        <section id="ssf_vs_epf" className="mb-16 border-l-4 border-[#1a73e8] pl-10">
          <h3 className="text-2xl font-black text-[#202124] mb-4">4. EPF vs SSF: Navigating the New Mandate</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            With the introduction of the Social Security Fund (SSF), many private-sector employees in Nepal have a choice between staying with EPF or migrating to SSF.
          </p>
          <div className="p-8 bg-[#1a1a2e] text-[#202124] rounded-lg">
             <p className="text-xs text-slate-400 mb-4 italic">"EPF offers higher liquidity through loans and a lump-sum payout at the end. SSF focuses more on pension and comprehensive medical/accident insurance. Our calculator helps you project the long-term wealth difference between these two paths."</p>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/nepal-vehicle-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Vehicle Tax</a>
                <a href="/calculator/nepse-wacc/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepse Wacc</a>
                <a href="/calculator/gratuity-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Gratuity Calculator</a>
                <a href="/calculator/nepal-vat/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Vat</a>
                <a href="/calculator/nepali-date/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepali Date</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Retirement Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/gratuity-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Gratuity Suite</a>
             <a href="/calculator/sip-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Wealth Accumulation</a>
             <a href="/calculator/income-tax/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Tax Shield Audit</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the current interest rate for EPF in Nepal?", answer: "The interest rate is reviewed annually by the Karmachari Sanchaya Kosh board. It typically ranges between 7% and 8.5%, with additional profit-sharing bonuses depending on the fund's performance." },
      { question: "How much can I borrow from my EPF account?", answer: "Contributors can borrow up to 70% of their total accumulated balance as a 'Special Loan' for personal use, housing, or education." },
      { question: "Is EPF contribution mandatory for private companies in Nepal?", answer: "Yes, under the Labor Act 2074, private companies must provide retirement benefits. They can choose either EPF or the Social Security Fund (SSF)." },
      { question: "What are the tax benefits of contributing to EPF?", answer: "Contributions to EPF are deducted from your gross income before tax. This reduces your taxable income, potentially moving you into a lower tax slab." },
      { question: "Can I withdraw my EPF balance before retirement?", answer: "Full withdrawal is generally allowed upon retirement or termination of service. For active employees, partial withdrawals are only possible through the loan facility." },
      { question: "What happens to my EPF if I change jobs?", answer: "Your EPF account is portable. You can continue with the same KSK account number at your new employer, and your previous balance will remain intact and continue to earn interest." }
    ]
  },

  'nepal-vehicle-tax': {
    title: "Vehicle Tax Calculator Nepal 2081/82 | Bluebook Renewal & DoTM Lab",
    description: "The definitive systematic resource for road tax and bluebook renewal in Nepal. Calculate bike and car taxes with 1500+ words of CC-based depth and provincial penalty logic.",
    howToUse: {
      steps: [
        "Vehicle Category: Select between 'Motorbike/Scooter', 'Private Car', or 'Electric Vehicle'.",
        "Engine Capacity: Input the CC (Cubic Capacity) or KW (Kilowatts) for EVs as per your bluebook.",
        "Province Selection: Choose your registration province (e.g., Bagmati, Koshi) for accurate slab application.",
        "Last Renewal Date: Define the last tax payment date to calculate any applicable late-payment penalties.",
        "Insurance Integration: Account for the mandatory Third-Party Insurance cost required for renewal.",
        "Total Disbursement: Review the final amount including road tax, renewal fee, and penal interest."
      ]
    },
    formula: {
      title: "The Road Tax Surcharge Axiom",
      description: "Vehicle tax in Nepal is a fixed annual fee based on engine capacity tiers. Penalties are progressive, increasing based on the number of days past the 90-day grace period.",
      raw: "Total Tax = Annual Slab Rate + (Annual Slab Rate x Penalty %) + Insurance + Renewal Fee"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Vehicle Tax & Bluebook Renewal in Nepal</h2>
        
        <div className="bg-[#e8eaf6] border-2 border-[#3f51b5]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#3f51b5] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#1a237e] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Mobility Compliance Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#1a237e] uppercase tracking-tighter">
             <a href="#bike" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>01.</span> Motorbike & Scooter CC Slabs</a>
             <a href="#car" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>02.</span> Private Car & SUV CC Slabs</a>
             <a href="#ev" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>03.</span> EV Tax Policy (KW vs Battery)</a>
             <a href="#penalties" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>04.</span> Late Payment Penalties (5% to 20%)</a>
             <a href="#bagmati" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>05.</span> Bagmati vs Other Province Disparities</a>
             <a href="#insurance" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>06.</span> Third-Party Insurance Requirements</a>
             <a href="#renewal" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>07.</span> Bluebook Renewal Process Map</a>
             <a href="#online" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>08.</span> TMO Online Payment (Nagarik App)</a>
             <a href="#dotm" className="flex items-center gap-2 hover:text-[#3f51b5] transition-all"><span>09.</span> Federal vs Provincial Jurisdiction</a>
          </div>
        </div>

        <section id="bike" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. Motorbike Slabs: The CC Thresholds</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            In Nepal, motorbike taxes are tiered significantly to discourage high-capacity "superbikes" while keeping commuter bikes affordable. The tax is paid annually at the Transport Management Office (TMO).
          </p>
          <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm mb-8">
            <table className="w-full text-left text-xs bg-white">
              <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                <tr>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Engine Capacity</th>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Annual Tax (Bagmati)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dadce0]">
                <tr>
                  <td className="p-5 text-[#3c4043]">Up to 125cc</td>
                  <td className="p-5 text-[#3c4043] font-bold">Rs. 3,000</td>
                </tr>
                <tr>
                  <td className="p-5 text-[#3c4043]">126cc to 160cc</td>
                  <td className="p-5 text-[#3c4043] font-bold">Rs. 5,000</td>
                </tr>
                <tr>
                  <td className="p-5 text-[#3c4043]">161cc to 250cc</td>
                  <td className="p-5 text-[#3c4043] font-bold">Rs. 9,000</td>
                </tr>
                <tr>
                  <td className="p-5 text-[#3c4043]">251cc to 400cc</td>
                  <td className="p-5 text-[#d93025] font-bold">Rs. 18,000</td>
                </tr>
                <tr>
                  <td className="p-5 text-[#3c4043]">Above 400cc</td>
                  <td className="p-5 text-[#d93025] font-bold">Rs. 30,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="penalties" className="mb-16 p-10 bg-[#fff3e0] border border-[#ffb74d]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#e65100] mb-4">2. Late Payment Penalties: The 90-Day Clock</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            You have 90 days from the expiry of your bluebook to pay the tax without penalty. Once you cross this grace period, the penalty increases in stages.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-6 bg-white rounded-2xl border border-[#ffe0b2] shadow-sm">
                <p className="text-[10px] font-black text-[#e65100] uppercase mb-1">Stage 1</p>
                <p className="text-xs font-bold text-[#202124]">5% Penalty</p>
                <p className="text-[10px] text-[#5f6368] mt-2">Applied for the next 30 days after the grace period.</p>
             </div>
             <div className="p-6 bg-white rounded-2xl border border-[#ffe0b2] shadow-sm">
                <p className="text-[10px] font-black text-[#e65100] uppercase mb-1">Stage 2</p>
                <p className="text-xs font-bold text-[#202124]">10% Penalty</p>
                <p className="text-[10px] text-[#5f6368] mt-2">Applied for the remainder of the fiscal year.</p>
             </div>
             <div className="p-6 bg-[#1a1a2e] text-[#202124] rounded-2xl shadow-sm">
                <p className="text-[10px] font-black text-[#4fc3f7] uppercase mb-1">Stage 3</p>
                <p className="text-xs font-bold">20% Penalty</p>
                <p className="text-[10px] text-slate-400 mt-2">Applied if the renewal is delayed to the next fiscal year.</p>
             </div>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/nepse-wacc/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepse Wacc</a>
                <a href="/calculator/gratuity-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Gratuity Calculator</a>
                <a href="/calculator/nepal-vat/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Vat</a>
                <a href="/calculator/nepali-date/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepali Date</a>
                <a href="/calculator/see-gpa/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">See Gpa</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Bluebook Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/property-tax/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Asset Tax Lab</a>
             <a href="/calculator/nepal-vat/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">VAT Auditor</a>
             <a href="/calculator/income-tax/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Tax Strategy</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "Is vehicle tax different in each province of Nepal?", answer: "Yes. Since the federalization, vehicle tax is a provincial subject. While rates are similar, Bagmati Province (Kathmandu) and Lumbini Province often have different slabs and penalty calculations." },
      { question: "How is the tax for electric vehicles (EV) calculated in Nepal?", answer: "EV tax is calculated based on the Kilowatt (KW) rating of the motor. Currently, EVs enjoy significantly lower road tax compared to petrol/diesel vehicles as an incentive for clean energy." },
      { question: "What documents are required for bluebook renewal?", answer: "You need the original Bluebook, a valid Third-Party Insurance policy, and the tax payment receipt from the previous year. If paying online, you must still visit the TMO to get the physical stamp." },
      { question: "Can I pay my vehicle tax through the Nagarik App?", answer: "Yes. The Nagarik App and several digital wallets like eSewa/Khalti now support vehicle tax payment for Bagmati and Gandaki provinces, with more being added." },
      { question: "What is the penalty if I miss the 90-day grace period?", answer: "The penalty starts at 5% for the first month after the grace period, increases to 10% for the rest of the fiscal year, and hits a maximum of 20% if delayed to the following fiscal year." },
      { question: "Do I need to pay road tax if my vehicle is not in use?", answer: "If a vehicle is not in use, you can 'suspend' the bluebook at the TMO to avoid annual taxes. However, you must pay all outstanding dues and a small suspension fee." }
    ]
  },

  'nepse-wacc': {
    title: "NEPSE WACC Calculator | Share Profit & Price Adjustment Lab",
    description: "Calculate Weighted Average Cost of Capital (WACC) for NEPSE. Handle bonus shares, right shares, and merger adjustments with 1500+ words of SEBON-standard depth.",
    howToUse: {
      steps: [
        "Purchase Log: Input your buying transactions including quantity and price (including broker commission).",
        "Bonus Integration: Add any bonus shares received (Note: Price is usually adjusted to Rs. 100 or Rs. 0).",
        "Right Share Mapping: Account for right shares at the face value (typically Rs. 100).",
        "Merger Calibration: Adjust the cost base if the company underwent a merger or acquisition.",
        "WACC Calculation: Analyze the final average cost per share required for MeroShare confirmation.",
        "Tax Readiness: Review the 'Profit/Loss' projection based on current market price vs calculated WACC."
      ]
    },
    formula: {
      title: "The Weighted Average Axiom",
      description: "WACC is the mathematical mean of all acquisition costs divided by total holdings. SEBON requires investors to confirm this manually on MeroShare before selling.",
      latex: "WACC = \\frac{\\sum (Quantity \\times Price) + Commissions}{Total Quantity}",
      raw: "WACC = (Total Investment + Buying Costs) / Total Shares"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: NEPSE WACC & Price Adjustment in Nepal</h2>
        
        <div className="bg-[#1a1a2e] border-2 border-[#1a73e8]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1a73e8] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#4fc3f7] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Equity Architecture Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
             <a href="#logic" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>01.</span> WACC: The 100% Accuracy Mandate</a>
             <a href="#bonus" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>02.</span> Bonus Share Adjustment (Rs. 100 Rule)</a>
             <a href="#right" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>03.</span> Right Share Impact on Average Cost</a>
             <a href="#mergers" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>04.</span> Swap Ratios & Merger Cost-Base</a>
             <a href="#meroshare" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>05.</span> My WACC Confirmation Process</a>
             <a href="#cgt" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>06.</span> CGT Calculation on Adjusted Base</a>
             <a href="#errors" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>07.</span> Correcting Manual WACC Entry Errors</a>
             <a href="#holding" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>08.</span> Holding Period vs WACC Synchronization</a>
             <a href="#strategies" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>09.</span> Portfolio Optimization via WACC Dilution</a>
          </div>
        </div>

        <section id="logic" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. Why WACC Matters: The SEBON Enforcement</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            In the modern NEPSE ecosystem (TMS & MeroShare), the responsibility of declaring the "Buying Cost" lies with the investor. This is done through the <strong>My WACC</strong> module. If you sell shares without confirming WACC, the system may assume a default price (often the face value), leading to incorrect and usually higher Capital Gains Tax (CGT).
          </p>
          <div className="p-8 border-2 border-dashed border-[#dadce0] rounded-lg mb-8">
            <p className="text-xs font-black text-[#202124] uppercase mb-2">Institutional Warning:</p>
            <p className="text-[11px] text-[#5f6368] leading-relaxed">
              "Once you confirm WACC on MeroShare, it is final for that transaction. Our calculator ensures you compute the exact value including commission and SEBON fees to avoid overpaying tax or facing IRD audits."
            </p>
          </div>
        </section>

        <section id="bonus" className="mb-16 p-10 bg-[#e3f2fd] border border-[#2196f3]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#0d47a1] mb-4">2. Bonus Shares: The Price Dilution Math</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            When a company issues bonus shares, your total number of shares increases, but your total investment stays the same. This <strong>dilutes</strong> your average cost per share.
          </p>
          <div className="bg-white p-8 rounded-2xl border border-[#bbdefb]">
             <p className="text-xs font-black text-[#0d47a1] uppercase mb-4 tracking-widest text-center">The Rs. 100 Adjustment</p>
             <p className="text-[11px] text-[#5f6368] leading-relaxed text-center italic">
               "For WACC purposes in Nepal, bonus shares are often accounted at their face value of Rs. 100 for tax base calculation, although their market value might be much higher. Our engine handles this regulatory nuance automatically."
             </p>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mb-4">
             <h3 className="text-md font-bold text-[#202124] mb-2">Official Data Reference</h3>
             <p className="text-sm text-slate-600">Calculations are modeled according to the guidelines of: <a href="https://www.nepalstock.com" target="_blank" rel="nofollow noopener" className="text-[#1a0dab] underline font-medium">Nepal Stock Exchange (NEPSE)</a>.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/gratuity-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Gratuity Calculator</a>
                <a href="/calculator/nepal-vat/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Vat</a>
                <a href="/calculator/nepali-date/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepali Date</a>
                <a href="/calculator/see-gpa/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">See Gpa</a>
                <a href="/calculator/lok-sewa-age/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Lok Sewa Age</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Equity Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/nepal-stocks/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Trading Lab</a>
             <a href="/calculator/sip-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Mutual Fund Suite</a>
             <a href="/calculator/cagr-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Growth Auditor</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "Do I need to calculate WACC for IPO shares?", answer: "Yes. Even for IPO shares, you must confirm the WACC (usually Rs. 100) on MeroShare before you can sell them on the secondary market (TMS)." },
      { question: "How do I calculate WACC for shares received during a merger?", answer: "In a merger, you use the 'Swap Ratio'. If Company A merges into Company B at a 1:0.8 ratio, your cost base is adjusted by dividing your original cost by 0.8. This is a complex calculation handled by our 'Merger Mode'." },
      { question: "What happens if I enter the wrong WACC on MeroShare?", answer: "If you have already confirmed the wrong WACC, you cannot change it yourself. you must contact your DP (Depository Participant) or Broker to request a manual correction, which can be a lengthy process." },
      { question: "Does WACC include broker commission?", answer: "Yes. The 'My WACC' calculation in Nepal&apos;s TMS/MeroShare system includes the purchase price plus all buying costs like broker commission and SEBON fees." },
      { question: "Why is my WACC lower than my buying price?", answer: "This usually happens if you have received bonus shares or right shares. Since these shares are acquired at a lower cost (Rs. 0 or Rs. 100), they pull down your overall weighted average cost." },
      { question: "Is WACC calculated separately for each company?", answer: "Yes. WACC is calculated on a per-scrip basis. Every company in your portfolio has its own independent weighted average cost." }
    ]
  },

  'gratuity-calculator': {
    title: "Gratuity Calculator Nepal 2081/82 | Labor Act 2074 Compliance Lab",
    description: "Calculate retirement gratuity benefits in Nepal. Accurate mapping for 8.33% statutory contributions, service duration, and tax slabs under Labor Act 2074.",
    howToUse: {
      steps: [
        "Basic Salary Entry: Input your last drawn monthly basic salary (excluding allowances).",
        "Service Duration: Define the total years and months of continuous employment.",
        "Regulatory Logic: Choose between 'Labor Act 2074' (Standard) or 'Custom Policy'.",
        "Statutory Calculation: Analyze the 8.33% annual basic salary accumulation.",
        "Tax Shield Audit: Check the applicable tax on the final gratuity payout (15% for non-pensioners).",
        "Maturity View: Review the total net gratuity amount payable upon retirement or resignation."
      ]
    },
    formula: {
      title: "The Labor Act 2074 Algorithm",
      description: "Under current Nepal law, gratuity is calculated as 8.33% of the monthly basic salary for every year of service, or a month's salary for every year depending on the specific employment contract.",
      raw: "Gratuity = (Basic Salary x 8.33%) x Months of Service"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Gratuity & Retirement Benefits in Nepal</h2>
        
        <div className="bg-[#f1f8e9] border-2 border-[#81c784]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#81c784] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#1b5e20] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Retirement Compliance Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#1b5e20] uppercase tracking-tighter">
             <a href="#laboract" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>01.</span> Labor Act 2074: The 8.33% Rule</a>
             <a href="#eligibility" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>02.</span> Eligibility: Probation vs Permanent</a>
             <a href="#taxation" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>03.</span> Tax on Gratuity: Slabs & Exemptions</a>
             <a href="#ssf" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>04.</span> SSF Migration: The Gratuity Transfer</a>
             <a href="#termination" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>05.</span> Resignation vs Termination Payouts</a>
             <a href="#bonuses" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>06.</span> Dashain Bonus & Gratuity Sequence</a>
             <a href="#government" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>07.</span> Civil Service (Nijamati) Gratuity Math</a>
             <a href="#private" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>08.</span> Private Sector Accrual Strategies</a>
             <a href="#disputes" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>09.</span> Labor Court: Claiming Unpaid Gratuity</a>
          </div>
        </div>

        <section id="laboract" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. The Statutory Mandate: 8.33% Accumulation</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            Since the implementation of the <strong>Labor Act 2074</strong>, the concept of "waiting 5 years for gratuity" was abolished. Every employee in Nepal is now entitled to gratuity from the first day of their employment. The statutory rate is <strong>8.33% of the basic salary</strong> every month.
          </p>
          <div className="p-8 border-2 border-dashed border-[#dadce0] rounded-lg mb-8">
            <p className="text-xs font-black text-[#202124] uppercase mb-2">Institutional Logic:</p>
            <p className="text-[11px] text-[#5f6368] leading-relaxed">
              "An 8.33% monthly contribution is mathematically equivalent to exactly one month's basic salary per year. This amount must be either deposited in a separate fund (like SSF) or accrued in the company's books for the employee's benefit."
            </p>
          </div>
        </section>

        <section id="ssf" className="mb-16 p-10 bg-[#e8f5e9] border border-[#81c784]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#1b5e20] mb-4">2. SSF and the Gratuity Evolution</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            For companies registered with the <strong>Social Security Fund (SSF)</strong>, the 8.33% gratuity is part of the 31% total contribution. This shift ensures that the gratuity is safe and earns interest, similar to a provident fund.
          </p>
          <div className="bg-white p-8 rounded-2xl border border-[#c8e6c9]">
             <p className="text-xs font-black text-[#2e7d32] uppercase mb-4 tracking-widest text-center">The Transfer Protocol</p>
             <p className="text-[11px] text-[#5f6368] leading-relaxed text-center italic">
               "If you migrate from a traditional gratuity system to SSF, your previous accruals must be transferred to the SSF or paid out. Our calculator handles both legacy and SSF-based gratuity projections."
             </p>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/nepal-vat/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Vat</a>
                <a href="/calculator/nepali-date/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepali Date</a>
                <a href="/calculator/see-gpa/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">See Gpa</a>
                <a href="/calculator/lok-sewa-age/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Lok Sewa Age</a>
                <a href="/calculator/foreign-employment/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Foreign Employment</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Labor Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/nepal-salary/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Payroll Suite</a>
             <a href="/calculator/nepal-provident-fund/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">EPF/PF Auditor</a>
             <a href="/calculator/income-tax/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Tax Strategy</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "Is gratuity mandatory for private companies in Nepal?", answer: "Yes. Under the Labor Act 2074, all employers (even those with only one employee) must provide gratuity benefits starting from the first day of employment." },
      { question: "How much tax is deducted from the final gratuity payment?", answer: "Gratuity is taxed as part of your income. However, for non-pensioners, there is often a 15% flat tax or it is adjusted against your annual income slabs depending on whether it&apos;s a lump-sum retirement payout." },
      { question: "Can I get gratuity if I resign within 1 year?", answer: "Yes. The current law does not require a minimum service period of 5 years. You are entitled to the accrued 8.33% gratuity even if you resign after a few months." },
      { question: "What is the difference between EPF and Gratuity?", answer: "EPF is a contribution from both employee and employer (10%+10%). Gratuity is entirely funded by the employer (8.33% of basic) as a reward for service." },
      { question: "Does the 8.33% apply to the total gross salary?", answer: "No. Statutory gratuity in Nepal is calculated only based on the 'Basic Salary' as defined in your appointment letter, excluding dearness and other allowances." },
      { question: "What happens to my gratuity if the company closes down?", answer: "The Labor Act treats gratuity and other employee benefits as 'Preferential Debts', meaning employees have the first right to the company's assets during liquidation." }
    ]
  },

  'nepal-vat': {
    title: "VAT Calculator Nepal 2081/82 | Institutional IRD Compliance Lab",
    description: "The definitive Value Added Tax (VAT) utility for Nepal. Calculate 13% VAT addition and subtraction with 1500+ words of IRD regulatory depth and audit logic.",
    howToUse: {
      steps: [
        "Base Amount Entry: Input the price of the goods or services excluding tax.",
        "VAT Logic Toggle: Choose 'Add VAT' to find the total bill or 'Remove VAT' to find the base price.",
        "Tax Slab Verification: Confirm the 13% standard rate (Note: Exports are 0%).",
        "Net Calculation: Analyze the total taxable value and the specific VAT amount.",
        "TDS Sequence: Review the impact of the 1.5% professional TDS if applicable to the invoice.",
        "Compliance Audit: Verify the mandatory requirement for a VAT invoice (Tax Invoice) for the transaction."
      ]
    },
    formula: {
      title: "The Value Added Axiom",
      description: "VAT is an indirect tax collected at each stage of the supply chain. In Nepal, the standard rate is 13%, and it is calculated on the net selling price.",
      raw: "Total with VAT = Base Price x 1.13\nBase Price (from Total) = Total / 1.13"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Value Added Tax (VAT) in Nepal</h2>
        
        <div className="bg-[#fce4ec] border-2 border-[#f06292]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f06292] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#880e4f] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Indirect Taxation Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#880e4f] uppercase tracking-tighter">
             <a href="#slabs" className="flex items-center gap-2 hover:text-[#ad1457] transition-all"><span>01.</span> Standard 13% vs Zero-Rated Exports</a>
             <a href="#exempt" className="flex items-center gap-2 hover:text-[#ad1457] transition-all"><span>02.</span> Schedule 1: Tax-Exempt Goods & Services</a>
             <a href="#thresholds" className="flex items-center gap-2 hover:text-[#ad1457] transition-all"><span>03.</span> PAN vs VAT: Registration Thresholds</a>
             <a href="#credit" className="flex items-center gap-2 hover:text-[#ad1457] transition-all"><span>04.</span> Input Tax Credit (ITC) Mechanism</a>
             <a href="#invoices" className="flex items-center gap-2 hover:text-[#ad1457] transition-all"><span>05.</span> Tax Invoice: Mandatory Fields & Format</a>
             <a href="#filing" className="flex items-center gap-2 hover:text-[#ad1457] transition-all"><span>06.</span> Monthly VAT Return (D-03) Deadlines</a>
             <a href="#refunds" className="flex items-center gap-2 hover:text-[#ad1457] transition-all"><span>07.</span> VAT Refund Policy for Diplomats/Exports</a>
             <a href="#penalties" className="flex items-center gap-2 hover:text-[#ad1457] transition-all"><span>08.</span> Late Filing Fines & Interest Rates</a>
             <a href="#software" className="flex items-center gap-2 hover:text-[#ad1457] transition-all"><span>09.</span> IRD Approved Billing Software Rules</a>
          </div>
        </div>

        <section id="slabs" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. The Standard Slab: Why 13%?</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            Nepal has a single-tier VAT system with a standard rate of <strong>13%</strong>. This was introduced to simplify tax administration and reduce evasion. While some countries have multiple slabs, Nepal maintains consistency for all taxable goods and services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
             <div className="p-8 bg-white border border-[#dadce0] rounded-lg shadow-sm">
                <h4 className="text-xs font-black uppercase text-[#ad1457] tracking-widest mb-2">Domestic Supply</h4>
                <p className="text-sm font-black text-[#202124] mb-2">13% Standard Rate</p>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Applied to all services and goods not listed in the exempt schedule.</p>
             </div>
             <div className="p-8 bg-white border border-[#dadce0] rounded-lg shadow-sm">
                <h4 className="text-xs font-black uppercase text-[#188038] tracking-widest mb-2">Exports</h4>
                <p className="text-sm font-black text-[#202124] mb-2">0% (Zero-Rated)</p>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">Exporters can claim back the VAT they paid on inputs, encouraging international trade.</p>
             </div>
          </div>
        </section>

        <section id="thresholds" className="mb-16 p-10 bg-[#fce4ec] border border-[#f06292]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#880e4f] mb-4">2. Registration Thresholds: When to join VAT?</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            Not every business in Nepal needs to register for VAT. The IRD sets annual turnover thresholds to protect small vendors from compliance burdens.
          </p>
          <div className="overflow-hidden rounded-2xl border border-[#f06292]">
            <table className="w-full text-left text-xs bg-white">
               <thead className="bg-[#f06292] text-[#202124]">
                  <tr>
                    <th className="p-4 font-black uppercase">Business Type</th>
                    <th className="p-4 font-black uppercase">VAT Threshold (Annual)</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-[#f8bbd0]">
                  <tr>
                    <td className="p-4 font-bold">Goods only</td>
                    <td className="p-4">Rs. 50 Lakhs</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">Services only</td>
                    <td className="p-4">Rs. 20 Lakhs</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">Mixed (Goods & Services)</td>
                    <td className="p-4">Rs. 20 Lakhs</td>
                  </tr>
               </tbody>
            </table>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mb-4">
             <h3 className="text-md font-bold text-[#202124] mb-2">Official Data Reference</h3>
             <p className="text-sm text-slate-600">Calculations are modeled according to the guidelines of: <a href="https://ird.gov.np" target="_blank" rel="nofollow noopener" className="text-[#1a0dab] underline font-medium">Inland Revenue Department (IRD) Nepal</a>.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/nepali-date/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepali Date</a>
                <a href="/calculator/see-gpa/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">See Gpa</a>
                <a href="/calculator/lok-sewa-age/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Lok Sewa Age</a>
                <a href="/calculator/foreign-employment/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Foreign Employment</a>
                <a href="/calculator/nepse-bonus-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepse Bonus Tax</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">VAT Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/nepal-tds/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">TDS Compliance</a>
             <a href="/calculator/income-tax/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Corporate Tax</a>
             <a href="/calculator/property-registration/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Stamp Duty Suite</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "What goods are exempt from VAT in Nepal?", answer: "Basic necessities like unprocessed food (rice, vegetables), medicines, education services, and financial services are listed in Schedule 1 and are exempt from VAT." },
      { question: "How do I calculate the base price from a VAT-inclusive total?", answer: "To find the base price, divide the total amount by 1.13. For example, if the total is Rs. 1,130, the base price is 1,130 / 1.13 = Rs. 1,000." },
      { question: "Can I claim a VAT refund for personal purchases?", answer: "No. VAT refunds (Input Tax Credit) are only available for VAT-registered businesses for expenses related to their taxable supplies." },
      { question: "Is the VAT rate of 13% subject to change?", answer: "The VAT rate is determined by the annual Financial Act passed by the Parliament. While it has remained at 13% for many years, the government can adjust it during the budget speech." },
      { question: "What is the penalty for late VAT filing in Nepal?", answer: "Late filing attracts a fine of Rs. 1,000 per month (for D-03) plus interest on the outstanding tax amount at 15% per annum." },
      { question: "Do I need a VAT invoice for every purchase?", answer: "For business purposes, you must obtain a 'Tax Invoice' (VAT Invoice) to claim Input Tax Credit. For personal use, a simple PAN invoice or bill is sufficient." }
    ]
  },

  'nepali-date': {
    title: "Nepali Date Converter | BS to AD Astronomical Lab",
    description: "The definitive systematic resource for Bikram Sambat (BS) and Anno Domini (AD) conversion. 1500+ words on Nepal&apos;s unique calendar system and astronomical logic.",
    howToUse: {
      steps: [
        "Conversion Mode: Select between 'BS to AD' or 'AD to BS'.",
        "Date Entry: Input the Year, Month, and Day in the selected calendar format.",
        "Precision Check: The engine accounts for varying month lengths in BS (29 to 32 days).",
        "Epoch Synchronization: View the exact day of the week (Aitabar, Sombar, etc.).",
        "Institutional Context: Analyze the specific year's public holidays and festival alignments.",
        "Result Export: Use the converted date for legal documentation or birthday planning."
      ]
    },
    formula: {
      title: "The Ephemeris Algorithm",
      description: "Unlike the Gregorian calendar, BS months are based on the solar transit through zodiac signs (Surya Siddhanta). Conversion requires a precise look-up table for each year.",
      raw: "AD Date = Reference AD + (Target BS - Reference BS) + Leap Day Adjustments"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Bikram Sambat & Nepali Date Logic</h2>
        
        <div className="bg-[#fff8e1] border-2 border-[#ffca28]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffca28] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#bf360c] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Astronomical Intelligence Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#bf360c] uppercase tracking-tighter">
             <a href="#history" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>01.</span> King Bikramaditya: The Epoch Genesis</a>
             <a href="#solar" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>02.</span> Solar vs Lunar Calendar Dynamics</a>
             <a href="#variable" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>03.</span> Why BS Months Have 29 to 32 Days</a>
             <a href="#conversion" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>04.</span> The 56.7 Year Difference Rule</a>
             <a href="#official" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>05.</span> Government Standard: The Panchanga</a>
             <a href="#leap" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>06.</span> AD Leap Years vs BS Variability</a>
             <a href="#horoscope" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>07.</span> Tithi vs Date: The Ritual Conflict</a>
             <a href="#banking" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>08.</span> Banking & Fiscal Year BS Alignment</a>
             <a href="#utilities" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>09.</span> Python/JS Libraries for Date Logic</a>
          </div>
        </div>

        <section id="solar" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. Astronomical Logic: Solar Transits</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            Nepal&apos;s Bikram Sambat is a <strong>Solar Calendar</strong> based on the sidereal year. Each month begins when the sun enters a new zodiac sign. For example, Baisakh 1 starts when the sun enters Aries (Mesha). Because the transit time varies, the number of days in a Nepali month is not fixed like the Gregorian system.
          </p>
          <div className="p-8 bg-white border-l-8 border-[#ffca28] rounded-lg shadow-sm mb-8">
             <p className="text-xs font-black text-[#202124] uppercase mb-2">Institutional Fact:</p>
             <p className="text-[11px] text-[#5f6368] leading-relaxed">
               "While a Gregorian month is either 28, 29, 30, or 31 days, a Nepali month can be as long as 32 days or as short as 29 days. This requires our converter to use a pre-calculated dataset from the Nepal Panchanga Nirnayak Samiti."
             </p>
          </div>
        </section>

        <section id="conversion" className="mb-16 p-10 bg-[#f3e5f5] border border-[#9c27b0]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#4a148c] mb-4">2. The Conversion Gap: 56 Years, 8 Months</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            Bikram Sambat is approximately <strong>56.7 years ahead</strong> of the Gregorian calendar. However, because the New Year days (Jan 1 vs Baisakh 1) do not align, the difference varies between 56 and 57 years depending on the month.
          </p>
          <div className="bg-white p-6 rounded-2xl border border-[#e1bee7]">
             <ul className="text-[11px] text-[#5f6368] space-y-2">
                <li>• <strong>Baisakh to Poush:</strong> Difference is roughly 57 years.</li>
                <li>• <strong>Magh to Chaitra:</strong> Difference is roughly 56 years.</li>
             </ul>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/see-gpa/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">See Gpa</a>
                <a href="/calculator/lok-sewa-age/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Lok Sewa Age</a>
                <a href="/calculator/foreign-employment/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Foreign Employment</a>
                <a href="/calculator/nepse-bonus-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepse Bonus Tax</a>
                <a href="/calculator/kukl-bill/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Kukl Bill</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Chronology Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/age-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Age Auditor</a>
             <a href="/calculator/lok-sewa-age/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">PSC Eligibility</a>
             <a href="/calculator/date-duration/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Duration Lab</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "Is Nepali date logic based on the moon?", answer: "No. While Nepali festivals (Tithis) follow the lunar calendar, the official government date (Bikram Sambat) is a solar calendar based on the sun's position." },
      { question: "Why does the Nepali New Year fall in mid-April?", answer: "Bikram Sambat begins with the 'Mesha Sankranti' (Sun entering Aries), which historically and astronomically occurs around April 13-15." },
      { question: "Who decides the number of days in each Nepali month?", answer: "The 'Nepal Panchanga Nirnayak Samiti' (Calendar Determination Committee) uses astronomical calculations to prepare the official calendar each year." },
      { question: "How many days are in the year 2081 BS?", answer: "The number of days varies slightly each year. Our converter uses the official committee's data to ensure 100% accuracy for each specific year." },
      { question: "What is the difference between Tithi and Date?", answer: "A Date is a fixed 24-hour period (Solar), while a Tithi is a lunar phase that can start and end at any time of the day, sometimes spanning across two solar dates." },
      { question: "Is Bikram Sambat used outside of Nepal?", answer: "While it is the official calendar of Nepal, variants of Bikram Sambat are also used in parts of India (like Punjab and Haryana) for cultural and religious purposes." }
    ]
  },

  'see-gpa': {
    title: "SEE GPA Calculator | NEB Grading & Academic Audit Lab",
    description: "Calculate Secondary Education Examination (SEE) GPA for Nepal. 1500+ words on NEB grading slabs, stream eligibility, and marks-to-GPA logic.",
    howToUse: {
      steps: [
        "Subject Entry: Input the marks or grades obtained in all 8 subjects.",
        "Credit Hour Calibration: Confirm the credit hours (Standard is 4.0 per subject).",
        "Grading Slab: The system automatically maps marks to grades (A+, A, B+, etc.).",
        "Point Conversion: View the Grade Point (GP) for each individual subject.",
        "Cumulative Calculation: Analyze the final GPA by averaging total Grade Points.",
        "Eligibility Audit: Check if you qualify for Science, Management, or Arts streams based on NEB rules."
      ]
    },
    formula: {
      title: "The GPA Aggregate Axiom",
      description: "GPA is calculated by taking the weighted average of Grade Points obtained in all subjects. Each grade (A+ to E) has a corresponding numerical value (4.0 to 0.8).",
      raw: "GPA = Σ (Grade Point x Credit Hours) / Total Credit Hours"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: SEE Grading System in Nepal</h2>
        
        <div className="bg-[#e3f2fd] border-2 border-[#2196f3]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2196f3] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#0d47a1] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Academic Intelligence Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#0d47a1] uppercase tracking-tighter">
             <a href="#slabs" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>01.</span> NEB Grading Slabs: 90% to 100% (A+)</a>
             <a href="#eligibility" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>02.</span> Stream Eligibility: Science vs Management</a>
             <a href="#practical" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>03.</span> Practical vs Theory Mark Integration</a>
             <a href="#letter" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>04.</span> Letter Grading vs Percentage Myth</a>
             <a href="#improvement" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>05.</span> Grade Improvement Exam Rules</a>
             <a href="#conversion" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>06.</span> GPA to Percentage Conversion Formula</a>
             <a href="#credits" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>07.</span> Understanding Credit Hours in SEE</a>
             <a href="#career" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>08.</span> Beyond SEE: Bridge Course Strategy</a>
             <a href="#legal" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>09.</span> NEB Result Verification Process</a>
          </div>
        </div>

        <section id="slabs" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. The Grading Hierarchy: Decoding A+ to E</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            Nepal&apos;s National Examination Board (NEB) uses a 9-point grading system for SEE. Each grade represents a specific percentage range and carries a Grade Point (GP) used for the final calculation.
          </p>
          <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm mb-8">
            <table className="w-full text-left text-xs bg-white">
              <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                <tr>
                  <th className="p-5 font-black text-[#202124] uppercase">Interval (%)</th>
                  <th className="p-5 font-black text-[#202124] uppercase">Grade</th>
                  <th className="p-5 font-black text-[#202124] uppercase">Grade Point</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dadce0]">
                <tr><td className="p-5">90 - 100</td><td className="p-5 font-bold text-[#188038]">A+</td><td className="p-5">4.0</td></tr>
                <tr><td className="p-5">80 - 90</td><td className="p-5 font-bold text-[#188038]">A</td><td className="p-5">3.6</td></tr>
                <tr><td className="p-5">70 - 80</td><td className="p-5 font-bold text-[#1a73e8]">B+</td><td className="p-5">3.2</td></tr>
                <tr><td className="p-5">60 - 70</td><td className="p-5 font-bold text-[#1a73e8]">B</td><td className="p-5">2.8</td></tr>
                <tr><td className="p-5">50 - 60</td><td className="p-5 font-bold text-[#f29900]">C+</td><td className="p-5">2.4</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="eligibility" className="mb-16 p-10 bg-[#fff3e0] border border-[#ffb74d]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#e65100] mb-4">2. Stream Eligibility: The 2.0 GPA Threshold</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            Simply passing SEE is not enough for all subjects. The NEB mandates specific minimum grades for admission into Grade 11.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-6 bg-white rounded-2xl border border-[#ffe0b2] shadow-sm">
                <h4 className="text-xs font-black uppercase text-[#e65100] mb-2">Science Stream</h4>
                <p className="text-[11px] text-[#5f6368]">Minimum 2.0 GPA. Must have C+ in Science & Math, and C in English, Nepali, Social Studies.</p>
             </div>
             <div className="p-6 bg-white rounded-2xl border border-[#ffe0b2] shadow-sm">
                <h4 className="text-xs font-black uppercase text-[#1a73e8] mb-2">Management/Arts</h4>
                <p className="text-[11px] text-[#5f6368]">Minimum 1.6 GPA. Must have at least D+ in major subjects.</p>
             </div>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/lok-sewa-age/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Lok Sewa Age</a>
                <a href="/calculator/foreign-employment/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Foreign Employment</a>
                <a href="/calculator/nepse-bonus-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepse Bonus Tax</a>
                <a href="/calculator/kukl-bill/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Kukl Bill</a>
                <a href="/calculator/mortgage-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Mortgage Calculator</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Academic Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/gpa-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Semester GPA</a>
             <a href="/calculator/percentage-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Percentage Suite</a>
             <a href="/calculator/nepal-attendance/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Attendance Lab</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the minimum GPA required to study Science in Grade 11?", answer: "Students must achieve an overall GPA of 2.0 and at least a C+ in Science and Mathematics, along with a C in other core subjects." },
      { question: "How is the GPA calculated for subjects with practicals?", answer: "The marks for Theory and Practical are added together to get the total marks, which are then mapped to the grading slab to find the Grade Point." },
      { question: "What happens if I get an 'E' or 'D' in one subject?", answer: "An 'E' or 'D' grade may prevent you from taking admission into certain streams. You can participate in the 'Grade Improvement' (Purak) exams to increase your score." },
      { question: "Can I convert my SEE GPA back to percentage?", answer: "There is no official direct conversion, but a common estimation is to multiply the GPA by 25. For example, 4.0 GPA ≈ 100%, 3.2 GPA ≈ 80%." },
      { question: "What are 'Credit Hours' in the SEE system?", answer: "Each subject is assigned 4 credit hours per week. The GPA is a weighted average where these credit hours act as the weight for the Grade Point." },
      { question: "Who conducts the SEE examinations?", answer: "The examinations are conducted by the National Examination Board (NEB) of Nepal at the provincial level." }
    ]
  },

  'lok-sewa-age': {
    title: "Lok Sewa Age Calculator | PSC Nepal Eligibility Lab",
    description: "Check your exact age for Lok Sewa (PSC) Nepal eligibility. 1500+ words on age limits for Kharidar, Subba, Adhikari, and reservation category relaxations.",
    howToUse: {
      steps: [
        "Birth Date Entry: Input your Date of Birth in BS or AD format.",
        "Target Deadline: Define the application deadline date as per the PSC vacancy notice.",
        "Gender/Category Calibration: Specify if you fall under the 'Women/Disabled/Aadibasi' reservation categories.",
        "Age Computation: The engine calculates your exact age down to the day as of the deadline.",
        "Eligibility Audit: Analyze your eligibility for various posts like Kharidar, Subba, or Officer.",
        "Institutional Advice: Review the maximum age relaxation rules for different civil service tiers."
      ]
    },
    formula: {
      title: "The Eligibility Horizon",
      description: "Lok Sewa age is calculated as of the last day of the application deadline. Unlike other exams, even one day over the limit results in disqualification.",
      raw: "Eligibility Age = Application Deadline Date - Date of Birth"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Lok Sewa (PSC) Age Eligibility in Nepal</h2>
        
        <div className="bg-[#f1f8e9] border-2 border-[#81c784]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#81c784] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#1b5e20] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Public Service Intelligence Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#1b5e20] uppercase tracking-tighter">
             <a href="#limits" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>01.</span> General Age Limits: 18 to 35 Years</a>
             <a href="#women" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>02.</span> Women & Disabled: The 40-Year Relaxation</a>
             <a href="#civil" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>03.</span> Permanent Civil Servants: No Age Limit</a>
             <a href="#tiers" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>04.</span> Kharidar vs Subba vs Adhikari Tiers</a>
             <a href="#health" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>05.</span> Health Service & Teaching: Unique Limits</a>
             <a href="#police" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>06.</span> Nepal Police & Army: Lower Age Thresholds</a>
             <a href="#deadlines" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>07.</span> How PSC Calculates 'Last Day' Deadlines</a>
             <a href="#documents" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>08.</span> Verifying DOB with Citizenship Card</a>
             <a href="#strategies" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>09.</span> Preparation Roadmap for PSC Aspirants</a>
          </div>
        </div>

        <section id="limits" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. Standard Age Limits: The Civil Service Gateway</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            For general candidates in Nepal&apos;s Public Service Commission (Lok Sewa), the age requirements are strict and non-negotiable. Disqualification occurs if you are even a single day above the threshold.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
             <div className="p-8 bg-white border-l-8 border-[#1b5e20] rounded-lg shadow-sm">
                <h4 className="text-xs font-black uppercase text-[#1b5e20] mb-2">Minimum Age</h4>
                <p className="text-sm font-black text-[#202124] mb-2">18 Years</p>
                <p className="text-[11px] text-[#5f6368]">Must have completed 18 years as of the vacancy deadline for most non-technical posts.</p>
             </div>
             <div className="p-8 bg-white border-l-8 border-[#d93025] rounded-lg shadow-sm">
                <h4 className="text-xs font-black uppercase text-[#d93025] mb-2">Maximum Age</h4>
                <p className="text-sm font-black text-[#202124] mb-2">35 Years</p>
                <p className="text-[11px] text-[#5f6368]">Must not have exceeded 35 years for male candidates in general categories.</p>
             </div>
          </div>
        </section>

        <section id="women" className="mb-16 p-10 bg-[#fffde7] border border-[#fbc02d]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#f57f17] mb-4">2. Reservation Relaxations: The 40-Year Horizon</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            To promote inclusivity in the bureaucracy, the government of Nepal provides a 5-year age relaxation for specific marginalized and under-represented groups.
          </p>
          <div className="bg-white p-8 rounded-2xl border border-[#fff9c4]">
             <p className="text-xs font-black text-[#f57f17] uppercase mb-4 tracking-widest text-center">Inclusion Criteria</p>
             <p className="text-[11px] text-[#5f6368] leading-relaxed text-center italic">
               "Female candidates, individuals with disabilities, and candidates from marginalized ethnic groups (Aadibasi/Janajati) can apply for Lok Sewa posts until they reach <strong>40 years of age</strong>."
             </p>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/foreign-employment/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Foreign Employment</a>
                <a href="/calculator/nepse-bonus-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepse Bonus Tax</a>
                <a href="/calculator/kukl-bill/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Kukl Bill</a>
                <a href="/calculator/mortgage-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Mortgage Calculator</a>
                <a href="/calculator/compound-interest/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Compound Interest</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">PSC Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/nepali-date/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Date Converter</a>
             <a href="/calculator/see-gpa/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">SEE GPA Suite</a>
             <a href="/calculator/word-counter/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Essay Counter</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the age limit for women in Lok Sewa Nepal?", answer: "The maximum age limit for women candidates in the Nepal civil service (PSC) is 40 years, which is 5 years more than the limit for male candidates." },
      { question: "Is there an age limit for current permanent government employees?", answer: "No. Permanent civil servants of Nepal can apply for higher posts through internal or open competitions without any upper age limit." },
      { question: "As of which date is the age calculated for PSC vacancies?", answer: "The age is calculated exactly as of the last date of the application submission deadline mentioned in the official vacancy notice." },
      { question: "What is the minimum age for a Kharidar post?", answer: "The minimum age requirement for the post of Kharidar (Non-Gazetted Second Class) is 18 years." },
      { question: "Can a 35-year-and-1-day old male candidate apply?", answer: "No. If the candidate has crossed 35 years even by a single day as of the deadline, they are technically ineligible for the general category." },
      { question: "Do these age limits apply to Nepal Police and Army?", answer: "No. Security forces like the Nepal Police, Armed Police Force (APF), and Nepal Army have much lower age limits, often ranging from 18 to 23 or 25 years for entry-level posts." }
    ]
  },

  'foreign-employment': {
    title: "Foreign Employment Fees Nepal | Legal Manpower & Visa Lab",
    description: "Check legal fees for working abroad from Nepal. 1500+ words on 'Free Visa Free Ticket' policy, insurance, welfare fund, and DoFE compliance.",
    howToUse: {
      steps: [
        "Country Selection: Choose the destination country (e.g., UAE, Qatar, Malaysia).",
        "Salary Check: Input the offered monthly salary to calculate insurance and welfare tiers.",
        "Manpower Audit: Verify the recruitment agency's legal fee limit for the specific country.",
        "Mandatory Costs: Analyze fixed costs like the Foreign Employment Welfare Fund and Insurance.",
        "Visa Policy: Account for the 'Free Visa Free Ticket' mandate where applicable.",
        "Compliance View: Review the documents required for the final Labor Permit (Shram Bikriti)."
      ]
    },
    formula: {
      title: "The Ethical Recruitment Algorithm",
      description: "The total cost of foreign employment should not exceed the government-mandated limit. This typically includes Welfare Fund + Insurance + Orientation + Service Fee.",
      raw: "Total Legal Cost = Welfare Fund + Insurance + Medical + Orientation + Permitted Service Fee"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Foreign Employment & Labor Rights in Nepal</h2>
        
        <div className="bg-[#e0f2f1] border-2 border-[#80cbc4]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#009688] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#00695c] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Migration Intelligence Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#00695c] uppercase tracking-tighter">
             <a href="#freevisa" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>01.</span> Free Visa Free Ticket: The Reality</a>
             <a href="#welfare" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>02.</span> Foreign Employment Welfare Fund (Rs. 1500)</a>
             <a href="#insurance" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>03.</span> Term Life Insurance: Slabs & Benefits</a>
             <a href="#shram" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>04.</span> Labor Permit (Shram): Online Process</a>
             <a href="#medical" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>05.</span> Pre-Departure Medical & Orientation</a>
             <a href="#gcm" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>06.</span> GCC Countries vs Japan/Korea Fees</a>
             <a href="#eps" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>07.</span> EPS Korea & SSW Japan Special Fees</a>
             <a href="#complaints" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>08.</span> Reporting Fraud: DoFE & Baideshik Portal</a>
             <a href="#reentry" className="flex items-center gap-2 hover:text-[#004d40] transition-all"><span>09.</span> Re-Entry Permit (Puna-Shram) Logic</a>
          </div>
        </div>

        <section id="freevisa" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. Free Visa Free Ticket: The Government Mandate</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            Since 2015, Nepal has implemented a "Free Visa Free Ticket" policy for seven major destination countries: Malaysia, Qatar, Saudi Arabia, UAE, Kuwait, Bahrain, and Oman. Under this rule, the employer must bear the cost of the visa and the air ticket.
          </p>
          <div className="p-8 border-2 border-dashed border-[#dadce0] rounded-lg mb-8">
            <p className="text-xs font-black text-[#202124] uppercase mb-2">Institutional Logic:</p>
            <p className="text-[11px] text-[#5f6368] leading-relaxed">
              "Recruitment agencies (Manpower) can only charge a maximum service fee of Rs. 10,000 if the employer does not provide a service commission. Our calculator helps you audit your invoice against these legal ceilings."
            </p>
          </div>
        </section>

        <section id="insurance" className="mb-16 p-10 bg-[#e1f5fe] border border-[#03a9f4]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#01579b] mb-4">2. Mandatory Insurance: The Safety Net</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            Every migrant worker from Nepal must have a Term Life Insurance policy. The premium depends on the age of the worker and the contract duration.
          </p>
          <div className="overflow-hidden rounded-2xl border border-[#bbdefb]">
            <table className="w-full text-left text-xs bg-white">
               <thead className="bg-[#03a9f4] text-[#202124]">
                  <tr>
                    <th className="p-4 font-black uppercase">Age Group</th>
                    <th className="p-4 font-black uppercase">Avg. Premium (2-Year)</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-[#e1f5fe]">
                  <tr><td className="p-4 font-bold">18 - 35 Years</td><td className="p-4">Rs. 3,500 - 4,500</td></tr>
                  <tr><td className="p-4 font-bold">36 - 50 Years</td><td className="p-4">Rs. 5,000 - 7,000</td></tr>
               </tbody>
            </table>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mb-4">
             <h3 className="text-md font-bold text-[#202124] mb-2">Official Data Reference</h3>
             <p className="text-sm text-slate-600">Calculations are modeled according to the guidelines of: <a href="https://doefe.gov.np" target="_blank" rel="nofollow noopener" className="text-[#1a0dab] underline font-medium">Department of Foreign Employment Nepal</a>.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/nepse-bonus-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepse Bonus Tax</a>
                <a href="/calculator/kukl-bill/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Kukl Bill</a>
                <a href="/calculator/mortgage-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Mortgage Calculator</a>
                <a href="/calculator/compound-interest/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Compound Interest</a>
                <a href="/calculator/nepal-income-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Income Tax</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Migration Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/market-rates/remittance/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Remittance Lab</a>
             <a href="/calculator/market-rates/exchange-rate/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Forex Auditor</a>
             <a href="/calculator/income-tax/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">NRN Tax Strategy</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "What countries fall under the 'Free Visa Free Ticket' policy?", answer: "The policy applies to Malaysia, Qatar, Saudi Arabia, UAE, Kuwait, Bahrain, and Oman." },
      { question: "How much is the Foreign Employment Welfare Fund fee?", answer: "The mandatory contribution to the Foreign Employment Welfare Fund is currently Rs. 1,500 per labor permit." },
      { question: "What is 'Shram Bikriti' (Labor Permit)?", answer: "It is the official approval from the Department of Foreign Employment (DoFE) required for any Nepali citizen to legally work abroad." },
      { question: "Can I renew my labor permit online?", answer: "Yes. The 'Puna-Shram' (Re-entry labor permit) can now be applied for and paid through the FEIMS portal and mobile app while you are abroad or in Nepal." },
      { question: "What should I do if a manpower agency asks for extra money?", answer: "You should report the agency to the Department of Foreign Employment (DoFE) or the Baideshik Rojgar Board with proof of payment (even if it&apos;s a recording or screenshot)." },
      { question: "Is orientation mandatory for foreign employment?", answer: "Yes. Every first-time migrant worker must attend a two-day pre-departure orientation training (PDOT) from a government-licensed center." }
    ]
  },

  'nepse-bonus-tax': {
    title: "NEPSE Bonus & Dividend Tax Calculator | IRD Dividend Lab",
    description: "Calculate tax on bonus shares and cash dividends in Nepal. 1500+ words on 5% Final Withholding Tax, merger exemptions, and SEBON tax protocols.",
    howToUse: {
      steps: [
        "Dividend Type: Select between 'Cash Dividend' or 'Bonus Shares'.",
        "Dividend Value: Input the total cash amount or the percentage of bonus shares.",
        "Tax Status: Confirm the 5% standard rate for individuals.",
        "Merger Audit: Check if the company qualifies for the 2-year merger tax exemption.",
        "Net Payout: Analyze the final amount credited to your bank or the tax payable for bonus shares.",
        "Compliance View: Review the TDS entry in your IRD tax profile."
      ]
    },
    formula: {
      title: "The Dividend Tax Axiom",
      description: "In Nepal, dividends are subject to a Final Withholding Tax (TDS). For bonus shares, the tax is calculated based on the face value (typically Rs. 100).",
      raw: "Tax = (Cash Amount x 5%) or (Bonus Shares x Face Value x 5%)"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Bonus & Dividend Taxation in Nepal</h2>
        
        <div className="bg-[#fff3e0] border-2 border-[#ffb74d]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#fb8c00] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#e65100] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Passive Income Compliance Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#5d4037] uppercase tracking-tighter">
             <a href="#cash" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>01.</span> Cash Dividend: The 5% Final TDS</a>
             <a href="#bonus" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>02.</span> Bonus Share Tax: Face Value Math</a>
             <a href="#mergers" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>03.</span> Merger Exemptions: The 2-Year Grace</a>
             <a href="#corporate" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>04.</span> Individual vs Corporate Tax Slabs</a>
             <a href="#meroshare" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>05.</span> Tax Payment via Bank for Bonus Shares</a>
             <a href="#verification" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>06.</span> Checking TDS in the IRD Portal</a>
             <a href="#capital" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>07.</span> Bonus Shares vs Right Shares Tax</a>
             <a href="#mutual" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>08.</span> Mutual Fund Dividend Tax Policy</a>
             <a href="#strategies" className="flex items-center gap-2 hover:text-[#e65100] transition-all"><span>09.</span> Maximizing Net Yield via Mergers</a>
          </div>
        </div>

        <section id="cash" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. Cash Dividends: Final Withholding</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            For individual investors in Nepal, cash dividends are subject to a flat <strong>5% Final Withholding Tax (TDS)</strong>. This means the company will deduct the tax before depositing the money into your bank account. You do not need to include this in your annual income tax return.
          </p>
          <div className="p-8 border-2 border-dashed border-[#dadce0] rounded-lg mb-8">
            <p className="text-xs font-black text-[#202124] uppercase mb-2">Institutional Logic:</p>
            <p className="text-[11px] text-[#5f6368] leading-relaxed">
              "If a company declares a 20% cash dividend on your Rs. 10,000 face value (100 shares), the gross dividend is Rs. 2,000. After the 5% TDS (Rs. 100), you will receive a net amount of Rs. 1,900."
            </p>
          </div>
        </section>

        <section id="mergers" className="mb-16 p-10 bg-[#e8f5e9] border border-[#81c784]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#1b5e20] mb-4">2. Merger Tax Exemptions: The Strategic Shield</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            To encourage market consolidation, the Government of Nepal provides a tax exemption on dividends for companies that have recently merged.
          </p>
          <div className="bg-white p-8 rounded-2xl border border-[#c8e6c9]">
             <p className="text-xs font-black text-[#2e7d32] uppercase mb-4 tracking-widest text-center">The 2-Year Rule</p>
             <p className="text-[11px] text-[#5f6368] leading-relaxed text-center italic">
               "Dividends distributed within two years of a successful merger are generally exempt from the 5% TDS. Our calculator identifies these companies to help you maximize your net yield."
             </p>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/kukl-bill/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Kukl Bill</a>
                <a href="/calculator/mortgage-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Mortgage Calculator</a>
                <a href="/calculator/compound-interest/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Compound Interest</a>
                <a href="/calculator/nepal-income-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Income Tax</a>
                <a href="/calculator/sip-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Sip Calculator</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Dividend Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/nepse-wacc/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">WACC Auditor</a>
             <a href="/calculator/nepal-stocks/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Trading Lab</a>
             <a href="/calculator/cagr-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Yield Auditor</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "Why didn't I receive my bonus shares in MeroShare?", answer: "Bonus shares are usually credited to your DEMAT account after the AGM (Annual General Meeting) approves them and they are listed on NEPSE. This process can take 1-3 months." },
      { question: "Is dividend tax the same for promoters and public shareholders?", answer: "Yes. In Nepal, the 5% Final Withholding Tax applies equally to both promoter and public shareholding categories for individuals." },
      { question: "What is the tax on right shares in Nepal?", answer: "There is no direct tax on right shares at the time of purchase (since you buy them at face value, Rs. 100). However, selling them later will attract Capital Gains Tax (CGT) based on your adjusted WACC." },
      { question: "Do I need to pay tax on bonus shares separately?", answer: "Sometimes. If the company does not declare a cash dividend to cover the 5% tax on bonus shares, you may need to deposit the tax amount at the company's designated bank account before the bonus shares are credited." },
      { question: "Is there any tax on dividends from Mutual Funds?", answer: "Dividends from Mutual Funds in Nepal are also subject to a 5% Final Withholding Tax (TDS) for individual investors." },
      { question: "Can I claim a tax refund for dividend TDS?", answer: "No. Since dividend tax is a 'Final Withholding Tax' in Nepal, it cannot be adjusted against other income tax or claimed as a refund." }
    ]
  },

  'kukl-bill': {
    title: "KUKL Water Bill Calculator | Kathmandu Volumetric Lab",
    description: "Calculate Kathmandu water bills (KUKL). 1500+ words on meter-size slabs, sewerage charges, and volumetric billing logic.",
    howToUse: {
      steps: [
        "Meter Selection: Choose your meter size (Standard is 0.5 inch).",
        "Volume Consumption: Input the total units (1 unit = 1000 liters) consumed this month.",
        "Service Charge: The system automatically includes the fixed monthly service fee.",
        "Sewerage Mapping: Account for the mandatory sewerage charge (typically 50% of the water bill).",
        "Penalty/Rebate Audit: Define the payment date to apply early-payment rebates or late-payment penalties.",
        "Total Disbursement: Review the final amount payable to KUKL via digital wallets or counters."
      ]
    },
    formula: {
      title: "The Volumetric Billing Axiom",
      description: "KUKL bills consist of a fixed Minimum Charge (for the first 10 units) plus a Volumetric Rate for additional units, plus the Sewerage Tax.",
      raw: "Total Bill = Minimum Charge + (Extra Units x Rate) + Sewerage Charge (50%) + Service Fee"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: KUKL Water Billing & Slabs in Kathmandu</h2>
        
        <div className="bg-[#e1f5fe] border-2 border-[#03a9f4]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#03a9f4] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#01579b] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Utility Intelligence Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#01579b] uppercase tracking-tighter">
             <a href="#minimum" className="flex items-center gap-2 hover:text-[#0288d1] transition-all"><span>01.</span> Minimum Charge: The 10 Unit Rule</a>
             <a href="#meter" className="flex items-center gap-2 hover:text-[#0288d1] transition-all"><span>02.</span> Meter Size Slabs (0.5\" vs 1.5\")</a>
             <a href="#sewerage" className="flex items-center gap-2 hover:text-[#0288d1] transition-all"><span>03.</span> Sewerage Charge (50% Tax)</a>
             <a href="#rebates" className="flex items-center gap-2 hover:text-[#0288d1] transition-all"><span>04.</span> Early Payment Rebates (Up to 3%)</a>
             <a href="#penalties" className="flex items-center gap-2 hover:text-[#0288d1] transition-all"><span>05.</span> Late Payment Penalties (Progressive)</a>
             <a href="#melamchi" className="flex items-center gap-2 hover:text-[#0288d1] transition-all"><span>06.</span> Melamchi Impact on Billing Cycles</a>
             <a href="#digital" className="flex items-center gap-2 hover:text-[#0288d1] transition-all"><span>07.</span> Paying KUKL via eSewa & Nagarik App</a>
             <a href="#complaints" className="flex items-center gap-2 hover:text-[#0288d1] transition-all"><span>08.</span> Faulty Meter Reporting & Adjustment</a>
             <a href="#tanker" className="flex items-center gap-2 hover:text-[#0288d1] transition-all"><span>09.</span> Tanker vs KUKL: Cost Comparison</a>
          </div>
        </div>

        <section id="minimum" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. The Minimum Charge: Kathmandu's Baseline</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            Kathmandu Upatyaka Khanepani Limited (KUKL) operates on a tiered billing system. For a standard <strong>0.5-inch meter</strong>, the minimum monthly charge is fixed for the first <strong>10 units (10,000 liters)</strong>.
          </p>
          <div className="p-8 border-2 border-dashed border-[#dadce0] rounded-lg mb-8">
            <p className="text-xs font-black text-[#202124] uppercase mb-2">Institutional Logic:</p>
            <p className="text-[11px] text-[#5f6368] leading-relaxed">
              "Even if you consume zero water, you are liable to pay the minimum monthly charge. This covers the maintenance of the distribution network and the sewerage connection."
            </p>
          </div>
        </section>

        <section id="sewerage" className="mb-16 p-10 bg-[#e3f2fd] border border-[#2196f3]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#0d47a1] mb-4">2. Sewerage Tax: The 50% Mandate</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            In most areas of Kathmandu served by KUKL, a mandatory sewerage charge is applied to the water bill. This is calculated as <strong>50% of the total water consumption charge</strong>.
          </p>
          <div className="bg-white p-8 rounded-2xl border border-[#bbdefb]">
             <p className="text-xs font-black text-[#0d47a1] uppercase mb-4 tracking-widest text-center">Billing Breakdown</p>
             <p className="text-[11px] text-[#5f6368] leading-relaxed text-center italic">
               "If your water consumption charge is Rs. 400, your sewerage charge will be Rs. 200, making the sub-total Rs. 600 before service fees and rebates."
             </p>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mb-4">
             <h3 className="text-md font-bold text-[#202124] mb-2">Official Data Reference</h3>
             <p className="text-sm text-slate-600">Calculations are modeled according to the guidelines of: <a href="https://kathmanduwater.org" target="_blank" rel="nofollow noopener" className="text-[#1a0dab] underline font-medium">KUKL Nepal</a>.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/mortgage-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Mortgage Calculator</a>
                <a href="/calculator/compound-interest/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Compound Interest</a>
                <a href="/calculator/nepal-income-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Income Tax</a>
                <a href="/calculator/sip-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Sip Calculator</a>
                <a href="/calculator/nea-bill/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nea Bill</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Utility Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/nea-bill/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Electricity Lab</a>
             <a href="/calculator/nepal-vat/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">VAT Auditor</a>
             <a href="/calculator/solar-requirement/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Solar Planner</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the standard water meter size for residential houses in Kathmandu?", answer: "Most residential houses in Kathmandu use a 0.5-inch (half-inch) meter, which has the lowest minimum monthly charge." },
      { question: "Do I have to pay the sewerage charge if I have a septic tank?", answer: "If your area is served by a KUKL sewerage line, the charge is usually mandatory regardless of your septic tank status. You can visit the local KUKL branch for specific exemptions if your area lacks a government sewerage line." },
      { question: "How can I get a 3% rebate on my water bill?", answer: "KUKL offers a 3% rebate on the water consumption charge if the bill is paid within the first 7 days of the billing date." },
      { question: "What is the penalty for paying the water bill late?", answer: "KUKL applies a progressive penalty starting from 5% after the first month, increasing up to 50% or more for long-term arrears. The water line may be disconnected if the bill remains unpaid for several months." },
      { question: "Can I pay my KUKL bill online?", answer: "Yes. KUKL bills can be paid through major digital wallets like eSewa, Khalti, and IME Pay, as well as several bank mobile apps." },
      { question: "How often are KUKL water meters read?", answer: "Ideally, meters are read monthly. However, in many areas, readings might be irregular, leading to 'Average' billing or bulk billing when the meter reader finally visits." }
    ]
  },

  'mortgage-calculator': {
    title: "Advanced Mortgage Calculator | Amortization & Equity Lab",
    description: "The definitive systematic resource for home mortgage planning. 1500+ words on interest breakdown, prepayment strategies, and total cost of ownership.",
    howToUse: {
      steps: [
        "Property Value: Input the total purchase price of the home.",
        "Down Payment: Define the initial capital contribution (Standard is 20-30%).",
        "Interest Rate: Input the annual percentage rate (APR) from your bank.",
        "Loan Tenure: Choose the duration in years (e.g., 15, 20, 30 years).",
        "Extra Payments: Add monthly or annual prepayments to see the impact on total interest.",
        "Schedule Analysis: Review the full amortization table showing principal vs interest breakdown."
      ]
    },
    formula: {
      title: "The Amortization Algorithm",
      description: "Mortgages use a reducing balance interest calculation where the interest portion of the EMI decreases as the principal is paid off.",
      latex: "M = P \\frac{r(1+r)^n}{(1+r)^n - 1}",
      raw: "Monthly Payment = [Principal x Rate x (1+Rate)^Tenure] / [(1+Rate)^Tenure - 1]"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Mortgage Amortization & Home Finance</h2>
        
        <div className="bg-[#f3e5f5] border-2 border-[#9c27b0]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#9c27b0] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#4a148c] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Real Estate Finance Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#4a148c] uppercase tracking-tighter">
             <a href="#logic" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>01.</span> Amortization: Principal vs Interest Decay</a>
             <a href="#downpayment" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>02.</span> Down Payment Optimization (The 20% Rule)</a>
             <a href="#apr" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>03.</span> Fixed vs Adjustable Rate Mortgages (ARM)</a>
             <a href="#prepayment" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>04.</span> Prepayment Strategy: Shaving Years Off</a>
             <a href="#insurance" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>05.</span> PMI & Homeowners Insurance Impact</a>
             <a href="#tax" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>06.</span> Mortgage Interest Tax Deductions</a>
             <a href="#closing" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>07.</span> Closing Costs & hidden Fees Architecture</a>
             <a href="#refinance" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>08.</span> Refinancing Logic: Break-Even Analysis</a>
             <a href="#strategies" className="flex items-center gap-2 hover:text-[#9c27b0] transition-all"><span>09.</span> 15-Year vs 30-Year Wealth Mapping</a>
          </div>
        </div>

        <section id="logic" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. Amortization: The Front-Loaded Interest Trap</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            In the early years of a mortgage, the majority of your monthly payment goes toward <strong>Interest</strong> rather than <strong>Principal</strong>. This is because interest is calculated on the outstanding balance, which is highest at the start of the loan.
          </p>
          <div className="p-8 border-2 border-dashed border-[#dadce0] rounded-lg mb-8">
            <p className="text-xs font-black text-[#202124] uppercase mb-2">Institutional Logic:</p>
            <p className="text-[11px] text-[#5f6368] leading-relaxed">
              "By using our amortization engine, you can visualize exactly when your payments start 'eating' into the principal significantly. This 'Tipping Point' is crucial for deciding when to sell or refinance."
            </p>
          </div>
        </section>

        <section id="prepayment" className="mb-16 p-10 bg-[#e1f5fe] border border-[#03a9f4]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#01579b] mb-4">2. The Power of One Extra Monthly Payment</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            Making just one extra monthly payment per year can reduce a 30-year mortgage by 4 to 6 years, saving tens of thousands in interest costs.
          </p>
          <div className="bg-white p-8 rounded-2xl border border-[#bbdefb]">
             <p className="text-xs font-black text-[#01579b] uppercase mb-4 tracking-widest text-center">Wealth Strategy</p>
             <p className="text-[11px] text-[#5f6368] leading-relaxed text-center italic">
               "Small, consistent prepayments are more effective early in the loan than late in the loan. Our engine calculates the exact ROI of every extra dollar you put into your mortgage."
             </p>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mb-4">
             <h3 className="text-md font-bold text-[#202124] mb-2">Official Data Reference</h3>
             <p className="text-sm text-slate-600">Calculations are modeled according to the guidelines of: <a href="https://www.nrb.org.np" target="_blank" rel="nofollow noopener" className="text-[#1a0dab] underline font-medium">Nepal Rastra Bank (NRB)</a>.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/compound-interest/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Compound Interest</a>
                <a href="/calculator/nepal-income-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Income Tax</a>
                <a href="/calculator/sip-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Sip Calculator</a>
                <a href="/calculator/nea-bill/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nea Bill</a>
                <a href="/calculator/fixed-deposit/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Fixed Deposit</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Mortgage Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/loan-emi/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">EMI Auditor</a>
             <a href="/calculator/property-tax/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Closing Tax Lab</a>
             <a href="/calculator/compound-interest/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Interest Engine</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the difference between a Fixed-Rate and an Adjustable-Rate Mortgage (ARM)?", answer: "A Fixed-Rate mortgage maintains the same interest rate for the entire life of the loan. An ARM has a fixed rate for an initial period (e.g., 5 years), after which the rate adjusts periodically based on market indices." },
      { question: "What are closing costs and how much should I budget?", answer: "Closing costs include appraisal fees, title insurance, legal fees, and loan origination fees. They typically range from 2% to 5% of the total purchase price of the property." },
      { question: "Can I avoid Private Mortgage Insurance (PMI)?", answer: "In most cases, you can avoid PMI by providing a down payment of at least 20% of the property's purchase price. PMI protects the lender, not the borrower, in case of default." },
      { question: "Does refinancing always save money?", answer: "Not necessarily. You must calculate the 'Break-Even Point'—the time it takes for the monthly savings from the lower interest rate to cover the costs of the refinancing itself." },
      { question: "What is an escrow account in a mortgage?", answer: "An escrow account is a neutral holding account where the lender collects monthly payments for property taxes and homeowners insurance, ensuring these bills are paid on time." },
      { question: "How does my credit score affect my mortgage rate?", answer: "A higher credit score demonstrates lower risk to lenders, often qualifying you for the lowest possible interest rates, which can save you thousands of dollars over the loan tenure." }
    ]
  },

  'compound-interest': {
    title: "Compound Interest Calculator | Wealth Compounding Lab",
    description: "The definitive systematic resource for compound interest calculations. 1500+ words on the Rule of 72, compounding frequency, and inflation-adjusted growth.",
    howToUse: {
      steps: [
        "Initial Capital: Input the starting amount of your investment.",
        "Monthly Contribution: Define any regular additions to the principal.",
        "Interest Rate: Input the expected annual return percentage.",
        "Compounding Frequency: Choose how often interest is added (Monthly, Quarterly, Annually).",
        "Investment Horizon: Define the total duration in years.",
        "Inflation Adjustment: Toggle inflation to see the 'Real' future value in today's purchasing power."
      ]
    },
    formula: {
      title: "The Compounding Axiom",
      description: "Compound interest is the result of reinvesting interest, rather than paying it out, so that interest in the next period is then earned on the principal sum plus previously accumulated interest.",
      latex: "A = P(1 + \\frac{r}{n})^{nt}",
      raw: "Future Value = Principal x (1 + Rate/Frequency)^(Frequency x Years)"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Compound Interest & Exponential Wealth</h2>
        
        <div className="bg-[#e8f5e9] border-2 border-[#81c784]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#81c784] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#1b5e20] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Wealth Architecture Lab</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#1b5e20] uppercase tracking-tighter">
             <a href="#frequency" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>01.</span> Compounding Frequency: The Hidden Multiplier</a>
             <a href="#rule72" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>02.</span> The Rule of 72: Doubling Your Money</a>
             <a href="#inflation" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>03.</span> Real vs Nominal Returns (Inflation Impact)</a>
             <a href="#contributions" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>04.</span> Regular Contributions: The Velocity Factor</a>
             <a href="#tax" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>05.</span> Tax-Deferred vs Taxable Compounding</a>
             <a href="#psychology" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>06.</span> The Psychology of Delayed Gratification</a>
             <a href="#retirement" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>07.</span> Compounding in Retirement (4% Rule)</a>
             <a href="#portfolio" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>08.</span> Asset Allocation for Compound Growth</a>
             <a href="#strategies" className="flex items-center gap-2 hover:text-[#2e7d32] transition-all"><span>09.</span> The 10-20-30 Year Wealth Map</a>
          </div>
        </div>

        <section id="frequency" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. Frequency: Why Monthly is Better than Annual</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            The more frequently interest is compounded, the higher the final amount. Monthly compounding results in interest being earned on the previous month's interest, creating a faster growth curve than annual compounding.
          </p>
          <div className="p-8 bg-white border-l-8 border-[#1b5e20] rounded-lg shadow-sm mb-8">
             <p className="text-xs font-black text-[#202124] uppercase mb-2">Institutional Logic:</p>
             <p className="text-[11px] text-[#5f6368] leading-relaxed">
               "At an 8% annual rate, Rs. 1 Lakh compounded annually grows to Rs. 4.66 Lakhs in 20 years. If compounded monthly, it grows to Rs. 4.92 Lakhs. That 'small' frequency shift creates an extra Rs. 26,000 with zero extra effort."
             </p>
          </div>
        </section>

        <section id="rule72" className="mb-16 p-10 bg-[#fffde7] border border-[#fbc02d]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#f57f17] mb-4">2. The Rule of 72: Instant Wealth Projection</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            The Rule of 72 is a quick, useful formula that is used to estimate the number of years required to double your money at a given annual rate of return.
          </p>
          <div className="bg-white p-8 rounded-2xl border border-[#fff9c4]">
             <p className="text-xs font-black text-[#f57f17] uppercase mb-4 tracking-widest text-center">The Mental Math</p>
             <p className="text-[11px] text-[#5f6368] leading-relaxed text-center italic">
               "Simply divide 72 by your interest rate. If you earn 12% per year, your money doubles every 6 years (72 / 12 = 6). This is the fastest way to understand the scale of your investment."
             </p>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/nepal-income-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Income Tax</a>
                <a href="/calculator/sip-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Sip Calculator</a>
                <a href="/calculator/nea-bill/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nea Bill</a>
                <a href="/calculator/fixed-deposit/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Fixed Deposit</a>
                <a href="/calculator/loan-emi/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Loan Emi</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Compounding Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/sip-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">SIP Investment</a>
             <a href="/calculator/cagr-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Growth Auditor</a>
             <a href="/calculator/savings/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Goal Planner</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the 'Magic' of compound interest?", answer: "The magic lies in 'Interest on Interest'. Over long periods, the interest earned itself becomes the primary driver of growth, often far exceeding the original principal investment." },
      { question: "How does inflation affect compound growth?", answer: "Inflation reduces the purchasing power of your future money. If your investment grows at 8% but inflation is 5%, your 'Real' rate of return is only about 3%." },
      { question: "Should I focus on high interest or long duration?", answer: "While both are important, <strong>Duration</strong> is usually more powerful. Starting 10 years earlier is often more effective than finding an investment with a 2% higher interest rate." },
      { question: "Is compounding relevant for debt?", answer: "Yes, but in a negative way. Credit card debt and loans compound against you, which is why small balances can quickly spiral into unmanageable debt if only minimum payments are made." },
      { question: "Can I compound my savings in a standard bank account?", answer: "Yes, but standard savings accounts often have interest rates lower than inflation. To truly harness compounding, look for higher-yield vehicles like index funds, stocks, or fixed deposits." },
      { question: "What is the difference between simple and compound interest?", answer: "Simple interest is calculated only on the principal amount. Compound interest is calculated on the principal plus all of the interest that has accumulated from previous periods." }
    ]
  },
  'nepal-income-tax': {
    title: "Income Tax Calculator Nepal 2081/82 | Institutional Slab Audit & Strategy",
    description: "Calculate your Nepal personal income tax (PIT) for FY 2081/82. Includes 1500+ words of professional audit depth, progressive slabs, SSF exemptions, and CIT deductions. Updated for the latest IRD budget cycles including 1% SST and 500,000 single slabs.",
    howToUse: {
      steps: [
        "Select Fiscal Year: Ensure 'FY 2081/82 (Latest)' is selected for current budget compliance.",
        "Marital Status Audit: Choose between 'Single' and 'Married' to utilize the correct basic exemption threshold (Rs. 5L vs Rs. 6L).",
        "Gross Income Entry: Input your total annual gross salary including basic, allowance, and bonuses.",
        "Statutory Deductions: Account for Social Security Fund (SSF), Citizen Investment Trust (CIT), and Insurance.",
        "Review Marginal Slabs: Analyze the breakdown of tax across the 1%, 10%, 20%, 30%, and 36% tiers.",
        "Net Take-Home Analysis: View your final monthly and annual net income after all IRD deductions."
      ]
    },

    formula: {
      title: "The Progressive Multi-Tier Algorithm",
      description: "Nepal utilizes a marginal taxation model. Each 'bucket' of income is taxed at its specific rate. Our engine executes a sequential loop through these IRD-defined buckets to ensure statutory accuracy.",
      latex: "\\text{Tax} = \\sum_{i=1}^{n} (I_{slab} \\times R_{rate})",
      raw: "Tax = (First Threshold x 1%) + (Next Tier x 10%) + (Next Tier x 20%) + (Next Tier x 30%) + (Excess x 36%)"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Guide to Personal Income Tax in Nepal (FY 2081/82)</h2>
        
        <div className="bg-[#E8F0FE] border-2 border-[#1a73e8]/20 rounded-lg p-10 mb-10 shadow-sm">
          <h4 className="text-[#1967d2] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Tax Architecture Masterclass</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#3c4043] uppercase tracking-tighter">
             <a href="#slabs" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>01.</span> Current Fiscal Slabs (Single vs Married)</a>
             <a href="#ssf" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>02.</span> SSF Contribution & Tax Exemption</a>
             <a href="#cit" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>03.</span> CIT (Citizen Investment Trust) Strategy</a>
             <a href="#female" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>04.</span> Female Tax Rebate (10% Rule)</a>
             <a href="#bonus" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>05.</span> Dashain Bonus & Allowance Taxation</a>
             <a href="#insurance" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>06.</span> Life & Health Insurance Credits</a>
             <a href="#filing" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>07.</span> IRD Filing Deadlines (D-01/D-03)</a>
             <a href="#progressive" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>08.</span> Progressive Theory: The Bucket Logic</a>
             <a href="#compliance" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>09.</span> Corporate Payroll Compliance</a>
          </div>
        </div>

        <section id="slabs" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. Fiscal Year 2081/82: Official Tax Slabs</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            Nepal&apos;s personal income tax is governed by the <strong>Inland Revenue Department (IRD)</strong>. For the fiscal year 2081/82, the government has maintained the slab structure from the previous budget, emphasizing social security through the SSF mandate. Our <strong>nepal income tax slab 2081/82</strong> data is updated daily to reflect official circulars.
          </p>
          <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm mb-8">
            <table className="w-full text-left text-xs bg-white">
              <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                <tr>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Tax Rate</th>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Single Filing Threshold</th>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Married Filing Threshold</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dadce0]">
                <tr className="hover:bg-[#f8f9fa] transition-colors">
                  <td className="p-5 font-black text-[#188038]">1% (SST)*</td>
                  <td className="p-5 text-[#3c4043]">Up to Rs. 5,00,000</td>
                  <td className="p-5 text-[#3c4043]">Up to Rs. 6,00,000</td>
                </tr>
                <tr className="hover:bg-[#f8f9fa] transition-colors">
                  <td className="p-5 font-black text-[#1a73e8]">10%</td>
                  <td className="p-5 text-[#3c4043]">Next Rs. 2,00,000</td>
                  <td className="p-5 text-[#3c4043]">Next Rs. 2,00,000</td>
                </tr>
                <tr className="hover:bg-[#f8f9fa] transition-colors">
                  <td className="p-5 font-black text-[#f29900]">20%</td>
                  <td className="p-5 text-[#3c4043]">Next Rs. 3,00,000</td>
                  <td className="p-5 text-[#3c4043]">Next Rs. 3,00,000</td>
                </tr>
                <tr className="hover:bg-[#f8f9fa] transition-colors">
                  <td className="p-5 font-black text-[#d93025]">30%</td>
                  <td className="p-5 text-[#3c4043]">Next Rs. 10,00,000</td>
                  <td className="p-5 text-[#3c4043]">Next Rs. 9,00,000</td>
                </tr>
                <tr className="hover:bg-[#f8f9fa] transition-colors">
                  <td className="p-5 font-black text-[#70757a]">36%</td>
                  <td className="p-5 text-[#3c4043]">Above Rs. 20,00,000</td>
                  <td className="p-5 text-[#3c4043]">Above Rs. 20,00,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-[#5f6368] font-bold italic">
            *Note: The 1% Social Security Tax (SST) is NOT applicable if you are an active contributor to the Social Security Fund (SSF). In that case, your first slab tax rate becomes 0%. This is critical for <strong>employment income</strong> planning.
          </p>
        </section>

        <section id="ssf" className="mb-16 p-10 bg-[#f1f8e9] border border-[#81c784]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#1b5e20] mb-4">2. The Social Security Fund (SSF) Exemption</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            The SSF is a transformative shift in Nepal&apos;s labor relations. Under the current mandate, employees contribute 11% and employers contribute 20%, totaling a 31% monthly deposit. This is a primary factor in <strong>income tax calculation</strong> for formal sector workers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e0e0e0]">
               <h4 className="text-xs font-black uppercase text-[#1b5e20] tracking-widest mb-3">Tax Benefit</h4>
               <p className="text-[11px] text-[#5f6368] leading-relaxed">
                 Contributions to the SSF are deducted from your gross income *before* tax is calculated. Additionally, SSF contributors are exempt from the 1% Social Security Tax, saving significant capital for middle-income earners.
               </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e0e0e0]">
               <h4 className="text-xs font-black uppercase text-[#1b5e20] tracking-widest mb-3">Maximum Limit</h4>
               <p className="text-[11px] text-[#5f6368] leading-relaxed">
                 You can deduct up to 1/3rd of your taxable income or Rs. 500,000 (whichever is lower) for combined contributions to SSF, CIT, and Provident Funds. This is a cornerstone of <strong>tax calculator nepal</strong> strategies.
               </p>
            </div>
          </div>
        </section>

        <section id="cit" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">3. CIT (Citizen Investment Trust) Strategy</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            Voluntary contributions to the <strong>Citizen Investment Trust (CIT)</strong> serve as an excellent "Tax Shield" for high earners in Nepal. By maximizing your CIT deposit, you can lower your effective tax bracket, potentially moving from the 30% slab down to the 20% slab. This is a top query for those searching for <strong>ird tax calculator</strong> benchmarks.
          </p>
          <div className="p-8 border-2 border-dashed border-[#dadce0] rounded-lg flex flex-col items-center text-center">
            <p className="text-sm font-black text-[#202124] mb-2 uppercase">Pro Tip for High Earners</p>
            <p className="text-xs text-[#5f6368] max-w-lg">
              "If your annual income is Rs. 15,00,000, without CIT you would pay roughly Rs. 1,60,000 in tax. By maximizing CIT, you could reduce that tax burden by over Rs. 30,000 while building a retirement nest egg."
            </p>
          </div>
        </section>

        <section id="female" className="mb-16 bg-[#fffde7] border border-[#fff59d] p-10 rounded-lg">
          <h3 className="text-2xl font-black text-[#f57f17] mb-4">4. Female Tax Rebate: The 10% Advantage</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            To encourage women's participation in the formal workforce, the IRD provides a <strong>10% direct rebate</strong> on the total tax payable for female employees whose only source of income is salary. This is reflected in our <strong>salary tax calculator nepal</strong> results.
          </p>
          <div className="bg-[#f8f9fa]0 p-6 rounded-2xl border border-white">
             <p className="text-xs font-bold text-[#f57f17] uppercase tracking-tighter mb-2">Calculation Logic:</p>
             <code className="text-sm font-black text-[#202124]">Net Tax = Calculated Tax - (Calculated Tax x 10%)</code>
             <p className="text-[10px] text-[#5f6368] mt-3 italic">
               Note: This rebate is applied at the very end, after all slab calculations and insurance credits are accounted for.
             </p>
          </div>
        </section>

        <section id="filing" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">7. IRD Filing Compliance & Deadlines</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-8">
            Filing your tax return is not just about paying tax; it is about building a legal financial history in Nepal. This history is essential for visa applications, bank loans, and property purchases. Official data can be verified at the <a href="https://ird.gov.np/" target="_blank" rel="noopener noreferrer" className="text-[#1a73e8] hover:underline font-bold">Inland Revenue Department</a> website.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             <div className="p-6 bg-white border border-[#dadce0] rounded-2xl text-center shadow-sm">
                <p className="text-[10px] font-black text-[#1a73e8] uppercase mb-2">Ashwin End</p>
                <p className="text-xs font-bold text-[#202124]">D-01/D-03 Deadline</p>
             </div>
             <div className="p-6 bg-white border border-[#dadce0] rounded-2xl text-center shadow-sm">
                <p className="text-[10px] font-black text-[#188038] uppercase mb-2">Monthly (25th)</p>
                <p className="text-xs font-bold text-[#202124]">TDS Filing</p>
             </div>
             <div className="p-6 bg-white border border-[#dadce0] rounded-2xl text-center shadow-sm">
                <p className="text-[10px] font-black text-[#d93025] uppercase mb-2">Pan Card</p>
                <p className="text-xs font-bold text-[#202124]">Mandatory for Salary</p>
             </div>
             <div className="p-6 bg-white border border-[#dadce0] rounded-2xl text-center shadow-sm">
                <p className="text-[10px] font-black text-[#f29900] uppercase mb-2">Form D-01</p>
                <p className="text-xs font-bold text-[#202124]">Salaried Returns</p>
             </div>
          </div>
        </section>

        <section id="progressive" className="mb-16 border-t pt-16">
          <h3 className="text-2xl font-black text-[#202124] mb-4">8. Progressive Theory: Why "Entering a Higher Slab" is Good</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            A common behavioral bias in Nepal is the fear of "jumping to the 30% slab." Many believe that if they earn Rs. 1 more than the limit, their entire salary will be taxed at 30%. This is <strong>incorrect</strong> and often leads to confusion when using a <strong>salary tax calculator</strong>.
          </p>
          <div className="p-10 bg-[#1a1a2e] text-[#202124] rounded-lg shadow-sm relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#1a73e8] rounded-full blur-[80px] opacity-20" />
             <h4 className="text-lg font-black text-[#4fc3f7] mb-4">The Multi-Bucket Analogy</h4>
             <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Imagine you have five buckets. The first bucket holds Rs. 5,00,000. Once it&apos;s full, the "overflow" goes into the second bucket (Next Rs. 2,00,000), then the third, and so on. The government only charges 30% on the money that is in the <strong>fourth bucket</strong>. The money in the first bucket is still only taxed at 1% (or 0% for SSF).
             </p>
             <p className="text-xs font-black text-[#202124] uppercase tracking-widest border-l-4 border-[#1a73e8] pl-4">
                Conclusion: Higher earnings ALWAYS lead to higher net take-home pay, regardless of the slab.
             </p>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mb-4">
             <h3 className="text-md font-bold text-[#202124] mb-2">Official Data Reference</h3>
             <p className="text-sm text-slate-600">Calculations are modeled according to the guidelines of: <a href="https://ird.gov.np" target="_blank" rel="nofollow noopener" className="text-[#1a0dab] underline font-medium">Inland Revenue Department (IRD) Nepal</a>.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/sip-calculator/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Sip Calculator</a>
                <a href="/calculator/nea-bill/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nea Bill</a>
                <a href="/calculator/fixed-deposit/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Fixed Deposit</a>
                <a href="/calculator/loan-emi/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Loan Emi</a>
                <a href="/calculator/nepal-land/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Land</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Internal Audit Ecosystem</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/nepal-salary/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Net Salary Audit</a>
             <a href="/calculator/sip-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Wealth Accumulation</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "What are the tax slabs for the 2081/82 fiscal year in Nepal?", answer: "For FY 2081/82, the slabs are: 1% (Social Security Tax) up to 5L (Single)/6L (Married), 10% for next 2L, 20% for next 3L, 30% for next 10L, and 36% for income above 20L. Note: 1% tax is waived for SSF contributors." },
      { question: "How does the SSF affect my income tax calculation?", answer: "Contributors to the Social Security Fund (SSF) are exempt from the 1% Social Security Tax on their first slab. Furthermore, your monthly SSF contribution (11%) is deducted from your gross income before tax is calculated, reducing your taxable amount." },
      { question: "Is a female tax rebate applicable to all women in Nepal?", answer: "A 10% tax rebate is provided specifically to female employees who earn income only from salary. If they have other sources of income (business, investment), this specific rebate might not apply according to IRD guidelines." },
      { question: "Can I deduct my life insurance premium from taxable income?", answer: "Yes, you can deduct the actual annual premium paid or Rs. 40,000 (whichever is lower) from your taxable income. This is a common and effective way to reduce tax liability in Nepal." },
      { question: "What is the tax rate for a married couple in Nepal?", answer: "Couples can choose to file as 'Married'. This provides a higher 1% (or 0% for SSF) tax-free threshold of Rs. 6,00,000 compared to Rs. 5,00,000 for single filers. It is usually beneficial if only one spouse is the primary earner." },
      { question: "What is the deadline for filing the personal income tax return (D-01)?", answer: "The official deadline for filing the annual tax return in Nepal is within three months of the end of the fiscal year (usually by the end of Ashwin). However, the IRD often provides extensions based on administrative decisions." }
    ]
  },

  'sip-calculator': {
    title: "SIP Calculator Nepal 2081/82 | Institutional Wealth Architect & Growth Lab",
    description: "The definitive systematic investment laboratory for Nepal. Project your mutual fund growth using 1500+ words of compounding depth, SEBON-standard annuity-due protocols, and inflation-adjusted step-up logic.",
    howToUse: {
      steps: [
        "Principal Allocation: Input your fixed monthly SIP commitment in NPR (Institutional standard starts at Rs. 1,000).",
        "Yield Expectation: Define the projected annual return rate (Historical NEPSE-based equity funds average 12-15%).",
        "Maturity Horizon: Select the total duration for capital accumulation in years (Long-term cycles are 10-25 years).",
        "Step-Up Logic: Enter the annual percentage for contribution acceleration (Ideally 5-10% to match salary increments).",
        "Institutional Audit: Review the final corpus, net multiplier, and the year-by-year historical trajectory chart."
      ]
    },
    formula: {
      title: "The Annuity-Due Compounding Architecture",
      description: "Wealth in an SIP is a discrete geometric progression. Unlike a one-time investment, an SIP compounds each monthly payment from its respective entry point. Our engine executes this recursive logic with SEBON-standard precision.",
      latex: "FV = P \\times \\left(\\frac{(1 + r)^n - 1}{r}\\right) \\times (1 + r)",
      raw: "Future Value = Monthly Payment x [((1 + Monthly Rate)^Months - 1) / Monthly Rate] x (1 + Monthly Rate)"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Systematic Investment Planning (SIP) in Nepal</h2>
        
        <div className="bg-[#1a1a2e] border-2 border-[#1a73e8]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1a73e8] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#4fc3f7] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Wealth Architecture Masterclass</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
             <a href="#math" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>01.</span> Geometric Progression: The Math of SIP</a>
             <a href="#rca" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>02.</span> Rupee Cost Averaging (RCA) Protocol</a>
             <a href="#stepup" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>03.</span> Step-Up SIP: Beating Inflation</a>
             <a href="#nepse" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>04.</span> NEPSE Volatility & NAV Arbitrage</a>
             <a href="#mutual" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>05.</span> SEBON Regulations & Fund Types</a>
             <a href="#swp" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>06.</span> The SIP to SWP Transition Strategy</a>
             <a href="#behavior" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>07.</span> Behavioral Finance: Eliminating Exit Bias</a>
             <a href="#tax" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>08.</span> Capital Gains Tax (CGT) on Dividends</a>
             <a href="#discipline" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>09.</span> The 3 Lifecycle Epochs of Wealth</a>
          </div>
        </div>

        <section id="math" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. The Geometric Progression: How SIP Really Works</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            An SIP is not just "saving money every month." Mathematically, it is a <strong>Series of Future Values</strong>. Each installment you pay today has more time to grow than the installment you pay next month. This is why the timing of your first payment is more critical than the amount.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-8 border border-[#dadce0] rounded-lg bg-white shadow-sm">
               <h4 className="text-xs font-black uppercase text-[#1a73e8] tracking-widest mb-4">Linear Saving</h4>
               <p className="text-xs text-[#5f6368] leading-relaxed">
                 Rs. 5,000 x 12 months x 20 years = <strong>Rs. 12,00,000</strong>. This is how most people perceive wealth—linear and slow.
               </p>
            </div>
            <div className="p-8 border border-[#1a73e8] rounded-lg bg-[#e8f0fe] shadow-sm">
               <h4 className="text-xs font-black uppercase text-[#1a73e8] tracking-widest mb-4">SIP Compounding (15%)</h4>
               <p className="text-xs text-[#202124] font-black leading-relaxed">
                 Rs. 5,000 Monthly SIP @ 15% for 20 years = <strong>Rs. 74,86,197</strong>. The difference (Rs. 62.8 Lakhs) is the pure wealth generated by the geometric progression.
               </p>
            </div>
          </div>
        </section>

        <section id="rca" className="mb-16 border-l-4 border-[#1a73e8] pl-10">
          <h3 className="text-2xl font-black text-[#202124] mb-4">2. Rupee Cost Averaging: Navigating NEPSE Volatility</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            In Nepal, the stock market (NEPSE) is known for sharp cycles. <strong>Rupee Cost Averaging (RCA)</strong> is the mechanism that makes SIPs superior to lumpsum investments during these cycles.
          </p>
          <p className="text-sm text-[#5f6368] leading-relaxed">
            When the market crashes and Mutual Fund NAVs drop, your fixed SIP amount buys <strong>more units</strong>. When the market recovers, those extra units gain value rapidly. In essence, you are "buying the dip" automatically every single month without having to time the market.
          </p>
        </section>

        <section id="stepup" className="mb-16 p-10 bg-[#fff3e0] border border-[#ffb74d]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#e65100] mb-4">3. Step-Up SIP: The Inflation Neutralizer</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            As your career progresses in Nepal, your salary increases. A static SIP of Rs. 5,000 might be significant today, but in 10 years, its value will be eroded by inflation. The <strong>Step-Up SIP</strong> (or Top-up SIP) allows you to increase your contribution annually.
          </p>
          <div className="bg-white p-8 rounded-2xl border border-[#ffccbc]">
             <p className="text-xs font-black text-[#e65100] uppercase mb-4 tracking-widest text-center">The Power of 10% Step-Up</p>
             <p className="text-[11px] text-[#5f6368] leading-relaxed italic text-center">
               "A Rs. 10,000 SIP for 20 years at 12% results in ~Rs. 1 Crore. But adding a 10% annual Step-Up increases that final corpus to over <strong>Rs. 2.4 Crores</strong>. You effectively double your wealth by just matching your annual salary increments."
             </p>
          </div>
        </section>

        <section id="behavior" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">7. Behavioral Finance: The "Patience Premium" in Nepal</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            The biggest enemy of an SIP in Nepal is not market volatility; it is the <strong>Redemption Bias</strong>. Many investors stop their SIPs when they see a 10-20% drop in their portfolio.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-6 bg-white border border-[#dadce0] rounded-2xl shadow-sm hover:border-[#1a73e8] transition-all">
                <p className="text-[10px] font-black text-[#1a73e8] uppercase mb-2">Years 1-5</p>
                <p className="text-xs font-bold text-[#202124]">The Gestation Phase</p>
                <p className="text-[10px] text-[#5f6368] mt-2">Portfolio growth looks slow. Returns barely cover the principal. This is where 80% of investors quit.</p>
             </div>
             <div className="p-6 bg-white border border-[#dadce0] rounded-2xl shadow-sm hover:border-[#188038] transition-all">
                <p className="text-[10px] font-black text-[#188038] uppercase mb-2">Years 6-12</p>
                <p className="text-xs font-bold text-[#202124]">The Critical Mass</p>
                <p className="text-[10px] text-[#5f6368] mt-2">Compounding starts visible acceleration. Your annual interest earned starts to exceed your annual contribution.</p>
             </div>
             <div className="p-6 bg-[#1a1a2e] border border-[#1a1a2e] rounded-2xl shadow-sm text-[#202124]">
                <p className="text-[10px] font-black text-[#4fc3f7] uppercase mb-2">Years 13-25</p>
                <p className="text-xs font-bold">The Exponential Blast</p>
                <p className="text-[10px] text-slate-400 mt-2">The "Magic of Compounding" takes over. Your corpus grows by lakhs every single month without any extra effort.</p>
             </div>
          </div>
        </section>

        <section id="swp" className="mb-16 border-t pt-16">
          <h3 className="text-2xl font-black text-[#202124] mb-4">8. The Ultimate Transition: SIP to SWP</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            The goal of an SIP is not just to have a big number in your Demat account. It is to generate <strong>Financial Freedom</strong>. Once you reach your target corpus, you can stop the SIP and start a <strong>Systematic Withdrawal Plan (SWP)</strong>.
          </p>
          <p className="text-sm text-[#5f6368] leading-relaxed">
            In an SWP, you withdraw a fixed amount every month while the remaining corpus continues to stay invested in the market. If your withdrawal rate (e.g., 8%) is lower than the fund's growth rate (e.g., 12%), your wealth will <strong>continue to grow</strong> even as you "retire" and enjoy a monthly pension.
          </p>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/nea-bill/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nea Bill</a>
                <a href="/calculator/fixed-deposit/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Fixed Deposit</a>
                <a href="/calculator/loan-emi/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Loan Emi</a>
                <a href="/calculator/nepal-land/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Land</a>
                <a href="/calculator/nepal-salary/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Salary</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Financial Engineering Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/loan-emi/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Debt Intelligence</a>
             <a href="/calculator/lumpsum-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Lumpsum Audit</a>
             <a href="/calculator/fixed-deposit/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">FD Yield Lab</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "What is an SIP and how does it work in Nepal?", answer: "A Systematic Investment Plan (SIP) is a method of investing a fixed amount of money regularly (monthly or quarterly) in a mutual fund. In Nepal, open-ended mutual funds regulated by SEBON allow you to start SIPs for as low as Rs. 1,000 per month." },
      { question: "Can I stop or pause my SIP in Nepal at any time?", answer: "Yes. Unlike an EMI, an SIP is flexible. You can pause, stop, or increase your SIP installments at any time without any penalties, provided the mutual fund is open-ended." },
      { question: "What are the historical returns of SIPs in the NEPSE market?", answer: "Historically, equity-oriented mutual funds in Nepal have delivered annual returns ranging from 12% to 18% over a 5-10 year horizon. However, returns are market-linked and not guaranteed." },
      { question: "Do I need a DEMAT account to start an SIP in Nepal?", answer: "Yes, you need a DEMAT account and a CRN number. Most mutual funds in Nepal are now digital, and you can manage your SIP through the AMC's portal or apps like MeroShare (for some components)." },
      { question: "What is Rupee Cost Averaging in an SIP?", answer: "Rupee Cost Averaging is a strategy where you buy more units when market prices (NAV) are low and fewer units when prices are high. Over time, this averages out the cost of your units and often results in higher returns than trying to time the market." },
      { question: "Is there any tax on SIP returns in Nepal?", answer: "Mutual fund dividends are subject to a 5% Final Withholding Tax (TDS). When you sell your units, Capital Gains Tax (CGT) of 5% (Long Term) or 7.5% (Short Term) is applicable on the profit earned." }
    ]
  },

  'nea-bill': {
    title: "NEA Electricity Bill Calculator 2081/82 | Official Tariff Lab & Efficiency Guide",
    description: "Calculate your Nepal Electricity Authority (NEA) monthly bill with institutional precision. Includes 1500+ words on current 2081/82 tariffs, service fees, energy charges, and solar net-metering logic. Updated for 2082 rates.",
    howToUse: {
      steps: [
        "Select Meter Capacity: Choose your Ampere limit (Standard domestic tiers are 5A, 15A, 30A, or 60A).",
        "Enter Current Reading: Input the total units (kWh) consumed as displayed on your meter for the cycle.",
        "Energy Charge Audit: View the step-wise billing across NEA's progressive tariff slabs.",
        "Service Fee Breakdown: Analyze the fixed monthly cost associated with your connection capacity.",
        "Penalty/Rebate Assessment: Review the financial impact of early payments or late penalties.",
        "Net Payable: Determine the final amount including all statutory levies and energy costs."
      ]
    },
    faqs: [
      {
        question: "What is the cost of 1 unit of electricity in Nepal for 2081/82?",
        answer: "The price of 1 unit varies by slab. For a 5A connection, the first 20 units are subsidised (energy charge is Rs. 0). Beyond that, rates range from Rs. 6.50 to Rs. 11.00 per unit depending on total consumption."
      },
      {
        question: "How is the NEA bill calculated for 31 units?",
        answer: "For 31 units on a 5A meter: The first 20 units have no energy charge, the next 10 units are charged at Rs. 6.50 (Rs. 65), and the 31st unit is charged at the next slab rate (Rs. 8.00). Total energy charge = Rs. 73, plus the fixed service charge."
      },
      {
        question: "Is there a rebate for paying the NEA bill early?",
        answer: "Yes, NEA offers a 2% rebate on the energy charge if the bill is paid within 7 days of the meter reading date. This is an excellent way for households to reduce monthly utility costs."
      },
      {
        question: "What are the penalties for late NEA bill payments?",
        answer: "After 16 days of the meter reading, a 5% penalty applies. This increases to 10% after 30 days and 25% after 40 days. If the bill remains unpaid for 60 days, the NEA may disconnect the line."
      },
      {
        question: "Does the NEA bill include the electricity for street lights?",
        answer: "No, the domestic bill calculated by this tool is for private consumption. Municipalities are responsible for street light charges, though some areas may have community-based lighting contributions."
      },
      {
        question: "How can I check my NEA bill online in Nepal?",
        answer: "You can check your bill through the official NEA website or mobile app by entering your SC Number and Customer ID found on your physical bill or meter book."
      }
    ],
    formula: {
      title: "The Progressive Energy Summation Algorithm",
      description: "NEA utilizes a tiered (slab) billing model. Each unit block is charged at a different rate to encourage conservation. Our engine executes a sequential summation of these blocks based on your meter&apos;s Ampere rating.",
      raw: "Total Bill = Service Charge + Σ (Units in Slab_i x Rate_i) + Taxes/Levies"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: NEA Billing & Energy Strategy in Nepal</h2>
        
        <div className="bg-[#E8F0FE] border-2 border-[#1a73e8]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a73e8] rounded-full blur-[60px] opacity-10" />
          <h4 className="text-[#1967d2] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Energy Masterclass Navigation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#3c4043] uppercase tracking-tighter">
             <a href="#tariffs" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>01.</span> Domestic Tariff Slabs (2081/82)</a>
             <a href="#capacity" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>02.</span> Meter Capacity: 5A vs 15A vs 30A</a>
             <a href="#service" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>03.</span> Service Charges & Fixed Fees</a>
             <a href="#lifeline" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>04.</span> The 20-Unit "Lifeline" Subsidy</a>
             <a href="#penalties" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>05.</span> Late Payment & Penalty Matrix</a>
             <a href="#tod" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>06.</span> TOD (Time-of-Day) Pricing Theory</a>
             <a href="#solar" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>07.</span> Solar Net-Metering Mechanics</a>
             <a href="#efficiency" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>08.</span> Home Energy Audit Protocols</a>
             <a href="#industrial" className="flex items-center gap-2 hover:text-[#1a73e8] transition-all"><span>09.</span> Commercial & Industrial Tiers</a>
          </div>
        </div>

        <section id="tariffs" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. Current Domestic Tariff Slabs (FY 2081/82)</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            The Nepal Electricity Authority (NEA) has established a progressive billing system designed to subsidize low-volume users while charging higher rates for heavy consumption. Our <strong>nea bill calculator nepal</strong> is updated with the latest <strong>nepal electricity bill rate 2082</strong> projections.
          </p>
          <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm mb-8">
            <table className="w-full text-left text-xs bg-white">
              <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                <tr>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Unit Slab (kWh)</th>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">5 Ampere Rate</th>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">15 Ampere Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dadce0]">
                <tr className="hover:bg-[#f8f9fa] transition-colors">
                  <td className="p-5 font-black text-[#3c4043]">0 - 20 Units</td>
                  <td className="p-5 text-[#188038] font-bold">Rs. 0 (Energy Charge Only)</td>
                  <td className="p-5 text-[#3c4043]">Rs. 4.00</td>
                </tr>
                <tr className="hover:bg-[#f8f9fa] transition-colors">
                  <td className="p-5 font-black text-[#3c4043]">21 - 30 Units</td>
                  <td className="p-5 text-[#3c4043]">Rs. 6.50</td>
                  <td className="p-5 text-[#3c4043]">Rs. 6.50</td>
                </tr>
                <tr className="hover:bg-[#f8f9fa] transition-colors">
                  <td className="p-5 font-black text-[#3c4043]">31 - 50 Units</td>
                  <td className="p-5 text-[#3c4043]">Rs. 8.00</td>
                  <td className="p-5 text-[#3c4043]">Rs. 8.00</td>
                </tr>
                <tr className="hover:bg-[#f8f9fa] transition-colors">
                  <td className="p-5 font-black text-[#3c4043]">51 - 100 Units</td>
                  <td className="p-5 text-[#3c4043]">Rs. 9.50</td>
                  <td className="p-5 text-[#3c4043]">Rs. 9.50</td>
                </tr>
                <tr className="hover:bg-[#f8f9fa] transition-colors">
                  <td className="p-5 font-black text-[#3c4043]">101 - 250 Units</td>
                  <td className="p-5 text-[#3c4043]">Rs. 10.00</td>
                  <td className="p-5 text-[#3c4043]">Rs. 10.00</td>
                </tr>
                <tr className="hover:bg-[#f8f9fa] transition-colors">
                  <td className="p-5 font-black text-[#3c4043]">Above 250 Units</td>
                  <td className="p-5 text-[#d93025] font-bold">Rs. 11.00</td>
                  <td className="p-5 text-[#d93025] font-bold">Rs. 11.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-[#5f6368] font-bold italic">
            Understanding <strong>how to calculate electricity bill in nepal</strong> requires knowing these tiers. For example, <strong>40 units of electricity cost</strong> more per unit than the 20-unit lifeline tier.
          </p>
        </section>

        <section id="lifeline" className="mb-16 p-10 bg-[#fff3e0] border border-[#ffb74d]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#e65100] mb-4">4. The 20-Unit "Lifeline" Subsidy</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            To support low-income households, the NEA provides a 'Lifeline' tariff. For customers with a 5 Ampere connection, if the monthly consumption is 20 units or less, the energy charge is waived. Only the fixed service charge of Rs. 30 is payable. This is the <strong>price of 1 unit of electricity in nepal 2082</strong> benchmark for minimal users.
          </p>
          <div className="bg-white p-6 rounded-2xl border border-[#ffccbc]">
             <p className="text-xs font-black text-[#e65100] uppercase mb-2 tracking-tighter">Strategic Insight:</p>
             <p className="text-[11px] text-[#5f6368] leading-relaxed">
               "If you are a student living in a single room or a small household with only LED bulbs and a phone charger, staying below the 20-unit threshold can reduce your electricity cost to just Rs. 30 per month. Monitoring your meter weekly is key to staying within this subsidy."
             </p>
          </div>
        </section>

        <section id="penalties" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">5. The Penalty Matrix: The Cost of Delay</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            Timely payment of electricity bills is rewarded in Nepal, while delays are heavily penalized. This structure ensures a steady cash flow for the utility to maintain infrastructure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-6 border border-[#81c784] bg-[#f1f8e9] rounded-2xl text-center shadow-sm">
                <p className="text-[10px] font-black text-[#1b5e20] uppercase mb-2">Within 7 Days</p>
                <p className="text-sm font-black text-[#1b5e20]">2% Rebate</p>
                <p className="text-[10px] text-[#5f6368] mt-2">Discount on the energy charge.</p>
             </div>
             <div className="p-6 border border-[#dadce0] bg-white rounded-2xl text-center shadow-sm">
                <p className="text-[10px] font-black text-[#5f6368] uppercase mb-2">8 - 15 Days</p>
                <p className="text-sm font-black text-[#3c4043]">No Rebate/Penalty</p>
                <p className="text-[10px] text-[#5f6368] mt-2">Pay the actual bill amount.</p>
             </div>
             <div className="p-6 border border-[#e57373] bg-[#ffebee] rounded-2xl text-center shadow-sm">
                <p className="text-[10px] font-black text-[#c62828] uppercase mb-2">After 16 Days</p>
                <p className="text-sm font-black text-[#c62828]">5% - 25% Penalty</p>
                <p className="text-[10px] text-[#5f6368] mt-2">Penalty increases with duration.</p>
             </div>
          </div>
          <p className="text-[10px] text-[#5f6368] font-bold italic mt-4 text-center">
            Avoid penalties by using our <strong>nea electricity bill calculator</strong> to budget in advance. Official data can be confirmed on the <a href="https://nea.org.np/" target="_blank" rel="noopener noreferrer" className="text-[#1a73e8] hover:underline font-bold">Nepal Electricity Authority</a> portal.
          </p>
        </section>

        <section id="solar" className="mb-16 bg-[#1a1a2e] text-[#202124] p-10 rounded-lg shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#fbc02d] rounded-full blur-[100px] opacity-10" />
          <h3 className="text-2xl font-black text-[#fbc02d] mb-4">7. Solar Net-Metering: Generating Capital</h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            The NEA has introduced <strong>Net-Metering</strong> for households with Solar PV systems. Under this policy, you can "sell" your excess solar energy back to the national grid. This is a primary component of a <strong>solar requirement calculator</strong> for sustainable homes.
          </p>
          <div className="p-6 border border-slate-700 rounded-2xl bg-slate-800/50">
             <p className="text-xs font-bold text-[#4fc3f7] uppercase mb-2 tracking-widest">How it Works:</p>
             <p className="text-[11px] text-slate-400 leading-relaxed">
                A bidirectional meter tracks the units you export. If you export 100 units and consume 120 units, you only pay for the net 20 units. If you export more than you consume, the units are carried forward to the next month as credits.
             </p>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mb-4">
             <h3 className="text-md font-bold text-[#202124] mb-2">Official Data Reference</h3>
             <p className="text-sm text-slate-600">Calculations are modeled according to the guidelines of: <a href="https://www.nea.org.np" target="_blank" rel="nofollow noopener" className="text-[#1a0dab] underline font-medium">Nepal Electricity Authority</a>.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/fixed-deposit/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Fixed Deposit</a>
                <a href="/calculator/loan-emi/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Loan Emi</a>
                <a href="/calculator/nepal-land/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Land</a>
                <a href="/calculator/nepal-salary/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Salary</a>
                <a href="/calculator/nepal-stocks/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Stocks</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Utility Intelligence Ecosystem</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/nea-bill/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Electricity Lab</a>
             <a href="/calculator/kukl-bill/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Water Bill Audit</a>
             <a href="/calculator/solar-requirement/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Solar Design</a>
             <a href="/calculator/unit-converter/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Unit Conversion</a>
             <a href="/calculator/nepal-land/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Land Unit Converter</a>
          </div>
        </div>
      </>
    )
  },

  'fixed-deposit': {
    title: "Fixed Deposit Calculator Nepal 2081/82 | Institutional FD Audit & Yield Lab",
    description: "The definitive systematic resource for FD planning in Nepal. Includes 1500+ words on maturity growth, monthly/quarterly compounding logic, and institutional TDS impact for 2081/82.",
    howToUse: {
      steps: [
        "Principal Allocation: Enter the total capital you intend to lock in NPR (Banks often require Rs. 10,000 minimum).",
        "Yield Calibration: Input the annual interest rate (Commercial banks currently offer 7-9% for individuals).",
        "Maturity Horizon: Select the total duration (Standard cycles range from 3 months to 10 years).",
        "Compounding Frequency: Choose between 'Monthly' and 'Quarterly' (Quarterly is the institutional standard).",
        "Tax Adjustment: Select 'Individual' (5% TDS) or 'Corporate' (15% TDS) for net maturity auditing.",
        "Maturity Analysis: Review the final corpus, pure interest gain, and the tax withheld by the bank."
      ]
    },
    formula: {
      title: "The Compound Interest Axiom",
      description: "Nepal&apos;s banking sector operates on discrete compounding. For maturity at term, the principal grows using the standard compound interest formula with frequency 'n' representing quarterly cycles.",
      latex: "A = P(1 + r/n)^{nt}",
      raw: "Maturity = Principal x (1 + Rate / Frequency)^(Frequency x Years)"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Fixed Deposit (FD) Strategy in Nepal</h2>
        
        <div className="bg-[#fff7e0] border-2 border-[#fbc02d]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#fbc02d] rounded-full blur-[60px] opacity-10" />
          <h4 className="text-[#f57f17] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Wealth Preservation Masterclass</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-[#3c4043] uppercase tracking-tighter">
             <a href="#compounding" className="flex items-center gap-2 hover:text-[#f57f17] transition-all"><span>01.</span> Monthly vs Quarterly Compounding</a>
             <a href="#tds" className="flex items-center gap-2 hover:text-[#f57f17] transition-all"><span>02.</span> TDS: Individual vs Institutional Rates</a>
             <a href="#senior" className="flex items-center gap-2 hover:text-[#f57f17] transition-all"><span>03.</span> Senior Citizen Premium Yields</a>
             <a href="#loan" className="flex items-center gap-2 hover:text-[#f57f17] transition-all"><span>04.</span> Loan Against FD (90% Rule)</a>
             <a href="#liquidity" className="flex items-center gap-2 hover:text-[#f57f17] transition-all"><span>05.</span> Early Withdrawal Penalties</a>
             <a href="#nrb" className="flex items-center gap-2 hover:text-[#f57f17] transition-all"><span>06.</span> NRB Deposit Insurance (Rs. 5 Lakhs)</a>
             <a href="#laddering" className="flex items-center gap-2 hover:text-[#f57f17] transition-all"><span>07.</span> The FD Laddering Strategy</a>
             <a href="#remittance" className="flex items-center gap-2 hover:text-[#f57f17] transition-all"><span>08.</span> Remittance FD: The 1% Bonus</a>
             <a href="#corporate" className="flex items-center gap-2 hover:text-[#f57f17] transition-all"><span>09.</span> Treasury Management for Companies</a>
          </div>
        </div>

        <section id="compounding" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. Compounding Dynamics: Why Frequency Matters</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            In Nepal, the "Headline Rate" is only half the story. Most commercial banks provide <strong>Quarterly Compounding</strong> as their standard. However, some banks offer <strong>Monthly Payouts</strong>, which is preferred by retirees for monthly income.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="p-8 bg-white border border-[#dadce0] rounded-lg shadow-sm">
               <h4 className="text-xs font-black uppercase text-[#1a73e8] tracking-widest mb-4">Quarterly Compound</h4>
               <p className="text-xs text-[#5f6368] leading-relaxed">
                 Interest is added back to your principal every 3 months. This increases your <strong>Effective Annual Yield (EAY)</strong>. For a 9% rate, your effective rate becomes ~9.31%.
               </p>
            </div>
            <div className="p-8 bg-white border border-[#dadce0] rounded-lg shadow-sm">
               <h4 className="text-xs font-black uppercase text-[#188038] tracking-widest mb-4">Monthly Payout</h4>
               <p className="text-xs text-[#5f6368] leading-relaxed">
                 Interest is credited to your savings account every month. While this provides regular income, you lose the "interest on interest" growth, making it less effective for wealth building.
               </p>
            </div>
          </div>
        </section>

        <section id="tds" className="mb-16 p-10 bg-[#e8f5e9] border border-[#81c784]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#1b5e20] mb-4">2. TDS Mastery: Individual vs Corporate</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            The interest you earn on an FD in Nepal is subject to <strong>Withholding Tax (TDS)</strong>. This is a final tax for individuals, meaning you don&apos;t need to pay extra tax on this interest during your annual filing.
          </p>
          <ul className="space-y-4 text-xs font-bold text-[#3c4043] list-none p-0">
             <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#1b5e20]" /> <strong>Individuals:</strong> 5% Final TDS on interest.</li>
             <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#1b5e20]" /> <strong>Institutions:</strong> 15% TDS on interest.</li>
             <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#1b5e20]" /> <strong>Non-Residents:</strong> 15% - 25% depending on DTAA.</li>
          </ul>
        </section>

        <section id="loan" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">4. Liquidity Architecture: The 90% Loan Rule</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            One of the biggest advantages of a Fixed Deposit in Nepal is the <strong>Loan Against FD</strong>. If you need urgent cash, you don&apos;t have to break your FD and pay penalties.
          </p>
          <div className="p-8 bg-[#1a1a2e] text-[#202124] rounded-lg shadow-sm">
             <h4 className="text-lg font-black text-[#4fc3f7] mb-4">Institutional Mechanics:</h4>
             <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Banks allow you to borrow up to 90% of your FD amount instantly. The interest rate on this loan is typically only 1.5% to 2% higher than the rate you are earning on your FD.
             </p>
             <p className="text-xs font-black uppercase tracking-widest text-[#202124] border-l-4 border-[#1a73e8] pl-4">
                Math: If your FD earns 9%, your loan cost is ~11%. This is significantly cheaper than a Personal Loan (13-16%).
             </p>
          </div>
        </section>

        <section id="laddering" className="mb-16 border-t pt-16">
          <h3 className="text-2xl font-black text-[#202124] mb-4">7. The FD Laddering Strategy for Nepal</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            To combat interest rate volatility, professional investors in Nepal use <strong>Laddering</strong>. Instead of putting Rs. 10 Lakhs into a single 5-year FD, they split it into five FDs of Rs. 2 Lakhs each with tenures of 1, 2, 3, 4, and 5 years.
          </p>
          <p className="text-sm text-[#5f6368] leading-relaxed">
            As each FD matures every year, you reinvest it for another 5 years. This ensures that you have liquidity every year and your average return matches the market's peak rates over time.
          </p>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/loan-emi/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Loan Emi</a>
                <a href="/calculator/nepal-land/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Land</a>
                <a href="/calculator/nepal-salary/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Salary</a>
                <a href="/calculator/nepal-stocks/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Stocks</a>
                <a href="/calculator/property-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Property Tax</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Banking Intelligence Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/loan-emi/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">EMI Planner</a>
             <a href="/calculator/cagr-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Growth Auditor</a>
             <a href="/calculator/remittance-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Remittance Lab</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the difference between simple and compound interest in an FD?", answer: "Simple interest is calculated only on the principal. In a compound interest FD (Standard in Nepal), the interest you earn each quarter is added to your principal, so you earn interest on your interest in the next quarter." },
      { question: "How much TDS is deducted from FD interest in Nepal?", answer: "For individuals, a 5% Final Withholding Tax (TDS) is deducted. For companies and institutions, the rate is 15%. This is deducted automatically by the bank before crediting your interest." },
      { question: "Can I break my Fixed Deposit before the maturity date?", answer: "Yes, but you will typically face a penalty of 1% to 2% reduction in the interest rate, and the interest will be calculated for the actual duration the money was held, not the original term." },
      { question: "Is my money safe in a bank FD in Nepal?", answer: "Yes. All commercial banks (Class A) are regulated by NRB. Additionally, deposits up to Rs. 5,00,000 are insured by the Deposit and Credit Guarantee Fund (DCGF)." },
      { question: "What is a 'Senior Citizen FD'?", answer: "Many banks in Nepal offer a 0.5% to 1% higher interest rate for customers aged 60 and above as part of their social responsibility and senior citizen welfare." },
      { question: "What happens to my FD after the maturity date?", answer: "Unless you provide 'No Auto-Renewal' instructions, most banks will automatically renew your FD for the same term at the prevailing interest rate on that day." }
    ]
  },
  'loan-emi': {
    title: "Loan EMI Calculator Nepal 2081/82 | Institutional Amortization Lab",
    description: "The definitive systematic resource for loan planning in Nepal. Calculate home, auto, and personal loan EMIs using 1500+ words of amortization depth, NRB base-rate logic, and debt-reduction strategies.",
    howToUse: {
      steps: [
        "Principal Allocation: Input the total loan amount required in NPR (Institutional caps vary by bank).",
        "Interest Calibration: Define the annual interest rate (Note the NRB Base Rate + Premium model).",
        "Tenure Selection: Choose the total loan duration in years (Housing loans often go up to 20-25 years).",
        "Amortization Audit: Analyze the monthly repayment breakdown between Principal and Interest.",
        "Prepayment Strategy: Evaluate the impact of making periodic extra payments on the total interest saved.",
        "Net Commitment: Review the total repayment amount and the net interest multiplier over the tenure."
      ]
    },
    formula: {
      title: "The Standard Amortization Equation",
      description: "Banks in Nepal utilize the Reducing Balance Method. The EMI is calculated such that a larger portion of the payment goes towards interest in the early years, gradually shifting towards the principal as the balance decreases.",
      latex: "E = P \\times r \\times \\frac{(1 + r)^n}{(1 + r)^n - 1}",
      raw: "EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]"
    },
    content: (
      <>
        <h2 className="text-3xl font-black text-[#202124] mb-6 tracking-tighter uppercase">The Institutional Encyclopedia: Loan EMI & Amortization in Nepal</h2>
        
        <div className="bg-[#1a1a2e] border-2 border-[#1a73e8]/20 rounded-lg p-10 mb-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#1a73e8] rounded-full blur-[120px] opacity-10" />
          <h4 className="text-[#4fc3f7] font-black text-xs uppercase tracking-[0.4em] mb-6 mt-0">Debt Management Masterclass</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
             <a href="#reducing" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>01.</span> Reducing Balance vs Flat Rate Math</a>
             <a href="#baserate" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>02.</span> NRB Base Rate + Premium Model</a>
             <a href="#amortization" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>03.</span> The Front-Loaded Interest Trap</a>
             <a href="#prepayment" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>04.</span> Prepayment: The Interest Shield</a>
             <a href="#homeloan" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>05.</span> Home Loan Eligibility (DSR Rules)</a>
             <a href="#autoloan" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>06.</span> Auto Loan: The 50% LTV Constraint</a>
             <a href="#cycles" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>07.</span> Interest Rate Cycles: Fixed vs Floating</a>
             <a href="#defaults" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>08.</span> Penalty & CIC Blacklisting Risks</a>
             <a href="#optimization" className="flex items-center gap-2 hover:text-[#202124] transition-all"><span>09.</span> Refinancing & Debt Consolidation</a>
          </div>
        </div>

        <section id="reducing" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">1. The Math: Reducing Balance vs Flat Rate</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            In Nepal, most commercial banks (Class A) are mandated to use the <strong>Reducing Balance Method</strong>. Unlike the "Flat Rate" often used by unorganized lenders, where interest is charged on the original principal for the entire duration, reducing balance only charges interest on the <strong>unpaid amount</strong>.
          </p>
          <div className="p-8 border-2 border-dashed border-[#dadce0] rounded-lg mb-8">
            <p className="text-xs font-black text-[#202124] uppercase mb-2">Institutional Warning:</p>
            <p className="text-[11px] text-[#5f6368] leading-relaxed">
              "A 10% Flat Rate is actually equivalent to roughly 18-19% on a Reducing Balance basis. Always ensure your banker is quoting you the <strong>Reducing EMI</strong> rate to avoid paying double the interest."
            </p>
          </div>
        </section>

        <section id="baserate" className="mb-16 border-l-4 border-[#1a73e8] pl-10">
          <h3 className="text-2xl font-black text-[#202124] mb-4">2. The NRB Pricing Model: Base Rate + Premium</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            Nepal Rastra Bank (NRB) regulates how banks set interest rates. Your interest rate is typically defined as <code>Base Rate + Premium %</code>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-6 bg-white border border-[#dadce0] rounded-2xl shadow-sm">
                <h4 className="text-xs font-black uppercase text-[#1a73e8] tracking-widest mb-3">The Base Rate</h4>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">
                  This is the bank&apos;s cost of funds. It changes quarterly. If the Base Rate drops, your floating-rate EMI interest component should also drop.
                </p>
             </div>
             <div className="p-6 bg-white border border-[#dadce0] rounded-2xl shadow-sm">
                <h4 className="text-xs font-black uppercase text-[#188038] tracking-widest mb-3">The Premium</h4>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">
                  This is the margin the bank charges you above the base rate. This remains <strong>fixed</strong> for the duration of your loan as per the offer letter.
                </p>
             </div>
          </div>
        </section>

        <section id="prepayment" className="mb-16 p-10 bg-[#e3f2fd] border border-[#2196f3]/30 rounded-lg">
          <h3 className="text-2xl font-black text-[#0d47a1] mb-4">4. Prepayment: The Ultimate Wealth Strategy</h3>
          <p className="text-sm text-[#3c4043] leading-relaxed mb-6">
            The secret to paying off a 20-year loan in 12 years is <strong>Prepayment</strong>. Because interest is front-loaded, making extra principal payments in the first 5 years of the loan has a massive impact.
          </p>
          <div className="bg-white p-8 rounded-2xl border border-[#bbdefb]">
             <p className="text-xs font-black text-[#0d47a1] uppercase mb-4 tracking-widest text-center">The "One Extra EMI" Power</p>
             <p className="text-[11px] text-[#5f6368] leading-relaxed italic text-center">
               "If you pay just one extra EMI every year, you can reduce a 20-year home loan by nearly <strong>4 years</strong> and save lakhs in interest. Our calculator's amortization table helps you visualize this exact trajectory."
             </p>
          </div>
        </section>

        <section id="homeloan" className="mb-16">
          <h3 className="text-2xl font-black text-[#202124] mb-6">5. Home Loan Eligibility & DSR in Nepal</h3>
          <p className="text-sm text-[#5f6368] leading-relaxed mb-6">
            NRB mandates a <strong>Debt Service Ratio (DSR)</strong> of 50% for most retail loans. This means your total monthly EMIs (including existing loans) cannot exceed 50% of your verifiable monthly income.
          </p>
          <div className="overflow-hidden rounded-[2rem] border border-[#dadce0] shadow-sm mb-8">
            <table className="w-full text-left text-xs bg-white">
              <thead className="bg-[#f8f9fa] border-b border-[#dadce0]">
                <tr>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Loan Type</th>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">LTV (Loan-to-Value)</th>
                  <th className="p-5 font-black text-[#202124] uppercase tracking-widest">Standard Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dadce0]">
                <tr>
                  <td className="p-5 font-black text-[#3c4043]">First Home (Residency)</td>
                  <td className="p-5 text-[#3c4043]">Up to 70%</td>
                  <td className="p-5 text-[#3c4043]">Base Rate + 2.0% - 4.5%</td>
                </tr>
                <tr>
                  <td className="p-5 font-black text-[#3c4043]">Real Estate Investment</td>
                  <td className="p-5 text-[#3c4043]">Up to 40% (Kathmandu)</td>
                  <td className="p-5 text-[#3c4043]">Base Rate + 5.0% - 6.0%</td>
                </tr>
                <tr>
                  <td className="p-5 font-black text-[#3c4043]">EV Auto Loan</td>
                  <td className="p-5 text-[#3c4043]">Up to 80%</td>
                  <td className="p-5 text-[#3c4043]">Base Rate + 1.5% - 3.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          
          <div className="mb-4">
             <h3 className="text-md font-bold text-[#202124] mb-2">Official Data Reference</h3>
             <p className="text-sm text-slate-600">Calculations are modeled according to the guidelines of: <a href="https://www.nrb.org.np" target="_blank" rel="nofollow noopener" className="text-[#1a0dab] underline font-medium">Nepal Rastra Bank (NRB)</a>.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/nepal-land/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Land</a>
                <a href="/calculator/nepal-salary/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Salary</a>
                <a href="/calculator/nepal-stocks/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Nepal Stocks</a>
                <a href="/calculator/property-tax/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Property Tax</a>
                <a href="/calculator/property-registration/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">Property Registration</a>
             </div>
          </div>
        </section>
        

        <div className="mt-12 pt-10 border-t border-[#dadce0] text-center">
          <p className="text-[10px] font-black text-[#70757a] uppercase tracking-widest mb-4">Debt Architecture Silo</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="/calculator/fixed-deposit/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Capital Yield Lab</a>
             <a href="/calculator/sip-calculator/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Wealth Accumulation</a>
             <a href="/calculator/property-registration/" className="px-8 py-3 bg-[#f8f9fa] border border-[#dadce0] rounded-full text-[11px] font-black text-[#1a73e8] hover:bg-[#e8f0fe] transition-all uppercase tracking-tighter">Malpot Fee Audit</a>
          </div>
        </div>
      </>
    ),
    faqs: [
      { question: "What is the difference between a fixed and floating interest rate in Nepal?", answer: "A fixed rate stays the same for a set period (e.g., 5 years), providing certainty. A floating rate changes every quarter based on the bank&apos;s Base Rate. NRB currently encourages floating rates to reflect market dynamics." },
      { question: "Can I pay off my loan early in Nepal?", answer: "Yes. However, banks may charge a 'Prepayment Fee' (typically 1% to 2% of the prepaid amount) if you close the loan early or make large part-payments. EV loans and certain personal loans often have zero prepayment fees." },
      { question: "How does the 'Base Rate' affect my monthly EMI?", answer: "If your loan is on a floating rate, the bank reviews it every three months. If the base rate increases, the bank will either increase your EMI amount or extend the loan tenure. You have the right to choose between these two options." },
      { question: "What is LTV (Loan-to-Value) ratio?", answer: "LTV is the percentage of the property or vehicle value that the bank will lend. For a home in Kathmandu, the LTV for a first-time buyer is currently up to 70%, meaning you must pay 30% as a down payment." },
      { question: "What documents are required for a home loan EMI approval in Nepal?", answer: "Standard requirements include a Land Ownership Certificate (Lalpurja), Blue Print, Trace Map, Tax Clearance from the Wada office, Income Source (Salary slip/Audit report), and a Citizenship certificate." },
      { question: "What happens if I miss an EMI payment?", answer: "Late payments attract a 'Penal Interest' (typically 2% above the loan rate) on the overdue amount. Repeated defaults can lead to your name being listed in the Credit Information Bureau (CIB) blacklist, affecting future loan eligibility." }
    ]
  },
};
