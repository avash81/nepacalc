import { IncomeTaxInputs, CalculationSummary } from './types';
import { calculateDeductions } from './deductions';
import { processAllSlabs } from './taxSlabs';
import { calculateFemaleRebate } from './rebates';
import { buildSummary } from './summary';

export function calculateIncomeTax(inputs: IncomeTaxInputs): CalculationSummary {
  // 1. Calculate Gross Income
  const grossIncome = inputs.annualSalary + inputs.annualBonus;
  
  if (grossIncome <= 0) {
    return buildSummary(
      0, 0, [], [], null, 0, inputs.isSSFContributor
    );
  }

  // 2. Calculate Deductions
  const deductionBreakdown = calculateDeductions(inputs, grossIncome);
  const totalDeductions = deductionBreakdown.reduce((sum, d) => sum + d.allowed, 0);
  const taxableIncome = Math.max(0, grossIncome - totalDeductions);

  // 3. Calculate Tax on Taxable Income
  const slabBreakdown = processAllSlabs(taxableIncome, inputs.isSSFContributor);
  const taxBeforeRebate = slabBreakdown.reduce((sum, s) => sum + s.taxAmount, 0);

  // 4. Calculate Female Rebate
  const rebate = calculateFemaleRebate(inputs.gender, taxBeforeRebate);

  // 5. Calculate "Tax Without Deductions" (for "Tax Saved" feature)
  // Run the slab engine on the pure Gross Income
  const slabsWithoutDeductions = processAllSlabs(grossIncome, inputs.isSSFContributor);
  let taxWithoutDeds = slabsWithoutDeductions.reduce((sum, s) => sum + s.taxAmount, 0);
  const hypotheticalRebate = calculateFemaleRebate(inputs.gender, taxWithoutDeds);
  if (hypotheticalRebate) {
    taxWithoutDeds = Math.max(0, taxWithoutDeds - hypotheticalRebate.amount);
  }

  // 6. Build the final transparent summary
  return buildSummary(
    grossIncome,
    taxableIncome,
    deductionBreakdown,
    slabBreakdown,
    rebate,
    taxWithoutDeds,
    inputs.isSSFContributor
  );
}
