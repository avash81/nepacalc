const GRAM_FACTORS = {
  'Gram': 1,
  'Tola': 11.6638038,
  'Lal': 0.116638038,
  'Aana': 0.7289877,
  'Ratti': 0.1822469,
  'Kilogram': 1000,
  'Milligram': 0.001,
  'Troy Ounce': 31.1034768,
  'Ounce': 28.3495231,
  'Pound': 453.59237,
};

const input1 = 1; // Tola
const grams1 = input1 * GRAM_FACTORS['Tola'];
const lal1 = grams1 / GRAM_FACTORS['Lal'];
const aana1 = grams1 / GRAM_FACTORS['Aana'];
const troyOz1 = grams1 / GRAM_FACTORS['Troy Ounce'];

console.log("TEST 1: 1 Tola");
console.log(`Grams: ${grams1.toFixed(7)} == 11.6638038`);
console.log(`Lal: ${lal1.toFixed(1)} == 100.0`);
console.log(`Aana: ${aana1.toFixed(1)} == 16.0`);
console.log(`Troy Oz: ${troyOz1.toFixed(3)} == 0.375`);

const input2 = 100; // Grams
const tola2 = input2 / GRAM_FACTORS['Tola'];
const lal2 = input2 / GRAM_FACTORS['Lal'];

console.log("\nTEST 2: 100 Grams");
console.log(`Tola: ${tola2.toFixed(3)} == 8.573`);
console.log(`Lal: ${lal2.toFixed(1)} == 857.3`);
