const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/seo-content.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Step 1: Strip out the previously added block to reset state cleanly
const blockRegex = /<section className="mb-12 bg-\[#f8f9fa\] border border-\[#dadce0\] p-6 rounded-xl mt-8">[\s\S]*?<\/section>/g;
content = content.replace(blockRegex, '');

// Step 2: Get all keys
const keyRegex = /'([a-zA-Z0-9-]+)':\s*{/g;
let match;
const keys = [];
while ((match = keyRegex.exec(content)) !== null) {
    keys.push(match[1]);
}
console.log(`Found ${keys.length} calculators for chaining.`);

// Vital calculators that actually need external reference links
const vitalExternalMap = {
    'nepal-income-tax': { url: 'https://ird.gov.np', text: 'Inland Revenue Department (IRD) Nepal' },
    'nepal-salary': { url: 'https://ird.gov.np', text: 'Inland Revenue Department (IRD) Nepal' },
    'ssf-nepal': { url: 'https://ssf.gov.np', text: 'Social Security Fund (SSF) Nepal' },
    'nepal-vat': { url: 'https://ird.gov.np', text: 'Inland Revenue Department (IRD) Nepal' },
    'nepse-wacc': { url: 'https://www.nepalstock.com', text: 'Nepal Stock Exchange (NEPSE)' },
    'loan-emi': { url: 'https://www.nrb.org.np', text: 'Nepal Rastra Bank (NRB)' },
    'mortgage-calculator': { url: 'https://www.nrb.org.np', text: 'Nepal Rastra Bank (NRB)' },
    'bmi': { url: 'https://www.who.int', text: 'World Health Organization (WHO)' },
    'bmr': { url: 'https://www.who.int', text: 'World Health Organization (WHO)' },
    'pregnancy-due-date': { url: 'https://www.who.int', text: 'World Health Organization (WHO)' },
    'foreign-employment': { url: 'https://doefe.gov.np', text: 'Department of Foreign Employment Nepal' },
    'nea-bill': { url: 'https://www.nea.org.np', text: 'Nepal Electricity Authority' },
    'kukl-bill': { url: 'https://kathmanduwater.org', text: 'KUKL Nepal' }
};

let modifiedCount = 0;

for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let nextKey = i < keys.length - 1 ? keys[i+1] : null;
    
    let startIndex = content.indexOf(`'${key}': {`);
    let endIndex = nextKey ? content.indexOf(`'${nextKey}': {`, startIndex) : content.length;
    let sectionContent = content.substring(startIndex, endIndex);

    // Create the chained internal links (3 unique sequential links per page)
    const chain1 = keys[(i + 1) % keys.length];
    const chain2 = keys[(i + 2) % keys.length];
    const chain3 = keys[(i + 3) % keys.length];

    // Helper function to format titles nicely from keys (e.g. nepal-income-tax -> Nepal Income Tax)
    const formatTitle = (k) => k.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const extraInternalHtml = `
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                <a href="/calculator/${chain1}/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">${formatTitle(chain1)}</a>
                <a href="/calculator/${chain2}/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">${formatTitle(chain2)}</a>
                <a href="/calculator/${chain3}/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">${formatTitle(chain3)}</a>
             </div>
          </div>`;

    // Determine if this calculator gets an external reference
    let externalHtml = '';
    if (vitalExternalMap[key]) {
        const ext = vitalExternalMap[key];
        externalHtml = `
          <div className="mb-4">
             <h3 className="text-md font-bold text-[#202124] mb-2">Official Data Reference</h3>
             <p className="text-sm text-slate-600">Calculations are modeled according to the guidelines of: <a href="${ext.url}" target="_blank" rel="nofollow noopener" className="text-[#1a0dab] underline font-medium">${ext.text}</a>.</p>
          </div>`;
    }

    const injectionBlock = `
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          ${externalHtml}
          ${extraInternalHtml}
        </section>
        `;

    let insertIndex = sectionContent.lastIndexOf('</section>');
    if (insertIndex === -1) {
        insertIndex = sectionContent.lastIndexOf('</div>');
    }

    if (insertIndex !== -1) {
        sectionContent = sectionContent.slice(0, insertIndex + 10) + injectionBlock + sectionContent.slice(insertIndex + 10);
        content = content.substring(0, startIndex) + sectionContent + content.substring(endIndex);
        modifiedCount++;
    }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully reset and chained links in ${modifiedCount} calculator sections.`);
