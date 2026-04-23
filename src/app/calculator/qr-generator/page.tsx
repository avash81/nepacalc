import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "QR Code Generator | Create Free Custom QR Codes Online Nepal NepaCal",
  description: "Generate free, permanent QR codes for URLs, text, and contact information instantly. High-resolution QR maker for businesses and individuals in Nepal.",
  slug: 'qr-generator',
  keywords: ["qr code generator nepal", "create qr code free", "qr maker online", "permanent qr code", "custom qr code generator", "business qr code nepal"],
});

const QR_FAQS = [
  {
    question: "What is a QR Code and how does it work?",
    answer: "A Quick Response (QR) code is a 2D barcode that stores data (like URLs, text, or Wi-Fi info) in a grid of black squares on a white background, readable by smartphone cameras."
  },
  {
    question: "Are QR codes permanent?",
    answer: "Static QR codes (like the ones generated here) are permanent and never expire. However, the data they point to (e.g., a website URL) must remain active for the code to work."
  },
  {
    question: "How much data can a QR code hold?",
    answer: "A standard QR code can hold up to 7,089 numeric characters or 4,296 alphanumeric characters, though simpler codes are easier for cameras to scan quickly."
  },
  {
    question: "Is this QR generator free to use in Nepal?",
    answer: "Yes, our QR generator is 100% free with no subscriptions or hidden watermarks, making it ideal for local businesses and personal use."
  },
  {
    question: "Can I use QR codes for Fonepay or payments?",
    answer: "While this tool generates standard data codes, official payment QRs in Nepal (like Fonepay) require specific encryption and bank integration. Use this for links, contact info, and text."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="QR Encoding Engine"
        description="High-resolution generator for creating static two-dimensional barcodes for instant data sharing and mobile accessibility."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'QR Generator' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Password Generator', slug: 'password-generator' },
          { name: 'Word Counter', slug: 'word-counter' },
          { name: 'Unit Converter', slug: 'unit-converter' }
        ]}
        formula="ISO/IEC 18004 Standard Encoding"
      >
        <Calculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-slate-900 text-white px-6 py-3 rounded-2xl inline-block shadow-lg">
              Utility Guide: QR Code Technology
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                QR codes are the <strong>bridge between physical and digital worlds</strong>, allowing for seamless information transfer without manual typing.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Digital Encoding Laboratory</strong> allows users in Nepal to create high-quality, high-resolution QR codes instantly. From small business owners wanting to share their website on a physical menu to students sharing contact info, our generator creates <strong>permanent, static codes</strong> that work with every modern smartphone camera without any expiration or hidden costs.
              </p>
            </div>

            <PillarFAQ faqs={QR_FAQS} title="QR Codes & Data Sharing FAQ" />
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
