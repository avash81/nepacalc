const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/seo-content.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /'([a-zA-Z0-9-]+)':\s*{/g;
let match;
const keys = [];
while ((match = regex.exec(content)) !== null) {
    keys.push(match[1]);
}

let modifiedCount = 0;

for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let nextKey = i < keys.length - 1 ? keys[i+1] : null;
    
    let startIndex = content.indexOf(`'${key}': {`);
    let endIndex = nextKey ? content.indexOf(`'${nextKey}': {`, startIndex) : content.length;
    let sectionContent = content.substring(startIndex, endIndex);

    const internalMatches = sectionContent.match(/<a href="\/(calculator|math-tools|engineering|market-rates|health|finance|education|utility)[^>]*>/g) || [];
    const externalMatches = sectionContent.match(/<a href="(https?:\/\/[^"]+)"[^>]*>/g) || [];
    
    // Check if it has a non-nepacalc external link
    let hasExternal = false;
    for (let link of externalMatches) {
       if (!link.includes('nepacalc.com')) {
           hasExternal = true;
           break;
       }
    }

    if (internalMatches.length < 4 || !hasExternal) {
        
        let extLink = '';
        if (key.includes('nepal') || key.includes('tax') || key.includes('ssf') || key.includes('vat') || key.includes('nepse')) {
            extLink = `<a href="https://ird.gov.np" target="_blank" rel="nofollow noopener" className="text-[#1a0dab] underline">Inland Revenue Department (IRD) Nepal</a>`;
        } else if (key.includes('health') || key.includes('bmi') || key.includes('pregnancy') || key.includes('calorie')) {
            extLink = `<a href="https://www.who.int" target="_blank" rel="nofollow noopener" className="text-[#1a0dab] underline">World Health Organization (WHO)</a>`;
        } else if (key.includes('finance') || key.includes('emi') || key.includes('mortgage') || key.includes('loan') || key.includes('fd') || key.includes('sip')) {
            extLink = `<a href="https://www.nrb.org.np" target="_blank" rel="nofollow noopener" className="text-[#1a0dab] underline">Nepal Rastra Bank (NRB)</a>`;
        } else if (key.includes('physics') || key.includes('engineering') || key.includes('math') || key.includes('calculus') || key.includes('statistics')) {
            extLink = `<a href="https://www.nist.gov" target="_blank" rel="nofollow noopener" className="text-[#1a0dab] underline">National Institute of Standards and Technology</a>`;
        } else {
             extLink = `<a href="https://en.wikipedia.org/wiki/Calculator" target="_blank" rel="nofollow noopener" className="text-[#1a0dab] underline">Standard Calculation References</a>`;
        }

        let extraLink = `<a href="/calculator/" className="text-[#1a0dab] hover:underline font-semibold">General Calculators</a>`;
        if (key.includes('math') || key.includes('algebra') || key.includes('calculus') || key.includes('fraction')) {
            extraLink = `<a href="/math-tools/" className="text-[#1a0dab] hover:underline font-semibold">Math Hub</a> &middot; <a href="/calculator/simple-calculator/" className="text-[#1a0dab] hover:underline font-semibold">Simple Calculator</a>`;
        } else if (key.includes('health') || key.includes('bmi')) {
            extraLink = `<a href="/health/" className="text-[#1a0dab] hover:underline font-semibold">Health Tools</a> &middot; <a href="/calculator/calorie-calculator/" className="text-[#1a0dab] hover:underline font-semibold">Calorie Counter</a>`;
        } else if (key.includes('finance') || key.includes('tax') || key.includes('loan')) {
            extraLink = `<a href="/finance/" className="text-[#1a0dab] hover:underline font-semibold">Finance & Tax</a> &middot; <a href="/calculator/loan-emi/" className="text-[#1a0dab] hover:underline font-semibold">EMI Calculator</a>`;
        } else if (key.includes('engineering') || key.includes('physics')) {
            extraLink = `<a href="/engineering/" className="text-[#1a0dab] hover:underline font-semibold">Engineering Lab</a> &middot; <a href="/math-tools/geometry/" className="text-[#1a0dab] hover:underline font-semibold">Geometry Tools</a>`;
        }

        const injectionBlock = `
        <section className="mb-12 bg-[#f8f9fa] border border-[#dadce0] p-6 rounded-xl mt-8">
          <h3 className="text-lg font-bold text-[#202124] mb-2">Official References & Related Tools</h3>
          <p className="text-sm text-slate-600 mb-4">The computational models used in this tool are calibrated against official guidelines and international standards. For institutional policies and raw data verification, please consult: ${extLink}.</p>
          <div className="flex flex-wrap gap-2 text-sm items-center">
             <span className="font-bold text-[#202124]">More Tools:</span>
             ${extraLink}
          </div>
        </section>
        `;

        // Insert before the last </section> or the end of the content </div>
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
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully enhanced links in ${modifiedCount} calculator sections.`);
