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
  SITE_NAME: 'NEPACALC',
  TAGLINE: 'Nepal’s Precision Mathematical Laboratory',
  SITE_URL: 'https://nepacalc.com',
  
  // Premium Layout Tokens (Google Material Precision)
  THEME_COLOR: '#FFFFFF',
  ACCENT_COLOR: '#1A73E8', // Google Blue
  SECONDARY_BG: '#F8F9FA', // Google Surface
  TEXT_MAIN: '#202124',    // Google Secondary Text
  TEXT_MUTED: '#5F6368',   // Google Muted Text
  
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
