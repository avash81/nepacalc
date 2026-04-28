import { calcMeta } from '@/lib/calcMeta';
import Calculator from './Calculator';
import { CalcWrapper } from '@/components/calculator/CalcWrapper';
import { PillarFAQ } from '@/components/seo/PillarFAQ';

export const metadata = calcMeta({
  title: "Word Counter Online | Character & Letter Count Tool Nepal NepaCalc",
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
    <Calculator />
  );
}
