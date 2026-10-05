const fs = require('fs');
let code = fs.readFileSync('src/app/market-rates/history/[year]/page.tsx', 'utf8');

// Replace: standalone <YearClientFilter /> + separate table div
// With: <YearClientFilter> wrapping the table div

const oldBlock = `          <YearClientFilter />
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">`;

const newBlock = `          <YearClientFilter>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">`;

code = code.replace(oldBlock, newBlock);

// Close the YearClientFilter wrapper after </div> </div> (closing the table div)
const oldClose = `          </div>
        </section>

        {/* 8. Source and methodology */}`;

const newClose = `          </div>
          </YearClientFilter>
        </section>

        {/* 8. Source and methodology */}`;

code = code.replace(oldClose, newClose);

fs.writeFileSync('src/app/market-rates/history/[year]/page.tsx', code);
console.log('Done');
