import Link from 'next/link';
import { ShieldCheck, Scale, FileText, CheckCircle, Database, AlertTriangle, UserCheck, Award, BookOpen, RefreshCw } from 'lucide-react';
import { calcMeta } from '@/lib/calcMeta';

export const metadata = calcMeta({
  title: "Editorial Policy & Data Integrity | NepaCalc",
  description: "Learn how NepaCalc ensures mathematical accuracy and regulatory compliance for all calculators including Income Tax, Loan EMI, and Land Area.",
  slug: 'about/editorial-policy',
  canonical: '/about/editorial-policy/',
});

const TEAM_MEMBERS = [
  {
    emoji: '📊',
    name: 'NepaCalc Tax & Finance Desk',
    role: 'Nepal Taxation, Income Tax, TDS, SSF',
    credentials: [
      'Verified against Finance Act 2082 (First Schedule)',
      'Cross-referenced with Income Tax Act 2058',
      'IRD e-filing portal verified',
      'SSF Management Board guidelines reviewed',
    ],
    lastReviewed: 'Jestha 2083 (May 2026)',
    sources: ['ird.gov.np', 'mof.gov.np', 'ssf.gov.np'],
  },
  {
    emoji: '🏦',
    name: 'NepaCalc Finance & Banking Desk',
    role: 'Loan EMI, Fixed Deposit, NRB Base Rates',
    credentials: [
      'All EMI formulas validated per NRB Unified Directives',
      'Base rate data sourced from commercial bank quarterly disclosures',
      'Reducing-balance method enforced as per NRB mandate',
      'FD compounding formulas cross-verified with NEPSE data',
    ],
    lastReviewed: 'Baisakh 2083 (April 2026)',
    sources: ['nrb.org.np', 'nepseOnline.com'],
  },
  {
    emoji: '🏗️',
    name: 'NepaCalc Property & Land Desk',
    role: 'Land Area, Property Tax, Registration Fees',
    credentials: [
      'Ropani/Bigha/Dhur conversions sourced from DoLMA official units',
      'Property registration fees verified with Malpot Office schedules',
      'Capital Gains Tax rates cross-checked with IRD circular',
      'Municipality-level house tax rates individually verified',
    ],
    lastReviewed: 'Chaitra 2082 (March 2026)',
    sources: ['dolma.gov.np', 'ird.gov.np'],
  },
  {
    emoji: '⚡',
    name: 'NepaCalc Utility & Market Desk',
    role: 'NEA Electricity Bill, KUKL Water, Gold & Silver',
    credentials: [
      'NEA slab rates sourced from official NEA tariff circulars',
      'KUKL unit rates verified from KUKL official rate schedule',
      'Live gold/silver prices fetched from Nepal Rastra Bank forex data',
      'VAT calculations verified against IRD VAT directive',
    ],
    lastReviewed: 'Jestha 2083 (May 2026)',
    sources: ['nea.org.np', 'kukl.gov.np', 'nrb.org.np'],
  },
];

