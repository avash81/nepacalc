const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/seo-content.tsx');
let fileContent = fs.readFileSync(filePath, 'utf8');

const calcKeys = [];
const keyRegex = /'([a-zA-Z0-9-]+)'\s*:\s*\{/g;
let match;
while ((match = keyRegex.exec(fileContent)) !== null) {
    calcKeys.push({ key: match[1], index: match.index });
}
console.log(`Found ${calcKeys.length} calculators.`);

const externalLinks = [
    { url: "https://www.nrb.org.np/", label: "Nepal Rastra Bank" },
    { url: "https://www.investopedia.com/", label: "Investopedia" },
    { url: "https://en.wikipedia.org/wiki/Mathematics", label: "Wikipedia Mathematics" },
    { url: "https://mathworld.wolfram.com/", label: "Wolfram MathWorld" }
];

const externalLinkIndices = new Set([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95]);

let newFileContent = fileContent;

// Process from bottom to top to keep indices stable
for (let i = calcKeys.length - 1; i >= 0; i--) {
    const calc = calcKeys[i];
    const key = calc.key;
    const startIndex = calc.index;
    
    let endIndex = (i === calcKeys.length - 1) 
        ? newFileContent.lastIndexOf('};') 
        : calcKeys[i+1].index;

    let block = newFileContent.slice(startIndex, endIndex);

    // Find all <p> tags in this block
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/g;
    let pMatches = [];
    let pMatch;
    while ((pMatch = pRegex.exec(block)) !== null) {
        if (pMatch[1].length > 60 && !pMatch[1].includes('<a ') && !pMatch[1].includes('<Link ')) {
            pMatches.push({ full: pMatch[0], inner: pMatch[1], index: pMatch.index });
        }
    }

    if (pMatches.length < 3) continue;

    const numInternalLinks = Math.min(pMatches.length, 4 + Math.floor(Math.random() * 2));
    const selectedIndices = [];
    while (selectedIndices.length < numInternalLinks) {
        const idx = Math.floor(Math.random() * pMatches.length);
        if (!selectedIndices.includes(idx)) selectedIndices.push(idx);
    }

    let modifiedBlock = block;
    let blockOffset = 0;

    // Internal links
    for (let j = 0; j < selectedIndices.length; j++) {
        const pIdx = selectedIndices[j];
        const pMatch = pMatches[pIdx];
        
        const targetKey = calcKeys[(i + j + 1) % calcKeys.length].key;
        const targetUrl = `/calculator/${targetKey}/`;

        const words = pMatch.inner.split(/\s+/).filter(w => w.length > 5 && /^[a-zA-Z]+$/.test(w));
        if (words.length === 0) continue;
        
        const wordToWrap = words[Math.floor(Math.random() * words.length)];
        const linkHtml = `<Link href="${targetUrl}" className="text-[#1a0dab] hover:underline font-medium">${wordToWrap}</Link>`;
        
        const newPInner = pMatch.inner.replace(wordToWrap, linkHtml);
        const newPFull = pMatch.full.replace(pMatch.inner, newPInner);

        const currentPIndexInBlock = pMatch.index + blockOffset;
        modifiedBlock = modifiedBlock.slice(0, currentPIndexInBlock) + newPFull + modifiedBlock.slice(currentPIndexInBlock + pMatch.full.length);
        blockOffset += newPFull.length - pMatch.full.length;
    }

    // External link (if applicable)
    if (externalLinkIndices.has(i)) {
        // Find a paragraph that WASN'T picked for internal link if possible
        const remainingIndices = pMatches.map((_, idx) => idx).filter(idx => !selectedIndices.includes(idx));
        const extPIdx = remainingIndices.length > 0 ? remainingIndices[0] : selectedIndices[0];
        
        // We need to re-scan for the paragraph because the block changed
        // But since we are processing one block at a time, we can just do a second pass on the modified block
        const extLink = externalLinks[i % externalLinks.length];
        
        // Simpler: find the FIRST <p> in the modified block that doesn't have an <a> tag
        const extPRegex = /<p[^>]*>([\s\S]*?)<\/p>/g;
        let extPMatch;
        let found = false;
        let secondPassOffset = 0;
        let secondPassBlock = modifiedBlock;

        while ((extPMatch = extPRegex.exec(modifiedBlock)) !== null) {
            if (!extPMatch[1].includes('<a ') && extPMatch[1].length > 40) {
                const words = extPMatch[1].split(/\s+/).filter(w => w.length > 7 && /^[a-zA-Z]+$/.test(w));
                if (words.length > 0) {
                    const wordToWrap = words[Math.floor(Math.random() * words.length)];
                    const extLinkHtml = `<a href="${extLink.url}" target="_blank" rel="noopener noreferrer" className="text-[#1a0dab] hover:underline font-medium">${wordToWrap}</a>`;
                    const newPInner = extPMatch[1].replace(wordToWrap, extLinkHtml);
                    const newPFull = extPMatch[0].replace(extPMatch[1], newPInner);
                    
                    secondPassBlock = modifiedBlock.slice(0, extPMatch.index) + newPFull + modifiedBlock.slice(extPMatch.index + extPMatch[0].length);
                    found = true;
                    break;
                }
            }
        }
        if (found) modifiedBlock = secondPassBlock;
    }

    newFileContent = newFileContent.slice(0, startIndex) + modifiedBlock + newFileContent.slice(endIndex);
}

fs.writeFileSync(filePath, newFileContent, 'utf8');
console.log("Successfully injected natural links (internal and external) bottom-to-top.");
