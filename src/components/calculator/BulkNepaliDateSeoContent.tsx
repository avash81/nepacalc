import Link from 'next/link';

export function BulkNepaliDateSeoContent() {
  return (
    <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-[#DADCE0]">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 relative">
        {/* Mobile TOC (Dropdown) */}
        <div className="lg:hidden w-full mb-6">
          <details className="group border border-[#DADCE0] rounded-lg bg-[#F8F9FA] overflow-hidden">
            <summary className="flex items-center justify-between p-4 cursor-pointer font-bold text-[#202124] list-none">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1A73E8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
                Table of Contents
              </span>
              <span className="transition group-open:rotate-180">
                <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
              </span>
            </summary>
            <div className="p-4 pt-0 border-t border-[#DADCE0] bg-white">
              <ul className="space-y-3 text-[15px]">
                <li><a href="#bulk-converter-intro" className="text-[#1A73E8] hover:underline font-medium">Bulk Converter Intro</a></li>
                <li><a href="#how-it-works" className="text-[#1A73E8] hover:underline font-medium">How it Works</a></li>
                <li><a href="#why-not-fixed" className="text-[#1A73E8] hover:underline font-medium">Not a Fixed Offset</a></li>
                <li><a href="#official-reference" className="text-[#1A73E8] hover:underline font-medium">Official Reference</a></li>
                <li><a href="#passport-applications" className="text-[#1A73E8] hover:underline font-medium">Passport Applications</a></li>
                <li><a href="#when-to-use" className="text-[#1A73E8] hover:underline font-medium">When to Use</a></li>
                <li><a href="#related-tools" className="text-[#1A73E8] hover:underline font-medium">Related Tools</a></li>
              </ul>
            </div>
          </details>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 max-w-none text-[#3C4043] leading-relaxed space-y-6">
          <div>
            <h2 id="bulk-converter-intro" className="text-2xl font-black text-[#202124] mb-4 pb-2 border-b border-[#F1F3F4] scroll-mt-24">Bulk Nepali Date Converter BS to AD & AD to BS</h2>
            
            <p className="mb-4">
              The Bulk Nepali Date Converter makes it easy to convert multiple dates between Bikram Sambat (BS) and the Gregorian calendar (AD) in one go. Instead of using the <Link href="/calculator/nepali-date/" className="text-[#1A73E8] hover:underline font-medium">Nepali date converter</Link> one date at a time, you can process a list of dates together, making the tool useful for spreadsheets, records, forms, historical data, and other situations where many Nepali dates need to be converted.
            </p>
            
            <p className="mb-4">
              Bikram Sambat dates are widely used in Nepal, while Gregorian dates are commonly required for international, digital, and administrative purposes. Because BS and AD do not follow a simple fixed offset, accurate conversion requires calendar data for the relevant year rather than simply adding or subtracting a fixed number of years.
            </p>
          </div>

          <div>
            <h3 id="how-it-works" className="text-[19px] font-bold text-[#202124] mt-8 mb-4 scroll-mt-24">How the Bulk Nepali Date Converter Works</h3>
            <p className="mb-4">Use the converter to process multiple dates between BS and AD:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Select the conversion direction: BS to AD or AD to BS.</li>
              <li>Enter your dates using the format supported by the converter.</li>
              <li>Add multiple dates when you need to process a list.</li>
              <li>Start the conversion.</li>
              <li>Review, copy, or use the converted results in your records or spreadsheet.</li>
            </ul>
            <p className="mb-4">
              For official documents, always compare the converted result with your original document and follow the requirements of the relevant authority.
            </p>
          </div>

          <div>
            <h3 id="why-not-fixed" className="text-[19px] font-bold text-[#202124] mt-8 mb-4 scroll-mt-24">Why BS to AD Conversion Is Not a Fixed Offset</h3>
            <p className="mb-4">
              A common mistake is assuming that a Bikram Sambat date can always be converted to AD by subtracting exactly 56 or 57 years. That is not sufficient for an accurate date conversion.
            </p>
            <p className="mb-4">
              Nepali calendar months do not have the same fixed lengths as Gregorian months, and the relationship between BS and AD changes throughout the calendar year. A reliable converter therefore needs year-specific calendar information to determine the corresponding date. If you also need to find the number of days between two converted dates, use the <Link href="/calculator/date-duration/" className="text-[#1A73E8] hover:underline font-medium">date duration calculator</Link>.
            </p>
            <p className="mb-4">
              This is especially important when converting dates of birth or other dates appearing on official documents.
            </p>
          </div>

          <div>
            <h3 id="official-reference" className="text-[19px] font-bold text-[#202124] mt-8 mb-4 scroll-mt-24">Nepal's Official Calendar Reference</h3>
            <p className="mb-4">
              For calendar-related information, one important government reference is the Nepal Panchanga Nirnayak Development Committee (नेपाल पञ्चाङ्ग निर्णायक विकास समिति). The committee is a Government of Nepal organization under the Ministry of Culture, Tourism and Civil Aviation. Its official website publishes information and notices concerning Panchanga and calendar publication and approval.
            </p>
            <p className="mb-4">
              For example, the committee has published notices concerning the publication of the 2083 BS Panchanga, including requirements and the calculation system to be followed for Panchanga submitted for approval.
            </p>
            <p className="mb-4">
              Official reference: <a href="https://npns.gov.np/" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline font-medium">Nepal Panchanga Nirnayak Development Committee</a>
            </p>
          </div>

          <div>
            <h3 id="passport-applications" className="text-[19px] font-bold text-[#202124] mt-8 mb-4 scroll-mt-24">BS and AD Dates for Passport Applications</h3>
            <p className="mb-4">
              Accurate BS to AD date conversion can be particularly important when completing government applications.
            </p>
            <p className="mb-4">
              The Department of Passports, Government of Nepal, states in its passport application instructions that the date of birth from a citizenship certificate or Minor ID should be entered in the BS field, while the same date should be converted to the A.D. (Gregorian) calendar for the AD field.
            </p>
            <p className="mb-4">
              This makes BS to AD conversion useful when checking dates before completing passport-related forms.
            </p>
            <p className="mb-4">
              Official reference: <a href="https://nepalpassport.gov.np/" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline font-medium">Department of Passports, Nepal</a>
            </p>
            <p className="mt-4 mb-4">
              For additional information about birth registration and civil-registration services, you can also refer to the Department of National ID and Civil Registration, Government of Nepal. The department publishes official notices and registration instructions relating to personal events such as birth registration.
            </p>
            <p className="mb-4">
              Official reference: <a href="https://donidcr.gov.np/" target="_blank" rel="noopener noreferrer" className="text-[#1A73E8] hover:underline font-medium">Department of National ID and Civil Registration</a>
            </p>
          </div>

          <div>
            <h3 id="when-to-use" className="text-[19px] font-bold text-[#202124] mt-8 mb-4 scroll-mt-24">When You May Need a Nepali Date Converter</h3>
            <p className="mb-4">BS to AD conversion can be useful for:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Citizenship and identity documents</li>
              <li>Passport applications</li>
              <li>Birth and civil-registration records</li>
              <li>School and university records</li>
              <li>Employment records</li>
              <li>Historical documents</li>
              <li>International applications</li>
              <li>Spreadsheets and databases containing Nepali dates</li>
              <li>Converting a large list of dates at once</li>
            </ul>
            <p className="mb-4">
              If a converted date will be used for a legal or government purpose, verify the result against your original document and the instructions provided by the relevant authority.
            </p>
          </div>

          <div>
            <h3 id="related-tools" className="text-[19px] font-bold text-[#202124] mt-8 mb-4 scroll-mt-24">Related NepaCalc Calculators</h3>
            <p className="mb-4">If you are working with Nepali dates, these related tools may also be useful:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><Link href="/calculator/age-calculator/" className="text-[#1A73E8] hover:underline font-medium">Age Calculator</Link> Calculate age from a date of birth.</li>
              <li><Link href="/calculator/nepal-citizenship-age/" className="text-[#1A73E8] hover:underline font-medium">Nepal Citizenship Age Calculator</Link> Check age-related citizenship requirements.</li>
              <li><Link href="/calculator/workdays/" className="text-[#1A73E8] hover:underline font-medium">Workdays Calculator</Link> Count business days between two dates.</li>
            </ul>
            <p className="mb-4">
              You can also explore other <Link href="/nepal/" className="text-[#1A73E8] hover:underline font-medium">Nepal-specific calculators</Link> and conversion tools available on NepaCalc.
            </p>
          </div>

          <div className="bg-[#E8F0FE] border border-[#1A73E8] rounded-xl p-6 mt-12 mb-8">
            <h3 className="text-[14px] font-black text-[#1A73E8] uppercase tracking-wider mb-2">Important Accuracy Note</h3>
            <p className="text-sm text-[#1f3f8f] leading-relaxed mb-4">
              NepaCalc is an independent calculator and is not affiliated with or endorsed by the Government of Nepal. Official government websites should be used for current application requirements, regulations, and official notices.
            </p>
            <p className="text-sm text-[#1f3f8f] leading-relaxed">
              For important documents such as passports, citizenship records, immigration applications, or other official submissions, use the original document as your primary reference and verify the converted date before submitting an application.
            </p>
          </div>
        </div>

        {/* Desktop TOC (Sticky Sidebar) */}
        <div className="hidden lg:block w-52 flex-shrink-0">
          <div className="sticky top-24 bg-[#F8F9FA] rounded-xl border border-[#DADCE0] p-6 shadow-sm">
            <h4 className="text-[13px] font-black text-[#5F6368] uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/></svg>
              Table of Contents
            </h4>
            <nav>
              <ul className="space-y-3 text-[14px]">
                <li><a href="#bulk-converter-intro" className="text-[#3C4043] hover:text-[#1A73E8] hover:underline font-medium transition-colors">Bulk Converter Intro</a></li>
                <li><a href="#how-it-works" className="text-[#3C4043] hover:text-[#1A73E8] hover:underline font-medium transition-colors">How it Works</a></li>
                <li><a href="#why-not-fixed" className="text-[#3C4043] hover:text-[#1A73E8] hover:underline font-medium transition-colors">Not a Fixed Offset</a></li>
                <li><a href="#official-reference" className="text-[#3C4043] hover:text-[#1A73E8] hover:underline font-medium transition-colors">Official Reference</a></li>
                <li><a href="#passport-applications" className="text-[#3C4043] hover:text-[#1A73E8] hover:underline font-medium transition-colors">Passport Applications</a></li>
                <li><a href="#when-to-use" className="text-[#3C4043] hover:text-[#1A73E8] hover:underline font-medium transition-colors">When to Use</a></li>
                <li><a href="#related-tools" className="text-[#3C4043] hover:text-[#1A73E8] hover:underline font-medium transition-colors">Related Tools</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
