import { IncomeTaxInputs, DeductionResult } from './types';

// Finance Act 2083/84 Caps
const CAPS = {
  lifeInsurance: 40000,
  medicalInsurance: 20000,
  buildingInsurance: 10000,
  educationMax: 25000,
  educationPct: 0.25, // 25% of tuition paid
  donation: 300000,
  retirementMax: 500000,
  retirementPct: 1/3, // 1/3 of annual gross income
  csrPct: 0.01 // 1% of taxable income (for businesses, optional)
};

function createDeduction(
  name: string,
  claimed: number,
  maxAllowed: number,
  enforceLimits: boolean,
  limitReason: string
): DeductionResult {
  if (claimed <= 0) {
    return { name, claimed: 0, allowed: 0, disallowed: 0, reason: '' };
  }
  
  if (!enforceLimits) {
    return { name, claimed, allowed: claimed, disallowed: 0, reason: '' };
  }

  const allowed = Math.min(claimed, maxAllowed);
  const disallowed = claimed - allowed;
  const reason = disallowed > 0 ? limitReason : '';

  return { name, claimed, allowed, disallowed, reason };
}

export function calculateDeductions(
  inputs: IncomeTaxInputs, 
  grossIncome: number
): DeductionResult[] {
  const results: DeductionResult[] = [];
  const enforce = inputs.enforceLimits;

  // 1. Retirement Contribution (SSF + EPF + CIT)
  const totalRetirementClaimed = inputs.ssfContribution + inputs.epfContribution + inputs.citContribution;
  const maxRetirementAllowed = Math.min(grossIncome * CAPS.retirementPct, CAPS.retirementMax);
  results.push(createDeduction(
    'Retirement Fund (SSF/EPF/CIT)',
    totalRetirementClaimed,
    maxRetirementAllowed,
    enforce,
    `Capped at lower of Rs. 500,000 or 1/3 of Gross Income`
  ));

  // 2. Life Insurance
  results.push(createDeduction(
    'Life Insurance',
    inputs.lifeInsurance,
    CAPS.lifeInsurance,
    enforce,
    `Maximum allowed is Rs. ${CAPS.lifeInsurance.toLocaleString()}`
  ));

  // 3. Medical / Health Insurance
  results.push(createDeduction(
    'Medical Insurance',
    inputs.medicalInsurance,
    CAPS.medicalInsurance,
    enforce,
    `Maximum allowed is Rs. ${CAPS.medicalInsurance.toLocaleString()}`
  ));

  // 4. Building Insurance
  results.push(createDeduction(
    'Building Insurance',
    inputs.buildingInsurance,
    CAPS.buildingInsurance,
    enforce,
    `Maximum allowed is Rs. ${CAPS.buildingInsurance.toLocaleString()}`
  ));

  // 5. Education Fee
  const educationClaimed = inputs.educationFee;
  const educationPctAllowed = educationClaimed * CAPS.educationPct;
  const maxEducationAllowed = Math.min(educationPctAllowed, CAPS.educationMax);
  
  if (educationClaimed > 0) {
    const allowed = enforce ? maxEducationAllowed : educationClaimed;
    const disallowed = educationClaimed - allowed;
    const reason = enforce && disallowed > 0 ? `Capped at lower of 25% of fee or Rs. 25,000` : '';
    results.push({ name: 'Education Fee', claimed: educationClaimed, allowed, disallowed, reason });
  } else {
    results.push({ name: 'Education Fee', claimed: 0, allowed: 0, disallowed: 0, reason: '' });
  }

  // 6. Donation
  results.push(createDeduction(
    'Donation',
    inputs.donation,
    CAPS.donation,
    enforce,
    `Maximum allowed is Rs. ${CAPS.donation.toLocaleString()}`
  ));

  // 7. CSR
  // CSR is based on taxable income, which makes it complex to calculate sequentially if it depends on previous deductions.
  // Assuming 1% of gross income minus other deductions for simplicity, as per standard practice.
  if (inputs.csr > 0) {
    const totalPreviousDeductions = results.reduce((acc, curr) => acc + curr.allowed, 0);
    const interimTaxable = grossIncome - totalPreviousDeductions;
    const maxCsrAllowed = interimTaxable * CAPS.csrPct;
    results.push(createDeduction(
      'Corporate Social Responsibility (CSR)',
      inputs.csr,
      maxCsrAllowed,
      enforce,
      `Capped at 1% of taxable income`
    ));
  } else {
    results.push({ name: 'Corporate Social Responsibility (CSR)', claimed: 0, allowed: 0, disallowed: 0, reason: '' });
  }

  return results;
}
