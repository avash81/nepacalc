import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Market Rates Nepal: Gold, Silver, Forex & Remittance',
  description: "Explore Nepal's live financial rate tools: gold price, silver price, foreign exchange, and remittance rates — all updated daily from official sources.",
  keywords: [
    'market rates nepal', 'live nepal rates', 'nepal financial calculators',
    'gold silver forex nepal', 'remittance comparison nepal', 'nrb forex rate',
    'fenegosida rates'
  ],
  openGraph: {
    title: 'Live Market Rates Nepal | Gold, Silver, Forex & Remittance',
    description: "One place for all of Nepal's live financial rates — gold, silver, forex, and remittance — sourced from FENEGOSIDA and NRB.",
    url: 'https://nepacalc.com/market-rates/',
    siteName: 'NepaCalc',
    images: [{ url: `https://nepacalc.com/images/og/market-rates.png?date=${new Date().toISOString().split('T')[0]}` }],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Market Rates Nepal',
    description: 'Gold, silver, forex, and remittance rates in one place — updated daily.',
    images: [`https://nepacalc.com/images/og/market-rates.png?date=${new Date().toISOString().split('T')[0]}`]
  },
  alternates: {
    canonical: 'https://nepacalc.com/market-rates/'
  }
};

export default function MarketRatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

