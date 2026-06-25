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
  { id: 'nepal-income-tax', slug: 'nepal-income-tax', name: 'Nepal Income Tax Calculator 2083/84', icon: '📝', description: 'Income tax calculator for Nepal updated for latest fiscal year 2083/84. Support for single/married and SSF slabs.', category: 'nepal', isNepal: true, isHot: true, keywords: ['Nepal Income Tax Calculator 2083', 'IRD tax slabs 2083/84', 'salary tax Nepal', 'tax on bonus Nepal', 'social security tax', 'married tax slabs nepal', 'tax on investment nepal'] },
  { id: 'nepal-salary', slug: 'nepal-salary', name: 'Nepal Salary Calculator 2083/84', icon: '💵', description: 'Calculate net take home salary with IRD deductions and SSF contributions for FY 2083/84.', category: 'nepal', isNepal: true, isNew: true, keywords: ['Salary Calculator Nepal', 'Net take home salary', 'IRD salary deductions', 'PF and CIT calculation', 'allowance tax', 'ssf nepal calculator', 'nepal payroll tool'] },
  { id: 'nepal-home-loan', slug: 'nepal-home-loan', name: 'Nepal Home Loan Calculator 2083/84', icon: '🏠', description: 'Calculate home loan EMI with latest Nepal bank base rates and premiums for 2083.', category: 'nepal', isNepal: true, keywords: ['Home Loan EMI Nepal', 'NRB base rate', 'floating interest rate Nepal', 'housing loan eligibility', 'bank premium', 'nrb base rate 2083'] },
  { id: 'auto-loan', slug: 'auto-loan', name: 'Nepal Auto Loan Calculator', icon: '🚗', description: 'Calculate car and bike EMI for fuel and electric vehicles with NRB 50/80 financing rules.', category: 'nepal', isNepal: true, isNew: true, keywords: ['auto loan nepal', 'car emi calculator nepal', 'ev financing nepal'] },
  { id: 'nea-bill', slug: 'nea-bill', name: 'Nepal Electricity Bill Calculator 2083/84', icon: '⚡', description: 'Calculate Nepal Electricity Authority (NEA) progressive billing and unit slabs for 2083.', category: 'nepal', isNepal: true, isNew: true, keywords: ['NEA Bill Calculator', 'Nepal Electricity Authority tariffs', 'electricity slabs', 'NEA unit rates', 'penalty calculation', 'nepal electricity bill check'] },
  { id: 'nepal-land', slug: 'nepal-land', name: 'Nepal Land Area Converter', icon: '🏞️', description: 'Convert land area between Ropani, Aana, Bigha, and Square Feet with precision.', category: 'nepal', isNepal: true, isHot: true, isNew: true, keywords: ['Nepal Land Converter', 'Ropani to Bigha', 'Aana to Sq Ft converter', 'Khetmuri calculation', 'Dhur to Paisa', 'ropani aana paisa daam to sq ft', 'bigha kattha dhur to ropani'] },
  { id: 'nepal-stocks', slug: 'nepal-stocks', name: 'NEPSE Trading Calculator', icon: '📈', description: 'Calculate share trading profit after SEBON commission, DP fees, and CGT.', category: 'nepal', isNepal: true, isHot: true, keywords: ['NEPSE Profit Calculator', 'SEBON commission rates', 'DP fee Nepal', 'CGT on shares', 'stock profit calculation', 'nepse buy sell calculator', 'meroshare cgt calculation'] },
  { id: 'property-tax', slug: 'property-tax', name: 'Capital Gains Tax (CGT)', icon: '🏛️', description: 'Calculate real estate capital gains tax for Nepal property sales.', category: 'nepal', isNepal: true, isNew: true, keywords: ['CGT Calculator Nepal', 'Property sale tax Nepal', 'capital gains tax IRD', 'real estate tax calculation', 'land sale tax nepal'] },
  { id: 'property-registration', slug: 'property-registration', name: 'Property Registration Fee', icon: '📋', description: 'Calculate Malpok registration fees, stamp duty, and wada sifarish costs.', category: 'nepal', isNepal: true, isNew: true, keywords: ['Malpot Registration Fee', 'Land registration cost Nepal', 'stamp duty rates', 'wada sifarish fee', 'malpot tax', 'land pass fee nepal'] },
  { id: 'nepal-provident-fund', slug: 'nepal-provident-fund', name: 'Provident Fund (EPF)', icon: '🏦', description: 'Retirement savings, interest, and loan eligibility for EPF Nepal.', category: 'nepal', isNepal: true, keywords: ['EPF Nepal Calculator', 'Karmachari Sanchaya Kosh interest', 'PF withdrawal rules', 'CIT vs EPF Nepal', 'sanchaya kosh loan calculator'] },
  { id: 'nepal-tds', slug: 'tds-calculator', name: 'TDS Calculator 2083/84', icon: '✂️', description: 'Calculate withholding tax for professional services and rent under IRD rules for FY 2083/84.', category: 'nepal', isNepal: true, isNew: true, keywords: ['TDS Rate Nepal', 'IRD withholding tax', '1.5% TDS professional', 'TDS on rent Nepal', 'TDS payment deadline', 'tds calculator nepal'] },
  { id: 'nepal-vehicle-tax', slug: 'nepal-vehicle-tax', name: 'Vehicle Tax Calculator', icon: '🚗', description: 'Calculate road tax and bluebook renewal fees for motorbikes and cars in Nepal.', category: 'nepal', isNepal: true, isNew: true, keywords: ['Vehicle Tax Nepal', 'Road tax motorbikes', 'car renewal fee Nepal', 'DoTM tax slabs', 'bluebook renewal', 'bike tax nepal 2083'] },
  { id: 'nepse-wacc', slug: 'nepse-wacc', name: 'WACC Calculator', icon: '📊', description: 'Calculate Weighted Average Cost of Capital for NEPSE share holdings.', category: 'nepal', isNepal: true, isNew: true, keywords: ['NEPSE WACC Calculator', 'weighted average cost of capital nepal', 'meroshare wacc calculation'] },
  { id: 'nepse-bonus-tax', slug: 'nepse-bonus-tax', name: 'Bonus Share Tax', icon: '🎁', description: 'Calculate tax on dividend and bonus shares for Nepalese stock market.', category: 'nepal', isNepal: true, isNew: true, keywords: ['Bonus Share Tax Nepal', 'dividend tax nepal', 'share bonus calculation'] },
  { id: 'gratuity-calculator', slug: 'gratuity-calculator', name: 'Gratuity Calculator', icon: '💼', description: 'Calculate retirement gratuity benefits under Labor Act 2074 of Nepal.', category: 'nepal', isNepal: true, isNew: true, keywords: ['Gratuity Calculator Nepal', 'labor act 2074 gratuity', 'retirement benefits nepal'] },
  { id: 'foreign-employment', slug: 'foreign-employment', name: 'Foreign Employment Fees', icon: '✈️', description: 'Check legal manpower fees, insurance, and visa costs for Nepal migrant workers.', category: 'nepal', isNepal: true, isNew: true, keywords: ['Foreign Employment Fees Nepal', 'manpower service charge', 'baideshik rojgar insurance'] },
  { id: 'kukl-bill', slug: 'kukl-bill', name: 'KUKL Water Bill', icon: '💧', description: 'Calculate Kathmandu Upatyaka Khanepani Limited (KUKL) bill and sewerage tax.', category: 'nepal', isNepal: true, isNew: true, keywords: ['KUKL Bill Calculator', 'Kathmandu water bill', 'water meter reading nepal'] },
  { id: 'nepal-attendance', slug: 'nepal-attendance', name: 'University Attendance', icon: '🎓', description: 'Track 75% exam eligibility for TU, KU, and PU universities in Nepal.', category: 'nepal', isNepal: true, isNew: true, keywords: ['University Attendance Nepal', 'TU 75 percent attendance', 'exam eligibility calculator'] },
  { id: 'see-gpa', slug: 'see-gpa', name: 'SEE GPA Calculator', icon: '🅰️', description: 'Calculate SEE grade with all subject marks. Updated for 2083/2084 results and grading system.', category: 'nepal', isNepal: true, isNew: true, keywords: ['SEE Result 2083', 'SEE Result 2084', 'NEB grading system', 'SEE marks to GPA', 'GPA to percentage Nepal', 'see.ntc.net.np results', 'letter grading system nepal'] },
  { id: 'nepali-date', slug: 'nepali-date', name: 'Nepali Date Converter', icon: '📅', description: 'Standard BS to AD and AD to BS date conversion utility for Nepal.', category: 'nepal', isNepal: true, keywords: ['Nepali Date Converter', 'BS to AD converter', 'nepali calendar 2083'] },
  { id: 'nepal-vat', slug: 'nepal-vat', name: 'Nepal VAT Calculator', icon: '🔖', description: 'Calculate VAT (13%) addition and subtraction for Nepal trade.', category: 'nepal', isNepal: true, keywords: ['VAT Calculator Nepal', '13 percent vat calculation', 'vat bill nepal'] },
  { id: 'gold-tax', slug: 'gold-tax', name: 'Gold Tax Calculator Nepal', icon: '💍', description: 'Calculate final gold price including 13% VAT and making charges in Nepal.', category: 'nepal', isNepal: true, isNew: true, keywords: ['gold tax calculator nepal', 'gold vat calculator nepal', 'jewellery tax nepal'] },
  { id: 'nepal-loan-eligibility', slug: 'nepal-loan-eligibility', name: 'Nepal Loan Eligibility', icon: '🏦', description: 'Check your bank loan eligibility based on income and NRB FOIR rules.', category: 'nepal', isNepal: true, isNew: true, keywords: ['loan eligibility calculator nepal', 'bank loan limit nepal'] },
  { id: 'nepal-citizenship-age', slug: 'nepal-citizenship-age', name: 'Citizenship Age Calculator', icon: '🇳🇵', description: 'Check if you are eligible for Nepal Citizenship (16 years) based on DOB.', category: 'nepal', isNepal: true, isNew: true },
  { id: 'lok-sewa-age', slug: 'lok-sewa-age', name: 'Lok Sewa Age Calculator', icon: '🧑‍💼', description: 'Calculate exact age and check Public Service Commission (PSC) eligibility limits.', category: 'nepal', isNepal: true, isNew: true, isHot: true, keywords: ['Lok Sewa Age Limit', 'PSC Nepal age calculator', 'kharidar eligibility', 'adhikari age limit', 'PSC exam dates', 'lok sewa tayari nepal'] },


  // ==========================================
  // FINANCE & BANKING PILLAR (11)
  // ==========================================
  { id: 'loan-emi', slug: 'loan-emi', name: 'General Loan EMI Calculator', icon: '💳', description: 'Standard global EMI calculator for personal and business loans.', category: 'finance', isHot: true },
  { id: 'sip-calculator', slug: 'sip-calculator', name: 'SIP Calculator', icon: '📈', description: 'Estimate future wealth from SIP investments.', category: 'finance', isHot: true, keywords: ['SIP Returns Calculator', 'Mutual fund SIP', 'compound growth', 'future value investment', 'systematic investment plan'] },
  { id: 'mortgage-calculator', slug: 'mortgage-calculator', name: 'General Mortgage Calculator', icon: '🏘️', description: 'Global mortgage repayment calculator for international properties.', category: 'finance' },
  { id: 'compound-interest', slug: 'compound-interest', name: 'Compound Interest', icon: '💹', description: 'Calculate interest on principal and accumulated interest.', category: 'finance' },
  { id: 'fd-calculator', slug: 'fd-calculator', name: 'Fixed Deposit Calculator', icon: '🏦', description: 'Calculate bank fixed deposit interest returns.', category: 'finance' },
  { id: 'savings', slug: 'savings', name: 'Savings Goal', icon: '💰', description: 'Determine required savings to reach a target amount.', category: 'finance' },
  { id: 'cagr-calculator', slug: 'cagr-calculator', name: 'CAGR Calculator', icon: '📊', description: 'Calculate Compound Annual Growth Rate.', category: 'finance' },
  { id: 'simple-interest', slug: 'simple-interest', name: 'Simple Interest', icon: '🧾', description: 'Calculate simple interest on principal.', category: 'finance' },
  { id: 'lead-time', slug: 'lead-time', name: 'Lead Time Calculator', icon: '⏳', description: 'Calculate lead and cycle times.', category: 'finance', isNew: true },


  // ==========================================
  // EDUCATION & MATH PILLAR (25)
  // ==========================================
  { id: 'gpa', slug: 'gpa', name: 'GPA Calculator', icon: '🎓', description: 'Calculate semester grade point average.', category: 'education', isHot: true, keywords: ['Semester GPA Calculator', 'Grade point average', 'credit hours', 'grade weightage', 'college GPA tracker'] },
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
  { id: 'unit-converter', slug: 'unit-converter', name: 'Universal Unit Converter', icon: '🔄', description: 'Convert between standard international measurement systems.', category: 'utility', isHot: true, keywords: ['Universal Unit Converter', 'Metric to imperial', 'conversion table', 'scientific units', 'SI units'] },
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
  { id: 'bmi', slug: 'bmi', name: 'BMI Calculator', icon: '⚖️', description: 'Calculate Body Mass Index (BMI) using WHO physiological standards.', category: 'health', keywords: ['BMI Index Calculator', 'Body mass index WHO', 'healthy weight range', 'BMI for adults'] },
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
  { id: 'gold-converter', slug: 'market-rates/live-gold-price', name: 'Live Gold Price', icon: '🏆', description: 'Real-time 24K and 22K gold rates in Nepal with Federation sync.', category: 'market', isNepal: true, isHot: true, keywords: ['Live Gold Price Nepal', 'Federation of Nepal Gold & Silver', '24k gold rate', 'Tola to Gram gold', 'Chandi price'] },
  { id: 'remittance-calculator', slug: 'market-rates/remittance', name: 'Remittance Board', icon: '💸', description: 'Compare real-time exchange rates for sending money to Nepal.', category: 'market', isNepal: true },
  { id: 'currency-converter', slug: 'market-rates/exchange-rate-nepal', name: 'Exchange Rates', icon: '💱', description: 'Live foreign exchange rates for 20+ currencies including USD and INR.', category: 'market', isNepal: true },
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

