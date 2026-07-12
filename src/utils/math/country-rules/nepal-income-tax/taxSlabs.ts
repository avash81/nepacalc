import { SlabBreakdown } from './types';

// Centralize the 2083/84 single-slab structure
const SLAB_LIMITS = [1000000, 500000, 1000000, 1500000, Infinity];
const SLAB_RATES = [0.01, 0.10, 0.20, 0.27, 0.29];
const SLAB_LABELS = [
  'First Rs. 10 Lakh',
  'Next Rs. 5 Lakh (10L - 15L)',
  'Next Rs. 10 Lakh (15L - 25L)',
  'Next Rs. 15 Lakh (25L - 40L)',
  'Above Rs. 40 Lakh'
];

export function calculateSlab1(remainingIncome: number, isSSFContributor: boolean): SlabBreakdown {
  const limit = SLAB_LIMITS[0];
  // If SSF Contributor, the 1% Social Security Tax is waived
  const rate = isSSFContributor ? 0 : SLAB_RATES[0];
  const incomeInSlab = Math.min(remainingIncome, limit);
  const taxAmount = incomeInSlab > 0 ? incomeInSlab * rate : 0;
  
  return {
    slabName: SLAB_LABELS[0],
    incomeInSlab: Math.max(0, incomeInSlab),
    taxRate: rate,
    taxAmount,
    remainingIncome: Math.max(0, remainingIncome - incomeInSlab)
  };
}

export function calculateSlab2(remainingIncome: number): SlabBreakdown {
  const limit = SLAB_LIMITS[1];
  const rate = SLAB_RATES[1];
  const incomeInSlab = Math.min(remainingIncome, limit);
  const taxAmount = incomeInSlab > 0 ? incomeInSlab * rate : 0;
  
  return {
    slabName: SLAB_LABELS[1],
    incomeInSlab: Math.max(0, incomeInSlab),
    taxRate: rate,
    taxAmount,
    remainingIncome: Math.max(0, remainingIncome - incomeInSlab)
  };
}

export function calculateSlab3(remainingIncome: number): SlabBreakdown {
  const limit = SLAB_LIMITS[2];
  const rate = SLAB_RATES[2];
  const incomeInSlab = Math.min(remainingIncome, limit);
  const taxAmount = incomeInSlab > 0 ? incomeInSlab * rate : 0;
  
  return {
    slabName: SLAB_LABELS[2],
    incomeInSlab: Math.max(0, incomeInSlab),
    taxRate: rate,
    taxAmount,
    remainingIncome: Math.max(0, remainingIncome - incomeInSlab)
  };
}

export function calculateSlab4(remainingIncome: number): SlabBreakdown {
  const limit = SLAB_LIMITS[3];
  const rate = SLAB_RATES[3];
  const incomeInSlab = Math.min(remainingIncome, limit);
  const taxAmount = incomeInSlab > 0 ? incomeInSlab * rate : 0;
  
  return {
    slabName: SLAB_LABELS[3],
    incomeInSlab: Math.max(0, incomeInSlab),
    taxRate: rate,
    taxAmount,
    remainingIncome: Math.max(0, remainingIncome - incomeInSlab)
  };
}

export function calculateSlab5(remainingIncome: number): SlabBreakdown {
  const limit = SLAB_LIMITS[4];
  const rate = SLAB_RATES[4];
  const incomeInSlab = Math.min(remainingIncome, limit);
  const taxAmount = incomeInSlab > 0 ? incomeInSlab * rate : 0;
  
  return {
    slabName: SLAB_LABELS[4],
    incomeInSlab: Math.max(0, incomeInSlab),
    taxRate: rate,
    taxAmount,
    remainingIncome: Math.max(0, remainingIncome - incomeInSlab)
  };
}

export function processAllSlabs(taxableIncome: number, isSSFContributor: boolean): SlabBreakdown[] {
  const breakdown: SlabBreakdown[] = [];
  if (taxableIncome <= 0) return breakdown;

  const s1 = calculateSlab1(taxableIncome, isSSFContributor);
  if (s1.incomeInSlab > 0) breakdown.push(s1);

  if (s1.remainingIncome > 0) {
    const s2 = calculateSlab2(s1.remainingIncome);
    if (s2.incomeInSlab > 0) breakdown.push(s2);

    if (s2.remainingIncome > 0) {
      const s3 = calculateSlab3(s2.remainingIncome);
      if (s3.incomeInSlab > 0) breakdown.push(s3);

      if (s3.remainingIncome > 0) {
        const s4 = calculateSlab4(s3.remainingIncome);
        if (s4.incomeInSlab > 0) breakdown.push(s4);

        if (s4.remainingIncome > 0) {
          const s5 = calculateSlab5(s4.remainingIncome);
          if (s5.incomeInSlab > 0) breakdown.push(s5);
        }
      }
    }
  }

  return breakdown;
}
