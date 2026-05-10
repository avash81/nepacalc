fetch('http://127.0.0.1:3004/calculator/bmi/')
  .then(r => r.text())
  .then(t => {
    const m = t.match(/"message":"([^"]{0,400})/);
    if (m) console.log(m[1]);
    else console.log(t.substring(0, 500));
  })
  .catch(e => console.error(e));
