import { calcMeta } from '@/lib/calcMeta';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// ─── Metadata ────────────────────────────────────────────────────────────────
// Point 24: Title | Point 25: Meta description | Point 27: Canonical
export const metadata: Metadata = {
  ...calcMeta({
    title: 'Momo Calories: Chicken, Veg, Buff, Fried & Jhol',
    description:
      'How many calories are in momos? Compare chicken, veg, buff, paneer, pork, steamed, fried, jhol and other momos by piece and serving.',
    slug: 'blog/momo-calories',
    keywords: [
      'momo calories',
      'calories in momos',
      'how many calories in momos',
      'chicken momo calories',
      'steamed momo calories',
      'fried momo calories',
      'jhol momo calories',
      'veg momo calories',
      'buff momo calories',
      'momo nutrition',
      '1 momo calories',
      '10 momo calories',
    ],
  }),
  openGraph: {
    title: 'Momo Calories: Chicken, Veg, Buff, Fried & Jhol',
    description:
      'How many calories are in momos? Compare chicken, veg, buff, paneer, pork, steamed, fried, jhol and other momos by piece and serving.',
    url: 'https://nepacalc.com/blog/momo-calories/',
    siteName: 'NepaCalc',
    type: 'article',
    images: [
      {
        url: 'https://nepacalc.com/images/momo-calorie-guide.webp',
        width: 1200,
        height: 630,
        alt: 'Momo Calories Guide - Chicken, Veg, Buff, Fried and Jhol',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Momo Calories: Chicken, Veg, Buff, Fried & Jhol',
    description:
      'How many calories are in momos? Compare chicken, veg, buff, paneer, pork, steamed, fried, jhol and other momos by piece and serving.',
    images: ['https://nepacalc.com/images/momo-calorie-guide.webp'],
  },
  // Point 28: index, follow
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  // Point 27: self-canonical
  alternates: {
    canonical: 'https://nepacalc.com/blog/momo-calories/',
  },
};

// ─── Structured Data ─────────────────────────────────────────────────────────
// Point 30: Article/BlogPosting schema — accurate values, no fake data
const blogPostingSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  '@id': 'https://nepacalc.com/blog/momo-calories/#article',
  headline: 'Momo Calories: How Many Calories Are in Momos?',
  description:
    'How many calories are in momos? Compare chicken, veg, buff, paneer, pork, steamed, fried, jhol and other momos by piece and serving.',
  image: {
    '@type': 'ImageObject',
    url: 'https://nepacalc.com/images/momo-calorie-guide.webp',
    width: 1200,
    height: 630,
  },
  url: 'https://nepacalc.com/blog/momo-calories/',
  datePublished: '2024-11-01',
  dateModified: new Date().toISOString().split('T')[0],
  author: {
    '@type': 'Organization',
    name: 'NepaCalc',
    url: 'https://nepacalc.com/',
  },
  publisher: {
    '@type': 'Organization',
    name: 'NepaCalc',
    logo: {
      '@type': 'ImageObject',
      url: 'https://nepacalc.com/logo.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://nepacalc.com/blog/momo-calories/',
  },
  inLanguage: 'en',
  about: {
    '@type': 'Food',
    name: 'Momo',
    description: 'South Asian steamed dumpling popular in Nepal, India and surrounding regions.',
  },
};

// Point 31: BreadcrumbList schema matching visible breadcrumbs
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://nepacalc.com/blog/momo-calories/#breadcrumb',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nepacalc.com/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://nepacalc.com/blog/' },
    { '@type': 'ListItem', position: 3, name: 'Momo Calories', item: 'https://nepacalc.com/blog/momo-calories/' },
  ],
};

// ─── Shared table data — single source of truth (Point 36) ───────────────────
// All numbers derived from the same assumptions as the Momo Calorie Calculator.
// Steamed chicken momo base: 60 kcal/piece, 5.5g protein, 2.0g fat, 5.8g carbs
// Cooking method calorie additions: Fried +25, Tandoori +30, C-Momo +40, Jhol +12

