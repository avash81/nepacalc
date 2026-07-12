export type Gender = 'male' | 'female';
export type FiscalYear = '2083/84';

export interface IncomeTaxInputs {
  // Income
  annualSalary: number;
  annualBonus: number;
  
  // Demographics & Toggles
  gender: Gender;
  isMarried: boolean;
  isSSFContributor: boolean;
  enforceLimits: boolean; // Government deduction cap toggle
  
  // Deductions
  ssfContribution: number;
  epfContribution: number;
  citContribution: number;
  lifeInsurance: number;
  medicalInsurance: number;
  buildingInsurance: number;
  educationFee: number;
  donation: number;
  csr: number;
}

export interface DeductionResult {
  name: string;
  claimed: number;
  allowed: number;
  disallowed: number;
  reason: string;
}

export interface SlabBreakdown {
  slabName: string;
  incomeInSlab: number;
  taxRate: number; // e.g. 0.01 for 1%
  taxAmount: number;
  remainingIncome: number;
}

export interface RebateResult {
  name: string;
  rate: number; // e.g. 0.10 for 10%
  amount: number;
}

export interface CalculationSummary {
  grossIncome: number;
  taxableIncome: number;
  
  totalDeductions: number;
  deductionBreakdown: DeductionResult[];
  
  taxWithoutDeductions: number;
  taxSaved: number;
  
  slabBreakdown: SlabBreakdown[];
  highestTaxSlab: string;
  marginalTaxRate: number;
  
  taxBeforeRebate: number;
  totalTax: number;
  rebate: RebateResult | null;
  finalTax: number;
  
  effectiveTaxRate: number; // (finalTax / grossIncome)
  
  netAnnualIncome: number;
  netMonthlyIncome: number;
  
  averageMonthlyTax: number;
  averageDailyTax: number;
  
  isSSFBenefitApplied: boolean;
}
