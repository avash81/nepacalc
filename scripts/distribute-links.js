/**
 * Rewrite the "Authoritative Resource Center" footer-only link blocks
 * in Nepal-specific pages to distribute links naturally:
 *  TOP  → a contextual "Related Tools" banner right at the start of content
 *  MID  → inline links woven into the deep-dive text
 *  BOTTOM → the existing resource footer (kept)
 *
 * We patch each entry's content string to prepend a top link block
 * and insert a mid link block before the "Authoritative Resource Center" section.
 */

const fs = require('fs');
const filePath = 'src/data/seo-content.tsx';
let src = fs.readFileSync(filePath, 'utf8');

// Map of slug → { top links, mid links } to inject
const nepalLinks = {
  'nepal-income-tax': {
    top: [
      { label: 'Salary Calculator', href: '/calculator/nepal-salary/' },
      { label: 'SSF Calculator', href: '/calculator/ssf-nepal/' },
      { label: 'TDS Calculator', href: '/calculator/nepal-tds/' },
    ],
    mid: [
      { label: 'Provident Fund (EPF)', href: '/calculator/nepal-provident-fund/' },
      { label: 'Nepal VAT Calculator', href: '/calculator/nepal-vat/' },
    ],
  },
  'nepal-salary': {
    top: [
      { label: 'Income Tax Calculator', href: '/calculator/nepal-income-tax/' },
      { label: 'TDS Calculator', href: '/calculator/nepal-tds/' },
      { label: 'Provident Fund', href: '/calculator/nepal-provident-fund/' },
    ],
    mid: [
      { label: 'Gratuity Calculator', href: '/calculator/gratuity-calculator/' },
      { label: 'SSF Nepal', href: '/calculator/ssf-nepal/' },
    ],
  },
  'nepal-home-loan': {
    top: [
      { label: 'Loan EMI Calculator', href: '/calculator/loan-emi/' },
      { label: 'Income Tax', href: '/calculator/nepal-income-tax/' },
      { label: 'Property Registration', href: '/calculator/property-registration/' },
    ],
    mid: [
      { label: 'Compound Interest', href: '/calculator/compound-interest/' },
      { label: 'Savings Goal', href: '/calculator/savings/' },
    ],
  },
  'nea-bill': {
    top: [
      { label: 'KUKL Water Bill', href: '/calculator/kukl-bill/' },
      { label: 'Solar Calculator', href: '/calculator/solar-requirement/' },
      { label: 'Nepal VAT', href: '/calculator/nepal-vat/' },
    ],
    mid: [
      { label: 'Electricity Cost Saving Tips — Solar Calculator', href: '/calculator/solar-requirement/' },
    ],
  },
  'nepal-land': {
    top: [
      { label: 'Property Registration Fee', href: '/calculator/property-registration/' },
      { label: 'Capital Gains Tax', href: '/calculator/property-tax/' },
      { label: 'Unit Converter', href: '/calculator/unit-converter/' },
    ],
    mid: [
      { label: 'Weight Converter', href: '/calculator/weight-converter/' },
      { label: 'Length Converter', href: '/calculator/length-converter/' },
    ],
  },
  'nepal-stocks': {
    top: [
      { label: 'WACC Calculator', href: '/calculator/nepse-wacc/' },
      { label: 'Bonus Share Tax', href: '/calculator/nepse-bonus-tax/' },
      { label: 'Capital Gains Tax', href: '/calculator/property-tax/' },
    ],
    mid: [
      { label: 'SIP Calculator', href: '/calculator/sip-calculator/' },
      { label: 'CAGR Calculator', href: '/calculator/cagr-calculator/' },
    ],
  },
  'property-tax': {
    top: [
      { label: 'Property Registration Fee', href: '/calculator/property-registration/' },
      { label: 'Nepal Income Tax', href: '/calculator/nepal-income-tax/' },
      { label: 'Nepal Land Converter', href: '/calculator/nepal-land/' },
    ],
    mid: [
      { label: 'TDS Calculator', href: '/calculator/nepal-tds/' },
      { label: 'Nepal VAT', href: '/calculator/nepal-vat/' },
    ],
  },
  'property-registration': {
    top: [
      { label: 'Capital Gains Tax', href: '/calculator/property-tax/' },
      { label: 'Nepal Land Converter', href: '/calculator/nepal-land/' },
      { label: 'Home Loan Calculator', href: '/calculator/nepal-home-loan/' },
    ],
    mid: [
      { label: 'Nepal Income Tax', href: '/calculator/nepal-income-tax/' },
    ],
  },
  'nepal-provident-fund': {
    top: [
      { label: 'Salary Calculator', href: '/calculator/nepal-salary/' },
      { label: 'Income Tax Calculator', href: '/calculator/nepal-income-tax/' },
      { label: 'Gratuity Calculator', href: '/calculator/gratuity-calculator/' },
    ],
    mid: [
      { label: 'SIP Calculator', href: '/calculator/sip-calculator/' },
      { label: 'Fixed Deposit', href: '/calculator/fd-calculator/' },
    ],
  },
  'nepal-tds': {
    top: [
      { label: 'Income Tax Calculator', href: '/calculator/nepal-income-tax/' },
      { label: 'Nepal VAT', href: '/calculator/nepal-vat/' },
      { label: 'Salary Calculator', href: '/calculator/nepal-salary/' },
    ],
    mid: [
      { label: 'Nepal Salary Calculator', href: '/calculator/nepal-salary/' },
    ],
  },
  'nepal-vehicle-tax': {
    top: [
      { label: 'Nepal Income Tax', href: '/calculator/nepal-income-tax/' },
      { label: 'Nepal VAT', href: '/calculator/nepal-vat/' },
      { label: 'Lok Sewa Age', href: '/calculator/lok-sewa-age/' },
    ],
    mid: [
      { label: 'Age Calculator', href: '/calculator/age-calculator/' },
    ],
  },
  'lok-sewa-age': {
    top: [
      { label: 'Age Calculator', href: '/calculator/age-calculator/' },
      { label: 'Nepal Income Tax', href: '/calculator/nepal-income-tax/' },
      { label: 'Nepal Salary Calculator', href: '/calculator/nepal-salary/' },
    ],
    mid: [
      { label: 'University Attendance', href: '/calculator/nepal-attendance/' },
      { label: 'SEE GPA Calculator', href: '/calculator/see-gpa/' },
    ],
  },
  'see-gpa': {
    top: [
      { label: 'GPA Calculator', href: '/calculator/gpa/' },
      { label: 'CGPA Calculator', href: '/calculator/cgpa/' },
      { label: 'University Attendance', href: '/calculator/nepal-attendance/' },
    ],
    mid: [
      { label: 'Target Grade Calculator', href: '/calculator/marks-needed/' },
      { label: 'Percentage Calculator', href: '/calculator/percentage/' },
    ],
  },
};

