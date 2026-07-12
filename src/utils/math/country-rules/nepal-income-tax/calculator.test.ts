import { calculateIncomeTax } from './calculator';
import { IncomeTaxInputs } from './types';

// Default empty inputs
const defaultInputs: IncomeTaxInputs = {
  annualSalary: 0,
  annualBonus: 0,
  gender: 'male',
  isMarried: false, // Irrelevant in 2083/84
  isSSFContributor: false,
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

describe('Nepal Income Tax Calculator Engine FY 2083/84', () => {

  it('Test 1: 5 Lakh (No deductions, Male, No SSF)', () => {
    const res = calculateIncomeTax({ ...defaultInputs, annualSalary: 500000 });
    expect(res.grossIncome).toBe(500000);
    expect(res.totalTax).toBe(5000); // 1% of 5L
    expect(res.highestTaxSlab).toBe('1%');
  });

  it('Test 2: 8 Lakh (Max deductions, Male, SSF)', () => {
    // 8 Lakh, SSF contributor (0% on first slab)
    // Deductions: Retirement 500k, Life 40k, Med 20k, Education 25k, Donation 300k
    // Total allowed: 800k * 1/3 = 266,666.67 (Retirement)
    // Life 40k, Med 20k, Education 25k, Donation 300k (All allowed up to gross)
    const res = calculateIncomeTax({
      ...defaultInputs,
      annualSalary: 800000,
      isSSFContributor: true,
      ssfContribution: 100000,
      epfContribution: 100000,
      citContribution: 100000, // Total 300k, capped at 266k
      lifeInsurance: 50000, // Capped at 40k
      medicalInsurance: 20000,
      educationFee: 100000, // 25% is 25k
      donation: 350000 // Capped at 300k
    });
    expect(res.grossIncome).toBe(800000);
    expect(res.taxableIncome).toBeGreaterThan(0);
    // 266666.67 + 40000 + 20000 + 25000 + 300000 = 651666.67 total deductions
    expect(res.taxableIncome).toBeCloseTo(800000 - 651666.67, 1);
    expect(res.highestTaxSlab).toBe('0%'); // Since it's < 10L and SSF waives the 1%
    expect(res.finalTax).toBe(0);
    expect(res.taxSaved).toBe(0); // 1% is waived, so no tax to save
  });

  it('Test 3: 10 Lakh (Female, No SSF, No Deductions)', () => {
    const res = calculateIncomeTax({ ...defaultInputs, annualSalary: 1000000, gender: 'female' });
    // 1% of 10L = 10,000
    // Female rebate 10% of 10,000 = 1,000
    expect(res.finalTax).toBe(9000);
  });

  it('Test 4: 15 Lakh (Male, No SSF, No Deductions)', () => {
    const res = calculateIncomeTax({ ...defaultInputs, annualSalary: 1500000 });
    // First 10L @ 1% = 10k
    // Next 5L @ 10% = 50k
    expect(res.finalTax).toBe(60000);
    expect(res.highestTaxSlab).toBe('10%');
  });

  it('Test 5: 25 Lakh (Female, SSF, Zero Deductions)', () => {
    const res = calculateIncomeTax({ ...defaultInputs, annualSalary: 2500000, gender: 'female', isSSFContributor: true });
    // First 10L @ 0% = 0
    // Next 5L @ 10% = 50k
    // Next 10L @ 20% = 200k
    // Total before rebate: 250k
    // Rebate 10%: 25k
    expect(res.finalTax).toBe(225000);
    expect(res.highestTaxSlab).toBe('20%');
  });

  it('Test 6: 40 Lakh (Male, No SSF, Zero Deductions)', () => {
    const res = calculateIncomeTax({ ...defaultInputs, annualSalary: 4000000 });
    // 10L @ 1% = 10k
    // 5L @ 10% = 50k
    // 10L @ 20% = 200k
    // 15L @ 27% = 405k
    // Total: 665k
    expect(res.finalTax).toBe(665000);
    expect(res.highestTaxSlab).toBe('27%');
  });

  it('Test 7: 60 Lakh (Male, No SSF, Max Deductions)', () => {
    const res = calculateIncomeTax({
      ...defaultInputs,
      annualSalary: 6000000,
      citContribution: 1000000, // Capped at 500k
      lifeInsurance: 100000, // Capped at 40k
    });
    // Deductions: 540k
    // Taxable: 54.6L
    expect(res.taxableIncome).toBe(5460000);
    expect(res.highestTaxSlab).toBe('29%');
    expect(res.taxSaved).toBeGreaterThan(0);
  });

  it('Test 8: 100 Lakh (1 Crore) (Male, No SSF, Zero Deductions)', () => {
    const res = calculateIncomeTax({ ...defaultInputs, annualSalary: 10000000 });
    // 10L @ 1% = 10k
    // 5L @ 10% = 50k
    // 10L @ 20% = 200k
    // 15L @ 27% = 405k
    // 60L @ 29% = 1740k
    // Total = 2405k
    expect(res.finalTax).toBe(2405000);
    expect(res.highestTaxSlab).toBe('29%');
  });
});
