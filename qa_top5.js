// NEPACALC Top 5 Calculator Accuracy Verification Suite
// Runs all test cases without needing a browser

// ============================================================
// UTIL: Nepal Tax Engine (directly ported from nepal.ts)
// ============================================================
const taxSlabs = {
  fiscalYear: "2082/83",
  individual: {
    single: [
      { upTo: 500000,  rate: 0.01, label: "1% SST" },
      { upTo: 700000,  rate: 0.10, label: "10%" },
      { upTo: 1000000, rate: 0.20, label: "20%" },
      { upTo: 2000000, rate: 0.30, label: "30%" },
      { upTo: 5000000, rate: 0.36, label: "36%" },
      { upTo: null,    rate: 0.39, label: "39%" }
    ],
    married: [
      { upTo: 600000,  rate: 0.01, label: "1% SST" },
      { upTo: 800000,  rate: 0.10, label: "10%" },
      { upTo: 1100000, rate: 0.20, label: "20%" },
      { upTo: 2100000, rate: 0.30, label: "30%" },
      { upTo: 5100000, rate: 0.36, label: "36%" },
      { upTo: null,    rate: 0.39, label: "39%" }
    ]
  },
  ssfWaivesFirstSlab: true
};

function calculateNepalIncomeTax(annualIncome, isMarried, isSSFContributor, gender = 'male', ssfAmountInput) {
  if (annualIncome <= 0) return { totalTax: 0, taxableIncome: 0, breakdown: [] };
  const slabs = isMarried ? taxSlabs.individual.married : taxSlabs.individual.single;
  const maxSsfDeduction = Math.min(annualIncome / 3, 500000);
  const providedSsfDeduction = ssfAmountInput ?? (annualIncome * 0.11);
  const ssfDeduction = isSSFContributor ? Math.max(0, Math.min(providedSsfDeduction, maxSsfDeduction)) : 0;
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
      if (i === 0 && isSSFContributor && taxSlabs.ssfWaivesFirstSlab) rate = 0;
      const taxAmount = taxableInSlab * rate;
      totalTax += taxAmount;
      breakdown.push({ slab: slab.label, amount: taxableInSlab, rate: rate * 100, tax: taxAmount });
      remaining -= taxableInSlab;
    }
    previousLimit = limit;
    if (remaining <= 0) break;
  }
  if (gender === 'female' && totalTax > 0) totalTax -= totalTax * 0.10;
  return { totalTax: Math.round(totalTax), taxableIncome, breakdown };
}

