'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { Copy, Check, Type, FileText, CheckCircle2, Languages } from 'lucide-react';

const EN_ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const EN_TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

const NP_NUMS: Record<number, string> = {
  0: 'शून्य', 1: 'एक', 2: 'दुई', 3: 'तीन', 4: 'चार', 5: 'पाँच', 6: 'छ', 7: 'सात', 8: 'आठ', 9: 'नौ',
  10: 'दश', 11: 'एघार', 12: 'बाह्र', 13: 'तेह्र', 14: 'चौध', 15: 'पन्ध्र', 16: 'सोध्र', 17: 'सत्र', 18: 'अठार', 19: 'उन्नीस',
  20: 'बीस', 21: 'एक्काइस', 22: 'बाइस', 23: 'तेइस', 24: 'चौबिस', 25: 'पच्चीस', 26: 'छब्बीस', 27: 'सत्ताइस', 28: 'अठ्ठाइस', 29: 'उनन्तीस',
  30: 'तीस', 31: 'एकतीस', 32: 'बत्तीसा', 33: 'तेत्तीस', 34: 'चौंतीस', 35: 'पैंतीस', 36: 'छत्तिस', 37: 'सैंतीस', 38: 'अठतीस', 39: 'उनन्चालीस',
  40: 'चालीस', 41: 'एकचालीस', 42: 'बयालीस', 43: 'त्रिचालीस', 44: 'चवालीस', 45: 'पैंतालीस', 46: 'छयालीस', 47: 'सच्चालीस', 48: 'अठचालीस', 49: 'उनन्चास',
  50: 'पचास', 51: 'एकाउन्न', 52: 'बाउन्न', 53: 'त्रिपन्न', 54: 'चौवन्न', 55: 'पचपन्न', 56: 'छपन्न', 57: 'सन्ताउन्न', 58: 'अन्ठाउन्न', 59: 'उनन्साठ्ठी',
  60: 'साठ्ठी', 61: 'एकसट्ठी', 62: 'बाइसट्ठी', 63: 'त्रिसट्ठी', 64: 'चौंसट्ठी', 65: 'पैंसट्ठी', 66: 'छयसट्ठी', 67: 'सड्सट्ठी', 68: 'अड्सट्ठी', 69: 'उनन्सत्तरी',
  70: 'सत्तरी', 71: 'एकहत्तर', 72: 'बहत्तर', 73: 'त्रिहत्तर', 74: 'चौहत्तर', 75: 'पचहत्तर', 76: 'छयहत्तर', 77: 'सतहत्तर', 78: 'अठहत्तर', 79: 'उनासी',
  80: 'असी', 81: 'एकासी', 82: 'बयासी', 83: 'त्रियासी', 84: 'चौरासी', 85: 'पचासी', 86: 'छयासी', 87: 'सतासी', 88: 'अठासी', 89: 'उनान्नब्बे',
  90: 'नब्बे', 91: 'एकान्नब्बे', 92: 'बयान्नब्बे', 93: 'त्रियान्नब्बे', 94: 'चौरान्नब्बे', 95: 'पञ्चान्नब्बे', 96: 'छयान्नब्बे', 97: 'सन्तानब्बे', 98: 'अन्ठानब्बे', 99: 'उनान्सय'
};

function helperEn(n: number): string {
  if (n === 0) return '';
  if (n < 20) return EN_ONES[n];
  if (n < 100) return EN_TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + EN_ONES[n % 10] : '');
  return EN_ONES[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + helperEn(n % 100) : '');
}

function toIntlEnglish(n: number): string {
  if (n === 0) return 'Zero';
  const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
  let r = '';
  let si = 0;
  while (n > 0) {
    const c = n % 1000;
    if (c) {
      const seg = helperEn(c);
      r = seg + (scales[si] ? ' ' + scales[si] : '') + (r ? ' ' + r : '');
    }
    n = Math.floor(n / 1000);
    si++;
  }
  return r.trim();
}

function toSouthAsianEnglish(n: number): string {
  if (n === 0) return 'Zero';
  let r = '';
  if (n >= 10000000) {
    r += helperEn(Math.floor(n / 10000000)) + ' Crore ';
    n %= 10000000;
  }
  if (n >= 100000) {
    r += helperEn(Math.floor(n / 100000)) + ' Lakh ';
    n %= 100000;
  }
  if (n >= 1000) {
    r += helperEn(Math.floor(n / 1000)) + ' Thousand ';
    n %= 1000;
  }
  if (n > 0) {
    r += helperEn(n);
  }
  return r.trim();
}

