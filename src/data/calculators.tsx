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
  // NEPAL SPECIFIC PILLAR (24)
  // ==========================================
  { id: 'nepal-income-tax', slug: 'nepal-income-tax', name: 'Income Tax Calculator', icon: '📝', description: 'Income tax calculator for Nepal updated for latest fiscal year.', category: 'nepal', isNepal: true, isHot: true },
  { id: 'nepal-salary', slug: 'nepal-salary', name: 'Salary Calculator', icon: '💵', description: 'Calculate net take home salary with IRD deductions.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'nepal-home-loan', slug: 'nepal-home-loan', name: 'Home Loan Calculator', icon: '🏠', description: 'Calculate home loan EMI with Nepal bank rates.', category: 'nepal', isNepal: true },
  { id: 'nea-bill', slug: 'nea-bill', name: 'Electricity Bill Calculator', icon: '⚡', description: 'Calculate Nepal Electricity Authority (NEA) progressive billing.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'nepal-land', slug: 'nepal-land', name: 'Land Area Converter', icon: '🏞️', description: 'Convert land area between Ropani, Bigha, and Square Feet.', category: 'nepal', isNepal: true, isHot: true },
  { id: 'nepal-stocks', slug: 'nepal-stocks', name: 'NEPSE Trading Calculator', icon: '📈', description: 'Calculate share trading profit after commission and tax.', category: 'nepal', isNepal: true, isHot: true },
  { id: 'property-tax', slug: 'property-tax', name: 'Capital Gains Tax (CGT)', icon: '🏛️', description: 'Calculate real estate capital gains tax for Nepal.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'property-registration', slug: 'property-registration', name: 'Property Registration Fee', icon: '📋', description: 'Calculate Malpok registration fees and stamp duty.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'nepal-provident-fund', slug: 'nepal-provident-fund', name: 'Provident Fund (EPF)', icon: '🏦', description: 'Retirement savings and interest for EPF Nepal.', category: 'nepal', isNepal: true },
  { id: 'nepal-tds', slug: 'nepal-tds', name: 'TDS Calculator', icon: '✂️', description: 'Calculate withholding tax for professional services.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'nepal-vehicle-tax', slug: 'nepal-vehicle-tax', name: 'Vehicle Tax Calculator', icon: '🚗', description: 'Calculate road tax for motorbikes and cars.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'nepse-wacc', slug: 'nepse-wacc', name: 'WACC Calculator', icon: '📊', description: 'Calculate Weighted Average Cost of Capital for NEPSE.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'nepse-bonus-tax', slug: 'nepse-bonus-tax', name: 'Bonus Share Tax', icon: '🎁', description: 'Calculate tax on dividend and bonus shares.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'gratuity-calculator', slug: 'gratuity-calculator', name: 'Gratuity Calculator', icon: '💼', description: 'Calculate retirement benefits under Labor Act 2074.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'foreign-employment', slug: 'foreign-employment', name: 'Foreign Employment Fees', icon: '✈️', description: 'Check legal manpower and visa fees for Nepal.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'kukl-bill', slug: 'kukl-bill', name: 'KUKL Water Bill', icon: '💧', description: 'Calculate Kathmandu water bill slabs and sewerage tax.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'nepal-attendance', slug: 'nepal-attendance', name: 'University Attendance', icon: '🎓', description: 'Track 75% exam eligibility for universities in Nepal.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'see-gpa', slug: 'see-gpa', name: 'SEE GPA Calculator', icon: '🅰️', description: 'Calculate SEE grade point average.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'nepali-date', slug: 'nepali-date', name: 'Nepali Date Converter', icon: '📅', description: 'Standard BS to AD date conversion utility.', category: 'nepal', isNepal: true },
  { id: 'nepal-vat', slug: 'nepal-vat', name: 'VAT Calculator', icon: '🔖', description: 'Calculate VAT (13%) addition and subtraction.', category: 'nepal', isNepal: true },


  // ==========================================
  // FINANCE & BANKING PILLAR (11)
  // ==========================================
  { id: 'loan-emi', slug: 'loan-emi', name: 'Loan EMI Calculator', icon: '💳', description: 'Standard EMI calculator for loans and mortgages.', category: 'finance', isHot: true },
  { id: 'sip-calculator', slug: 'sip-calculator', name: 'SIP Calculator', icon: '📈', description: 'Estimate future wealth from SIP investments.', category: 'finance', isHot: true },
  { id: 'mortgage-calculator', slug: 'mortgage-calculator', name: 'Mortgage Calculator', icon: '🏘️', description: 'Calculate home mortgage repayments.', category: 'finance' },
  { id: 'compound-interest', slug: 'compound-interest', name: 'Compound Interest', icon: '💹', description: 'Calculate interest on principal and accumulated interest.', category: 'finance' },
  { id: 'fd-calculator', slug: 'fd-calculator', name: 'Fixed Deposit Calculator', icon: '🏦', description: 'Calculate bank fixed deposit interest returns.', category: 'finance' },
  { id: 'savings', slug: 'savings', name: 'Savings Goal', icon: '💰', description: 'Determine required savings to reach a target amount.', category: 'finance' },
  { id: 'cagr-calculator', slug: 'cagr-calculator', name: 'CAGR Calculator', icon: '📊', description: 'Calculate Compound Annual Growth Rate.', category: 'finance' },
  { id: 'simple-interest', slug: 'simple-interest', name: 'Simple Interest', icon: '🧾', description: 'Calculate simple interest on principal.', category: 'finance' },
  { id: 'lead-time', slug: 'lead-time', name: 'Lead Time Calculator', icon: '⏳', description: 'Calculate lead and cycle times.', category: 'finance', isNew: true },


  // ==========================================
  // EDUCATION & MATH PILLAR (25)
  // ==========================================
  { id: 'gpa', slug: 'gpa', name: 'GPA Calculator', icon: '🎓', description: 'Calculate semester grade point average.', category: 'education', isHot: true },
  { id: 'cgpa', slug: 'cgpa', name: 'CGPA Calculator', icon: '📚', description: 'Calculate cumulative grade point average.', category: 'education' },
  { id: 'engineering-gpa', slug: 'engineering-gpa', name: 'Engineering GPA', icon: '📐', description: 'GPA calculator for engineering degree grading systems.', category: 'education' },
  { id: 'marks-needed', slug: 'marks-needed', name: 'Target Grade Calculator', icon: '🎯', description: 'Calculate required marks for final exams.', category: 'education' },
  { id: 'percentage', slug: 'percentage', name: 'Percentage Calculator', icon: '%', description: 'Calculate standard percentages and relative variance.', category: 'education' },
  { id: 'standard-deviation', slug: 'standard-deviation', name: 'Standard Deviation', icon: 'σ', description: 'Calculate statistical variance and standard deviation.', category: 'education' },
  { id: 'fraction-calculator', slug: 'fraction-calculator', name: 'Fraction Calculator', icon: '½', description: 'Arithmetic operations for mathematical fractions.', category: 'education' },
  { id: 'decimal-to-fraction', slug: 'decimal-to-fraction', name: 'Decimal to Fraction', icon: '➗', description: 'Convert decimals to scientific fractions.', category: 'education', isNew: true },
  { id: 'probability', slug: 'probability', name: 'Probability Calculator', icon: '🎲', description: 'Calculate theoretical and empirical probabilities.', category: 'education' },
  { id: 'statistics-plus', slug: 'statistics-plus', name: 'Statistics Calculator', icon: '📉', description: 'Advanced statistical data distribution analysis.', category: 'education' },
  { id: 'z-score', slug: 'z-score', name: 'Z Score Calculator', icon: 'Z', description: 'Calculate standardized z scores for normal distributions.', category: 'education' },
  { id: 'lcm-gcf-calculator', slug: 'lcm-gcf-calculator', name: 'LCM GCF Calculator', icon: '🔗', description: 'Find least common multiples and greatest common factors.', category: 'education' },
  { id: 'ratio-proportion', slug: 'ratio-proportion', name: 'Ratio Calculator', icon: '⚖️', description: 'Calculate and simplify mathematical ratios.', category: 'education' },
  { id: 'area-calculator', slug: 'area-calculator', name: 'Area Calculator', icon: '🔲', description: 'Calculate area for standard 2D geometric shapes.', category: 'education', isNew: true },
  { id: 'logarithm-calculator', slug: 'logarithm-calculator', name: 'Logarithm Calculator', icon: '📐', description: 'Compute logarithms for arbitrary base values.', category: 'education' },
  { id: 'rounding', slug: 'rounding', name: 'Rounding Utility', icon: '⭕', description: 'Round decimals or find significant figures.', category: 'education' },
  { id: 'simple-calculator', slug: 'simple-calculator', name: 'Basic Calculator', icon: '🧮', description: 'Standard arithmetic computation utility.', category: 'education', isNew: true },
  { id: 'attendance', slug: 'attendance', name: 'Attendance Calculator', icon: '✅', description: 'Track percentage of class attendance.', category: 'education' },
  { id: 'roman-numerals', slug: 'roman-numerals', name: 'Roman Numerals', icon: 'Ⅳ', description: 'Convert between Arabic numerals and Roman numeric strings.', category: 'education' },
  { id: 'calculus-lab', slug: 'math-tools/calculus', name: 'Calculus & Algebra Solver', icon: '∫', description: 'Solve derivatives, integrals, limits with symbolic logic.', category: 'education', isHot: true },
  { id: 'matrix-lab', slug: 'math-tools/matrix', name: 'Matrix Algebra Console', icon: '🔢', description: 'Advanced matrix operations and transformations.', category: 'education' },
  { id: 'statistics-lab', slug: 'math-tools/statistics', name: 'Statistics & Data Lab', icon: '📊', description: 'High-precision statistical distribution mapping.', category: 'education' },
  { id: 'programmer-calc', slug: 'math-tools/programmer', name: 'Programmer Calculator', icon: '💻', description: 'Bitwise operations and multi-base numeral logic.', category: 'education' },
  { id: 'full-scientific', slug: 'math-tools/scientific', name: 'Scientific Engine Fullscreen', icon: '🔬', description: 'Professional grade scientific calculator suite.', category: 'education' },
  { id: 'four-function', slug: 'math-tools/fourfunction', name: 'Classic 4-Function', icon: '➕', description: 'Simple arithmetic calculator with memory features.', category: 'education' },

  // ==========================================
  // ENGINEERING PILLAR (14)
  // ==========================================
  { id: 'scientific-calculator', slug: 'scientific-calculator', name: 'Scientific Calculator', icon: '🔬', description: 'Advanced computational tool for complex engineering math.', category: 'engineering', isHot: true },
  { id: 'linear-solver', slug: 'linear-solver', name: 'Linear Equations Solver', icon: '📏', description: 'Solve simultaneous linear equation systems.', category: 'engineering', isNew: true },
  { id: 'matrices', slug: 'matrices', name: 'Matrix Calculator', icon: '🔢', description: 'Matrix arithmetic and algebraic transformations.', category: 'engineering' },
  { id: 'quadratic-solver', slug: 'quadratic-solver', name: 'Quadratic Solver', icon: '📊', description: 'Solve second degree polynomial equations.', category: 'engineering' },
  { id: 'geometry-3d', slug: 'geometry-3d', name: '3D Geometry', icon: '🔺', description: 'Calculate surface area and volume of 3D objects.', category: 'engineering' },
  { id: 'physics-force', slug: 'physics-force', name: 'Physics Force Calculator', icon: '⚡', description: 'Calculate physical force (F=ma).', category: 'engineering', isNew: true },
  { id: 'physics-energy', slug: 'physics-energy', name: 'Energy Calculator', icon: '🔋', description: 'Calculate kinetic and potential energy values.', category: 'engineering' },
  { id: 'chemistry-molar', slug: 'chemistry-molar', name: 'Molar Mass Calculator', icon: '⚗️', description: 'Compute molar mass of molecular compounds.', category: 'engineering' },
  { id: 'concrete-mix', slug: 'concrete-mix', name: 'Concrete Mixer', icon: '🏗️', description: 'Calculate concrete volume and proportions.', category: 'engineering' },
  { id: 'brick-calculator', slug: 'brick-calculator', name: 'Brick Calculator', icon: '🧱', description: 'Estimate physical brick count for construction.', category: 'engineering' },
  { id: 'graphing-pro', slug: 'engineering/graphing', name: 'Interactive Graphing Calculator', icon: '📈', description: 'High-precision 2D function plotter with multi-expression support and real-time rendering.', category: 'engineering', isHot: true },
  { id: 'formulas-lab', slug: 'engineering/formulas', name: 'Mathematical Formula Library', icon: '📖', description: 'Comprehensive library of math and engineering formulas.', category: 'engineering' },
  { id: '3d-visualizer', slug: 'engineering/3d', name: '3D Surface Plotter', icon: '🧊', description: 'Advanced 3D surface plotter for z=f(x,y) functions with interactive Orbit Camera and Wireframe Mode.', category: 'engineering' },
  { id: 'geometry-lab', slug: 'engineering/geometry', name: 'Geometry Canvas Lab', icon: '📐', description: 'Interactive geometric construction and measurement tool.', category: 'engineering' },

  // ==========================================
  // CONVERTERS & UTILITY PILLAR (14)
  // ==========================================
  { id: 'unit-converter', slug: 'unit-converter', name: 'Universal Unit Converter', icon: '🔄', description: 'Convert between standard international measurement systems.', category: 'utility', isHot: true },
  { id: 'length-converter', slug: 'length-converter', name: 'Length Converter', icon: '📏', description: 'Convert dimensional units like meters, feet, and miles.', category: 'utility', isNew: true },
  { id: 'weight-converter', slug: 'weight-converter', name: 'Weight Converter', icon: '⚖️', description: 'Convert mass units including grams, kilograms, and pounds.', category: 'utility', isNew: true },
  { id: 'base-converter', slug: 'base-converter', name: 'Base Converter', icon: '🔟', description: 'Convert numeric strings between Decimal, Binary, Hex, and Octal.', category: 'utility', isNew: true },
  { id: 'date-duration', slug: 'date-duration', name: 'Date Calculator', icon: '📅', description: 'Calculate time delta in days between arbitrary dates.', category: 'utility' },
  { id: 'age-calculator', slug: 'age-calculator', name: 'Age Calculator', icon: '🎂', description: 'Calculate chronological age from birthdate constraints.', category: 'utility' },
  { id: 'discount-calculator', slug: 'discount-calculator', name: 'Discount Calculator', icon: '🏷️', description: 'Calculate retail discounting and pricing markups.', category: 'utility' },
  { id: 'tip-calculator', slug: 'tip-calculator', name: 'Tip Calculator', icon: '💵', description: 'Calculate percentage based gratuities and split billing.', category: 'utility' },
  { id: 'solar-requirement', slug: 'solar-requirement', name: 'Solar Calculator', icon: '☀️', description: 'Estimate photovoltaic capacity requirements.', category: 'utility', isNew: true },
  { id: 'paint-cost', slug: 'paint-cost', name: 'Paint Calculator', icon: '🎨', description: 'Estimate covering volume and cost parameters for painting.', category: 'utility', isNew: true },
  { id: 'word-counter', slug: 'word-counter', name: 'Word Counter', icon: '📝', description: 'Analyze textual volume including word and character density.', category: 'utility' },
  { id: 'qr-generator', slug: 'qr-generator', name: 'QR Code Generator', icon: '📱', description: 'Generate high-density machine readable QR matrices.', category: 'utility' },
  { id: 'number-to-words', slug: 'number-to-words', name: 'Number Formatter', icon: '🔤', description: 'Convert numerical integers into written linguistic formats.', category: 'utility' },
  { id: 'password-generator', slug: 'password-generator', name: 'Password Generator', icon: '🔑', description: 'Generate cryptographically secure randomized character strings.', category: 'utility' },

  // ==========================================
  // HEALTH & FITNESS PILLAR (10)
  // ==========================================
  { id: 'bmi', slug: 'bmi', name: 'BMI Calculator', icon: '⚖️', description: 'Calculate Body Mass Index (BMI) using WHO physiological standards.', category: 'health' },
  { id: 'bmr', slug: 'bmr', name: 'BMR Calculator', icon: '🔥', description: 'Calculate absolute Basal Metabolic Rate.', category: 'health' },
  { id: 'calorie-calculator', slug: 'calorie-calculator', name: 'Calorie Calculator', icon: '🍎', description: 'Calculate requisite caloric thresholds for homeostasis.', category: 'health' },
  { id: 'body-fat', slug: 'body-fat', name: 'Body Fat Calculator', icon: '💪', description: 'Estimate body fat composition metrics.', category: 'health' },
  { id: 'ideal-weight', slug: 'ideal-weight', name: 'Ideal Weight Calculator', icon: '🎯', description: 'Determine standard physiological target weights.', category: 'health' },
  { id: 'water-intake', slug: 'water-intake', name: 'Water Calculator', icon: '💧', description: 'Calculate biological daily hydration requirements.', category: 'health' },
  { id: 'pregnancy-due-date', slug: 'pregnancy-due-date', name: 'Pregnancy Calculator', icon: '👶', description: 'Project estimated gestational timelines.', category: 'health' },
  { id: 'bmi-child', slug: 'bmi-child', name: 'Child BMI Calculator', icon: '🧒', description: 'Calculate BMI percentiles for pediatric diagnostics.', category: 'health', isNew: true },
  { id: 'sleep', slug: 'sleep', name: 'Sleep Calculator', icon: '💤', description: 'Determine optimal REM cycle demarcations.', category: 'health', isNew: true },
  { id: 'momo-calorie-counter', slug: 'momo-calorie-counter', name: 'Momo Calorie Counter', icon: '🥟', description: 'Calculate nutritional composition of standard momo varieties.', category: 'health' },

  // ==========================================
  // MARKET RATES PILLAR (4)
  // ==========================================
  { id: 'gold-converter', slug: 'market-rates/live-gold-price', name: 'Live Gold Price', icon: '🏆', description: 'Real-time 24K and 22K gold rates in Nepal with Federation sync.', category: 'market', isNepal: true, isHot: true },
  { id: 'remittance-calculator', slug: 'market-rates/remittance', name: 'Remittance Board', icon: '💸', description: 'Compare real-time exchange rates for sending money to Nepal.', category: 'market', isNepal: true },
  { id: 'currency-converter', slug: 'market-rates/exchange-rate', name: 'Exchange Rates', icon: '💱', description: 'Live foreign exchange rates for 20+ currencies including USD and INR.', category: 'market', isNepal: true },
  { id: 'live-silver-price', slug: 'market-rates/live-silver-price', name: 'Live Silver Price', icon: '🥈', description: 'Real-time silver (Chandi) rates in Nepal. Synced with federation benchmarks.', category: 'market', isNepal: true },
];

export const CATEGORIES: Category[] = [
  { id: 'market', name: 'Market Rates', icon: '📊', calculators: CALCULATORS.filter(c => c.category === 'market') },
  { id: 'nepal', name: 'Nepal Specific', icon: '🇳🇵', calculators: CALCULATORS.filter(c => c.category === 'nepal') },
  { id: 'finance', name: 'Finance & Tax', icon: '🏦', calculators: CALCULATORS.filter(c => c.category === 'finance') },
  { id: 'education', name: 'Math & Education', icon: '🎓', calculators: CALCULATORS.filter(c => c.category === 'education') },
  { id: 'utility', name: 'Converters & Utility', icon: '🔄', calculators: CALCULATORS.filter(c => c.category === 'utility') },
  { id: 'health', name: 'Health & Fitness', icon: '❤️', calculators: CALCULATORS.filter(c => c.category === 'health') },
  { id: 'engineering', name: 'Engineering', icon: '🏗️', calculators: CALCULATORS.filter(c => c.category === 'engineering') }
];

export const FEATURED_NEPAL = CALCULATORS.filter(c => c.isNepal && (c.isHot || c.isNew));
