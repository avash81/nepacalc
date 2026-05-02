import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Zap, ShieldCheck, Mail, Github, Linkedin, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: "About NepaCal — Nepal's Free Calculator Platform",
  description: "NepaCal is a free calculator platform built by Avash Chaudhary in Kathmandu for Nepal. 100+ tools for tax, finance, health, engineering, and more.",
  alternates: {
    canonical: 'https://nepacalc.com/about/',
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#FDFDFD] min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">
            About NepaCal
          </h1>
          <p className="text-base text-gray-500 font-medium max-w-2xl mx-auto">
            Nepal's most comprehensive free calculator platform. Built for precision, designed for accessibility.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        
        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Why NepaCal Exists</h2>
          <div className="prose prose-sm md:prose-base prose-blue max-w-none text-gray-600 space-y-3">
            <p className="font-medium text-gray-800">I built NepaCal because I was frustrated.</p>
            <p>
              Every time I needed to calculate something Nepal-specific like my income tax, vehicle tax, KUKL water bill, or blue book renewal cost I either had to dig through government PDFs or use generic calculators that had no idea what a Ropani or an SSF contribution was.
            </p>
            <p>
              The tools I wished existed didn't exist, so I built them. Today, NepaCal is a free online platform designed strictly for Nepali users, using Nepali units, Bikram Sambat dates, IRD guidelines, and NPR amounts.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Data Sources & Verification</h2>
          <div className="text-sm md:text-base text-gray-600 space-y-3">
            <p>To ensure 100% accuracy, we cross-reference our tools with official government sources including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Tax & Finance:</strong> Inland Revenue Department (IRD) Nepal and Social Security Fund (SSF).</li>
              <li><strong>Banking:</strong> Nepal Rastra Bank (NRB) for base rates and exchange rates.</li>
              <li><strong>Utilities:</strong> Nepal Electricity Authority (NEA) and Kathmandu Upatyaka Khanepani Limited (KUKL).</li>
              <li><strong>Market Rates:</strong> Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA).</li>
            </ul>
            <div className="bg-green-50 text-green-800 p-3 rounded-lg text-sm mt-3 border border-green-100 font-medium">
              <strong>Verification Process:</strong> Last verified against the FY 2081/82 Finance Bill on Shrawan 1, 2081. Our algorithms undergo manual audits to guarantee exact mathematical alignment with the Inland Revenue Department's official formulas.
            </div>
          </div>
        </section>

        <section className="bg-blue-50 rounded-xl p-5 md:p-6 shadow-sm border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">Suggestion & Correction Box</h2>
          </div>
          <div className="text-sm text-gray-700 space-y-2">
            <p>We strive for complete accuracy, but Nepal's regulations change fast. If you spot a mistake, a bug, or want a new calculator added, we want to hear from you.</p>
            <p><strong>Spotted an error?</strong> Tell us which calculator and what the correct rate should be.</p>
            <p><strong>Request a tool:</strong> Is there a specific Nepal-related calculation you do manually every month?</p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <a href="mailto:admin@nepacalc.com" className="bg-white border border-gray-200 text-gray-800 font-bold py-1.5 px-4 rounded-lg text-center hover:bg-gray-50 transition-colors">
                admin@nepacalc.com
              </a>
              <Link href="/contact" className="bg-blue-600 text-white font-bold py-1.5 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors">
                Direct Form
              </Link>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">Our Core Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center">
              <Target className="w-6 h-6 text-blue-600 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-gray-900 mb-1">100% Accuracy</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                We update financial and tax tools every Shrawan 1, aligning with the latest Nepal Government Finance Acts.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center">
              <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-gray-900 mb-1">Lightning Fast</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Optimized for mobile networks. Loads in under 2 seconds.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-center">
              <ShieldCheck className="w-6 h-6 text-green-500 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-gray-900 mb-1">Absolute Privacy</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Calculations are performed client-side. We don't store your salary or health metrics.
              </p>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-[11px] text-gray-500 max-w-2xl mx-auto italic">
              <strong>Accessibility Statement:</strong> NepaCal is designed to be lightweight (under 100KB initial load) to ensure users on 3G and 4G networks in rural Nepal can access financial tools without delay.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Growth Roadmap: What's Coming Next</h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded w-16 text-center shrink-0">Q3 2026</div>
              <p className="text-sm text-gray-600">Integration of live Nepal Rastra Bank (NRB) Exchange Rate APIs for real-time currency conversion directly within existing tools.</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-gray-100 text-gray-800 text-xs font-bold px-2 py-1 rounded w-16 text-center shrink-0">Q4 2026</div>
              <p className="text-sm text-gray-600">Advanced Property Tax calculators tailored for specific municipality and provincial rates across all 7 provinces.</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Explore Our Top Calculators</h2>
          <p className="text-sm text-gray-600 mb-4">Start calculating with some of our most popular tools designed specifically for Nepal:</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/calculator/income-tax" className="bg-gray-50 border border-gray-200 text-blue-600 text-xs font-bold py-1.5 px-3 rounded-lg hover:bg-blue-50 transition-colors">Income Tax Calculator</Link>
            <Link href="/calculator/vehicle-tax" className="bg-gray-50 border border-gray-200 text-blue-600 text-xs font-bold py-1.5 px-3 rounded-lg hover:bg-blue-50 transition-colors">Vehicle Tax Calculator</Link>
            <Link href="/calculator/nepse-bonus-tax" className="bg-gray-50 border border-gray-200 text-blue-600 text-xs font-bold py-1.5 px-3 rounded-lg hover:bg-blue-50 transition-colors">NEPSE Bonus Tax</Link>
            <Link href="/calculator/emi" className="bg-gray-50 border border-gray-200 text-blue-600 text-xs font-bold py-1.5 px-3 rounded-lg hover:bg-blue-50 transition-colors">EMI Calculator</Link>
            <Link href="/calculator/age" className="bg-gray-50 border border-gray-200 text-blue-600 text-xs font-bold py-1.5 px-3 rounded-lg hover:bg-blue-50 transition-colors">Nepali Age Calculator</Link>
          </div>
        </section>

        <section className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">The Team</h2>
          <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
            <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
              <Image 
                src="/Avash.png" 
                alt="Avash Chaudhary" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 80px, 96px"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base font-black text-gray-900 mb-1">Avash Chaudhary</h3>
              <p className="text-blue-600 font-bold text-[10px] mb-2 uppercase tracking-wider">Founder, Web Developer & SEO Specialist</p>
              
              <div className="text-sm text-gray-600 mb-3 space-y-2">
                <p>
                  I'm Avash, and like many of you, I was tired of using calculators that used 'Dollars' or 'Acres' when I just wanted to know the tax on my salary in Kathmandu. I built NepaCal to speak our language—both in code and in culture.
                </p>
                <p>
                  I am a Software Engineer (NCIT, 2021-2026) based in Kathmandu. My academic research focused on automated data verification systems, expertise which I now apply to ensure the algorithmic accuracy of NepaCal. I manually verify the mathematical logic of the calculators against the Finance Bill (Aarthik Vidheyak) released by the government every year.
                </p>
              </div>

              <div className="flex justify-center sm:justify-start gap-4 mt-2">
                <a href="https://www.linkedin.com/in/avash-chaudhary-6a8479364" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                  <Linkedin className="w-3 h-3" /> LinkedIn
                </a>
                <a href="https://github.com/avash81" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                  <Github className="w-3 h-3" /> GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
