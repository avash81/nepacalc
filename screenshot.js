const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });

  const urls = [
    { path: '/calculator/age-calculator/', dest: 'public/images/age-calculator.webp' },
    { path: '/calculator/nepal-salary/', dest: 'public/images/salary-tax-calculator-nepal.webp' },
    { path: '/calculator/momo-calorie-counter/', dest: 'public/images/momo-calorie-calculator.webp' },
    { path: '/calculator/kukl-bill/', dest: 'public/images/kukl-water-bill-calculator.webp' },
    { path: '/calculator/nepal-income-tax/', dest: 'public/images/nepal-income-tax-calculator-2083-2084.webp' },
    { path: '/income-tax/how-to-calculate-income-tax-nepal/', dest: 'public/images/how-to-calculate-income-tax-nepal-2083-84.webp' },
    { path: '/income-tax/nepal-income-tax-slab-2083-84/', dest: 'public/images/nepal-income-tax-slab-2083-84.webp' },
    { path: '/engineering/3d/', dest: 'public/images/3d-graph-calculator-preview.webp' },
    { path: '/engineering/3d/', dest: 'public/images/cone-3d-graph.webp' },
    { path: '/calculator/nepal-tds/', dest: 'public/images/calculators/nepal-tds-calculator.webp' },
    { path: '/calculator/nepal-vehicle-tax/', dest: 'public/assets/images/vehicle-tax-calculator-nepal-2083-84.webp' }
  ];

  for (const item of urls) {
    try {
      console.log('Visiting', item.path);
      await page.goto('http://localhost:3004' + item.path, { waitUntil: 'networkidle2', timeout: 15000 });
      const dir = item.dest.substring(0, item.dest.lastIndexOf('/'));
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir, { recursive: true });
      }
      await page.screenshot({ path: item.dest, type: 'webp', quality: 80 });
      console.log('Saved', item.dest);
    } catch (e) {
      console.error('Failed', item.path, e.message);
    }
  }

  await browser.close();
}
run();
