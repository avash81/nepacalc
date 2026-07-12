'use client';
import { useMemo, useState } from 'react';
import { useSyncState } from '@/hooks/useSyncState';
import { calculateIncomeTax } from '@/utils/math/country-rules/nepal-income-tax/calculator';
import { IncomeTaxInputs } from '@/utils/math/country-rules/nepal-income-tax/types';
import { IncomeTaxHero } from './components/IncomeTaxHero';
import { QuickSummary } from './components/QuickSummary';
import { IncomeTaxForm } from './components/IncomeTaxInputs';
import { IncomeTaxDashboard } from './components/IncomeTaxDashboard';
import { TaxTimeline } from './components/TaxTimeline';
import Link from 'next/link';
import { ArrowRight, Printer, Share2, Calculator as CalcIcon, Copy, Download } from 'lucide-react';

const DEFAULT_STATE: IncomeTaxInputs = {
  annualSalary: 0,
  annualBonus: 0,
  gender: 'male',
  isMarried: false,
  isSSFContributor: true,
  enforceLimits: true,
  ssfContribution: 0,
  epfContribution: 0,
  citContribution: 0,
  lifeInsurance: 0,
  medicalInsurance: 0,
  buildingInsurance: 0,
  educationFee: 0,
  donation: 0,
  csr: 0,
};

