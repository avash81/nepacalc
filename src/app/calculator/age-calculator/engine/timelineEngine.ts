export function getTimeline(years: number, d1: Date, d2: Date) {
    const msList = [];
    
    // Birth
    msList.push({ label: 'Birth', date: d1, passed: true });
    
    // 18 Years
    const age18 = new Date(d1.getFullYear() + 18, d1.getMonth(), d1.getDate());
    msList.push({ label: '18 Years (Adulthood)', date: age18, passed: age18 <= d2 });
    
    // 21 Years
    const age21 = new Date(d1.getFullYear() + 21, d1.getMonth(), d1.getDate());
    msList.push({ label: '21 Years', date: age21, passed: age21 <= d2 });
    
    // Today/Target
    msList.push({ label: 'Selected Date', date: d2, passed: true });

    // Decades, Olympics, FIFA
    const decades = Math.floor(years / 10);
    const olympics = Math.floor(years / 4);
    const fifa = Math.floor(years / 4);
    
    msList.sort((a,b) => a.date.getTime() - b.date.getTime());
    
    return { milestones: msList, decades, olympics, fifa };
}
