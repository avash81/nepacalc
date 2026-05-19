const fs = require('fs');

const filePath = 'src/data/seo/financial.tsx';

function balanceTagsForKey(keyName) {
  let fileContent = fs.readFileSync(filePath, 'utf8');

  // Find key bounds
  const keyRegex = /^\s+'([\w-]+)':\s*\{/gm;
  let match;
  const keys = [];
  while ((match = keyRegex.exec(fileContent)) !== null) {
    keys.push({
      name: match[1],
      index: match.index
    });
  }
  for (let i = 0; i < keys.length; i++) {
    keys[i].end = i < keys.length - 1 ? keys[i+1].index : fileContent.length;
  }

  const k = keys.find(x => x.name === keyName);
  if (!k) {
    console.log(`Key ${keyName} not found.`);
    return;
  }
  const keySegment = fileContent.substring(k.index, k.end);
  
  const contentStartIdx = keySegment.indexOf('content: (');
  if (contentStartIdx === -1) {
    console.log(`content: ( not found in key ${keyName}`);
    return;
  }
  
  const searchArea = keySegment.substring(contentStartIdx);
  const faqsIdx = searchArea.indexOf('faqs:');
  const endIdxOfContentInSearch = faqsIdx !== -1 ? searchArea.lastIndexOf(')', faqsIdx) : searchArea.lastIndexOf(')');
  
  if (endIdxOfContentInSearch === -1) {
    console.log(`Could not find end of content JSX for key ${keyName}`);
    return;
  }
  
  const contentBody = searchArea.substring('content: ('.length, endIdxOfContentInSearch);
  
  // Clean all existing trailing closing tags
  let cleanedBody = contentBody.trimEnd();
  while (true) {
    let changed = false;
    if (cleanedBody.endsWith('</div>')) { cleanedBody = cleanedBody.substring(0, cleanedBody.length - 6).trimEnd(); changed = true; }
    else if (cleanedBody.endsWith('</section>')) { cleanedBody = cleanedBody.substring(0, cleanedBody.length - 10).trimEnd(); changed = true; }
    else if (cleanedBody.endsWith('</p>')) { cleanedBody = cleanedBody.substring(0, cleanedBody.length - 4).trimEnd(); changed = true; }
    else if (cleanedBody.endsWith('</a>')) { cleanedBody = cleanedBody.substring(0, cleanedBody.length - 4).trimEnd(); changed = true; }
    else if (cleanedBody.endsWith('</strong>')) { cleanedBody = cleanedBody.substring(0, cleanedBody.length - 9).trimEnd(); changed = true; }
    else if (cleanedBody.endsWith('</span>')) { cleanedBody = cleanedBody.substring(0, cleanedBody.length - 7).trimEnd(); changed = true; }
    if (!changed) break;
  }
  
  // Now trace stack on cleanedBody
  const tagRegex = /<\/?([a-zA-Z1-6]+)(?:\s+[^>]*?)?>/g;
  let tagMatch;
  const finalStack = [];
  while ((tagMatch = tagRegex.exec(cleanedBody)) !== null) {
    const fullTag = tagMatch[0];
    const tagName = tagMatch[1];
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = fullTag.endsWith('/>') || ['br', 'hr', 'img', 'input'].includes(tagName);
    
    if (isSelfClosing) continue;
    
    if (isClosing) {
      if (finalStack.length > 0 && finalStack[finalStack.length - 1] === tagName) {
        finalStack.pop();
      } else {
        const idx = finalStack.lastIndexOf(tagName);
        if (idx !== -1) {
          while (finalStack.length > idx) {
            finalStack.pop();
          }
        }
      }
    } else {
      finalStack.push(tagName);
    }
  }
  
  console.log(`[${keyName}] Reconstructed open stack:`, finalStack);
  
  // Build closing sequence
  const closingSequence = [...finalStack].reverse().map(t => `</${t}>`).join('\n        ');
  const newContentBody = cleanedBody + '\n        ' + closingSequence + '\n    ';
  
  // Reconstruct file content
  const newSearchArea = 'content: (' + newContentBody + searchArea.substring(endIdxOfContentInSearch);
  const newKeySegment = keySegment.substring(0, contentStartIdx) + newSearchArea;
  const newFileContent = fileContent.substring(0, k.index) + newKeySegment + fileContent.substring(k.end);
  
  fs.writeFileSync(filePath, newFileContent, 'utf8');
  console.log(`[${keyName}] Patched and saved!`);
}

balanceTagsForKey('mortgage-calculator');
balanceTagsForKey('nepal-salary');
console.log('All balancing finished successfully.');
