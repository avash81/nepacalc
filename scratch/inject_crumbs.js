const fs = require('fs');
const path = require('path');

const calculators = [
  { slug: 'nepal-income-tax', name: 'Income Tax Calculator', category: 'nepal' },
  { slug: 'nepal-salary', name: 'Salary Calculator', category: 'nepal' },
  { slug: 'nepal-home-loan', name: 'Home Loan Calculator', category: 'nepal' },
  { slug: 'nea-bill', name: 'Electricity Bill Calculator', category: 'nepal' },
  { slug: 'nepal-land', name: 'Land Area Converter', category: 'nepal' },
  { slug: 'nepal-stocks', name: 'NEPSE Trading Calculator', category: 'nepal' },
  { slug: 'property-tax', name: 'Capital Gains Tax (CGT)', category: 'nepal' },
  { slug: 'property-registration', name: 'Property Registration Fee', category: 'nepal' },
  { slug: 'nepal-provident-fund', name: 'Provident Fund (EPF)', category: 'nepal' },
  { slug: 'nepal-tds-calculator', name: 'TDS Calculator', category: 'nepal' },
  { slug: 'nepal-vehicle-tax', name: 'Vehicle Tax Calculator', category: 'nepal' },
  { slug: 'nepse-wacc', name: 'WACC Calculator', category: 'nepal' },
  { slug: 'nepse-bonus-tax', name: 'Bonus Share Tax', category: 'nepal' },
  { slug: 'gratuity-calculator', name: 'Gratuity Calculator', category: 'nepal' },
  { slug: 'foreign-employment', name: 'Foreign Employment Fees', category: 'nepal' },
  { slug: 'kukl-bill', name: 'KUKL Water Bill', category: 'nepal' },
  { slug: 'nepal-attendance', name: 'University Attendance', category: 'nepal' },
  { slug: 'see-gpa', name: 'SEE GPA Calculator', category: 'nepal' },
  { slug: 'nepali-date', name: 'Nepali Date Converter', category: 'nepal' },
  { slug: 'nepal-vat', name: 'VAT Calculator', category: 'nepal' },
  { slug: 'loan-emi', name: 'Loan EMI Calculator', category: 'finance' },
  { slug: 'sip-calculator', name: 'SIP Calculator', category: 'finance' },
  { slug: 'mortgage-calculator', name: 'Mortgage Calculator', category: 'finance' },
  { slug: 'compound-interest', name: 'Compound Interest', category: 'finance' },
  { slug: 'fd-calculator', name: 'Fixed Deposit Calculator', category: 'finance' },
  { slug: 'savings', name: 'Savings Goal', category: 'finance' },
  { slug: 'cagr-calculator', name: 'CAGR Calculator', category: 'finance' },
  { slug: 'simple-interest', name: 'Simple Interest', category: 'finance' },
  { slug: 'lead-time', name: 'Lead Time Calculator', category: 'finance' },
  { slug: 'gpa', name: 'GPA Calculator', category: 'education' },
  { slug: 'cgpa', name: 'CGPA Calculator', category: 'education' },
  { slug: 'engineering-gpa-calculator', name: 'Engineering GPA', category: 'education' },
  { slug: 'marks-needed', name: 'Target Grade Calculator', category: 'education' },
  { slug: 'percentage', name: 'Percentage Calculator', category: 'education' },
  { slug: 'standard-deviation', name: 'Standard Deviation', category: 'education' },
  { slug: 'fraction-calculator', name: 'Fraction Calculator', category: 'education' },
  { slug: 'decimal-to-fraction', name: 'Decimal to Fraction', category: 'education' },
  { slug: 'probability', name: 'Probability Calculator', category: 'education' },
  { slug: 'statistics-plus', name: 'Statistics Calculator', category: 'education' },
  { slug: 'z-score', name: 'Z Score Calculator', category: 'education' },
  { slug: 'lcm-gcf-calculator', name: 'LCM GCF Calculator', category: 'education' },
  { slug: 'ratio-proportion', name: 'Ratio Calculator', category: 'education' },
  { slug: 'area-calculator', name: 'Area Calculator', category: 'education' },
  { slug: 'logarithm-calculator', name: 'Logarithm Calculator', category: 'education' },
  { slug: 'rounding', name: 'Rounding Utility', category: 'education' },
  { slug: 'simple-calculator', name: 'Basic Calculator', category: 'education' },
  { slug: 'attendance', name: 'Attendance Calculator', category: 'education' },
  { slug: 'roman-numerals', name: 'Roman Numerals', category: 'education' },
  { slug: 'scientific-calculator', name: 'Scientific Calculator', category: 'engineering' },
  { slug: 'linear-solver', name: 'Linear Equations Solver', category: 'engineering' },
  { slug: 'matrices', name: 'Matrix Calculator', category: 'engineering' },
  { slug: 'quadratic-solver', name: 'Quadratic Solver', category: 'engineering' },
  { slug: 'geometry-3d', name: '3D Geometry', category: 'engineering' },
  { slug: 'physics-force', name: 'Physics Force Calculator', category: 'engineering' },
  { slug: 'physics-energy', name: 'Energy Calculator', category: 'engineering' },
  { slug: 'chemistry-molar', name: 'Molar Mass Calculator', category: 'engineering' },
  { slug: 'concrete-mix', name: 'Concrete Mixer', category: 'engineering' },
  { slug: 'brick-calculator', name: 'Brick Calculator', category: 'engineering' },
  { slug: 'unit-converter', name: 'Universal Unit Converter', category: 'utility' },
  { slug: 'length-converter', name: 'Length Converter', category: 'utility' },
  { slug: 'weight-converter', name: 'Weight Converter', category: 'utility' },
  { slug: 'base-converter', name: 'Base Converter', category: 'utility' },
  { slug: 'date-duration', name: 'Date Calculator', category: 'utility' },
  { slug: 'age-calculator', name: 'Age Calculator', category: 'utility' },
  { slug: 'discount-calculator', name: 'Discount Calculator', category: 'utility' },
  { slug: 'tip-calculator', name: 'Tip Calculator', category: 'utility' },
  { slug: 'solar-requirement', name: 'Solar Calculator', category: 'utility' },
  { slug: 'paint-cost', name: 'Paint Calculator', category: 'utility' },
  { slug: 'word-counter', name: 'Word Counter', category: 'utility' },
  { slug: 'qr-generator', name: 'QR Code Generator', category: 'utility' },
  { slug: 'number-to-words', name: 'Number Formatter', category: 'utility' },
  { slug: 'password-generator', name: 'Password Generator', category: 'utility' },
  { slug: 'bmi', name: 'BMI Calculator', category: 'health' },
  { slug: 'bmr', name: 'BMR Calculator', category: 'health' },
  { slug: 'calorie-calculator', name: 'Calorie Calculator', category: 'health' },
  { slug: 'body-fat', name: 'Body Fat Calculator', category: 'health' },
  { slug: 'ideal-weight', name: 'Ideal Weight Calculator', category: 'health' },
  { slug: 'water-intake', name: 'Water Calculator', category: 'health' },
  { slug: 'pregnancy-due-date', name: 'Pregnancy Calculator', category: 'health' },
  { slug: 'bmi-child', name: 'Child BMI Calculator', category: 'health' },
  { slug: 'sleep', name: 'Sleep Calculator', category: 'health' },
  { slug: 'momo-calorie-counter', name: 'Momo Calorie Counter', category: 'health' }
];