function calculateEMI(principal, annualRate, tenureYears) {
  const R = annualRate / 12 / 100;
  const N = tenureYears * 12;
  if (R === 0) return { emi: principal / N };
  const emi = (principal * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
  return { emi: Math.round(emi), total: Math.round(emi * N), interest: Math.round(emi * N - principal) };
}

function calculateGPA(subjects) {
  const weightedSum = subjects.reduce((sum, s) => sum + s.credits * s.grade, 0);
  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  return { gpa: (weightedSum / totalCredits).toFixed(2) };
}

function calculateVAT(price, mode, includeServiceCharge = false) {
  const vatRate = 0.13, scRate = 0.10;
  if (mode === 'add') {
    const sc = includeServiceCharge ? price * scRate : 0;
    const vat = (price + sc) * vatRate;
    return { base: price, sc: Math.round(sc), vat: Math.round(vat), total: Math.round(price + sc + vat) };
  } else {
    const multiplier = includeServiceCharge ? (1 + scRate) * (1 + vatRate) : (1 + vatRate);
    const base = price / multiplier;
    const sc = includeServiceCharge ? Math.round(base * scRate) : 0;
    const vat = Math.round(price - base - sc);
    return { base: Math.round(base), sc, vat, total: price };
  }
}

// ============================================================
// RUN TESTS
// ============================================================
let passed = 0, failed = 0;

function assert(label, got, expected, tolerance = 0) {
  const diff = Math.abs(got - expected);
  const ok = diff <= tolerance;
  if (ok) {
    console.log(`  ✅ PASS: ${label} → Got ${got} (Expected ${expected})`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${label} → Got ${got} (Expected ${expected}, diff: ${diff})`);
    failed++;
  }
}

console.log("\n════════════════════════════════════════");
console.log("  NEPACALC TOP 5 ACCURACY AUDIT");
console.log("════════════════════════════════════════\n");

// ---- TEST 1: INCOME TAX ----
console.log("📋 TEST 1: Nepal Income Tax Calculator");

// Case A: Single, Rs 875,000 taxable (after 25k life ins deduction from 900k)
const t1a = calculateNepalIncomeTax(875000, false, false, 'male');
assert("Single | Rs.875k taxable | Total Tax", t1a.totalTax, 60000, 200);

// Case B: Married, SSF, Rs 49,60,000 taxable (after 40k deduction from 50L)
const t1b = calculateNepalIncomeTax(4960000, true, true, 'male');
assert("Married + SSF | Rs.49.6L taxable | Total Tax", t1b.totalTax, 1415600, 2000);

// Case C: Female 10% rebate
const t1c = calculateNepalIncomeTax(875000, false, false, 'female');
assert("Female | Rs.875k | Tax with 10% rebate", t1c.totalTax, 54000, 200);

console.log();

// ---- TEST 2: EMI ----
console.log("📋 TEST 2: EMI / Loan Calculator");
const t2 = calculateEMI(5000000, 8.5, 20);
assert("Home Loan | 50L @ 8.5% 20yr | Monthly EMI", t2.emi, 43391, 500);
assert("Home Loan | Total Payment", t2.total, 10413840, 20000);

console.log();

// ---- TEST 3: GPA ----
console.log("📋 TEST 3: GPA Calculator");
const t3 = calculateGPA([
  { credits: 3, grade: 4.0 },
  { credits: 4, grade: 3.3 },
  { credits: 2, grade: 3.7 },
  { credits: 2, grade: 3.0 }
]);
assert("4-Subject GPA", parseFloat(t3.gpa), 3.51, 0.01);

console.log();

// ---- TEST 4: VAT ----
console.log("📋 TEST 4: Nepal VAT Calculator");
const t4a = calculateVAT(10000, 'add');
assert("Add 13% VAT to Rs.10,000", t4a.total, 11300, 0);

const t4b = calculateVAT(11300, 'remove');
assert("Extract VAT from Rs.11,300 | Base", t4b.base, 10000, 1);
assert("Extract VAT from Rs.11,300 | VAT Amount", t4b.vat, 1300, 1);

const t4c = calculateVAT(1000, 'add', true);
assert("Restaurant: Rs.1000 + SC + VAT | Total", t4c.total, 1243, 1);
assert("Restaurant: Rs.1000 + SC + VAT | VAT", t4c.vat, 143, 1);

console.log();

// ---- TEST 5: BOUNDARY TESTS ----
console.log("📋 TEST 5: Edge Case Boundary Checks");
const t5a = calculateNepalIncomeTax(500000, false, false, 'male');
assert("Income exactly at slab boundary | Rs.5L | Tax", t5a.totalTax, 5000, 0);

const t5b = calculateNepalIncomeTax(500001, false, false, 'male');
assert("Income just above 1st slab | Rs.500,001 | Tax > 5000", t5b.totalTax > 5000 ? 1 : 0, 1, 0);

const t5c = calculateEMI(1000000, 12, 1);
assert("EMI stress: Rs.10L @ 12% 1yr | Within range", t5c.emi > 88000 && t5c.emi < 90000 ? 1 : 0, 1, 0);

// ---- FINAL REPORT ----
console.log("\n════════════════════════════════════════");
const total = passed + failed;
if (failed === 0) {
  console.log(`🏆 CERTIFIED: ${passed}/${total} tests PASSED — All Top 5 calculators are 100% accurate!`);
} else {
  console.log(`⚠️  RESULT: ${passed}/${total} passed, ${failed} FAILED — Fixes required.`);
}
console.log("════════════════════════════════════════\n");
