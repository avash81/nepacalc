import taxSlabsData from '../../../data/nepal-tax-slabs.json';

export type FiscalYear = '2083/84' | '2082/83' | '2081/82';

export interface SalaryDeductions {
  lifeInsurance: number;
  healthInsurance: number;
  buildingInsurance: number;
  donation: number;
  education: number;
  other: number;
}

export interface SalaryAllowances {
  housing: number;
  transport: number;
  communication: number;
  meal: number;
  other: number;
}

// Caps
const CAPS = {
  lifeInsurance: 40000,
  healthInsurance: 20000,
  buildingInsurance: 10000,
  education: 25000,
  donation: 300000
};

export function calculateNepalIncomeTax(
  annualIncome: number,
  isMarried: boolean,
  isSSFContributor: boolean,
  gender: 'male' | 'female' = 'male',
  retirementContribution: number = 0,
  deductions: SalaryDeductions = { lifeInsurance: 0, healthInsurance: 0, buildingInsurance: 0, donation: 0, education: 0, other: 0 },
  fiscalYear: FiscalYear = '2083/84'
) {
  if (annualIncome <= 0) {
    return {
      grossIncome: 0,
      taxableIncome: 0,
      totalTax: 0,
      monthlyTax: 0,
      effectiveRate: 0,
      breakdown: [],
      isSSFBenefit: isSSFContributor
    };
  }

  const yearData = (taxSlabsData as any)[fiscalYear];
  const slabs = isMarried ? yearData.individual.married : yearData.individual.single;
  
  const maxRetirementDeduction = Math.min(annualIncome / 3, 500000);
  const allowedRetirementDeduction = Math.min(retirementContribution, maxRetirementDeduction);
  
  const allowedLifeIns = Math.min(deductions.lifeInsurance || 0, CAPS.lifeInsurance);
  const allowedHealthIns = Math.min(deductions.healthInsurance || 0, CAPS.healthInsurance);
  const allowedBuildingIns = Math.min(deductions.buildingInsurance || 0, CAPS.buildingInsurance);
  const allowedEducation = Math.min((deductions.education || 0) * 0.25, CAPS.education);
  const allowedDonation = Math.min(deductions.donation || 0, CAPS.donation);
  
  const totalApprovedDeductions = allowedLifeIns + allowedHealthIns + allowedBuildingIns + allowedEducation + allowedDonation + (deductions.other || 0);

  const taxableIncome = Math.max(0, annualIncome - allowedRetirementDeduction - totalApprovedDeductions);
  
  let remaining = taxableIncome;
  let totalTax = 0;
  const breakdown = [];

  let previousLimit = 0;
  for (let i = 0; i < slabs.length; i++) {
    const slab = slabs[i];
    const limit = slab.upTo === null ? Infinity : slab.upTo;
    const slabRange = limit - previousLimit;
    
    const taxableInSlab = Math.min(remaining, slabRange);
    
    if (taxableInSlab > 0) {
      let rate = slab.rate;
      
      if (i === 0 && isSSFContributor && yearData.ssfWaivesFirstSlab) {
        rate = 0;
      }
      
      const taxAmount = taxableInSlab * rate;
      totalTax += taxAmount;
      
      breakdown.push({
        slabLabel: slab.label,
        taxableInSlab: Number(taxableInSlab.toFixed(2)),
        rate: rate * 100,
        taxAmount: Number(taxAmount.toFixed(2))
      });
      
      remaining -= taxableInSlab;
    }
    
    previousLimit = limit;
    if (remaining <= 0) break;
  }

  if (gender === 'female' && totalTax > 0) {
    const rebateAmount = totalTax * 0.10;
    totalTax = totalTax - rebateAmount;
    
    breakdown.push({
      slabLabel: 'Female Rebate (10%)',
      taxableInSlab: 0,
      rate: -10,
      taxAmount: -Number(rebateAmount.toFixed(2))
    });
  }

  return {
    grossIncome: annualIncome,
    taxableIncome: Number(taxableIncome.toFixed(2)),
    totalTax: Number(totalTax.toFixed(2)),
    monthlyTax: Number((totalTax / 12).toFixed(2)),
    effectiveRate: Number(((totalTax / annualIncome) * 100).toFixed(2)),
    breakdown,
    isSSFBenefit: isSSFContributor
  };
}

