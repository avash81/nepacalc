/**
 * Education Math Engine
 */

export function calculateGPA(subjects: Array<{ name: string; credits: number; grade: number }>) {
  let totalPoints = 0;
  let totalCredits = 0;

  subjects.forEach(s => {
    totalPoints += s.grade * s.credits;
    totalCredits += s.credits;
  });

  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  let category = '';
  if (gpa >= 3.6) category = 'Distinction';
  else if (gpa >= 2.8) category = 'First Division';
  else if (gpa >= 2.0) category = 'Second Division';
  else if (gpa >= 1.6) category = 'Pass';
  else category = 'Fail';

  return {
    gpa: Number(gpa.toFixed(2)),
    totalCredits,
    category,
    percentage: Number((gpa * 25).toFixed(2)) // Simplified conversion
  };
}

export function calculateAttendance(present: number, total: number) {
  const percentage = total > 0 ? (present / total) * 100 : 0;
  const status = percentage >= 75 ? 'Eligible' : 'Not Eligible';
  
  return {
    percentage: Number(percentage.toFixed(2)),
    status
  };
}

export function calculatePercentage(percent: number, total: number) {
  return Number(((percent / 100) * total).toFixed(2));
}

export function calculateLog(base: number, num: number) {
  return Number((Math.log(num) / Math.log(base)).toFixed(4));
}

export function calculateSD(numbers: number[]) {
  if (numbers.length < 2) return { mean: 0, sd: 0 };
  const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  const variance = numbers.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (numbers.length - 1);
  return {
    mean: Number(mean.toFixed(2)),
    sd: Number(Math.sqrt(variance).toFixed(2))
  };
}

export function calculateFraction(n1: number, d1: number, n2: number, d2: number, op: string) {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  let resN = 0, resD = 1;
  switch (op) {
    case '+': resN = n1 * d2 + n2 * d1; resD = d1 * d2; break;
    case '-': resN = n1 * d2 - n2 * d1; resD = d1 * d2; break;
    case '*': resN = n1 * n2; resD = d1 * d2; break;
    case '/': resN = n1 * d2; resD = d1 * n2; break;
  }
  const common = Math.abs(gcd(resN, resD));
  return { n: resN / common, d: resD / common, decimal: Number((resN / resD).toFixed(4)) };
}

