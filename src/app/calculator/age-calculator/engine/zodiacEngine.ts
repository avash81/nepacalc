const ZODIACS = [
  { sign: 'Capricorn', icon: '♑', start: '01-01', end: '01-19', desc: 'Ambitious, organized, practical, goal-oriented.' },
  { sign: 'Aquarius', icon: '♒', start: '01-20', end: '02-18', desc: 'Innovative, progressive, fiercely independent.' },
  { sign: 'Pisces', icon: '♓', start: '02-19', end: '03-20', desc: 'Empathetic, artistic, deeply intuitive.' },
  { sign: 'Aries', icon: '♈', start: '03-21', end: '04-19', desc: 'Bold, pioneering, courageous, energetic.' },
  { sign: 'Taurus', icon: '♉', start: '04-20', end: '05-20', desc: 'Dependable, musical, practical.' },
  { sign: 'Gemini', icon: '♊', start: '05-21', end: '06-20', desc: 'Adaptable, outgoing, intelligent.' },
  { sign: 'Cancer', icon: '♋', start: '06-21', end: '07-22', desc: 'Compassionate, intuitive, protective.' },
  { sign: 'Leo', icon: '♌', start: '07-23', end: '08-22', desc: 'Dramatic, outgoing, fiery, self-assured.' },
  { sign: 'Virgo', icon: '♍', start: '08-23', end: '09-22', desc: 'Practical, loyal, gentle, analytical.' },
  { sign: 'Libra', icon: '♎', start: '09-23', end: '10-22', desc: 'Social, fair-minded, diplomatic, gracious.' },
  { sign: 'Scorpio', icon: '♏', start: '10-23', end: '11-21', desc: 'Passionate, stubborn, resourceful, brave.' },
  { sign: 'Sagittarius', icon: '♐', start: '11-22', end: '12-21', desc: 'Extroverted, optimistic, funny, generous.' },
  { sign: 'Capricorn', icon: '♑', start: '12-22', end: '12-31', desc: 'Ambitious, organized, practical, goal-oriented.' },
];
const CHINESE_ZODIACS = ['Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'];
const ELEMENTS = ['Metal', 'Water', 'Wood', 'Fire', 'Earth'];

export function getWesternZodiac(d: Date) {
    const md = String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    return ZODIACS.find(z => md >= z.start && md <= z.end) || ZODIACS[0];
}
export function getChineseZodiac(d: Date) {
    const year = d.getFullYear();
    const animal = CHINESE_ZODIACS[year % 12];
    const element = ELEMENTS[Math.floor((year % 10) / 2)];
    return { animal, element, full: `${element} ${animal}` };
}
