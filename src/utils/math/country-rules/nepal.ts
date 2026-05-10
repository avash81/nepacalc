import taxSlabs from '../../../data/nepal-tax-slabs.json';

/**
 * Nepal Income Tax Calculation FY 2082/83 (V3 Engine)
 */
export function calculateNepalIncomeTax(
  annualIncome: number,
  isMarried: boolean,
  isSSFContributor: boolean,
  gender: 'male' | 'female' = 'male',
  ssfAmountInput?: number
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

  const slabs = isMarried ? taxSlabs.individual.married : taxSlabs.individual.single;
  
  // SSF Deduction Caps (Statutory IRD mandate)
  // Max 1/3 of income or 500,000 Total
  const maxSsfDeduction = Math.min(annualIncome / 3, 500000);
  const providedSsfDeduction = ssfAmountInput ?? (annualIncome * 0.11);
  const ssfDeduction = isSSFContributor
    ? Math.max(0, Math.min(providedSsfDeduction, maxSsfDeduction))
    : 0;
  
  const taxableIncome = Math.max(0, annualIncome - ssfDeduction);
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
      
      // SST Waiver Logic (1% Social Security Tax is waived for SSF contributors)
      if (i === 0 && isSSFContributor && taxSlabs.ssfWaivesFirstSlab) {
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

  // 10% Female Rebate (Remuneration income only - 2082/83 IRD rule)
  if (gender === 'female' && totalTax > 0) {
    const rebateAmount = totalTax * 0.10;
    totalTax = totalTax - rebateAmount;
    
    // Inject rebate into breakdown for transparency
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

/**
 * Nepal Salary Breakdown
 */
export function calculateNepalSalary(
  grossSalary: number,
  isSSFContributor: boolean,
  isCITContributor: boolean,
  gender: 'male' | 'female' = 'male',
  allowances: { hra: number; medical: number; transport: number; other: number } = { hra: 0, medical: 0, transport: 0, other: 0 }
) {
  const basicSalary = grossSalary * 0.6; // Assuming 60% is basic for SSF calculation
  
  const ssf_employee = isSSFContributor ? basicSalary * 0.11 : 0;
  const ssf_employer = isSSFContributor ? basicSalary * 0.20 : 0;
  
  const cit_employee = isCITContributor ? basicSalary * 0.10 : 0;
  const cit_employer = isCITContributor ? basicSalary * 0.10 : 0;
  
  const totalAllowances = allowances.hra + allowances.medical + allowances.transport + allowances.other;
  const totalGross = grossSalary + totalAllowances;
  
  const taxResult = calculateNepalIncomeTax(totalGross, false, isSSFContributor, gender, ssf_employee + cit_employee);
  
  return {
    grossSalary,
    gender,
    allowances,
    totalGross: Number(totalGross.toFixed(2)),
    deductions: {
      ssf_employee: Number(ssf_employee.toFixed(2)),
      ssf_employer: Number(ssf_employer.toFixed(2)),
      cit_employee: Number(cit_employee.toFixed(2)),
      cit_employer: Number(cit_employer.toFixed(2)),
      incomeTax: taxResult.totalTax
    },
    taxableIncome: taxResult.taxableIncome,
    incomeTax: taxResult.totalTax,
    netSalary: Number((totalGross - ssf_employee - cit_employee - (taxResult.totalTax / 12)).toFixed(2)),
    costToCompany: Number((totalGross + ssf_employer + cit_employer).toFixed(2))
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
 * NEPSE Trading Commission & Profit (FY 2082/83 Standards)
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

