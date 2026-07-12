import { CalculationSummary } from '@/utils/math/country-rules/nepal-income-tax/types';
import { ArrowDown } from 'lucide-react';

function formatNPR(n: number) { 
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN'); 
}

export function TaxTimeline({ summary }: { summary: CalculationSummary }) {
  
  const Step = ({ title, amount, subtext, color = "blue", last = false }: any) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-900',
      red: 'bg-red-50 border-red-200 text-red-900',
      green: 'bg-green-50 border-green-200 text-green-900',
      orange: 'bg-orange-50 border-orange-200 text-orange-900',
      grey: 'bg-gray-50 border-gray-200 text-gray-900'
    };

    return (
      <div className="flex flex-col items-center">
        <div className={`w-full max-w-sm px-6 py-4 rounded-xl border ${colors[color as keyof typeof colors]} shadow-sm text-center relative`}>
          <span className="block text-xs font-bold uppercase tracking-widest opacity-80 mb-1">{title}</span>
          <span className="block text-xl font-black">{amount}</span>
          {subtext && <span className="block text-[10px] mt-1 opacity-70">{subtext}</span>}
        </div>
        {!last && (
          <div className="py-2 text-gray-300">
            <ArrowDown className="w-5 h-5" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white border border-[#DADCE0] rounded-xl shadow-sm p-6 sm:p-10">
      <h3 className="text-lg font-black text-center text-[#202124] mb-8">Auditable Tax Calculation Flow</h3>
      
      <div className="space-y-0">
        <Step 
          title="Gross Annual Income" 
          amount={formatNPR(summary.grossIncome)} 
          color="blue" 
        />
        
        {summary.deductionBreakdown.filter(d => d.allowed > 0).map((d, i) => (
          <Step 
            key={i}
            title={`Less: ${d.name}`} 
            amount={`-${formatNPR(d.allowed)}`} 
            color="orange" 
            subtext={d.reason}
          />
        ))}

        <Step 
          title="Net Taxable Income" 
          amount={formatNPR(summary.taxableIncome)} 
          color="grey" 
          subtext="Base amount used for tax slabs"
        />

        <Step 
          title="Income Tax Computed" 
          amount={`-${formatNPR(summary.taxBeforeRebate)}`} 
          color="red" 
          subtext={`Highest slab reached: ${summary.highestTaxSlab}`}
        />

        {summary.rebate && (
          <Step 
            title={`Less: ${summary.rebate.name}`} 
            amount={`-${formatNPR(summary.rebate.amount)}`} 
            color="orange" 
          />
        )}

        <Step 
          title="Net Take-Home Pay (Annual)" 
          amount={formatNPR(summary.netAnnualIncome)} 
          color="green" 
          last={true}
        />
      </div>
    </div>
  );
}
