import { ReactNode } from 'react';

export interface Calculator {
  id: string;
  slug: string;
  name: string;
  icon: string | ReactNode;
  description: string;
  category: string;
  isNepal?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  keywords?: string[];
  // SEO Enhancements
  steps?: string[];
  faqs?: { q: string, a: string }[];
  imageSteps?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  calculators: Calculator[];
}

export const CALCULATORS: Calculator[] = [
  // ==========================================
  // NEPAL SPECIFIC PILLAR
  // ==========================================
  { id: 'nepal-income-tax', slug: 'nepal-income-tax', name: 'Income Tax (Nepal)', icon: '📋', description: 'Institutional Nepal tax calculator updated for latest fiscal mandates.', category: 'nepal', isNepal: true, isHot: true, 
    steps: [
      'Enter your total annual or monthly gross income.',
      'Select your marital status (Single or Married) to apply correct tax slabs.',
      'Deduct mandatory contributions like Provident Fund (CIT/EPF).',
      'The engine automatically applies the latest Nepal Government tax brackets for the current fiscal year.',
      'Review your net take-home pay and total annual tax liability.'
    ]
  },
  { id: 'nepal-salary', slug: 'nepal-salary', name: 'Salary Calculator', icon: '💼', description: 'Calculate net-take-home salary with latest IRD deductions.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'nepal-land', slug: 'nepal-land', name: 'Nepal Land (Bigha, Aana, Ropani)', icon: '🗺️', description: 'Institutional land converter for Hill (Ropani, Aana) and Terai (Bigha, Kattha) systems.', category: 'nepal', isNepal: true, isHot: true, keywords: ['bigha', 'kattha', 'ropani', 'aana', 'land converter', 'nepal land'] },
  { id: 'nepali-date', slug: 'nepali-date', name: 'Nepali Date Converter', icon: '📅', description: 'BS to AD institutional converter.', category: 'nepal', isNepal: true },
  { id: 'nepal-vat', slug: 'nepal-vat', name: 'VAT & Bill Calc', icon: '🧾', description: 'VAT (13%) addition and subtraction logic.', category: 'nepal', isNepal: true },
  { id: 'gold-converter', slug: 'gold-converter', name: 'Gold & Silver Lab', icon: '🟡', description: 'Nepal Tola-to-Gram converter for jewelry market.', category: 'nepal', isNepal: true, isNew: true, keywords: ['tola to gram', 'gold price nepal', 'lal to gram', 'silver tola'],
    steps: [
      'Select the metal type (Gold or Silver).',
      'Enter the weight in either Tola or Grams.',
      'Specify the impurity level if calculating jewelry value.',
      'Our engine instantly converts between Tola, Gram, and Lal using the official Nepal standardization.',
      'Check the final weight and estimated market value.'
    ]
  },
  { id: 'nea-bill', slug: 'nea-bill', name: 'NEA Bill Calc', icon: '⚡', description: 'Progressive slab billing for Nepal Electricity Authority.', category: 'nepal', isNepal: true, isNew: true, keywords: ['nea electricity bill', 'electricity rate nepal', 'nea units'] },
  { id: 'property-tax', slug: 'property-tax', name: 'Property Tax (CGT)', icon: '📜', description: 'Calculate Capital Gains Tax for Nepal real estate.', category: 'nepal', isNepal: true, isNew: true, keywords: ['malpok tax', 'cgt nepal', 'property sales tax'] },
  { id: 'nepal-attendance', slug: 'nepal-attendance', name: 'TU/PU Attendance', icon: '🎓', description: 'Track 75% exam eligibility for Nepal universities.', category: 'nepal', isNepal: true, isNew: true, keywords: ['tu attendance', 'pu eligibility', 'education nepal'] },
  { id: 'remittance-calculator', slug: 'remittance-calculator', name: 'Remittance Lab', icon: '💸', description: 'Convert earnings from abroad to NPR with fee comparisons.', category: 'nepal', isNepal: true, isHot: true, keywords: ['remittance today', 'usd to npr', 'ime rates', 'western union nepal'] },
  { id: 'gratuity-calculator', slug: 'gratuity-calculator', name: 'Gratuity Console', icon: '💼', description: 'Calculate retirement benefits under Labor Act 2074.', category: 'nepal', isNepal: true, isNew: true, keywords: ['gratuity nepal', 'labor act 2074', 'retirement benefits'] },
  { id: 'property-registration', slug: 'property-registration', name: 'Registry & Stamp Duty', icon: '📜', description: 'Calculate property Malpok fees with female discounts.', category: 'nepal', isNepal: true, isNew: true, keywords: ['malpok fee', 'registration tax', 'nepal real estate'] },
  { id: 'nepal-stocks', slug: 'nepal-stocks', name: 'NEPSE Trading Lab', icon: '📈', description: 'Calculate stock profits after commissions and CGT.', category: 'nepal', isNepal: true, isHot: true, keywords: ['nepse profit', 'broker commission', 'cgt nepal shares'] },
  { id: 'kukl-bill', slug: 'kukl-bill', name: 'KUKL Water Bill', icon: '💧', description: 'Analyze Kathmandu water bill slabs and sewerage tax.', category: 'nepal', isNepal: true, isNew: true, keywords: ['kukl rate', 'water bill kathmandu', 'sewerage tax'] },
  { id: 'foreign-employment', slug: 'foreign-employment', name: 'Foreign Emp. Safety', icon: '✈️', description: 'Check legal manpower fees for destination countries.', category: 'nepal', isNepal: true, isNew: true, keywords: ['manpower fee', 'free visa free ticket', 'dofe nepal'] },
  { id: 'nepal-home-loan', slug: 'nepal-home-loan', name: 'Home Loan (Nepal)', icon: '🏠', description: 'Home loan EMI for latest Nepal bank rates.', category: 'nepal', isNepal: true },
  { id: 'nepal-provident-fund', slug: 'nepal-provident-fund', name: 'Provident Fund', icon: '💰', description: 'EPF retirement logic for Nepal.', category: 'nepal', isNepal: true },
  { id: 'nepal-tax-calculator', slug: 'nepal-tax-calculator', name: 'Generic Tax Calc', icon: '📜', description: 'Generic Nepal tax rules and logic.', category: 'nepal', isNepal: true },
  { id: 'nepal-tds', slug: 'nepal-tds-calculator', name: 'Nepal TDS', icon: '💸', description: 'Calculate TDS for Nepal.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'nepse-bonus-tax', slug: 'nepse-bonus-tax', name: 'NEPSE Bonus Tax', icon: '📈', description: 'Tax on dividends and bonus shares.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'nepse-wacc', slug: 'nepse-wacc', name: 'NEPSE WACC & Tax', icon: '🛒', description: 'Average share cost for NEPSE selling.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'nepal-vehicle-tax', slug: 'nepal-vehicle-tax', name: 'Vehicle Tax Calc', icon: '🏍️', description: 'Annual road tax for motorbikes & cars.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'see-gpa', slug: 'see-gpa', name: 'SEE GPA', icon: '🎓', description: 'Nepal SEE GPA calculator.', category: 'nepal', isNepal: true, isNew: true },

  // ==========================================
  // FINANCE & BANKING PILLAR
  // ==========================================
  { id: 'loan-emi', slug: 'loan-emi', name: 'Loan EMI Pro', icon: '🏦', description: 'Professional EMI calculator.', category: 'finance', isHot: true },
  { id: 'sip-calculator', slug: 'sip-calculator', name: 'SIP Investment', icon: '📈', description: 'Project future wealth with SIPs.', category: 'finance', isHot: true },
  { id: 'compound-interest', slug: 'compound-interest', name: 'Compound Interest', icon: '➕', description: 'Advanced compounding calculator.', category: 'finance' },
  { id: 'lead-time', slug: 'lead-time', name: 'Lead Time Pro', icon: '🚚', description: 'Calculate delivery schemas.', category: 'finance', isNew: true },
  { id: 'mortgage-calculator', slug: 'mortgage-calculator', name: 'Mortgage Calculator', icon: '🏘️', description: 'Track home mortgage plans.', category: 'finance' },
  { id: 'currency-converter', slug: 'currency-converter', name: 'Currency Converter', icon: '💱', description: 'Live global FX rates.', category: 'finance' },
  { id: 'cagr-calculator', slug: 'cagr-calculator', name: 'CAGR Calculator', icon: '📊', description: 'Compound Annual Growth Rate.', category: 'finance' },
  { id: 'fd-calculator', slug: 'fd-calculator', name: 'Fixed Deposit (FD)', icon: '🔒', description: 'Bank fixed deposit returns.', category: 'finance' },
  { id: 'savings', slug: 'savings', name: 'Savings Goal', icon: '🎯', description: 'Calculate required savings rates.', category: 'finance' },
  { id: 'simple-interest', slug: 'simple-interest', name: 'Simple Interest', icon: '💸', description: 'Basic interest calculations.', category: 'finance' },

  // ==========================================
  // EDUCATION, MATH & ENGINEERING PILLAR
  // ==========================================
  { id: 'gpa', slug: 'gpa', name: 'GPA Calculator', icon: '🎓', description: 'Calculate semester GPA.', category: 'education', isHot: true },
  { id: 'cgpa', slug: 'cgpa', name: 'CGPA Cumulative', icon: '📚', description: 'Lifetime college grades.', category: 'education' },
  { id: 'engineering-gpa-calculator', slug: 'engineering-gpa-calculator', name: 'Engineering GPA', icon: '⚙️', description: 'Stem GPA calculator.', category: 'education' },
  { id: 'marks-needed', slug: 'marks-needed', name: 'Final Grade Target', icon: '📝', description: 'Find what you need on the final.', category: 'education' },
  { id: 'attendance', slug: 'attendance', name: 'Attendance Calc', icon: '✅', description: 'Track class attendance %.', category: 'education' },
  { id: 'area-calculator', slug: 'area-calculator', name: 'Area Calculator', icon: '📏', description: 'Calculate area for 2D shapes.', category: 'education', isNew: true },
  { id: 'decimal-to-fraction', slug: 'decimal-to-fraction', name: 'Decimal to Fraction', icon: '➗', description: 'Convert decimals precisely.', category: 'education', isNew: true },
  { id: 'simple-calculator', slug: 'simple-calculator', name: 'Basic Calculator', icon: '🔢', description: 'Fast arithmetic tool.', category: 'education', isNew: true },
  
  { id: 'scientific-calculator', slug: 'scientific-calculator', name: 'Scientific Engine', icon: '🧮', description: 'High-precision scientific engine.', category: 'education', isHot: true },
  { id: 'linear-solver', slug: 'linear-solver', name: 'Linear Equations', icon: '📐', description: 'Solve simultaneous linear equations.', category: 'education', isNew: true },
  { id: 'matrices', slug: 'matrices', name: 'Matrix Calculator', icon: '▦', description: 'Math matrices computations.', category: 'education' },
  { id: 'quadratic-solver', slug: 'quadratic-solver', name: 'Quadratic Solver', icon: '📈', description: 'Solve parabola equations.', category: 'education' },
  { id: 'geometry-3d', slug: 'geometry-3d', name: '3D Geometry', icon: '🧊', description: 'Calculate surface area & volume.', category: 'education' },
  { id: 'logarithm-calculator', slug: 'logarithm-calculator', name: 'Logarithm Calc', icon: '🪵', description: 'Log bases solver.', category: 'education' },

  { id: 'physics-force', slug: 'physics-force', name: 'Physics: Force/Mass', icon: '⚛️', description: 'Calculate Force (F=ma).', category: 'education', isNew: true },
  { id: 'physics-energy', slug: 'physics-energy', name: 'Kinetic & Potential', icon: '⚡', description: 'Physics energy equations.', category: 'education' },
  { id: 'chemistry-molar', slug: 'chemistry-molar', name: 'Molar Mass', icon: '🧪', description: 'Chemistry compound calculator.', category: 'education' },
  
  { id: 'standard-deviation', slug: 'standard-deviation', name: 'Standard Deviation', icon: '〽️', description: 'Stats dev. calculator.', category: 'education' },
  { id: 'statistics-plus', slug: 'statistics-plus', name: 'Statistics Engine', icon: '📉', description: 'Advanced statistics data.', category: 'education' },
  { id: 'z-score', slug: 'z-score', name: 'Z-Score Value', icon: '🔔', description: 'Normal distribution stats.', category: 'education' },
  { id: 'probability', slug: 'probability', name: 'Probability Calc', icon: '🎲', description: 'Dice and coin chances.', category: 'education' },
  { id: 'fraction-calculator', slug: 'fraction-calculator', name: 'Fraction Solver', icon: '➗', description: 'Add, div, multiply fractions.', category: 'education' },
  { id: 'lcm-gcf-calculator', slug: 'lcm-gcf-calculator', name: 'LCM & GCF', icon: '🔢', description: 'Common multiples.', category: 'education' },
  { id: 'percentage', slug: 'percentage', name: 'Percentage Calc', icon: '💯', description: 'Standard percents.', category: 'education',
    steps: [
      'Choose your calculation mode (e.g., Value of %, Percentage Change).',
      'Input the primary numbers in the labeled fields.',
      'Reference the live-updating result display.',
      'Use the Visual Scale bar to understand the relative mathematical weight of the result.'
    ]
  },
  { id: 'ratio-proportion', slug: 'ratio-proportion', name: 'Ratio Matrix', icon: '⚖️', description: 'Math ratio comparisons.', category: 'education' },
  { id: 'rounding', slug: 'rounding', name: 'Rounding / SigFigs', icon: '≈', description: 'Decimal places and sigfigs.', category: 'education' },
  { id: 'roman-numerals', slug: 'roman-numerals', name: 'Roman Numerals', icon: '🏛️', description: 'Classic numeral translation.', category: 'education' },
  { id: 'brick-calculator', slug: 'brick-calculator', name: 'Brick Counter', icon: '🧱', description: 'Construction estimates.', category: 'education' },
  { id: 'concrete-mix', slug: 'concrete-mix', name: 'Concrete Volume', icon: '🏗️', description: 'Mix proportions.', category: 'education' },

  // ==========================================
  // CONVERTERS & UTILITY PILLAR
  // ==========================================
  { id: 'unit-converter', slug: 'unit-converter', name: 'Universal Converter', icon: '🔄', description: 'Convert international metrics.', category: 'utility', isHot: true },
  { id: 'length-converter', slug: 'length-converter', name: 'Length & Distance', icon: '📏', description: 'Meters, km, miles, feet.', category: 'utility', isNew: true },
  { id: 'weight-converter', slug: 'weight-converter', name: 'Weight & Mass', icon: '⚖️', description: 'Grams, kg, lbs, oz.', category: 'utility', isNew: true },
  { id: 'base-converter', slug: 'base-converter', name: 'Base Converter', icon: '💻', description: 'Decimal, Bin, Hex, Octal.', category: 'utility', isNew: true },
  { id: 'date-duration', slug: 'date-duration', name: 'Date Duration', icon: '⌛', description: 'Days between dates.', category: 'utility' },
  { id: 'age-calculator', slug: 'age-calculator', name: 'Exact Age Time', icon: '🎂', description: 'Years, months, days lived.', category: 'utility' },
  { id: 'number-to-words', slug: 'number-to-words', name: 'Number Words', icon: '🔤', description: 'Print logic checks.', category: 'utility' },
  { id: 'qr-generator', slug: 'qr-generator', name: 'QR Code Generator', icon: '📱', description: 'Build instant QR Codes.', category: 'utility' },
  { id: 'password-generator', slug: 'password-generator', name: 'Password Gen', icon: '🔑', description: 'Secure passwords.', category: 'utility' },
  { id: 'word-counter', slug: 'word-counter', name: 'Word & Character', icon: '📝', description: 'Live typing metrics.', category: 'utility' },
  { id: 'tip-calculator', slug: 'tip-calculator', name: 'Tip & Split Bill', icon: '🍽️', description: 'Wait staff tip percentage.', category: 'utility' },
  { id: 'discount-calculator', slug: 'discount-calculator', name: 'Store Discount Calc', icon: '🛍️', description: 'Sale markup percentages.', category: 'utility' },
  { id: 'paint-cost', slug: 'paint-cost', name: 'Paint Cost', icon: '🎨', description: 'Estimate painting costs.', category: 'utility', isNew: true },
  { id: 'solar-requirement', slug: 'solar-requirement', name: 'Solar Calculator', icon: '☀️', description: 'Solar power needs.', category: 'utility', isNew: true },

  // ==========================================
  // HEALTH & FITNESS PILLAR
  // ==========================================
  { id: 'bmi', slug: 'bmi', name: 'BMI Checker', icon: '⚖️', description: 'Body Mass Index.', category: 'health',
    steps: [
      'Select your measurement system (Metric or Imperial).',
      'Input your current weight and height accurately.',
      'The engine calculates your BMI score using the standard WHO formula.',
      'Review your health category (Underweight, Normal, Overweight, Obese).',
      'Refer to the clinical guide below for personalized health insights.'
    ]
  },
  { id: 'bmr', slug: 'bmr', name: 'BMR Calories', icon: '🔥', description: 'Basal Metabolic Rate.', category: 'health' },
  { id: 'body-fat', slug: 'body-fat', name: 'Body Fat %', icon: '💪', description: 'Navy fitness standard.', category: 'health' },
  { id: 'calorie-calculator', slug: 'calorie-calculator', name: 'Calorie Tracker', icon: '🥗', description: 'Daily burn metrics.', category: 'health' },
  { id: 'momo-calorie-counter', slug: 'momo-calorie-counter', name: 'Momo Calories!', icon: '🥟', description: 'Nepal standard dumpling calc.', category: 'health' },
  { id: 'ideal-weight', slug: 'ideal-weight', name: 'Ideal Weight', icon: '🧍', description: 'Healthy weight charts.', category: 'health' },
  { id: 'water-intake', slug: 'water-intake', name: 'Water Hydration', icon: '💧', description: 'Daily fluid requirements.', category: 'health' },
  { id: 'pregnancy-due-date', slug: 'pregnancy-due-date', name: 'Pregnancy Due Date', icon: '👶', description: 'Maternity scheduling.', category: 'health' },
  { id: 'bmi-child', slug: 'bmi-child', name: 'BMI Child', icon: '🧒', description: 'BMI for kids/teens.', category: 'health', isNew: true },
  { id: 'sleep', slug: 'sleep', name: 'Sleep Cycle', icon: '😴', description: 'Optimize sleep time.', category: 'health', isNew: true }
];

export const CATEGORIES: Category[] = [
  { id: 'nepal', name: 'Nepal Specific', icon: '🇳🇵', calculators: CALCULATORS.filter(c => c.category === 'nepal') },
  { id: 'finance', name: 'Finance & Tax', icon: '💰', calculators: CALCULATORS.filter(c => c.category === 'finance') },
  { id: 'education', name: 'Math & Education', icon: '🎓', calculators: CALCULATORS.filter(c => c.category === 'education') },
  { id: 'utility', name: 'Converters & Utility', icon: '🔄', calculators: CALCULATORS.filter(c => c.category === 'utility') },
  { id: 'health', name: 'Health & Fitness', icon: '❤️', calculators: CALCULATORS.filter(c => c.category === 'health') }
];

export const FEATURED_NEPAL = CALCULATORS.filter(c => c.isNepal && (c.isHot || c.isNew));