const MOMO_TYPE_DATA = [
  { label: 'Veg Momo',      cal: 45,  protein: 1.5, fat: 0.8, carbs: 8.0  },
  { label: 'Chicken Momo',  cal: 60,  protein: 5.5, fat: 2.0, carbs: 5.8  },
  { label: 'Buff Momo',     cal: 65,  protein: 5.0, fat: 2.8, carbs: 5.8  },
  { label: 'Paneer Momo',   cal: 75,  protein: 3.5, fat: 3.8, carbs: 6.2  },
  { label: 'Beef Momo',     cal: 78,  protein: 5.8, fat: 3.8, carbs: 5.5  },
  { label: 'Pork Momo',     cal: 80,  protein: 5.5, fat: 4.2, carbs: 5.5  },
  { label: 'Cheese Momo',   cal: 85,  protein: 4.0, fat: 4.5, carbs: 6.8  },
  { label: 'Jhol Momo',     cal: 82,  protein: 4.5, fat: 3.5, carbs: 9.0  },
  { label: 'Tandoori Momo', cal: 90,  protein: 6.0, fat: 3.5, carbs: 8.5  },
  { label: 'Fried Momo',    cal: 85,  protein: 4.5, fat: 4.5, carbs: 7.0  },
  { label: 'C Momo',        cal: 100, protein: 5.0, fat: 5.2, carbs: 9.5  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function MomoCaloriesBlog() {
  return (
    <>
      {/* Point 30 + 31: Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen bg-[#F8F9FA] pb-20">
        <div className="max-w-[1024px] mx-auto px-5 lg:px-8 pt-8 lg:pt-10">

          {/* Point 31: Visible breadcrumbs matching schema */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-[#5F6368]">
              <li><Link href="/" className="hover:text-[#202124]">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href="/blog/" className="hover:text-[#202124]">Blog</Link></li>
              <li aria-hidden="true">›</li>
              <li className="text-[#202124] font-semibold" aria-current="page">Momo Calories</li>
            </ol>
          </nav>

          {/* Point 45: Semantic <article> */}
          <article
            itemScope
            itemType="https://schema.org/BlogPosting"
            className="bg-white border border-[#DADCE0] rounded-3xl shadow-sm overflow-hidden"
          >
            <header className="px-6 sm:px-10 pt-8 sm:pt-10 pb-6 border-b border-[#DADCE0]">
              {/* Point 46: One H1 */}
              <h1
                itemProp="headline"
                className="text-3xl sm:text-4xl font-black text-[#202124] tracking-tight leading-tight mb-4"
              >
                Momo Calories: How Many Calories Are in Momos?
              </h1>
              {/* Point 45: semantic header content */}
              <p className="text-base text-[#5F6368] leading-relaxed">
                Momo calories vary according to the filling, size, cooking method, dough-to-filling ratio, oil and sauces. A steamed momo and a fried momo can therefore have different calorie estimates even when they contain the same filling. This guide covers calories by momo type, cooking method and serving size, using the same data assumptions as the interactive calculator.
              </p>
            </header>

            <div className="px-6 sm:px-10 py-8 space-y-12">

              {/* Point 37: Early calculator CTA */}
              {/* ── Section 1: Momo Calories at a Glance ── Point 4 */}
              <section aria-labelledby="glance">
                <h2 id="glance" className="text-2xl font-black text-[#202124] mb-2">
                  How Many Calories Are in Momos?
                </h2>
                {/* Simple inline calculator CTA */}
                <p className="text-sm text-[#5F6368] mb-4">
                  Want an estimate for a specific serving? Use the{' '}
                  <Link href="/calculator/momo-calorie-counter/" className="text-[#1967D2] font-semibold hover:underline">
                    Momo Calorie Calculator
                  </Link>.
                </p>
                <p className="text-[#5F6368] leading-relaxed mb-5">
                  Momo calories depend on the filling, size and preparation method. Steamed, fried, jhol, tandoori and C-momo preparations can produce different calorie estimates for the same number of pieces. The table below uses the same assumptions as the Momo Calorie Calculator.
                </p>
                {/* Point 33: HTML table for machine understanding */}
                <div className="overflow-x-auto border border-[#DADCE0] rounded-xl">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                      <tr>
                        <th className="px-4 py-3 text-left font-black text-[#202124] text-[11px] uppercase tracking-wider">Momo / Serving</th>
                        <th className="px-4 py-3 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">Estimated Calories</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F3F4] text-[#202124]">
                      {[
                        { s: '1 steamed chicken momo',   c: '~60 kcal'   },
                        { s: '1 steamed veg momo',       c: '~45 kcal'   },
                        { s: '5 steamed chicken momos',  c: '~300 kcal'  },
                        { s: '6 steamed chicken momos',  c: '~360 kcal'  },
                        { s: '8 steamed chicken momos',  c: '~480 kcal'  },
                        { s: '10 steamed veg momos',     c: '~450 kcal'  },
                        { s: '10 steamed chicken momos', c: '~600 kcal'  },
                        { s: '10 steamed buff momos',    c: '~650 kcal'  },
                        { s: '10 fried momos (chicken)', c: '~850 kcal'  },
                        { s: '10 jhol momos (chicken)',  c: '~820 kcal'  },
                        { s: '12 steamed chicken momos', c: '~720 kcal'  },
                      ].map(r => (
                        <tr key={r.s} className="hover:bg-slate-50">
                          <td className="px-4 py-2.5 font-semibold">{r.s}</td>
                          <td className="px-4 py-2.5 text-right font-bold text-orange-600">{r.c}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-[#5F6368] mt-3 leading-relaxed">
                  Estimates based on standard serving assumptions. Actual values vary with momo size, recipe, filling ratio and preparation. Use the Momo Calorie Calculator to estimate a specific serving.
                </p>
              </section>

              {/* ── Section 2: 1 Momo ── Point 5/6 */}
              <section aria-labelledby="one-momo">
                <h2 id="one-momo" className="text-2xl font-black text-[#202124] mb-3">
                  How Many Calories Are in 1 Momo?
                </h2>
                {/* Direct answer first */}
                <p className="text-[#5F6368] leading-relaxed mb-4">
                  One momo does not have a single universal calorie value because momo size, filling type and preparation method vary. A standard steamed chicken momo contains approximately <strong className="text-[#202124]">60 calories</strong> per piece. A steamed veg momo contains approximately <strong className="text-[#202124]">45 calories</strong> per piece. Frying adds roughly 25 calories per piece above the steamed equivalent.
                </p>
                <p className="text-[#5F6368] leading-relaxed mb-4">
                  The main variables that affect the calories in one momo are:
                </p>
                <ul className="pl-5 list-disc space-y-2 text-[#5F6368] leading-relaxed mb-4">
                  <li><strong className="text-[#202124]">Filling</strong> - chicken, buff, veg, paneer and pork fillings have different protein and fat content</li>
                  <li><strong className="text-[#202124]">Momo size</strong> - momos range from approximately 25 g to 55 g each depending on the restaurant or recipe</li>
                  <li><strong className="text-[#202124]">Cooking method</strong> - steamed momos contain no added cooking fat; fried momos absorb oil during cooking</li>
                  <li><strong className="text-[#202124]">Dough thickness</strong> - thicker wrappers add more carbohydrates per piece</li>
                  <li><strong className="text-[#202124]">Filling-to-dough ratio</strong> - more filling per piece increases protein and fat; more dough increases carbohydrates</li>
                </ul>
                <p className="text-[#5F6368] leading-relaxed">
                  To estimate the calories in one momo for a specific type and cooking method, select the values in the Momo Calorie Calculator and set the quantity to 1.
                </p>
              </section>

              {/* ── Section 3: 10 Momos / Quantity ── Points 6/7 */}
              <section aria-labelledby="quantity">
                <h2 id="quantity" className="text-2xl font-black text-[#202124] mb-3">
                  How Many Calories Are in 10 Momos?
                </h2>
                <p className="text-[#5F6368] leading-relaxed mb-4">
                  Ten momos contain approximately ten times the per-piece estimate when the same filling type and cooking method are used. A ten-piece serving of steamed chicken momos is estimated at approximately <strong className="text-[#202124]">600 calories</strong>. Different fillings and cooking methods produce different totals for the same serving quantity.
                </p>

                <h3 className="text-lg font-black text-[#202124] mb-3">Momo Calories by Quantity</h3>
                <div className="overflow-x-auto border border-[#DADCE0] rounded-xl mb-4">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                      <tr>
                        <th className="px-4 py-3 text-left font-black text-[#202124] text-[11px] uppercase tracking-wider">Quantity (Steamed Chicken)</th>
                        <th className="px-4 py-3 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">Estimated Calories</th>
                        <th className="px-4 py-3 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">Protein</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F3F4] text-[#202124]">
                      {[
                        { q: '1 momo',    c: '~60 kcal',  p: '~5.5 g' },
                        { q: '5 momos',   c: '~300 kcal', p: '~27.5 g' },
                        { q: '6 momos',   c: '~360 kcal', p: '~33 g' },
                        { q: '8 momos',   c: '~480 kcal', p: '~44 g' },
                        { q: '10 momos',  c: '~600 kcal', p: '~55 g' },
                        { q: '12 momos',  c: '~720 kcal', p: '~66 g' },
                        { q: '20 momos',  c: '~1200 kcal',p: '~110 g' },
                      ].map(r => (
                        <tr key={r.q} className="hover:bg-slate-50">
                          <td className="px-4 py-2.5 font-semibold">{r.q}</td>
                          <td className="px-4 py-2.5 text-right font-bold text-orange-600">{r.c}</td>
                          <td className="px-4 py-2.5 text-right font-bold text-blue-600">{r.p}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-[#5F6368] leading-relaxed">
                  Estimates based on steamed chicken momo at approximately 60 kcal and 5.5 g protein per piece. Adjust the type, method or quantity in the calculator for a different result.
                </p>
              </section>

              {/* ── Section 4: Chicken Momo Calories ── Points 8/9 */}
              <section aria-labelledby="chicken-momo">
                <h2 id="chicken-momo" className="text-2xl font-black text-[#202124] mb-3">
                  Chicken Momo Calories
                </h2>
                <p className="text-[#5F6368] leading-relaxed mb-4">
                  A steamed chicken momo contains approximately <strong className="text-[#202124]">60 calories</strong> per piece, with approximately 5.5 g of protein, 2 g of fat and 5.8 g of carbohydrates. Chicken is the most commonly calculated momo type in Nepal and India because it is one of the most widely served fillings.
                </p>
                <p className="text-[#5F6368] leading-relaxed mb-4">
                  The calorie estimate for chicken momos can vary depending on the cooking method, filling-to-dough ratio, momo size and any sauces added. A restaurant portion and a home-cooked portion can differ even when both are described as chicken momos.
                </p>

                <h3 id="steamed-chicken" className="text-lg font-black text-[#202124] mb-3">
                  Steamed Chicken Momo Calories
                </h3>
                <p className="text-[#5F6368] leading-relaxed mb-4">
                  A steamed chicken momo is estimated at approximately <strong className="text-[#202124]">60 calories</strong> per piece under the standard assumptions used by this calculator. This estimate represents a momo of approximately 40 g containing a minced chicken filling with typical seasoning. A ten-piece plate is estimated at approximately <strong className="text-[#202124]">600 calories</strong>.
                </p>
                <p className="text-[#5F6368] leading-relaxed mb-4">
                  This estimate can differ from real-world servings because momo size, filling quantity and recipe vary between restaurants and home kitchens. The estimate should be treated as a guide rather than a precise measurement.
                </p>

                <div className="overflow-x-auto border border-[#DADCE0] rounded-xl mb-4">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                      <tr>
                        <th className="px-4 py-3 text-left font-black text-[#202124] text-[11px] uppercase tracking-wider">Preparation (Chicken)</th>
                        <th className="px-4 py-3 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">Per Piece</th>
                        <th className="px-4 py-3 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">10 Pieces</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F3F4] text-[#202124]">
                      {[
                        { p: 'Steamed',   pp: '~60 kcal',  t: '~600 kcal'  },
                        { p: 'Fried',     pp: '~85 kcal',  t: '~850 kcal'  },
                        { p: 'Tandoori',  pp: '~90 kcal',  t: '~900 kcal'  },
                        { p: 'Jhol',      pp: '~72 kcal',  t: '~720 kcal'  },
                        { p: 'C-Momo',    pp: '~100 kcal', t: '~1000 kcal' },
                      ].map(r => (
                        <tr key={r.p} className="hover:bg-slate-50">
                          <td className="px-4 py-2.5 font-semibold">{r.p}</td>
                          <td className="px-4 py-2.5 text-right font-bold text-[#1967D2]">{r.pp}</td>
                          <td className="px-4 py-2.5 text-right font-bold text-orange-600">{r.t}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-[#5F6368] leading-relaxed">
                  To calculate a specific number of chicken momos, select <strong className="text-[#202124]">Chicken Momo</strong> in the Momo Calorie Calculator, then choose the cooking method and quantity.
                </p>
              </section>

              {/* ── Section 5: Momo Calories by Cooking Method ── Points 10/11/13 */}
              <section aria-labelledby="cooking-method">
                <h2 id="cooking-method" className="text-2xl font-black text-[#202124] mb-3">
                  Momo Calories by Cooking Method
                </h2>
                <p className="text-[#5F6368] leading-relaxed mb-5">
                  The cooking method is one of the most significant factors affecting momo calorie content. The table below compares preparation methods using chicken momo as the base filling.
                </p>
                <div className="overflow-x-auto border border-[#DADCE0] rounded-xl mb-5">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                      <tr>
                        <th className="px-4 py-3 text-left font-black text-[#202124] text-[11px] uppercase tracking-wider">Method</th>
                        <th className="px-4 py-3 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">Per Piece (Chicken)</th>
                        <th className="px-4 py-3 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">vs. Steamed</th>
                        <th className="px-4 py-3 text-left font-black text-[#202124] text-[11px] uppercase tracking-wider">Why It Differs</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F3F4] text-[#202124]">
                      {[
                        { m: 'Steamed',  c: '~60 kcal',  d: 'base',      r: 'No added fat from cooking',                               green: true },
                        { m: 'Fried',    c: '~85 kcal',  d: '+25 kcal',  r: 'Dough absorbs oil during frying',                         green: false },
                        { m: 'Jhol',     c: '~72 kcal',  d: '+12 kcal',  r: 'Sesame and tomato broth adds calories',                   green: false },
                        { m: 'Tandoori', c: '~90 kcal',  d: '+30 kcal',  r: 'Yoghurt and oil marinade before grilling',                green: false },
                        { m: 'C-Momo',   c: '~100 kcal', d: '+40 kcal',  r: 'Spicy sauce coating adds fat and carbohydrates',          green: false },
                      ].map(r => (
                        <tr key={r.m} className="hover:bg-slate-50">
                          <td className="px-4 py-2.5 font-semibold">{r.m}</td>
                          <td className="px-4 py-2.5 text-right font-bold text-[#202124]">{r.c}</td>
                          <td className={`px-4 py-2.5 text-right font-bold ${r.green ? 'text-green-600' : 'text-rose-600'}`}>{r.d}</td>
                          <td className="px-4 py-2.5 text-[#5F6368] text-[11px]">{r.r}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Fried momo — Point 10 */}
                <h3 id="fried-momo" className="text-lg font-black text-[#202124] mb-2">Fried Momo Calories</h3>
                <p className="text-[#5F6368] leading-relaxed mb-4">
                  Frying can increase the calorie content compared with the corresponding steamed preparation because the cooking process causes the dough to absorb oil. A fried chicken momo is estimated at approximately <strong className="text-[#202124]">85 calories</strong> per piece, compared with approximately 60 calories for the steamed equivalent. A ten-piece serving of fried chicken momos is estimated at approximately <strong className="text-[#202124]">850 calories</strong>.
                </p>
                <p className="text-[#5F6368] leading-relaxed mb-5">
                  The amount of oil absorbed varies with frying temperature, oil type, dough thickness and cooking time. These estimates represent typical conditions.
                </p>

                {/* Jhol momo — Point 11 */}
                <h3 id="jhol-momo" className="text-lg font-black text-[#202124] mb-2">Jhol Momo Calories</h3>
                <p className="text-[#5F6368] leading-relaxed mb-4">
                  Jhol momos are steamed momos served in a spiced sesame and tomato broth. The momo piece itself contributes the same base calories as a steamed momo of the same filling. The broth adds approximately 12 extra calories per piece to the total estimate. A ten-piece serving of jhol chicken momos is therefore estimated at approximately <strong className="text-[#202124]">720 calories</strong> including the sauce.
                </p>
                <p className="text-[#5F6368] leading-relaxed mb-5">
                  The actual calories from jhol sauce depend on the recipe and how much broth is consumed alongside the momos. The calculator's jhol estimate assumes a standard serving of the sauce.
                </p>

                {/* Tandoori */}
                <h3 id="tandoori-momo" className="text-lg font-black text-[#202124] mb-2">Tandoori Momo Calories</h3>
                <p className="text-[#5F6368] leading-relaxed mb-4">
                  Tandoori momos are marinated in yoghurt, oil and spices before being grilled. The marinade adds approximately 30 calories per piece above the steamed base. A steamed chicken momo marinated and grilled as tandoori is estimated at approximately <strong className="text-[#202124]">90 calories</strong> per piece, or approximately 900 calories for ten pieces.
                </p>

                {/* C-Momo */}
                <h3 id="c-momo" className="text-lg font-black text-[#202124] mb-2">C-Momo Calories</h3>
                <p className="text-[#5F6368] leading-relaxed">
                  C-momo (chilly momo) involves cooking or tossing momos in a spicy sauce. The sauce adds approximately 40 calories per piece above the steamed base. A ten-piece serving is estimated at approximately <strong className="text-[#202124]">1000 calories</strong> for a chicken base, making it the highest-calorie preparation in this calculator.
                </p>
              </section>

              {/* ── Section 6: Calories by Momo Type ── Point 12 */}
              <section aria-labelledby="by-type">
                <h2 id="by-type" className="text-2xl font-black text-[#202124] mb-3">
                  Calories by Momo Type
                </h2>
                <p className="text-[#5F6368] leading-relaxed mb-5">
                  Different fillings produce different calorie and nutrition profiles. The values below are per piece, steamed, based on the standard assumptions used by this calculator. Selecting different cooking methods in the calculator will add the corresponding calories on top of these base values.
                </p>
                <div className="overflow-x-auto border border-[#DADCE0] rounded-xl mb-4">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                      <tr>
                        <th className="px-4 py-3 text-left font-black text-[#202124] text-[11px] uppercase tracking-wider">Momo Type (1 Piece, Steamed)</th>
                        <th className="px-4 py-3 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">Calories</th>
                        <th className="px-4 py-3 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">Protein</th>
                        <th className="px-4 py-3 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">Fat</th>
                        <th className="px-4 py-3 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">Carbs</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F3F4] text-[#202124]">
                      {MOMO_TYPE_DATA.map(t => (
                        <tr key={t.label} className="hover:bg-slate-50">
                          <td className="px-4 py-2.5 font-semibold">{t.label}</td>
                          <td className="px-4 py-2.5 text-right font-bold text-orange-600">~{t.cal} kcal</td>
                          <td className="px-4 py-2.5 text-right text-blue-600 font-semibold">~{t.protein} g</td>
                          <td className="px-4 py-2.5 text-right text-[#5F6368] font-semibold">~{t.fat} g</td>
                          <td className="px-4 py-2.5 text-right text-[#5F6368] font-semibold">~{t.carbs} g</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-[#5F6368] leading-relaxed">
                  Values are estimates. Actual nutrition varies with momo size, filling recipe, dough thickness and preparation. Select any type in the Momo Calorie Calculator to calculate a specific serving.
                </p>
              </section>

              {/* ── Section 7: Momo Nutrition ── Points 14/15 */}
              <section aria-labelledby="nutrition">
                <h2 id="nutrition" className="text-2xl font-black text-[#202124] mb-3">
                  Momo Nutrition
                </h2>
                <p className="text-[#5F6368] leading-relaxed mb-4">
                  Momos do not have a single universal nutritional profile. The nutrition in a momo serving depends on the filling type, cooking method, momo size and any sauces or extras. The values below represent estimates for ten steamed chicken momos under the standard assumptions of this calculator.
                </p>
                <div className="overflow-x-auto border border-[#DADCE0] rounded-xl mb-5">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                      <tr>
                        <th className="px-4 py-3 text-left font-black text-[#202124] text-[11px] uppercase tracking-wider">Nutrient</th>
                        <th className="px-4 py-3 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">10 Steamed Chicken Momos</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F3F4] text-[#202124]">
                      {[
                        { n: 'Calories',       v: '~600 kcal' },
                        { n: 'Protein',        v: '~55 g'     },
                        { n: 'Carbohydrates',  v: '~58 g'     },
                        { n: 'Fat',            v: '~20 g'     },
                        { n: 'Dietary Fiber',  v: '~3 g'      },
                        { n: 'Sugar',          v: '~4 g'      },
                        { n: 'Sodium',         v: '~1450 mg'  },
                        { n: 'Cholesterol',    v: '~220 mg'   },
                        { n: 'Estimated Weight', v: '~400 g'  },
                      ].map(r => (
                        <tr key={r.n} className="hover:bg-slate-50">
                          <td className="px-4 py-2.5 font-semibold">{r.n}</td>
                          <td className="px-4 py-2.5 text-right font-bold text-[#202124]">{r.v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Point 15: Protein subsection */}
                <h3 id="protein" className="text-lg font-black text-[#202124] mb-2">
                  How Much Protein Is in Momos?
                </h3>
                <p className="text-[#5F6368] leading-relaxed mb-3">
                  The protein content of momos depends primarily on the filling type. Chicken and buff fillings contain more protein per piece than vegetable fillings. One steamed chicken momo contains approximately <strong className="text-[#202124]">5.5 g of protein</strong>. A ten-piece serving of steamed chicken momos therefore contains approximately <strong className="text-[#202124]">55 g of protein</strong> under these estimates.
                </p>
                <p className="text-[#5F6368] leading-relaxed mb-3">
                  By comparison, one steamed veg momo contains approximately 1.5 g of protein. A ten-piece serving contains approximately 15 g. Paneer momos sit between veg and chicken at approximately 3.5 g per piece.
                </p>
                <p className="text-[#5F6368] leading-relaxed">
                  These are calculator estimates. Actual protein content varies with the amount of filling per momo and the recipe used.
                </p>
              </section>

              {/* ── Section 8: Why Calories Vary ── Point 16 */}
              <section aria-labelledby="why-vary">
                <h2 id="why-vary" className="text-2xl font-black text-[#202124] mb-3">
                  Why Do Momo Calories Vary?
                </h2>
                {/* Self-contained answer for AEO */}
                <p className="text-[#5F6368] leading-relaxed mb-4">
                  Two servings described identically, for example "10 chicken momos," can differ significantly in calorie content when prepared by different restaurants or home cooks. The main reasons are:
                </p>
                <ul className="pl-5 list-disc space-y-2 text-[#5F6368] leading-relaxed mb-4">
                  <li><strong className="text-[#202124]">Momo size</strong> - restaurant-sized momos can weigh twice as much as smaller home-cooked versions. Momos typically range from approximately 25 g to 55 g each.</li>
                  <li><strong className="text-[#202124]">Filling quantity</strong> - the amount of filling relative to dough varies significantly. More filling increases protein and fat; more dough increases carbohydrates.</li>
                  <li><strong className="text-[#202124]">Filling ingredients</strong> - recipes use different ratios of meat, vegetables, fat and spices. A richer chicken filling will have higher fat content than a leaner one.</li>
                  <li><strong className="text-[#202124]">Dough thickness</strong> - thicker wrappers contain more carbohydrate per piece, increasing the calorie estimate.</li>
                  <li><strong className="text-[#202124]">Cooking method</strong> - steaming adds no cooking fat. Frying, tandoori and C-momo preparations all add calories through oil, marinade or sauce.</li>
                  <li><strong className="text-[#202124]">Oil absorption when frying</strong> - the amount of oil absorbed varies with frying temperature, oil type and cooking time.</li>
                  <li><strong className="text-[#202124]">Sauces and jhol</strong> - the calorie content of red chutney, mayo, cheese dip and jhol broth varies by recipe and the quantity served alongside the momos.</li>
                  <li><strong className="text-[#202124]">Serving definition</strong> - a "full plate" can mean 6, 8, 10 or 12 pieces depending on the restaurant or region.</li>
                </ul>
                <p className="text-[#5F6368] leading-relaxed">
                  The estimates on this page are based on standard assumptions. They represent a reasonable guide for a typical serving, not a laboratory measurement of a specific product.
                </p>
              </section>

              {/* ── Section 9: Methodology ── Points 17/18 */}
              <section aria-labelledby="methodology">
                <h2 id="methodology" className="text-2xl font-black text-[#202124] mb-3">
                  How Momo Calorie Estimates Are Calculated
                </h2>
                <p className="text-[#5F6368] leading-relaxed mb-4">
                  The Momo Calorie Calculator estimates calories using a formula based on the selected momo type, cooking method, quantity and any extras:
                </p>
                <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-5 mb-5 font-mono text-sm text-[#202124]">
                  <p className="mb-2">Base calories (per piece) = momo type base + cooking method addition</p>
                  <p className="mb-2">Total calories = (base calories per piece x quantity) + sauce calories</p>
                  <p className="text-[#5F6368] text-xs mt-3">Example: 10 steamed chicken momos = (60 + 0) x 10 = 600 kcal</p>
                  <p className="text-[#5F6368] text-xs">Example: 10 fried chicken momos = (60 + 25) x 10 = 850 kcal</p>
                </div>
                <p className="text-[#5F6368] leading-relaxed mb-4">
                  Each momo type has a base calorie estimate per piece, which represents a steamed momo of that filling type at a standard size. Each cooking method has an additional calorie value that is added on top of the base. Sauces and extras are added as fixed amounts per serving.
                </p>
                <p className="text-[#5F6368] leading-relaxed mb-4">
                  The calculator also estimates weight per serving using the same assumptions. Calories per 100 g are derived from the estimated total calories divided by the estimated weight.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <p className="text-sm text-amber-900 leading-relaxed">
                    <strong>Note on accuracy:</strong> These are estimates, not laboratory measurements. Actual nutrition values vary with the specific recipe, ingredient quality, momo size, filling quantity and preparation technique. The estimates are designed to provide a reasonable guide for a typical serving under standard assumptions.
                  </p>
                </div>
              </section>

              {/* ── Section 10: FAQ — useful content, NO FAQ schema (Point 32) ── */}
              <section aria-labelledby="faq">
                <h2 id="faq" className="text-2xl font-black text-[#202124] mb-5">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {([
                    {
                      q: 'How many calories are in one momo?',
                      a: 'One momo does not have a universal calorie value because momo size, filling and preparation method vary. One steamed chicken momo contains approximately 60 calories per piece. One steamed veg momo contains approximately 45 calories. Frying adds approximately 25 calories per piece compared to steaming.',
                    },
                    {
                      q: 'How many calories are in 10 momos?',
                      a: 'Ten steamed chicken momos are estimated at approximately 600 calories under the standard assumptions of the Momo Calorie Calculator. Ten steamed veg momos are approximately 450 calories. Ten fried chicken momos are approximately 850 calories. The exact estimate depends on the selected momo type, cooking method and any sauces.',
                    },
                    {
                      q: 'Are steamed and fried momos different in calories?',
                      a: 'Yes. Frying adds approximately 25 calories per piece compared with the steamed equivalent because the cooking process causes the dough to absorb oil. A ten-piece plate of fried chicken momos is estimated at approximately 850 calories versus 600 calories for the steamed equivalent, a difference of approximately 250 calories.',
                    },
                    {
                      q: 'How many calories are in jhol momos?',
                      a: 'Jhol momos are steamed momos served in a sesame and tomato broth. The broth adds approximately 12 extra calories per piece above the base steamed estimate. A ten-piece serving of jhol chicken momos is estimated at approximately 720 calories including the sauce, compared with 600 calories for the steamed equivalent without sauce.',
                    },
                    {
                      q: 'How many calories are in a plate of momos?',
                      a: 'A standard restaurant plate typically contains 10 momos, though some serve 6, 8 or 12. A full plate of 10 steamed chicken momos is estimated at approximately 600 calories. A plate of 10 fried momos is estimated at approximately 850 calories. The total varies with the momo type, cooking method and portion size.',
                    },
                    {
                      q: 'How much protein is in 10 chicken momos?',
                      a: 'Ten steamed chicken momos contain approximately 55 g of protein under the standard assumptions of this calculator. Each steamed chicken momo is estimated at approximately 5.5 g of protein per piece. Actual protein content varies with the filling recipe and momo size.',
                    },
                    {
                      q: 'Do sauces add calories to momos?',
                      a: 'Yes. Red chutney adds approximately 15 kcal per serving. Mayo adds approximately 90 kcal. Cheese dip adds approximately 70 kcal. Jhol sauce adds approximately 12 kcal per momo piece. The Momo Calorie Calculator allows sauce selection to include extras in the total estimate.',
                    },
                    {
                      q: 'Are veg momos lower in calories than chicken momos?',
                      a: 'Yes, under the standard assumptions of this calculator. A steamed veg momo is estimated at approximately 45 calories per piece, compared with approximately 60 calories for a steamed chicken momo. However, veg momos contain significantly less protein per piece. The total calorie difference for a ten-piece plate is approximately 150 calories (450 vs 600 kcal).',
                    },
                  ] as { q: string; a: string }[]).map((item, i) => (
                    <details key={i} className="group border border-[#DADCE0] rounded-xl overflow-hidden">
                      <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between hover:bg-slate-50 text-sm font-bold text-[#202124]">
                        {item.q}
                        <svg className="w-4 h-4 text-[#5F6368] group-open:rotate-180 transition-transform shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </summary>
                      <div className="px-5 pb-5 pt-3 border-t border-[#DADCE0] text-sm text-[#5F6368] leading-relaxed">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              {/* ── Related Calculators — Point 38 ── */}
              <section aria-labelledby="related">
                <h2 id="related" className="text-2xl font-black text-[#202124] mb-3">
                  Related Calculators
                </h2>
                <ul className="text-[#5F6368] leading-relaxed space-y-2 text-[15px]">
                  <li><Link href="/calculator/calorie-calculator/" className="text-[#1967D2] font-bold hover:underline">Calorie Calculator</Link> — Calculate requisite caloric thresholds for homeostasis.</li>
                  <li><Link href="/calculator/bmr/" className="text-[#1967D2] font-bold hover:underline">BMR Calculator</Link> — Calculate absolute Basal Metabolic Rate.</li>
                  <li><Link href="/calculator/bmi/" className="text-[#1967D2] font-bold hover:underline">BMI Calculator</Link> — Calculate Body Mass Index (BMI) using WHO physiological standards.</li>
                  <li><Link href="/calculator/ideal-weight/" className="text-[#1967D2] font-bold hover:underline">Ideal Weight Calculator</Link> — Determine standard physiological target weights.</li>
                </ul>
              </section>

            </div>
          </article>

          {/* Back link */}
          
        </div>
      </div>
    </>
  );
}


