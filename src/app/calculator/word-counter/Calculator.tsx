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
        faqs={[
          {
            question: "Why does character count matter?",
            answer: "Many platforms have strict character limits. For example, SMS text messages are typically limited to 160 characters, X (formerly Twitter) allows 280 characters, and SEO meta descriptions should ideally be around 150-160 characters to display properly on Google."
          },
          {
            question: "How is reading time calculated?",
            answer: "The average adult reading speed is approximately 200 to 250 words per minute. Our calculator uses a conservative estimate of 200 words per minute to calculate the estimated reading time of your document."
          }
        ]}
        seoContent={
          <div>
            <h2>The Ultimate Online Word Counter Tool</h2>
            <p>Whether you are a student writing an essay, a professional crafting an important email, or a digital marketer optimizing SEO content, keeping track of your word and character count is crucial. Our free, real-time word counter provides deep insights into your text instantly.</p>
            
            <h2>Writing Guide: Mastering Text Constraints</h2>
            <p className="font-medium">
              Whether you are writing a university essay, a professional report, or an SEO-optimized blog post, <strong>word count precision</strong> is a critical requirement.
            </p>
            <p>
              Our <strong>Textual Analysis Laboratory</strong> provides the tools writers in Nepal need to meet their specific targets. From tracking the 280-character limit of a viral tweet to ensuring your thesis abstract stays under the word limit, our engine provides real-time, <strong>non-latency updates</strong> as you type or paste your content, ensuring you never exceed your constraints.
            </p>

            <h3>Beyond Basic Word Counting</h3>
            <p>Most word processors provide a simple word count, but professional writing often requires deeper metrics:</p>
            <ul>
              <li><strong>Characters without Spaces:</strong> Essential for academic assignments and specific web forms that strictly limit actual typed characters.</li>
              <li><strong>Sentence and Paragraph Counts:</strong> Helps you evaluate the readability of your text. If your paragraph count is very low compared to your sentence count, your text may be too dense and hard to read.</li>
              <li><strong>Reading Time:</strong> Crucial for blog posts and speeches. Knowing exactly how long it takes an average person to read your text helps optimize user engagement.</li>
            </ul>
            
            <h3>SEO and Keyword Density</h3>
            <p>For bloggers and SEO professionals, repeating a keyword is necessary, but "keyword stuffing" can result in search engine penalties. Our built-in Keyword Density analyzer automatically extracts words longer than 3 letters and displays the most frequently used terms. This allows you to ensure your target keywords are prominent without being overwhelmingly repetitive.</p>
          </div>
        }
      />
    </CalculatorErrorBoundary>
  );
}
