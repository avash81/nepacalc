import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Disclaimer | NepaCalc",
  description: "Important disclaimer regarding the use of NepaCalc's calculators, financial tools, and market information.",
  alternates: {
    canonical: 'https://nepacalc.com/disclaimer/',
  },
  robots: { index: false, follow: true },
};

export default function DisclaimerPage() {
  return (
    <div className="bg-[#FDFDFD] min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Disclaimer</h1>
          <p className="text-sm md:text-base text-gray-500 font-medium">
            <strong>Effective Date:</strong> July 19, 2026 | <strong>Last Updated:</strong> July 19, 2026
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 md:p-10 shadow-sm border border-gray-100 prose prose-sm md:prose-base max-w-none text-gray-600 prose-headings:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-800">
          
          <p className="lead text-gray-700 font-medium text-lg mt-0">
            The information, calculators, tools, articles, market data, and other resources available on <strong>NepaCalc</strong> ("we," "our," or "us") are provided for general informational and educational purposes only.
          </p>
          <p>
            Although we make every reasonable effort to ensure the accuracy of the information published on this website, we make no guarantees regarding the completeness, reliability, suitability, or accuracy of any information or calculation.
          </p>
          <p>
            <strong>Your use of NepaCalc is entirely at your own risk.</strong>
          </p>

          <hr className="my-10" />

          <h2>Financial Disclaimer</h2>
          <p>NepaCalc provides financial calculators, investment tools, loan calculators, exchange rates, gold and silver prices, and related financial information.</p>
          <p>Nothing published on NepaCalc should be interpreted as:</p>
          <ul>
            <li>Financial advice</li>
            <li>Investment advice</li>
            <li>Banking advice</li>
            <li>Insurance advice</li>
            <li>Wealth management advice</li>
          </ul>
          <p>Before making any financial or investment decision, users should consult a qualified financial advisor or the relevant financial institution.</p>

          <hr className="my-10" />

          <h2>Tax Disclaimer</h2>
          <p>Our tax calculators are designed to simplify calculations based on publicly available laws, regulations, and official information.</p>
          <p>However:</p>
          <ul>
            <li>Tax laws change.</li>
            <li>Government rules are updated.</li>
            <li>Individual tax situations vary.</li>
          </ul>
          <p>Calculator results should not be considered professional tax advice.</p>
          <p>Users should consult the Inland Revenue Department (IRD), a licensed tax consultant, or another qualified professional before making tax-related decisions or filing official returns.</p>

          <hr className="my-10" />

          <h2>Engineering & Educational Disclaimer</h2>
          <p>Engineering calculators, mathematical tools, scientific resources, and educational content published on NepaCalc are intended to support learning and estimation.</p>
          <p>They are not substitutes for professional engineering analysis, technical verification, or academic assessment.</p>
          <p>Users should independently verify calculations before using them in professional, academic, research, construction, or safety-critical environments.</p>

          <hr className="my-10" />

          <h2>Health Disclaimer</h2>
          <p>Health-related calculators, including BMI, BMR, calorie, body fat, and similar tools, are provided for informational purposes only.</p>
          <p>They are not intended to diagnose, treat, cure, or prevent any medical condition.</p>
          <p>Always seek the advice of a qualified healthcare professional regarding medical concerns or treatment decisions.</p>
          <p>Never disregard professional medical advice because of information obtained from NepaCalc.</p>

          <hr className="my-10" />

          <h2>Market Information Disclaimer</h2>
          <p>Gold prices, silver prices, exchange rates, and other market information are provided for general reference.</p>
          <p>Although we strive to update market information regularly, prices may change at any time due to market conditions.</p>
          <p>Actual buying or selling prices may differ depending on:</p>
          <ul>
            <li>Dealers</li>
            <li>Banks</li>
            <li>Financial institutions</li>
            <li>Market conditions</li>
            <li>Applicable taxes or service charges</li>
          </ul>
          <p>Users should verify prices directly with the relevant institution before making transactions.</p>

          <hr className="my-10" />

          <h2>Government Information</h2>
          <p>Many NepaCalc calculators reference publicly available information from government departments and regulatory organizations.</p>
          <p>While we regularly review official publications, NepaCalc is not affiliated with, endorsed by, or operated by any government authority, unless explicitly stated.</p>
          <p>Official government publications remain the authoritative source in case of any discrepancy.</p>

          <hr className="my-10" />

          <h2>Calculator Results</h2>
          <p>Calculator outputs are generated automatically using the information entered by users.</p>
          <p>Results depend on:</p>
          <ul>
            <li>User inputs</li>
            <li>Applicable assumptions</li>
            <li>Current regulations</li>
            <li>Available data</li>
          </ul>
          <p>Users remain responsible for reviewing and verifying all results before making financial, legal, engineering, medical, academic, or business decisions.</p>

          <hr className="my-10" />

          <h2>External Links</h2>
          <p>Our website may contain links to third-party websites for additional information or reference.</p>
          <p>These links are provided solely for user convenience.</p>
          <p>NepaCalc does not control or endorse the content, policies, or services of third-party websites and accepts no responsibility for them.</p>

          <hr className="my-10" />

          <h2>No Professional Relationship</h2>
          <p>Using NepaCalc does not create any professional relationship between you and NepaCalc or its owner.</p>
          <p>Nothing on this website should be interpreted as establishing:</p>
          <ul>
            <li>Client relationships</li>
            <li>Financial advisory relationships</li>
            <li>Legal advisory relationships</li>
            <li>Medical relationships</li>
            <li>Engineering consultancy relationships</li>
          </ul>

          <hr className="my-10" />

          <h2>Limitation of Liability</h2>
          <p>To the fullest extent permitted by applicable law, NepaCalc shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from:</p>
          <ul>
            <li>Use of the website</li>
            <li>Reliance on calculator results</li>
            <li>Errors or omissions</li>
            <li>Market fluctuations</li>
            <li>Government policy changes</li>
            <li>Technical interruptions</li>
            <li>Third-party services</li>
          </ul>
          <p>Users accept full responsibility for decisions made using information obtained from NepaCalc.</p>

          <hr className="my-10" />

          <h2>Contact</h2>
          <p>If you have questions regarding this Disclaimer, please contact us.</p>
          <p><strong>Email</strong></p>
          <p><a href="mailto:support@nepacalc.com">support@nepacalc.com</a></p>

        </div>
      </div>
    </div>
  );
}
