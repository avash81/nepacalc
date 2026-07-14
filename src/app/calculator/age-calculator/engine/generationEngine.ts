export const GENERATIONS = [
  { name: 'Gen Alpha', start: 2013, end: 2025 },
  { name: 'Gen Z', start: 1997, end: 2012 },
  { name: 'Millennial', start: 1981, end: 1996 },
  { name: 'Generation X', start: 1965, end: 1980 },
  { name: 'Baby Boomer', start: 1946, end: 1964 },
  { name: 'Silent Generation', start: 1928, end: 1945 },
  { name: 'Greatest Generation', start: 1901, end: 1927 },
];

export function getGeneration(d: Date): string {
  const year = d.getFullYear();
  return GENERATIONS.find(g => year >= g.start && year <= g.end)?.name || 'Unknown';
}