function helperNp(n: number): string {
  if (n === 0) return '';
  if (n <= 99) return NP_NUMS[n] || String(n);
  const hundred = Math.floor(n / 100);
  const rem = n % 100;
  let s = (NP_NUMS[hundred] || String(hundred)) + ' सय';
  if (rem > 0) {
    s += ' ' + (NP_NUMS[rem] || String(rem));
  }
  return s;
}

function toNepaliDevanagari(n: number): string {
  if (n === 0) return 'शून्य';
  let r = '';
  if (n >= 10000000) {
    const cr = Math.floor(n / 10000000);
    r += helperNp(cr) + ' करोड ';
    n %= 10000000;
  }
  if (n >= 100000) {
    const lk = Math.floor(n / 100000);
    r += helperNp(lk) + ' लाख ';
    n %= 100000;
  }
  if (n >= 1000) {
    const th = Math.floor(n / 1000);
    r += helperNp(th) + ' हजार ';
    n %= 1000;
  }
  if (n > 0) {
    r += helperNp(n);
  }
  return r.trim();
}

export default function NumberToWordsCalculator() {
  const [inputVal, setInputVal] = useState('125000.50');
  const [system, setSystem] = useState<'lakh' | 'intl'>('lakh');
  const [formatType, setFormatType] = useState<'cheque' | 'plain'>('cheque');
  const [caseType, setCaseType] = useState<'title' | 'upper' | 'lower'>('title');
  const [copiedEn, setCopiedEn] = useState(false);
  const [copiedNp, setCopiedNp] = useState(false);

  const cleanNum = useMemo(() => {
    const s = inputVal.trim();
    if (!s) return null;
    const num = Number(s);
    if (isNaN(num)) return null;
    return num;
  }, [inputVal]);

  const { englishWords, nepaliWords, formattedNumber } = useMemo(() => {
    if (cleanNum === null || cleanNum < 0 || cleanNum > 99999999999) {
      return {
        englishWords: 'Please enter a valid positive number up to 99,999,999,999.',
        nepaliWords: 'कृपया मान्य संख्या प्रविष्ट गर्नुहोस्।',
        formattedNumber: '—'
      };
    }

    const isInt = Number.isInteger(cleanNum);
    const parts = inputVal.split('.');
    const integerPart = Math.floor(cleanNum);
    const decimalPartStr = parts[1] ? parts[1].slice(0, 2) : '';
    const decimalVal = decimalPartStr ? parseInt(decimalPartStr.padEnd(2, '0'), 10) : 0;

    // English conversion
    const intEn = system === 'lakh' ? toSouthAsianEnglish(integerPart) : toIntlEnglish(integerPart);
    let enFull = '';

    if (formatType === 'cheque') {
      if (decimalVal > 0) {
        const decWords = helperEn(decimalVal);
        enFull = `Rupees ${intEn} and ${decWords} Paisa Only`;
      } else {
        enFull = `Rupees ${intEn} Only`;
      }
    } else {
      if (decimalVal > 0) {
        const decWords = helperEn(decimalVal);
        enFull = `${intEn} Point ${decWords}`;
      } else {
        enFull = intEn;
      }
    }

    // Apply Case
    if (caseType === 'upper') {
      enFull = enFull.toUpperCase();
    } else if (caseType === 'lower') {
      enFull = enFull.toLowerCase();
    }

    // Nepali conversion
    const intNp = toNepaliDevanagari(integerPart);
    let npFull = '';
    if (formatType === 'cheque') {
      if (decimalVal > 0) {
        const decNp = NP_NUMS[decimalVal] || String(decimalVal);
        npFull = `${intNp} रुपैयाँ ${decNp} पैसा मात्र`;
      } else {
        npFull = `${intNp} रुपैयाँ मात्र`;
      }
    } else {
      if (decimalVal > 0) {
        const decNp = NP_NUMS[decimalVal] || String(decimalVal);
        npFull = `${intNp} दशमलव ${decNp}`;
      } else {
        npFull = intNp;
      }
    }

    // Format formatted comma string
    const formattedNumber = system === 'lakh'
      ? cleanNum.toLocaleString('en-IN', { maximumFractionDigits: 2 })
      : cleanNum.toLocaleString('en-US', { maximumFractionDigits: 2 });

    return { englishWords: enFull, nepaliWords: npFull, formattedNumber };
  }, [cleanNum, inputVal, system, formatType, caseType]);

  const copyText = (text: string, isNp: boolean) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (isNp) {
      setCopiedNp(true);
      setTimeout(() => setCopiedNp(false), 2000);
    } else {
      setCopiedEn(true);
      setTimeout(() => setCopiedEn(false), 2000);
    }
  };

  return (
    <ModernCalcLayout
      hideH1={false}
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Number to Words' }]}
      title="Number to Words & Cheque Writer"
      description="Convert numbers and monetary amounts to written English words (Lakh/Crore & Million/Billion) and Nepali Devanagari script for bank cheques and invoices."
      icon={Type}
      inputs={
        <div className="space-y-6">
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Amount or Number (Digits)
              </label>
              <input
                type="number"
                step="any"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white font-mono text-2xl font-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
                placeholder="e.g. 125000.50"
              />
              <p className="text-xs text-slate-500">Supports decimals for Paisa / Cents (e.g. 50 Paisa).</p>
            </div>

            {/* Quick Preset Buttons */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Common Cheque Amounts in Nepal</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Rs. 25,000', val: '25000' },
                  { label: 'Rs. 50,000', val: '50000' },
                  { label: 'Rs. 1 Lakh', val: '100000' },
                  { label: 'Rs. 5.5 Lakhs', val: '550000' },
                  { label: 'Rs. 1 Crore', val: '10000000' },
                ].map(p => (
                  <button
                    key={p.label}
                    onClick={() => setInputVal(p.val)}
                    className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-300 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Number System & Format Mode */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                Numbering System
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSystem('lakh')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    system === 'lakh'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-500'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-xs">South Asian (Lakh / Crore)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Standard in Nepal & India (1,00,000)</div>
                </button>
                <button
                  onClick={() => setSystem('intl')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    system === 'intl'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-500'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-xs">International (Million / Billion)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Global standard (100,000)</div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                  Output Format
                </label>
                <select
                  value={formatType}
                  onChange={e => setFormatType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold focus:border-blue-500 outline-none"
                >
                  <option value="cheque">Bank Cheque ("Rupees ... Only")</option>
                  <option value="plain">Plain Words ("One Lakh...")</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                  Capitalization
                </label>
                <select
                  value={caseType}
                  onChange={e => setCaseType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold focus:border-blue-500 outline-none"
                >
                  <option value="title">Title Case (e.g. One Lakh)</option>
                  <option value="upper">UPPERCASE (e.g. ONE LAKH)</option>
                  <option value="lower">lowercase (e.g. one lakh)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-5">
          {/* Formatted Number Badge */}
          <div className="p-3 bg-white border border-slate-200 rounded-xl flex justify-between items-center text-xs">
            <span className="text-slate-500 font-medium">Grouped Representation:</span>
            <span className="font-mono font-bold text-blue-700 text-sm">{formattedNumber}</span>
          </div>

          {/* English Words Result Card */}
          <div className="p-6 bg-blue-600 text-white rounded-2xl shadow-md space-y-3">
            <div className="flex justify-between items-center text-xs text-blue-200 font-bold uppercase tracking-wider">
              <span>English Words (for Cheques / Invoices)</span>
              <button
                onClick={() => copyText(englishWords, false)}
                className="px-3 py-1 bg-white text-blue-700 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-blue-50 transition-all shadow-sm"
              >
                {copiedEn ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedEn ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="text-xl sm:text-2xl font-bold leading-relaxed tracking-tight break-words">
              {englishWords}
            </div>
          </div>

          {/* Nepali Devanagari Result Card */}
          <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-md space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-emerald-400" /> नेपाली अक्षरमा (Devanagari)
              </span>
              <button
                onClick={() => copyText(nepaliWords, true)}
                className="px-3 py-1 bg-white text-slate-900 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-slate-100 transition-all shadow-sm"
              >
                {copiedNp ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedNp ? 'कपी भयो!' : 'Copy'}
              </button>
            </div>
            <div className="text-xl sm:text-2xl font-bold leading-relaxed tracking-tight text-emerald-400 break-words">
              {nepaliWords}
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Always end cheque amounts with "Only" or "मात्र" to prevent unauthorized additions.</span>
          </div>
        </div>
      }
      sidebar={{
        title: "Related Financial Tools",
        links: [
          { label: 'Roman Numerals Converter', href: '/calculator/roman-numerals/' },
          { label: 'Simple Calculator', href: '/calculator/simple-calculator/' },
          { label: 'Nepal Income Tax Slab', href: '/calculator/nepal-income-tax/' },
          { label: 'Bluebook Renewal Nepal', href: '/nepal/bluebook-renewal-nepal/' },
          { label: 'Percentage Calculator', href: '/calculator/percentage/' },
        ],
      }}
      howToUse={{
        steps: [
          "Type the number or monetary amount into the input box (decimals like .50 are supported for Paisa/Cents).",
          "Select South Asian system (for Lakhs and Crores) or International system (for Millions and Billions).",
          "Toggle 'Bank Cheque' format to automatically prefix 'Rupees' and suffix 'Only'.",
          "Use the 1-click Copy buttons to copy the English or Nepali (Devanagari) text directly to your clipboard."
        ]
      }}
    />
  );
}
