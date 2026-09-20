const fs = require('fs');
const file = 'src/app/nepal/bluebook-renewal-nepal/page.tsx';
let text = fs.readFileSync(file, 'utf8');

// Add id="portals" to the h3
text = text.replace('<h3 className={h3}>2. Provincial EDL/VRS Portals</h3>', '<h3 id="portals" className={`${h3} scroll-mt-24`}>2. Provincial EDL/VRS Portals</h3>');

// Add to Mobile TOC
const mobileTocFind = `['#online', 'How to Renew Your Bluebook Online in Nepal'],`;
const mobileTocReplace = `['#online', 'How to Renew Your Bluebook Online in Nepal'],
                        ['#portals', '— Provincial EDL/VRS Portals'],`;
text = text.replace(mobileTocFind, mobileTocReplace);

// Add to Desktop TOC
const desktopTocFind = `['#online', 'How to Renew Your Bluebook Online in Nepal'],`;
const desktopTocReplace = `['#online', 'How to Renew Your Bluebook Online in Nepal'],
                  ['#portals', '— Provincial EDL/VRS Portals'],`;
text = text.replace(desktopTocFind, desktopTocReplace);

fs.writeFileSync(file, text, 'utf8');
