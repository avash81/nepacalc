export function getBirthdayDetails(d1: Date, d2: Date) {
    const nextBday = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
    nextBday.setFullYear(d2.getFullYear());
    
    if (nextBday.getTime() < d2.getTime() && (nextBday.getMonth() !== d2.getMonth() || nextBday.getDate() !== d2.getDate())) {
        nextBday.setFullYear(d2.getFullYear() + 1);
    }
    
    const daysToNext = Math.ceil((nextBday.getTime() - d2.getTime()) / 86400000);
    const monthsToNext = Math.floor(daysToNext / 30.44);
    const weeksToNext = Math.floor(daysToNext / 7);
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const bornOn = days[d1.getDay()];
    
    const curBday = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
    curBday.setFullYear(d2.getFullYear());
    if (curBday.getTime() > d2.getTime()) curBday.setFullYear(d2.getFullYear() - 1);
    
    return {
        nextBirthday: nextBday,
        daysRemaining: daysToNext,
        weeksRemaining: weeksToNext,
        monthsRemaining: monthsToNext,
        bornOnWeekday: bornOn,
        currentBirthdayWeekday: days[curBday.getDay()],
        nextBirthdayWeekday: days[nextBday.getDay()]
    };
}
