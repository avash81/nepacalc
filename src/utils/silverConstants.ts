/**
 * Centralized Configuration for Precious Metal Calculators
 * Engine Version: v1.0.0
 * 
 * Single source of truth for:
 * 1. Unit conversion constants
 * 2. Purity factors
 * 3. Shared formatting rules
 * 4. Error messages
 */

// 1. Central Unit Constants
export const SILVER_UNITS: Record<string, number> = {
  // Base unit
  Gram: 1,
  
  // Metric
  Kilogram: 1000,
  Milligram: 0.001,
  
  // Nepalese units
  Tola: 11.6638038,
  Aana: 0.7289877,
  Lal: 0.116638038,
  Ratti: 0.1822469,
  
  // International Troy
  'Troy Ounce': 31.1034768,
  Ounce: 28.3495231,
  Pound: 453.59237,
};

// 2. Central Purity Configuration
export const SILVER_PURITY: Record<string, { factor: number; name: string; description: string }> = {
  '999': { factor: 1.0, name: '999 Fine Silver (99.9%)', description: 'Pure silver bullion bars & coins' },
  '995': { factor: 0.995, name: '995 High Purity (99.5%)', description: 'Standard commercial bullion' },
  '990': { factor: 0.990, name: '990 Commercial Fine (99.0%)', description: 'Traditional silver bars' },
  '950': { factor: 0.950, name: '950 High Grade (95.0%)', description: 'High-end artisan jewellery' },
  '925': { factor: 0.925, name: '925 Sterling Silver (92.5%)', description: 'High-grade jewellery & ornaments' },
  '900': { factor: 0.900, name: '900 Coin Silver (90.0%)', description: 'Traditional silver coins' },
  '835': { factor: 0.835, name: '835 European Standard (83.5%)', description: 'Utensils & vintage silver' },
  '800': { factor: 0.800, name: '800 Jewellery Silver (80.0%)', description: 'Heavy utensils & payals' },
};

// 3. Historical Rates (NPR per Tola)
export const HISTORICAL_RATES: Record<string, number> = {
  '2082 (Current)': 1900,
  '2081 (Last Year)': 1650,
  '2080 (2 Years Ago)': 1400,
  '2079 (3 Years Ago)': 1250,
  '2075 (7 Years Ago)': 750,
};

// 4. Shared Formatting Module
export const formatters = {
  formatCurrency: (value: number) => {
    return `Rs. ${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(value)}`;
  },
  
  formatWeight: (value: number, unit: string) => {
    let decimals = 4;
    switch (unit.toLowerCase()) {
      case 'kilogram': 
      case 'tola': 
      case 'troy ounce':
        decimals = 6; break;
      case 'lal':
        decimals = 2; break;
      case 'aana':
        decimals = 3; break;
      case 'gram':
      default:
        decimals = 4; break;
    }
    return `${new Intl.NumberFormat('en-IN', { maximumFractionDigits: decimals, minimumFractionDigits: 0 }).format(value)} ${unit}`;
  },
  
  formatPercentage: (value: number) => {
    return `${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(value)}%`;
  },
  
  formatRate: (value: number, perUnit: string = 'Tola') => {
    return `Rs. ${new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(value)} / ${perUnit}`;
  }
};

// 5. Shared Error Messages
export const ERRORS = {
  INVALID_WEIGHT: 'Please enter a valid positive weight.',
  INVALID_RATE: 'Market rate is unavailable or invalid.',
  INVALID_PURITY: 'Please select a valid purity.',
  NEGATIVE_VALUE: 'Values cannot be negative.',
  TOO_LARGE: 'Value exceeds maximum calculable limit.',
  CALCULATION_FAILED: 'Calculation failed. Please check inputs.',
};

// 6. Validation Helpers
export const validateInput = (val: number | string): { isValid: boolean; value: number } => {
  if (val === '' || val === null || val === undefined) return { isValid: true, value: 0 };
  const num = Number(val);
  if (isNaN(num) || !isFinite(num)) return { isValid: false, value: 0 };
  if (num < 0) return { isValid: false, value: 0 };
  if (num > 999999999) return { isValid: false, value: 0 }; // Max limit
  return { isValid: true, value: num };
};
