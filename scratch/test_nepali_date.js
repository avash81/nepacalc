const ND = require('nepali-date-converter');
console.log('ND type:', typeof ND);
console.log('ND keys:', Object.keys(ND));

const NepaliDate = ND.default || ND;

try {
    const d1 = new Date("2026-04-19");
    const n1 = new NepaliDate(d1);
    console.log('Test 1 (AD to BS):', n1.format('YYYY-MM-DD')); // Expect 2083-01-06

    const y = 2083, m = 1, d = 06;
    const n2 = new NepaliDate(y, m - 1, d); 
    console.log('Test 2 (BS Constructor):', n2.format('YYYY-MM-DD'));
    console.log('Test 2 (BS to AD):', n2.toJsDate().toISOString().split('T')[0]);

    const n3 = new NepaliDate("2083-01-06");
    console.log('Test 3 (String Constructor):', n3.format('YYYY-MM-DD'));
    console.log('Test 3 (String to AD):', n3.toJsDate().toISOString().split('T')[0]);
} catch (e) {
    console.error('Error during testing:', e);
}
