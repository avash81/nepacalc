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
  // Baseline rates for Ashwin 2080 / October 2023
  return [
    { label: "Savings Rate (Avg)", value: "6.5% - 8.2%", trend: 'stable' },
    { label: "Fixed Deposit (1yr)", value: "9.50%", trend: 'down' },
    { label: "Base Rate (Commercial)", value: "9.11%", trend: 'down' },
    { label: "Home Loan Premium", value: "2.0% - 4.5%", trend: 'stable' },
    { label: "USD to NPR", value: "133.45", trend: 'up' }
  ];
};
