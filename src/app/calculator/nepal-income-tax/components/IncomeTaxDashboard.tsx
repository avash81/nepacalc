import { CalculationSummary } from '@/utils/math/country-rules/nepal-income-tax/types';
import { Wallet, Receipt, ChevronDown, ChevronUp, TrendingUp, PiggyBank, Info } from 'lucide-react';
import { useState } from 'react';

function fmt(n: number) {
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN');
}

const ALL_SLABS = [
  { name: 'Up to Rs. 10 Lakh',          rate: 1,  color: 'bg-green-400' },
  { name: 'Rs. 10L – Rs. 15L',          rate: 10, color: 'bg-yellow-400' },
  { name: 'Rs. 15L – Rs. 25L',          rate: 20, color: 'bg-orange-400' },
  { name: 'Rs. 25L – Rs. 40L',          rate: 27, color: 'bg-red-400' },
  { name: 'Above Rs. 40L',              rate: 29, color: 'bg-red-700' },
];

export function IncomeTaxDashboard({ summary }: { summary: CalculationSummary }) {
  const [showSlabTable, setShowSlabTable] = useState(false);
  const [showDeductions, setShowDeductions] = useState(false);

  const marginalRate = summary.marginalTaxRate * 100;
  const activeSlabRate = Math.round(marginalRate);

  return (
    <div className="space-y-5">

      {/* === PRIMARY RESULT CARDS === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Take Home */}
        <div className="bg-[#1A73E8] text-white p-6 rounded-xl shadow-md relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10"><Wallet className="w-32 h-32" /></div>
          <span className="text-xs font-bold text-blue-100 uppercase tracking-wider block mb-1">Monthly Take Home</span>
          <span className="text-3xl sm:text-4xl font-black">{fmt(summary.netMonthlyIncome)}</span>
          <div className="mt-4 pt-4 border-t border-blue-400/30 flex justify-between text-sm">
            <span className="text-blue-100">Annual Take Home</span>
            <span className="font-bold">{fmt(summary.netAnnualIncome)}</span>
          </div>
        </div>
        {/* Tax */}
        <div className="bg-[#D93025] text-white p-6 rounded-xl shadow-md relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10"><Receipt className="w-32 h-32" /></div>
          <span className="text-xs font-bold text-red-100 uppercase tracking-wider block mb-1">Monthly Tax (TDS)</span>
          <span className="text-3xl sm:text-4xl font-black">{fmt(summary.averageMonthlyTax)}</span>
          <div className="mt-4 pt-4 border-t border-red-400/30 flex justify-between text-sm">
            <span className="text-red-100">Annual Income Tax</span>
            <span className="font-bold">{fmt(summary.finalTax)}</span>
          </div>
        </div>
      </div>

      {/* === DETAILED BREAKDOWN GRID === */}
      <div className="bg-white border border-[#DADCE0] rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-[#F8F9FA] border-b border-[#DADCE0]">
          <h3 className="text-xs font-black text-[#5F6368] uppercase tracking-widest">Income Breakdown</h3>
        </div>
        <div className="divide-y divide-[#F1F3F4]">
          <div className="flex justify-between px-5 py-3 text-sm">
            <span className="text-[#5F6368]">Annual Gross Income</span>
            <span className="font-bold text-[#202124]">{fmt(summary.grossIncome)}</span>
          </div>
          <div className="flex justify-between px-5 py-3 text-sm">
            <span className="text-[#5F6368]">Total Deductions</span>
            <span className="font-bold text-green-700">- {fmt(summary.totalDeductions)}</span>
          </div>
          <div className="flex justify-between px-5 py-3 text-sm bg-[#F8F9FA]">
            <span className="font-bold text-[#202124]">Annual Taxable Income</span>
            <span className="font-black text-[#202124]">{fmt(summary.taxableIncome)}</span>
          </div>
          <div className="flex justify-between px-5 py-3 text-sm">
            <span className="text-[#5F6368]">Annual Income Tax</span>
            <span className="font-bold text-[#D93025]">{fmt(summary.finalTax)}</span>
          </div>
          <div className="flex justify-between px-5 py-3 text-sm">
            <span className="text-[#5F6368]">Monthly TDS</span>
            <span className="font-bold text-[#D93025]">{fmt(summary.averageMonthlyTax)}</span>
          </div>
          <div className="flex justify-between px-5 py-3 text-sm">
            <span className="text-[#5F6368]">Monthly Take Home</span>
            <span className="font-bold text-[#1A73E8]">{fmt(summary.netMonthlyIncome)}</span>
          </div>
          <div className="flex justify-between px-5 py-3 text-sm bg-[#F8F9FA]">
            <span className="font-bold text-[#202124]">Annual Take Home</span>
            <span className="font-black text-[#1A73E8]">{fmt(summary.netAnnualIncome)}</span>
          </div>
        </div>
      </div>

      {/* === RATE METRICS + TAX SAVED === */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {/* Marginal Rate */}
        <div className="bg-white p-4 border border-[#DADCE0] rounded-xl shadow-sm">
          <span className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider block mb-1">Marginal Rate</span>
          <span className="text-2xl font-black text-[#202124]">{summary.highestTaxSlab}</span>
          <div className="flex items-start gap-1 mt-2 group relative">
            <Info className="w-3 h-3 text-[#1A73E8] mt-0.5 shrink-0" />
            <span className="text-[10px] text-[#5F6368] leading-tight">The highest rate applied to your last taxable rupee.</span>
          </div>
        </div>
        {/* Effective Rate */}
        <div className="bg-white p-4 border border-[#DADCE0] rounded-xl shadow-sm">
          <span className="text-[11px] font-bold text-[#5F6368] uppercase tracking-wider block mb-1">Effective Rate</span>
          <span className="text-2xl font-black text-[#202124]">{(summary.effectiveTaxRate * 100).toFixed(2)}%</span>
          <p className="text-[10px] text-[#5F6368] mt-2 leading-tight">Average % of gross income paid as tax.</p>
        </div>
        {/* Tax Saved */}
        <div className="col-span-2 sm:col-span-1 bg-[#E6F4EA] p-4 border border-[#CEEAD6] rounded-xl shadow-sm">
          <span className="text-[11px] font-bold text-[#137333] uppercase tracking-wider block mb-1">Tax Saved</span>
          <span className="text-2xl font-black text-[#137333]">{fmt(summary.taxSaved)}</span>
          <p className="text-[10px] text-[#137333]/80 mt-2 leading-tight">Saved through approved deductions.</p>
        </div>
      </div>

      {/* === SLAB VISUALIZATION === */}
      <div className="bg-white border border-[#DADCE0] rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-[#F8F9FA] border-b border-[#DADCE0]">
          <h3 className="text-xs font-black text-[#5F6368] uppercase tracking-widest">FY 2083/84 Progressive Tax Slab</h3>
        </div>
        <div className="p-5 space-y-3">
          {ALL_SLABS.map((slab) => {
            const isActive = slab.rate === activeSlabRate;
            const barWidth = slab.rate === 1 ? 'w-[10%]' : slab.rate === 10 ? 'w-[33%]' : slab.rate === 20 ? 'w-[55%]' : slab.rate === 27 ? 'w-[75%]' : 'w-full';
            return (
              <div key={slab.rate} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${isActive ? 'bg-[#E8F0FE] ring-2 ring-[#1A73E8]' : ''}`}>
                <div className="w-full flex items-center gap-3">
                  <div className={`h-4 rounded ${barWidth} ${slab.color} ${isActive ? 'opacity-100' : 'opacity-40'} transition-all`} />
                  <span className={`text-xs font-bold shrink-0 ${isActive ? 'text-[#1A73E8]' : 'text-[#5F6368]'}`}>{slab.rate}%</span>
                </div>
                <span className={`text-[11px] whitespace-nowrap ${isActive ? 'text-[#1A73E8] font-bold' : 'text-[#5F6368]'}`}>{slab.name}{isActive ? ' ← Your Rate' : ''}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* === DEDUCTION BREAKDOWN (expandable) === */}
      <div className="bg-white border border-[#DADCE0] rounded-xl shadow-sm overflow-hidden">
        <button
          onClick={() => setShowDeductions(!showDeductions)}
          className="w-full px-5 py-4 flex items-center justify-between bg-[#F8F9FA] hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm font-bold text-[#202124]">Deduction Breakdown (Entered vs. Allowed)</span>
          {showDeductions ? <ChevronUp className="w-5 h-5 text-[#5F6368]" /> : <ChevronDown className="w-5 h-5 text-[#5F6368]" />}
        </button>
        {showDeductions && (
          <div className="border-t border-[#DADCE0] overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-[#DADCE0]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-[#3C4043]">Deduction</th>
                  <th className="px-4 py-3 font-semibold text-[#3C4043] text-right">Entered</th>
                  <th className="px-4 py-3 font-semibold text-[#3C4043] text-right">Applied</th>
                  <th className="px-4 py-3 font-semibold text-[#3C4043]">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                {summary.deductionBreakdown.map((d, i) => (
                  d.claimed > 0 && (
                    <tr key={i} className={d.disallowed > 0 ? 'bg-yellow-50' : 'hover:bg-gray-50'}>
                      <td className="px-4 py-3 text-[#202124] font-medium">{d.name}</td>
                      <td className="px-4 py-3 text-right text-[#5F6368]">{fmt(d.claimed)}</td>
                      <td className={`px-4 py-3 text-right font-semibold ${d.disallowed > 0 ? 'text-orange-600' : 'text-green-700'}`}>{fmt(d.allowed)}</td>
                      <td className="px-4 py-3 text-[10px] text-[#5F6368] italic">{d.reason || 'Full amount applied'}</td>
                    </tr>
                  )
                ))}
                <tr className="bg-gray-100">
                  <td className="px-4 py-3 font-bold text-[#202124]">Total</td>
                  <td className="px-4 py-3 text-right font-bold text-[#202124]">{fmt(summary.deductionBreakdown.reduce((s, d) => s + d.claimed, 0))}</td>
                  <td className="px-4 py-3 text-right font-bold text-green-700">{fmt(summary.totalDeductions)}</td>
                  <td className="px-4 py-3 text-[10px] text-[#5F6368]">Finance Act 2083/84</td>
                </tr>
              </tbody>
            </table>
            {summary.deductionBreakdown.some(d => d.disallowed > 0) && (
              <p className="px-4 py-3 text-xs text-orange-700 bg-orange-50 border-t border-orange-100">
                Maximum allowable deduction applied according to Finance Act 2083.
              </p>
            )}
          </div>
        )}
      </div>

      {/* === SLAB TABLE (expandable) === */}
      <div className="bg-white border border-[#DADCE0] rounded-xl shadow-sm overflow-hidden">
        <button
          onClick={() => setShowSlabTable(!showSlabTable)}
          className="w-full px-5 py-4 flex items-center justify-between bg-[#F8F9FA] hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm font-bold text-[#202124]">Annual Tax Slab Breakdown</span>
          {showSlabTable ? <ChevronUp className="w-5 h-5 text-[#5F6368]" /> : <ChevronDown className="w-5 h-5 text-[#5F6368]" />}
        </button>
        {showSlabTable && (
          <div className="border-t border-[#DADCE0] overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-[#DADCE0]">
                <tr>
                  <th className="px-5 py-3 font-semibold text-[#3C4043]">Slab</th>
                  <th className="px-5 py-3 font-semibold text-[#3C4043]">Rate</th>
                  <th className="px-5 py-3 font-semibold text-[#3C4043]">Taxable in Slab</th>
                  <th className="px-5 py-3 font-semibold text-[#3C4043]">Tax Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DADCE0]">
                {summary.slabBreakdown.map((s, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-5 py-3 text-[#202124] font-medium">{s.slabName}</td>
                    <td className="px-5 py-3 text-[#5F6368]">{(s.taxRate * 100).toFixed(0)}%</td>
                    <td className="px-5 py-3 text-[#202124]">{fmt(s.incomeInSlab)}</td>
                    <td className="px-5 py-3 text-[#D93025] font-semibold">{fmt(s.taxAmount)}</td>
                  </tr>
                ))}
                {summary.rebate && (
                  <tr className="bg-[#E6F4EA]">
                    <td className="px-5 py-3 text-[#137333] font-medium">{summary.rebate.name}</td>
                    <td className="px-5 py-3 text-[#137333]">{(summary.rebate.rate * 100).toFixed(0)}% Rebate</td>
                    <td className="px-5 py-3 text-[#137333]">-</td>
                    <td className="px-5 py-3 text-[#137333] font-bold">- {fmt(summary.rebate.amount)}</td>
                  </tr>
                )}
                <tr className="bg-gray-100">
                  <td colSpan={3} className="px-5 py-4 text-right font-bold text-[#202124]">Final Tax:</td>
                  <td className="px-5 py-4 font-black text-[#D93025] text-lg">{fmt(summary.finalTax)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* === INCOME FREQUENCY === */}
      <div className="bg-white border border-[#DADCE0] rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-3 bg-[#F8F9FA] border-b border-[#DADCE0]">
          <h3 className="text-xs font-black text-[#5F6368] uppercase tracking-widest">Take Home Frequency</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y-2 sm:divide-y-0 sm:divide-x divide-[#DADCE0]">
          {[
            { label: 'Daily', value: summary.netAnnualIncome / 365 },
            { label: 'Weekly', value: summary.netAnnualIncome / 52 },
            { label: 'Monthly', value: summary.netMonthlyIncome },
            { label: 'Annual', value: summary.netAnnualIncome },
          ].map(({ label, value }) => (
            <div key={label} className="p-4 flex flex-col">
              <span className="text-[11px] text-[#5F6368] uppercase mb-1">{label}</span>
              <span className="font-bold text-[#202124]">{fmt(value)}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
