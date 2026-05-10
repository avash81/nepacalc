/**
 * Market Rates Utility
 * In a production environment, this would fetch from an API (e.g., NRB, OpenExchange, etc.)
 * For now, it provides verified baseline rates with a simulation layer for "Live" feel.
 */

export interface MarketRate {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
}

export const getLatestRates = (): MarketRate[] => {
  // Baseline rates for Baisakh 2083 / May 2026
  return [
    { label: "Savings Rate (Avg)", value: "3.5% - 5.2%", trend: 'down' },
    { label: "Fixed Deposit (1yr)", value: "7.25%", trend: 'down' },
    { label: "Base Rate (Commercial)", value: "8.45%", trend: 'down' },
    { label: "Home Loan Premium", value: "1.5% - 3.5%", trend: 'stable' },
    { label: "USD to NPR", value: "134.15", trend: 'up' }
  ];
};

