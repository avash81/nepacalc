import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: "Nepal Gold Silver Rate Today | Live Market Rates | NepaCalc",
  description: "Live gold price per tola in Nepal — 24K Tejabi and 22K standard. Plus silver chandi rate and USD/INR to NPR exchange rate. Updated daily from FENEGOSIDA.",
  slug: 'market-rates',
  keywords: ["nepal gold rate today", "silver price nepal", "exchange rate npr", "live market rates nepal"],
});

export default function MarketRatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