export function calculateNepalSalary(
  salary: number,
  isAnnualFrequency: boolean,
  isSSFContributor: boolean,
  retirementType: 'none' | 'cit' | 'pf',
  retirementMonthlyAmount: number,
  gender: 'male' | 'female' = 'male',
  annualBonus: number = 0,
  allowances: SalaryAllowances = { housing: 0, transport: 0, communication: 0, meal: 0, other: 0 },
  deductions: SalaryDeductions = { lifeInsurance: 0, healthInsurance: 0, buildingInsurance: 0, donation: 0, education: 0, other: 0 },
  isMarried: boolean = false,
  fiscalYear: FiscalYear = '2083/84'
) {
  const monthlyBase = isAnnualFrequency ? salary / 12 : salary;
  const annualBase = isAnnualFrequency ? salary : salary * 12;

  const totalMonthlyAllowances = allowances.housing + allowances.transport + allowances.communication + allowances.meal + allowances.other;
  const annualAllowances = totalMonthlyAllowances * 12;

  const monthlyGross = monthlyBase + totalMonthlyAllowances;
  const annualGross = annualBase + annualAllowances + annualBonus;

  // Assuming full base is subject to SSF
  const basicSalaryForSSF = monthlyBase;
  const monthly_ssf_employee = isSSFContributor ? basicSalaryForSSF * 0.11 : 0;
  const monthly_ssf_employer = isSSFContributor ? basicSalaryForSSF * 0.20 : 0;
  
  const annual_ssf_employee = monthly_ssf_employee * 12;
  const annual_ssf_employer = monthly_ssf_employer * 12;

  const monthly_retirement = retirementType !== 'none' ? retirementMonthlyAmount : 0;
  const annual_retirement = monthly_retirement * 12;
  
  const totalAnnualRetirementDeduction = annual_ssf_employee + annual_retirement;

  const taxResult = calculateNepalIncomeTax(
    annualGross, 
    isMarried, 
    isSSFContributor, 
    gender, 
    totalAnnualRetirementDeduction, 
    deductions,
    fiscalYear
  );
  
  const monthlyTax = taxResult.totalTax / 12;

  const monthlyNet = monthlyGross - monthly_ssf_employee - monthly_retirement - monthlyTax;
  const annualNet = annualGross - annual_ssf_employee - annual_retirement - taxResult.totalTax;
  
  const monthlyCTC = monthlyGross + monthly_ssf_employer;
  const annualCTC = annualGross + annual_ssf_employer;

  return {
    inputs: {
      salary,
      isAnnualFrequency,
      gender,
      fiscalYear
    },
    monthly: {
      gross: Number(monthlyGross.toFixed(2)),
      ssf_employee: Number(monthly_ssf_employee.toFixed(2)),
      ssf_employer: Number(monthly_ssf_employer.toFixed(2)),
      retirement_contribution: Number(monthly_retirement.toFixed(2)),
      tax: Number(monthlyTax.toFixed(2)),
      net: Number(monthlyNet.toFixed(2)),
      ctc: Number(monthlyCTC.toFixed(2))
    },
    annual: {
      gross: Number(annualGross.toFixed(2)),
      ssf_employee: Number(annual_ssf_employee.toFixed(2)),
      ssf_employer: Number(annual_ssf_employer.toFixed(2)),
      retirement_contribution: Number(annual_retirement.toFixed(2)),
      taxableIncome: taxResult.taxableIncome,
      tax: taxResult.totalTax,
      net: Number(annualNet.toFixed(2)),
      ctc: Number(annualCTC.toFixed(2))
    },
    taxBreakdown: taxResult.breakdown,
    effectiveRate: taxResult.effectiveRate
  };
}

/**
 * Nepal VAT Calculator
 */
export function calculateNepalVAT(price: number, vatType: 'inclusive' | 'exclusive', rate: number = 13) {
  if (vatType === 'exclusive') {
    const vatAmount = (price * rate) / 100;
    return {
      priceExcludingVAT: Number(price.toFixed(2)),
      vatAmount: Number(vatAmount.toFixed(2)),
      priceIncludingVAT: Number((price + vatAmount).toFixed(2)),
      vatRate: rate
    };
  } else {
    const priceExcludingVAT = price / (1 + rate / 100);
    const vatAmount = price - priceExcludingVAT;
    return {
      priceExcludingVAT: Number(priceExcludingVAT.toFixed(2)),
      vatAmount: Number(vatAmount.toFixed(2)),
      priceIncludingVAT: Number(price.toFixed(2)),
      vatRate: rate
    };
  }
}

/**
 * Nepal Gratuity Calculation (Labor Act 2074)
 */
