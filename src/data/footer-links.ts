export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterLinkGroup {
  heading: string;
  links: FooterLink[];
}

export const FOOTER_CATEGORIES: Record<string, FooterLinkGroup> = {
  nepal: {
    heading: 'Popular Nepal Calculators',
    links: [
      { name: 'Nepal Income Tax Calculator', href: '/calculator/nepal-income-tax/' },
      { name: 'Salary Calculator Nepal', href: '/calculator/nepal-salary/' },
      { name: 'NEA Bill Calculator', href: '/calculator/nea-bill/' },
      { name: 'KUKL Water Bill Calculator', href: '/calculator/kukl-bill/' },
      { name: 'Vehicle Tax Calculator', href: '/calculator/nepal-vehicle-tax/' },
      { name: 'Blue Book Renewal Calculator', href: '/calculator/nepal-vehicle-tax/' },
      { name: 'Land Area Converter', href: '/calculator/nepal-land/' },
      { name: 'Gold Tax Calculator', href: '/calculator/gold-tax/' },
    ],
  },
  finance: {
    heading: 'Finance & Investment',
    links: [
      { name: 'SIP Calculator', href: '/calculator/sip-calculator/' },
      { name: 'EMI Calculator', href: '/calculator/loan-emi/' },
      { name: 'Home Loan Calculator', href: '/calculator/nepal-home-loan/' },
      { name: 'Fixed Deposit Calculator', href: '/calculator/fd-calculator/' },
      { name: 'Compound Interest Calculator', href: '/calculator/compound-interest/' },
      { name: 'Simple Interest Calculator', href: '/calculator/simple-interest/' },
      { name: 'Exchange Rate Nepal', href: '/market-rates/exchange-rate-nepal/' },
      { name: 'Currency Converter', href: '/calculator/currency-converter/' },
    ],
  },
  gold: {
    heading: 'Gold & Precious Metals',
    links: [
      { name: 'Live Gold Price', href: '/market-rates/live-gold-price/' },
      { name: 'Live Silver Price', href: '/market-rates/live-silver-price/' },
      { name: 'Gold Calculator', href: '/calculator/gold-converter/' },
      { name: 'Silver Converter', href: '/calculator/silver-converter/' },
      { name: 'Gold Converter', href: '/calculator/gold-converter/' },
      { name: 'Gold Tax Calculator', href: '/calculator/gold-tax/' },
      { name: 'Exchange Rate Nepal', href: '/market-rates/exchange-rate-nepal/' },
      { name: 'Currency Converter', href: '/calculator/currency-converter/' },
    ],
  },
  silver: {
    heading: 'Silver Tools & Market Rates',
    links: [
      { name: 'Live Silver Price', href: '/market-rates/live-silver-price/' },
      { name: 'Silver Converter', href: '/calculator/silver-converter/' },
      { name: 'Live Gold Price', href: '/market-rates/live-gold-price/' },
      { name: 'Gold Converter', href: '/calculator/gold-converter/' },
      { name: 'Exchange Rate Nepal', href: '/market-rates/exchange-rate-nepal/' },
      { name: 'Currency Converter', href: '/calculator/currency-converter/' },
      { name: 'Gold Tax Calculator', href: '/calculator/gold-tax/' },
      { name: 'NEPSE Trading Calculator', href: '/calculator/nepal-stocks/' },
    ],
  },
  market: {
    heading: 'Market Rates & Tools',
    links: [
      { name: 'Live Gold Price', href: '/market-rates/live-gold-price/' },
      { name: 'Live Silver Price', href: '/market-rates/live-silver-price/' },
      { name: 'Exchange Rate Nepal', href: '/market-rates/exchange-rate-nepal/' },
      { name: 'Currency Converter', href: '/calculator/currency-converter/' },
      { name: 'Gold Tax Calculator', href: '/calculator/gold-tax/' },
      { name: 'NEPSE Trading Calculator', href: '/calculator/nepal-stocks/' },
      { name: 'Remittance Calculator', href: '/market-rates/remittance/' },
      { name: 'SIP Calculator', href: '/calculator/sip-calculator/' },
    ],
  },
  health: {
    heading: 'Health & Fitness',
    links: [
      { name: 'BMI Calculator', href: '/calculator/bmi/' },
      { name: 'BMR Calculator', href: '/calculator/bmr/' },
      { name: 'Body Fat Calculator', href: '/calculator/body-fat/' },
      { name: 'Ideal Weight Calculator', href: '/calculator/ideal-weight/' },
      { name: 'Calorie Calculator', href: '/calculator/calorie/' },
      { name: 'Pregnancy Calculator', href: '/calculator/pregnancy/' },
      { name: 'Water Intake Calculator', href: '/calculator/water-intake/' },
      { name: 'Heart Rate Calculator', href: '/calculator/heart-rate/' },
    ],
  },
  education: {
    heading: 'Academic Calculators',
    links: [
      { name: 'GPA Calculator', href: '/calculator/gpa/' },
      { name: 'CGPA Calculator', href: '/calculator/cgpa/' },
      { name: 'Percentage Calculator', href: '/calculator/percentage/' },
      { name: 'Scientific Calculator', href: '/calculator/scientific-calculator/' },
      { name: 'Standard Deviation', href: '/calculator/standard-deviation/' },
      { name: 'Matrix Calculator', href: '/calculator/matrix/' },
      { name: 'Fraction Calculator', href: '/calculator/fraction/' },
      { name: 'Target Grade Calculator', href: '/calculator/marks-needed/' },
    ],
  },
  engineering: {
    heading: 'Engineering & Mathematics',
    links: [
      { name: 'Scientific Calculator', href: '/calculator/scientific-calculator/' },
      { name: 'Matrix Calculator', href: '/calculator/matrix/' },
      { name: 'Percentage Calculator', href: '/calculator/percentage/' },
      { name: 'Standard Deviation', href: '/calculator/standard-deviation/' },
      { name: 'Unit Converter', href: '/calculator/unit-converter/' },
      { name: 'Engineering GPA', href: '/calculator/engineering-gpa/' },
      { name: 'Fraction Calculator', href: '/calculator/fraction/' },
      { name: 'Decimal Converter', href: '/calculator/base-converter/' },
    ],
  },
  default: {
    heading: 'Popular Calculators',
    links: [
      { name: 'Nepal Income Tax Calculator', href: '/calculator/nepal-income-tax/' },
      { name: 'SIP Calculator', href: '/calculator/sip-calculator/' },
      { name: 'BMI Calculator', href: '/calculator/bmi/' },
      { name: 'GPA Calculator', href: '/calculator/gpa/' },
      { name: 'EMI Calculator', href: '/calculator/loan-emi/' },
      { name: 'Live Gold Price', href: '/market-rates/live-gold-price/' },
      { name: 'Exchange Rate Nepal', href: '/market-rates/exchange-rate-nepal/' },
      { name: 'Land Area Converter', href: '/calculator/nepal-land/' },
    ],
  },
};

