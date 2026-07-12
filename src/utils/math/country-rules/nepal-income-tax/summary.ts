import { 
  IncomeTaxInputs, 
  CalculationSummary, 
  DeductionResult, 
  SlabBreakdown, 
  RebateResult 
} from './types';

export function buildSummary(
  grossIncome: number,
  taxableIncome: number,
  deductionBreakdown: DeductionResult[],
  slabBreakdown: SlabBreakdown[],
  rebate: RebateResult | null,
  taxWithoutDeductions: number,
  isSSFContributor: boolean
): CalculationSummary {
  
  const totalDeductions = deductionBreakdown.reduce((acc, curr) => acc + curr.allowed, 0);
  const taxBeforeRebate = slabBreakdown.reduce((acc, curr) => acc + curr.taxAmount, 0);
  
  let finalTax = taxBeforeRebate;
  if (rebate) {
    finalTax = Math.max(0, taxBeforeRebate - rebate.amount);
  }

  const taxSaved = Math.max(0, taxWithoutDeductions - finalTax);

  let highestTaxSlab = '0%';
  let marginalTaxRate = 0;
  if (slabBreakdown.length > 0) {
    const highestSlab = slabBreakdown[slabBreakdown.length - 1];
    marginalTaxRate = highestSlab.taxRate;
    highestTaxSlab = `${(highestSlab.taxRate * 100).toFixed(0)}%`;
  }

  const effectiveTaxRate = grossIncome > 0 ? (finalTax / grossIncome) : 0;
  const netAnnualIncome = grossIncome - finalTax;
  const netMonthlyIncome = netAnnualIncome / 12;

  const averageMonthlyTax = finalTax / 12;
  const averageDailyTax = finalTax / 365;

  return {
    grossIncome,
    taxableIncome,
    
    totalDeductions,
    deductionBreakdown,
    
    taxWithoutDeductions,
    taxSaved,
    
    slabBreakdown,
    highestTaxSlab,
    marginalTaxRate,
    
    taxBeforeRebate,
    totalTax: finalTax,
    rebate,
    finalTax,
    
    effectiveTaxRate,
    
    netAnnualIncome,
    netMonthlyIncome,
    
    averageMonthlyTax,
    averageDailyTax,
    
    isSSFBenefitApplied: isSSFContributor
  };
}
