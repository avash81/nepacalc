const fs = require('fs');
const path = require('path');

const seoDir = 'c:/Users/hp/Desktop/Movie/calcpro-FIXED/calcpro-final-build/src/data/seo';
const files = fs.readdirSync(seoDir).filter(f => f.endsWith('.tsx') && f !== 'types.ts' && f !== 'index.tsx');

files.forEach(filename => {
    const filePath = path.join(seoDir, filename);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Fix the "Card" pattern where a div opens but never closes before the next one
    // Pattern: <div ...> <h4 ...> ... </h4> <p ...> ... </p> <div
    // We want to add </div> after the <p>
    content = content.replace(/(<div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">[\s\S]*?<h4[\s\S]*?<\/h4>[\s\S]*?<p[\s\S]*?<\/p>)(?=\s*<(div|section|h3|h2))/g, (match) => {
        if (match.includes('</div>')) return match;
        return match + '\n        </div>';
    });

    // 2. Fix the "Grid" pattern where a grid div opens but never closes before a section or h3
    content = content.replace(/(<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">[\s\S]*?)(?=\s*<\/section>)/g, (match) => {
        if (match.includes('</div>')) {
            // Count opening and closing divs
            const opens = (match.match(/<div/g) || []).length;
            const closes = (match.match(/<\/div>/g) || []).length;
            if (opens > closes) {
                return match + '\n        '.repeat(opens - closes) + '</div>'.repeat(opens - closes);
            }
            return match;
        }
        return match + '\n        </div>';
    });

    // 3. Fix missing closing parentheses in specific technical terms
    const terms = ['SIP', 'FY 2082/83', 'NRB', 'LTV', 'FMV', 'EAR', 'DRIP', 'i', 'n', 'nper', 't', 'kg/m²', 'Class I', 'Step-up', 'RETIREMENT CORPUS', 'Muluki Ain', 'IRD', 'NEPSE', 'KUKL Tariffs', 'Dhal Kar'];
    terms.forEach(term => {
        const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\(${escapedTerm}(?!\\))(?=[\\s\\.,<])`, 'g');
        content = content.replace(regex, `(${term})`);
    });

    // 4. Fix unclosed <li> in <ul>/ <ol>
    content = content.replace(/<li([^>]*)>([\s\S]*?)(?=(<li|<\/ol|<\/ul))/g, (match, attrs, body) => {
        if (body.trim().endsWith('</li>')) return match;
        return `<li${attrs}>${body.trim()}</li>\n        `;
    });

    // 5. Final Tag Balancer for each content block
    const contentBlocks = [];
    const blockRegex = /content:\s*\(\s*([\s\S]*?)\s*\n\s*\),\s*(faqs|formula|howToUse)/g;
    
    content = content.replace(blockRegex, (fullMatch, block, nextField) => {
        let repairedBlock = block.trim();
        
        // Remove trailing piles of closing tags that were likely added by previous failed repairs
        repairedBlock = repairedBlock.replace(/(<\/div>\s*|<\/section>\s*|<\/p>\s*){5,}$/, '');

        const stack = [];
        const selfClosing = ['img', 'br', 'hr', 'input', 'meta', 'link'];
        const tagRegex = /<(\/?[a-z0-9]+)([^>]*)>/gi;
        let match;
        
        // We need to be careful with stack
        // JSX Fragments <> </>
        const fragmentRegex = /<>\s*|(?<=[\s\S])<\/>/g;
        
        // Simplified approach: just count and append
        let divCount = (repairedBlock.match(/<div/g) || []).length;
        let divCloseCount = (repairedBlock.match(/<\/div>/g) || []).length;
        let sectionCount = (repairedBlock.match(/<section/g) || []).length;
        let sectionCloseCount = (repairedBlock.match(/<\/section>/g) || []).length;
        let pCount = (repairedBlock.match(/<p/g) || []).length;
        let pCloseCount = (repairedBlock.match(/<\/p>/g) || []).length;
        let fragmentCount = (repairedBlock.match(/<>/g) || []).length;
        let fragmentCloseCount = (repairedBlock.match(/<\/>/g) || []).length;

        while (pCount > pCloseCount) { repairedBlock += '</p>'; pCloseCount++; }
        while (sectionCount > sectionCloseCount) { repairedBlock += '\n        </section>'; sectionCloseCount++; }
        while (divCount > divCloseCount) { repairedBlock += '\n        </div>'; divCloseCount++; }
        while (fragmentCount > fragmentCloseCount) { repairedBlock += '\n        </>'; fragmentCloseCount++; }

        return `content: (\n        ${repairedBlock}\n    ),\n    ${nextField}`;
    });

    fs.writeFileSync(filePath, content);
    console.log(`Deep repaired ${filename}`);
});
