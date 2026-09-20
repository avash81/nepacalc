const fs = require('fs');
const file = 'src/app/nepal/bluebook-renewal-nepal/page.tsx';
let text = fs.readFileSync(file, 'utf8');

// Add #portals to desktop TOC (after #online, before #documents - desktop uses \r\n)
const oldDesktop = "['#online', 'How to Renew Your Bluebook Online in Nepal'],\r\n                  ['#documents'";
const newDesktop = "['#online', 'How to Renew Your Bluebook Online in Nepal'],\r\n                  ['#portals', '\u2014 Provincial EDL/VRS Portals'],\r\n                  ['#documents'";

if (text.includes(oldDesktop)) {
  text = text.replace(oldDesktop, newDesktop);
  fs.writeFileSync(file, text, 'utf8');
  console.log('Desktop TOC updated.');
} else {
  // Try with \n only
  const oldD2 = "['#online', 'How to Renew Your Bluebook Online in Nepal'],\n                  ['#documents'";
  const newD2 = "['#online', 'How to Renew Your Bluebook Online in Nepal'],\n                  ['#portals', '\u2014 Provincial EDL/VRS Portals'],\n                  ['#documents'";
  if (text.includes(oldD2)) {
    text = text.replace(oldD2, newD2);
    fs.writeFileSync(file, text, 'utf8');
    console.log('Desktop TOC updated (LF).');
  } else {
    console.log('Target not found. Checking context...');
    const idx = text.indexOf("'#documents'");
    console.log(JSON.stringify(text.substring(idx - 120, idx + 20)));
  }
}