const catMap = {
  'education': { label: 'Math Tools', href: '/math-tools/' },
  'engineering': { label: 'Engineering', href: '/engineering/' },
  'finance': { label: 'Finance', href: '/finance/' },
  'nepal': { label: 'Nepal Tools', href: '/nepal/' },
  'health': { label: 'Health', href: '/health/' },
  'utility': { label: 'Converters', href: '/converters/' },
  'market': { label: 'Market Rates', href: '/market-rates/' }
};

let modified = 0;

for (const calc of calculators) {
  let p = path.join(__dirname, '..', 'src', 'app', 'calculator', calc.slug, 'Calculator.tsx');
  if (!fs.existsSync(p)) {
    // try direct route? 
    // actually all except math-tools are in /calculator/ right now.
    continue;
  }
  
  let content = fs.readFileSync(p, 'utf-8');
  if (content.includes('<ModernCalcLayout') && !content.includes('crumbs={[')) {
    const cat = catMap[calc.category];
    if (!cat) continue;

    const crumbStr = `\n      crumbs={[{ label: '${cat.label}', href: '${cat.href}' }, { label: '${calc.name}' }]}`;
    content = content.replace(/<ModernCalcLayout/, `<ModernCalcLayout${crumbStr}`);
    fs.writeFileSync(p, content, 'utf-8');
    console.log(`Added crumbs to ${calc.slug}`);
    modified++;
  }
}

console.log(`Total modified: ${modified}`);
