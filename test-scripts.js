fetch('https://nepacalc.com/market-rates/').then(r=>r.text()).then(t => console.log(t.substring(t.length - 2000)))
