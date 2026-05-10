'use client';
import { useState, useMemo } from 'react';
import { ModernCalcLayout } from '@/components/layout/ModernCalcLayout';
import Image from 'next/image';
import { Download, QrCode } from 'lucide-react';

export default function QRGenerator() {
  const [text, setText] = useState('https://NepaCalc.com');
  const [size, setSize] = useState(300);

  const qrUrl = useMemo(
    () => `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`,
    [text, size]
  );

  return (
    <ModernCalcLayout hideH1={false}
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
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${size===s ? 'bg-[#1a73e8] text-[#202124] shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent'}`}>
                  {s}px
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Useful Presets</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Website URL',   val: 'https://NepaCalc.com' },
                { label: 'Phone Number',  val: 'tel:+9779800000000' },
                { label: 'Email Link',    val: 'mailto:contact@NepaCalc.com' },
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
            className="w-full py-4 bg-[#1a73e8] text-[#202124] rounded-xl font-bold hover:bg-blue-700 hover:shadow-sm transition-all flex items-center justify-center gap-2">
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
          { label: 'Password Generator', href: '/calculator/password-generator/' },
          { label: 'Word Counter', href: '/calculator/word-counter/' },
          { label: "BMI Calculator", href: "/calculator/bmi/" },
          { label: "Percentage Calc", href: "/calculator/percentage/" },
          { label: "Gratuity Calc", href: "/calculator/gratuity-calculator/" }
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
      details={
        <div className="space-y-8">
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-black text-[#202124] mb-4">QR Code Technology: How 2D Matrix Barcodes Work</h2>
            <div className="space-y-4 text-sm text-[#5F6368] leading-relaxed">
              <p>A QR (Quick Response) code is a two-dimensional matrix barcode invented by Denso Wave (Japan) in 1994 for automotive parts tracking. Unlike linear barcodes that encode data in one horizontal dimension, QR codes encode data in both dimensions using a grid of black and white squares, enabling storage of up to 4,296 alphanumeric characters or 7,089 numeric characters in a single compact image. Our <strong className="text-[#202124]">QR code generator</strong> creates static, permanent codes using the QR Code Version 1-40 standard.</p>
              <p>All codes generated here are <strong className="text-[#202124]">static QR codes</strong>, the destination data is hard-encoded directly into the pattern of the squares. This means no server is involved after generation, the code works indefinitely without any subscription, and your data never leaves your browser.</p>
            </div>
          </div>
          <div className="bg-white border border-[#DADCE0] rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-4 border-b border-[#F1F3F4] pb-2">Static vs. Dynamic QR Codes</h3>
            <ul className="space-y-3 text-sm text-[#5F6368] list-disc pl-5">
              <li><strong className="text-[#1A73E8]">Static QR Codes (This Tool):</strong> The URL or text is directly encoded into the pixel pattern. Free, permanent, zero maintenance. Downside: cannot be edited after printing, a typo requires regenerating and reprinting.</li>
              <li><strong className="text-[#188038]">Dynamic QR Codes:</strong> Encode a short redirect URL. The actual destination can be changed after printing via a dashboard. Supports scan tracking/analytics. Typically requires a paid subscription ($5–$30/month).</li>
              <li><strong className="text-[#D93025]">Error Correction:</strong> QR codes include Reed-Solomon error correction, allowing them to remain scannable even when up to 30% of the pattern is damaged, covered by a logo, or torn.</li>
            </ul>
          </div>
        </div>
      }
      faqs={[
        {
          question: "Do these QR codes expire?",
          answer: "No. Static QR codes generated here are permanent. The data is encoded directly into the pixel pattern of the image, not through a redirect server. As long as the underlying URL exists, the QR code will work forever."
        },
        {
          question: "Can I track how many times my QR code is scanned?",
          answer: "Static QR codes do not support scan tracking. To track scans, add UTM parameters to your URL before generating (e.g., ?utm_source=qr&utm_medium=print) and monitor traffic in Google Analytics. For full scan count tracking, use a dynamic QR code service."
        },
        {
          question: "What size should I export for print quality?",
          answer: "For business cards, a minimum of 250×250 pixels is sufficient. For A4 flyers, use 400×400 pixels or higher. For banners and large-format print (scanning from 3+ meters away), use 600×600 pixels at minimum. A good rule: 1 inch of print size requires at least 150px of QR image size."
        },
        {
          question: "What types of data can I encode in a QR code?",
          answer: "This generator supports any text string including: website URLs (https://), phone numbers (tel:+977...), email links (mailto:), WiFi credentials (WIFI:T:WPA;S:SSID;P:password;;), geographic coordinates (geo:lat,lng), and plain text. Each format uses standard URI schemes recognized by mobile cameras."
        },
        {
          question: "Can I put a logo in the center of the QR code?",
          answer: "Yes, because QR codes have built-in error correction (up to 30% of the pattern can be obscured). You can overlay a logo over the center of the QR image after downloading, provided it doesn't cover more than ~25-30% of the total code area. Always test that the final code scans correctly."
        },
        {
          question: "Why does my QR code not scan from the screen?",
          answer: "Common reasons: (1) Screen glare or reflection interfering with the camera. (2) The code is too small on screen, increase the export size to 350px+. (3) The content box is empty. (4) Browser camera permissions blocked. Try darkening the screen brightness slightly and ensuring adequate contrast."
        }
      ]}
    />
  );
}


