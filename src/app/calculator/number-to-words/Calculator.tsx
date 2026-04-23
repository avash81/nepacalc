'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Copy, Check, Type } from 'lucide-react';

const UNITS = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS  = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function helper(n: number): string {
  if (n === 0) return '';
  if (n < 20) return UNITS[n];
  if (n < 100) return TENS[Math.floor(n/10)] + (n%10 ? ' ' + UNITS[n%10] : '');
  return UNITS[Math.floor(n/100)] + ' Hundred' + (n%100 ? ' and ' + helper(n%100) : '');
}

function toIntl(n: number): string {
  const scales = ['','Thousand','Million','Billion','Trillion'];
  let r = ''; let si = 0;
  while (n > 0) { const c = n%1000; if (c) r = helper(c) + (scales[si] ? ' '+scales[si] : '') + (r ? ' '+r : ''); n = Math.floor(n/1000); si++; }
  return r;
}

function toLakh(n: number): string {
  let r = '';
  if (n >= 10000000) { r += helper(Math.floor(n/10000000)) + ' Crore '; n %= 10000000; }
  if (n >= 100000)   { r += helper(Math.floor(n/100000)) + ' Lakh '; n %= 100000; }
  if (n >= 1000)     { r += helper(Math.floor(n/1000)) + ' Thousand '; n %= 1000; }
  if (n > 0) r += helper(n);
  return r.trim();
}

export default function NumberToWords() {
  const [number, setNumber]   = useState('12345');
  const [system, setSystem]   = useState<'intl'|'lakh'>('lakh');
  const [asCurrency, setAsCurr] = useState(false);
  const [copied, setCopied]   = useState(false);

  const r = useMemo(() => {
    const n = Math.floor(Math.abs(Number(number)));
    if (isNaN(n)) return 'Invalid number';
    if (n === 0) return asCurrency ? 'Zero Rupees Only' : 'Zero';
    if (n > 9999999999) return 'Number too large for words';
    
    const prefix = number.startsWith('-') ? 'Minus ' : '';
    const w = system === 'intl' ? toIntl(n) : toLakh(n);
    
    const final = w.charAt(0).toUpperCase() + w.slice(1);
    return asCurrency ? `Rupees ${final.trim()} Only` : `${prefix}${final.trim()}`;
  }, [number, system, asCurrency]);

  const copy = () => { navigator.clipboard.writeText(r); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Number Formatter' }]}
      title="Number to Words Converter"
      description="Convert numbers into written English words using South Asian (Lakh/Crore) or International (Millions/Billions) number systems."
      icon={Type}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800">Enter Number</label>
            <input type="number" value={number} onChange={e => setNumber(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 font-mono text-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800">Number System</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: 'intl', label: 'International (Millions)' },
                { val: 'lakh', label: 'South Asian (Lakh/Crore)' },
              ].map(s => (
                <button key={s.val} onClick={() => setSystem(s.val as any)}
                  className={`py-2 px-3 text-sm font-medium rounded-md transition-all ${system === s.val ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
            <input 
              type="checkbox" 
              checked={asCurrency} 
              onChange={() => setAsCurr(!asCurrency)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-slate-700">Format as Currency (e.g., "Rupees ... Only")</span>
          </label>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500">Quick Examples</label>
            <div className="flex flex-wrap gap-2">
              {['1000', '50000', '100000', '10000000'].map(ex => (
                <button key={ex} onClick={() => setNumber(ex)}
                  className="px-3 py-1.5 border border-slate-200 rounded-md bg-white hover:bg-slate-50 text-sm font-medium text-blue-600 transition-all">
                  {parseInt(ex).toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="text-xs font-bold uppercase text-slate-500 mb-2">Result in Words</div>
            <p className="text-lg font-medium text-slate-900 leading-relaxed">{r}</p>
          </div>

          <button onClick={copy}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2">
            {copied ? <><Check className="w-5 h-5" /> Copied!</> : <><Copy className="w-5 h-5" /> Copy to Clipboard</>}
          </button>

          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Selected System</span>
              <span className="font-medium text-slate-900">{system === 'intl' ? 'International' : 'South Asian'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Formatted</span>
              <span className="font-mono text-slate-900">{parseInt(number) ? parseInt(number).toLocaleString(system === 'lakh' ? 'en-IN' : 'en-US') : 0}</span>
            </div>
          </div>
        </div>
      }
      sidebar={{
        title: "Related Tools",
        links: [
          { label: 'Roman Numerals', href: '/calculator/roman-numerals' },
          { label: 'Word Counter', href: '/calculator/word-counter' },
          { label: 'Percentage Calculator', href: '/calculator/percentage' },
        ],
      }}
      howToUse={{
        steps: [
          "Type or paste your number into the input field.",
          "Select your preferred number system: South Asian (uses Lakhs and Crores) or International (uses Millions and Billions).",
          "Toggle 'Format as Currency' if you are writing a check or official document and need the 'Rupees ... Only' format.",
          "Click the Copy button to copy the generated text to your clipboard."
        ]
      }}
      seoContent={
        <div>
          <h2>How the Number to Words Converter Works</h2>
          <p>Converting large numbers into written words is often required for writing checks, filling out legal contracts, and drafting official documents where accuracy is paramount and numerical digits can easily be tampered with. This converter supports two primary number systems used globally.</p>
          
          <h3>The South Asian Numbering System</h3>
          <p>Widely used in Nepal, India, Pakistan, and Bangladesh, this system groups numbers differently after the thousands place.</p>
          <ul>
            <li><strong>Lakh:</strong> Represents 100,000 (One Hundred Thousand). Written as 1,00,000.</li>
            <li><strong>Crore:</strong> Represents 10,000,000 (Ten Million). Written as 1,00,00,000.</li>
          </ul>
          
          <h3>The International Numbering System</h3>
          <p>This is the standard Western numbering system, where large numbers are grouped into periods of three digits separated by commas.</p>
          <ul>
            <li><strong>Million:</strong> Represents 1,000,000 (Ten Lakhs).</li>
            <li><strong>Billion:</strong> Represents 1,000,000,000 (One Hundred Crores).</li>
            <li><strong>Trillion:</strong> Represents 1,000,000,000,000.</li>
          </ul>
          
          <h3>Why Spell Out Numbers?</h3>
          <p>In financial and legal contexts, spelling out numbers prevents fraud. For instance, the number "500" can easily be altered to "5000" by adding a zero. However, altering "Five Hundred Only" is significantly more difficult without leaving clear evidence of tampering. Always use the "Format as Currency" feature when dealing with financial instruments.</p>
        </div>
      }
    />
  );
}
