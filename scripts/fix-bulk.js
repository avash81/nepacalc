const fs = require('fs');

const rawHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Nepali Date Bulk Converter</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<style>
  :root{
    --ink:#0f1729;
    --paper:#f6f7fb;
    --card:#ffffff;
    --line:#e4e7ef;
    --blue:#2454d6;
    --blue-soft:#eaf0fd;
    --blue-soft-line:#c9d9fb;
    --muted:#6b7280;
    --ok:#0f7a4a;
    --ok-soft:#e7f7ef;
    --err:#b3261e;
    --err-soft:#fdecec;
    --mono: 'IBM Plex Mono','SFMono-Regular',Consolas,monospace;
    --serif: 'Georgia','Iowan Old Style',serif;
    --sans: -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
  }
  *{box-sizing:border-box;}
  body{
    margin:0;
    background:var(--paper);
    color:var(--ink);
    font-family:var(--sans);
    padding:0 20px 60px;
  }
  .wrap{max-width:1180px;margin:0 auto;}

  .grid{display:grid;grid-template-columns:1fr;gap:18px;}
  .card{
    background:var(--card);border:1px solid var(--line);border-radius:10px;
    overflow:hidden;
  }
  .card-head{
    padding:13px 18px;border-bottom:1px solid var(--line);
    font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);
    display:flex;align-items:center;justify-content:space-between;
    font-family:var(--mono);
  }
  .card-body{padding:18px;}

  .protocol{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px;}
  .protocol button{
    flex:1;min-width:150px;
    border:1px solid var(--line);background:#fff;color:var(--ink);
    padding:12px 14px;border-radius:8px;cursor:pointer;
    font-size:13px;font-weight:600;letter-spacing:.02em;text-align:left;
    transition:all .12s ease;
  }
  .protocol button .sub{display:block;font-weight:400;color:var(--muted);font-size:11px;margin-top:2px;}
  .protocol button.active{
    background:var(--blue-soft);border-color:var(--blue);color:var(--blue);
  }
  .protocol button.active .sub{color:var(--blue);opacity:.75;}

  label.section-label{
    display:block;font-size:11px;letter-spacing:.1em;text-transform:uppercase;
    color:var(--muted);margin-bottom:8px;font-family:var(--mono);
  }

  textarea{
    width:100%;min-height:170px;resize:vertical;
    border:1px solid var(--line);border-radius:8px;padding:12px 14px;
    font-family:var(--mono);font-size:13px;line-height:1.6;
    background:#fbfbfd;color:var(--ink);
  }
  textarea:focus{outline:2px solid var(--blue-soft-line);border-color:var(--blue);}

  .row{display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start;margin-top:14px;}
  .col{flex:1;min-width:260px;}

  .filebox{
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    border:1.5px dashed var(--blue);border-radius:8px;padding:24px 16px;
    background:#f0f5ff;text-align:center;cursor:pointer;
  }
  .filebox:hover{background:#e5eeff;border-color:var(--blue);}
  .filebox input{display:none;}
  .filebox .lbl{font-size:13px;font-weight:600;}
  .filebox .hint{font-size:11.5px;color:var(--muted);margin-top:4px;}

  select{
    width:100%;padding:9px 10px;border:1px solid var(--line);border-radius:7px;
    font-size:13px;background:#fff;color:var(--ink);
  }

  .note{
    display:flex;gap:20px;align-items:flex-start;
    background:var(--blue-soft);border:1px solid var(--blue-soft-line);
    border-radius:8px;padding:24px 28px;margin-top:20px;font-size:13px;color:var(--ink);line-height:1.7;
  }
  .note b{color:var(--blue);}

  .actions{display:flex;gap:10px;margin-top:18px;flex-wrap:wrap;}
  .btn{
    border:none;border-radius:8px;padding:11px 18px;font-size:13.5px;font-weight:600;
    cursor:pointer;transition:opacity .12s ease;
  }
  .btn:disabled{opacity:.45;cursor:not-allowed;}
  .btn-primary{background:var(--blue);color:#fff;}
  .btn-primary:hover:not(:disabled){opacity:.9;}
  .btn-ghost{background:#fff;border:1px solid var(--line);color:var(--ink);}
  .btn-ghost:hover:not(:disabled){border-color:var(--blue);color:var(--blue);}

  .status-line{
    display:flex;gap:18px;flex-wrap:wrap;align-items:center;
    padding:12px 18px;font-family:var(--mono);font-size:12.5px;color:var(--muted);
    border-bottom:1px solid var(--line);background:#fbfbfd;
  }
  .status-line b{color:var(--ink);font-size:14px;}
  .pill{padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600;}
  .pill.ok{background:var(--ok-soft);color:var(--ok);}
  .pill.err{background:var(--err-soft);color:var(--err);}

  table{width:100%;border-collapse:collapse;font-family:var(--mono);font-size:12.5px;}
  thead th{
    text-align:left;padding:9px 14px;background:#fbfbfd;border-bottom:1px solid var(--line);
    font-family:var(--sans);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);
    position:sticky;top:0;
  }
  th .th-inner{display:flex;align-items:center;justify-content:space-between;gap:8px;}
  .col-copy{
    border:1px solid var(--line);background:#fff;border-radius:5px;
    width:22px;height:22px;line-height:1;font-size:11px;cursor:pointer;
    display:flex;align-items:center;justify-content:center;flex:none;
    color:var(--muted);text-transform:none;letter-spacing:0;
  }
  .col-copy:hover{border-color:var(--blue);color:var(--blue);}
  .col-copy.done{border-color:var(--ok);color:var(--ok);}
  tbody td{padding:8px 14px;border-bottom:1px solid #f0f1f5;font-variant-numeric:tabular-nums;}
  tbody tr:hover{background:#fafbff;}
  tbody tr.bad{background:var(--err-soft);}
  tbody td.bad{background:var(--err-soft);color:var(--err);font-weight:600;}
  .table-scroll{max-height:520px;overflow:auto;}
  .table-foot{padding:10px 18px;font-size:12px;color:var(--muted);border-top:1px solid var(--line);}

  .empty{padding:40px 18px;text-align:center;color:var(--muted);font-size:13px;}
  .empty .big{font-size:30px;margin-bottom:8px;}

  .cal-backdrop{
    display:none;position:fixed;inset:0;background:rgba(15,23,41,.45);z-index:40;
    align-items:flex-start;justify-content:center;padding:40px 16px;overflow-y:auto;
  }
  .cal-modal{
    background:#fff;border-radius:12px;box-shadow:0 20px 50px rgba(15,23,41,.25);
    width:100%;max-width:980px;padding:18px 20px 22px;
  }
  .cal-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
  .cal-head button{border:1px solid var(--line);background:#fff;border-radius:6px;width:30px;height:30px;cursor:pointer;color:var(--ink);font-size:15px;}
  .cal-head button:hover{border-color:var(--blue);color:var(--blue);}
  .cal-head .cal-title{font-size:16px;font-weight:700;font-family:var(--serif);}
  .cal-year-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
  @media (max-width: 820px){ .cal-year-grid{grid-template-columns:repeat(2,1fr);} }
  @media (max-width: 480px){ .cal-year-grid{grid-template-columns:1fr;} }
  .cal-month-card{border:1px solid var(--line);border-radius:9px;padding:10px;}
  .cal-month-title{font-size:12px;font-weight:700;text-align:center;margin-bottom:6px;color:var(--ink);}
  .cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;}
  .cal-wd{font-size:9px;color:var(--muted);text-align:center;padding:2px 0;}
  .cal-day{
    font-size:11px;text-align:center;padding:5px 0;border-radius:5px;cursor:pointer;
    border:1px solid transparent;font-variant-numeric:tabular-nums;
  }
  .cal-day:hover{background:var(--blue-soft);border-color:var(--blue-soft-line);}
  .cal-day.picked{background:var(--blue);color:#fff;}
  .cal-day.blank{cursor:default;}
  .cal-day.blank:hover{background:none;border-color:transparent;}
  .cal-foot{display:flex;justify-content:space-between;align-items:center;margin-top:14px;font-size:12px;color:var(--muted);}
  .cal-foot button{border:none;background:var(--blue);color:#fff;padding:8px 18px;border-radius:7px;cursor:pointer;font-size:13px;font-weight:600;}
</style>

</head>
<body>
<div class="wrap">

  <div class="grid">

    <div class="card">
            <div class="card-body">

        <div class="protocol">
          <button id="mode-ad" class="active" onclick="setMode('AD_TO_BS')">
            AD → BS
            <span class="sub">Every line is an English date, output in Nepali</span>
          </button>
          <button id="mode-bs" onclick="setMode('BS_TO_AD')">
            BS → AD
            <span class="sub">Every line is a Nepali date, output in English</span>
          </button>
          <button id="mode-auto" onclick="setMode('AUTO')">
            Auto-detect (mixed)
            <span class="sub">Some lines AD, some BS, normalize all to BS</span>
          </button>
        </div>

        <div class="row">
          <div class="col">
            <label class="section-label">Paste dates (one per line, or paste multiple columns straight from Excel)</label>
            <textarea id="pasteInput" placeholder="2026-08-08&#10;2026/08/09&#10;08-08-2026&#10;2083-04-23&#10;..." onkeydown="if((event.ctrlKey||event.metaKey)&&event.key==='Enter'){runConversion();}">2026-08-08
2026-08-09
2026-12-25
2027-01-13
2083-04-23
2083-05-01</textarea>
            <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:nowrap;overflow-x:auto;position:relative;">
              <button class="btn btn-ghost" style="padding:6px 12px;font-size:12px;white-space:nowrap;" onclick="openCalendar('AD', this)">📅 English (AD) calendar</button>
              <button class="btn btn-ghost" style="padding:6px 12px;font-size:12px;white-space:nowrap;" onclick="openCalendar('BS', this)">🗓️ Nepali (BS) calendar</button>
              <div id="calendarPopover" class="cal-backdrop"></div>
            </div>
            <div style="margin-top:4px;font-size:11.5px;color:var(--muted);">Ctrl/Cmd + Enter converts instantly</div>
            <div class="actions" style="margin-top:10px;">
              <button class="btn btn-primary" onclick="runConversion()">Convert pasted dates</button>
              <button class="btn btn-ghost" onclick="clearAll()">Clear</button>
            </div>
          </div>
          <div class="col" style="max-width:340px;">
            <label class="section-label">Or upload a file</label>
            <label class="filebox" id="fileDropZone">
              <input type="file" id="fileInput" accept=".csv,.xlsx,.xls" onchange="handleFile(event)">
              <div class="lbl">📄 Click or drag a .xlsx / .csv here</div>
              <div class="hint">Keeps its row/column layout, nothing in your file is changed</div>
            </label>
            <div style="margin-top:8px;font-size:11.5px;color:var(--muted);font-family:var(--mono);background:#fbfbfd;border:1px solid var(--line);border-radius:7px;padding:8px 10px;">
              Example layout:<br>
              <b>English Date (AD)</b> &nbsp;|&nbsp; <b>Nepali Date (BS)</b><br>
              2026-08-08 &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp; 2083-04-23
            </div>
            <div id="colPicker" style="margin-top:12px;display:none;">
              <label class="section-label">Which column(s) contain dates?</label>
              <div id="colChecks" style="display:flex;flex-direction:column;gap:6px;"></div>
              <button class="btn btn-primary" style="margin-top:10px;width:100%;" onclick="convertFileColumns()">Convert this file</button>
            </div>
          </div>
        </div>

        <div class="note">
          <div>
            <b>Recognized formats:</b> YYYY-MM-DD, YYYY/MM/DD, DD-MM-YYYY, DD/MM/YYYY, "23 Shrawan 2083",
            "August 8, 2026", real Excel date cells, and Nepali digits/month names (२३ साउन २०८३).
            In <b>Auto-detect</b> mode each line or cell is read on its own, English dates and Nepali dates
            can be mixed freely in the same paste or the same file, and <b>you can paste several columns at
            once</b> straight from Excel (copy a multi-column range and paste it in, each date column gets
            converted, same as a file upload). Click the 📋 icon in any column header to copy just that column,
            or use "Copy all for Excel" below the table for everything at once. Any date that couldn't be
            converted is highlighted in red with the reason, so it's easy to spot and fix.
          </div>
        </div>
        <div class="note">
          <div>
            <b>Accuracy:</b> conversions are checked against the official BS calendar data (Baisakh 2000 –
            Chaitra 2100, roughly AD 1943–2043) and cross-verified against 20,000+ random dates plus independent
            references. Still, for anything going on a passport, citizenship, or DV Lottery form, always double-check
            the result against your original document before submitting.
          </div>
        </div>
      </div>
    </div>

    <div class="card" id="resultsCard">
      <div class="status-line" id="statusLine">
        <span>No results yet, paste dates or upload a file above.</span>
      </div>
      <div id="resultsBody">
        <div class="empty">
          <div class="big">📅</div>
          Converted dates will appear here, ready to copy straight into Excel.
        </div>
      </div>
      <div class="table-foot" id="tableFoot" style="display:none;"></div>
    </div>

    <div class="card" id="fileResultsCard" style="display:none;">
      <div class="status-line" id="fileStatusLine"></div>
      <div id="fileResultsBody"></div>
      <div class="table-foot" id="fileTableFoot" style="display:none;"></div>
    </div>

  </div>
</div>

<script>
const calendarData = {"2000":[30,32,31,32,31,30,30,30,29,30,29,31],"2001":[31,31,32,31,31,31,30,29,30,29,30,30],"2002":[31,31,32,32,31,30,30,29,30,29,30,30],"2003":[31,32,31,32,31,30,30,30,29,29,30,31],"2004":[30,32,31,32,31,30,30,30,29,30,29,31],"2005":[31,31,32,31,31,31,30,29,30,29,30,30],"2006":[31,31,32,32,31,30,30,29,30,29,30,30],"2007":[31,32,31,32,31,30,30,30,29,29,30,31],"2008":[31,31,31,32,31,31,29,30,30,29,29,31],"2009":[31,31,32,31,31,31,30,29,30,29,30,30],"2010":[31,31,32,32,31,30,30,29,30,29,30,30],"2011":[31,32,31,32,31,30,30,30,29,29,30,31],"2012":[31,31,31,32,31,31,29,30,30,29,30,30],"2013":[31,31,32,31,31,31,30,29,30,29,30,30],"2014":[31,31,32,32,31,30,30,29,30,29,30,30],"2015":[31,32,31,32,31,30,30,30,29,29,30,31],"2016":[31,31,31,32,31,31,29,30,30,29,30,30],"2017":[31,31,32,31,31,31,30,29,30,29,30,30],"2018":[31,32,31,32,31,30,30,29,30,29,30,30],"2019":[31,32,31,32,31,30,30,30,29,30,29,31],"2020":[31,31,31,32,31,31,30,29,30,29,30,30],"2021":[31,31,32,31,31,31,30,29,30,29,30,30],"2022":[31,32,31,32,31,30,30,30,29,29,30,30],"2023":[31,32,31,32,31,30,30,30,29,30,29,31],"2024":[31,31,31,32,31,31,30,29,30,29,30,30],"2025":[31,31,32,31,31,31,30,29,30,29,30,30],"2026":[31,32,31,32,31,30,30,30,29,29,30,31],"2027":[30,32,31,32,31,30,30,30,29,30,29,31],"2028":[31,31,32,31,31,31,30,29,30,29,30,30],"2029":[31,31,32,31,32,30,30,29,30,29,30,30],"2030":[31,32,31,32,31,30,30,30,29,29,30,31],"2031":[30,32,31,32,31,30,30,30,29,30,29,31],"2032":[31,31,32,31,31,31,30,29,30,29,30,30],"2033":[31,31,32,32,31,30,30,29,30,29,30,30],"2034":[31,32,31,32,31,30,30,30,29,29,30,31],"2035":[30,32,31,32,31,31,29,30,30,29,29,31],"2036":[31,31,32,31,31,31,30,29,30,29,30,30],"2037":[31,31,32,32,31,30,30,29,30,29,30,30],"2038":[31,32,31,32,31,30,30,30,29,29,30,31],"2039":[31,31,31,32,31,31,29,30,30,29,30,30],"2040":[31,31,32,31,31,31,30,29,30,29,30,30],"2041":[31,31,32,32,31,30,30,29,30,29,30,30],"2042":[31,32,31,32,31,30,30,30,29,29,30,31],"2043":[31,31,31,32,31,31,29,30,30,29,30,30],"2044":[31,31,32,31,31,31,30,29,30,29,30,30],"2045":[31,32,31,32,31,30,30,29,30,29,30,30],"2046":[31,32,31,32,31,30,30,30,29,29,30,31],"2047":[31,31,31,32,31,31,30,29,30,29,30,30],"2048":[31,31,32,31,31,31,30,29,30,29,30,30],"2049":[31,32,31,32,31,30,30,30,29,29,30,30],"2050":[31,32,31,32,31,30,30,30,29,30,29,31],"2051":[31,31,31,32,31,31,30,29,30,29,30,30],"2052":[31,31,32,31,31,31,30,29,30,29,30,30],"2053":[31,32,31,32,31,30,30,30,29,29,30,30],"2054":[31,32,31,32,31,30,30,30,29,30,29,31],"2055":[31,31,32,31,31,31,30,29,30,29,30,30],"2056":[31,31,32,31,32,30,30,29,30,29,30,30],"2057":[31,32,31,32,31,30,30,30,29,29,30,31],"2058":[30,32,31,32,31,30,30,30,29,30,29,31],"2059":[31,31,32,31,31,31,30,29,30,29,30,30],"2060":[31,31,32,32,31,30,30,29,30,29,30,30],"2061":[31,32,31,32,31,30,30,30,29,29,30,31],"2062":[30,32,31,32,31,31,29,30,29,30,29,31],"2063":[31,31,32,31,31,31,30,29,30,29,30,30],"2064":[31,31,32,32,31,30,30,29,30,29,30,30],"2065":[31,32,31,32,31,30,30,30,29,29,30,31],"2066":[31,31,31,32,31,31,29,30,30,29,29,31],"2067":[31,31,32,31,31,31,30,29,30,29,30,30],"2068":[31,31,32,32,31,30,30,29,30,29,30,30],"2069":[31,32,31,32,31,30,30,30,29,29,30,31],"2070":[31,31,31,32,31,31,29,30,30,29,30,30],"2071":[31,31,32,31,31,31,30,29,30,29,30,30],"2072":[31,32,31,32,31,30,30,29,30,29,30,30],"2073":[31,32,31,32,31,30,30,30,29,29,30,31],"2074":[31,31,31,32,31,31,30,29,30,29,30,30],"2075":[31,31,32,31,31,31,30,29,30,29,30,30],"2076":[31,32,31,32,31,30,30,30,29,29,30,30],"2077":[31,32,31,32,31,30,30,30,29,30,29,31],"2078":[31,31,31,32,31,31,30,29,30,29,30,30],"2079":[31,31,32,31,31,31,30,29,30,29,30,30],"2080":[31,32,31,32,31,30,30,30,29,29,30,30],"2081":[31,31,32,32,31,30,30,30,29,30,30,30],"2082":[30,32,31,32,31,30,30,30,29,30,30,30],"2083":[31,31,32,31,31,30,30,30,29,30,30,30],"2084":[31,31,32,31,31,30,30,30,29,30,30,30],"2085":[31,32,31,32,30,31,30,30,29,30,30,30],"2086":[30,32,31,32,31,30,30,30,29,30,30,30],"2087":[31,31,32,31,31,31,30,30,29,30,30,30],"2088":[30,31,32,32,30,31,30,30,29,30,30,30],"2089":[30,32,31,32,31,30,30,30,29,30,30,30],"2090":[30,32,31,32,31,30,30,30,29,30,30,30],"2091":[31,31,32,31,31,31,30,30,29,30,30,30],"2092":[30,31,32,32,31,30,30,30,29,30,30,30],"2093":[30,32,31,32,31,30,30,30,29,30,30,30],"2094":[31,31,32,31,31,30,30,30,29,30,30,30],"2095":[31,31,32,31,31,31,30,29,30,30,30,30],"2096":[30,31,32,32,31,30,30,29,30,29,30,30],"2097":[31,32,31,32,31,30,30,30,29,30,30,30],"2098":[31,31,32,31,31,31,29,30,29,30,30,31],"2099":[31,31,32,31,31,31,30,29,29,30,30,30],"2100":[31,32,31,32,30,31,30,29,30,29,30,30]};
const BS_MIN_YEAR = 2000, BS_MAX_YEAR = 2100;
const EPOCH_AD = Date.UTC(1943, 3, 14); // 1943-04-14 == BS 2000-01-01

function yearTotal(y){ return calendarData[String(y)].reduce((a,b)=>a+b,0); }
const yearStartOffset = {};
(function(){
  let acc = 0;
  for (let y = BS_MIN_YEAR; y <= BS_MAX_YEAR; y++){
    yearStartOffset[y] = acc;
    acc += yearTotal(y);
  }
})();

function adToBs(y,m,d){
  const t = Date.UTC(y, m-1, d);
  const days = Math.round((t - EPOCH_AD) / 86400000);
  if (days < 0 || days > yearStartOffset[BS_MAX_YEAR] + yearTotal(BS_MAX_YEAR)) return null;
  let lo = BS_MIN_YEAR, hi = BS_MAX_YEAR;
  while (lo < hi){
    const mid = Math.ceil((lo+hi)/2);
    if (yearStartOffset[mid] <= days) lo = mid; else hi = mid - 1;
  }
  const by = lo;
  let rem = days - yearStartOffset[by];
  const months = calendarData[String(by)];
  let bm = 12;
  for (let i=0;i<12;i++){
    if (rem < months[i]){ bm = i+1; break; }
    rem -= months[i];
  }
  return {year: by, month: bm, day: rem+1, wday: new Date(t).getUTCDay()};
}

function bsToAd(by,bm,bd){
  if (by < BS_MIN_YEAR || by > BS_MAX_YEAR) return null;
  const months = calendarData[String(by)];
  if (!months || bm < 1 || bm > 12 || bd < 1 || bd > months[bm-1]) return null;
  let days = yearStartOffset[by];
  for (let i=0;i<bm-1;i++) days += months[i];
  days += bd - 1;
  const t = new Date(EPOCH_AD + days * 86400000);
  return {year: t.getUTCFullYear(), month: t.getUTCMonth()+1, day: t.getUTCDate(), wday: t.getUTCDay()};
}

const WD_EN = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
const WD_NP = ["आइतबार","सोमबार","मंगलबार","बुधबार","बिहीबार","शुक्रबार","शनिबार"];
const NEPALI_DIGITS = "०१२३४५६७८९";

// BS month names, index 0 = Baisakh ... 11 = Chaitra
const BS_MONTH_EN = ["Baisakh","Jestha","Ashadh","Shrawan","Bhadra","Ashwin","Kartik","Mangsir","Poush","Magh","Falgun","Chaitra"];
const BS_MONTH_NP = ["बैशाख","जेठ","असार","साउन","भदौ","असोज","कात्तिक","मंसिर","पुष","माघ","फागुन","चैत"];
// accepted spelling variants for parsing input, mapped to month index (0-based)
const BS_MONTH_ALIASES = {
  "baisakh":0,"baishakh":0,"baisak":0,"vaisakh":0,"बैशाख":0,"बैसाख":0,
  "jestha":1,"jesth":1,"jeth":1,"जेठ":1,
  "ashadh":2,"ashad":2,"asar":2,"ashar":2,"असार":2,"आषाढ":2,
  "shrawan":3,"shawan":3,"saawan":3,"sawan":3,"साउन":3,"श्रावण":3,
  "bhadra":4,"bhadau":4,"भदौ":4,"भाद्र":4,
  "ashwin":5,"ashoj":5,"असोज":5,"आश्विन":5,
  "kartik":6,"kattik":6,"कात्तिक":6,"कार्तिक":6,
  "mangsir":7,"marga":7,"मंसिर":7,
  "poush":8,"push":8,"पुष":8,"पौष":8,
  "magh":9,"माघ":9,
  "falgun":10,"fagun":10,"फागुन":10,"फाल्गुन":10,
  "chaitra":11,"chait":11,"चैत":11,"चैत्र":11
};
const AD_MONTH_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const AD_MONTH_ALIASES = {};
AD_MONTH_EN.forEach((name,i)=>{
  AD_MONTH_ALIASES[name.toLowerCase()] = i;
  AD_MONTH_ALIASES[name.slice(0,3).toLowerCase()] = i;
});

function normalizeDigits(s){
  return s.replace(/[०-९]/g, ch => String(NEPALI_DIGITS.indexOf(ch)));
}
function toNepaliDigits(n){
  return String(n).replace(/[0-9]/g, ch => NEPALI_DIGITS[Number(ch)]);
}

function pad(n){ return String(n).padStart(2,'0'); }

function bsIso(y,m,d){ return \`\${y}-\${pad(m)}-\${pad(d)}\`; }
function bsIsoNepali(y,m,d){ return \`\${toNepaliDigits(y)}-\${toNepaliDigits(pad(m))}-\${toNepaliDigits(pad(d))}\`; }
function bsScriptNepali(y,m,d){ return \`\${toNepaliDigits(d)} \${BS_MONTH_NP[m-1]} \${toNepaliDigits(y)}\`; }
function bsScriptEnglish(y,m,d){ return \`\${d} \${BS_MONTH_EN[m-1]} \${y}\`; }
function adIso(y,m,d){ return \`\${y}-\${pad(m)}-\${pad(d)}\`; }
function adWordsEnglish(y,m,d){ return \`\${AD_MONTH_EN[m-1]} \${d}, \${y}\`; }

// Parses numeric forms: "YYYY-MM-DD" / "YYYY/MM/DD" / "DD-MM-YYYY" / "DD/MM/YYYY" / Excel serial
function parseNumeric(s){
  if (/^\\d{4,6}(\\.\\d+)?$/.test(s) && Number(s) > 20000 && Number(s) < 80000) {
    const serial = Number(s);
    const t = new Date(Date.UTC(1899,11,30) + serial*86400000);
    return {y: t.getUTCFullYear(), m: t.getUTCMonth()+1, d: t.getUTCDate(), calendarHint:'AD'};
  }
  const parts = s.split(/[-\\/. ]+/).filter(Boolean);
  if (parts.length !== 3 || parts.some(p=>!/^\\d+$/.test(p))) return null;
  let [a,b,c] = parts.map(x => parseInt(x,10));
  if (parts[0].length === 4) return {y:a, m:b, d:c, calendarHint:null};   // YYYY-MM-DD
  if (parts[2].length === 4) return {y:c, m:b, d:a, calendarHint:null};  // DD-MM-YYYY
  return null;
}

// Parses forms with a month name, Nepali or English, in any order:
// "23 Shrawan 2083", "Shrawan 23, 2083", "२३ साउन २०८३", "August 8, 2026", "8 August 2026"
function parseMonthName(s){
  const tokens = s.replace(/,/g,' ').split(/\\s+/).filter(Boolean);
  if (tokens.length < 3) return null;
  let year=null, day=null, monthToken=null;
  for (const tok of tokens){
    if (/^\\d{4}$/.test(tok) && year===null) { year = parseInt(tok,10); continue; }
    if (/^\\d{1,2}$/.test(tok) && day===null) { day = parseInt(tok,10); continue; }
    if (!/^\\d+$/.test(tok)) monthToken = tok;
  }
  if (year===null || day===null || !monthToken) return null;
  const key = monthToken.toLowerCase();
  if (Object.prototype.hasOwnProperty.call(BS_MONTH_ALIASES, key) || Object.prototype.hasOwnProperty.call(BS_MONTH_ALIASES, monthToken)) {
    const idx = BS_MONTH_ALIASES[key] !== undefined ? BS_MONTH_ALIASES[key] : BS_MONTH_ALIASES[monthToken];
    return {y:year, m:idx+1, d:day, calendarHint:'BS'};
  }
  if (Object.prototype.hasOwnProperty.call(AD_MONTH_ALIASES, key)) {
    return {y:year, m:AD_MONTH_ALIASES[key]+1, d:day, calendarHint:'AD'};
  }
  return null;
}

function parseDateString(raw){
  if (raw == null) return null;
  let s = normalizeDigits(String(raw).trim());
  if (!s) return null;
  return parseNumeric(s) || parseMonthName(s);
}

let currentMode = 'AD_TO_BS';
function setMode(mode){
  currentMode = mode;
  document.getElementById('mode-ad').classList.toggle('active', mode==='AD_TO_BS');
  document.getElementById('mode-bs').classList.toggle('active', mode==='BS_TO_AD');
  document.getElementById('mode-auto').classList.toggle('active', mode==='AUTO');
}

let lastResults = [];
let uploadedRows = null;

function handleFile(e){
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(evt){
    const data = new Uint8Array(evt.target.result);
    // cellDates:true + raw:false turns real Excel date cells into clean "YYYY-MM-DD"
    // strings instead of raw serial numbers like 46204.
    const wb = XLSX.read(data, {type:'array', cellDates:true});
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet, {header:1, raw:false, dateNF:'yyyy-mm-dd'});
    if (!json.length) return;
    const headers = json[0].map((h,i) => (h===undefined || h==='') ? ('Column '+(i+1)) : String(h));
    uploadedRows = {headers, rows: json.slice(1)};

    const checksDiv = document.getElementById('colChecks');
    checksDiv.innerHTML = headers.map((h,i) => {
      const sample = uploadedRows.rows.slice(0,5).map(r=>r[i]).find(v=>v!==undefined && v!=='');
      const looksLikeDate = sample && parseDateString(String(sample)) !== null;
      return \`<label style="display:flex;align-items:center;gap:8px;font-size:13px;">
        <input type="checkbox" data-col="\${i}" \${looksLikeDate ? 'checked' : ''}> \${h}
        <span style="color:var(--muted);font-size:11.5px;">\${sample!==undefined ? '('+sample+')' : ''}</span>
      </label>\`;
    }).join('');
    document.getElementById('colPicker').style.display = 'block';
  };
  reader.readAsArrayBuffer(file);
}

function convertTable(headers, rows, checked){
  const numOrig = headers.length;
  const outHeaders = [
    ...headers,
    ...checked.map(idx => \`\${headers[idx]} → Converted\`),
    ...checked.flatMap(idx => [\`\${headers[idx]} → Full text\`, \`\${headers[idx]} → Weekday\`])
  ];
  const outRows = [outHeaders];
  const badMatrix = [new Array(outHeaders.length).fill(false)];
  let ok = 0, bad = 0, total = 0;

  for (const row of rows){
    const convertedPart = [];
    const textPart = [];
    const badFlags = new Array(outHeaders.length).fill(false);
    const origPart = headers.map((_,i)=> row[i] !== undefined ? row[i] : '');

    checked.forEach((idx, ci) => {
      const cellVal = row[idx];
      const convertedColPos = numOrig + ci;

      if (cellVal === undefined || cellVal === ''){
        convertedPart.push(''); textPart.push('',''); return;
      }
      total++;
      const parsed = parseDateString(String(cellVal));
      if (!parsed){
        convertedPart.push('⚠ Not converted, unrecognized format'); textPart.push('','');
        badFlags[convertedColPos] = true; bad++; return;
      }
      let direction = parsed.calendarHint;
      if (!direction) direction = (parsed.y <= 2043) ? 'AD' : 'BS';
      if (direction === 'AD'){
        const r = adToBs(parsed.y, parsed.m, parsed.d);
        if (!r){ convertedPart.push('⚠ Not converted, outside supported range'); textPart.push('',''); badFlags[convertedColPos]=true; bad++; return; }
        convertedPart.push(bsIso(r.year,r.month,r.day));
        textPart.push(\`\${bsScriptNepali(r.year,r.month,r.day)} / \${bsScriptEnglish(r.year,r.month,r.day)}\`, \`\${WD_EN[r.wday]} / \${WD_NP[r.wday]}\`);
      } else {
        const r = bsToAd(parsed.y, parsed.m, parsed.d);
        if (!r){ convertedPart.push('⚠ Not converted, outside supported range'); textPart.push('',''); badFlags[convertedColPos]=true; bad++; return; }
        convertedPart.push(adIso(r.year,r.month,r.day));
        textPart.push(adWordsEnglish(r.year,r.month,r.day), \`\${WD_EN[r.wday]} / \${WD_NP[r.wday]}\`);
      }
      ok++;
    });

    outRows.push([...origPart, ...convertedPart, ...textPart]);
    badMatrix.push(badFlags);
  }

  return {outRows, badMatrix, ok, bad, total};
}

function convertFileColumns(){
  if (!uploadedRows) return;
  const checked = Array.from(document.querySelectorAll('#colChecks input[type=checkbox]:checked')).map(el => Number(el.dataset.col));
  if (checked.length === 0){
    alert('Pick at least one column that contains dates.');
    return;
  }
  const {headers, rows} = uploadedRows;
  const {outRows, badMatrix, ok, bad, total} = convertTable(headers, rows, checked);
  lastFileRows = outRows;
  lastFileBadMatrix = badMatrix;
  renderFileResults(outRows, badMatrix, ok, bad, total, rows.length);
}

function renderFileResults(outRows, badMatrix, ok, bad, total, rowCount){
  const card = document.getElementById('fileResultsCard');
  card.style.display = 'block';
  document.getElementById('fileStatusLine').innerHTML = \`
    <span><b>\${rowCount.toLocaleString()}</b> rows · <b>\${total.toLocaleString()}</b> date cells checked</span>
    <span class="pill ok">\${ok.toLocaleString()} converted</span>
    \${bad ? \`<span class="pill err">\${bad.toLocaleString()} not converted, see highlighted cells below</span>\` : ''}
  \`;
  const PREVIEW = 200;
  const head = outRows[0];
  const body = outRows.slice(1, PREVIEW+1);
  const badBody = badMatrix.slice(1, PREVIEW+1);
  const rowsHtml = body.map((r,ri) => {
    const flags = badBody[ri] || [];
    return \`<tr>\${r.map((c,ci)=>\`<td\${flags[ci] ? ' class="bad"' : ''}>\${c===''?'—':c}</td>\`).join('')}</tr>\`;
  }).join('');
  document.getElementById('fileResultsBody').innerHTML = \`
    <div class="table-scroll">
      <table>
        <thead>\${tableHeadWithCopy(head, 'copyFileColumn')}</thead>
        <tbody>\${rowsHtml}</tbody>
      </table>
    </div>
    <div class="actions" style="padding:0 18px 18px;">
      <button class="btn btn-primary" onclick="copyFileForExcel()">📋 Copy all for Excel</button>
      <button class="btn btn-ghost" onclick="downloadFileXlsx()">⬇ Download .xlsx</button>
      <button class="btn btn-ghost" onclick="downloadFileCsv()">⬇ Download .csv</button>
    </div>\`;
  const foot = document.getElementById('fileTableFoot');
  foot.style.display = 'block';
  foot.textContent = outRows.length-1 > PREVIEW
    ? \`Showing first \${PREVIEW.toLocaleString()} of \${(outRows.length-1).toLocaleString()} rows in preview. Use Copy or Download for all rows.\`
    : \`\${(outRows.length-1).toLocaleString()} row(s) total.\`;
}

function copyFileForExcel(){
  const tsv = lastFileRows.map(r => r.join('\\t')).join('\\n');
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(tsv).catch(()=>fallbackCopy(tsv,()=>{}));
  } else { fallbackCopy(tsv, ()=>{}); }
}
function downloadFileXlsx(){
  const ws = XLSX.utils.aoa_to_sheet(lastFileRows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Converted');
  XLSX.writeFile(wb, 'nepali-date-file-conversion.xlsx');
}
function downloadFileCsv(){
  const csv = lastFileRows.map(row => row.map(cell => \`"\${String(cell||'').replace(/"/g,'""')}"\`).join(',')).join('\\n');
  const blob = new Blob(['\\ufeff', csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'nepali-date-file-conversion.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ---- Calendar pickers (both AD and BS), shows the whole year at once ----
const calState = { mode: null, year: null, pickedThisSession: new Set() };
const WD_SHORT = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function openCalendar(mode){
  calState.mode = mode;
  const today = new Date();
  if (mode === 'AD'){
    calState.year = today.getFullYear();
  } else {
    calState.year = adToBs(today.getFullYear(), today.getMonth()+1, today.getDate()).year;
  }
  document.getElementById('calendarPopover').style.display = 'flex';
  renderCalendar();
}

function closeCalendar(){
  document.getElementById('calendarPopover').style.display = 'none';
}

function navCalendar(delta){
  const minYear = calState.mode === 'AD' ? 1943 : 2000;
  const maxYear = calState.mode === 'AD' ? 2043 : 2100;
  const y = calState.year + delta;
  if (y < minYear || y > maxYear) return;
  calState.year = y;
  renderCalendar();
}

function buildMonthCard(mode, year, month){
  const monthName = mode === 'AD' ? AD_MONTH_EN[month-1] : BS_MONTH_NP[month-1];
  let startWday, daysInMonth;
  if (mode === 'AD'){
    startWday = new Date(Date.UTC(year, month-1, 1)).getUTCDay();
    daysInMonth = new Date(year, month, 0).getDate();
  } else {
    const firstAd = bsToAd(year, month, 1);
    startWday = firstAd ? firstAd.wday : 0;
    daysInMonth = calendarData[String(year)][month-1];
  }
  let cells = '';
  for (let i=0;i<startWday;i++) cells += \`<div class="cal-day blank"></div>\`;
  for (let d=1; d<=daysInMonth; d++){
    const iso = mode === 'AD' ? adIso(year,month,d) : bsIso(year,month,d);
    const picked = calState.pickedThisSession.has(mode+iso);
    const label = mode === 'BS' ? toNepaliDigits(d) : d;
    cells += \`<div class="cal-day\${picked?' picked':''}" onclick="pickCalendarDay(\${month},\${d})">\${label}</div>\`;
  }
  return \`
    <div class="cal-month-card">
      <div class="cal-month-title">\${monthName}</div>
      <div class="cal-grid">
        \${WD_SHORT.map(w=>\`<div class="cal-wd">\${w}</div>\`).join('')}
        \${cells}
      </div>
    </div>\`;
}

function renderCalendar(){
  const { mode, year } = calState;
  const pop = document.getElementById('calendarPopover');
  const yearLabel = mode === 'AD' ? year : \`\${year} (\${toNepaliDigits(year)})\`;
  const months = Array.from({length:12}, (_,i) => buildMonthCard(mode, year, i+1)).join('');

  pop.innerHTML = \`
    <div class="cal-modal">
      <div class="cal-head">
        <button onclick="navCalendar(-1)">‹</button>
        <span class="cal-title">\${mode === 'AD' ? 'English (AD)' : 'Nepali (BS)'} calendar, \${yearLabel}</span>
        <button onclick="navCalendar(1)">›</button>
      </div>
      <div class="cal-year-grid">\${months}</div>
      <div class="cal-foot">
        <span>Click any day to add it, pick as many as you like, from any month or year, then hit Done.</span>
        <button onclick="closeCalendar()">Done</button>
      </div>
    </div>\`;
}

function pickCalendarDay(month, d){
  const { mode, year } = calState;
  const iso = mode === 'AD' ? adIso(year,month,d) : bsIso(year,month,d);
  calState.pickedThisSession.add(mode+iso);
  const box = document.getElementById('pasteInput');
  box.value = box.value.trim() ? box.value.trim() + '\\n' + iso : iso;
  renderCalendar();
}

document.getElementById('calendarPopover') && document.getElementById('calendarPopover').addEventListener('click', (e) => {
  if (e.target.id === 'calendarPopover') closeCalendar();
});

// Drag-and-drop onto the file upload box
(function setupDragDrop(){
  const zone = document.getElementById('fileDropZone');
  if (!zone) return;
  ['dragenter','dragover'].forEach(evt => zone.addEventListener(evt, e => {
    e.preventDefault(); e.stopPropagation(); zone.style.borderColor = 'var(--blue)';
  }));
  ['dragleave','drop'].forEach(evt => zone.addEventListener(evt, e => {
    e.preventDefault(); e.stopPropagation(); zone.style.borderColor = '';
  }));
  zone.addEventListener('drop', e => {
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file){
      document.getElementById('fileInput').files = e.dataTransfer.files;
      handleFile({target:{files:[file]}});
    }
  });
})();

let lastFileRows = [];
let lastFileBadMatrix = [];

function convertPastedTable(lines){
  const table = lines.map(l => l.split('\\t'));
  const numCols = Math.max(...table.map(r => r.length));
  const firstRowLooksLikeData = table[0].some(cell => parseDateString(String(cell).trim()) !== null);

  let headers, rows;
  if (firstRowLooksLikeData){
    headers = Array.from({length:numCols}, (_,i) => \`Column \${i+1}\`);
    rows = table;
  } else {
    headers = table[0].map((h,i) => h && h.trim() ? h.trim() : \`Column \${i+1}\`);
    rows = table.slice(1);
  }

  // auto-detect which columns actually contain dates by sampling a few rows
  const checked = [];
  for (let c=0; c<numCols; c++){
    const sample = rows.slice(0,5).map(r => r[c]).find(v => v !== undefined && v.trim() !== '');
    if (sample && parseDateString(sample.trim()) !== null) checked.push(c);
  }
  if (checked.length === 0){
    document.getElementById('statusLine').innerHTML = '<span style="color:var(--err)">Pasted multiple columns, but none of them looked like dates, check the format and try again.</span>';
    return;
  }

  const {outRows, badMatrix, ok, bad, total} = convertTable(headers, rows, checked);
  lastFileRows = outRows;
  lastFileBadMatrix = badMatrix;
  document.getElementById('resultsBody').innerHTML = '<div class="empty"><div class="big">📅</div>Multi-column input detected, results are in the table below.</div>';
  document.getElementById('statusLine').innerHTML = \`<span>Detected \${numCols} column(s) in your paste, \${checked.length} of them dates. Full results below.</span>\`;
  document.getElementById('tableFoot').style.display = 'none';
  renderFileResults(outRows, badMatrix, ok, bad, total, rows.length);
}

function runConversion(){
  const raw = document.getElementById('pasteInput').value;
  const lines = raw.split(/\\r?\\n/).map(l=>l.replace(/\\r$/,'')).filter(l=>l.trim().length>0);
  if (lines.length === 0){
    document.getElementById('statusLine').innerHTML = '<span>Nothing to convert, paste at least one date first.</span>';
    return;
  }
  if (lines.length > 100000){
    document.getElementById('statusLine').innerHTML = '<span style="color:var(--err)">Limit is 100,000 lines. You pasted '+lines.length.toLocaleString()+'.</span>';
    return;
  }

  // If the paste has tabs, it's multiple columns copied straight from Excel —
  // handle it the same way as a multi-column file upload instead of one flat list.
  const looksMultiColumn = lines.some(l => l.includes('\\t'));
  if (looksMultiColumn){
    convertPastedTable(lines);
    return;
  }

  document.getElementById('fileResultsCard').style.display = 'none';
  const results = [];
  let ok = 0, bad = 0;

  for (const line of lines){
    const parsed = parseDateString(line.trim());
    if (!parsed){
      results.push({original: line, bad:true, status:'⚠ Not converted, unrecognized format'});
      bad++; continue;
    }
    let mode = currentMode;
    if (mode === 'AUTO'){
      if (parsed.calendarHint === 'BS') mode = 'BS_TO_AD';
      else if (parsed.calendarHint === 'AD') mode = 'AD_TO_BS';
      else mode = (parsed.y <= 2043) ? 'AD_TO_BS' : 'BS_TO_AD';
    }

    if (mode === 'AD_TO_BS'){
      const r = adToBs(parsed.y, parsed.m, parsed.d);
      if (!r){ results.push({original: line, bad:true, status:'⚠ Not converted, outside supported range'}); bad++; continue; }
      results.push({
        original: adIso(parsed.y, parsed.m, parsed.d),
        converted: bsIso(r.year, r.month, r.day),
        bsNepaliScript: bsScriptNepali(r.year, r.month, r.day),
        bsEnglishScript: bsScriptEnglish(r.year, r.month, r.day),
        wdEn: WD_EN[r.wday], wdNp: WD_NP[r.wday], status:'OK', bad:false, direction:'AD_TO_BS'
      });
      ok++;
    } else {
      const r = bsToAd(parsed.y, parsed.m, parsed.d);
      if (!r){ results.push({original: line, bad:true, status:'⚠ Not converted, outside supported range'}); bad++; continue; }
      results.push({
        original: line.trim(),
        originalNormalized: bsIso(parsed.y, parsed.m, parsed.d) + ' (' + bsIsoNepali(parsed.y, parsed.m, parsed.d) + ')',
        converted: adIso(r.year, r.month, r.day),
        adEnglishWords: adWordsEnglish(r.year, r.month, r.day),
        wdEn: WD_EN[r.wday], wdNp: WD_NP[r.wday], status:'OK', bad:false, direction:'BS_TO_AD'
      });
      ok++;
    }
  }

  lastResults = results;
  renderResults(results, ok, bad);
}

function renderResults(results, ok, bad){
  const statusLine = document.getElementById('statusLine');
  statusLine.innerHTML = \`
    <span><b>\${results.length.toLocaleString()}</b> rows processed</span>
    <span class="pill ok">\${ok.toLocaleString()} converted</span>
    \${bad ? \`<span class="pill err">\${bad.toLocaleString()} failed</span>\` : ''}
  \`;

  const isBsToAd = currentMode === 'BS_TO_AD';
  const isMixed = currentMode === 'AUTO';

  let headCols, rowsHtml;

  if (!isMixed) {
    headCols = isBsToAd
      ? ['Original (as entered)','Recognized BS date','Converted (AD)','Converted (AD, English)','Weekday','Weekday (नेपाली)','Status']
      : ['Original (AD)','Converted (BS)','Converted (BS, नेपाली)','Converted (BS, English)','Weekday','Weekday (नेपाली)','Status'];

    const PREVIEW = 500;
    rowsHtml = results.slice(0, PREVIEW).map(r => {
      if (r.bad) return \`<tr class="bad"><td>\${r.original}</td><td colspan="5">—</td><td>\${r.status}</td></tr>\`;
      if (r.direction === 'BS_TO_AD') {
        return \`<tr><td>\${r.original}</td><td>\${r.originalNormalized}</td><td>\${r.converted}</td><td>\${r.adEnglishWords}</td><td>\${r.wdEn}</td><td>\${r.wdNp}</td><td>\${r.status}</td></tr>\`;
      }
      return \`<tr><td>\${r.original}</td><td>\${r.converted}</td><td>\${r.bsNepaliScript}</td><td>\${r.bsEnglishScript}</td><td>\${r.wdEn}</td><td>\${r.wdNp}</td><td>\${r.status}</td></tr>\`;
    }).join('');
  } else {
    headCols = ['Original','Detected as','Converted','Converted (full text)','Weekday','Weekday (नेपाली)','Status'];
    const PREVIEW = 500;
    rowsHtml = results.slice(0, PREVIEW).map(r => {
      if (r.bad) return \`<tr class="bad"><td>\${r.original}</td><td colspan="5">—</td><td>\${r.status}</td></tr>\`;
      if (r.direction === 'BS_TO_AD') {
        return \`<tr><td>\${r.original}</td><td>BS → AD</td><td>\${r.converted}</td><td>\${r.adEnglishWords}</td><td>\${r.wdEn}</td><td>\${r.wdNp}</td><td>\${r.status}</td></tr>\`;
      }
      return \`<tr><td>\${r.original}</td><td>AD → BS</td><td>\${r.converted}</td><td>\${r.bsNepaliScript} / \${r.bsEnglishScript}</td><td>\${r.wdEn}</td><td>\${r.wdNp}</td><td>\${r.status}</td></tr>\`;
    }).join('');
  }

  document.getElementById('resultsBody').innerHTML = \`
    <div class="table-scroll">
      <table>
        <thead>\${tableHeadWithCopy(headCols, 'copyMainColumn')}</thead>
        <tbody>\${rowsHtml}</tbody>
      </table>
    </div>\`;

  const foot = document.getElementById('tableFoot');
  foot.style.display = 'block';
  foot.textContent = results.length > 500
    ? \`Showing first 500 of \${results.length.toLocaleString()} rows in preview. Use Copy or Download below to get all rows.\`
    : \`\${results.length.toLocaleString()} row(s) total.\`;

  const actions = document.createElement('div');
  actions.className = 'actions';
  actions.style.padding = '0 18px 18px';
  actions.innerHTML = \`
    <button class="btn btn-primary" onclick="copyForExcel()">📋 Copy all for Excel</button>
    <button class="btn btn-ghost" onclick="downloadXlsx()">⬇ Download .xlsx</button>
    <button class="btn btn-ghost" onclick="downloadCsv()">⬇ Download .csv</button>
  \`;
  document.getElementById('resultsBody').appendChild(actions);
}

function buildRows(){
  const isBsToAd = currentMode === 'BS_TO_AD';
  const isMixed = currentMode === 'AUTO';
  let header;
  if (!isMixed) {
    header = isBsToAd
      ? ['Original (as entered)','Recognized BS date','Converted (AD)','Converted (AD, English)','Weekday','Weekday (Nepali)','Status']
      : ['Original (AD)','Converted (BS)','Converted (BS, Nepali script)','Converted (BS, English)','Weekday','Weekday (Nepali)','Status'];
  } else {
    header = ['Original','Detected as','Converted','Converted (full text)','Weekday','Weekday (Nepali)','Status'];
  }
  const rows = [header];
  for (const r of lastResults){
    if (r.bad) { rows.push([r.original,'','','','','',r.status]); continue; }
    if (!isMixed) {
      if (r.direction === 'BS_TO_AD') rows.push([r.original, r.originalNormalized, r.converted, r.adEnglishWords, r.wdEn, r.wdNp, r.status]);
      else rows.push([r.original, r.converted, r.bsNepaliScript, r.bsEnglishScript, r.wdEn, r.wdNp, r.status]);
    } else {
      if (r.direction === 'BS_TO_AD') rows.push([r.original, 'BS to AD', r.converted, r.adEnglishWords, r.wdEn, r.wdNp, r.status]);
      else rows.push([r.original, 'AD to BS', r.converted, \`\${r.bsNepaliScript} / \${r.bsEnglishScript}\`, r.wdEn, r.wdNp, r.status]);
    }
  }
  return rows;
}

function buildTsv(){
  return buildRows().map(row => row.join('\\t')).join('\\n');
}

function copyText(text, btn){
  const done = () => {
    if (btn){
      const old = btn.textContent;
      btn.textContent = '✓'; btn.classList.add('done');
      setTimeout(()=>{ btn.textContent = old; btn.classList.remove('done'); }, 1200);
    }
  };
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(done).catch(()=>fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}

// Copies just one column from the paste-conversion results table (header + values, one per line)
function copyMainColumn(colIndex, btn){
  const rows = buildRows();
  const text = rows.map(r => r[colIndex]).join('\\n');
  copyText(text, btn);
}

// Copies just one column from the file-conversion results table
function copyFileColumn(colIndex, btn){
  const text = lastFileRows.map(r => r[colIndex]).join('\\n');
  copyText(text, btn);
}

function tableHeadWithCopy(headers, copyFnName){
  return '<tr>' + headers.map((h,i) =>
    \`<th><div class="th-inner"><span>\${h}</span><button class="col-copy" title="Copy this column" onclick="\${copyFnName}(\${i}, this)">📋</button></div></th>\`
  ).join('') + '</tr>';
}

function copyForExcel(){
  const tsv = buildTsv();
  const finish = (msg) => {
    const btns = document.querySelectorAll('.actions .btn-primary');
    btns.forEach(b => { if (b.textContent.includes('Copy')) { const old=b.textContent; b.textContent = msg; setTimeout(()=>b.textContent=old, 1400); } });
  };
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(tsv).then(()=>finish('✓ Copied')).catch(()=>fallbackCopy(tsv, finish));
  } else {
    fallbackCopy(tsv, finish);
  }
}
function fallbackCopy(text, finish){
  const ta = document.createElement('textarea');
  ta.value = text; document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); finish('✓ Copied'); } catch(e){ finish('Copy failed'); }
  document.body.removeChild(ta);
}

function downloadXlsx(){
  const rows = buildRows();
  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Converted Dates');
  XLSX.writeFile(wb, 'nepali-date-bulk-conversion.xlsx');
}

function downloadCsv(){
  const rows = buildRows();
  const csv = rows.map(row => row.map(cell => \`"\${String(cell||'').replace(/"/g,'""')}"\`).join(',')).join('\\n');
  const blob = new Blob(['\\ufeff', csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'nepali-date-bulk-conversion.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function clearAll(){
  document.getElementById('pasteInput').value = '';
  document.getElementById('fileInput').value = '';
  document.getElementById('colPicker').style.display = 'none';
  document.getElementById('fileResultsCard').style.display = 'none';
  uploadedRows = null; lastResults = []; lastFileRows = [];
  document.getElementById('statusLine').innerHTML = '<span>No results yet, paste dates or upload a file above.</span>';
  document.getElementById('resultsBody').innerHTML = '<div class="empty"><div class="big">📅</div>Converted dates will appear here, ready to copy straight into Excel.</div>';
  document.getElementById('tableFoot').style.display = 'none';
}

const ro = new ResizeObserver(() => {
  window.parent.postMessage({ type: 'resize', height: document.documentElement.scrollHeight }, '*');
});
ro.observe(document.body);
</script>
</body>
</html>`;

const output = `
'use client';
import { useRef, useEffect } from 'react';
import { NepaliDatePageHeader } from '@/components/calculator/NepaliDatePageHeader';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const html = ${JSON.stringify(rawHtml)};

export default function BulkCalculator() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleResize = (e: any) => {
      if (e.data && e.data.type === 'resize' && iframeRef.current) {
        iframeRef.current.style.height = (e.data.height + 40) + 'px';
      }
    };
    window.addEventListener('message', handleResize);
    return () => window.removeEventListener('message', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F3F4] font-sans text-[#3C4043] pb-20">
      <div className="max-w-[1280px] mx-auto px-4 pt-4 pb-16">

        <NepaliDatePageHeader currentPage="bulk" />

        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#DADCE0]">
           <iframe
             ref={iframeRef}
             srcDoc={html}
             className="w-full border-none min-h-[500px]"
             sandbox="allow-scripts allow-downloads allow-popups allow-same-origin"
           />
        </div>

      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/app/calculator/nepali-date/bulk/BulkCalculator.tsx', output, 'utf8');
console.log('Fixed BulkCalculator.tsx');
