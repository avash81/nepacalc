export function getTimeline(years: number, d1: Date, d2: Date) {
    const milestones = [100, 500, 1000, 5000, 10000, 20000];
    const msList = milestones.map(days => {
        const date = new Date(d1.getTime() + days * 86400000);
        return { label: `${days} Days`, date, passed: date <= d2 };
    });
    
    // Birthdays
    const hb = new Date(d1.getFullYear(), d1.getMonth() + 6, d1.getDate());
    msList.push({ label: 'Half Birthday', date: hb, passed: hb <= d2 });
    
    const goldenDate = new Date(d1.getFullYear() + d1.getDate(), d1.getMonth(), d1.getDate());
    msList.push({ label: 'Golden Birthday', date: goldenDate, passed: goldenDate <= d2 });
    
    const silverDate = new Date(d1.getFullYear() + 25, d1.getMonth(), d1.getDate());
    msList.push({ label: 'Silver Birthday (25)', date: silverDate, passed: silverDate <= d2 });

    const decades = Math.floor(years / 10);
    const olympics = Math.floor(years / 4);
    const fifa = Math.floor(years / 4);
    
    msList.sort((a,b) => a.date.getTime() - b.date.getTime());
    
    return { milestones: msList, decades, olympics, fifa };
}
