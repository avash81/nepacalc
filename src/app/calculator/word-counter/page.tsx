import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Word Counter Online | Character & Letter Count Tool Nepal NepaCal",
  description: "Count words, characters, and sentences in your text instantly. Free online word counter for students, writers, and SEO professionals in Nepal.",
  slug: 'word-counter',
  keywords: ["word counter nepal", "calculate word count", "character count tool", "essay word counter", "online text analysis", "seo word count tool"],
});

const WORD_COUNTER_FAQS = [
  {
    question: "Why use a word counter for SEO?",
    answer: "Search engines like Google favor content with specific lengths (e.g., 1,500+ words for deep guides). Our tool helps you track your progress toward these SEO benchmarks."
  },
  {
    question: "How are words counted exactly?",
    answer: "A word is defined as a sequence of characters separated by spaces. Our engine also tracks character counts (with and without spaces) for precise limit adherence."
  },
  {
    question: "What is the character limit for social media?",
    answer: "Twitter (X) has a 280-character limit, while meta descriptions for Google should be under 160 characters. Our counter helps you fit these exact constraints."
  },
  {
    question: "Does it count symbols and numbers?",
    answer: "Yes. Every non-space character is counted toward the 'Character Count', while only space-delimited clusters are counted as 'Words'."
  },
  {
    question: "Is there a limit to how much text I can paste?",
    answer: "Our engine is optimized to handle large documents up to 50,000+ words instantly, making it suitable for students in Nepal writing long theses or reports."
  }
];

export default function Page() {
  return (
    <div className="bg-white min-h-screen">
      <CalcWrapper
        title="Textual Analysis Engine"
        description="High-precision utility for auditing word count, character density, and structural metrics of any provided text instantly."
        crumbs={[{ label: 'Directory', href: '/directory' }, { label: 'Word Counter' }]}
        isNepal={true}
        relatedCalcs={[
          { name: 'Password Generator', slug: 'password-generator' },
          { name: 'QR Generator', slug: 'qr-generator' },
          { name: 'Unit Converter', slug: 'unit-converter' }
        ]}
        formula="Word Count = Σ(Space Delimited Tokens)"
      >
        <Calculator />
        <div className="hp-container pb-24 border-t border-slate-100 pt-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter mb-8 bg-slate-900 text-white px-6 py-3 rounded-2xl inline-block shadow-lg">
              Writing Guide: Mastering Text Constraints
            </h2>
            
            <div className="prose prose-slate max-w-none mb-12">
              <p className="text-slate-700 text-base leading-relaxed mb-6 font-medium">
                Whether you are writing a university essay, a professional report, or an SEO-optimized blog post, <strong>word count precision</strong> is a critical requirement.
              </p>
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Our <strong>Textual Analysis Laboratory</strong> provides the tools writers in Nepal need to meet their specific targets. From tracking the 280-character limit of a viral tweet to ensuring your thesis abstract stays under the word limit, our engine provides real-time, <strong>non-latency updates</strong> as you type or paste your content, ensuring you never exceed your constraints.
              </p>
            </div>

            <PillarFAQ faqs={WORD_COUNTER_FAQS} title="Word Count & Text Analysis FAQ" />
          </div>
        </div>
      </CalcWrapper>
    </div>
  );
}
