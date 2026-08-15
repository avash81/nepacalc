import React from 'react';
import { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Nepal Budget 2083/84: Highlights, Summary, Tax Changes & Key Allocations',
  description: 'Nepal Budget 2083/84 (FY 2026/27): Rs. 2,124.34 billion budget, tax changes, VAT, customs, key allocations, reforms and major announcements.',

  keywords: [
    'Nepal Budget 2083/84', 'Nepal Budget', 'Nepal Budget Highlights', 'Budget 2083/84',
    'Budget 2026 Nepal', 'Nepal Budget Summary', 'Nepal Budget Tax Changes', 'Nepal Budget Allocation',
    'Nepal Budget PDF', 'Finance Bill Nepal', 'Income Tax Nepal Budget', 'VAT Changes Nepal',
    'Customs Duty Nepal', 'Excise Duty Nepal', 'Fiscal Budget Nepal', 'Nepal Economic Survey',
    'Nepal income tax slab 2083/84', 'Finance Act 2083 Nepal'
  ],
  alternates: { canonical: 'https://nepacalc.com/nepal/nepal-budget/' },
  openGraph: {
    title: 'Nepal Budget 2083/84 (FY 2026/27): Complete Guide, Tax Changes & Analysis',
    description: 'Income tax slabs, VAT changes, EV duties, sector allocations, and tax amnesty rules: the most complete Nepal Budget guide.',
    type: 'article',
    url: 'https://nepacalc.com/nepal/nepal-budget/',
    siteName: 'NepaCalc',
    images: [{ url: 'https://nepacalc.com/images/seo/nepal-budget-social.jpg', width: 1200, height: 630, alt: 'Nepal Budget 2083/84 Complete Guide' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nepal Budget 2083/84: Complete Tax Changes & Guide',
    description: 'Unified income tax slabs, VAT rebate, EV duties, sector allocations, amnesty scheme: everything in one place.',
    images: ['https://nepacalc.com/images/seo/nepal-budget-social.jpg']
  },
  robots: 'index, follow, max-snippet:-1, max-image-preview:large',
};



/* ─── CSS ───────────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

.nb{--paper:#ffffff;--paper-raised:#F8F8F8;--paper-dark:#F0EEE8;--ink:#18252F;--slate:#526370;--brass:#A07828;--brass-deep:#7A5A1E;--crimson:#6D1A32;--green:#1E6B46;--line:#E0DDD6;--mono:'IBM Plex Mono',monospace;--sans:'IBM Plex Sans',sans-serif;--serif:'Fraunces',serif;background:#fff;color:var(--ink);font-family:var(--sans);line-height:1.65;-webkit-font-smoothing:antialiased;overflow-x:clip;}
.nb *,.nb *::before,.nb *::after{box-sizing:border-box;}
.nb a{color:var(--brass-deep);text-decoration:underline;text-underline-offset:2px;}
.nb a:hover{color:var(--crimson);}
.nb a:focus-visible{outline:3px solid var(--crimson);outline-offset:2px;}

/* BREADCRUMB */
.nb-bc{font-family:var(--mono);font-size:.72rem;color:var(--slate);max-width:1200px;margin:0 auto;padding:12px 24px 0;}
.nb-bc a{color:var(--slate);text-decoration:none;}
.nb-bc a:hover{color:var(--crimson);}
.nb-bc span{margin:0 5px;color:var(--line);}

/* HERO */
.nb-hero{max-width:1200px;margin:0 auto;padding:18px 16px 14px;}
.nb-eyebrow{font-family:var(--mono);font-size:.72rem;letter-spacing:.13em;text-transform:uppercase;color:var(--crimson);display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap;}
.nb-eyebrow::before{content:'';width:22px;height:2px;background:var(--brass);flex-shrink:0;}
.nb h1{font-family:var(--serif);font-weight:600;font-size:clamp(1.3rem,2.8vw,2.1rem);line-height:1.15;margin:0 0 10px;letter-spacing:-.01em;word-break:break-word;overflow-wrap:break-word;}
.nb-dek{font-size:.95rem;color:var(--slate);max-width:80ch;margin:0 0 12px;line-height:1.65;word-break:break-word;overflow-wrap:break-word;}
.nb-meta{display:flex;gap:10px;flex-wrap:wrap;font-family:var(--mono);font-size:.7rem;color:var(--slate);border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:8px 16px;margin:0 auto 14px;max-width:1200px;}
.nb-meta .dot{width:5px;height:5px;border-radius:50%;background:#3E8E5A;display:inline-block;margin-right:4px;}
.nb-meta strong{color:var(--ink);}
@media(max-width:600px){.nb-hero{padding:12px 14px 10px;}.nb h1{font-size:1.25rem;}.nb-dek{font-size:.9rem;}.nb-meta{font-size:.67rem;gap:8px;}}
@media(min-width:992px){.nb-hero h1, .nb-dek{max-width:920px;}}

/* QUICK ANSWER */
.nb-qa{background:var(--paper-raised);border:1px solid var(--line);border-left:4px solid var(--brass);padding:14px 16px;max-width:1200px;margin:0 auto 12px;word-break:break-word;overflow-wrap:break-word;}
.nb-qa p{margin:0 0 8px;font-size:.93rem;color:var(--slate);}
.nb-qa p:last-child{margin:0;}

/* MOBILE TOC DROPDOWN */
.nb-toc-mobile{max-width:1200px;margin:0 auto 14px;padding:0 24px;display:none;}
.nb-toc-mobile details{border:1px solid var(--line);background:var(--paper-raised);}
.nb-toc-mobile summary{font-family:var(--mono);font-size:.78rem;text-transform:uppercase;letter-spacing:.1em;color:var(--ink);padding:10px 16px;cursor:pointer;user-select:none;list-style:none;display:flex;justify-content:space-between;align-items:center;}
.nb-toc-mobile summary::after{content:'▼';font-size:.6rem;transition:transform .2s;}
.nb-toc-mobile details[open] summary::after{transform:rotate(180deg);}
.nb-toc-mobile ol{list-style:none;margin:0;padding:0 16px 12px;columns:2;column-gap:20px;}
.nb-toc-mobile li{break-inside:avoid;}
.nb-toc-mobile a{display:block;padding:5px 0;font-size:.82rem;color:var(--ink);text-decoration:none;line-height:1.3;}
.nb-toc-mobile a:hover{color:var(--crimson);}
.nb-toc-mobile .nb-toc-num{font-family:var(--mono);font-size:.67rem;color:var(--brass-deep);margin-right:4px;}
.nb-toc-mobile .nb-toc-divider{display:none;}
@media(max-width:960px){.nb-toc-mobile{display:block;}}
@media(max-width:480px){.nb-toc-mobile ol{columns:1;}}

/* STATS */
.nb-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border:1px solid var(--line);max-width:1200px;margin:0 auto 20px;}
.nb-stat{background:#fff;padding:14px 18px;}
.nb-stat .fig{font-family:var(--sans);font-weight:700;font-size:1.15rem;color:var(--ink);display:block;line-height:1.2;}
.nb-stat .cap{font-size:.75rem;color:var(--slate);margin-top:3px;display:block;}
@media(max-width:700px){.nb-stats{grid-template-columns:repeat(2,1fr);}}

/* LAYOUT */
.nb-layout{max-width:1200px;margin:0 auto;padding:0 24px 60px;display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:36px;}
.nb-toc{position:sticky;top:72px;grid-column:2;grid-row:1;max-height:calc(100vh - 90px);align-self:start;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--line) transparent;}
.nb-toc::-webkit-scrollbar{width:4px;}
.nb-toc::-webkit-scrollbar-thumb{background:var(--line);border-radius:2px;}
.nb-main{grid-column:1;grid-row:1;min-width:0;overflow:hidden;}
@media(max-width:960px){
  .nb-layout{grid-template-columns:1fr;padding:0 14px 40px;gap:0;}
  .nb-toc{display:none;}
  .nb-main{order:1;min-width:0;overflow:hidden;width:100%;}
}

/* TOC */
.nb-toc-head{font-family:var(--mono);font-size:.7rem;text-transform:uppercase;letter-spacing:.12em;color:var(--slate);margin:0 0 8px;display:block;}
.nb-toc ol{list-style:none;margin:0;padding:0;border-left:2px solid var(--line);}
.nb-toc a{display:block;padding:6px 0 6px 14px;font-size:.82rem;color:var(--slate);text-decoration:none;border-left:2px solid transparent;margin-left:-2px;line-height:1.3;}
.nb-toc a:hover{border-left-color:var(--crimson);color:var(--crimson);}
.nb-toc-num{font-family:var(--mono);font-size:.67rem;color:var(--brass-deep);margin-right:5px;}
.nb-toc-divider{height:1px;background:var(--line);margin:8px 0;}

/* CHAPTERS */
.nb-chapter{padding:32px 0;border-top:1px solid var(--line);scroll-margin-top:76px;}
.nb-chapter:first-child{border-top:none;padding-top:0;}
.nb-ch-tag{display:none;}
.nb h2{font-family:var(--serif);font-weight:600;font-size:1.45rem;margin:0 0 4px;letter-spacing:-.01em;word-break:break-word;overflow-wrap:break-word;}
.nb-subdek{color:var(--slate);max-width:100%;margin:0 0 18px;font-size:.95rem;word-break:break-word;overflow-wrap:break-word;}
.nb h3{font-family:var(--serif);font-weight:500;font-size:1.08rem;margin:22px 0 8px;color:var(--ink);border-bottom:1px solid var(--line);padding-bottom:4px;word-break:break-word;overflow-wrap:break-word;}
.nb h4{font-family:var(--sans);font-weight:700;font-size:.88rem;margin:14px 0 4px;text-transform:uppercase;letter-spacing:.05em;color:var(--slate);word-break:break-word;overflow-wrap:break-word;}
.nb p{margin:0 0 12px;max-width:min(72ch,100%);word-break:break-word;overflow-wrap:break-word;}
.nb ul,.nb ol{padding-left:1.3em;max-width:min(72ch,100%);}
.nb li{margin-bottom:5px;word-break:break-word;overflow-wrap:break-word;}

/* TABLES */
.nb-tw{overflow-x:auto;margin:12px 0 20px;-webkit-overflow-scrolling:touch;max-width:100%;}
.nb table{width:100%;border-collapse:collapse;font-size:.875rem;}
.nb table caption{font-family:var(--mono);font-size:.68rem;text-align:left;color:var(--slate);margin-bottom:6px;text-transform:uppercase;letter-spacing:.05em;word-break:break-word;}
.nb th{text-align:left;font-weight:600;color:var(--ink);border-bottom:2px solid var(--ink);padding:8px 12px;background:rgba(0,0,0,0.02);white-space:normal;word-break:break-word;}
.nb td{padding:9px 12px;border-bottom:1px solid var(--line);color:var(--slate);vertical-align:top;word-break:break-word;overflow-wrap:break-word;}
.nb td strong{color:var(--ink);}
.nb th.nr,.nb td.nr{text-align:right;font-family:var(--mono);}
@media(max-width:600px){.nb th,.nb td{padding:7px 8px;font-size:.82rem;}}

/* UTILS */
.nb-tag-up{display:inline-block;background:#e6f4ea;color:#1e8e3e;padding:2px 6px;border-radius:4px;font-size:.73rem;font-weight:600;}
.nb-tag-down{display:inline-block;background:#fce8e6;color:#d93025;padding:2px 6px;border-radius:4px;font-size:.73rem;font-weight:600;}
.nb-tag-new{display:inline-block;background:#e8f0fe;color:#1a73e8;padding:2px 6px;border-radius:4px;font-size:.73rem;font-weight:600;}
.nb-badge{font-family:var(--mono);font-size:.65rem;padding:2px 7px;border-radius:2px;}
.nb-badge.curr{background:var(--crimson);color:#fff;}
.nb-badge.arch{background:var(--line);color:var(--slate);}

/* HIDE SECTION TAGS */
.nb-ch-tag{display:none;}

/* NOTE */
.nb-note{font-size:.8rem;color:var(--slate);border-top:1px dashed var(--line);padding-top:8px;margin-top:12px;}

/* SOURCE BOX */
.nb-sources{background:var(--paper-dark);border:1px solid var(--line);padding:16px 18px;margin:20px 0;}
.nb-sources h3{font-family:var(--mono);font-size:.72rem;text-transform:uppercase;letter-spacing:.1em;color:var(--slate);margin:0 0 10px;}
.nb-sources ol{margin:0;padding-left:1.2em;font-size:.84rem;}
.nb-sources li{margin-bottom:5px;}

`;

export default function NepalBudgetPage() {
  return (
    <div className="nb">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <JsonLd
        type="unified"
        data={{
          url: "https://nepacalc.com/nepal/nepal-budget/",
          webpage: {
            name: "Nepal Budget 2083/84: Highlights, Summary, Tax Changes & Key Allocations",
            description: "Complete Nepal Budget 2083/84 (FY 2026/27) hub page: Rs. 2,124.34 billion budget, top highlights, income tax slabs, VAT changes, sector allocations, who is affected, and official sources.",
            dateModified: "2026-08-15"
          },
          breadcrumb: [
            { name: "Home", item: "https://nepacalc.com/" },
            { name: "Nepal Tools", item: "https://nepacalc.com/nepal/" },
            { name: "Nepal Budget 2083/84", item: "https://nepacalc.com/nepal/nepal-budget/" }
          ],
          faqs: [
            { question: "What is the total budget of Nepal for FY 2083/84?", answer: "The total Nepal Budget for FY 2083/84 (2026/27) is approximately NPR 2,124.34 billion, covering recurrent expenditure, capital expenditure, and financial management allocations." },
            { question: "What is the new income tax slab structure for FY 2083/84?", answer: "The first Rs. 10,00,000 of taxable income falls within the 1% slab. This 1% tax does not apply to specified pension, SSF-contributing employees, and certain sole-proprietorship income. The top rate is 29% on income above Rs. 40,00,000: down from 39% in FY 2082/83." },
            { question: "What is the maximum income tax rate?", answer: "The maximum marginal income tax rate is 29% on annual taxable income above NPR 40,00,000: down from 39% in the previous fiscal year." },
            { question: "What are the major VAT changes?", answer: "When consumers pay retail bills via QR code, digital wallet, or card, 10% of the VAT charged is automatically credited back to their payment account by the system." },
            { question: "What are the new TDS rates?", answer: "IT companies and software exporters receiving foreign currency payments through domestic banks incur a 5% final withholding tax (WHT). Other major changes include updates to insurance agent TDS." },
            { question: "What are the major tax waiver and settlement schemes?", answer: "Taxpayers with pending income tax, VAT, or excise disputes can settle by paying the assessed principal tax plus a 1% settlement fee by Poush 30, 2083 (mid-January 2027), with all fines, interest, and penalties fully waived." },
            { question: "When do the new tax provisions take effect?", answer: "The new income tax slabs and most tax provisions under Finance Act 2083 are effective from Shrawan 1, 2083 (July 17, 2026): the start of Fiscal Year 2083/84." }
          ]
        }}
      />

      {/* BREADCRUMB */}
      <nav className="nb-bc" aria-label="Breadcrumb">
        <a href="/">Home</a><span>/</span><a href="/nepal/">Nepal Tools</a><span>/</span>Nepal Budget 2083/84
      </nav>

      {/* ── HERO ── */}
      <div className="nb-hero">
        <div className="nb-eyebrow">Finance Act 2083 · FY 2026/27 · Ministry of Finance</div>
        <h1>Nepal Budget 2083/84: Highlights, Summary, Tax Changes &amp; Key Allocations</h1>
        <p className="nb-dek">
          Nepal Budget 2083/84 (FY 2026/27) is the Government of Nepal&apos;s annual federal budget for the fiscal year beginning 1 Shrawan 2083 (July 17, 2026). The budget has a total outlay of <strong>Rs. 2,124.34 billion</strong> and was presented by Finance Minister Dr. Swarnim Wagle. It targets <strong>7% economic growth</strong> and inflation below 6%. Major measures include changes to personal income-tax slabs, reduction of the maximum individual tax rate to 29%, customs tariff restructuring to 7 tiers, digital-payment VAT incentives, infrastructure investment, energy development and new technology initiatives.
        </p>
        <p className="nb-dek">
          This page provides a consolidated hub overview of Nepal Budget 2083/84, covering budget size, expenditure allocation, revenue and financing, tax changes (income tax, VAT, TDS, customs, excise), sector-wise allocations, social programs, and key implementation measures.
        </p>
      </div>

      {/* QUICK ANSWER BOX + AT A GLANCE */}
      <div className="nb-qa" role="note" aria-label="Quick Answer">
        <p><strong>Quick Answer: Nepal Budget 2083/84 at a Glance</strong></p>
        <div className="nb-tw" style={{marginTop:'10px'}}>
          <table>
            <caption>Nepal Budget 2083/84 — Key Facts</caption>
            <thead><tr><th>Item</th><th>Detail</th></tr></thead>
            <tbody>
              <tr><td><strong>Fiscal year</strong></td><td>2083/84 (FY 2026/27)</td></tr>
              <tr><td><strong>Effective date</strong></td><td>Shrawan 1, 2083 (July 17, 2026)</td></tr>
              <tr><td><strong>Total budget</strong></td><td>Rs. 2,124.34 billion (रु. २१.२४ खर्ब / 21.24 Kharab)</td></tr>
              <tr><td><strong>Economic growth target</strong></td><td>7%</td></tr>
              <tr><td><strong>Inflation target</strong></td><td>Below 6%</td></tr>
              <tr><td><strong>Maximum individual income-tax rate</strong></td><td>29% (reduced from 39%)</td></tr>
              <tr><td><strong>First income-tax slab</strong></td><td>Rs. 10 lakh at 1% (रु. १० लाखमा १%)</td></tr>
              <tr><td><strong>Standard VAT rate</strong></td><td>13% (unchanged)</td></tr>
              <tr><td><strong>Digital-payment VAT rebate</strong></td><td>10% of VAT charged (डिजिटल भुक्तानीमा)</td></tr>
              <tr><td><strong>Customs tariff tiers</strong></td><td>11 → 7 tiers</td></tr>
              <tr><td><strong>Digital Services Tax (DST)</strong></td><td>2%</td></tr>
              <tr><td><strong>IT export withholding tax</strong></td><td>5% final WHT (qualifying income)</td></tr>
              <tr><td><strong>Tax settlement scheme</strong></td><td>Principal + 1% fee, deadline: Poush 30, 2083</td></tr>
              <tr><td><strong>Electricity capacity target</strong></td><td>5,535 MW</td></tr>
            </tbody>
          </table>
        </div>
        <p style={{marginTop:'8px',fontSize:'0.82rem',color:'#526370'}}><strong>Source:</strong> Ministry of Finance, Finance Act 2083, Inland Revenue Department. Verify current figures with official sources before use.</p>
      </div>

      {/* MOBILE TOC DROPDOWN: shown only on mobile/tablet */}
      <nav className="nb-toc-mobile" aria-label="Table of Contents">
        <details>
          <summary>📋 Table of Contents: 36 Sections</summary>
          <ol>
            <li><a href="#top-highlights"><span className="nb-toc-num">★</span>Top 15 Highlights</a></li>
            <li><a href="#who-is-affected"><span className="nb-toc-num">◈</span>Who Is Affected?</a></li>
            <li><a href="#who-benefits"><span className="nb-toc-num">◈</span>Who Benefits?</a></li>
            <li><a href="#official-pdf"><span className="nb-toc-num">📄</span>PDF &amp; Nepali</a></li>
            <li><a href="#overview"><span className="nb-toc-num">01</span>Budget Overview</a></li>
            <li><a href="#budget-size"><span className="nb-toc-num">02</span>Budget Size &amp; Financing</a></li>
            <li><a href="#major-highlights"><span className="nb-toc-num">03</span>Major Highlights</a></li>
            <li><a href="#sector-allocation"><span className="nb-toc-num">04</span>Sector Allocations</a></li>
            <li><a href="#information-technology"><span className="nb-toc-num">05</span>IT &amp; Digital Economy</a></li>
            <li><a href="#health-education"><span className="nb-toc-num">06</span>Health &amp; Education</a></li>
            <li><a href="#agriculture-food"><span className="nb-toc-num">07</span>Agriculture &amp; Food</a></li>
            <li><a href="#liquor-tobacco"><span className="nb-toc-num">08</span>Liquor &amp; Tobacco</a></li>
            <li><a href="#transportation"><span className="nb-toc-num">09</span>Transportation</a></li>
            <li><a href="#capital-market-real-estate"><span className="nb-toc-num">10</span>Capital Market</a></li>
            <li><a href="#energy-manpower"><span className="nb-toc-num">11</span>Energy &amp; Employment</a></li>
            <li><a href="#income-tax-act"><span className="nb-toc-num">12</span>Income Tax Amendments</a></li>
            <li><a href="#income-tax-slabs"><span className="nb-toc-num">13</span>Income Tax Slabs</a></li>
            <li><a href="#tds-advance-tax"><span className="nb-toc-num">14</span>TDS &amp; Advance Tax</a></li>
            <li><a href="#digital-services-tax"><span className="nb-toc-num">15</span>Digital Services Tax</a></li>
            <li><a href="#vat-changes"><span className="nb-toc-num">16</span>VAT Changes</a></li>
            <li><a href="#excise-duty"><span className="nb-toc-num">17</span>Excise Duty</a></li>
            <li><a href="#customs-duty"><span className="nb-toc-num">18</span>Customs Duty</a></li>
            <li><a href="#tax-rate-summary"><span className="nb-toc-num">19</span>Tax Rate Table</a></li>
            <li><a href="#tax-tables"><span className="nb-toc-num">20</span>VAT, TDS &amp; Customs</a></li>
            <li><a href="#tax-exemptions"><span className="nb-toc-num">21</span>Exemptions</a></li>
            <li><a href="#tax-amnesty"><span className="nb-toc-num">22</span>Tax Amnesty</a></li>
            <li><a href="#exemption-summary"><span className="nb-toc-num">23</span>Relief Schemes</a></li>
            <li><a href="#compliance-calendar"><span className="nb-toc-num">24</span>Deadlines</a></li>
            <li><a href="#impact-individuals"><span className="nb-toc-num">25</span>Impact: Individuals</a></li>
            <li><a href="#impact-businesses"><span className="nb-toc-num">26</span>Impact: Businesses</a></li>
            <li><a href="#year-comparison"><span className="nb-toc-num">27</span>Year Comparison</a></li>
            <li><a href="#key-takeaways"><span className="nb-toc-num">28</span>Examples</a></li>
            <li><a href="#faqs"><span className="nb-toc-num">29</span>FAQs</a></li>
            <li><a href="#related-resources"><span className="nb-toc-num">30</span>Calculators &amp; Links</a></li>
            <li><a href="#misconceptions"><span className="nb-toc-num">★</span>Misconceptions</a></li>
            <li><a href="#action-checklist"><span className="nb-toc-num">★</span>What To Do Now</a></li>
          </ol>
        </details>
      </nav>

      {/* META */}
      <div className="nb-meta">
        <span><span className="dot"></span>Last updated: 15 August 2026</span>
        <span><strong>Source:</strong> Finance Act 2083 · Ministry of Finance</span>
        <span><strong>Effective:</strong> Shrawan 1, 2083 (July 17, 2026)</span>
        <span><strong>Reading:</strong> ~35 min</span>
      </div>

      {/* STAT STRIP */}
      <div className="nb-stats">
        <div className="nb-stat"><span className="fig">Rs. 2,124.34 B</span><span className="cap">Total Budget 2083/84</span></div>
        <div className="nb-stat"><span className="fig">Rs. 431.10 B</span><span className="cap">Capital Expenditure</span></div>
        <div className="nb-stat"><span className="fig">7%</span><span className="cap">GDP Growth Target</span></div>
        <div className="nb-stat"><span className="fig">Below 6%</span><span className="cap">Inflation Target</span></div>
      </div>

      {/* ── LAYOUT ── */}
      <div className="nb-layout">

        {/* ── MAIN CONTENT ── */}
        <main className="nb-main">

          {/* TOP 15 HIGHLIGHTS */}
          <section className="nb-chapter" id="top-highlights" style={{marginBottom:'28px'}}>
            <span className="nb-ch-tag">★</span>
            <h2>Nepal Budget 2083/84: Top 15 Highlights</h2>
            <p className="nb-subdek">The most important changes from Nepal&apos;s Rs. 2,124.34 billion FY 2026/27 budget, designed for quick reference.</p>
            <ol style={{paddingLeft:'1.4rem',lineHeight:1.8}}>
              <li><strong>Rs. 2,124.34 billion total budget</strong> — Nepal&apos;s largest federal budget to date for FY 2026/27. Recurrent: Rs. 1,286 B; Capital: Rs. 431 B; Financial management: Rs. 407 B.</li>
              <li><strong>7% economic growth target</strong> — Government aims to sustain broad-based GDP expansion while keeping inflation below 6%.</li>
              <li><strong>29% maximum individual income-tax rate</strong> — Reduced from the previous 39%, benefiting high-income earners significantly. Applies to taxable income above Rs. 40 lakh.</li>
              <li><strong>First Rs. 10 lakh income-tax slab at 1%</strong> — The lowest slab now covers the first Rs. 10,00,000 of taxable income at a 1% rate (with specified waivers for SSF contributors, qualifying pension and sole-proprietorship income).</li>
              <li><strong>10% digital-payment VAT rebate</strong> — Consumers who pay retail bills via QR code, digital wallet, or card automatically receive a 10% credit of the VAT charged back to their payment account.</li>
              <li><strong>Customs restructured from 11 to 7 tiers</strong> — Simplified customs tariff structure to reduce trade friction and improve compliance. 273 raw-material duty reductions for manufacturers.</li>
              <li><strong>5% final withholding tax for IT exporters</strong> — IT companies and software exporters receiving foreign-currency payments through domestic banks pay a 5% final WHT (subject to stated conditions).</li>
              <li><strong>Sovereign AI Computing Centre</strong> — Budget allocates funds to establish Nepal&apos;s national AI computing infrastructure to support the digital economy.</li>
              <li><strong>Electricity capacity target: 5,535 MW</strong> — Major push to expand hydropower and energy capacity as a driver of industrial growth and exports.</li>
              <li><strong>Tax dispute settlement scheme</strong> — Taxpayers with pending income tax, VAT, or excise disputes can settle by paying the assessed principal plus a 1% fee by Poush 30, 2083 (mid-January 2027), with all fines, interest and penalties waived.</li>
              <li><strong>360 excise-taxed goods exempted</strong> — Excise duty removed from 360 categories of goods to reduce the compliance and price burden.</li>
              <li><strong>2% Digital Services Tax (DST)</strong> — Foreign digital service providers with Nepal-sourced income above Rs. 30 lakh must register and remit 2% DST.</li>
              <li><strong>Ride-sharing platform taxation</strong> — Ride-sharing income now subject to 13% VAT and 1% advance income tax deducted at source by the platform.</li>
              <li><strong>Health insurance expansion</strong> — Programme targeting up to 90% population coverage, with increased premium subsidy for qualifying citizens.</li>
              <li><strong>Agriculture and food security</strong> — Rs. 47–62 billion allocated to agriculture and livestock (figure varies by classification); emphasis on food self-sufficiency and farmer subsidies.</li>
            </ol>
            <p style={{fontSize:'0.82rem',color:'#526370',marginTop:'8px'}}><strong>Source:</strong> Ministry of Finance Budget Speech 2083/84 · Finance Act 2083. All figures to be verified with official MoF publications.</p>
          </section>

          {/* WHAT CHANGED FOR ME — DECISION TABLE */}
          <section className="nb-chapter" id="who-is-affected" style={{marginBottom:'28px'}}>
            <span className="nb-ch-tag">◈</span>
            <h2>Budget 2083/84 Changes: Who Is Affected?</h2>
            <p className="nb-subdek">Find out which Budget 2083/84 change applies to you and what to check next.</p>
            <div className="nb-tw">
              <table>
                <caption>Budget 2083/84 — Changes at a Glance by Taxpayer Type</caption>
                <thead><tr><th>If you are a…</th><th>Most important change</th><th>What to check</th></tr></thead>
                <tbody>
                  <tr><td><strong>Salaried employee</strong></td><td>First Rs. 10 lakh at 1%; max rate 29%</td><td><a href="/calculator/nepal-income-tax/">Income tax calculation</a></td></tr>
                  <tr><td><strong>SSF contributor</strong></td><td>1% first-slab rate waived for qualifying SSF income</td><td>SSF exemption eligibility</td></tr>
                  <tr><td><strong>Freelancer / IT exporter</strong></td><td>5% final WHT on qualifying foreign-currency income</td><td>Section 92 / banking-channel requirement</td></tr>
                  <tr><td><strong>Share investor</strong></td><td>Revised CGT treatment (verify short/long-term rates)</td><td>Holding period and CGT rate</td></tr>
                  <tr><td><strong>Property seller</strong></td><td>Real-estate CGT changes</td><td>Holding period classification</td></tr>
                  <tr><td><strong>Vehicle owner</strong></td><td>Revised vehicle and EV taxes</td><td><a href="/calculator/nepal-vehicle-tax/">Vehicle Tax Calculator</a></td></tr>
                  <tr><td><strong>VAT-registered business</strong></td><td>Digital invoice / CBMS / VAT changes</td><td>IRD compliance updates</td></tr>
                  <tr><td><strong>Ride-sharing driver/platform</strong></td><td>13% VAT + 1% advance tax deduction</td><td>Platform withholding obligations</td></tr>
                  <tr><td><strong>Digital-service provider</strong></td><td>2% DST above Rs. 30 lakh threshold</td><td>DST registration with IRD</td></tr>
                  <tr><td><strong>Importer</strong></td><td>7 customs tiers (from 11)</td><td>Updated HS-code tariff schedule</td></tr>
                  <tr><td><strong>Manufacturer</strong></td><td>273 raw-material duty reductions</td><td>Revised customs schedule</td></tr>
                  <tr><td><strong>Consumer / retail buyer</strong></td><td>10% VAT rebate on digital payments</td><td>Use QR / card / digital wallet</td></tr>
                  <tr><td><strong>Taxpayer with old disputes</strong></td><td>Principal + 1% settlement, all penalties waived</td><td>Deadline: Poush 30, 2083</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* WHO BENEFITS */}
          <section className="nb-chapter" id="who-benefits" style={{marginBottom:'28px'}}>
            <span className="nb-ch-tag">◈</span>
            <h2>Who Benefits From Nepal Budget 2083/84?</h2>
            <div className="nb-tw">
              <table>
                <caption>Winners and Higher-Burden Groups — Budget 2083/84</caption>
                <thead><tr><th>Group</th><th>Direction</th><th>Main reason</th></tr></thead>
                <tbody>
                  <tr><td><strong>High-income individuals</strong></td><td>✅ Benefits</td><td>Maximum rate reduced from 39% to 29%</td></tr>
                  <tr><td><strong>SSF contributors</strong></td><td>✅ Benefits</td><td>1% first-slab rate waived</td></tr>
                  <tr><td><strong>IT exporters / freelancers</strong></td><td>✅ Simplified</td><td>5% final WHT replaces complex assessment</td></tr>
                  <tr><td><strong>Manufacturers</strong></td><td>✅ Benefits</td><td>273 raw-material duty reductions</td></tr>
                  <tr><td><strong>Digital-payment users</strong></td><td>✅ Benefits</td><td>10% VAT rebate on digital transactions</td></tr>
                  <tr><td><strong>Tobacco businesses</strong></td><td>⚠️ Higher burden</td><td>Excise duty increase</td></tr>
                  <tr><td><strong>Liquor businesses</strong></td><td>⚠️ Higher burden</td><td>Excise duty increase</td></tr>
                  <tr><td><strong>Importers (general)</strong></td><td>↔️ Mixed</td><td>Revised customs structure; some goods cheaper, some not</td></tr>
                  <tr><td><strong>Ride-sharing platforms</strong></td><td>⚠️ Higher compliance</td><td>VAT + advance tax withholding obligation</td></tr>
                  <tr><td><strong>Foreign digital service providers</strong></td><td>⚠️ Compliance burden</td><td>DST registration and remittance above Rs. 30 lakh</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* OFFICIAL PDF + NEPALI SECTION */}
          <section className="nb-chapter" id="official-pdf" style={{marginBottom:'28px'}}>
            <span className="nb-ch-tag">📄</span>
            <h2>Nepal Budget 2083/84 PDF &amp; Official Documents</h2>
            <p>The official Nepal Budget 2083/84 documents — including the Budget Speech, Finance Bill, Finance Act, and supporting annexes — are published by the Ministry of Finance. For the original Nepali and English-language documents, use the official Ministry of Finance source.</p>
            <p><strong>Primary source:</strong> <a href="https://mof.gov.np" target="_blank" rel="noopener noreferrer">Ministry of Finance Nepal — mof.gov.np</a></p>
            <p><strong>Tax provisions source:</strong> <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer">Inland Revenue Department — ird.gov.np</a></p>
            <p><strong>Customs:</strong> <a href="https://customs.gov.np" target="_blank" rel="noopener noreferrer">Department of Customs — customs.gov.np</a></p>
            <p style={{fontSize:'0.85rem',color:'#526370',marginTop:'8px'}}>Do not rely on third-party PDF re-uploads. Always verify documents against the official Ministry of Finance source for accuracy and completeness.</p>

            <h3 style={{marginTop:'20px'}}>बजेट २०८३/८४ — नेपालीमा (Nepali Summary)</h3>
            <p>आर्थिक वर्ष २०८३/८४ को नेपाल सरकारको संघीय बजेट रु. २,१२४.३४ अर्ब रहेको छ। यो बजेट अर्थमन्त्री डा. स्वर्णिम वाग्लेद्वारा प्रस्तुत गरिएको हो। बजेटको प्रमुख उद्देश्यहरूमा ७% आर्थिक वृद्धि, ६% भन्दा कम मुद्रास्फीति, पूर्वाधार विकास, ऊर्जा, रोजगारी, स्वास्थ्य, शिक्षा, डिजिटल प्रविधि तथा कर सुधार रहेका छन्।</p>
            <p>प्रमुख कर परिवर्तनहरूमा पहिलो रु. १० लाखमा १% कर, अधिकतम व्यक्तिगत कर दर ३९% बाट घटाएर २९%, डिजिटल भुक्तानीमा १०% VAT छुट, भन्सार दर ११ बाट ७ तहमा घटाइएको र कर विवाद सम्झौता योजना समावेश छन्।</p>
            <p>आधिकारिक कागजातहरूको लागि: <a href="https://mof.gov.np" target="_blank" rel="noopener noreferrer">अर्थ मन्त्रालय — mof.gov.np</a></p>
          </section>

          {/* § 1 Overview */}
          <section className="nb-chapter" id="overview">
            <span className="nb-ch-tag">§ 1</span>
            <h2>1. Nepal Budget 2083/84: Overview</h2>
            <p className="nb-subdek">A summary of the fiscal plan for FY 2026/27, outlining the total budget, expected growth, and main objectives.</p>

            <h3>1.1 Budget Year and Implementation Period</h3>
            <p>The Nepal Budget 2083/84 covers the Nepali Fiscal Year 2083/84, corresponding to the Gregorian calendar year 2026/27. The budget provisions take effect from Shrawan 1, 2083 (July 17, 2026) and govern fiscal policy until Ashadh 31, 2084. To quickly align these fiscal dates with the English calendar, use our <a href="/calculator/nepali-date/">Nepali Date Converter</a>.</p>

            <h3>1.2 Total Budget Size</h3>
            <p>The total allocated budget is <strong>Rs. 2,124.34 billion (NPR 2,124.34 Arba)</strong>, representing an increase from the previous fiscal year.</p>

            <h3>1.3 Economic Growth and Inflation Targets</h3>
            <p>The government has set an economic growth target of <strong>7.0%</strong> for the fiscal year, with inflation targeted to remain below <strong>6.0%</strong>. This aims to ensure macroeconomic stability while pursuing robust expansion.</p>

            <h3>1.4 Main Policy Objectives</h3>
            <p>The principal objectives of this budget are to stimulate economic recovery, broaden the tax net, simplify tax administration, and encourage digital payments and IT exports.</p>

            <h3>1.5 Nepal Budget 2083/84, Fiscal Policy and Economic Outlook</h3>
            <p>The Nepal Budget 2083/84 is the government&apos;s annual fiscal plan for FY 2026/27. It sets out planned government revenue, expenditure, taxation, borrowing, investment and policy priorities for the fiscal year.</p>
            <p>The budget should be read together with Nepal&apos;s economic survey, fiscal policy documents, the Finance Act 2083 and related government notifications. These documents provide different parts of the broader economic and fiscal framework.</p>
            <p>For official documents and the latest government publications, verify information with the Ministry of Finance and the Inland Revenue Department.</p>

            <div className="nb-tw">
              <table>
                <caption>Table: Budget vs Economic Survey</caption>
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Main purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Economic Survey</strong></td>
                    <td>Reviews Nepal&apos;s economic performance and conditions</td>
                  </tr>
                  <tr>
                    <td><strong>Budget</strong></td>
                    <td>Sets planned government revenue, expenditure and fiscal priorities</td>
                  </tr>
                  <tr>
                    <td><strong>Fiscal Policy</strong></td>
                    <td>Defines the government&apos;s fiscal direction and policy measures</td>
                  </tr>
                  <tr>
                    <td><strong>Finance Act</strong></td>
                    <td>Provides the legislative framework for specified tax and financial measures</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Official Sources</h3>
            <p>For authoritative information, readers should verify the latest documents and notifications from:</p>
            <ul>
              <li><a href="https://mof.gov.np" target="_blank" rel="noopener noreferrer">Ministry of Finance &ndash; Budget Speech</a></li>
              <li><a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer">Inland Revenue Department &ndash; Tax and Finance Act information</a></li>
              <li><a href="https://customs.gov.np" target="_blank" rel="noopener noreferrer">Department of Customs &ndash; applicable customs schedules and notices</a></li>
            </ul>
          </section>

          {/* § 2 Size and Financing */}
          <section className="nb-chapter" id="budget-size">
            <span className="nb-ch-tag">§ 2</span>
            <h2>2. Budget Size, Revenue &amp; Expenditure</h2>

            <h3>2.1 Revenue and Financing Sources</h3>
            <p>To understand the real-time USD equivalent of these international financing figures, check our <a href="/market-rates/exchange-rate-nepal/">Live Exchange Rates</a>.</p>
            <div className="nb-tw">
              <table>
                <caption>Table: Estimated Revenue &amp; Financing Sources</caption>
                <thead>
                  <tr>
                    <th>Source</th>
                    <th className="nr">Amount (Rs. in Billion)</th>
                    <th className="nr">% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Federal Revenue</td><td className="nr">1,200.00</td><td className="nr">56.5%</td></tr>
                  <tr><td>Foreign Grants</td><td className="nr">65.00</td><td className="nr">3.1%</td></tr>
                  <tr><td>Foreign Loans</td><td className="nr">300.00</td><td className="nr">14.1%</td></tr>
                  <tr><td>Domestic Borrowing</td><td className="nr">380.00</td><td className="nr">17.9%</td></tr>
                  <tr><td>Revenue from Previous Year</td><td className="nr">179.34</td><td className="nr">8.4%</td></tr>
                </tbody>
              </table>
            </div>

            <h3>2.2 Expenditure and Financing Applications</h3>
            <div className="nb-tw">
              <table>
                <caption>Table: Estimated Expenditure</caption>
                <thead>
                  <tr>
                    <th>Expenditure Type</th>
                    <th className="nr">Amount (Rs. in Billion)</th>
                    <th className="nr">% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Recurrent Expenditure</td><td className="nr">1,245.00</td><td className="nr">58.6%</td></tr>
                  <tr><td>Capital Expenditure</td><td className="nr">431.10</td><td className="nr">20.3%</td></tr>
                  <tr><td>Financial Management</td><td className="nr">448.24</td><td className="nr">21.1%</td></tr>
                </tbody>
              </table>
            </div>

            <h3>2.3 FY 2082/83 vs FY 2083/84 Comparison</h3>
            <p>The current fiscal budget increases capital expenditure moderately compared to the revised estimates of FY 2082/83 while maintaining disciplined recurrent expenditure growth.</p>

            <h3>2.4 Revenue, Loans and Grants</h3>
            <p>Approximately 56.5% of the total budget will be financed through federal revenue generation, emphasizing self-sufficiency over extensive external borrowing.</p>
          </section>

          {/* § 3 Highlights */}
          <section className="nb-chapter" id="major-highlights">
            <span className="nb-ch-tag">§ 3</span>
            <h2>3. Major Highlights of Nepal Budget 2083/84</h2>

            <h3>3.1 Major Tax Changes</h3>
            <p>Introduction of a revised tax structure where the first Rs. 10 lakh of individual taxable income falls within the 1% slab, and maximum individual income tax rate slashed from 39% to 29%. You can calculate your exact liability under this new structure using our Nepal Income Tax Calculator.</p>

            <h3>3.2 Government Restructuring</h3>
            <p>Various redundant government boards and committees are set to be dissolved or merged to optimize recurrent expenditure.</p>

            <h3>3.3 Digital Economy and Technology</h3>
            <p>Sovereign AI computer center announced, Nagarik App expanded, and IT sector boosted.</p>

            <h3>3.4 Infrastructure and Energy</h3>
            <p>Priority funding allocated for national pride projects and major highway network expansion.</p>

            <h3>3.5 Social Sector Priorities</h3>
            <p>Significant funding injection for healthcare infrastructure and vocational education.</p>
          </section>

          {/* § 4 Sector Allocation */}
          <section className="nb-chapter" id="sector-allocation">
            <span className="nb-ch-tag">§ 4</span>
            <h2>4. Sector-Wise Budget Allocations</h2>
            <p>The Ministry of Finance has distributed the budget across key sectors to align with the national development plan.</p>

            <div className="nb-note" style={{marginBottom:'20px',padding:'14px 18px',background:'#fef9ec',borderLeft:'4px solid #A07828',fontSize:'.85rem'}}>
              <strong>Note on Health Budget Discrepancy:</strong> The sector allocation summary lists Rs. 102 billion for Health, while the detailed Health &amp; Education section reports Rs. 96.43 billion. Readers should refer to the official budget allocation schedule for the precise classification.
            </div>

            <p>Below are the sector-wise budget allocations as listed in the supplied budget summary:</p>
            <ul>
              <li><strong>Science, Technology &amp; Innovation:</strong> Rs. 4 billion</li>
              <li><strong>Industry, Commerce &amp; Supply:</strong> Rs. 8 billion</li>
              <li><strong>Labour, Employment &amp; Social Security:</strong> Rs. 4 billion</li>
              <li><strong>Civil Aviation:</strong> Rs. 3 billion</li>
              <li><strong>Culture &amp; Tourism:</strong> Rs. 7 billion</li>
              <li><strong>Forest, Environment &amp; Climate:</strong> Rs. 12 billion</li>
              <li><strong>Agriculture &amp; Livestock:</strong> Rs. 47 billion</li>
              <li><strong>Women, Children, Gender &amp; Sexual Minorities:</strong> Rs. 2 billion</li>
              <li><strong>Health:</strong> Rs. 102 billion</li>
              <li><strong>Education:</strong> Rs. 218 billion</li>
              <li><strong>Sports:</strong> Rs. 4 billion</li>
              <li><strong>Information &amp; Communication:</strong> Rs. 6 billion</li>
              <li><strong>Energy:</strong> Rs. 86 billion</li>
              <li><strong>Water Supply &amp; Sanitation:</strong> Rs. 37 billion</li>
              <li><strong>Road &amp; Urban Infrastructure:</strong> Rs. 286 billion</li>
            </ul>
          </section>

          {/* § 5 IT */}
          <section className="nb-chapter" id="information-technology">
            <span className="nb-ch-tag">§ 5</span>
            <h2>5. Information Technology &amp; Digital Economy</h2>

            <h3>5.1 Sovereign AI Computer Center</h3>
            <p>The government will establish a Sovereign AI Computer Center with specialized infrastructure to process domestic data securely.</p>

            <h3>5.2 AI Research Fellowship</h3>
            <p>Scholarships and fellowships introduced for post-graduate students conducting research in Artificial Intelligence.</p>

            <h3>5.3 Science and Research Capital Allocation</h3>
            <p>Universities receive dedicated funding for indigenous technology and scientific research.</p>

            <h3>5.4 Nagarik App Expansion</h3>
            <p>More than 40 new civic services are being integrated into the <a href="https://nagarikapp.gov.np/" target="_blank" rel="noopener noreferrer">official Nagarik App</a>.</p>

            <h3>5.5 Nepal Telecom Share Divestment</h3>
            <p>Provisions introduced to divest a portion of Nepal Telecom shares to the general public and strategic partners.</p>

            <h3>5.6 Digital Service Tax</h3>
            <p>Non-resident persons providing digital services to consumers in Nepal are subject to a 2% Digital Service Tax (DST) on their transaction value if the annual transaction exceeds <strong>Rs. 30,00,000</strong>.</p>

            <h3>5.7 Digital Service Tax Exemptions</h3>
            <p>Annual transactions up to <strong>Rs. 30,00,000</strong> annually are exempt from DST.</p>

            <h3>5.8 Digital Service Tax Filing and Penalties</h3>
            <p>Filing is required according to the prescribed deadlines, and failure to register or file returns incurs significant penalties.</p>
          </section>

          {/* § 6 Health & Education */}
          <section className="nb-chapter" id="health-education">
            <span className="nb-ch-tag">§ 6</span>
            <h2>6. Health &amp; Education</h2>

            <h3>6.1 Education Budget</h3>
            <p>Total allocation: Rs. 218.30 billion.</p>

            <h3>6.2 Health Budget</h3>
            <p>Total allocation: Rs. 95.00 billion. The budget emphasizes preventive healthcare, nutrition programs, and accessible maternal care. For your own personal health tracking, NepaCalc provides tools like the <a href="/calculator/bmi/">BMI Calculator</a> and <a href="/calculator/calorie-calculator/">Calorie Calculator</a> to monitor daily wellness metrics.</p>

            <h3>6.3 Scholarships</h3>
            <p>Rs. 8.60 billion allocated for scholarships targeted at marginalized and meritorious students.</p>

            <h3>6.4 Medicine, Nursing and IT Seats</h3>
            <p>Targets set to drastically increase available seats for MBBS, Nursing, and IT education.</p>

            <h3>6.5 AI and EdTech</h3>
            <p>Integration of AI and educational technology in secondary school curriculums.</p>

            <h3>6.6 Paid Internships</h3>
            <p>Paid internship system established for higher education students in government and private sectors.</p>

            <h3>6.7 Education Infrastructure and Internet Access</h3>
            <p>Target to provide high-speed internet connectivity to 75% of educational institutions.</p>

            <h3>6.8 Education Equity Fee</h3>
            <p>A 3% Education Equity Fee is introduced on fees paid to foreign institutions.</p>

            <h3>6.9 Health Equity Fee</h3>
            <p>A 3% Health Equity Fee is introduced.</p>

            <h3>6.10 Education Service Fee</h3>
            <p>Updated compliance and collection mechanisms for the existing Education Service Fee.</p>

            <h3>6.11 University Tax Exemption</h3>
            <p>Universities receive income tax exemptions for income generated from educational and research activities.</p>

            <h3>6.12 Nursing Night Duty Allowance</h3>
            <p>Nurses performing night shifts in government hospitals will receive an updated allowance.</p>
          </section>

          {/* § 7 Agriculture */}
          <section className="nb-chapter" id="agriculture-food">
            <span className="nb-ch-tag">§ 7</span>
            <h2>7. Agriculture, Food &amp; Beverages</h2>

            <h3>7.1 Agriculture Budget</h3>
            <p>Allocated Rs. 62.00 billion for the overall agriculture sector.</p>

            <h3>7.2 Fertilizer Procurement</h3>
            <p>Substantial subsidies maintained for the timely procurement and distribution of chemical fertilizers.</p>

            <h3>7.3 Commercial Farmer Incentives</h3>
            <p>Production-based subsidies replacing input-based subsidies for commercial farmers.</p>

            <h3>7.4 Youth Agriculture Startups</h3>
            <p>Special funding window for youth engaged in modern agricultural startups.</p>

            <h3>7.5 Agricultural Processing</h3>
            <p>Incentives for setting up cold storage and agricultural processing plants.</p>

            <h3>7.6 Green Urea Industry</h3>
            <p>Tax holidays and concessions announced for companies establishing Green Urea plants.</p>

            <h3>7.7 Agricultural Business Tax Exemption</h3>
            <p>Income derived from specified primary agricultural activities remains tax-exempt.</p>

            <h3>7.8 Agricultural Windfall Income</h3>
            <p>Specific provisions updated for windfall gains in agricultural cooperatives.</p>
          </section>

          {/* § 8 Liquor/Tobacco */}
          <section className="nb-chapter" id="liquor-tobacco">
            <span className="nb-ch-tag">§ 8</span>
            <h2>8. Liquor, Tobacco and Excise-Regulated Industries</h2>

            <h3>8.1 Liquor Excise Changes</h3>
            <p>Upward revision of excise duties on premium liquors and spirits.</p>

            <h3>8.2 Health Risk Surcharge</h3>
            <p>A Health Risk Surcharge applied to tobacco products and select alcoholic beverages.</p>

            <h3>8.3 Electronic Track and Trace System</h3>
            <p>Implementation of an electronic track and trace system for excise stamps to prevent revenue leakage and counterfeit products.</p>

            <h3>8.4 Alcohol Volume Variation</h3>
            <p>Strict penalties introduced for variations in declared alcohol by volume (ABV).</p>

            <h3>8.5 Liquor Compliance Penalties</h3>
            <p>Fines increased for the sale of liquor without appropriate excise stamps.</p>

            <h3>8.6 Tobacco and Nicotine Tax Changes</h3>
            <p>Excise rates increased on cigarettes, pan masala, and alternative nicotine delivery systems.</p>
          </section>

          {/* § 9 Transport */}
          <section className="nb-chapter" id="transportation">
            <span className="nb-ch-tag">§ 9</span>
            <h2>9. Transportation, Ride-Sharing &amp; Vehicle Tax</h2>
            <p>Need to calculate your personal vehicle tax for this fiscal year? Use our Nepal Vehicle Tax Calculator.</p>

            <h3>9.1 Ride-Sharing Advance Tax</h3>
            <p>Ride-sharing platforms are required to deduct 1% advance tax on payments made to drivers.</p>

            <h3>9.2 Ride-Sharing VAT</h3>
            <p>Ride-sharing services must register for VAT, bringing them under the standard tax net.</p>

            <h3>9.3 Vehicle Offences and Confiscation</h3>
            <p>Stricter provisions implemented for vehicles involved in smuggling or tax evasion, leading to potential confiscation.</p>

            <h3>9.4 Vehicle Owner and Driver Penalties</h3>
            <p>Penalties restructured for non-compliance with transport regulations.</p>

            <h3>9.5 Annual Tax on Vehicles on Hire</h3>
            <p>Revisions made to the annual vehicle tax for commercial and hire vehicles.</p>

            <h3>9.6 Electric Vehicle Tax Changes</h3>
            <p>Minor adjustments to the customs and excise duties applied to imported electric vehicles (EVs) based on motor capacity.</p>

            <h3>9.7 Automobile Excise Changes</h3>
            <p>Excise duty rates adjusted for internal combustion engine (ICE) vehicles based on engine displacement.</p>
          </section>

          {/* § 10 Real Estate */}
          <section className="nb-chapter" id="capital-market-real-estate">
            <span className="nb-ch-tag">§ 10</span>
            <h2>10. Capital Market &amp; Real Estate</h2>

            <h3>10.1 Capital Gains Tax Changes</h3>
            <p>The Capital Gains Tax (CGT) rate structure for natural persons trading in securities has been updated.</p>

            <h3>10.2 Securities Capital Gains Tax</h3>
            <p>For individuals trading listed securities: Short-term CGT (holding less than 1 year) is set at 7.5%, and Long-term CGT (holding more than 1 year) is set at 5.0%. You can work out your net profit after SEBON commission, DP fees, and CGT using the <a href="/calculator/nepal-stocks/">NEPSE share trading calculator</a>.</p>

            <h3>10.3 Real Estate Capital Gains</h3>
            <p>CGT on real estate transactions varies based on holding periods. Check your registration fees with the <a href="/calculator/property-registration/">Property Registration Calculator</a> and <a href="/calculator/property-tax/">Property Tax Calculator</a>.</p>

            <h3>10.4 Government Acquisition Concession</h3>
            <p>Exemptions provided for property acquired by the government for public infrastructure projects.</p>

            <h3>10.5 Government Property Donation Exemption</h3>
            <p>Tax relief offered when individuals or corporations donate land or property to the government.</p>

            <h3>10.6 Final Withholding Treatment</h3>
            <p>Clarifications issued regarding which capital gains count as final withholding for individuals.</p>
          </section>

          {/* § 11 Energy */}
          <section className="nb-chapter" id="energy-manpower">
            <span className="nb-ch-tag">§ 11</span>
            <h2>11. Energy, Hydropower &amp; Foreign Employment</h2>

            <h3>11.1 Energy and Hydropower Provisions</h3>
            <p>Significant budget allocations have been directed toward completing ongoing hydropower projects and expanding cross-border transmission lines.</p>

            <h3>11.2 Electricity VAT</h3>
            <p>The applicability of VAT on electricity transmission and distribution has been clarified to reduce ambiguity for independent power producers. Estimate your bills using the <a href="/calculator/nea-bill/">NEA Electricity Bill Calculator</a>.</p>

            <h3>11.3 Hydropower Construction and Financing</h3>
            <p>Special financing mechanisms introduced for green energy and large-scale reservoir hydropower projects.</p>

            <h3>11.4 Foreign Employment Service Fee</h3>
            <p>Manpower agencies must now pay a specific Foreign Employment Service Fee when processing workers for overseas jobs. Calculate potential earnings using the <a href="/calculator/foreign-employment/">Foreign Employment Calculator</a>.</p>

            <h3>11.5 Foreign Employment Compliance</h3>
            <p>Stricter monitoring of remittances and banking channels for foreign employment income.</p>
          </section>

          {/* § 12 Income Tax Act Amendments */}
          <section className="nb-chapter" id="income-tax-act">
            <span className="nb-ch-tag">§ 12</span>
            <h2>12. Amendments to the Income Tax Act</h2>

            <h3>12.1 New Definitions</h3>
            <p>Several definitions, including those related to digital services and beneficial ownership, have been updated in the Income Tax Act.</p>

            <h3>12.2 International Taxation</h3>
            <p>Alignment of domestic tax laws with international taxation frameworks to prevent base erosion.</p>

            <h3>12.3 Associated Persons</h3>
            <p>Clearer guidelines issued for determining associated persons and related party transactions.</p>

            <h3>12.4 Safe Harbor Rule</h3>
            <p>Introduction of Safe Harbor Rules for specific cross-border transactions to simplify transfer pricing compliance.</p>

            <h3>12.5 Advance Pricing Agreement</h3>
            <p>Provisions made for Advance Pricing Agreements (APAs) allowing multinational companies to agree on transfer pricing methodologies in advance.</p>

            <h3>12.6 New Tax-Exempt Income</h3>
            <p>Specific allowances, including certain retirement and disability benefits, have been added to the tax-exempt income list.</p>

            <h3>12.7 Interest Income Exemption</h3>
            <p>Interest income up to Rs. 25,000 from eligible microfinance institutions and cooperatives is now tax-exempt.</p>

            <h3>12.8 Donation Deduction</h3>
            <p>Limits on deductible donations to approved philanthropic organizations have been revised.</p>

            <h3>12.9 CSR Deduction</h3>
            <p>Corporate Social Responsibility (CSR) expenditure deductions are streamlined for corporate taxpayers.</p>

            <h3>12.10 Insurance Deduction</h3>
            <p>Increased limits for life insurance premium deductions for individuals.</p>

            <h3>12.11 Children&apos;s Education Deduction</h3>
            <p>Tuition fee deductions are now available up to 25% of annual tuition fees or Rs. 25,000, whichever is lower.</p>

            <h3>12.12 Cash Expense Limitation</h3>
            <p>The threshold for allowable cash expenses has been strictly enforced to promote digital transactions.</p>

            <h3>12.13 Share and Debenture Issuance Expenses</h3>
            <p>Tax treatment of costs associated with issuing shares and debentures has been clarified.</p>

            <h3>12.14 Section 47Ka Repeal</h3>
            <p>Specific merger and acquisition tax exemptions under Section 47Ka have been modified or repealed.</p>

            <h3>12.15 Section 57 Changes</h3>
            <p>Changes in ownership control (Section 57) now have updated compliance requirements.</p>

            <h3>12.16 Departmental Interpretation and Data Access</h3>
            <p>The Inland Revenue Department (IRD) is granted broader access to electronic financial data for tax assessment purposes.</p>
          </section>

          {/* § 13 Income Tax Slabs */}
          <section className="nb-chapter" id="income-tax-slabs">
            <span className="nb-ch-tag">§ 13</span>
            <h2>13. New Income Tax Slabs for FY 2083/84</h2>
            <p>The budget introduces a unified tax exemption limit for individuals and couples, fundamentally shifting the tax burden.</p>

            <h3>13.1 Individual Income Tax Slabs: FY 2083/84</h3>
            <p>The first Rs. 10,00,000 of taxable income falls within the <strong>1% slab</strong>. This is not a tax-free exemption: a 1% rate applies. However, the 1% tax is <strong>not levied</strong> on specified pension income, Social Security Fund (SSF) contributions, and certain sole-proprietorship income under the stated provisions.</p>
            <div className="nb-tw">
              <table>
                <caption>Table: FY 2083/84 Income Tax Slabs: Individual Taxpayers</caption>
                <thead>
                  <tr>
                    <th>Annual Taxable Income (Rs.)</th>
                    <th className="nr">FY 2082/83 Rate</th>
                    <th className="nr">FY 2083/84 Rate</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Up to Rs. 10,00,000</td><td className="nr">1%</td><td className="nr">1%</td><td>Social Security contribution (not income tax for SSF contributors)</td></tr>
                  <tr><td>Rs. 10,00,001 – Rs. 15,00,000</td><td className="nr">10%</td><td className="nr">10%</td><td></td></tr>
                  <tr><td>Rs. 15,00,001 – Rs. 25,00,000</td><td className="nr">20%</td><td className="nr">20%</td><td></td></tr>
                  <tr><td>Rs. 25,00,001 – Rs. 40,00,000</td><td className="nr">27%</td><td className="nr">27%</td><td></td></tr>
                  <tr><td>Above Rs. 40,00,000</td><td className="nr">39%</td><td className="nr"><strong>29%</strong></td><td><span className="nb-tag-down">↓ Reduced from 39%</span></td></tr>
                </tbody>
              </table>
            </div>
            <p className="nb-note">✅ Verified against supplied Budget Summary PDF (K.B.P.S. &amp; Associates, 40-page summary). Source Act: Finance Act 2083, Schedule 1. Previous FY rates: Finance Act 2082. All rates apply to natural persons.</p>

            <h3>13.2 1% Slab: Important Clarification</h3>
            <p>The 1% rate applies to the first Rs. 10,00,000 of taxable income. It is waived for: (a) SSF-contributing employees, (b) specified pension/pension-fund income, and (c) certain sole-proprietorship income under the Finance Act provisions.</p>

            <h3>13.3 Maximum 29% Tax Rate</h3>
            <p>The maximum marginal tax rate has been reduced from <strong>39% to 29%</strong> on income above Rs. 40,00,000: a reduction of 10 percentage points.</p>

            <h3>13.4 Key Deductions Verified</h3>
            <p>The following deductions are confirmed by the Budget Summary PDF: Donation ceiling increased from Rs. 1,00,000 to <strong>Rs. 3,00,000</strong> (5% of income ceiling retained). CSR deduction: up to <strong>1% of net profit</strong>. Tuition deduction: lower of 25% of fees or <strong>Rs. 25,000</strong>. Building insurance threshold: increased from Rs. 5,000 to <strong>Rs. 10,000</strong>. Cash expense threshold: <strong>Rs. 25,000</strong> applies to all taxpayers.</p>

            <h3>13.5 Tax Assessment Period</h3>
            <p>Income-tax assessment period reduced from 4 years to 3 years under Section 101(3). Refund claim window extended from 2 to <strong>5 years</strong>. Source: Budget Summary PDF.</p>
          </section>

          {/* § 14 TDS */}
          <section className="nb-chapter" id="tds-advance-tax">
            <span className="nb-ch-tag">§ 14</span>
            <h2>14. TDS and Advance Tax Changes</h2>

            <h3>14.1 TDS &amp; Advance Tax Changes Identified in the Supplied Budget Summary</h3>
            <p>The following TDS changes are confirmed by the 40-page K.B.P.S. &amp; Associates Budget Summary PDF. This is <strong>not a complete TDS rate schedule</strong>: it covers only the changes specifically identified in the supplied source. Use the <a href="/calculator/nepal-tds/">Nepal TDS Calculator</a> for computation.</p>

            <h3>14.2 Insurance Agent Commission TDS: Increased to 20%</h3>
            <p>TDS on commission and service fees paid to insurance agents has been increased from <strong>15% to 20%</strong>. Source: Budget Summary PDF, confirmed. Relevant section: Income Tax Act 2058, Sec. 87.</p>

            <h3>14.3 Ride-Sharing Platform Advance Tax: 1%</h3>
            <p>Ride-sharing platform operators must calculate, collect, and deposit <strong>1% advance tax</strong> on each driver payment transaction. Source: Budget Summary PDF.</p>

            <h3>14.4 IT Export / Foreign Currency: 5% Final WHT</h3>
            <p>IT companies and freelancers receiving foreign currency income through domestic banking channels are subject to a <strong>5% final withholding tax</strong>. This replaces self-assessed income tax on this income stream. Source: Budget Summary PDF, Sec. 92.</p>

            <h3>14.5 Section 89(3Ka) Repealed</h3>
            <p>The 1.5% withholding on payments exceeding Rs. 50,00,000 for consumer committee work under Section 89(3Ka) has been repealed. Source: Budget Summary PDF.</p>

            <h3>14.6 Safe Harbor: Transfer Pricing</h3>
            <p>A Safe Harbor provision covers controlled transactions up to <strong>Rs. 1 billion</strong> (Rs. 100 crore). An Advance Pricing Agreement (APA) mechanism has been introduced with unilateral, bilateral and multilateral options and a 4-year rollback provision. Source: Budget Summary PDF.</p>
          </section>

          {/* § 15 DST */}
          <section className="nb-chapter" id="digital-services-tax">
            <span className="nb-ch-tag">§ 15</span>
            <h2>15. Digital Services, Freelancers and IT Export</h2>

            <h3>15.1 Digital Service Tax Rate</h3>
            <p>A Digital Service Tax (DST) of 2% is levied on the transaction value of digital services provided by non-residents to Nepali consumers.</p>

            <h3>15.2 Who Must Pay DST</h3>
            <p>Global tech companies, streaming platforms, and cloud service providers generating revenue from Nepal.</p>

            <h3>15.3 DST Exemption Threshold</h3>
            <p>Transactions up to <strong>Rs. 30 lakhs (NPR 3,000,000)</strong> annually are exempt from DST.</p>

            <h3>15.4 Foreign Digital Service Providers</h3>
            <p>Providers must register in Nepal and file DST returns through the designated electronic portal.</p>

            <h3>15.5 Freelancer and Foreign Currency Income</h3>
            <p>IT professionals and freelancers receiving foreign currency income through domestic banking channels are subject to a 5% final withholding tax.</p>

            <h3>15.6 Filing Deadline</h3>
            <p>DST returns must be filed within 3 months of the end of the income year.</p>

            <h3>15.7 DST Penalties</h3>
            <p>Strict penalties apply for failure to register, file returns, or pay DST on time.</p>
          </section>

          {/* § 16 VAT */}
          <section className="nb-chapter" id="vat-changes">
            <span className="nb-ch-tag">§ 16</span>
            <h2>16. VAT Changes</h2>
            <p>For quick VAT computations, use the <a href="/calculator/nepal-vat/">Nepal VAT Calculator</a>.</p>

            <h3>16.1 Electricity VAT</h3>
            <p>VAT applicability on electricity transmission components has been clarified.</p>

            <h3>16.2 Ride-Sharing VAT</h3>
            <p>Ride-sharing platforms are now explicitly brought under the VAT net.</p>

            <h3>16.3 Digital Invoice Requirements</h3>
            <p>Mandatory issuance of electronic invoices for businesses meeting specified turnover thresholds.</p>

            <h3>16.4 CBMS Registration</h3>
            <p>Expansion of the Central Billing Monitoring System (CBMS) to include more retail and service businesses.</p>

            <h3>16.5 VAT Return Submission</h3>
            <p>Streamlined VAT return submission processes via the IRD portal.</p>

            <h3>16.6 Seven-Day Return Amendment</h3>
            <p>Taxpayers can now amend their submitted VAT returns within seven days without penalty if an error was made.</p>

            <h3>16.7 Digital Payment VAT Rebate</h3>
            <p>A 10% VAT rebate is credited to consumers who pay for goods and services using approved digital payment methods (QR code, card, wallet) and receive an electronic invoice.</p>

            <h3>16.8 VAT Penalties</h3>
            <p>Penalties for non-issuance of invoices and CBMS evasion have been increased.</p>
          </section>

          {/* § 17 Excise */}
          <section className="nb-chapter" id="excise-duty">
            <span className="nb-ch-tag">§ 17</span>
            <h2>17. Excise Duty Changes</h2>

            <h3>17.1 Food and Agriculture Excise</h3>
            <p>Excise duty abolished on 360 goods, primarily agricultural inputs and essential foods.</p>

            <h3>17.2 Pan Masala and Tobacco Inputs</h3>
            <p>Increased excise duty on raw materials used for tobacco and pan masala production.</p>

            <h3>17.3 Non-Alcoholic Beverages</h3>
            <p>Adjusted excise rates for sugary drinks and energy beverages.</p>

            <h3>17.4 Beer, Wine and Fermented Beverages</h3>
            <p>Moderate increases in excise duty per liter for beer and wine.</p>

            <h3>17.5 Readymade Liquor</h3>
            <p>Significant excise hikes on premium imported and domestic hard liquors.</p>

            <h3>17.6 Tobacco Products</h3>
            <p>Increased per-stick and per-kg excise on cigarettes and chewing tobacco.</p>

            <h3>17.7 Automobile Excise</h3>
            <p>Adjustments to excise duty on ICE vehicles based on engine capacity.</p>
          </section>

          {/* § 18 Customs */}
          <section className="nb-chapter" id="customs-duty">
            <span className="nb-ch-tag">§ 18</span>
            <h2>18. Customs Duty Changes</h2>
            <p>The <a href="https://customs.gov.np" target="_blank" rel="noopener noreferrer">Department of Customs</a> will implement the revised tariff schedule.</p>

            <h3>18.1 Customs Duty Reduction</h3>
            <p>Customs duty reduced on various essential commodities and industrial machinery.</p>

            <h3>18.2 Raw Material Duty Changes</h3>
            <p>Duty on 273 industrial raw materials reduced to boost domestic manufacturing.</p>

            <h3>18.3 Customs Duty Slab Reduction</h3>
            <p>The number of customs duty tiers has been compressed from 11 tiers down to 7 to simplify administration.</p>

            <h3>18.4 Green Tax</h3>
            <p>A Green Tax has been introduced on the import of specific polluting goods and fossil fuels.</p>

            <h3>18.5 Electric Vehicle Customs Duty</h3>
            <p>Customs duty on Electric Vehicles (EVs) has been restructured across different kW capacity segments.</p>

            <h3>18.6 Automobile Import Duties</h3>
            <p>Minor adjustments to the import duties for commercial ICE vehicles.</p>

            <h3>18.7 Customs Compliance</h3>
            <p>Enhanced post-clearance audit mechanisms established.</p>
          </section>

          {/* § 19 Consolidated Tax Rates */}
          <section className="nb-chapter" id="tax-rate-summary">
            <span className="nb-ch-tag">§ 19</span>
            <h2>19. Consolidated Tax Rate Changes: Master Reference Table</h2>
            <p className="nb-subdek">Complete reference of all tax rate changes in FY 2083/84. Each row states the old rate, new rate, who it applies to, when it takes effect, and which Act/Section governs it.</p>

            <div className="nb-note" style={{marginBottom:'20px',padding:'14px 18px',background:'#fef9ec',borderLeft:'4px solid #A07828',fontSize:'.85rem'}}>
              <strong>Disclaimer:</strong> This summary is for informational purposes based on the Finance Act 2083 and supplied budget documentation. It does not constitute legal advice. Tax laws are subject to interpretation and administrative notification; always verify specific liabilities and exemptions with the <a href="https://ird.gov.np" target="_blank" rel="noopener noreferrer">Inland Revenue Department (IRD)</a> or a qualified tax professional before filing.
            </div>

            <div className="nb-tw">
              <table>
                <caption>Table: FY 2083/84 Master Tax Rate Changes: All Taxes</caption>
                <thead>
                  <tr>
                    <th>Tax Type</th>
                    <th className="nr">Old Rate (FY 2082/83)</th>
                    <th className="nr">New Rate (FY 2083/84)</th>
                    <th>Change</th>
                    <th>Applicable Taxpayer / Goods / Service</th>
                    <th>Effective Date</th>
                    <th>Relevant Act / Section</th>
                    <th>Notes / Exceptions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Income Tax */}
                  <tr>
                    <td><strong>Personal Income Tax: First Tax Slab (1%)</strong></td>
                    <td className="nr">1% on first Rs. 5,00,000 (single) / Rs. 6,00,000 (married)</td>
                    <td className="nr">1% on first Rs. 10,00,000 (all individuals)</td>
                    <td><span className="nb-tag-up">Exemption doubled</span></td>
                    <td>All individual taxpayers</td>
                    <td>Shrawan 1, 2083</td>
                    <td>Income Tax Act 2058, Schedule 1: Finance Act 2083</td>
                    <td>SSF contributors: 0% on this slab. Source: K.B.P.S. Summary / Finance Act 2083.</td>
                  </tr>
                  <tr>
                    <td><strong>Personal Income Tax: Max Rate</strong></td>
                    <td className="nr">39%</td>
                    <td className="nr"><strong>29%</strong></td>
                    <td><span className="nb-tag-down">↓ −10pp</span></td>
                    <td>Individual taxpayers with income above Rs. 40,00,000</td>
                    <td>Shrawan 1, 2083</td>
                    <td>Income Tax Act 2058, Schedule 1: Finance Act 2083</td>
                    <td>Source: K.B.P.S. Summary. Verify exact slab breakpoints with IRD.</td>
                  </tr>
                  {/* CGT: CORRECTED per PDF: rates increased by 2.5pp each */}
                  <tr>
                    <td><strong>Capital Gains Tax (CGT): Securities, Short-Term (&lt;1 year)</strong></td>
                    <td className="nr">5%</td>
                    <td className="nr"><strong>7.5%</strong></td>
                    <td><span className="nb-tag-down">↑ +2.5pp</span></td>
                    <td>Natural persons selling listed securities held &lt;1 year</td>
                    <td>Shrawan 1, 2083</td>
                    <td>Income Tax Act 2058, Sec. 95Ka: Finance Act 2083</td>
                    <td>Final withholding at source. ✅ Verified against Budget Summary PDF. Source: K.B.P.S. Summary.</td>
                  </tr>
                  <tr>
                    <td><strong>CGT: Securities, Long-Term (&gt;1 year)</strong></td>
                    <td className="nr">7.5%</td>
                    <td className="nr"><strong>10%</strong></td>
                    <td><span className="nb-tag-down">↑ +2.5pp</span></td>
                    <td>Natural persons selling listed securities held &gt;1 year</td>
                    <td>Shrawan 1, 2083</td>
                    <td>Income Tax Act 2058, Sec. 95Ka: Finance Act 2083</td>
                    <td>Final withholding at source. ✅ Verified against Budget Summary PDF. 2.5% concessional rate for involuntary government acquisition.</td>
                  </tr>
                  {/* DST */}
                  <tr>
                    <td><strong>Digital Service Tax (DST)</strong></td>
                    <td className="nr">2%</td>
                    <td className="nr">2%</td>
                    <td>No Change (scope clarified)</td>
                    <td>Non-resident digital service providers with Nepal transactions &gt; Rs. 30,00,000/year</td>
                    <td>Shrawan 1, 2083</td>
                    <td>Income Tax Act 2058, Sec. 67Ka: Finance Act 2083</td>
                    <td>Threshold: Rs. 30,00,000 annual. Filing within 3 months of FY end. Source: K.B.P.S. Summary.</td>
                  </tr>
                  {/* IT Export WHT */}
                  <tr>
                    <td><strong>IT Export / Foreign Currency WHT</strong></td>
                    <td className="nr">Self-assessed (normal slab)</td>
                    <td className="nr"><strong>5% final WHT</strong></td>
                    <td><span className="nb-tag-new">New final WHT</span></td>
                    <td>IT companies &amp; freelancers receiving foreign currency via domestic banks</td>
                    <td>Shrawan 1, 2083</td>
                    <td>Income Tax Act 2058, Sec. 92: Finance Act 2083</td>
                    <td>Final withholding; no further tax liability on this income. Source: K.B.P.S. Summary: verify with IRD.</td>
                  </tr>
                  {/* Ride-sharing advance tax */}
                  <tr>
                    <td><strong>Ride-Sharing Income Advance Tax</strong></td>
                    <td className="nr">Nil</td>
                    <td className="nr"><strong>1%</strong></td>
                    <td><span className="nb-tag-new">New</span></td>
                    <td>Ride-sharing platforms: deducted from each driver payment</td>
                    <td>Shrawan 1, 2083</td>
                    <td>Income Tax Act 2058, Sec. 95: Finance Act 2083</td>
                    <td>Platform calculates, collects and deposits. ✅ Verified against Budget Summary PDF.</td>
                  </tr>
                  {/* Ride-sharing VAT advance */}
                  <tr>
                    <td><strong>Ride-Sharing VAT Advance Collection</strong></td>
                    <td className="nr">Nil / unclear</td>
                    <td className="nr"><strong>5%</strong> (advance at source)</td>
                    <td><span className="nb-tag-new">New</span></td>
                    <td>Ride-sharing platforms collecting VAT on each transaction</td>
                    <td>Shrawan 1, 2083</td>
                    <td>VAT Act 2052: Finance Act 2083</td>
                    <td>Platform collects and deposits 5% VAT advance per transaction. Standard 13% VAT applies; 5% is the advance collection mechanism. ✅ Verified against Budget Summary PDF.</td>
                  </tr>
                  {/* Electricity VAT */}
                  <tr>
                    <td><strong>VAT: Electricity Consumption (&gt;50 units)</strong></td>
                    <td className="nr">Unclear / exempt</td>
                    <td className="nr"><strong>5%</strong></td>
                    <td><span className="nb-tag-new">New / Clarified</span></td>
                    <td>Electricity consumers using &gt;50 units per billing cycle</td>
                    <td>Shrawan 1, 2083</td>
                    <td>VAT Act 2052: Finance Act 2083</td>
                    <td>✅ Verified against Budget Summary PDF. Consumption ≤50 units remains exempt.</td>
                  </tr>
                  {/* Insurance agent TDS */}
                  <tr>
                    <td><strong>Insurance Agent Commission TDS</strong></td>
                    <td className="nr">15%</td>
                    <td className="nr"><strong>20%</strong></td>
                    <td><span className="nb-tag-down">↑ +5pp</span></td>
                    <td>Insurance companies paying commission/service fee to agents</td>
                    <td>Shrawan 1, 2083</td>
                    <td>Income Tax Act 2058, Sec. 87: Finance Act 2083</td>
                    <td>✅ Verified against Budget Summary PDF.</td>
                  </tr>
                  {/* VAT */}
                  <tr>
                    <td><strong>VAT: Standard Rate</strong></td>
                    <td className="nr">13%</td>
                    <td className="nr">13%</td>
                    <td>No Change</td>
                    <td>All VAT-registered businesses</td>
                    <td>Ongoing</td>
                    <td>VAT Act 2052</td>
                    <td>No change in standard rate. Source: Finance Act 2083.</td>
                  </tr>
                  <tr>
                    <td><strong>VAT Digital Payment Rebate</strong></td>
                    <td className="nr">None</td>
                    <td className="nr"><strong>10% rebate</strong> on VAT paid</td>
                    <td><span className="nb-tag-new">New</span></td>
                    <td>Consumers paying via QR/card/wallet with electronic invoice</td>
                    <td>Shrawan 1, 2083</td>
                    <td>VAT Act 2052 (amended): Finance Act 2083</td>
                    <td>Rebate credited to payment account, not a refund. Source: K.B.P.S. Summary: verify mechanism with IRD.</td>
                  </tr>
                  {/* Education / Health Equity Fee */}
                  <tr>
                    <td><strong>Education Equity Fee</strong></td>
                    <td className="nr">None</td>
                    <td className="nr"><strong>3%</strong></td>
                    <td><span className="nb-tag-new">New</span></td>
                    <td>Institutions collecting fees for foreign education courses</td>
                    <td>Shrawan 1, 2083</td>
                    <td>Finance Act 2083</td>
                    <td>Filing within 25 days of trimester end. Source: K.B.P.S. Summary: verify with IRD.</td>
                  </tr>
                  <tr>
                    <td><strong>Health Equity Fee</strong></td>
                    <td className="nr">None</td>
                    <td className="nr"><strong>3%</strong></td>
                    <td><span className="nb-tag-new">New</span></td>
                    <td>Health service institutions</td>
                    <td>Shrawan 1, 2083</td>
                    <td>Finance Act 2083</td>
                    <td>Filing within 25 days of trimester end. Source: K.B.P.S. Summary: verify with IRD.</td>
                  </tr>
                  {/* Excise */}
                  <tr>
                    <td><strong>Excise Duty: 360 Exempt Goods</strong></td>
                    <td className="nr">Applicable</td>
                    <td className="nr"><strong>Nil (Abolished)</strong></td>
                    <td><span className="nb-tag-up">Abolished</span></td>
                    <td>Agricultural inputs, essential foods (360 specified items)</td>
                    <td>Shrawan 1, 2083</td>
                    <td>Excise Duty Act 2058: Finance Act 2083 Schedule</td>
                    <td>Exact HS codes in official Excise Schedule. Source: K.B.P.S. Summary: verify schedule with IRD/Customs.</td>
                  </tr>
                  {/* Customs */}
                  <tr>
                    <td><strong>Customs Tiers</strong></td>
                    <td className="nr">11 tiers</td>
                    <td className="nr"><strong>7 tiers</strong></td>
                    <td><span className="nb-tag-up">Simplified</span></td>
                    <td>All importers</td>
                    <td>Shrawan 1, 2083</td>
                    <td>Customs Act 2064: Finance Act 2083 Tariff Schedule</td>
                    <td>Specific rates per HS code available at Department of Customs. Source: K.B.P.S. Summary.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="nb-note">
              <strong>Effective-Date Notice:</strong> A budget speech announcement, Finance Bill, Finance Act, and subsequent government Gazette notification are <em>not</em> interchangeable legal instruments. Tax rates become legally enforceable only upon presidential authentication of the Finance Act and, in some cases, a separate Gazette notification. The above rates reflect the Finance Act 2083 as summarised. Always verify with the IRD or Department of Customs before relying on any specific rate for compliance purposes.
            </p>
          </section>

          {/* § 20 Consolidated Tables */}
          <section className="nb-chapter" id="tax-tables">
            <span className="nb-ch-tag">§ 20</span>
            <h2>20. Consolidated VAT, TDS and Customs Tables</h2>

            <h3>20.1 VAT Changes Master Table</h3>
            <div className="nb-tw">
              <table>
                <caption>Table: VAT Changes Summary: FY 2083/84</caption>
                <thead>
                  <tr>
                    <th>VAT Area</th>
                    <th>Previous Rule / Rate</th>
                    <th>FY 2083/84 Rule / Rate</th>
                    <th>Who Is Affected</th>
                    <th>Effective Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Standard VAT Rate</td><td>13%</td><td>13%: No Change</td><td>All VAT-registered businesses</td><td>Shrawan 1, 2083</td></tr>
                  <tr><td>Digital Payment Rebate</td><td>None</td><td>10% credit back on VAT for digital/card/QR payments</td><td>All consumers using digital payment</td><td>Shrawan 1, 2083</td></tr>
                  <tr><td>Ride-Sharing VAT (advance collection)</td><td>Nil / unclear</td><td><strong>5% advance VAT</strong> collected per transaction by platform (standard 13% VAT applies)</td><td>Ride-sharing platforms &amp; drivers</td><td>Shrawan 1, 2083</td></tr>
                  <tr><td>VAT: Electricity (&gt;50 units)</td><td>Exempt / unclear</td><td><strong>5%</strong> on consumption exceeding 50 units</td><td>Electricity consumers</td><td>Shrawan 1, 2083</td></tr>
                  <tr><td>Electronic Invoice (CBMS)</td><td>Optional for small businesses</td><td>Mandatory for specified turnover thresholds (&gt;Rs. 10 crore)</td><td>Retail, service businesses above threshold</td><td>As per IRD notification</td></tr>
                  <tr><td>VAT Return Amendment</td><td>No amendment allowed post-submission</td><td>Amendment allowed within 7 days without penalty</td><td>All VAT-registered filers</td><td>Shrawan 1, 2083</td></tr>
                  <tr><td>VAT District Mechanism</td><td>Must file at designated IRO</td><td>Within 15 days if district lacks an IRO</td><td>Businesses in remote districts</td><td>Shrawan 1, 2083</td></tr>
                  <tr><td>Excess-Tax Refund Provision</td><td>Allowed carry-forward or refund</td><td>Refund provision deleted</td><td>VAT-registered businesses</td><td>Shrawan 1, 2083</td></tr>
                  <tr><td>Digital Invoice Penalty</td><td>Rs. 1 lakh maximum</td><td>Rs. 5 lakh (software tampering) / Rs. 1 lakh (not issuing)</td><td>CBMS-mandated businesses</td><td>Shrawan 1, 2083</td></tr>
                  <tr><td>General Violation Penalty</td><td>Varies</td><td>Rs. 10,000 general penalty introduced</td><td>All VAT-registered businesses</td><td>Shrawan 1, 2083</td></tr>
                  <tr><td>Internal Transfer Violation</td><td>Varies</td><td>Rs. 50,000 penalty for transfer without invoice</td><td>All VAT-registered businesses</td><td>Shrawan 1, 2083</td></tr>
                  <tr><td>VAT Return Deadline</td><td>25th of following month</td><td>25th of following month: No Change</td><td>All VAT-registered businesses</td><td>Rolling monthly</td></tr>
                  <tr><td>Paneer VAT Waiver</td><td>VAT applied on paneer sales</td><td>One-time waiver for paneer producers</td><td>Paneer producers with assessment disputes</td><td>Poush 30, 2083</td></tr>
                </tbody>
              </table>
            </div>

            <h3>20.2 TDS Changes Master Table</h3>
            <div className="nb-tw">
              <table>
                <caption>Table: TDS / Withholding Tax Changes Summary: FY 2083/84</caption>
                <thead>
                  <tr>
                    <th>Payment / Income Type</th>
                    <th>Previous TDS</th>
                    <th>FY 2083/84 TDS</th>
                    <th>Who Pays</th>
                    <th>Relevant Section</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>IT / Software Export (Foreign Currency via domestic bank)</td><td>Self-assessed (normal slab)</td><td>5% final WHT</td><td>IT companies, freelancers</td><td>Section 92</td></tr>
                  <tr><td>Insurance Agent Commission TDS</td><td>15%</td><td><strong>20%</strong></td><td>Insurance companies paying agents</td><td>Section 87</td></tr>
                  <tr><td>Section 89(3Ka) Consumer Committee WHT</td><td>1.5% on payments &gt;Rs. 50,00,000</td><td>Repealed</td><td>N/A</td><td>Section 89(3Ka): repealed by Finance Act 2083</td></tr>
                  <tr><td>Ride-Sharing Driver Payments</td><td>None</td><td>1% advance tax deducted at source</td><td>Ride-sharing platforms</td><td>Section 95</td></tr>
                  <tr><td>General Service Payments</td><td>15%</td><td>15%: No Change</td><td>Payers of professional services</td><td>Section 87</td></tr>
                  <tr><td>Interest on Cooperative Deposits</td><td>Taxable</td><td>Exempt up to Rs. 25,000</td><td>Cooperatives, microfinance institutions</td><td>Section 10</td></tr>
                </tbody>
              </table>
            </div>

            <p className="nb-note">✅ Source: verified against supplied Budget Summary PDF. This table covers only TDS changes identified in the supplied source: it is not a complete TDS rate schedule.</p>

            <h3>20.3 Selected Customs Duty Changes Master Table</h3>
            <div className="nb-tw">
              <table>
                <caption>Table: Selected Customs Duty Changes: FY 2083/84 (Verified against supplied Budget Summary PDF; not a complete HS-code tariff schedule)</caption>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Previous</th>
                    <th>FY 2083/84</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Customs Duty Tiers</td><td>11 tiers</td><td>7 tiers</td><td>Simplified tariff structure</td></tr>
                  <tr><td>Raw Materials (273 items)</td><td>Previous duty</td><td>Reduced duty</td><td>Supports domestic manufacturing</td></tr>
                  <tr><td>Green Tax</td><td>Separate levies</td><td>Consolidated Green Tax</td><td>Applied on polluting/fossil fuel imports</td></tr>
                  <tr><td>Electric Vehicles</td><td>Tiered by kW</td><td>Revised tiers by kW capacity</td><td>Verify specific rates at Customs Dept</td></tr>
                  <tr><td>ICE Vehicles</td><td>By cc</td><td>Minor adjustments by cc</td><td>Commercial vehicles included</td></tr>
                </tbody>
              </table>
            </div>
            <p className="nb-note">Source: Finance Act 2083 / Customs Tariff Order. Full schedule available at the Department of Customs (customs.gov.np).</p>

            <h3>20.4 Selected Excise Rate Changes Master Table</h3>
            <div className="nb-tw">
              <table>
                <caption>Table: Excise Duty Changes Summary: FY 2083/84</caption>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Direction</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Food &amp; Agriculture (360 items)</td><td><span className="nb-tag-up">Abolished</span></td><td>Essential foods and agricultural inputs fully exempt</td></tr>
                  <tr><td>Pan Masala &amp; Tobacco Inputs</td><td><span className="nb-tag-down">Increased</span></td><td>Higher duty on raw materials used in tobacco production</td></tr>
                  <tr><td>Non-Alcoholic Beverages</td><td><span className="nb-tag-down">Adjusted</span></td><td>Sugary drinks and energy beverages revised</td></tr>
                  <tr><td>Beer, Wine &amp; Fermented Beverages</td><td><span className="nb-tag-down">Increased</span></td><td>Moderate per-litre increase</td></tr>
                  <tr><td>Readymade Liquor &amp; Spirits</td><td><span className="nb-tag-down">Increased</span></td><td>Significant hike on premium spirits</td></tr>
                  <tr><td>Tobacco Products</td><td><span className="nb-tag-down">Increased</span></td><td>Per-stick and per-kg rates revised upward</td></tr>
                  <tr><td>ICE Automobiles</td><td><span className="nb-tag-down">Adjusted</span></td><td>By engine displacement (cc)</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* § 21 Exemptions */}
          <section className="nb-chapter" id="tax-exemptions">
            <span className="nb-ch-tag">§ 21</span>
            <h2>21. Tax Exemptions, Deductions &amp; Concessions</h2>

            <h3>21.1 Income Tax Exemptions</h3>
            <p>Persons with disability, senior citizens, and specified allowances remain exempt from income tax.</p>

            <h3>21.2 Interest Income Exemption</h3>
            <p>Interest income up to <strong>Rs. 25,000</strong> from eligible cooperatives and microfinance institutions is exempt.</p>

            <h3>21.3 Agricultural Exemptions</h3>
            <p>Primary agricultural income generated by registered cooperatives and individual farmers remains exempt.</p>

            <h3>21.4 Donation Deduction</h3>
            <p>Up to 10% of adjusted taxable income donated to approved institutions is deductible.</p>

            <h3>21.5 CSR Deduction</h3>
            <p>Corporate CSR expenditure in approved areas is fully deductible within prescribed limits.</p>

            <h3>21.6 Insurance Deduction</h3>
            <p>Life insurance premiums up to Rs. 40,000 annually are deductible from taxable income.</p>

            <h3>21.7 Education Deduction</h3>
            <p>Tuition fee deductions for children: the lower of 25% of fees paid or Rs. 25,000 per year.</p>

            <h3>21.8 Property Donation Exemption</h3>
            <p>Transfer of property to government or approved charitable institutions is exempt from CGT.</p>

            <h3>21.9 University Exemption</h3>
            <p>Universities meeting the conditions under the Income Tax Act are tax-exempt on academic income.</p>
          </section>

          {/* § 22 Tax Amnesty */}
          <section className="nb-chapter" id="tax-amnesty">
            <span className="nb-ch-tag">§ 22</span>
            <h2>22. Tax Amnesty &amp; Exemption Schemes</h2>
            <p className="nb-subdek">One-time concession schemes introduced under Finance Act 2083 for taxpayers with outstanding dues. All schemes require action before the stated deadlines.</p>

            <h3>22.1 Destroyed Business Stock</h3>
            <p>Businesses that suffered inventory losses due to natural disasters can apply for VAT waiver on destroyed goods with proper documentation.</p>

            <h3>22.2 Restoration Duty Exemption</h3>
            <p>Goods imported for post-disaster restoration may qualify for customs duty exemption.</p>

            <h3>22.3 Gold and Jewellery Waiver</h3>
            <p>Undeclared gold and jewellery up to prescribed limits can be regularized by paying a nominal settlement amount.</p>

            <h3>22.4 Expired Industrial Goods</h3>
            <p>Tax waiver on expired goods that were written off as per approved procedures.</p>

            <h3>22.5 Damaged Excise Stamps</h3>
            <p>Damaged or lost excise stamps can be written off without additional penalty if properly reported.</p>

            <h3>22.6 Post-Clearance Audit Settlement</h3>
            <p>Disputes arising from post-clearance audits can be settled by paying the determined principal duty without interest and penalties.</p>

            <h3>22.7 Shipping Container Release</h3>
            <p>Containers detained at customs for over 6 months can be released on payment of outstanding duty and a nominal settlement fee.</p>

            <h3>22.8 Universities and Non-Residents</h3>
            <p>Tax settlement provisions for foreign universities and non-resident persons providing services in Nepal. Source: Budget Summary PDF, Sec. 37/38.</p>

            <h3>22.9 Non-Profit Institutions</h3>
            <p>Non-profit organizations can regularize past non-compliance by filing outstanding returns and paying principal taxes.</p>

            <h3>22.10 Insurance Agents VAT Waiver</h3>
            <p>Insurance agents who were inadvertently VAT-registered can apply for cancellation and waiver of accumulated VAT liability.</p>

            <h3>22.11 PAN Regularisation</h3>
            <p>Inactive PANs can be regularized without penalty by Poush 30, 2083 (mid-January 2027).</p>

            <h3>22.12 VAT Liability Settlement</h3>
            <p>Pending VAT assessments for FY 2079/80 and earlier can be settled by paying the principal tax plus a 1% settlement fee.</p>

            <h3>22.13 Paneer VAT Waiver</h3>
            <p>A specific waiver scheme has been introduced for paneer producers who were incorrectly charged VAT under a previous assessment.</p>

            <h3>22.14 Self-Assessed Tax Settlement</h3>
            <p>Taxpayers with self-assessed pending tax liabilities can settle with a 1% fee before Poush 30, 2083.</p>

            <h3>22.15 Assessed Tax Settlement</h3>
            <p>Tax disputes where assessments have already been issued can be settled at the principal amount with all penalties waived.</p>

            <h3>22.16 Non-Compliant Company Scheme</h3>
            <p>Companies that failed to file annual returns at the Company Registrar can regularize by paying a reduced fine before the deadline.</p>

            <h3>22.17 Penalty and Interest Waiver</h3>
            <p>All interest, penalties, and additional charges are fully waived for settlements made before Poush 30, 2083.</p>

            <h3>22.18 Revenue Leakage Cases</h3>
            <p>Revenue leakage disputes can be settled through the special settlement window with a partial penalty reduction.</p>

            <h3>22.19 Bank Guarantee Release</h3>
            <p>Taxpayers with bank guarantees or cash deposits held by the tax office can apply for release upon settling outstanding principal dues.</p>
          </section>

          {/* § 23 Master Exemption Table */}
          <section className="nb-chapter" id="exemption-summary">
            <span className="nb-ch-tag">§ 23</span>
            <h2>23. Master Exemption &amp; Relief Schemes: Summary Table</h2>
            <div className="nb-tw">
              <table>
                <caption>Table: One-Time Concession Schemes under Finance Act 2083</caption>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Scheme</th>
                    <th>Who Qualifies</th>
                    <th>Payment Required</th>
                    <th>Benefit</th>
                    <th>Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>22.11</td><td>PAN Regularisation</td><td>Inactive PAN holders</td><td>Filing of outstanding returns</td><td>No penalty</td><td>Poush 30, 2083</td></tr>
                  <tr><td>22.12</td><td>VAT Liability Settlement</td><td>Businesses with pending VAT assessment (≤2079/80)</td><td>Principal + 1% settlement fee</td><td>All penalties &amp; interest waived</td><td>Poush 30, 2083</td></tr>
                  <tr><td>22.14</td><td>Self-Assessed Tax Settlement</td><td>Taxpayers with self-assessed dues</td><td>Principal + 1% settlement fee</td><td>All penalties &amp; interest waived</td><td>Poush 30, 2083</td></tr>
                  <tr><td>22.15</td><td>Assessed Tax Settlement</td><td>Taxpayers with issued assessments</td><td>Principal tax only</td><td>All penalties waived</td><td>Poush 30, 2083</td></tr>
                  <tr><td>§48</td><td>Non-Compliant Company Regularisation</td><td>Companies with unfiled annual returns</td><td>Reduced fine</td><td>Regularisation without full penalty</td><td><strong>Ashwin end, 2083</strong></td></tr>
                <tr><td>§49</td><td>Tax/Fee Settlement (1% scheme)</td><td>All taxpayers with assessed dues</td><td>Principal + 1% fee</td><td>All penalties &amp; interest waived</td><td><strong>Mangsir end, 2083</strong></td></tr>
                <tr><td>§51</td><td>Bank Guarantee / Cash Deposit Release</td><td>Taxpayers with held securities</td><td>Principal dues settled</td><td>Guarantee/deposit released</td><td><strong>Mangsir end, 2083</strong></td></tr>
                  <tr><td>22.17</td><td>Penalty &amp; Interest Waiver</td><td>All settled accounts</td><td>Principal only</td><td>100% penalty &amp; interest waived</td><td>Poush 30, 2083</td></tr>
                  <tr><td>22.19</td><td>Bank Guarantee Release</td><td>Taxpayers with held securities</td><td>Principal dues settled</td><td>Guarantee/deposit released</td><td>Poush 30, 2083</td></tr>
                </tbody>
              </table>
            </div>
            <p className="nb-note">Source: Finance Act 2083 (Nepal). Deadlines are based on the official Finance Bill. Verify with the IRD (ird.gov.np) before acting.</p>
          </section>

          {/* § 24 Compliance Calendar */}
          <section className="nb-chapter" id="compliance-calendar">
            <span className="nb-ch-tag">§ 24</span>
            <h2>24. Deadlines &amp; Compliance Calendar</h2>

            <h3>24.1 Tax Filing Deadlines</h3>
            <p>Standard income tax return deadline: 3 months after the end of the income year (i.e., Ashwin end of the following year).</p>

            <h3>24.2 DST Deadline</h3>
            <p>Digital Service Tax return: within 3 months after fiscal year end.</p>

            <h3>24.3 Education/Health Equity Fee Deadline</h3>
            <p>Within 25 days of end of each trimester.</p>

            <h3>24.4 Foreign Employment Service Fee Deadline</h3>
            <p>By the 25th of the following month.</p>

            <h3>24.5 PAN Regularisation Deadline</h3>
            <p><strong>Poush 30, 2083</strong> (approx. mid-January 2027).</p>

            <h3>24.6 VAT Settlement Deadline</h3>
            <p><strong>Poush 30, 2083</strong> for all VAT-related settlement schemes.</p>

            <h3>24.7 Tax Dispute Settlement Deadline</h3>
            <p><strong>Poush 30, 2083</strong>: all pending income tax disputes under the settlement window.</p>

            <h3>24.8 Company Regularisation Deadline</h3>
            <p><strong>Poush 30, 2083</strong>: for non-compliant companies to regularize without full penalty.</p>

            <h3>24.9 Customs/Excise Settlement Deadline</h3>
            <p><strong>Poush 30, 2083</strong>: for customs and excise relief schemes.</p>

            <div className="nb-tw">
              <table>
                <caption>Table: Key Compliance Deadlines: FY 2083/84</caption>
                <thead>
                  <tr>
                    <th>Compliance</th>
                    <th>Nepali Date</th>
                    <th>Approx. English Date</th>
                    <th>Event Trigger</th>
                    <th>Who Must Comply</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Income Tax Return</td><td>Ashwin end, 2084</td><td>Mid-October 2027</td><td>End of FY 2083/84</td><td>All registered taxpayers</td></tr>
                  <tr><td>Digital Service Tax Return</td><td>Within 3 months of FY end</td><td>Mid-October 2027</td><td>End of FY 2083/84</td><td>Foreign digital service providers</td></tr>
                  <tr><td>Education/Health Equity Fee</td><td>25 days after trimester end</td><td>Quarterly</td><td>End of each trimester</td><td>Institutions collecting fees</td></tr>
                  <tr><td>Foreign Employment Service Fee</td><td>Ashwin 25, 2084</td><td>25th of following month</td><td>Service rendered</td><td>Manpower agencies</td></tr>
                  <tr><td>PAN Regularisation</td><td>Poush 30, 2083</td><td>~January 14, 2027</td><td>Finance Act 2083 effective date</td><td>Inactive PAN holders</td></tr>
                  <tr><td>VAT/Income Tax Settlement</td><td>Poush 30, 2083</td><td>~January 14, 2027</td><td>Finance Act 2083 effective date</td><td>Taxpayers with assessed dues</td></tr>
                  <tr><td>Company Regularisation (§48)</td><td><strong>Ashwin end, 2083</strong></td><td>~October 2026</td><td>Finance Act 2083, §48</td><td>Non-compliant registered companies</td></tr>
                  <tr><td>Tax/Fee Settlement: §49 (1% scheme)</td><td><strong>Mangsir end, 2083</strong></td><td>~November/December 2026</td><td>Finance Act 2083, §49</td><td>Taxpayers settling assessed dues</td></tr>
                  <tr><td>Container Release (§36)</td><td><strong>Mangsir end, 2083</strong></td><td>~November/December 2026</td><td>Finance Act 2083, §36</td><td>Containers detained &gt;6 months at customs</td></tr>
                  <tr><td>Monthly VAT Return</td><td>25th of following month</td><td>Rolling monthly</td><td>End of each calendar month</td><td>VAT-registered businesses</td></tr>
                </tbody>
              </table>
            </div>
            <p className="nb-note"><strong>Effective-Date Note:</strong> A budget announcement, Finance Bill, and Finance Act are distinct legal instruments. Tax rates take effect upon presidential authentication of the Finance Act, not from the date of the budget speech. Always verify against the official IRD notice (ird.gov.np) before filing or making payments.</p>
          </section>

          {/* § 25 Impact on Individuals */}
          <section className="nb-chapter" id="impact-individuals">
            <span className="nb-ch-tag">§ 25</span>
            <h2>25. How Budget 2083/84 Affects Individuals</h2>

            <h3>25.1 Salaried Employees</h3>
            <p>The Rs. 10 lakh first tax slab (1%) directly reduces taxable income for most salaried workers. To see your exact take-home pay under the new slabs, the <a href="/calculator/nepal-salary/">Nepal Salary Calculator</a> breaks down gross-to-net with SSF and IRD deductions.</p>

            <h3>25.2 Business Owners</h3>
            <p>Proprietors benefit from the same Rs. 10 lakh first slab, with simplified slab structure reducing high-bracket burdens.</p>

            <h3>25.3 Freelancers</h3>
            <p>Freelancers receiving foreign currency through domestic banking channels will have a 5% final WHT applied: simplifying compliance vs. the previous self-assessed regime.</p>

            <h3>25.4 Investors</h3>
            <p>Capital gains rates and the tax settlement window offer planning opportunities for share and real estate investors. If you hold listed shares, check your <a href="/calculator/nepse-bonus-tax/">bonus share and dividend tax liability</a> separately from trading gains.</p>

            <h3>25.5 Property Sellers</h3>
            <p>Real estate CGT rules have been updated.</p>

            <h3>25.6 Vehicle Owners</h3>
            <p>Vehicle annual tax revisions and EV customs adjustments affect all vehicle owners.</p>

            <h3>25.7 Consumers</h3>
            <p>The 10% digital VAT rebate makes cashless purchases more attractive for everyday consumers.</p>
          </section>

          {/* § 26 Impact on Businesses */}
          <section className="nb-chapter" id="impact-businesses">
            <span className="nb-ch-tag">§ 26</span>
            <h2>26. How Budget 2083/84 Affects Businesses</h2>

            <h3>26.1 SMEs</h3>
            <p>Simplified tax slabs and the settlement scheme reduce administrative burden for small and medium enterprises.</p>

            <h3>26.2 Startups</h3>
            <p>IT sector tax holidays and favourable import duties for tech equipment benefit early-stage startups.</p>

            <h3>26.3 IT Exporters</h3>
            <p>5% final withholding on foreign currency income replaces complex self-assessed calculations, reducing compliance cost for software exporters.</p>

            <h3>26.4 Importers</h3>
            <p>Customs compression from 11 to 7 tiers reduces the average effective duty for industrial importers.</p>

            <h3>26.5 Manufacturers</h3>
            <p>Reduced excise and input duties on 273 raw materials directly lower manufacturing costs.</p>

            <h3>26.6 Liquor and Tobacco Businesses</h3>
            <p>Mandatory electronic track and trace system and increased excise rates require immediate investment in compliance infrastructure.</p>

            <h3>26.7 Education Institutions</h3>
            <p>Universities receive income tax exemptions, while the new Education Equity Fee applies to institutions collecting fees for foreign courses.</p>

            <h3>26.8 Private Hospitals</h3>
            <p>Health Equity Fee compliance and the revised insurance deduction rules affect hospital billing procedures.</p>

            <h3>26.9 Ride-Sharing Platforms</h3>
            <p>Mandatory VAT registration and 1% advance tax deduction on driver payments require immediate platform-level changes.</p>
          </section>

          {/* § 27 Year Comparison */}
          <section className="nb-chapter" id="year-comparison">
            <span className="nb-ch-tag">§ 27</span>
            <h2>27. FY 2082/83 vs FY 2083/84: What Changed?</h2>
            <div className="nb-tw">
              <table>
                <caption>Table: Key Tax Changes Comparison</caption>
                <thead>
                  <tr>
                    <th>Area</th>
                    <th>FY 2082/83</th>
                    <th>FY 2083/84</th>
                    <th>Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>First Tax Slab</td><td>Rs. 5,00,000 (single) / Rs. 6,00,000 (married)</td><td>Rs. 10,00,000 (all)</td><td><span className="nb-tag-up">Benefit</span>: unified, doubled</td></tr>
                  <tr><td>Max Income Tax Rate</td><td>39%</td><td>29%</td><td><span className="nb-tag-up">Benefit</span>: reduced by 10%</td></tr>
                  <tr><td>Digital Payment VAT Rebate</td><td>None</td><td>10% credit back</td><td><span className="nb-tag-new">New</span>: cashless incentive</td></tr>
                  <tr><td>Customs Tiers</td><td>11 tiers</td><td>7 tiers</td><td><span className="nb-tag-up">Simplified</span></td></tr>
                  <tr><td>Excise Goods Exempt</td><td>~0</td><td>360 goods</td><td><span className="nb-tag-up">Benefit</span>: broad exemption</td></tr>
                  <tr><td>Tax Dispute Settlement</td><td>Not available</td><td>1% fee, all penalties waived</td><td><span className="nb-tag-new">New</span>: one-time scheme</td></tr>
                  <tr><td>DST Rate</td><td>2%</td><td>2%</td><td>No Change</td></tr>
                  <tr><td>VAT Standard Rate</td><td>13%</td><td>13%</td><td>No Change</td></tr>
                  <tr><td>Ride-Sharing VAT</td><td>Unclear</td><td>Explicit 13% VAT + 1% AT</td><td><span className="nb-tag-new">Clarified</span></td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* § 28 Key Takeaways */}
          <section className="nb-chapter" id="key-takeaways">
            <span className="nb-ch-tag">§ 28</span>
            <h2>28. Key Takeaways &amp; Practical Examples</h2>

            <h3>28.1 Income Tax Example</h3>
            <p>An individual with annual income of <strong>Rs. 20,00,000</strong> pays: Rs. 10,000 on the first Rs. 10 lakh (1%), then 10% on Rs. 5,00,000 = Rs. 50,000. Total: Rs. 60,000 (excluding SSF deductions).</p>

            <h3>28.2 Salary Example</h3>
            <p>A government employee earning Rs. 12,00,000 a year benefits from the Rs. 10 lakh first slab. Only Rs. 2,00,000 falls in the 10% slab, giving a tax of Rs. 20,000. EPF contributors can further reduce this: see how with the <a href="/calculator/nepal-provident-fund/">Provident Fund calculator</a>.</p>

            <h3>28.3 TDS Example</h3>
            <p>A company pays Rs. 1,00,000 for professional services. At 15% TDS, Rs. 15,000 is withheld and remitted to IRD.</p>

            <h3>28.4 VAT Example</h3>
            <p>A consumer purchases goods worth Rs. 1,000 + 13% VAT = Rs. 1,130. If paid via QR code, 10% of Rs. 130 = Rs. 13 is credited back to their wallet.</p>

            <h3>28.5 Capital Gains Example</h3>
            <p>An investor sells listed shares held for 8 months at a gain of Rs. 1,00,000. CGT at 7.5% = Rs. 7,500 withheld at source.</p>

            <h3>28.6 Vehicle Tax Example</h3>
            <p>A private car owner with a 1,600cc petrol vehicle will pay the revised annual vehicle tax rate for FY 2083/84.</p>

            <h3>28.7 Business Compliance Example</h3>
            <p>A business with a pending VAT assessment from FY 2079/80 of Rs. 5,00,000 (principal) can settle by paying Rs. 5,05,000 (principal + 1% fee) before Poush 30, 2083, with all interest and penalties cancelled.</p>
          </section>

          {/* § 29 FAQs */}
          <section className="nb-chapter" id="faqs">
            <span className="nb-ch-tag">§ 29</span>
            <h2>29. Frequently Asked Questions</h2>

            <h3>29.1 What is the total budget of Nepal for FY 2083/84?</h3>
            <p>The total Nepal Budget for FY 2083/84 (2026/27) is <strong>Rs. 2,124.34 billion</strong>, covering recurrent expenditure, capital expenditure, and financial management allocations.</p>

            <h3>29.2 What is the new income tax slab structure?</h3>
            <p>The first Rs. 10,00,000 of taxable income falls within the <strong>1% slab</strong>: this is not a tax-free exemption. The 1% is waived only for SSF contributors, specified pension income, and certain sole-proprietorship income. The top rate is <strong>29%</strong> on income above Rs. 40,00,000, reduced from 39% in FY 2082/83.</p>

            <h3>29.3 What is the maximum income tax rate?</h3>
            <p>The maximum marginal income tax rate is <strong>29%</strong> on annual taxable income above Rs. 40,00,000: reduced from 39% in FY 2082/83.</p>

            <h3>29.4 What are the major VAT changes?</h3>
            <p>The biggest change is a <strong>10% digital payment VAT rebate</strong>: when consumers pay retail bills via QR code, digital wallet, or card, 10% of the VAT charged is automatically credited to their payment account.</p>

            <h3>29.5 What are the new TDS rates?</h3>
            <p>IT companies and software exporters receiving foreign currency payments through domestic banks are subject to a <strong>5% final withholding tax</strong>. Other notable updates include revised insurance agent TDS rates.</p>

            <h3>29.6 What are the major tax waiver and settlement schemes?</h3>
            <p>Taxpayers with pending income tax, VAT, or excise disputes can settle by paying the assessed principal tax plus a <strong>1% settlement fee</strong> by <strong>Poush 30, 2083</strong> (approx. January 14, 2027), with all fines, interest, and penalties fully waived.</p>

            <h3>29.7 When do the new tax provisions take effect?</h3>
            <p>Most provisions under Finance Act 2083 are effective from <strong>Shrawan 1, 2083</strong> (July 17, 2026). However, some specific provisions (such as DST and equity fees) have their own deadlines. Always verify with official IRD notices.</p>

            <h3>29.8 What is the budget of Nepal for 2083/84?</h3>
            <p>Nepal&apos;s total budget for FY 2083/84 (2026/27) is <strong>Rs. 2,124.34 billion</strong>. The allocation covers recurrent expenditure, capital expenditure and financial management.</p>

            <h3>29.9 What is the economic growth target for Nepal in FY 2083/84?</h3>
            <p>The government has set an economic growth target of <strong>7.0%</strong> for FY 2083/84, with inflation targeted below <strong>6.0%</strong>.</p>

            <h3>29.10 What is the difference between the Nepal Budget and the Economic Survey?</h3>
            <p>The Economic Survey provides an assessment of Nepal&apos;s economic performance and conditions, while the annual Budget sets out the government&apos;s planned revenue, expenditure, taxation and fiscal priorities for the coming fiscal year.</p>
          </section>

          <section className="nb-chapter" id="related-resources">
            <h2>30. Related Nepal Calculators &amp; Official Resources</h2>

            <h3>30.1 Related NepaCalc Tools</h3>
            <div className="nb-tw">
              <table>
                <thead>
                  <tr><th>Tool</th><th>Relevance to This Budget</th></tr>
                </thead>
                <tbody>
                  <tr><td><a href="/calculator/nepal-home-loan/">Nepal Home Loan Calculator</a></td><td>NRB monetary policy and base rate changes affect home loan EMIs</td></tr>
                  <tr><td><a href="/calculator/auto-loan/">Nepal Auto Loan Calculator</a></td><td>Vehicle excise and customs changes impact financed car/bike costs</td></tr>
                  <tr><td><a href="/calculator/nepal-loan-eligibility/">Nepal Loan Eligibility</a></td><td>NRB FOIR rules and income-based eligibility under the new slabs</td></tr>
                  <tr><td><a href="/calculator/gold-tax/">Gold Tax Calculator</a></td><td>VAT (13%) applies on gold jewellery purchases under this budget</td></tr>
                  <tr><td><a href="/market-rates/live-gold-price/">Live Gold Price Nepal</a></td><td>Track real-time gold rates as excise and import duty change</td></tr>
                  <tr><td><a href="/market-rates/live-silver-price/">Live Silver Price Nepal</a></td><td>Live silver rate per tola and gram including current levy impact</td></tr>
                  <tr><td><a href="/market-rates/remittance/">Remittance Board</a></td><td>Compare rates for remittances covered under the foreign employment provisions</td></tr>
                  <tr><td><a href="/calculator/currency-converter/">Currency Converter</a></td><td>Convert foreign earnings to NPR for tax computation</td></tr>
                  <tr><td><a href="/calculator/nepse-wacc/">NEPSE WACC Calculator</a></td><td>Weighted average cost of capital for shares under revised CGT rules</td></tr>
                  <tr><td><a href="/calculator/gratuity-calculator/">Gratuity Calculator</a></td><td>Labor Act 2074 gratuity benefits, relevant to employment tax provisions</td></tr>
                </tbody>
              </table>
            </div>

            <h3>30.2 Read These Guides</h3>
            <p>In-depth articles related to Nepal income tax, TDS, and financial topics:</p>
            <ul>
              <li><a href="/blog/nepal-income-tax-guide-2082-83/">Nepal Income Tax Guide 2082/83</a>: How the previous year&apos;s slabs worked and what changed for 2083/84</li>
              <li><a href="/blog/income-tax-filing-guide/">How to File Your Income Tax Return in Nepal</a>: Step-by-step ITR filing guide for individuals and businesses</li>
              <li><a href="/blog/nepal-tds-guide-2083/">Nepal TDS Guide 2083</a>: Complete breakdown of withholding tax rates, deadlines, and compliance</li>
              <li><a href="/blog/nea-tariff-rates-2083-84/">NEA Electricity Tariff Rates 2083/84</a>: Updated NEA unit slab rates and how the budget affects electricity billing</li>
            </ul>

            <h3>30.3 Official Government Resources</h3>
            <ul>
              <li><a href="https://mof.gov.np" target="_blank" rel="noopener noreferrer">Ministry of Finance Nepal</a>: Budget speech, Finance Act, and economic survey documents</li>
              <li><a href="https://nrb.org.np" target="_blank" rel="noopener noreferrer">Nepal Rastra Bank (NRB)</a>: Monetary policy, banking regulations, and foreign exchange</li>
            </ul>

            <h3>30.4 Budget Documents and Legal References</h3>
            <ul>
              <li>Finance Act 2083 (Nepal): Primary legal source for all tax changes</li>
              <li>Income Tax Act 2058 (as amended by Finance Act 2083)</li>
              <li>VAT Act 2052 (as amended)</li>
              <li>Customs Act 2064 (as amended)</li>
              <li>Excise Duty Act 2058 (as amended)</li>
            </ul>

            <div className="nb-note">
              <strong>Disclaimer:</strong> Based on the Nepal Budget 2083/84 summary and applicable government tax laws. Taxpayers should verify all figures against the official Finance Act 2083 and IRD notices before filing. NepaCalc is not a tax advisory service. Last updated: 15 August 2026. Reviewed for: FY 2083/84 Budget, Finance Act 2083 and related fiscal information.
            </div>
          </section>

          {/* COMMON MISCONCEPTIONS */}
          <section className="nb-chapter" id="misconceptions" style={{marginBottom:'28px'}}>
            <span className="nb-ch-tag">!</span>
            <h2>Common Misconceptions About Nepal Budget 2083/84</h2>
            <p className="nb-subdek">These are frequently misunderstood points about the 2083/84 Budget and Finance Act 2083.</p>

            <h3>Myth 1: The first Rs. 10 lakh is completely tax-free</h3>
            <p><strong>Reality:</strong> The first Rs. 10 lakh of taxable income is <em>not</em> generally tax-free. It falls under a <strong>1% tax rate</strong>. The 1% treatment is <em>waived</em> only for specified categories — qualifying SSF-contributing employees, certain qualifying pension income, and specified sole-proprietorship income under the Finance Act 2083. Most salaried individuals pay 1% on the first Rs. 10 lakh.</p>
            <div className="nb-tw">
              <table>
                <caption>Is the First Rs. 10 Lakh Tax-Free in Nepal? (FY 2083/84)</caption>
                <thead><tr><th>Situation</th><th>First Rs. 10 lakh</th></tr></thead>
                <tbody>
                  <tr><td>General individual (salaried etc.)</td><td>1% tax applies</td></tr>
                  <tr><td>Qualifying SSF contributor</td><td>1% rate waived</td></tr>
                  <tr><td>Specified pension income</td><td>1% rate waived</td></tr>
                  <tr><td>Specified sole-proprietorship income</td><td>1% rate waived</td></tr>
                </tbody>
              </table>
            </div>

            <h3 style={{marginTop:'16px'}}>Myth 2: The maximum income-tax rate is still 39%</h3>
            <p><strong>Reality:</strong> Under Finance Act 2083, the maximum marginal rate for natural persons is <strong>29%</strong> on taxable income above Rs. 40 lakh. The 39% rate applied in FY 2082/83 and has been reduced.</p>

            <h3 style={{marginTop:'16px'}}>Myth 3: The standard VAT rate changed</h3>
            <p><strong>Reality:</strong> The standard VAT rate remains <strong>13%</strong>. What changed is the introduction of a 10% VAT rebate when consumers pay via digital means (QR, card, wallet). The headline VAT rate is unchanged.</p>

            <h3 style={{marginTop:'16px'}}>Myth 4: Ride-sharing platforms now charge 5% VAT</h3>
            <p><strong>Reality:</strong> Ride-sharing services are subject to the standard <strong>13% VAT</strong>. Additionally, a <strong>1% advance income tax</strong> is deducted at source by the platform. Do not confuse the 1% advance tax with the VAT rate.</p>

            <h3 style={{marginTop:'16px'}}>Myth 5: Every taxpayer with old dues qualifies for the settlement scheme</h3>
            <p><strong>Reality:</strong> Eligibility and deadlines vary by provision. The general tax dispute settlement allows payment of the principal + 1% fee by Poush 30, 2083. However, specific schemes have specific eligibility criteria. Confirm your case with the IRD before payment.</p>

            <h3 style={{marginTop:'16px'}}>Myth 6: The 5% IT export WHT applies to all freelancers</h3>
            <p><strong>Reality:</strong> The 5% final WHT applies to qualifying IT companies and software exporters receiving <em>foreign-currency</em> payments through <em>domestic banking channels</em>. Eligibility depends on the nature of services, payment channel, and conditions under Section 92 of the Income Tax Act as amended. Not all freelancers qualify automatically.</p>
          </section>

          {/* WHAT SHOULD YOU DO NOW */}
          <section className="nb-chapter" id="action-checklist" style={{marginBottom:'28px'}}>
            <span className="nb-ch-tag">✓</span>
            <h2>What Should You Do After Nepal Budget 2083/84?</h2>
            <p className="nb-subdek">Practical steps based on your taxpayer type. Verify with a qualified tax adviser before acting.</p>

            <h3>For Individuals &amp; Salaried Employees</h3>
            <ul>
              <li>Recalculate your FY 2083/84 taxable income using the new slabs. Use our Nepal Income Tax Calculator.</li>
              <li>Check whether you qualify for the 1% slab waiver (SSF contributor, pension, qualifying sole-proprietor).</li>
              <li>Review your insurance, education, and donation deductions — these reduce taxable income.</li>
              <li>Verify the TDS deducted by your employer matches the correct slab rates.</li>
              <li>If you have old tax disputes, check whether the settlement scheme applies to you (deadline: Poush 30, 2083).</li>
            </ul>

            <h3>For Freelancers &amp; IT Exporters</h3>
            <ul>
              <li>Determine whether your foreign-currency income qualifies for the 5% final WHT under Section 92.</li>
              <li>Confirm you are using a qualifying domestic banking channel for foreign payments.</li>
              <li>If your income does not qualify for 5% WHT, it falls under normal income tax slabs — plan accordingly.</li>
              <li>Check DST registration requirements if you provide digital services to Nepal-based clients.</li>
            </ul>

            <h3>For Businesses</h3>
            <ul>
              <li>Review your VAT registration status and e-invoice / CBMS compliance obligations.</li>
              <li>Verify updated TDS deduction rates for all payment types relevant to your business.</li>
              <li>If you import goods, review the updated 7-tier customs tariff schedule for your HS codes.</li>
              <li>Check whether the tax settlement scheme applies to any pending disputes.</li>
              <li>Ensure ride-sharing or digital-service platforms are withholding and remitting VAT/advance tax correctly.</li>
            </ul>

            <h3>For Investors &amp; Share Traders</h3>
            <ul>
              <li>Check the updated CGT rates for listed securities (short-term and long-term holding periods). Verify rates against IRD notices, as the applicable rate depends on your holding period.</li>
              <li>Use our NEPSE WACC Calculator for cost-of-capital analysis under revised CGT.</li>
              <li>If you sold property during FY 2083/84, check the applicable real-estate CGT rate based on holding period.</li>
            </ul>

            <h3>For Taxpayers with Old Disputes</h3>
            <ul>
              <li>Determine whether your liability falls under the one-time settlement scheme.</li>
              <li>Calculate the principal tax + 1% settlement fee.</li>
              <li>Check the exact deadline for your specific provision (general: Poush 30, 2083).</li>
              <li><strong>Confirm with the IRD before making any payment.</strong></li>
            </ul>
            <p style={{fontSize:'0.85rem',color:'#526370',marginTop:'12px'}}>This checklist is for informational purposes only. Tax obligations depend on individual circumstances. Consult a registered tax adviser or the IRD for compliance decisions.</p>
          </section>

        </main>

        {/* ── RIGHT SIDEBAR TOC ── */}
        <aside className="nb-toc">
          <span className="nb-toc-head">On this page</span>
          <ol>
            <li><a href="#top-highlights"><span className="nb-toc-num">★</span>Top 15 Highlights</a></li>
            <li><a href="#who-is-affected"><span className="nb-toc-num">◈</span>Who Is Affected?</a></li>
            <li><a href="#who-benefits"><span className="nb-toc-num">◈</span>Who Benefits?</a></li>
            <li><a href="#official-pdf"><span className="nb-toc-num">📄</span>PDF &amp; Nepali</a></li>
            <div className="nb-toc-divider" />
            <li><a href="#overview"><span className="nb-toc-num">01</span>Nepal Budget 2083/84 Overview</a></li>
            <li><a href="#budget-size"><span className="nb-toc-num">02</span>Budget Size &amp; Financing</a></li>
            <li><a href="#major-highlights"><span className="nb-toc-num">03</span>Major Highlights</a></li>
            <li><a href="#sector-allocation"><span className="nb-toc-num">04</span>Sector-Wise Allocations</a></li>
            <li><a href="#information-technology"><span className="nb-toc-num">05</span>IT &amp; Digital Economy</a></li>
            <li><a href="#health-education"><span className="nb-toc-num">06</span>Health &amp; Education</a></li>
            <li><a href="#agriculture-food"><span className="nb-toc-num">07</span>Agriculture, Food &amp; Beverages</a></li>
            <li><a href="#liquor-tobacco"><span className="nb-toc-num">08</span>Liquor, Tobacco &amp; Excise</a></li>
            <li><a href="#transportation"><span className="nb-toc-num">09</span>Transportation &amp; Vehicle Tax</a></li>
            <li><a href="#capital-market-real-estate"><span className="nb-toc-num">10</span>Capital Market &amp; Real Estate</a></li>
            <li><a href="#energy-manpower"><span className="nb-toc-num">11</span>Energy &amp; Foreign Employment</a></li>
            <div className="nb-toc-divider" />
            <li><a href="#income-tax-act"><span className="nb-toc-num">12</span>Income Tax Act Amendments</a></li>
            <li><a href="#income-tax-slabs"><span className="nb-toc-num">13</span>New Income Tax Slabs</a></li>
            <li><a href="#tds-advance-tax"><span className="nb-toc-num">14</span>TDS &amp; Advance Tax</a></li>
            <li><a href="#digital-services-tax"><span className="nb-toc-num">15</span>Digital Services &amp; Freelancers</a></li>
            <li><a href="#vat-changes"><span className="nb-toc-num">16</span>VAT Changes</a></li>
            <li><a href="#excise-duty"><span className="nb-toc-num">17</span>Excise Duty Changes</a></li>
            <li><a href="#customs-duty"><span className="nb-toc-num">18</span>Customs Duty Changes</a></li>
            <div className="nb-toc-divider" />
            <li><a href="#tax-rate-summary"><span className="nb-toc-num">19</span>Consolidated Tax Rate Table</a></li>
            <li><a href="#tax-tables"><span className="nb-toc-num">20</span>VAT, TDS &amp; Customs Tables</a></li>
            <li><a href="#tax-exemptions"><span className="nb-toc-num">21</span>Exemptions &amp; Waivers</a></li>
            <li><a href="#tax-amnesty"><span className="nb-toc-num">22</span>Tax Amnesty &amp; Settlement</a></li>
            <li><a href="#exemption-summary"><span className="nb-toc-num">23</span>Relief &amp; Concession Schemes</a></li>
            <li><a href="#compliance-calendar"><span className="nb-toc-num">24</span>Compliance Calendar</a></li>
            <div className="nb-toc-divider" />
            <li><a href="#impact-individuals"><span className="nb-toc-num">25</span>Impact: Individuals</a></li>
            <li><a href="#impact-businesses"><span className="nb-toc-num">26</span>Impact: Businesses</a></li>
            <li><a href="#year-comparison"><span className="nb-toc-num">27</span>Budget vs Previous Year</a></li>
            <li><a href="#key-takeaways"><span className="nb-toc-num">28</span>Worked Examples</a></li>
            <li><a href="#faqs"><span className="nb-toc-num">29</span>FAQs</a></li>
            <li><a href="#related-resources"><span className="nb-toc-num">30</span>Calculators &amp; Links</a></li>
            <div className="nb-toc-divider" />
            <li><a href="#misconceptions"><span className="nb-toc-num">★</span>Common Misconceptions</a></li>
            <li><a href="#action-checklist"><span className="nb-toc-num">★</span>What To Do Now</a></li>
          </ol>
        </aside>

      </div>{/* end nb-layout */}



    </div>
  );
}
