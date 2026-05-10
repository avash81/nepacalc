import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Market Rates Nepal Gold Silver and Exchange Rate Today',
  description:
    'Real-time financial dashboard for Nepal: Live gold price per tola, silver chandi rates, and current USD/INR to NPR exchange rates. Official federation & NRB sync.',
  keywords: [
    'gold price nepal today', 'exchange rate nepal live', 'usd to npr live',
    'silver price nepal 2082', 'gold per tola today', 'remittance rates nepal',
    'nrb exchange rates live', 'fenegosida gold rates today', 'nepalc gold price'
  ],
  alternates: { canonical: 'https://NepaCalc.com/market-rates/' },
  openGraph: {
    title: 'Live Market Rates & Gold Price Nepal | NepaCalc',
    description: 'Track live gold, silver, and currency exchange rates in Nepal. Real-time data from official indices.',
    url: 'https://NepaCalc.com/market-rates',
  },
};

export default function MarketRatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

