import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

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

export async function generateMetadata() {
  const rawDate = getLiveDate();
  return calcMeta({
    title: "Currency Exchange Rate Calculator Nepal | USD to NPR NepaCalc",
    description: "Live foreign exchange rates for Nepal. Convert USD, EUR, INR, GBP, AUD, and more to Nepalese Rupees (NPR). Pegged to NRB rates.",
    slug: 'currency-converter',
    keywords: ["currency converter nepal", "usd to npr", "inr to npr", "aud to npr", "foreign exchange rate nepal", "nrb exchange rate today", "money converter nepal"],
  });
}

export default async function Page() {
  const rawDate = getLiveDate();
  return (
    <div className="bg-[#F1F3F4]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "dateModified": new Date(rawDate).toISOString() }) }} />
      <Calculator />
      <div className="max-w-3xl mx-auto px-4 py-6">
        <p className="text-[13px] text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed mb-4">
          If you are sending money to Nepal, compare today&apos;s live exchange rates across providers on the <a href="/market-rates/remittance/" className="text-blue-700 font-bold underline hover:text-blue-900">Remittance Board</a>.
        </p>
        <p className="text-[13px] text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed mb-8">
          For the official NRB buying and selling rates, view the full <a href="/market-rates/exchange-rate-nepal/" className="text-blue-700 font-bold underline hover:text-blue-900">Exchange Rate Nepal</a> dashboard.
        </p>
        
        
      </div>
    </div>
  );
}

