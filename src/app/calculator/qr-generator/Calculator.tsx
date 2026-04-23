'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import Image from 'next/image';
import { Download, QrCode } from 'lucide-react';

export default function QRGenerator() {
  const [text, setText] = useState('https://nepacalc.com');
  const [size, setSize] = useState(300);

  const qrUrl = useMemo(
    () => `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`,
    [text, size]
  );

  return (
    <ModernCalcLayout
      crumbs={[{ label: 'Converters', href: '/converters/' }, { label: 'QR Code Generator' }]}
      title="Free QR Code Generator"
      description="Create custom, static QR codes instantly for URLs, text, phone numbers, or WiFi passwords. Download high-quality PNGs with no signup required."
      icon={QrCode}
      inputs={
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-800">Content (Text, URL, or Data)</label>
            <textarea value={text} onChange={e => setText(e.target.value)}
              className="w-full h-32 p-4 border border-slate-200 rounded-xl bg-slate-50 font-mono text-sm font-medium focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none resize-none transition-all shadow-sm"
              placeholder="https://your-url.com or any text..." />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-800">Export Image Size</label>
              <span className="text-sm font-black text-blue-600 bg-blue-50 px-2 py-1 rounded">{size} × {size} px</span>
            </div>
            <input type="range" min={100} max={600} step={50} value={size} onChange={e => setSize(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
            <div className="grid grid-cols-4 gap-2">
              {[150,250,350,500].map(s => (
                <button key={s} onClick={() => setSize(s)}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${size===s ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent'}`}>
                  {s}px
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Useful Presets</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Website URL',   val: 'https://nepacalc.com' },
                { label: 'Phone Number',  val: 'tel:+9779800000000' },
                { label: 'Email Link',    val: 'mailto:contact@nepacalc.com' },
                { label: 'WiFi Access',   val: 'WIFI:T:WPA;S:MyNetwork;P:mypassword;;' },
              ].map(p => (
                <button key={p.label} onClick={() => setText(p.val)}
                  className="p-3 border border-slate-200 rounded-xl bg-white hover:border-blue-300 hover:shadow-sm text-left transition-all group">
                  <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700">{p.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center shadow-inner relative overflow-hidden">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">Generated Code</div>
            
            <div className="relative p-3 bg-white rounded-xl shadow-md border border-slate-200">
              <div className="relative" style={{ width: Math.min(size, 250), height: Math.min(size, 250) }}>
                <Image src={qrUrl} alt="Generated QR Code" fill className="object-contain" unoptimized referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>

          <a href={qrUrl} download="qrcode.png" target="_blank" rel="noopener noreferrer"
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg transition-all flex items-center justify-center gap-2">
            <Download className="w-5 h-5" /> Download PNG
          </a>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100">
              <div className="p-4 flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Export Resolution</span>
                <span className="text-sm font-black text-slate-800">{size} × {size} pixels</span>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Data Length</span>
                <span className="text-sm font-black text-slate-800">{text.length} characters</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
             <QrCode className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
             <p className="text-xs text-blue-800 leading-relaxed font-medium">
               These QR codes are static, meaning they do not expire and the destination cannot be changed once generated. They work permanently without any subscription.
             </p>
          </div>
        </div>
      }
      sidebar={{
        title: "Digital Utilities",
        links: [
          { label: 'Password Generator', href: '/calculator/password-generator' },
          { label: 'Word Counter', href: '/calculator/word-counter' },
        ],
      }}
      howToUse={{
        steps: [
          "Type or paste your desired text, URL, or contact information into the content box.",
          "Alternatively, click one of the 'Useful Presets' to automatically format WiFi credentials or phone links.",
          "Adjust the export image size using the slider if you need a higher or lower resolution image.",
          "Test the QR code by scanning the screen with your smartphone's camera app.",
          "Click 'Download PNG' to save the generated image to your device."
        ]
      }}
      faqs={[
        {
          question: "Do these QR codes expire?",
          answer: "No. This tool generates static QR codes. Because the data is encoded directly into the image itself rather than relying on a redirect link, the code will work forever as long as the underlying URL or text remains valid."
        },
        {
          question: "Can I track how many times the QR code is scanned?",
          answer: "Because these are static QR codes that do not pass through a tracking server, scan analytics are not supported. If you are linking to your own website, you can add UTM parameters to the URL before generating the code to track traffic in Google Analytics."
        }
      ]}
      seoContent={
        <div>
          <h2>How QR Codes Work</h2>
          <p>A QR (Quick Response) code is a type of two-dimensional matrix barcode invented in 1994. Unlike traditional barcodes that store information horizontally, QR codes store data both horizontally and vertically. This allows them to hold significantly more information—up to 4,296 alphanumeric characters in a single square.</p>
          
          <h3>Static vs. Dynamic QR Codes</h3>
          <p>It is important to understand the difference between the two main types of QR codes:</p>
          <ul>
            <li><strong>Static QR Codes (Generated Here):</strong> The actual target data (like the URL or text string) is hard-coded directly into the pattern of the squares. They are free, permanent, and do not expire. However, if you make a typo in the URL, you must generate an entirely new code.</li>
            <li><strong>Dynamic QR Codes:</strong> These codes contain a short URL that redirects the user to the actual destination. This allows the creator to change the destination later without reprinting the QR code, and allows for scan tracking. These typically require paid subscriptions from marketing services.</li>
          </ul>
          
          <h3>Best Practices for Printing</h3>
          <p>When generating a QR code for physical print (like flyers, menus, or business cards), ensure you export it at a high enough resolution (at least 300x300 px). Maintain a high contrast ratio—always print dark codes on light backgrounds. Furthermore, ensure there is an adequate "quiet zone" (blank space) around the edges of the QR code so scanners can easily identify its borders.</p>
        </div>
      }
    />
  );
}