// Build the top-banner JSX string
function topBanner(links) {
  const items = links.map(l => `<a href="${l.href}" className="text-[#1a0dab] hover:underline font-semibold">${l.label}</a>`).join(' &middot; ');
  return `
        <div className="mb-8 p-4 bg-[#e8f0fe] border border-[#c5d8fb] rounded-lg text-sm flex flex-wrap items-center gap-2">
          <span className="font-bold text-[#202124] text-xs uppercase tracking-wide">Related Tools:</span>
          ${items}
        </div>`;
}

// Build mid-content link bar
function midBar(links) {
  const items = links.map(l => `<a href="${l.href}" className="text-[#1a0dab] hover:underline">${l.label}</a>`).join(' · ');
  return `
          <div className="mt-6 p-4 bg-white border border-[#dadce0] rounded-lg text-sm">
            <span className="font-semibold text-[#5f6368] text-xs uppercase tracking-wide">See Also: </span>
            ${items}
          </div>`;
}

let patchCount = 0;

for (const [slugKey, { top, mid }] of Object.entries(nepalLinks)) {
  // Find the content opening for this entry
  const entryMarker = `'${slugKey}': {`;
  const entryIdx = src.indexOf(entryMarker);
  if (entryIdx === -1) {
    console.log('❌ Entry not found for:', slugKey);
    continue;
  }

  // Find the content: ( opener after this entry
  const contentOpenSearch = 'content: (';
  const contentIdx = src.indexOf(contentOpenSearch, entryIdx);
  if (contentIdx === -1) {
    console.log('❌ No content: ( found for:', slugKey);
    continue;
  }

  // Find the <div className="nepalc-encyclopedia after content: (
  const divMarker = '<div className="nepalc-encyclopedia';
  const divIdx = src.indexOf(divMarker, contentIdx);
  if (divIdx === -1) {
    console.log('❌ No encyclopedia div found for:', slugKey);
    continue;
  }

  // Find the end of the opening div tag
  const divEndIdx = src.indexOf('>', divIdx);
  if (divEndIdx === -1) continue;

  // Check if we already patched this one (avoid double-patching)
  const afterDiv = src.slice(divEndIdx + 1, divEndIdx + 200);
  if (afterDiv.includes('bg-[#e8f0fe]') && afterDiv.includes('Related Tools')) {
    console.log('⏭️  Already patched:', slugKey);
    continue;
  }

  // Insert the top banner right after the opening encyclopedia div
  const insertPoint = divEndIdx + 1;
  const topBannerCode = topBanner(top);
  src = src.slice(0, insertPoint) + topBannerCode + src.slice(insertPoint);

  // Now find the "Authoritative Resource Center" section and insert mid bar BEFORE it
  const authMarker = 'Authoritative Resource Center';
  // We need to find the NEXT occurrence after our divIdx (now offset by topBanner length)
  const searchFrom = divIdx + topBannerCode.length;
  const authIdx = src.indexOf(authMarker, searchFrom);
  if (authIdx !== -1) {
    // Find the <section opening before it
    const sectionStart = src.lastIndexOf('<section', authIdx);
    if (sectionStart !== -1 && sectionStart > searchFrom) {
      const midBarCode = midBar(mid);
      src = src.slice(0, sectionStart) + midBarCode + '\n\n        ' + src.slice(sectionStart);
      console.log('✅ Patched (top+mid+bottom):', slugKey);
      patchCount++;
    } else {
      console.log('⚠️  Patched top only (no section boundary):', slugKey);
      patchCount++;
    }
  } else {
    console.log('⚠️  Patched top only (no authority section):', slugKey);
    patchCount++;
  }
}

fs.writeFileSync(filePath, src, 'utf8');
console.log('\n✅ Done. Patched ' + patchCount + ' entries with distributed links.');
console.log('Total file lines:', src.split('\n').length);
