const fs = require('fs');
const file = 'src/app/water/kukl-bill-payment/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add nofollow to all external links
content = content.replace(/rel="noopener noreferrer"/g, 'rel="nofollow noopener noreferrer"');

// 2. Unlink all eSewa, Khalti, ConnectIPS, Fonepay links (keep the text but bold it)
content = content.replace(/<a href="https:\/\/(esewa\.com\.np|khalti\.com|connectips\.com|fonepay\.com)\/"[^>]*>(.*?)<\/a>/g, '<strong>$2</strong>');

// 3. Keep ONLY the FIRST KUKL Customer Portal link, unlink the rest
let firstKukl = true;
content = content.replace(/<a href="https:\/\/customer\.kukl\.org\.np\/"[^>]*>(.*?)<\/a>/g, (match, text) => {
  if (firstKukl) {
    firstKukl = false;
    return match; // keep the first link
  }
  return '<strong>' + text + '</strong>'; // unlink subsequent
});

// 4. Add more Nepal links to You May Also Like
const searchString = `<li><Link href="/market-rates/remittance/" className="hover:underline">→ Today's Remittance Rates</Link></li>`;
const replaceString = `<li><Link href="/market-rates/remittance/" className="hover:underline">→ Today's Remittance Rates</Link></li>
              <li><Link href="/calculator/nepali-date/" className="hover:underline">→ Nepali Date Converter</Link></li>
              <li><Link href="/calculator/nepal-vehicle-tax/" className="hover:underline">→ Nepal Vehicle Tax Calculator</Link></li>`;

content = content.replace(searchString, replaceString);

fs.writeFileSync(file, content);
console.log('Replacements complete');
