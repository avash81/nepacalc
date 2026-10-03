import { calcMeta } from '@/lib/calcMeta';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  ...calcMeta({
    title: 'Momo Calories: Complete Guide to Calories in Momos',
    description: 'Discover calories in steamed, fried, chicken, veg, buff, jhol, C-momo and tandoori momos. Includes per-piece, per-plate and cooking method comparisons.',
    slug: 'blog/momo-calories',
    keywords: [
      'momo calories',
      'calories in momos',
      'steamed momo calories',
      'fried momo calories',
      'chicken momo calories',
      'veg momo calories',
      'buff momo calories',
      'momo nutrition',
      'jhol momo calories',
      '1 momo calories',
      '10 momo calories',
    ],
  }),
  openGraph: {
    title: 'Momo Calories: Complete Guide to Calories in Momos',
    description: 'Discover calories in steamed, fried, chicken, veg, buff, jhol, C-momo and tandoori momos.',
    url: 'https://nepacalc.com/blog/momo-calories/',
    siteName: 'NepaCalc',
    type: 'article',
  },
  alternates: {
    canonical: 'https://nepacalc.com/blog/momo-calories/',
  },
};

export default function MomoCaloriesBlog() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="max-w-3xl mx-auto px-4 pt-10">
        <div className="mb-6">
          <Link href="/blog/" className="inline-flex items-center text-sm font-bold text-[#5F6368] hover:text-[#202124] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
        </div>

        <article className="bg-white border border-[#DADCE0] rounded-3xl p-6 sm:p-10 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-black text-[#202124] tracking-tight mb-6 leading-tight">
            Momo Calories: Complete Guide to Calories in Momos
          </h1>

          <div className="prose prose-slate max-w-none text-[#202124] leading-relaxed">
            <p className="text-lg text-[#5F6368] mb-8">
              Momos are one of the most popular street foods in South Asia. Whether you are tracking your intake or simply curious, understanding momo calories depends on the filling, cooking method, portion size and any sauces added.
            </p>

            {/* Quick Answer */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-10 not-prose">
              <h2 className="text-xl font-bold text-orange-800 mt-0 mb-3">Quick Calorie Answer</h2>
              <p className="text-orange-900 mb-0 text-sm leading-relaxed">
                A standard <strong>steamed chicken momo</strong> contains about <strong>60 calories</strong> per piece. A <strong>steamed veg momo</strong> contains about <strong>45 calories</strong> per piece. Frying adds approximately 25–30 calories per piece. For an exact estimate for your specific serving, use the interactive <Link href="/calculator/momo-calorie-counter/" className="text-orange-600 font-bold hover:underline">Momo Calorie Calculator</Link>.
              </p>
            </div>

            {/* Quick reference table */}
            <h2 className="text-2xl font-black mt-10 mb-4 text-[#202124] border-b border-[#DADCE0] pb-2">Momo Calories at a Glance</h2>
            <div className="overflow-x-auto my-6 not-prose">
              <table className="w-full text-sm border border-[#DADCE0] rounded-xl overflow-hidden">
                <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                  <tr>
                    <th className="px-4 py-3 text-left font-black text-[#202124] text-[11px] uppercase tracking-wider">Quantity</th>
                    <th className="px-4 py-3 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">Steamed Veg</th>
                    <th className="px-4 py-3 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">Steamed Chicken</th>
                    <th className="px-4 py-3 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">Fried Chicken</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F3F4] text-[#202124]">
                  {[
                    { q: '1 Momo',              v: '45 kcal',  c: '60 kcal',  f: '85 kcal' },
                    { q: '5 Momos (Half Plate)', v: '225 kcal', c: '300 kcal', f: '425 kcal' },
                    { q: '6 Momos',             v: '270 kcal', c: '360 kcal', f: '510 kcal' },
                    { q: '8 Momos',             v: '360 kcal', c: '480 kcal', f: '680 kcal' },
                    { q: '10 Momos (Full Plate)',v: '450 kcal', c: '600 kcal', f: '850 kcal' },
                    { q: '12 Momos',            v: '540 kcal', c: '720 kcal', f: '1020 kcal' },
                  ].map(r => (
                    <tr key={r.q} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-semibold">{r.q}</td>
                      <td className="px-4 py-2.5 text-right">{r.v}</td>
                      <td className="px-4 py-2.5 text-right font-bold text-orange-600">{r.c}</td>
                      <td className="px-4 py-2.5 text-right font-bold text-rose-600">{r.f}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[#5F6368] mb-6">Values are estimates. Actual calories vary with momo size, recipe, cooking method and sauces.</p>

            {/* Calories by type */}
            <h2 className="text-2xl font-black mt-10 mb-4 text-[#202124] border-b border-[#DADCE0] pb-2">Calories by Momo Type</h2>

            <h3 className="text-lg font-bold text-orange-600 mt-6 mb-2">Chicken Momo Calories</h3>
            <p className="mb-4">
              A steamed chicken momo typically contains around <strong>60 calories</strong> per piece. Chicken momos provide roughly 5.5 g of protein and 2 g of fat per piece, making them a filling option. A 10-piece plate provides approximately 600 calories.
            </p>

            <h3 className="text-lg font-bold text-green-600 mt-6 mb-2">Veg Momo Calories</h3>
            <p className="mb-4">
              Steamed vegetable momos contain approximately <strong>45 calories</strong> per piece. The filling is primarily cabbage, carrots and onions. A 10-piece plate provides around 450 calories, though veg momos are lower in protein than meat varieties.
            </p>

            <h3 className="text-lg font-bold text-slate-600 mt-6 mb-2">Buff Momo Calories</h3>
            <p className="mb-4">
              Steamed buff (water buffalo) momos contain approximately <strong>65 calories</strong> per piece, with around 5 g of protein. Buff is a common meat filling in Nepal and has a nutritional profile similar to lean beef.
            </p>

            <h3 className="text-lg font-bold text-amber-600 mt-6 mb-2">Paneer Momo Calories</h3>
            <p className="mb-4">
              Paneer momos contain approximately <strong>75 calories</strong> per piece. The cottage cheese filling is higher in fat than chicken or veg momos.
            </p>

            <h3 className="text-lg font-bold text-rose-600 mt-6 mb-2">Pork Momo Calories</h3>
            <p className="mb-4">
              Pork momos contain approximately <strong>80 calories</strong> per piece, with around 5.5 g of protein. The higher fat content of pork raises the calorie count above chicken.
            </p>

            {/* Cooking methods */}
            <h2 className="text-2xl font-black mt-10 mb-4 text-[#202124] border-b border-[#DADCE0] pb-2">How Cooking Method Changes Calories</h2>
            <p className="mb-4">The filling and wrapper are only part of the picture. Cooking method can substantially change the total calorie count.</p>

            <ul className="list-disc pl-5 space-y-3 mb-6">
              <li><strong>Steamed Momos:</strong> No added fat. The lowest-calorie preparation. For example, steamed chicken momos are approximately 60 kcal per piece.</li>
              <li><strong>Fried Momos:</strong> The dough absorbs oil during frying, adding roughly 25–30 calories per piece. A 10-piece plate of fried chicken momos can exceed 850 calories.</li>
              <li><strong>Jhol Momos:</strong> Steamed momos served in a sesame and tomato broth. The soup itself adds extra fat and carbohydrates — approximately 10–15 extra calories per piece depending on how much broth is consumed.</li>
              <li><strong>C-Momo:</strong> A fried or steamed momo tossed in a spicy chilli sauce. The sauce adds 20–40 extra calories per piece above a plain steamed version of the same filling.</li>
              <li><strong>Tandoori Momos:</strong> Marinated in yoghurt, oil and spices then grilled. The marinade adds roughly 25–30 extra calories per piece compared to steamed momos.</li>
            </ul>

            {/* Per plate */}
            <h2 className="text-2xl font-black mt-10 mb-4 text-[#202124] border-b border-[#DADCE0] pb-2">How Many Calories Are in a Plate of Momos?</h2>
            <p className="mb-4">
              A common restaurant serving is 10 pieces, though some vendors serve 6, 8 or 12. Estimates based on 10 pieces:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li><strong>Steamed Veg Momos (10):</strong> ~450 calories</li>
              <li><strong>Steamed Chicken Momos (10):</strong> ~600 calories</li>
              <li><strong>Steamed Buff Momos (10):</strong> ~650 calories</li>
              <li><strong>Fried Chicken Momos (10):</strong> ~850 calories</li>
              <li><strong>Jhol Chicken Momos (10):</strong> ~720 calories</li>
            </ul>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-900 not-prose">
              <strong>Note on plate sizes:</strong> &ldquo;Plate&rdquo; is not a standardised portion. Different restaurants may serve 6, 8, 10 or 12 pieces. Calorie estimates should be based on the number of pieces rather than assuming a fixed plate size.
            </div>

            {/* Weight loss note */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-10 not-prose">
              <h2 className="text-xl font-black text-green-800 mt-0 mb-3">Momo Calories and Weight Management</h2>
              <p className="text-green-900 leading-relaxed text-sm">
                For calorie-conscious eating, steamed momos are preferable to fried. Steamed chicken or veg momos with a light red chutney are a lower-calorie option than fried momos with mayo or cheese dip. The calculator above can help you see how sauce and cooking method affect the total.
              </p>
            </div>

            {/* Protein comparison table */}
            <h2 className="text-2xl font-black mt-10 mb-4 text-[#202124] border-b border-[#DADCE0] pb-2">Calories and Protein per Momo</h2>
            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-sm border border-[#DADCE0] rounded-xl overflow-hidden">
                <thead className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                  <tr>
                    <th className="px-4 py-3 text-left font-black text-[#202124] text-[11px] uppercase tracking-wider">Momo Type (1 Piece, Steamed)</th>
                    <th className="px-4 py-3 text-center font-black text-[#202124] text-[11px] uppercase tracking-wider">Calories</th>
                    <th className="px-4 py-3 text-right font-black text-[#202124] text-[11px] uppercase tracking-wider">Protein</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F3F4] text-[#202124]">
                  {[
                    { name: 'Veg Momo',     c: '~45 kcal', p: '~1.5 g' },
                    { name: 'Chicken Momo', c: '~60 kcal', p: '~5.5 g' },
                    { name: 'Buff Momo',    c: '~65 kcal', p: '~5.0 g' },
                    { name: 'Paneer Momo',  c: '~75 kcal', p: '~3.5 g' },
                    { name: 'Pork Momo',    c: '~80 kcal', p: '~5.5 g' },
                  ].map(r => (
                    <tr key={r.name} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-semibold">{r.name}</td>
                      <td className="px-4 py-2.5 text-center font-bold text-orange-600">{r.c}</td>
                      <td className="px-4 py-2.5 text-right font-bold text-blue-600">{r.p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Why calories vary */}
            <h2 className="text-2xl font-black mt-10 mb-4 text-[#202124] border-b border-[#DADCE0] pb-2">Why Momo Calories Vary</h2>
            <p className="mb-4">
              Two servings described as &ldquo;chicken momos&rdquo; can have different calorie totals because of:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Momo size — small, medium, large or restaurant-sized</li>
              <li>Dough thickness — thin wrappers contain less carbohydrate than thick ones</li>
              <li>Filling ratio — the ratio of filling to wrapper affects protein and fat content</li>
              <li>Cooking oil — frying adds oil; the amount absorbed varies by preparation</li>
              <li>Sauce and accompaniments — red chutney adds around 15 kcal; mayo adds around 90 kcal per serving</li>
            </ul>
            <p className="mb-4">
              The values in this guide are estimates based on a standard assumed momo size and recipe. Use the <Link href="/calculator/momo-calorie-counter/" className="text-orange-600 font-bold hover:underline">Momo Calorie Calculator</Link> to calculate your specific serving.
            </p>

            {/* FAQ */}
            <h2 className="text-2xl font-black mt-10 mb-4 text-[#202124] border-b border-[#DADCE0] pb-2">Frequently Asked Questions</h2>
            <div className="space-y-4 mb-10 not-prose">
              {[
                {
                  q: 'How many calories are in 1 momo?',
                  a: 'A single steamed chicken momo contains approximately 60 calories. A steamed veg momo contains about 45 calories. The actual value depends on momo size, filling and recipe.'
                },
                {
                  q: 'How many calories are in 10 steamed chicken momos?',
                  a: 'Ten steamed chicken momos are estimated at approximately 600 calories, or about 60 calories per piece. This estimate assumes a standard recipe and portion size.'
                },
                {
                  q: 'Why do momo calories vary?',
                  a: 'Momo calories vary because of differences in momo size, dough thickness, filling ingredients, cooking method, cooking oil and sauces. Two servings described as chicken momos can differ significantly depending on recipe and preparation.'
                },
                {
                  q: 'Are jhol momos higher in calories than steamed momos?',
                  a: 'Jhol momos use the same base steamed momo, but the sesame and soybean-based broth adds extra fat and carbohydrates. Total calories depend on how much broth is consumed.'
                },
                {
                  q: 'How many calories are in a plate of momos?',
                  a: 'Plate sizes vary — restaurants may serve 6, 8, 10 or 12 pieces. Calorie estimates should be based on the number of pieces rather than assuming a fixed plate size.'
                },
              ].map((item, i) => (
                <div key={i} className="border border-[#DADCE0] rounded-xl p-5 bg-[#FAFAFA]">
                  <h3 className="font-bold text-[#202124] mb-2 text-sm">{item.q}</h3>
                  <p className="text-sm text-[#5F6368] leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 not-prose text-center">
              <p className="font-bold text-orange-800 mb-3">Calculate Your Momo Serving</p>
              <Link
                href="/calculator/momo-calorie-counter/"
                className="inline-block px-6 py-3 bg-orange-500 text-white font-black rounded-full hover:bg-orange-600 transition-colors text-sm"
              >
                Open Momo Calorie Calculator →
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
