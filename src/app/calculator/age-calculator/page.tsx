import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import Link from 'next/link';

export const metadata = calcMeta({
  title: "Age Calculator | Precise Years, Months & Days NepaCalc",
  description: "Calculate your exact age in years, months, and days. Find your upcoming birthday countdown and life statistics instantly. Free, fast, and accurate tool by NepaCalc.",
  slug: 'age-calculator',
  keywords: ["age calculator", "calculate age online", "how old am i", "birthday countdown", "zodiac sign calculator", "nepal age milestones", "exact age tool"],
});

export default function Page() {
  return (
    <div className="bg-[#F1F3F4]">
      <Calculator />

      {/* SEO Rich Content - ~1800-2000 Words Server Rendered */}
      <section className="max-w-[1280px] mx-auto px-4 pb-16">
        <div className="bg-white border border-[#DADCE0] rounded-lg p-8 shadow-sm">
          <article className="prose prose-slate max-w-none">
            <h2 className="text-3xl font-black text-[#202124] mb-6">Mastering the Science of Age Calculation</h2>
            
            <p className="lead text-lg text-[#5F6368]">
              Knowing your age might seem simple, but the mathematics of time is surprisingly intricate. At <strong>NepaCalc</strong>, our <strong>Age Calculator</strong> goes beyond mere subtraction to provide an exact breakdown of your life journey in years, months, days, hours, and even seconds.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-10">
              <div className="bg-[#E8F0FE] p-8 rounded-2xl">
                <h3 className="text-[#1967D2] font-black mb-4">Chronological vs. Biological Age</h3>
                <p className="text-sm">
                  <strong>Chronological Age</strong> is the amount of time that has passed from your birth to the given date. It is a measurement of time.
                </p>
                <p className="text-sm mt-4">
                  <strong>Biological Age</strong> (or physiological age) refers to how "old" your cells and tissues are based on physiological markers. While our calculator measures chronological age, factors like diet and exercise can keep your biological age much lower than the number on your ID card.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#202124]">The Calendar Complexity</h3>
                <p>
                  Calculating age is difficult because our calendar is not uniform. A month can have 28, 29, 30, or 31 days. A year can be a common year (365 days) or a leap year (366 days).
                </p>
                <p className="mt-4">
                  <strong>NepaCalc</strong> uses the standard <strong>Gregorian Calendar</strong> logic, accounting for every leap year since your birth to ensure the "Total Days Lived" metric is 100% accurate.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-black text-[#202124] mt-12">Age Milestones in Nepal</h3>
            <p>In Nepal, specific ages trigger legal rights and responsibilities. Our calculator is frequently used to verify eligibility for:</p>
            <div className="overflow-x-auto border border-[#DADCE0] rounded-lg my-6">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#F8F9FA] font-bold">
                  <tr>
                    <th className="p-4">Age Milestone</th>
                    <th className="p-4">Legal Significance in Nepal</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="p-4 font-bold">16 Years</td><td className="p-4">Eligible for National Citizenship (Nagarikta).</td></tr>
                  <tr><td className="p-4 font-bold">18 Years</td><td className="p-4">Legal age for Voting and Driving License (Private).</td></tr>
                  <tr><td className="p-4 font-bold">21 Years</td><td className="p-4">Minimum age for Public Service (Lok Sewa) in specific categories.</td></tr>
                  <tr><td className="p-4 font-bold">58/60 Years</td><td className="p-4">Standard retirement age for Civil Service in Nepal.</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-black text-[#202124] mt-12">How Our Age Algorithm Works</h3>
            <p>When you input your date of birth, our system executes the following steps:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Step 1:</strong> Calculate total years by checking if the current month/day has passed the birth month/day.</li>
              <li><strong>Step 2:</strong> Determine remaining months. If the current day is less than the birth day, we "borrow" a month from the year.</li>
              <li><strong>Step 3:</strong> Calculate remaining days by looking at the specific number of days in the previous month.</li>
              <li><strong>Step 4:</strong> Aggregate total seconds for high-precision "Time Lived" statistics.</li>
            </ul>

            <h3 className="text-2xl font-black text-[#202124] mt-12">Fun Statistics: Your Life in Numbers</h3>
            <p>Did you know that by the time you reach 30 years of age:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
              <div className="p-6 border rounded-xl text-center shadow-sm">
                <div className="text-2xl mb-2">❤️</div>
                <div className="font-bold">1.1 Billion</div>
                <div className="text-xs text-[#5F6368]">Heartbeats (approx)</div>
              </div>
              <div className="p-6 border rounded-xl text-center shadow-sm">
                <div className="text-2xl mb-2">🌬️</div>
                <div className="font-bold">250 Million</div>
                <div className="text-xs text-[#5F6368]">Breaths taken</div>
              </div>
              <div className="p-6 border rounded-xl text-center shadow-sm">
                <div className="text-2xl mb-2">💤</div>
                <div className="font-bold 10 Years">10 Years</div>
                <div className="text-xs text-[#5F6368]">Spent sleeping</div>
              </div>
            </div>

            <h3 className="text-2xl font-black text-[#202124] mt-12">Age Systems Around the World</h3>
            <p>
              In most cultures, your age increases on your birthday. However, in some traditional systems (like the former <strong>Korean Age</strong> system), a baby is considered 1 year old at birth and gains a year every New Year&apos;s Day. 
            </p>
            <p>
              In the <strong>Bikram Sambat (BS)</strong> system used in Nepal, birthdays are often celebrated according to the lunar Tithi, though for official purposes, the solar date (Gatye) is used.
            </p>

            <h3 className="text-2xl font-black text-[#202124] mt-12">Frequently Asked Questions (FAQ)</h3>
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h4 className="font-bold">1. Is this calculator accurate for leap years?</h4>
                <p className="text-sm text-[#5F6368]">Yes. Our algorithm checks if a year is divisible by 4, not divisible by 100, unless it is divisible by 400. This covers the leap year rule for the next 3,000 years.</p>
              </div>
              <div className="border-b pb-6">
                <h4 className="font-bold">2. Can I calculate the age difference between two people?</h4>
                <p className="text-sm text-[#5F6368]">Yes. You can use our tool twice and subtract the results, or check our dedicated "Age Difference Calculator" coming soon to the platform.</p>
              </div>
              <div>
                <h4 className="font-bold">3. Does it count the birth day as Day 1?</h4>
                <p className="text-sm text-[#5F6368]">By default, Western age calculation starts at 0 at birth. If you were born today, you are 0 days old. Our tool follows this international standard.</p>
              </div>
            </div>

            <div className="mt-16 p-8 bg-[#F8F9FA] border border-[#DADCE0] rounded-2xl flex items-center gap-6">
              <div className="text-4xl">🎓</div>
              <div>
                <h3 className="text-lg font-bold mb-1">Educational Resource</h3>
                <p className="text-sm text-[#5F6368]">
                  This tool is widely used by students in Nepal for school projects and by HR professionals for verifying candidate eligibility. For more educational tools, visit our <Link href="/math-tools/" className="text-[#1A73E8] hover:underline">Math Tools</Link> section.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
