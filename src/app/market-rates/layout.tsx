import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Market Rates Nepal | Gold, Silver, Foreign Exchange | NepaCalc",
  description: "Live market rates for Gold, Silver, and Currency Exchange (Forex) in Nepal. Updated daily with official rates from NRB and FENEGOSIDA.",
  keywords: ["gold price nepal", "exchange rate nepal", "usd to npr", "silver price nepal", "market rates nepal today"],
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

