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
    if (json.nrb_rates && Array.isArray(json.nrb_rates)) return json;
    if (json.rates) return { nrb_rates: [], cross_rates: json.rates, nrb_date: json.date };
    return null;
  } catch (e) {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const rawDate = getLiveDate();
  return {
    title: 'Remittance Rates Nepal 2026 | AED, QAR, SAR, MYR, KRW to NPR | NRB Official',
    description: 'Official Nepal Rastra Bank (NRB) remittance rates for Nepal. Check today\'s exchange rates from UAE (AED), Qatar (QAR), Saudi Arabia (SAR), Kuwait (KWD), Malaysia (MYR), Korea (KRW), USA, UK, and Australia to NPR.',
    keywords: [
      'remittance rates Nepal',
      'AED to NPR today',
      'QAR to NPR rate',
      'SAR to NPR',
      'KWD to NPR',
      'MYR to NPR',
      'KRW to NPR',
      'UAE to Nepal remittance',
      'Qatar to Nepal remittance',
      'Saudi Arabia Nepal exchange rate',
      'Malaysia Nepal money transfer',
      'Korea Nepal remittance',
      'NRB remittance rate today',
      'send money to Nepal',
    ],
    alternates: {
      canonical: 'https://nepacalc.com/market-rates/remittance/',
    },
    openGraph: {
      title: 'Nepal Remittance Rates 2026 — AED, QAR, SAR, MYR, KRW to NPR | NepaCalc',
      description: 'Official NRB buying and selling rates for Nepal\'s top remittance corridors — UAE, Qatar, Saudi Arabia, Kuwait, Malaysia, Korea, USA, UK, Australia.',
      type: 'article',
      modifiedTime: new Date(rawDate).toISOString(),
    },
  };
}

