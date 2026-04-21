import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | NEPACALC',
  description: 'Understand the terms of use for NEPACALC. Our high-precision calculators are designed for educational and professional guidance in Nepal.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Terms of Service
      </h1>
      <div className="prose text-gray-600 text-sm space-y-4">
        <p>By using NEPACALC, you agree to these terms. The calculators provided on this website are for informational and educational purposes only.</p>
        <p>While we strive for accuracy, we do not guarantee the correctness of any calculations. For official tax filings, loan agreements, or medical advice, please consult a certified professional.</p>
        <p>We reserve the right to modify or discontinue any calculator at any time without notice.</p>
        <p>If you have any questions about these Terms, please contact us at <a href="mailto:contact@nepacalc.com" className="text-blue-600 hover:underline">contact@nepacalc.com</a>.</p>
        <p>Last updated: {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