export function calculateNepalGratuity(basicSalary: number, yearsOfService: number) {
  // Statutory rate: 8.33% of basic remuneration
  const monthlyGratuity = basicSalary * 0.0833;
  const totalGratuity = monthlyGratuity * (yearsOfService * 12);
  
  // Tax exemption rule: Up to 500,000 is tax free
  const taxExemptLimit = 500000;
  const taxableAmount = Math.max(0, totalGratuity - taxExemptLimit);
  
  return {
    monthlyContribution: Number(monthlyGratuity.toFixed(2)),
    totalGratuity: Number(totalGratuity.toFixed(2)),
    taxExemptLimit,
    taxableAmount: Number(taxableAmount.toFixed(2)),
    isEligible: yearsOfService >= 5
  };
}

/**
 * Nepal Property Registration Fees (Provincial Standards)
 */
export function calculateNepalPropertyRegistration(
  price: number, 
  location: 'metropolitan' | 'sub-metropolitan' | 'municipality' | 'rural',
  buyerGender: 'male' | 'female' | 'joint'
) {
  const rates = {
    'metropolitan': 0.05,
    'sub-metropolitan': 0.045,
    'municipality': 0.04,
    'rural': 0.02
  };

  let baseFee = price * rates[location];
  let discount = 0;

  if (buyerGender === 'female') {
    const discountRate = (location === 'rural') ? 0.30 : 0.25;
    discount = baseFee * discountRate;
  } else if (buyerGender === 'joint') {
    baseFee = 100; // Special nominal fee for joint registration in many provinces
    discount = 0;
  }

  const finalFee = Math.max(0, baseFee - discount);

  return {
    baseFee: Number(baseFee.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    finalFee: Number(finalFee.toFixed(2)),
    ratePercent: rates[location] * 100
  };
}

/**
 * NEPSE Trading Commission & Profit (FY 2083/84 Standards)
 */
export function calculateNEPSEReturn(
  qty: number, 
  buyPrice: number, 
  sellPrice: number, 
  holdingDays: number, 
  investorType: 'individual' | 'institutional' = 'individual'
) {
  const getCommission = (amount: number) => {
    if (amount <= 50000) return amount * 0.0036;
    if (amount <= 500000) return amount * 0.0033;
    if (amount <= 2000000) return amount * 0.00306;
    if (amount <= 10000000) return amount * 0.0027;
    return amount * 0.00243;
  };

  const sebonRate = 0.00015;
  const dpFee = 25;

  const buyAmount = qty * buyPrice;
  const buyComm = getCommission(buyAmount);
  const buySebon = buyAmount * sebonRate;
  const totalCost = buyAmount + buyComm + buySebon + dpFee;

  const sellAmount = qty * sellPrice;
  const sellComm = getCommission(sellAmount);
  const sellSebon = sellAmount * sebonRate;
  const netSellProceeds = sellAmount - sellComm - sellSebon - dpFee;

  const grossGain = netSellProceeds - totalCost;
  
  let cgtRate = 0;
  if (grossGain > 0) {
    if (investorType === 'institutional') {
      cgtRate = 0.10;
    } else {
      cgtRate = (holdingDays >= 365) ? 0.05 : 0.075;
    }
  }

  const cgtAmount = Math.max(0, grossGain * cgtRate);
  const netProfit = grossGain - cgtAmount;

  return {
    totalCost: Number(totalCost.toFixed(2)),
    netSellProceeds: Number(netSellProceeds.toFixed(2)),
    grossGain: Number(grossGain.toFixed(2)),
    cgtAmount: Number(cgtAmount.toFixed(2)),
    netProfit: Number(netProfit.toFixed(2)),
    roi: Number(((netProfit / totalCost) * 100).toFixed(2)),
    breakdown: { buyComm, buySebon, sellComm, sellSebon, dpFee }
  };
}

/**
 * KUKL Water Bill (Kathmandu Domestic)
 */
export function calculateKUKLBill(units: number, pipeSize: '0.5' | '0.75' = '0.5') {
  // Basic residential structure (0.5 inch pipe)
  // First 10,000 liters (10 units) = Rs. 100
  const minCharge = 100;
  const minUnits = 10;
  let waterCharge = minCharge;

  if (units > minUnits) {
    waterCharge += (units - minUnits) * 32; // Approx Rs. 32 per excess unit
  }

  const sewerageTax = waterCharge * 0.50;
  const totalBill = waterCharge + sewerageTax;

  return {
    waterCharge: Number(waterCharge.toFixed(2)),
    sewerageTax: Number(sewerageTax.toFixed(2)),
    totalBill: Number(totalBill.toFixed(2))
  };
}

