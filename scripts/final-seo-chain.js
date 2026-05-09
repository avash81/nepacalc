const fs = require('fs');
const path = require('path');

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

function processFile(filePath) {
    console.log(`Processing ${filePath}...`);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Strip existing chain blocks
    const blockRegex = /<section className="mb-12 bg-\[#f8f9fa\] border border-\[#dadce0\] p-6 rounded-xl mt-8">[\s\S]*?<\/section>/g;
    content = content.replace(blockRegex, '');

    // 2. Find all calculator keys
    const keyRegex = /'([a-zA-Z0-9-]+)':\s*{/g;
    let match;
    const keys = [];
    while ((match = keyRegex.exec(content)) !== null) {
        keys.push(match[1]);
    }
    console.log(`Found ${keys.length} keys in ${filePath}.`);

    // 3. Process each section
    let newContent = content;
    const formatTitle = (k) => k.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    for (let i = keys.length - 1; i >= 0; i--) {
        const key = keys[i];
        const nextKeys = [
            keys[(i + 1) % keys.length],
            keys[(i + 2) % keys.length],
            keys[(i + 3) % keys.length],
            keys[(i + 4) % keys.length],
            keys[(i + 5) % keys.length]
        ];

        const internalLinksHtml = nextKeys.map(k => 
            `<a href="/calculator/${k}/" className="text-[#1a0dab] hover:underline font-semibold bg-white border border-[#dadce0] px-3 py-1.5 rounded-full shadow-sm">${formatTitle(k)}</a>`
        ).join('\n                ');

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
          <div className="mt-4 pt-4 border-t border-[#dadce0]">
             <span className="font-bold text-[#202124] text-sm block mb-3">Explore the NepaCalc Network:</span>
             <div className="flex flex-wrap gap-3 text-sm">
                ${internalLinksHtml}
             </div>
          </div>
        </section>
        `;

        const startMarker = `'${key}': {`;
        const nextKeyStr = i < keys.length - 1 ? `'${keys[i+1]}': {` : null;
        const searchStart = newContent.indexOf(startMarker);
        const searchEnd = nextKeyStr ? newContent.indexOf(nextKeyStr, searchStart) : newContent.lastIndexOf('};');
        
        if (searchStart === -1) continue;

        let section = newContent.substring(searchStart, searchEnd);
        
        // --- Injection ---
        let insertIndex = section.lastIndexOf('</section>');
        if (insertIndex === -1) insertIndex = section.lastIndexOf('</div>');
        if (insertIndex === -1) insertIndex = section.lastIndexOf('</>');

        if (insertIndex !== -1) {
            const endOfTag = section.indexOf('>', insertIndex);
            if (endOfTag !== -1) {
                section = section.slice(0, endOfTag + 1) + injectionBlock + section.slice(endOfTag + 1);
            }
        }

        // --- Surgical Fixes for JSX (Only within this section) ---
        section = section.replace(/\(&\)/g, "(&amp;)");
        section = section.replace(/\(<<\)/g, "(&lt;&lt;)");
        section = section.replace(/two's complement/g, "two&apos;s complement");
        section = section.replace(/meter's/g, "meter&apos;s");
        section = section.replace(/bank's/g, "bank&apos;s");
        section = section.replace(/user's/g, "user&apos;s");
        section = section.replace(/it's/g, "it&apos;s");
        section = section.replace(/don't/g, "don&apos;t");
        section = section.replace(/Nepal's/g, "Nepal&apos;s");

        newContent = newContent.substring(0, searchStart) + section + newContent.substring(searchEnd);
    }

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Successfully processed ${filePath}.`);
}

processFile('src/data/seo-content.tsx');
processFile('src/data/seo/nepal.tsx');
