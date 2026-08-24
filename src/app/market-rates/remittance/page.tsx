import Calculator from '../../calculator/remittance-calculator/Calculator';
import { Metadata } from 'next';
import RemittanceDashboardClient from './RemittanceDashboardClient';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';

import fs from 'fs';
import path from 'path';

export const revalidate = 3600; // 1 hour

function getLiveDate() {
  try {
    const data = fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'live-rates.json'), 'utf8');
    const json = JSON.parse(data);
    return json.date || new Date().toISOString().split('T')[0];
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
}

function getForexRates() {
  try {
    const data = fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'forex-rates.json'), 'utf8');
    const json = JSON.parse(data);
    return json.rates;
  } catch (e) {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const rawDate = getLiveDate();
  return {
    title: 'Live Remittance Board Nepal 2083/84 | Compare IME, Prabhu Rates',
    description: 'Compare live remittance rates to Nepal from USA, Australia, and Gulf for FY 2083/84. Track IME, Prabhu Money, and Western Union NPR conversions.',
    keywords: ['remittance rates nepal 2083', 'send money to nepal live', 'ime rate today npr', 'remittance board nepal 2084'],
    alternates: {
      canonical: 'https://nepacalc.com/market-rates/remittance/',
    },
    openGraph: {
      title: 'Remittance Board Nepal 2083/84 | NepaCalc',
      description: 'Track and compare remittance rates for Nepal in FY 2083/84. Real-time transparency for NRVs.',
      type: 'article',
      modifiedTime: new Date(rawDate).toISOString(),
    },
  };
}

export default async function Page() {
  const rawDate = getLiveDate();
  const forexRates = getForexRates();
  const initialRates = forexRates || { NPR: 134.0, EUR: 0.92, GBP: 0.79, AUD: 1.53, CAD: 1.36, JPY: 151, INR: 83.75, AED: 3.67, QAR: 3.64, SAR: 3.75 };
  
  return (
    <div className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "dateModified": new Date(rawDate).toISOString() }) }} />
      <CalcWrapper
        title="Live Remittance Board 2083/84"
        description="Daily remittance indices synchronized with official provider exchange rates for the Nepalese market."
        crumbs={[{ label: 'Directory', href: '/directory/' }, { label: 'Remittance Board' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Exchange Rates', slug: '/market-rates/exchange-rate-nepal/' },
          { name: 'Live Gold Price', slug: '/market-rates/live-gold-price/' },
          { name: 'Income Tax', slug: '/calculator/nepal-income-tax/' }
        ]}
      >
        <RemittanceDashboardClient initialRates={initialRates} />
        <div className="max-w-3xl mx-auto px-4 py-6">
          <p className="text-[13px] text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed mb-4">
            Remittance inflows significantly influence Nepal&apos;s foreign currency reserves, which in turn affect precious metal import quotas. Track the daily benchmark via the <a href="/market-rates/live-gold-price/" className="text-blue-700 font-bold underline hover:text-blue-900">current gold rate</a>.
          </p>
          <p className="text-[13px] text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            For silver investors and traders, the official Chandi rate is updated daily on our <a href="/market-rates/silver-price-nepal/" className="text-blue-700 font-bold underline hover:text-blue-900">Live Silver Price</a> page.
          </p>
        </div>
      </CalcWrapper>
    </div>
  );
}

