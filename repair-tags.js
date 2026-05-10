const fs = require('fs');
const path = require('path');

const seoDir = 'c:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/data/seo';
const files = ['financial.tsx', 'market-rates.tsx', 'health.tsx', 'algebra.tsx', 'construction.tsx', 'nepal-specific.tsx', 'unit-conversion.tsx'];

files.forEach(filename => {
    const filePath = path.join(seoDir, filename);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Fix missing closing parentheses in common patterns
    content = content.replace(/\((SIP|FY 2082\/83|NRB|LTV|FMV|EAR|DRIP|i|n|nper|t|kg\/m²|Class I|Step-up|RETIREMENT CORPUS|Principal|Duration|Expected Return|Wealth Created|Invested|Estimated Returns|Pure Profit|Final Corpus|Maturity Value|Fixed|Historical|Reducing Balance|Malpot Rate|FMV|Distress Value|Annual Rate|Quarterly Compounding|NRB Standard|EAR|Time|t|Rule of 72|Doubling Time|Sajha\/Byaj|KUKL Tariffs|Dhal Kar|Unmetered|Pipe Diameter|Connection Status|Volume Input|Minimum Fee|Excess Volume|Sewage Surcharge|Fines|Total Bill|i|n|nper|t|kg\/m²|Class I|Step-up|RETIREMENT CORPUS|Principal|Duration|Expected Return|Wealth Created|Invested|Estimated Returns|Pure Profit|Final Corpus|Maturity Value|Fixed|Historical|Reducing Balance|Malpot Rate|FMV|Distress Value|Annual Rate|Quarterly Compounding|NRB Standard|EAR|Time|t|Rule of 72|Doubling Time|Sajha\/Byaj|KUKL Tariffs|Dhal Kar|Unmetered|Pipe Diameter|Connection Status|Volume Input|Minimum Fee|Excess Volume|Sewage Surcharge|Fines|Total Bill|i|n|nper|t|kg\/m²|Class I|Step-up|RETIREMENT CORPUS|Principal|Duration|Expected Return|Wealth Created|Invested|Estimated Returns|Pure Profit|Final Corpus|Maturity Value|Fixed|Historical|Reducing Balance|Malpot Rate|FMV|Distress Value|Annual Rate|Quarterly Compounding|NRB Standard|EAR|Time|t|Rule of 72|Doubling Time|Sajha\/Byaj|KUKL Tariffs|Dhal Kar|Unmetered|Pipe Diameter|Connection Status|Volume Input|Minimum Fee|Excess Volume|Sewage Surcharge|Fines|Total Bill)\s+/g, (match, p1) => {
        return `(${p1}) `;
    });

    // 2. Fix unclosed tags in content blocks
    const contentRegex = /content:\s*\(\s*([\s\S]*?)\s*\n\s*\),\s*(faqs|formula|howToUse)/g;
    content = content.replace(contentRegex, (fullMatch, block, nextField) => {
        let repairedBlock = block;
        
        // Count tags
        const tags = [];
        const tagRegex = /<(\/?[a-z0-9]+)([^>]*)>/gi;
        let match;
        
        const stack = [];
        const selfClosing = ['img', 'br', 'hr', 'input', 'meta', 'link'];

        while ((match = tagRegex.exec(repairedBlock)) !== null) {
            let tagName = match[1].toLowerCase();
            if (tagName.startsWith('/')) {
                tagName = tagName.substring(1);
                if (stack.length > 0 && stack[stack.length - 1] === tagName) {
                    stack.pop();
                } else {
                    // Mismatched closing tag - check if it exists in stack
                    const idx = stack.lastIndexOf(tagName);
                    if (idx !== -1) {
                        // Close all tags up to this one
                        stack.splice(idx);
                    }
                }
            } else {
                if (!selfClosing.includes(tagName) && !match[0].endsWith('/>')) {
                    stack.push(tagName);
                }
            }
        }

        // Close remaining tags in reverse order
        while (stack.length > 0) {
            const tag = stack.pop();
            repairedBlock += `</${tag}>`;
        }

        return `content: (\n        ${repairedBlock.trim()}\n    ),\n    ${nextField}`;
    });

    // 3. Special fix for 'li' tags that are siblings without closing
    // Only add </li> if it's NOT already there
    content = content.replace(/<li([^>]*)>([\s\S]*?)(?=(<li|<\/ol|<\/ul))/g, (match, attrs, body) => {
        if (body.trim().endsWith('</li>')) return match;
        return `<li${attrs}>${body}</li>`;
    });

    fs.writeFileSync(filePath, content);
    console.log(`Repaired ${filename}`);
});
