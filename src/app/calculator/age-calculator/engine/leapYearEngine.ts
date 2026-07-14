export function calculateLeapYears(d1: Date, d2: Date): number {
  let count = 0;
  for (let y = d1.getFullYear(); y <= d2.getFullYear(); y++) {
    const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    if (isLeap) {
      const feb29 = new Date(y, 1, 29);
      if (feb29 >= d1 && feb29 <= d2) {
        count++;
      }
    }
  }
  return count;
}
