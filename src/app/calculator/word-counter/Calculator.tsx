'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import { CalculatorErrorBoundary } from '@/components/calculator/CalculatorErrorBoundary';
import { Type, FileText } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');

  const result = useMemo(() => {
    const trimmed = text.trim();
    const words    = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars    = text.length;
    const noSpace  = text.replace(/\s+/g, '').length;
    const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const paras    = trimmed ? trimmed.split(/\n+/).filter(p => p.trim()).length : 0;
    const lines    = text ? text.split(/\n/).length : 0;
    const readMins = Math.ceil(words / 200);
    const wordCounts: Record<string, number> = {};
    if (trimmed) trimmed.toLowerCase().replace(/[.,!?]/g,'').split(/\s+/).forEach(w => { if (w.length > 3) wordCounts[w] = (wordCounts[w]||0)+1; });
    const topWords = Object.entries(wordCounts).sort((a,b) => b[1]-a[1]).slice(0,5);
    return { words, chars, noSpace, sentences, paras, lines, readMins, topWords };
  }, [text]);

  return (
    <CalculatorErrorBoundary calculatorName="Word Counter">
      <ModernCalcLayout
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'Word Counter' }]}
        title="Word & Character Counter"
        description="Count words, characters, sentences, and paragraphs in real-time. Get reading time estimates and keyword density analysis for SEO."
        icon={Type}
        inputs={
          <div className="space-y-4 h-full flex flex-col">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-800">Text Input</label>
              <button onClick={() => setText('')} className="text-xs font-bold text-rose-500 uppercase tracking-widest hover:text-rose-700 transition-colors px-3 py-1 rounded-full hover:bg-rose-50">Clear Text</button>
            </div>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Type or paste your document, essay, or blog post here..."
              className="w-full flex-grow rounded-2xl border border-slate-300 bg-white p-5 text-sm font-medium text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none shadow-inner transition-all leading-relaxed"
              style={{ minHeight: '320px' }}
            />
            {result.topWords.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mt-4">
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-500" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-700">Keyword Density</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {result.topWords.map(([word, count]) => (
                    <div key={word} className="px-5 py-3 flex justify-between items-center hover:bg-slate-50 transition-colors">
                      <span className="text-sm font-bold text-slate-800">{word}</span>
                      <span className="text-xs font-black bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full">{count} uses</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        }
        results={
          <div className="space-y-6">
            {/* Words & Chars hero */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-indigo-600 rounded-3xl text-white text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 pointer-events-none -mt-4 -mr-4">
                    <Type className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                    <div className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">Total Words</div>
                    <div className="text-5xl font-black font-mono tracking-tighter">{result.words}</div>
                </div>
              </div>
              <div className="p-6 bg-white border border-slate-200 rounded-3xl text-center shadow-sm flex flex-col justify-center">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Characters</div>
                <div className="text-5xl font-black font-mono text-indigo-600 tracking-tighter">{result.chars}</div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-100">
              {[
                { label: 'Characters (No Spaces)', val: result.noSpace, desc: 'Excludes whitespace' },
                { label: 'Sentences',         val: result.sentences, desc: 'Ending in period, exclamation, or question' },
                { label: 'Paragraphs',        val: result.paras, desc: 'Separated by line breaks' },
                { label: 'Reading Time', val: `~${result.readMins} min`, desc: 'Based on 200 words per minute' },
              ].map(({ label, val, desc }) => (
                <div key={label} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-0.5">{label}</span>
                      <span className="block text-[10px] text-slate-500">{desc}</span>
                  </div>
                  <span className="text-xl font-black text-slate-800">{val}</span>
                </div>
              ))}
            </div>

            <div className="p-5 bg-slate-900 rounded-2xl shadow-lg text-white">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Writing Limits Guide</h4>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-slate-300">Twitter/X Post</span>
                        <span className={`font-bold ${result.chars > 280 ? 'text-rose-400' : 'text-emerald-400'}`}>{result.chars} / 280 chars</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-slate-300">Meta Title (SEO)</span>
                        <span className={`font-bold ${result.chars > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>{result.chars} / 60 chars</span>
                    </div>
                </div>
            </div>
          </div>
        }
        sidebar={{
          title: "Related Tools",
          links: [
            { label: 'Percentage Calculator', href: '/calculator/percentage' },
            { label: 'Rounding Calculator', href: '/calculator/rounding' },
          ],
        }}
        howToUse={{
          steps: [
            "Simply begin typing in the text area, or paste text copied from Word, Google Docs, or a website.",
            "The calculator analyzes your text in real-time as you type.",
            "Check the top counters for quick word and character totals.",
            "Review the detailed breakdown to see sentence count, paragraph count, and estimated reading time.",
            "Check the 'Keyword Density' panel (appears once you start typing) to see which words you are using most frequently (words over 3 letters)."
          ]
        }}
        details={
          <div className="space-y-8">
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#202124] mb-4">Text Analytics & Content Measurement Science</h2>
              <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
                <p>Our <strong className="text-[#202124]">word and character counter</strong> provides a professional-grade textual analysis suite beyond a simple word tally. Every piece of content—from academic dissertations and legal contracts to social media posts and SEO blog articles—operates within strict quantitative constraints. This tool gives you real-time, zero-latency visibility into all critical text metrics as you write.</p>
                <p>The tool analyzes your text across 6 dimensions simultaneously: word count, character count (with and without spaces), sentence count, paragraph count, reading time estimate, and keyword frequency density. All computations are client-side, meaning your text never leaves your browser.</p>
              </div>
            </div>
            <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Platform Character Limits Reference</h3>
              <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
                <li><strong className="text-[#1A73E8]">X (Twitter): 280 characters</strong> per post. Thread posts also 280 each. Character count includes spaces, punctuation, and URLs (URLs count as 23 characters regardless of actual length).</li>
                <li><strong className="text-[#188038]">Google Meta Title: 50–60 characters</strong> is the optimal range before truncation in search results. Meta descriptions should be 150–160 characters for full display.</li>
                <li><strong className="text-[#D93025]">SMS Text: 160 characters</strong> per standard SMS segment. Messages above 160 characters are split into multiple segments and billed accordingly by carriers.</li>
              </ul>
            </div>
          </div>
        }
        faqs={[
          {
            question: "Why does character count matter for SEO?",
            answer: "Google's search results truncate page titles longer than ~60 characters and meta descriptions longer than ~160 characters. If your title is too long, the end is cut off with an ellipsis, potentially hiding your most important keywords and CTAs."
          },
          {
            question: "How is reading time calculated?",
            answer: "The average adult reads at approximately 200–250 words per minute for normal comprehension. We use 200 WPM as a conservative benchmark, appropriate for academic or technical content. A 1,000-word blog post takes approximately 5 minutes to read."
          },
          {
            question: "What is keyword density and why does it matter?",
            answer: "Keyword density is the percentage frequency a specific word appears in your total text. For SEO, targeting 1–2% density for your primary keyword ensures prominence without 'keyword stuffing', which search engines penalize. Our tool shows the top 5 most-repeated words over 3 characters."
          },
          {
            question: "What counts as a 'sentence' in this calculator?",
            answer: "The counter detects sentence boundaries using terminal punctuation: periods (.), exclamation marks (!), and question marks (?). Ellipses (...) and abbreviations (e.g., Dr., Inc.) may slightly affect the count since they also contain periods."
          },
          {
            question: "Does character count include spaces?",
            answer: "Yes, the primary character count includes all characters including spaces. We also separately show 'Characters (No Spaces)' which excludes all whitespace. Academic assignments often specify 'no-space' character limits for this reason."
          },
          {
            question: "Can I use this tool to check if a Nepali or Hindi text fits platform limits?",
            answer: "Yes. This tool counts characters in any script including Devanagari. However, be aware that many social platforms count non-ASCII characters (like Nepali/Hindi text) differently—some platforms count each Unicode code point as 2 characters. Always verify against the platform's own counter for multilingual content."
          }
        ]}
      />
    </CalculatorErrorBoundary>
  );
}
