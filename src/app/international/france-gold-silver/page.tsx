// Route: /international/france-gold-silver/
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import CountryGoldClient, { CountryGoldConfig, InternationalRatesData } from '@/components/international/CountryGoldClient';

const FRANCE_CONFIG: CountryGoldConfig = {
  code: 'fr',
  countryName: 'France',
  shortName: 'France',
  currencyCode: 'EUR',
  currencySymbol: '€',
  defaultUsdRate: 0.9087,
  marketBadge: 'Euronext & Monnaie de Paris Spot',
  goldCardTitle: 'Gold (Or 24K / 999‰)',
  silverCardTitle: 'Silver (Argent .999)',
  subtitle: 'Per Once, Gramme and Napoléon 20F • Real-time Euro spot rates',
  units: [
    { id: 'oz', label: 'Par Once Troy (oz)', shortLabel: 'Once', ozFactor: 1 },
    { id: 'g', label: 'Par Gramme (g)', shortLabel: 'Gramme', ozFactor: 1 / 31.1034768 },
    { id: '10g', label: 'Par 10 Grammes', shortLabel: '10 g', ozFactor: 10 / 31.1034768 },
    { id: 'napoleon', label: 'Napoléon 20 Francs (6.45g)', shortLabel: 'Napoléon', ozFactor: 5.805 / 31.1034768 },
    { id: 'kg', label: 'Lingot 1 Kilogramme', shortLabel: 'Lingot 1kg', ozFactor: 1000 / 31.1034768 },
    { id: 'tola', label: 'Par Tola', shortLabel: 'Tola', ozFactor: 11.6638 / 31.1034768 },
  ],
  purities: [
    { id: '24k', name: '24 Karats (999‰)', purity: 0.9999, desc: 'Or pur · Lingots & Lingotins' },
    { id: '22k', name: '22 Karats (916‰)', purity: 0.9167, desc: 'Souverain & Pièces d\'or' },
    { id: '21k', name: '21.6 Karats (900‰)', purity: 0.900, desc: 'Napoléon 20 Francs & Coq Marianne' },
    { id: '18k', name: '18 Karats (750‰)', purity: 0.750, desc: '750‰ Titre légal joaillerie française' },
    { id: '9k', name: '9 Karats (375‰)', purity: 0.375, desc: '375‰ Bijouterie standard' },
  ],
  popularItems: [
    {
      name: 'Pièce 20 Francs Napoléon / Coq Marianne (6.45g)',
      metal: 'gold',
      weight: '6.45 g',
      purity: '21.6 Karats (900‰)',
      ozFactor: 6.45 / 31.1034768,
      purityFactor: 0.900,
      taxNote: '0% TVA (Or d\'investissement)',
    },
    {
      name: 'Lingot 1 kg Or Pur (Monnaie de Paris / CPoR)',
      metal: 'gold',
      weight: '1000.0 g',
      purity: '24 Karats (999.9‰)',
      ozFactor: 1000 / 31.1034768,
      purityFactor: 1.0,
      taxNote: '0% TVA (Or d\'investissement)',
    },
    {
      name: 'Lingotin 50g Or Pur (999.9‰ Certifié)',
      metal: 'gold',
      weight: '50.0 g',
      purity: '24 Karats (999.9‰)',
      ozFactor: 50 / 31.1034768,
      purityFactor: 1.0,
      taxNote: '0% TVA (Or d\'investissement)',
    },
    {
      name: 'Pièce 50 Francs Hercule en Argent (30g 900‰)',
      metal: 'silver',
      weight: '30.0 g',
      purity: '.900 Argent',
      ozFactor: 30 / 31.1034768,
      purityFactor: 0.900,
      taxNote: 'Pièce d\'argent historique',
    },
    {
      name: '1 oz Philharmonique d\'Argent (.999 Pur)',
      metal: 'silver',
      weight: '31.1035 g',
      purity: '.999 Argent',
      ozFactor: 1.0,
      purityFactor: 1.0,
      taxNote: 'TVA standard 20%',
    },
  ],
  regulatoryNotes: {
    authority: 'Monnaie de Paris (Quai de Conti) & Bureau de Garantie (French Customs) under the Code Général des Impôts.',
    vatGstRule: 'Investment gold (or d\'investissement) is 100% exempt from French VAT (0% TVA) under Article 298 sexdecies A of the CGI.',
    cgtTaxRule: 'Resale choice: TMP flat tax (11.5%) or TPV capital gains tax (36.2% with 5% annual reduction after 2 years, reaching 0% tax after 22 years).',
  },
};

