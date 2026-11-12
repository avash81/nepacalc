// US Tax & Payroll Rules Data Engine
// Based on IRS Publication 15-T, SSA Wage Caps, and 50-State Revenue Guidelines

export type FilingStatus = 'single' | 'married_joint' | 'head_of_household' | 'married_separate';
export type PayFrequency = 'weekly' | 'biweekly' | 'semimonthly' | 'monthly' | 'annually';

export interface StateTaxRule {
  name: string;
  code: string;
  type: 'none' | 'flat' | 'graduated';
  flatRate?: number;
  brackets?: { thresholdSingle: number; thresholdMarried: number; rate: number }[];
  standardDeduction?: { single: number; married: number };
  sdiRate?: number; // State Disability Insurance or family leave
}

export const FICA_RULES = {
  // Social Security (OASDI)
  socialSecurityRate: 0.062,
  socialSecurityWageCap: 176100, // 2026 official SSA limit (max $10,918.20 employee tax)
  
  // Medicare (HI)
  medicareRate: 0.0145,
  additionalMedicareRate: 0.009,
  // Employer payroll withholding mandate triggers at $200k regardless of filing status:
  additionalMedicareWithholdingThreshold: 200000,
  // End-of-year tax liability thresholds:
  additionalMedicareLiabilityThresholds: {
    single: 200000,
    married_joint: 250000,
    head_of_household: 200000,
    married_separate: 125000,
  },
};

export const FEDERAL_STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 16100,
  married_joint: 32200,
  head_of_household: 24150,
  married_separate: 16100,
};

