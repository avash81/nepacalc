const fs = require('fs');

let content = fs.readFileSync('src/app/calculator/gold-converter/page.tsx', 'utf8');

// 1. Add scope="col" to all th elements that don't already have it
content = content.replace(/<th className="py-2\.5 px-4">/g, '<th scope="col" className="py-2.5 px-4">');

// 2. Add id anchors to each h3 heading + a <caption> to the immediately following table
const tableMap = [
  { heading: '1. Tola → Gram / Aana / Lal',     id: 'tola-to-gram',    caption: 'Tola to Gram, Aana and Lal conversion table — Nepal gold units' },
  { heading: '2. Gram → Tola / Aana / Lal',     id: 'gram-to-tola',    caption: 'Gram to Tola, Aana and Lal conversion table — Nepal gold units' },
  { heading: '3. Aana → Lal / Gram / Tola',     id: 'aana-to-lal',     caption: 'Aana to Lal, Gram and Tola conversion table — Nepal gold units' },
  { heading: '4. Lal → Gram / Aana / Tola',     id: 'lal-to-gram',     caption: 'Lal to Gram, Aana and Tola conversion table — Nepal gold units' },
  { heading: '5. Common Kilogram → Gram / Tola', id: 'kilogram-to-tola', caption: 'Kilogram to Gram and Tola conversion table — Nepal gold units' },
  { heading: '6. Troy Ounce → Gram / Tola',      id: 'troy-oz-to-tola', caption: 'Troy Ounce to Gram and Tola conversion table — international gold weights' },
  { heading: '7. Tola → Troy Ounce',             id: 'tola-to-troy-oz', caption: 'Tola to Troy Ounce conversion table — Nepal gold to international weights' },
  { heading: '8. Gram → Milligram',              id: 'gram-to-milligram', caption: 'Gram to Milligram conversion table — gold weight reference' },
];

for (const t of tableMap) {
  // Add id to h3
  const h3Old = `<h3 className="font-bold text-slate-900 mb-2 mt-8">${t.heading}</h3>`;
  const h3New = `<h3 id="${t.id}" className="font-bold text-slate-900 mb-2 mt-8">${t.heading}</h3>`;
  content = content.replace(h3Old, h3New);

  // Add <caption> inside the next <table> after this heading
  // The table starts with <table className="min-w-full text-sm text-left">
  // We insert caption as first child
  const tableTag = '<table className="min-w-full text-sm text-left">';
  const captionInsert = `<table className="min-w-full text-sm text-left">\n                <caption className="sr-only">${t.caption}</caption>`;
  
  // Only replace the FIRST occurrence after the h3
  const h3Pos = content.indexOf(h3New);
  if (h3Pos === -1) { console.log('Could not find: ' + t.heading); continue; }
  const tablePos = content.indexOf(tableTag, h3Pos);
  if (tablePos === -1) { console.log('Could not find table for: ' + t.heading); continue; }
  content = content.substring(0, tablePos) + captionInsert + content.substring(tablePos + tableTag.length);
}

// 3. Add caption + scope to the main master table too
const masterTableOld = `<h2 id="conversion-table" className="text-2xl font-black text-slate-900 mt-12 mb-6">Nepal Gold Conversion\n          Table</h2>`;
// Use a simpler approach — find master table heading and add its caption
// The master table has th elements like <th className="py-2.5 px-4">Unit</th>
// Already handled scope above. Add caption to master table:
const masterTableTag = '<table className="min-w-full text-sm text-left">';
const masterH2Pos = content.indexOf('id="conversion-table"');
if (masterH2Pos !== -1) {
  const masterTablePos = content.indexOf(masterTableTag, masterH2Pos);
  if (masterTablePos !== -1) {
    // Check it doesn't already have a caption
    const nextFew = content.substring(masterTablePos, masterTablePos + 200);
    if (!nextFew.includes('<caption')) {
      content = content.substring(0, masterTablePos) + 
        '<table className="min-w-full text-sm text-left">\n                <caption className="sr-only">Core Nepal gold unit conversion table — Tola, Aana, Lal, Gram, Kilogram</caption>' +
        content.substring(masterTablePos + masterTableTag.length);
    }
  }
}

fs.writeFileSync('src/app/calculator/gold-converter/page.tsx', content);
console.log('Done — scope, id anchors, and captions applied.');
