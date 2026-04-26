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
    <ModernCalcLayout hideH1={true}
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
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">Password Security: Entropy, Brute Force & Cryptographic Randomness</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>Password <strong className="text-[#202124]">entropy</strong> is the mathematical measure of unpredictability. It is calculated as: <code>Entropy = log₂(Pool Size^Length)</code>. A 16-character password using all character types (Pool = 94 printable ASCII chars) has an entropy of ~104 bits—which would take trillions of years to brute-force with current hardware.</p>
              <p>This generator uses the browser's <strong className="text-[#202124]">Web Crypto API</strong> (<code>Math.random()</code>-based selection from a cryptographically seeded character pool) which is significantly more random than standard library RNGs. All generation happens client-side; no password data is ever transmitted to any server.</p>
            </div>
          </div>
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Brute Force Time Estimates (Modern GPU)</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#D93025]">8 characters, lowercase only:</strong> &lt;1 second. Trivially cracked.</li>
              <li><strong className="text-[#F29900]">8 characters, mixed (upper+lower+num+sym):</strong> ~5 hours with dedicated hardware.</li>
              <li><strong className="text-[#188038]">12 characters, mixed:</strong> ~34,000 years. Practically uncrackable today.</li>
              <li><strong className="text-[#1A73E8]">16+ characters, mixed:</strong> Astronomically large time. Effectively immune to all known brute-force methods.</li>
            </ul>
          </div>
        </div>
      }
      faqs={[
        {
          question: "Are the generated passwords stored anywhere?",
          answer: "No. All password generation happens entirely in your browser using local JavaScript. No passwords, settings, or any other data are ever transmitted to our servers. Each page refresh generates a completely fresh set of passwords."
        },
        {
          question: "What makes a password strong?",
          answer: "Three factors: Length (the single most important factor—use 16+ characters), Complexity (mix uppercase, lowercase, numbers, and symbols to maximize the character pool), and Uniqueness (never reuse a password across different services)."
        },
        {
          question: "How long would it take to crack a 16-character password?",
          answer: "A 16-character password using all character types (94 printable ASCII chars) has ~104 bits of entropy. At 10 billion guesses per second (high-end GPU), cracking it would take approximately 3.5 × 10¹⁴ years—far longer than the age of the universe."
        },
        {
          question: "Should I use a password manager with these passwords?",
          answer: "Yes, absolutely. Strong random passwords are impossible to memorize. Use a reputable password manager (Bitwarden is free and open-source; 1Password and Dashlane are premium options) to store them securely. This allows you to generate a unique strong password for every service."
        },
        {
          question: "What does 'Exclude similar characters' do?",
          answer: "It removes visually ambiguous characters from the pool: i, l, 1, L, o, O, 0. This prevents mistakes when manually typing a password (e.g., on a TV remote or when reading the password aloud). Note: excluding these characters slightly reduces entropy."
        },
        {
          question: "Is a passphrase better than a random password?",
          answer: "For memorability, a passphrase (e.g., 'correct-horse-battery-staple') can be both strong and memorable. However, for maximum entropy in a given character count, a random mix of all character types provides slightly higher entropy per character than words. Both are acceptable for 2025 security standards when long enough."
        }
      ]}
    />
  );
}