export const FEDERAL_BRACKETS: Record<FilingStatus, { upTo: number; rate: number }[]> = {
  single: [
    { upTo: 12400, rate: 0.10 },
    { upTo: 50400, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201775, rate: 0.24 },
    { upTo: 256225, rate: 0.32 },
    { upTo: 640600, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  married_joint: [
    { upTo: 24800, rate: 0.10 },
    { upTo: 100800, rate: 0.12 },
    { upTo: 211400, rate: 0.22 },
    { upTo: 403550, rate: 0.24 },
    { upTo: 512450, rate: 0.32 },
    { upTo: 768700, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  head_of_household: [
    { upTo: 17700, rate: 0.10 },
    { upTo: 67450, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201750, rate: 0.24 },
    { upTo: 256200, rate: 0.32 },
    { upTo: 640600, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  married_separate: [
    { upTo: 12400, rate: 0.10 },
    { upTo: 50400, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201775, rate: 0.24 },
    { upTo: 256225, rate: 0.32 },
    { upTo: 384350, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
};

// 50 States + DC Tax Specifications
export const US_STATES: Record<string, StateTaxRule> = {
  AL: { name: 'Alabama', code: 'AL', type: 'graduated', brackets: [{ thresholdSingle: 500, thresholdMarried: 1000, rate: 0.02 }, { thresholdSingle: 3000, thresholdMarried: 6000, rate: 0.04 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.05 }] },
  AK: { name: 'Alaska', code: 'AK', type: 'none' },
  AZ: { name: 'Arizona', code: 'AZ', type: 'flat', flatRate: 0.025 },
  AR: { name: 'Arkansas', code: 'AR', type: 'graduated', brackets: [{ thresholdSingle: 5000, thresholdMarried: 10000, rate: 0.02 }, { thresholdSingle: 10000, thresholdMarried: 20000, rate: 0.03 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.039 }] },
  CA: { name: 'California', code: 'CA', type: 'graduated', sdiRate: 0.012, brackets: [
    { thresholdSingle: 10756, thresholdMarried: 21512, rate: 0.01 },
    { thresholdSingle: 25499, thresholdMarried: 50998, rate: 0.02 },
    { thresholdSingle: 40245, thresholdMarried: 80490, rate: 0.04 },
    { thresholdSingle: 55866, thresholdMarried: 111732, rate: 0.06 },
    { thresholdSingle: 70606, thresholdMarried: 141212, rate: 0.08 },
    { thresholdSingle: 360659, thresholdMarried: 721318, rate: 0.093 },
    { thresholdSingle: 432787, thresholdMarried: 865574, rate: 0.103 },
    { thresholdSingle: 721314, thresholdMarried: 1442628, rate: 0.113 },
    { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.123 },
  ]},
  CO: { name: 'Colorado', code: 'CO', type: 'flat', flatRate: 0.044 },
  CT: { name: 'Connecticut', code: 'CT', type: 'graduated', brackets: [{ thresholdSingle: 10000, thresholdMarried: 20000, rate: 0.03 }, { thresholdSingle: 50000, thresholdMarried: 100000, rate: 0.05 }, { thresholdSingle: 100000, thresholdMarried: 200000, rate: 0.055 }, { thresholdSingle: 200000, thresholdMarried: 400000, rate: 0.06 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.0699 }] },
  DE: { name: 'Delaware', code: 'DE', type: 'graduated', brackets: [{ thresholdSingle: 5000, thresholdMarried: 5000, rate: 0.022 }, { thresholdSingle: 10000, thresholdMarried: 10000, rate: 0.039 }, { thresholdSingle: 20000, thresholdMarried: 20000, rate: 0.048 }, { thresholdSingle: 25000, thresholdMarried: 25000, rate: 0.052 }, { thresholdSingle: 60000, thresholdMarried: 60000, rate: 0.0555 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.066 }] },
  DC: { name: 'District of Columbia', code: 'DC', type: 'graduated', brackets: [{ thresholdSingle: 10000, thresholdMarried: 10000, rate: 0.04 }, { thresholdSingle: 40000, thresholdMarried: 40000, rate: 0.06 }, { thresholdSingle: 60000, thresholdMarried: 60000, rate: 0.065 }, { thresholdSingle: 250000, thresholdMarried: 250000, rate: 0.085 }, { thresholdSingle: 500000, thresholdMarried: 500000, rate: 0.0925 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.1075 }] },
  FL: { name: 'Florida', code: 'FL', type: 'none' },
  GA: { name: 'Georgia', code: 'GA', type: 'flat', flatRate: 0.0539 },
  HI: { name: 'Hawaii', code: 'HI', type: 'graduated', brackets: [{ thresholdSingle: 4800, thresholdMarried: 9600, rate: 0.032 }, { thresholdSingle: 9600, thresholdMarried: 19200, rate: 0.055 }, { thresholdSingle: 19200, thresholdMarried: 38400, rate: 0.068 }, { thresholdSingle: 36000, thresholdMarried: 72000, rate: 0.076 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.0825 }] },
  ID: { name: 'Idaho', code: 'ID', type: 'flat', flatRate: 0.053 },
  IL: { name: 'Illinois', code: 'IL', type: 'flat', flatRate: 0.0495 },
  IN: { name: 'Indiana', code: 'IN', type: 'flat', flatRate: 0.0295 },
  IA: { name: 'Iowa', code: 'IA', type: 'flat', flatRate: 0.038 },
  KS: { name: 'Kansas', code: 'KS', type: 'graduated', brackets: [{ thresholdSingle: 15000, thresholdMarried: 30000, rate: 0.031 }, { thresholdSingle: 30000, thresholdMarried: 60000, rate: 0.0525 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.0558 }] },
  KY: { name: 'Kentucky', code: 'KY', type: 'flat', flatRate: 0.040 },
  LA: { name: 'Louisiana', code: 'LA', type: 'graduated', brackets: [{ thresholdSingle: 12500, thresholdMarried: 25000, rate: 0.0185 }, { thresholdSingle: 50000, thresholdMarried: 100000, rate: 0.035 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.0425 }] },
  ME: { name: 'Maine', code: 'ME', type: 'graduated', brackets: [{ thresholdSingle: 26050, thresholdMarried: 52100, rate: 0.058 }, { thresholdSingle: 61600, thresholdMarried: 123250, rate: 0.0675 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.0715 }] },
  MD: { name: 'Maryland', code: 'MD', type: 'graduated', brackets: [{ thresholdSingle: 3000, thresholdMarried: 3000, rate: 0.03 }, { thresholdSingle: 100000, thresholdMarried: 150000, rate: 0.0475 }, { thresholdSingle: 125000, thresholdMarried: 175000, rate: 0.05 }, { thresholdSingle: 150000, thresholdMarried: 225000, rate: 0.0525 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.0575 }] },
  MA: { name: 'Massachusetts', code: 'MA', type: 'flat', flatRate: 0.050 }, // 4% surtax over $1M
  MI: { name: 'Michigan', code: 'MI', type: 'flat', flatRate: 0.0425 },
  MN: { name: 'Minnesota', code: 'MN', type: 'graduated', brackets: [{ thresholdSingle: 31690, thresholdMarried: 46330, rate: 0.0535 }, { thresholdSingle: 104090, thresholdMarried: 184040, rate: 0.068 }, { thresholdSingle: 193240, thresholdMarried: 321450, rate: 0.0785 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.0985 }] },
  MS: { name: 'Mississippi', code: 'MS', type: 'flat', flatRate: 0.047 },
  MO: { name: 'Missouri', code: 'MO', type: 'graduated', brackets: [{ thresholdSingle: 1324, thresholdMarried: 1324, rate: 0.02 }, { thresholdSingle: 2648, thresholdMarried: 2648, rate: 0.025 }, { thresholdSingle: 3972, thresholdMarried: 3972, rate: 0.03 }, { thresholdSingle: 5296, thresholdMarried: 5296, rate: 0.035 }, { thresholdSingle: 6620, thresholdMarried: 6620, rate: 0.04 }, { thresholdSingle: 7944, thresholdMarried: 7944, rate: 0.045 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.047 }] },
  MT: { name: 'Montana', code: 'MT', type: 'graduated', brackets: [{ thresholdSingle: 20500, thresholdMarried: 41000, rate: 0.047 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.059 }] },
  NE: { name: 'Nebraska', code: 'NE', type: 'graduated', brackets: [{ thresholdSingle: 3700, thresholdMarried: 7390, rate: 0.0246 }, { thresholdSingle: 22170, thresholdMarried: 44350, rate: 0.0351 }, { thresholdSingle: 35480, thresholdMarried: 70960, rate: 0.0501 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.052 }] },
  NV: { name: 'Nevada', code: 'NV', type: 'none' },
  NH: { name: 'New Hampshire', code: 'NH', type: 'none' }, // 0% on earned wages
  NJ: { name: 'New Jersey', code: 'NJ', type: 'graduated', brackets: [{ thresholdSingle: 20000, thresholdMarried: 20000, rate: 0.014 }, { thresholdSingle: 35000, thresholdMarried: 50000, rate: 0.0175 }, { thresholdSingle: 40000, thresholdMarried: 70000, rate: 0.035 }, { thresholdSingle: 75000, thresholdMarried: 80000, rate: 0.05525 }, { thresholdSingle: 500000, thresholdMarried: 150000, rate: 0.0637 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.0897 }] },
  NM: { name: 'New Mexico', code: 'NM', type: 'graduated', brackets: [{ thresholdSingle: 5500, thresholdMarried: 8000, rate: 0.017 }, { thresholdSingle: 11000, thresholdMarried: 16000, rate: 0.032 }, { thresholdSingle: 16000, thresholdMarried: 24000, rate: 0.047 }, { thresholdSingle: 210000, thresholdMarried: 315000, rate: 0.049 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.059 }] },
  NY: { name: 'New York', code: 'NY', type: 'graduated', brackets: [
    { thresholdSingle: 8500, thresholdMarried: 17150, rate: 0.04 },
    { thresholdSingle: 11700, thresholdMarried: 23600, rate: 0.045 },
    { thresholdSingle: 13900, thresholdMarried: 27900, rate: 0.0525 },
    { thresholdSingle: 80650, thresholdMarried: 161550, rate: 0.055 },
    { thresholdSingle: 215400, thresholdMarried: 323200, rate: 0.06 },
    { thresholdSingle: 1077550, thresholdMarried: 2155350, rate: 0.0685 },
    { thresholdSingle: 5000000, thresholdMarried: 5000000, rate: 0.0965 },
    { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.109 },
  ]},
  NC: { name: 'North Carolina', code: 'NC', type: 'flat', flatRate: 0.0399 },
  ND: { name: 'North Dakota', code: 'ND', type: 'graduated', brackets: [{ thresholdSingle: 44725, thresholdMarried: 74750, rate: 0.0 }, { thresholdSingle: 225975, thresholdMarried: 275100, rate: 0.0195 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.025 }] },
  OH: { name: 'Ohio', code: 'OH', type: 'graduated', brackets: [{ thresholdSingle: 26050, thresholdMarried: 26050, rate: 0.0 }, { thresholdSingle: 100000, thresholdMarried: 100000, rate: 0.0275 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.035 }] },
  OK: { name: 'Oklahoma', code: 'OK', type: 'graduated', brackets: [{ thresholdSingle: 1000, thresholdMarried: 2000, rate: 0.0025 }, { thresholdSingle: 2500, thresholdMarried: 5000, rate: 0.0075 }, { thresholdSingle: 3750, thresholdMarried: 7500, rate: 0.0175 }, { thresholdSingle: 4900, thresholdMarried: 9800, rate: 0.0275 }, { thresholdSingle: 7200, thresholdMarried: 12200, rate: 0.0375 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.0475 }] },
  OR: { name: 'Oregon', code: 'OR', type: 'graduated', brackets: [{ thresholdSingle: 4300, thresholdMarried: 8600, rate: 0.0475 }, { thresholdSingle: 10750, thresholdMarried: 21500, rate: 0.0675 }, { thresholdSingle: 125000, thresholdMarried: 250000, rate: 0.0875 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.099 }] },
  PA: { name: 'Pennsylvania', code: 'PA', type: 'flat', flatRate: 0.0307 },
  RI: { name: 'Rhode Island', code: 'RI', type: 'graduated', brackets: [{ thresholdSingle: 77450, thresholdMarried: 77450, rate: 0.0375 }, { thresholdSingle: 176050, thresholdMarried: 176050, rate: 0.0475 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.0599 }] },
  SC: { name: 'South Carolina', code: 'SC', type: 'graduated', brackets: [{ thresholdSingle: 3460, thresholdMarried: 3460, rate: 0.0 }, { thresholdSingle: 17330, thresholdMarried: 17330, rate: 0.03 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.062 }] },
  SD: { name: 'South Dakota', code: 'SD', type: 'none' },
  TN: { name: 'Tennessee', code: 'TN', type: 'none' },
  TX: { name: 'Texas', code: 'TX', type: 'none' },
  UT: { name: 'Utah', code: 'UT', type: 'flat', flatRate: 0.045 },
  VT: { name: 'Vermont', code: 'VT', type: 'graduated', brackets: [{ thresholdSingle: 45400, thresholdMarried: 75850, rate: 0.0335 }, { thresholdSingle: 110050, thresholdMarried: 183550, rate: 0.066 }, { thresholdSingle: 229550, thresholdMarried: 279700, rate: 0.076 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.0875 }] },
  VA: { name: 'Virginia', code: 'VA', type: 'graduated', brackets: [{ thresholdSingle: 3000, thresholdMarried: 3000, rate: 0.02 }, { thresholdSingle: 5000, thresholdMarried: 5000, rate: 0.03 }, { thresholdSingle: 17000, thresholdMarried: 17000, rate: 0.05 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.0575 }] },
  WA: { name: 'Washington', code: 'WA', type: 'none' },
  WV: { name: 'West Virginia', code: 'WV', type: 'graduated', brackets: [{ thresholdSingle: 10000, thresholdMarried: 10000, rate: 0.0236 }, { thresholdSingle: 25000, thresholdMarried: 25000, rate: 0.0315 }, { thresholdSingle: 40000, thresholdMarried: 40000, rate: 0.0354 }, { thresholdSingle: 60000, thresholdMarried: 60000, rate: 0.0472 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.0512 }] },
  WI: { name: 'Wisconsin', code: 'WI', type: 'graduated', brackets: [{ thresholdSingle: 14320, thresholdMarried: 19090, rate: 0.035 }, { thresholdSingle: 28640, thresholdMarried: 38190, rate: 0.044 }, { thresholdSingle: 315310, thresholdMarried: 420420, rate: 0.053 }, { thresholdSingle: Infinity, thresholdMarried: Infinity, rate: 0.0765 }] },
  WY: { name: 'Wyoming', code: 'WY', type: 'none' },
};

export const PAY_PERIODS: Record<PayFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
  annually: 1,
};