export default async function Page() {
  const rawDate = getLiveDate();
  const forexData = getForexRates();
  const initialRates = forexData ?? {
    nrb_date: rawDate,
    nrb_rates: [],
    cross_rates: {},
  };

  // Build server-side NRB rate lookup for static content
  const nrbArr: any[] = initialRates.nrb_rates ?? [];
  const nrbMap: Record<string, { buy: number | null; sell: number | null; unit: number }> = {};
  nrbArr.forEach((r: any) => {
    if (r.iso3) nrbMap[r.iso3] = { buy: r.buy, sell: r.sell, unit: r.unit };
  });
  const fmt = (v: number | null) => v != null && v > 0 ? v.toFixed(2) : '—';
  const fmtPer1 = (iso3: string) => {
    const r = nrbMap[iso3];
    if (!r) return '—';
    const per1 = r.buy != null ? r.buy / r.unit : null;
    return per1 != null ? per1.toFixed(4) : '—';
  };

  const nrbDateDisplay = rawDate
    ? new Date(rawDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const corridors = [
    { iso3: 'AED', country: 'UAE',         flag: '🇦🇪', context: 'Dubai, Abu Dhabi, Sharjah',    anchor: 'aed-to-npr' },
    { iso3: 'QAR', country: 'Qatar',        flag: '🇶🇦', context: 'Doha, Al Rayyan',              anchor: 'qar-to-npr' },
    { iso3: 'SAR', country: 'Saudi Arabia', flag: '🇸🇦', context: 'Riyadh, Jeddah, Dammam',       anchor: 'sar-to-npr' },
    { iso3: 'KWD', country: 'Kuwait',       flag: '🇰🇼', context: 'Kuwait City',                  anchor: 'kwd-to-npr' },
    { iso3: 'BHD', country: 'Bahrain',      flag: '🇧🇭', context: 'Manama',                       anchor: 'bhd-to-npr' },
    { iso3: 'MYR', country: 'Malaysia',     flag: '🇲🇾', context: 'Kuala Lumpur, Penang',         anchor: 'myr-to-npr' },
    { iso3: 'KRW', country: 'South Korea',  flag: '🇰🇷', context: 'Seoul, Busan',                 anchor: 'krw-to-npr' },
    { iso3: 'USD', country: 'USA',          flag: '🇺🇸', context: 'New York, Virginia, Texas',    anchor: 'usd-to-npr' },
    { iso3: 'GBP', country: 'UK',           flag: '🇬🇧', context: 'London, Birmingham',           anchor: 'gbp-to-npr' },
    { iso3: 'AUD', country: 'Australia',    flag: '🇦🇺', context: 'Sydney, Melbourne',            anchor: 'aud-to-npr' },
    { iso3: 'EUR', country: 'Europe',       flag: '🇪🇺', context: 'Germany, Portugal',            anchor: 'eur-to-npr' },
    { iso3: 'JPY', country: 'Japan',        flag: '🇯🇵', context: 'Tokyo, Osaka',                 anchor: 'jpy-to-npr' },
    { iso3: 'CAD', country: 'Canada',       flag: '🇨🇦', context: 'Toronto, Vancouver',           anchor: 'cad-to-npr' },
  ];

  // JSON-LD structured data
  const schemaWebPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'Nepal Remittance Rates — Official NRB Exchange Rates',
    'url': 'https://nepacalc.com/market-rates/remittance/',
    'description': 'Official Nepal Rastra Bank (NRB) remittance exchange rates for UAE, Qatar, Saudi Arabia, Kuwait, Malaysia, South Korea, USA, UK, Australia and more.',
    'dateModified': new Date(rawDate).toISOString(),
    'publisher': { '@type': 'Organization', 'name': 'NepaCalc', 'url': 'https://nepacalc.com' },
  };

  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      { '@type': 'Question', 'name': 'What is the AED to NPR rate today?', 'acceptedAnswer': { '@type': 'Answer', 'text': `The official NRB buy rate for UAE Dirham (AED) to Nepalese Rupee (NPR) today is 1 AED = ${fmtPer1('AED')} NPR (Buy). Check the rate table above for today's updated figure.` } },
      { '@type': 'Question', 'name': 'What is the QAR to NPR rate today?', 'acceptedAnswer': { '@type': 'Answer', 'text': `The official NRB buy rate for Qatari Riyal (QAR) to Nepalese Rupee (NPR) today is 1 QAR = ${fmtPer1('QAR')} NPR. Updated every banking day.` } },
      { '@type': 'Question', 'name': 'How much is 1 SAR in Nepal today?', 'acceptedAnswer': { '@type': 'Answer', 'text': `1 Saudi Riyal (SAR) equals ${fmtPer1('SAR')} NPR as per today's Nepal Rastra Bank official buy rate.` } },
      { '@type': 'Question', 'name': 'What is the MYR to NPR rate today?', 'acceptedAnswer': { '@type': 'Answer', 'text': `According to the official NRB exchange rate, 1 Malaysian Ringgit (MYR) = ${fmtPer1('MYR')} NPR today.` } },
      { '@type': 'Question', 'name': 'What is the KRW to NPR rate today?', 'acceptedAnswer': { '@type': 'Answer', 'text': `The NRB official rate for South Korean Won is published per 100 KRW. Today's NRB buy rate is 100 KRW = ${fmt(nrbMap['KRW']?.buy)} NPR.` } },
      { '@type': 'Question', 'name': 'How does NRB remittance rate differ from bank rates?', 'acceptedAnswer': { '@type': 'Answer', 'text': 'Nepal Rastra Bank publishes the official reference (benchmark) rates. Licensed remittance providers such as IME, Prabhu Money, and Western Union apply a small margin of 0.5% to 1.5% on top of these official rates. Always compare before sending.' } },
    ],
  };

  return (
    <div className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <CalcWrapper
        title="Nepal Remittance Rates 2026 — Official NRB Exchange Rates"
        description="Official Nepal Rastra Bank (NRB) buying and selling rates for Nepal's top remittance corridors — UAE (AED), Qatar (QAR), Saudi Arabia (SAR), Kuwait (KWD), Malaysia (MYR), Korea (KRW), USA, UK, Australia."
        crumbs={[{ label: 'Market Rates', href: '/market-rates/' }, { label: 'Remittance Rates Nepal' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'NRB Exchange Rate', slug: '/market-rates/exchange-rate-nepal/' },
          { name: 'Currency Converter', slug: '/calculator/currency-converter/' },
          { name: 'Live Gold Price', slug: '/market-rates/live-gold-price/' },
          { name: 'Income Tax', slug: '/calculator/nepal-income-tax/' },
        ]}
      >
        {/* ── LIVE CLIENT COMPONENT (interactive, JS-rendered) ── */}
        <RemittanceDashboardClient initialRates={initialRates} />

        {/* ── SERVER-RENDERED: Full rate table visible to Googlebot ── */}
        <div className="hp-container pt-6 pb-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">
                NRB Official Remittance Rates — {nrbDateDisplay}
              </p>
              <p className="text-xs text-slate-400">Source: <a href="https://www.nrb.org.np" target="_blank" rel="noopener noreferrer" className="underline">nrb.org.np</a></p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm text-left">
                <caption className="sr-only">Official Nepal Rastra Bank remittance exchange rates — Buy and Sell rates for AED, QAR, SAR, KWD, BHD, MYR, KRW, USD, GBP, AUD, EUR, JPY, CAD to Nepalese Rupee (NPR)</caption>
                <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider">
                  <tr>
                    <th scope="col" className="px-4 py-3">Country / Currency</th>
                    <th scope="col" className="px-4 py-3">Code</th>
                    <th scope="col" className="px-4 py-3">Unit</th>
                    <th scope="col" className="px-4 py-3">NRB Buying (NPR)</th>
                    <th scope="col" className="px-4 py-3">NRB Selling (NPR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {corridors.map(({ iso3, country, flag, context }) => {
                    const r = nrbMap[iso3];
                    return (
                      <tr key={iso3} id={`rate-${iso3.toLowerCase()}`}>
                        <td className="px-4 py-3 font-semibold">
                          {flag} {country}
                          <span className="block text-xs text-slate-400 font-normal">{context}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-500 font-mono">{iso3}</td>
                        <td className="px-4 py-3 text-slate-500">{r ? r.unit : 1}</td>
                        <td className="px-4 py-3 font-bold text-emerald-700">{r ? fmt(r.buy) : '—'}</td>
                        <td className="px-4 py-3 font-bold text-slate-800">{r ? fmt(r.sell) : '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              * Official NRB reference rates. Licensed remittance providers (IME, Prabhu Money, Western Union) may apply a margin of 0.5%–1.5% above the NRB buy rate. Always verify before transferring.
            </p>
          </div>
        </div>

        {/* ── SEO CONTENT SECTION: Rich text for Googlebot ── */}
        <div className="hp-container pb-20 pt-10 border-t border-slate-100">
          <div className="max-w-4xl mx-auto space-y-8">

            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-3 border-b border-slate-200 pb-2">
                Nepal Remittance Rates Today — Official NRB Data ({nrbDateDisplay})
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Remittance is the backbone of Nepal's economy, contributing over 25% of the national GDP. Every day, millions of Nepali workers in the UAE, Qatar, Saudi Arabia, Kuwait, Malaysia, South Korea, USA, UK, and Australia send money home to their families. The exchange rate they receive directly determines how many Nepalese Rupees (NPR) their family receives.
              </p>
              <p className="text-slate-600 leading-relaxed mt-3">
                This page shows the <strong>official Nepal Rastra Bank (NRB) buying and selling rates</strong> for the top 13 Nepal remittance corridors — updated every banking day directly from the official NRB API. The NRB buying rate is the rate at which Nepali banks purchase foreign currency remitted from abroad — i.e., the NPR your family actually receives.
              </p>
            </div>

            {/* Per-corridor SEO sections */}
            <div id="aed-to-npr" className="scroll-mt-20">
              <h2 className="text-xl font-black text-slate-900 mb-2">🇦🇪 AED to NPR — UAE Dirham to Nepalese Rupee Today</h2>
              <p className="text-slate-600 leading-relaxed">
                The UAE (United Arab Emirates) is Nepal's single largest remittance source country. Over 1.5 million Nepali workers live and work in Dubai, Abu Dhabi, and Sharjah. Today's official NRB buy rate for <strong>1 AED = {fmtPer1('AED')} NPR</strong> (Buying) and <strong>1 AED = {(nrbMap['AED']?.sell != null ? (nrbMap['AED']!.sell! / nrbMap['AED']!.unit).toFixed(4) : '—')} NPR</strong> (Selling) as of {nrbDateDisplay}.
              </p>
            </div>

            <div id="qar-to-npr" className="scroll-mt-20">
              <h2 className="text-xl font-black text-slate-900 mb-2">🇶🇦 QAR to NPR — Qatari Riyal to Nepalese Rupee Today</h2>
              <p className="text-slate-600 leading-relaxed">
                Qatar employs hundreds of thousands of Nepali workers in construction, hospitality, and domestic services. Today's official NRB buy rate is <strong>1 QAR = {fmtPer1('QAR')} NPR</strong>. Selling rate: <strong>{(nrbMap['QAR']?.sell != null ? (nrbMap['QAR']!.sell! / nrbMap['QAR']!.unit).toFixed(4) : '—')} NPR</strong> per 1 QAR.
              </p>
            </div>

            <div id="sar-to-npr" className="scroll-mt-20">
              <h2 className="text-xl font-black text-slate-900 mb-2">🇸🇦 SAR to NPR — Saudi Riyal to Nepalese Rupee Today</h2>
              <p className="text-slate-600 leading-relaxed">
                Saudi Arabia is home to a large Nepali workforce employed across Riyadh, Jeddah, and Dammam. Today's NRB official buy rate: <strong>1 SAR = {fmtPer1('SAR')} NPR</strong>. Sell rate: <strong>{(nrbMap['SAR']?.sell != null ? (nrbMap['SAR']!.sell! / nrbMap['SAR']!.unit).toFixed(4) : '—')} NPR</strong>.
              </p>
            </div>

            <div id="kwd-to-npr" className="scroll-mt-20">
              <h2 className="text-xl font-black text-slate-900 mb-2">🇰🇼 KWD to NPR — Kuwaiti Dinar to Nepalese Rupee Today</h2>
              <p className="text-slate-600 leading-relaxed">
                The Kuwaiti Dinar (KWD) is one of the world's strongest currencies. Today's NRB buy rate: <strong>1 KWD = {fmtPer1('KWD')} NPR</strong>. Sell rate: <strong>{fmt(nrbMap['KWD']?.sell)} NPR</strong> per 1 KWD.
              </p>
            </div>

            <div id="myr-to-npr" className="scroll-mt-20">
              <h2 className="text-xl font-black text-slate-900 mb-2">🇲🇾 MYR to NPR — Malaysian Ringgit to Nepalese Rupee Today</h2>
              <p className="text-slate-600 leading-relaxed">
                Malaysia employs a large number of Nepali workers in manufacturing, construction, and plantation sectors. Today's NRB official rate: <strong>1 MYR = {fmtPer1('MYR')} NPR</strong> (Buying). Sell: <strong>{(nrbMap['MYR']?.sell != null ? (nrbMap['MYR']!.sell! / nrbMap['MYR']!.unit).toFixed(4) : '—')} NPR</strong>.
              </p>
            </div>

            <div id="krw-to-npr" className="scroll-mt-20">
              <h2 className="text-xl font-black text-slate-900 mb-2">🇰🇷 KRW to NPR — South Korean Won to Nepalese Rupee Today</h2>
              <p className="text-slate-600 leading-relaxed">
                South Korea employs Nepali workers under the Employment Permit System (EPS) in manufacturing and agriculture. NRB publishes KRW per 100 units. Today's rate: <strong>100 KRW = {fmt(nrbMap['KRW']?.buy)} NPR</strong> (Buying) / <strong>{fmt(nrbMap['KRW']?.sell)} NPR</strong> (Selling).
              </p>
            </div>

            <div id="usd-to-npr" className="scroll-mt-20">
              <h2 className="text-xl font-black text-slate-900 mb-2">🇺🇸 USD to NPR — US Dollar to Nepalese Rupee Today</h2>
              <p className="text-slate-600 leading-relaxed">
                The US Dollar is the world's primary reserve currency and Nepal's most referenced forex rate. Today's official NRB rate: <strong>1 USD = {fmtPer1('USD')} NPR</strong> (Buying) and <strong>{(nrbMap['USD']?.sell != null ? (nrbMap['USD']!.sell! / nrbMap['USD']!.unit).toFixed(4) : '—')} NPR</strong> (Selling) as of {nrbDateDisplay}.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900 mb-2">How to Send Money to Nepal — Safe Remittance Guide</h2>
              <p className="text-slate-600 leading-relaxed mb-2">
                Always use licensed remittance channels to protect your money. The key licensed providers operating in Nepal include:
              </p>
              <ul className="text-slate-600 leading-relaxed list-disc pl-5 space-y-1">
                <li><strong>IME Ltd (International Money Express)</strong> — Nepal's largest domestic remittance network</li>
                <li><strong>Prabhu Money Transfer</strong> — Wide branch coverage across Nepal</li>
                <li><strong>Western Union</strong> — Global provider with instant transfer option</li>
                <li><strong>Wise (formerly TransferWise)</strong> — Low-cost international transfer service</li>
                <li><strong>Remitly</strong> — Fast digital transfer with guaranteed delivery</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-3">
                Never use unofficial <em>Hundi</em> channels. They offer no legal protection, carry criminal penalties, and bypass Nepal's foreign currency regulations. The NRB rates on this page represent the official benchmark — licensed providers will be within 0.5%–1.5% of these rates.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900 mb-2">INR to NPR — Indian Rupee Fixed Peg</h2>
              <p className="text-slate-600 leading-relaxed">
                Unlike other currencies, the Indian Rupee (INR) is pegged at a fixed rate by the Nepalese government: <strong>100 INR = 160.00 NPR</strong> (buying) and <strong>100 INR = 160.15 NPR</strong> (selling). This peg has been maintained since 1993 to ensure economic stability between Nepal and India, which are each other's largest trade partners.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900 mb-3">Frequently Asked Questions</h2>

              <div className="space-y-4">
                {[
                  { q: 'What is the AED to NPR rate today?', a: `Today's official NRB buy rate for UAE Dirham is 1 AED = ${fmtPer1('AED')} NPR. Check the table above for the latest rate updated on ${nrbDateDisplay}.` },
                  { q: 'What is the QAR to NPR rate today?', a: `Today's official NRB buy rate for Qatari Riyal is 1 QAR = ${fmtPer1('QAR')} NPR.` },
                  { q: 'How much is 1 SAR in Nepal?', a: `As per today's NRB official rate, 1 Saudi Riyal (SAR) = ${fmtPer1('SAR')} NPR.` },
                  { q: 'What is the MYR to NPR rate today?', a: `According to NRB, 1 Malaysian Ringgit (MYR) = ${fmtPer1('MYR')} NPR today.` },
                  { q: 'What is 100 KRW in Nepal?', a: `100 South Korean Won (KRW) = ${fmt(nrbMap['KRW']?.buy)} NPR as per NRB's official buying rate.` },
                  { q: 'Where can I find the official NRB exchange rate?', a: 'Nepal Rastra Bank publishes official exchange rates at nrb.org.np every banking day. NepaCalc fetches these rates directly from the official NRB API to display accurate buying and selling rates.' },
                  { q: 'Why is the remittance rate different from the NRB rate?', a: 'NRB rates are benchmark reference rates. Licensed remittance operators apply a small working margin (typically 0.5%–1.5%) to cover operational costs and currency risk. Always compare providers before sending.' },
                ].map(({ q, a }, i) => (
                  <details key={i} className="border border-slate-200 rounded-lg p-4 cursor-pointer">
                    <summary className="font-bold text-slate-900 text-[15px] list-none flex items-center justify-between">
                      {q}
                      <span className="text-slate-400 ml-3 text-lg">+</span>
                    </summary>
                    <p className="text-slate-600 leading-relaxed mt-3 text-[14px]">{a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-sm">
              <a href="/market-rates/exchange-rate-nepal/" className="text-blue-700 font-bold underline hover:text-blue-900">NRB Exchange Rate Board →</a>
              <a href="/calculator/currency-converter/" className="text-blue-700 font-bold underline hover:text-blue-900">Currency Converter →</a>
              <a href="/market-rates/live-gold-price/" className="text-blue-700 font-bold underline hover:text-blue-900">Gold Price Nepal →</a>
            </div>
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}