const FALLBACK_RATES: InternationalRatesData = {
  gold: {
    spotUSD: 4129.60,
    change24h: 34.80,
    changePercent24h: 0.85,
    prevClose: 4094.80,
    high24h: 4146.10,
    low24h: 4111.40,
    updatedAt: new Date().toISOString(),
  },
  silver: {
    spotUSD: 52.92,
    change24h: 0.68,
    changePercent24h: 1.30,
    prevClose: 52.24,
    high24h: 53.47,
    low24h: 52.17,
    updatedAt: new Date().toISOString(),
  },
  history30d: {
    gold: [
      { date: '09-28', price: 3950.4 },
      { date: '10-05', price: 3985.2 },
      { date: '10-12', price: 4035.1 },
      { date: '10-19', price: 4040.6 },
      { date: '10-30', price: 3995.8 },
      { date: '11-05', price: 4129.6 },
    ],
    silver: [
      { date: '09-28', price: 46.5 },
      { date: '10-05', price: 47.1 },
      { date: '10-12', price: 46.8 },
      { date: '10-19', price: 45.9 },
      { date: '10-30', price: 47.2 },
      { date: '11-05', price: 52.92 },
    ],
  },
  usdNprRate: 151.93,
};

function getInitialRates(): InternationalRatesData {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'international-rates.json');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const parsed = JSON.parse(content);
      if (parsed.gold?.spotUSD && parsed.silver?.spotUSD) {
        return parsed as InternationalRatesData;
      }
    }
  } catch {
    // Return fallback
  }
  return FALLBACK_RATES;
}

