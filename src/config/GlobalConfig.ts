/**
 * Global Configuration for Equaly
 * 
 * Centralized constants for the entire platform. 
 * Update these each year to ensure the site remains "evergreen".
 */

export const GLOBAL_CONFIG = {
  CURRENT_YEAR: 2026,
  CURRENT_FISCAL_YEAR: '2082/83',
  NEXT_FISCAL_YEAR: '2083/84',
  
  // SEO Defaults
  SITE_NAME: 'NepCalc',
  TAGLINE: 'Nepal’s #1 Precision Utility Suite',
  SITE_URL: 'https://nepcalc.com',
  
  // Premium Layout Tokens
  THEME_COLOR: '#083366',
  ACCENT_COLOR: '#4F46E5', // Indigo-600 for premium feel
  
  // Formatters
  CURRENCY: 'NPR',
  LOCALE: 'en-NP',
};

export const CATEGORY_PURPOSE_MAP: Record<string, string> = {
  'finance': 'Investment & Planning',
  'tax': 'Taxation & Compliance',
  'health': 'Wellness & Health Check',
  'education': 'Academic Scoring',
  'construction': 'Engineering & Civil',
  'utility': 'General Utility',
};
