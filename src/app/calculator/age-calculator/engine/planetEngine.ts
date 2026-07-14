const PLANETARY_RATIOS = [
  { name: 'Mercury', ratio: 0.2408467 },
  { name: 'Venus', ratio: 0.61519726 },
  { name: 'Earth', ratio: 1.0 },
  { name: 'Mars', ratio: 1.8808158 },
  { name: 'Jupiter', ratio: 11.862615 },
  { name: 'Saturn', ratio: 29.447498 },
  { name: 'Uranus', ratio: 84.016846 },
  { name: 'Neptune', ratio: 164.79132 },
  { name: 'Pluto', ratio: 247.92065 }
];

export interface PlanetAge {
  name: string;
  age: string;
}

export function calculatePlanetAges(earthDays: number): PlanetAge[] {
  const ageInEarthYears = earthDays / 365.2425;
  return PLANETARY_RATIOS.map(p => ({
    name: p.name,
    age: (ageInEarthYears / p.ratio).toFixed(2)
  })).filter(p => p.name !== 'Earth');
}
