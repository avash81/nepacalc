import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import Calculator from './Calculator';

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Number to Words Converter"
        description="Convert any number into its written English word representation. Ideal for writing checks, legal contracts, and financial documents."
        crumbs={[{ label: 'Converters', href: '/calculator/category/utility' }, { label: 'Number to Words' }]}
        relatedCalcs={[
          { name: 'VAT Calculator', slug: 'nepal-vat' },
          { name: 'Scientific Calculator', slug: 'scientific-calculator' },
          { name: 'Unit Converter', slug: 'unit-converter' }
        ]}
        formula="Digit-by-digit mapping based on international place-value systems (Billion, Million, Thousand)."
      >
        <Calculator />

        {/* Static SEO Authority Block */}
        <div className="mt-20 pt-12 border-t border-[#dadce0]">
           <h2 className="text-2xl font-black text-[#202124] tracking-tight mb-6">How to use Number to Words for Checks & Legal Work</h2>
           <p className="text-[#5f6368] text-[15px] leading-relaxed mb-6 font-medium">
             Writing numbers in words is a standard requirement for banking and legal documentation in Nepal to prevent tampering and ensure absolute clarity. Our converter follows the international standard for English word representation, supporting large scales up to Trillions.
           </p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#f8f9fa] p-8 rounded-3xl border border-[#dadce0]">
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] mb-3">Check Writing</h3>
                <p className="text-xs text-[#5f6368] leading-relaxed">Always cross-verify the word representation against the numeric amount. For financial checks, it is standard practice to append "Only" at the end of the written words.</p>
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#202124] mb-3">Large Scale Support</h3>
                <p className="text-xs text-[#5f6368] leading-relaxed">This tool accurately represents thousands, millions, and billions, ensuring that high-value transactions are documented correctly in English.</p>
              </div>
           </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
