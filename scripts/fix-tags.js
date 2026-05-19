/**
 * Systematic JSX tag balance fixer for algebra.tsx and financial.tsx
 * Uses a stack-based parser to find and fix closing tag mismatches.
 */
const fs = require('fs');
const path = require('path');

/**
 * Find position 42205 in algebra.tsx and show context
 */
function showContext(filePath, position) {
  const content = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
  const start = Math.max(0, position - 150);
  const end = Math.min(content.length, position + 200);
  const lines = content.substring(0, position).split('\n');
  console.log(`\n=== ${filePath} @ char ${position} (line ~${lines.length}) ===`);
  console.log(content.substring(start, end));
  return content;
}

/**
 * In a section block that ends with many </div> before </section>,
 * figure out how many are excess and remove them.
 * Strategy: scan backwards from </section> to count nested divs.
 */
function fixExcessDivsBeforeSection(content, position) {
  // position is where the mismatch was found (a </div> where </section> expected)
  // Find the preceding </section> marker nearby
  const before = content.substring(0, position + 10);
  const sectionClose = before.lastIndexOf('</section>');
  
  // Find the </section> after the mismatch position
  const afterMismatch = content.indexOf('</section>', position);
  
  // The block from position to afterMismatch contains the excess </div> tags
  const segment = content.substring(position, afterMismatch + 10);
  console.log('Segment to fix:', JSON.stringify(segment.substring(0, 200)));
  
  return { sectionClose, afterMismatch, segment };
}

// ── algebra.tsx ──────────────────────────────────────────────────────────────
{
  const filePath = 'src/data/seo/algebra.tsx';
  let content = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
  const lines = content.split('\n');
  
  // Find all dark section blocks (bg-slate-900) in content areas
  // These have the pattern: multiple </div> followed by </section>
  // We need exactly 3 </div> before </section> (closing: quote-box, space-y-4, grid)
  
  // Find the percentage-calculator dark section - it's around position 42205
  // Let's find it by context
  const markers = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('bg-slate-900') && lines[i].includes('rounded-2xl') && lines[i].includes('section')) {
      markers.push(i + 1);
    }
  }
  console.log('Dark section lines in algebra.tsx:', markers);
  
  // For each dark section, count the closing divs before </section>
  // and trim to exactly 3
  let modified = false;
  const newLines = [...lines];
  
  for (let i = 0; i < markers.length; i++) {
    const startLine = markers[i];
    // Find the </section> that closes this block
    for (let j = startLine; j < newLines.length; j++) {
      if (newLines[j].trim() === '</section>') {
        // Count consecutive </div> lines immediately before this </section>
        let divCount = 0;
        let k = j - 1;
        while (k >= 0 && newLines[k].trim() === '</div>') {
          divCount++;
          k--;
        }
        if (divCount > 3) {
          const excess = divCount - 3;
          console.log(`Line ${j+1}: Found ${divCount} </div> before </section>, removing ${excess} excess`);
          // Remove the excess </div> lines (they are at k+1 to k+excess)
          newLines.splice(k + 1, excess);
          // Adjust markers for subsequent iterations
          for (let m = i + 1; m < markers.length; m++) {
            markers[m] -= excess;
          }
          modified = true;
          break;
        }
        break;
      }
    }
  }
  
  if (modified) {
    fs.writeFileSync(path.join(process.cwd(), filePath), newLines.join('\n'), 'utf8');
    console.log('✓ Fixed algebra.tsx');
  } else {
    console.log('No changes needed in algebra.tsx (or pattern not matched)');
  }
}

// ── financial.tsx ─────────────────────────────────────────────────────────────
// Position 48744 issue — </div> where nothing expected (unmatched)
{
  const filePath = 'src/data/seo/financial.tsx';
  let content = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
  const pos = 48744;
  const lines = content.substring(0, pos).split('\n');
  const lineNum = lines.length;
  console.log(`\nfinancial.tsx mismatch at char ${pos} = line ~${lineNum}`);
  console.log('Context:', JSON.stringify(content.substring(pos - 100, pos + 200)));
}
