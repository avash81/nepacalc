import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About NEPACALC | Precision Mathematical Laboratory',
  description: 'NEPACALC is Nepal&apos;s premier destination for high-precision financial, tax, health, and engineering calculators. Built for accuracy, No Ads, 100% Free.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        
        <header className="mb-10 text-center">
           <Link href="/" className="inline-block text-[10px] font-black text-[#1A73E8] uppercase tracking-widest mb-4 px-3 py-1 bg-blue-50 rounded-full">Explore Tools →</Link>
           <h1 className="text-[20px] sm:text-[32px] font-black text-gray-900 tracking-tight mb-4">
             Precision Meets <span className="text-[#1A73E8]">Trust.</span>
           </h1>
           <p className="text-[14px] text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
             We build advanced tools that empower Nepalese people to make smarter decisions, every single day.
           </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
           <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900 leading-tight">Empowering 30 Million <br/> Minds in Nepal.</h2>
              <p className="text-gray-600 leading-relaxed">
                 Calculating Income Tax, EMI, or even BMI shouldn&apos;t involve complex spreadsheets or ad-filled websites. NEPACALC was founded with a single mission: to provide the most accurate, secure, and user-friendly calculation ecosystem for the Nepalese people.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                 <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-2xl">
                    <ShieldCheck className="w-5 h-5 text-[#1A73E8]" />
                    <span className="text-xs font-black text-blue-900 uppercase">Privacy First</span>
                 </div>
                 <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-2xl">
                    <Target className="w-5 h-5 text-green-600" />
                    <span className="text-xs font-black text-green-900 uppercase">100% Accurate</span>
                 </div>
              </div>
           </div>
           <div className="bg-gray-50 rounded-[2rem] p-8 flex flex-col justify-center border border-gray-100">
              <div className="text-3xl font-black text-gray-900 mb-1">75+</div>
              <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Specialized Tools</div>
              <p className="text-xs text-gray-500 leading-relaxed italic">
                 "Our goal is to make precision accessible, helping users from Kathmandu to Kanchanpur solve their numeric problems in seconds."
              </p>
           </div>
        </section>

        <div className="bg-gray-900 rounded-[1.5rem] p-8 text-white shadow-2xl">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-2">
                 <h2 className="text-xl font-black">Join our mission.</h2>
                 <p className="text-gray-400 text-sm font-medium">We are always looking for feedback to improve our tools.</p>
              </div>
              <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black tracking-widest px-8 py-4 rounded-xl shadow-xl shadow-blue-500/20 transition-all">
                CONTACT US
              </Link>
           </div>
        </div>

      </div>
    </div>
  );
}
