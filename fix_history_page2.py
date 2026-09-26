import json
from datetime import datetime

with open('public/data/historical-rates.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

records = data['data']
gold = len([r for r in records if r['metal'] == 'gold'])
silver = len([r for r in records if r['metal'] == 'silver'])
verified = len([r for r in records if r.get('verification_status') == 'verified'])
unique = len(set(r['date_ad'] for r in records))

sorted_records = sorted(records, key=lambda x: x['date_ad'])
ad_min = sorted_records[0]['date_ad']
ad_max = sorted_records[-1]['date_ad']

bs_dates = [r.get('date_bs', '') for r in sorted_records if r.get('date_bs')]
bs_min = bs_dates[0] if bs_dates else ''
bs_max = bs_dates[-1] if bs_dates else ''

v_records = sorted([r for r in records if r.get('verification_status') == 'verified'], key=lambda x: x['date_ad'])
v_dates = sorted(list(set(r['date_ad'] for r in v_records)))
v_map = {r['date_ad']: r.get('date_bs', '') for r in v_records}

ranges = []
if v_dates:
    start_d = datetime.strptime(v_dates[0], '%Y-%m-%d')
    start_ad = v_dates[0]
    last_d = start_d
    last_ad = start_ad
    count = 1
    
    for i in range(1, len(v_dates)):
        d = datetime.strptime(v_dates[i], '%Y-%m-%d')
        if (d - last_d).days <= 4: # allowing up to 4 days gap for weekends/holidays
            last_d = d
            last_ad = v_dates[i]
            count += 1
        else:
            ranges.append(f'<li className="flex items-start gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span><span>{start_ad} to {last_ad} ({count} dates) <span className="text-slate-400 font-normal">BS: {v_map[start_ad]} to {v_map[last_ad]}</span></span></li>')
            start_d = d
            start_ad = v_dates[i]
            last_d = d
            last_ad = start_ad
            count = 1
    ranges.append(f'<li className="flex items-start gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span><span>{start_ad} to {last_ad} ({count} dates) <span className="text-slate-400 font-normal">BS: {v_map[start_ad]} to {v_map[last_ad]}</span></span></li>')

replacement_code = f'''        {{/* Data Summary — below table */}}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8 max-w-4xl">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Data Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-[13px] mb-6">
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">Gold records:</span>
              <span className="font-bold text-slate-900">{gold:,}</span>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">Silver records:</span>
              <span className="font-bold text-slate-900">{silver:,}</span>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">Unique dates:</span>
              <span className="font-bold text-slate-900">{unique:,}</span>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500 font-medium">Verified records:</span>
              <span className="font-bold text-slate-900">{verified:,}</span>
            </div>
            <div className="flex flex-col gap-1 border-b border-slate-50 pb-2 md:col-span-2">
              <span className="text-slate-500 font-medium">Available date range (AD):</span>
              <span className="font-bold text-slate-900">{ad_min} to {ad_max}</span>
              <span className="text-slate-500 font-medium mt-1">Available date range (BS):</span>
              <span className="font-bold text-slate-900">{bs_min} to {bs_max}</span>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 mb-6 border border-amber-100">
            <p className="text-sm text-amber-900 font-medium">
              <strong>Coverage note:</strong> This archive contains verified historical records currently available from our primary-source dataset. Historical coverage is not continuous across every date.
            </p>
          </div>

          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Verified Coverage Ranges</h3>
          <ul className="text-sm text-slate-700 font-medium space-y-3">
            {chr(10).join(ranges)}
          </ul>
        </div>'''

with open('src/app/market-rates/history/page.tsx', 'r', encoding='utf-8') as f:
    page = f.read()

import re
page = re.sub(
    r'\{/\* Data Summary — below table \*/\}.*?</ul>\s*</div>',
    replacement_code.replace('\\', '\\\\'),
    page,
    flags=re.DOTALL
)

with open('src/app/market-rates/history/page.tsx', 'w', encoding='utf-8') as f:
    f.write(page)

print("SUCCESS 2")
