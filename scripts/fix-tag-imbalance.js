const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/seo/nepal-specific.tsx');
let content = fs.readFileSync(file, 'utf8');

// Pattern: Find all content: ( ... ), blocks
const blocks = content.match(/content: \([\s\S]+?\n\s+\),/g);

if (blocks) {
  blocks.forEach(block => {
    // Count <div vs </div>
    const openTags = (block.match(/<div/g) || []).length;
    const closeTags = (block.match(/<\/div>/g) || []).length;
    
    if (openTags !== closeTags) {
      console.log(`Imbalance found in block: ${openTags} opens vs ${closeTags} closes.`);
      console.log(block.substring(0, 100) + '...');
      
      if (closeTags > openTags) {
        // Remove extra closing divs at the end of the block
        let fixedBlock = block;
        while ((fixedBlock.match(/<div/g) || []).length < (fixedBlock.match(/<\/div>/g) || []).length) {
            fixedBlock = fixedBlock.replace(/<\/div>\n\s+<\/div>\n\s+\),/, '</div>\n    ),');
            // If the above didn't match, try simpler
            if (fixedBlock === block) {
                 fixedBlock = fixedBlock.replace(/<\/div>\s+<\/div>\s+\),/, '</div>\n    ),');
            }
            if (fixedBlock === block) break; // Safety
        }
        content = content.replace(block, fixedBlock);
      }
    }
  });
}

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed tag imbalances in nepal-specific.tsx');