const DATA_SOURCES = [
  { name: 'Inland Revenue Department (IRD)', tool: 'Income Tax, VAT, TDS, Property Tax', icon: Scale, url: 'https://ird.gov.np' },
  { name: 'Nepal Rastra Bank (NRB)', tool: 'Loan EMI, Fixed Deposit, Forex, Base Rate', icon: CheckCircle, url: 'https://nrb.org.np' },
  { name: 'Department of Land Management (DoLMA)', tool: 'Ropani/Bigha Conversions, Land Area', icon: FileText, url: 'https://dolma.gov.np' },
  { name: 'Social Security Fund (SSF)', tool: 'SSF Contributions, Waiver Rules', icon: CheckCircle, url: 'https://ssf.gov.np' },
  { name: 'Nepal Electricity Authority (NEA)', tool: 'Electricity Bill Slab Rates', icon: CheckCircle, url: 'https://nea.org.np' },
  { name: 'KUKL', tool: 'Kathmandu Water Bill Rates', icon: FileText, url: 'https://kukl.gov.np' },
  { name: 'National Examination Board (NEB)', tool: 'SEE GPA Grading Scale', icon: CheckCircle, url: 'https://neb.gov.np' },
  { name: 'Ministry of Finance (MoF)', tool: 'Finance Act, Budget Announcements', icon: Scale, url: 'https://mof.gov.np' },
];

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <div className="max-w-5xl mx-auto px-4 py-16">

        {/* Hero */}
        <header className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-[11px] font-bold text-blue-700 uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" /> E-E-A-T Compliance
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Editorial Policy &amp; Mathematical Integrity</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            Our commitment to precision, transparency, and regulatory alignment in every NepaCalc tool.
            Every calculator formula is verified against official Nepal government and regulatory sources.
          </p>
        </header>

        {/* E-E-A-T Badges Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { icon: Award, label: 'Expertise', desc: 'Domain-specific editorial teams per category' },
            { icon: UserCheck, label: 'Authoritativeness', desc: 'Data sourced from official Nepal govt portals' },
            { icon: ShieldCheck, label: 'Trustworthiness', desc: 'No data stored — all calculations run client-side' },
            { icon: RefreshCw, label: 'Experience', desc: 'Quarterly audits aligned with Finance Act updates' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm">
              <Icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xs font-black text-gray-900 mb-1">{label}</div>
              <p className="text-[11px] text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Editorial Teams / Author Bios */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-gray-900 mb-2">Our Editorial Teams</h2>
          <p className="text-sm text-gray-500 mb-8">
            NepaCalc content is produced and fact-checked by dedicated subject-matter teams,
            each responsible for a specific domain of Nepal&apos;s financial and regulatory landscape.
          </p>
          <div className="space-y-6">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.name} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-2xl shrink-0">
                  {member.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-sm font-black text-gray-900">{member.name}</h3>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                      Fact-Checked ✓
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium mb-3">{member.role}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-4">
                    {member.credentials.map((c) => (
                      <div key={c} className="flex items-start gap-1.5 text-[11px] text-blue-800">
                        <CheckCircle className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <RefreshCw className="w-3 h-3" /> Last reviewed: <strong className="text-gray-600">{member.lastReviewed}</strong>
                    </span>
                    <span>Sources: {member.sources.map((s) => (
                      <a key={s} href={`https://${s}`} target="_blank" rel="noopener noreferrer"
                        className="text-blue-600 font-semibold hover:underline mx-1">
                        {s}
                      </a>
                    ))}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data Sources Table */}
        <section className="mb-14">
          <h2 className="text-xl font-black text-gray-900 mb-2 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" /> Primary Data Sources
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Every calculation on NepaCalc is benchmarked against official data sources to ensure legal and institutional validity.
          </p>
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left p-4 text-xs font-black text-gray-700 uppercase tracking-wider">Institution</th>
                  <th className="text-left p-4 text-xs font-black text-gray-700 uppercase tracking-wider hidden sm:table-cell">Covers</th>
                  <th className="text-left p-4 text-xs font-black text-gray-700 uppercase tracking-wider hidden md:table-cell">Official Portal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {DATA_SOURCES.map(({ name, tool, icon: Icon, url }) => (
                  <tr key={name} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="text-xs font-bold text-gray-900">{name}</span>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="text-[11px] text-gray-500">{tool}</span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <a href={url} target="_blank" rel="noopener noreferrer"
                        className="text-[11px] text-blue-600 font-semibold hover:underline">
                        {url.replace('https://', '')}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Precision & Transparency Principles */}
        <section className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" /> Precision Guarantee
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              NepaCalc utilizes floating-point arithmetic optimized for Nepalese currency (NPR).
              We enforce the <strong>Reducing Balance Method</strong> for all loan calculations by default,
              as mandated by Nepal Rastra Bank for all BFIs. Tax slab calculations apply marginal rates
              to each band independently — never a flat rate on total income.
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> Privacy & Transparency
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We do <strong>not</strong> store your financial data. All calculations are performed entirely on the
              client-side (your browser), ensuring your salary, loan amounts, and personal details remain
              100% private and secure. No server ever sees your inputs.
            </p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-blue-600" /> Update Policy
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              All calculators are reviewed at the start of each fiscal year (Shrawan) to incorporate
              changes from the Finance Act, NRB circulars, and municipal fee schedules. Mid-year updates
              are pushed immediately when major regulatory changes occur (e.g., NRB rate changes, IRD notifications).
            </p>
          </div>
          <div className="bg-[#FCE8E6] border border-red-100 rounded-2xl p-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-[11px] font-black text-red-700 uppercase tracking-wider mb-2">Professional Disclaimer</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  While our tools are mathematically precise, results are for informational purposes only.
                  Always verify critical financial decisions with a certified Chartered Accountant or your Bank&apos;s Relationship Manager.
                  NepaCalc does not provide licensed tax, legal, or financial advisory services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-white border border-gray-100 rounded-2xl p-10 shadow-sm text-center">
          <ShieldCheck className="w-10 h-10 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-black text-gray-900 mb-3">Found a discrepancy?</h2>
          <p className="text-sm text-gray-500 mb-6 max-w-lg mx-auto">
            If you spot a calculation error or have questions about a specific formula or data source,
            please contact our auditing team. We aim to respond within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact/" className="inline-block px-8 py-3 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-colors">
              Report a Bug
            </Link>
            <Link href="/blog/" className="inline-block px-8 py-3 bg-gray-100 text-gray-700 text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors">
              Read Our Guides
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
