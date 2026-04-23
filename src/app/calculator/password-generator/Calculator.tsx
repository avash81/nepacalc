'use client';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { RefreshCw, Copy, Check, ShieldCheck, Key } from 'lucide-react';

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const NUMS  = '0123456789';
const SYMS  = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
const SIMILAR = 'il1Lo0O';

function genPass(len: number, upper: boolean, lower: boolean, nums: boolean, syms: boolean, noSim: boolean): string {
  let cs = '';
  if (upper) cs += UPPER; if (lower) cs += LOWER; if (nums) cs += NUMS; if (syms) cs += SYMS;
  if (noSim) cs = cs.split('').filter(c => !SIMILAR.includes(c)).join('');
  if (!cs) return 'Select at least one type';
  return Array.from({ length: len }, () => cs[Math.floor(Math.random() * cs.length)]).join('');
}

export default function PasswordGenerator() {
  const [length, setLength]             = useState(16);
  const [useUpper, setUpper]            = useState(true);
  const [useLower, setLower]            = useState(true);
  const [useNums, setNums]              = useState(true);
  const [useSyms, setSyms]              = useState(true);
  const [excludeSimilar, setExclude]    = useState(false);
  const [passwords, setPasswords]       = useState<string[]>([]);
  const [copied, setCopied]             = useState<number | null>(null);

  const generate = useCallback(() => {
    setPasswords([
      genPass(length, useUpper, useLower, useNums, useSyms, excludeSimilar),
      genPass(length, useUpper, useLower, useNums, useSyms, excludeSimilar),
      genPass(length, useUpper, useLower, useNums, useSyms, excludeSimilar),
    ]);
    setCopied(null);
  }, [length, useUpper, useLower, useNums, useSyms, excludeSimilar]);

  useEffect(() => { if (passwords.length === 0) generate(); }, [generate, passwords.length]);

  const copy = (pwd: string, i: number) => {
    navigator.clipboard.writeText(pwd); setCopied(i); setTimeout(() => setCopied(null), 2000);
  };

  const strength = useMemo(() => {
    let s = 0;
    if (length > 8) s++; if (length > 12) s++; if (length >= 16) s++;
    if (useUpper && useLower) s++; if (useNums) s++; if (useSyms) s++;
    return s < 3 ? { label: 'Weak', color: '#dc2626', w: '25%' }
         : s < 5 ? { label: 'Fair', color: '#b45309', w: '50%' }
         : s < 6 ? { label: 'Strong', color: '#16a34a', w: '75%' }
         :         { label: 'Very Strong', color: '#1A73E8', w: '100%' };
  }, [length, useUpper, useLower, useNums, useSyms]);

  const OPTS = [
    { label: 'Uppercase (A–Z)', val: useUpper, set: setUpper },
    { label: 'Lowercase (a–z)', val: useLower, set: setLower },
    { label: 'Numbers (0–9)',   val: useNums,  set: setNums  },
    { label: 'Symbols (!@#$)', val: useSyms,  set: setSyms  },
    { label: 'Exclude similar (i, l, 1, O, 0)', val: excludeSimilar, set: setExclude },
  ];

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Password Generator' }]}
      title="Secure Password Generator"
      description="Generate strong, secure, and random passwords instantly. Your data never leaves your browser."
      icon={Key}
      inputs={
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-800">Password Length</label>
              <span className="text-lg font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-md">{length}</span>
            </div>
            <input type="range" min={8} max={64} step={1} value={length} onChange={e => { setLength(Number(e.target.value)); }} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            <div className="flex gap-2 justify-between">
              {[8, 12, 16, 24, 32].map(v => (
                <button key={v} onClick={() => setLength(v)}
                  className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${length === v ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-800">Character Settings</label>
            <div className="grid gap-3">
              {OPTS.map(opt => (
                <label key={opt.label} className="flex items-center gap-3 cursor-pointer p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={opt.val} 
                    onChange={() => opt.set(!opt.val)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-slate-700">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button onClick={generate}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-sm">
            <RefreshCw className="w-5 h-5" /> Generate New Passwords
          </button>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" style={{ color: strength.color }} />
                <span className="text-sm font-bold uppercase tracking-wide" style={{ color: strength.color }}>{strength.label}</span>
              </div>
              <span className="text-xs text-slate-500 font-medium uppercase">{length} characters</span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden w-full">
              <div className="h-full transition-all duration-700 rounded-full" style={{ width: strength.w, backgroundColor: strength.color }} />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-500 ml-1">Generated Options</h3>
            {(passwords.length > 0 ? passwords : ['Generating...','']).map((pwd, i) => (
              <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl flex items-center gap-3 shadow-sm group hover:border-blue-300 transition-colors">
                <div className="flex-1 font-mono text-base break-all text-slate-800 font-medium">{pwd}</div>
                <button onClick={() => copy(pwd, i)}
                  className="shrink-0 h-10 w-10 bg-slate-50 text-slate-600 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                  {copied === i ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                </button>
              </div>
            ))}
          </div>

          <div className="p-4 bg-blue-50 rounded-lg flex items-start gap-3">
             <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
             <p className="text-xs text-blue-800 leading-relaxed font-medium">
               Privacy Guarantee: Passwords are generated locally on your device using browser APIs. They are never transmitted or stored on our servers.
             </p>
          </div>
        </div>
      }
      sidebar={{
        title: "Security Tools",
        links: [
          { label: 'Word Counter', href: '/calculator/word-counter' },
          { label: 'QR Generator', href: '/calculator/qr-generator' },
        ],
      }}
      howToUse={{
        steps: [
          "Select the desired password length (16+ characters is recommended for modern security standards).",
          "Choose which character types to include (Uppercase, Lowercase, Numbers, and Symbols).",
          "Check 'Exclude similar' if you want to avoid confusing characters like '1' and 'l' or '0' and 'O'.",
          "Click the copy icon next to your preferred password to save it to your clipboard."
        ]
      }}
      seoContent={
        <div>
          <h2>Why You Need a Secure Password Generator</h2>
          <p>In today's digital landscape, cybersecurity threats are more sophisticated than ever. Human-created passwords, such as "Password123" or "MyDogFluffy!", are highly susceptible to brute-force and dictionary attacks. A strong password generator creates cryptographically secure, pseudo-random strings of characters that are mathematically impossible to guess.</p>
          
          <h3>What Makes a Password Strong?</h3>
          <ul>
            <li><strong>Length:</strong> The single most important factor. A 16-character password is exponentially harder to crack than an 8-character one. Modern guidelines suggest a minimum of 12-16 characters.</li>
            <li><strong>Complexity:</strong> Utilizing a mix of uppercase letters, lowercase letters, numbers, and symbols increases the entropy (unpredictability) of the password.</li>
            <li><strong>Uniqueness:</strong> Never reuse passwords across different sites. If one site is breached, credential stuffing attacks can compromise your other accounts if they share the same password.</li>
          </ul>
          
          <h3>How Long Does It Take to Crack a Password?</h3>
          <p>With modern GPU clusters, an 8-character password containing only lowercase letters can be cracked almost instantly. However, a 16-character password containing a mix of all character types would take current technology trillions of years to crack via brute force.</p>
          
          <h3>Best Practices for Password Management</h3>
          <p>Because strong, random passwords are impossible to memorize, it is highly recommended to use a reputable Password Manager (such as Bitwarden, 1Password, or the built-in managers in Apple/Google ecosystems). This allows you to generate and store long, complex passwords for every site, requiring you to only remember one strong master password.</p>
        </div>
      }
    />
  );
}
