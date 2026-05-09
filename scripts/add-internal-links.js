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
    
    if (internalMatches.length < 4) {
        const relatedStart = sectionContent.indexOf('Related Tools:</span>');
        if (relatedStart !== -1) {
            const blockEnd = sectionContent.indexOf('</div>', relatedStart);
            if (blockEnd !== -1) {
                const blockContent = sectionContent.substring(relatedStart, blockEnd);
                
                let hrefLink = '/calculator/';
                let extraLink = ` &middot; <a href="/calculator/" className="text-[#1a0dab] hover:underline font-semibold">Calculators Hub</a>`;
                
                if (key.includes('math') || key.includes('algebra') || key.includes('calculus')) {
                    hrefLink = '/math-tools/';
                    extraLink = ` &middot; <a href="/math-tools/" className="text-[#1a0dab] hover:underline font-semibold">Math Tools</a>`;
                } else if (key.includes('health') || key.includes('bmi')) {
                    hrefLink = '/health/';
                    extraLink = ` &middot; <a href="/health/" className="text-[#1a0dab] hover:underline font-semibold">Health Tools</a>`;
                } else if (key.includes('finance') || key.includes('tax') || key.includes('loan')) {
                    hrefLink = '/finance/';
                    extraLink = ` &middot; <a href="/finance/" className="text-[#1a0dab] hover:underline font-semibold">Finance Hub</a>`;
                } else if (key.includes('engineering') || key.includes('physics')) {
                    hrefLink = '/engineering/';
                    extraLink = ` &middot; <a href="/engineering/" className="text-[#1a0dab] hover:underline font-semibold">Engineering Hub</a>`;
                }
                
                // If it doesn't already link exactly to hrefLink
                if (!blockContent.includes(`href="${hrefLink}"`)) {
                    const newBlock = blockContent + extraLink + "\n        ";
                    sectionContent = sectionContent.substring(0, relatedStart) + newBlock + sectionContent.substring(blockEnd);
                    
                    content = content.substring(0, startIndex) + sectionContent + content.substring(endIndex);
                    modifiedCount++;
                } else {
                    // It already has the target link, so add a generic alternative
                    if (!blockContent.includes(`href="/"`)) {
                        extraLink = ` &middot; <a href="/" className="text-[#1a0dab] hover:underline font-semibold">Home</a>`;
                        const newBlock = blockContent + extraLink + "\n        ";
                        sectionContent = sectionContent.substring(0, relatedStart) + newBlock + sectionContent.substring(blockEnd);
                        
                        content = content.substring(0, startIndex) + sectionContent + content.substring(endIndex);
                        modifiedCount++;
                    }
                }
            }
        }
    }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`Successfully added internal links to ${modifiedCount} calculator sections.`);
