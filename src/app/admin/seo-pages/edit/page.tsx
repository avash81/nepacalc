'use client';
import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { SEOScorePanel } from '@/components/admin/SEOScorePanel';
import { getDb, handleFirestoreError, OperationType } from '@/lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { CALCULATORS } from '@/data/calculators';
import {
  Save, ChevronLeft, Link as LinkIcon, Globe, Settings, FileText, Image as ImageIcon, Eye
} from 'lucide-react';
import { clsx } from 'clsx';

const CALC_GROUPS = {
  'Nepal Tools': ['nepal-income-tax','nepal-salary','nepal-vat','nepali-date','nepal-home-loan','nepal-provident-fund'],
  'Finance': ['loan-emi','sip-calculator','fd-calculator','compound-interest','simple-interest','cagr-calculator','discount-calculator','savings'],
  'Health': ['bmi','bmr','ideal-weight','body-fat','calorie-calculator','pregnancy-due-date','water-intake'],
  'Education': ['gpa','cgpa','percentage','attendance','marks-needed'],
  'Math': ['scientific-calculator','fraction-calculator','quadratic-solver','standard-deviation'],
  'Utility': ['password-generator','qr-generator','word-counter','tip-calculator','age-calculator','unit-converter'],
};

const SCHEMA_TYPES = [
  { value: 'Article', label: 'Article — general guide or explainer' },
  { value: 'HowTo', label: 'HowTo — step-by-step instructions' },
  { value: 'FAQPage', label: 'FAQPage — question & answer page' },
  { value: 'WebPage', label: 'WebPage — general landing page' },
];

function EditSEOPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageId = searchParams.get('id');

  const [title, setTitle]           = useState('');
  const [slug, setSlug]             = useState('');
  const [metaTitle, setMetaTitle]   = useState('');
  const [metaDesc, setMetaDesc]     = useState('');
  const [focusKw, setFocusKw]       = useState('');
  const [excerpt, setExcerpt]       = useState('');
  const [content, setContent]       = useState('');
  const [schemaType, setSchemaType] = useState('Article');
  const [ogImage, setOgImage]       = useState('');
  const [imageTop, setImageTop]       = useState('');
  const [imageMiddle, setImageMiddle] = useState('');
  const [imageBottom, setImageBottom] = useState('');
  const [relatedCalcs, setRelated]  = useState<string[]>([]);
  
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [tab, setTab]               = useState<'write' | 'preview'>('write');

  useEffect(() => {
    if (!pageId) {
      router.push('/admin/seo-pages');
      return;
    }

    const fetchPage = async () => {
      try {
        const db = getDb();
        if (!db) return;
        const docRef = doc(db, 'seo_pages', pageId);
        const snap = await getDoc(docRef);
        
        if (snap.exists()) {
          const data = snap.data();
          setTitle(data.title || '');
          setSlug(data.slug || '');
          setMetaTitle(data.metaTitle || '');
          setMetaDesc(data.metaDesc || '');
          setFocusKw(data.focusKeyword || '');
          setExcerpt(data.excerpt || '');
          setContent(data.content || '');
          setSchemaType(data.schemaType || 'Article');
          setOgImage(data.ogImage || '');
          setImageTop(data.imageTop || '');
          setImageMiddle(data.imageMiddle || '');
          setImageBottom(data.imageBottom || '');
          setRelated(data.relatedCalcs || []);
        } else {
          alert('SEO Page not found.');
          router.push('/admin/seo-pages');
        }
      } catch (e) {
        console.error('Error fetching SEO page:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [pageId, router]);

  const handleTitleChange = useCallback((val: string) => {
    setTitle(val);
    setSlug(val.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 60));
  }, []);

  const toggleCalc = useCallback((slug: string) => {
    setRelated((prev: string[]) =>
      prev.includes(slug)
        ? prev.filter((s: string) => s !== slug)
        : [...prev, slug]
    );
  }, []);

  const handleSave = async (publishStatus: 'draft' | 'published') => {
    if (!pageId) return;
    if (!title.trim() || !slug.trim()) {
      alert('Title and URL slug are required.');
      return;
    }

    setSaving(true);
    try {
      const db = getDb();
      if (!db) return;
      const docRef = doc(db, 'seo_pages', pageId);
      const wordCount = content.split(/\s+/).filter(Boolean).length;

      await updateDoc(docRef, {
        title,
        slug,
        metaTitle,
        metaDesc,
        focusKeyword: focusKw,
        excerpt,
        content,
        schemaType,
        ogImage,
        imageTop,
        imageMiddle,
        imageBottom,
        relatedCalcs,
        status: publishStatus,
        wordCount,
        updatedAt: serverTimestamp(),
      });

      alert('✅ Page updated successfully.');
      router.push('/admin/seo-pages');
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `seo_pages/${pageId}`);
    } finally {
      setSaving(false);
    }
  };

  const renderPreview = () => {
    const escapedContent = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    let html = escapedContent
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-black text-slate-900 mt-8 mb-3">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-slate-800 mt-5 mb-2">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-black text-slate-900">$1</strong>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-slate-700 leading-relaxed">')
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-slate-700 mb-1">$1</li>');

    // Inject middle image in preview
    if (imageMiddle) {
        const parts = html.split('</h2>');
        if (parts.length > 1) {
            html = parts[0] + `</h2><div class="my-6 rounded-2xl overflow-hidden border border-slate-100 shadow-lg"><img src="${imageMiddle}" class="w-full h-auto" /></div>` + parts.slice(1).join('</h2>');
        }
    }

    return (
        <div className="space-y-6">
            {imageTop && (
                <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-xl mb-8">
                    <img src={imageTop} alt="Top" className="w-full h-auto" />
                </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: `<p class="mb-4 text-slate-700 leading-relaxed">${html}</p>` }} />
            {imageBottom && (
                <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-xl mt-8">
                    <img src={imageBottom} alt="Bottom" className="w-full h-auto" />
                </div>
            )}
        </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-[50vh] flex flex-col items-center justify-center font-sans">
           <div className="w-12 h-12 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mb-4" />
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Synchronizing Nodes...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-[1500px] mx-auto space-y-8 pb-24 font-sans">

        <div className="flex items-center justify-between mb-2">
           <Link href="/admin/seo-pages" className="inline-flex items-center gap-2 text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors bg-white border border-slate-100 pl-3 pr-5 py-2.5 rounded-full shadow-sm">
             <ChevronLeft className="w-4 h-4" /> SEO Registry
           </Link>
           <div className="flex items-center gap-4">
              <Link href={`/guide/${slug}`} target="_blank" className="flex items-center gap-2 bg-white border border-slate-100 text-slate-500 hover:text-slate-900 px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-sm transition-all">
                 <Eye className="w-4 h-4" /> Preview Live
              </Link>
              <button onClick={() => handleSave('published')}
                 disabled={saving}
                 className="flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-50"
              >
                 {saving ? (
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 ) : (
                   <Save className="w-4 h-4" />
                 )}
                 {saving ? 'Updating...' : 'Commit Changes'}
              </button>
           </div>
        </div>
        
        <header className="mb-10">
           <h1 className="text-4xl font-black text-slate-900 tracking-tight">Node Re-Constructor</h1>
           <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-2">Modify Algorithmic Gravity Well</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-xl shadow-slate-200/40 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-50 transition-colors pointer-events-none" />
               <div className="relative z-10 space-y-8">
                  <div className="space-y-4">
                     <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Page Title (H1)..."
                        className="w-full text-3xl font-black text-slate-900 placeholder:text-slate-200 focus:outline-none bg-transparent"
                     />
                     <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest">
                        <span className="text-slate-400">Canonical Path:</span>
                        <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg overflow-hidden focus-within:border-blue-300 transition-colors">
                           <span className="text-slate-400 bg-slate-100 px-3 py-2 border-r border-slate-100">NepaCalc.com/guide/</span>
                           <input
                              value={slug}
                              onChange={e => setSlug(e.target.value)}
                              className="bg-transparent px-3 py-2 outline-none text-slate-700 min-w-[200px]"
                              placeholder="url-slug"
                           />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest ml-2">Meta Excerpt</label>
                     <textarea
                        value={excerpt}
                        onChange={e => setExcerpt(e.target.value)}
                        placeholder="Internal mapping summary..."
                        className="w-full h-24 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-[13px] font-medium text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-inner resize-none custom-scrollbar"
                     />
                  </div>

                  <div>
                     <div className="flex items-center gap-6 border-b border-slate-100 mb-6">
                        {(['write','preview'] as const).map(t => (
                          <button key={t} onClick={() => setTab(t)}
                            className={clsx(
                              "pb-3 text-[12px] font-black uppercase tracking-widest transition-all",
                              tab === t ? "text-blue-600 border-b-2 border-blue-600 shadow-[0_4px_12px_rgba(37,99,235,0.15)]" : "text-slate-400 hover:text-slate-600"
                            )}>
                            {t === 'write' ? 'Source Content' : 'Render Preview'}
                          </button>
                        ))}
                     </div>

                     {tab === 'write' ? (
                        <textarea
                           value={content}
                           onChange={e => setContent(e.target.value)}
                           rows={25}
                           className="w-full h-[600px] p-6 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 outline-none font-mono text-[13px] leading-relaxed text-slate-700 resize-y transition-all shadow-inner custom-scrollbar"
                        />
                     ) : (
                        <div className="w-full h-[600px] p-8 rounded-2xl border border-slate-100 bg-white shadow-inner overflow-y-auto custom-scrollbar">
                           {renderPreview()}
                        </div>
                     )}
                  </div>
               </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-blue-500/5 hover:bg-blue-500/10 transition-colors pointer-events-none" />
               <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white border border-blue-500">
                     <LinkIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[16px] font-black text-white tracking-tight">Internal Nexus Linking</h3>
               </div>
               <div className="relative z-10 space-y-6">
                  {Object.entries(CALC_GROUPS).map(([group, slugs]) => (
                    <div key={group}>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">{group}</div>
                      <div className="flex flex-wrap gap-2">
                        {slugs.map(s => {
                          const selected = relatedCalcs.includes(s);
                          const calc = CALCULATORS.find(c => c.slug === s);
                          return (
                            <button key={s} onClick={() => toggleCalc(s)}
                              className={clsx(
                                "px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all",
                                selected ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20" : "bg-white/5 text-slate-400 border border-white/10 hover:border-white/30"
                              )}>
                              {calc?.name || s}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
               </div>
            </div>
            
            <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-xl shadow-slate-200/40">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                     <ImageIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[16px] font-black text-slate-900 tracking-tight">Structured Data & Media</h3>
               </div>
               
               <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest ml-2">Schema Origin</label>
                        <select value={schemaType} onChange={e => setSchemaType(e.target.value)}
                           className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-[13px] font-bold text-slate-900 focus:outline-none focus:border-orange-300 appearance-none shadow-inner">
                           {SCHEMA_TYPES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest ml-2">OpenGraph Meta Image</label>
                        <input type="url" value={ogImage} onChange={e => setOgImage(e.target.value)} placeholder="https://..."
                           className="w-full bg-slate-50 border border-slate-100 rounded-xl px-5 py-3 text-[13px] font-bold text-slate-800 focus:outline-none transition-all shadow-inner" />
                     </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                     <h4 className="text-[12px] font-black text-slate-900 uppercase tracking-widest mb-4">Multi-Media SEO Slots</h4>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                           <label className="block text-[9px] font-black text-orange-500 uppercase tracking-widest mb-2 ml-2">Feature (Top)</label>
                           <input type="url" value={imageTop} onChange={e => setImageTop(e.target.value)} placeholder="URL..."
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[12px] font-bold focus:border-orange-400 outline-none" />
                        </div>
                        <div>
                           <label className="block text-[9px] font-black text-orange-500 uppercase tracking-widest mb-2 ml-2">Context (Middle)</label>
                           <input type="url" value={imageMiddle} onChange={e => setImageMiddle(e.target.value)} placeholder="URL..."
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[12px] font-bold focus:border-orange-400 outline-none" />
                        </div>
                        <div>
                           <label className="block text-[9px] font-black text-orange-500 uppercase tracking-widest mb-2 ml-2">Summary (Bottom)</label>
                           <input type="url" value={imageBottom} onChange={e => setImageBottom(e.target.value)} placeholder="URL..."
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[12px] font-bold focus:border-orange-400 outline-none" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="lg:sticky lg:top-8 space-y-8">
              <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40">
                 <div className="flex items-center gap-3 mb-6">
                    <Settings className="w-4 h-4 text-slate-400" />
                    <h3 className="text-[13px] font-black text-slate-900 uppercase tracking-widest">Primary Descriptors</h3>
                 </div>
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Focus Keyword</label>
                       <input type="text" value={focusKw} onChange={e => setFocusKw(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[13px] font-bold focus:outline-none transition-all shadow-inner" />
                    </div>
                    <div className="space-y-2">
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">SERP Title</label>
                       <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[13px] font-bold focus:outline-none transition-all shadow-inner" />
                    </div>
                    <div className="space-y-2">
                       <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">SERP Description</label>
                       <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} rows={3}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[12px] font-medium resize-none focus:outline-none transition-all shadow-inner" />
                    </div>
                 </div>
              </div>
              <div className="bg-slate-50 rounded-[2.5rem] p-4 border border-slate-100">
                 <SEOScorePanel title={title} metaTitle={metaTitle} metaDesc={metaDesc} focusKeyword={focusKw} content={content} slug={slug} excerpt={excerpt} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function EditSEOPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans tracking-widest uppercase font-black text-slate-400 text-[10px] animate-pulse">Mounting Constructor...</div>}>
      <EditSEOPageInner />
    </Suspense>
  );
}