export default function NepalIncomeTaxCalculator() {
  const [state, setState] = useSyncState('nepal_income_tax_v1', DEFAULT_STATE);
  const [isMonthly, setIsMonthly] = useState(true);

  // If user inputs monthly salary, we convert it to annual for the state, 
  // but to keep it simple, let's derive it in the render or manage it purely in state.
  // Actually, to avoid complex state syncing for Monthly vs Annual toggle,
  // we can treat `state.annualSalary` as the *display* value of the input,
  // and multiply it by 12 if `isMonthly` is true during calculation.
  
  const update = (updates: Partial<IncomeTaxInputs>) => setState({ ...state, ...updates });

  const summary = useMemo(() => {
    const calculationInputs: IncomeTaxInputs = {
      ...state,
      annualSalary: isMonthly ? state.annualSalary * 12 : state.annualSalary
    };
    return calculateIncomeTax(calculationInputs);
  }, [state, isMonthly]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Nepal Income Tax Calculator',
        text: `My calculated tax is Rs. ${summary.finalTax.toLocaleString('en-IN')}. Calculate yours!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleCopy = () => {
    const text = [
      `Nepal Income Tax (FY 2083/84)`,
      `Gross Income: Rs. ${Math.round(summary.grossIncome).toLocaleString('en-IN')}`,
      `Taxable Income: Rs. ${Math.round(summary.taxableIncome).toLocaleString('en-IN')}`,
      `Annual Tax: Rs. ${Math.round(summary.finalTax).toLocaleString('en-IN')}`,
      `Monthly TDS: Rs. ${Math.round(summary.averageMonthlyTax).toLocaleString('en-IN')}`,
      `Net Salary (Annual): Rs. ${Math.round(summary.netAnnualIncome).toLocaleString('en-IN')}`,
      `Effective Tax Rate: ${(summary.effectiveTaxRate * 100).toFixed(2)}%`,
      `Marginal Rate: ${summary.highestTaxSlab}`,
      `Tax Saved: Rs. ${Math.round(summary.taxSaved).toLocaleString('en-IN')}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    alert('Results copied to clipboard!');
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const fmt = (n: number) => 'Rs. ' + Math.round(n).toLocaleString('en-IN');
    printWindow.document.write(`
      <html><head><title>Nepal Income Tax Report</title>
      <style>body{font-family:sans-serif;padding:32px;color:#202124}h1{color:#1A73E8}table{width:100%;border-collapse:collapse;margin-top:16px}th,td{text-align:left;padding:10px 12px;border-bottom:1px solid #dadce0}th{background:#f8f9fa;font-size:12px;text-transform:uppercase;color:#5f6368}tr:last-child td{font-weight:bold}.footer{margin-top:32px;font-size:11px;color:#5f6368}</style>
      </head><body>
      <h1>Nepal Income Tax Report</h1>
      <p style="color:#5f6368;font-size:14px">FY 2083/84 &mdash; Finance Act 2083 &mdash; NepaCalc.com</p>
      <table>
        <tr><th>Description</th><th>Amount</th></tr>
        <tr><td>Gross Income (Annual)</td><td>${fmt(summary.grossIncome)}</td></tr>
        <tr><td>Total Deductions</td><td>${fmt(summary.totalDeductions)}</td></tr>
        <tr><td>Taxable Income</td><td>${fmt(summary.taxableIncome)}</td></tr>
        <tr><td>Annual Income Tax</td><td>${fmt(summary.finalTax)}</td></tr>
        <tr><td>Monthly TDS</td><td>${fmt(summary.averageMonthlyTax)}</td></tr>
        <tr><td>Net Salary (Annual)</td><td>${fmt(summary.netAnnualIncome)}</td></tr>
        <tr><td>Net Salary (Monthly)</td><td>${fmt(summary.netMonthlyIncome)}</td></tr>
        <tr><td>Effective Tax Rate</td><td>${(summary.effectiveTaxRate * 100).toFixed(2)}%</td></tr>
        <tr><td>Marginal Tax Rate</td><td>${summary.highestTaxSlab}</td></tr>
        <tr><td>Tax Saved by Deductions</td><td>${fmt(summary.taxSaved)}</td></tr>
      </table>
      <p class="footer">Generated by NepaCalc.com &mdash; For estimation purposes only. Verify with your employer or a tax professional.</p>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-24">

      {/* BREADCRUMB + BACK BUTTON STRIP */}
      <div className="bg-white border-b border-[#E8EAED] px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Back Button */}
          <Link
            href="/calculator/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5F6368] hover:text-[#1A73E8] transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs text-[#5F6368]">
            <Link href="/" className="hover:text-[#1A73E8] transition-colors font-medium">Home</Link>
            <span className="text-[#DADCE0]">/</span>
            <Link href="/calculator/" className="hover:text-[#1A73E8] transition-colors font-medium">Calculators</Link>
            <span className="text-[#DADCE0]">/</span>
            <Link href="/calculator/nepal-income-tax/" className="text-[#1A73E8] font-bold" aria-current="page">Nepal Income Tax Calculator</Link>
          </nav>

          {/* Mobile breadcrumb - just current page */}
          <span className="sm:hidden text-xs font-bold text-[#1A73E8] truncate max-w-[200px]">Nepal Income Tax Calculator</span>
        </div>
      </div>

      {/* PAGE TITLE — H1 only, compact */}
      <div className="bg-white border-b border-[#E8EAED] px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-black text-[#202124] tracking-tight">
            Nepal Income Tax Calculator <span className="text-[#1A73E8]">(FY 2083/84)</span>
          </h1>
        </div>
      </div>

      {/* MAIN CONTENT AREA — calculator first */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: INPUTS */}
          <div className="w-full lg:w-5/12 space-y-6">
            <IncomeTaxForm 
              state={state} 
              update={update} 
              isMonthly={isMonthly} 
              setIsMonthly={setIsMonthly} 
            />
          </div>

          {/* RIGHT COLUMN: RESULTS */}
          <div className="w-full lg:w-7/12 space-y-8">
            {summary.grossIncome === 0 ? (
              <div className="bg-white border border-[#DADCE0] rounded-xl shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="bg-blue-50 text-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <CalcIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#202124] mb-2">Enter your salary to see the magic</h3>
                <p className="text-[#5F6368]">We will instantly calculate your exact tax, take-home pay, effective rate, and marginal rate based on the latest FY 2083/84 slabs.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between no-print">
                  <h2 className="text-xl font-black text-[#202124]">Financial Dashboard</h2>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs font-bold text-[#5F6368] hover:text-[#1A73E8] bg-white px-3 py-1.5 border border-[#DADCE0] rounded-md shadow-sm transition-colors">
                      <Copy className="w-3.5 h-3.5" /> <span>Copy</span>
                    </button>
                    <button onClick={handleDownloadPDF} className="flex items-center gap-1.5 text-xs font-bold text-[#5F6368] hover:text-[#1A73E8] bg-white px-3 py-1.5 border border-[#DADCE0] rounded-md shadow-sm transition-colors">
                      <Download className="w-3.5 h-3.5" /> <span>PDF</span>
                    </button>
                    <button onClick={handlePrint} className="flex items-center gap-1.5 text-xs font-bold text-[#5F6368] hover:text-[#1A73E8] bg-white px-3 py-1.5 border border-[#DADCE0] rounded-md shadow-sm transition-colors">
                      <Printer className="w-3.5 h-3.5" /> <span>Print</span>
                    </button>
                    <button onClick={handleShare} className="flex items-center gap-1.5 text-xs font-bold text-[#5F6368] hover:text-[#1A73E8] bg-white px-3 py-1.5 border border-[#DADCE0] rounded-md shadow-sm transition-colors">
                      <Share2 className="w-3.5 h-3.5" /> <span>Share</span>
                    </button>
                  </div>
                </div>

                <IncomeTaxDashboard summary={summary} />
                
                <TaxTimeline summary={summary} />
                
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-sm text-blue-900">
                  <span className="font-bold block mb-1">Why is my tax this amount?</span>
                  Your taxable income entered the <span className="font-bold">{summary.highestTaxSlab}</span> tax slab. 
                  You also saved <span className="font-bold">Rs. {summary.taxSaved.toLocaleString('en-IN')}</span> through approved deductions and tax rules.
                </div>
              </>
            )}

            {/* CALL TO ACTIONS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <Link href="/calculator/nepal-salary/" className="bg-white border border-[#DADCE0] rounded-lg p-4 flex items-center justify-between hover:border-[#1A73E8] hover:shadow-sm transition-all group">
                <div>
                  <span className="block text-[10px] font-bold text-[#5F6368] uppercase mb-1">Need Net Pay?</span>
                  <span className="block text-sm font-bold text-[#202124] group-hover:text-[#1A73E8]">Salary Calculator</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#DADCE0] group-hover:text-[#1A73E8]" />
              </Link>
              <Link href="/calculator/nepal-tds/" className="bg-white border border-[#DADCE0] rounded-lg p-4 flex items-center justify-between hover:border-[#1A73E8] hover:shadow-sm transition-all group">
                <div>
                  <span className="block text-[10px] font-bold text-[#5F6368] uppercase mb-1">Need Withholding?</span>
                  <span className="block text-sm font-bold text-[#202124] group-hover:text-[#1A73E8]">TDS Calculator</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#DADCE0] group-hover:text-[#1A73E8]" />
              </Link>
              <Link href="/income-tax/nepal-income-tax-slab-2083-84/" className="bg-white border border-[#DADCE0] rounded-lg p-4 flex items-center justify-between hover:border-[#1A73E8] hover:shadow-sm transition-all group">
                <div>
                  <span className="block text-[10px] font-bold text-[#5F6368] uppercase mb-1">Tax Guide</span>
                  <span className="block text-sm font-bold text-[#202124] group-hover:text-[#1A73E8]">View 2083/84 Slabs</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#DADCE0] group-hover:text-[#1A73E8]" />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* BELOW CALCULATOR — description, badges, quick summary cards */}
      <div className="bg-white border-t border-[#E8EAED] px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Description + Badges */}
          <p className="text-base text-[#5F6368] mb-5 max-w-3xl">
            Calculate your Nepal income tax accurately using the latest FY 2083/84 tax slabs. Fully compliant with the Government of Nepal Finance Act updates.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 bg-[#F1F3F4] text-[#3C4043] px-3 py-1.5 rounded-md border border-[#DADCE0] text-sm font-medium">✓ Finance Act 2083/84</span>
            <span className="inline-flex items-center gap-1.5 bg-[#F1F3F4] text-[#3C4043] px-3 py-1.5 rounded-md border border-[#DADCE0] text-sm font-medium">✓ Latest IRD Tax Slabs</span>
            <span className="inline-flex items-center gap-1.5 bg-[#F1F3F4] text-[#3C4043] px-3 py-1.5 rounded-md border border-[#DADCE0] text-sm font-medium">✓ SSF Compatible</span>
            <span className="inline-flex items-center gap-1.5 bg-[#F1F3F4] text-[#3C4043] px-3 py-1.5 rounded-md border border-[#DADCE0] text-sm font-medium">✓ Free</span>
          </div>
          {/* Quick Summary — compact inline chips */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Updated', value: 'FY 2083/84' },
              { label: 'Top Rate', value: '29%' },
              { label: 'Tax Free', value: '1st Slab (SSF)' },
              { label: 'Compliance', value: 'Govt Compliant' },
            ].map(chip => (
              <div key={chip.label} className="inline-flex items-center gap-1.5 bg-[#F1F3F4] border border-[#DADCE0] rounded-md px-3 py-1.5">
                <span className="text-xs text-[#5F6368]">{chip.label}:</span>
                <span className="text-xs font-bold text-[#202124]">{chip.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* MOBILE STICKY FOOTER */}
      {summary.grossIncome > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#DADCE0] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 lg:hidden z-50 flex items-center justify-between">
          <div>
            <span className="block text-[10px] font-bold text-[#5F6368] uppercase">Take Home (Monthly)</span>
            <span className="block text-lg font-black text-[#1A73E8]">Rs. {Math.round(summary.netMonthlyIncome).toLocaleString('en-IN')}</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] font-bold text-[#5F6368] uppercase">Tax (Monthly)</span>
            <span className="block text-lg font-black text-[#D93025]">Rs. {Math.round(summary.averageMonthlyTax).toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}
    </div>
  );
}
