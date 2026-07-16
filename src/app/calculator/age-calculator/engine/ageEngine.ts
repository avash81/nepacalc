export interface ExactAge { years: number; months: number; weeks: number; days: number; hours: number; minutes: number; seconds: number; }
export interface TotalAge { years: number; months: number; weeks: number; days: number; hours: number; minutes: number; seconds: number; }
export interface Heartbeats { beats: number; breaths: number; hoursSlept: number; }
export interface SchoolAge { eligibleFor: string[]; }

export function calculateExactAge(d1: Date, d2: Date): ExactAge {
    const localD1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes(), d1.getSeconds());
    const localD2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours(), d2.getMinutes(), d2.getSeconds());

    let years = localD2.getFullYear() - localD1.getFullYear();
    let months = localD2.getMonth() - localD1.getMonth();
    let days = localD2.getDate() - localD1.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(localD2.getFullYear(), localD2.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    
    const weeks = Math.floor(days / 7);
    days = days % 7;
    
    return { years, months, weeks, days, hours: 0, minutes: 0, seconds: 0 };
}

export function calculateTotalAge(d1: Date, d2: Date): TotalAge {
    const msDiff = d2.getTime() - d1.getTime();
    const days = Math.floor(msDiff / 86400000);
    const exact = calculateExactAge(d1, d2);
    
    return {
        years: exact.years + (exact.months / 12),
        months: (exact.years * 12) + exact.months,
        weeks: Math.floor(days / 7),
        days: days,
        hours: days * 24,
        minutes: days * 24 * 60,
        seconds: days * 24 * 60 * 60
    };
}

export function getLifeStage(years: number): string {
    if (years < 1) return 'Infant';
    if (years < 4) return 'Toddler';
    if (years < 13) return 'Child';
    if (years < 20) return 'Teenager';
    if (years < 25) return 'Young Adult';
    if (years < 40) return 'Adult';
    if (years < 60) return 'Middle Age';
    return 'Senior Citizen';
}

export function getRetirementAge(dob: Date, retirementAge: number): { retirementAge: number; yearsRemaining: number; monthsRemaining: number; expectedDate: Date; hasRetired: boolean } {
    const expectedDate = new Date(dob.getFullYear() + retirementAge, dob.getMonth(), dob.getDate());
    const now = new Date();
    const hasRetired = now >= expectedDate;
    let yearsRemaining = 0;
    let monthsRemaining = 0;
    if (!hasRetired) {
        yearsRemaining = expectedDate.getFullYear() - now.getFullYear();
        monthsRemaining = expectedDate.getMonth() - now.getMonth();
        if (monthsRemaining < 0) { yearsRemaining--; monthsRemaining += 12; }
    }
    return { retirementAge, yearsRemaining, monthsRemaining, expectedDate, hasRetired };
}

export function getFunFacts(dob: Date, refDate: Date): { leapYears: number; olympics: number; worldCups: number; usElections: number } {
    const birthYear = dob.getFullYear();
    const refYear = refDate.getFullYear();
    let leapCount = 0;
    for (let y = birthYear; y <= refYear; y++) {
        if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) leapCount++;
    }
    // Summer Olympics: every 4 years from 1896 (skip 1916, 1940, 1944)
    const skipOlympics = new Set([1916, 1940, 1944]);
    let olympicsCount = 0;
    for (let y = 1896; y <= refYear; y += 4) {
        if (!skipOlympics.has(y) && y >= birthYear) olympicsCount++;
    }
    // FIFA World Cup: every 4 years from 1930 (skip 1942, 1946)
    const skipWC = new Set([1942, 1946]);
    let wcCount = 0;
    for (let y = 1930; y <= refYear; y += 4) {
        if (!skipWC.has(y) && y >= birthYear) wcCount++;
    }
    // US Presidential Elections: every 4 years from 1788
    let electionsCount = 0;
    for (let y = 1788; y <= refYear; y += 4) {
        if (y >= birthYear) electionsCount++;
    }
    return { leapYears: leapCount, olympics: olympicsCount, worldCups: wcCount, usElections: electionsCount };
}

export function calculateBiologicalStats(totalDays: number): Heartbeats {
    const minutes = totalDays * 24 * 60;
    return {
        beats: minutes * 72,
        breaths: minutes * 16,
        hoursSlept: totalDays * 8
    };
}

export function getSchoolAge(years: number): SchoolAge {
    const eligible = [];
    if (years >= 4) eligible.push('Pre-School');
    if (years >= 5) eligible.push('Primary School');
    if (years >= 11) eligible.push('Middle School');
    if (years >= 14) eligible.push('High School');
    if (years >= 18) eligible.push('University');
    return { eligibleFor: eligible };
}

export function calculateWorkingDays(d1: Date, d2: Date): { businessDays: number; weekends: number } {
    const totalDays = Math.floor((d2.getTime() - d1.getTime()) / 86400000);
    const completeWeeks = Math.floor(totalDays / 7);
    let weekends = completeWeeks * 2;
    let daysRemaining = totalDays % 7;
    
    let cur = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate() + (completeWeeks * 7));
    while (daysRemaining > 0) {
        if (cur.getDay() === 0 || cur.getDay() === 6) weekends++;
        cur.setDate(cur.getDate() + 1);
        daysRemaining--;
    }
    
    return { businessDays: totalDays - weekends, weekends };
}
