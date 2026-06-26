/**
 * =======================================================================
 * NEPACALC - MASTER ACCURACY VERIFICATION SUITE
 * =======================================================================
 * This suite verifies the core mathematical engines of the platform.
 */

import { 
  calculateEMI, 
  calculateFlatEMI,
  calculateSI,
  calculateSIP, 
  calculateFD, 
  calculateCompoundInterest, 
  calculateCAGR, 
  calculateDiscount,
  calculateSplitBill
} from '@/utils/math/finance';

import { 
  calculateBMI, 
  calculateBMR, 
  calculateIdealWeight, 
  calculateBodyFat 
} from '@/utils/math/health';

import { 
  calculateGPA, 
  calculateAttendance, 
  calculatePercentage, 
  calculateLog, 
  calculateSD, 
  calculateFraction 
} from '@/utils/math/education';

import { calculateNepalVAT, calculateNepalIncomeTax } from '@/utils/math/country-rules/nepal';
import { toRoman, fromRoman } from '@/utils/math/conversion';
import { AdvancedSolvers } from '@/utils/math/advancedSolvers';

describe('NEPACALC MASTER ACCURACY AUDIT', () => {

  describe('FINANCE CORE', () => {
    test('EMI (Reducing): 1L @ 10% for 1yr', () => {
      expect(calculateEMI(100000, 10, 1).emi).toBeCloseTo(8791.59, 1);
    });

    test('EMI (Flat): 10L @ 11.5% for 15yr', () => {
      expect(calculateFlatEMI(1000000, 11.5, 15).emi).toBeCloseTo(15138.89, 0);
    });

    test('Simple Interest: 1L @ 10% for 1yr', () => {
      const res = calculateSI(100000, 10, 1);
      expect(res.interest).toBe(10000);
      expect(res.total).toBe(110000);
    });

    test('SIP Growth: 5000/mo @ 12% for 10yr', () => {
      const res = calculateSIP(5000, 12, 10);
      expect(res.futureValue).toBeCloseTo(1161695, -1);
    });

    test('FD Maturity: 1L @ 10% quarterly for 1yr', () => {
      expect(calculateFD(100000, 10, 1, 4).maturityAmount).toBeCloseTo(110381.29, 1);
    });

    test('CAGR Tracking: 10K to 15K in 3yr', () => {
      expect(calculateCAGR(10000, 15000, 3).cagr).toBeCloseTo(14.47, 1);
    });

    test('Discount: 20% off 1000', () => {
      expect(calculateDiscount(1000, 20).finalPrice).toBe(800);
    });

    test('Split Bill: 1500 bill, 10% tip, 2 people', () => {
      expect(calculateSplitBill(1500, 10, 2).perPerson).toBe(825);
    });
  });

  describe('HEALTH METRICS', () => {
    test('BMI (Metric): 75kg, 180cm -> Normal', () => {
      expect(calculateBMI(75, 180).bmi).toBeCloseTo(23.15, 1);
    });

    test('BMI (Imperial): 150lb, 70in', () => {
      expect(calculateBMI(150, 70, 'imperial').bmi).toBeCloseTo(21.52, 1);
    });

    test('Ideal Weight: Male 170cm', () => {
      expect(calculateIdealWeight('male', 170).ideal).toBeCloseTo(65.94, 0);
    });

    test('Body Fat (Navy): Male 175cm/85waist', () => {
      expect(calculateBodyFat('male', 175, 38, 85).percentage).toBeGreaterThan(15);
    });
  });

  describe('EDUCATION & LOGIC', () => {
    test('Percentage: 15% of 2500', () => {
      expect(calculatePercentage(15, 2500)).toBe(375);
    });

    test('Fractions: 1/2 + 1/3 = 5/6', () => {
      const res = calculateFraction(1, 2, 1, 3, '+');
      expect(res.n).toBe(5);
      expect(res.d).toBe(6);
    });

    test('Quadratic: x^2 - 5x + 6 = 0', () => {
      const res = AdvancedSolvers.solveQuadratic(1, -5, 6);
      expect(res.roots).toContain(2);
      expect(res.roots).toContain(3);
    });

    test('Logarithms: log10(100) = 2', () => {
      expect(calculateLog(10, 100)).toBeCloseTo(2, 4);
    });

    test('Standard Deviation', () => {
      const res = calculateSD([10, 20, 30, 40, 50]);
      expect(res.mean).toBe(30);
      expect(res.sd).toBeCloseTo(15.81, 1);
    });
  });

  describe('NEPAL & CONVERSION', () => {
    test('VAT (Nepal): 13% Exclusive', () => {
      const res = calculateNepalVAT(10000, 'exclusive');
      expect(res.priceIncludingVAT).toBe(11300);
    });

    test('Roman Numerals: 2026', () => {
      expect(toRoman(2026)).toBe('MMXXVI');
    });

    test('Nepal Income Tax (Single, 10L, No SSF)', () => {
      const res = calculateNepalIncomeTax(1000000, false, false);
      expect(res.totalTax).toBe(85000);
    });

    test('Nepal Income Tax (Married, 11L, No SSF)', () => {
      const res = calculateNepalIncomeTax(1100000, true, false);
      expect(res.totalTax).toBe(86000);
    });

    test('Nepal Income Tax (Single, 10L, SSF Contributor)', () => {
      const res = calculateNepalIncomeTax(1000000, false, true);
      // SSF = 11% of 10L = 110,000
      // Taxable = 890,000
      // Slabs: 5L (0% due to SSF), 2L (10%), 1.9L (20%)
      // Tax = 0 + 20,000 + 38,000 = 58,000
      expect(res.totalTax).toBe(58000);
    });
  });

  describe('EDGE CASES', () => {
    test('BMI height=0', () => {
      expect(calculateBMI(70, 0).bmi).toBe(NaN);
    });

    test('VAT zero', () => {
      expect(calculateNepalVAT(0, 'exclusive').vatAmount).toBe(0);
    });

    test('Percentage zero', () => {
      expect(calculatePercentage(50, 0)).toBe(0);
    });

    test('Tip division zero -> Infinity', () => {
      expect(calculateSplitBill(1000, 10, 0).perPerson).toBe(Infinity);
    });
  });

});