/** Maps URL path patterns to a footer category key */
export function getFooterCategory(pathname: string): string {
  if (pathname.includes('live-silver-price') || pathname.includes('silver')) return 'silver';
  if (pathname.includes('live-gold-price') || pathname.includes('gold')) return 'gold';
  if (pathname.includes('market-rates') || pathname.includes('exchange-rate') || pathname.includes('remittance') || pathname.includes('currency')) return 'market';
  if (pathname.includes('/health/') || pathname.match(/\/(bmi|bmr|body-fat|ideal-weight|calorie|pregnancy|water-intake|heart-rate)\//)) return 'health';
  if (pathname.includes('/engineering/') || pathname.match(/\/(matrix|scientific-calculator|unit-converter|base-converter|engineering-gpa)\//)) return 'engineering';
  if (pathname.includes('/finance/') || pathname.match(/\/(sip-calculator|loan-emi|compound-interest|fd-calculator|simple-interest|savings|cagr|mortgage)\//)) return 'finance';
  if (pathname.includes('/education/') || pathname.match(/\/(gpa|cgpa|percentage|standard-deviation|fraction|marks-needed)\//)) return 'education';
  if (pathname.includes('/nepal/') || pathname.includes('/income-tax/') || pathname.match(/\/(nepal-income-tax|nepal-salary|nea-bill|kukl-bill|nepal-vehicle-tax|nepal-land|gold-tax|nepal-home-loan|nepal-stocks|property-tax|nepal-tds|nepal-provident-fund|gratuity|lok-sewa|nepali-date|nepal-vat|nepal-loan|nepal-citizenship|nepal-attendance|see-gpa|auto-loan)\//)) return 'nepal';
  return 'default';
}
