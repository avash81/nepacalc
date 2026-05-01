import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service | NepaCal",
  description: "NepaCal terms of service — conditions for using Nepal's free calculator platform.",
  alternates: {
    canonical: 'https://nepacalc.com/terms/',
  },
};

export default function TermsPage() {
  return (
    <div className="bg-[#FDFDFD] min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Terms of Service</h1>
          <p className="text-sm text-gray-500 font-medium">
            <strong>Last updated:</strong> May 1, 2026
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white p-5 md:p-6 rounded-xl border border-gray-100 shadow-sm prose prose-sm md:prose-base prose-blue max-w-none text-gray-600">
          
          <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-6">
            <h2 className="text-red-800 font-bold text-lg mt-0 mb-2">Important Disclaimer</h2>
            <p className="text-red-900 m-0">
              NepaCal is a tool for estimation. We are not responsible for tax penalties, financial losses, or legal consequences. Always consult official IRD or NRB documents or a certified professional before making final decisions.
            </p>
          </div>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3 border-b pb-2">Use of Calculators</h2>
          <p>Our tools are for informational and educational purposes. While updated every Shrawan 1, results are not professional advice.</p>
          <p><strong>Tax filing:</strong> Consult the Inland Revenue Department (IRD).</p>
          <p><strong>Vehicle Matters:</strong> Consult the Department of Transport Management (DoTM).</p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3 border-b pb-2">Intellectual Property & Anti-Scraping</h2>
          <p><strong>Web Scraping (Forbidden):</strong> Use of automated bots to extract our calculator logic or code in bulk is strictly prohibited.</p>
          <p><strong>Frame Injection:</strong> You may not embed NepaCal inside an iframe on another site without written permission.</p>

          <h2 className="text-lg font-bold text-gray-900 mt-6 mb-3 border-b pb-2">Limitation of Liability</h2>
          <p>In no event shall NepaCal or its founder be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on NepaCal, even if we have been notified of the possibility of such damage.</p>

        </div>
      </div>
    </div>
  );
}