export async function generateMetadata(): Promise<Metadata> {
  const initialData = getInitialRates();
  const fx = FRANCE_CONFIG.defaultUsdRate;
  const goldOzEUR = initialData.gold.spotUSD * fx;
  const silverOzEUR = initialData.silver.spotUSD * fx;
  const goldGramEUR = (goldOzEUR / 31.1034768).toFixed(2);
  const gold18kGramEUR = ((goldOzEUR / 31.1034768) * 0.75).toFixed(2);
  const napoleonValueEUR = (goldOzEUR * (5.805 / 31.1034768)).toFixed(2);

  const formattedGold = goldOzEUR.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedSilver = silverOzEUR.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const description = `Cours de l'or en direct en France en Euros (€): €${formattedGold}/once • 24K €${goldGramEUR}/g • 18K (750‰) €${gold18kGramEUR}/g • Napoléon 20F €${napoleonValueEUR}. Cours de l'argent €${formattedSilver}/once. 0% TVA & fiscalité TMP/TPV.`;

  return {
    title: `Gold Price Today France - €${formattedGold}/oz | Cours de l'Or en Direct`,
    description,
    keywords: [
      'gold price today france',
      'cours de l or en direct france',
      'prix de l or au gramme france',
      'cours de l argent france',
      'prix napoleon 20 francs or',
      'or 18 carats prix gramme',
      'prix lingot or 1kg france',
      'cpor devises cours or',
      'fiscalite or france tmp tpv',
      'monnaie de paris or cours',
      'or 750 prix gramme',
      'gold silver ratio france',
    ],
    alternates: {
      canonical: 'https://nepacalc.com/international/france-gold-silver/',
    },
    openGraph: {
      title: `Gold Price Today France - €${formattedGold}/oz | Cours de l'Or en Direct`,
      description: `Cours de l'or en France en direct: Or €${formattedGold}/once • Argent €${formattedSilver}/once • Or 18K (750‰) €${gold18kGramEUR}/g • Napoléon 20F. Fiscalité 0% TVA et règles de revente.`,
      url: 'https://nepacalc.com/international/france-gold-silver/',
      type: 'website',
      images: [{
        url: 'https://nepacalc.com/images/og/international-gold-silver.jpg',
        width: 1200,
        height: 630,
        alt: `Cours de l'Or France €${formattedGold} par once troy | Argent €${formattedSilver} - Cours Spot en Direct`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Or €${formattedGold}/once | Argent €${formattedSilver}/once - Cours en Direct France`,
      description: `Cours officiel de l'or en France: €${formattedGold}/once (€${goldGramEUR}/g 24K, €${gold18kGramEUR}/g 18K). Argent: €${formattedSilver}/once. Métaux précieux en temps réel.`,
      images: ['https://nepacalc.com/images/og/international-gold-silver.jpg'],
    },
  };
}

export default function FranceGoldSilverPage() {
  const initialData = getInitialRates();
  const fx = FRANCE_CONFIG.defaultUsdRate;

  const goldOzEUR = initialData.gold.spotUSD * fx;
  const silverOzEUR = initialData.silver.spotUSD * fx;
  const goldGramEUR = goldOzEUR / 31.1034768;
  const silverGramEUR = silverOzEUR / 31.1034768;
  const napoleonGoldEUR = goldOzEUR * (5.805 / 31.1034768);
  const goldRatio = silverOzEUR > 0 ? (goldOzEUR / silverOzEUR).toFixed(1) : '-';

  function fmtEUR(n: number) {
    return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const faqItems = [
    {
      name: 'Quel est le cours de l\'or aujourd\'hui en France (What is the gold price in France today)?',
      acceptedAnswer: {
        text: `Le cours spot de l'or en France aujourd'hui est d'environ €${fmtEUR(goldOzEUR)} par once troy (31,1035 grammes), soit environ €${fmtEUR(goldGramEUR)} par gramme pour l'or pur 24 carats (999‰). Pour l'or 18 carats (750‰ - titre standard de la joaillerie française), la valeur intrinsèque est d'environ €${fmtEUR(goldGramEUR * 0.75)} par gramme.`,
      },
    },
    {
      name: 'Combien vaut une pièce de 20 Francs Napoléon or aujourd\'hui?',
      acceptedAnswer: {
        text: `Une pièce d'or de 20 Francs Napoléon (ou Coq Marianne) pèse 6,45 grammes et titre à 900‰ (90% d'or pur), ce qui représente exactement 5,805 grammes d'or fin. Au cours actuel, sa valeur intrinsèque en or pur est d'environ €${fmtEUR(napoleonGoldEUR)}, à laquelle peut s'ajouter une prime de numismatique selon l'état de conservation et la demande des investisseurs.`,
      },
    },
    {
      name: 'L\'achat d\'or d\'investissement est-il soumis à la TVA en France?',
      acceptedAnswer: {
        text: 'Non. L\'or d\'investissement est totalement exonéré de TVA (0% TVA) en France en vertu de l\'article 298 sexdecies A du Code Général des Impôts (CGI). Cette exonération concerne les lingots et lingotins d\'une pureté égale ou supérieure à 995‰ ainsi que les pièces frappées après 1800 ayant une pureté d\'au moins 900‰ et ayant eu cours légal.',
      },
    },
    {
      name: 'Quelle est la fiscalité lors de la revente d\'or en France (TMP vs TPV)?',
      acceptedAnswer: {
        text: 'Lors de la revente d\'or physique en France, le vendeur peut choisir entre deux régimes fiscaux: 1) La Taxe Forfaitaire sur les Métaux Précieux (TMP) fixée à 11,5% du montant total brut de la transaction (11% taxe + 0,5% CRDS). 2) Le régime des Plus-Values Réelles (TPV) à 36,2% sur le gain net réalisé, accessible sur présentation d\'une facture nominative d\'achat datée. Le régime TPV bénéficie d\'un abattement de 5% par an dès la 3ème année de détention, aboutissant à une exonération fiscale totale (0% d\'impôt) après 22 ans de détention continue.',
      },
    },
    {
      name: 'Quels sont les poinçons légaux pour l\'or en France?',
      acceptedAnswer: {
        text: 'En France, la garantie des métaux précieux est assurée par le Bureau de Garantie sous l\'autorité des Douanes françaises. Les poinçons de titre légal pour l\'or sont: la Tête d\'aigle pour l\'or 18 carats (750 millièmes), la Coquille Saint-Jacques pour l\'or 14 carats (585 millièmes), et le Trèfle pour l\'or 9 carats (375 millièmes). Pour l\'argent massif (925 millièmes), le poinçon officiel est la Tête de Minerve.',
      },
    },
    {
      name: 'Quel est le cours de l\'argent aujourd\'hui en France?',
      acceptedAnswer: {
        text: `Le cours spot de l'argent en France est actuellement d'environ €${fmtEUR(silverOzEUR)} par once troy, soit environ €${fmtEUR(silverGramEUR)} par gramme d'argent pur (.999). L'achat d'argent physique (lingots ou pièces neuves) est soumis à la TVA standard de 20% en France.`,
      },
    },
    {
      name: 'Quel est le ratio or-argent en France?',
      acceptedAnswer: {
        text: `Le ratio or-argent en direct est d'environ ${goldRatio}:1. Cela signifie qu'il faut actuellement environ ${goldRatio} onces d'argent pour acheter une once d'or physique au cours spot européen.`,
      },
    },
  ];

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://nepacalc.com/international/france-gold-silver/#webpage',
        url: 'https://nepacalc.com/international/france-gold-silver/',
        name: `Gold Price Today France - €${fmtEUR(goldOzEUR)}/oz | Cours de l'Or en Direct`,
        description: `Cours de l'or en direct en France en EUR (€): 24K, 18K (750‰), Napoléon 20F par gramme et par once. 0% TVA et fiscalité TMP/TPV.`,
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://nepacalc.com/#website',
          url: 'https://nepacalc.com/',
          name: 'NepaCalc',
        },
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://nepacalc.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'International Markets',
            item: 'https://nepacalc.com/international/',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'France Gold & Silver Price',
            item: 'https://nepacalc.com/international/france-gold-silver/',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((f) => ({
          '@type': 'Question',
          name: f.name,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.acceptedAnswer.text,
          },
        })),
      },
      {
        '@type': 'Dataset',
        name: 'France Gold and Silver Spot Prices (EUR)',
        description: 'Real-time and 30-day historical wholesale precious metal spot prices in Euros (€) linked to Euronext Paris and Monnaie de Paris benchmarks.',
        license: 'https://creativecommons.org/licenses/by/4.0/',
        variableMeasured: [
          'Gold spot price per troy ounce EUR',
          'Silver spot price per troy ounce EUR',
          'Gold price per gram 24K EUR',
          'Gold price per gram 18K 750 EUR',
          'Napoleon 20 Francs gold coin value EUR',
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      <div className="min-h-screen bg-gray-50/50 pb-16 font-sans font-modern-ui">
        {/* Breadcrumb Navigation */}
        <div className="max-w-6xl mx-auto px-4 pt-4 pb-2 text-xs text-gray-500">
          <nav className="flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <span>/</span>
            <Link href="/international/" className="hover:text-blue-600 transition">International</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">France Gold &amp; Silver</span>
          </nav>
        </div>

        {/* Live Client Hero & Calculator */}
        <CountryGoldClient config={FRANCE_CONFIG} initialData={initialData} />

        {/* Deep Educational & Regulatory Content */}
        <article className="max-w-6xl mx-auto px-4 mt-6 text-gray-800 space-y-10">
          
          {/* Section 1: The French Gold Market & Monnaie de Paris */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Le Marché de l&apos;Or en France &amp; La Tradition du Napoléon
            </h2>
            <div className="space-y-3.5 text-sm leading-relaxed text-gray-700">
              <p>
                La France possède une histoire monétaire particulièrement riche liée à l&apos;or physique. La pièce d&apos;or de 20 Francs Napoléon (créée en 1803 par Napoléon Bonaparte, également déclinée sous les types Marianne Coq, Génie et Cérès) demeure la référence incontournable de l&apos;épargne et du placement des ménages français.
              </p>
              <p>
                Dans la joaillerie et la bijouterie française, le titre d&apos;or de référence est traditionnellement le 18 carats (750 millièmes), certifié par le poinçon de garantie officiel de la Tête d&apos;Aigle apposé sous le contrôle de la Direction générale des douanes et droits indirects.
              </p>
            </div>
          </section>

          {/* Section 2: French Tax Rules: 0% TVA & Fiscalité de Revente (TMP vs TPV) */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Fiscalité de l&apos;Or en France: 0% TVA &amp; Choix du Régime Fiscal
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-gray-700">
              <p>
                Le cadre fiscal français pour l&apos;or physique d&apos;investissement est strictement encadré par le Code Général des Impôts:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4">
                  <h3 className="text-base font-bold text-amber-900 mb-1.5">Exonération Totale de TVA (0% TVA)</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Selon l&apos;article 298 sexdecies A du CGI, l&apos;achat d&apos;or d&apos;investissement (lingots, lingotins et pièces d&apos;or boursables comme le 20 Francs Napoléon) est exonéré de TVA à 100%. L&apos;argent physique reste soumis à la TVA classique de 20%.
                  </p>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4">
                  <h3 className="text-base font-bold text-emerald-900 mb-1.5">Régime TPV: 0% d&apos;Impôt après 22 Ans</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Sur présentation d&apos;une facture d&apos;achat nominative, l&apos;investisseur peut opter pour le régime des Plus-Values Réelles (TPV) à la revente. Grâce à un abattement dégressif de 5% par an à partir de la 3ème année, les gains sont 100% défiscalisés après 22 années de conservation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Frequently Asked Questions */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Foire Aux Questions (Questions Fréquentes - Or &amp; Argent)
            </h2>
            <div className="space-y-4 divide-y divide-gray-100">
              {faqItems.map((faq, idx) => (
                <div key={idx} className={idx > 0 ? 'pt-4' : ''}>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5">
                    {faq.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </section>


          {/* Section: Official Resources & Regulatory Links */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Ressources Officielles &amp; Autorites de Reglementation
            </h2>
            <div className="space-y-3">
              <a
                href="https://www.monnaiedeparis.fr/en/collection/gold"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 bg-blue-50/40 border border-blue-100 rounded-xl hover:bg-blue-50 transition group cursor-pointer"
              >
                <div className="shrink-0 mt-0.5 w-7 h-7 bg-blue-900 text-white rounded-lg flex items-center justify-center text-xs font-bold">MP</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700">Monnaie de Paris - Or Official Gold</div>
                  <div className="text-xs text-gray-500 mt-0.5">France's official mint (1,150 years of history). Producer of the Napoleon 20 Francs gold coin and official Euro collector and bullion coins.</div>
                  <div className="text-[11px] text-blue-600 mt-0.5">monnaiedeparis.fr</div>
                </div>
              </a>
              <a
                href="https://www.impots.gouv.fr/particulier/questions/jai-realise-une-plus-value-lors-de-la-vente-de-metaux-precieux-dois-je-la"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 bg-blue-50/40 border border-blue-100 rounded-xl hover:bg-blue-50 transition group cursor-pointer"
              >
                <div className="shrink-0 mt-0.5 w-7 h-7 bg-blue-900 text-white rounded-lg flex items-center justify-center text-xs font-bold">DG</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700">Direction Generale des Finances Publiques - Metaux Precieux</div>
                  <div className="text-xs text-gray-500 mt-0.5">Official French tax authority guidance on plus-values (capital gains) from gold sales: TMP flat tax 11.5% (Art. 150 VI CGI) and TPV regime with annual abatement.</div>
                  <div className="text-[11px] text-blue-600 mt-0.5">impots.gouv.fr</div>
                </div>
              </a>
              <a
                href="https://www.banque-france.fr/en/statistics/key-figures"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 bg-blue-50/40 border border-blue-100 rounded-xl hover:bg-blue-50 transition group cursor-pointer"
              >
                <div className="shrink-0 mt-0.5 w-7 h-7 bg-blue-900 text-white rounded-lg flex items-center justify-center text-xs font-bold">BF</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700">Banque de France - Statistiques et Reserves d'Or</div>
                  <div className="text-xs text-gray-500 mt-0.5">France's central bank holds 2,436 tonnes of gold reserves (5th globally). Official EUR exchange rates and monetary statistics published by Banque de France.</div>
                  <div className="text-[11px] text-blue-600 mt-0.5">banque-france.fr</div>
                </div>
              </a>
            </div>
          </section>


          {/* Section: Related Internal Tools */}
          <section className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Outils et Ressources Associes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/international/gold-silver-ratio/"
                className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/30 transition group"
              >
                <div className="shrink-0 mt-0.5 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight">GSR</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-indigo-700 leading-tight">Ratio Or-Argent en Direct</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Ratio or/argent en temps reel depuis les marches COMEX. Indicateur cle pour les investisseurs francais comparant Napoleon or et pieces d'argent.</div>
                </div>
              </Link>
              <Link
                href="/international/gold-silver-price/history/"
                className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50/30 transition group"
              >
                <div className="shrink-0 mt-0.5 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight">ARC</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 leading-tight">Archives Historiques des Prix</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Archive complete des prix internationaux or et argent en USD. Indispensable pour calculer l'abattement annuel du regime TPV apres la troisieme annee.</div>
                </div>
              </Link>
              <Link
                href="/international/dubai-gold-rate/"
                className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-violet-300 hover:bg-violet-50/30 transition group"
              >
                <div className="shrink-0 mt-0.5 w-8 h-8 bg-violet-100 text-violet-700 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight">DXB</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-violet-700 leading-tight">Prix de l'Or a Dubai (AED)</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Suivez les prix officiels de l'or de Dubai. Les souk de Dubai sont un marche de reference mondial pour l'or physique, comparable au marche parisien.</div>
                </div>
              </Link>
              <Link
                href="/calculator/currency-converter/"
                className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50/30 transition group"
              >
                <div className="shrink-0 mt-0.5 w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-[10px] font-black tracking-tight">FX</div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-amber-700 leading-tight">Convertisseur de Devises (EUR/USD)</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">Convertissez l'Euro en dollar americain et 160+ devises avec des taux en direct. Utile pour convertir les prix spot USD en euros.</div>
                </div>
              </Link>
            </div>
          </section>

          {/* Section 4: Related International Portals */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              Explorer les Cours des Métaux Précieux dans le Monde
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs font-semibold">
              <Link href="/international/gold-silver-price/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                USA Gold &amp; Silver (USD)
              </Link>
              <Link href="/international/uk-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                UK Gold &amp; Silver (GBP)
              </Link>
              <Link href="/international/germany-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Germany Gold &amp; Silver (EUR)
              </Link>
              <Link href="/international/netherlands-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Netherlands Gold &amp; Silver (EUR)
              </Link>
              <Link href="/international/canada-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Canada Gold &amp; Silver (CAD)
              </Link>
              <Link href="/international/australia-gold-silver/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Australia Gold &amp; Silver (AUD)
              </Link>
              <Link href="/international/gold-silver-price/history/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Historique des Cours Spot
              </Link>
              <Link href="/international/dubai-gold-rate/" className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition border border-gray-100">
                Prix de l&apos;Or à Dubaï (AED)
              </Link>
            </div>
          </section>

        </article>
      </div>
    </>
  );
}
